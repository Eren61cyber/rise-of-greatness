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
        careerApps: 0,
        totalEarnings: 0,
        biggestWin: null,
        biggestLoss: null,
        mostEmotionalMatch: null,
        proPassActive: false,
        leagueScorers: []
    },

    saveKey: "soccer_atlas_career_save",
    matchSimulatedThisWeek: false,

    init: function() {
        this.loadGame();
        this.updateUI();
    },

    resetGame: function(customName, startingLeague, startingSalary, startingTrust, hometownCity, hometownDistrict, startingClubName) {
        const startingClub = startingClubName ? DATABASE.AMATEUR_CLUBS.find(c => c.name === startingClubName) : DATABASE.getRandomAmateurClub();
        const pName = customName || "Genç Yetenek";
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
            totalEarnings: 0,
            biggestWin: null,
            biggestLoss: null,
            mostEmotionalMatch: null,
            leagueScorers: [
                // 🔴🔵 TRABZONSPOR (2026/27 Süper Transferler)
                { name: "M. Salah", club: "Trabzonspor", goals: 0, assists: 0, goalRate: 0.58, assistRate: 0.64 },
                { name: "R. Malinovskyi", club: "Trabzonspor", goals: 0, assists: 0, goalRate: 0.38, assistRate: 0.56 },
                { name: "E. Muçi", club: "Trabzonspor", goals: 0, assists: 0, goalRate: 0.44, assistRate: 0.52 },
                { name: "A. Şimşir", club: "Trabzonspor", goals: 0, assists: 0, goalRate: 0.36, assistRate: 0.54 },
                { name: "P. Onuachu", club: "Trabzonspor", goals: 0, assists: 0, goalRate: 0.54, assistRate: 0.20 },
                { name: "E. Vişça", club: "Trabzonspor", goals: 0, assists: 0, goalRate: 0.30, assistRate: 0.55 },

                // 🦅 BEŞİKTAŞ (2026/27 Yıldız Takviyeleri)
                { name: "O. Kökçü", club: "Beşiktaş", goals: 0, assists: 0, goalRate: 0.34, assistRate: 0.66 },
                { name: "L. Trossard", club: "Beşiktaş", goals: 0, assists: 0, goalRate: 0.52, assistRate: 0.58 },
                { name: "R. Silva", club: "Beşiktaş", goals: 0, assists: 0, goalRate: 0.48, assistRate: 0.60 },
                { name: "C. Immobile", club: "Beşiktaş", goals: 0, assists: 0, goalRate: 0.54, assistRate: 0.20 },
                { name: "Gedson Fernandes", club: "Beşiktaş", goals: 0, assists: 0, goalRate: 0.32, assistRate: 0.48 },

                // 🟡🔵 FENERBAHÇE (2026/27 Yeni Hücum Hattı)
                { name: "M. Greenwood", club: "Fenerbahçe", goals: 0, assists: 0, goalRate: 0.56, assistRate: 0.52 },
                { name: "D. Tadic", club: "Fenerbahçe", goals: 0, assists: 0, goalRate: 0.34, assistRate: 0.68 },
                { name: "V. Muriqi", club: "Fenerbahçe", goals: 0, assists: 0, goalRate: 0.52, assistRate: 0.22 },
                { name: "A. Talisca", club: "Fenerbahçe", goals: 0, assists: 0, goalRate: 0.50, assistRate: 0.44 },
                { name: "Y. En-Nesyri", club: "Fenerbahçe", goals: 0, assists: 0, goalRate: 0.50, assistRate: 0.20 },
                { name: "S. Szymanski", club: "Fenerbahçe", goals: 0, assists: 0, goalRate: 0.36, assistRate: 0.48 },

                // 🟡🔴 GALATASARAY (2026/27 Şampiyon Kadro)
                { name: "V. Osimhen", club: "Galatasaray", goals: 0, assists: 0, goalRate: 0.62, assistRate: 0.26 },
                { name: "G. Sara", club: "Galatasaray", goals: 0, assists: 0, goalRate: 0.32, assistRate: 0.65 },
                { name: "M. Icardi", club: "Galatasaray", goals: 0, assists: 0, goalRate: 0.56, assistRate: 0.22 },
                { name: "D. Mertens", club: "Galatasaray", goals: 0, assists: 0, goalRate: 0.36, assistRate: 0.52 },
                { name: "B. A. Yılmaz", club: "Galatasaray", goals: 0, assists: 0, goalRate: 0.42, assistRate: 0.46 },

                // 🟠 DİĞER SÜPER LİG YILDIZLARI (2026/27)
                { name: "K. Piatek", club: "Başakşehir", goals: 0, assists: 0, goalRate: 0.50, assistRate: 0.18 },
                { name: "Deniz Türüç", club: "Başakşehir", goals: 0, assists: 0, goalRate: 0.28, assistRate: 0.54 },
                { name: "O. Ntcham", club: "Samsunspor", goals: 0, assists: 0, goalRate: 0.36, assistRate: 0.48 },
                { name: "Rômulo", club: "Göztepe", goals: 0, assists: 0, goalRate: 0.46, assistRate: 0.38 },
                { name: "Mame Thiam", club: "Eyüpspor", goals: 0, assists: 0, goalRate: 0.44, assistRate: 0.30 },
                { name: "Emre Akbaba", club: "Eyüpspor", goals: 0, assists: 0, goalRate: 0.34, assistRate: 0.46 }
            ],
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

            // 🔥 Hot Streak & Weekly Missions
            hotStreak: 0,           // +1 per 7.0+ rated match; reset on poor match
            hotStreakBadRun: 0,     // +1 per <5.5 rated match; reset on good match
            weeklyMissions: [],     // Array of {id, desc, target, progress, done, reward}
            weeklyMissionsWeek: 0,  // Which week missions were generated for

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
        this.initLeagueScorers(true);
        this.saveGame();
        this.updateUI();
    },

    saveGame: function() {
        localStorage.setItem(this.saveKey, JSON.stringify(this.state));
        console.log("Game state successfully saved!");
    },

    // ═══════════════════════════════════════════════════════
    // 🎯 HAFTALIK GÖREVLER (Weekly Mission System)
    // ═══════════════════════════════════════════════════════
    generateWeeklyMissions: function() {
        const s = this.state;
        const week = s.currentWeek;
        if (s.weeklyMissionsWeek === week) return; // Already generated this week
        s.weeklyMissionsWeek = week;

        const allMissions = [
            { id: "score1",    desc: "Bu hafta en az 1 gol at",           type: "goals",   target: 1, reward: { money: 25000, followers: 2000 }, rewardText: "+25.000 € + 2.000 Takipçi" },
            { id: "score2",    desc: "Bu hafta en az 2 gol at",           type: "goals",   target: 2, reward: { money: 50000, followers: 5000 }, rewardText: "+50.000 € + 5.000 Takipçi" },
            { id: "hattrick",  desc: "Hat-trick yap (3 gol)!",            type: "goals",   target: 3, reward: { money: 100000, followers: 15000 }, rewardText: "+100.000 € + 15.000 Takipçi" },
            { id: "assist1",   desc: "Bu hafta en az 1 asist yap",        type: "assists", target: 1, reward: { money: 20000, followers: 1500 }, rewardText: "+20.000 € + 1.500 Takipçi" },
            { id: "assist2",   desc: "Bu hafta en az 2 asist yap",        type: "assists", target: 2, reward: { money: 40000, followers: 4000 }, rewardText: "+40.000 € + 4.000 Takipçi" },
            { id: "rating8",   desc: "Maçtan 8.0+ puan al",              type: "rating",  target: 8.0, reward: { money: 30000, followers: 3000 }, rewardText: "+30.000 € + 3.000 Takipçi" },
            { id: "rating9",   desc: "Maçtan 9.0+ puan al",              type: "rating",  target: 9.0, reward: { money: 80000, followers: 10000 }, rewardText: "+80.000 € + 10.000 Takipçi" },
            { id: "winmatch",  desc: "Bu hafta galip gel",                type: "win",     target: 1, reward: { money: 15000, followers: 1000 }, rewardText: "+15.000 € + 1.000 Takipçi" },
            { id: "kondisyon", desc: "Kondisyonunu %70 üzerinde tut",    type: "kondisyon", target: 70, reward: { money: 10000 }, rewardText: "+10.000 €" },
            { id: "goal_assist", desc: "Aynı maçta gol + asist yap",     type: "goalAssist", target: 1, reward: { money: 60000, followers: 8000 }, rewardText: "+60.000 € + 8.000 Takipçi" },
        ];

        // Pick 3 random unique missions (weighted toward easier ones early on)
        const shuffled = allMissions.sort(() => Math.random() - 0.5);
        s.weeklyMissions = shuffled.slice(0, 3).map(m => ({
            ...m,
            progress: 0,
            done: false
        }));
    },

    // ═══════════════════════════════════════════════════════
    // 🔄 UPDATE MISSIONS & HOT STREAK AFTER MATCH
    // ═══════════════════════════════════════════════════════
    updateMissionsAfterMatch: function(goals, assists, rating, won) {
        const s = this.state;

        // Update hot streak
        if (rating >= 7.0) {
            s.hotStreak = (s.hotStreak || 0) + 1;
            s.hotStreakBadRun = 0;
        } else if (rating < 5.5) {
            s.hotStreakBadRun = (s.hotStreakBadRun || 0) + 1;
            if (s.hotStreakBadRun >= 2) {
                s.hotStreak = 0;
            }
        } else {
            // Mediocre - don't break streak but don't extend it
        }

        // Update weekly missions progress
        if (!s.weeklyMissions || s.weeklyMissions.length === 0) {
            this.generateWeeklyMissions();
        }
        let missionCompleted = false;
        s.weeklyMissions.forEach(m => {
            if (m.done) return;
            switch (m.type) {
                case "goals":       m.progress = Math.min(m.target, (m.progress || 0) + goals); break;
                case "assists":     m.progress = Math.min(m.target, (m.progress || 0) + assists); break;
                case "rating":      if (rating >= m.target) m.progress = m.target; break;
                case "win":         if (won) m.progress = m.target; break;
                case "kondisyon":   if (s.kondisyon >= m.target) m.progress = m.target; break;
                case "goalAssist":  if (goals >= 1 && assists >= 1) m.progress = m.target; break;
            }
            if (m.progress >= m.target && !m.done) {
                m.done = true;
                missionCompleted = true;
                // Grant reward
                if (m.reward.money) s.money += m.reward.money;
                if (m.reward.followers) s.followers += m.reward.followers;
            }
        });
        return missionCompleted;
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
                 if (typeof this.state.familyStoryStage === "undefined") {
                      this.state.familyStoryStage = 0;
                  }
                  if (!this.state.leagueTable || this.state.leagueTable.length === 0) {
                      this.initLeagueTable();
                      this.saveGame();
                  }

                  // Automatically match scorers to the current active league
                  this.initLeagueScorers(false);
                  
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
                if (this.state.avatarImage) {
                    delete this.state.avatarImage;
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

        // Krallık Simülasyonu
        this.simulateLeagueScorers();

        this.saveGame();
        this.updateUI();
    },

    simulateLeagueScorers: function() {
        if (!this.state.leagueScorers || !Array.isArray(this.state.leagueScorers)) return;
        this.state.leagueScorers.forEach(scorer => {
            const gRate = scorer.goalRate || 0.40;
            const aRate = scorer.assistRate || 0.35;

            // Realistic weekly goal chance
            let rG = Math.random();
            if (rG < (gRate * 0.15)) {
                scorer.goals += 2; // Brace
            } else if (rG < (gRate * 0.75)) {
                scorer.goals += 1;
            }

            // Realistic weekly assist chance
            let rA = Math.random();
            if (rA < (aRate * 0.16)) {
                scorer.assists += 2; // Double assist masterclass
            } else if (rA < (aRate * 0.78)) {
                scorer.assists += 1;
            }
        });
    },

    getClubSalaryAndVal: function() {
        let val = DATABASE.calculateValue(this.state.rating, this.state.age);
        let sal = DATABASE.calculateSalary(this.state.rating, val, this.state.currentLeague);
        return { val, sal };
    },

    isTransferWindowActive: function() {
        const w = this.state.currentWeek;
        // Ara Transfer Dönemi: 14 - 21. haftalar arası
        // Yaz Transfer Dönemi: 37. hafta (sezon sonu)
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
        
        let pNameStr = this.state.playerName;
        if (this.state.proPassActive) {
            pNameStr += ` <span style="background:var(--accent-yellow); color:black; font-size:10px; padding:2px 4px; border-radius:4px; font-weight:bold;">PRO</span>`;
        }

        const bindings = {
            "player-name": pNameStr,
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
            "career-total-goals": this.state.careerGoals,
            "career-total-assists": this.state.careerAssists,
            "career-total-earnings": this.state.totalEarnings ? this.state.totalEarnings.toLocaleString() : "0",
            "career-biggest-win": this.state.biggestWin || "Yok",
            "career-biggest-loss": this.state.biggestLoss || "Yok",
            "career-emotional-match": this.state.mostEmotionalMatch || "Kariyerinde henüz unutulmaz bir dram yaşanmadı.",
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

        // 4 Category Aggregation Stats (Matching competitor layout: TEKNİK, FİZİKSEL, ZİHİNSEL, SAVUNMA)
        const tekVal = Math.round(((this.state.shooting || 50) + (this.state.dribbling || 50) + (this.state.passing || 50)) / 3);
        const fizVal = Math.round(((this.state.speed || 50) + (this.state.physical || 50) + (this.state.kondisyon || 100)) / 3);
        const zihVal = Math.round(((this.state.hocaGuveni || 40) + (this.state.takimUyumu || 50) + (this.state.moral || 75)) / 3);
        const savVal = Math.round(this.state.defense || 50);

        bindings["cat-teknik"] = tekVal;
        bindings["cat-fiziksel"] = fizVal;
        bindings["cat-zihinsel"] = zihVal;
        bindings["cat-savunma"] = savVal;
        bindings["stat-fame"] = Math.floor((this.state.followers || 0) / 1000);

        for (let id in bindings) {
            const el = document.getElementById(id);
            if (el) {
                if (id === "player-name") el.innerHTML = bindings[id];
                else el.innerText = bindings[id];
            }
            const elements = document.querySelectorAll(".bind-" + id);
            elements.forEach(item => {
                if (id === "player-name") item.innerHTML = bindings[id];
                else item.innerText = bindings[id];
            });
        }

        // Render Diamond Radar Chart Points
        const radarPolygon = document.getElementById("radar-chart-polygon");
        if (radarPolygon) {
            // Radar center = (50, 50), max radius = 40
            // Top: TEK, Right: FİZ, Bottom: ZİH, Left: SAV
            const topR = (tekVal / 100) * 40;
            const rightR = (fizVal / 100) * 40;
            const bottomR = (zihVal / 100) * 40;
            const leftR = (savVal / 100) * 40;

            const pTop = `50,${50 - topR}`;
            const pRight = `${50 + rightR},50`;
            const pBottom = `50,${50 + bottomR}`;
            const pLeft = `${50 - leftR},50`;

            radarPolygon.setAttribute("points", `${pTop} ${pRight} ${pBottom} ${pLeft}`);
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

        if (typeof renderLeagueScorers === "function") {
            renderLeagueScorers();
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
        if (typeof renderEsportsPanel === "function") {
            const container = document.getElementById("shop-esports-container");
            if (container && container.style.display !== "none") {
                renderEsportsPanel();
            }
        }
        if (typeof updateHomeNewsPreview === "function") {
            updateHomeNewsPreview();
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
            
            // Update Left Sidebar - Form Badges & Mini Scorers
            const formBadgesEl = document.getElementById("sidebar-form-badges");
            if (formBadgesEl) {
                // If match history exists, show actual last matches, else balanced form
                let recentForm = ["G", "G", "B", "G", "G"];
                if (this.state.seasonGoals > 5) recentForm = ["G", "G", "G", "B", "G"];
                else if (this.state.moral < 50) recentForm = ["M", "B", "G", "M", "B"];
                
                formBadgesEl.innerHTML = recentForm.map(res => {
                    let bg = res === "G" ? "#10b981" : (res === "B" ? "#f59e0b" : "#ef4444");
                    let col = res === "M" ? "#ffffff" : "#04140e";
                    return `<span style="display:inline-flex; width:18px; height:18px; border-radius:4px; background:${bg}; color:${col}; font-size:9.5px; font-weight:900; align-items:center; justify-content:center;">${res}</span>`;
                }).join("");
            }

            const miniScorersEl = document.getElementById("sidebar-mini-scorers");
            if (miniScorersEl && this.state.leagueScorers && this.state.leagueScorers.length > 0) {
                let allScorers = [...this.state.leagueScorers, { name: this.state.playerName, club: this.state.currentClub, goals: this.state.seasonGoals || 0, isPlayer: true }];
                allScorers.sort((a, b) => b.goals - a.goals);
                
                miniScorersEl.innerHTML = allScorers.slice(0, 3).map((s, idx) => {
                    let medal = idx === 0 ? "🥇" : (idx === 1 ? "🥈" : "🥉");
                    let isPl = s.isPlayer ? "color: #10b981; font-weight:bold;" : "color: #f8fafc;";
                    return `
                        <div style="display:flex; justify-content:space-between; align-items:center; padding: 4px 6px; background: rgba(255,255,255,0.02); border-radius: 6px; border: 1px solid #1e2530;">
                            <span style="font-size: 11px; ${isPl}">${medal} ${s.name} <small style="color:var(--text-muted); font-size:9.5px;">(${s.club})</small></span>
                            <span style="color: #10b981; font-weight: 800; font-family: var(--font-heading); font-size:12px;">${s.goals} G</span>
                        </div>
                    `;
                }).join("");
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
            
            // Update Right Sidebar - Multi-Tweet Social Feed Widget
            const sidebarSocial = document.getElementById("sidebar-social-container");
            if (sidebarSocial) {
                let postsToRender = (this.state.socialFeed && this.state.socialFeed.length > 0) ? this.state.socialFeed.slice(0, 3) : [
                    { handle: "@futbol_analiz", name: "Futbol Analiz", text: `${this.state.playerName} bu sezon sergilediği performansla ligin en çok konuşulan genç yıldızı haline geldi! ⚡`, time: "10d" },
                    { handle: "@taraftar_sesi", name: "Tribün Sesi", text: `${this.state.currentClub} taraftarları ${this.state.playerName}'in formasını almak için sıraya girdi! ⚽🔥`, time: "35d" },
                    { handle: "@transfer_merkezi", name: "Transfer Nöbeti", text: `Scout ekipleri ${this.state.playerName}'i yakından izlemeye devam ediyor. 📋👀`, time: "2s" }
                ];

                sidebarSocial.innerHTML = "";
                postsToRender.forEach(post => {
                    sidebarSocial.innerHTML += `
                        <div class="sidebar-post" style="padding: 10px; border-radius: 8px; background: rgba(255,255,255,0.02); border: 1px solid #1e2530; display: flex; flex-direction: column; gap: 4px;">
                            <div class="sidebar-post-header" style="display:flex; justify-content:space-between; font-size:11px;">
                                <span style="font-weight:700; color:#f8fafc;">${post.name || post.handle} <small style="color:var(--text-muted); font-weight:normal;">${post.handle}</small></span>
                                <span style="color: var(--text-muted); font-size: 9.5px;">${post.time || 'Yeni'}</span>
                            </div>
                            <div style="color: #cbd5e1; font-size: 11px; line-height: 1.35;">${post.text}</div>
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

        // Stats for the modal before reset
        const seasonStats = {
            goals: this.state.seasonGoals,
            assists: this.state.seasonAssists,
            apps: this.state.seasonApps || Math.round((this.state.seasonGoals + this.state.seasonAssists) * 1.5) || 34,
            emotionalMatch: this.state.mostEmotionalMatch || "Bu sezon olağanüstü bir dram yaşanmadı."
        };

        // Reset season stats
        this.state.seasonGoals = 0;
        this.state.seasonAssists = 0;
        this.state.seasonApps = 0;
        this.state.mostEmotionalMatch = null;
        this.state.currentWeek = 1;
        
        // Reset league table & scorers for the current league
        this.initLeagueTable();
        this.initLeagueScorers(true);
        this.state.nextOpponentName = null; 
        
        this.saveGame();
        this.updateUI();

        if (window.showSeasonSummaryModal) {
            window.showSeasonSummaryModal(title, message, seasonStats);
        } else {
            alert(`Sezon sona erdi! Yaşın ${this.state.age} oldu. Ligi ${rank}. sırada tamamladın.`);
        }
    },

    LEAGUE_SCORERS_POOLS: {
        "3. Lig": [
            { name: "Batuhan Doğrukartal", club: "İnegöl Kafkasspor", goals: 0, assists: 0, goalRate: 0.50, assistRate: 0.22 },
            { name: "Semih Akyıldız", club: "İnegöl Kafkasspor", goals: 0, assists: 0, goalRate: 0.28, assistRate: 0.52 },
            { name: "Can M. Vural", club: "Kütahyaspor", goals: 0, assists: 0, goalRate: 0.52, assistRate: 0.20 },
            { name: "H. İ. Pekşen", club: "Kütahyaspor", goals: 0, assists: 0, goalRate: 0.30, assistRate: 0.54 },
            { name: "Ercan Kuruçay", club: "Eskişehirspor", goals: 0, assists: 0, goalRate: 0.54, assistRate: 0.24 },
            { name: "Barış Memiş", club: "Eskişehirspor", goals: 0, assists: 0, goalRate: 0.32, assistRate: 0.58 },
            { name: "İshak Kurt", club: "Karşıyaka", goals: 0, assists: 0, goalRate: 0.56, assistRate: 0.20 },
            { name: "Enes Nalbantoğlu", club: "Karşıyaka", goals: 0, assists: 0, goalRate: 0.35, assistRate: 0.55 },
            { name: "Cenk Ahmet", club: "Karşıyaka", goals: 0, assists: 0, goalRate: 0.28, assistRate: 0.50 },
            { name: "Yasin Abdioğlu", club: "Çorlu Spor 1947", goals: 0, assists: 0, goalRate: 0.48, assistRate: 0.22 },
            { name: "Ali Habeşoğlu", club: "Ayvalıkgücü", goals: 0, assists: 0, goalRate: 0.46, assistRate: 0.32 },
            { name: "Tugay Keleş", club: "Ayvalıkgücü", goals: 0, assists: 0, goalRate: 0.30, assistRate: 0.48 },
            { name: "Artun Akçakın", club: "Balıkesirspor", goals: 0, assists: 0, goalRate: 0.48, assistRate: 0.25 },
            { name: "Sedat Y. Kurnaz", club: "Balıkesirspor", goals: 0, assists: 0, goalRate: 0.28, assistRate: 0.50 }
        ],
        "2. Lig": [
            { name: "Atabey Çiçek", club: "Batman Petrolspor", goals: 0, assists: 0, goalRate: 0.54, assistRate: 0.20 },
            { name: "Mert Çapar", club: "Batman Petrolspor", goals: 0, assists: 0, goalRate: 0.34, assistRate: 0.56 },
            { name: "Beykan Şimşek", club: "Elazığspor", goals: 0, assists: 0, goalRate: 0.45, assistRate: 0.58 },
            { name: "Bahattin Köse", club: "Elazığspor", goals: 0, assists: 0, goalRate: 0.52, assistRate: 0.22 },
            { name: "Kerim Frei", club: "Elazığspor", goals: 0, assists: 0, goalRate: 0.38, assistRate: 0.55 },
            { name: "İlker Avşar", club: "Muğlaspor", goals: 0, assists: 0, goalRate: 0.48, assistRate: 0.24 },
            { name: "Yakup Alkan", club: "Muşspor", goals: 0, assists: 0, goalRate: 0.50, assistRate: 0.20 },
            { name: "Serdar Deliktaş", club: "Mardin 1969", goals: 0, assists: 0, goalRate: 0.46, assistRate: 0.30 },
            { name: "Samet Bulut", club: "Aliağa", goals: 0, assists: 0, goalRate: 0.48, assistRate: 0.25 },
            { name: "Ali Han Tunçer", club: "Aliağa", goals: 0, assists: 0, goalRate: 0.30, assistRate: 0.52 },
            { name: "Mehmet Gürkan", club: "Adana 01 FK", goals: 0, assists: 0, goalRate: 0.46, assistRate: 0.28 },
            { name: "Enes Karakuş", club: "1461 Trabzon", goals: 0, assists: 0, goalRate: 0.50, assistRate: 0.22 },
            { name: "Buğrahan Karslı", club: "1461 Trabzon", goals: 0, assists: 0, goalRate: 0.28, assistRate: 0.54 }
        ],
        "1. Lig": [
            { name: "Ryan Mendes", club: "Kocaeli FK", goals: 0, assists: 0, goalRate: 0.52, assistRate: 0.58 },
            { name: "M. Beridze", club: "Kocaeli FK", goals: 0, assists: 0, goalRate: 0.42, assistRate: 0.50 },
            { name: "Eren Tozlu", club: "Erzurumspor", goals: 0, assists: 0, goalRate: 0.56, assistRate: 0.22 },
            { name: "G. Rosheuvel", club: "Erzurumspor", goals: 0, assists: 0, goalRate: 0.34, assistRate: 0.56 },
            { name: "B. Assombalonga", club: "Amed", goals: 0, assists: 0, goalRate: 0.55, assistRate: 0.20 },
            { name: "Max Gradel", club: "Amed", goals: 0, assists: 0, goalRate: 0.38, assistRate: 0.62 },
            { name: "Çekdar Orhan", club: "Amed", goals: 0, assists: 0, goalRate: 0.32, assistRate: 0.58 },
            { name: "Thomas Verheydt", club: "Çorum", goals: 0, assists: 0, goalRate: 0.54, assistRate: 0.18 },
            { name: "Geraldo", club: "Çorum", goals: 0, assists: 0, goalRate: 0.34, assistRate: 0.55 },
            { name: "Gökdeniz Bayrakdar", club: "Bodrum", goals: 0, assists: 0, goalRate: 0.48, assistRate: 0.35 },
            { name: "Yonathan Del Valle", club: "Pendikspor", goals: 0, assists: 0, goalRate: 0.50, assistRate: 0.45 },
            { name: "Emeka Eze", club: "Pendikspor", goals: 0, assists: 0, goalRate: 0.52, assistRate: 0.20 },
            { name: "Adrien Regattin", club: "Iğdır FK", goals: 0, assists: 0, goalRate: 0.40, assistRate: 0.64 }
        ],
        "Süper Lig": [
            // 🔴🔵 TRABZONSPOR (2026/27)
            { name: "M. Salah", club: "Trabzon FK", goals: 0, assists: 0, goalRate: 0.62, assistRate: 0.65 },
            { name: "R. Malinovskyi", club: "Trabzon FK", goals: 0, assists: 0, goalRate: 0.42, assistRate: 0.58 },
            { name: "E. Muçi", club: "Trabzon FK", goals: 0, assists: 0, goalRate: 0.46, assistRate: 0.54 },
            { name: "P. Onuachu", club: "Trabzon FK", goals: 0, assists: 0, goalRate: 0.56, assistRate: 0.20 },
            { name: "A. Şimşir", club: "Trabzon FK", goals: 0, assists: 0, goalRate: 0.38, assistRate: 0.50 },

            // 🦅 BEŞİKTAŞ (2026/27)
            { name: "L. Trossard", club: "Kartal FK", goals: 0, assists: 0, goalRate: 0.58, assistRate: 0.55 },
            { name: "Semih Kılıçsoy", club: "Kartal FK", goals: 0, assists: 0, goalRate: 0.54, assistRate: 0.35 },
            { name: "O. Kökçü", club: "Kartal FK", goals: 0, assists: 0, goalRate: 0.38, assistRate: 0.68 },
            { name: "Gedson Fernandes", club: "Kartal FK", goals: 0, assists: 0, goalRate: 0.34, assistRate: 0.52 },
            { name: "Salih Özcan", club: "Kartal FK", goals: 0, assists: 0, goalRate: 0.28, assistRate: 0.50 },

            // 🟡🔵 FENERBAHÇE (2026/27)
            { name: "M. Greenwood", club: "Fenerbaçe FK", goals: 0, assists: 0, goalRate: 0.60, assistRate: 0.54 },
            { name: "A. Talisca", club: "Fenerbaçe FK", goals: 0, assists: 0, goalRate: 0.55, assistRate: 0.48 },
            { name: "V. Muriqi", club: "Fenerbaçe FK", goals: 0, assists: 0, goalRate: 0.54, assistRate: 0.22 },
            { name: "S. Szymanski", club: "Fenerbaçe FK", goals: 0, assists: 0, goalRate: 0.38, assistRate: 0.52 },
            { name: "Fred", club: "Fenerbaçe FK", goals: 0, assists: 0, goalRate: 0.32, assistRate: 0.60 },
            { name: "İrfan Can Kahveci", club: "Fenerbaçe FK", goals: 0, assists: 0, goalRate: 0.40, assistRate: 0.56 },

            // 🟡🔴 GALATASARAY (2026/27)
            { name: "V. Osimhen", club: "Galatastar", goals: 0, assists: 0, goalRate: 0.68, assistRate: 0.28 },
            { name: "M. Icardi", club: "Galatastar", goals: 0, assists: 0, goalRate: 0.58, assistRate: 0.24 },
            { name: "G. Sara", club: "Galatastar", goals: 0, assists: 0, goalRate: 0.36, assistRate: 0.68 },
            { name: "İlkay Gündoğan", club: "Galatastar", goals: 0, assists: 0, goalRate: 0.35, assistRate: 0.65 },
            { name: "B. A. Yılmaz", club: "Galatastar", goals: 0, assists: 0, goalRate: 0.48, assistRate: 0.48 },
            { name: "R. Sallai", club: "Galatastar", goals: 0, assists: 0, goalRate: 0.40, assistRate: 0.45 },
            { name: "M. Batshuayi", club: "Galatastar", goals: 0, assists: 0, goalRate: 0.50, assistRate: 0.20 },

            // 🟠 DİĞER SÜPER LİG YILDIZLARI (2026/27)
            { name: "K. Piatek", club: "Başakşehir FK", goals: 0, assists: 0, goalRate: 0.52, assistRate: 0.18 },
            { name: "Deniz Türüç", club: "Başakşehir FK", goals: 0, assists: 0, goalRate: 0.30, assistRate: 0.56 },
            { name: "O. Ntcham", club: "Samsun FK", goals: 0, assists: 0, goalRate: 0.38, assistRate: 0.50 },
            { name: "Rômulo", club: "Göztepe FK", goals: 0, assists: 0, goalRate: 0.48, assistRate: 0.38 },
            { name: "Mame Thiam", club: "Eyüpspor FK", goals: 0, assists: 0, goalRate: 0.46, assistRate: 0.30 },
            { name: "Emre Akbaba", club: "Eyüpspor FK", goals: 0, assists: 0, goalRate: 0.35, assistRate: 0.48 }
        ],
        "Premier League": [
            { name: "E. Haaland", club: "Manchester City", goals: 0, assists: 0, goalRate: 0.72, assistRate: 0.22 },
            { name: "K. De Bruyne", club: "Manchester City", goals: 0, assists: 0, goalRate: 0.32, assistRate: 0.75 },
            { name: "P. Foden", club: "Manchester City", goals: 0, assists: 0, goalRate: 0.52, assistRate: 0.56 },
            { name: "B. Saka", club: "Arsenal", goals: 0, assists: 0, goalRate: 0.48, assistRate: 0.62 },
            { name: "Darwin Núñez", club: "Liverpool", goals: 0, assists: 0, goalRate: 0.58, assistRate: 0.35 },
            { name: "Cody Gakpo", club: "Liverpool", goals: 0, assists: 0, goalRate: 0.50, assistRate: 0.48 },
            { name: "L. Diaz", club: "Liverpool", goals: 0, assists: 0, goalRate: 0.48, assistRate: 0.45 },
            { name: "C. Palmer", club: "Chelsea", goals: 0, assists: 0, goalRate: 0.58, assistRate: 0.60 },
            { name: "N. Jackson", club: "Chelsea", goals: 0, assists: 0, goalRate: 0.48, assistRate: 0.25 },
            { name: "A. Isak", club: "Newcastle", goals: 0, assists: 0, goalRate: 0.58, assistRate: 0.20 },
            { name: "H. Son", club: "Tottenham", goals: 0, assists: 0, goalRate: 0.52, assistRate: 0.48 },
            { name: "B. Fernandes", club: "Manchester United", goals: 0, assists: 0, goalRate: 0.36, assistRate: 0.66 },
            { name: "O. Watkins", club: "Aston Villa", goals: 0, assists: 0, goalRate: 0.54, assistRate: 0.44 }
        ],
        "La Liga": [
            { name: "K. Mbappé", club: "Real Madrid", goals: 0, assists: 0, goalRate: 0.74, assistRate: 0.42 },
            { name: "Vinícius Jr.", club: "Real Madrid", goals: 0, assists: 0, goalRate: 0.60, assistRate: 0.64 },
            { name: "J. Bellingham", club: "Real Madrid", goals: 0, assists: 0, goalRate: 0.52, assistRate: 0.56 },
            { name: "Rodrygo", club: "Real Madrid", goals: 0, assists: 0, goalRate: 0.46, assistRate: 0.50 },
            { name: "R. Lewandowski", club: "Barcelona", goals: 0, assists: 0, goalRate: 0.65, assistRate: 0.22 },
            { name: "L. Yamal", club: "Barcelona", goals: 0, assists: 0, goalRate: 0.44, assistRate: 0.72 },
            { name: "Raphinha", club: "Barcelona", goals: 0, assists: 0, goalRate: 0.54, assistRate: 0.60 },
            { name: "Dani Olmo", club: "Barcelona", goals: 0, assists: 0, goalRate: 0.45, assistRate: 0.54 },
            { name: "A. Griezmann", club: "Atletico Madrid", goals: 0, assists: 0, goalRate: 0.52, assistRate: 0.58 },
            { name: "J. Álvarez", club: "Atletico Madrid", goals: 0, assists: 0, goalRate: 0.55, assistRate: 0.35 },
            { name: "N. Williams", club: "Athletic Club", goals: 0, assists: 0, goalRate: 0.42, assistRate: 0.60 },
            { name: "A. Perez", club: "Villarreal", goals: 0, assists: 0, goalRate: 0.50, assistRate: 0.25 }
        ],
        "Serie A": [
            { name: "L. Martínez", club: "Inter Milan", goals: 0, assists: 0, goalRate: 0.64, assistRate: 0.32 },
            { name: "M. Thuram", club: "Inter Milan", goals: 0, assists: 0, goalRate: 0.54, assistRate: 0.48 },
            { name: "H. Çalhanoğlu", club: "Inter Milan", goals: 0, assists: 0, goalRate: 0.36, assistRate: 0.65 },
            { name: "R. Leão", club: "AC Milan", goals: 0, assists: 0, goalRate: 0.50, assistRate: 0.58 },
            { name: "C. Pulisic", club: "AC Milan", goals: 0, assists: 0, goalRate: 0.48, assistRate: 0.46 },
            { name: "D. Vlahović", club: "Juventus", goals: 0, assists: 0, goalRate: 0.58, assistRate: 0.18 },
            { name: "K. Kvaratskhelia", club: "Napoli", goals: 0, assists: 0, goalRate: 0.50, assistRate: 0.60 },
            { name: "R. Lukaku", club: "Napoli", goals: 0, assists: 0, goalRate: 0.56, assistRate: 0.30 },
            { name: "A. Lookman", club: "Atalanta", goals: 0, assists: 0, goalRate: 0.54, assistRate: 0.46 },
            { name: "M. Retegui", club: "Atalanta", goals: 0, assists: 0, goalRate: 0.58, assistRate: 0.20 },
            { name: "P. Dybala", club: "Roma", goals: 0, assists: 0, goalRate: 0.46, assistRate: 0.54 }
        ],
        "Bundesliga": [
            { name: "H. Kane", club: "Bayern Münih", goals: 0, assists: 0, goalRate: 0.74, assistRate: 0.42 },
            { name: "J. Musiala", club: "Bayern Münih", goals: 0, assists: 0, goalRate: 0.52, assistRate: 0.60 },
            { name: "M. Olise", club: "Bayern Münih", goals: 0, assists: 0, goalRate: 0.48, assistRate: 0.58 },
            { name: "F. Wirtz", club: "Bayer Leverkusen", goals: 0, assists: 0, goalRate: 0.50, assistRate: 0.70 },
            { name: "V. Boniface", club: "Bayer Leverkusen", goals: 0, assists: 0, goalRate: 0.58, assistRate: 0.24 },
            { name: "J. Frimpong", club: "Bayer Leverkusen", goals: 0, assists: 0, goalRate: 0.38, assistRate: 0.58 },
            { name: "S. Guirassy", club: "Borussia Dortmund", goals: 0, assists: 0, goalRate: 0.62, assistRate: 0.20 },
            { name: "J. Brandt", club: "Borussia Dortmund", goals: 0, assists: 0, goalRate: 0.35, assistRate: 0.64 },
            { name: "L. Openda", club: "RB Leipzig", goals: 0, assists: 0, goalRate: 0.58, assistRate: 0.28 },
            { name: "X. Simons", club: "RB Leipzig", goals: 0, assists: 0, goalRate: 0.44, assistRate: 0.64 },
            { name: "D. Undav", club: "Stuttgart", goals: 0, assists: 0, goalRate: 0.54, assistRate: 0.36 },
            { name: "E. Demirović", club: "Stuttgart", goals: 0, assists: 0, goalRate: 0.50, assistRate: 0.22 },
            { name: "O. Marmoush", club: "Eintracht Frankfurt", goals: 0, assists: 0, goalRate: 0.60, assistRate: 0.50 }
        ],
        "Ligue 1": [
            { name: "O. Dembélé", club: "PSG", goals: 0, assists: 0, goalRate: 0.40, assistRate: 0.72 },
            { name: "B. Barcola", club: "PSG", goals: 0, assists: 0, goalRate: 0.56, assistRate: 0.50 },
            { name: "Vitinha", club: "PSG", goals: 0, assists: 0, goalRate: 0.34, assistRate: 0.60 },
            { name: "R. Kolo Muani", club: "PSG", goals: 0, assists: 0, goalRate: 0.48, assistRate: 0.26 },
            { name: "J. David", club: "Lille", goals: 0, assists: 0, goalRate: 0.60, assistRate: 0.24 },
            { name: "M. Greenwood", club: "Marseille", goals: 0, assists: 0, goalRate: 0.58, assistRate: 0.46 },
            { name: "E. Wahi", club: "Marseille", goals: 0, assists: 0, goalRate: 0.48, assistRate: 0.20 },
            { name: "A. Lacazette", club: "Lyon", goals: 0, assists: 0, goalRate: 0.54, assistRate: 0.28 },
            { name: "F. Balogun", club: "Monaco", goals: 0, assists: 0, goalRate: 0.50, assistRate: 0.24 },
            { name: "T. Minamino", club: "Monaco", goals: 0, assists: 0, goalRate: 0.44, assistRate: 0.48 }
        ]
    },

    initLeagueScorers: function(forceReset = false) {
        const curLeague = (this.state && this.state.currentLeague) ? this.state.currentLeague : "3. Lig";
        const pool = this.LEAGUE_SCORERS_POOLS[curLeague] || this.LEAGUE_SCORERS_POOLS["Süper Lig"];
        
        if (forceReset || !this.state.leagueScorers || this.state.leagueScorersLeague !== curLeague) {
            this.state.leagueScorersLeague = curLeague;
            const w = (this.state && this.state.currentWeek && !forceReset) ? this.state.currentWeek : 1;
            this.state.leagueScorers = pool.map(item => {
                const estG = Math.max(0, Math.floor((w - 1) * (item.goalRate * 0.45)));
                const estA = Math.max(0, Math.floor((w - 1) * (item.assistRate * 0.45)));
                return {
                    ...item,
                    goals: forceReset ? 0 : estG,
                    assists: forceReset ? 0 : estA
                };
            });
        }
    },

    AVATAR_FACES: [
        { id: 1, name: "Akdeniz / Fade & Sakal", file: "face_1.jpg", tag: "Popüler" },
        { id: 2, name: "İskandinav / Sarışın", file: "face_2.jpg", tag: "Klasik" },
        { id: 3, name: "Atletik / Siyahi", file: "face_3.jpg", tag: "Dinamik" },
        { id: 4, name: "Karizmatik / Kaptan", file: "face_4.jpg", tag: "Lider" },
        { id: 5, name: "Genç Yetenek / Parlak", file: "face_5.jpg", tag: "Prodigy" },
        { id: 6, name: "Latin / Yıldız", file: "face_6.jpg", tag: "Teknik" },
        { id: 7, name: "Asya / Modern Kesim", file: "face_7.jpg", tag: "Hızlı" },
        { id: 8, name: "Kızıl / Çilli & Atletik", file: "face_8.jpg", tag: "Savaşçı" }
    ],

    generateAvatar: function(age) {
        let cust = (this.state && this.state.avatarCustomization) ? this.state.avatarCustomization : {};
        let faceId = cust.faceId || 1;
        if (typeof faceId !== "number" || faceId < 1 || faceId > 8) faceId = 1;

        return `<div class="realistic-player-avatar" style="width:100%;height:100%;position:relative;border-radius:inherit;overflow:hidden;background:#0c1017;display:flex;align-items:center;justify-content:center;">
            <img src="assets/avatars/face_${faceId}.jpg" alt="Player Portrait" style="width:100%;height:100%;object-fit:cover;object-position:center top;display:block;border-radius:inherit;" onerror="this.onerror=null;this.src='assets/avatars/face_1.jpg';">
            <div style="position:absolute;inset:0;pointer-events:none;border-radius:inherit;box-shadow:inset 0 -8px 16px rgba(0,0,0,0.5);"></div>
        </div>`;
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


