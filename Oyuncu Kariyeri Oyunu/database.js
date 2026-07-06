/**
 * Futbol Atlası: Kariyer Efsanesi - Database & Settings Module
 * Holds static database of leagues, teams, starting stats, and financial formulas.
 */

const DATABASE = {
    LEAGUES: {
        "Süper Lig": {
            country: "Türkiye",
            prestige: 3,
            teams: [
                { name: "Galatasaray", att: 80, mid: 81, def: 79, color: "#A90432", colorSec: "#FDB913" },
                { name: "Fenerbahçe", att: 81, mid: 80, def: 80, color: "#002F6C", colorSec: "#FED141" },
                { name: "Beşiktaş", att: 78, mid: 77, def: 77, color: "#000000", colorSec: "#FFFFFF" },
                { name: "Trabzonspor", att: 75, mid: 76, def: 74, color: "#800020", colorSec: "#00A4E4" },
                { name: "Başakşehir", att: 72, mid: 73, def: 73, color: "#FF6600", colorSec: "#002F6C" },
                { name: "Samsunspor", att: 71, mid: 71, def: 70, color: "#E30613", colorSec: "#FFFFFF" },
                { name: "Kasımpaşa", att: 70, mid: 70, def: 69, color: "#0D47A1", colorSec: "#FFFFFF" },
                { name: "Eyüpspor", att: 70, mid: 71, def: 70, color: "#6A1B9A", colorSec: "#FBC02D" },
                { name: "Antalyaspor", att: 69, mid: 69, def: 68, color: "#D50000", colorSec: "#FFFFFF" },
                { name: "Sivasspor", att: 68, mid: 68, def: 69, color: "#D50000", colorSec: "#FFFFFF" },
                { name: "Konyaspor", att: 67, mid: 68, def: 68, color: "#1B5E20", colorSec: "#FFFFFF" },
                { name: "Göztepe", att: 68, mid: 67, def: 68, color: "#FFD600", colorSec: "#D50000" }
            ]
        },
        "1. Lig": {
            country: "Türkiye",
            prestige: 2,
            teams: [
                { name: "Ankaragücü", att: 64, mid: 65, def: 63, color: "#FFD600", colorSec: "#0D47A1" },
                { name: "Kocaelispor", att: 63, mid: 62, def: 62, color: "#1B5E20", colorSec: "#000000" },
                { name: "Sakaryaspor", att: 61, mid: 62, def: 61, color: "#1B5E20", colorSec: "#FFFFFF" },
                { name: "Fatih Karagümrük", att: 62, mid: 62, def: 62, color: "#D50000", colorSec: "#000000" },
                { name: "Pendikspor", att: 61, mid: 60, def: 61, color: "#D50000", colorSec: "#FFFFFF" },
                { name: "Amedspor", att: 60, mid: 61, def: 60, color: "#1B5E20", colorSec: "#D50000" },
                { name: "Bandırmaspor", att: 59, mid: 59, def: 58, color: "#6A1B9A", colorSec: "#FFFFFF" },
                { name: "Gençlerbirliği", att: 58, mid: 59, def: 59, color: "#D50000", colorSec: "#000000" }
            ]
        },
        "2. Lig": {
            country: "Türkiye",
            prestige: 1,
            teams: [
                { name: "Kastamonuspor", att: 52, mid: 51, def: 52, color: "#D50000", colorSec: "#000000" },
                { name: "Iğdır FK", att: 54, mid: 53, def: 52, color: "#1B5E20", colorSec: "#FFFFFF" },
                { name: "Sarıyer", att: 50, mid: 50, def: 51, color: "#0D47A1", colorSec: "#FFFFFF" },
                { name: "Şanlıurfaspor", att: 51, mid: 50, def: 50, color: "#FFD600", colorSec: "#1B5E20" },
                { name: "Altay", att: 48, mid: 48, def: 49, color: "#000000", colorSec: "#FFFFFF" },
                { name: "Batman Petrolspor", att: 49, mid: 48, def: 48, color: "#D50000", colorSec: "#FFFFFF" },
                { name: "Buca FK", att: 50, mid: 49, def: 49, color: "#0D47A1", colorSec: "#FFD600" }
            ]
        },
        "3. Lig": {
            country: "Türkiye",
            prestige: 0.5,
            teams: [
                { name: "Karşıyaka", att: 40, mid: 40, def: 39, color: "#1B5E20", colorSec: "#D50000" },
                { name: "Orduspor", att: 38, mid: 39, def: 38, color: "#4B0082", colorSec: "#FFD600" },
                { name: "Elazığspor", att: 41, mid: 40, def: 40, color: "#8E1E34", colorSec: "#FFFFFF" },
                { name: "Balıkesirspor", att: 37, mid: 38, def: 38, color: "#D50000", colorSec: "#FFFFFF" },
                { name: "Zonguldak Kömürspor", att: 39, mid: 38, def: 38, color: "#D50000", colorSec: "#000000" },
                { name: "Darıca Gençlerbirliği", att: 36, mid: 37, def: 37, color: "#FFD600", colorSec: "#000000" }
            ]
        },
        "Premier League": {
            country: "İngiltere",
            prestige: 5,
            teams: [
                { name: "Manchester City", att: 88, mid: 90, def: 87, color: "#6CABDD", colorSec: "#1C2C5B" },
                { name: "Arsenal", att: 86, mid: 87, def: 88, color: "#EF0107", colorSec: "#FFFFFF" },
                { name: "Liverpool", att: 87, mid: 85, def: 86, color: "#C8102E", colorSec: "#F6EB61" },
                { name: "Aston Villa", att: 81, mid: 82, def: 81, color: "#95BFE5", colorSec: "#670E36" },
                { name: "Tottenham", att: 82, mid: 81, def: 80, color: "#132257", colorSec: "#FFFFFF" },
                { name: "Chelsea", att: 83, mid: 83, def: 82, color: "#034694", colorSec: "#FFFFFF" },
                { name: "Manchester United", att: 81, mid: 82, def: 81, color: "#DA291C", colorSec: "#000000" },
                { name: "Newcastle", att: 82, mid: 81, def: 80, color: "#241F20", colorSec: "#FFFFFF" }
            ]
        },
        "La Liga": {
            country: "İspanya",
            prestige: 5,
            teams: [
                { name: "Real Madrid", att: 91, mid: 89, def: 88, color: "#FFFFFF", colorSec: "#112546" },
                { name: "Barcelona", att: 88, mid: 87, def: 85, color: "#004D98", colorSec: "#A50044" },
                { name: "Atletico Madrid", att: 84, mid: 83, def: 85, color: "#CB3524", colorSec: "#192C5B" },
                { name: "Real Sociedad", att: 80, mid: 82, def: 81, color: "#0067B1", colorSec: "#FFFFFF" },
                { name: "Athletic Bilbao", att: 81, mid: 80, def: 80, color: "#EE2526", colorSec: "#FFFFFF" },
                { name: "Girona", att: 78, mid: 78, def: 77, color: "#E20613", colorSec: "#FFFFFF" },
                { name: "Real Betis", att: 78, mid: 79, def: 77, color: "#009640", colorSec: "#FFFFFF" },
                { name: "Sevilla", att: 77, mid: 77, def: 78, color: "#F43333", colorSec: "#FFFFFF" }
            ]
        },
        "Serie A": {
            country: "İtalya",
            prestige: 4,
            teams: [
                { name: "Inter", att: 86, mid: 86, def: 87, color: "#0066B2", colorSec: "#000000" },
                { name: "Milan", att: 83, mid: 82, def: 82, color: "#E30613", colorSec: "#000000" },
                { name: "Juventus", att: 82, mid: 83, def: 84, color: "#000000", colorSec: "#FFFFFF" },
                { name: "Atalanta", att: 82, mid: 81, def: 80, color: "#002F6C", colorSec: "#000000" },
                { name: "Roma", att: 80, mid: 81, def: 81, color: "#8E1E34", colorSec: "#F1A80A" },
                { name: "Napoli", att: 82, mid: 80, def: 81, color: "#12A0D7", colorSec: "#FFFFFF" },
                { name: "Lazio", att: 79, mid: 79, def: 79, color: "#87D3F8", colorSec: "#FFFFFF" },
                { name: "Fiorentina", att: 78, mid: 78, def: 78, color: "#4B0082", colorSec: "#FFFFFF" }
            ]
        },
        "Bundesliga": {
            country: "Almanya",
            prestige: 4,
            teams: [
                { name: "Bayern München", att: 87, mid: 86, def: 85, color: "#DC052D", colorSec: "#0066B2" },
                { name: "Bayer Leverkusen", att: 84, mid: 85, def: 84, color: "#E30613", colorSec: "#000000" },
                { name: "Borussia Dortmund", att: 82, mid: 82, def: 83, color: "#FDE100", colorSec: "#000000" },
                { name: "RB Leipzig", att: 82, mid: 82, def: 81, color: "#DD013F", colorSec: "#002F6C" },
                { name: "Stuttgart", att: 79, mid: 79, def: 78, color: "#E30613", colorSec: "#FFFFFF" },
                { name: "Eintracht Frankfurt", att: 78, mid: 78, def: 78, color: "#E1000F", colorSec: "#000000" }
            ]
        },
        "Ligue 1": {
            country: "Fransa",
            prestige: 3.5,
            teams: [
                { name: "Paris Saint-Germain", att: 87, mid: 85, def: 85, color: "#0052B4", colorSec: "#E30613" },
                { name: "Monaco", att: 80, mid: 80, def: 79, color: "#E30613", colorSec: "#FFFFFF" },
                { name: "Lille", att: 79, mid: 79, def: 78, color: "#E30613", colorSec: "#002F6C" },
                { name: "Marseille", att: 79, mid: 78, def: 78, color: "#00A4E4", colorSec: "#FFFFFF" },
                { name: "Lens", att: 77, mid: 78, def: 78, color: "#FFCC00", colorSec: "#CC0000" },
                { name: "Lyon", att: 78, mid: 77, def: 77, color: "#002F6C", colorSec: "#E30613" }
            ]
        }
    },

    AMATEUR_CLUB: {
        name: "Yıldız Gençlikspor",
        att: 45,
        mid: 43,
        def: 44,
        color: "#1B5E20",
        colorSec: "#FFFFFF"
    },

    LIFESTYLE_ITEMS: [
        { id: "nutritionist", name: "Özel Beslenme Şefi", cost: 800, isWeekly: true, desc: "Kondisyon yenilenmesini %15 artırır.", effect: (s) => { s.kondisyonRegenBonus += 15; } },
        { id: "physio", name: "Kişisel Fizyoterapist", cost: 1500, isWeekly: true, desc: "Sakatlık ihtimalini azaltır, iyileşmeyi hızlandırır.", effect: (s) => { s.injuryRiskReduction += 25; } },
        { id: "pr_agent", name: "Sosyal Medya/PR Menajeri", cost: 1000, isWeekly: true, desc: "Sponsorluk gelirlerini %20 artırır.", effect: (s) => { s.sponsorIncomeBonus += 20; } },
        { id: "sports_car", name: "Lüks Spor Araba", cost: 85000, isWeekly: false, desc: "+50,000 Sosyal Medya Takipçisi, -10 Hoca Güveni.", effect: (s) => { s.followers += 50000; s.hocaGuveni = Math.max(0, s.hocaGuveni - 10); } },
        { id: "penthouse", name: "Boğaz Manzaralı Rezidans", cost: 250000, isWeekly: false, desc: "Moral seviyesini maksimuma sabitlemeye yardımcı olur (+25 Moral).", effect: (s) => { s.moral = Math.min(100, s.moral + 25); } }
    ],

    calculateValue: function(rating, age) {
        if (rating <= 30) return 5000;
        // Curve: 50 -> ~110K, 60 -> ~500K, 70 -> ~2.3M, 80 -> ~10.7M, 90 -> ~50M
        let base = Math.pow(10, (rating - 30) / 15) * 5000;
        let ageMultiplier = 1.0;
        if (age < 21) ageMultiplier = 1.3;
        else if (age > 30) ageMultiplier = Math.max(0.15, 1 - (age - 30) * 0.1);
        return Math.round(base * ageMultiplier);
    },

    calculateSalary: function(rating, value, leagueName) {
        // Scale weekly salary dynamically based on league prestige
        let prestige = 1;
        if (DATABASE.LEAGUES[leagueName]) {
            prestige = DATABASE.LEAGUES[leagueName].prestige;
        } else if (leagueName === "2. Lig") {
            prestige = 1;
        } else if (leagueName === "1. Lig") {
            prestige = 2;
        } else if (leagueName === "Süper Lig") {
            prestige = 3;
        }
        
        let baseSalary = value * 0.0008 * prestige + (rating * 4 * prestige);
        return Math.round(baseSalary);
    }
};

if (typeof module !== "undefined" && module.exports) {
    module.exports = DATABASE;
}
