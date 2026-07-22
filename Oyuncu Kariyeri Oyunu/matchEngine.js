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
            // Normal başlangıç (3 pozisyon)
            let baseMinutes = [
                Math.floor(Math.random() * (38 - 15 + 1)) + 15,
                Math.floor(Math.random() * (75 - 50 + 1)) + 50,
                Math.floor(Math.random() * (89 - 80 + 1)) + 80
            ];
            
            // Takım Uyumu düşükse pas atmazlar (1 pozisyon elenir)
            if (teamChem < 40 && Math.random() < 0.60) {
                baseMinutes.shift();
                console.log("Takım arkadaşların sana pas atmadı (Takım Uyumu düşük).");
            } 
            // Takım Uyumu yüksekse ekstra pozisyon (4. pozisyon)
            else if (teamChem >= 75 && Math.random() < 0.70) {
                baseMinutes.push(Math.floor(Math.random() * (48 - 40 + 1)) + 40);
            }

            // SEVİYE / REYTİNG BONUSU: Seviye yükseldikçe ekstra fırsat ekle (User Request)
            const rating = playerState.rating || 50;
            if (rating >= 90) {
                // Guaranteed 2 extra positions for superstar status (up to 5 or 6 positions!)
                baseMinutes.push(Math.floor(Math.random() * (48 - 40 + 1)) + 40);
                baseMinutes.push(Math.floor(Math.random() * (68 - 58 + 1)) + 58);
            } else if (rating >= 80) {
                // 1 extra position for elite status
                baseMinutes.push(Math.floor(Math.random() * (68 - 58 + 1)) + 58);
            } else if (rating >= 70 && Math.random() < 0.50) {
                // 50% chance of 1 extra position for high rating
                baseMinutes.push(Math.floor(Math.random() * (68 - 58 + 1)) + 58);
            }

            // Deduplicate minutes to prevent multiple prompt overlaps at the same minute
            baseMinutes = [...new Set(baseMinutes)];
            baseMinutes.sort((a,b) => a - b);
            
            this.choiceMinutes = baseMinutes;
        }

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

                // Calculate match performance rating
                let rating = 6.0 + 
                             (self.playerStats.goals * 1.5) + 
                             (self.playerStats.assists * 1.0) + 
                             (self.playerStats.passes * 0.05) + 
                             (self.playerStats.shots * 0.08);
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

            // If player is red carded, run simplified simulation
            if (self.isSentOff) {
                let ratingPlayer = (self.teamPlayer.att + self.teamPlayer.mid + self.teamPlayer.def) / 3;
                let ratingOpponent = (self.teamOpponent.att + self.teamOpponent.mid + self.teamOpponent.def) / 3;
                if (Math.random() < 0.025) {
                    self.score.opponent++;
                    callbacks.onMinuteUpdate(self.min, self.score, `RAKİP GOL ATTI! 10 kişi kalmamızı fırsat bilen ${self.teamOpponent.name} farkı açıyor.`);
                } else if (Math.random() < 0.15) {
                    callbacks.onMinuteUpdate(self.min, self.score, `10 kişi mücadele ediyoruz, ${self.playerState.playerName} kırmızı kartla tribünde.`);
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
            }
            // Teammate goal chance (not scored by user)
            else if (Math.random() < (1 - probOpp) * 0.012) {
                self.score.player++;
                if (ratingPlayer > ratingOpponent) {
                    self.momentumBoost = 15;
                    self.momentumDuration = 12;
                }
                callbacks.onMinuteUpdate(self.min, self.score, `GOOOOL!!! Takım arkadaşların harika paslaşmalarla golü buluyor!`);
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

    triggerChoice: function(minute) {
        this.isPausedForChoice = true;
        
        let choiceData = null;
        const idx = this.choiceMinutes.indexOf(minute);

        // Random roll for special freekick/penalty events (except for the last-minute drama or if only 1 choice)
        let isSpecialEvent = false;
        if (idx !== this.choiceMinutes.length - 1 && this.choiceMinutes.length > 1) {
            let roll = Math.random();
            if (roll < 0.15) {
                // Penalty
                isSpecialEvent = true;
                choiceData = {
                    title: "🎯 PENALTI KAZANILDI!",
                    description: "Takımın kritik bir penaltı kazandı! Topun başına geçtin. Tribünler nefesini tuttu, kaleciyle karşı karşıya kaldın. Nereye vuracaksın?",
                    options: [
                        {
                            text: "Sol Doksana Plase Vuruş",
                            effect: "Şut gücüne bağlı yüksek başarı şansı.",
                            successChance: 0.70 + (this.playerState.shooting * 0.002),
                            onSuccess: () => {
                                this.score.player++;
                                this.playerStats.goals++;
                                this.playerStats.shots++;
                                return this.checkGoalCommentary("MÜTHİŞ BİR PLASE! Top sol çataldan içeri süzüldü! Kaleci köşeyi bilse de yetişemedi. GOOOL!");
                            },
                            onFail: () => {
                                this.playerStats.shots++;
                                return "Fiyasko! Vuruşun direğin az farkla üzerinden dışarı gitti.";
                            }
                        },
                        {
                            text: "Sağ Köşeye Plase Vuruş",
                            effect: "Şut gücüne bağlı yüksek başarı şansı.",
                            successChance: 0.70 + (this.playerState.shooting * 0.002),
                            onSuccess: () => {
                                this.score.player++;
                                this.playerStats.goals++;
                                this.playerStats.shots++;
                                return this.checkGoalCommentary("YERE YAKIN VE KÖŞEYE! Kaleci köşeyi doğru tahmin etse de topun uzanamayacağı yere gitti! GOOOL!");
                            },
                            onFail: () => {
                                this.playerStats.shots++;
                                return "Kaleci köşeyi doğru tahmin etti ve uzanarak topu kornere çeldi!";
                            }
                        },
                        {
                            text: "Ortaya Sert Vuruş",
                            effect: "Sabit yüksek şans, kaleci erken yatarsa gol.",
                            successChance: 0.75,
                            onSuccess: () => {
                                this.score.player++;
                                this.playerStats.goals++;
                                this.playerStats.shots++;
                                return this.checkGoalCommentary("MERKEZE BOMBARDIMAN! Kaleci köşeye yatarken sen topu kalenin tam ortasına fırlattın! GOOOL!");
                            },
                            onFail: () => {
                                this.playerStats.shots++;
                                return "Kötü karar! Kaleci yerinde sabit kaldı ve top doğrudan göğsünde eridi.";
                            }
                        },
                        {
                            text: "Panenka Vuruşu",
                            effect: "Çok yüksek risk! Başarılı olursa moral ve hoca güvenine bonus.",
                            successChance: 0.40 + (this.playerState.dribbling * 0.002),
                            onSuccess: () => {
                                this.score.player++;
                                this.playerStats.goals++;
                                this.playerStats.shots++;
                                this.playerState.moral = Math.min(100, this.playerState.moral + 15);
                                this.playerState.hocaGuveni = Math.min(100, this.playerState.hocaGuveni + 10);
                                return this.checkGoalCommentary("İNANILMAZ SOĞUKKANLILIK! Kaleci köşeye yatarken topu yavaşça kalenin ortasından havaya diktin! Müthiş bir Panenka golü! GOOOL!");
                            },
                            onFail: () => {
                                this.playerStats.shots++;
                                this.playerState.moral = Math.max(0, this.playerState.moral - 15);
                                this.playerState.hocaGuveni = Math.max(0, this.playerState.hocaGuveni - 10);
                                return "REZALET PANENKA! Kaleci ayakta kaldı ve üzerine yavaşça gelen topu eliyle havada kaptı. Tribünler yuhalıyor!";
                            }
                        }
                    ]
                };
            } else if (roll < 0.35) {
                // Freekick
                isSpecialEvent = true;
                choiceData = {
                    title: "📐 CEZA SAHASI DIŞI FRİKİK",
                    description: "Kritik bir noktadan serbest vuruş kazandık! Topun başına geçtin. Baraj kuruldu, kaleci çizgisinde bekliyor. Nasıl vuracaksın?",
                    options: [
                        {
                            text: "Barajın Üstünden Kavisli Plase",
                            effect: "Şut ve Pas ortalamasına bağlı kavisli vuruş.",
                            successChance: 0.30 + ((this.playerState.shooting + this.playerState.passing) / 2 * 0.004),
                            onSuccess: () => {
                                this.score.player++;
                                this.playerStats.goals++;
                                this.playerStats.shots++;
                                return this.checkGoalCommentary("MÜTHİŞ FALSOLU FRİKİK! Barajın üzerinden falsolu süzülen top yan direğe çarpıp içeri girdi! GOOOL!");
                            },
                            onFail: () => {
                                this.playerStats.shots++;
                                return "Top barajdaki defans oyuncusunun kafasına çarptı, rakip tehlikeyi uzaklaştırdı.";
                            }
                        },
                        {
                            text: "Kaleci Köşesine Sert (Ölü Yaprak)",
                            effect: "Yüksek şut gücü gerektiren sert vuruş.",
                            successChance: 0.25 + (this.playerState.shooting * 0.005),
                            onSuccess: () => {
                                this.score.player++;
                                this.playerStats.goals++;
                                this.playerStats.shots++;
                                return this.checkGoalCommentary("FÜZE! Kaleci köşesinden giden top havada yön değiştirip ölü yaprak gibi ağlarla buluştu! GOOOL!");
                            },
                            onFail: () => {
                                this.playerStats.shots++;
                                return "Çok sert ama kalecinin kucağına giden bir vuruş. Kaleci çift yumrukla uzaklaştırdı.";
                            }
                        },
                        {
                            text: "Baraj Altından Yerden Şut",
                            effect: "Akıl dolu yerden şut.",
                            successChance: 0.35 + (this.playerState.passing * 0.003),
                            onSuccess: () => {
                                this.score.player++;
                                this.playerStats.goals++;
                                this.playerStats.shots++;
                                return this.checkGoalCommentary("AKIL DOLU BİR GOL! Barajdaki oyuncular havaya zıplarken topu yerden barajın altından kaleye yolladın! Kaleci şokta! GOOOL!");
                            },
                            onFail: () => {
                                this.playerStats.shots++;
                                return "Baraj zıplamadı! Yerden giden şut savunmanın ayaklarında kaldı.";
                            }
                        },
                        {
                            text: "Ceza Sahasına Orta Aç",
                            effect: "Pas gücüne bağlı asist denemesi.",
                            successChance: 0.45 + (this.playerState.passing * 0.005),
                            onSuccess: () => {
                                this.score.player++;
                                this.playerStats.assists++;
                                this.playerStats.passes++;
                                return "ADRESE TESLİM ORTA! Frikikten ceza sahasına kestiğin ortaya stoper kafayı vurdu ve ağları havalandırdı! ASİST!";
                            },
                            onFail: () => {
                                this.playerStats.passes++;
                                return "Yaptığın orta kalabalık savunmanın arasında kaldı ve kaleci kontrol etti.";
                            }
                        }
                    ]
                };
            }
        }

        if (!isSpecialEvent) {
            if (idx === this.choiceMinutes.length - 1 && this.choiceMinutes.length > 1) {
                choiceData = {
                    title: "Son Dakika Draması",
                    description: "Maçın son anları! Ceza sahasında topla buluştun, arkandan stoperin sert bir darbesi var. Dengen sarsılıyor!",
                    options: [
                    {
                        text: "Düşmemeye çalışıp zor pozisyonda şutunu çek.",
                        effect: "Şut gücüne bağlı düşük şanslı gol denemesi.",
                        successChance: 0.25 + (this.playerState.shooting * 0.005),
                        onSuccess: () => {
                            this.score.player++;
                            this.playerStats.goals++;
                            this.playerStats.shots++;
                            
                            let ratingPlayer = (this.teamPlayer.att + this.teamPlayer.mid + this.teamPlayer.def) / 3;
                            let ratingOpponent = (this.teamOpponent.att + this.teamOpponent.mid + this.teamOpponent.def) / 3;
                            if (ratingPlayer > ratingOpponent) {
                                this.momentumBoost = 25;
                                this.momentumDuration = 10;
                            }
                            return this.checkGoalCommentary("İNANILMAZ GOL! Yıkılmadı, ayakta kaldı ve golünü yaptı! MÜTHİŞ BİR KARAKTER! GOOOL!");
                        },
                        onFail: () => {
                            this.playerStats.shots++;
                            return "Dengesiz vurulan şut kale direğinin yanından dışarı gitti.";
                        }
                    },
                    {
                        text: "Kendini yere bırakıp hakemden penaltı bekle.",
                        effect: "Sabit %45 şansla penaltı kazanma şansı.",
                        successChance: 0.45,
                        onSuccess: () => {
                            this.score.player++;
                            this.playerStats.goals++;
                            this.playerStats.shots++;
                            
                            let ratingPlayer = (this.teamPlayer.att + this.teamPlayer.mid + this.teamPlayer.def) / 3;
                            let ratingOpponent = (this.teamOpponent.att + this.teamOpponent.mid + this.teamOpponent.def) / 3;
                            if (ratingPlayer > ratingOpponent) {
                                this.momentumBoost = 20;
                                this.momentumDuration = 10;
                            }
                            return this.checkGoalCommentary("PENALTI! Hakem düdüğü çaldı! Topun başına geçtin ve kaleciyi ters köşe yaptın! GOOOL!");
                        },
                        onFail: () => {
                            if (this.hasYellowCard) {
                                this.isSentOff = true;
                                GAME.state.suspendedWeeks = 2;
                                
                                this.hasYellowCard = false;
                                this.playerState.moral = Math.max(10, (this.playerState.moral || 100) - 20);
                                this.playerState.hocaGuveni = Math.max(10, (this.playerState.hocaGuveni || 40) - 15);
                                return "HAKEM ALDATMAYA YÖNELİK HAREKETTEN 2. SARI KARTTAN KIRMIZI KART GÖSTERDİ! Hakem aldatmayı yemedi ve sizi oyundan ihraç etti!";
                            } else {
                                this.hasYellowCard = true;
                                this.playerState.moral = Math.max(0, this.playerState.moral - 10);
                                this.playerState.hocaGuveni = Math.max(0, this.playerState.hocaGuveni - 5);
                                return "HAKEM ALDATMAYA YÖNELİK HAREKETTEN SARI KART GÖSTERDİ! Hakem yemedi.";
                            }
                        }
                    },
                    {
                        text: "Topu korner bayrağına doğru saklayıp zaman geçir.",
                        effect: "Takım yararına zaman geçirerek maçı kilitleme.",
                        successChance: 0.70 + (this.playerState.speed * 0.002),
                        onSuccess: () => {
                            this.playerState.hocaGuveni = Math.min(100, this.playerState.hocaGuveni + 5);
                            this.playerState.moral = Math.min(100, this.playerState.moral + 5);
                            return "HARİKA TAKTİK ZAMAN GEÇİRME! Topu bayrak direğinin dibinde mükemmel sakladın, stoperlerin sinirleri gerildi ve takıma nefes aldırdın. Hoca kenardan alkışlıyor!";
                        },
                        onFail: () => {
                            return "İki kişi sıkıştırdı, topu taça attılar ve son hücum şansı rakibe geçti.";
                        }
                    }
                ]
            };
        } else if (idx === 0) {
            choiceData = {
                title: "İlk Yarı Fırsatı",
                description: "Ceza sahası yayında topla buluştun, rakip stoperler üstüne doğru kayıyor. Ne yapacaksın?",
                options: [
                    {
                        text: this.getRandomChoiceText('shoot'),
                        effect: "Şut gücüne bağlı gol şansı.",
                        statUsed: "shooting",
                        successChance: 0.18 + (this.playerState.shooting * 0.004),
                        onSuccess: () => {
                            this.score.player++;
                            this.playerStats.goals++;
                            this.playerStats.shots++;
                            
                            let ratingPlayer = (this.teamPlayer.att + this.teamPlayer.mid + this.teamPlayer.def) / 3;
                            let ratingOpponent = (this.teamOpponent.att + this.teamOpponent.mid + this.teamOpponent.def) / 3;
                            if (ratingPlayer > ratingOpponent) {
                                this.momentumBoost = 20;
                                this.momentumDuration = 15;
                            }
                            return this.checkGoalCommentary("MÜTHİŞ BİR GOL! Topu 90'a astın! Tribünler ismini haykırıyor! GOOOL!");
                        },
                        onFail: () => {
                            this.playerStats.shots++;
                            return "Şutun az farkla auta çıktı! Defans derin nefes aldı.";
                        }
                    },
                    {
                        text: this.getRandomChoiceText('pass'),
                        effect: "Pas gücüne bağlı asist şansı.",
                        statUsed: "passing",
                        successChance: 0.25 + (this.playerState.passing * 0.004),
                        onSuccess: () => {
                            this.score.player++;
                            this.playerStats.assists++;
                            this.playerStats.passes++;
                            return "ASİST! Savunmanın arkasına mükemmel bir pas yolladın, arkadaşın kaleciyle karşı karşıya golü yaptı!";
                        },
                        onFail: () => {
                            this.playerStats.passes++;
                            return "Pas denemen kısa kaldı, defans araya girdi ve tehlikeyi önledi.";
                        }
                    },
                    {
                        text: "Kalecinin öne çıktığını gör ve aşırtma vuruş dene!",
                        effect: "Şut ve Pas ortalamasına bağlı yüksek riskli aşırtma.",
                        successChance: 0.12 + (this.playerState.shooting * 0.004),
                        onSuccess: () => {
                            this.score.player++;
                            this.playerStats.goals++;
                            this.playerStats.shots++;
                            
                            let ratingPlayer = (this.teamPlayer.att + this.teamPlayer.mid + this.teamPlayer.def) / 3;
                            let ratingOpponent = (this.teamOpponent.att + this.teamOpponent.mid + this.teamOpponent.def) / 3;
                            if (ratingPlayer > ratingOpponent) {
                                this.momentumBoost = 15;
                                this.momentumDuration = 10;
                            }
                            return this.checkGoalCommentary("İNANILMAZ GOL! Kalecinin üzerinden süzülen top tam direğin dibinden ağlarla buluştu! Müthiş aşırtma!");
                        },
                        onFail: () => {
                            this.playerStats.shots++;
                            return "Aşırtma vuruşun az farkla üst direkten auta çıktı.";
                        }
                    }
                ]
            };
        } else {
            let isCarambole = (idx % 2 === 0);
            if (isCarambole) {
                choiceData = {
                    title: "💥 Ceza Sahası Karambolü",
                    description: "Savunmadan seken top ceza sahası içinde önüne düştü! Kalabalık defans hattı yerleşmeden ne yapacaksın?",
                    options: [
                        {
                            text: this.getRandomChoiceText('shoot'),
                            effect: "Şut gücüne bağlı gol şansı.",
                            successChance: 0.20 + (this.playerState.shooting * 0.004),
                            onSuccess: () => {
                                this.score.player++;
                                this.playerStats.goals++;
                                this.playerStats.shots++;
                                return this.checkGoalCommentary("GOOOL! Kalabalığın arasından sıyrılan top köşeden tam isabetle ağlara gitti!");
                            },
                            onFail: () => {
                                this.playerStats.shots++;
                                return "Şutun defansa çarpıp kornere gitti!";
                            }
                        },
                        {
                            text: this.getRandomChoiceText('pass'),
                            effect: "Pas gücüne bağlı asist şansı.",
                            successChance: 0.24 + (this.playerState.passing * 0.004),
                            onSuccess: () => {
                                this.score.player++;
                                this.playerStats.assists++;
                                this.playerStats.passes++;
                                return "HARİKA ASİST! Topuk pasınla topla buluşan arkadaşın sert vurup ağları sarstı!";
                            },
                            onFail: () => {
                                this.playerStats.passes++;
                                return "Topuk pasın kalabalık defanstan sekti, rakip tehlikeyi uzaklaştırdı.";
                            }
                        }
                    ]
                };
            } else {
                choiceData = {
                    title: "Hızlı Hücum",
                    description: "Kontratakta sol kanatta topla buluştun, önünde geniş bir koridor var. Nasıl ilerleyeceksin?",
                    options: [
                        {
                            text: this.getRandomChoiceText('dribble'),
                            effect: "Hız ve pas ortalamasına bağlı asist şansı.",
                            successChance: 0.20 + ((this.playerState.speed + this.playerState.passing) / 2 * 0.004),
                            onSuccess: () => {
                                this.score.player++;
                                this.playerStats.assists++;
                                this.playerStats.passes++;
                                return "ADRESE TESLİM ORTA! Veli kafayla ağları havalandırdı! ASİST!";
                            },
                            onFail: () => {
                                this.playerStats.passes++;
                                return "Yaptığın orta doğrudan kalecinin kucağında kaldı.";
                            }
                        },
                        {
                            text: this.getRandomChoiceText('shoot'),
                            effect: "Hız ve şut ortalamasına bağlı gol şansı.",
                            successChance: 0.18 + ((this.playerState.speed + this.playerState.shooting) / 2 * 0.004),
                            onSuccess: () => {
                                this.score.player++;
                                this.playerStats.goals++;
                                this.playerStats.shots++;
                                
                                let ratingPlayer = (this.teamPlayer.att + this.teamPlayer.mid + this.teamPlayer.def) / 3;
                                let ratingOpponent = (this.teamOpponent.att + this.teamOpponent.mid + this.teamOpponent.def) / 3;
                                if (ratingPlayer > ratingOpponent) {
                                    this.momentumBoost = 20;
                                    this.momentumDuration = 15;
                                }
                                return this.checkGoalCommentary("NEFİS ÇALIMLAR VE GOL! Kaleciyi de yatırıp topu boş ağlara yolladın! GOOOL!");
                            },
                            onFail: () => {
                                this.playerStats.shots++;
                                return "Çalım denerken rakip bek ayak koydu ve topu kaptı.";
                            }
                        },
                        {
                            text: this.getRandomChoiceText('pass'),
                            effect: "Pas gücüne bağlı asist şansı.",
                            statUsed: "passing",
                            successChance: 0.28 + (this.playerState.passing * 0.004),
                            onSuccess: () => {
                                this.score.player++;
                                this.playerStats.assists++;
                                this.playerStats.passes++;
                                return "MÜKEMMEL GERİ PAS! Ceza sahası çizgisi üzerinden gelen Veli gelişine vurdu ve top köşeden filelerde! ASİST!";
                            },
                            onFail: () => {
                                this.playerStats.passes++;
                                return "Pasın rakip stoperin ayağında kaldı, kontra atak tehlikesi başladı.";
                            }
                        }
                    ]
                };
            }
        }
    }

    this.activeChoice = choiceData;
        
        if (this.callbacks.onMatchChoice) {
            this.callbacks.onMatchChoice(minute, choiceData);
        }
    },

    triggerCardDispute: function() {
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
        this.isPausedForChoice = true;
        
        let choiceData = null;
        const isPenalty = Math.random() < 0.40;

        if (isPenalty) {
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

        let resultComment = "";
        if (success) {
            resultComment = opt.onSuccess();
        } else {
            resultComment = opt.onFail();
        }

        // Display results in commentary
        this.callbacks.onMinuteUpdate(this.min, this.score, resultComment);

        let hasScored = this.playerStats.goals > previousGoals;

        if (hasScored && this.callbacks.onGoalScoredCelebration) {
            this.isPausedForChoice = true;
            this.activeChoice = null;
            this.callbacks.onGoalScoredCelebration(this.min, (celebrationText, celebrationCommentary) => {
                this.callbacks.onMinuteUpdate(this.min, this.score, celebrationCommentary);
                this.isPausedForChoice = false;
                const self = this;
                this.timer = setTimeout(function() {
                    self.resumeTick();
                }, 3000 / this.currentSpeed);
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

                let rating = 6.0 + 
                             (self.playerStats.goals * 1.5) + 
                             (self.playerStats.assists * 1.0) + 
                             (self.playerStats.passes * 0.05) + 
                             (self.playerStats.shots * 0.08);
                if (self.isSentOff) {
                    rating = Math.max(3.0, rating * 0.6);
                }
                rating = Math.max(3.0, Math.min(10.0, parseFloat(rating.toFixed(1))));

                if (self.callbacks.onMatchFinish) {
                    self.callbacks.onMatchFinish({
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

            // If player is red carded, run simplified simulation
            if (self.isSentOff) {
                let ratingPlayer = (self.teamPlayer.att + self.teamPlayer.mid + self.teamPlayer.def) / 3;
                let ratingOpponent = (self.teamOpponent.att + self.teamOpponent.mid + self.teamOpponent.def) / 3;
                if (Math.random() < 0.025) {
                    self.score.opponent++;
                    self.callbacks.onMinuteUpdate(self.min, self.score, `RAKİP GOL ATTI! 10 kişi kalmamızı fırsat bilen ${self.teamOpponent.name} farkı açıyor.`);
                } else if (Math.random() < 0.15) {
                    self.callbacks.onMinuteUpdate(self.min, self.score, `10 kişi mücadele ediyoruz, Ahmet Eren kırmızı kartla tribünde olduğu için hücumda eksiğiz.`);
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
