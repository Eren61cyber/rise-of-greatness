/**
 * Futbol Atlası: Kariyer Efsanesi - Core Game State & Manager Module
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
        currentClub: "Yıldız Gençlikspor", // Starts at amateur
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

    resetGame: function(customName, startingLeague, startingSalary, startingTrust) {
        this.state = {
            playerName: customName || "Ahmet Eren Demirci",
            age: 17,
            rating: 50,
            position: "Forvet",
            kondisyon: 100,
            moral: 100,
            followers: startingLeague === "2. Lig" ? 3500 : 2000,
            money: 1000,
            hocaGuveni: startingTrust || 40,
            shooting: 50,
            passing: 48,
            speed: 52,
            weeklySalary: startingSalary || 150,
            sponsorIncomeBonus: 0,
            kondisyonRegenBonus: 0,
            injuryRiskReduction: 0,
            ownedItems: [],
            currentLeague: startingLeague || "3. Lig",
            currentClub: "Yıldız Gençlikspor",
            currentWeek: 1,
            seasonGoals: 0,
            seasonAssists: 0,
            careerGoals: 0,
            careerAssists: 0,
            careerApps: 0,
            leagueTable: [],
            lastOpponentName: null,
            nextOpponentName: null,
            socialFeed: [
                {
                    handle: "@turk_futbol",
                    name: "Türk Futbol Günlüğü",
                    text: `TFF ${startingLeague || "3. Lig"} ekiplerinden Yıldız Gençlikspor, altyapısından yetiştirdiği 17 yaşındaki genç yetenek ${customName || "Ahmet Eren Demirci"}'ye profesyonel lisans çıkardı! Haydi hayırlısı. 🇹🇷⚽`,
                    time: "1s önce"
                }
            ]
        };
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
                if (!this.state.leagueTable || this.state.leagueTable.length === 0) {
                    this.initLeagueTable();
                    this.saveGame();
                }
                if (!this.state.socialFeed) {
                    this.state.socialFeed = [];
                    this.saveGame();
                }
                this.matchSimulatedThisWeek = false;
                console.log("Loaded game state successfully!");
            } catch (e) {
                console.error("Failed to parse save game data:", e);
            }
        }
    },

    train: function(statType) {
        if (this.state.kondisyon < 20) {
            alert("Antrenman yapmak için en az %20 kondisyon gereklidir! Dinlenmelisin.");
            return;
        }

        this.state.kondisyon -= 20;
        if (statType === "shooting") {
            this.state.shooting++;
        } else if (statType === "passing") {
            this.state.passing++;
        } else if (statType === "speed") {
            this.state.speed++;
        }

        // Recalculate overall rating
        this.state.rating = Math.round((this.state.shooting + this.state.passing + this.state.speed) / 3);
        
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
        
        // Apply immediate effects
        item.effect(this.state);

        this.saveGame();
        this.updateUI();
        alert(`${item.name} başarıyla satın alındı!`);
    },

    advanceWeek: function() {
        this.state.currentWeek++;

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
        this.state.money += salary;

        // Deduct weekly lifestyle costs
        let weeklyDeduction = 0;
        for (let itemId of this.state.ownedItems) {
            const item = DATABASE.LIFESTYLE_ITEMS.find(i => i.id === itemId);
            if (item && item.isWeekly) {
                weeklyDeduction += item.cost;
            }
        }
        this.state.money = Math.max(0, this.state.money - weeklyDeduction);

        // Regenerate fitness
        let regen = 15;
        if (this.state.kondisyonRegenBonus > 0) {
            regen += Math.round(regen * (this.state.kondisyonRegenBonus / 100));
        }
        this.state.kondisyon = Math.min(100, this.state.kondisyon + regen);

        // Natural decay of morale
        this.state.moral = Math.max(20, this.state.moral - 5);

        // Simulate league matches if not played manually
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
        this.matchSimulatedThisWeek = false;

        // Transition opponent states centrally here
        this.state.lastOpponentName = this.state.nextOpponentName;
        this.state.nextOpponentName = null;

        this.saveGame();
        this.updateUI();
    },

    getClubSalaryAndVal: function() {
        let val = DATABASE.calculateValue(this.state.rating, this.state.age);
        let sal = DATABASE.calculateSalary(this.state.rating, val, this.state.currentLeague);
        return { val, sal };
    },

    checkForTransferOffers: function() {
        // Triggered periodically, returns list of teams interested based on player rating
        let offers = [];
        
        // Find teams in our league or top leagues
        for (let leagueName in DATABASE.LEAGUES) {
            let league = DATABASE.LEAGUES[leagueName];
            for (let team of league.teams) {
                if (team.name === this.state.currentClub) continue;
                
                // Criteria: Team rating near player rating
                let teamAvg = (team.att + team.mid + team.def) / 3;
                if (this.state.rating >= (teamAvg - 5) && this.state.rating <= (teamAvg + 15)) {
                    let val = DATABASE.calculateValue(this.state.rating, this.state.age);
                    let sal = DATABASE.calculateSalary(this.state.rating, val, leagueName);
                    offers.push({
                        teamName: team.name,
                        leagueName: leagueName,
                        teamColor: team.color,
                        salary: Math.round(sal * (1.0 + Math.random() * 0.2)) // negotiate bonus
                    });
                }
            }
        }
        
        // Sort by salary (descending) and return top 3
        return offers.sort((a,b) => b.salary - a.salary).slice(0, 3);
    },

    updateUI: function() {
        // Safe binding to HTML Elements
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
            "career-goals": this.state.careerGoals,
            "career-assists": this.state.careerAssists,
            "career-apps": this.state.careerApps,
            "current-week": this.state.currentWeek,
            "weekly-salary-text": this.state.weeklySalary + " €/Hafta"
        };

        for (let id in bindings) {
            const el = document.getElementById(id);
            if (el) {
                el.innerText = bindings[id];
            }
        }

        // Update progress bar fills
        const progressFills = {
            "bar-fitness": this.state.kondisyon,
            "bar-morale": this.state.moral,
            "bar-trust": this.state.hocaGuveni
        };

        for (let id in progressFills) {
            const el = document.getElementById(id);
            if (el) {
                el.style.width = progressFills[id] + "%";
            }
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
            avatarContainer.innerHTML = this.generateAvatar(this.state.age);
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

    handleSeasonEnd: function() {
        this.state.age++;
        
        let rank = 12;
        if (this.state.leagueTable && this.state.leagueTable.length > 0) {
            rank = this.state.leagueTable.findIndex(t => t.name === this.state.currentClub) + 1;
        }

        let title = "Yeni Sezon Hazırlığı";
        let message = `Sezon Sona Erdi! Takımın ligi <strong>${rank}. sırada</strong> tamamladı.<br><br>`;
        
        let bonus = 0;
        let followerGain = 0;

        if (rank === 1) {
            bonus += 50000;
            followerGain += 10000;
            message += `🏆 <strong>LİG ŞAMPİYONLUĞU!</strong> Takımınla şampiyonluk kupasını kaldırarak tarihe geçtin! Kulüpten 50,000 € şampiyonluk primi kazandın!<br><br>`;
            this.addSocialPost("@superlig_resmi", "Süper Lig Resmi", `ŞAMPİYON ${this.state.currentClub}! Harika bir sezon geçiren genç yetenek ${this.state.playerName} şampiyonluk kupasını kaldırıyor! 🏆🔥`);
        } else if (rank <= 3) {
            bonus += 20000;
            followerGain += 4000;
            message += `🥈 <strong>Şampiyonlar Ligi Potası!</strong> Takımın ligi ilk 3'te bitirdi ve Avrupa vizesi aldı! 20,000 € prim yatırıldı.<br><br>`;
        }

        if (this.state.seasonGoals > 15) {
            bonus += 15000;
            followerGain += 5000;
            message += `⚽ <strong>GOL KRALI!</strong> Sezonda attığın ${this.state.seasonGoals} golle gol kralı tacını taktın! 15,000 € ekstra ödül aldın.<br><br>`;
            this.addSocialPost("@turk_futbol", "Türk Futbol Günlüğü", `GOL KRALI ${this.state.playerName}! Sezon boyunca rakip fileleri tam ${this.state.seasonGoals} kez havalandırarak krallık tahtına oturdu! 👑⚽`);
        }

        this.state.money += bonus;
        this.state.followers += followerGain;
        this.state.hocaGuveni = Math.min(100, this.state.hocaGuveni + 15);
        this.state.moral = 100;

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
        let skinColor = "#f5c299";
        let eyeColor = "#37474F";
        let hairColor = "#212121";
        
        let hairPath = "";
        let beardPath = "";
        let wrinklePath = "";

        if (age < 20) {
            hairPath = `<path d="M12 28 C 12 10, 52 10, 52 28 C 54 28, 54 20, 50 14 C 44 8, 20 8, 14 14 C 10 20, 10 28, 12 28 Z" fill="${hairColor}" />`;
        } else if (age < 25) {
            hairPath = `<path d="M10 26 L 15 12 L 24 8 L 32 12 L 40 8 L 49 12 L 54 26 C 54 20, 48 14, 32 14 C 16 14, 10 20, 10 26 Z" fill="${hairColor}" />`;
            beardPath = `<path d="M16 40 C 16 52, 48 52, 48 40 C 48 45, 42 49, 32 49 C 22 49, 16 45, 16 40 Z" fill="rgba(33, 33, 33, 0.15)" />`;
        } else if (age < 30) {
            hairPath = `<path d="M10 26 L 18 10 L 32 14 L 46 10 L 54 26 C 54 20, 48 16, 32 16 C 16 16, 10 20, 10 26 Z" fill="${hairColor}" />
                        <path d="M12 22 L 52 22 L 51 25 L 13 25 Z" fill="#E53935" />`;
            beardPath = `<path d="M16 38 C 16 54, 48 54, 48 38 C 44 48, 20 48, 16 38 Z" fill="${hairColor}" />
                         <path d="M22 42 L 42 42 L 32 46 Z" fill="${hairColor}" />`;
        } else if (age < 35) {
            hairPath = `<path d="M12 26 C 14 12, 50 12, 52 26 C 48 18, 16 18, 12 26 Z" fill="${hairColor}" />`;
            beardPath = `<path d="M14 36 C 14 56, 50 56, 50 36 C 46 50, 18 50, 14 36 Z" fill="${hairColor}" />`;
            wrinklePath = `<path d="M18 31 H 21 M43 31 H 46" stroke="rgba(0,0,0,0.15)" stroke-width="1" stroke-linecap="round" />`;
        } else {
            hairColor = "#78909C"; 
            hairPath = `<path d="M14 26 C 16 16, 48 16, 50 26 C 46 20, 18 20, 14 26 Z" fill="${hairColor}" />
                        <path d="M12 26 L 14 32" stroke="${hairColor}" stroke-width="3" />
                        <path d="M52 26 L 50 32" stroke="${hairColor}" stroke-width="3" />`;
            beardPath = `<path d="M14 36 C 14 56, 50 56, 50 36 C 46 50, 18 50, 14 36 Z" fill="${hairColor}" />
                         <path d="M22 37 C 28 37, 36 37, 42 37 C 40 40, 24 40, 22 37 Z" fill="#455A64" />`;
            wrinklePath = `<path d="M18 32 C 20 34, 22 34, 24 32 M38 32 C 40 34, 42 34, 44 32" stroke="rgba(0,0,0,0.25)" fill="none" stroke-width="1" />
                           <path d="M24 16 Q 32 14 40 16" stroke="rgba(0,0,0,0.2)" fill="none" stroke-width="1" />`;
        }

        let svg = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="100%" height="100%">
            <circle cx="32" cy="32" r="30" fill="rgba(255,255,255,0.05)" stroke="var(--border-glass)" stroke-width="1" />
            <rect x="26" y="44" width="12" height="12" rx="3" fill="${skinColor}" />
            <circle cx="32" cy="35" r="16" fill="${skinColor}" />
            <circle cx="15" cy="35" r="3.5" fill="${skinColor}" />
            <circle cx="49" cy="35" r="3.5" fill="${skinColor}" />
            <circle cx="25" cy="32" r="2" fill="${eyeColor}" />
            <circle cx="39" cy="32" r="2" fill="${eyeColor}" />
            <path d="M21 28 Q 25 27 28 29" stroke="${hairColor}" stroke-width="1.5" fill="none" stroke-linecap="round" />
            <path d="M43 28 Q 39 27 36 29" stroke="${hairColor}" stroke-width="1.5" fill="none" stroke-linecap="round" />
            <path d="M31 32 V 37 H 33" stroke="rgba(0,0,0,0.15)" stroke-width="1.5" fill="none" stroke-linecap="round" />
            <path d="M28 42 Q 32 45 36 42" stroke="rgba(0,0,0,0.2)" stroke-width="1.5" fill="none" stroke-linecap="round" />
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
    },

    simulateLeagueWeek: function(playerMatchGoals, opponentMatchGoals) {
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

        // Pair up other teams randomly
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

        // Sort table: points -> GD -> GF
        this.state.leagueTable.sort((a, b) => {
            if (b.points !== a.points) return b.points - a.points;
            let gdA = a.gf - a.ga;
            let gdB = b.gf - b.ga;
            if (gdB !== gdA) return gdB - gdA;
            return b.gf - a.gf;
        });

        this.saveGame();
    },

    getTeamAverageRating: function(teamName) {
        if (teamName === "Yıldız Gençlikspor") {
            return (DATABASE.AMATEUR_CLUB.att + DATABASE.AMATEUR_CLUB.mid + DATABASE.AMATEUR_CLUB.def) / 3;
        }
        let league = DATABASE.LEAGUES[this.state.currentLeague];
        if (league) {
            let tObj = league.teams.find(t => t.name === teamName);
            if (tObj) {
                return (tObj.att + tObj.mid + tObj.def) / 3;
            }
        }
        return 70;
    },

    getPlayerTeamObject: function() {
        if (this.state.currentClub === "Yıldız Gençlikspor") {
            return DATABASE.AMATEUR_CLUB;
        }
        let league = DATABASE.LEAGUES[this.state.currentLeague];
        if (league) {
            return league.teams.find(t => t.name === this.state.currentClub) || DATABASE.AMATEUR_CLUB;
        }
        return DATABASE.AMATEUR_CLUB;
    }
};

if (typeof module !== "undefined" && module.exports) {
    module.exports = GAME;
}
