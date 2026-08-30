/**
 * Rise Of Greatness: Kariyer Efsanesi - Interactive Match Engine Module
 * Manages text-based choice scenarios and match ticking.
 */

const MatchEngine = {
    currentSpeed: 1,
    min: 0,
    score: { player: 0, opponent: 0 },
    timer: null,
    playerState: null,
    callbacks: null,
    playerStats: { goals: 0, assists: 0, passes: 0, shots: 0 },
    isPausedForChoice: false,
    activeChoice: null,
    teamPlayer: null,
    teamOpponent: null,
    hasTriggeredCardDispute: false,
    hasTriggeredSetPiece: false,
    isSentOff: false,
    hasYellowCard: false,

    setSpeed: function(speed) {
        this.currentSpeed = speed;
        console.log("Match Engine speed set to:", speed);
    },

    simulate: function(playerTeam, opponentTeam, playerState, callbacks) {
        this.currentSpeed = 1;
        this.min = 0;
        this.score = { player: 0, opponent: 0 };
        this.playerState = playerState;
        this.callbacks = callbacks;
        this.teamPlayer = playerTeam;
        this.teamOpponent = opponentTeam;
        this.playerStats = { goals: 0, assists: 0, passes: 0, shots: 0 };
        this.isPausedForChoice = false;
        this.activeChoice = null;
        this.hasTriggeredCardDispute = false;
        this.hasTriggeredSetPiece = false;
        this.isSentOff = false;
        this.hasYellowCard = false;
        this.isSubbedOff = false; // New flag for early substitutions

        // NSS Hoca Güveni & Takım Uyumu Etkileri
        this.isBenched = false;
        this.isDropped = false;
        
        const trust = playerState.hocaGuveni || 40;
        const teamChem = playerState.takimUyumu || 50;

        if (trust < 20) {
            this.isDropped = true;
        } else if (trust < 40) {
            this.isBenched = true;
        }

        // Generate choice minutes based on start/bench/dropped
        if (this.isDropped) {
            this.choiceMinutes = [];
        } else if (this.isBenched) {
            // Sadece 65. dakikadan sonra oyuna girer, tek geç pozisyon yakalar
            this.choiceMinutes = [
                Math.floor(Math.random() * (88 - 70 + 1)) + 70
            ];
        } else {
            // Normal başlangıç (En az 3 net pozisyon garantili)
            let baseMinutes = [
                Math.floor(Math.random() * (35 - 16 + 1)) + 16,
                Math.floor(Math.random() * (70 - 48 + 1)) + 48,
                Math.floor(Math.random() * (89 - 78 + 1)) + 78
            ];
            
            // Takım Uyumu yüksekse ekstra 4. pozisyon
            if (teamChem >= 70 && Math.random() < 0.75) {
                baseMinutes.push(Math.floor(Math.random() * (46 - 36 + 1)) + 36);
            }

            // SEVİYE / REYTİNG BONUSU: Seviye yükseldikçe ekstra fırsat ekle
            const rating = playerState.rating || 50;
            if (rating >= 90) {
                // Guaranteed 2 extra positions for superstar status (5 pozisyon!)
                baseMinutes.push(Math.floor(Math.random() * (46 - 36 + 1)) + 36);
                baseMinutes.push(Math.floor(Math.random() * (68 - 55 + 1)) + 55);
            } else if (rating >= 80) {
                baseMinutes.push(Math.floor(Math.random() * (68 - 55 + 1)) + 55);
            } else if (rating >= 70 && Math.random() < 0.60) {
                baseMinutes.push(Math.floor(Math.random() * (68 - 55 + 1)) + 55);
            }

            // Deduplicate minutes to prevent multiple prompt overlaps at the same minute
            baseMinutes = [...new Set(baseMinutes)];
            baseMinutes.sort((a,b) => a - b);
            
            this.choiceMinutes = baseMinutes;
        }

        this.usedScenarioIndices = [];
        this.momentumBoost = 0;
        this.momentumDuration = 0;

        if (this.timer) {
            clearTimeout(this.timer);
        }

        const self = this;
        
        // Notify start
        callbacks.onMinuteUpdate(0, this.score, `${playerTeam.name} - ${opponentTeam.name} maçı başlamak üzere!`);

        function tick() {
            if (self.isPausedForChoice) return;

            self.min++;
            
            // NSS Custom Commentary for benched/dropped player
            let customCommentary = null;
            if (self.min === 1) {
                if (self.isDropped) {
                    customCommentary = `⚠️ Kadro Dışı! Hoca güveni yetersiz olduğu için kadroya alınmadın. Maçı tribünden izliyorsun.`;
                } else if (self.isBenched) {
                    customCommentary = `🔄 Yedek Kulübesi! Hoca seni bu maçta yedek başlattı. Hamle oyuncusu olarak bekliyorsun.`;
                }
            } else if (self.min === 65 && self.isBenched) {
                customCommentary = `🔄 Oyuna Giriyorsun! Teknik direktör seni sahaya sürüyor. Kendini göstermek için son 25 dakika!`;
            }

            if (self.min > 90) {
                // Match finished!
                GAME.matchSimulatedThisWeek = true;
                GAME.simulateLeagueWeek(self.score.player, self.score.opponent);

                if (typeof SoundManager !== "undefined" && typeof SoundManager.playSpiker === "function") {
                    SoundManager.playSpiker("son_duduk");
                }

                // Calculate position-specific match performance rating
                const playerPos = (self.playerState && self.playerState.position) || (window.GAME && GAME.state && GAME.state.position) || "Forvet";
                let rating = 6.0;
                let tacklesCount = self.playerStats.tackles || 0;
                let goalsCount = self.playerStats.goals || 0;
                let assistsCount = self.playerStats.assists || 0;
                let passesCount = self.playerStats.passes || 0;
                let shotsCount = self.playerStats.shots || 0;

                if (playerPos === "Defans") {
                    const cleanSheet = (self.score.opponent === 0);
                    let baseDef = 6.2;
                    if (cleanSheet) baseDef += 0.8;
                    else if (self.score.opponent === 1) baseDef += 0.0;
                    else if (self.score.opponent === 2) baseDef -= 0.4;
                    else if (self.score.opponent >= 3) baseDef -= 0.8;
                    rating = baseDef + (tacklesCount * 0.70) + (goalsCount * 1.5) + (assistsCount * 1.0) + (passesCount * 0.06);
                } else if (playerPos === "Orta Saha") {
                    rating = 6.0 + (assistsCount * 1.2) + (goalsCount * 1.2) + (tacklesCount * 0.6) + (passesCount * 0.10) + (shotsCount * 0.08);
                } else {
                    // Forvet
                    rating = 6.0 + (goalsCount * 1.4) + (assistsCount * 0.9) + (tacklesCount * 0.4) + (shotsCount * 0.10) + (passesCount * 0.05);
                }
                if (self.isSentOff) {
                    rating = Math.max(3.0, rating * 0.6);
                }
                if (self.isDropped) {
                    rating = 5.0;
                }
                rating = Math.max(3.0, Math.min(10.0, parseFloat(rating.toFixed(1))));

                if (callbacks.onMatchFinish) {
                    callbacks.onMatchFinish({
                        score: self.score,
                        playerStats: {
                            goals: self.playerStats.goals,
                            assists: self.playerStats.assists,
                            passes: self.playerStats.passes,
                            shots: self.playerStats.shots,
                            rating: rating,
                            isSentOff: self.isSentOff
                        }
                    });
                }
                return;
            }

            // If player is red carded or subbed off, run simplified simulation
            if (self.isSentOff || self.isSubbedOff) {
                let ratingPlayer = (self.teamPlayer.att + self.teamPlayer.mid + self.teamPlayer.def) / 3;
                let ratingOpponent = (self.teamOpponent.att + self.teamOpponent.mid + self.teamOpponent.def) / 3;
                if (Math.random() < 0.025) {
                    self.score.opponent++;
                    callbacks.onMinuteUpdate(self.min, self.score, `RAKİP GOL ATTI! ${self.isSentOff ? '10 kişi kalmamızı' : 'Kenara gelmeni'} fırsat bilen ${self.teamOpponent.name} farkı açıyor.`);
                } else if (Math.random() < 0.025) {
                    self.score.player++;
                    callbacks.onMinuteUpdate(self.min, self.score, `GOOOOL! ${self.isSentOff ? '10 kişi olmamıza rağmen' : 'Sen kenardayken'} takımın harika bir gol buluyor!`);
                } else if (Math.random() < 0.15) {
                    const pName = (self.playerState && self.playerState.playerName) || (window.GAME && GAME.state && GAME.state.playerName) || "Oyuncumuz";
                    callbacks.onMinuteUpdate(self.min, self.score, self.isSentOff ? `10 kişi mücadele ediyoruz, ${pName} kırmızı kartla tribünde.` : `Takım sensiz mücadeleye devam ediyor...`);
                } else {
                    callbacks.onMinuteUpdate(self.min, self.score, null);
                }
                self.timer = setTimeout(tick, 1000 / self.currentSpeed);
                return;
            }

            // Decrement momentum duration
            if (self.momentumDuration > 0) {
                self.momentumDuration--;
                if (self.momentumDuration === 0) {
                    self.momentumBoost = 0;
                }
            }

            const isBenchedAndWaiting = self.isBenched && self.min < 65;

            // 1st: Trigger Referee Card Dispute (0.8% chance, only if playing and active)
            if (!isBenchedAndWaiting && !self.isDropped && !self.hasTriggeredCardDispute && self.min >= 20 && self.min <= 80 && Math.random() < 0.008) {
                self.hasTriggeredCardDispute = true;
                self.triggerCardDispute();
                return;
            }

            // 2nd: Trigger Free Kick / Penalty Set Piece (1.8% chance)
            if (!isBenchedAndWaiting && !self.isDropped && !self.hasTriggeredSetPiece && self.min >= 15 && self.min <= 85 && Math.random() < 0.018) {
                self.hasTriggeredSetPiece = true;
                self.triggerSetPiece();
                return;
            }

            // Trigger Choice Cards at dynamic minutes (only if playing and active)
            if (!isBenchedAndWaiting && !self.isDropped && self.choiceMinutes.includes(self.min)) {
                self.triggerChoice(self.min);
                return;
            }

            // Show custom benched/dropped commentary if we set it
            if (customCommentary) {
                callbacks.onMinuteUpdate(self.min, self.score, customCommentary);
                self.timer = setTimeout(tick, 1000 / self.currentSpeed);
                return;
            }

            // Sim other natural matches goals
            let ratingPlayer = (self.teamPlayer.att + self.teamPlayer.mid + self.teamPlayer.def) / 3;
            let ratingOpponent = (self.teamOpponent.att + self.teamOpponent.mid + self.teamOpponent.def) / 3;
            
            // Apply player momentum boost if opponent is weaker
            let currentPlayerBoost = 0;
            if (ratingPlayer > ratingOpponent) {
                currentPlayerBoost = self.momentumBoost;
            }
            let adjustedPlayer = ratingPlayer + currentPlayerBoost;
            let probOpp = ratingOpponent / (adjustedPlayer + ratingOpponent);
            
            // Opponent goal chance
            if (Math.random() < probOpp * 0.015) {
                self.score.opponent++;
                self.momentumBoost = 0;
                self.momentumDuration = 0;
                callbacks.onMinuteUpdate(self.min, self.score, `MAALESEF GOL! ${self.teamOpponent.name} topu ağlarımıza gönderdi.`);
                if (callbacks.onEventPause) {
                    self.isPausedForChoice = true;
                    callbacks.onEventPause(`❌ ${self.min}' RAKİP GOL ATTI!`, `${self.teamOpponent.name} golü buldu. Maça devam etmek için dokunun.`, () => {
                        self.isPausedForChoice = false;
                        self.resumeTick();
                    });
                    return;
                }
            }
            // Teammate goal chance (not scored by user)
            else if (Math.random() < (1 - probOpp) * 0.012) {
                self.score.player++;
                if (ratingPlayer > ratingOpponent) {
                    self.momentumBoost = 15;
                    self.momentumDuration = 12;
                }
                if (typeof SoundManager !== "undefined" && typeof SoundManager.playSpiker === "function") {
                    SoundManager.playSpiker("gol");
                }
                callbacks.onMinuteUpdate(self.min, self.score, `GOOOOL!!! Takım arkadaşların harika paslaşmalarla golü buluyor!`);
                if (callbacks.onEventPause) {
                    self.isPausedForChoice = true;
                    callbacks.onEventPause(`⚽ ${self.min}' GOOOOL!`, `Takımın golü buldu! Maça devam etmek için dokunun.`, () => {
                        self.isPausedForChoice = false;
                        self.resumeTick();
                    });
                    return;
                }
            }
            // Generic commentary
            else if (Math.random() < 0.15) {
                const comments = [
                    "Orta sahada kıran kırana mücadele devam ediyor.",
                    "Rakip takımın atak hazırlığı defansımız tarafından kesildi.",
                    "Seyirciler tezahüratlarla stadı inletiyor.",
                    "Hoca kenardan taktik direktifler veriyor.",
                    "Sert bir müdahale, hakem oyunu devam ettirdi."
                ];
                callbacks.onMinuteUpdate(self.min, self.score, comments[Math.floor(Math.random() * comments.length)]);
            } else {
                callbacks.onMinuteUpdate(self.min, self.score, null);
            }

            self.timer = setTimeout(tick, 1000 / self.currentSpeed);
        }

        self.timer = setTimeout(tick, 1000 / self.currentSpeed);
    },

    choiceMinutes: [],
    momentumBoost: 0,
    momentumDuration: 0,

    checkGoalCommentary: function(baseMsg) {
        const pName = this.playerState ? this.playerState.playerName : "Oyuncu";
        if (this.playerStats.goals === 3) {
            return baseMsg + ` \n🎩 HATTRICK!!! ${pName} bugün stadyumda tarih yazıyor! Taraftarlar ayakta alkışlıyor! ⚽⚽⚽`;
        } else if (this.playerStats.goals === 1) {
            return baseMsg;
        } else {
            return baseMsg + ` (${pName}'in maçtaki ${this.playerStats.goals}. golü!)`;
        }
    },

    getRandomChoiceText: function(type) {
        const name = (this.playerState && this.playerState.currentTeammateName) ? this.playerState.currentTeammateName : "Ali";
        const pools = {
            shoot: [
                "90'a plase çak!",
                "Uzak köşeye sert bir şut zımbala!",
                "Gelişine voleyle kaleyi dene!",
                "Kalecinin üzerinden şıkça aşır!",
                "Kaleyi cepheden gören yerden sert vur!"
            ],
            pass: [
                `Boş koşu yapan ${name}'ye ara pası bırak.`,
                `Boş koşan ${name}'nin önüne ince bir pas yuvarla.`,
                `${name}'ye havadan kavisli orta yolla.`,
                `Verkaç yapıp ${name}'ye pası aktar!`
            ],
            dribble: [
                "Vücut çalımıyla rakibini pazara gönder!",
                "Rakip stoperi bacak arası çalımla geç!",
                "Hızını kullanıp kanattan çizgiye in!",
                "Topu sağa çekip rakibini ekarte et!"
            ]
        };
        const pool = pools[type] || pools.shoot;
        return pool[Math.floor(Math.random() * pool.length)];
    },

    calculateStatSuccess: function(statVal, targetType = "def") {
        const val = Math.round(statVal || 50);
        
        // Dynamically compute opponent strength based on actual opponent team stats & league
        let oppStat = 60;
        if (this.teamOpponent) {
            if (targetType === "def") oppStat = this.teamOpponent.def || 62;
            else if (targetType === "mid") oppStat = this.teamOpponent.mid || 62;
            else if (targetType === "att") oppStat = this.teamOpponent.att || 62;
            else if (typeof targetType === "number") oppStat = targetType;
            else oppStat = Math.round((this.teamOpponent.att + this.teamOpponent.mid + this.teamOpponent.def) / 3);
        } else if (window.GAME && GAME.state && GAME.state.currentLeague) {
            const lId = GAME.state.currentLeague;
            oppStat = lId.includes("1lig") ? 58 : (lId.includes("super") ? 72 : 82);
        }

        // Relative skill comparison against opponent:
        // equal skills (e.g. 60 vs 60 in 1. Lig, or 78 vs 78 in Süper Lig) = 52% baseline chance
        // 10 points higher = +13% (65% chance)
        // 20 points higher = +26% (78% chance)
        // 10 points lower = -13% (39% chance)
        const diff = val - oppStat;
        let chance = 0.52 + (diff * 0.013);

        // Morale and condition effect
        const cond = (this.playerState && this.playerState.kondisyon) ? this.playerState.kondisyon : 100;
        const morale = (this.playerState && this.playerState.moral) ? this.playerState.moral : 100;
        if (cond < 60) chance -= 0.08;
        if (morale < 40) chance -= 0.06;
        else if (morale >= 85) chance += 0.04;

        return Math.max(0.15, Math.min(0.92, parseFloat(chance.toFixed(2))));
    },

    calculateStatChance: function(statVal, targetType = "def") {
        return this.calculateStatSuccess(statVal, targetType);
    },

    triggerChoice: function(minute) {
        if (this.isSentOff || this.isSubbedOff || this.isDropped) {
            this.isPausedForChoice = false;
            this.activeChoice = null;
            return;
        }
        this.isPausedForChoice = true;
        
        let choiceData = null;
        const idx = this.choiceMinutes.indexOf(minute);
        const pos = (this.playerState && this.playerState.position) || (window.GAME && GAME.state && GAME.state.position) || "Forvet";
        const teammate = (this.playerState && this.playerState.currentTeammateName) ? this.playerState.currentTeammateName : "Ali";

        const sho = Math.round(this.playerState.shooting || 50);
        const pas = Math.round(this.playerState.passing || 50);
        const spe = Math.round(this.playerState.speed || 50);
        const dri = Math.round(this.playerState.dribbling || 50);
        const def = Math.round(this.playerState.defense || 50);
        const phy = Math.round(this.playerState.physical || 50);

        if (!this.usedScenarioIndices) {
            this.usedScenarioIndices = [];
        }

        const isLastMinute = (idx === this.choiceMinutes.length - 1 && this.choiceMinutes.length > 1);

        if (pos === "Defans") {
            // ==================== DEFANS (10 FARKLI SENARYO - HER BİRİ 3 SEÇENEKLİ) ====================
            const defScenarios = [
                // 0: 1v1 Slide Tackle
                {
                    title: "🛡️ 1'e 1 Son Adam Kayarak Müdahale",
                    description: "Rakip forvet defans arkasına sarktı ve kalecimizle karşı karşıya kalmak üzere! Son adam sensin, üzerine doğru geliyor. Ne yapacaksın?",
                    options: [
                        {
                            text: `🦶 Zamanlamayı Ayarla ve Kayarak Müdahale Et`,
                            effect: `Savunma (%${def}) vs Rakip Forvet.`,
                            successChance: this.calculateStatSuccess(def, "att"),
                            onSuccess: () => {
                                if (!this.playerStats.tackles) this.playerStats.tackles = 0;
                                this.playerStats.tackles++;
                                return `MÜKEMMEL KAYARAK MÜDAHALE! Savunma ustalığın (%${def}) sayesinde topu forvetin ayağından jilet gibi aldın! Tehlike savuşturuldu!`;
                            },
                            onFail: () => {
                                return `Savunma müdahalen (%${def}) rakip forvetin kalitesine karşı yetersiz kaldı! Forvet sıyrıldı ama kalecimiz şutu çeldi.`;
                            }
                        },
                        {
                            text: `💪 Omuz Omuza Girip Forveti Sindir`,
                            effect: `Fizik (%${phy}) gücüne bağlı gövde mücadelesi.`,
                            successChance: this.calculateStatSuccess(phy, "att"),
                            onSuccess: () => {
                                if (!this.playerStats.tackles) this.playerStats.tackles = 0;
                                this.playerStats.tackles++;
                                return `KAYA GİBİ SAĞLAM! Fizik gücünle (%${phy}) forveti topla birlikte auta sürdün ve kaleyi korudun!`;
                            },
                            onFail: () => {
                                return `Fizik gücün (%${phy}) yetersiz kaldı! Hakem omuz mücadelesine faul düdüğü çaldı.`;
                            }
                        },
                        {
                            text: `⚡ Kademe Alıp Şut Açısını Kapat`,
                            effect: `Hız (%${spe}) ve pozisyon alma dengesi.`,
                            successChance: this.calculateStatSuccess(spe, "att"),
                            onSuccess: () => {
                                return `HARİKA KADEME! Hızınla (%${spe}) forvetin önünü kapatıp şut açısını daralttın, kalecimiz rahatça kontrol etti!`;
                            },
                            onFail: () => {
                                return `Hızın (%${spe}) yetersiz kaldı! Forvet dar açıdan şutunu çekti, kalecimiz son anda kornere çeldi.`;
                            }
                        }
                    ]
                },
                // 1: Aerial Corner Duel
                {
                    title: "✈️ Korner Savunmasında Kule Forvet Mücadelesi",
                    description: "Rakip tehlikeli bir korner kullandı! Top altıpas üzerine kavisli geliyor, rakip kule forvet kafaya yükseldi!",
                    options: [
                        {
                            text: `✈️ Havada Üstünlük Kurup Kafayla Uzaklaştır`,
                            effect: `Fizik (%${phy}) ve hava hakimiyeti yeteneğine bağlı.`,
                            successChance: this.calculateStatSuccess(phy, "att"),
                            onSuccess: () => {
                                if (!this.playerStats.tackles) this.playerStats.tackles = 0;
                                this.playerStats.tackles++;
                                return `HAVALARIN EFENDİSİ! Fizik gücünle (%${phy}) forvetin üzerinden müthiş sıçrayıp kafayla topu orta sahaya fırlattın!`;
                            },
                            onFail: () => {
                                return `Hava topu mücadelesinde rakip forvet kafayı vurdu ama top neyse ki üst direkten auta çıktı.`;
                            }
                        },
                        {
                            text: `🛡️ Rakip Forvete Perde Yap, Kaleciyi Çıkar`,
                            effect: `Savunma (%${def}) zekasına bağlı perdeleme.`,
                            successChance: this.calculateStatSuccess(def, "att"),
                            onSuccess: () => {
                                if (!this.playerStats.tackles) this.playerStats.tackles = 0;
                                this.playerStats.tackles++;
                                return `KUSURSUZ PERDELEME! Savunma zekanla (%${def}) forveti kilitledin, kalecimiz topu rahatça kontrol etti!`;
                            },
                            onFail: () => {
                                return `Savunma sezgin (%${def}) eksik kaldı, forvet perdeden sıyrıldı.`;
                            }
                        },
                        {
                            text: `🎯 Kafayla İndirip Kontraya Uzun Top Çıkar`,
                            effect: `Fizik ve Pas ortalamasına (%${Math.round((phy + pas)/2)}) bağlı asist şansı.`,
                            successChance: this.calculateStatSuccess((phy + pas) / 2, "mid"),
                            onSuccess: () => {
                                this.score.player++;
                                this.playerStats.assists++;
                                this.playerStats.passes++;
                                return `SAVUNMADAN HARİKA ASİST! Korner topunu kafayla indirip doğrudan kaçan forvetimizi gördün, kaleciyle karşı karşıya gol! ASİST!`;
                            },
                            onFail: () => {
                                this.playerStats.passes++;
                                return `Kafayla indirdiğin top rakip orta sahada kaldı.`;
                            }
                        }
                    ]
                },
                // 2: Outmuscle Wing
                {
                    title: "💪 Çizgide Kanat Forvetini Sindirme & Omuz Omuza",
                    description: "Rakip hızlı kanat oyuncusu çizgiden içeri kat etmeye çalışıyor! Hemen yanındasın.",
                    options: [
                        {
                            text: `💪 Gövdeni Araya Koyup Topu Auta Bırak`,
                            effect: `Fizik (%${phy}) gücüne bağlı.`,
                            successChance: this.calculateStatSuccess(phy, "att"),
                            onSuccess: () => {
                                if (!this.playerStats.tackles) this.playerStats.tackles = 0;
                                this.playerStats.tackles++;
                                return `KAYA GİBİ SAĞLAM! Gövdeni araya koyarak kanat oyuncusunu topla birlikte auta sürdün!`;
                            },
                            onFail: () => {
                                return `Fizik gücün (%${phy}) yetersiz kaldı, kanat oyuncusu çeviklikle sıyrıldı.`;
                            }
                        },
                        {
                            text: `🦶 Ayakta Müdahale ile Topu Çal`,
                            effect: `Savunma (%${def}) yeteneğine bağlı.`,
                            successChance: this.calculateStatSuccess(def, "att"),
                            onSuccess: () => {
                                if (!this.playerStats.tackles) this.playerStats.tackles = 0;
                                this.playerStats.tackles++;
                                return `TERTEMİZ TOP KAPMA! Savunma müdahalenle (%${def}) topu ayağından söküp aldın!`;
                            },
                            onFail: () => {
                                return `Müdahalen (%${def}) boşa gitti, rakip ortasını açtı.`;
                            }
                        },
                        {
                            text: `⚡ Kademe Alıp Kanat Ortasını Ayakla Kes`,
                            effect: `Hız ve Savunma ortalamasına (%${Math.round((spe + def)/2)}) bağlı.`,
                            successChance: this.calculateStatSuccess((spe + def) / 2, "att"),
                            onSuccess: () => {
                                if (!this.playerStats.tackles) this.playerStats.tackles = 0;
                                this.playerStats.tackles++;
                                return `HARİKA BLOK! Ayak uzatarak tehlikeli ortayı kornere çeldin!`;
                            },
                            onFail: () => {
                                return `Ayağını uzattın ama orta üzerinden geçti.`;
                            }
                        }
                    ]
                },
                // 3: Recovery Sprint
                {
                    title: "⚡ Derin Ara Pasında Geriye Kademe Deparı",
                    description: "Defans arkasına hızlı bir ara pası atıldı! Rakip forvetle birlikte topa doğru koşuyorsun.",
                    options: [
                        {
                            text: `⚡ 30 Metrelik Deparla Forveti Yakala`,
                            effect: `Hız (%${spe}) gücüne bağlı geri dönüş.`,
                            successChance: this.calculateStatSuccess(spe, "att"),
                            onSuccess: () => {
                                if (!this.playerStats.tackles) this.playerStats.tackles = 0;
                                this.playerStats.tackles++;
                                return `MÜTHİŞ DEPAR! Hızın (%${spe}) sayesinde forveti arkadan yakalayıp topu kaleciye kazandırdın!`;
                            },
                            onFail: () => {
                                return `Hızın (%${spe}) yetersiz kaldı! Forvet arkada boş kaldı ama şutu auta gitti.`;
                            }
                        },
                        {
                            text: `🦶 Son Anda Ayak Uzatıp Topu Kornere Çel`,
                            effect: `Hız ve Savunma ortalamasına (%${Math.round((spe + def)/2)}) bağlı.`,
                            successChance: this.calculateStatSuccess((spe + def) / 2, "att"),
                            onSuccess: () => {
                                if (!this.playerStats.tackles) this.playerStats.tackles = 0;
                                this.playerStats.tackles++;
                                return `KRİTİK MÜDAHALE! Son anda uzattığın ayakla topu kornere çeldin!`;
                            },
                            onFail: () => {
                                return `Ayağını uzattın ama yetişemedin.`;
                            }
                        },
                        {
                            text: `💪 Arkadan Yetişip Gövdenle Şut Açısını Koru`,
                            effect: `Fizik ve Hız ortalamasına (%${Math.round((phy + spe)/2)}) bağlı.`,
                            successChance: this.calculateStatSuccess((phy + spe) / 2, "att"),
                            onSuccess: () => {
                                return `MÜKEMMEL GÖVDE TEMASI! Forvetin dengesini bozup rahat şut çekmesini engelledin!`;
                            },
                            onFail: () => {
                                return `Temas kuramadın, forvet vuruşunu yaptı.`;
                            }
                        }
                    ]
                },
                // 4: Build-up Long Ball
                {
                    title: "🎯 Geriden 50 Metrelik Nokta Uzun Pas",
                    description: "Kendi yarı sahanda top ayağında. Forvetimiz rakip savunma arkasına el kaldırıp koşu gösteriyor!",
                    options: [
                        {
                            text: `🚀 Savunma Arkasına 50 Metrelik Nokta Pas At`,
                            effect: `Pas (%${pas}) yeteneğine bağlı asist şansı.`,
                            successChance: this.calculateStatSuccess(pas, "def"),
                            onSuccess: () => {
                                this.score.player++;
                                this.playerStats.assists++;
                                this.playerStats.passes++;
                                return `ŞAPKA ÇIKARTILIR! Pas kalitenle (%${pas}) 50 metreden forvetimizin önüne adrese teslim top attın! GOOOL! HARİKA ASİST!`;
                            },
                            onFail: () => {
                                this.playerStats.passes++;
                                return `Pasın rakip savunmanın kucağına gitti.`;
                            }
                        },
                        {
                            text: `🛡️ ${teammate}'ye Garanti Yerden Pas Ver`,
                            effect: `Güvenli kısa pas (%${pas}).`,
                            successChance: this.calculateStatSuccess(pas, "mid"),
                            onSuccess: () => {
                                this.playerStats.passes++;
                                return `TEMİZ OYUN! Tek pasla ${teammate}'yi gördün ve takım atağa güvenle çıktı.`;
                            },
                            onFail: () => {
                                this.playerStats.passes++;
                                return `Kısa pasın biraz zayıf kaldı, rakip baskı kurdu.`;
                            }
                        },
                        {
                            text: `⚽ Soğukkanlı Çalımla Forveti Geçip Orta Sahaya Çık`,
                            effect: `Dribbling (%${dri}) yeteneğine bağlı topla çıkış.`,
                            successChance: this.calculateStatSuccess(dri, "att"),
                            onSuccess: () => {
                                this.playerStats.passes++;
                                return `BÜYÜK SOĞUKKANLILIK! Dribbling ustalığınla (%${dri}) forveti oyundan düşürüp orta sahaya pası aktardın!`;
                            },
                            onFail: () => {
                                return `Çalım denerken baskı arttı, topu taca göndermek zorunda kaldın.`;
                            }
                        }
                    ]
                },
                // 5: Press Resistance
                {
                    title: "⚽ Ceza Sahası Önünde Forvet Presini Çalımla Kırma",
                    description: "Ceza sahası önünde 2 rakip forvet birden şok pres uyguluyor! Ne yapacaksın?",
                    options: [
                        {
                            text: `⚽ Klas Vücut Çalımıyla Baskıdan Sıyrıl`,
                            effect: `Dribbling (%${dri}) yeteneğine bağlı.`,
                            successChance: this.calculateStatSuccess(dri, "att"),
                            onSuccess: () => {
                                this.playerStats.passes++;
                                return `BÜYÜK SOĞUKKANLILIK! Dribbling yeteneğinle (%${dri}) forvete klas bir vücut çalımı atıp orta sahayı gördün! Tribünler alkışlıyor!`;
                            },
                            onFail: () => {
                                return `Dribbling seviyen (%${dri}) pres altında yetersiz kaldı! Topu son anda taca vurmak zorunda kaldın.`;
                            }
                        },
                        {
                            text: `👟 Tek Pasla Maestro ${teammate}'ye Çık`,
                            effect: `Pas (%${pas}) yeteneğine bağlı hızlı servis.`,
                            successChance: this.calculateStatSuccess(pas, "mid"),
                            onSuccess: () => {
                                this.playerStats.passes++;
                                return `TEK PASLA TEHLİKEDEN ÇIKIŞ! Pas kalitenle (%${pas}) ${teammate}'yi gördün ve presi kırdın!`;
                            },
                            onFail: () => {
                                this.playerStats.passes++;
                                return `Pasın arkada kaldı.`;
                            }
                        },
                        {
                            text: `🚀 Riski Göze Almayıp Topu Taca Dik`,
                            effect: `Garanti emniyetli savunma.`,
                            successChance: 0.85,
                            onSuccess: () => {
                                return `GARANTİ SAVUNMA! Topu taca dikerek savunmanın yerleşmesini sağladın.`;
                            },
                            onFail: () => {
                                return `Top taca çıktı.`;
                            }
                        }
                    ]
                },
                // 6: Shot Block
                {
                    title: "🧱 Ceza Sahası Dışı Sert Şut Bloku",
                    description: "Rakip orta saha 20 metreden kaleyi gördü ve çok sert bir şut çıkardı! Şut senin hizandan geçiyor!",
                    options: [
                        {
                            text: `🧱 Gövdeni Siper Edip Şutu Engelle`,
                            effect: `Savunma ve Fizik ortalamasına (%${Math.round((def + phy)/2)}) bağlı.`,
                            successChance: this.calculateStatSuccess((def + phy) / 2, "mid"),
                            onSuccess: () => {
                                if (!this.playerStats.tackles) this.playerStats.tackles = 0;
                                this.playerStats.tackles++;
                                return `KAYA GİBİ BLOK! Vücudunu siper ederek mutlak bir gol şutunu kornere çeldin! Kalecimiz teşekkür etti!`;
                            },
                            onFail: () => {
                                return `Blok hamlen yetersiz kaldı, top bacak arasından geçti ama kalecimiz kurtardı.`;
                            }
                        },
                        {
                            text: `⚡ Ayak Uzatıp Şutun Yönünü Değiştir`,
                            effect: `Hız ve Savunma ortalamasına (%${Math.round((spe + def)/2)}) bağlı.`,
                            successChance: this.calculateStatSuccess((spe + def) / 2, "mid"),
                            onSuccess: () => {
                                if (!this.playerStats.tackles) this.playerStats.tackles = 0;
                                this.playerStats.tackles++;
                                return `MÜTHİŞ REAKSİYON! Uzattığın ayakla topun hızını kesip kalecimizin kucağına yuvarladın!`;
                            },
                            onFail: () => {
                                return `Ayağını uzattın ama top çarpmadan geçti.`;
                            }
                        },
                        {
                            text: `🛡️ Kalecinin Görüşünü Kapatmadan Alan Daralt`,
                            effect: `Savunma (%${def}) pozisyon almasına bağlı.`,
                            successChance: this.calculateStatSuccess(def, "mid"),
                            onSuccess: () => {
                                return `AKIL DOLU POZİSYON ALMA! Kaleciye net açı bıraktın ve şut kollarında eridi!`;
                            },
                            onFail: () => {
                                return `Şut direğin yanından auta gitti.`;
                            }
                        }
                    ]
                },
                // 7: Offside Trap
                {
                    title: "📐 Savunma Hattı & Kusursuz Ofsayt Taktiği",
                    description: "Rakip orta saha derin ara pası atmak üzere. Savunma hattını tek bir hamleyle yönetebilirsin!",
                    options: [
                        {
                            text: `📐 Son Anda Öne Adım Atıp Forveti Ofsayta Düşür`,
                            effect: `Savunma (%${def}) taktik zekasına bağlı.`,
                            successChance: this.calculateStatSuccess(def, "mid"),
                            onSuccess: () => {
                                return `KUSURSUZ OFSAYT TAKTİĞİ! Savunma bilginle (%${def}) tam zamanında öne çıktın ve yan hakem bayrağını kaldırdı!`;
                            },
                            onFail: () => {
                                return `Savunma zamanlaman gecikti, forvet ofsayttan kaçtı ama şutu auta gitti.`;
                            }
                        },
                        {
                            text: `⚡ Forvetle Beraber Geriye Koş`,
                            effect: `Hız (%${spe}) gücüne bağlı.`,
                            successChance: this.calculateStatSuccess(spe, "att"),
                            onSuccess: () => {
                                return `ADIM ADIM TAKİP! Hızınla (%${spe}) forvetin peşini bırakmadın ve pozisyonu bozdun!`;
                            },
                            onFail: () => {
                                return `Forvet bir adım önde kaldı.`;
                            }
                        },
                        {
                            text: `💪 Forveti Fiziksel Temasla Çizgide Boz`,
                            effect: `Fizik (%${phy}) gücüne bağlı.`,
                            successChance: this.calculateStatSuccess(phy, "att"),
                            onSuccess: () => {
                                return `FİZİKSEL BASKI! Forvete vücudunu hissettirip koşusunu bozdun!`;
                            },
                            onFail: () => {
                                return `Forvet temas alıp sıyrıldı.`;
                            }
                        }
                    ]
                },
                // 8: Last Ditch Clearance (90th min)
                {
                    title: "💥 90. Dakika Çizgiden Çıkarma & Kahramanlık",
                    description: "90. dakika! Rakip forvet kalecimizi geçti ve boş kaleye vurdu! Top kale çizgisine süzülüyor, çizgide bir tek sen varsın!",
                    options: [
                        {
                            text: `⚡ Uzanıp Çizgiden Kafayla Çıkar! (Fedakarlık)`,
                            effect: `Fizik (%${phy}) ve Fedakarlık gücüne bağlı takımı ipten alma.`,
                            successChance: this.calculateStatSuccess(phy, "att"),
                            onSuccess: () => {
                                if (!this.playerStats.tackles) this.playerStats.tackles = 0;
                                this.playerStats.tackles++;
                                this.playerState.hocaGuveni = Math.min(100, (this.playerState.hocaGuveni || 40) + 6);
                                this.playerState.moral = Math.min(100, (this.playerState.moral || 100) + 8);
                                return `İMKÂNSIZ KURTARIŞ! Fizik gücünle (%${phy}) çizgi üzerinde adeta uçarak topu kafayla kornere çeldin! TAKIMI İPTEN ALDIN! STADYUM YIKILIYOR!`;
                            },
                            onFail: () => {
                                return `Fiziksel uzanışın (%${phy}) yetersiz kaldı, top milimetrik farkla içeri girdi.`;
                            }
                        },
                        {
                            text: `🦶 Direk Dibinden Topu Kayarak Süpür!`,
                            effect: `Savunma (%${def}) reaksiyonuna bağlı.`,
                            successChance: this.calculateStatSuccess(def, "att"),
                            onSuccess: () => {
                                if (!this.playerStats.tackles) this.playerStats.tackles = 0;
                                this.playerStats.tackles++;
                                this.playerState.hocaGuveni = Math.min(100, (this.playerState.hocaGuveni || 40) + 5);
                                return `KAHRAMANCA MÜDAHALE! Savunma sezginle (%${def}) son salisede ayağını uzatarak topu çizgiden taca gönderdin!`;
                            },
                            onFail: () => {
                                return `Savunma hamlen gecikti, top filelerde.`;
                            }
                        },
                        {
                            text: `🛡️ Taktik Faul Yapıp Kontrayı Kes (Sarı Kart Garantili)`,
                            effect: `Sarı kart görürsün ama mutlak golü önlersin.`,
                            successChance: 0.85,
                            onSuccess: () => {
                                this.hasYellowCard = true;
                                this.playerState.hocaGuveni = Math.min(100, (this.playerState.hocaGuveni || 40) + 5);
                                return `FEDAKARCA TAKTİK FAUL! Rakip forveti formasından çekerek atağı başlamadan bitirdin. Hakem sarı kart gösterdi ama golü önledin!`;
                            },
                            onFail: () => {
                                return `Faul yapmaya çalıştın ama rakip sıyrılıp atağa devam etti.`;
                            }
                        }
                    ]
                },
                // 9: Tactical Foul
                {
                    title: "🟨 Profesyonelce Taktik Faul Yapıp Mutlak Golü Önleme",
                    description: "Son anlar! Rakip forvet 3'e 1 kontra atağa kalktı. Önündesin.",
                    options: [
                        {
                            text: `🟨 Formadan Hafifçe Çekip Kontrayı Durdur`,
                            effect: `Savunma (%${def}) zekasına bağlı sarı kartlık taktik faul.`,
                            successChance: this.calculateStatSuccess(def, "att"),
                            onSuccess: () => {
                                this.hasYellowCard = true;
                                this.playerState.hocaGuveni = Math.min(100, (this.playerState.hocaGuveni || 40) + 5);
                                return `FEDAKARCA TAKTİK FAUL! Rakip forveti formasından çekerek atağı başlamadan bitirdin. Hakem sarı kart gösterdi ama mutlak golü önledin!`;
                            },
                            onFail: () => {
                                return `Faul yapmaya çalıştın ama rakip sıyrılıp atağa devam etti.`;
                            }
                        },
                        {
                            text: `🦶 Temiz Kayarak Topu Söküp Almayı Dene`,
                            effect: `Savunma (%${def}) yeteneğiyle kartsız temiz çıkış.`,
                            successChance: this.calculateStatSuccess(def, "att"),
                            onSuccess: () => {
                                if (!this.playerStats.tackles) this.playerStats.tackles = 0;
                                this.playerStats.tackles++;
                                return `TERTEMİZ MÜDAHALE! Kartsız şekilde kayarak topu kornere gönderdin!`;
                            },
                            onFail: () => {
                                return `Müdahale boşa gitti.`;
                            }
                        },
                        {
                            text: `⚡ Kaleciye Güvenip Geriye Depar At`,
                            effect: `Hız (%${spe}) gücüne bağlı.`,
                            successChance: this.calculateStatSuccess(spe, "att"),
                            onSuccess: () => {
                                return `HIZLI GERİ DÖNÜŞ! Hızınla (%${spe}) kademeye girdin ve forvetin şutunu bozdun!`;
                            },
                            onFail: () => {
                                return `Hızın yetersiz kaldı.`;
                            }
                        }
                    ]
                }
            ];

            let pool = defScenarios;
            let chosenIndex = 0;
            let available = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].filter(i => !this.usedScenarioIndices.includes(i));
            if (available.length === 0) available = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
            
            if (isLastMinute && Math.random() < 0.35 && available.includes(8)) {
                chosenIndex = 8; // 90th min hero clearance (sometimes)
            } else {
                chosenIndex = available[Math.floor(Math.random() * available.length)];
            }
            this.usedScenarioIndices.push(chosenIndex);
            choiceData = pool[chosenIndex];

        } else if (pos === "Orta Saha") {
            // ==================== ORTA SAHA (10 FARKLI SENARYO - HER BİRİ 3 SEÇENEKLİ) ====================
            const midScenarios = [
                // 0: Through Ball Masterclass
                {
                    title: "👟 Defansı Yaran Milimetrik Ara Pası",
                    description: "Orta alanda topu kontrol ettin. Rakip savunma çizgisi önde yakalandı, forvetimiz araya koşu gösteriyor!",
                    options: [
                        {
                            text: `🎯 Savunma Bloklarının Arasından Ara Pası Bırak`,
                            effect: `Pas (%${pas}) vs Rakip Defans.`,
                            successChance: this.calculateStatSuccess(pas, "def"),
                            onSuccess: () => {
                                this.score.player++;
                                this.playerStats.assists++;
                                this.playerStats.passes++;
                                return `ÖLÜMCÜL ARA PASI! Pas kalitenle (%${pas}) defansın arasından geçen harika ara pasla forvetimiz golü attı! HARİKA ASİST!`;
                            },
                            onFail: () => {
                                this.playerStats.passes++;
                                return `Pas yeteneğin (%${pas}) bu ince ara pası için yetersiz kaldı, top rakip stoperin ayağında kaldı.`;
                            }
                        },
                        {
                            text: `🚀 Ceza Sahası Dışından Kaleye Füze Yolla`,
                            effect: `Şut (%${sho}) gücüne bağlı uzaktan gol şansı.`,
                            successChance: this.calculateStatSuccess(sho, "def"),
                            onSuccess: () => {
                                this.score.player++;
                                this.playerStats.goals++;
                                this.playerStats.shots++;
                                return this.checkGoalCommentary(`FÜZE VE GOOOL! Şut kalitenle (%${sho}) 25 metreden çıkardığın füze 90'da örümcek ağlarını aldı! BÜYÜLEYİCİ BİR GOL!`);
                            },
                            onFail: () => {
                                this.playerStats.shots++;
                                return `Şut yeteneğin (%${sho}) bu mesafeden kaleyi bulmaya yetmedi, top auta çıktı.`;
                            }
                        },
                        {
                            text: `⚽ Çalımla Savunmayı Üzerine Çek`,
                            effect: `Dribbling (%${dri}) yeteneğine bağlı.`,
                            successChance: this.calculateStatSuccess(dri, "mid"),
                            onSuccess: () => {
                                this.score.player++;
                                this.playerStats.assists++;
                                this.playerStats.passes++;
                                return `BÜYÜCÜ! Dribbling yeteneğinle (%${dri}) iki orta saha oyuncusundan sıyrılıp ceza sahasına girdin ve arkadaşına boş pas çıkardın! ASİST!`;
                            },
                            onFail: () => {
                                return `Dribbling seviyen (%${dri}) yetersiz kaldı, rakip topu kaptı.`;
                            }
                        }
                    ]
                },
                // 1: Long Range Screamer
                {
                    title: "🚀 28 Metreden 90'a Füze Gönderme Fırsatı",
                    description: "Ceza sahası yayının 5 metre gerisinde önün bomboş kaldı! Kaleci hafif önde.",
                    options: [
                        {
                            text: `🚀 Kaleci Köşesine Sert Füze Çak!`,
                            effect: `Şut (%${sho}) gücüne bağlı gol şansı.`,
                            successChance: this.calculateStatSuccess(sho, "def"),
                            onSuccess: () => {
                                this.score.player++;
                                this.playerStats.goals++;
                                this.playerStats.shots++;
                                return this.checkGoalCommentary(`İNANILMAZ GOL! Şut gücünle (%${sho}) 28 metreden çaktığın füze elleri bükerek filelere girdi! GOOOL!`);
                            },
                            onFail: () => {
                                this.playerStats.shots++;
                                return `Şut yeteneğin (%${sho}) yetersiz kaldı, top kalecinin kucağına gitti.`;
                            }
                        },
                        {
                            text: `💫 90'a Kavisli Plase Gönder`,
                            effect: `Şut ve Pas ortalamasına (%${Math.round((sho+pas)/2)}) bağlı.`,
                            successChance: this.calculateStatSuccess((sho + pas) / 2, "def"),
                            onSuccess: () => {
                                this.score.player++;
                                this.playerStats.goals++;
                                this.playerStats.shots++;
                                return this.checkGoalCommentary(`MÜTHİŞ BİR PLASE! Top çataldan süzülerek içeri girdi! GOOOL!`);
                            },
                            onFail: () => {
                                this.playerStats.shots++;
                                return `Plase vuruşun az farkla dışarı gitti.`;
                            }
                        },
                        {
                            text: `👟 ${teammate}'ye Pası Aktar`,
                            effect: `Pas (%${pas}) yeteneğine bağlı asist şansı.`,
                            successChance: this.calculateStatSuccess(pas, "def"),
                            onSuccess: () => {
                                this.score.player++;
                                this.playerStats.assists++;
                                this.playerStats.passes++;
                                return `MÜKEMMEL ASİST! Pas kalitenle (%${pas}) topu ${teammate}'nin önüne bıraktın, gelişine vurup golü yaptı!`;
                            },
                            onFail: () => {
                                this.playerStats.passes++;
                                return `Pasın biraz yavaş kaldı.`;
                            }
                        }
                    ]
                },
                // 2: Close Control Dribble
                {
                    title: "⚽ Dar Alanda 3 Kişinin Arasından Top Saklayıp Çıkış",
                    description: "Orta alanda 3 rakip oyuncu birden etrafını sardı! Ne yapacaksın?",
                    options: [
                        {
                            text: `⚽ Zidane Dönüşüyle Baskıdan Sıyrıl`,
                            effect: `Dribbling (%${dri}) yeteneğine bağlı.`,
                            successChance: this.calculateStatSuccess(dri, "mid"),
                            onSuccess: () => {
                                this.playerStats.passes++;
                                return `FUTBOL SANATI! Dribbling yeteneğinle (%${dri}) harika bir 360 dönüşü yapıp 3 kişinin arasından tertemiz çıktın!`;
                            },
                            onFail: () => {
                                return `Dribbling seviyen (%${dri}) dar alanda yetersiz kaldı, topu kaptırdın.`;
                            }
                        },
                        {
                            text: `💪 Vücudunu Koyup Faul Al`,
                            effect: `Fizik (%${phy}) gücüne bağlı.`,
                            successChance: this.calculateStatSuccess(phy, "mid"),
                            onSuccess: () => {
                                return `AKIL DOLU OYUN! Fizik gücünle (%${phy}) topu saklayıp rakibe faul yaptırdın, takım nefes aldı!`;
                            },
                            onFail: () => {
                                return `Fizik gücün (%${phy}) yetmedi, dengeni kaybedip topu kaybettin.`;
                            }
                        },
                        {
                            text: `👟 Tek Dokunuşla Geriye Garanti Pas Çıkar`,
                            effect: `Pas (%${pas}) yeteneğine bağlı emniyet.`,
                            successChance: this.calculateStatSuccess(pas, "mid"),
                            onSuccess: () => {
                                this.playerStats.passes++;
                                return `EMNİYETLİ OYUN! Tek dokunuşla geriye oynayarak takımı baskıdan kurtardın.`;
                            },
                            onFail: () => {
                                this.playerStats.passes++;
                                return `Pas biraz hızlı gitti.`;
                            }
                        }
                    ]
                },
                // 3: Midfield Ball Recovery
                {
                    title: "🛡️ Orta Alanda Şok Pres & Top Kapma",
                    description: "Rakip oyun kurucu orta sahada topla dönmeye çalışıyor. Hemen ensesindesin!",
                    options: [
                        {
                            text: `🛡️ Rakip Oyun Kurucudan Topu Söküp Al`,
                            effect: `Savunma (%${def}) yeteneğine bağlı kontra başlangıcı.`,
                            successChance: this.calculateStatSuccess(def, "mid"),
                            onSuccess: () => {
                                this.playerStats.passes++;
                                return `MÜTHİŞ TOP KAPMA! Savunma müdahalenle (%${def}) topu kapıp takımı 3'e 2 kontra atağa kaldırdın!`;
                            },
                            onFail: () => {
                                return `Savunma hamlen (%${def}) boşa gitti, rakip pasını çıkardı.`;
                            }
                        },
                        {
                            text: `👟 Topu Kapıp Tek Pasla ${teammate}'yi Kaçır`,
                            effect: `Pas (%${pas}) ve Savunma ortalamasına (%${Math.round((def+pas)/2)}) bağlı asist.`,
                            successChance: this.calculateStatSuccess((def + pas) / 2, "def"),
                            onSuccess: () => {
                                this.score.player++;
                                this.playerStats.assists++;
                                this.playerStats.passes++;
                                return `KUSURSUZ SERVİS! Topu kapar kapmaz tek dokunuşla ${teammate}'yi kaçırdın, içeri girip golü attı! ASİST!`;
                            },
                            onFail: () => {
                                this.playerStats.passes++;
                                return `Hızlı pas denemen savunmada kaldı.`;
                            }
                        },
                        {
                            text: `⚡ Çeviklikle Topu Saklayıp Oyunu Ters Kanada Aç`,
                            effect: `Hız ve Pas ortalamasına (%${Math.round((spe+pas)/2)}) bağlı.`,
                            successChance: this.calculateStatSuccess((spe + pas) / 2, "mid"),
                            onSuccess: () => {
                                this.playerStats.passes++;
                                return `DİNAMİK OYUN! Hızın ve pasınla oyunu anında ters kanada açtın!`;
                            },
                            onFail: () => {
                                this.playerStats.passes++;
                                return `Pas alçak gitti.`;
                            }
                        }
                    ]
                },
                // 4: Diagonal Switch
                {
                    title: "⚡ 40 Metrelik Ters Kanat Açılışı",
                    description: "Sol kanatta sıkıştık, sağ kanattaki boş arkadaşımız tek başına bekliyor!",
                    options: [
                        {
                            text: `⚡ Ters Kanattaki Boş Arkadaşa Diyagonal Pas Çıkar`,
                            effect: `Pas ve Hız ortalamasına (%${Math.round((pas+spe)/2)}) bağlı.`,
                            successChance: this.calculateStatSuccess((pas + spe) / 2, "def"),
                            onSuccess: () => {
                                this.playerStats.passes++;
                                return `MAESTRO VİZYONU! 40 metrelik milimetrik ters kanat pasınla (%${Math.round((pas+spe)/2)}) rakip savunmanın dengesini alt üst ettin!`;
                            },
                            onFail: () => {
                                this.playerStats.passes++;
                                return `Ters kanat pasın (%${pas}) biraz alçak gitti ve savunmada kaldı.`;
                            }
                        },
                        {
                            text: `🎯 Yerden Hızlı Dikine Pas Yolla`,
                            effect: `Pas (%${pas}) yeteneğine bağlı.`,
                            successChance: this.calculateStatSuccess(pas, "mid"),
                            onSuccess: () => {
                                this.playerStats.passes++;
                                return `DİKİNE HARİKA PAS! Yerden dikine pasla forvetimizi buluşturdun!`;
                            },
                            onFail: () => {
                                this.playerStats.passes++;
                                return `Dikine pasın kesildi.`;
                            }
                        },
                        {
                            text: `⚽ Topla Orta Sahayı Boydan Boya Katet`,
                            effect: `Dribbling (%${dri}) yeteneğine bağlı topla ilerleme.`,
                            successChance: this.calculateStatSuccess(dri, "mid"),
                            onSuccess: () => {
                                this.playerStats.passes++;
                                return `MÜTHİŞ DRİPLİNG! Topla 30 metre mesafe kat edip tehlike bölgesine girdin!`;
                            },
                            onFail: () => {
                                return `Dribbling yaparken rakip ayak koydu.`;
                            }
                        }
                    ]
                },
                // 5: Box to Box Engine
                {
                    title: "💪 Box-to-Box 90 Metrelik Depar ve Hücum Desteği",
                    description: "Kendi ceza sahamızdan başlayan kontratakta 90 metre depar atıp rakip ceza sahasına girdin!",
                    options: [
                        {
                            text: `💪 Dönen Topa Gelişine Vur!`,
                            effect: `Fizik ve Şut ortalamasına (%${Math.round((phy+sho)/2)}) bağlı gol şansı.`,
                            successChance: this.calculateStatSuccess((phy + sho) / 2, "def"),
                            onSuccess: () => {
                                this.score.player++;
                                this.playerStats.goals++;
                                this.playerStats.shots++;
                                return this.checkGoalCommentary(`CİĞERSİZ BOX-TO-BOX GOLÜ! 90 metrelik koşunun ardından dönen topa gelişine çaktın ve ağlar havalandı! GOOOL!`);
                            },
                            onFail: () => {
                                this.playerStats.shots++;
                                return `Koşunun ardından nefesin yetmedi (%${phy}), vuruşun auta gitti.`;
                            }
                        },
                        {
                            text: `👟 İkinci Dalga Hücumunda Arkadaşına Boş Pas Çıkar`,
                            effect: `Pas (%${pas}) yeteneğine bağlı asist.`,
                            successChance: this.calculateStatSuccess(pas, "def"),
                            onSuccess: () => {
                                this.score.player++;
                                this.playerStats.assists++;
                                this.playerStats.passes++;
                                return `HARİKA İKİNCİ DALGA ASİSTİ! Ceza sahası yayında arkadaşını gördün, plaseyle golü attı! ASİST!`;
                            },
                            onFail: () => {
                                this.playerStats.passes++;
                                return `Pasın arkada kaldı.`;
                            }
                        },
                        {
                            text: `🛡️ Savunma Emniyeti İçin Yayda Bekle`,
                            effect: `Fizik ve Savunma ortalamasına (%${Math.round((phy+def)/2)}) bağlı.`,
                            successChance: this.calculateStatSuccess((phy + def) / 2, "mid"),
                            onSuccess: () => {
                                return `DÖNEN TOPU TOPLADIN! İkinci topu kazanıp atağın devam etmesini sağladın!`;
                            },
                            onFail: () => {
                                return `Dönen top rakipte kaldı.`;
                            }
                        }
                    ]
                },
                // 6: Setpiece Maestro
                {
                    title: "📐 Ceza Sahası Yayı Dışı Frikik Ustalığı",
                    description: "26 metreden kritik bir serbest vuruş kazandık. Baraj kuruldu, topun başında maestro sensin!",
                    options: [
                        {
                            text: `💫 Baraj Üstünden 90'a Kavisli Plase`,
                            effect: `Pas ve Şut ortalamasına (%${Math.round((pas+sho)/2)}) bağlı frikik golü.`,
                            successChance: this.calculateStatSuccess((pas + sho) / 2, "def"),
                            onSuccess: () => {
                                this.score.player++;
                                this.playerStats.goals++;
                                this.playerStats.shots++;
                                return this.checkGoalCommentary(`MÜTHİŞ FRİKİK GOLÜ! Barajın üzerinden süzülen falsolu top tam 90'a asıldı! Kaleci kımıldayamadı! GOOOL!`);
                            },
                            onFail: () => {
                                this.playerStats.shots++;
                                return `Frikik vuruşun (%${sho}) baraja takıldı.`;
                            }
                        },
                        {
                            text: `📐 Arka Direğe Kavisli Asist Ortası Kes`,
                            effect: `Pas (%${pas}) yeteneğine bağlı asist ortası.`,
                            successChance: this.calculateStatSuccess(pas, "def"),
                            onSuccess: () => {
                                this.score.player++;
                                this.playerStats.assists++;
                                this.playerStats.passes++;
                                return `ADRESE TESLİM ORTA! Arka direğe kestiğin kavisli ortaya stoperimiz kafayı çaktı ve GOOOL! ASİST!`;
                            },
                            onFail: () => {
                                this.playerStats.passes++;
                                return `Orta kalecinin ellerinde eridi.`;
                            }
                        },
                        {
                            text: `🧲 Baraj Altından Zekice Yerden Şut`,
                            effect: `Pas ve Şut ortalamasına (%${Math.round((pas+sho)/2)}) bağlı.`,
                            successChance: this.calculateStatSuccess((pas + sho) / 2, "def"),
                            onSuccess: () => {
                                this.score.player++;
                                this.playerStats.goals++;
                                this.playerStats.shots++;
                                return this.checkGoalCommentary(`AKIL DOLU GOL! Baraj zıplarken yerden giden top direk dibinden ağlarla buluştu! GOOOL!`);
                            },
                            onFail: () => {
                                this.playerStats.shots++;
                                return `Baraj zıplamadı, top ayaklarda kaldı.`;
                            }
                        }
                    ]
                },
                // Authentic Turkish Derby Corner
                {
                    title: "Deplasman Cehennemi: Kalkan Korumasında Korner",
                    description: "Tribünlerden sahaya çakmak ve bozuk para yağıyor! Çevik kuvvet polisleri korner bayrağında üstünüze kalkan tutuyor. Kritik bir duran top!",
                    options: [
                        {
                            text: "Kalkanın Arkasından Ön Direğe Sert Kavisli Kes",
                            effect: "Pas yeteneğine bağlı asist ortası.",
                            successChance: this.calculateStatSuccess(pas, "def"),
                            onSuccess: () => {
                                this.score.player++;
                                this.playerStats.assists++;
                                this.playerStats.passes++;
                                return `CEHENNEMDE MUAZZAM ASİST! Yağan yabancı maddelere rağmen ön direğe kestiğin harika ortaya forvetimiz kafayı vurdu ve GOOOL! ASİST!`;
                            },
                            onFail: () => {
                                this.playerStats.passes++;
                                return `Yoğun tribün baskısı altında yapılan orta savunmadan döndü.`;
                            }
                        },
                        {
                            text: "Kısa Pasla Arkadaşınla Verkaça Girip İçeri Kat Et",
                            effect: "Dribbling ve Pas ile ceza sahasına sızma.",
                            successChance: this.calculateStatSuccess((dri + pas) / 2, "def"),
                            onSuccess: () => {
                                this.score.player++;
                                this.playerStats.goals++;
                                this.playerStats.shots++;
                                return this.checkGoalCommentary(`ŞAHANE BİREYSEL BECERİ! Kısa pasla oyunu başlatıp çizgiden içeri sıyrıldın ve dar açıdan fileleri havalandırdın! GOOOL!`);
                            },
                            onFail: () => {
                                this.playerStats.dribbles++;
                                return `Verkaç sonrası rakip kademe topu taca yolladı.`;
                            }
                        },
                        {
                            text: "Tribünlere 'Sakin Olun' İşareti Yapıp Arka Direğe As",
                            effect: "Soğukkanlılıkla arka direğe yüksek top.",
                            successChance: this.calculateStatSuccess((pas + phy) / 2, "def"),
                            onSuccess: () => {
                                this.score.player++;
                                this.playerStats.assists++;
                                this.playerStats.passes++;
                                return `KUSURSUZ SOĞUKKANLILIK! Tribünleri susturan mükemmel bir arka direk ortası ve kafa vuruşuyla GOOOL! ASİST!`;
                            },
                            onFail: () => {
                                this.playerStats.passes++;
                                return `Yüksekten giden orta kalecinin ellerinde kaldı.`;
                            }
                        }
                    ]
                },

                // 7: Tiki Taka Link
                {
                    title: "👟 Tek Topla Verkaç ve Ceza Sahasına Sızma",
                    description: `${teammate} ile ceza sahası önünde hızlı tek paslaşmalar yapıyorsunuz.`,
                    options: [
                        {
                            text: `👟 Hızlı Verkaçla Kaleciyle Karşı Karşıya Kal`,
                            effect: `Pas ve Dribbling ortalamasına (%${Math.round((pas+dri)/2)}) bağlı gol.`,
                            successChance: this.calculateStatSuccess((pas + dri) / 2, "def"),
                            onSuccess: () => {
                                this.score.player++;
                                this.playerStats.goals++;
                                this.playerStats.shots++;
                                return this.checkGoalCommentary(`TIKI-TAKA GOLÜ! Tek paslarla savunmayı delip kaleciyle karşı karşıya golü bıraktın! GOOOL!`);
                            },
                            onFail: () => {
                                this.playerStats.shots++;
                                return `Verkaçın son pası biraz hızlı kaçtı (%${pas}).`;
                            }
                        },
                        {
                            text: `🎯 Tek Pasla Forvete Gol Pası Bırak`,
                            effect: `Pas (%${pas}) yeteneğine bağlı asist.`,
                            successChance: this.calculateStatSuccess(pas, "def"),
                            onSuccess: () => {
                                this.score.player++;
                                this.playerStats.assists++;
                                this.playerStats.passes++;
                                return `ZARİF ASİST! Topukla bıraktığın topta forvet golü attı! ASİST!`;
                            },
                            onFail: () => {
                                this.playerStats.passes++;
                                return `Pas savunmada kaldı.`;
                            }
                        },
                        {
                            text: `🚀 Ceza Sahası Yayından Gelişine Sert Şut Çek`,
                            effect: `Şut (%${sho}) yeteneğine bağlı.`,
                            successChance: this.calculateStatSuccess(sho, "def"),
                            onSuccess: () => {
                                this.score.player++;
                                this.playerStats.goals++;
                                this.playerStats.shots++;
                                return this.checkGoalCommentary(`MÜTHİŞ ŞUT VE GOL! Yaydan sert vuruşla köşeyi buldun! GOOOL!`);
                            },
                            onFail: () => {
                                this.playerStats.shots++;
                                return `Şut kalecide kaldı.`;
                            }
                        }
                    ]
                },
                // 8: Last Minute Volley (90th min)
                {
                    title: "⚡ 90. Dakika Dönen Topa Gelişine Vole",
                    description: "90. dakika! Savunmadan seken top ceza sahası dışına, tam önüne doğru süzülüyor!",
                    options: [
                        {
                            text: `🚀 Gelişine Voleyle 90'a Çak!`,
                            effect: `Şut (%${sho}) yeteneğine bağlı son saniye galibiyet golü.`,
                            successChance: this.calculateStatSuccess(sho, "def"),
                            onSuccess: () => {
                                this.score.player++;
                                this.playerStats.goals++;
                                this.playerStats.shots++;
                                return this.checkGoalCommentary(`YILIN GOLÜ! 90. dakikada ceza sahası dışından gelişine vurduğun vole ağları deldi! GOOOL! STAT YIKILIYOR!`);
                            },
                            onFail: () => {
                                this.playerStats.shots++;
                                return `Vole vuruşun (%${sho}) üst direği sıyırarak auta gitti.`;
                            }
                        },
                        {
                            text: `🎯 Ceza Sahasına ${teammate}'nin Koşusuna Aşırtma Pas At`,
                            effect: `Pas (%${pas}) yeteneğine bağlı son saniye asisti.`,
                            successChance: this.calculateStatSuccess(pas, "def"),
                            onSuccess: () => {
                                this.score.player++;
                                this.playerStats.assists++;
                                this.playerStats.passes++;
                                return `SON SANİYE ASİSTİ! Defans arkasına aşırdığın topta ${teammate} gelişine vurdu ve GOOOL! MAÇ BİZİM!`;
                            },
                            onFail: () => {
                                this.playerStats.passes++;
                                return `Aşırtma pasın savunmada kaldı.`;
                            }
                        },
                        {
                            text: `⚽ Topu Bayrak Direğinde Saklayıp Zaman Geçir`,
                            effect: `Dribbling ve Fizik ortalamasına (%${Math.round((dri+phy)/2)}) bağlı.`,
                            successChance: this.calculateStatSuccess((dri + phy) / 2, "mid"),
                            onSuccess: () => {
                                this.playerState.hocaGuveni = Math.min(100, (this.playerState.hocaGuveni || 40) + 5);
                                this.playerState.moral = Math.min(100, (this.playerState.moral || 100) + 5);
                                return `USTACA ZAMAN GEÇİRME! Topu bayrak direğinde saklayıp maçı bitirdin!`;
                            },
                            onFail: () => {
                                return `Top taca çıktı.`;
                            }
                        }
                    ]
                },
                // 9: Tempo Control
                {
                    title: "⏱️ Korner Bayrağında Top Saklayıp Maçı Kilitleme",
                    description: "Son dakikalarda 1 farklı öndeyiz. Top ayağında, korner bayrağına yakınsın.",
                    options: [
                        {
                            text: `⏱️ Vücudunla Topu Koruyup Rakibe Faul Yaptır`,
                            effect: `Dribbling ve Fizik ortalamasına (%${Math.round((dri+phy)/2)}) bağlı.`,
                            successChance: this.calculateStatSuccess((dri + phy) / 2, "mid"),
                            onSuccess: () => {
                                this.playerState.hocaGuveni = Math.min(100, (this.playerState.hocaGuveni || 40) + 5);
                                this.playerState.moral = Math.min(100, (this.playerState.moral || 100) + 5);
                                return `USTACA ZAMAN GEÇİRME! Topu bayrak direğinde 2 dakika sakladın (%${Math.round((dri+phy)/2)}), rakip sinirlenip faul yaptı. Maç bitti! Hoca alkışlıyor!`;
                            },
                            onFail: () => {
                                return `İki kişi bastırdı ve top taca gitti.`;
                            }
                        },
                        {
                            text: `👟 Boştaki ${teammate}'ye Pas Çıkar`,
                            effect: `Pas (%${pas}) yeteneğine bağlı.`,
                            successChance: this.calculateStatSuccess(pas, "mid"),
                            onSuccess: () => {
                                this.playerStats.passes++;
                                return `GÜVENLİ PAS! Topu geriye oynayarak süreyi erittin.`;
                            },
                            onFail: () => {
                                this.playerStats.passes++;
                                return `Pas taca gitti.`;
                            }
                        },
                        {
                            text: `⚡ Çalımla İçeri Kat Edip Şut Açısı Ara`,
                            effect: `Dribbling ve Hız ortalamasına (%${Math.round((dri+spe)/2)}) bağlı.`,
                            successChance: this.calculateStatSuccess((dri + spe) / 2, "def"),
                            onSuccess: () => {
                                this.score.player++;
                                this.playerStats.goals++;
                                this.playerStats.shots++;
                                return this.checkGoalCommentary(`MÜTHİŞ ÇALIM VE GOL! Korner bayrağından içeri kat edip 90'a astın! GOOOL!`);
                            },
                            onFail: () => {
                                this.playerStats.shots++;
                                return `Çalım sırasında top dışarı çıktı.`;
                            }
                        }
                    ]
                }
            ];

            let pool = midScenarios;
            let chosenIndex = 0;
            if (isLastMinute) {
                chosenIndex = 8; // 90th min volley
            } else {
                let available = [0, 1, 2, 3, 4, 5, 6, 7, 9].filter(i => !this.usedScenarioIndices.includes(i));
                if (available.length === 0) available = [0, 1, 2, 3, 4, 5, 6, 7];
                chosenIndex = available[Math.floor(Math.random() * available.length)];
            }
            this.usedScenarioIndices.push(chosenIndex);
            choiceData = pool[chosenIndex];

        } else {
            // ==================== FORVET (10 FARKLI SENARYO - HER BİRİ 3 SEÇENEKLİ) ====================
            const fwdScenarios = [
                // 0: Box Finishing
                {
                    title: "🎯 Kaleciyle Karşı Karşıya Soğukkanlı Plase",
                    description: "Ceza sahası içinde topla buluştun, kaleci açıyı daraltmak için üstüne geliyor! Nereye vuracaksın?",
                    options: [
                        {
                            text: `🎯 Kalecinin Yanından Uzak Köşeye Plase`,
                            effect: `Şut (%${sho}) vs Rakip Kaleci/Defans.`,
                            successChance: this.calculateStatSuccess(sho, "def"),
                            onSuccess: () => {
                                this.score.player++;
                                this.playerStats.goals++;
                                this.playerStats.shots++;
                                return this.checkGoalCommentary(`KLAS GOL! Şut yeteneğinle (%${sho}) kalecinin uzanamayacağı köşeye pürüzsüz bir plase bıraktın! GOOOL!`);
                            },
                            onFail: () => {
                                this.playerStats.shots++;
                                return `Şut kaliten (%${sho}) kaleciyi geçmeye yetmedi, uzanarak topu çeldi.`;
                            }
                        },
                        {
                            text: `🚀 Tavana Sert Şut Zımbala`,
                            effect: `Şut (%${sho}) gücüne bağlı sert vuruş.`,
                            successChance: this.calculateStatSuccess(sho, "def"),
                            onSuccess: () => {
                                this.score.player++;
                                this.playerStats.goals++;
                                this.playerStats.shots++;
                                return this.checkGoalCommentary(`FÜZE VE GOOOL! Tavana öyle sert vurdun ki (%${sho}) kalecinin elleri büküldü! GOOOL!`);
                            },
                            onFail: () => {
                                this.playerStats.shots++;
                                return `Şutun (%${sho}) üst direğe çarpıp auta gitti!`;
                            }
                        },
                        {
                            text: `👟 Boş Koşan ${teammate}'ye Pas Çıkar`,
                            effect: `Pas (%${pas}) yeteneğine bağlı asist.`,
                            successChance: this.calculateStatSuccess(pas, "def"),
                            onSuccess: () => {
                                this.score.player++;
                                this.playerStats.assists++;
                                this.playerStats.passes++;
                                return `CÖMERT ASİST! Pas kalitenle (%${pas}) boş kaleye yuvarladın, ${teammate} golü attı! ASİST!`;
                            },
                            onFail: () => {
                                this.playerStats.passes++;
                                return `Pas denemen biraz kısa kaldı.`;
                            }
                        }
                    ]
                },
                // 1: Counter Sprint
                {
                    title: "⚡ Savunma Arkasına Patlayıcı Depar",
                    description: "Savunma arkasına atılan derin topta stoperlerle yarışa girdin!",
                    options: [
                        {
                            text: `⚡ Stoperleri Rüzgarınla Geçip Kaleciyle Baş Başa Kal`,
                            effect: `Hız (%${spe}) yeteneğine bağlı.`,
                            successChance: this.calculateStatSuccess(spe, "def"),
                            onSuccess: () => {
                                this.score.player++;
                                this.playerStats.goals++;
                                this.playerStats.shots++;
                                return this.checkGoalCommentary(`MÜTHİŞ DEPAR VE GOL! Hızınla (%${spe}) stoperleri geride bıraktın ve kaleciyi avladın! GOOOL!`);
                            },
                            onFail: () => {
                                this.playerStats.shots++;
                                return `Hızın (%${spe}) yetersiz kaldı! Stoper arkadan yetişip topu kornere yolladı.`;
                            }
                        },
                        {
                            text: `⚽ Kaleciyi Çalımla Geçip Boş Kaleye Yuvarla`,
                            effect: `Dribbling (%${dri}) yeteneğine bağlı gol.`,
                            successChance: this.calculateStatSuccess(dri, "def"),
                            onSuccess: () => {
                                this.score.player++;
                                this.playerStats.goals++;
                                this.playerStats.shots++;
                                return this.checkGoalCommentary(`NEFİS ÇALIM VE GOL! Dribbling yeteneğinle (%${dri}) kaleciyi yatırıp topu boş ağlara yolladın! GOOOL!`);
                            },
                            onFail: () => {
                                this.playerStats.shots++;
                                return `Çalım denerken kaleci ayağındaki topu kaptı.`;
                            }
                        },
                        {
                            text: `👟 Boş Kanat Arkadaşına Pas Çıkar`,
                            effect: `Pas (%${pas}) yeteneğine bağlı asist.`,
                            successChance: this.calculateStatSuccess(pas, "def"),
                            onSuccess: () => {
                                this.score.player++;
                                this.playerStats.assists++;
                                this.playerStats.passes++;
                                return `HARİKA VİZYON! Kanattaki arkadaşına çıkardığın topta gol geldi! ASİST!`;
                            },
                            onFail: () => {
                                this.playerStats.passes++;
                                return `Pas savunmada kaldı.`;
                            }
                        }
                    ]
                },
                // 2: Wing Dribble
                {
                    title: "⚽ Beki Çalımla Pazara Gönderme ve Ceza Sahasına Sızma",
                    description: "Sol kanatta topla buluştun, rakip sağ bek önünü kapatıyor.",
                    options: [
                        {
                            text: `⚽ Bacak Arası Çalımla Beki Ekarte Et`,
                            effect: `Dribbling (%${dri}) yeteneğine bağlı.`,
                            successChance: this.calculateStatSuccess(dri, "def"),
                            onSuccess: () => {
                                this.score.player++;
                                this.playerStats.goals++;
                                this.playerStats.shots++;
                                return this.checkGoalCommentary(`BÜYÜLEYİCİ ÇALIM! Beki bacak arasıyla (%${dri}) geçip çaprazdan ağları sarstın! GOOOL!`);
                            },
                            onFail: () => {
                                this.playerStats.shots++;
                                return `Dribbling seviyen (%${dri}) yetersiz kaldı, bek ayak koydu.`;
                            }
                        },
                        {
                            text: `🎯 Çizgiye İnip Arka Direğe Orta Kes`,
                            effect: `Pas (%${pas}) yeteneğine bağlı asist.`,
                            successChance: this.calculateStatSuccess(pas, "def"),
                            onSuccess: () => {
                                this.score.player++;
                                this.playerStats.assists++;
                                this.playerStats.passes++;
                                return `ADRESE TESLİM ORTA! Arka direkteki arkadaşın kafayla golü yaptı! ASİST!`;
                            },
                            onFail: () => {
                                this.playerStats.passes++;
                                return `Orta doğrudan kalecide kaldı.`;
                            }
                        },
                        {
                            text: `🚀 Çaprazdan Sert Şut Çek`,
                            effect: `Şut (%${sho}) yeteneğine bağlı.`,
                            successChance: this.calculateStatSuccess(sho, "def"),
                            onSuccess: () => {
                                this.score.player++;
                                this.playerStats.goals++;
                                this.playerStats.shots++;
                                return this.checkGoalCommentary(`ÇAPRAZDAN FÜZE! Dar açıdan harika vuruşla golü buldun! GOOOL!`);
                            },
                            onFail: () => {
                                this.playerStats.shots++;
                                return `Şut yan ağlarda kaldı.`;
                            }
                        }
                    ]
                },
                // 3: Towering Header
                {
                    title: "✈️ Yan Ortada Stoperin Üzerinden Kafa Golü",
                    description: "Kanattan ceza sahasına harika bir orta kesildi! Stoperle birlikte kafaya yükseliyorsun!",
                    options: [
                        {
                            text: `✈️ Havada Asılı Kalıp Köşeye Kafa Vur`,
                            effect: `Fizik (%${phy}) ve hava hakimiyetine bağlı kafa golü.`,
                            successChance: this.calculateStatSuccess(phy, "def"),
                            onSuccess: () => {
                                this.score.player++;
                                this.playerStats.goals++;
                                this.playerStats.shots++;
                                return this.checkGoalCommentary(`RONALDO GİBİ ASILI KALDI! Fizik gücünle (%${phy}) havada asılı kalıp köşeye füze gibi kafa golü attın! GOOOL!`);
                            },
                            onFail: () => {
                                this.playerStats.shots++;
                                return `Hava mücadelesinde fizik gücün (%${phy}) yetmedi, topa kafayı vuramadın.`;
                            }
                        },
                        {
                            text: `👟 Kafayla İndirip ${teammate}'ye Servis Yap`,
                            effect: `Pas ve Fizik ortalamasına (%${Math.round((pas+phy)/2)}) bağlı asist.`,
                            successChance: this.calculateStatSuccess((pas + phy) / 2, "def"),
                            onSuccess: () => {
                                this.score.player++;
                                this.playerStats.assists++;
                                this.playerStats.passes++;
                                return `AKIL DOLU İNDİRİŞ! Kafayla indirdiğin topta ${teammate} gelişine vurup golü attı! ASİST!`;
                            },
                            onFail: () => {
                                this.playerStats.passes++;
                                return `İndirdiğin top savunmada kaldı.`;
                            }
                        },
                        {
                            text: `🦶 Ayağını Uzatıp Uçarak Dokun`,
                            effect: `Hız ve Şut ortalamasına (%${Math.round((spe+sho)/2)}) bağlı.`,
                            successChance: this.calculateStatSuccess((spe + sho) / 2, "def"),
                            onSuccess: () => {
                                this.score.player++;
                                this.playerStats.goals++;
                                this.playerStats.shots++;
                                return this.checkGoalCommentary(`UÇARAK DOKUNDUN VE GOL! Son anda ayağını uzatıp kaleciyi avladın! GOOOL!`);
                            },
                            onFail: () => {
                                this.playerStats.shots++;
                                return `Topa dokunamadın.`;
                            }
                        }
                    ]
                },
                // 4: Target Man Wall
                {
                    title: "👟 Sırtı Dönük Duvar Olup Kanat Arkadaşına Servis",
                    description: "Stoper arkandan baskı yaparken ceza sahası yayında topu sırtınla sakladın.",
                    options: [
                        {
                            text: `👟 Topu Saklayıp Kaçan ${teammate}'ye Tek Pas Bırak`,
                            effect: `Pas ve Fizik ortalamasına (%${Math.round((pas+phy)/2)}) bağlı asist.`,
                            successChance: this.calculateStatSuccess((pas + phy) / 2, "def"),
                            onSuccess: () => {
                                this.score.player++;
                                this.playerStats.assists++;
                                this.playerStats.passes++;
                                return `KUSURSUZ SERVİS! Topu saklayıp (${Math.round((pas+phy)/2)}) tek pasla ${teammate}'yi gördün, gelişine gol! ASİST!`;
                            },
                            onFail: () => {
                                this.playerStats.passes++;
                                return `Stoper arkandan yüklendi (%${phy}), pasın kısa kaldı.`;
                            }
                        },
                        {
                            text: `⚽ Ani Dönüşle Stoperi Oyundan Düşür ve Vur`,
                            effect: `Dribbling ve Şut ortalamasına (%${Math.round((dri+sho)/2)}) bağlı gol.`,
                            successChance: this.calculateStatSuccess((dri + sho) / 2, "def"),
                            onSuccess: () => {
                                this.score.player++;
                                this.playerStats.goals++;
                                this.playerStats.shots++;
                                return this.checkGoalCommentary(`MÜTHİŞ DÖNÜŞ VE GOL! Dribbling ustalığınla (%${dri}) stoperin etrafından dönüp köşeyi buldun! GOOOL!`);
                            },
                            onFail: () => {
                                this.playerStats.shots++;
                                return `Dönüş sırasında stoper ayak koydu.`;
                            }
                        },
                        {
                            text: `💪 Stoperden Faul Alıp Duran Top Kazandır`,
                            effect: `Fizik (%${phy}) gücüne bağlı.`,
                            successChance: this.calculateStatSuccess(phy, "def"),
                            onSuccess: () => {
                                return `AKILLI FAUL ALMA! Topu vücudunla saklayıp tehlikeli noktadan serbest vuruş kazandırdın!`;
                            },
                            onFail: () => {
                                return `Hakem devam kararı verdi.`;
                            }
                        }
                    ]
                },
                // 5: Audacious Chip
                {
                    title: "🚀 Kalecinin Öne Çıktığını Görüp Şık Aşırtma",
                    description: "Kalecinin 5 metre öne çıktığını fark ettin! Ceza sahası yayındasın.",
                    options: [
                        {
                            text: `🚀 Kalecinin Üzerinden Aşırtma Vur`,
                            effect: `Şut ve Pas ortalamasına (%${Math.round((sho+pas)/2)}) bağlı aşırtma golü.`,
                            successChance: this.calculateStatSuccess((sho + pas) / 2, "def"),
                            onSuccess: () => {
                                this.score.player++;
                                this.playerStats.goals++;
                                this.playerStats.shots++;
                                return this.checkGoalCommentary(`ŞAPKA ÇIKARTILIR! Kalecinin üzerinden süzülen aşırtma top direğin dibinden ağlarla buluştu! EFSANE GOL!`);
                            },
                            onFail: () => {
                                this.playerStats.shots++;
                                return `Aşırtma vuruşun (%${sho}) az farkla üst direkten auta çıktı.`;
                            }
                        },
                        {
                            text: `🎯 Yerden Sert ve İsabetli Vur`,
                            effect: `Şut (%${sho}) yeteneğine bağlı.`,
                            successChance: this.calculateStatSuccess(sho, "def"),
                            onSuccess: () => {
                                this.score.player++;
                                this.playerStats.goals++;
                                this.playerStats.shots++;
                                return this.checkGoalCommentary(`GOOOL! Yerden köşeye sert vuruşla kaleciyi ters köşe yaptın!`);
                            },
                            onFail: () => {
                                this.playerStats.shots++;
                                return `Şutun kalecide kaldı.`;
                            }
                        },
                        {
                            text: `⚽ Kaleciyi Çalımla Yatırıp Boş Kaleye Yuvarla`,
                            effect: `Dribbling (%${dri}) yeteneğine bağlı.`,
                            successChance: this.calculateStatSuccess(dri, "def"),
                            onSuccess: () => {
                                this.score.player++;
                                this.playerStats.goals++;
                                this.playerStats.shots++;
                                return this.checkGoalCommentary(`SOĞUKKANLI ÇALIM VE GOL! Kaleciyi yere yatırıp boş kaleye yuvarladın! GOOOL!`);
                            },
                            onFail: () => {
                                this.playerStats.shots++;
                                return `Kaleci ayağını uzatıp topu kaptı.`;
                            }
                        }
                    ]
                },
                // 6: Poacher Rebound
                {
                    title: "💥 Ceza Sahası Karambolünde Fırsatçı Vuruş",
                    description: "Direkten dönen top ceza sahası içinde tam önüne düştü!",
                    options: [
                        {
                            text: `💥 Dönen Topa Gelişine Tek Vuruş Çak!`,
                            effect: `Şut (%${sho}) ve fırsatçılık yeteneğine bağlı.`,
                            successChance: this.calculateStatSuccess(sho, "def"),
                            onSuccess: () => {
                                this.score.player++;
                                this.playerStats.goals++;
                                this.playerStats.shots++;
                                return this.checkGoalCommentary(`FIRSATÇI GOLCÜ! Dönen topu havada yakalayıp köşeye zımbaladın! GOOOL!`);
                            },
                            onFail: () => {
                                this.playerStats.shots++;
                                return `Ayağın kaydı (%${sho}), top defansa çarpıp kornere gitti.`;
                            }
                        },
                        {
                            text: `👟 Topuk Pasıyla ${teammate}'yi Gör`,
                            effect: `Pas (%${pas}) yeteneğine bağlı asist.`,
                            successChance: this.calculateStatSuccess(pas, "def"),
                            onSuccess: () => {
                                this.score.player++;
                                this.playerStats.assists++;
                                this.playerStats.passes++;
                                return `HARİKA ASİST! Topuk pasınla buluşan ${teammate} golü attı! ASİST!`;
                            },
                            onFail: () => {
                                this.playerStats.passes++;
                                return `Pas savunmada kaldı.`;
                            }
                        },
                        {
                            text: `⚽ Topu Dürtüp Kaleciyi Ekarte Et`,
                            effect: `Dribbling (%${dri}) yeteneğine bağlı.`,
                            successChance: this.calculateStatSuccess(dri, "def"),
                            onSuccess: () => {
                                this.score.player++;
                                this.playerStats.goals++;
                                this.playerStats.shots++;
                                return this.checkGoalCommentary(`SERİ DOKUNUŞ! Topu kalecinin üstünden aşırtıp filelerle buluşturdun! GOOOL!`);
                            },
                            onFail: () => {
                                this.playerStats.shots++;
                                return `Kaleci topa kapandı.`;
                            }
                        }
                    ]
                },
                // 7: High Press Keeper
                {
                    title: "🛡️ Rakip Kaleciye Şok Ön Pres & Hata Yaptırma",
                    description: "Rakip kaleci topla fazla oyalandı! Üzerine doğru son hızla depar atıyorsun.",
                    options: [
                        {
                            text: `🛡️ Kalecinin Ayağındaki Topa Kayıp Kap`,
                            effect: `Hız ve Savunma ortalamasına (%${Math.round((spe+def)/2)}) bağlı gol şansı.`,
                            successChance: this.calculateStatSuccess((spe + def) / 2, "def"),
                            onSuccess: () => {
                                this.score.player++;
                                this.playerStats.goals++;
                                this.playerStats.shots++;
                                return this.checkGoalCommentary(`İNANILMAZ ÖN PRES GOLÜ! Kalecinin ayağındaki topa kayarak müdahale ettin ve top boş ağlara yuvarlandı! GOOOL!`);
                            },
                            onFail: () => {
                                return `Kaleci son anda topu uzaklaştırdı.`;
                            }
                        },
                        {
                            text: `👟 Kaleciyi Hataya Zorlayıp Pasını Kes`,
                            effect: `Hız (%${spe}) yeteneğine bağlı.`,
                            successChance: this.calculateStatSuccess(spe, "def"),
                            onSuccess: () => {
                                this.score.player++;
                                this.playerStats.assists++;
                                this.playerStats.passes++;
                                return `HATA YAPTIRDIN! Kaleci panikle topu arkadaşımıza attı, boş kaleye gol! ASİST!`;
                            },
                            onFail: () => {
                                return `Kaleci pasını aktardı.`;
                            }
                        },
                        {
                            text: `⚡ Kalecinin Üstüne Deparla Baskı Kur`,
                            effect: `Hız (%${spe}) ve Fizik (%${phy}) ortalamasına bağlı.`,
                            successChance: this.calculateStatSuccess((spe + phy) / 2, "def"),
                            onSuccess: () => {
                                return `PANİKLE TACA ATTI! Kaleci baskından çekinip topu panikle taca dikti!`;
                            },
                            onFail: () => {
                                return `Kaleci çalımla sıyrıldı.`;
                            }
                        }
                    ]
                },
                // 8: Penalty Drama (90th min)
                {
                    title: "🎭 Son Dakika Ceza Sahasında Penaltı / Ayakta Kalma",
                    description: "Maçın son anları! Ceza sahasında topla buluştun, arkandan stoperin sert darbesi var!",
                    options: [
                        {
                            text: `🎯 Yıkılma, Ayakta Kalıp Zor Pozisyonda Vur!`,
                            effect: `Şut (%${sho}) ve Fizik gücüne bağlı gol şansı.`,
                            successChance: this.calculateStatSuccess((sho + phy) / 2, "def"),
                            onSuccess: () => {
                                this.score.player++;
                                this.playerStats.goals++;
                                this.playerStats.shots++;
                                return this.checkGoalCommentary(`İNANILMAZ KARAKTER VE GOL! Yıkılmadı, ayakta kaldı ve golünü yaptı! MÜTHİŞ BİR GOL! GOOOL!`);
                            },
                            onFail: () => {
                                this.playerStats.shots++;
                                return `Dengesiz vurulan şut auta gitti.`;
                            }
                        },
                        {
                            text: `🎭 Teması Alıp Hakemden Penaltı Bekle`,
                            effect: `Sabit %45 şansla penaltı kazanma (Kart riski var).`,
                            successChance: 0.45,
                            onSuccess: () => {
                                this.score.player++;
                                this.playerStats.goals++;
                                this.playerStats.shots++;
                                return this.checkGoalCommentary(`PENALTI VE GOOOL! Hakem beyaz noktayı gösterdi! Topun başına geçip kaleciyi ters köşe yaptın! GOOOL!`);
                            },
                            onFail: () => {
                                if (this.hasYellowCard) {
                                    this.isSentOff = true;
                                    GAME.state.suspendedWeeks = 2;
                                    this.hasYellowCard = false;
                                    this.playerState.moral = Math.max(10, (this.playerState.moral || 100) - 20);
                                    this.playerState.hocaGuveni = Math.max(10, (this.playerState.hocaGuveni || 40) - 15);
                                    return "HAKEM ALDATMAYA YÖNELİK HAREKETTEN 2. SARI KARTTAN KIRMIZI KART GÖSTERDİ! Oyundan atıldın!";
                                } else {
                                    this.hasYellowCard = true;
                                    this.playerState.moral = Math.max(0, (this.playerState.moral || 100) - 10);
                                    this.playerState.hocaGuveni = Math.max(0, (this.playerState.hocaGuveni || 40) - 5);
                                    return "HAKEM ALDATMAYA YÖNELİK HAREKETTEN SARI KART GÖSTERDİ!";
                                }
                            }
                        },
                        {
                            text: `⚽ Korner Bayrağına Gidip Zaman Geçir`,
                            effect: `Hız (%${spe}) ile maçı kilitleme.`,
                            successChance: this.calculateStatSuccess(spe, "def"),
                            onSuccess: () => {
                                this.playerState.hocaGuveni = Math.min(100, (this.playerState.hocaGuveni || 40) + 5);
                                this.playerState.moral = Math.min(100, (this.playerState.moral || 100) + 5);
                                return `HARİKA TAKTİK ZAMAN GEÇİRME! Topu bayrak direğinde sakladın, hoca alkışlıyor!`;
                            },
                            onFail: () => {
                                return `Top taca çıktı.`;
                            }
                        }
                    ]
                },
                // 9: Bicycle Kick
                {
                    title: "⚡ 90. Dakika Akrobatik Röveşata / Vole",
                    description: "Son dakikada penaltı noktasına doğru yüksek bir orta geldi!",
                    options: [
                        {
                            text: `⚡ Havaya Sıçrayıp Röveşata Çak!`,
                            effect: `Şut ve Fizik ortalamasına (%${Math.round((sho+phy)/2)}) bağlı efsane röveşata golü.`,
                            successChance: this.calculateStatSuccess((sho + phy) / 2, "def"),
                            onSuccess: () => {
                                this.score.player++;
                                this.playerStats.goals++;
                                this.playerStats.shots++;
                                return this.checkGoalCommentary(`PUSKAS ÖDÜLLÜK RÖVEŞATA GOLÜ! Havada ters takla atıp topu 90'a çaktın! STADYUM AYAKTA ALKIŞLIYOR! GOOOL!`);
                            },
                            onFail: () => {
                                this.playerStats.shots++;
                                return `Röveşata vuruşun (%${sho}) topa tam oturmadı, auta çıktı.`;
                            }
                        },
                        {
                            text: `🎯 Göğsünle İndirip Plase Gönder`,
                            effect: `Şut (%${sho}) yeteneğine bağlı.`,
                            successChance: this.calculateStatSuccess(sho, "def"),
                            onSuccess: () => {
                                this.score.player++;
                                this.playerStats.goals++;
                                this.playerStats.shots++;
                                return this.checkGoalCommentary(`SOĞUKKANLI GOL! Göğsünle indirip kalecinin altından ağlara yuvarladın! GOOOL!`);
                            },
                            onFail: () => {
                                this.playerStats.shots++;
                                return `Göğsünle indirirken stoper topu uzaklaştırdı.`;
                            }
                        },
                        {
                            text: `👟 Kafayla Arkana Aşırtıp ${teammate}'ye Bırak`,
                            effect: `Pas ve Fizik ortalamasına (%${Math.round((pas+phy)/2)}) bağlı asist.`,
                            successChance: this.calculateStatSuccess((pas + phy) / 2, "def"),
                            onSuccess: () => {
                                this.score.player++;
                                this.playerStats.assists++;
                                this.playerStats.passes++;
                                return `AKIL DOLU ASİST! Kafayla arkaya aşırdığın topta ${teammate} golü attı! ASİST!`;
                            },
                            onFail: () => {
                                this.playerStats.passes++;
                                return `Aşırtılan top kalecide kaldı.`;
                            }
                        }
                    ]
                }
            ];

            let pool = fwdScenarios;
            let chosenIndex = 0;
            if (isLastMinute) {
                chosenIndex = 8; // penalty / clutch drama
            } else {
                let available = [0, 1, 2, 3, 4, 5, 6, 7, 9].filter(i => !this.usedScenarioIndices.includes(i));
                if (available.length === 0) available = [0, 1, 2, 3, 4, 5, 6, 7];
                chosenIndex = available[Math.floor(Math.random() * available.length)];
            }
            this.usedScenarioIndices.push(chosenIndex);
            choiceData = pool[chosenIndex];
        }

        this.activeChoice = choiceData;
        
        if (this.callbacks.onMatchChoice) {
            this.callbacks.onMatchChoice(minute, choiceData);
        }
    },

    triggerCardDispute: function() {
        if (this.isSentOff || this.isSubbedOff || this.isDropped) return;
        if (this.hasYellowCard) {
            // Zaten sarı kartı var -> 2. Sarıdan Kırmızı!
            this.isSentOff = true;
                                GAME.state.suspendedWeeks = 2;
            this.playerState.moral = Math.max(10, (this.playerState.moral || 100) - 20);
            this.playerState.hocaGuveni = Math.max(10, (this.playerState.hocaGuveni || 40) - 15);
            
            this.hasYellowCard = false; // Kırmızı yendiği için sarı kart silindi
            
            this.isPausedForChoice = false;
            this.activeChoice = null;
            setTimeout(() => {
                alert("🟥 İKİNCİ SARI KART! Zaten sarı kartınız vardı. Hakem 2. sarı karttan Kırmızı Kartı gösterdi ve oyundan atıldınız!");
                this.resumeTick();
            }, 500);
            return;
        }

        this.isPausedForChoice = true;
        this.hasYellowCard = true; // İlk sarı kart yenir
        
        const disputeChances = 0.60 + (this.playerState.physical * 0.002) - (this.playerState.moral * 0.001); // high physical increases aggro, high morale keeps cool
        
        const choiceData = {
            title: "⚖️ HAKEME İTİRAZ KARARI!",
            description: "Sert müdahalen sonrası hakem düdüğü çaldı ve sana doğru koşarak sarı kart çıkardı! Takımının morali sarsıldı. Nasıl davranacaksın?",
            options: [
                {
                    text: "🫱 Kararı kabullen, hakemin elini sıkıp özür dile.",
                    effect: "Sarı kartla devam edersin. Hoca Güveni +5, Takım Uyumu +5, Moralin -5.",
                    successChance: 1.0,
                    onSuccess: () => {
                        this.playerState.hocaGuveni = Math.min(100, (this.playerState.hocaGuveni || 40) + 5);
                        this.playerState.takimUyumu = Math.min(100, (this.playerState.takimUyumu || 50) + 5);
                        this.playerState.moral = Math.max(10, (this.playerState.moral || 100) - 5);
                        return "KART: SARI 🟨 | Hakemden centilmence özür diledin. Hoca ve takım arkadaşların bu olgunluğunu beğendi ama sarı kartla oynamaya devam edeceksin.";
                    },
                    onFail: () => { return ""; }
                },
                {
                    text: "🗣️ Hakemin üstüne yürüyüp sertçe itiraz et!",
                    effect: "Kırmızı Kart Riski (Fiziksel güce bağlı). Başarılı olursa Takım Hırslanır (+25 Momentum).",
                    successChance: Math.max(0.40, Math.min(0.85, disputeChances)),
                    onSuccess: () => {
                        this.momentumBoost = 25;
                        this.momentumDuration = 15;
                        return "KART: SARI 🟨 | Hakemin kararına sertçe itiraz ettin! Arkadaşların bu hırsla canlandı, takımın baskısı arttı!";
                    },
                    onFail: () => {
                        this.isSentOff = true;
                                GAME.state.suspendedWeeks = 2;
                        this.hasYellowCard = false;
                        this.playerState.moral = Math.max(10, (this.playerState.moral || 100) - 20);
                        this.playerState.hocaGuveni = Math.max(10, (this.playerState.hocaGuveni || 40) - 15);
                        
                        return "KART: KIRMIZI 🟥 | Hakem itirazlarına dayanamadı ve doğrudan KIRMIZI KARTI çıkardı! Oyundan atıldın ve haftaya cezalı duruma düştün!";
                    }
                },
                {
                    text: "👏 Alaycı bir şekilde alkışlayarak geri çekil.",
                    effect: "%30 Kırmızı Kart Riski. Başarılı olursa +15.000 Takipçi, +10 Moral.",
                    successChance: 0.70,
                    onSuccess: () => {
                        this.playerState.followers += 15000;
                        this.playerState.moral = Math.min(100, (this.playerState.moral || 100) + 10);
                        return "KART: SARI 🟨 | Hakemi alaycı şekilde alkışladın. Sosyal medyada bu hareketin viral oldu, takipçi kazandın ama sarı kartı yedin.";
                    },
                    onFail: () => {
                        this.isSentOff = true;
                                GAME.state.suspendedWeeks = 2;
                        this.hasYellowCard = false;
                        this.playerState.moral = Math.max(10, (this.playerState.moral || 100) - 20);
                        this.playerState.hocaGuveni = Math.max(10, (this.playerState.hocaGuveni || 40) - 15);
                        
                        return "KART: KIRMIZI 🟥 | Hakem bu hareketi alaycı bularak doğrudan KIRMIZI KART gösterdi! Oyundan atıldın ve cezalı duruma düştün!";
                    }
                },
                {
                    text: "👉 Takım arkadaşını öne sür, suçu ona at!",
                    effect: "Kendi kartından kurtulursun ama Takım Uyumu -15 düşer!",
                    successChance: 1.0,
                    onSuccess: () => {
                        this.hasYellowCard = false; // Kart arkadaşına gitti!
                        this.playerState.takimUyumu = Math.max(5, (this.playerState.takimUyumu || 50) - 15);
                        return "🛡️ KARTTAN KURTULDUN! Hakeme pozisyonu yapanın sen olmadığını söyleyip arkadaşını işaret ettin. Hakem kartı ona gösterdi ama takım arkadaşların sana nefretle bakıyor!";
                    },
                    onFail: () => { return ""; }
                }
            ]
        };

        this.activeChoice = choiceData;
        if (this.callbacks.onMatchChoice) {
            this.callbacks.onMatchChoice(this.min, choiceData);
        }
    },

    triggerSetPiece: function() {
        if (this.isSentOff || this.isSubbedOff || this.isDropped) return;
        this.isPausedForChoice = true;
        
        let choiceData = null;
        const isPenalty = Math.random() < 0.40;

        if (isPenalty) {
            if (typeof SoundManager !== "undefined" && typeof SoundManager.playSpiker === "function") {
                SoundManager.playSpiker("penalti");
            }
            choiceData = {
                title: "🎯 PENALTI KAZANDINIZ!",
                description: "Hakem beyaz noktayı gösterdi! Topun başına geçtin. Hangi köşeyi ve vuruş tarzını hedefleyeceksin?",
                options: [
                    {
                        text: "🥅 Sol Üst Çatal (Taktiksel Plase)",
                        effect: "Şut ve Pas ortalamasına bağlı gol şansı.",
                        successChance: 0.50 + ((this.playerState.shooting + this.playerState.passing) / 2 * 0.004),
                        onSuccess: () => {
                            this.score.player++;
                            this.playerStats.goals++;
                            this.playerStats.shots++;
                            return this.checkGoalCommentary("GOOOL! Topu tam sol çataldan örümcek ağlarını alacak şekilde iğne deliğinden geçirdin! Harika plase!");
                        },
                        onFail: () => {
                            this.playerStats.shots++;
                            return "KAÇTI! Top direğin hemen üzerinden dışarı çıktı! Çok yakındı.";
                        }
                    },
                    {
                        text: "🥅 Sağ Üst Çatal (Sert Füze)",
                        effect: "Şut ve Fiziksel ortalamasına bağlı gol şansı.",
                        successChance: 0.55 + ((this.playerState.shooting + this.playerState.physical) / 2 * 0.003),
                        onSuccess: () => {
                            this.score.player++;
                            this.playerStats.goals++;
                            this.playerStats.shots++;
                            return this.checkGoalCommentary("GOOOL! Kalenin sağ tavanına öyle sert bir füze yolladın ki kaleci hamle yapsa da elleri büküldü!");
                        },
                        onFail: () => {
                            this.playerStats.shots++;
                            return "KAÇTI! Vuruşun o kadar sertti ki üst direğe çarpıp göklere fırladı!";
                        }
                    },
                    {
                        text: "🥅 Sol/Sağ Alt Köşe (Güvenli Plase)",
                        effect: "Orta düzey risk, Şut gücüne bağlı.",
                        successChance: 0.60 + (this.playerState.shooting * 0.0025),
                        onSuccess: () => {
                            this.score.player++;
                            this.playerStats.goals++;
                            this.playerStats.shots++;
                            return this.checkGoalCommentary("GOOOL! Kaleciyi ters köşe yaptın ve topu pürüzsüzce köşeden ağlarla buluşturdun!");
                        },
                        onFail: () => {
                            this.playerStats.shots++;
                            return "KAÇTI! Kaleci köşeyi doğru tahmin etti ve uzanarak topu çelmeyi başardı!";
                        }
                    },
                    {
                        text: "😎 Kalenin Ortası (Soğukkanlı Panenka)",
                        effect: "Çok riskli! Başarılı olursa +15.000 Takipçi, +25 Moral. Başarısızlıkta Hoca Güveni -15!",
                        successChance: 0.40 + (this.playerState.passing * 0.003),
                        onSuccess: () => {
                            this.score.player++;
                            this.playerStats.goals++;
                            this.playerStats.shots++;
                            this.playerState.moral = Math.min(100, (this.playerState.moral || 100) + 25);
                            this.playerState.followers += 15000;
                            return this.checkGoalCommentary("İNANILMAZ GOL! Kaleci köşeye atlarken sen topun altına hafifçe vurup kalenin ortasından süzülen bir Panenka attın! Taraftarlar çıldırdı!");
                        },
                        onFail: () => {
                            this.playerStats.shots++;
                            this.playerState.moral = Math.max(10, (this.playerState.moral || 100) - 15);
                            this.playerState.hocaGuveni = Math.max(10, (this.playerState.hocaGuveni || 40) - 15);
                            return "REZİLLİK! Kaleci hiç kıpırdamadı, üstüne yavaşça gelen aşırtma topu göğsüyle kontrol etti. Rezil oldun!";
                        }
                    }
                ]
            };
        } else {
            choiceData = {
                title: "📐 FRİKİK KAZANDINIZ!",
                description: "Ceza sahası yayının hemen dışından kritik bir frikik! Topun arkasındasın. Hangi hedefi seçeceksin?",
                options: [
                    {
                        text: "💫 Sol Üst Köşe (Baraj Üstü Falso)",
                        effect: "Şut ve Pas ortalamasına bağlı gol şansı.",
                        successChance: 0.20 + (((this.playerState.shooting + this.playerState.passing) / 2) * 0.005),
                        onSuccess: () => {
                            this.score.player++;
                            this.playerStats.goals++;
                            this.playerStats.shots++;
                            return this.checkGoalCommentary("MÜTHİŞ FRİKİK GOLÜ! Barajı mükemmel aşan kavisli top çatala takıldı! Kaleci çaresiz kaldı!");
                        },
                        onFail: () => {
                            this.playerStats.shots++;
                            return "Şutun barajı aştı ama falsoyu az alınca direğe çarpıp auta gitti!";
                        }
                    },
                    {
                        text: "🧲 Sol Alt Köşe (Baraj Altı Zekice Yerden)",
                        effect: "Barajın zıplama şansına bağlı sabit %42 başarı.",
                        successChance: 0.42,
                        onSuccess: () => {
                            this.score.player++;
                            this.playerStats.goals++;
                            this.playerStats.shots++;
                            return this.checkGoalCommentary("ZEKİCE GOL! Baraj zıplarken topu yerden yuvarladın, barajın altından geçen top filelerle buluştu!");
                        },
                        onFail: () => {
                            this.playerStats.shots++;
                            return "Baraj zıplamadı! Yerde kalan savunma oyuncusu topu ayaklarıyla keserek uzaklaştırdı.";
                        }
                    },
                    {
                        text: "🚀 Kaleci Köşesi (Baraj Dışı Sert Füze)",
                        effect: "Şut ve Hız ortalamasına bağlı gol şansı.",
                        successChance: 0.15 + (((this.playerState.shooting + this.playerState.speed) / 2) * 0.004),
                        onSuccess: () => {
                            this.score.player++;
                            this.playerStats.goals++;
                            this.playerStats.shots++;
                            return this.checkGoalCommentary("FÜZE VE GOL! Kaleci köşesinden sert bir vuruş! Top kalecinin ellerini bükerek filelere girdi!");
                        },
                        onFail: () => {
                            this.playerStats.shots++;
                            return "Şutun o kadar sertti ki barajdaki defansın kafasına çarptı, oyuncu yerde kaldı.";
                        }
                    }
                ]
            };
        }

        this.activeChoice = choiceData;
        if (this.callbacks.onMatchChoice) {
            this.callbacks.onMatchChoice(this.min, choiceData);
        }
    },

    makeChoice: function(optionIdx) {
        if (!this.activeChoice || !this.activeChoice.options[optionIdx]) return;

        let opt = this.activeChoice.options[optionIdx];
        let rand = Math.random();
        let success = rand < opt.successChance;
        
        let previousGoals = this.playerStats.goals;
        let previousAssists = this.playerStats.assists;

        let resultComment = "";
        if (success) {
            resultComment = opt.onSuccess();
        } else {
            resultComment = opt.onFail();
        }

        // Display results in commentary
        this.callbacks.onMinuteUpdate(this.min, this.score, resultComment);

        let hasScored = this.playerStats.goals > previousGoals;
        let hasAssisted = this.playerStats.assists > previousAssists;
        const playerPos = (this.playerState && this.playerState.position) || (window.GAME && GAME.state && GAME.state.position) || "Forvet";
        
        let isStoperTackle = (playerPos === "Defans") && success && (
            resultComment.includes("KAYARAK MÜDAHALE") || 
            resultComment.includes("TOP KAPMA") || 
            resultComment.includes("KAYA GİBİ SAĞLAM") || 
            resultComment.includes("HAVALARIN EFENDİSİ") || 
            resultComment.includes("KRİTİK MÜDAHALE") ||
            resultComment.includes("HARİKA KADEME") ||
            resultComment.includes("HAVA HAKİMİYETİ") ||
            resultComment.includes("ÇİZGİDEN ÇIKARDIN")
        );
        
        let isKeeperSave = !success && !hasScored && !hasAssisted && (
            resultComment.includes("kalecide kaldı") || 
            resultComment.includes("uzanarak topu çeldi") || 
            resultComment.includes("topu çelmeyi başardı") || 
            resultComment.includes("kaleci şutu çeldi") || 
            resultComment.includes("kalecimiz son anda") || 
            resultComment.includes("kaleci kurtardı") ||
            resultComment.includes("kaleci topa kapandı")
        );

        // Trigger corresponding spiker sound strictly and cleanly
        if (typeof SoundManager !== "undefined" && typeof SoundManager.playSpiker === "function") {
            if (hasScored) {
                // Goal celebration handles goal spiker
            } else if (hasAssisted) {
                SoundManager.playSpiker("asist");
            } else if (isStoperTackle) {
                SoundManager.playSpiker("stoper");
            } else if (isKeeperSave) {
                SoundManager.playSpiker("kurtaris");
            }
        }

        if (hasScored && this.callbacks.onGoalScoredCelebration) {
            this.isPausedForChoice = true;
            this.activeChoice = null;
            this.callbacks.onGoalScoredCelebration(this.min, (celebrationText, celebrationCommentary) => {
                this.callbacks.onMinuteUpdate(this.min, this.score, celebrationCommentary);
                if (this.callbacks.onEventPause) {
                    this.callbacks.onEventPause(`⚽ ${this.min}' GOOOL SEVİNCİ!`, `Muhteşem bir sevinç! Maça devam etmek için dokunun.`, () => {
                        this.isPausedForChoice = false;
                        this.resumeTick();
                    });
                } else {
                    this.isPausedForChoice = false;
                    const self = this;
                    this.timer = setTimeout(function() {
                        self.resumeTick();
                    }, 3000 / this.currentSpeed);
                }
            });
        } else {
            this.isPausedForChoice = false;
            this.activeChoice = null;
            const self = this;
            this.timer = setTimeout(function() {
                self.resumeTick();
            }, 3000 / this.currentSpeed);
        }
    },

    resumeTick: function() {
        const self = this;
        function tick() {
            if (self.isPausedForChoice) return;

            self.min++;
            if (self.min > 90) {
                // Match finished!
                GAME.matchSimulatedThisWeek = true;
                GAME.simulateLeagueWeek(self.score.player, self.score.opponent);

                if (typeof SoundManager !== "undefined" && typeof SoundManager.playSpiker === "function") {
                    SoundManager.playSpiker("son_duduk");
                }

                const playerPos = (self.playerState && self.playerState.position) || (window.GAME && GAME.state && GAME.state.position) || "Forvet";
                let rating = 6.0;
                let tacklesCount = self.playerStats.tackles || 0;
                let goalsCount = self.playerStats.goals || 0;
                let assistsCount = self.playerStats.assists || 0;
                let passesCount = self.playerStats.passes || 0;
                let shotsCount = self.playerStats.shots || 0;

                if (playerPos === "Defans") {
                    const cleanSheet = (self.score.opponent === 0);
                    let baseDef = 6.2;
                    if (cleanSheet) baseDef += 0.8;
                    else if (self.score.opponent === 1) baseDef += 0.0;
                    else if (self.score.opponent === 2) baseDef -= 0.4;
                    else if (self.score.opponent >= 3) baseDef -= 0.8;
                    rating = baseDef + (tacklesCount * 0.70) + (goalsCount * 1.5) + (assistsCount * 1.0) + (passesCount * 0.06);
                } else if (playerPos === "Orta Saha") {
                    rating = 6.0 + (assistsCount * 1.2) + (goalsCount * 1.2) + (tacklesCount * 0.6) + (passesCount * 0.10) + (shotsCount * 0.08);
                } else {
                    // Forvet
                    rating = 6.0 + (goalsCount * 1.4) + (assistsCount * 0.9) + (tacklesCount * 0.4) + (shotsCount * 0.10) + (passesCount * 0.05);
                }

                if (self.isSentOff) {
                    rating = Math.max(3.0, rating * 0.6);
                }
                if (self.isDropped) {
                    rating = 5.0;
                }
                rating = Math.max(3.0, Math.min(10.0, parseFloat(rating.toFixed(1))));

                if (self.callbacks.onMatchFinish) {
                    self.callbacks.onMatchFinish({
                        score: self.score,
                        playerStats: {
                            goals: self.playerStats.goals,
                            assists: self.playerStats.assists,
                            tackles: self.playerStats.tackles || 0,
                            passes: self.playerStats.passes,
                            shots: self.playerStats.shots,
                            rating: rating,
                            isSentOff: self.isSentOff
                        }
                    });
                }
                return;
            }

            // If player is red carded, run simplified simulation
            if (self.isSentOff) {
                let ratingPlayer = (self.teamPlayer.att + self.teamPlayer.mid + self.teamPlayer.def) / 3;
                let ratingOpponent = (self.teamOpponent.att + self.teamOpponent.mid + self.teamOpponent.def) / 3;
                if (Math.random() < 0.025) {
                    self.score.opponent++;
                    self.callbacks.onMinuteUpdate(self.min, self.score, `RAKİP GOL ATTI! 10 kişi kalmamızı fırsat bilen ${self.teamOpponent.name} farkı açıyor.`);
                } else if (Math.random() < 0.15) {
                    const pName = (self.playerState && self.playerState.playerName) || (window.GAME && GAME.state && GAME.state.playerName) || "Oyuncumuz";
                    self.callbacks.onMinuteUpdate(self.min, self.score, `10 kişi mücadele ediyoruz, ${pName} kırmızı kartla tribünde olduğu için hücumda eksiğiz.`);
                } else {
                    self.callbacks.onMinuteUpdate(self.min, self.score, null);
                }
                self.timer = setTimeout(tick, 1000 / self.currentSpeed);
                return;
            }

            // If player is subbed off, run bench simulation (no interactive prompts, pure sideline view)
            if (self.isSubbedOff) {
                let ratingPlayer = (self.teamPlayer.att + self.teamPlayer.mid + self.teamPlayer.def) / 3;
                let ratingOpponent = (self.teamOpponent.att + self.teamOpponent.mid + self.teamOpponent.def) / 3;
                let probOpp = ratingOpponent / (ratingPlayer + ratingOpponent);
                if (Math.random() < probOpp * 0.015) {
                    self.score.opponent++;
                    self.callbacks.onMinuteUpdate(self.min, self.score, `MAALESEF GOL! ${self.teamOpponent.name} topu ağlarımıza gönderdi.`);
                } else if (Math.random() < (1 - probOpp) * 0.012) {
                    self.score.player++;
                    self.callbacks.onMinuteUpdate(self.min, self.score, `GOOOOL!!! Takım arkadaşların harika paslaşmalarla golü buluyor!`);
                } else if (Math.random() < 0.10) {
                    self.callbacks.onMinuteUpdate(self.min, self.score, `Yedek kulübesinde maçı heyecanla takip ediyorsun.`);
                } else {
                    self.callbacks.onMinuteUpdate(self.min, self.score, null);
                }
                self.timer = setTimeout(tick, 1000 / self.currentSpeed);
                return;
            }

            // Decrement momentum duration
            if (self.momentumDuration > 0) {
                self.momentumDuration--;
                if (self.momentumDuration === 0) {
                    self.momentumBoost = 0;
                }
            }

            // 1st: Trigger Referee Card Dispute (0.8% chance)
            if (!self.hasTriggeredCardDispute && self.min >= 20 && self.min <= 80 && Math.random() < 0.008) {
                self.hasTriggeredCardDispute = true;
                self.triggerCardDispute();
                return;
            }

            // 2nd: Trigger Free Kick / Penalty Set Piece (1.8% chance)
            if (!self.hasTriggeredSetPiece && self.min >= 15 && self.min <= 85 && Math.random() < 0.018) {
                self.hasTriggeredSetPiece = true;
                self.triggerSetPiece();
                return;
            }

            // Trigger Choice Cards at dynamic minutes
            if (self.choiceMinutes.includes(self.min)) {
                self.triggerChoice(self.min);
                return;
            }

            let ratingPlayer = (self.teamPlayer.att + self.teamPlayer.mid + self.teamPlayer.def) / 3;
            let ratingOpponent = (self.teamOpponent.att + self.teamOpponent.mid + self.teamOpponent.def) / 3;
            
            // Apply player momentum boost if opponent is weaker
            let currentPlayerBoost = 0;
            if (ratingPlayer > ratingOpponent) {
                currentPlayerBoost = self.momentumBoost;
            }
            let adjustedPlayer = ratingPlayer + currentPlayerBoost;
            let probOpp = ratingOpponent / (adjustedPlayer + ratingOpponent);
            
            if (Math.random() < probOpp * 0.015) {
                self.score.opponent++;
                self.momentumBoost = 0;
                self.momentumDuration = 0;
                self.callbacks.onMinuteUpdate(self.min, self.score, `MAALESEF GOL! ${self.teamOpponent.name} topu ağlarımıza gönderdi.`);
            } else if (Math.random() < (1 - probOpp) * 0.012) {
                self.score.player++;
                if (ratingPlayer > ratingOpponent) {
                    self.momentumBoost = 15;
                    self.momentumDuration = 12;
                }
                self.callbacks.onMinuteUpdate(self.min, self.score, `GOOOOL!!! Takım arkadaşların harika paslaşmalarla golü buluyor!`);
            } else if (Math.random() < 0.15) {
                const comments = [
                    "Orta sahada kıran kırana mücadele devam ediyor.",
                    "Rakip takımın atak hazırlığı defansımız tarafından kesildi.",
                    "Seyirciler tezahüratlarla stadı inletiyor.",
                    "Hoca kenardan taktik direktifler veriyor.",
                    "Sert bir müdahale, hakem oyunu devam ettirdi."
                ];
                self.callbacks.onMinuteUpdate(self.min, self.score, comments[Math.floor(Math.random() * comments.length)]);
            } else {
                self.callbacks.onMinuteUpdate(self.min, self.score, null);
            }

            self.timer = setTimeout(tick, 1000 / self.currentSpeed);
        }

        self.timer = setTimeout(tick, 1000 / self.currentSpeed);
    }
};

if (typeof module !== "undefined" && module.exports) {
    module.exports = MatchEngine;
}
