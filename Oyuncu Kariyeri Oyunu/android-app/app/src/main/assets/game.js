/**
 * Rise Of Greatness: Kariyer Efsanesi - Core Game State & Manager Module
 * Coordinates UI, save/load state, training, purchases, and transfer logic.
 */

const GAME = {
    state: {
        playerName: "Genç Semih",
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
        currentLeague: "Süper Lig",
        currentClub: "Amatör Kulüp", // Starts at amateur

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
            isSuspended: false,
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
                    name: "Türk Futbol Günlüğü",
                    text: `TFF ${sLeague} ekiplerinden ${startingClub.name}, altyapısından yetiştirdiği 17 yaşındaki genç yetenek ${pName}'ye profesyonel lisans çıkardı! Haydi hayırlısı. 🇹🇷⚽`,
                    time: "1s önce"
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
                     "Fenerbahçe": "Fenerbaçe FK",
                     "Trabzonspor": "Trabzon FK",
                     "Beşiktaş": "Kartal FK",
                     "Başakşehir": "Başakşehir FK",
                     "Göztepe": "Göztepe FK",
                     "Samsunspor": "Samsun FK",
                     "Konyaspor": "Konya FK",
                     "Kocaelispor": "Kocaeli FK",
                     "Alanyaspor": "Alanya FK",
                     "Kasımpaşa": "Kaşımpaşa FK",
                     "Eyüpspor": "Eyüpspor FK",
                     "Antalyaspor": "Antalya FK",
                     "Kayserispor": "Kayseri FK",
                     "Sivasspor": "Sivas FK",
                     "Hatayspor": "Hatay FK",
                     "Adana Demirspor": "Adana Demir FK",
                     "Çaykur Rizespor": "Rize FK"
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
                if (typeof this.state.isSuspended === "undefined") {
                    this.state.isSuspended = false;
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
            alert(`Sakatlığınız devam ediyor! Antrenman yapamazsınız. İyileşmenize ${this.state.injuryWeeks} hafta kaldı.`);
            return;
        }

        if ((this.state[statType] || 50) >= 100) {
            alert("Bu yetenek zaten maksimum seviyede (%100)!");
            return;
        }

        // Haftalık 4 antrenman sınırı
        if (typeof this.state.weeklyTrainingCount === "undefined") {
            this.state.weeklyTrainingCount = 0;
        }
        if (this.state.weeklyTrainingCount >= 4) {
            alert("Bu hafta zaten 4 kez antrenman yaptınız! Kaslarınızı aşırı yormamalısınız. Haftayı ilerletip yeni haftaya geçerek antrenmanlara devam edebilirsiniz.");
            return;
        }

        let energyCost = this.state.ownedItems.includes("doc_ahmet") ? 15 : 20;
        if (this.state.kondisyon < energyCost) {
            alert(`Antrenman yapmak için en az %${energyCost} kondisyon gereklidir! Dinlenmelisin.`);
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
            alert("Bu eşyaya zaten sahipsiniz!");
            return;
        }

        if (this.state.money < item.cost) {
            alert("Bunu satın almak için yeterli paranız yok!");
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
            displayName = `👑 ${locationName} Belediyespor Kulübü`;
        }

        this.saveGame();
        this.updateUI();
        alert(`${displayName} başarıyla satın alındı!`);
    },

    buyConsumable: function(itemId) {
        const item = DATABASE.CONSUMABLES.find(c => c.id === itemId);
        if (!item) return false;
        
        if (this.state.money < item.cost) {
            alert(`Bunu satın almak için yeterli paranız yok! Gerekli: ${item.cost.toLocaleString()} €`);
            return false;
        }
        
        this.state.money -= item.cost;
        item.effect(this.state);
        this.state.weeksSinceLastPurchase = 0;
        
        this.saveGame();
        this.updateUI();
        alert(`${item.name} başarıyla tüketildi! Enerjiniz tazelendi.`);
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
                alert(`Bu menajeri kiralamak için yeterli paranız yok! Gerekli: ${agent.cost.toLocaleString()} €`);
                return false;
            }
            this.state.money -= agent.cost;
        }

        let oldAgentMsg = "";
        if (this.state.agentId) {
            const oldAgent = DATABASE.AGENTS.find(a => a.id === this.state.agentId);
            if (oldAgent) {
                oldAgentMsg = `${oldAgent.name} ile yollar ayrıldı. `;
            }
        }

        this.state.agentId = agentId;
        this.saveGame();
        this.updateUI();
        
        alert(`${oldAgentMsg}${agent.name} artık yeni menajeriniz! Haftalık komisyonu: %${agent.commissionRate * 100}`);
        return true;
    },


    advanceWeek: function() {
        this.state.currentWeek++;

        // Transfer penceresi kapandıysa aktif teklifleri sıfırla
        if (!this.isTransferWindowActive()) {
            this.state.activeTransferOffers = [];
        }

        // Haftalık antrenman sayacını sıfırla
        this.state.weeklyTrainingCount = 0;

        if (typeof this.state.weeksSinceLastTraining === "undefined") this.state.weeksSinceLastTraining = 0;
        if (typeof this.state.weeksSinceLastPurchase === "undefined") this.state.weeksSinceLastPurchase = 0;

        // Eğer tüm yetenekler ful ise antrenman yapmama sayacını artırma
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
                alert("🎉 Müjde! Sakatlığınız tamamen geçti. Sahalara ve antrenmanlara dönmeye hazırsınız! 💪⚽");
            } else {
                alert(`🚑 Tedaviniz devam ediyor. İyileşmenize ${this.state.injuryWeeks} hafta kaldı.`);
            }
        }

        if (this.state.nationalBanWeeks && this.state.nationalBanWeeks > 0) {
            this.state.nationalBanWeeks--;
        }

        // Season End check at week 34
        if (this.state.currentWeek > 34) {
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

        // Krampon eskime payı
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
                this.addSocialPost("@spor_manset", "Ekipman Raporu", `⚠️ Kötü haber! ${this.state.playerName}'nin giydiği ${bootName} kramponunun ömrü tükendi ve parçalandı! Yıldız oyuncu yeni bir krampon arayışında.`);
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

        // Tefeci Borç Geri Ödemesi
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
                // Borç ödenemedi - Darp ve Eşyaya Çökme Eventi!
                this.state.money = 0;
                this.state.kondisyon = 5;
                this.state.moral = 5;
                this.state.tefeciBorc = Math.round(this.state.tefeciBorc * 1.25); // Borç %25 faizle katlanır!
                this.state.tefeciHaftalikGeriOdeme = Math.round(this.state.tefeciHaftalikGeriOdeme * 1.20);
                this.state.mafiaBeating = true;

                // Tefeci mal varlığına çöker!
                let seizableItems = ["penthouse", "sports_car", "yacht", "jet", "mansion", "gerze_fc"].filter(id => this.state.ownedItems.includes(id));
                if (seizableItems.length > 0) {
                    let seizedId = seizableItems[Math.floor(Math.random() * seizableItems.length)];
                    this.state.ownedItems = this.state.ownedItems.filter(id => id !== seizedId);
                    
                    let itemVal = 0;
                    let itemName = "";
                    if (seizedId === "penthouse") { itemVal = 500000; itemName = "Boğaz Manzaralı Rezidans"; }
                    else if (seizedId === "sports_car") { itemVal = 120000; itemName = "Lüks Spor Araba"; }
                    else if (seizedId === "yacht") { itemVal = 1000000; itemName = "Ultra Lüks Yat"; }
                    else if (seizedId === "jet") { itemVal = 3000000; itemName = "Özel Jet"; }
                    else if (seizedId === "mansion") { itemVal = 2000000; itemName = "Tarihi Boğaz Yalısı"; }
                    else if (seizedId === "gerze_fc") { itemVal = 6000000; itemName = "Gerze Belediyespor Kulübü"; }
                    
                    this.state.tefeciBorc = Math.max(0, this.state.tefeciBorc - itemVal);
                    this.state.tefeciHaftalikGeriOdeme = Math.round(this.state.tefeciBorc * 0.15);
                    this.state.mafiaSeizedItem = { name: itemName, reduction: itemVal };
                }
            }
        }

        // Haraç Talebi (Extortion) Kontrolü
        if (this.state.money >= 50000 || this.state.followers >= 80000) {
            if (Math.random() < 0.15) { // %15 şansla haraç mafyası kapıya dayanır
                let hasBodyguard = this.state.ownedItems.includes("bodyguard");
                if (hasBodyguard) {
                    this.state.mafiaExtortionDefended = true;
                } else {
                    // Haraç miktarı: nakit paranın %4'ü + 800 €
                    let demand = Math.round(this.state.money * 0.04 + 800);
                    if (this.state.money >= demand) {
                        this.state.money -= demand;
                        this.state.mafiaExtortionPaid = demand;
                    } else {
                        // Para yetmedi - Vandalizm!
                        this.state.moral = Math.max(0, this.state.moral - 40);
                        
                        // Lüks araba veya evi var mı? Varsa birini sil
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

        if (this.state.isSuspended) {
            this.state.isSuspended = false;
            this.addSocialPost("@spor_manset", "Spor Manşetleri", `Cezası bitti! Kırmızı kart cezası sona eren genç yetenek ${this.state.playerName} yeniden formasına kavuşuyor.`);
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
                        "FLAŞ HABER 📰",
                        `${this.state.playerName.toUpperCase()} KAYIPLARA KARIŞTI!`,
                        "Antrenman Sahasında Tembellik İddiaları!",
                        `Son <b>4 haftadır</b> antrenman tesislerinde neredeyse hiç görülmeyen genç yıldız adayı <b>${this.state.playerName}</b> için spor basını kazan kaldırıyor! <br><br>Taraftarlar sosyal medyada oyuncunun disiplinsizliğine isyan ederken, teknik direktörün de bu durumdan son derece rahatsız olduğu ve böyle devam ederse oyuncuyu <b>kadro dışı</b> bırakabileceği konuşuluyor. Acilen antrenman yapıp kendini göstermelisin!`
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
                        "KRİZ RAPORU 🚨",
                        `DİSİPLİNSİZLİK FATURASI KESİLDİ!`,
                        "Hoca Güveni ve Moral Dip Yaptı!",
                        `Tam <b>${this.state.weeksSinceLastTraining} haftadır</b> antrenman yapmayan <b>${this.state.playerName}</b>, kulüpte adeta krize neden oldu! <br><br>Teknik direktör oyuncuya olan inancını tamamen kaybetti. Kulüpten sızan bilgilere göre oyuncunun antrenman yapmayı reddetmesi sebebiyle hoca güveni ve moral yerle bir oldu (-8 Hoca Güveni, -10 Moral). Kariyerini kurtarmak için hemen antrenman sekmesine gitmelisin!`
                    );
                }, 1800);
            }
        }

        // Check for lack of shopping warning (6 weeks without purchases)
        if (this.state.weeksSinceLastPurchase === 6) {
            if (typeof window.showNewspaperModal !== "undefined") {
                const agentName = this.state.agentId === "izi" ? "İzim" : "Bedirhan Abi";
                const agentIcon = this.state.agentId === "izi" ? "👩🏼‍💼" : "👨🏻‍💼";
                setTimeout(() => {
                    window.showNewspaperModal(
                        "SOSYETİK MAGAZİN 📸",
                        `CÜZDANININ AĞZINI AÇMIYOR!`,
                        `${this.state.playerName.toUpperCase()} PARALARI MEZARA MI GÖTÜRECEK?`,
                        `Milyon euroluk sözleşmelere imza atan, kulübünden ve sponsorlarından sürekli para kazanan yıldız futbolcu <b>${this.state.playerName}</b>'nin son <b>6 haftadır</b> tek bir kuruş bile harcamadığı ortaya çıktı! <br><br>Menajeri ${agentIcon} <b>${agentName}</b> oyuncuyu uyardı: <em>"Nakit biriktirmek güzel ama markanı ve yaşam kaliteni artırmak için mağazadan yeni kramponlar, lüks arabalar, mülkler veya borsa yatırımları almalısın. Biraz hayatın tadını çıkar aslanım!"</em>`
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
        // Ara Transfer Dönemi: 14 - 21. haftalar arası
        // Yaz Transfer Dönemi: 34. hafta (sezon sonu)
        return ((w >= 14 && w <= 21) || w === 34);
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
            coachMsg = `\n\n🗣️ Teknik Direktör: "Yeterli katkıyı veremiyorsun ${this.state.playerName}. Git antrenman yap, yoksa değişiklik yaparım!"`;
            if (this.state.consecutivePoorMatches >= 2) {
                coachMsg += `\n⚠️ (${this.state.consecutivePoorMatches} maçtır etkisizsin! Antrenman yapmazsan daha da zorlaşacak.)`;
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

        // Eğer halihazırda bu transfer dönemi için teklifler oluşturulmuşsa onları döndür
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
        
        // Karıştır, elit teklifleri başa al ve tam olarak 5 teklif seç
        offers.sort((a,b) => (b.isElite ? 1 : 0) - (a.isElite ? 1 : 0) || Math.random() - 0.5);
        let finalOffers = offers.slice(0, 5);

        // Eğer 5'ten az teklif çıktıysa, oyuncunun seviyesine en yakın diğer takımlardan doldurma yap
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
            alert("Zaten bir ilişkiniz var! Başka bir teklif yapmadan önce mevcut ilişkinizi sonlandırmalısınız.");
            return false;
        }
        
        // Check requirements
        if (this.state.rating < gf.reqs.rating || this.state.followers < gf.reqs.followers) {
            alert("Bu teklif için gereksinimleri karşılamıyorsunuz!");
            return false;
        }
        
        this.state.relationship = {
            active: true,
            id: gfId,
            level: 50 // Starts at 50% relationship bond
        };
        
        // Apply initial moral boost
        this.state.moral = Math.min(100, this.state.moral + 20);
        
        this.addSocialPost(`@${this.state.playerName.toLowerCase().replace(/\s/g, '_')}_hayat`, `${this.state.playerName} Magazin`, `Genç futbolcu ${this.state.playerName}, ${gf.name} ile yeni bir ilişkiye başladığını duyurdu! Çiftimize mutluluklar dileriz. ❤️🥂`);
        
        this.saveGame();
        this.updateUI();
        alert(`${gf.name} ile ilişkiniz başladı! Mutluluklar!`);
        return true;
    },

    goOnDate: function() {
        if (!this.state.relationship || !this.state.relationship.active) return false;
        
        const gf = DATABASE.GIRLFRIENDS.find(g => g.id === this.state.relationship.id);
        if (!gf) return false;
        
        const dateCost = Math.round(gf.cost * 0.8 + 100);
        
        if (this.state.money < dateCost) {
            alert("Buluşmaya çıkmak için yeterli paranız yok!");
            return false;
        }
        if (this.state.kondisyon < 20) {
            alert("Buluşmaya çıkmak için çok yorgunsunuz! Dinlenin.");
            return false;
        }
        
        this.state.money -= dateCost;
        this.state.kondisyon -= 20;
        this.state.moral = Math.min(100, this.state.moral + 15);
        this.state.relationship.level = Math.min(100, this.state.relationship.level + 15);
        
        this.saveGame();
        this.updateUI();
        alert(`${gf.name} ile harika bir akşam geçirdiniz! İlişki bağı güçlendi.\nHarcanan Para: ${dateCost} €\nKondisyon: -20% | Moral: +15%`);
        return true;
    },

    breakUp: function() {
        if (!this.state.relationship || !this.state.relationship.active) return false;
        
        const gf = DATABASE.GIRLFRIENDS.find(g => g.id === this.state.relationship.id);
        const name = gf ? gf.name : "kız arkadaşınız";
        
        if (!confirm(`${name} ile ayrılmak istediğinizden emin misiniz?`)) return false;
        
        this.state.relationship = { active: false, id: null, level: 0 };
        this.state.moral = Math.max(10, this.state.moral - 25);
        
        this.addSocialPost("@magazin_gundem", "Magazin Gündemi", `Şok ayrılık! ${this.state.playerName} ile ${name} ilişkilerini sonlandırdıklarını açıkladı. Ayrılık sonrası genç futbolcunun morali bozuk görünüyor. 💔`);
        
        this.saveGame();
        this.updateUI();
        alert(`${name} ile yollarınızı ayırdınız. Moralin düştü.`);
        return true;
    },

    signBootSponsor: function(bootId) {
        const boot = DATABASE.BOOT_SPONSORS.find(b => b.id === bootId);
        if (!boot) return false;
        
        if (this.state.rating < boot.reqRating || this.state.followers < boot.reqFollowers) {
            alert("Bu sponsorluk için gereksinimleri karşılamıyorsunuz.");
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
        
        this.addSocialPost("@transfer_kulisi", "Transfer Kulisi", `${this.state.playerName}, ünlü spor markası ${boot.brand} ile resmi krampon sponsorluğu imzaladı! Sahada ${boot.model} modelini giyecek! 🥾🔥`);
        
        this.saveGame();
        this.updateUI();
        alert(`Tebrikler! ${boot.brand} ile sponsorluk imzaladınız!\nYeni Krampon: ${boot.model}\nYetenekleriniz güncellendi ve haftalık +${boot.weeklyPay} € prim eklendi.`);
        return true;
    },

    buyBoot: function(bootId) {
        const boot = DATABASE.PURCHASABLE_BOOTS.find(b => b.id === bootId);
        if (!boot) return false;
        
        if (this.state.money < boot.cost) {
            alert("Bu kramponu satın almak için yeterli paranız yok.");
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
            alert("Sponsorluk anlaşmanız kendi aldığınız kramponu giydiğiniz için feshedildi! (Haftalık sponsorluk priminiz durduruldu)");
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
        alert(`Tebrikler! ${boot.brand} ${boot.model} kramponunu satın aldınız ve giydiniz!\nYetenekleriniz güncellendi.`);
        return true;
    },

    buyCrypto: function(coinId, moneyAmount) {
        const coin = DATABASE.CRYPTO_ASSETS.find(c => c.id === coinId);
        if (!coin) return false;
        
        if (this.state.money < moneyAmount) {
            alert("Bunun için yeterli bakiyeniz bulunmuyor.");
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
        alert(`${moneyAmount.toLocaleString()} € değerinde ${amount.toFixed(4)} adet ${coin.symbol} satın alındı!`);
        return true;
    },

    sellCrypto: function(coinId) {
        const portfolioEntry = this.state.cryptoPortfolio ? this.state.cryptoPortfolio[coinId] : null;
        const amount = portfolioEntry ? (portfolioEntry.amount || 0) : 0;
        if (amount <= 0) {
            alert("Portföyünüzde satacak bu coinden bulunmuyor.");
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
            alert("Portföyünüzde satacak bu miktarda coin bulunmuyor.");
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
        alert(`${actualAmount.toFixed(4)} adet ${coin.symbol} satılarak ${Math.round(revenue).toLocaleString()} € nakit elde edildi!`);
        return true;
    },



    buyInvestment: function(itemId) {
        const inv = DATABASE.HOMETOWN_INVESTMENTS.find(i => i.id === itemId);
        if (!inv) return false;
        
        if (!this.state.ownedInvestments) this.state.ownedInvestments = [];
        if (this.state.ownedInvestments.includes(itemId)) {
            alert("Bu yatırımı zaten gerçekleştirdiniz.");
            return false;
        }
        
        if (this.state.money < inv.cost) {
            alert("Bu yatırımı gerçekleştirmek için bütçeniz yetersiz.");
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
            newsText = `Flaş Haber! ${this.state.playerName}, memleketi ${hometown}'a yatırım yaptı ve şirin bir sahil çay bahçesi açtı! ☕`;
        } else if (itemId === "orchard") {
            newsText = `Girişimci Futbolcu! ${this.state.playerName}, ${hometown} (${district}) sınırlarında tarım arazisi satın alarak tarıma destek verdi! 🌳`;
        } else if (itemId === "local_sponsor") {
            newsText = `Büyük Destek! ${this.state.playerName}, memleketinin kulübüne ana sponsor oldu. Taraftarlar çılgına döndü! ⚽`;
        } else if (itemId === "textile_factory") {
            newsText = `İstihdam Hamlesi! Yıldız futbolcu ${this.state.playerName}, ${hometown}'da yeni bir fabrika kurarak yüzlerce gence ekmek kapısı sağladı! Helal olsun! 🏭`;
        }
        
        this.addSocialPost("@memleket_havadis", "Memleket Havadis", newsText);
        
        this.state.weeksSinceLastPurchase = 0;
        this.saveGame();
        this.updateUI();
        
        alert(`Tebrikler! ${inv.name} yatırımı başarıyla yapıldı. Memlekete hayırlı olsun!`);
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
                    else if (club === "Fenerbaçe FK") theme = "fenerbace";
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
            "stat-money": this.state.money.toLocaleString() + " €",
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
                let txt = state.weeklySalary + " €/Hafta";
                if (state.activeBootSponsor) {
                    const boot = DATABASE.BOOT_SPONSORS.find(b => b.id === state.activeBootSponsor);
                    if (boot) {
                        txt += ` (+${boot.weeklyPay} € Sponsor)`;
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

        // Render dynamic SVG avatar
        const avatarContainer = document.getElementById("player-avatar-container");
        if (avatarContainer) {
            const svgContent = this.generateAvatar(this.state.age);
            avatarContainer.innerHTML = svgContent;
            
            // Clone to FUT card container
            const avatarClone = document.getElementById("fut-card-avatar-container-clone");
            if (avatarClone) {
                avatarClone.innerHTML = svgContent;
            }
        }

        // Render club initials in FUT card
        const initialsBadge = document.getElementById("fut-club-initials");
        if (initialsBadge) {
            let club = this.state.currentClub || "Yıldız Gençlikspor";
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
                sidebarAvatar.innerHTML = this.generateAvatar(this.state.age);
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
                valEl.innerText = val.toLocaleString() + " €";
            }
            
            // Update Right Sidebar - Crypto Markets
            if (this.state.cryptoPrices) {
                const btcEl = document.getElementById("sidebar-crypto-btc");
                if (btcEl) btcEl.innerText = this.state.cryptoPrices.btc.toLocaleString() + " €";
                
                const ethEl = document.getElementById("sidebar-crypto-eth");
                if (ethEl) ethEl.innerText = this.state.cryptoPrices.eth.toLocaleString() + " €";
                
                const dogeEl = document.getElementById("sidebar-crypto-doge");
                if (dogeEl) dogeEl.innerText = this.state.cryptoPrices.doge.toFixed(4) + " €";
                
                const atlEl = document.getElementById("sidebar-crypto-atl");
                if (atlEl) atlEl.innerText = this.state.cryptoPrices.atl.toFixed(4) + " €";
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
        const curLeague = this.state.currentLeague || "Süper Lig";
        let pool = ["Ali", "Semih", "Kerem", "Barış", "İrfan", "Cenk", "Yusuf", "Umut", "Arda"];

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
                ageDeclineMsg = `⚠️ <strong>Yaşlanma Etkisi (Yaş ${age}):</strong> Yaşınız ilerledikçe hızınız ve fiziksel kapasiteniz yavaş yavaş azalıyor. (<span style="color: var(--accent-red); font-weight: bold;">-2 Hız</span>)<br><br>`;
            } else if (age === 35 || age === 36) {
                speedDecline = 3;
                shootDecline = 2;
                ageDeclineMsg = `⚠️ <strong>Yaşlanma Etkisi (Yaş ${age}):</strong> Kaslarınız eski gücünü kaybediyor. Hızınız ve şut gücünüz düşmeye başladı. (<span style="color: var(--accent-red); font-weight: bold;">-3 Hız, -2 Şut</span>)<br><br>`;
            } else if (age >= 37) {
                speedDecline = 4;
                shootDecline = 3;
                passDecline = 2;
                ageDeclineMsg = `⚠️ <strong>Yaşlanma Etkisi (Yaş ${age}):</strong> Vücudunuz artık elit seviyedeki temponuza ayak uyduramıyor. Fiziksel yeteneklerinizde ciddi kayıplar var. (<span style="color: var(--accent-red); font-weight: bold;">-4 Hız, -3 Şut, -2 Pas</span>)<br><br>`;
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

        let title = "Sezon Sonu Özeti";
        let message = `Sezon Sona Erdi! Takımın <strong>${this.state.currentClub}</strong>, ligi <strong>${rank}. sırada</strong> tamamladı.<br><br>`;
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
                this.state.trophies.push({ id: "3_lig", name: `TFF 3. Lig Şampiyonluğu (${year})`, icon: "🏆" });
            }
            if (rank <= 3) {
                // Promotion to 2. Lig
                this.state.currentLeague = "2. Lig";
                this.state.weeklySalary = Math.round(this.state.weeklySalary * 1.35); // 35% zam
                bonus += 15000;
                followerGain += 8000;
                promotionMsg = `🎉 <strong>KÜME YÜKSELDİNİZ!</strong> Takımınız ilk 3'te yer alarak <strong>2. Lig</strong>'e yükseldi! Haftalık maaşınız %35 artırıldı ve 15,000 € yükselme ödülü aldınız!`;
                if (rank === 1) {
                    promotionMsg = `🏆 <strong>TFF 3. LİG ŞAMPİYONLUĞU!</strong> Ligi zirvede tamamlayıp şampiyon olarak <strong>2. Lig</strong>'e yükseldiniz! 15,000 € şampiyonluk ödülü aldınız!`;
                }
            } else if (rank >= 14) {
                // Relegation to Amatör
                relegationMsg = `⚠️ <strong>KÜME DÜŞTÜNÜZ!</strong> Takımınız son 3'te kalarak Amatör Lig'e düştü. Kulüp sizinle olan sözleşmesini feshetti! Başka bir 3. Lig kulübünde sıfırdan başlamak zorundasınız. (-5 Yetenek, -15 Hoca Güveni)`;
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
                this.state.trophies.push({ id: "2_lig", name: `TFF 2. Lig Şampiyonluğu (${year})`, icon: "🏆" });
            }
            if (rank <= 3) {
                // Promotion to 1. Lig
                this.state.currentLeague = "1. Lig";
                this.state.weeklySalary = Math.round(this.state.weeklySalary * 1.4); // 40% zam
                bonus += 30000;
                followerGain += 15000;
                promotionMsg = `🎉 <strong>KÜME YÜKSELDİNİZ!</strong> Takımınız üstün başarı göstererek <strong>1. Lig</strong>'e yükseldi! Haftalık maaşınız %40 artırıldı ve 30,000 € yükselme ödülü aldınız!`;
                if (rank === 1) {
                    promotionMsg = `🏆 <strong>TFF 2. LİG ŞAMPİYONLUĞU!</strong> Ligi zirvede tamamlayıp şampiyon olarak <strong>1. Lig</strong>'e yükseldiniz! 30,000 € şampiyonluk ödülü aldınız!`;
                }
            } else if (rank >= 12) {
                // Relegation to 3. Lig
                this.state.currentLeague = "3. Lig";
                this.state.weeklySalary = Math.round(this.state.weeklySalary * 0.75); // %25 indirim
                relegationMsg = `📉 <strong>KÜME DÜŞTÜNÜZ!</strong> Takımınız ligi son 3 sırada tamamladı ve <strong>3. Lig</strong>'e düştü. Maaşınız %25 düşürüldü ve taraftar desteği azaldı.`;
            }
        } else if (curLeague === "1. Lig") {
            if (rank === 1) {
                if (!this.state.trophies) this.state.trophies = [];
                const year = 2026 + (this.state.age - 17);
                this.state.trophies.push({ id: "1_lig", name: `TFF 1. Lig Şampiyonluğu (${year})`, icon: "🏆" });
            }
            if (rank <= 3) {
                // Promotion to Süper Lig
                this.state.currentLeague = "Süper Lig";
                this.state.weeklySalary = Math.round(this.state.weeklySalary * 1.5); // 50% zam
                bonus += 50000;
                followerGain += 30000;
                promotionMsg = `🔥 <strong>SÜPER LİG'E YÜKSELDİNİZ!</strong> Takımınız devlerin arasına, <strong>Süper Lig</strong>'e yükseldi! Haftalık maaşınız %50 artırıldı ve 50,000 € yükselme ödülü kazandınız!`;
                if (rank === 1) {
                    promotionMsg = `🏆 <strong>TFF 1. LİG ŞAMPİYONLUĞU!</strong> Ligi zirvede tamamlayıp şampiyon olarak <strong>Süper Lig</strong>'e yükseldiniz! 50,000 € şampiyonluk ödülü kazandınız!`;
                }
            } else if (rank >= 14) {
                // Relegation to 2. Lig
                this.state.currentLeague = "2. Lig";
                this.state.weeklySalary = Math.round(this.state.weeklySalary * 0.75); // 25% indirim
                relegationMsg = `📉 <strong>KÜME DÜŞTÜNÜZ!</strong> Takımınız ligi son 3 sırada tamamladı ve <strong>2. Lig</strong>'e düştü. Maaşınız %25 azaltıldı.`;
            }
        } else if (curLeague === "Süper Lig") {
            if (rank === 1) {
                bonus += 100000;
                followerGain += 50000;
                promotionMsg = `🏆 <strong>SÜPER LİG ŞAMPİYONLUĞU!</strong> Ligi zirvede tamamlayarak Türkiye'nin en büyüğü oldunuz! 100,000 € şampiyonluk primi kazandınız!`;
                this.addSocialPost("@tff_resmi", "Türkiye Futbol Federasyonu", `Tebrikler Şampiyon! Süper Lig 1.si olan ${this.state.currentClub} kulübünü ve sezonun yıldızı ${this.state.playerName}'yi kutlarız! 🏆👑`);
                
                this.state.qualifiedForEurope = "ChampionsLeague";
                this.state.europeanCupStage = 1;
                this.state.wonLeagueLastSeason = true;
                
                if (!this.state.trophies) this.state.trophies = [];
                const year = 2026 + (this.state.age - 17);
                this.state.trophies.push({ id: "super_lig", name: `Süper Lig Şampiyonluğu (${year})`, icon: "🏆" });
            } else if (rank === 2) {
                this.state.qualifiedForEurope = "ChampionsLeague";
                this.state.europeanCupStage = 1;
                this.state.wonLeagueLastSeason = false;
                promotionMsg = `🥈 Ligi 2. sırada tamamlayarak gelecek sezon <strong>Şampiyonlar Ligi</strong>'ne katılmaya hak kazandınız!`;
            } else if (rank === 3 || rank === 4) {
                this.state.qualifiedForEurope = "EuropaLeague";
                this.state.europeanCupStage = 1;
                this.state.wonLeagueLastSeason = false;
                promotionMsg = `🥉 Ligi ${rank}. sırada tamamlayarak gelecek sezon <strong>Avrupa Ligi</strong>'ne katılmaya hak kazandınız!`;
            } else if (rank >= 15) {
                this.state.currentLeague = "1. Lig";
                this.state.weeklySalary = Math.round(this.state.weeklySalary * 0.75); // 25% indirim
                relegationMsg = `📉 <strong>KÜME DÜŞTÜNÜZ!</strong> Devler ligine tutunamadınız ve <strong>1. Lig</strong>'e düştünüz. Maaşınız %25 azaltıldı.`;
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
            this.state.trophies.push({ id: "ballon_or", name: `Ballon d'Or (Altın Top) (${year})`, icon: "👑" });
            this.state.followers += 75000;
            this.state.money += 50000;
            message += `👑 <strong>BALLON D'OR KAZANDINIZ!</strong> Yılın en iyi futbolcusu seçilerek <strong>Altın Top (Ballon d'Or)</strong> ödülünü kazandınız! Medya çıldırıyor! (+75,000 Takipçi, +50,000 €)<br><br>`;
            this.addSocialPost("@ballondor_news", "Ballon d'Or France Football", `WINNER: ${this.state.playerName.toUpperCase()}! The young Turkish sensation has officially claimed the prestigious Ballon d'Or trophy! Absolute masterclass! 👑⚽🇫🇷`);
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
            alert(`Sezon sona erdi! Yaşın ${this.state.age} oldu. Ligi ${rank}. sırada tamamladın.`);
        }
    },

    generateAvatar: function(age) {
        let cust = this.state.avatarCustomization || {};
        
        let skinColor = cust.skinColor || "#E2B28B";
        let eyeColor = cust.eyeColor || "#5A3D28";
        let hairColor = cust.hairColor || "#1A1A1A";
        let hairStyle = cust.hairStyle || "short";
        let beardStyle = cust.beardStyle || "none";
        
        let primaryColor = "#455A64";
        let secondaryColor = "#ffffff";
        const clubName = this.state ? this.state.currentClub : null;
        if (clubName && typeof DATABASE !== "undefined") {
            let foundClub = null;
            for (let l in DATABASE.LEAGUES) {
                let c = DATABASE.LEAGUES[l].teams.find(x => x.name === clubName);
                if (c) { foundClub = c; break; }
            }
            if (!foundClub && DATABASE.AMATEUR_CLUBS) {
                foundClub = DATABASE.AMATEUR_CLUBS.find(x => x.name === clubName);
            }
            if (foundClub) {
                primaryColor = foundClub.color;
                secondaryColor = foundClub.colorSec || "#ffffff";
            }
        }
        
        // Advanced dynamic palette mapping for ultra-real vector skin shading
        let palette = {
            base: "#E2B28B",
            highlight: "#F3CDB0",
            shadow: "#c29471",
            deepShadow: "#9e704d",
            blush: "rgba(229,158,135,0.25)",
            lip: "#c6706f",
            lipShadow: "#984747"
        };

        if (skinColor === "#FFD1A9") {
            palette = {
                base: "#FFD1A9",
                highlight: "#FFE8D6",
                shadow: "#e0ab82",
                deepShadow: "#c98d60",
                blush: "rgba(255,170,166,0.3)",
                lip: "#e08585",
                lipShadow: "#a85050"
            };
        } else if (skinColor === "#E2B28B") {
            palette = {
                base: "#E2B28B",
                highlight: "#F3CDB0",
                shadow: "#c29471",
                deepShadow: "#9e704d",
                blush: "rgba(229,158,135,0.25)",
                lip: "#c6706f",
                lipShadow: "#984747"
            };
        } else if (skinColor === "#C48E66") {
            palette = {
                base: "#C48E66",
                highlight: "#DEAA84",
                shadow: "#a2704a",
                deepShadow: "#83532f",
                blush: "rgba(201,122,99,0.25)",
                lip: "#aa5354",
                lipShadow: "#803536"
            };
        } else if (skinColor === "#805435") {
            palette = {
                base: "#805435",
                highlight: "#9e6e4d",
                shadow: "#5d3921",
                deepShadow: "#432612",
                blush: "rgba(133,64,50,0.3)",
                lip: "#6f2f2d",
                lipShadow: "#4a1917"
            };
        } else if (skinColor === "#4F301F") {
            palette = {
                base: "#4F301F",
                highlight: "#6a4632",
                shadow: "#351f12",
                deepShadow: "#231208",
                blush: "rgba(82,33,26,0.3)",
                lip: "#431a18",
                lipShadow: "#280b0a"
            };
        }

        // Hair color styling with highlights
        let hairHighlight = "rgba(255,255,255,0.08)";
        if (hairColor === "#4E3629") hairHighlight = "rgba(216,177,104,0.15)";
        else if (hairColor === "#D8B168") hairHighlight = "rgba(255,255,255,0.45)";
        else if (hairColor === "#C15C3D") hairHighlight = "rgba(255,215,0,0.3)";
        else if (hairColor === "#B3B3B3") hairHighlight = "rgba(255,255,255,0.6)";

        let hairPath = "";
        let beardPath = "";
        let wrinklePath = "";

        // Hair Styles (Highly realistic vector layers with strand flows)
        if (hairStyle === "short") {
            hairPath = `
                <!-- Main Hair Base Volume -->
                <path d="M13.5 25.5 C 11.5 11, 52.5 11, 50.5 25.5 C 47.5 15, 16.5 15, 13.5 25.5 Z" fill="${hairColor}" />
                <!-- Sideburns -->
                <path d="M13.8 24 L 15.6 32.5 C 15.6 32.5, 18.5 32.5, 18.5 30 L 16.8 21.5 Z" fill="${hairColor}" />
                <path d="M50.2 24 L 48.4 32.5 C 48.4 32.5, 45.5 32.5, 45.5 30 L 47.2 21.5 Z" fill="${hairColor}" />
                <!-- Textured Fringe Spikes -->
                <path d="M16 23 Q 23 15 32 17 Q 41 15 48 23 Q 32 19 16 23 Z" fill="${hairColor}" />
                <path d="M22 17 Q 26 9 32 11 Q 38 8 42 17 Q 32 13 22 17 Z" fill="${hairColor}" />
                <!-- Hair highlights / strands reflection -->
                <path d="M20 18 Q 28 12 36 14 Q 44 12 46 18" stroke="${hairHighlight}" stroke-width="2.2" stroke-linecap="round" fill="none" opacity="0.8" />
                <path d="M15 22.5 Q 32 16.5 49 22.5" stroke="rgba(0,0,0,0.3)" stroke-width="1.8" fill="none" />
            `;
        } else if (hairStyle === "buzz") {
            hairPath = `
                <!-- Buzz cut with skull contouring and fade texture -->
                <path d="M13.5 27 C 12 11, 52 11, 50.5 27 C 49 15.5, 15 15.5, 13.5 27 Z" fill="${hairColor}" opacity="0.85" />
                <path d="M14.5 25.5 C 13.2 13.5, 50.8 13.5, 49.5 25.5 Z" fill="${hairColor}" opacity="0.4" />
                <!-- Fade sideburn texture -->
                <path d="M13.8 24.5 L 15.5 32 L 17.5 31 L 16.5 22 Z" fill="${hairColor}" opacity="0.55" />
                <path d="M50.2 24.5 L 48.5 32 L 46.5 31 L 47.5 22 Z" fill="${hairColor}" opacity="0.55" />
            `;
        } else if (hairStyle === "curly") {
            hairPath = `
                <!-- Volumetric Curly Hair with individual curls and overlapping shadow paths -->
                <path d="M12 27 C 11.5 10.5, 52.5 10.5, 52 27 Z" fill="${hairColor}" />
                <!-- Curly bumps -->
                <circle cx="15.5" cy="18" r="5" fill="${hairColor}" />
                <circle cx="21.5" cy="14" r="5.5" fill="${hairColor}" />
                <circle cx="28.5" cy="11.5" r="6" fill="${hairColor}" />
                <circle cx="36.5" cy="11.5" r="6" fill="${hairColor}" />
                <circle cx="43.5" cy="14" r="5.5" fill="${hairColor}" />
                <circle cx="48.5" cy="18" r="5" fill="${hairColor}" />
                <circle cx="25.5" cy="16.5" r="5" fill="${hairColor}" />
                <circle cx="32.5" cy="15.5" r="5.5" fill="${hairColor}" />
                <circle cx="39.5" cy="16.5" r="5" fill="${hairColor}" />
                <!-- 3D Curls Shimmering highlights -->
                <circle cx="21" cy="13.5" r="1.8" fill="${hairHighlight}" opacity="0.6" />
                <circle cx="28" cy="10.5" r="2.2" fill="${hairHighlight}" opacity="0.6" />
                <circle cx="36" cy="10.5" r="2.2" fill="${hairHighlight}" opacity="0.6" />
                <circle cx="43" cy="13.5" r="1.8" fill="${hairHighlight}" opacity="0.6" />
                <circle cx="32" cy="14" r="2" fill="${hairHighlight}" opacity="0.6" />
                <!-- Side curls -->
                <circle cx="13.5" cy="24" r="3.8" fill="${hairColor}" />
                <circle cx="50.5" cy="24" r="3.8" fill="${hairColor}" />
            `;
        } else if (hairStyle === "long") {
            hairPath = `
                <!-- Volumetric long hair with detailed strand shading -->
                <path d="M12 28 C 10.5 9, 53.5 9, 52 28 C 53.5 37, 51.5 46.5, 49.5 50.5 C 47.5 42, 47.5 29.5, 46.5 21.5 Z" fill="${hairColor}" />
                <path d="M12 28 C 10.5 37, 12.5 46.5, 14.5 50.5 C 16.5 42, 16.5 29.5, 17.5 21.5 Z" fill="${hairColor}" />
                <!-- Man bun/tie -->
                <circle cx="32" cy="8.5" r="6.8" fill="${hairColor}" />
                <circle cx="32" cy="8.5" r="4.8" fill="${hairHighlight}" opacity="0.4" />
                <circle cx="32" cy="8.5" r="2" fill="#000000" opacity="0.4" />
                <!-- Hair strand lines -->
                <path d="M21 16 Q 32 9.5 43 16" stroke="${hairHighlight}" stroke-width="1.8" fill="none" opacity="0.5" />
                <path d="M15 28 Q 18.5 42.5 16.5 48.5" stroke="${hairHighlight}" stroke-width="1.2" fill="none" opacity="0.3" />
                <path d="M49 28 Q 45.5 42.5 47.5 48.5" stroke="${hairHighlight}" stroke-width="1.2" fill="none" opacity="0.3" />
            `;
        } else if (hairStyle === "none") {
            hairPath = ""; // Bald
        }

        // Beard Styles (Textured vector shapes)
        if (beardStyle === "stubble") {
            beardPath = `
                <!-- High-definition stubble mask with gradient feel -->
                <path d="M15.5 34 C 15.5 50, 48.5 50, 48.5 34 C 48.5 41.5, 42.5 48, 32 48.5 C 21.5 48, 15.5 41.5, 15.5 34 Z" fill="${hairColor}" opacity="0.28" />
                <path d="M25 39.2 Q 32 37.8 39 39.2" stroke="${hairColor}" stroke-width="4.5" stroke-linecap="round" fill="none" opacity="0.20" />
            `;
        } else if (beardStyle === "full") {
            beardPath = `
                <!-- Full beard vector shape with overlapping layers -->
                <path d="M13.5 33.5 C 13.5 53.5, 50.5 53.5, 50.5 33.5 C 47.2 47.5, 41.2 53, 32 53.5 C 22.8 53, 16.8 47.5, 13.5 33.5 Z" fill="${hairColor}" />
                <!-- Mustache overlay -->
                <path d="M22 39 C 23.5 36.5, 40.5 36.5, 42 39 C 43.5 41.5, 40.5 44.5, 32 44.5 C 23.5 44.5, 20.5 41.5, 22 39 Z" fill="${hairColor}" />
                <!-- Mustache highlight lines -->
                <path d="M24 39.2 Q 32 36.8 40 39.2" stroke="${hairHighlight}" stroke-width="1.5" fill="none" opacity="0.6" />
                <!-- Chin dip shadow -->
                <path d="M27.5 45.5 Q 32 47 36.5 45.5" stroke="rgba(0,0,0,0.45)" stroke-width="2.2" fill="none" />
            `;
        } else if (beardStyle === "mustache") {
            beardPath = `
                <!-- Detailed thick mustache -->
                <path d="M21 40 Q 32 36.5 43 40 C 45 42, 42.5 44.2 32 43.8 C 21.5 44.2 19 42 21 40 Z" fill="${hairColor}" />
                <!-- Mustache highlight and styling -->
                <path d="M22.5 40 Q 32 37.8 41.5 40" stroke="${hairHighlight}" stroke-width="1.5" fill="none" opacity="0.6" />
                <path d="M21 40 C 18.5 40.2 18.2 38.5 19.5 37.8 M43 40 C 45.5 40.2 45.8 38.5 44.5 37.8" stroke="${hairColor}" stroke-width="1.8" fill="none" />
            `;
        }

        // Add wrinkles as player ages (with realistic transparent crease lines)
        if (age >= 30 && age < 35) {
            wrinklePath = `
                <path d="M22 22 H 26 M38 22 H 42" stroke="rgba(0,0,0,0.15)" stroke-width="0.8" stroke-linecap="round" />
                <path d="M17.5 31.2 Q 20.5 30.5 22.5 31.2" stroke="rgba(0,0,0,0.12)" stroke-width="0.8" fill="none" />
                <path d="M46.5 31.2 Q 43.5 30.5 41.5 31.2" stroke="rgba(0,0,0,0.12)" stroke-width="0.8" fill="none" />
            `;
        } else if (age >= 35) {
            wrinklePath = `
                <!-- Double forehead lines -->
                <path d="M22 20 Q 32 18 42 20" stroke="rgba(0,0,0,0.16)" fill="none" stroke-width="0.8" stroke-linecap="round" />
                <path d="M24 23 Q 32 21 40 23" stroke="rgba(0,0,0,0.16)" fill="none" stroke-width="0.8" stroke-linecap="round" />
                <!-- Crow's feet under eyes -->
                <path d="M15.5 31.8 C 17.5 32 18.5 33 18.5 34 M15.5 32.5 C 17 33 17.5 34 17.5 35" stroke="rgba(0,0,0,0.18)" fill="none" stroke-width="0.8" />
                <path d="M48.5 31.8 C 46.5 32 45.5 33 45.5 34 M48.5 32.5 C 47 33 46.5 34 46.5 35" stroke="rgba(0,0,0,0.18)" fill="none" stroke-width="0.8" />
                <!-- Nassolabial folds (laugh lines) -->
                <path d="M22.5 37.5 Q 24.5 42.5 27.5 45 M41.5 37.5 Q 39.5 42.5 36.5 45" stroke="rgba(0,0,0,0.18)" fill="none" stroke-width="0.8" />
            `;
            if (hairStyle !== "none") {
                // Gray hair locks at temples
                hairPath += `
                    <path d="M15 24 L 17 19.5 M49 24 L 47 19.5" stroke="#F5F5F5" stroke-width="1.5" stroke-linecap="round" opacity="0.85" />
                    <path d="M14 26 L 15.5 29 M50 26 L 48.5 29" stroke="#E0E0E0" stroke-width="1.2" stroke-linecap="round" opacity="0.7" />
                `;
            }
        }

        let svg = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="100%" height="100%">
            <defs>
                <!-- Background Gradient -->
                <linearGradient id="avatar-bg-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="rgba(255,255,255,0.06)" />
                    <stop offset="100%" stop-color="rgba(255,255,255,0.01)" />
                </linearGradient>
                
                <!-- Skin 3D Gradients -->
                <linearGradient id="skin-main-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stop-color="${palette.highlight}" />
                    <stop offset="45%" stop-color="${palette.base}" />
                    <stop offset="100%" stop-color="${palette.shadow}" />
                </linearGradient>
                <radialGradient id="cheek-blush-left" cx="30%" cy="50%" r="50%">
                    <stop offset="0%" stop-color="${palette.blush}" />
                    <stop offset="100%" stop-color="transparent" stop-opacity="0" />
                </radialGradient>
                <radialGradient id="cheek-blush-right" cx="70%" cy="50%" r="50%">
                    <stop offset="0%" stop-color="${palette.blush}" />
                    <stop offset="100%" stop-color="transparent" stop-opacity="0" />
                </radialGradient>

                <!-- Eye Sclera (White) Gradient for depth -->
                <radialGradient id="sclera-grad" cx="50%" cy="50%" r="50%">
                    <stop offset="70%" stop-color="#ffffff" />
                    <stop offset="100%" stop-color="#e0e0e0" />
                </radialGradient>

                <!-- Eye Iris Radial Gradient -->
                <radialGradient id="iris-grad" cx="45%" cy="45%" r="50%">
                    <stop offset="0%" stop-color="#ffffff" stop-opacity="0.5" />
                    <stop offset="30%" stop-color="${eyeColor}" />
                    <stop offset="100%" stop-color="#050505" />
                </radialGradient>

                <!-- Jersey Shader -->
                <linearGradient id="jersey-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stop-color="${primaryColor}" />
                    <stop offset="50%" stop-color="${primaryColor}" stop-opacity="0.85" />
                    <stop offset="100%" stop-color="${primaryColor}" />
                </linearGradient>
            </defs>

            <!-- Background circle -->
            <circle cx="32" cy="32" r="30" fill="url(#avatar-bg-grad)" stroke="var(--border-glass)" stroke-width="1.5" />
            
            <!-- Shoulders & Jersey with Realistic Curves and Collarbone shadow -->
            <path d="M12 58 C 16 48, 48 48, 52 58 L 55 64 H 9 Z" fill="url(#jersey-grad)" />
            
            <!-- Jersey vertical stripes details -->
            <path d="M22 51 L 20 64 M42 51 L 44 64 M32 52 L 32 64" stroke="${secondaryColor}" stroke-width="2.5" opacity="0.22" stroke-linecap="round" />
            
            <!-- Collarbone / Neck recess shadow -->
            <path d="M22 50 C 26 53, 38 53, 42 50" fill="none" stroke="rgba(0,0,0,0.18)" stroke-width="3" stroke-linecap="round" />

            <!-- Dual V-Collar -->
            <path d="M23 48.5 L 32 55.5 L 41 48.5" stroke="rgba(0,0,0,0.22)" stroke-width="3" fill="none" />
            <path d="M23 48.5 L 32 55.5 L 41 48.5" stroke="${secondaryColor}" stroke-width="1.8" fill="none" />
            
            <!-- Neck & Neck Shadows -->
            <rect x="27" y="41" width="10" height="11" rx="1" fill="${palette.shadow}" />
            <rect x="27" y="41" width="10" height="10" rx="1" fill="url(#skin-main-grad)" />
            <!-- Shadow under the chin -->
            <path d="M27 41 C 29 44.5, 35 44.5, 37 41 Z" fill="rgba(0,0,0,0.2)" />
            
            <!-- Ears with Real Fold Lines -->
            <!-- Left Ear -->
            <path d="M16.5 31.5 C 13.2 31.5, 13.2 38.5, 16.5 38.5 Z" fill="url(#skin-main-grad)" />
            <path d="M16.2 33 C 15 33, 15 37, 16.2 37" stroke="${palette.deepShadow}" stroke-width="1" fill="none" stroke-linecap="round" />
            <!-- Right Ear -->
            <path d="M47.5 31.5 C 50.8 31.5, 50.8 38.5, 47.5 38.5 Z" fill="url(#skin-main-grad)" />
            <path d="M47.8 33 C 49 33, 49 37, 47.8 37" stroke="${palette.deepShadow}" stroke-width="1" fill="none" stroke-linecap="round" />
            
            <!-- Head Shape (Realistic Jawline rather than a simple circle) -->
            <path d="M16 28 C 16 18.5, 48 18.5, 48 28 C 48 37, 43 45.2, 32 47.5 C 21 45.2, 16 37, 16 28 Z" fill="url(#skin-main-grad)" />
            
            <!-- Face 3D Side Shadows (Provides real bone structure feel) -->
            <!-- Jawline and cheek hollows shadow -->
            <path d="M16 28 C 16 37, 21 45.2, 32 47.5 L 32 17 C 21 17, 16 21, 16 28 Z" fill="rgba(0,0,0,0.04)" />
            <!-- Nose and upper brow ridge shadow -->
            <path d="M30 25 L 32 25 L 32 37 L 30 35 Z" fill="rgba(0,0,0,0.06)" />
            
            <!-- Blush / Cheek highlight for life-like skin texture -->
            <ellipse cx="21" cy="35" rx="4" ry="2.2" fill="url(#cheek-blush-left)" />
            <ellipse cx="43" cy="35" rx="4" ry="2.2" fill="url(#cheek-blush-right)" />
            
            <!-- Eyes (Realistic Sclera, Iris, Pupil, and Reflections) -->
            <!-- Left Eye -->
            <ellipse cx="24.5" cy="31" rx="4" ry="2.5" fill="url(#sclera-grad)" />
            <circle cx="24.5" cy="31" r="2.2" fill="url(#iris-grad)" />
            <circle cx="24.5" cy="31" r="1.1" fill="#020202" />
            <circle cx="25.4" cy="30.2" r="0.6" fill="#ffffff" /> <!-- Highlight -->
            <path d="M20.5 31 Q 24.5 28.5 28.5 31" stroke="rgba(0,0,0,0.4)" stroke-width="1.2" fill="none" />
            <!-- Right Eye -->
            <ellipse cx="39.5" cy="31" rx="4" ry="2.5" fill="url(#sclera-grad)" />
            <circle cx="39.5" cy="31" r="2.2" fill="url(#iris-grad)" />
            <circle cx="39.5" cy="31" r="1.1" fill="#020202" />
            <circle cx="40.4" cy="30.2" r="0.6" fill="#ffffff" /> <!-- Highlight -->
            <path d="M35.5 31 Q 39.5 28.5 43.5 31" stroke="rgba(0,0,0,0.4)" stroke-width="1.2" fill="none" />
            
            <!-- Eyebrows (Dynamic curved and thick) -->
            <path d="M19.5 26.8 C 22.5 24.8, 26 26, 28 28" stroke="${hairColor}" stroke-width="2" fill="none" stroke-linecap="round" />
            <path d="M44.5 26.8 C 41.5 24.8, 38 26, 36 28" stroke="${hairColor}" stroke-width="2" fill="none" stroke-linecap="round" />
            
            <!-- Nose (Shaded with bridge and nostril definition) -->
            <path d="M30 26.5 L 30 33.5 Q 32.5 35 34.5 33.5" stroke="${palette.deepShadow}" stroke-width="1.4" fill="none" stroke-linecap="round" />
            <!-- Soft nostril shade -->
            <circle cx="29" cy="33.2" r="0.8" fill="rgba(0,0,0,0.15)" />
            <circle cx="35" cy="33.2" r="0.8" fill="rgba(0,0,0,0.08)" />

            <!-- Mouth / Lips (Realistic 3D vector lips structure) -->
            <!-- Upper Lip -->
            <path d="M26 39.8 Q 32 38.5 38 39.8 C 36 41 28 41 26 39.8 Z" fill="${palette.lipShadow}" />
            <!-- Lower Lip -->
            <path d="M26.2 40.2 C 28.5 43.2, 35.5 43.2, 37.8 40.2 Z" fill="${palette.lip}" />
            <!-- Crease line -->
            <path d="M25.5 40 Q 32 41.2 38.5 40" stroke="rgba(0,0,0,0.32)" stroke-width="1" fill="none" stroke-linecap="round" />
            <!-- Lower Lip reflection shine -->
            <path d="M28.5 41.5 Q 32 42.5 35.5 41.5" stroke="rgba(255,255,255,0.22)" stroke-width="0.8" fill="none" stroke-linecap="round" />
            
            <!-- Chin Cleft / Dimple -->
            <path d="M30.5 44.5 Q 32 45.2 33.5 44.5" stroke="${palette.deepShadow}" stroke-width="1.2" fill="none" stroke-linecap="round" opacity="0.6" />
            
            ${beardPath}
            ${hairPath}
            ${wrinklePath}
        </svg>
        `;
        return svg;
    },

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

        // Eger sezon ortasindaysak (hafta > 1), yeni ligdeki diger takimlarin maclarini gercekci simule et ki sıfırlanma hissi olmasın!
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
                name: "Türkiye E-Spor Ligi",
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
        if (t.name === "Türkiye E-Spor Ligi") {
            opponents = ["Fenerbahçe Esports", "Galatasaray Esports", "Beşiktaş Esports", "BBL Esports", "FUT Esports", "Papara SuperMassive", "Fire Flux Esports", "Eternal Fire", "Dark Passage", "IW Wildcats"];
        } else if (t.name === "EMEA Pro Championship") {
            opponents = ["Fnatic", "G2 Esports", "Natus Navis (NaVi)", "Team Vitality", "Karmine Corp", "Team Liquid", "Team Heretics", "KOI Esports", "FUT Esports", "BBL Esports"];
        } else { // Dünya Şampiyonası
            opponents = ["T1 (Kore)", "Sentinels (ABD)", "Gen.G (Kore)", "EDward Gaming (Çin)", "Paper Rex (Singapur)", "Leviatán (Amerika)", "Fnatic (Avrupa)", "G2 Esports (Avrupa)", "LOUD (Brezilya)", "NRG (ABD)"];
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
        let postMsg = `🎮 ${t.name} (Hafta ${t.stage}/10): ${team.name}, rakibi ${opp} karşısında ${result === "win" ? "muazzam bir galibiyet alarak " + score + " kazandı!" : (result === "draw" ? "dengeli bir oyunla " + score + " berabere kaldı." : "şanssız bir " + score + " mağlubiyet aldı.")}`;
        this.addSocialPost("@atlas_esports", team.name, postMsg);

        // Check if tournament is finished (10 weeks)
        if (t.stage >= 10) {
            const points = t.wins * 3 + t.draws * 1;
            let neededPoints = 22; // For local league
            let prizeMoney = 0;
            let wonTrophy = false;
            let oldName = t.name;

            if (t.name === "Türkiye E-Spor Ligi") {
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
                    t.name = "Dünya Şampiyonası";
                }
            } else { // Dünya Şampiyonası
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
                this.state.trophies.push(`🎮 ${oldName} Şampiyonu (${team.name})`);

                const winPost = `🏆 ŞAMPİYON! E-Spor kulübümüz ${team.name}, ${oldName} turnuvasını zirvede bitirerek şampiyon oldu! Hesabımıza ${prizeMoney.toLocaleString()} € ödül yatırıldı! 🎮🔥`;
                this.addSocialPost("@spor_manset", "Son Dakika", winPost);
                
                alert(`🏆 TEBRİKLER! E-Spor kulübünüz ${team.name}, ${oldName} turnuvasında ŞAMPİYON oldu!\n💰 Ödül: ${prizeMoney.toLocaleString()} € hesabınıza yatırıldı.\n${t.name !== oldName ? "🚀 Bir üst lig olan " + t.name + " turnuvasına yükseldiniz!" : ""}`);
            } else {
                let consolidationPrize = 20000;
                if (oldName === "EMEA Pro Championship") consolidationPrize = 50000;
                else if (oldName === "Dünya Şampiyonası") consolidationPrize = 100000;

                this.state.money += consolidationPrize;
                const failPost = `📢 E-Spor Raporu: ${team.name}, ${oldName} turnuvasını ${points} puanla tamamladı. Şampiyon olamasak da ${consolidationPrize.toLocaleString()} € katılım ödülü kazandık.`;
                this.addSocialPost("@atlas_esports", team.name, failPost);
                
                alert(`📢 Turnuva Bitti! E-Spor kulübünüz ${team.name}, ${oldName} turnuvasını ${points} puanla tamamladı. Şampiyonluk için en az ${neededPoints} puan gerekiyordu.\n💰 Katılım Ödülü: ${consolidationPrize.toLocaleString()} € hesabınıza yatırıldı.\n🔄 Aynı ligde tekrar mücadele edeceksiniz.`);
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
                    case "Üst":
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
            const names = ["İddaa Gurusu", "Vurgun Medya", "Kupon Tuttur", "Kupon Paylaşım"];
            const idx = Math.floor(Math.random() * handles.length);
            
            this.addSocialPost(
                handles[idx],
                names[idx],
                `🚨 BÜYÜK VURGUN! Genç yetenek ${this.state.playerName}, bu hafta oynadığı iddaa kuponuyla tam ${totalWonCoins.toLocaleString()} € kazandı! Servetine servet katıyor! 🤑💸📈`
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
            let fine = Math.round(this.state.money * 0.25 + 2500); // 25% of cash + 2500 € fine
            let lostFollowers = Math.round(this.state.followers * 0.22 + 2000); // 22% of followers unfollow
            let lostFans = 35; // Taraftar sevgisi -35
            let lostTrust = 25; // Hoca güveni -25

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
                `🚨 TFF Duyurusu: ${this.state.playerName}'in kendi ligindeki karşılaşmalara yasa dışı bahis oynadığı saptanmış olup, sporcuya ${fine.toLocaleString()} € para cezası ve 15 resmi müsabakadan men cezası verilmiştir.`
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
    }
};

if (typeof module !== "undefined" && module.exports) {
    module.exports = GAME;
}
