/**
 * Futbol Atlası: Kariyer Efsanesi - Interactive Match Engine Module
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

        // Generate dynamic choice minutes
        this.choiceMinutes = [
            Math.floor(Math.random() * (38 - 15 + 1)) + 15, // 1st half: 15-38
            Math.floor(Math.random() * (75 - 50 + 1)) + 50, // 2nd half: 50-75
            Math.floor(Math.random() * (89 - 80 + 1)) + 80  // Late game: 80-89
        ];
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
                rating = Math.max(3.0, Math.min(10.0, parseFloat(rating.toFixed(1))));

                if (callbacks.onMatchFinish) {
                    callbacks.onMatchFinish({
                        score: self.score,
                        playerStats: {
                            goals: self.playerStats.goals,
                            assists: self.playerStats.assists,
                            passes: self.playerStats.passes,
                            shots: self.playerStats.shots,
                            rating: rating
                        }
                    });
                }
                return;
            }

            // Decrement momentum duration
            if (self.momentumDuration > 0) {
                self.momentumDuration--;
                if (self.momentumDuration === 0) {
                    self.momentumBoost = 0;
                }
            }

            // Trigger Choice Cards at dynamic minutes
            if (self.choiceMinutes.includes(self.min)) {
                self.triggerChoice(self.min);
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

    triggerChoice: function(minute) {
        this.isPausedForChoice = true;
        
        let choiceData = null;

        if (minute === this.choiceMinutes[0]) {
            choiceData = {
                title: "İlk Yarı Fırsatı",
                description: "Ceza sahası yayında topla buluştun, rakip stoperler üstüne doğru kayıyor. Ne yapacaksın?",
                options: [
                    {
                        text: "Kaleyi gör ve sert şut çek!",
                        effect: "Şut gücüne bağlı gol şansı.",
                        statUsed: "shooting",
                        successChance: 0.3 + (this.playerState.shooting * 0.005),
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
                        text: "Boş koşu yapan Ali'ye ara pası bırak.",
                        effect: "Pas gücüne bağlı asist şansı.",
                        statUsed: "passing",
                        successChance: 0.4 + (this.playerState.passing * 0.005),
                        onSuccess: () => {
                            this.score.player++;
                            this.playerStats.assists++;
                            this.playerStats.passes++;
                            return "HARİKA PAS! Ali kaleciyle karşı karşıya golü yaptı! ASİST!";
                        },
                        onFail: () => {
                            this.playerStats.passes++;
                            return "Pasın şiddeti hızlı oldu, top doğrudan auta gitti.";
                        }
                    },
                    {
                        text: "Klasik aşırtma vuruşla öne çıkan kaleciyi avla!",
                        effect: "Şut gücüne bağlı teknik aşırtma vuruşu.",
                        statUsed: "shooting",
                        successChance: 0.2 + (this.playerState.shooting * 0.006),
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
                            return this.checkGoalCommentary("KAPAK OLSUN! Kalecinin üstünden aşırtıp topu filelere gönderdin! Harika bir vizyon! GOOOL!");
                        },
                        onFail: () => {
                            this.playerStats.shots++;
                            return "Aşırtma vuruşun az farkla üst direkten auta çıktı.";
                        }
                    }
                ]
            };
        } else if (minute === this.choiceMinutes[1]) {
            choiceData = {
                title: "Hızlı Hücum",
                description: "Kontratakta sol kanatta topla buluştun, önünde geniş bir koridor var. Nasıl ilerleyeceksin?",
                options: [
                    {
                        text: "Hızını kullanıp çizgiye in ve ceza sahasına orta aç.",
                        effect: "Hız ve pas ortalamasına bağlı asist şansı.",
                        successChance: 0.35 + ((this.playerState.speed + this.playerState.passing) / 2 * 0.005),
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
                        text: "İçeri kat edip çalımlarla kaleye sokul.",
                        effect: "Hız ve şut ortalamasına bağlı gol şansı.",
                        successChance: 0.3 + ((this.playerState.speed + this.playerState.shooting) / 2 * 0.005),
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
                        text: "Savunmayı üzerine çekip gerilerden gelen orta sahaya pas çıkar.",
                        effect: "Pas gücüne bağlı asist şansı.",
                        statUsed: "passing",
                        successChance: 0.45 + (this.playerState.passing * 0.004),
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
        } else if (minute === this.choiceMinutes[2]) {
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
                            this.playerState.moral = Math.max(0, this.playerState.moral - 10);
                            this.playerState.hocaGuveni = Math.max(0, this.playerState.hocaGuveni - 5);
                            return "HAKEM ALDATMAYA YÖNELİK HAREKETTEN SARI KART GÖSTERDİ! Hakem yemedi.";
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
        }

        this.activeChoice = choiceData;
        
        if (this.callbacks.onMatchChoice) {
            this.callbacks.onMatchChoice(minute, choiceData);
        }
    },

    makeChoice: function(optionIdx) {
        if (!this.activeChoice || !this.activeChoice.options[optionIdx]) return;

        let opt = this.activeChoice.options[optionIdx];
        let rand = Math.random();
        let success = rand < opt.successChance;
        
        let resultComment = "";
        if (success) {
            resultComment = opt.onSuccess();
        } else {
            resultComment = opt.onFail();
        }

        // Display results in commentary
        this.callbacks.onMinuteUpdate(this.min, this.score, resultComment);

        // Resume match
        this.isPausedForChoice = false;
        this.activeChoice = null;

        const self = this;
        this.timer = setTimeout(function() {
            self.resumeTick();
        }, 3000 / this.currentSpeed);
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
                rating = Math.max(3.0, Math.min(10.0, parseFloat(rating.toFixed(1))));

                if (self.callbacks.onMatchFinish) {
                    self.callbacks.onMatchFinish({
                        score: self.score,
                        playerStats: {
                            goals: self.playerStats.goals,
                            assists: self.playerStats.assists,
                            passes: self.playerStats.passes,
                            shots: self.playerStats.shots,
                            rating: rating
                        }
                    });
                }
                return;
            }

            // Decrement momentum duration
            if (self.momentumDuration > 0) {
                self.momentumDuration--;
                if (self.momentumDuration === 0) {
                    self.momentumBoost = 0;
                }
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
