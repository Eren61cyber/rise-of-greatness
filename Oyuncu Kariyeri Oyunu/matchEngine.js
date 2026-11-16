/**
 * Rise Of Greatness: Kariyer Efsanesi - Interactive Match Engine Module
 * Manages text-based choice scenarios and match ticking.
 */

const MatchEngine = {
    currentSpeed: 1,
    min: 0,
    get currentMinute() { return this.min; },
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
    lastPlayerGoalMinute: 0,
    _prevPlayerGoalMinute: 0,

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
        this.hasTriggeredVar = false;
        this.isSentOff = false;
        this.hasYellowCard = false;
        this.isSubbedOff = false; // New flag for early substitutions
        this.lastPlayerGoalMinute = 0;
        this._prevPlayerGoalMinute = 0;

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

            // DERBİ HYPE MODU: Derbi maçlarında ekstra 1 kritik pozisyon garantisi
            const derbyInfoCheck = (typeof GAME !== "undefined" && typeof GAME.getDerbyInfo === "function")
                ? GAME.getDerbyInfo(playerTeam.name, opponentTeam.name)
                : { isDerby: false };
            this.isDerbyMatch = !!derbyInfoCheck.isDerby;
            this.derbyInfo = derbyInfoCheck;

            if (this.isDerbyMatch) {
                baseMinutes.push(Math.floor(Math.random() * (64 - 50 + 1)) + 50);
            }

            // Deduplicate minutes to prevent multiple prompt overlaps at the same minute
            baseMinutes = [...new Set(baseMinutes)];
            baseMinutes.sort((a,b) => a - b);
            
            this.choiceMinutes = baseMinutes;
        }

        if (typeof this.isDerbyMatch === "undefined") {
            const dInfo = (typeof GAME !== "undefined" && typeof GAME.getDerbyInfo === "function")
                ? GAME.getDerbyInfo(playerTeam.name, opponentTeam.name)
                : { isDerby: false };
            this.isDerbyMatch = !!dInfo.isDerby;
            this.derbyInfo = dInfo;
        }

        // Bir önceki maçta çıkan pozisyonları hatırla (arka arkaya aynı maçlarda tekrar görmesin)
        this._prevScenarioIndices = this.usedScenarioIndices || [];
        this.usedScenarioIndices = [];
        this.momentumBoost = 0;
        this.momentumDuration = 0;

        if (this.timer) {
            clearTimeout(this.timer);
        }

        const self = this;
        
        // Notify start
        if (this.isDerbyMatch && this.derbyInfo) {
            callbacks.onMinuteUpdate(0, this.score, `🔥 ${this.derbyInfo.title}: ${playerTeam.name} - ${opponentTeam.name}! ${this.derbyInfo.subtitle} Tribünlerde meşaleler yandı, derbi ödülleri x2 aktif!`);
        } else {
            callbacks.onMinuteUpdate(0, this.score, `${playerTeam.name} - ${opponentTeam.name} maçı başlamak üzere!`);
        }
        if (typeof SoundManager !== "undefined" && typeof SoundManager.playMatchStart === "function") {
            SoundManager.playMatchStart();
        }

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
            } else if (self.min === 45) {
                if (typeof SoundManager !== "undefined" && typeof SoundManager.playWhistle === "function") {
                    SoundManager.playWhistle("double");
                }
            } else if (self.min === 61 && ((self.teamPlayer && String(self.teamPlayer.name).includes("Trabzon")) || (self.teamOpponent && String(self.teamOpponent.name).includes("Trabzon")))) {
                const isPlayingForTs = self.teamPlayer && String(self.teamPlayer.name).includes("Trabzon");
                if (isPlayingForTs) {
                    self.momentumBoost = 0.12;
                    self.momentumDuration = 15;
                    customCommentary = `🔥 61. DAKİKA ŞOVU! Bordo-Mavi tribünler telefon ışıklarını yaktı, 'BİZE HER YER TRABZON!' tezahüratları stadyumu inletiyor! (+%12 Karadeniz Fırtınası İvme Desteği!)`;
                } else {
                    customCommentary = `🔥 61. DAKİKA! Trabzon tribünleri 61. dakika şovuna başladı, 'Bize Her Yer Trabzon!' tezahüratlarıyla stadyumda kulaklar sağır edici bir atmosfer var!`;
                }
            } else if (self.min === 65 && self.isBenched) {
                customCommentary = `🔄 Oyuna Giriyorsun! Teknik direktör seni sahaya sürüyor. Kendini göstermek için son 25 dakika!`;
            }

            if (self.min > 90) {
                // Match finished!
                GAME.matchSimulatedThisWeek = true;
                GAME.simulateLeagueWeek(self.score.player, self.score.opponent);

                if (typeof SoundManager !== "undefined") {
                    if (typeof SoundManager.playMatchEnd === "function") {
                        SoundManager.playMatchEnd();
                    } else if (typeof SoundManager.playSpiker === "function") {
                        SoundManager.playSpiker("son_duduk");
                    }
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
                    if (typeof SoundManager !== "undefined" && typeof SoundManager.playConceded === "function") {
                        SoundManager.playConceded();
                    }
                    callbacks.onMinuteUpdate(self.min, self.score, `RAKİP GOL ATTI! ${self.isSentOff ? '10 kişi kalmamızı' : 'Kenara gelmeni'} fırsat bilen ${self.teamOpponent.name} farkı açıyor.`);
                } else if (Math.random() < 0.025) {
                    self.score.player++;
                    if (typeof SoundManager !== "undefined" && typeof SoundManager.playGoal === "function") {
                        SoundManager.playGoal();
                    }
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

            // 1st: Trigger Referee Card Dispute (0.8% normal, 1.5% in high-tension derby matches)
            const cardDisputeChance = self.isDerbyMatch ? 0.015 : 0.008;
            if (!isBenchedAndWaiting && !self.isDropped && !self.hasTriggeredCardDispute && self.min >= 20 && self.min <= 80 && Math.random() < cardDisputeChance) {
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
            // Generic Broadcast Telemetry & Tactical Commentary (State Guard Protected)
            else if (Math.random() < 0.14) {
                const broadcastLines = [
                    "Orta sahada top kapma mücadelesi kızıştı, tempo kontrol altında.",
                    "Rakip takımın kanat bindirmesi savunma kademesi tarafından kesildi.",
                    "Tribünlerden yoğun uğultu yükseliyor, takımlar alan savunmasında.",
                    "Teknik heyet kenardan takımı önde baskıya davet ediyor.",
                    "Sert bir ikili mücadele, hakem avantaja bırakarak oyunu akıttı.",
                    "Top ceza yayının hemen dışında sıkıştı, iki taraf da boşluk kolluyor.",
                    "Kısa paslarla tempo dengeleniyor, orta sahada pas trafiği yoğun.",
                    "Kaleci oyunu eliyle hızla kurarak kontra atak başlattı.",
                    "Hava topu mücadelesinde sert temas, hakem taç atışıyla oyunu başlattı.",
                    "Savunma hattı ofsayt çizgisini kusursuz kurarak tehlikeyi savuşturdu.",
                    "Rakip ceza sahası önüne yığıldı, savunmamız boşluk vermiyor.",
                    "Köşe gönderi yakınında pres sonuç verdi, top yeniden takımımızda.",
                    "Ceza sahası dışından seken topu orta saha oyuncularımız topladı.",
                    "Geniş alanda top çevrilerek rakip savunmanın dengesi bozulmaya çalışılıyor.",
                    "Stadyum hoparlörlerinden anons yapıldı, taraftarlar maça ortak olmaya çalışıyor."
                ];

                if (!self._lastGenericMin || (self.min - self._lastGenericMin >= 3)) {
                    let picked = broadcastLines[Math.floor(Math.random() * broadcastLines.length)];
                    if (picked !== self._lastGenericText) {
                        self._lastGenericMin = self.min;
                        self._lastGenericText = picked;
                        callbacks.onMinuteUpdate(self.min, self.score, picked);
                    } else {
                        callbacks.onMinuteUpdate(self.min, self.score, null);
                    }
                } else {
                    callbacks.onMinuteUpdate(self.min, self.score, null);
                }
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
        this._prevPlayerGoalMinute = this.lastPlayerGoalMinute || 0;
        this.lastPlayerGoalMinute = this.min || 1;
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

    /**
     * Genişletilmiş senaryo havuzu (40 yeni pozisyon):
     * Forvet 14 (11 normal + 3 son dakika), Orta Saha 13 (10 + 3), Defans 13 (11 + 2).
     * `clutch: true` olanlar sadece maçın son pozisyonunda çıkar.
     */
    buildExtraScenarios: function(pos, ctx) {
        const self = this;
        const ps = this.playerState;
        const { teammate, sho, pas, spe, dri, def, phy } = ctx;

        const S = (v, t) => self.calculateStatSuccess(v, t);
        const R = (v, t, pen, lo, hi) => Math.max(lo, Math.min(hi, S(v, t) - pen));
        const avg = (a, b) => (a + b) / 2;
        const trust = (d) => { ps.hocaGuveni = Math.max(0, Math.min(100, (ps.hocaGuveni || 40) + d)); };
        const chem = (d) => { ps.takimUyumu = Math.max(0, Math.min(100, (ps.takimUyumu || 50) + d)); };

        // Sonuç üreticiler (mevcut senaryolarla aynı istatistik/skor kurallarını kullanır)
        const goal = (msg, tr) => () => {
            self.score.player++;
            self.playerStats.goals++;
            self.playerStats.shots++;
            if (tr) trust(tr);
            return self.checkGoalCommentary(msg);
        };
        const assist = (msg) => () => {
            self.score.player++;
            self.playerStats.assists++;
            self.playerStats.passes++;
            trust(2);
            chem(2);
            return msg;
        };
        const tackle = (msg, tr, ch) => () => {
            self.playerStats.tackles = (self.playerStats.tackles || 0) + 1;
            if (tr) trust(tr);
            if (ch) chem(ch);
            return msg;
        };
        const pass = (msg, tr, ch) => () => {
            self.playerStats.passes++;
            if (tr) trust(tr);
            if (ch) chem(ch);
            return msg;
        };
        const shotMiss = (msg, tr) => () => {
            self.playerStats.shots++;
            if (tr) trust(tr);
            return msg;
        };
        const passMiss = (msg) => () => {
            self.playerStats.passes++;
            return msg;
        };
        const plain = (msg, tr, ch) => () => {
            if (tr) trust(tr);
            if (ch) chem(ch);
            return msg;
        };
        const opt = (text, effect, chance, onSuccess, onFail) => ({ text, effect, successChance: chance, onSuccess, onFail });
        const sc = (title, description, options, clutch) => ({ title, description, options, clutch: !!clutch });

        if (pos === "Defans") {
            return [
                sc(`🗣️ Arka Direkte Unutulan Forvet`,
                    `Rakip kanattan orta yapmaya hazırlanıyor. Arka direkte boşta kalan forveti fark ettin ama diğer stoperle markaj konusunda anlaşamadınız.`, [
                    opt(`📣 Sesli Haber Ver, Markajı Devral`, `Savunma yeteneğine bağlı.`, S(def, "att"),
                        tackle(`Zamanında bağırıp markajı devraldın; forvet topa ulaşamadan etkisiz kaldı. Stoper arkadaşın başıyla teşekkür etti.`, 0, 1),
                        plain(`Markaj kaydı, forvet topla buluştu ama şutu üst direğin üzerinden auta gitti. Şanslıydınız.`)),
                    opt(`🏃 Forvete Yapışıp Ortayı Kafayla Uzaklaştır`, `Fizik gücüne bağlı.`, S(phy, "att"),
                        tackle(`Forvetin yanına yapışıp ortayı kafayla uzaklaştırdın. Doğru pozisyon alma bu pozisyonda fark yarattı.`),
                        plain(`Hava topunda geç kaldın, forvet kafayı vurdu ama top yan ağa gitti.`)),
                    opt(`🤝 Kaleciye Alan Bırak, Çıkmasını İste`, `Pas ve iletişim yeteneğine bağlı.`, S(pas, "mid"),
                        pass(`Kaleciye çıkış hakkını bırakıp tehlikeyi onun uzaklaştırmasını sağladın. İyi bir iletişim örneğiydi.`),
                        passMiss(`Kaleci çıkıp çıkmama konusunda tereddüt etti, top arada kaldı ve kornere gitti.`))
                ]),
                sc(`🌪️ Kontra Atakta İkiye Bir`,
                    `Rakip hızlı bir kontrayla ikiye bir pozisyon yarattı; sen ve kaleci son çaresiniz. Topu taşıyan oyuncu hızla yaklaşıyor, yanında koşan arkadaşı da seçenek.`, [
                    opt(`🛡️ Topu Taşıyana Gidip Pas Hattını Kapat`, `Savunma yeteneğine bağlı.`, S(def, "att"),
                        tackle(`Taşıyıcının üstüne giderken pas hattını da kapattın. Forvet ne yapacağını bilemedi ve şutunu aceleyle kaleciye çekti.`),
                        plain(`Pas hattını kapatamadın; rakip topu yanındaki arkadaşına çıkardı ama şut yan direğin dışından auta gitti.`)),
                    opt(`⚡ Pas Hattına Geç, Şutu Kaleciye Bırak`, `Hız yeteneğine bağlı.`, S(spe, "att"),
                        tackle(`Hızla pas koridoruna girdin; rakip şutu kendi çekmek zorunda kaldı ve kaleci rahatça kurtardı.`),
                        plain(`Hızın yetmedi; ikinci oyuncu topu aldı ama şut direkten döndü. Büyük şanssızlık değil, büyük şanstı.`)),
                    opt(`💪 Taşıyıcıya Girip Faulü Göze Al`, `Fizik gücüne bağlı (Riskli).`, R(phy, "att", 0.08, 0.2, 0.65),
                        tackle(`Taktik faul değil, temiz bir omuz mücadelesiyle atağı kestin. Hakem oyunu durdurmadı bile.`),
                        plain(`Mücadeleye sert girdin, hakem düdüğü çaldı ve seni sözlü olarak uyardı. Hoca kenardan sert bir bakış attı.`, -1))
                ]),
                sc(`💥 Ceza Sahasında Karambol`,
                    `Ceza sahasında top yerde seken, bir sürü ayak topa uzanıyor. Kalecimiz yerde, rakip forvetler de yetişmek üzere.`, [
                    opt(`🦶 Önce Davranıp Topu Uzaklaştır`, `Savunma yeteneğine bağlı.`, S(def, "att"),
                        tackle(`Karambolun ortasında ilk sen topa dokundun ve uzaklaştırdın. Ceza sahasında panik anları yaşandı ama sen soğukkanlı kaldın.`),
                        plain(`Topa ayak uzattın ama temas zayıf kaldı; top rakibe gitti, şut direğin yanından auta çıktı.`)),
                    opt(`💪 Rakip Forveti İtip Alanı Kapat`, `Fizik gücüne bağlı.`, S(phy, "att"),
                        tackle(`Rakip forveti gövdenle sıkıştırıp topu kaleciye bıraktın. Hakem bu temasa itiraz etmedi.`),
                        plain(`İtmeye çalışırken hakem faul çaldı; ceza sahasında çok şanslıydınız, serbest vuruş boşa gitti.`)),
                    opt(`🧤 Topu Kaleciye Yönlendir`, `Pas yeteneğine bağlı.`, S(pas, "mid"),
                        pass(`Topu kalecimize doğru yönlendirdin, o da sarılarak tehlikeyi bitirdi.`),
                        passMiss(`Yönlendirdiğin top biraz sert oldu, kaleci zorlansa da kornere çıkardı.`))
                ]),
                sc(`🧱 Duvarın Başındaki Adam`,
                    `Rakip, ceza sahası kenarında serbest vuruş kazandı. Duvarın başındasın; vuruşu yapacak oyuncu ya duvarı ya da köşeyi hedef alacak gibi duruyor.`, [
                    opt(`🧗 Sıçrayıp Topu Duvarda Bloke Et`, `Fizik gücüne bağlı.`, S(phy, "att"),
                        tackle(`Duvarın tam zamanında sıçrayıp topu bloke ettin. Top kornere gitti ve tehlike atlatıldı.`),
                        plain(`Zıplama zamanlaması hatalıydı; top duvarın üstünden geçti ama kalecimiz son anda köşeden çıkardı.`)),
                    opt(`🛡️ Duvarı Dizip Ceza Sahasındaki Koşuları İzle`, `Savunma yeteneğine bağlı.`, S(def, "att"),
                        tackle(`Duvarı düzgün dizip serbest vuruşu çıkarmasına izin vermedin; top güvenle uzaklaştı.`),
                        plain(`Duvardaki bir boşluktan top içeri girdi ama neyse ki kaleci uzandı ve çeldi.`)),
                    opt(`📣 Hakemden Duvar Mesafesini Kontrol Ettir`, `Pas ve zeka yeteneğine bağlı.`, S(pas, "mid"),
                        plain(`Hakem mesafeyi adım adım ölçtü, vuruş bir an yavaşladı ve savunma toparlandı. Soğukkanlılığın göze çarptı.`, 1),
                        plain(`Hakem uyarını dikkate almadı, vuruş hızla kullanıldı ama şut zayıf kaldı.`))
                ]),
                sc(`🌧️ Kaygan Zeminde Müdahale`,
                    `Sağanak yüzünden zemin çok kaygan. Rakip forvet topla ilerliyor ve kayarak müdahale etmek riskli.`, [
                    opt(`🦶 Kayarak Topu Almayı Dene`, `Savunma yeteneğine bağlı (Riskli).`, R(def, "att", 0.08, 0.2, 0.65),
                        tackle(`Islak zeminde kayarak yaptığın müdahale kusursuzdu; topu tertemiz aldın ve tribünler alkışladı.`),
                        plain(`Kayarken zemin seni yanıltıp rakibi geçirdi. Neyse ki kaleci şutu çevirdi.`, -1)),
                    opt(`🧍 Ayakta Bekle, Alanı Kapat`, `Savunma yeteneğine bağlı.`, S(def, "att"),
                        tackle(`Sabırlı davranıp ayakta bekledin ve forvet hata yapınca topu aldın. Zemin koşullarına çok iyi uyum sağladın.`),
                        plain(`Çok geride beklediğin için forvet rahat şut çekti ama top kaleciye yakalandı.`)),
                    opt(`🧠 Forveti Çizgiye Sıkıştırıp Taça Çıkar`, `Hız yeteneğine bağlı.`, S(spe, "att"),
                        tackle(`Forveti çizgiye doğru yönlendirip taça çıkardın. Takım nefes aldı.`),
                        plain(`Hızlandığında ayağın kaydı, forvet ceza sahasına girdi ama şutu yan ağa gitti.`))
                ]),
                sc(`🥋 Sırtı Dönük Forvetin Oyunu`,
                    `Rakip forvet sırtı dönük topu saklıyor, dönmek için fırsat kolluyor. Arkasındasın ve zamanlamayı tutturman gerekiyor.`, [
                    opt(`🦵 Arkadan Topa Uzanıp Kes`, `Savunma yeteneğine bağlı.`, S(def, "att"),
                        tackle(`Tam forvet dönmek üzereyken arkadan topa uzandın ve kestin. Faul bile olmadı.`),
                        plain(`Arkadan uzanırken faul oldu; hakem düdüğü çaldı ve seni uyardı.`, -1)),
                    opt(`💪 Sırt Sırta İtip Dengesini Boz`, `Fizik gücüne bağlı.`, S(phy, "att"),
                        tackle(`Gövde gücünle forveti dengesizleştirip topu aldın. Hakem pozisyonu normal gördü.`),
                        plain(`Forveti itmeye çalışırken kendin dengeni kaybettin ama arkadaşın tehlikeyi savuşturdu.`)),
                    opt(`🧠 Bekle, Döndüğü Anda Müdahale Et`, `Savunma zekasına bağlı.`, S(def, "mid"),
                        tackle(`Sabırla bekleyip forvet döndüğü anda topu ayağından aldın. Tecrübeli bir stoper gibi oynadın.`),
                        plain(`Çok bekledin; forvet dönüp şutunu çekti ama top direğin dışından auta gitti.`))
                ]),
                sc(`🔧 Bek Arkadaşının Hatasından Dönüş`,
                    `Bek arkadaşımız topu rakibe kaptırdı; rakip hızla boşalan alana koşuyor. Kademe yapmak için çok az zamanın var.`, [
                    opt(`🏃 Geriye Depar Atıp Kademeye Gir`, `Hız yeteneğine bağlı.`, S(spe, "att"),
                        tackle(`Hızlı bir şekilde geri dönüp kademeye girdin. Arkadaşının hatasını sen telafi ettin.`, 0, 1),
                        plain(`Geç kaldın ama rakip şutu aceleyle çekti ve top ağlara gitmeden dışarı çıktı.`)),
                    opt(`🛡️ Rakibi Dışarıya Yönlendirip Zaman Kazan`, `Savunma yeteneğine bağlı.`, S(def, "att"),
                        tackle(`Rakibi dışarıya yönlendirerek takımın geri dönmesi için gerekli zamanı kazandın.`),
                        plain(`Yönlendirme tutmadı ama rakip şutu direkten dışarı attı.`)),
                    opt(`🗣️ Kaleciyi Uyarıp Çıkışını Hazırla`, `Pas ve iletişim yeteneğine bağlı.`, S(pas, "mid"),
                        pass(`Kaleciyi zamanında uyarıp çıkışa hazırladın; rakibin şutu direkt kaleciye geldi.`),
                        passMiss(`Kaleci ne yapacağını bilemedi ama şans eseri şut yan ağa gitti.`))
                ]),
                sc(`✋ Elle Temas Şüphesi`,
                    `Rakip ceza sahasına şut çekti; top sana doğru geliyor. Kolunu kapatırsan şutu engelleyebilirsin ama el kararı riski var.`, [
                    opt(`🙌 Kollarını Arkaya Atıp Bacakla Bloke Et`, `Savunma yeteneğine bağlı.`, S(def, "att"),
                        tackle(`Kollarını arkaya atıp bacağınla şutu bloke ettin; hakem el için bakmadı bile. Çok akıllıca bir savunma hareketi.`),
                        plain(`Bacağın yetişmedi; şut kalecimiz tarafından çıkarıldı. Kendini fazla riske atmadın.`)),
                    opt(`🦶 Kayarak Şutu Çelmeye Git`, `Savunma yeteneğine bağlı (Riskli).`, R(def, "att", 0.08, 0.2, 0.65),
                        tackle(`Kayarak şutun önüne girdin ve topu kornere çıkardın. Tribünler seni alkışladı.`),
                        plain(`Kayarken top koluna çarptı; hakem kararı VAR'a bırakınca takım nefesini tuttu. Neyse ki penaltı verilmedi.`, -1)),
                    opt(`🧱 Vücudunu Siper Edip Hakemi İzle`, `Fizik gücüne bağlı.`, S(phy, "att"),
                        tackle(`Vücudunu siper edip şutu göğsünle durdurdun. El hatası yok, tehlike yok.`),
                        plain(`Siper aldığın top yan ağa gitti. Hakem el için bir şey görmedi.`))
                ]),
                sc(`🔺 İki Forvete Karşı Alan Paylaşımı`,
                    `Rakibin iki forveti seni ve iki arkadaşını çaprazlama koşularla yoruyor. Alan paylaşımı bozulursa gol yeme riski var.`, [
                    opt(`🗣️ Savunma Hattını Yeniden Düzenle`, `Savunma yeteneğine bağlı.`, S(def, "att"),
                        tackle(`Hattı yeniden düzenleyip alan paylaşımını düzelttin. Rakip forvetler çaresiz kaldı.`, 0, 1),
                        plain(`Düzenleme biraz geç oldu ama rakip şutu kaleciye çekti.`)),
                    opt(`🏃 Forvet Koşularını Takip Et`, `Hız yeteneğine bağlı.`, S(spe, "att"),
                        tackle(`Forvetin koşularını adım adım takip edip pas hattını bozdun.`),
                        plain(`Koşu takibinde geride kaldın ama kaleci son anda atıldı.`)),
                    opt(`💪 Fiziksel Mücadeleyle Pas Hattını Kes`, `Fizik gücüne bağlı.`, S(phy, "att"),
                        tackle(`Fiziksel gücünle rakip forvete yaklaşıp pas hattını kestin.`),
                        plain(`Mücadeleye gittin ama rakip topu yan tarafa çıkardı; tehlike atlatıldı.`))
                ]),
                sc(`🟨 Sarı Kart Riski`,
                    `Daha önce uyarı almışsın. Rakip hızlı kanat oyuncusu kontrada önüne çıkıyor; sert müdahale edersen kart görebilirsin.`, [
                    opt(`🧠 Sert Girme, Kademe Alıp Yönlendir`, `Savunma zekasına bağlı.`, S(def, "att"),
                        tackle(`Soğukkanlılığını korudun; sert müdahale yerine kademe alıp onu çizgiye yönlendirdin. Hoca bu akıllı oyunu not etti.`, 1),
                        plain(`Kademe aldın ama kanat oyuncusu seni geçip ortaladı; top kornere gitti.`)),
                    opt(`🦶 Riski Göze Al, Kayarak Müdahale Et`, `Savunma yeteneğine bağlı (Riskli).`, R(def, "att", 0.12, 0.2, 0.6),
                        tackle(`Kayarak yaptığın müdahale tertemizdi; topu aldın, kart gösterilmedi. Tribünler ayağa kalktı.`),
                        plain(`Müdahale tam olmadı, hakem faul çaldı. Kart yememen bir şanstı; hoca seni kenardan uyardı.`, -2)),
                    opt(`📣 Arkadaşını Uyar, Kademeye Girsin`, `Pas ve iletişim yeteneğine bağlı.`, S(pas, "mid"),
                        pass(`Arkadaşını zamanında uyardın, kademeye girip tehlikeyi savuşturdu. Takım olarak savundunuz.`, 0, 1),
                        passMiss(`Uyarın geç kaldı ama kanat oyuncusu şutu direğin dışından attı.`))
                ]),
                sc(`🧤 Kaleci Çıkışında Karışıklık`,
                    `Rakip uzun top gönderdi; kaleci ve sen aynı topa doğru koşuyorsunuz. Kimin çıkacağına karar vermek için sadece bir saniyen var.`, [
                    opt(`📣 "Bende!" Diye Bağırıp Topu Al`, `Savunma yeteneğine bağlı.`, S(def, "att"),
                        tackle(`"Bende!" diye bağırıp topu aldın; kaleci duraksayıp sana alan bıraktı. İletişim kusursuzdu.`, 0, 1),
                        plain(`Karar vermekte tereddüt ettiniz ama kaleci son anda topu uzaklaştırdı.`)),
                    opt(`🛑 Kaleciye Bırakıp Rakibi Bloke Et`, `Fizik gücüne bağlı.`, S(phy, "att"),
                        tackle(`Kaleciye alan bırakıp rakip forveti gövdenle bloke ettin. Kaleci topu rahatça kucakladı.`),
                        plain(`Bloke ettin ama rakip forvet düştü; hakem düdüğü çalmadı, oyun devam etti.`)),
                    opt(`🦶 Topu Taca Dikip Tehlikeyi Önle`, `Garanti savunma.`, Math.min(0.90, S(def, "mid") + 0.10),
                        pass(`Topu taça dikerek tehlikeyi bitirdin. Bu pozisyonda risk almak yerine garantiyi seçtin.`),
                        passMiss(`Taç çizgisine gönderirken top kornere gitti ama tehlike atlatıldı.`))
                ]),
                // ---- Son dakika (clutch) ----
                sc(`⏳ Son Dakikanın Ortası`,
                    `Skoru korumak için son dakikalardayız. Rakip ceza sahasına yüklenip son bir orta yolladı; top havada, kalabalığın içinde.`, [
                    opt(`✈️ Havada Üstünlük Kurup Kafayla Uzaklaştır`, `Fizik gücüne bağlı.`, S(phy, "att"),
                        tackle(`Havada herkesin üstüne çıkıp topu kafayla uzaklaştırdın. Takım arkadaşların sana sarıldı, maç kurtarıldı!`, 2),
                        plain(`Topa yükseldin ama temas yetersiz kaldı; top ceza sahasında seken ama kaleci son anda sarıldı.`)),
                    opt(`🛡️ Rakip Forvetin Önüne Girip Topu Kes`, `Savunma yeteneğine bağlı.`, S(def, "att"),
                        tackle(`Forvetin önüne girip topu kestin. Son dakikanın baskısı altında soğukkanlı kaldın.`, 2),
                        plain(`Forvetin önüne geçemedin ama kafa vuruşu auta çıktı. Nefesler tutuldu.`)),
                    opt(`🧤 Kaleciyle Birlikte Tehlikeyi Savuştur`, `Pas ve iletişim yeteneğine bağlı.`, S(pas, "mid"),
                        pass(`Kaleciyle birlikte uyumla hareket edip topu uzaklaştırdınız.`, 1, 1),
                        passMiss(`Kaleciyle anlaşamadınız ama top neyse ki yan ağa gitti.`))
                ], true),
                sc(`🏴 Son Korner: Rakip Kaleci de Geldi`,
                    `Son dakikalar. Rakip kaleci bile kornere çıkmış; ceza sahasında kalabalık. Top uzaklaşırsa kontra şansımız var ama tek hatada gol yersin.`, [
                    opt(`🦶 Kafayla Uzaklaştır, Kontraya Başla`, `Fizik gücüne bağlı.`, S(phy, "att"),
                        tackle(`Topu kafayla uzaklaştırıp kontraya başlattın; rakip kaleci çaresizce geri dönmeye çalıştı. Büyük bir cesaret.`, 2),
                        plain(`Kafa vuruşun zayıf kaldı, top kısa uzaklaştı ama kaleci son anda kornere çıkardı.`)),
                    opt(`🛡️ Boş Kaleye Gidecek Şutu Önlemek İçin Yer Al`, `Savunma yeteneğine bağlı.`, S(def, "att"),
                        tackle(`Doğru yer alıp rakibin şutunu bloke ettin. Son dakikada bu hareket maçı kurtardı!`, 2),
                        plain(`Yer almada geç kaldın ama şut yan direğin dışından auta çıktı.`)),
                    opt(`📣 Takımı Uyar, Savunma Hattını Koru`, `Pas ve iletişim yeteneğine bağlı.`, S(pas, "mid"),
                        pass(`Takımı uyarıp savunma hattını korumalarını sağladın. Rakip kornerden sonra hiçbir şey çıkaramadı.`, 1, 1),
                        passMiss(`Takım arkadaşların seni duymadı ama rakip top kontrolünü kaybetti.`))
                ], true)
            ];
        }

        if (pos === "Orta Saha") {
            return [
                sc(`🚦 Hakemin Avantaj Kararı`,
                    `Rakip seni arkadan itti ama hakem avantaj işareti yaptı; top hâlâ ayağında ve ileriye açık bir koridor var.`, [
                    opt(`🏃 Avantajı Kullanıp Topu Önüne At ve Koş`, `Dribbling yeteneğine bağlı.`, S(dri, "mid"),
                        pass(`Avantajı mükemmel kullanıp topu önüne attın ve takımı hızlı bir geçişe taşıdın. Tribünler alkışladı.`),
                        passMiss(`Topu fazla uzattın, rakip kapıp avantajı bitirdi.`)),
                    opt(`👟 Hızlıca ${teammate}'ye Ver`, `Pas yeteneğine bağlı asist.`, S(pas, "def"),
                        assist(`Avantajı bozmadan ${teammate}'ye çevirdin, o da boş bulduğu alanda ağlara gönderdi. Hakem düdüğünü çalmadı, gol sayıldı.`),
                        passMiss(`Pas biraz yavaş kaldı, rakip araya girip avantajı bitirdi.`)),
                    opt(`🛑 Dur ve Faulü Oyna`, `Fizik gücüne bağlı.`, S(phy, "mid"),
                        plain(`Avantajı bırakıp durarak hakemden faul istedin; düdük çaldı ve takım toparlanma fırsatı buldu.`),
                        plain(`Hakem oyunu devam ettirdi, top rakibe geçti.`))
                ]),
                sc(`🩹 Yorgun Bacaklar`,
                    `Kondisyonun düşmeye başladı, bacaklar ağırlaştı. Rakip orta sahayı bastırıyor ve topu kaybetme riskin yüksek.`, [
                    opt(`💪 Dişini Sık, Fiziksel Mücadeleye Gir`, `Fizik gücüne bağlı.`, S(phy, "mid"),
                        tackle(`Yorgun olmana rağmen gövdeni koyup topu aldın. Takım arkadaşların senin bu mücadele ruhunu fark etti.`, 0, 1),
                        plain(`Yorgunluktan mücadeleyi kaybettin, hakem faul çaldı ve takım nefes aldı.`)),
                    opt(`🧠 Basit Oyna: Tek Dokunuşla Pas Ver`, `Pas yeteneğine bağlı.`, S(pas, "mid"),
                        pass(`Basit oynayıp tek dokunuşla topu verdin; takım rahat oynamaya devam etti.`),
                        passMiss(`Yorgun olduğun için pas biraz kısa kaldı, rakip araya girdi.`)),
                    opt(`🏃 Rakibi Takip Et, Hata Yapmasını Bekle`, `Hız yeteneğine bağlı.`, S(spe, "mid"),
                        plain(`Rakibi yakından takip ettin; o da acele edip topu taçtan dışarı attı. Bu yorgunluk anında akıllı bir karar.`, 1),
                        plain(`Hızın yetmedi, rakip topla ilerledi ama savunma kapattı.`))
                ]),
                sc(`👁️ Rakip 10 Numaranın Gölgesi`,
                    `Rakibin oyun kurucusu maç boyunca ceza sahası önünde tehlike yaratıyor. Topu aldığında dönmesini engellemen gerek.`, [
                    opt(`🛡️ Arkasına Yapışıp Dönmesini Engelle`, `Savunma yeteneğine bağlı.`, S(def, "mid"),
                        tackle(`Oyun kurucunun arkasına yapışıp dönmesine izin vermedin; top geriye gitti. Hocanın istediği disiplin tam olarak buydu.`, 1),
                        plain(`Oyun kurucu seni geçip çevrildi ama pas yan tarafa gitti.`)),
                    opt(`🦶 Alan Kapatıp Pas Yollarını Kes`, `Hız yeteneğine bağlı.`, S(spe, "mid"),
                        tackle(`Pas yollarını kapatıp oyun kurucuyu etkisiz hale getirdin. Rakip orta saha ritmini kaybetti.`),
                        plain(`Alan kapatmaya çalışırken oyun kurucu pasını çıkardı ama savunma hattı temizledi.`)),
                    opt(`💪 Taktik Faulle Atağı Kes`, `Fizik gücüne bağlı.`, S(phy, "mid"),
                        plain(`Atağı ustalıkla faulle kestin; hakem uyarı yaptı ama tehlike geçti.`),
                        plain(`Faul yaptın ama zamanlama kötüydü; hakem sarı kartı cebinden çıkarıp seni uyardı.`, -1))
                ]),
                sc(`🚩 Korner Kullanıcısı`,
                    `Takımın kornerini sen kullanacaksın. Ceza sahasında stoperler ve forvetler yerlerini aldı; kaleci de dikkatli.`, [
                    opt(`🎯 Ön Direğe Sert ve Alçak Vur`, `Pas yeteneğine bağlı asist.`, S(pas, "def"),
                        assist(`Ön direğe attığın sert top forvetin ayağına gitti ve gol geldi. Çalışılmış bir korner gibiydi!`),
                        passMiss(`Orta çok sertti; ön direkteki oyuncu topa ayak uzatamadı.`)),
                    opt(`🚀 Doğrudan Kaleye Falsolu Şut Dene`, `Şut yeteneğine bağlı (Çok riskli).`, R(sho, "def", 0.25, 0.15, 0.35),
                        goal(`Kornerden doğrudan olimpik gol! Top kalecinin elleri arasında dönerek ağlara girdi. Stadyum inledi!`),
                        shotMiss(`Falsolu şut kalenin dışına doğru gitti; kaleci izlemekle yetindi.`, -1)),
                    opt(`👟 Kısa Korner Yapıp ${teammate}'ye Ver`, `Pas yeteneğine bağlı.`, S(pas, "mid"),
                        pass(`Kısa korneri kullanıp topu ${teammate}'ye verdin; takım yeniden oyun kurabildi.`, 0, 1),
                        passMiss(`Kısa korner rakip tarafından kesildi, hızlı bir kontra tehlikesi doğdu.`))
                ]),
                sc(`🧲 İkinci Top Savaşı`,
                    `Rakip uzun top atıyor, forvet kafayla uzatınca top orta sahada havada. Her iki takım da ikinci topa doğru koşuyor.`, [
                    opt(`🏃 Önce Davranıp Topu Al`, `Hız yeteneğine bağlı.`, S(spe, "mid"),
                        pass(`Rakipten önce topa ulaşıp takımın oyun kurmasını sağladın.`),
                        passMiss(`Rakip senden önce topa ulaştı ama pasını yanlış verdi.`)),
                    opt(`💪 Rakibi Gövdenle Engelleyip Topu Koru`, `Fizik gücüne bağlı.`, S(phy, "mid"),
                        tackle(`Rakibi gövdenle engelleyip topu koruyarak takıma verdin. Orta sahada güvenli bir oyun.`),
                        plain(`Mücadeleyi kaybettin ama rakip pasını bozdu.`)),
                    opt(`🦶 Havadan Gelen Topu Direkt Oyuna Sok`, `Pas ve Fizik ortalamasına bağlı.`, S(avg(pas, phy), "mid"),
                        pass(`Havadan gelen topa direkt vurup oyunu ters kanada çevirdin. Zekice bir hareketti.`),
                        passMiss(`Direkt vuruş biraz sert oldu ve top taca gitti.`))
                ]),
                sc(`😠 Takım Arkadaşıyla Tartışma`,
                    `${teammate} geç gelen pası yüzünden sana bağırıyor, tribünler de bunu fark etti. Takım içinde gerginlik başlamak üzere.`, [
                    opt(`🧘 Sakin Kal, El İşaretiyle Yatıştır`, `Pas ve iletişim yeteneğine bağlı.`, S(pas, "mid"),
                        plain(`Sakin bir el işaretiyle ${teammate}'yi yatıştırdın; takım arkadaşların ve hoca bu olgunluğu fark etti.`, 1, 3),
                        plain(`${teammate} sakinleşmedi; iki oyuncu arasında kısa bir tartışma yaşandı.`, 0, -1)),
                    opt(`😤 Aynı Tonda Karşılık Ver`, `Fizik ve karakter dengesine bağlı (Riskli).`, R(phy, "mid", 0.15, 0.25, 0.5),
                        plain(`Karşılığını verince ${teammate} geri adım attı ama hoca kenardan sesini yükseltmemeni söyledi.`, -1, 1),
                        plain(`Tartışma büyüdü, hakem iki oyuncuyu uyardı. Takım içinde havalar gerildi.`, -2, -3)),
                    opt(`⚽ İlk Fırsatta ${teammate}'ye Güzel Bir Pas Ver`, `Pas yeteneğine bağlı asist.`, S(pas, "def"),
                        assist(`Gerilimi unutturmak için ${teammate}'ye müthiş bir pas verdin; o da golü attı ve sana teşekkür etti. Tartışma sahada kapandı!`),
                        passMiss(`Pas yeterince iyi olmadı; ${teammate} bu kez sessiz kaldı ama bakışları her şeyi anlatıyordu.`))
                ]),
                sc(`🪄 Topu Geçir (Dummy)`,
                    `Kanattan yan top geldi; ${teammate} arkandan hızla koşuyor. Topa dokunmadan geçirirsen savunmayı yanıltabilirsin.`, [
                    opt(`🪄 Dokunmadan Arkandaki ${teammate}'ye Geçir`, `Dribbling yeteneğine bağlı asist.`, S(dri, "def"),
                        assist(`Topa dokunmadan geçirip stoperlerin pozisyon hatası yapmasını sağladın; ${teammate} boş kaleye gönderdi. Seyircinin ağzı açık kaldı.`),
                        passMiss(`Topu geçirdiğin an stoper kapattı, ${teammate} pas alamadı.`)),
                    opt(`🎯 Topa Dokunup Tek Vuruşla Vur`, `Şut yeteneğine bağlı (Riskli).`, R(sho, "def", 0.15, 0.18, 0.5),
                        goal(`Topa tek dokunuşla vurdun; top ağların köşesine gitti. Kaleci hamle bile yapamadı!`),
                        shotMiss(`Tek vuruşu ters oturttun, top üst direğin üzerinden auta gitti.`)),
                    opt(`🔁 Topu Önüne Alıp Oyunu Yeniden Kur`, `Pas yeteneğine bağlı.`, S(pas, "mid"),
                        pass(`Topu önüne alıp sakin bir şekilde oyunu yeniden kurdun. Takım arkadaşların nefes aldı.`),
                        passMiss(`Topu önüne alırken rakip araya girdi ama tehlike yaratmadı.`))
                ]),
                sc(`⚙️ Kanat Bek Bindirmesi`,
                    `Kenar bek hızla arkandan bindiriyor; rakip bek de kafası karışmış durumda. İçeri kat edebilir ya da bekine verip çizgiye indirebilirsin.`, [
                    opt(`👟 Bindiren Beke Pas Ver`, `Pas yeteneğine bağlı asist.`, S(pas, "def"),
                        assist(`Bindiren beke pas verip rakip beki çaresiz bıraktın; ortadan gol geldi. Takım uyumunun en güzel hali!`),
                        passMiss(`Pas fazla sert gitti, bek topa yetişemedi ve top taça çıktı.`)),
                    opt(`⚽ İçeri Kat Edip Vuruşunu Yap`, `Dribbling yeteneğine bağlı (Riskli).`, R(dri, "def", 0.08, 0.2, 0.6),
                        goal(`İçeri kat edip kalecinin açıkta bıraktığı köşeye vurdun. Bek kendi kendine bakakaldı!`),
                        shotMiss(`İçeri kat ederken stoper önünü kesti ve şutun bloke edildi.`)),
                    opt(`🔁 Topu Tutup Bekin Boşta Kalmasını Bekle`, `Pas yeteneğine bağlı.`, S(pas, "mid"),
                        pass(`Topu tutarak oyunu yavaşlattın ve bek daha iyi pozisyon aldı; takım sakin bir şekilde oyun kurdu.`),
                        passMiss(`Topu fazla tuttun, rakip baskıyı artırıp topu kaptı.`))
                ]),
                sc(`🌊 İkinci Yarı Başında Baskı Dalgası`,
                    `Rakip ikinci yarıya çok iyi başladı; üst üste ataklar geliyor. Takım geriye çekilmiş durumda ve topu bulmak zorlaşıyor.`, [
                    opt(`🛡️ Pas Arasına Girip Baskıyı Kır`, `Savunma yeteneğine bağlı.`, S(def, "mid"),
                        tackle(`Rakibin pasını kesip baskıyı kırdın. Takım sonunda nefes aldı ve oyuna döndü.`, 1),
                        plain(`Pasa uzandın ama yetişemedin; rakip hücuma devam etti.`)),
                    opt(`🧊 Topu Saklayıp Oyunu Yavaşlat`, `Dribbling yeteneğine bağlı.`, S(dri, "mid"),
                        pass(`Topu saklayıp oyunu yavaşlatman rakibin ritmini bozdu. Hocanın istediği tam olarak buydu.`, 1),
                        passMiss(`Topu saklamaya çalışırken baskı altında kaldın ve rakip topu çaldı.`)),
                    opt(`🚀 Uzun Topla Baskıyı Atlat`, `Pas yeteneğine bağlı.`, S(pas, "att"),
                        pass(`Uzun topla baskıyı atlattın ve takım yarı sahaya çıktı. Orta saha arkadaşların rahat nefes aldı.`),
                        passMiss(`Uzun top ileriye gitti ama rakip defans kolayca topu aldı.`))
                ]),
                sc(`🔍 Hatlar Arasındaki Boşluk`,
                    `Rakibin orta saha ile defans hattı arasında bir boşluk fark ettin. Topu aldığında arkanı dönmek için yalnızca bir saniyen var.`, [
                    opt(`🔄 Dönüp Dikine Pas At`, `Pas yeteneğine bağlı asist.`, S(pas, "def"),
                        assist(`Dönüp attığın dikine pas defansı yardı ve forvet golü buldu. Hatlar arası boşluğu bulmak buydu!`),
                        passMiss(`Dönerken zamanlamayı tutturamadın, pas rakip stoperin ayağında kaldı.`)),
                    opt(`🚀 Dönüp Şutunu Çek`, `Şut yeteneğine bağlı (Zor deneme).`, R(sho, "def", 0.18, 0.18, 0.45),
                        goal(`Dönüp attığın şut kalecinin uzanamayacağı noktadan ağlara gitti. Hatlar arası bir oyuncudan beklenen gol!`),
                        shotMiss(`Dönüp şut çekerken top yukarı çıktı, tribüne gitti.`)),
                    opt(`🛑 Topu Saklayıp Faul Kazan`, `Fizik gücüne bağlı.`, S(phy, "mid"),
                        plain(`Topu sırtınla saklayıp faul kazandın; takım toparlanma fırsatı buldu.`),
                        plain(`Topu saklayamadın ama hakem faul vermedi, oyun devam etti.`))
                ]),
                // ---- Son dakika (clutch) ----
                sc(`⏱️ Beraberlikte Son Dakikalar`,
                    `Skor beraber ve son dakikalara girildi. Orta sahada topu aldın, bütün takım gözünü sana dikmiş.`, [
                    opt(`🎯 Savunma Arkasına Ölümcül Ara Pas`, `Pas yeteneğine bağlı asist.`, S(pas, "def"),
                        assist(`Son dakikada savunma arkasına yolladığın ara pasla forvet golü attı! Stadyum çıldırdı!`),
                        passMiss(`Ara pas çok sert gitti ve kaleci kolayca yakaladı. Son fırsat harcandı.`)),
                    opt(`🚀 25 Metreden Şansını Dene`, `Şut yeteneğine bağlı (Zor deneme).`, R(sho, "def", 0.20, 0.15, 0.42),
                        goal(`25 metreden attığın füze direğin içinden ağlara gitti! Son dakikada gelen bu gol maçı çevirdi!`, 2),
                        shotMiss(`25 metreden çekilen şut üst direğin hemen üzerinden auta gitti. Stadyumda sessizlik oldu.`, -1)),
                    opt(`⚽ Ceza Sahasına Dalıp Savunmayı Dağıt`, `Dribbling yeteneğine bağlı (Riskli).`, R(dri, "def", 0.10, 0.2, 0.55),
                        goal(`Ceza sahasına dalıp savunmayı dağıttın ve kalecinin açıkta bıraktığı köşeye vurdun! Son dakikada muhteşem bir gol!`, 2),
                        shotMiss(`Dalarken stoper topu ayağından aldı. Son fırsat da gitti.`))
                ], true),
                sc(`🪫 Gerideyken Son Hamle`,
                    `Skor aleyhimize ve son dakikalar. Rakip tüm takımıyla ceza sahasında; top sende ve şu an her şey sana bağlı.`, [
                    opt(`🎯 Ceza Sahasına Yüksek Top At`, `Pas yeteneğine bağlı asist.`, S(pas, "def"),
                        assist(`Ceza sahasına attığın yüksek top forvetin kafasında gole dönüştü! Maça geri döndünüz!`),
                        passMiss(`Yüksek top savunmanın kucağına gitti. Rakip rahat nefes aldı.`)),
                    opt(`🚀 Ceza Yayından Sert Vur`, `Şut yeteneğine bağlı (Zor deneme).`, R(sho, "def", 0.18, 0.15, 0.42),
                        goal(`Ceza yayından çıkan şut ağların köşesine gitti! Takım arkadaşların sana doğru koştu!`, 2),
                        shotMiss(`Sert şut kalecinin kucağına gitti. Son umut da kayboluyor.`, -1)),
                    opt(`🔁 Dar Alanda Duvar Pasıyla Gir`, `Pas ve Dribbling ortalamasına bağlı.`, S(avg(pas, dri), "def"),
                        goal(`Duvar pasıyla savunmayı yarıp ceza sahasına girdin ve kaleciyi geçtin! Muhteşem bir bireysel organizasyon!`, 2),
                        passMiss(`Duvar pası tutmadı, rakip topu çıkardı ve son şansımız da elden gitti.`))
                ], true),
                sc(`🛡️ Skoru Korurken Son Dakikalar`,
                    `Skor önde, maçın bitmesine az kaldı. Rakip son bir baskıya çıktı ve orta sahada topu kapma şansın var.`, [
                    opt(`🛡️ Rakibin Pasını Kesip Topu Köşeye Götür`, `Savunma yeteneğine bağlı.`, S(def, "mid"),
                        tackle(`Rakibin pasını kesip topu köşe bayrağına götürdün; saatin işlemesini sağladın. Tecrübeli bir hareket!`, 2),
                        plain(`Pası kesemedin ama rakip şutu kalecide kaldı.`)),
                    opt(`⚡ Topla Uzaklaşıp Zaman Harca`, `Dribbling yeteneğine bağlı.`, S(dri, "mid"),
                        pass(`Topla uzaklaşıp değerli saniyeler harcadın. Tribünler bunu fark edip alkışlıyor.`, 1),
                        passMiss(`Topu kaptırdın ama savunma hattı tehlikeyi temizledi.`)),
                    opt(`🚀 Topu En Uzak Noktaya Gönder`, `Garanti savunma.`, Math.min(0.90, S(pas, "mid") + 0.10),
                        pass(`Topu en uzak noktaya gönderip tehlikeyi önledin. Basit ama etkili!`),
                        passMiss(`Top taca gitti ama rakibe yeni bir atak imkanı verdin.`))
                ], true)
            ];
        }

        // ==================== FORVET ====================
        return [
            sc(`🌧️ Kaygan Zeminde Seken Top`,
                `Yağmur biraz önce dindi ama çim hâlâ kaygan. Ceza sahasında seken top sana da stopere de aynı mesafede, kaleci ise yerinden kıpırdadı.`, [
                opt(`🎯 İlk Dokunuşla İç Ayakla Köşeye Yönlendir`, `Şut yeteneğine bağlı.`, S(sho, "def"),
                    goal(`Zemin kaygan ama dokunuşun tertemizdi; top kalecinin sağından ağlara kadar kaydı. Ceza sahasındaki kalabalığın ortasında soğukkanlı kalmayı bildin!`, 1),
                    shotMiss(`Kaygan zeminde ayağın topa tam oturmadı, şut direğin yanından auta gitti.`)),
                opt(`⚽ Topu Önüne Alıp Kaleciyi Yatırmayı Dene`, `Dribbling yeteneğine bağlı (Riskli).`, R(dri, "def", 0.10, 0.22, 0.65),
                    goal(`Kaleci yere kapandığı anda topu bir kez daha önüne aldın ve boş kaleye bıraktın. Cesur bir karardı, sonuç da gol!`),
                    shotMiss(`Islak zeminde topu biraz fazla uzattın, kaleci ayaklarının dibinden alıp sarıldı.`, -1)),
                opt(`👟 Boştaki ${teammate}'ye Tek Dokunuşla Çevir`, `Pas yeteneğine bağlı asist (Takım oyunu).`, S(pas, "def"),
                    assist(`Topu kendin vurmak yerine ${teammate}'ye çevirdin, o da boş kaleye yolladı. Ceza sahasında bencillik yapmadığın için hoca kenarda başını salladı.`),
                    passMiss(`Çevirdiğin top kaygan zeminde hızlandı, ${teammate} yetişemedi.`))
            ]),
            sc(`🚩 Kornerden Sonra Dönen İkinci Top`,
                `Korner ceza sahasından uzaklaştırıldı ama top yarım yamalak sekerek sana geliyor. Ceza yayının hemen dışındasın ve önün açık.`, [
                opt(`🚀 Yerden Gelen Topa Vole Vur`, `Şut yeteneğine bağlı (Riskli).`, R(sho, "def", 0.15, 0.18, 0.55),
                    goal(`Vole tam yerini buldu! Top kimsenin müdahale edemeyeceği bir hızla ağlara girdi, ceza sahasındaki herkes bir an dondu kaldı.`),
                    shotMiss(`Vole denemen yukarı çıktı ve top tribüne gitti. Kornerden doğan nadir bir fırsattı.`, -1)),
                opt(`🧊 Topu Yere İndir, Kalecinin Hareketini Bekle`, `Dribbling yeteneğine bağlı.`, S(dri, "def"),
                    goal(`Topu önce yere indirip bir an bekledin, kaleci pozisyon bozunca köşeye bıraktın. Sakinliğin skoru değiştirdi.`),
                    shotMiss(`Topu indirirken ayağından uzaklaştı, stoper araya girip uzaklaştırdı.`)),
                opt(`👟 Kanatta Boşa Çıkan ${teammate}'ye Aç`, `Pas yeteneğine bağlı asist.`, S(pas, "def"),
                    assist(`Topu kanattaki ${teammate}'ye açtın, o da ortaladı ve gol geldi. Kornerden doğan karmaşadan zekice yararlandın.`),
                    passMiss(`Açtığın top çizgiyi geçip auta gitti.`))
            ]),
            sc(`🏃 Kontra Atakta Üçe İki`,
                `Kontra atakta üç kişi çıktınız, karşınızda sadece iki savunmacı var. Topu taşıyan sensin; sağında ve solunda arkadaşların seninle koşuyor.`, [
                opt(`👟 Stoperi Üzerine Çekip ${teammate}'ye Ver`, `Pas yeteneğine bağlı asist.`, S(pas, "def"),
                    assist(`Stoperi üzerine çekip son anda ${teammate}'ye bıraktın; kaleciyle karşı karşıya kalan arkadaşın topu ağlara gönderdi. Okuyuşun çok iyiydi.`),
                    passMiss(`Pası biraz geç verdin, stoper araya girip topu uzaklaştırdı.`)),
                opt(`🎯 Fırsatı Değerlendir, Kendin Vur`, `Şut yeteneğine bağlı.`, S(sho, "def"),
                    goal(`Üçe iki avantajını kullanıp kimseyi beklemeden vurdun. Kaleci uzandı ama yetişemedi!`),
                    shotMiss(`Aceleyle çıkan şutun kalecinin tam kucağına gitti. Yanında iki boş arkadaş bekliyordu.`, -2)),
                opt(`⚽ Öndeki Stoperi Çalımla Geçmeyi Dene`, `Dribbling yeteneğine bağlı (Riskli).`, R(dri, "def", 0.10, 0.2, 0.6),
                    goal(`Stoperi çalımla geçip kalecinin çıkışına karşı topu köşeye bıraktın. Bu kadar iddialı olmanı kimse beklemiyordu!`),
                    shotMiss(`Çalım denerken stoper ayağını uzatıp topu aldı. Kontra atak böylece söndü.`, -1))
            ]),
            sc(`⚖️ Ceza Sahasında Temas`,
                `Ceza sahasında stoper ayağına bastı, dengen bozuldu. Hakem seni izliyor; ayakta kalıp oyuna devam edersen pozisyon hâlâ sürüyor.`, [
                opt(`🏃 Dengeni Toparla ve Vuruşunu Yap`, `Şut yeteneğine bağlı.`, R(sho, "def", 0.05, 0.2, 0.65),
                    goal(`Temasa rağmen düşmedin ve vuruşunu yaptın. Top kalecinin yanından ağlara gitti; ayakta kalmanın karşılığını aldın!`, 1),
                    shotMiss(`Dengen bozuk olduğu için vuruş zayıf kaldı, kaleci rahatça tuttu.`)),
                opt(`🤕 Temasa Yaslanıp Kendini Yere Bırak`, `Dribbling yeteneğine bağlı (Hakem dalış görebilir).`, R(dri, "def", 0.12, 0.2, 0.55),
                    () => {
                        self.score.player++;
                        return `Hakem düdüğü çaldı ve penaltı noktasını gösterdi! ${teammate} topun başına geçti ve soğukkanlılıkla gole çevirdi. Rakip oyuncular hakemi çevreledi.`;
                    },
                    () => {
                        trust(-2);
                        return `Hakem temasın yeterli olmadığını söyleyip oyunu devam ettirdi. Kenardan hoca sert bir bakış attı.`;
                    }),
                opt(`👟 Düşmeden Topu ${teammate}'ye Çıkar`, `Pas yeteneğine bağlı asist.`, S(pas, "def"),
                    assist(`Dengen bozulsa da topu ${teammate}'ye çıkarmayı başardın; o da ilk vuruşta ağlara gönderdi. Hoca bu soğukkanlı kararı alkışladı.`),
                    passMiss(`Dengesizken verdiğin pas yetersiz kaldı, top savunmaya çarptı.`))
            ]),
            sc(`🔥 Sinir Küpü Stoper`,
                `Rakip stoper maç boyunca seni tahrik ediyor; forma çekiyor, kulağına bir şeyler fısıldıyor. Top yine sana geldi.`, [
                opt(`🧊 Cevabı Sahada Ver: Soğukkanlıca Vur`, `Şut yeteneğine bağlı.`, S(sho, "def"),
                    goal(`Stoperin sözleri aklında bile değildi; sakin kafayla vurup topu ağlara gönderdin. Tribünler seni alkışlıyor, stoper ise başını önüne eğdi.`, 1),
                    shotMiss(`Biraz sinirli girdiğin için vuruş aceleci oldu ve top auta gitti.`)),
                opt(`💪 Omuz Omuza Gir, Gücünü Hissettir`, `Fizik gücüne bağlı.`, S(phy, "def"),
                    pass(`Stoperi gövdenle itip topu korudun, ${teammate}'ye güvenle çevirdin. Hakem oyunu devam ettirdi; stoper bir an için sakinleşti.`, 0, 1),
                    plain(`Fazla sert girdin; hakem düdüğü çaldı ve seni sözlü olarak uyardı.`, -1)),
                opt(`🤝 Tahrike Kapılma, Oyunu Yavaşlat`, `Pas yeteneğine bağlı.`, S(pas, "mid"),
                    pass(`Tahrike kapılmayıp topu ayağında tuttun, takım nefes aldı. Hoca kenardan onay işareti yaptı.`, 1),
                    passMiss(`Oyunu yavaşlatmak isterken pas hatası yaptın, rakip top kazandı.`))
            ]),
            sc(`🎯 Dar Açıdan Şans`,
                `Çizgiye çok yakın, ceza sahasının sağ köşesindesin; kaleye açın çok dar ama kaleci ön direğe fazla yaklaşmış.`, [
                opt(`🚀 Ön Direğe Sert Vur`, `Şut yeteneğine bağlı (Riskli).`, R(sho, "def", 0.10, 0.2, 0.6),
                    goal(`Dar açıdan ön direk tarafına çakıldı! Kaleci pozisyonunu doğru alsa da topun hızına yetişemedi.`),
                    shotMiss(`Dar açıdan vuruş yan ağa gitti. Kaleci pozisyonunu iyi almıştı.`)),
                opt(`⚽ Beki Atlatıp Açıyı Genişlet`, `Dribbling yeteneğine bağlı.`, S(dri, "def"),
                    goal(`Önündeki beki çalımla geçip açıyı genişlettin, sonra kaleciyi yenmekte zorlanmadın.`),
                    shotMiss(`Açıyı genişletmeye çalışırken bek topu çizgi dışına çıkardı.`)),
                opt(`🔙 Ceza Yayında Koşan ${teammate}'ye Geri Çevir`, `Pas yeteneğine bağlı asist.`, S(pas, "def"),
                    assist(`Dar açıdan bencillik yapmayıp topu geri çevirdin; ${teammate} ceza yayından tek vuruşta ağlara gönderdi.`),
                    passMiss(`Geri çevirdiğin top fazla yavaş gitti, stoper araya girdi.`))
            ]),
            sc(`🥾 Ters Ayağa Gelen Top`,
                `Ceza sahasının sol tarafında top beklenmedik biçimde ters ayağına geldi. Kaleci açıyı kapatmak için üstüne çıkıyor.`, [
                opt(`🦶 Ters Ayakla Çıtayı Zorla`, `Şut yeteneğine bağlı (Riskli).`, R(sho, "def", 0.12, 0.18, 0.55),
                    goal(`Zayıf ayağınla vurdun ama top tam istediğin yere gitti; kaleci hiç tepki veremedi.`),
                    shotMiss(`Ters ayağınla yaptığın vuruş zayıf kaldı, kaleci kolayca yakaladı.`)),
                opt(`🔁 Güçlü Ayağına Çekip Öyle Vur`, `Dribbling ve Şut ortalamasına bağlı.`, S(avg(dri, sho), "def"),
                    goal(`Topu güçlü ayağına çekip kaleciyi kandırdın; sonra gücünü kullanarak ağlara gönderdin.`),
                    shotMiss(`Topu ayağına çekerken zaman kaybettin; stoper kapatıp şutu bloke etti.`)),
                opt(`👟 Boşta Bekleyen ${teammate}'ye Çıkar`, `Pas yeteneğine bağlı asist.`, S(pas, "def"),
                    assist(`Ters ayağınla yaptığın hızlı pas ${teammate}'yi buldu; o da boş kaleye yolladı.`),
                    passMiss(`Ters ayakla verdiğin pas hedefe ulaşmadı.`))
            ]),
            sc(`🧱 Kapalı Savunmayı Açma`,
                `Rakip tüm takımıyla geri çekildi; ceza sahası önünde kalabalık var. Top sende ve boş alan çok sınırlı.`, [
                opt(`🎯 Ceza Yayından Uzak Köşeye Plase`, `Şut yeteneğine bağlı (Riskli).`, R(sho, "def", 0.12, 0.2, 0.55),
                    goal(`Kalabalığın arasından açılan küçük boşluğu bulup uzak köşeye plase bıraktın! Savunma ancak seyredebildi.`),
                    shotMiss(`Savunmanın arasından geçmeye çalışan şutun bloke edildi.`)),
                opt(`🌬️ Kanada Açılıp Ortaya Hazırlan`, `Pas yeteneğine bağlı asist.`, S(pas, "def"),
                    assist(`Kanada açılıp ortaladığın top ceza sahasında bulduğu forvetle gole dönüştü.`),
                    passMiss(`Orta ilk adamda kaldı, savunma tehlikeyi uzaklaştırdı.`)),
                opt(`🔁 Duvar Pasıyla Ceza Sahasına Dal`, `Pas ve Dribbling ortalamasına bağlı.`, S(avg(pas, dri), "def"),
                    goal(`Hızlı bir duvar pasıyla kalabalığı yarıp ceza sahasına daldın ve sakince bitirdin.`),
                    passMiss(`Duvar pasında zamanlama tutmadı, rakip araya girdi.`))
            ]),
            sc(`🤔 Pas Mı, Şut Mu?`,
                `Ceza sahasında şut açın var ama ${teammate} senden daha iyi pozisyonda, boş kaleye çok yakın bekliyor. Kenardan hoca seni izliyor.`, [
                opt(`🎯 Şansımı Dene, Kendim Vururum`, `Şut yeteneğine bağlı.`, S(sho, "def"),
                    goal(`Kimseyi beklemeden vurdun ve top ağlarla buluştu. Bu tür kararlar bazen bencillik, bazen de golcülüktür.`),
                    shotMiss(`Daha iyi pozisyondaki ${teammate}'yi görmezden gelip kaçırdığın şut hocanın hoşuna gitmedi.`, -2)),
                opt(`👟 Takım Oyununa Güven, ${teammate}'ye Ver`, `Pas yeteneğine bağlı asist.`, S(pas, "def"),
                    assist(`Bencillik yapmayıp ${teammate}'ye verdin; o da boş kaleye gönderdi. Takımın havası bir anda değişti.`),
                    passMiss(`Pas tam isabet etmedi, ${teammate} topa yetişemedi.`)),
                opt(`🧠 Şut Fake Yapıp Kaleci ve Stoperi Kandır`, `Dribbling yeteneğine bağlı (Riskli).`, R(dri, "def", 0.12, 0.2, 0.55),
                    goal(`Şut vuracakmış gibi yapıp stoperi ve kaleciyi yanılttın; boşta kalan açıyı bulup gol attın.`),
                    shotMiss(`Fake sırasında top ayağından uzaklaştı, savunma topu uzaklaştırdı.`, -1))
            ]),
            sc(`😮‍💨 Yorgun Stopere Karşı`,
                `Maçın ikinci yarısı. Karşındaki stoperin ağır hareket ettiğini fark ettin; sürekli sana geç kalıyor.`, [
                opt(`⚡ Hızını Kullanıp Arkasına Sarkıp Vur`, `Hız yeteneğine bağlı.`, S(spe, "def"),
                    goal(`Yorgun stoperi hızınla arkada bıraktın ve kaleciyle karşılaşınca soğukkanlı kalıp bitirdin.`),
                    shotMiss(`Hızlı koşuyla önüne çıktın ama şutun kalecide kaldı.`)),
                opt(`💪 Fiziksel Üstünlüğünü Kullanıp Stoperi İt`, `Fizik gücüne bağlı.`, S(phy, "def"),
                    goal(`Stoperi gövdenle itip topu önüne aldın ve kalecinin yanından ağlara yolladın.`),
                    plain(`Stoperi itmeye çalışırken faul verildi; hakem düdüğü çaldı ve seni uyardı.`, -1)),
                opt(`👟 Hatlar Arasında Boşta Kalan ${teammate}'ye Ver`, `Pas yeteneğine bağlı asist.`, S(pas, "def"),
                    assist(`Yorgun savunmayı gören ${teammate}'ye hızlı bir pas verdin; o da ağlara gönderdi.`),
                    passMiss(`Pas stoperin ayağına çarptı ama top yan tarafa gitti.`))
            ]),
            sc(`⏱️ Ofsayt Çizgisinde Zamanlama`,
                `Rakip savunma ofsayt çizgisini yüksekte tutuyor. Orta saha topla döndü; çizginin tam kıyısında koşu yapma anını kolluyorsun.`, [
                opt(`🏃 Çizgiyi Bozmadan Tam Zamanında Koş`, `Hız yeteneğine bağlı.`, S(spe, "def"),
                    goal(`Tam zamanında koşuyu yapıp savunmanın arkasına sarktın; bayrak inik kaldı. Kaleciyle karşı karşıya kalıp sakin bir bitiriş yaptın!`, 1),
                    plain(`Koşuyu biraz erken yaptın; yan hakem bayrağı kaldırdı ve atak durdu.`, -1)),
                opt(`⌛ Çizgi Kıyısında Bekle, ${teammate}'nin Ara Pasını Karşıla`, `Hız ve Şut ortalamasına bağlı.`, S(avg(spe, sho), "def"),
                    goal(`Çizginin kıyısında sabırla bekledin, ${teammate}'nin ara pası tam zamanında geldi ve kaleciyle karşı karşıya bitirdin. Zamanlama kusursuzdu!`, 1),
                    plain(`Ara pas geldiğinde yan hakem bayrağını kaldırdı; birkaç santim farkla ofsayta düştün.`)),
                opt(`🧠 Bir Adım Geri Çekilip Topu Ayağına İste`, `Pas yeteneğine bağlı.`, S(pas, "mid"),
                    pass(`Ofsayt tuzağına girmeyip bir adım geri çekildin ve topu ayağına istedin; takım oyunu yeniden kurdu.`, 1),
                    passMiss(`Topu ayağına isterken stoper araya girdi.`))
            ]),
            // ---- Son dakika (clutch) ----
            sc(`⏳ Uzatma Dakikalarında Son Hücum`,
                `Hakem tabelayı kaldırdı, dört dakika eklendi. Takım son bir hücuma çıktı ve ceza sahasında önüne bir top düşüyor.`, [
                opt(`🔥 Hiç Düşünmeden Vur`, `Şut yeteneğine bağlı (Riskli).`, R(sho, "def", 0.08, 0.2, 0.62),
                    goal(`Düşünmeden vurdun ve topun ağlara gittiğini görünce stadyum ayağa kalktı! Tam son anlarda gelen golün sevinci bambaşka olur.`, 2),
                    shotMiss(`Aceleyle çıkan şut direğin yanından auta gitti. Stadyum bir anda sessizliğe gömüldü.`, -1)),
                opt(`⚽ Kaleciyi Çalımla Geçip Tamamla`, `Dribbling yeteneğine bağlı (Riskli).`, R(dri, "def", 0.10, 0.2, 0.58),
                    goal(`Kaleciyi çalımla yatırıp boş kaleye yolladın! Son dakikada gelen bu gol maçı değiştirdi!`, 2),
                    shotMiss(`Çalım sırasında kaleci topu ayağından aldı. Son fırsat harcandı.`)),
                opt(`👟 Daha İyi Pozisyondaki ${teammate}'ye Pas`, `Pas yeteneğine bağlı asist.`, S(pas, "def"),
                    assist(`Son anda bencil davranmayıp ${teammate}'ye verdin; o da topu ağlara gönderdi. Takım arkadaşların sana koştu!`),
                    passMiss(`Pas hedefi bulmadı ve rakip topu uzaklaştırdı.`))
            ], true),
            sc(`🧯 Son Anlarda Ceza Sahasında Karambol`,
                `Maçın son dakikaları. Ceza sahasında karambol var, top ayaklar arasında yerde seken. Bu topu bulamazsan bir daha pozisyon gelmeyebilir.`, [
                opt(`🦶 Önce Davranıp Topa Ayağını Uzat`, `Hız yeteneğine bağlı.`, S(spe, "def"),
                    goal(`Karambolun içinden önce davrandın ve topu ağlara gönderdin! Ceza sahasında savunmacılar şaşkına döndü.`, 2),
                    shotMiss(`Topa ayak uzattın ama rakip stoper önce davrandı. Karambol çözüldü.`)),
                opt(`🗣️ Kafayla Kaleciyi Aşmayı Dene`, `Fizik gücüne bağlı (Riskli).`, R(phy, "def", 0.10, 0.18, 0.5),
                    goal(`Havada herkesin üstüne çıkıp kafayla kaleciyi aştın! Stadyum yıkıldı!`, 2),
                    shotMiss(`Kafa vuruşun yukarı çıktı, top tribüne gitti. Büyük bir fırsat kaçtı.`, -1)),
                opt(`👟 Topu Geri Yuvarla, ${teammate} Vursun`, `Pas yeteneğine bağlı asist.`, S(pas, "def"),
                    assist(`Karambolda doğru kararı verip topu ${teammate}'ye yuvarladın; o da ilk vuruşta ağlara gönderdi.`),
                    passMiss(`Yuvarladığın top ${teammate}'ye ulaşmadan savunma uzaklaştırdı.`))
            ], true),
            sc(`🥶 Son Dakikada Tek Başına Koşu`,
                `Yarı sahadan tek başına koşuya çıktın, son dakikalardayız. Stoperler arkandan yetişmeye çalışırken kaleci de ileri çıkıyor.`, [
                opt(`⚡ Hızını Kullanıp Kaleciyle Baş Başa Kal ve Vur`, `Hız yeteneğine bağlı.`, S(spe, "def"),
                    goal(`Hızınla kaleciyle baş başa kaldın ve soğukkanlı bir bitirişle topu ağlara gönderdin! Tam zamanında gelen bir gol!`, 2),
                    shotMiss(`Hızla önüne çıktın ama şutun kalecide kaldı. Büyük fırsat kaçtı.`, -1)),
                opt(`🎯 Ceza Yayından Plaseyi Dene`, `Şut yeteneğine bağlı (Riskli).`, R(sho, "def", 0.12, 0.2, 0.55),
                    goal(`Ceza yayından çıkan plase kalecinin uzanamayacağı köşeden ağlara gitti!`, 2),
                    shotMiss(`Plase biraz fazla yukarıdan gitti, top üst direğin dışına çıktı.`)),
                opt(`👟 Yanında Koşan ${teammate}'ye Bırak`, `Pas yeteneğine bağlı asist.`, S(pas, "def"),
                    assist(`Kaleci çıkınca topu yanındaki ${teammate}'ye bıraktın; o da boş kaleye gönderdi. Mükemmel bir takım oyunu!`),
                    passMiss(`Pas biraz arkada kaldı, stoper araya girip topu uzaklaştırdı.`))
            ], true)
        ];
    },

    /**
     * Havuzdan senaryo seçer: aynı maçta tekrar yok, bir önceki maçta çıkanlar mümkün olduğunca elenir.
     * 8. ve 9. indeksler (eski "90. dakika" senaryoları) ile `clutch` işaretli olanlar sadece son pozisyonda çıkar.
     */
    pickScenarioIndex: function(pool, isLastMinute) {
        const used = this.usedScenarioIndices || [];
        const prev = this._prevScenarioIndices || [];
        const clutchIdx = [];
        const regularIdx = [];
        pool.forEach((s, i) => {
            if (i === 8 || i === 9 || s.clutch) clutchIdx.push(i);
            else regularIdx.push(i);
        });
        const candidates = isLastMinute ? clutchIdx : regularIdx;
        let available = candidates.filter(i => !used.includes(i) && !prev.includes(i));
        if (available.length === 0) available = candidates.filter(i => !used.includes(i));
        if (available.length === 0) available = candidates;
        return available[Math.floor(Math.random() * available.length)];
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
                            effect: `Savunma vs Rakip Forvet.`,
                            successChance: this.calculateStatSuccess(def, "att"),
                            onSuccess: () => {
                                if (!this.playerStats.tackles) this.playerStats.tackles = 0;
                                this.playerStats.tackles++;
                                return `MÜKEMMEL KAYARAK MÜDAHALE! Savunma ustalığın sayesinde topu forvetin ayağından jilet gibi aldın! Tehlike savuşturuldu!`;
                            },
                            onFail: () => {
                                return `Savunma müdahalen rakip forvetin kalitesine karşı yetersiz kaldı! Forvet sıyrıldı ama kalecimiz şutu çeldi.`;
                            }
                        },
                        {
                            text: `💪 Omuz Omuza Girip Forveti Sindir`,
                            effect: `Fizik gücüne bağlı gövde mücadelesi.`,
                            successChance: this.calculateStatSuccess(phy, "att"),
                            onSuccess: () => {
                                if (!this.playerStats.tackles) this.playerStats.tackles = 0;
                                this.playerStats.tackles++;
                                return `KAYA GİBİ SAĞLAM! Fizik gücünle forveti topla birlikte auta sürdün ve kaleyi korudun!`;
                            },
                            onFail: () => {
                                return `Fizik gücün yetersiz kaldı! Hakem omuz mücadelesine faul düdüğü çaldı.`;
                            }
                        },
                        {
                            text: `⚡ Kademe Alıp Şut Açısını Kapat`,
                            effect: `Hız ve pozisyon alma dengesi.`,
                            successChance: this.calculateStatSuccess(spe, "att"),
                            onSuccess: () => {
                                return `HARİKA KADEME! Hızınla forvetin önünü kapatıp şut açısını daralttın, kalecimiz rahatça kontrol etti!`;
                            },
                            onFail: () => {
                                return `Hızın yetersiz kaldı! Forvet dar açıdan şutunu çekti, kalecimiz son anda kornere çeldi.`;
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
                            effect: `Fizik ve hava hakimiyeti yeteneğine bağlı.`,
                            successChance: this.calculateStatSuccess(phy, "att"),
                            onSuccess: () => {
                                if (!this.playerStats.tackles) this.playerStats.tackles = 0;
                                this.playerStats.tackles++;
                                return `HAVALARIN EFENDİSİ! Fizik gücünle forvetin üzerinden müthiş sıçrayıp kafayla topu orta sahaya fırlattın!`;
                            },
                            onFail: () => {
                                return `Hava topu mücadelesinde rakip forvet kafayı vurdu ama top neyse ki üst direkten auta çıktı.`;
                            }
                        },
                        {
                            text: `🛡️ Rakip Forvete Perde Yap, Kaleciyi Çıkar`,
                            effect: `Savunma zekasına bağlı perdeleme.`,
                            successChance: this.calculateStatSuccess(def, "att"),
                            onSuccess: () => {
                                if (!this.playerStats.tackles) this.playerStats.tackles = 0;
                                this.playerStats.tackles++;
                                return `KUSURSUZ PERDELEME! Savunma zekanla forveti kilitledin, kalecimiz topu rahatça kontrol etti!`;
                            },
                            onFail: () => {
                                return `Savunma sezgin eksik kaldı, forvet perdeden sıyrıldı.`;
                            }
                        },
                        {
                            text: `🎯 Kafayla İndirip Kontraya Uzun Top Çıkar`,
                            effect: `Fizik ve Pas ortalamasına bağlı asist şansı.`,
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
                            effect: `Fizik gücüne bağlı.`,
                            successChance: this.calculateStatSuccess(phy, "att"),
                            onSuccess: () => {
                                if (!this.playerStats.tackles) this.playerStats.tackles = 0;
                                this.playerStats.tackles++;
                                return `KAYA GİBİ SAĞLAM! Gövdeni araya koyarak kanat oyuncusunu topla birlikte auta sürdün!`;
                            },
                            onFail: () => {
                                return `Fizik gücün yetersiz kaldı, kanat oyuncusu çeviklikle sıyrıldı.`;
                            }
                        },
                        {
                            text: `🦶 Ayakta Müdahale ile Topu Çal`,
                            effect: `Savunma yeteneğine bağlı.`,
                            successChance: this.calculateStatSuccess(def, "att"),
                            onSuccess: () => {
                                if (!this.playerStats.tackles) this.playerStats.tackles = 0;
                                this.playerStats.tackles++;
                                return `TERTEMİZ TOP KAPMA! Savunma müdahalenle topu ayağından söküp aldın!`;
                            },
                            onFail: () => {
                                return `Müdahalen boşa gitti, rakip ortasını açtı.`;
                            }
                        },
                        {
                            text: `⚡ Kademe Alıp Kanat Ortasını Ayakla Kes`,
                            effect: `Hız ve Savunma ortalamasına bağlı.`,
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
                            effect: `Hız gücüne bağlı geri dönüş.`,
                            successChance: this.calculateStatSuccess(spe, "att"),
                            onSuccess: () => {
                                if (!this.playerStats.tackles) this.playerStats.tackles = 0;
                                this.playerStats.tackles++;
                                return `MÜTHİŞ DEPAR! Hızın sayesinde forveti arkadan yakalayıp topu kaleciye kazandırdın!`;
                            },
                            onFail: () => {
                                return `Hızın yetersiz kaldı! Forvet arkada boş kaldı ama şutu auta gitti.`;
                            }
                        },
                        {
                            text: `🦶 Son Anda Ayak Uzatıp Topu Kornere Çel`,
                            effect: `Hız ve Savunma ortalamasına bağlı.`,
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
                            effect: `Fizik ve Hız ortalamasına bağlı.`,
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
                            effect: `Pas yeteneğine bağlı asist şansı.`,
                            successChance: this.calculateStatSuccess(pas, "def"),
                            onSuccess: () => {
                                this.score.player++;
                                this.playerStats.assists++;
                                this.playerStats.passes++;
                                return `ŞAPKA ÇIKARTILIR! Pas kalitenle 50 metreden forvetimizin önüne adrese teslim top attın! GOOOL! HARİKA ASİST!`;
                            },
                            onFail: () => {
                                this.playerStats.passes++;
                                return `Pasın rakip savunmanın kucağına gitti.`;
                            }
                        },
                        {
                            text: `🛡️ ${teammate}'ye Garanti Yerden Pas Ver`,
                            effect: `Güvenli kısa pas.`,
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
                            effect: `Dribbling yeteneğine bağlı topla çıkış.`,
                            successChance: this.calculateStatSuccess(dri, "att"),
                            onSuccess: () => {
                                this.playerStats.passes++;
                                return `BÜYÜK SOĞUKKANLILIK! Dribbling ustalığınla forveti oyundan düşürüp orta sahaya pası aktardın!`;
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
                            effect: `Dribbling yeteneğine bağlı.`,
                            successChance: this.calculateStatSuccess(dri, "att"),
                            onSuccess: () => {
                                this.playerStats.passes++;
                                return `BÜYÜK SOĞUKKANLILIK! Dribbling yeteneğinle forvete klas bir vücut çalımı atıp orta sahayı gördün! Tribünler alkışlıyor!`;
                            },
                            onFail: () => {
                                return `Dribbling seviyen pres altında yetersiz kaldı! Topu son anda taca vurmak zorunda kaldın.`;
                            }
                        },
                        {
                            text: `👟 Tek Pasla Maestro ${teammate}'ye Çık`,
                            effect: `Pas yeteneğine bağlı hızlı servis.`,
                            successChance: this.calculateStatSuccess(pas, "mid"),
                            onSuccess: () => {
                                this.playerStats.passes++;
                                return `TEK PASLA TEHLİKEDEN ÇIKIŞ! Pas kalitenle ${teammate}'yi gördün ve presi kırdın!`;
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
                            effect: `Savunma ve Fizik ortalamasına bağlı.`,
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
                            effect: `Hız ve Savunma ortalamasına bağlı.`,
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
                            effect: `Savunma pozisyon almasına bağlı.`,
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
                            effect: `Savunma taktik zekasına bağlı.`,
                            successChance: this.calculateStatSuccess(def, "mid"),
                            onSuccess: () => {
                                return `KUSURSUZ OFSAYT TAKTİĞİ! Savunma bilginle tam zamanında öne çıktın ve yan hakem bayrağını kaldırdı!`;
                            },
                            onFail: () => {
                                return `Savunma zamanlaman gecikti, forvet ofsayttan kaçtı ama şutu auta gitti.`;
                            }
                        },
                        {
                            text: `⚡ Forvetle Beraber Geriye Koş`,
                            effect: `Hız gücüne bağlı.`,
                            successChance: this.calculateStatSuccess(spe, "att"),
                            onSuccess: () => {
                                return `ADIM ADIM TAKİP! Hızınla forvetin peşini bırakmadın ve pozisyonu bozdun!`;
                            },
                            onFail: () => {
                                return `Forvet bir adım önde kaldı.`;
                            }
                        },
                        {
                            text: `💪 Forveti Fiziksel Temasla Çizgide Boz`,
                            effect: `Fizik gücüne bağlı.`,
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
                            effect: `Fizik ve Fedakarlık gücüne bağlı takımı ipten alma.`,
                            successChance: this.calculateStatSuccess(phy, "att"),
                            onSuccess: () => {
                                if (!this.playerStats.tackles) this.playerStats.tackles = 0;
                                this.playerStats.tackles++;
                                this.playerState.hocaGuveni = Math.min(100, (this.playerState.hocaGuveni || 40) + 6);
                                this.playerState.moral = Math.min(100, (this.playerState.moral || 100) + 8);
                                return `İMKÂNSIZ KURTARIŞ! Fizik gücünle çizgi üzerinde adeta uçarak topu kafayla kornere çeldin! TAKIMI İPTEN ALDIN! STADYUM YIKILIYOR!`;
                            },
                            onFail: () => {
                                return `Fiziksel uzanışın yetersiz kaldı, top milimetrik farkla içeri girdi.`;
                            }
                        },
                        {
                            text: `🦶 Direk Dibinden Topu Kayarak Süpür!`,
                            effect: `Savunma reaksiyonuna bağlı.`,
                            successChance: this.calculateStatSuccess(def, "att"),
                            onSuccess: () => {
                                if (!this.playerStats.tackles) this.playerStats.tackles = 0;
                                this.playerStats.tackles++;
                                this.playerState.hocaGuveni = Math.min(100, (this.playerState.hocaGuveni || 40) + 5);
                                return `KAHRAMANCA MÜDAHALE! Savunma sezginle son salisede ayağını uzatarak topu çizgiden taca gönderdin!`;
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
                            effect: `Savunma zekasına bağlı sarı kartlık taktik faul.`,
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
                            effect: `Savunma yeteneğiyle kartsız temiz çıkış.`,
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
                            effect: `Hız gücüne bağlı.`,
                            successChance: this.calculateStatSuccess(spe, "att"),
                            onSuccess: () => {
                                return `HIZLI GERİ DÖNÜŞ! Hızınla kademeye girdin ve forvetin şutunu bozdun!`;
                            },
                            onFail: () => {
                                return `Hızın yetersiz kaldı.`;
                            }
                        }
                    ]
                }
            ];

            // 10 temel + 11 normal + 2 son dakika (clutch) = 23 senaryoluk havuz
            let pool = defScenarios.concat(this.buildExtraScenarios("Defans", { teammate, sho, pas, spe, dri, def, phy }));
            let chosenIndex = this.pickScenarioIndex(pool, isLastMinute);
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
                            effect: `Pas vs Rakip Defans (Takım oyunu).`,
                            successChance: this.calculateStatSuccess(pas, "def"),
                            onSuccess: () => {
                                this.score.player++;
                                this.playerStats.assists++;
                                this.playerStats.passes++;
                                this.playerState.hocaGuveni = Math.min(100, (this.playerState.hocaGuveni || 40) + 2);
                                this.playerState.takimUyumu = Math.min(100, (this.playerState.takimUyumu || 50) + 2);
                                return `ÖLÜMCÜL ARA PASI! Pas kalitenle defansın arasından geçen harika ara pasla forvetimiz golü attı! HARİKA ASİST!`;
                            },
                            onFail: () => {
                                this.playerStats.passes++;
                                return `Pas yeteneğin bu ince ara pası için yetersiz kaldı, top rakip stoperin ayağında kaldı.`;
                            }
                        },
                        {
                            text: `🚀 Ceza Sahası Dışından Kaleye Füze Yolla`,
                            effect: `Şut gücüne bağlı uzaktan gol şansı (Zor deneme).`,
                            successChance: Math.max(0.20, Math.min(0.44, this.calculateStatSuccess(sho, "def") - 0.18)),
                            onSuccess: () => {
                                this.score.player++;
                                this.playerStats.goals++;
                                this.playerStats.shots++;
                                return this.checkGoalCommentary(`FÜZE VE GOOOL! Şut kalitenle 25 metreden çıkardığın füze 90'da örümcek ağlarını aldı! BÜYÜLEYİCİ BİR GOL!`);
                            },
                            onFail: () => {
                                this.playerStats.shots++;
                                this.playerState.hocaGuveni = Math.max(0, (this.playerState.hocaGuveni || 40) - 2);
                                return `25 metreden aceleyle çekilen şut auta gitti! Hoca kenarda önü boş forvete ara pası atmadığın için sitem etti.`;
                            }
                        },
                        {
                            text: `⚽ Çalımla Savunmayı Üzerine Çek`,
                            effect: `Dribbling yeteneğine bağlı.`,
                            successChance: Math.max(0.25, Math.min(0.65, this.calculateStatSuccess(dri, "mid") - 0.08)),
                            onSuccess: () => {
                                this.score.player++;
                                this.playerStats.assists++;
                                this.playerStats.passes++;
                                return `BÜYÜCÜ! Dribbling yeteneğinle iki orta saha oyuncusundan sıyrılıp ceza sahasına girdin ve arkadaşına boş pas çıkardın! ASİST!`;
                            },
                            onFail: () => {
                                return `Dribbling seviyen yetersiz kaldı, rakip topu kaptı.`;
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
                            effect: `Şut gücüne bağlı gol şansı (Düşük isabet - Bencil deneme).`,
                            successChance: Math.max(0.18, Math.min(0.40, this.calculateStatSuccess(sho, "def") - 0.22)),
                            onSuccess: () => {
                                this.score.player++;
                                this.playerStats.goals++;
                                this.playerStats.shots++;
                                return this.checkGoalCommentary(`İNANILMAZ GOL! Şut gücünle 28 metreden çaktığın füze elleri bükerek filelere girdi! GOOOL!`);
                            },
                            onFail: () => {
                                this.playerStats.shots++;
                                this.playerState.hocaGuveni = Math.max(0, (this.playerState.hocaGuveni || 40) - 2);
                                return `28 metreden bencilce çekilen şut üstten auta gitti! Hoca kenarda pas opsiyonunu değerlendirmediğin için sitem etti.`;
                            }
                        },
                        {
                            text: `💫 90'a Kavisli Plase Gönder`,
                            effect: `Şut ve Pas ortalamasına bağlı (Teknik vuruş).`,
                            successChance: Math.max(0.20, Math.min(0.45, this.calculateStatSuccess((sho + pas) / 2, "def") - 0.18)),
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
                            effect: `Pas yeteneğine bağlı asist (Takım oyunu).`,
                            successChance: this.calculateStatSuccess(pas, "def"),
                            onSuccess: () => {
                                this.score.player++;
                                this.playerStats.assists++;
                                this.playerStats.passes++;
                                this.playerState.hocaGuveni = Math.min(100, (this.playerState.hocaGuveni || 40) + 2);
                                this.playerState.takimUyumu = Math.min(100, (this.playerState.takimUyumu || 50) + 2);
                                return `MÜKEMMEL ASİST! Bencillik yapmayıp pas kalitenle topu ${teammate}'nin önüne bıraktın, gelişine vurup golü yaptı! Hoca alkışladı!`;
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
                            effect: `Dribbling yeteneğine bağlı.`,
                            successChance: this.calculateStatSuccess(dri, "mid"),
                            onSuccess: () => {
                                this.playerStats.passes++;
                                return `FUTBOL SANATI! Dribbling yeteneğinle harika bir 360 dönüşü yapıp 3 kişinin arasından tertemiz çıktın!`;
                            },
                            onFail: () => {
                                return `Dribbling seviyen dar alanda yetersiz kaldı, topu kaptırdın.`;
                            }
                        },
                        {
                            text: `💪 Vücudunu Koyup Faul Al`,
                            effect: `Fizik gücüne bağlı.`,
                            successChance: this.calculateStatSuccess(phy, "mid"),
                            onSuccess: () => {
                                return `AKIL DOLU OYUN! Fizik gücünle topu saklayıp rakibe faul yaptırdın, takım nefes aldı!`;
                            },
                            onFail: () => {
                                return `Fizik gücün yetmedi, dengeni kaybedip topu kaybettin.`;
                            }
                        },
                        {
                            text: `👟 Tek Dokunuşla Geriye Garanti Pas Çıkar`,
                            effect: `Pas yeteneğine bağlı emniyet.`,
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
                            effect: `Savunma yeteneğine bağlı kontra başlangıcı.`,
                            successChance: this.calculateStatSuccess(def, "mid"),
                            onSuccess: () => {
                                this.playerStats.passes++;
                                return `MÜTHİŞ TOP KAPMA! Savunma müdahalenle topu kapıp takımı 3'e 2 kontra atağa kaldırdın!`;
                            },
                            onFail: () => {
                                return `Savunma hamlen boşa gitti, rakip pasını çıkardı.`;
                            }
                        },
                        {
                            text: `👟 Topu Kapıp Tek Pasla ${teammate}'yi Kaçır`,
                            effect: `Pas ve Savunma ortalamasına bağlı asist.`,
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
                            effect: `Hız ve Pas ortalamasına bağlı.`,
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
                            effect: `Pas ve Hız ortalamasına bağlı.`,
                            successChance: this.calculateStatSuccess((pas + spe) / 2, "def"),
                            onSuccess: () => {
                                this.playerStats.passes++;
                                return `MAESTRO VİZYONU! 40 metrelik milimetrik ters kanat pasınla rakip savunmanın dengesini alt üst ettin!`;
                            },
                            onFail: () => {
                                this.playerStats.passes++;
                                return `Ters kanat pasın biraz alçak gitti ve savunmada kaldı.`;
                            }
                        },
                        {
                            text: `🎯 Yerden Hızlı Dikine Pas Yolla`,
                            effect: `Pas yeteneğine bağlı.`,
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
                            effect: `Dribbling yeteneğine bağlı topla ilerleme.`,
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
                            effect: `Fizik ve Şut ortalamasına bağlı gol şansı.`,
                            successChance: this.calculateStatSuccess((phy + sho) / 2, "def"),
                            onSuccess: () => {
                                this.score.player++;
                                this.playerStats.goals++;
                                this.playerStats.shots++;
                                return this.checkGoalCommentary(`CİĞERSİZ BOX-TO-BOX GOLÜ! 90 metrelik koşunun ardından dönen topa gelişine çaktın ve ağlar havalandı! GOOOL!`);
                            },
                            onFail: () => {
                                this.playerStats.shots++;
                                return `Koşunun ardından nefesin yetmedi, vuruşun auta gitti.`;
                            }
                        },
                        {
                            text: `👟 İkinci Dalga Hücumunda Arkadaşına Boş Pas Çıkar`,
                            effect: `Pas yeteneğine bağlı asist.`,
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
                            effect: `Fizik ve Savunma ortalamasına bağlı.`,
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
                            effect: `Pas ve Şut ortalamasına bağlı frikik golü (Klas deneme).`,
                            successChance: Math.max(0.18, Math.min(0.40, this.calculateStatSuccess((pas + sho) / 2, "def") - 0.20)),
                            onSuccess: () => {
                                this.score.player++;
                                this.playerStats.goals++;
                                this.playerStats.shots++;
                                this.playerState.hocaGuveni = Math.min(100, (this.playerState.hocaGuveni || 40) + 2);
                                return this.checkGoalCommentary(`MÜTHİŞ FRİKİK GOLÜ! Barajın üzerinden süzülen falsolu top tam 90'a asıldı! Kaleci kımıldayamadı! GOOOL!`);
                            },
                            onFail: () => {
                                this.playerStats.shots++;
                                return `Frikik vuruşun baraja takıldı.`;
                            }
                        },
                        {
                            text: `📐 Arka Direğe Kavisli Asist Ortası Kes`,
                            effect: `Pas yeteneğine bağlı asist ortası (Takım oyunu).`,
                            successChance: this.calculateStatSuccess(pas, "def"),
                            onSuccess: () => {
                                this.score.player++;
                                this.playerStats.assists++;
                                this.playerStats.passes++;
                                this.playerState.hocaGuveni = Math.min(100, (this.playerState.hocaGuveni || 40) + 2);
                                this.playerState.takimUyumu = Math.min(100, (this.playerState.takimUyumu || 50) + 2);
                                return `ADRESE TESLİM ORTA! Arka direğe kestiğin kavisli ortaya stoperimiz kafayı çaktı ve GOOOL! ASİST!`;
                            },
                            onFail: () => {
                                this.playerStats.passes++;
                                return `Orta kalecinin ellerinde eridi.`;
                            }
                        },
                        {
                            text: `🧲 Baraj Altından Zekice Yerden Şut`,
                            effect: `Pas ve Şut ortalamasına bağlı (Sürpriz deneme).`,
                            successChance: Math.max(0.15, Math.min(0.35, this.calculateStatSuccess((pas + sho) / 2, "def") - 0.25)),
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
                            effect: `Pas ve Dribbling ortalamasına bağlı gol.`,
                            successChance: this.calculateStatSuccess((pas + dri) / 2, "def"),
                            onSuccess: () => {
                                this.score.player++;
                                this.playerStats.goals++;
                                this.playerStats.shots++;
                                return this.checkGoalCommentary(`TIKI-TAKA GOLÜ! Tek paslarla savunmayı delip kaleciyle karşı karşıya golü bıraktın! GOOOL!`);
                            },
                            onFail: () => {
                                this.playerStats.shots++;
                                return `Verkaçın son pası biraz hızlı kaçtı.`;
                            }
                        },
                        {
                            text: `🎯 Tek Pasla Forvete Gol Pası Bırak`,
                            effect: `Pas yeteneğine bağlı asist.`,
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
                            effect: `Şut yeteneğine bağlı.`,
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
                            effect: `Şut yeteneğine bağlı son saniye galibiyet golü (Zor vole).`,
                            successChance: Math.max(0.18, Math.min(0.40, this.calculateStatSuccess(sho, "def") - 0.20)),
                            onSuccess: () => {
                                this.score.player++;
                                this.playerStats.goals++;
                                this.playerStats.shots++;
                                return this.checkGoalCommentary(`YILIN GOLÜ! 90. dakikada ceza sahası dışından gelişine vurduğun vole ağları deldi! GOOOL! STAT YIKILIYOR!`);
                            },
                            onFail: () => {
                                this.playerStats.shots++;
                                this.playerState.hocaGuveni = Math.max(0, (this.playerState.hocaGuveni || 40) - 1);
                                return `Vole vuruşun üst direği sıyırarak auta gitti. Hoca son saniyede daha kontrollü olmanı işaret etti.`;
                            }
                        },
                        {
                            text: `🎯 Ceza Sahasına ${teammate}'nin Koşusuna Aşırtma Pas At`,
                            effect: `Pas yeteneğine bağlı son saniye asisti (Takım oyunu).`,
                            successChance: this.calculateStatSuccess(pas, "def"),
                            onSuccess: () => {
                                this.score.player++;
                                this.playerStats.assists++;
                                this.playerStats.passes++;
                                this.playerState.hocaGuveni = Math.min(100, (this.playerState.hocaGuveni || 40) + 2);
                                this.playerState.takimUyumu = Math.min(100, (this.playerState.takimUyumu || 50) + 2);
                                return `SON SANİYE ASİSTİ! Defans arkasına aşırdığın topta ${teammate} gelişine vurdu ve GOOOL! MAÇ BİZİM!`;
                            },
                            onFail: () => {
                                this.playerStats.passes++;
                                return `Aşırtma pasın savunmada kaldı.`;
                            }
                        },
                        {
                            text: `⚽ Topu Bayrak Direğinde Saklayıp Zaman Geçir`,
                            effect: `Dribbling ve Fizik ortalamasına bağlı.`,
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
                            effect: `Dribbling ve Fizik ortalamasına bağlı.`,
                            successChance: this.calculateStatSuccess((dri + phy) / 2, "mid"),
                            onSuccess: () => {
                                this.playerState.hocaGuveni = Math.min(100, (this.playerState.hocaGuveni || 40) + 5);
                                this.playerState.moral = Math.min(100, (this.playerState.moral || 100) + 5);
                                return `USTACA ZAMAN GEÇİRME! Topu bayrak direğinde 2 dakika sakladın, rakip sinirlenip faul yaptı. Maç bitti! Hoca alkışlıyor!`;
                            },
                            onFail: () => {
                                return `İki kişi bastırdı ve top taca gitti.`;
                            }
                        },
                        {
                            text: `👟 Boştaki ${teammate}'ye Pas Çıkar`,
                            effect: `Pas yeteneğine bağlı.`,
                            successChance: this.calculateStatSuccess(pas, "mid"),
                            onSuccess: () => {
                                this.playerStats.passes++;
                                this.playerState.hocaGuveni = Math.min(100, (this.playerState.hocaGuveni || 40) + 1);
                                return `GÜVENLİ PAS! Topu geriye oynayarak süreyi erittin.`;
                            },
                            onFail: () => {
                                this.playerStats.passes++;
                                return `Pas taca gitti.`;
                            }
                        },
                        {
                            text: `⚡ Çalımla İçeri Kat Edip Şut Açısı Ara`,
                            effect: `Dribbling ve Hız ortalamasına bağlı (Bencil riskli deneme).`,
                            successChance: Math.max(0.20, Math.min(0.50, this.calculateStatSuccess((dri + spe) / 2, "def") - 0.15)),
                            onSuccess: () => {
                                this.score.player++;
                                this.playerStats.goals++;
                                this.playerStats.shots++;
                                return this.checkGoalCommentary(`MÜTHİŞ ÇALIM VE GOL! Korner bayrağından içeri kat edip 90'a astın! GOOOL!`);
                            },
                            onFail: () => {
                                this.playerStats.shots++;
                                this.playerState.hocaGuveni = Math.max(0, (this.playerState.hocaGuveni || 40) - 2);
                                return `Son dakikada bayrak direğinde zaman geçirmek yerine bencilce çalıma girip topu kaptırdın! Hoca kenarda çıldırdı!`;
                            }
                        }
                    ]
                }
            ];

            // 10 temel + 10 normal + 3 son dakika (clutch) = 23 senaryoluk havuz
            let pool = midScenarios.concat(this.buildExtraScenarios("Orta Saha", { teammate, sho, pas, spe, dri, def, phy }));
            let chosenIndex = this.pickScenarioIndex(pool, isLastMinute);
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
                            effect: `Şut vs Rakip Kaleci/Defans.`,
                            successChance: this.calculateStatSuccess(sho, "def"),
                            onSuccess: () => {
                                this.score.player++;
                                this.playerStats.goals++;
                                this.playerStats.shots++;
                                this.playerState.hocaGuveni = Math.min(100, (this.playerState.hocaGuveni || 40) + 1);
                                return this.checkGoalCommentary(`KLAS GOL! Şut yeteneğinle kalecinin uzanamayacağı köşeye pürüzsüz bir plase bıraktın! GOOOL!`);
                            },
                            onFail: () => {
                                this.playerStats.shots++;
                                return `Şut kaliten kaleciyi geçmeye yetmedi, uzanarak topu çeldi.`;
                            }
                        },
                        {
                            text: `🚀 Tavana Sert Şut Zımbala`,
                            effect: `Şut gücüne bağlı sert vuruş (Yüksek risk).`,
                            successChance: Math.max(0.25, Math.min(0.70, this.calculateStatSuccess(sho, "def") - 0.10)),
                            onSuccess: () => {
                                this.score.player++;
                                this.playerStats.goals++;
                                this.playerStats.shots++;
                                return this.checkGoalCommentary(`FÜZE VE GOOOL! Tavana öyle sert vurdun ki kalecinin elleri büküldü! GOOOL!`);
                            },
                            onFail: () => {
                                this.playerStats.shots++;
                                this.playerState.hocaGuveni = Math.max(0, (this.playerState.hocaGuveni || 40) - 1);
                                return `Şutun üst direği sıyırıp auta gitti! Hoca kenarda daha kontrollü vurmanı işaret etti.`;
                            }
                        },
                        {
                            text: `👟 Boş Koşan ${teammate}'ye Pas Çıkar`,
                            effect: `Pas yeteneğine bağlı asist (Takım oyunu).`,
                            successChance: this.calculateStatSuccess(pas, "def"),
                            onSuccess: () => {
                                this.score.player++;
                                this.playerStats.assists++;
                                this.playerStats.passes++;
                                this.playerState.hocaGuveni = Math.min(100, (this.playerState.hocaGuveni || 40) + 2);
                                this.playerState.takimUyumu = Math.min(100, (this.playerState.takimUyumu || 50) + 2);
                                return `CÖMERT ASİST! Bencillik yapmayıp boş kaleye yuvarladın, ${teammate} golü attı! Hoca bu olgunluğu alkışladı! ASİST!`;
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
                            effect: `Hız yeteneğine bağlı.`,
                            successChance: this.calculateStatSuccess(spe, "def"),
                            onSuccess: () => {
                                this.score.player++;
                                this.playerStats.goals++;
                                this.playerStats.shots++;
                                return this.checkGoalCommentary(`MÜTHİŞ DEPAR VE GOL! Hızınla stoperleri geride bıraktın ve kaleciyi avladın! GOOOL!`);
                            },
                            onFail: () => {
                                this.playerStats.shots++;
                                return `Hızın yetersiz kaldı! Stoper arkadan yetişip topu kornere yolladı.`;
                            }
                        },
                        {
                            text: `⚽ Kaleciyi Çalımla Geçip Boş Kaleye Yuvarla`,
                            effect: `Dribbling yeteneğine bağlı gol (Yüksek risk).`,
                            successChance: Math.max(0.20, Math.min(0.65, this.calculateStatSuccess(dri, "def") - 0.12)),
                            onSuccess: () => {
                                this.score.player++;
                                this.playerStats.goals++;
                                this.playerStats.shots++;
                                return this.checkGoalCommentary(`NEFİS ÇALIM VE GOL! Dribbling yeteneğinle kaleciyi yatırıp topu boş ağlara yolladın! GOOOL!`);
                            },
                            onFail: () => {
                                this.playerStats.shots++;
                                this.playerState.hocaGuveni = Math.max(0, (this.playerState.hocaGuveni || 40) - 1);
                                return `Çalım denerken kaleci ayağındaki topu kaptı! Hoca boş şut açısını harcadığın için üzüldü.`;
                            }
                        },
                        {
                            text: `👟 Boş Kanat Arkadaşına Pas Çıkar`,
                            effect: `Pas yeteneğine bağlı asist (Takım oyunu).`,
                            successChance: this.calculateStatSuccess(pas, "def"),
                            onSuccess: () => {
                                this.score.player++;
                                this.playerStats.assists++;
                                this.playerStats.passes++;
                                this.playerState.hocaGuveni = Math.min(100, (this.playerState.hocaGuveni || 40) + 2);
                                this.playerState.takimUyumu = Math.min(100, (this.playerState.takimUyumu || 50) + 2);
                                return `HARİKA VİZYON! Kanattaki arkadaşına çıkardığın topta gol geldi! Hoca kenarda taktik disiplini alkışladı! ASİST!`;
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
                            effect: `Dribbling yeteneğine bağlı.`,
                            successChance: Math.max(0.22, Math.min(0.68, this.calculateStatSuccess(dri, "def") - 0.08)),
                            onSuccess: () => {
                                this.score.player++;
                                this.playerStats.goals++;
                                this.playerStats.shots++;
                                return this.checkGoalCommentary(`BÜYÜLEYİCİ ÇALIM! Beki bacak arasıyla geçip çaprazdan ağları sarstın! GOOOL!`);
                            },
                            onFail: () => {
                                this.playerStats.shots++;
                                return `Dribbling seviyen yetersiz kaldı, bek ayak koydu.`;
                            }
                        },
                        {
                            text: `🎯 Çizgiye İnip Arka Direğe Orta Kes`,
                            effect: `Pas yeteneğine bağlı asist (Takım oyunu).`,
                            successChance: this.calculateStatSuccess(pas, "def"),
                            onSuccess: () => {
                                this.score.player++;
                                this.playerStats.assists++;
                                this.playerStats.passes++;
                                this.playerState.hocaGuveni = Math.min(100, (this.playerState.hocaGuveni || 40) + 2);
                                this.playerState.takimUyumu = Math.min(100, (this.playerState.takimUyumu || 50) + 2);
                                return `ADRESE TESLİM ORTA! Arka direkteki arkadaşın kafayla golü yaptı! ASİST!`;
                            },
                            onFail: () => {
                                this.playerStats.passes++;
                                return `Orta doğrudan kalecide kaldı.`;
                            }
                        },
                        {
                            text: `🚀 Çaprazdan Sert Şut Çek`,
                            effect: `Şut yeteneğine bağlı (Dar açı - Bencil deneme).`,
                            successChance: Math.max(0.18, Math.min(0.45, this.calculateStatSuccess(sho, "def") - 0.20)),
                            onSuccess: () => {
                                this.score.player++;
                                this.playerStats.goals++;
                                this.playerStats.shots++;
                                return this.checkGoalCommentary(`ÇAPRAZDAN FÜZE! İmkansız dar açıdan harika vuruşla golü buldun! GOOOL!`);
                            },
                            onFail: () => {
                                this.playerStats.shots++;
                                this.playerState.hocaGuveni = Math.max(0, (this.playerState.hocaGuveni || 40) - 2);
                                return `Dar açıdan bencilce denediğin şut yan ağlarda kaldı! Hoca boş arkadaşına orta kesmediğin için sitem etti.`;
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
                            effect: `Fizik ve hava hakimiyetine bağlı kafa golü.`,
                            successChance: this.calculateStatSuccess(phy, "def"),
                            onSuccess: () => {
                                this.score.player++;
                                this.playerStats.goals++;
                                this.playerStats.shots++;
                                return this.checkGoalCommentary(`RONALDO GİBİ ASILI KALDI! Fizik gücünle havada asılı kalıp köşeye füze gibi kafa golü attın! GOOOL!`);
                            },
                            onFail: () => {
                                this.playerStats.shots++;
                                return `Hava mücadelesinde fizik gücün yetmedi, topa kafayı vuramadın.`;
                            }
                        },
                        {
                            text: `👟 Kafayla İndirip ${teammate}'ye Servis Yap`,
                            effect: `Pas ve Fizik ortalamasına bağlı asist (Takım oyunu).`,
                            successChance: this.calculateStatSuccess((pas + phy) / 2, "def"),
                            onSuccess: () => {
                                this.score.player++;
                                this.playerStats.assists++;
                                this.playerStats.passes++;
                                this.playerState.hocaGuveni = Math.min(100, (this.playerState.hocaGuveni || 40) + 2);
                                this.playerState.takimUyumu = Math.min(100, (this.playerState.takimUyumu || 50) + 2);
                                return `AKIL DOLU İNDİRİŞ! Kafayla indirdiğin topta ${teammate} gelişine vurup golü attı! ASİST!`;
                            },
                            onFail: () => {
                                this.playerStats.passes++;
                                return `İndirdiğin top savunmada kaldı.`;
                            }
                        },
                        {
                            text: `🦶 Ayağını Uzatıp Uçarak Dokun`,
                            effect: `Hız ve Şut ortalamasına bağlı.`,
                            successChance: Math.max(0.25, Math.min(0.68, this.calculateStatSuccess((spe + sho) / 2, "def") - 0.08)),
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
                            effect: `Pas ve Fizik ortalamasına bağlı asist (Takım oyunu).`,
                            successChance: this.calculateStatSuccess((pas + phy) / 2, "def"),
                            onSuccess: () => {
                                this.score.player++;
                                this.playerStats.assists++;
                                this.playerStats.passes++;
                                this.playerState.hocaGuveni = Math.min(100, (this.playerState.hocaGuveni || 40) + 2);
                                this.playerState.takimUyumu = Math.min(100, (this.playerState.takimUyumu || 50) + 2);
                                return `KUSURSUZ SERVİS! Topu saklayıp (${Math.round((pas+phy)/2)}) tek pasla ${teammate}'yi gördün, gelişine gol! ASİST!`;
                            },
                            onFail: () => {
                                this.playerStats.passes++;
                                return `Stoper arkandan yüklendi, pasın kısa kaldı.`;
                            }
                        },
                        {
                            text: `⚽ Ani Dönüşle Stoperi Oyundan Düşür ve Vur`,
                            effect: `Dribbling ve Şut ortalamasına bağlı gol.`,
                            successChance: Math.max(0.25, Math.min(0.65, this.calculateStatSuccess((dri + sho) / 2, "def") - 0.08)),
                            onSuccess: () => {
                                this.score.player++;
                                this.playerStats.goals++;
                                this.playerStats.shots++;
                                return this.checkGoalCommentary(`MÜTHİŞ DÖNÜŞ VE GOL! Dribbling ustalığınla stoperin etrafından dönüp köşeyi buldun! GOOOL!`);
                            },
                            onFail: () => {
                                this.playerStats.shots++;
                                return `Dönüş sırasında stoper ayak koydu.`;
                            }
                        },
                        {
                            text: `💪 Stoperden Faul Alıp Duran Top Kazandır`,
                            effect: `Fizik gücüne bağlı (Taktiksel faul).`,
                            successChance: this.calculateStatSuccess(phy, "def"),
                            onSuccess: () => {
                                this.momentumBoost = 15;
                                this.momentumDuration = 8;
                                this.playerState.hocaGuveni = Math.min(100, (this.playerState.hocaGuveni || 40) + 2);
                                return `AKILLI FAUL ALMA! Topu vücudunla saklayıp tehlikeli noktadan serbest vuruş kazandırdın! Hoca taktik disiplinini alkışladı.`;
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
                            effect: `Şut ve Pas ortalamasına bağlı aşırtma golü (Lüks deneme).`,
                            successChance: Math.max(0.20, Math.min(0.55, this.calculateStatSuccess((sho + pas) / 2, "def") - 0.15)),
                            onSuccess: () => {
                                this.score.player++;
                                this.playerStats.goals++;
                                this.playerStats.shots++;
                                return this.checkGoalCommentary(`ŞAPKA ÇIKARTILIR! Kalecinin üzerinden süzülen aşırtma top direğin dibinden ağlarla buluştu! EFSANE GOL!`);
                            },
                            onFail: () => {
                                this.playerStats.shots++;
                                this.playerState.hocaGuveni = Math.max(0, (this.playerState.hocaGuveni || 40) - 2);
                                return `Aşırtma vuruşun az farkla üst direkten auta çıktı! Hoca garanti vuruş yerine bu lüksü seçtiğin için kızdı.`;
                            }
                        },
                        {
                            text: `🎯 Yerden Sert ve İsabetli Vur`,
                            effect: `Şut yeteneğine bağlı soğukkanlı vuruş.`,
                            successChance: this.calculateStatSuccess(sho, "def"),
                            onSuccess: () => {
                                this.score.player++;
                                this.playerStats.goals++;
                                this.playerStats.shots++;
                                this.playerState.hocaGuveni = Math.min(100, (this.playerState.hocaGuveni || 40) + 1);
                                return this.checkGoalCommentary(`GOOOL! Yerden köşeye sert vuruşla kaleciyi ters köşe yaptın!`);
                            },
                            onFail: () => {
                                this.playerStats.shots++;
                                return `Şutun kalecide kaldı.`;
                            }
                        },
                        {
                            text: `⚽ Kaleciyi Çalımla Yatırıp Boş Kaleye Yuvarla`,
                            effect: `Dribbling yeteneğine bağlı gol (Yüksek risk).`,
                            successChance: Math.max(0.22, Math.min(0.62, this.calculateStatSuccess(dri, "def") - 0.10)),
                            onSuccess: () => {
                                this.score.player++;
                                this.playerStats.goals++;
                                this.playerStats.shots++;
                                return this.checkGoalCommentary(`SOĞUKKANLI ÇALIM VE GOL! Kaleciyi yere yatırıp boş kaleye yuvarladın! GOOOL!`);
                            },
                            onFail: () => {
                                this.playerStats.shots++;
                                this.playerState.hocaGuveni = Math.max(0, (this.playerState.hocaGuveni || 40) - 1);
                                return `Kaleci ayağını uzatıp topu kaptı! Vurmak varken çalıma girdiğin için fırsat kaçtı.`;
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
                            effect: `Şut ve fırsatçılık yeteneğine bağlı.`,
                            successChance: this.calculateStatSuccess(sho, "def"),
                            onSuccess: () => {
                                this.score.player++;
                                this.playerStats.goals++;
                                this.playerStats.shots++;
                                return this.checkGoalCommentary(`FIRSATÇI GOLCÜ! Dönen topu havada yakalayıp köşeye zımbaladın! GOOOL!`);
                            },
                            onFail: () => {
                                this.playerStats.shots++;
                                return `Ayağın kaydı, top defansa çarpıp kornere gitti.`;
                            }
                        },
                        {
                            text: `👟 Topuk Pasıyla ${teammate}'yi Gör`,
                            effect: `Pas yeteneğine bağlı asist (Takım oyunu).`,
                            successChance: this.calculateStatSuccess(pas, "def"),
                            onSuccess: () => {
                                this.score.player++;
                                this.playerStats.assists++;
                                this.playerStats.passes++;
                                this.playerState.hocaGuveni = Math.min(100, (this.playerState.hocaGuveni || 40) + 2);
                                this.playerState.takimUyumu = Math.min(100, (this.playerState.takimUyumu || 50) + 2);
                                return `HARİKA ASİST! Şık topuk pasınla buluşan ${teammate} golü attı! ASİST!`;
                            },
                            onFail: () => {
                                this.playerStats.passes++;
                                return `Pas savunmada kaldı.`;
                            }
                        },
                        {
                            text: `⚽ Topu Dürtüp Kaleciyi Ekarte Et`,
                            effect: `Dribbling yeteneğine bağlı.`,
                            successChance: Math.max(0.25, Math.min(0.65, this.calculateStatSuccess(dri, "def") - 0.08)),
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
                            effect: `Hız ve Savunma ortalamasına bağlı gol şansı.`,
                            successChance: Math.max(0.20, Math.min(0.50, this.calculateStatSuccess((spe + def) / 2, "def") - 0.15)),
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
                            effect: `Hız yeteneğine bağlı asist (Takım presi).`,
                            successChance: this.calculateStatSuccess(spe, "def"),
                            onSuccess: () => {
                                this.score.player++;
                                this.playerStats.assists++;
                                this.playerStats.passes++;
                                this.playerState.hocaGuveni = Math.min(100, (this.playerState.hocaGuveni || 40) + 2);
                                return `HATA YAPTIRDIN! Kaleci panikle topu arkadaşımıza attı, boş kaleye gol! Hoca ön presini alkışladı! ASİST!`;
                            },
                            onFail: () => {
                                return `Kaleci pasını aktardı.`;
                            }
                        },
                        {
                            text: `⚡ Kalecinin Üstüne Deparla Baskı Kur`,
                            effect: `Hız ve Fizik ortalamasına bağlı (Taktiksel pres).`,
                            successChance: this.calculateStatSuccess((spe + phy) / 2, "def"),
                            onSuccess: () => {
                                this.momentumBoost = 20;
                                this.momentumDuration = 10;
                                this.playerState.hocaGuveni = Math.min(100, (this.playerState.hocaGuveni || 40) + 2);
                                return `PANİKLE TACA ATTI! Kaleci baskından çekinip topu panikle taca dikti, takımın hücum baskısı tavan yaptı!`;
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
                            effect: `Şut ve Fizik gücüne bağlı gol şansı.`,
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
                                    if (typeof GAME.applyRedCard === "function") GAME.applyRedCard(1);
                                    else { GAME.state.suspendedWeeks = 1; GAME.state.justReceivedRedCard = true; }
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
                            effect: `Hız ile maçı kilitleme.`,
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
                            effect: `Şut ve Fizik ortalamasına bağlı efsane röveşata golü (Yüksek risk).`,
                            successChance: Math.max(0.18, Math.min(0.42, this.calculateStatSuccess((sho + phy) / 2, "def") - 0.20)),
                            onSuccess: () => {
                                this.score.player++;
                                this.playerStats.goals++;
                                this.playerStats.shots++;
                                return this.checkGoalCommentary(`PUSKAS ÖDÜLLÜK RÖVEŞATA GOLÜ! Havada ters takla atıp topu 90'a çaktın! STADYUM AYAKTA ALKIŞLIYOR! GOOOL!`);
                            },
                            onFail: () => {
                                this.playerStats.shots++;
                                this.playerState.hocaGuveni = Math.max(0, (this.playerState.hocaGuveni || 40) - 1);
                                return `Röveşata vuruşun topa tam oturmadı, auta çıktı. Hoca kenarda daha garanti bir vuruş bekliyordu.`;
                            }
                        },
                        {
                            text: `🎯 Göğsünle İndirip Plase Gönder`,
                            effect: `Şut yeteneğine bağlı.`,
                            successChance: this.calculateStatSuccess(sho, "def"),
                            onSuccess: () => {
                                this.score.player++;
                                this.playerStats.goals++;
                                this.playerStats.shots++;
                                this.playerState.hocaGuveni = Math.min(100, (this.playerState.hocaGuveni || 40) + 1);
                                return this.checkGoalCommentary(`SOĞUKKANLI GOL! Göğsünle indirip kalecinin altından ağlara yuvarladın! GOOOL!`);
                            },
                            onFail: () => {
                                this.playerStats.shots++;
                                return `Göğsünle indirirken stoper topu uzaklaştırdı.`;
                            }
                        },
                        {
                            text: `👟 Kafayla Arkana Aşırtıp ${teammate}'ye Bırak`,
                            effect: `Pas ve Fizik ortalamasına bağlı asist (Takım oyunu).`,
                            successChance: this.calculateStatSuccess((pas + phy) / 2, "def"),
                            onSuccess: () => {
                                this.score.player++;
                                this.playerStats.assists++;
                                this.playerStats.passes++;
                                this.playerState.hocaGuveni = Math.min(100, (this.playerState.hocaGuveni || 40) + 2);
                                this.playerState.takimUyumu = Math.min(100, (this.playerState.takimUyumu || 50) + 2);
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

            // 10 temel + 11 normal + 3 son dakika (clutch) = 24 senaryoluk havuz
            let pool = fwdScenarios.concat(this.buildExtraScenarios("Forvet", { teammate, sho, pas, spe, dri, def, phy }));
            let chosenIndex = this.pickScenarioIndex(pool, isLastMinute);
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
            if (typeof GAME.applyRedCard === "function") GAME.applyRedCard(1);
            else { GAME.state.suspendedWeeks = 1; GAME.state.justReceivedRedCard = true; }
            this.playerState.moral = Math.max(10, (this.playerState.moral || 100) - 20);
            this.playerState.hocaGuveni = Math.max(10, (this.playerState.hocaGuveni || 40) - 15);
            
            this.hasYellowCard = false; // Kırmızı yendiği için sarı kart silindi
            if (window.HAPTIC) window.HAPTIC.card();
            
            this.isPausedForChoice = false;
            this.activeChoice = null;
            if (this.callbacks && this.callbacks.onMinuteUpdate) {
                this.callbacks.onMinuteUpdate(this.min, this.score, "🟥 İKİNCİ SARI KART! Hakem ikinci sarı karttan kırmızı kartı çıkardı! (1 maç cezalısın)");
            }
            setTimeout(() => {
                if (typeof showCustomAlert === "function") {
                    showCustomAlert("Zaten sarı kartınız vardı. Hakem 2. sarı karttan Kırmızı Kart gösterdi ve oyundan atıldınız! Gelecek hafta 1 maç cezalısınız.", "🟥 İKİNCİ SARI KART!", "🟥", "danger");
                } else if (typeof alert === "function") {
                    alert("🟥 İKİNCİ SARI KART! Zaten sarı kartınız vardı. Hakem 2. sarı karttan Kırmızı Kartı gösterdi ve oyundan atıldınız! (1 maç cezalısınız)");
                }
                this.resumeTick();
            }, 500);
            return;
        }

        this.isPausedForChoice = true;
        this.hasYellowCard = true; // İlk sarı kart yenir
        if (window.HAPTIC) window.HAPTIC.vibrate(180);
        
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
                        if (window.HAPTIC) window.HAPTIC.card();
                        if (typeof GAME.applyRedCard === "function") GAME.applyRedCard(1);
                        else { GAME.state.suspendedWeeks = 1; GAME.state.justReceivedRedCard = true; }
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
                        if (window.HAPTIC) window.HAPTIC.card();
                        if (typeof GAME.applyRedCard === "function") GAME.applyRedCard(1);
                        else { GAME.state.suspendedWeeks = 1; GAME.state.justReceivedRedCard = true; }
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
                isNssDuel: true,
                duelType: "penalty",
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
                isNssDuel: true,
                duelType: "freekick",
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

        let successChance = opt.successChance;
        let success = rand < successChance;
        
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

        let isPostHit = !hasScored && (
            resultComment.includes("direkten") || 
            resultComment.includes("direğe") || 
            resultComment.includes("üst direk") || 
            resultComment.includes("yan direk") || 
            resultComment.includes("direği sıyır")
        );
        let isMiss = !success && !hasScored && !hasAssisted && !isPostHit && !isKeeperSave && (
            resultComment.includes("auta") || 
            resultComment.includes("az farkla") || 
            resultComment.includes("yandan dışarı") || 
            resultComment.includes("üstten dışarı") || 
            resultComment.includes("KAÇTI")
        );

        // Trigger corresponding spiker sound strictly and cleanly
        if (typeof SoundManager !== "undefined") {
            if (typeof SoundManager.playSpiker === "function") {
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
            if (isPostHit && typeof SoundManager.playPostHit === "function") {
                SoundManager.playPostHit();
            } else if (isMiss && typeof SoundManager.playMissGasp === "function") {
                SoundManager.playMissGasp();
            }
        }

        if (hasScored) {
            this.lastPlayerGoalMinute = this.min || 1;
            const shouldTriggerVar = !this.hasTriggeredVar && (typeof window !== "undefined" && typeof window.triggerVarReview === "function") && (Math.random() < 0.22);
            if (shouldTriggerVar) {
                this.hasTriggeredVar = true;
                this.isPausedForChoice = true;
                this.activeChoice = null;
                this.callbacks.onMinuteUpdate(this.min, this.score, `📺 ${this.min}' Hakem kulaklığına dokunuyor! Gol pozisyonunda potansiyel ofsayt için 3D VAR incelemesi başlatıldı...`);

                const self = this;
                window.triggerVarReview("offside", (isVarGoal) => {
                    if (isVarGoal) {
                        self.callbacks.onMinuteUpdate(self.min, self.score, `✅ ${self.min}' VAR ONAYLADI! Milimetrik incelemede hücumcu geride, GOL GEÇERLİ!`);
                        if (self.callbacks.onGoalScoredCelebration) {
                            self.callbacks.onGoalScoredCelebration(self.min, (celebrationText, celebrationCommentary) => {
                                self.callbacks.onMinuteUpdate(self.min, self.score, celebrationCommentary);
                                if (self.callbacks.onEventPause) {
                                    self.callbacks.onEventPause(`⚽ ${self.min}' GOOOL SEVİNCİ!`, `Muhteşem bir sevinç! Maça devam etmek için dokunun.`, () => {
                                        self.isPausedForChoice = false;
                                        self.resumeTick();
                                    });
                                } else {
                                    self.isPausedForChoice = false;
                                    self.timer = setTimeout(function() {
                                        self.resumeTick();
                                    }, 3000 / self.currentSpeed);
                                }
                            });
                        } else {
                            self.isPausedForChoice = false;
                            self.timer = setTimeout(function() {
                                self.resumeTick();
                            }, 2500 / self.currentSpeed);
                        }
                    } else {
                        // Goal canceled for offside!
                        self.score.player = Math.max(0, self.score.player - 1);
                        self.playerStats.goals = previousGoals;
                        self.lastPlayerGoalMinute = self._prevPlayerGoalMinute || 0;
                        self.callbacks.onMinuteUpdate(self.min, self.score, `❌ ${self.min}' VAR KARARI: İPTAL! 3D izdüşüm çizgisine göre pozisyon ofsayt, gol iptal edildi!`);
                        self.isPausedForChoice = false;
                        self.timer = setTimeout(function() {
                            self.resumeTick();
                        }, 2500 / self.currentSpeed);
                    }
                });
                return;
            }

            if (this.callbacks.onGoalScoredCelebration) {
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
        } else {
            this.isPausedForChoice = false;
            this.activeChoice = null;
            const self = this;
            this.timer = setTimeout(function() {
                self.resumeTick();
            }, 3000 / this.currentSpeed);
        }
    },

    resolveNssDuel: function(isGoal, comment) {
        this.playerStats.shots++;
        if (isGoal) {
            this.score.player++;
            this.playerStats.goals++;
            this._prevPlayerGoalMinute = this.lastPlayerGoalMinute || 0;
            this.lastPlayerGoalMinute = this.min || 1;
            const goalMsg = comment || "GOOOL! İnanılmaz bir falsoyla topu 90'a astın!";
            this.callbacks.onMinuteUpdate(this.min, this.score, goalMsg);
            if (typeof SoundManager !== "undefined") {
                if (typeof SoundManager.playSpiker === "function") SoundManager.playSpiker("gol");
                if (typeof SoundManager.playGoal === "function") SoundManager.playGoal();
                if (typeof SoundManager.playCrowdCheer === "function") SoundManager.playCrowdCheer();
            }
        } else {
            const missMsg = comment || "KAÇTI! Top kalecide kaldı!";
            this.callbacks.onMinuteUpdate(this.min, this.score, missMsg);
            if (typeof SoundManager !== "undefined") {
                if (typeof SoundManager.playSpiker === "function") {
                    SoundManager.playSpiker("kurtaris");
                }
                if (missMsg.includes("direk") || missMsg.includes("direkten") || missMsg.includes("direğe")) {
                    if (typeof SoundManager.playPostHit === "function") SoundManager.playPostHit();
                } else {
                    if (typeof SoundManager.playMissGasp === "function") SoundManager.playMissGasp();
                }
            }
        }

        // Clean unpause & timer resume - guarantee match never freezes!
        this.isPausedForChoice = false;
        this.activeChoice = null;
        if (this.timer) clearTimeout(this.timer);
        const self = this;
        this.timer = setTimeout(function() {
            self.resumeTick();
        }, 1200 / Math.max(1, self.currentSpeed));
    },

    resumeTick: function() {
        const self = this;
        function tick() {
            if (self.isPausedForChoice) return;

            self.min++;
            if (self.min === 45) {
                if (typeof SoundManager !== "undefined" && typeof SoundManager.playWhistle === "function") {
                    SoundManager.playWhistle("double");
                }
            } else if (self.min === 65 && self.isBenched) {
                self.callbacks.onMinuteUpdate(self.min, self.score, `🔄 Oyuna Giriyorsun! Teknik direktör seni sahaya sürüyor. Kendini göstermek için son 25 dakika!`);
            }
            if (self.min > 90) {
                // Match finished!
                GAME.matchSimulatedThisWeek = true;
                GAME.simulateLeagueWeek(self.score.player, self.score.opponent);

                if (typeof SoundManager !== "undefined") {
                    if (typeof SoundManager.playMatchEnd === "function") {
                        SoundManager.playMatchEnd();
                    } else if (typeof SoundManager.playSpiker === "function") {
                        SoundManager.playSpiker("son_duduk");
                    }
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
                    if (typeof SoundManager !== "undefined" && typeof SoundManager.playConceded === "function") {
                        SoundManager.playConceded();
                    }
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
                    if (typeof SoundManager !== "undefined" && typeof SoundManager.playConceded === "function") {
                        SoundManager.playConceded();
                    }
                    self.callbacks.onMinuteUpdate(self.min, self.score, `MAALESEF GOL! ${self.teamOpponent.name} topu ağlarımıza gönderdi.`);
                } else if (Math.random() < (1 - probOpp) * 0.012) {
                    self.score.player++;
                    if (typeof SoundManager !== "undefined" && typeof SoundManager.playGoal === "function") {
                        SoundManager.playGoal();
                    }
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
                if (typeof SoundManager !== "undefined" && typeof SoundManager.playConceded === "function") {
                    SoundManager.playConceded();
                }
                self.momentumBoost = 0;
                self.momentumDuration = 0;
                self.callbacks.onMinuteUpdate(self.min, self.score, `MAALESEF GOL! ${self.teamOpponent.name} topu ağlarımıza gönderdi.`);
            } else if (Math.random() < (1 - probOpp) * 0.012) {
                self.score.player++;
                if (typeof SoundManager !== "undefined" && typeof SoundManager.playGoal === "function") {
                    SoundManager.playGoal();
                }
                if (ratingPlayer > ratingOpponent) {
                    self.momentumBoost = 15;
                    self.momentumDuration = 12;
                }
                self.callbacks.onMinuteUpdate(self.min, self.score, `GOOOOL!!! Takım arkadaşların harika paslaşmalarla golü buluyor!`);
            } else if (Math.random() < 0.14) {
                const broadcastLines = [
                    "Orta sahada top kapma mücadelesi kızıştı, tempo kontrol altında.",
                    "Rakip takımın kanat bindirmesi savunma kademesi tarafından kesildi.",
                    "Tribünlerden yoğun uğultu yükseliyor, takımlar alan savunmasında.",
                    "Teknik heyet kenardan takımı önde baskıya davet ediyor.",
                    "Sert bir ikili mücadele, hakem avantaja bırakarak oyunu akıttı.",
                    "Top ceza yayının hemen dışında sıkıştı, iki taraf da boşluk kolluyor.",
                    "Kısa paslarla tempo dengeleniyor, orta sahada pas trafiği yoğun.",
                    "Kaleci oyunu eliyle hızla kurarak kontra atak başlattı.",
                    "Hava topu mücadelesinde sert temas, hakem taç atışıyla oyunu başlattı.",
                    "Savunma hattı ofsayt çizgisini kusursuz kurarak tehlikeyi savuşturdu.",
                    "Rakip ceza sahası önüne yığıldı, savunmamız boşluk vermiyor.",
                    "Köşe gönderi yakınında pres sonuç verdi, top yeniden takımımızda.",
                    "Ceza sahası dışından seken topu orta saha oyuncularımız topladı.",
                    "Geniş alanda top çevrilerek rakip savunmanın dengesi bozulmaya çalışılıyor.",
                    "Stadyum hoparlörlerinden anons yapıldı, taraftarlar maça ortak olmaya çalışıyor."
                ];

                if (!self._lastGenericMin || (self.min - self._lastGenericMin >= 3)) {
                    let picked = broadcastLines[Math.floor(Math.random() * broadcastLines.length)];
                    if (picked !== self._lastGenericText) {
                        self._lastGenericMin = self.min;
                        self._lastGenericText = picked;
                        self.callbacks.onMinuteUpdate(self.min, self.score, picked);
                    } else {
                        self.callbacks.onMinuteUpdate(self.min, self.score, null);
                    }
                } else {
                    self.callbacks.onMinuteUpdate(self.min, self.score, null);
                }
            } else {
                self.callbacks.onMinuteUpdate(self.min, self.score, null);
            }

            self.timer = setTimeout(tick, 1000 / self.currentSpeed);
        }

        self.timer = setTimeout(tick, 1000 / self.currentSpeed);
    }
};

if (typeof window !== "undefined") {
    window.MatchEngine = MatchEngine;
}
if (typeof module !== "undefined" && module.exports) {
    module.exports = MatchEngine;
}
