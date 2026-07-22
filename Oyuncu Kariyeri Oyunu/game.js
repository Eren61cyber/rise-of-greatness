/**
 * Rise Of Greatness: Kariyer Efsanesi - Core Game State & Manager Module
 * Coordinates UI, save/load state, training, purchases, and transfer logic.
 */

const GAME = {
    state: {
        playerName: "GenÃƒÂ§ Semih",
        age: 17,
        rating: 50,
        position: "Forvet",
        kondisyon: 100,
        moral: 100,
        followers: 2500,
        money: 1000,
        hocaGuveni: 40,
        
        // Skill Stats
        shooting: 50,
        passing: 48,
        speed: 52,

        // Financial & Boost Modifiers
        weeklySalary: 150,
        sponsorIncomeBonus: 0,
        kondisyonRegenBonus: 0,
        injuryRiskReduction: 0,
        ownedItems: [],

        // Career history
        currentLeague: "SÃƒÂ¼per Lig",
        currentClub: "AmatÃƒÂ¶r KulÃƒÂ¼p", // Starts at amateur

        currentWeek: 1,
        seasonGoals: 0,
        seasonAssists: 0,
        careerGoals: 0,
        careerAssists: 0,
        careerApps: 0
    },

    saveKey: "soccer_atlas_career_save",
    matchSimulatedThisWeek: false,

    init: function() {
        this.loadGame();
        this.updateUI();
    },

    resetGame: function(customName, startingLeague, startingSalary, startingTrust, hometownCity, hometownDistrict, startingClubName) {
        const startingClub = startingClubName ? DATABASE.AMATEUR_CLUBS.find(c => c.name === startingClubName) : DATABASE.getRandomAmateurClub();
        const pName = customName || "Ahmet Eren Demirci";
        const sLeague = startingLeague || "3. Lig";

        this.state = {
            playerName: pName,
            hometownCity: hometownCity || "Sinop",
            hometownDistrict: hometownDistrict || "Gerze",
            age: 17,
            rating: 50,
            position: "Forvet",
            kondisyon: 100,
            moral: 100,
            followers: sLeague === "2. Lig" ? 3500 : 2000,
            money: 1000,
            hocaGuveni: startingTrust || 40,
            shooting: 50,
            passing: 48,
            speed: 52,
            dribbling: 50,
            defense: 50,
            physical: 50,
            injuryWeeks: 0,
            familyBondsSevered: false,
            familyStoryWeeks: 0,
            familyStoryStage: 0,
            weeklySalary: startingSalary || 150,
            sponsorIncomeBonus: 0,
            kondisyonRegenBonus: 0,
            injuryRiskReduction: 0,
            ownedItems: [],
            currentLeague: sLeague,
            currentClub: startingClub.name,
            currentWeek: 1,
            seasonGoals: 0,
            seasonAssists: 0,
            careerGoals: 0,
            careerAssists: 0,
            careerApps: 0,
            leagueTable: [],
            lastOpponentName: null,
            nextOpponentName: null,
            matchesSinceLastInterview: 0,
            weeksSinceLastTraining: 0,
            weeksSinceLastPurchase: 0,
            relationship: { active: false, id: null, level: 0 },
            familyEstateRejected: false,
            activeBootSponsor: null,
            activePurchasedBoot: null,
            agentId: null,
            takimUyumu: 50,
            taraftarSevgisi: 50,
            bootDurability: 100,
            isNationalCallUp: false,
            weeklyFixtures: [],
            weeklyFixturesWeek: 0,
            activeBets: [],
            betHistory: [],
            suspendedWeeks: 0,
            themeSetting: "auto",
            tefeciBorc: 0,
            tefeciFaiz: 0,
            tefeciHaftalikGeriOdeme: 0,
            cryptoPrices: { btc: 52000, eth: 3200, doge: 0.15, atl: 1.0 },
            cryptoPortfolio: {
                btc: { amount: 0, avgPrice: 52000 },
                eth: { amount: 0, avgPrice: 3200 },
                doge: { amount: 0, avgPrice: 0.15 },
                atl: { amount: 0, avgPrice: 1.0 }
            },
            ownedInvestments: [],
            cryptoHistory: {
                btc: [52000],
                eth: [3200],
                doge: [0.15],
                atl: [1.0]
            },
            mafiaTip: null,
            qualifiedForEurope: null,
            europeanCupStage: 0,
            trophies: [],
            collection: [],
            esportsTeam: null,
            avatarCustomization: (typeof tempAvatarCustomization !== "undefined") ? tempAvatarCustomization : {
                skinColor: "#E2B28B",
                eyeColor: "#5A3D28",
                hairColor: "#1A1A1A",
                hairStyle: "short",
                beardStyle: "none"
            },


            socialFeed: [
                {
                    handle: "@turk_futbol",
                    name: "TÃƒÂ¼rk Futbol GÃƒÂ¼nlÃƒÂ¼Ã„Å¸ÃƒÂ¼",
                    text: `TFF ${sLeague} ekiplerinden ${startingClub.name}, altyapÃ„Â±sÃ„Â±ndan yetiÃ…Å¸tirdiÃ„Å¸i 17 yaÃ…Å¸Ã„Â±ndaki genÃƒÂ§ yetenek ${pName}'ye profesyonel lisans ÃƒÂ§Ã„Â±kardÃ„Â±! Haydi hayÃ„Â±rlÃ„Â±sÃ„Â±. ÄŸÅ¸â€¡Â¹ÄŸÅ¸â€¡Â·Ã¢Å¡Â½`,
                    time: "1s ÃƒÂ¶nce"
                }
            ]
        };
        this.updateTeammateName();
        this.initLeagueTable();
        this.saveGame();
        this.updateUI();
    },

    saveGame: function() {
        localStorage.setItem(this.saveKey, JSON.stringify(this.state));
        console.log("Game state successfully saved!");
    },

    loadGame: function() {
        const savedData = localStorage.getItem(this.saveKey);
        if (savedData) {
            try {
                this.state = JSON.parse(savedData);
                 
                 // Save data migration for fictional team names
                 const nameMap = {
                     "Galatasaray": "Galatastar",
                     "FenerbahÃƒÂ§e": "FenerbaÃƒÂ§e FK",
                     "Trabzonspor": "Trabzon FK",
                     "BeÃ…Å¸iktaÃ…Å¸": "Kartal FK",
                     "BaÃ…Å¸akÃ…Å¸ehir": "BaÃ…Å¸akÃ…Å¸ehir FK",
                     "GÃƒÂ¶ztepe": "GÃƒÂ¶ztepe FK",
                     "Samsunspor": "Samsun FK",
                     "Konyaspor": "Konya FK",
                     "Kocaelispor": "Kocaeli FK",
                     "Alanyaspor": "Alanya FK",
                     "KasÃ„Â±mpaÃ…Å¸a": "KaÃ…Å¸Ã„Â±mpaÃ…Å¸a FK",
                     "EyÃƒÂ¼pspor": "EyÃƒÂ¼pspor FK",
                     "Antalyaspor": "Antalya FK",
                     "Kayserispor": "Kayseri FK",
                     "Sivasspor": "Sivas FK",
                     "Hatayspor": "Hatay FK",
                     "Adana Demirspor": "Adana Demir FK",
                     "Ãƒâ€¡aykur Rizespor": "Rize FK"
                 };
                 let migrated = false;
                 if (this.state.currentClub && nameMap[this.state.currentClub]) {
                     this.state.currentClub = nameMap[this.state.currentClub];
                     migrated = true;
                 }
                 if (this.state.leagueTable && Array.isArray(this.state.leagueTable)) {
                     this.state.leagueTable.forEach(team => {
                         if (team.name && nameMap[team.name]) {
                             team.name = nameMap[team.name];
                             migrated = true;
                         }
                     });
                 }
                 if (this.state.otherLeaguesTables && typeof this.state.otherLeaguesTables === "object") {
                     for (let lg in this.state.otherLeaguesTables) {
                         if (Array.isArray(this.state.otherLeaguesTables[lg])) {
                             this.state.otherLeaguesTables[lg].forEach(team => {
                                 if (team.name && nameMap[team.name]) {
                                     team.name = nameMap[team.name];
                                     migrated = true;
                                 }
                             });
                         }
                     }
                 }
                 if (migrated) {
                     this.saveGame();
                 }
                 
                 // Validate and repair avatarCustomization state (healing/migration)
                 if (!this.state.avatarCustomization || typeof this.state.avatarCustomization !== "object") {
                     this.state.avatarCustomization = {};
                 }
                 let repaired = false;
                 let cust = this.state.avatarCustomization;
                 const defaultCustom = {
                     skinColor: "#E2B28B",
                     eyeColor: "#5A3D28",
                     hairColor: "#1A1A1A",
                     hairStyle: "short",
                     beardStyle: "none"
                 };
                 for (let key in defaultCustom) {
                     if (!cust[key]) {
                         cust[key] = defaultCustom[key];
                         repaired = true;
                     } else if (key.endsWith("Color") && typeof cust[key] === "string" && !cust[key].startsWith("#")) {
                         cust[key] = "#" + cust[key];
                         repaired = true;
                     }
                 }
                 if (repaired) {
                     this.saveGame();
                 }

                if (typeof this.state.careerGoals === "undefined" || isNaN(this.state.careerGoals)) {
                    this.state.careerGoals = 0;
                }
                if (typeof this.state.careerAssists === "undefined" || isNaN(this.state.careerAssists)) {
                    this.state.careerAssists = 0;
                }
                if (typeof this.state.seasonGoals === "undefined" || isNaN(this.state.seasonGoals)) {
                    this.state.seasonGoals = 0;
                }
                if (typeof this.state.seasonAssists === "undefined" || isNaN(this.state.seasonAssists)) {
                    this.state.seasonAssists = 0;
                }
                 if (typeof this.state.dribbling === "undefined") {
                     this.state.dribbling = 50;
                 }
                 if (typeof this.state.defense === "undefined") {
                     this.state.defense = 50;
                 }
                 if (typeof this.state.physical === "undefined") {
                     this.state.physical = 50;
                 }
                 if (typeof this.state.injuryWeeks === "undefined") {
                     this.state.injuryWeeks = 0;
                 }
                 if (typeof this.state.familyBondsSevered === "undefined") {
                     this.state.familyBondsSevered = false;
                 }
                 if (typeof this.state.familyStoryWeeks === "undefined") {
                     this.state.familyStoryWeeks = 0;
                 }
                 if (typeof this.state.familyStoryStage === "undefined") {
                     this.state.familyStoryStage = 0;
                 }
                 if (!this.state.leagueTable || this.state.leagueTable.length === 0) {
                     this.initLeagueTable();
                     this.saveGame();
                 }
                 if (!this.state.socialFeed) {
                    this.state.socialFeed = [];
                    this.saveGame();
                }
                if (!this.state.cryptoPrices) {
                    this.state.cryptoPrices = { btc: 52000, eth: 3200, doge: 0.15, atl: 1.0 };
                    this.saveGame();
                }
                if (!this.state.cryptoPortfolio) {
                    this.state.cryptoPortfolio = {
                        btc: { amount: 0, avgPrice: 52000 },
                        eth: { amount: 0, avgPrice: 3200 },
                        doge: { amount: 0, avgPrice: 0.15 },
                        atl: { amount: 0, avgPrice: 1.0 }
                    };
                    this.saveGame();
                } else if (typeof this.state.cryptoPortfolio.btc === "number" || (this.state.cryptoPortfolio.btc && typeof this.state.cryptoPortfolio.btc.amount === "undefined")) {
                    const oldPortfolio = this.state.cryptoPortfolio;
                    this.state.cryptoPortfolio = {
                        btc: { amount: Number(oldPortfolio.btc || 0), avgPrice: 52000 },
                        eth: { amount: Number(oldPortfolio.eth || 0), avgPrice: 3200 },
                        doge: { amount: Number(oldPortfolio.doge || 0), avgPrice: 0.15 },
                        atl: { amount: Number(oldPortfolio.atl || 0), avgPrice: 1.0 }
                    };
                    this.saveGame();
                }

                if (!this.state.ownedInvestments) {
                    this.state.ownedInvestments = [];
                    this.saveGame();
                }
                if (!this.state.cryptoHistory) {
                    this.state.cryptoHistory = {
                        btc: [this.state.cryptoPrices.btc || 52000],
                        eth: [this.state.cryptoPrices.eth || 3200],
                        doge: [this.state.cryptoPrices.doge || 0.15],
                        atl: [this.state.cryptoPrices.atl || 1.0]
                    };
                    this.saveGame();
                }
                if (typeof this.state.mafiaTip === "undefined" || this.state.mafiaTip === undefined) {
                    this.state.mafiaTip = null;
                    this.saveGame();
                }
                if (typeof this.state.qualifiedForEurope === "undefined") {
                    this.state.qualifiedForEurope = null;
                    this.saveGame();
                }
                if (typeof this.state.europeanCupStage === "undefined") {
                    this.state.europeanCupStage = 0;
                    this.saveGame();
                }
                if (typeof this.state.wonLeagueLastSeason === "undefined") {
                    this.state.wonLeagueLastSeason = false;
                    this.saveGame();
                }
                if (!this.state.trophies) {
                    this.state.trophies = [];
                    this.saveGame();
                }
                if (!this.state.collection) {
                    this.state.collection = [];
                    this.saveGame();
                }
                if (typeof this.state.esportsTeam === "undefined") {
                    this.state.esportsTeam = null;
                    this.saveGame();
                }
                if (typeof this.state.themeSetting === "undefined") {
                    this.state.themeSetting = "auto";
                    this.saveGame();
                }
                if (typeof this.state.nationalBanWeeks === "undefined") {
                    this.state.nationalBanWeeks = 0;
                    this.saveGame();
                }
                if (typeof this.state.tefeciBorc === "undefined") {
                    this.state.tefeciBorc = 0;
                    this.state.tefeciFaiz = 0;
                    this.state.tefeciHaftalikGeriOdeme = 0;
                    this.saveGame();
                }
                if (!this.state.weeklyFixtures) {
                    this.state.weeklyFixtures = [];
                    this.state.weeklyFixturesWeek = 0;
                    this.saveGame();
                }
                if (!this.state.activeBets) {
                    this.state.activeBets = [];
                    this.saveGame();
                }
                if (!this.state.betHistory) {
                    this.state.betHistory = [];
                    this.saveGame();
                }
                if (typeof this.state.activeBootSponsor === "undefined") {
                    this.state.activeBootSponsor = null;
                    this.saveGame();
                }
                if (typeof this.state.activePurchasedBoot === "undefined") {
                    this.state.activePurchasedBoot = null;
                    this.saveGame();
                }
                if (typeof this.state.suspendedWeeks === "undefined") {
                    this.state.suspendedWeeks = 0;
                    this.saveGame();
                }
                if (typeof this.state.agentId === "undefined") {
                    this.state.agentId = null;
                    this.saveGame();
                }
                if (typeof this.state.moral === "undefined" || this.state.moral === null || isNaN(this.state.moral)) {
                    this.state.moral = 100;
                    this.saveGame();
                }
                if (typeof this.state.kondisyon === "undefined" || this.state.kondisyon === null || isNaN(this.state.kondisyon)) {
                    this.state.kondisyon = 100;
                    this.saveGame();
                }
                if (typeof this.state.hocaGuveni === "undefined" || this.state.hocaGuveni === null || isNaN(this.state.hocaGuveni)) {
                    this.state.hocaGuveni = 40;
                    this.saveGame();
                }
                if (typeof this.state.takimUyumu === "undefined" || this.state.takimUyumu === null || isNaN(this.state.takimUyumu)) {
                    this.state.takimUyumu = 50;
                    this.saveGame();
                }
                if (typeof this.state.taraftarSevgisi === "undefined" || this.state.taraftarSevgisi === null || isNaN(this.state.taraftarSevgisi)) {
                    this.state.taraftarSevgisi = 50;
                    this.saveGame();
                }
                if (typeof this.state.bootDurability === "undefined" || this.state.bootDurability === null || isNaN(this.state.bootDurability)) {
                    this.state.bootDurability = 100;
                    this.saveGame();
                }
                if (typeof this.state.lastLoginDay === "undefined") {
                    this.state.lastLoginDay = "";
                    this.state.consecutiveLogins = 0;
                    this.state.lastLoginTimestamp = 0;
                    this.saveGame();
                }

                this.checkDailyLoginReward();
                this.matchSimulatedThisWeek = false;

                console.log("Loaded game state successfully!");
            } catch (e) {
                console.error("Failed to parse save game data:", e);
            }
        }
    },

    checkDailyLoginReward: function() {
        const todayString = new Date().toDateString();
        if (this.state.lastLoginDay !== todayString) {
            const now = Date.now();
            const lastTs = this.state.lastLoginTimestamp || 0;
            const diffHours = (now - lastTs) / (1000 * 60 * 60);
            
            if (lastTs === 0) {
                this.state.consecutiveLogins = 1;
            } else if (diffHours < 36) {
                this.state.consecutiveLogins = (this.state.consecutiveLogins || 0) % 7 + 1;
            } else {
                this.state.consecutiveLogins = 1;
            }
            
            this.state.lastLoginDay = todayString;
            this.state.lastLoginTimestamp = now;
            
            this.state.pendingDailyReward = {
                active: true,
                day: this.state.consecutiveLogins
            };
            this.saveGame();
        }
    },

    train: function(statType) {
        if (this.state.injuryWeeks > 0) {
            alert(`SakatlÃ„Â±Ã„Å¸Ã„Â±nÃ„Â±z devam ediyor! Antrenman yapamazsÃ„Â±nÃ„Â±z. Ã„Â°yileÃ…Å¸menize ${this.state.injuryWeeks} hafta kaldÃ„Â±.`);
            return;
        }

        if ((this.state[statType] || 50) >= 100) {
            alert("Bu yetenek zaten maksimum seviyede (%100)!");
            return;
        }

        // HaftalÃ„Â±k 4 antrenman sÃ„Â±nÃ„Â±rÃ„Â±
        if (typeof this.state.weeklyTrainingCount === "undefined") {
            this.state.weeklyTrainingCount = 0;
        }
        if (this.state.weeklyTrainingCount >= 4) {
            alert("Bu hafta zaten 4 kez antrenman yaptÃ„Â±nÃ„Â±z! KaslarÃ„Â±nÃ„Â±zÃ„Â± aÃ…Å¸Ã„Â±rÃ„Â± yormamalÃ„Â±sÃ„Â±nÃ„Â±z. HaftayÃ„Â± ilerletip yeni haftaya geÃƒÂ§erek antrenmanlara devam edebilirsiniz.");
            return;
        }

        let energyCost = this.state.ownedItems.includes("doc_ahmet") ? 15 : 20;
        if (this.state.kondisyon < energyCost) {
            alert(`Antrenman yapmak iÃƒÂ§in en az %${energyCost} kondisyon gereklidir! Dinlenmelisin.`);
            return;
        }

        this.state.kondisyon -= energyCost;
        this.state.weeklyTrainingCount++;
        if (statType === "shooting") {
            this.state.shooting = Math.min(100, (this.state.shooting || 50) + 1);
        } else if (statType === "passing") {
            this.state.passing = Math.min(100, (this.state.passing || 50) + 1);
        } else if (statType === "speed") {
            this.state.speed = Math.min(100, (this.state.speed || 50) + 1);
        } else if (statType === "dribbling") {
            this.state.dribbling = Math.min(100, (this.state.dribbling || 50) + 1);
        } else if (statType === "defense") {
            this.state.defense = Math.min(100, (this.state.defense || 50) + 1);
        } else if (statType === "physical") {
            this.state.physical = Math.min(100, (this.state.physical || 50) + 1);
        }

        this.state.weeksSinceLastTraining = 0;

        // Antrenman yapinca hoca baskisi kalkar
        if (this.state.consecutivePoorMatches > 0) {
            this.state.trainingDoneAfterWarning = true;
            this.state.consecutivePoorMatches = 0;
            this.state.hocaGuveni = Math.min(100, (this.state.hocaGuveni || 40) + 5);
            alert("Antrenman tamamlandi! Hoca baskisi azaldi. Bir sonraki maca daha hazir hissediyorsun.");
        }

        // Recalculate overall rating (Average of all 6 attributes)
        this.state.rating = Math.round(
            ((this.state.shooting || 50) + 
             (this.state.passing || 50) + 
             (this.state.speed || 50) + 
             (this.state.dribbling || 50) + 
             (this.state.defense || 50) + 
             (this.state.physical || 50)) / 6
        );

        this.saveGame();
        this.updateUI();
    },

    buyItem: function(itemId) {
        const item = DATABASE.LIFESTYLE_ITEMS.find(i => i.id === itemId);
        if (!item) return;

        if (this.state.ownedItems.includes(itemId)) {
            alert("Bu eÃ…Å¸yaya zaten sahipsiniz!");
            return;
        }

        if (this.state.money < item.cost) {
            alert("Bunu satÃ„Â±n almak iÃƒÂ§in yeterli paranÃ„Â±z yok!");
            return;
        }

        this.state.money -= item.cost;
        this.state.ownedItems.push(itemId);
        this.state.weeksSinceLastPurchase = 0;
        
        // Apply immediate effects
        item.effect(this.state);

        let displayName = item.name;
        if (itemId === "gerze_fc") {
            let locationName = this.state.hometownDistrict || this.state.hometown || "Gerze";
            locationName = locationName.charAt(0).toUpperCase() + locationName.slice(1);
            displayName = `ÄŸÅ¸â€˜â€˜ ${locationName} Belediyespor KulÃƒÂ¼bÃƒÂ¼`;
        }

        this.saveGame();
        this.updateUI();
        alert(`${displayName} baÃ…Å¸arÃ„Â±yla satÃ„Â±n alÃ„Â±ndÃ„Â±!`);
    },

    buyConsumable: function(itemId) {
        const item = DATABASE.CONSUMABLES.find(c => c.id === itemId);
        if (!item) return false;
        
        if (this.state.money < item.cost) {
            alert(`Bunu satÃ„Â±n almak iÃƒÂ§in yeterli paranÃ„Â±z yok! Gerekli: ${item.cost.toLocaleString()} Ã¢â€šÂ¬`);
            return false;
        }
        
        this.state.money -= item.cost;
        item.effect(this.state);
        this.state.weeksSinceLastPurchase = 0;
        
        this.saveGame();
        this.updateUI();
        alert(`${item.name} baÃ…Å¸arÃ„Â±yla tÃƒÂ¼ketildi! Enerjiniz tazelendi.`);
        return true;
    },

    hireAgent: function(agentId) {
        const agent = DATABASE.AGENTS.find(a => a.id === agentId);
        if (!agent) return false;
        
        if (this.state.agentId === agentId) {
            alert("Bu menajere zaten sahipsiniz!");
            return false;
        }

        if (agent.cost > 0) {
            if (this.state.money < agent.cost) {
                alert(`Bu menajeri kiralamak iÃƒÂ§in yeterli paranÃ„Â±z yok! Gerekli: ${agent.cost.toLocaleString()} Ã¢â€šÂ¬`);
                return false;
            }
            this.state.money -= agent.cost;
        }

        let oldAgentMsg = "";
        if (this.state.agentId) {
            const oldAgent = DATABASE.AGENTS.find(a => a.id === this.state.agentId);
            if (oldAgent) {
                oldAgentMsg = `${oldAgent.name} ile yollar ayrÃ„Â±ldÃ„Â±. `;
            }
        }

        this.state.agentId = agentId;
        this.saveGame();
        this.updateUI();
        
        alert(`${oldAgentMsg}${agent.name} artÃ„Â±k yeni menajeriniz! HaftalÃ„Â±k komisyonu: %${agent.commissionRate * 100}`);
        return true;
    },


    advanceWeek: function() {
        this.state.currentWeek++;

        // Transfer penceresi kapandÃ„Â±ysa aktif teklifleri sÃ„Â±fÃ„Â±rla
        if (!this.isTransferWindowActive()) {
            this.state.activeTransferOffers = [];
        }

        // HaftalÃ„Â±k antrenman sayacÃ„Â±nÃ„Â± sÃ„Â±fÃ„Â±rla
        this.state.weeklyTrainingCount = 0;

        if (typeof this.state.weeksSinceLastTraining === "undefined") this.state.weeksSinceLastTraining = 0;
        if (typeof this.state.weeksSinceLastPurchase === "undefined") this.state.weeksSinceLastPurchase = 0;

        // EÃ„Å¸er tÃƒÂ¼m yetenekler ful ise antrenman yapmama sayacÃ„Â±nÃ„Â± artÃ„Â±rma
        let isAllMaxed = (this.state.shooting >= 100 && this.state.passing >= 100 && this.state.speed >= 100 && (this.state.dribbling || 50) >= 100 && (this.state.defense || 50) >= 100 && (this.state.physical || 50) >= 100);
        if (!isAllMaxed) {
            this.state.weeksSinceLastTraining++;
        } else {
            this.state.weeksSinceLastTraining = 0;
        }
        this.state.weeksSinceLastPurchase++;

        if (this.state.familyStoryWeeks && this.state.familyStoryWeeks > 0) {
            this.state.familyStoryWeeks--;
        }

        if (this.state.injuryWeeks && this.state.injuryWeeks > 0) {
            this.state.injuryWeeks--;
            if (this.state.injuryWeeks === 0) {
                alert("ÄŸÅ¸Ââ€° MÃƒÂ¼jde! SakatlÃ„Â±Ã„Å¸Ã„Â±nÃ„Â±z tamamen geÃƒÂ§ti. Sahalara ve antrenmanlara dÃƒÂ¶nmeye hazÃ„Â±rsÃ„Â±nÃ„Â±z! ÄŸÅ¸â€™ÂªÃ¢Å¡Â½");
            } else {
                alert(`ÄŸÅ¸Å¡â€˜ Tedaviniz devam ediyor. Ã„Â°yileÃ…Å¸menize ${this.state.injuryWeeks} hafta kaldÃ„Â±.`);
            }
        }

        if (this.state.nationalBanWeeks && this.state.nationalBanWeeks > 0) {
            this.state.nationalBanWeeks--;
        }

        // Season End check at week 34
        if (this.state.currentWeek > 37) {
            this.handleSeasonEnd();
            return;
        }

        // Calculate weekly salary
        let salary = this.state.weeklySalary;
        if (this.state.sponsorIncomeBonus > 0) {
            salary += Math.round(salary * (this.state.sponsorIncomeBonus / 100));
        }

        // Gerze FC Club Owner Passive Income & Followers
        if (this.state.ownedItems && this.state.ownedItems.includes("gerze_fc")) {
            salary += 10000;
            this.state.followers += 15000;
        }

        // Family Brand passive income & followers
        if (this.state.ownedItems && this.state.ownedItems.includes("family_brand")) {
            salary += 5000;
            this.state.followers += 2000;
        }
        
        // Add boot sponsor weekly pay
        if (this.state.activeBootSponsor) {
            const boot = DATABASE.BOOT_SPONSORS.find(b => b.id === this.state.activeBootSponsor);
            if (boot) {
                salary += boot.weeklyPay;
            }
        }

        // Add hometown investments weekly passive income
        if (this.state.ownedInvestments) {
            this.state.ownedInvestments.forEach(invId => {
                const inv = DATABASE.HOMETOWN_INVESTMENTS.find(i => i.id === invId);
                if (inv && inv.weeklyYield > 0) {
                    salary += inv.weeklyYield;
                }
            });
        }

        // Menajer Komisyonu Kesintisi
        let agentCommission = 0;
        let agentName = "";
        if (this.state.agentId) {
            const agent = DATABASE.AGENTS.find(a => a.id === this.state.agentId);
            if (agent) {
                agentCommission = Math.round(this.state.weeklySalary * agent.commissionRate);
                salary = Math.max(0, salary - agentCommission);
                agentName = agent.name;
            }
        }

        this.state.money += salary;

        // Krampon eskime payÃ„Â±
        if (this.state.activeBootSponsor || this.state.activePurchasedBoot) {
            if (typeof this.state.bootDurability === "undefined") {
                this.state.bootDurability = 100;
            }
            this.state.bootDurability = Math.max(0, this.state.bootDurability - 5);
            if (this.state.bootDurability <= 0) {
                let bootName = "Kramponun";
                if (this.state.activeBootSponsor) {
                    const boot = DATABASE.BOOT_SPONSORS.find(b => b.id === this.state.activeBootSponsor);
                    if (boot) {
                        bootName = `${boot.brand} ${boot.model}`;
                        if (boot.bonus) {
                            if (boot.bonus.speed) this.state.speed = Math.max(30, this.state.speed - boot.bonus.speed);
                            if (boot.bonus.shooting) this.state.shooting = Math.max(30, this.state.shooting - boot.bonus.shooting);
                            if (boot.bonus.passing) this.state.passing = Math.max(30, this.state.passing - boot.bonus.passing);
                        }
                    }
                    this.state.activeBootSponsor = null;
                } else if (this.state.activePurchasedBoot) {
                    const boot = DATABASE.PURCHASABLE_BOOTS.find(b => b.id === this.state.activePurchasedBoot);
                    if (boot) {
                        bootName = `${boot.brand} ${boot.model}`;
                        if (boot.bonus) {
                            if (boot.bonus.speed) this.state.speed = Math.max(30, this.state.speed - boot.bonus.speed);
                            if (boot.bonus.shooting) this.state.shooting = Math.max(30, this.state.shooting - boot.bonus.shooting);
                            if (boot.bonus.passing) this.state.passing = Math.max(30, this.state.passing - boot.bonus.passing);
                        }
                    }
                    this.state.activePurchasedBoot = null;
                }
                this.state.rating = Math.round((this.state.shooting + this.state.passing + this.state.speed) / 3);
                this.addSocialPost("@spor_manset", "Ekipman Raporu", `Ã¢Å¡Â Ã¯Â¸Â KÃƒÂ¶tÃƒÂ¼ haber! ${this.state.playerName}'nin giydiÃ„Å¸i ${bootName} kramponunun ÃƒÂ¶mrÃƒÂ¼ tÃƒÂ¼kendi ve parÃƒÂ§alandÃ„Â±! YÃ„Â±ldÃ„Â±z oyuncu yeni bir krampon arayÃ„Â±Ã…Å¸Ã„Â±nda.`);
            }
        }

        // Fluctuate Crypto Prices
        if (!this.state.cryptoPrices) {
            this.state.cryptoPrices = { btc: 52000, eth: 3200, doge: 0.15, atl: 1.0 };
        }
        
        let btcChange = (Math.random() * 11 - 5) / 100;
        let ethChange = (Math.random() * 20 - 9) / 100;
        let dogeChange = (Math.random() * 60 - 25) / 100;
        let atlBase = (this.state.rating - 50) / 100;
        let atlChange = (Math.random() * 30 - 15 + (atlBase * 15)) / 100;

        // Apply mafia insider tip multiplier
        if (this.state.mafiaTip) {
            let tip = this.state.mafiaTip;
            if (tip.targetWeek === this.state.currentWeek) {
                let spike = 2.0 + Math.random() * 2.0; // 200% to 400% spike
                if (tip.coinId === "btc") btcChange = spike;
                else if (tip.coinId === "eth") ethChange = spike;
                else if (tip.coinId === "doge") dogeChange = spike;
                else if (tip.coinId === "atl") atlChange = spike;
                
                this.state.mafiaTip = null;
            }
        }
        
        this.state.cryptoPrices.btc = Math.max(1000, parseFloat((this.state.cryptoPrices.btc * (1 + btcChange)).toFixed(2)));
        this.state.cryptoPrices.eth = Math.max(100, parseFloat((this.state.cryptoPrices.eth * (1 + ethChange)).toFixed(2)));
        this.state.cryptoPrices.doge = Math.max(0.01, parseFloat((this.state.cryptoPrices.doge * (1 + dogeChange)).toFixed(4)));
        this.state.cryptoPrices.atl = Math.max(0.05, parseFloat((this.state.cryptoPrices.atl * (1 + atlChange)).toFixed(4)));

        // Update cryptoHistory
        if (!this.state.cryptoHistory) {
            this.state.cryptoHistory = { btc: [], eth: [], doge: [], atl: [] };
        }
        for (let coinId in this.state.cryptoPrices) {
            if (!this.state.cryptoHistory[coinId]) {
                this.state.cryptoHistory[coinId] = [];
            }
            this.state.cryptoHistory[coinId].push(this.state.cryptoPrices[coinId]);
            if (this.state.cryptoHistory[coinId].length > 8) {
                this.state.cryptoHistory[coinId].shift();
            }
        }



        // Deduct weekly lifestyle costs
        let weeklyDeduction = 0;
        for (let itemId of this.state.ownedItems) {
            const item = DATABASE.LIFESTYLE_ITEMS.find(i => i.id === itemId);
            if (item && item.isWeekly) {
                weeklyDeduction += item.cost;
            }
        }

        // Yacht & Jet weekly maintenance costs
        if (this.state.ownedItems.includes("yacht")) {
            weeklyDeduction += 12000;
        }
        if (this.state.ownedItems.includes("jet")) {
            weeklyDeduction += 35000;
        }
        
        // Sevgili haftalik giderini dus ve etkilerini uygula
        if (this.state.relationship && this.state.relationship.active) {
            const gf = DATABASE.GIRLFRIENDS.find(g => g.id === this.state.relationship.id);
            if (gf) {
                weeklyDeduction += gf.cost;
                gf.applyWeekly(this.state);
                // Iliski bag seviyesi her hafta hafifce duser
                this.state.relationship.level = Math.max(0, this.state.relationship.level - 3);
            }
        }
        
        this.state.money = Math.max(0, this.state.money - weeklyDeduction);

        // Tefeci BorÃƒÂ§ Geri Ãƒâ€“demesi
        if (this.state.tefeciBorc > 0) {
            let payment = this.state.tefeciHaftalikGeriOdeme;
            if (this.state.money >= payment) {
                this.state.money -= payment;
                this.state.tefeciBorc -= payment;
                if (this.state.tefeciBorc <= 0) {
                    this.state.tefeciBorc = 0;
                    this.state.tefeciFaiz = 0;
                    this.state.tefeciHaftalikGeriOdeme = 0;
                    this.state.mafiaRepaid = true;
                } else {
                    this.state.mafiaPaidThisWeek = payment;
                }
            } else {
                // BorÃƒÂ§ ÃƒÂ¶denemedi - Darp ve EÃ…Å¸yaya Ãƒâ€¡ÃƒÂ¶kme Eventi!
                this.state.money = 0;
                this.state.kondisyon = 5;
                this.state.moral = 5;
                this.state.tefeciBorc = Math.round(this.state.tefeciBorc * 1.25); // BorÃƒÂ§ %25 faizle katlanÃ„Â±r!
                this.state.tefeciHaftalikGeriOdeme = Math.round(this.state.tefeciHaftalikGeriOdeme * 1.20);
                this.state.mafiaBeating = true;

                // Tefeci mal varlÃ„Â±Ã„Å¸Ã„Â±na ÃƒÂ§ÃƒÂ¶ker!
                let seizableItems = ["penthouse", "sports_car", "yacht", "jet", "mansion", "gerze_fc"].filter(id => this.state.ownedItems.includes(id));
                if (seizableItems.length > 0) {
                    let seizedId = seizableItems[Math.floor(Math.random() * seizableItems.length)];
                    this.state.ownedItems = this.state.ownedItems.filter(id => id !== seizedId);
                    
                    let itemVal = 0;
                    let itemName = "";
                    if (seizedId === "penthouse") { itemVal = 500000; itemName = "BoÃ„Å¸az ManzaralÃ„Â± Rezidans"; }
                    else if (seizedId === "sports_car") { itemVal = 120000; itemName = "LÃƒÂ¼ks Spor Araba"; }
                    else if (seizedId === "yacht") { itemVal = 1000000; itemName = "Ultra LÃƒÂ¼ks Yat"; }
                    else if (seizedId === "jet") { itemVal = 3000000; itemName = "Ãƒâ€“zel Jet"; }
                    else if (seizedId === "mansion") { itemVal = 2000000; itemName = "Tarihi BoÃ„Å¸az YalÃ„Â±sÃ„Â±"; }
                    else if (seizedId === "gerze_fc") { itemVal = 6000000; itemName = "Gerze Belediyespor KulÃƒÂ¼bÃƒÂ¼"; }
                    
                    this.state.tefeciBorc = Math.max(0, this.state.tefeciBorc - itemVal);
                    this.state.tefeciHaftalikGeriOdeme = Math.round(this.state.tefeciBorc * 0.15);
                    this.state.mafiaSeizedItem = { name: itemName, reduction: itemVal };
                }
            }
        }

        // HaraÃƒÂ§ Talebi (Extortion) KontrolÃƒÂ¼
        if (this.state.money >= 50000 || this.state.followers >= 80000) {
            if (Math.random() < 0.15) { // %15 Ã…Å¸ansla haraÃƒÂ§ mafyasÃ„Â± kapÃ„Â±ya dayanÃ„Â±r
                let hasBodyguard = this.state.ownedItems.includes("bodyguard");
                if (hasBodyguard) {
                    this.state.mafiaExtortionDefended = true;
                } else {
                    // HaraÃƒÂ§ miktarÃ„Â±: nakit paranÃ„Â±n %4'ÃƒÂ¼ + 800 Ã¢â€šÂ¬
                    let demand = Math.round(this.state.money * 0.04 + 800);
                    if (this.state.money >= demand) {
                        this.state.money -= demand;
                        this.state.mafiaExtortionPaid = demand;
                    } else {
                        // Para yetmedi - Vandalizm!
                        this.state.moral = Math.max(0, this.state.moral - 40);
                        
                        // LÃƒÂ¼ks araba veya evi var mÃ„Â±? Varsa birini sil
                        let targets = ["sports_car", "penthouse"];
                        let destroyedItem = null;
                        for (let t of targets) {
                            let idx = this.state.ownedItems.indexOf(t);
                            if (idx > -1) {
                                this.state.ownedItems.splice(idx, 1);
                                destroyedItem = t;
                                break;
                            }
                        }
                        this.state.mafiaExtortionVandalized = destroyedItem || "general";
                    }
                }
            }
        }

        // Regenerate fitness
        let regen = 15;
        if (this.state.kondisyonRegenBonus > 0) {
            regen += Math.round(regen * (this.state.kondisyonRegenBonus / 100));
        }
        this.state.kondisyon = Math.min(100, this.state.kondisyon + regen);

        // Natural decay of morale
        this.state.moral = Math.max(20, this.state.moral - 5);

        // Simulate league matches if not played manually (skip during national breaks)
        let completedWeek = this.state.currentWeek - 1;
        let isNatBreak = (completedWeek === 12 || completedWeek === 24 || completedWeek === 32);

        if (!isNatBreak) {
            if (!this.matchSimulatedThisWeek) {
                let playerTeamObj = this.getPlayerTeamObject();
                let ratingPlayerTeam = (playerTeamObj.att + playerTeamObj.mid + playerTeamObj.def) / 3;
                
                let ratingOpponent = 70;
                if (this.state.nextOpponentName) {
                    ratingOpponent = this.getTeamAverageRating(this.state.nextOpponentName);
                }
                
                let prob = ratingPlayerTeam / (ratingPlayerTeam + ratingOpponent);
                let teamGoals = 0;
                let oppGoals = 0;
                for (let g = 0; g < 4; g++) {
                    if (Math.random() < prob * 0.45) teamGoals++;
                    if (Math.random() < (1 - prob) * 0.45) oppGoals++;
                }
                this.simulateLeagueWeek(teamGoals, oppGoals);
            }
        }
        this.matchSimulatedThisWeek = false;

        if (this.state.suspendedWeeks > 0) {
            this.state.suspendedWeeks--;
            if (this.state.suspendedWeeks === 0) {
                this.addSocialPost("@spor_manset", "Spor Mansetleri", `Cezasi bitti! Kirmizi kart cezasi sona eren genc yetenek ${this.state.playerName} yeniden formasina kavusuyor.`);
            }
        }


        // Transition opponent states centrally here
        this.state.lastOpponentName = this.state.nextOpponentName;
        this.state.nextOpponentName = null;

        // Simulate weekly Esports match if founded
        if (this.state.esportsTeam) {
            this.simulateEsportsMatch();
        }

        // Check for lack of training warning (4 weeks without training)
        isAllMaxed = (this.state.shooting >= 100 && this.state.passing >= 100 && this.state.speed >= 100 && (this.state.dribbling || 50) >= 100 && (this.state.defense || 50) >= 100 && (this.state.physical || 50) >= 100);
        if (this.state.weeksSinceLastTraining === 4 && this.state.injuryWeeks <= 0 && !isAllMaxed) {
            if (typeof window.showNewspaperModal !== "undefined") {
                setTimeout(() => {
                    window.showNewspaperModal(
                        "FLAÃ…Â HABER ÄŸÅ¸â€œÂ°",
                        `${this.state.playerName.toUpperCase()} KAYIPLARA KARIÃ…ÂTI!`,
                        "Antrenman SahasÃ„Â±nda Tembellik Ã„Â°ddialarÃ„Â±!",
                        `Son <b>4 haftadÃ„Â±r</b> antrenman tesislerinde neredeyse hiÃƒÂ§ gÃƒÂ¶rÃƒÂ¼lmeyen genÃƒÂ§ yÃ„Â±ldÃ„Â±z adayÃ„Â± <b>${this.state.playerName}</b> iÃƒÂ§in spor basÃ„Â±nÃ„Â± kazan kaldÃ„Â±rÃ„Â±yor! <br><br>Taraftarlar sosyal medyada oyuncunun disiplinsizliÃ„Å¸ine isyan ederken, teknik direktÃƒÂ¶rÃƒÂ¼n de bu durumdan son derece rahatsÃ„Â±z olduÃ„Å¸u ve bÃƒÂ¶yle devam ederse oyuncuyu <b>kadro dÃ„Â±Ã…Å¸Ã„Â±</b> bÃ„Â±rakabileceÃ„Å¸i konuÃ…Å¸uluyor. Acilen antrenman yapÃ„Â±p kendini gÃƒÂ¶stermelisin!`
                    );
                }, 1800);
            }
        } 
        // Active penalty for longer neglect (>= 6 weeks without training)
        else if (this.state.weeksSinceLastTraining >= 6 && this.state.injuryWeeks <= 0 && !isAllMaxed) {
            this.state.hocaGuveni = Math.max(5, this.state.hocaGuveni - 8);
            this.state.moral = Math.max(10, this.state.moral - 10);
            
            if (typeof window.showNewspaperModal !== "undefined") {
                setTimeout(() => {
                    window.showNewspaperModal(
                        "KRÃ„Â°Z RAPORU ÄŸÅ¸Å¡Â¨",
                        `DÃ„Â°SÃ„Â°PLÃ„Â°NSÃ„Â°ZLÃ„Â°K FATURASI KESÃ„Â°LDÃ„Â°!`,
                        "Hoca GÃƒÂ¼veni ve Moral Dip YaptÃ„Â±!",
                        `Tam <b>${this.state.weeksSinceLastTraining} haftadÃ„Â±r</b> antrenman yapmayan <b>${this.state.playerName}</b>, kulÃƒÂ¼pte adeta krize neden oldu! <br><br>Teknik direktÃƒÂ¶r oyuncuya olan inancÃ„Â±nÃ„Â± tamamen kaybetti. KulÃƒÂ¼pten sÃ„Â±zan bilgilere gÃƒÂ¶re oyuncunun antrenman yapmayÃ„Â± reddetmesi sebebiyle hoca gÃƒÂ¼veni ve moral yerle bir oldu (-8 Hoca GÃƒÂ¼veni, -10 Moral). Kariyerini kurtarmak iÃƒÂ§in hemen antrenman sekmesine gitmelisin!`
                    );
                }, 1800);
            }
        }

        // Check for lack of shopping warning (6 weeks without purchases)
        if (this.state.weeksSinceLastPurchase === 6) {
            if (typeof window.showNewspaperModal !== "undefined") {
                const agentName = this.state.agentId === "izi" ? "Ã„Â°zim" : "Bedirhan Abi";
                const agentIcon = this.state.agentId === "izi" ? "ÄŸÅ¸â€˜Â©ÄŸÅ¸ÂÂ¼Ã¢â‚¬ÂÄŸÅ¸â€™Â¼" : "ÄŸÅ¸â€˜Â¨ÄŸÅ¸ÂÂ»Ã¢â‚¬ÂÄŸÅ¸â€™Â¼";
                setTimeout(() => {
                    window.showNewspaperModal(
                        "SOSYETÃ„Â°K MAGAZÃ„Â°N ÄŸÅ¸â€œÂ¸",
                        `CÃƒÅ“ZDANININ AÃ„ÂZINI AÃƒâ€¡MIYOR!`,
                        `${this.state.playerName.toUpperCase()} PARALARI MEZARA MI GÃƒâ€“TÃƒÅ“RECEK?`,
                        `Milyon euroluk sÃƒÂ¶zleÃ…Å¸melere imza atan, kulÃƒÂ¼bÃƒÂ¼nden ve sponsorlarÃ„Â±ndan sÃƒÂ¼rekli para kazanan yÃ„Â±ldÃ„Â±z futbolcu <b>${this.state.playerName}</b>'nin son <b>6 haftadÃ„Â±r</b> tek bir kuruÃ…Å¸ bile harcamadÃ„Â±Ã„Å¸Ã„Â± ortaya ÃƒÂ§Ã„Â±ktÃ„Â±! <br><br>Menajeri ${agentIcon} <b>${agentName}</b> oyuncuyu uyardÃ„Â±: <em>"Nakit biriktirmek gÃƒÂ¼zel ama markanÃ„Â± ve yaÃ…Å¸am kaliteni artÃ„Â±rmak iÃƒÂ§in maÃ„Å¸azadan yeni kramponlar, lÃƒÂ¼ks arabalar, mÃƒÂ¼lkler veya borsa yatÃ„Â±rÃ„Â±mlarÃ„Â± almalÃ„Â±sÃ„Â±n. Biraz hayatÃ„Â±n tadÃ„Â±nÃ„Â± ÃƒÂ§Ã„Â±kar aslanÃ„Â±m!"</em>`
                    );
                }, 2800);
            }
        }

        this.saveGame();
        this.updateUI();
    },

    getClubSalaryAndVal: function() {
        let val = DATABASE.calculateValue(this.state.rating, this.state.age);
        let sal = DATABASE.calculateSalary(this.state.rating, val, this.state.currentLeague);
        return { val, sal };
    },

    isTransferWindowActive: function() {
        const w = this.state.currentWeek;
        // Ara Transfer DÃƒÂ¶nemi: 14 - 21. haftalar arasÃ„Â±
        // Yaz Transfer DÃƒÂ¶nemi: 37. hafta (sezon sonu)
        return ((w >= 14 && w <= 21) || w === 37);
    },


    trackMatchPerformance: function(rating, goals, assists) {
        if (!this.state.consecutiveGoodMatches) this.state.consecutiveGoodMatches = 0;
        if (!this.state.consecutivePoorMatches) this.state.consecutivePoorMatches = 0;
        if (!this.state.trainingDoneAfterWarning) this.state.trainingDoneAfterWarning = false;

        const goodPerformance = (rating >= 7.2 || (goals + assists) > 0);
        const poorPerformance = (goals === 0 && assists === 0 && rating < 6.5);

        // Good match tracking (min 7.2 or goal/assist)
        if (goodPerformance) {
            this.state.consecutiveGoodMatches++;
        } else {
            this.state.consecutiveGoodMatches = 0;
        }

        // Poor performance tracking
        let coachMsg = "";
        if (poorPerformance) {
            this.state.consecutivePoorMatches++;
            if (!this.state.trainingDoneAfterWarning) {
                const penalty = Math.min(this.state.consecutivePoorMatches * 3, 15);
                this.state.hocaGuveni = Math.max(0, this.state.hocaGuveni - penalty);
                this.state.moral = Math.max(10, this.state.moral - penalty);
            }
            coachMsg = `\n\nÄŸÅ¸â€”Â£Ã¯Â¸Â Teknik DirektÃƒÂ¶r: "Yeterli katkÃ„Â±yÃ„Â± veremiyorsun ${this.state.playerName}. Git antrenman yap, yoksa deÃ„Å¸iÃ…Å¸iklik yaparÃ„Â±m!"`;
            if (this.state.consecutivePoorMatches >= 2) {
                coachMsg += `\nÃ¢Å¡Â Ã¯Â¸Â (${this.state.consecutivePoorMatches} maÃƒÂ§tÃ„Â±r etkisizsin! Antrenman yapmazsan daha da zorlaÃ…Å¸acak.)`;
            }
        } else {
            this.state.consecutivePoorMatches = 0;
            this.state.trainingDoneAfterWarning = false;
        }

        return coachMsg;
    },

    checkForTransferOffers: function() {
        if (!this.isTransferWindowActive()) {
            this.state.activeTransferOffers = [];
            return [];
        }

        // EÃ„Å¸er halihazÃ„Â±rda bu transfer dÃƒÂ¶nemi iÃƒÂ§in teklifler oluÃ…Å¸turulmuÃ…Å¸sa onlarÃ„Â± dÃƒÂ¶ndÃƒÂ¼r
        if (this.state.activeTransferOffers && this.state.activeTransferOffers.length > 0) {
            return this.state.activeTransferOffers;
        }

        let offers = [];
        const streak = this.state.consecutiveGoodMatches || 0;
        let hasEliteChance = (streak >= 5);
        
        if (this.state.agentId === "mino" && Math.random() < 0.40) {
            hasEliteChance = true;
        }
        
        for (let leagueName in DATABASE.LEAGUES) {
            let league = DATABASE.LEAGUES[leagueName];
            for (let team of league.teams) {
                if (team.name === this.state.currentClub) continue;
                
                let teamAvg = (team.att + team.mid + team.def) / 3;
                let isEliteOffer = false;

                if (hasEliteChance && this.state.rating >= (teamAvg - 20) && this.state.rating <= (teamAvg + 4)) {
                    isEliteOffer = true;
                } else if (this.state.rating >= (teamAvg - 5) && this.state.rating <= (teamAvg + 15)) {
                    isEliteOffer = false;
                } else {
                    continue;
                }

                let val = DATABASE.calculateValue(this.state.rating, this.state.age);
                let sal = DATABASE.calculateSalary(this.state.rating, val, leagueName);
                let multiplier = isEliteOffer ? 1.35 : 1.0;

                offers.push({
                    teamName: team.name,
                    leagueName: leagueName,
                    teamColor: team.color,
                    salary: Math.round(sal * (multiplier + Math.random() * 0.15)),
                    isElite: isEliteOffer
                });
            }
        }
        
        // KarÃ„Â±Ã…Å¸tÃ„Â±r, elit teklifleri baÃ…Å¸a al ve tam olarak 5 teklif seÃƒÂ§
        offers.sort((a,b) => (b.isElite ? 1 : 0) - (a.isElite ? 1 : 0) || Math.random() - 0.5);
        let finalOffers = offers.slice(0, 5);

        // EÃ„Å¸er 5'ten az teklif ÃƒÂ§Ã„Â±ktÃ„Â±ysa, oyuncunun seviyesine en yakÃ„Â±n diÃ„Å¸er takÃ„Â±mlardan doldurma yap
        if (finalOffers.length < 5) {
            let fallbackTeams = [];
            for (let leagueName in DATABASE.LEAGUES) {
                let league = DATABASE.LEAGUES[leagueName];
                for (let team of league.teams) {
                    if (team.name === this.state.currentClub) continue;
                    if (finalOffers.some(o => o.teamName === team.name)) continue;
                    
                    let val = DATABASE.calculateValue(this.state.rating, this.state.age);
                    let sal = DATABASE.calculateSalary(this.state.rating, val, leagueName);
                    fallbackTeams.push({
                        teamName: team.name,
                        leagueName: leagueName,
                        teamColor: team.color,
                        salary: Math.round(sal * (1.0 + Math.random() * 0.15)),
                        isElite: false
                    });
                }
            }
            fallbackTeams.sort(() => Math.random() - 0.5);
            while (finalOffers.length < 5 && fallbackTeams.length > 0) {
                finalOffers.push(fallbackTeams.pop());
            }
        }

        this.state.activeTransferOffers = finalOffers;
        this.saveGame();
        return finalOffers;
    },

    startRelationship: function(gfId) {
        const gf = DATABASE.GIRLFRIENDS.find(g => g.id === gfId);
        if (!gf) return false;
        
        if (this.state.relationship && this.state.relationship.active) {
            alert("Zaten bir iliÃ…Å¸kiniz var! BaÃ…Å¸ka bir teklif yapmadan ÃƒÂ¶nce mevcut iliÃ…Å¸kinizi sonlandÃ„Â±rmalÃ„Â±sÃ„Â±nÃ„Â±z.");
            return false;
        }
        
        // Check requirements
        if (this.state.rating < gf.reqs.rating || this.state.followers < gf.reqs.followers) {
            alert("Bu teklif iÃƒÂ§in gereksinimleri karÃ…Å¸Ã„Â±lamÃ„Â±yorsunuz!");
            return false;
        }
        
        this.state.relationship = {
            active: true,
            id: gfId,
            level: 50 // Starts at 50% relationship bond
        };
        
        // Apply initial moral boost
        this.state.moral = Math.min(100, this.state.moral + 20);
        
        this.addSocialPost(`@${this.state.playerName.toLowerCase().replace(/\s/g, '_')}_hayat`, `${this.state.playerName} Magazin`, `GenÃƒÂ§ futbolcu ${this.state.playerName}, ${gf.name} ile yeni bir iliÃ…Å¸kiye baÃ…Å¸ladÃ„Â±Ã„Å¸Ã„Â±nÃ„Â± duyurdu! Ãƒâ€¡iftimize mutluluklar dileriz. Ã¢ÂÂ¤Ã¯Â¸ÂÄŸÅ¸Â¥â€š`);
        
        this.saveGame();
        this.updateUI();
        alert(`${gf.name} ile iliÃ…Å¸kiniz baÃ…Å¸ladÃ„Â±! Mutluluklar!`);
        return true;
    },

    goOnDate: function() {
        if (!this.state.relationship || !this.state.relationship.active) return false;
        
        const gf = DATABASE.GIRLFRIENDS.find(g => g.id === this.state.relationship.id);
        if (!gf) return false;
        
        const dateCost = Math.round(gf.cost * 0.8 + 100);
        
        if (this.state.money < dateCost) {
            alert("BuluÃ…Å¸maya ÃƒÂ§Ã„Â±kmak iÃƒÂ§in yeterli paranÃ„Â±z yok!");
            return false;
        }
        if (this.state.kondisyon < 20) {
            alert("BuluÃ…Å¸maya ÃƒÂ§Ã„Â±kmak iÃƒÂ§in ÃƒÂ§ok yorgunsunuz! Dinlenin.");
            return false;
        }
        
        this.state.money -= dateCost;
        this.state.kondisyon -= 20;
        this.state.moral = Math.min(100, this.state.moral + 15);
        this.state.relationship.level = Math.min(100, this.state.relationship.level + 15);
        
        this.saveGame();
        this.updateUI();
        alert(`${gf.name} ile harika bir akÃ…Å¸am geÃƒÂ§irdiniz! Ã„Â°liÃ…Å¸ki baÃ„Å¸Ã„Â± gÃƒÂ¼ÃƒÂ§lendi.\nHarcanan Para: ${dateCost} Ã¢â€šÂ¬\nKondisyon: -20% | Moral: +15%`);
        return true;
    },

    breakUp: function() {
        if (!this.state.relationship || !this.state.relationship.active) return false;
        
        const gf = DATABASE.GIRLFRIENDS.find(g => g.id === this.state.relationship.id);
        const name = gf ? gf.name : "kÃ„Â±z arkadaÃ…Å¸Ã„Â±nÃ„Â±z";
        
        if (!confirm(`${name} ile ayrÃ„Â±lmak istediÃ„Å¸inizden emin misiniz?`)) return false;
        
        this.state.relationship = { active: false, id: null, level: 0 };
        this.state.moral = Math.max(10, this.state.moral - 25);
        
        this.addSocialPost("@magazin_gundem", "Magazin GÃƒÂ¼ndemi", `Ã…Âok ayrÃ„Â±lÃ„Â±k! ${this.state.playerName} ile ${name} iliÃ…Å¸kilerini sonlandÃ„Â±rdÃ„Â±klarÃ„Â±nÃ„Â± aÃƒÂ§Ã„Â±kladÃ„Â±. AyrÃ„Â±lÃ„Â±k sonrasÃ„Â± genÃƒÂ§ futbolcunun morali bozuk gÃƒÂ¶rÃƒÂ¼nÃƒÂ¼yor. ÄŸÅ¸â€™â€`);
        
        this.saveGame();
        this.updateUI();
        alert(`${name} ile yollarÃ„Â±nÃ„Â±zÃ„Â± ayÃ„Â±rdÃ„Â±nÃ„Â±z. Moralin dÃƒÂ¼Ã…Å¸tÃƒÂ¼.`);
        return true;
    },

    signBootSponsor: function(bootId) {
        const boot = DATABASE.BOOT_SPONSORS.find(b => b.id === bootId);
        if (!boot) return false;
        
        if (this.state.rating < boot.reqRating || this.state.followers < boot.reqFollowers) {
            alert("Bu sponsorluk iÃƒÂ§in gereksinimleri karÃ…Å¸Ã„Â±lamÃ„Â±yorsunuz.");
            return false;
        }
        
        if (this.state.activeBootSponsor) {
            const oldBoot = DATABASE.BOOT_SPONSORS.find(b => b.id === this.state.activeBootSponsor);
            if (oldBoot) {
                this.state.speed = Math.max(30, this.state.speed - oldBoot.bonus.speed);
                this.state.shooting = Math.max(30, this.state.shooting - oldBoot.bonus.shooting);
                this.state.passing = Math.max(30, this.state.passing - oldBoot.bonus.passing);
            }
            this.state.activeBootSponsor = null;
        }

        if (this.state.activePurchasedBoot) {
            const oldBoot = DATABASE.PURCHASABLE_BOOTS.find(b => b.id === this.state.activePurchasedBoot);
            if (oldBoot) {
                this.state.speed = Math.max(30, this.state.speed - oldBoot.bonus.speed);
                this.state.shooting = Math.max(30, this.state.shooting - oldBoot.bonus.shooting);
                this.state.passing = Math.max(30, this.state.passing - oldBoot.bonus.passing);
            }
            this.state.activePurchasedBoot = null;
        }
        
        this.state.activeBootSponsor = boot.id;
        this.state.speed += boot.bonus.speed;
        this.state.shooting += boot.bonus.shooting;
        this.state.passing += boot.bonus.passing;
        
        this.state.rating = Math.round((this.state.shooting + this.state.passing + this.state.speed) / 3);
        
        this.addSocialPost("@transfer_kulisi", "Transfer Kulisi", `${this.state.playerName}, ÃƒÂ¼nlÃƒÂ¼ spor markasÃ„Â± ${boot.brand} ile resmi krampon sponsorluÃ„Å¸u imzaladÃ„Â±! Sahada ${boot.model} modelini giyecek! ÄŸÅ¸Â¥Â¾ÄŸÅ¸â€Â¥`);
        
        this.saveGame();
        this.updateUI();
        alert(`Tebrikler! ${boot.brand} ile sponsorluk imzaladÃ„Â±nÃ„Â±z!\nYeni Krampon: ${boot.model}\nYetenekleriniz gÃƒÂ¼ncellendi ve haftalÃ„Â±k +${boot.weeklyPay} Ã¢â€šÂ¬ prim eklendi.`);
        return true;
    },

    buyBoot: function(bootId) {
        const boot = DATABASE.PURCHASABLE_BOOTS.find(b => b.id === bootId);
        if (!boot) return false;
        
        if (this.state.money < boot.cost) {
            alert("Bu kramponu satÃ„Â±n almak iÃƒÂ§in yeterli paranÃ„Â±z yok.");
            return false;
        }
        
        if (this.state.activeBootSponsor) {
            const oldBoot = DATABASE.BOOT_SPONSORS.find(b => b.id === this.state.activeBootSponsor);
            if (oldBoot) {
                this.state.speed = Math.max(30, this.state.speed - oldBoot.bonus.speed);
                this.state.shooting = Math.max(30, this.state.shooting - oldBoot.bonus.shooting);
                this.state.passing = Math.max(30, this.state.passing - oldBoot.bonus.passing);
            }
            this.state.activeBootSponsor = null;
            alert("Sponsorluk anlaÃ…Å¸manÃ„Â±z kendi aldÃ„Â±Ã„Å¸Ã„Â±nÃ„Â±z kramponu giydiÃ„Å¸iniz iÃƒÂ§in feshedildi! (HaftalÃ„Â±k sponsorluk priminiz durduruldu)");
        }
        
        if (this.state.activePurchasedBoot) {
            const oldBoot = DATABASE.PURCHASABLE_BOOTS.find(b => b.id === this.state.activePurchasedBoot);
            if (oldBoot) {
                this.state.speed = Math.max(30, this.state.speed - oldBoot.bonus.speed);
                this.state.shooting = Math.max(30, this.state.shooting - oldBoot.bonus.shooting);
                this.state.passing = Math.max(30, this.state.passing - oldBoot.bonus.passing);
            }
        }
        
        this.state.money -= boot.cost;
        this.state.activePurchasedBoot = boot.id;
        this.state.weeksSinceLastPurchase = 0;
        
        this.state.speed += boot.bonus.speed;
        this.state.shooting += boot.bonus.shooting;
        this.state.passing += boot.bonus.passing;
        
        this.state.rating = Math.round((this.state.shooting + this.state.passing + this.state.speed) / 3);
        
        this.saveGame();
        this.updateUI();
        alert(`Tebrikler! ${boot.brand} ${boot.model} kramponunu satÃ„Â±n aldÃ„Â±nÃ„Â±z ve giydiniz!\nYetenekleriniz gÃƒÂ¼ncellendi.`);
        return true;
    },

    buyCrypto: function(coinId, moneyAmount) {
        const coin = DATABASE.CRYPTO_ASSETS.find(c => c.id === coinId);
        if (!coin) return false;
        
        if (this.state.money < moneyAmount) {
            alert("Bunun iÃƒÂ§in yeterli bakiyeniz bulunmuyor.");
            return false;
        }
        
        const price = this.state.cryptoPrices[coinId];
        const amount = moneyAmount / price;
        
        this.state.money -= moneyAmount;
        
        if (!this.state.cryptoPortfolio) {
            this.state.cryptoPortfolio = {
                btc: { amount: 0, avgPrice: 52000 },
                eth: { amount: 0, avgPrice: 3200 },
                doge: { amount: 0, avgPrice: 0.15 },
                atl: { amount: 0, avgPrice: 1.0 }
            };
        }
        
        const portfolioEntry = this.state.cryptoPortfolio[coinId] || { amount: 0, avgPrice: 0 };
        const currentAmount = portfolioEntry.amount || 0;
        const currentAvgPrice = portfolioEntry.avgPrice || 0;
        
        const totalAmount = currentAmount + amount;
        const newAvgPrice = totalAmount > 0 ? (((currentAmount * currentAvgPrice) + (amount * price)) / totalAmount) : price;
        
        this.state.cryptoPortfolio[coinId] = {
            amount: totalAmount,
            avgPrice: parseFloat(newAvgPrice.toFixed(4))
        };
        
        this.state.weeksSinceLastPurchase = 0;
        this.saveGame();
        this.updateUI();
        alert(`${moneyAmount.toLocaleString()} Ã¢â€šÂ¬ deÃ„Å¸erinde ${amount.toFixed(4)} adet ${coin.symbol} satÃ„Â±n alÃ„Â±ndÃ„Â±!`);
        return true;
    },

    sellCrypto: function(coinId) {
        const portfolioEntry = this.state.cryptoPortfolio ? this.state.cryptoPortfolio[coinId] : null;
        const amount = portfolioEntry ? (portfolioEntry.amount || 0) : 0;
        if (amount <= 0) {
            alert("PortfÃƒÂ¶yÃƒÂ¼nÃƒÂ¼zde satacak bu coinden bulunmuyor.");
            return false;
        }
        return this.sellCryptoAmount(coinId, amount);
    },

    sellCryptoAmount: function(coinId, amount) {
        const coin = DATABASE.CRYPTO_ASSETS.find(c => c.id === coinId);
        if (!coin) return false;
        
        const portfolioEntry = this.state.cryptoPortfolio ? this.state.cryptoPortfolio[coinId] : null;
        const owned = portfolioEntry ? (portfolioEntry.amount || 0) : 0;
        const avgPrice = portfolioEntry ? (portfolioEntry.avgPrice || 0) : 0;
        
        if (amount <= 0 || amount > owned + 0.0001) {
            alert("PortfÃƒÂ¶yÃƒÂ¼nÃƒÂ¼zde satacak bu miktarda coin bulunmuyor.");
            return false;
        }
        
        const actualAmount = Math.min(amount, owned);
        const price = this.state.cryptoPrices[coinId];
        const revenue = actualAmount * price;
        
        this.state.money += revenue;
        
        const remainingAmount = Math.max(0, owned - actualAmount);
        if (remainingAmount < 0.0001) {
            this.state.cryptoPortfolio[coinId] = { amount: 0, avgPrice: 0 };
        } else {
            this.state.cryptoPortfolio[coinId] = {
                amount: remainingAmount,
                avgPrice: avgPrice
            };
        }
        
        this.saveGame();
        this.updateUI();
        alert(`${actualAmount.toFixed(4)} adet ${coin.symbol} satÃ„Â±larak ${Math.round(revenue).toLocaleString()} Ã¢â€šÂ¬ nakit elde edildi!`);
        return true;
    },



    buyInvestment: function(itemId) {
        const inv = DATABASE.HOMETOWN_INVESTMENTS.find(i => i.id === itemId);
        if (!inv) return false;
        
        if (!this.state.ownedInvestments) this.state.ownedInvestments = [];
        if (this.state.ownedInvestments.includes(itemId)) {
            alert("Bu yatÃ„Â±rÃ„Â±mÃ„Â± zaten gerÃƒÂ§ekleÃ…Å¸tirdiniz.");
            return false;
        }
        
        if (this.state.money < inv.cost) {
            alert("Bu yatÃ„Â±rÃ„Â±mÃ„Â± gerÃƒÂ§ekleÃ…Å¸tirmek iÃƒÂ§in bÃƒÂ¼tÃƒÂ§eniz yetersiz.");
            return false;
        }
        
        this.state.money -= inv.cost;
        this.state.ownedInvestments.push(itemId);
        
        // Custom effect for local sponsor
        if (itemId === "local_sponsor") {
            this.state.followers += 15000;
        }
        
        // Trigger localized news post
        const hometown = this.state.hometown || "Sinop";
        const district = this.state.hometownDistrict || "Gerze";
        let newsText = "";
        
        if (itemId === "tea_garden") {
            newsText = `FlaÃ…Å¸ Haber! ${this.state.playerName}, memleketi ${hometown}'a yatÃ„Â±rÃ„Â±m yaptÃ„Â± ve Ã…Å¸irin bir sahil ÃƒÂ§ay bahÃƒÂ§esi aÃƒÂ§tÃ„Â±! Ã¢Ëœâ€¢`;
        } else if (itemId === "orchard") {
            newsText = `GiriÃ…Å¸imci Futbolcu! ${this.state.playerName}, ${hometown} (${district}) sÃ„Â±nÃ„Â±rlarÃ„Â±nda tarÃ„Â±m arazisi satÃ„Â±n alarak tarÃ„Â±ma destek verdi! ÄŸÅ¸Å’Â³`;
        } else if (itemId === "local_sponsor") {
            newsText = `BÃƒÂ¼yÃƒÂ¼k Destek! ${this.state.playerName}, memleketinin kulÃƒÂ¼bÃƒÂ¼ne ana sponsor oldu. Taraftarlar ÃƒÂ§Ã„Â±lgÃ„Â±na dÃƒÂ¶ndÃƒÂ¼! Ã¢Å¡Â½`;
        } else if (itemId === "textile_factory") {
            newsText = `Ã„Â°stihdam Hamlesi! YÃ„Â±ldÃ„Â±z futbolcu ${this.state.playerName}, ${hometown}'da yeni bir fabrika kurarak yÃƒÂ¼zlerce gence ekmek kapÃ„Â±sÃ„Â± saÃ„Å¸ladÃ„Â±! Helal olsun! ÄŸÅ¸ÂÂ­`;
        }
        
        this.addSocialPost("@memleket_havadis", "Memleket Havadis", newsText);
        
        this.state.weeksSinceLastPurchase = 0;
        this.saveGame();
        this.updateUI();
        
        alert(`Tebrikler! ${inv.name} yatÃ„Â±rÃ„Â±mÃ„Â± baÃ…Å¸arÃ„Â±yla yapÃ„Â±ldÃ„Â±. Memlekete hayÃ„Â±rlÃ„Â± olsun!`);
        return true;
    },




    applyTheme: function() {
        const root = document.documentElement;
        let theme = this.state.themeSetting || "auto";
        
        if (theme === "auto") {
            if (this.state.isNationalCallUp) {
                theme = "national";
            } else {
                const club = this.state.currentClub;
                    if (club === "Galatastar") theme = "galatastar";
                    else if (club === "FenerbaÃƒÂ§e FK") theme = "fenerbace";
                    else if (club === "Kartal FK") theme = "kartalfk";
                    else if (club === "Trabzon FK") theme = "trabzonfk";
                else theme = "cyberpunk";
            }
        }
        
        let primary = "#00ff87";
        let secondary = "#00f5ff";
        
        switch (theme) {
            case "galatastar":
                primary = "#ff3333";
                secondary = "#ffc107";
                break;
            case "fenerbace":
                primary = "#ffeb3b";
                secondary = "#0d47a1";
                break;
            case "kartalfk":
                primary = "#ffffff";
                secondary = "#b0bec5";
                break;
            case "trabzonfk":
                primary = "#800020";
                secondary = "#29b6f6";
                break;
            case "national":
                primary = "#ff3333";
                secondary = "#ffffff";
                break;
            case "cyberpunk":
            default:
                primary = "#00ff87";
                secondary = "#00f5ff";
                break;
        }
        
        root.style.setProperty("--primary", primary);
        root.style.setProperty("--secondary", secondary);
    },

    updateUI: function() {
        this.applyTheme();
        const bindings = {
            "player-name": this.state.playerName,
            "player-age": this.state.age,
            "player-rating": this.state.rating,
            "player-position": this.state.position,
            "player-club": this.state.currentClub,
            "player-league": this.state.currentLeague,
            "stat-fitness": this.state.kondisyon + "%",
            "stat-morale": this.state.moral + "%",
            "stat-trust": this.state.hocaGuveni + "%",
            "stat-followers": this.state.followers.toLocaleString(),
            "stat-money": this.state.money.toLocaleString() + " Ã¢â€šÂ¬",
            "skill-shooting": this.state.shooting,
            "skill-passing": this.state.passing,
            "skill-speed": this.state.speed,
            "skill-dribbling": this.state.dribbling || 50,
            "skill-defense": this.state.defense || 50,
            "skill-physical": this.state.physical || 50,
            "career-goals": this.state.careerGoals,
            "career-assists": this.state.careerAssists,
            "career-apps": this.state.careerApps,
            "current-week": this.state.currentWeek,
            "career-rel-trust": (this.state.hocaGuveni || 50) + "%",
            "career-rel-team": (this.state.takimUyumu || 50) + "%",
            "career-rel-fans": (this.state.taraftarSevgisi || 50) + "%",
            "weekly-salary-text": (function(state) {
                let txt = state.weeklySalary + " Ã¢â€šÂ¬/Hafta";
                if (state.activeBootSponsor) {
                    const boot = DATABASE.BOOT_SPONSORS.find(b => b.id === state.activeBootSponsor);
                    if (boot) {
                        txt += ` (+${boot.weeklyPay} Ã¢â€šÂ¬ Sponsor)`;
                    }
                }
                return txt;
            })(this.state),
            "training-count-indicator": (4 - (this.state.weeklyTrainingCount || 0)) + " / 4"
        };

        for (let id in bindings) {
            const el = document.getElementById(id);
            if (el) {
                el.innerText = bindings[id];
            }
            const elements = document.querySelectorAll(".bind-" + id);
            elements.forEach(item => {
                item.innerText = bindings[id];
            });
        }

        const progressFills = {
            "bar-fitness": this.state.kondisyon,
            "bar-morale": this.state.moral,
            "bar-trust": this.state.hocaGuveni,
            "career-bar-trust": this.state.hocaGuveni,
            "career-bar-team": this.state.takimUyumu || 50,
            "career-bar-fans": this.state.taraftarSevgisi || 50
        };

        for (let id in progressFills) {
            const el = document.getElementById(id);
            if (el) {
                el.style.width = progressFills[id] + "%";
            }
            const elements = document.querySelectorAll(".fill-" + id);
            elements.forEach(item => {
                item.style.width = progressFills[id] + "%";
            });
        }

        // Render current league standings in UI if container exists
        if (typeof renderLeagueTable === "function") {
            renderLeagueTable();
        }

        // Render current social feed in UI if container exists
        if (typeof renderSocialFeed === "function") {
            renderSocialFeed();
        }

        // Render HD PNG avatar
        const avatarUrl = this.state.avatarImage || "avatars/avatar_main.png";
        const imgTag = `<img src="${avatarUrl}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;">`;
        const futCardImgTag = `<img src="${avatarUrl}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 6px;">`;

        const avatarContainer = document.getElementById("player-avatar-container");
        if (avatarContainer) {
            avatarContainer.innerHTML = imgTag;
        }
        
        // Clone to FUT card container
        const avatarClone = document.getElementById("fut-card-avatar-container-clone");
        if (avatarClone) {
            avatarClone.innerHTML = futCardImgTag;
            // Also update any other static image in fut card if it exists
            const ecePortrait = document.querySelector(".fut-card img[src='ece_portrait.png']");
            if (ecePortrait) ecePortrait.src = avatarUrl;
        }

        // Render club initials in FUT card
        const initialsBadge = document.getElementById("fut-club-initials");
        if (initialsBadge) {
            let club = this.state.currentClub || "YÃ„Â±ldÃ„Â±z GenÃƒÂ§likspor";
            let words = club.split(" ");
            let initials = "";
            if (words.length >= 2) {
                initials = (words[0][0] + words[1][0]).toUpperCase();
            } else {
                initials = club.substring(0, 2).toUpperCase();
            }
            initialsBadge.innerText = initials;
        }

        // Update betting UI badges if available
        if (typeof updateActiveCouponBadge === "function") {
            updateActiveCouponBadge();
        }
        if (typeof checkWinningBets === "function") {
            checkWinningBets();
        }
        if (typeof updateTrophyShowcase === "function") {
            updateTrophyShowcase();
        }
        if (typeof init3dFutCardEffects === "function") {
            init3dFutCardEffects();
        }
        if (typeof renderEsportsPanel === "function") {
            const container = document.getElementById("shop-esports-container");
            if (container && container.style.display !== "none") {
                renderEsportsPanel();
            }
        }

        // Update Desktop Sidebar Elements
        try {
            // Update Left Sidebar Avatar
            const sidebarAvatar = document.getElementById("sidebar-avatar-container");
            if (sidebarAvatar) {
                const avatarUrl = this.state.avatarImage || "avatars/avatar_main.png";
                sidebarAvatar.innerHTML = `<img src="${avatarUrl}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%; box-shadow: 0 0 10px rgba(0,0,0,0.5);">`;
            }
            
            const sidebarPlayerName = document.getElementById("sidebar-player-name");
            if (sidebarPlayerName) sidebarPlayerName.innerText = this.state.playerName;
            
            // Skill levels in Left Sidebar card
            const attrIds = {
                "sidebar-stat-sho": this.state.shooting || 50,
                "sidebar-stat-pas": this.state.passing || 50,
                "sidebar-stat-spd": this.state.speed || 50,
                "sidebar-stat-dri": this.state.dribbling || 50,
                "sidebar-stat-def": this.state.defense || 50,
                "sidebar-stat-phy": this.state.physical || 50
            };
            for (let sId in attrIds) {
                const el = document.getElementById(sId);
                if (el) el.innerText = attrIds[sId];
            }
            
            // Skill progress bars in Left Sidebar widget
            const barIds = {
                "skill-val-shooting": (this.state.shooting || 50) + "%",
                "skill-val-passing": (this.state.passing || 50) + "%",
                "skill-val-speed": (this.state.speed || 50) + "%"
            };
            for (let bId in barIds) {
                const el = document.getElementById(bId);
                if (el) el.innerText = barIds[bId];
            }
            
            const barFills = {
                "skill-bar-shooting": (this.state.shooting || 50) + "%",
                "skill-bar-passing": (this.state.passing || 50) + "%",
                "skill-bar-speed": (this.state.speed || 50) + "%"
            };
            for (let fId in barFills) {
                const el = document.getElementById(fId);
                if (el) el.style.width = barFills[fId];
            }
            
            // Career stats in Left Sidebar widget
            const stats = {
                "sidebar-career-apps": this.state.careerApps || 0,
                "sidebar-career-goals": this.state.careerGoals || 0,
                "sidebar-career-assists": this.state.careerAssists || 0
            };
            for (let sId in stats) {
                const el = document.getElementById(sId);
                if (el) el.innerText = stats[sId];
            }
            
            // Career value in Left Sidebar widget
            const valEl = document.getElementById("sidebar-career-val");
            if (valEl) {
                let val = DATABASE.calculateValue(this.state.rating, this.state.age);
                valEl.innerText = val.toLocaleString() + " Ã¢â€šÂ¬";
            }
            
            // Update Right Sidebar - Crypto Markets
            if (this.state.cryptoPrices) {
                const btcEl = document.getElementById("sidebar-crypto-btc");
                if (btcEl) btcEl.innerText = this.state.cryptoPrices.btc.toLocaleString() + " Ã¢â€šÂ¬";
                
                const ethEl = document.getElementById("sidebar-crypto-eth");
                if (ethEl) ethEl.innerText = this.state.cryptoPrices.eth.toLocaleString() + " Ã¢â€šÂ¬";
                
                const dogeEl = document.getElementById("sidebar-crypto-doge");
                if (dogeEl) dogeEl.innerText = this.state.cryptoPrices.doge.toFixed(4) + " Ã¢â€šÂ¬";
                
                const atlEl = document.getElementById("sidebar-crypto-atl");
                if (atlEl) atlEl.innerText = this.state.cryptoPrices.atl.toFixed(4) + " Ã¢â€šÂ¬";
            }
            
            // Update Right Sidebar - Social Feed Widget
            const sidebarSocial = document.getElementById("sidebar-social-container");
            if (sidebarSocial && this.state.socialFeed && this.state.socialFeed.length > 0) {
                sidebarSocial.innerHTML = "";
                // Render top 3 social posts
                this.state.socialFeed.slice(0, 3).forEach(post => {
                    sidebarSocial.innerHTML += `
                        <div class="sidebar-post">
                            <div class="sidebar-post-header">
                                <span>${post.handle}</span>
                                <span style="color: var(--text-muted); font-size: 8px;">${post.time}</span>
                            </div>
                            <div style="color: #eee;">${post.text}</div>
                        </div>
                    `;
                });
            }
        } catch(err) {
            console.warn("Sidebar UI sync error:", err);
        }
    },

    addSocialPost: function(handle, name, text) {
        if (!this.state.socialFeed) {
            this.state.socialFeed = [];
        }
        this.state.socialFeed.unshift({
            handle: handle,
            name: name,
            text: text,
            time: "Yeni"
        });
        if (this.state.socialFeed.length > 10) {
            this.state.socialFeed.pop();
        }
        this.saveGame();
    },

    updateTeammateName: function() {
        const curLeague = this.state.currentLeague || "SÃƒÂ¼per Lig";
        let pool = ["Ali", "Semih", "Kerem", "BarÃ„Â±Ã…Å¸", "Ã„Â°rfan", "Cenk", "Yusuf", "Umut", "Arda"];

        if (curLeague === "Premier League") {
            pool = ["Kusskaa", "Jack", "Harry", "Oliver", "Connor", "Mason", "Jude", "Declan"];
        } else if (curLeague === "La Liga") {
            pool = ["Carlos", "Diego", "Lamine", "Gavi", "Pedri", "Hugo", "Alvaro", "Nico"];
        } else if (curLeague === "Serie A") {
            pool = ["Giovanni", "Matteo", "Federico", "Lorenzo", "Nicolo", "Davide", "Marco"];
        } else if (curLeague === "Bundesliga") {
            pool = ["Thomas", "Lukas", "Bastian", "Max", "Leon", "Florian", "Joshua", "Kai"];
        } else if (curLeague === "Ligue 1") {
            pool = ["Antoine", "Lucas", "Pierre", "Enzo", "Kylian", "Theo", "Hugo", "Olivier"];
        }

        const name = pool[Math.floor(Math.random() * pool.length)];
        this.state.currentTeammateName = name;
        this.saveGame();
    },

    handleSeasonEnd: function() {
        this.state.age++;
        
        let ageDeclineMsg = "";
        const age = this.state.age;
        if (age >= 33) {
            let speedDecline = 0;
            let shootDecline = 0;
            let passDecline = 0;
            
            if (age === 33 || age === 34) {
                speedDecline = 2;
                ageDeclineMsg = `Ã¢Å¡Â Ã¯Â¸Â <strong>YaÃ…Å¸lanma Etkisi (YaÃ…Å¸ ${age}):</strong> YaÃ…Å¸Ã„Â±nÃ„Â±z ilerledikÃƒÂ§e hÃ„Â±zÃ„Â±nÃ„Â±z ve fiziksel kapasiteniz yavaÃ…Å¸ yavaÃ…Å¸ azalÃ„Â±yor. (<span style="color: var(--accent-red); font-weight: bold;">-2 HÃ„Â±z</span>)<br><br>`;
            } else if (age === 35 || age === 36) {
                speedDecline = 3;
                shootDecline = 2;
                ageDeclineMsg = `Ã¢Å¡Â Ã¯Â¸Â <strong>YaÃ…Å¸lanma Etkisi (YaÃ…Å¸ ${age}):</strong> KaslarÃ„Â±nÃ„Â±z eski gÃƒÂ¼cÃƒÂ¼nÃƒÂ¼ kaybediyor. HÃ„Â±zÃ„Â±nÃ„Â±z ve Ã…Å¸ut gÃƒÂ¼cÃƒÂ¼nÃƒÂ¼z dÃƒÂ¼Ã…Å¸meye baÃ…Å¸ladÃ„Â±. (<span style="color: var(--accent-red); font-weight: bold;">-3 HÃ„Â±z, -2 Ã…Âut</span>)<br><br>`;
            } else if (age >= 37) {
                speedDecline = 4;
                shootDecline = 3;
                passDecline = 2;
                ageDeclineMsg = `Ã¢Å¡Â Ã¯Â¸Â <strong>YaÃ…Å¸lanma Etkisi (YaÃ…Å¸ ${age}):</strong> VÃƒÂ¼cudunuz artÃ„Â±k elit seviyedeki temponuza ayak uyduramÃ„Â±yor. Fiziksel yeteneklerinizde ciddi kayÃ„Â±plar var. (<span style="color: var(--accent-red); font-weight: bold;">-4 HÃ„Â±z, -3 Ã…Âut, -2 Pas</span>)<br><br>`;
            }
            
            this.state.speed = Math.max(30, this.state.speed - speedDecline);
            this.state.shooting = Math.max(30, this.state.shooting - shootDecline);
            this.state.passing = Math.max(30, this.state.passing - passDecline);
            this.state.rating = Math.round((this.state.shooting + this.state.passing + this.state.speed) / 3);
        }

        let rank = 12;
        if (this.state.leagueTable && this.state.leagueTable.length > 0) {
            rank = this.state.leagueTable.findIndex(t => t.name === this.state.currentClub) + 1;
        }

        let title = "Sezon Sonu Ãƒâ€“zeti";
        let message = `Sezon Sona Erdi! TakÃ„Â±mÃ„Â±n <strong>${this.state.currentClub}</strong>, ligi <strong>${rank}. sÃ„Â±rada</strong> tamamladÃ„Â±.<br><br>`;
        if (ageDeclineMsg) {
            message += ageDeclineMsg;
        }
        
        let bonus = 0;
        let followerGain = 0;
        let promotionMsg = "";
        let relegationMsg = "";

        const curLeague = this.state.currentLeague;
        
        if (curLeague === "3. Lig") {
            if (rank === 1) {
                if (!this.state.trophies) this.state.trophies = [];
                const year = 2026 + (this.state.age - 17);
                this.state.trophies.push({ id: "3_lig", name: `TFF 3. Lig Ã…ÂampiyonluÃ„Å¸u (${year})`, icon: "ÄŸÅ¸Ââ€ " });
            }
            if (rank <= 3) {
                // Promotion to 2. Lig
                this.state.currentLeague = "2. Lig";
                this.state.weeklySalary = Math.round(this.state.weeklySalary * 1.35); // 35% zam
                bonus += 15000;
                followerGain += 8000;
                promotionMsg = `ÄŸÅ¸Ââ€° <strong>KÃƒÅ“ME YÃƒÅ“KSELDÃ„Â°NÃ„Â°Z!</strong> TakÃ„Â±mÃ„Â±nÃ„Â±z ilk 3'te yer alarak <strong>2. Lig</strong>'e yÃƒÂ¼kseldi! HaftalÃ„Â±k maaÃ…Å¸Ã„Â±nÃ„Â±z %35 artÃ„Â±rÃ„Â±ldÃ„Â± ve 15,000 Ã¢â€šÂ¬ yÃƒÂ¼kselme ÃƒÂ¶dÃƒÂ¼lÃƒÂ¼ aldÃ„Â±nÃ„Â±z!`;
                if (rank === 1) {
                    promotionMsg = `ÄŸÅ¸Ââ€  <strong>TFF 3. LÃ„Â°G Ã…ÂAMPÃ„Â°YONLUÃ„ÂU!</strong> Ligi zirvede tamamlayÃ„Â±p Ã…Å¸ampiyon olarak <strong>2. Lig</strong>'e yÃƒÂ¼kseldiniz! 15,000 Ã¢â€šÂ¬ Ã…Å¸ampiyonluk ÃƒÂ¶dÃƒÂ¼lÃƒÂ¼ aldÃ„Â±nÃ„Â±z!`;
                }
            } else if (rank >= 14) {
                // Relegation to AmatÃƒÂ¶r
                relegationMsg = `Ã¢Å¡Â Ã¯Â¸Â <strong>KÃƒÅ“ME DÃƒÅ“Ã…ÂTÃƒÅ“NÃƒÅ“Z!</strong> TakÃ„Â±mÃ„Â±nÃ„Â±z son 3'te kalarak AmatÃƒÂ¶r Lig'e dÃƒÂ¼Ã…Å¸tÃƒÂ¼. KulÃƒÂ¼p sizinle olan sÃƒÂ¶zleÃ…Å¸mesini feshetti! BaÃ…Å¸ka bir 3. Lig kulÃƒÂ¼bÃƒÂ¼nde sÃ„Â±fÃ„Â±rdan baÃ…Å¸lamak zorundasÃ„Â±nÃ„Â±z. (-5 Yetenek, -15 Hoca GÃƒÂ¼veni)`;
                // Reset to a new random 3. Lig club
                const nextLeagues = DATABASE.LEAGUES["3. Lig"].teams;
                let newClub = nextLeagues[Math.floor(Math.random() * nextLeagues.length)].name;
                this.state.currentClub = newClub;
                this.state.rating = Math.max(35, this.state.rating - 5);
                this.state.shooting = Math.max(35, this.state.shooting - 5);
                this.state.passing = Math.max(35, this.state.passing - 5);
                this.state.speed = Math.max(35, this.state.speed - 5);
                this.state.hocaGuveni = 40;
                this.state.followers = Math.max(500, Math.round(this.state.followers * 0.7));
            }
        } else if (curLeague === "2. Lig") {
            if (rank === 1) {
                if (!this.state.trophies) this.state.trophies = [];
                const year = 2026 + (this.state.age - 17);
                this.state.trophies.push({ id: "2_lig", name: `TFF 2. Lig Ã…ÂampiyonluÃ„Å¸u (${year})`, icon: "ÄŸÅ¸Ââ€ " });
            }
            if (rank <= 3) {
                // Promotion to 1. Lig
                this.state.currentLeague = "1. Lig";
                this.state.weeklySalary = Math.round(this.state.weeklySalary * 1.4); // 40% zam
                bonus += 30000;
                followerGain += 15000;
                promotionMsg = `ÄŸÅ¸Ââ€° <strong>KÃƒÅ“ME YÃƒÅ“KSELDÃ„Â°NÃ„Â°Z!</strong> TakÃ„Â±mÃ„Â±nÃ„Â±z ÃƒÂ¼stÃƒÂ¼n baÃ…Å¸arÃ„Â± gÃƒÂ¶stererek <strong>1. Lig</strong>'e yÃƒÂ¼kseldi! HaftalÃ„Â±k maaÃ…Å¸Ã„Â±nÃ„Â±z %40 artÃ„Â±rÃ„Â±ldÃ„Â± ve 30,000 Ã¢â€šÂ¬ yÃƒÂ¼kselme ÃƒÂ¶dÃƒÂ¼lÃƒÂ¼ aldÃ„Â±nÃ„Â±z!`;
                if (rank === 1) {
                    promotionMsg = `ÄŸÅ¸Ââ€  <strong>TFF 2. LÃ„Â°G Ã…ÂAMPÃ„Â°YONLUÃ„ÂU!</strong> Ligi zirvede tamamlayÃ„Â±p Ã…Å¸ampiyon olarak <strong>1. Lig</strong>'e yÃƒÂ¼kseldiniz! 30,000 Ã¢â€šÂ¬ Ã…Å¸ampiyonluk ÃƒÂ¶dÃƒÂ¼lÃƒÂ¼ aldÃ„Â±nÃ„Â±z!`;
                }
            } else if (rank >= 12) {
                // Relegation to 3. Lig
                this.state.currentLeague = "3. Lig";
                this.state.weeklySalary = Math.round(this.state.weeklySalary * 0.75); // %25 indirim
                relegationMsg = `ÄŸÅ¸â€œâ€° <strong>KÃƒÅ“ME DÃƒÅ“Ã…ÂTÃƒÅ“NÃƒÅ“Z!</strong> TakÃ„Â±mÃ„Â±nÃ„Â±z ligi son 3 sÃ„Â±rada tamamladÃ„Â± ve <strong>3. Lig</strong>'e dÃƒÂ¼Ã…Å¸tÃƒÂ¼. MaaÃ…Å¸Ã„Â±nÃ„Â±z %25 dÃƒÂ¼Ã…Å¸ÃƒÂ¼rÃƒÂ¼ldÃƒÂ¼ ve taraftar desteÃ„Å¸i azaldÃ„Â±.`;
            }
        } else if (curLeague === "1. Lig") {
            if (rank === 1) {
                if (!this.state.trophies) this.state.trophies = [];
                const year = 2026 + (this.state.age - 17);
                this.state.trophies.push({ id: "1_lig", name: `TFF 1. Lig Ã…ÂampiyonluÃ„Å¸u (${year})`, icon: "ÄŸÅ¸Ââ€ " });
            }
            if (rank <= 3) {
                // Promotion to SÃƒÂ¼per Lig
                this.state.currentLeague = "SÃƒÂ¼per Lig";
                this.state.weeklySalary = Math.round(this.state.weeklySalary * 1.5); // 50% zam
                bonus += 50000;
                followerGain += 30000;
                promotionMsg = `ÄŸÅ¸â€Â¥ <strong>SÃƒÅ“PER LÃ„Â°G'E YÃƒÅ“KSELDÃ„Â°NÃ„Â°Z!</strong> TakÃ„Â±mÃ„Â±nÃ„Â±z devlerin arasÃ„Â±na, <strong>SÃƒÂ¼per Lig</strong>'e yÃƒÂ¼kseldi! HaftalÃ„Â±k maaÃ…Å¸Ã„Â±nÃ„Â±z %50 artÃ„Â±rÃ„Â±ldÃ„Â± ve 50,000 Ã¢â€šÂ¬ yÃƒÂ¼kselme ÃƒÂ¶dÃƒÂ¼lÃƒÂ¼ kazandÃ„Â±nÃ„Â±z!`;
                if (rank === 1) {
                    promotionMsg = `ÄŸÅ¸Ââ€  <strong>TFF 1. LÃ„Â°G Ã…ÂAMPÃ„Â°YONLUÃ„ÂU!</strong> Ligi zirvede tamamlayÃ„Â±p Ã…Å¸ampiyon olarak <strong>SÃƒÂ¼per Lig</strong>'e yÃƒÂ¼kseldiniz! 50,000 Ã¢â€šÂ¬ Ã…Å¸ampiyonluk ÃƒÂ¶dÃƒÂ¼lÃƒÂ¼ kazandÃ„Â±nÃ„Â±z!`;
                }
            } else if (rank >= 14) {
                // Relegation to 2. Lig
                this.state.currentLeague = "2. Lig";
                this.state.weeklySalary = Math.round(this.state.weeklySalary * 0.75); // 25% indirim
                relegationMsg = `ÄŸÅ¸â€œâ€° <strong>KÃƒÅ“ME DÃƒÅ“Ã…ÂTÃƒÅ“NÃƒÅ“Z!</strong> TakÃ„Â±mÃ„Â±nÃ„Â±z ligi son 3 sÃ„Â±rada tamamladÃ„Â± ve <strong>2. Lig</strong>'e dÃƒÂ¼Ã…Å¸tÃƒÂ¼. MaaÃ…Å¸Ã„Â±nÃ„Â±z %25 azaltÃ„Â±ldÃ„Â±.`;
            }
        } else if (curLeague === "SÃƒÂ¼per Lig") {
            if (rank === 1) {
                bonus += 100000;
                followerGain += 50000;
                promotionMsg = `ÄŸÅ¸Ââ€  <strong>SÃƒÅ“PER LÃ„Â°G Ã…ÂAMPÃ„Â°YONLUÃ„ÂU!</strong> Ligi zirvede tamamlayarak TÃƒÂ¼rkiye'nin en bÃƒÂ¼yÃƒÂ¼Ã„Å¸ÃƒÂ¼ oldunuz! 100,000 Ã¢â€šÂ¬ Ã…Å¸ampiyonluk primi kazandÃ„Â±nÃ„Â±z!`;
                this.addSocialPost("@tff_resmi", "TÃƒÂ¼rkiye Futbol Federasyonu", `Tebrikler Ã…Âampiyon! SÃƒÂ¼per Lig 1.si olan ${this.state.currentClub} kulÃƒÂ¼bÃƒÂ¼nÃƒÂ¼ ve sezonun yÃ„Â±ldÃ„Â±zÃ„Â± ${this.state.playerName}'yi kutlarÃ„Â±z! ÄŸÅ¸Ââ€ ÄŸÅ¸â€˜â€˜`);
                
                this.state.qualifiedForEurope = "ChampionsLeague";
                this.state.europeanCupStage = 1;
                this.state.wonLeagueLastSeason = true;
                
                if (!this.state.trophies) this.state.trophies = [];
                const year = 2026 + (this.state.age - 17);
                this.state.trophies.push({ id: "super_lig", name: `SÃƒÂ¼per Lig Ã…ÂampiyonluÃ„Å¸u (${year})`, icon: "ÄŸÅ¸Ââ€ " });
            } else if (rank === 2) {
                this.state.qualifiedForEurope = "ChampionsLeague";
                this.state.europeanCupStage = 1;
                this.state.wonLeagueLastSeason = false;
                promotionMsg = `ÄŸÅ¸Â¥Ë† Ligi 2. sÃ„Â±rada tamamlayarak gelecek sezon <strong>Ã…Âampiyonlar Ligi</strong>'ne katÃ„Â±lmaya hak kazandÃ„Â±nÃ„Â±z!`;
            } else if (rank === 3 || rank === 4) {
                this.state.qualifiedForEurope = "EuropaLeague";
                this.state.europeanCupStage = 1;
                this.state.wonLeagueLastSeason = false;
                promotionMsg = `ÄŸÅ¸Â¥â€° Ligi ${rank}. sÃ„Â±rada tamamlayarak gelecek sezon <strong>Avrupa Ligi</strong>'ne katÃ„Â±lmaya hak kazandÃ„Â±nÃ„Â±z!`;
            } else if (rank >= 15) {
                this.state.currentLeague = "1. Lig";
                this.state.weeklySalary = Math.round(this.state.weeklySalary * 0.75); // 25% indirim
                relegationMsg = `ÄŸÅ¸â€œâ€° <strong>KÃƒÅ“ME DÃƒÅ“Ã…ÂTÃƒÅ“NÃƒÅ“Z!</strong> Devler ligine tutunamadÃ„Â±nÃ„Â±z ve <strong>1. Lig</strong>'e dÃƒÂ¼Ã…Å¸tÃƒÂ¼nÃƒÂ¼z. MaaÃ…Å¸Ã„Â±nÃ„Â±z %25 azaltÃ„Â±ldÃ„Â±.`;
                this.state.qualifiedForEurope = null;
                this.state.europeanCupStage = 0;
                this.state.wonLeagueLastSeason = false;
            } else {
                this.state.qualifiedForEurope = null;
                this.state.europeanCupStage = 0;
                this.state.wonLeagueLastSeason = false;
            }
        } else {
            // Lower leagues cannot qualify for Europe
            this.state.qualifiedForEurope = null;
            this.state.europeanCupStage = 0;
            this.state.wonLeagueLastSeason = false;
        }

        // Ballon d'Or Check
        let wonBallonOr = false;
        if (this.state.rating >= 80 && (this.state.seasonGoals + this.state.seasonAssists) >= 15 && Math.random() < 0.6) {
            wonBallonOr = true;
            if (!this.state.trophies) this.state.trophies = [];
            const year = 2026 + (this.state.age - 17);
        this.state.trophies.push({ id: "ballon_or", name: `Ballon d'Or (AltÃ„Â±n Top) (${year})`, icon: "ÄŸÅ¸â€˜â€˜" });
            this.state.followers += 75000;
            this.state.money += 50000;
            message += `ÄŸÅ¸â€˜â€˜ <strong>BALLON D'OR KAZANDINIZ!</strong> YÃ„Â±lÃ„Â±n en iyi futbolcusu seÃƒÂ§ilerek <strong>AltÃ„Â±n Top (Ballon d'Or)</strong> ÃƒÂ¶dÃƒÂ¼lÃƒÂ¼nÃƒÂ¼ kazandÃ„Â±nÃ„Â±z! Medya ÃƒÂ§Ã„Â±ldÃ„Â±rÃ„Â±yor! (+75,000 TakipÃƒÂ§i, +50,000 Ã¢â€šÂ¬)<br><br>`;
            this.addSocialPost("@ballondor_news", "Ballon d'Or France Football", `WINNER: ${this.state.playerName.toUpperCase()}! The young Turkish sensation has officially claimed the prestigious Ballon d'Or trophy! Absolute masterclass! ÄŸÅ¸â€˜â€˜Ã¢Å¡Â½ÄŸÅ¸â€¡Â«ÄŸÅ¸â€¡Â·`);
            this.state.triggerBallonOrNewspaper = true;
        }

        this.state.money += bonus;
        this.state.followers += followerGain;
        this.state.hocaGuveni = Math.min(100, this.state.hocaGuveni + 15);
        this.state.moral = 100;

        if (promotionMsg) {
            message += promotionMsg + "<br><br>";
        } else if (relegationMsg) {
            message += relegationMsg + "<br><br>";
        }

        // Reset season stats
        this.state.seasonGoals = 0;
        this.state.seasonAssists = 0;
        this.state.currentWeek = 1;
        
        // Reset league table
        this.initLeagueTable();
        this.state.nextOpponentName = null; 
        
        this.saveGame();
        this.updateUI();

        if (window.showSeasonSummaryModal) {
            window.showSeasonSummaryModal(title, message);
        } else {
            alert(`Sezon sona erdi! YaÃ…Å¸Ã„Â±n ${this.state.age} oldu. Ligi ${rank}. sÃ„Â±rada tamamladÃ„Â±n.`);
        }
    },

    generateAvatar: function(age) { const avatarUrl = this.state.avatarImage || "avatars/avatar_main.png"; return `<img src="${avatarUrl}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;">`; },

    // --- LEAGUE STANDINGS SIMULATION METHODS ---
    initLeagueTable: function() {
        let league = DATABASE.LEAGUES[this.state.currentLeague];
        if (!league) return;

        let teamNames = [];
        
        // Add current club first
        teamNames.push(this.state.currentClub);

        // Add other teams in the league
        league.teams.forEach(t => {
            if (t.name !== this.state.currentClub && !teamNames.includes(t.name)) {
                teamNames.push(t.name);
            }
        });

        this.state.leagueTable = teamNames.map(name => {
            return {
                name: name,
                played: 0,
                won: 0,
                drawn: 0,
                lost: 0,
                gf: 0,
                ga: 0,
                points: 0
            };
        });

        // Reset other leagues if season resets
        if (this.state.currentWeek === 1 && this.state.otherLeaguesTables) {
            for (let lg in this.state.otherLeaguesTables) {
                this.state.otherLeaguesTables[lg].forEach(t => {
                    t.played = 0; t.won = 0; t.drawn = 0; t.lost = 0;
                    t.gf = 0; t.ga = 0; t.points = 0;
                });
            }
        }

        // Eger sezon ortasindaysak (hafta > 1), yeni ligdeki diger takimlarin maclarini gercekci simule et ki sÃ„Â±fÃ„Â±rlanma hissi olmasÃ„Â±n!
        if (this.state.currentWeek > 1) {
            const weeksPlayed = Math.min(this.state.currentWeek - 1, 33);
            this.state.leagueTable.forEach(team => {
                for (let w = 0; w < weeksPlayed; w++) {
                    team.played++;
                    const goalsScored = Math.floor(Math.random() * 3);
                    const goalsConceded = Math.floor(Math.random() * 3);
                    team.gf += goalsScored;
                    team.ga += goalsConceded;
                    if (goalsScored > goalsConceded) {
                        team.won++;
                        team.points += 3;
                    } else if (goalsScored < goalsConceded) {
                        team.lost++;
                    } else {
                        team.drawn++;
                        team.points += 1;
                    }
                }
            });
        }
        this.generateSeasonFixtures();
    },

    initOtherLeaguesTables: function() {
        if (!this.state.otherLeaguesTables) {
            this.state.otherLeaguesTables = {};
        }
        for (let leagueName in DATABASE.LEAGUES) {
            if (leagueName === this.state.currentLeague) continue;
            
            if (!this.state.otherLeaguesTables[leagueName] || this.state.otherLeaguesTables[leagueName].length === 0) {
                let league = DATABASE.LEAGUES[leagueName];
                this.state.otherLeaguesTables[leagueName] = league.teams.map(t => {
                    return {
                        name: t.name,
                        played: 0,
                        won: 0,
                        drawn: 0,
                        lost: 0,
                        gf: 0,
                        ga: 0,
                        points: 0
                    };
                });
                
                if (this.state.currentWeek > 1) {
                    const weeksPlayed = Math.min(this.state.currentWeek - 1, 33);
                    let table = this.state.otherLeaguesTables[leagueName];
                    table.forEach(team => {
                        let dbTeam = league.teams.find(x => x.name === team.name);
                        let rating = dbTeam ? (dbTeam.att + dbTeam.mid + dbTeam.def) / 3 : 50;
                        
                        for (let w = 0; w < weeksPlayed; w++) {
                            team.played++;
                            let goalsScored = Math.round(Math.max(0, (rating / 30) + (Math.random() - 0.5) * 2));
                            let goalsConceded = Math.round(Math.max(0, 1.5 + (Math.random() - 0.5) * 2));
                            
                            team.gf += goalsScored;
                            team.ga += goalsConceded;
                            if (goalsScored > goalsConceded) {
                                team.won++;
                                team.points += 3;
                            } else if (goalsScored < goalsConceded) {
                                team.lost++;
                            } else {
                                team.drawn++;
                                team.points += 1;
                            }
                        }
                    });
                    
                    table.sort((a, b) => b.points - a.points || (b.gf - b.ga) - (a.gf - a.ga) || b.gf - a.gf);
                }
            }
        }
    },

    simulateOtherLeaguesWeek: function() {
        this.initOtherLeaguesTables();
        
        for (let leagueName in this.state.otherLeaguesTables) {
            let table = this.state.otherLeaguesTables[leagueName];
            
            let shuffled = [...table];
            for (let i = shuffled.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
            }
            
            for (let i = 0; i < shuffled.length; i += 2) {
                if (i + 1 >= shuffled.length) break;
                
                let teamA = shuffled[i];
                let teamB = shuffled[i + 1];
                
                let dbA = DATABASE.LEAGUES[leagueName].teams.find(x => x.name === teamA.name);
                let dbB = DATABASE.LEAGUES[leagueName].teams.find(x => x.name === teamB.name);
                
                let attA = dbA ? dbA.att : 50;
                let defA = dbA ? dbA.def : 50;
                let attB = dbB ? dbB.att : 50;
                let defB = dbB ? dbB.def : 50;
                
                let lambdaA = Math.max(0.5, (attA - defB) * 0.05 + 1.5);
                let lambdaB = Math.max(0.5, (attB - defA) * 0.05 + 1.5);
                
                let goalsA = Math.round(Math.max(0, lambdaA + (Math.random() - 0.5) * 2));
                let goalsB = Math.round(Math.max(0, lambdaB + (Math.random() - 0.5) * 2));
                
                teamA.played++;
                teamB.played++;
                teamA.gf += goalsA; teamA.ga += goalsB;
                teamB.gf += goalsB; teamB.ga += goalsA;
                
                if (goalsA > goalsB) {
                    teamA.won++; teamA.points += 3;
                    teamB.lost++;
                } else if (goalsA < goalsB) {
                    teamB.won++; teamB.points += 3;
                    teamA.lost++;
                } else {
                    teamA.drawn++; teamB.drawn++;
                    teamA.points++; teamB.points++;
                }
            }
            
            table.sort((a, b) => b.points - a.points || (b.gf - b.ga) - (a.gf - a.ga) || b.gf - a.gf);
        }
    },


    simulateEsportsMatch: function() {
        if (!this.state.esportsTeam) return;
        const team = this.state.esportsTeam;

        // Initialize tournament state if not present
        if (!team.tournament) {
            team.tournament = {
                name: "TÃƒÂ¼rkiye E-Spor Ligi",
                stage: 1, // 1 to 10
                wins: 0,
                losses: 0,
                draws: 0
            };
        }

        const t = team.tournament;
        
        let winProb = 0.40;
        let drawProb = 0.15;
        let upkeep = 1000;
        let revenue = 0;
        
        if (team.rosterTier === "pro") {
            winProb = 0.65;
            drawProb = 0.10;
            upkeep = 5000;
            revenue = 8000;
        } else if (team.rosterTier === "legendary") {
            winProb = 0.85;
            drawProb = 0.05;
            upkeep = 15000;
            revenue = 28000;
        }
        
        const netProfit = revenue - upkeep;
        this.state.money = Math.max(0, this.state.money + netProfit);

        // Select opponent based on tournament
        let opponents = [];
        if (t.name === "TÃƒÂ¼rkiye E-Spor Ligi") {
            opponents = ["FenerbahÃƒÂ§e Esports", "Galatasaray Esports", "BeÃ…Å¸iktaÃ…Å¸ Esports", "BBL Esports", "FUT Esports", "Papara SuperMassive", "Fire Flux Esports", "Eternal Fire", "Dark Passage", "IW Wildcats"];
        } else if (t.name === "EMEA Pro Championship") {
            opponents = ["Fnatic", "G2 Esports", "Natus Navis (NaVi)", "Team Vitality", "Karmine Corp", "Team Liquid", "Team Heretics", "KOI Esports", "FUT Esports", "BBL Esports"];
        } else { // DÃƒÂ¼nya Ã…ÂampiyonasÃ„Â±
            opponents = ["T1 (Kore)", "Sentinels (ABD)", "Gen.G (Kore)", "EDward Gaming (Ãƒâ€¡in)", "Paper Rex (Singapur)", "LeviatÃƒÂ¡n (Amerika)", "Fnatic (Avrupa)", "G2 Esports (Avrupa)", "LOUD (Brezilya)", "NRG (ABD)"];
        }
        
        const opp = opponents[Math.floor(Math.random() * opponents.length)];

        // Simulate match
        const rand = Math.random();
        let result = "draw";
        let score = "1-1";
        
        if (rand < winProb) {
            result = "win";
            team.stats.wins++;
            t.wins++;
            const followersGained = Math.floor(Math.random() * 1200) + 400;
            team.followers = (team.followers || 0) + followersGained;
            const scoreChoices = ["2-1", "3-0", "1-0", "3-2"];
            score = scoreChoices[Math.floor(Math.random() * scoreChoices.length)];
        } else if (rand < winProb + drawProb) {
            result = "draw";
            team.stats.draws++;
            t.draws++;
            score = "1-1";
        } else {
            result = "loss";
            team.stats.losses++;
            t.losses++;
            const scoreChoices = ["0-2", "1-3", "0-1", "1-2"];
            score = scoreChoices[Math.floor(Math.random() * scoreChoices.length)];
        }

        // Post regular match result
        let postMsg = `ÄŸÅ¸ÂÂ® ${t.name} (Hafta ${t.stage}/10): ${team.name}, rakibi ${opp} karÃ…Å¸Ã„Â±sÃ„Â±nda ${result === "win" ? "muazzam bir galibiyet alarak " + score + " kazandÃ„Â±!" : (result === "draw" ? "dengeli bir oyunla " + score + " berabere kaldÃ„Â±." : "Ã…Å¸anssÃ„Â±z bir " + score + " maÃ„Å¸lubiyet aldÃ„Â±.")}`;
        this.addSocialPost("@atlas_esports", team.name, postMsg);

        // Check if tournament is finished (10 weeks)
        if (t.stage >= 10) {
            const points = t.wins * 3 + t.draws * 1;
            let neededPoints = 22; // For local league
            let prizeMoney = 0;
            let wonTrophy = false;
            let oldName = t.name;

            if (t.name === "TÃƒÂ¼rkiye E-Spor Ligi") {
                neededPoints = 22;
                if (points >= neededPoints) {
                    prizeMoney = 150000;
                    wonTrophy = true;
                    team.stats.trophies = (team.stats.trophies || 0) + 1;
                    team.followers = (team.followers || 0) + 15000;
                    t.name = "EMEA Pro Championship";
                }
            } else if (t.name === "EMEA Pro Championship") {
                neededPoints = 24;
                if (points >= neededPoints) {
                    prizeMoney = 500000;
                    wonTrophy = true;
                    team.stats.trophies = (team.stats.trophies || 0) + 1;
                    team.followers = (team.followers || 0) + 50000;
                    t.name = "DÃƒÂ¼nya Ã…ÂampiyonasÃ„Â±";
                }
            } else { // DÃƒÂ¼nya Ã…ÂampiyonasÃ„Â±
                neededPoints = 26;
                if (points >= neededPoints) {
                    prizeMoney = 1500000;
                    wonTrophy = true;
                    team.stats.trophies = (team.stats.trophies || 0) + 1;
                    team.followers = (team.followers || 0) + 120000;
                }
            }

            if (wonTrophy) {
                this.state.money += prizeMoney;
                
                if (!this.state.trophies) this.state.trophies = [];
                this.state.trophies.push(`ÄŸÅ¸ÂÂ® ${oldName} Ã…Âampiyonu (${team.name})`);

                const winPost = `ÄŸÅ¸Ââ€  Ã…ÂAMPÃ„Â°YON! E-Spor kulÃƒÂ¼bÃƒÂ¼mÃƒÂ¼z ${team.name}, ${oldName} turnuvasÃ„Â±nÃ„Â± zirvede bitirerek Ã…Å¸ampiyon oldu! HesabÃ„Â±mÃ„Â±za ${prizeMoney.toLocaleString()} Ã¢â€šÂ¬ ÃƒÂ¶dÃƒÂ¼l yatÃ„Â±rÃ„Â±ldÃ„Â±! ÄŸÅ¸ÂÂ®ÄŸÅ¸â€Â¥`;
                this.addSocialPost("@spor_manset", "Son Dakika", winPost);
                
                alert(`ÄŸÅ¸Ââ€  TEBRÃ„Â°KLER! E-Spor kulÃƒÂ¼bÃƒÂ¼nÃƒÂ¼z ${team.name}, ${oldName} turnuvasÃ„Â±nda Ã…ÂAMPÃ„Â°YON oldu!\nÄŸÅ¸â€™Â° Ãƒâ€“dÃƒÂ¼l: ${prizeMoney.toLocaleString()} Ã¢â€šÂ¬ hesabÃ„Â±nÃ„Â±za yatÃ„Â±rÃ„Â±ldÃ„Â±.\n${t.name !== oldName ? "ÄŸÅ¸Å¡â‚¬ Bir ÃƒÂ¼st lig olan " + t.name + " turnuvasÃ„Â±na yÃƒÂ¼kseldiniz!" : ""}`);
            } else {
                let consolidationPrize = 20000;
                if (oldName === "EMEA Pro Championship") consolidationPrize = 50000;
                else if (oldName === "DÃƒÂ¼nya Ã…ÂampiyonasÃ„Â±") consolidationPrize = 100000;

                this.state.money += consolidationPrize;
                const failPost = `ÄŸÅ¸â€œÂ¢ E-Spor Raporu: ${team.name}, ${oldName} turnuvasÃ„Â±nÃ„Â± ${points} puanla tamamladÃ„Â±. Ã…Âampiyon olamasak da ${consolidationPrize.toLocaleString()} Ã¢â€šÂ¬ katÃ„Â±lÃ„Â±m ÃƒÂ¶dÃƒÂ¼lÃƒÂ¼ kazandÃ„Â±k.`;
                this.addSocialPost("@atlas_esports", team.name, failPost);
                
                alert(`ÄŸÅ¸â€œÂ¢ Turnuva Bitti! E-Spor kulÃƒÂ¼bÃƒÂ¼nÃƒÂ¼z ${team.name}, ${oldName} turnuvasÃ„Â±nÃ„Â± ${points} puanla tamamladÃ„Â±. Ã…Âampiyonluk iÃƒÂ§in en az ${neededPoints} puan gerekiyordu.\nÄŸÅ¸â€™Â° KatÃ„Â±lÃ„Â±m Ãƒâ€“dÃƒÂ¼lÃƒÂ¼: ${consolidationPrize.toLocaleString()} Ã¢â€šÂ¬ hesabÃ„Â±nÃ„Â±za yatÃ„Â±rÃ„Â±ldÃ„Â±.\nÄŸÅ¸â€â€ AynÃ„Â± ligde tekrar mÃƒÂ¼cadele edeceksiniz.`);
            }

            // Reset tournament statistics for next season
            t.stage = 0;
            t.wins = 0;
            t.losses = 0;
            t.draws = 0;
        }

        t.stage++;
    },

    simulateLeagueWeek: function(playerMatchGoals, opponentMatchGoals) {
        if (this.state.isSuperCupMatch || this.state.isEuropeanCupMatch) {
            // Bypass updating league standings during European and Super Cup matches
            return;
        }

        if (!this.state.leagueTable || this.state.leagueTable.length === 0) {
            this.initLeagueTable();
        }

        let playerClub = this.state.currentClub;
        let opponentClub = this.state.nextOpponentName;

        let pTeam = this.state.leagueTable.find(t => t.name === playerClub);
        let oTeam = opponentClub ? this.state.leagueTable.find(t => t.name === opponentClub) : null;

        if (pTeam && oTeam) {
            pTeam.played++;
            pTeam.gf += playerMatchGoals;
            pTeam.ga += opponentMatchGoals;

            oTeam.played++;
            oTeam.gf += opponentMatchGoals;
            oTeam.ga += playerMatchGoals;

            if (playerMatchGoals > opponentMatchGoals) {
                pTeam.won++; pTeam.points += 3;
                oTeam.lost++;
            } else if (playerMatchGoals < opponentMatchGoals) {
                oTeam.won++; oTeam.points += 3;
                pTeam.lost++;
            } else {
                pTeam.drawn++; pTeam.points += 1;
                oTeam.drawn++; oTeam.points += 1;
            }
        }

        // Use weeklyFixtures if defined, otherwise fall back to random
        if (this.state.weeklyFixtures && this.state.weeklyFixtures.length > 0) {
            this.state.weeklyFixtures.forEach(fix => {
                if (fix.home === playerClub || fix.away === playerClub) {
                    // Update player's match in weeklyFixtures for reference
                    fix.played = true;
                    fix.scoreHome = fix.home === playerClub ? playerMatchGoals : opponentMatchGoals;
                    fix.scoreAway = fix.away === playerClub ? playerMatchGoals : opponentMatchGoals;
                    return;
                }
                
                let teamA = this.state.leagueTable.find(t => t.name === fix.home);
                let teamB = this.state.leagueTable.find(t => t.name === fix.away);
                if (!teamA || !teamB) return;

                let ratingA = this.getTeamAverageRating(teamA.name);
                let ratingB = this.getTeamAverageRating(teamB.name);

                let probA = ratingA / (ratingA + ratingB);
                let goalsA = 0;
                let goalsB = 0;

                for (let g = 0; g < 4; g++) {
                    if (Math.random() < probA * 0.45) goalsA++;
                    if (Math.random() < (1 - probA) * 0.45) goalsB++;
                }

                // Update fixture with simulated scores
                fix.played = true;
                fix.scoreHome = goalsA;
                fix.scoreAway = goalsB;

                teamA.played++;
                teamA.gf += goalsA;
                teamA.ga += goalsB;

                teamB.played++;
                teamB.gf += goalsB;
                teamB.ga += goalsA;

                if (goalsA > goalsB) {
                    teamA.won++; teamA.points += 3;
                    teamB.lost++;
                } else if (goalsA < goalsB) {
                    teamB.won++; teamB.points += 3;
                    teamA.lost++;
                } else {
                    teamA.drawn++; teamA.points += 1;
                    teamB.drawn++; teamB.points += 1;
                }
            });
        } else {
            // Pair up other teams randomly (fallback)
            let remainingTeams = this.state.leagueTable.filter(t => t.name !== playerClub && t.name !== opponentClub);
            remainingTeams.sort(() => Math.random() - 0.5);

            for (let i = 0; i < remainingTeams.length; i += 2) {
                if (i + 1 >= remainingTeams.length) break;
                let teamA = remainingTeams[i];
                let teamB = remainingTeams[i+1];

                let ratingA = this.getTeamAverageRating(teamA.name);
                let ratingB = this.getTeamAverageRating(teamB.name);

                let probA = ratingA / (ratingA + ratingB);
                let goalsA = 0;
                let goalsB = 0;

                for (let g = 0; g < 4; g++) {
                    if (Math.random() < probA * 0.45) goalsA++;
                    if (Math.random() < (1 - probA) * 0.45) goalsB++;
                }

                teamA.played++;
                teamA.gf += goalsA;
                teamA.ga += goalsB;

                teamB.played++;
                teamB.gf += goalsB;
                teamB.ga += goalsA;

                if (goalsA > goalsB) {
                    teamA.won++; teamA.points += 3;
                    teamB.lost++;
                } else if (goalsA < goalsB) {
                    teamB.won++; teamB.points += 3;
                    teamA.lost++;
                } else {
                    teamA.drawn++; teamA.points += 1;
                    teamB.drawn++; teamB.points += 1;
                }
            }
        }

        // Settle active bets now that matches are simulated
        this.settleBets();

        // Sort table: points -> GD -> GF (robust numerical comparison)
        this.state.leagueTable.sort((a, b) => {
            const pDiff = Number(b.points) - Number(a.points);
            if (pDiff !== 0) return pDiff;
            
            const gdA = Number(a.gf) - Number(a.ga);
            const gdB = Number(b.gf) - Number(b.ga);
            if (gdB !== gdA) return gdB - gdA;
            
            return Number(b.gf) - Number(a.gf);
        });
        
        // Save the simulated scores into our persistent 37-week seasonFixtures array
        if (this.state.seasonFixtures && this.state.seasonFixtures.length > 0) {
            let week = this.state.currentWeek;
            let fixtureIndex = week - 1;
            if (week > 32) fixtureIndex -= 3;
            else if (week > 24) fixtureIndex -= 2;
            else if (week > 12) fixtureIndex -= 1;

            if (fixtureIndex >= 0 && fixtureIndex < this.state.seasonFixtures.length) {
                let weeklyMatchups = this.state.seasonFixtures[fixtureIndex];
                weeklyMatchups.forEach(m => {
                    if (this.state.weeklyFixtures && this.state.weeklyFixtures.length > 0) {
                        let simulatedMatch = this.state.weeklyFixtures.find(wf => 
                            (wf.home === m.home && wf.away === m.away) ||
                            (wf.home === m.away && wf.away === m.home)
                        );
                        if (simulatedMatch) {
                            m.scoreHome = simulatedMatch.scoreHome;
                            m.scoreAway = simulatedMatch.scoreAway;
                        }
                    }
                });
            }
        }

        this.simulateOtherLeaguesWeek();
        this.saveGame();
    },


    generateWeeklyFixtures: function() {
        if (!this.state.currentClub) return;
        if (!this.state.nextOpponentName) return;
        
        // If already generated for this week, do nothing
        if (this.state.weeklyFixtures && 
            this.state.weeklyFixtures.length > 0 && 
            this.state.weeklyFixturesWeek === this.state.currentWeek) {
            return;
        }

        // If it's a national break, clear fixtures
        const week = this.state.currentWeek;
        const isNatBreak = (week === 12 || week === 24 || week === 32);
        if (isNatBreak) {
            this.state.weeklyFixtures = [];
            this.state.weeklyFixturesWeek = week;
            return;
        }

        let league = DATABASE.LEAGUES[this.state.currentLeague];
        if (!league) return;

        let fixtures = [];
        
        // 1. Add player's match
        fixtures.push({
            home: this.state.currentClub,
            away: this.state.nextOpponentName,
            played: false,
            scoreHome: null,
            scoreAway: null
        });

        // 2. Add other matches in the same league
        let remainingTeams = league.teams.filter(t => t.name !== this.state.currentClub && t.name !== this.state.nextOpponentName);
        
        // Shuffle remaining teams
        let shuff = [...remainingTeams];
        shuff.sort(() => Math.random() - 0.5);

        for (let i = 0; i < shuff.length; i += 2) {
            if (i + 1 < shuff.length) {
                fixtures.push({
                    home: shuff[i].name,
                    away: shuff[i+1].name,
                    played: false,
                    scoreHome: null,
                    scoreAway: null
                });
            }
        }

        this.state.weeklyFixtures = fixtures;
        this.state.weeklyFixturesWeek = week;
        this.saveGame();
    },

    settleBets: function() {
        if (!this.state.activeBets || this.state.activeBets.length === 0) return;
        if (!this.state.weeklyFixtures || this.state.weeklyFixtures.length === 0) return;

        let totalWonCoins = 0;
        let wonBetsList = [];
        let lostBetsList = [];

        this.state.activeBets.forEach(bet => {
            let allWon = true;
            bet.matches.forEach(sel => {
                // Find matching simulated fixture
                let fix = this.state.weeklyFixtures.find(f => 
                    (f.home === sel.home && f.away === sel.away) ||
                    (f.home === sel.away && f.away === sel.home)
                );
                
                if (!fix || !fix.played) {
                    sel.status = "LOST"; // Can't find or not played
                    allWon = false;
                    return;
                }

                // Check outcome
                let isHome = (fix.home === sel.home);
                let scoreHome = fix.scoreHome;
                let scoreAway = fix.scoreAway;
                
                // Normalize scores relative to selected home/away
                let scoreSelHome = isHome ? scoreHome : scoreAway;
                let scoreSelAway = isHome ? scoreAway : scoreHome;

                let win = false;
                switch (sel.betType) {
                    case "MS1":
                        win = (scoreSelHome > scoreSelAway);
                        break;
                    case "MSX":
                        win = (scoreSelHome === scoreSelAway);
                        break;
                    case "MS2":
                        win = (scoreSelHome < scoreSelAway);
                        break;
                    case "Alt":
                        win = ((scoreSelHome + scoreSelAway) < 2.5);
                        break;
                    case "ÃƒÅ“st":
                        win = ((scoreSelHome + scoreSelAway) > 2.5);
                        break;
                    case "KG_Var":
                        win = (scoreSelHome > 0 && scoreSelAway > 0);
                        break;
                    case "KG_Yok":
                        win = (scoreSelHome === 0 || scoreSelAway === 0);
                        break;
                }

                sel.status = win ? "WON" : "LOST";
                if (!win) allWon = false;
            });

            bet.status = allWon ? "WON" : "LOST";
            
            if (allWon) {
                totalWonCoins += bet.potentialPayout;
                wonBetsList.push(bet);
            } else {
                lostBetsList.push(bet);
            }
            
            // Push to history
            this.state.betHistory.unshift(bet);
        });

        // Clear active bets
        this.state.activeBets = [];

        if (totalWonCoins > 0) {
            this.state.money += totalWonCoins;
            
            // Add a social media post celebrating the win!
            const handles = ["@iddaa_guru", "@vurgun_medya", "@tuttur_com", "@kupon_tavsiyeleri"];
            const names = ["Ã„Â°ddaa Gurusu", "Vurgun Medya", "Kupon Tuttur", "Kupon PaylaÃ…Å¸Ã„Â±m"];
            const idx = Math.floor(Math.random() * handles.length);
            
            this.addSocialPost(
                handles[idx],
                names[idx],
                `ÄŸÅ¸Å¡Â¨ BÃƒÅ“YÃƒÅ“K VURGUN! GenÃƒÂ§ yetenek ${this.state.playerName}, bu hafta oynadÃ„Â±Ã„Å¸Ã„Â± iddaa kuponuyla tam ${totalWonCoins.toLocaleString()} Ã¢â€šÂ¬ kazandÃ„Â±! Servetine servet katÃ„Â±yor! ÄŸÅ¸Â¤â€˜ÄŸÅ¸â€™Â¸ÄŸÅ¸â€œË†`
            );

            // Save win info to display a beautiful modal after UI updates
            this.state.lastWinningBetAmount = totalWonCoins;
        }

        // Check for betting scandal (10% chance of getting caught if they played any bet)
        let caught = false;
        if (wonBetsList.length > 0 || lostBetsList.length > 0) {
            // Player played a coupon
            if (Math.random() < 0.10) { // 10% risk of TFF catching them
                caught = true;
            }
        }

        if (caught) {
            let fine = Math.round(this.state.money * 0.25 + 2500); // 25% of cash + 2500 Ã¢â€šÂ¬ fine
            let lostFollowers = Math.round(this.state.followers * 0.22 + 2000); // 22% of followers unfollow
            let lostFans = 35; // Taraftar sevgisi -35
            let lostTrust = 25; // Hoca gÃƒÂ¼veni -25

            this.state.money = Math.max(0, this.state.money - fine);
            this.state.followers = Math.max(0, this.state.followers - lostFollowers);
            this.state.taraftarSevgisi = Math.max(0, this.state.taraftarSevgisi - lostFans);
            this.state.hocaGuveni = Math.max(0, this.state.hocaGuveni - lostTrust);
            
            // Ban from national team selection for 15 weeks
            this.state.nationalBanWeeks = 15;

            // Save betting scandal state to display modal in index.html
            this.state.bettingScandal = {
                fine: fine,
                lostFollowers: lostFollowers,
                lostFans: lostFans,
                lostTrust: lostTrust
            };
            
            // Post scandal on social feed
            this.addSocialPost(
                "@tff_resmi", 
                "TFF Resmi", 
                `ÄŸÅ¸Å¡Â¨ TFF Duyurusu: ${this.state.playerName}'in kendi ligindeki karÃ…Å¸Ã„Â±laÃ…Å¸malara yasa dÃ„Â±Ã…Å¸Ã„Â± bahis oynadÃ„Â±Ã„Å¸Ã„Â± saptanmÃ„Â±Ã…Å¸ olup, sporcuya ${fine.toLocaleString()} Ã¢â€šÂ¬ para cezasÃ„Â± ve 15 resmi mÃƒÂ¼sabakadan men cezasÃ„Â± verilmiÃ…Å¸tir.`
            );
        }

        this.saveGame();
    },

    getTeamAverageRating: function(teamName) {
        // Check amateur clubs pool first
        const amateurClub = DATABASE.AMATEUR_CLUBS.find(c => c.name === teamName);
        if (amateurClub) {
            return (amateurClub.att + amateurClub.mid + amateurClub.def) / 3;
        }
        // Search all leagues
        for (const leagueName in DATABASE.LEAGUES) {
            let tObj = DATABASE.LEAGUES[leagueName].teams.find(t => t.name === teamName);
            if (tObj) return (tObj.att + tObj.mid + tObj.def) / 3;
        }
        return 70;
    },

    getPlayerTeamObject: function() {
        // Check amateur clubs pool
        const amateurClub = DATABASE.AMATEUR_CLUBS.find(c => c.name === this.state.currentClub);
        if (amateurClub) return amateurClub;
        // Check professional leagues
        let league = DATABASE.LEAGUES[this.state.currentLeague];
        if (league) {
            const found = league.teams.find(t => t.name === this.state.currentClub);
            if (found) return found;
        }
        // Fallback: search all leagues
        for (const leagueName in DATABASE.LEAGUES) {
            const found = DATABASE.LEAGUES[leagueName].teams.find(t => t.name === this.state.currentClub);
            if (found) return found;
        }
        return DATABASE.AMATEUR_CLUBS[0];
    },

    generateSeasonFixtures: function() {
        let league = DATABASE.LEAGUES[this.state.currentLeague];
        if (!league) return;
        
        let teams = this.state.leagueTable.map(t => t.name);
        if (teams.length % 2 !== 0) {
            teams.push("BAY");
        }
        
        let numTeams = teams.length;
        let numWeeks = numTeams - 1;
        let halfSize = numTeams / 2;
        
        let seasonFixtures = [];
        
        // Round 1 (First Half of Season)
        for (let week = 0; week < numWeeks; week++) {
            let weekFixtures = [];
            for (let i = 0; i < halfSize; i++) {
                let home = teams[i];
                let away = teams[numTeams - 1 - i];
                
                if (week % 2 === 0) {
                    weekFixtures.push({ home: home, away: away });
                } else {
                    weekFixtures.push({ home: away, away: home });
                }
            }
            seasonFixtures.push(weekFixtures);
            
            // Rotate teams (Berger tables method)
            let newTeams = [];
            newTeams.push(teams[0]);
            newTeams.push(teams[numTeams - 1]);
            for (let i = 1; i < numTeams - 1; i++) {
                newTeams.push(teams[i]);
            }
            teams = newTeams;
        }
        
        // Round 2 (Second Half of Season - reverse home/away)
        let secondHalf = [];
        for (let week = 0; week < numWeeks; week++) {
            let weekFixtures = seasonFixtures[week].map(f => {
                return { home: f.away, away: f.home };
            });
            secondHalf.push(weekFixtures);
        }
        
        this.state.seasonFixtures = seasonFixtures.concat(secondHalf);
        this.saveGame();
    }
};

if (typeof module !== "undefined" && module.exports) {
    module.exports = GAME;
}

