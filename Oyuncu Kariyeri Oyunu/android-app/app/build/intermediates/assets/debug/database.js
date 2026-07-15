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
                { name: "Galatastar", att: 85, mid: 84, def: 83, color: "#A90432", colorSec: "#FDB913" },
                { name: "Fenerbaçe FK", att: 83, mid: 84, def: 83, color: "#002F6C", colorSec: "#FED141" },
                { name: "Trabzon FK", att: 80, mid: 80, def: 79, color: "#800020", colorSec: "#00A4E4" },
                { name: "Kartal FK", att: 78, mid: 78, def: 77, color: "#000000", colorSec: "#FFFFFF" },
                { name: "Başakşehir FK", att: 76, mid: 76, def: 75, color: "#FF6600", colorSec: "#002F6C" },
                { name: "Göztepe FK", att: 75, mid: 75, def: 74, color: "#FFD600", colorSec: "#D50000" },
                { name: "Samsun FK", att: 74, mid: 73, def: 73, color: "#E30613", colorSec: "#FFFFFF" },
                { name: "Rize FK", att: 71, mid: 71, def: 70, color: "#1B5E20", colorSec: "#FFFFFF" },
                { name: "Konya FK", att: 71, mid: 70, def: 70, color: "#1B5E20", colorSec: "#FFFFFF" },
                { name: "Adana Demir FK", att: 72, mid: 71, def: 71, color: "#00E5FF", colorSec: "#0D47A1" },
                { name: "Alanya FK", att: 70, mid: 69, def: 69, color: "#FF6600", colorSec: "#000000" },
                { name: "Gaziantep FK", att: 69, mid: 69, def: 68, color: "#D50000", colorSec: "#FFFFFF" },
                { name: "Kaşımpaşa FK", att: 68, mid: 68, def: 67, color: "#0D47A1", colorSec: "#FFFFFF" },
                { name: "Hatay FK", att: 70, mid: 70, def: 69, color: "#8E1E34", colorSec: "#FFFFFF" },
                { name: "Eyüpspor FK", att: 67, mid: 67, def: 66, color: "#6A1B9A", colorSec: "#FBC02D" },
                { name: "Antalya FK", att: 67, mid: 66, def: 66, color: "#D50000", colorSec: "#FFFFFF" },
                { name: "Kayseri FK", att: 66, mid: 66, def: 65, color: "#FFD600", colorSec: "#D50000" },
                { name: "Sivas FK", att: 72, mid: 71, def: 71, color: "#D50000", colorSec: "#FFFFFF" }
            ]
        },
        "1. Lig": {
            country: "Türkiye",
            prestige: 2,
            teams: [
                { name: "Erzurumspor", att: 66, mid: 65, def: 65, color: "#0D47A1", colorSec: "#FFFFFF" },
                { name: "Amed", att: 65, mid: 65, def: 64, color: "#1B5E20", colorSec: "#D50000" },
                { name: "Kocaeli FK", att: 68, mid: 67, def: 67, color: "#006400", colorSec: "#000000" },
                { name: "Çorum", att: 64, mid: 64, def: 63, color: "#D50000", colorSec: "#FFD600" },
                { name: "Bodrum", att: 63, mid: 63, def: 62, color: "#00875A", colorSec: "#C0C0C0" },
                { name: "Pendikspor", att: 63, mid: 62, def: 62, color: "#D50000", colorSec: "#FFFFFF" },
                { name: "Ankara Keçiörengücü", att: 62, mid: 62, def: 61, color: "#FFD600", colorSec: "#000000" },
                { name: "Bandırmaspor", att: 62, mid: 61, def: 61, color: "#6A1B9A", colorSec: "#FFFFFF" },
                { name: "Manisa", att: 61, mid: 61, def: 60, color: "#000000", colorSec: "#FFFFFF" },
                { name: "Fatih Karagümrük", att: 66, mid: 65, def: 65, color: "#D50000", colorSec: "#000000" },
                { name: "İstanbulspor", att: 60, mid: 60, def: 59, color: "#FFD600", colorSec: "#000000" },
                { name: "Sarıyer", att: 60, mid: 59, def: 59, color: "#0D47A1", colorSec: "#FFFFFF" },
                { name: "Iğdır", att: 59, mid: 59, def: 58, color: "#1B5E20", colorSec: "#FFFFFF" },
                { name: "Vanspor", att: 59, mid: 58, def: 58, color: "#D50000", colorSec: "#000000" },
                { name: "Boluspor", att: 58, mid: 58, def: 57, color: "#0D47A1", colorSec: "#FFFFFF" },
                { name: "Ümraniyespor", att: 58, mid: 57, def: 57, color: "#D50000", colorSec: "#FFFFFF" },
                { name: "Gençlerbirliği", att: 65, mid: 65, def: 64, color: "#D50000", colorSec: "#000000" },
                { name: "Sakaryaspor", att: 56, mid: 56, def: 55, color: "#1B5E20", colorSec: "#FFFFFF" }
            ]
        },
        "2. Lig": {
            country: "Türkiye",
            prestige: 1,
            teams: [
                { name: "Batman Petrolspor", att: 56, mid: 56, def: 55, color: "#D50000", colorSec: "#FFFFFF" },
                { name: "Muğlaspor", att: 54, mid: 54, def: 53, color: "#1B5E20", colorSec: "#FFFFFF" },
                { name: "Mardin 1969", att: 54, mid: 54, def: 53, color: "#D50000", colorSec: "#FFFFFF" },
                { name: "Elazığspor", att: 53, mid: 53, def: 52, color: "#8E1E34", colorSec: "#FFFFFF" },
                { name: "Muşspor", att: 53, mid: 53, def: 52, color: "#FF6600", colorSec: "#FFFFFF" },
                { name: "Aliağa", att: 53, mid: 52, def: 52, color: "#0D47A1", colorSec: "#FFD600" },
                { name: "Adana 01 FK", att: 52, mid: 52, def: 51, color: "#FF6600", colorSec: "#000000" },
                { name: "Kahramanmaraş İstiklalspor", att: 52, mid: 52, def: 51, color: "#D50000", colorSec: "#FFFFFF" },
                { name: "Şanlıurfaspor", att: 51, mid: 51, def: 50, color: "#FFD600", colorSec: "#1B5E20" },
                { name: "Isparta 32", att: 51, mid: 51, def: 50, color: "#1B5E20", colorSec: "#D50000" },
                { name: "MKE Ankaragücü", att: 51, mid: 50, def: 50, color: "#FFD600", colorSec: "#0D47A1" },
                { name: "İnegölspor", att: 50, mid: 50, def: 49, color: "#6A1B9A", colorSec: "#FFFFFF" },
                { name: "Güzide Gebzespor", att: 50, mid: 49, def: 49, color: "#6A1B9A", colorSec: "#FFFFFF" },
                { name: "Beyoğlu Yeni Çarşı", att: 49, mid: 49, def: 49, color: "#000000", colorSec: "#FFFFFF" },
                { name: "İskenderunspor", att: 49, mid: 49, def: 48, color: "#FF6600", colorSec: "#000000" },
                { name: "Ankaraspor", att: 48, mid: 48, def: 48, color: "#0D47A1", colorSec: "#FFFFFF" },
                { name: "Menemen", att: 48, mid: 48, def: 48, color: "#FFD600", colorSec: "#0D47A1" },
                { name: "1461 Trabzon", att: 46, mid: 46, def: 46, color: "#800020", colorSec: "#00A4E4" }
            ]
        },
        "3. Lig": {
            country: "Türkiye",
            prestige: 0.5,
            teams: [
                { name: "İnegöl Kafkasspor", att: 46, mid: 45, def: 45, color: "#1B5E20", colorSec: "#FFFFFF" },
                { name: "Kütahyaspor", att: 46, mid: 45, def: 45, color: "#0D47A1", colorSec: "#FFFFFF" },
                { name: "Eskişehirspor", att: 45, mid: 44, def: 44, color: "#FF0000", colorSec: "#000000" },
                { name: "Karşıyaka", att: 45, mid: 44, def: 44, color: "#1B5E20", colorSec: "#D50000" },
                { name: "Çorlu Spor 1947", att: 44, mid: 43, def: 43, color: "#0D47A1", colorSec: "#FFFFFF" },
                { name: "Ayvalıkgücü Belediyespor", att: 44, mid: 43, def: 43, color: "#D50000", colorSec: "#FFFFFF" },
                { name: "Balıkesirspor", att: 43, mid: 43, def: 42, color: "#D50000", colorSec: "#FFFFFF" },
                { name: "Küçükçekmece Sinop Spor", att: 43, mid: 42, def: 42, color: "#0D47A1", colorSec: "#FFFFFF" },
                { name: "Etimesgut Belediyespor", att: 42, mid: 42, def: 41, color: "#0D47A1", colorSec: "#FFFFFF" },
                { name: "Bursa Yıldırımspor", att: 42, mid: 41, def: 41, color: "#0D47A1", colorSec: "#FFFFFF" },
                { name: "Silivrispor", att: 41, mid: 41, def: 40, color: "#1B5E20", colorSec: "#FFFFFF" },
                { name: "Orduspor 1967", att: 41, mid: 40, def: 40, color: "#4B0082", colorSec: "#FFD600" },
                { name: "Zonguldak Kömürspor", att: 40, mid: 40, def: 39, color: "#D50000", colorSec: "#000000" },
                { name: "Bornova 1877", att: 40, mid: 39, def: 39, color: "#6A1B9A", colorSec: "#FFFFFF" },
                { name: "Amasyaspor FK", att: 39, mid: 39, def: 38, color: "#1B5E20", colorSec: "#FFFFFF" },
                { name: "Kuşadasıspor", att: 38, mid: 38, def: 38, color: "#FFD600", colorSec: "#000000" },
                { name: "Muş Spor", att: 38, mid: 38, def: 37, color: "#E30613", colorSec: "#FFFFFF" },
                { name: "Pazarspor", att: 36, mid: 36, def: 36, color: "#1B5E20", colorSec: "#FFFFFF" }
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
                { name: "Newcastle", att: 82, mid: 81, def: 80, color: "#241F20", colorSec: "#FFFFFF" },
                { name: "West Ham", att: 80, mid: 79, def: 79, color: "#7A263A", colorSec: "#1BB1E7" },
                { name: "Brighton", att: 80, mid: 80, def: 78, color: "#0057B8", colorSec: "#FFFFFF" },
                { name: "Everton", att: 77, mid: 78, def: 78, color: "#003399", colorSec: "#FFFFFF" },
                { name: "Leicester City", att: 76, mid: 77, def: 76, color: "#0B2265", colorSec: "#FDBE11" },
                { name: "Wolverhampton", att: 77, mid: 77, def: 76, color: "#FDB913", colorSec: "#231F20" },
                { name: "Crystal Palace", att: 78, mid: 77, def: 77, color: "#1B458F", colorSec: "#C4122E" },
                { name: "Fulham", att: 77, mid: 76, def: 76, color: "#FFFFFF", colorSec: "#000000" },
                { name: "Brentford", att: 76, mid: 76, def: 75, color: "#E30613", colorSec: "#E30613" },
                { name: "Nottingham Forest", att: 77, mid: 76, def: 76, color: "#DD0000", colorSec: "#FFFFFF" },
                { name: "Bournemouth", att: 76, mid: 76, def: 75, color: "#B50E12", colorSec: "#000000" },
                { name: "Leeds United", att: 75, mid: 75, def: 74, color: "#FFD600", colorSec: "#0000FF" },
                { name: "Southampton", att: 74, mid: 74, def: 73, color: "#D50000", colorSec: "#FFFFFF" }
            ]
        },
        "La Liga": {
            country: "İspanya",
            prestige: 5,
            teams: [
                { name: "Real Madrid", att: 91, mid: 89, def: 88, color: "#FFFFFF", colorSec: "#112546" },
                { name: "Barcelona", att: 88, mid: 87, def: 85, color: "#004D98", colorSec: "#A50044" },
                { name: "Atletico Madrid", att: 84, mid: 83, def: 85, color: "#CB3524", colorSec: "#192C5B" },
                { name: "Athletic Bilbao", att: 80, mid: 82, def: 81, color: "#0067B1", colorSec: "#FFFFFF" },
                { name: "Athletic Club", att: 81, mid: 80, def: 80, color: "#EE2526", colorSec: "#FFFFFF" },
                { name: "Girona", att: 78, mid: 78, def: 77, color: "#E20613", colorSec: "#FFFFFF" },
                { name: "Real Betis", att: 78, mid: 79, def: 77, color: "#009640", colorSec: "#FFFFFF" },
                { name: "Sevilla", att: 77, mid: 77, def: 78, color: "#F43333", colorSec: "#FFFFFF" },
                { name: "Valencia", att: 77, mid: 77, def: 76, color: "#ffffff", colorSec: "#000000" },
                { name: "Villarreal", att: 79, mid: 79, def: 77, color: "#FFD000", colorSec: "#003E7E" },
                { name: "Osasuna", att: 76, mid: 77, def: 77, color: "#002F6C", colorSec: "#D50000" },
                { name: "Celta Vigo", att: 77, mid: 76, def: 76, color: "#85B3D2", colorSec: "#FFFFFF" },
                { name: "Mallorca", att: 75, mid: 76, def: 76, color: "#D50000", colorSec: "#000000" },
                { name: "Getafe", att: 75, mid: 75, def: 76, color: "#0000FF", colorSec: "#FFFFFF" },
                { name: "Las Palmas", att: 74, mid: 75, def: 74, color: "#FFD700", colorSec: "#0000FF" },
                { name: "Rayo Vallecano", att: 75, mid: 75, def: 74, color: "#FFFFFF", colorSec: "#FF0000" },
                { name: "Real Sociedad", att: 74, mid: 75, def: 75, color: "#00519E", colorSec: "#FFFFFF" },
                { name: "Espanyol", att: 74, mid: 74, def: 74, color: "#0087CD", colorSec: "#FFFFFF" },
                { name: "Granada", att: 73, mid: 73, def: 72, color: "#00E5FF", colorSec: "#FFFFFF" },
                { name: "Alaves", att: 72, mid: 72, def: 72, color: "#0D47A1", colorSec: "#FFFFFF" }
            ]
        },
        "Serie A": {
            country: "İtalya",
            prestige: 4,
            teams: [
                { name: "Inter Milan", att: 86, mid: 86, def: 87, color: "#0066B2", colorSec: "#000000" },
                { name: "AC Milan", att: 83, mid: 82, def: 82, color: "#E30613", colorSec: "#000000" },
                { name: "Juventus", att: 82, mid: 83, def: 84, color: "#000000", colorSec: "#FFFFFF" },
                { name: "Atalanta", att: 82, mid: 81, def: 80, color: "#002F6C", colorSec: "#000000" },
                { name: "Roma", att: 80, mid: 81, def: 81, color: "#8E1E34", colorSec: "#F1A80A" },
                { name: "Napoli", att: 82, mid: 80, def: 81, color: "#12A0D7", colorSec: "#FFFFFF" },
                { name: "Lazio", att: 79, mid: 79, def: 79, color: "#87D3F8", colorSec: "#FFFFFF" },
                { name: "Fiorentina", att: 78, mid: 78, def: 78, color: "#4B0082", colorSec: "#FFFFFF" },
                { name: "Bologna", att: 79, mid: 79, def: 78, color: "#A90432", colorSec: "#002F6C" },
                { name: "Torino", att: 76, mid: 77, def: 77, color: "#800020", colorSec: "#FFFFFF" },
                { name: "Monza", att: 75, mid: 76, def: 75, color: "#E30613", colorSec: "#FFFFFF" },
                { name: "Genoa", att: 76, mid: 75, def: 76, color: "#800020", colorSec: "#002F6C" },
                { name: "Udinese", att: 75, mid: 75, def: 76, color: "#000000", colorSec: "#FFFFFF" },
                { name: "Hellas Verona", att: 74, mid: 75, def: 75, color: "#002F6C", colorSec: "#FFFF00" },
                { name: "Cagliari", att: 73, mid: 74, def: 74, color: "#002F6C", colorSec: "#D50000" },
                { name: "Empoli", att: 73, mid: 74, def: 74, color: "#0000FF", colorSec: "#FFFFFF" },
                { name: "Lecce", att: 74, mid: 74, def: 73, color: "#FFFF00", colorSec: "#FF0000" },
                { name: "Parma", att: 74, mid: 74, def: 74, color: "#FFFFFF", colorSec: "#000000" },
                { name: "Sampdoria", att: 73, mid: 73, def: 72, color: "#00C853", colorSec: "#FFFFFF" },
                { name: "Palermo", att: 72, mid: 72, def: 71, color: "#E040FB", colorSec: "#000000" }
            ]
        },
        "Bundesliga": {
            country: "Almanya",
            prestige: 4,
            teams: [
                { name: "Bayern Münih", att: 87, mid: 86, def: 85, color: "#DC052D", colorSec: "#0066B2" },
                { name: "Bayer Leverkusen", att: 84, mid: 85, def: 84, color: "#E30613", colorSec: "#000000" },
                { name: "Borussia Dortmund", att: 82, mid: 82, def: 83, color: "#FDE100", colorSec: "#000000" },
                { name: "RB Leipzig", att: 82, mid: 82, def: 81, color: "#DD013F", colorSec: "#002F6C" },
                { name: "Stuttgart", att: 79, mid: 79, def: 78, color: "#E30613", colorSec: "#FFFFFF" },
                { name: "Eintracht Frankfurt", att: 78, mid: 78, def: 78, color: "#E1000F", colorSec: "#000000" },
                { name: "Hoffenheim", att: 77, mid: 77, def: 76, color: "#0052B2", colorSec: "#FFFFFF" },
                { name: "Heidenheim", att: 76, mid: 76, def: 76, color: "#D50000", colorSec: "#002F6C" },
                { name: "Werder Bremen", att: 76, mid: 76, def: 75, color: "#009240", colorSec: "#FFFFFF" },
                { name: "SC Freiburg", att: 77, mid: 77, def: 77, color: "#D50000", colorSec: "#FFFFFF" },
                { name: "Wolfsburg", att: 76, mid: 76, def: 76, color: "#60B200", colorSec: "#FFFFFF" },
                { name: "Borussia M'gladbach", att: 76, mid: 75, def: 76, color: "#000000", colorSec: "#FFFFFF" },
                { name: "FC Augsburg", att: 75, mid: 75, def: 74, color: "#00875A", colorSec: "#E30613" },
                { name: "Mainz 05", att: 75, mid: 75, def: 75, color: "#E30613", colorSec: "#FFFFFF" },
                { name: "Union Berlin", att: 76, mid: 75, def: 76, color: "#E30613", colorSec: "#FFFFFF" },
                { name: "VfL Bochum", att: 73, mid: 73, def: 73, color: "#005CA9", colorSec: "#FFFFFF" },
                { name: "Hamburger SV", att: 73, mid: 72, def: 73, color: "#4B2E1C", colorSec: "#FFFFFF" },
                { name: "Holstein Kiel", att: 72, mid: 72, def: 72, color: "#0000FF", colorSec: "#D50000" },
                { name: "Hamburger SV II", att: 75, mid: 74, def: 74, color: "#039BE5", colorSec: "#FFFFFF" },
                { name: "Schalke 04", att: 74, mid: 73, def: 74, color: "#0D47A1", colorSec: "#FFFFFF" }
            ]
        },
        "Ligue 1": {
            country: "Fransa",
            prestige: 3.5,
            teams: [
                { name: "PSG", att: 87, mid: 85, def: 85, color: "#0052B4", colorSec: "#E30613" },
                { name: "Monaco", att: 80, mid: 80, def: 79, color: "#E30613", colorSec: "#FFFFFF" },
                { name: "Lille", att: 79, mid: 79, def: 78, color: "#E30613", colorSec: "#002F6C" },
                { name: "Marseille", att: 79, mid: 78, def: 78, color: "#00A4E4", colorSec: "#FFFFFF" },
                { name: "Lens", att: 77, mid: 78, def: 78, color: "#FFCC00", colorSec: "#CC0000" },
                { name: "Lyon", att: 78, mid: 77, def: 77, color: "#002F6C", colorSec: "#E30613" },
                { name: "Reims", att: 76, mid: 76, def: 76, color: "#E30613", colorSec: "#FFFFFF" },
                { name: "Rennes", att: 76, mid: 77, def: 76, color: "#D50000", colorSec: "#000000" },
                { name: "Nice", att: 77, mid: 77, def: 78, color: "#D50000", colorSec: "#000000" },
                { name: "Toulouse", att: 75, mid: 76, def: 75, color: "#4B0082", colorSec: "#FFFFFF" },
                { name: "Montpellier", att: 75, mid: 75, def: 75, color: "#002F6C", colorSec: "#FF6600" },
                { name: "Strasbourg", att: 75, mid: 75, def: 76, color: "#00A4E4", colorSec: "#FFFFFF" },
                { name: "Brest", att: 76, mid: 76, def: 75, color: "#E30613", colorSec: "#FFFFFF" },
                { name: "Saint-Etienne", att: 73, mid: 74, def: 73, color: "#009240", colorSec: "#FFFFFF" },
                { name: "Nantes", att: 74, mid: 74, def: 74, color: "#FFFF00", colorSec: "#009240" },
                { name: "Auxerre", att: 73, mid: 73, def: 73, color: "#FFFFFF", colorSec: "#0000FF" },
                { name: "Le Havre", att: 72, mid: 73, def: 73, color: "#1C3C5B", colorSec: "#FFFFFF" },
                { name: "Angers", att: 71, mid: 72, def: 72, color: "#000000", colorSec: "#FFFFFF" },
                { name: "Bordeaux", att: 72, mid: 72, def: 71, color: "#1B3A4B", colorSec: "#FFFFFF" },
                { name: "Red Star FC", att: 70, mid: 70, def: 69, color: "#D50000", colorSec: "#FFFFFF" }
            ]
        }
    },

    AMATEUR_CLUBS: [
        { name: "Yıldız Gençlikspor", att: 45, mid: 43, def: 44, color: "#1B5E20", colorSec: "#FFFFFF" },
        { name: "Karadeniz Spor", att: 44, mid: 44, def: 43, color: "#0D47A1", colorSec: "#FFFFFF" },
        { name: "Anadolu Birliği SK", att: 43, mid: 42, def: 44, color: "#D50000", colorSec: "#FFD600" },
        { name: "Şehir Gençlik SK", att: 46, mid: 43, def: 43, color: "#4B0082", colorSec: "#FFFFFF" },
        { name: "Liman Gençlikspor", att: 44, mid: 45, def: 42, color: "#0D47A1", colorSec: "#FFD600" },
        { name: "Demir Çelik FK", att: 45, mid: 42, def: 45, color: "#455A64", colorSec: "#E30613" },
        { name: "Maden SK", att: 43, mid: 43, def: 44, color: "#4E342E", colorSec: "#FFFFFF" },
        { name: "İskele Gençlikspor", att: 43, mid: 44, def: 42, color: "#01579B", colorSec: "#FFFFFF" },
        { name: "Çarşı Spor Kulübü", att: 45, mid: 43, def: 43, color: "#E65100", colorSec: "#000000" },
        { name: "Sanayi Gençlik SK", att: 44, mid: 44, def: 44, color: "#37474F", colorSec: "#FFD600" },
        { name: "Mahalle Spor Kulübü", att: 42, mid: 43, def: 43, color: "#1A237E", colorSec: "#FFFFFF" },
        { name: "Belde Gençlikspor", att: 43, mid: 42, def: 44, color: "#880E4F", colorSec: "#FFFFFF" },
        { name: "Deniz Spor", att: 45, mid: 44, def: 42, color: "#006064", colorSec: "#FFFFFF" },
        { name: "Yurt Spor Kulübü", att: 43, mid: 43, def: 45, color: "#B71C1C", colorSec: "#FFFFFF" },
        { name: "Fabrika Gençlik SK", att: 44, mid: 43, def: 44, color: "#212121", colorSec: "#FFD600" }
    ],

    CHAMPIONS_LEAGUE_TEAMS: [
        { name: "Real Madrid", att: 91, mid: 89, def: 88, color: "#FFFFFF", colorSec: "#112546" },
        { name: "Barcelona", att: 88, mid: 87, def: 85, color: "#004D98", colorSec: "#A50044" },
        { name: "Atletico Madrid", att: 84, mid: 83, def: 85, color: "#CB3524", colorSec: "#192C5B" },
        { name: "Villarreal", att: 79, mid: 79, def: 77, color: "#FFD000", colorSec: "#003E7E" },
        { name: "Manchester City", att: 88, mid: 90, def: 87, color: "#6CABDD", colorSec: "#1C2C5B" },
        { name: "Arsenal", att: 86, mid: 87, def: 88, color: "#EF0107", colorSec: "#FFFFFF" },
        { name: "Liverpool", att: 87, mid: 85, def: 86, color: "#C8102E", colorSec: "#F6EB61" },
        { name: "Manchester United", att: 81, mid: 82, def: 81, color: "#DA291C", colorSec: "#000000" },
        { name: "Chelsea", att: 83, mid: 83, def: 82, color: "#034694", colorSec: "#FFFFFF" },
        { name: "Bayern Münih", att: 87, mid: 86, def: 85, color: "#DC052D", colorSec: "#0066B2" },
        { name: "Bayer Leverkusen", att: 84, mid: 85, def: 84, color: "#E30613", colorSec: "#000000" },
        { name: "Borussia Dortmund", att: 82, mid: 82, def: 83, color: "#FDE100", colorSec: "#000000" },
        { name: "Inter Milan", att: 86, mid: 86, def: 87, color: "#0066B2", colorSec: "#000000" },
        { name: "AC Milan", att: 83, mid: 82, def: 82, color: "#E30613", colorSec: "#000000" },
        { name: "Juventus", att: 82, mid: 83, def: 84, color: "#000000", colorSec: "#FFFFFF" },
        { name: "PSG", att: 87, mid: 85, def: 85, color: "#0052B4", colorSec: "#E30613" },
        { name: "Benfica", att: 82, mid: 81, def: 81, color: "#E30613", colorSec: "#FFFFFF" },
        { name: "Porto", att: 81, mid: 81, def: 80, color: "#0052B4", colorSec: "#FFFFFF" },
        { name: "Sporting Lizbon", att: 83, mid: 82, def: 81, color: "#009240", colorSec: "#FFFFFF" },
        { name: "PSV Eindhoven", att: 81, mid: 80, def: 79, color: "#E30613", colorSec: "#FFFFFF" },
        { name: "Ajax", att: 82, mid: 83, def: 80, color: "#D50000", colorSec: "#FFFFFF" },
        { name: "Celtic", att: 76, mid: 76, def: 75, color: "#009240", colorSec: "#FFFFFF" },
        { name: "Rangers", att: 75, mid: 76, def: 75, color: "#0D47A1", colorSec: "#FFFFFF" },
        { name: "Shakhtar", att: 77, mid: 78, def: 76, color: "#FF6D00", colorSec: "#000000" },
        { name: "AEK Atina", att: 74, mid: 74, def: 73, color: "#FFD600", colorSec: "#000000" },
        { name: "Olympiakos", att: 75, mid: 75, def: 74, color: "#D50000", colorSec: "#FFFFFF" },
        { name: "Galatasaray", att: 81, mid: 80, def: 79, color: "#A90432", colorSec: "#F1A80A" },
        { name: "Fenerbahçe", att: 80, mid: 80, def: 79, color: "#FFFF00", colorSec: "#0000FF" },
        { name: "Trabzonspor", att: 78, mid: 78, def: 77, color: "#800020", colorSec: "#00A4E4" },
        { name: "Beşiktaş", att: 79, mid: 79, def: 78, color: "#000000", colorSec: "#FFFFFF" },
        { name: "Başakşehir FK", att: 76, mid: 76, def: 75, color: "#FF6600", colorSec: "#002F6C" },
        { name: "Göztepe FK", att: 75, mid: 75, def: 74, color: "#FFD600", colorSec: "#D50000" }
    ],

    EUROPA_LEAGUE_TEAMS: [
        { name: "Basque Blue-White", att: 80, mid: 82, def: 81, color: "#0067B1", colorSec: "#FFFFFF" },
        { name: "Basque Red-White", att: 81, mid: 80, def: 80, color: "#EE2526", colorSec: "#FFFFFF" },
        { name: "Seville Green-White", att: 78, mid: 79, def: 77, color: "#009640", colorSec: "#FFFFFF" },
        { name: "Seville Red-White", att: 77, mid: 77, def: 78, color: "#F43333", colorSec: "#FFFFFF" },
        { name: "Birmingham Lions", att: 81, mid: 82, def: 81, color: "#95BFE5", colorSec: "#670E36" },
        { name: "London Lilywhites", att: 82, mid: 81, def: 80, color: "#132257", colorSec: "#FFFFFF" },
        { name: "Tyne Black-Whites", att: 82, mid: 81, def: 80, color: "#241F20", colorSec: "#FFFFFF" },
        { name: "London Claret", att: 80, mid: 79, def: 79, color: "#7A263A", colorSec: "#1BB1E7" },
        { name: "Leipzig Red-Blue", att: 82, mid: 82, def: 81, color: "#DD013F", colorSec: "#002F6C" },
        { name: "Stuttgart Red-White", att: 79, mid: 79, def: 78, color: "#E30613", colorSec: "#FFFFFF" },
        { name: "Frankfurt Black-Red", att: 78, mid: 78, def: 78, color: "#E1000F", colorSec: "#000000" },
        { name: "Bergamo Blue-Black", att: 82, mid: 81, def: 80, color: "#002F6C", colorSec: "#000000" },
        { name: "Rome Yellow-Red", att: 80, mid: 81, def: 81, color: "#8E1E34", colorSec: "#F1A80A" },
        { name: "Rome Sky Blue", att: 79, mid: 79, def: 79, color: "#87D3F8", colorSec: "#FFFFFF" },
        { name: "Florence Purple", att: 78, mid: 78, def: 78, color: "#4B0082", colorSec: "#FFFFFF" },
        { name: "Monaco Red-White", att: 80, mid: 80, def: 79, color: "#E30613", colorSec: "#FFFFFF" },
        { name: "Lille Red-Blue", att: 79, mid: 79, def: 78, color: "#E30613", colorSec: "#002F6C" },
        { name: "Marseille Sky Blue", att: 79, mid: 78, def: 78, color: "#00A4E4", colorSec: "#FFFFFF" },
        { name: "Bruges Blue-Black", att: 77, mid: 76, def: 76, color: "#0D47A1", colorSec: "#FFFFFF" },
        { name: "Brussels Mauves", att: 75, mid: 75, def: 74, color: "#4A148C", colorSec: "#FFFFFF" },
        { name: "Salzburg Bulls", att: 78, mid: 77, def: 76, color: "#D50000", colorSec: "#FFFFFF" },
        { name: "Prague Slavia", att: 75, mid: 75, def: 75, color: "#D50000", colorSec: "#FFFFFF" },
        { name: "Prague Spartans", att: 74, mid: 74, def: 74, color: "#8E1E34", colorSec: "#FFFFFF" },
        { name: "Zagreb Blues", att: 74, mid: 75, def: 74, color: "#0D47A1", colorSec: "#FFFFFF" },
        { name: "Belgrade Star", att: 75, mid: 74, def: 74, color: "#D50000", colorSec: "#FFFFFF" },
        { name: "Samsun FK", att: 74, mid: 73, def: 73, color: "#E30613", colorSec: "#FFFFFF" },
        { name: "Kaşımpaşa FK", att: 68, mid: 68, def: 67, color: "#0D47A1", colorSec: "#FFFFFF" },
        { name: "Antalya FK", att: 67, mid: 66, def: 66, color: "#D50000", colorSec: "#FFFFFF" },
        { name: "Sivas FK", att: 72, mid: 71, def: 71, color: "#D50000", colorSec: "#FFFFFF" }
    ],

    getRandomAmateurClub: function() {
        const clubs = this.AMATEUR_CLUBS;
        return clubs[Math.floor(Math.random() * clubs.length)];
    },

    LIFESTYLE_ITEMS: [
        { id: "nutritionist", name: "Özel Beslenme Şefi", cost: 300, isWeekly: true, desc: "Kondisyon yenilenmesini %15 artırır. (Haftalık 300 €)", effect: (s) => { s.kondisyonRegenBonus += 15; } },
        { id: "doc_ahmet", name: "👨‍⚕️ Fizyoterapist Ahmet", cost: 150, isWeekly: true, desc: "Haftalık 150 €. Antrenman enerji maliyetini düşürür (-5 Enerji). Sakatlık süresini 1 hafta kısaltır.", effect: (s) => {} },
        { id: "doc_can", name: "🩺 Prof. Dr. Can (Özel Doktor)", cost: 800, isWeekly: true, desc: "Haftalık 800 €. Sakatlık iyileşme süresini %50 kısaltır. Genel sakatlanma riskini %40 düşürür.", effect: (s) => {} },
        { id: "doc_clinic", name: "🏥 Elit Sağlık Kliniği Üyeliği", cost: 2500, isWeekly: true, desc: "Haftalık 2500 €. Sakatlanma riskini %80 azaltır. Sakatlandığında iyileşme süresini 1 haftaya sabitler.", effect: (s) => {} },
        { id: "pr_agent", name: "Sosyal Medya/PR Menajeri", cost: 400, isWeekly: true, desc: "Sponsorluk gelirlerini %20 artırır. (Haftalık 400 €)", effect: (s) => { s.sponsorIncomeBonus += 20; } },
        { id: "bodyguard", name: "🛡️ Özel Koruma (Bodyguard)", cost: 1200, isWeekly: true, desc: "Seni mafya baskınlarından, kurşunlamalardan ve haraç kesilmesinden %100 korur. (Haftalık 1200 €)", effect: (s) => {} },
        { id: "sports_car", name: "Lüks Spor Araba", cost: 180000, isWeekly: false, desc: "180,000 €. +50,000 Sosyal Medya Takipçisi, -10 Hoca Güveni.", effect: (s) => { s.followers += 50000; s.hocaGuveni = Math.max(0, s.hocaGuveni - 10); } },
        { id: "penthouse", name: "Boğaz Manzaralı Rezidans", cost: 650000, isWeekly: false, desc: "650,000 €. Moral seviyesini maksimuma sabitlemeye yardımcı olur (+25 Moral).", effect: (s) => { s.moral = Math.min(100, s.moral + 25); } },
        { id: "yacht", name: "🚢 Ultra Lüks Yat", cost: 1500000, isWeekly: false, desc: "1,500,000 €. +120,000 Takipçi, +45 Moral. Haftalık bakım masrafı: 12,000 €.", effect: (s) => { s.followers += 120000; s.moral = Math.min(100, s.moral + 45); } },
        { id: "jet", name: "✈️ Özel Jet", cost: 5000000, isWeekly: false, desc: "5,000,000 €. +400,000 Takipçi, +60 Moral. Haftalık uçuş ve hangar masrafı: 35,000 €.", effect: (s) => { s.followers += 400000; s.moral = Math.min(100, s.moral + 60); } },
        { id: "mansion", name: "🏰 Tarihi Boğaz Yalısı", cost: 3500000, isWeekly: false, desc: "3,500,000 €. Prestij simgesi! +250,000 Takipçi, +80 Moral.", effect: (s) => { s.followers += 250000; s.moral = Math.min(100, s.moral + 80); } },
        { id: "gerze_fc", name: "👑 Gerze Belediyespor Kulübü", cost: 10000000, isWeekly: false, desc: "10,000,000 €. Memleketinin takımını satın alıp başkan ol! Her hafta +15,000 Takipçi ve +10,000 € pasif gelir sağlar.", effect: (s) => { s.followers += 50000; } }
    ],

    GIRLFRIENDS: [
        {
            id: "ecrin",
            name: "Ecrin",
            role: "Sadık Sevgili",
            desc: "Her zaman seninle gurur duyan ve kariyerinde en büyük destekçin olan sadık sevgilin.",
            avatar: "💄",
            cost: 150,
            reqs: { rating: 0, followers: 0 },
            reqsText: "Yok",
            weeklyEffectText: "+15 Moral, +5 Hoca Güveni, +500 Takipçi / Hafta (Gider: 150 €/Hafta)",
            applyWeekly: (s) => {
                s.moral = Math.min(100, s.moral + 15);
                s.hocaGuveni = Math.min(100, s.hocaGuveni + 5);
                s.followers += 500;
            }
        },
        {
            id: "sweetheart",
            name: "Beyza",
            role: "Sınıf Arkadaşı / Lise Aşkı",
            desc: "Sınıfından lise aşkın. Gösterişi sevmez, her zaman senin yanındadır ve manevi olarak seni destekler.",
            avatar: "❤️",
            cost: 80,
            reqs: { rating: 0, followers: 0 },
            reqsText: "Yok",
            weeklyEffectText: "+8 Moral / Hafta (Gider: 80 €/Hafta)",
            applyWeekly: (s) => {
                s.moral = Math.min(100, s.moral + 8);
            }
        },
        {
            id: "influencer",
            name: "Dilara",
            role: "Sosyal Medya Fenomeni",
            desc: "Maçlardaki performansın ve yeteneğinle ona hayran kalan popüler bir spor ve yaşam influencer'ı. Alışverişi sever.",
            avatar: "💋",
            cost: 900,
            reqs: { rating: 58, followers: 0 },
            reqsText: "Rating >= 58",
            weeklyEffectText: "+12 Moral, +5 Hoca Güveni, +800 Takipçi / Hafta (Gider: 900 €/Hafta)",
            applyWeekly: (s) => {
                s.moral = Math.min(100, s.moral + 12);
                s.hocaGuveni = Math.min(100, s.hocaGuveni + 5);
                s.followers += 800;
            }
        },
        {
            id: "model",
            name: "Kübra",
            role: "Ünlü Model",
            desc: "Onunla görünmek prestijdir ama pahalıdır. Lüks tatil, pırlanta, özel jet ve bitmeyen istekleri vardır.",
            avatar: "💖",
            cost: 7500,
            reqs: { rating: 65, followers: 15000 },
            reqsText: "Rating >= 65 & Takipçi >= 15,000",
            weeklyEffectText: "+25 Moral, -10 Hoca Güveni, +3,000 Takipçi / Hafta (Gider: 7500 €/Hafta)",
            applyWeekly: (s) => {
                s.moral = Math.min(100, s.moral + 25);
                s.hocaGuveni = Math.max(0, s.hocaGuveni - 10);
                s.followers += 3000;
            }
        },
        {
            id: "ece",
            name: "Ece",
            role: "Cemiyet Güzeli (22 Yaşında)",
            desc: "Hafif sarı saçlı, dolgun dudaklı ve büyüleyici güzellikte bir cemiyet ikonu. Onunla sevgili olmak seni en üst düzey elitlerin arasına sokar.",
            avatar: "👑",
            cost: 25000,
            reqs: { rating: 85, followers: 1000000 },
            reqsText: "Rating >= 85 ve 1M+ Takipçi",
            weeklyEffectText: "+35 Moral, +15 Hoca Güveni, +6,000 Takipçi / Hafta (Gider: 25.000 €/Hafta)",
            applyWeekly: (s) => {
                s.moral = Math.min(100, s.moral + 35);
                s.hocaGuveni = Math.min(100, s.hocaGuveni + 15);
                s.followers += 6000;
            }
        }
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
        let finalSalary = Math.round(baseSalary);

        // Lig bazlı Maaş Sınırları (Salary Caps)
        let cap = 300000; // Varsayılan Premier League vb. için 300.000 €/Hafta
        if (leagueName === "3. Lig") cap = 2500;
        else if (leagueName === "2. Lig") cap = 6000;
        else if (leagueName === "1. Lig") cap = 15000;
        else if (leagueName === "Süper Lig") cap = 120000;

        return Math.min(cap, finalSalary);
    },

    BOOT_SPONSORS: [
        {
            id: "adidas_copa",
            brand: "Adidas",
            model: "Copa Pure",
            reqRating: 50,
            reqFollowers: 1000,
            weeklyPay: 100,
            bonus: { speed: 1, shooting: 1, passing: 1 },
            color: "#ffffff",
            desc: "Klasik deri krampon. Dengeli yetenek artışı ve başlangıç sponsorluk geliri sağlar. (+1 Şut, +1 Pas, +1 Hız)"
        },
        {
            id: "puma_future",
            brand: "Puma",
            model: "Future Ultimate",
            reqRating: 62,
            reqFollowers: 8000,
            weeklyPay: 350,
            bonus: { speed: 4, shooting: 0, passing: 2 },
            color: "#e0f7fa",
            desc: "Çeviklik ve pas hassasiyeti için tasarlanmış modern krampon. (+4 Hız, +2 Pas)"
        },
        {
            id: "nike_mercurial",
            brand: "Nike",
            model: "Mercurial Superfly",
            reqRating: 70,
            reqFollowers: 20000,
            weeklyPay: 800,
            bonus: { speed: 5, shooting: 3, passing: 0 },
            color: "#ff8f00",
            desc: "Saf hız ve bitiricilik arayanların tercihi. Haftalık 800 € sponsorluk geliri! (+5 Hız, +3 Şut)"
        },
        {
            id: "adidas_predator",
            brand: "Adidas",
            model: "Predator Elite",
            reqRating: 78,
            reqFollowers: 50000,
            weeklyPay: 2000,
            bonus: { speed: 2, shooting: 6, passing: 2 },
            color: "#d50000",
            desc: "Sahada tam kontrol ve ölümcül falsolu şutlar için. (+6 Şut, +2 Pas, +2 Hız)"
        }
    ],

    NATIONAL_TEAMS: [
        { name: "Almanya", att: 84, mid: 85, def: 83, color: "#111111" },
        { name: "Fransa", att: 86, mid: 85, def: 85, color: "#002060" },
        { name: "İngiltere", att: 85, mid: 86, def: 84, color: "#ffffff" },
        { name: "İtalya", att: 82, mid: 83, def: 84, color: "#0070c0" },
        { name: "Hollanda", att: 83, mid: 82, def: 83, color: "#ff6600" },
        { name: "İspanya", att: 85, mid: 87, def: 83, color: "#c00000" }
    ],

    CONSUMABLES: [
        {
            id: "energy_drink",
            name: "⚡ Enerji İçeceği",
            cost: 1200,
            desc: "Anında +35 Kondisyon verir. Dinlenmeye gerek kalmadan sonraki maça hazır olursun!",
            effect: (s) => {
                s.kondisyon = Math.min(100, s.kondisyon + 35);
            }
        },
        {
            id: "nrg_drink",
            name: "⚡ NRG Enerji İçeceği (NSS Özel)",
            cost: 2800,
            desc: "NSS efsanesi NRG içeceği! Kondisyonunu anında +50 doldurur ve +5 Moral verir.",
            effect: (s) => {
                s.kondisyon = Math.min(100, s.kondisyon + 50);
                s.moral = Math.min(100, s.moral + 5);
            }
        },
        {
            id: "vitamin_booster",
            name: "💊 Vitamin Takviyesi",
            cost: 3200,
            desc: "Kondisyonunu +60 doldurur ve bağışıklık sistemini güçlendirir.",
            effect: (s) => {
                s.kondisyon = Math.min(100, s.kondisyon + 60);
            }
        },
        {
            id: "physio_massage",
            name: "💆 Fizyoterapi & Masaj",
            cost: 6500,
            desc: "Kondisyonunu tamamen (%100) doldurur ve yorgun kaslarını rahatlatarak +5 Moral sağlar.",
            effect: (s) => {
                s.kondisyon = 100;
                s.moral = Math.min(100, s.moral + 5);
            }
        }
    ],

    PURCHASABLE_BOOTS: [
        {
            id: "kipsta_basic",
            brand: "Kipsta",
            model: "Agility 100",
            cost: 200,
            bonus: { speed: 1, shooting: 0, passing: 0 },
            desc: "Ekonomik, başlangıç seviyesi suni çim kramponu. (+1 Hız)"
        },
        {
            id: "nike_premier",
            brand: "Nike",
            model: "Premier III",
            cost: 1500,
            bonus: { speed: 2, shooting: 1, passing: 1 },
            desc: "Klasik kanguru derisi krampon. Dengeli oyun sunar. (+2 Hız, +1 Şut, +1 Pas)"
        },
        {
            id: "puma_king",
            brand: "Puma",
            model: "King Ultimate",
            cost: 4500,
            bonus: { speed: 3, shooting: 2, passing: 2 },
            desc: "Gelişmiş kontrol ve pas hassasiyeti sunan profesyonel deri krampon. (+3 Hız, +2 Şut, +2 Pas)"
        }
    ],

    CRYPTO_ASSETS: [
        { id: "btc", name: "Bitcoin (BTC)", symbol: "BTC", basePrice: 52000, desc: "Borsanın en büyük ve en güvenli limanı. Düşük risk, dengeli dalgalanma." },
        { id: "eth", name: "Ethereum (ETH)", symbol: "ETH", basePrice: 3200, desc: "Akıllı sözleşmelerin lideri. Orta seviye risk ve orta dalgalanma." },
        { id: "doge", name: "Dogecoin (DOGE)", symbol: "DOGE", basePrice: 0.15, desc: "Sosyal medya spekülasyonlarıyla beslenen aşırı riskli şaka coini." },
        { id: "atl", name: "Atlas Coin (ATL)", symbol: "ATL", basePrice: 1.0, desc: "Kariyerine bağlı fan token! Değeri senin rating ve maç performansına göre dalgalanır." }
    ],

    HOMETOWN_INVESTMENTS: [
        {
            id: "tea_garden",
            name: "☕ Yerel Çay Bahçesi",
            cost: 10000,
            weeklyYield: 150,
            desc: "Sahilde ailelerin dinlendiği samimi bir çay bahçesi. (+150 €/Hafta)"
        },
        {
            id: "orchard",
            name: "🌳 Tarım Arazisi (Fındık/Zeytin)",
            cost: 40000,
            weeklyYield: 800,
            desc: "Verimli fındık veya zeytin tarım arazisi. Güvenli yatırım. (+800 €/Hafta)"
        },
        {
            id: "local_sponsor",
            name: "⚽ Yerel Kulüp Sponsorluğu",
            cost: 120000,
            weeklyYield: 0,
            desc: "Memleketinin amatör kulübüne destek. Kar getirmez ama anında +15.000 takipçi kazandırır."
        },
        {
            id: "textile_factory",
            name: "🏭 Memleket Fabrikası",
            cost: 250000,
            weeklyYield: 6200,
            desc: "İstihdam sağlayan modern bir dikim atölyesi. Müthiş getiri! (+6.200 €/Hafta)"
        }
    ],

    AGENTS: [
        {
            id: "bedirhan",
            name: "Bedirhan Abi",
            title: "Mahalle Abisi",
            desc: "Semtin abisidir. Sıfır lüks, sıfır hava. İş bitiriciliği az ama komisyonu çok insaflıdır.",
            avatar: "👨🏻‍💼",
            commissionRate: 0.02,
            negotiationBonus: 0.10,
            offerFrequencyBonus: 0,
            eliteOfferBonus: 0,
            signBonusMultiplier: 1.0,
            cost: 0
        },
        {
            id: "izi",
            name: "İzim",
            title: "Kumral Temsilci",
            desc: "Kumral saçlı, son derece hırslı ve çalışkan menajerin. Kulüplerle masaya oturduğunda en iyi maaşı ve transfer şartlarını kapar.",
            avatar: "👩🏼‍💼",
            commissionRate: 0.04,
            negotiationBonus: 0.35,
            offerFrequencyBonus: 0.40,
            eliteOfferBonus: 0.30,
            signBonusMultiplier: 1.20,
            cost: 8000
        },
        {
            id: "mert",
            name: "Mert Karahan",
            title: "Diplomalı Profesyonel",
            desc: "TFF lisanslı, profesyonel ilişkileri güçlü menajer. Sürekli telefonla yeni kulüpler ayarlar.",
            avatar: "💼",
            commissionRate: 0.05,
            negotiationBonus: 0.20,
            offerFrequencyBonus: 0.30,
            eliteOfferBonus: 0.10,
            signBonusMultiplier: 1.0,
            cost: 5000
        },
        {
            id: "mino",
            name: "Mino Polat",
            title: "Süper Menajer",
            desc: "Dünya devleriyle masaya oturan efsane menajer. Kulüplerden imza parasını ve zammı söke söke alır.",
            avatar: "🕶️",
            commissionRate: 0.10,
            negotiationBonus: 0.40,
            offerFrequencyBonus: 0.50,
            eliteOfferBonus: 0.40,
            signBonusMultiplier: 1.25,
            cost: 25000
        }
    ],

    PACK_PLAYERS: [
        // Commons (+1 Buffs)
        { id: "kerem", name: "Kerem Akturk", rating: 80, pos: "SLK", nation: "🇹🇷", stat: "speed", buff: 1, desc: "+1 Hız kazandırır", bg: "linear-gradient(135deg, #78909C 0%, #37474F 100%)", isLegend: false, isCommon: true },
        { id: "baris", name: "Baris Alper", rating: 80, pos: "SĞK", nation: "🇹🇷", stat: "physical", buff: 1, desc: "+1 Fizik kazandırır", bg: "linear-gradient(135deg, #78909C 0%, #37474F 100%)", isLegend: false, isCommon: true },
        { id: "semih_k", name: "Semih Kilic", rating: 78, pos: "SNT", nation: "🇹🇷", stat: "shooting", buff: 1, desc: "+1 Şut kazandırır", bg: "linear-gradient(135deg, #78909C 0%, #37474F 100%)", isLegend: false, isCommon: true },
        { id: "ferdi", name: "Ferdi Kadi", rating: 81, pos: "SLB", nation: "🇹🇷", stat: "dribbling", buff: 1, desc: "+1 Top Sürme", bg: "linear-gradient(135deg, #78909C 0%, #37474F 100%)", isLegend: false, isCommon: true },
        { id: "szymanski", name: "S. Symanski", rating: 80, pos: "OOS", nation: "🇵🇱", stat: "passing", buff: 1, desc: "+1 Pas", bg: "linear-gradient(135deg, #78909C 0%, #37474F 100%)", isLegend: false, isCommon: true },
        { id: "nelsson", name: "V. Nelson", rating: 80, pos: "STP", nation: "🇩🇰", stat: "defense", buff: 1, desc: "+1 Defans", bg: "linear-gradient(135deg, #78909C 0%, #37474F 100%)", isLegend: false, isCommon: true },

        // Rare Golds (+2 Buffs)
        { id: "guler", name: "Arda Guler", rating: 84, pos: "OOS", nation: "🇹🇷", stat: "passing", buff: 2, desc: "+2 Pas (+15k Takipçi)", bg: "linear-gradient(135deg, #ECEFF1 0%, #CFD8DC 100%)", isLegend: false, isRareGold: true },
        { id: "icardi", name: "Mauro İkardi", rating: 83, pos: "SNT", nation: "🇦🇷", stat: "shooting", buff: 2, desc: "+2 Şut kazandırır", bg: "linear-gradient(135deg, #ECEFF1 0%, #CFD8DC 100%)", isLegend: false, isRareGold: true },
        { id: "dzeko", name: "Edin Ceko", rating: 82, pos: "SNT", nation: "🇧🇦", stat: "shooting", buff: 2, desc: "+2 Şut kazandırır", bg: "linear-gradient(135deg, #ECEFF1 0%, #CFD8DC 100%)", isLegend: false, isRareGold: true },
        { id: "muslera", name: "Nando Musler", rating: 83, pos: "KL", nation: "🇺🇾", stat: "defense", buff: 2, desc: "+2 Defans kazandırır", bg: "linear-gradient(135deg, #ECEFF1 0%, #CFD8DC 100%)", isLegend: false, isRareGold: true },
        
        // Elites (+3 Buffs)
        { id: "mbappe", name: "Kylian Mbeppe", rating: 91, pos: "SLK", nation: "🇫🇷", stat: "speed", buff: 3, desc: "+3 Hız kazandırır", bg: "radial-gradient(circle, #FFE082 0%, #FFB300 35%, #3e2723 75%, #150c0a 100%)", isLegend: false },
        { id: "haaland", name: "Erling Haland", rating: 91, pos: "SNT", nation: "🇳🇴", stat: "shooting", buff: 3, desc: "+3 Şut kazandırır", bg: "radial-gradient(circle, #FFE082 0%, #FFB300 35%, #3e2723 75%, #150c0a 100%)", isLegend: false },
        { id: "messi", name: "L. Messy", rating: 90, pos: "SĞK", nation: "🇦🇷", stat: "passing", buff: 3, desc: "+3 Pas kazandırır", bg: "radial-gradient(circle, #FFE082 0%, #FFB300 35%, #3e2723 75%, #150c0a 100%)", isLegend: false },
        { id: "ronaldo", name: "C. Ronald", rating: 90, pos: "SNT", nation: "🇵🇹", stat: "shooting", buff: 3, desc: "+3 Şut kazandırır", bg: "radial-gradient(circle, #FFE082 0%, #FFB300 35%, #3e2723 75%, #150c0a 100%)", isLegend: false },
        { id: "bellingham", name: "Jude Belingam", rating: 90, pos: "OS", nation: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", stat: "physical", buff: 3, desc: "+3 Fizik kazandırır", bg: "radial-gradient(circle, #FFE082 0%, #FFB300 35%, #3e2723 75%, #150c0a 100%)", isLegend: false },
        { id: "vinicius", name: "Vinicius Jr.", rating: 90, pos: "SLK", nation: "🇧🇷", stat: "dribbling", buff: 3, desc: "+3 Top Sürme", bg: "radial-gradient(circle, #FFE082 0%, #FFB300 35%, #3e2723 75%, #150c0a 100%)", isLegend: false },
        { id: "vandijk", name: "V. van Dyk", rating: 89, pos: "STP", nation: "🇳🇱", stat: "defense", buff: 3, desc: "+3 Defans", bg: "radial-gradient(circle, #FFE082 0%, #FFB300 35%, #3e2723 75%, #150c0a 100%)", isLegend: false },
        
        // Legends (Icons - +4 or +5 Buffs)
        { id: "pele", name: "Pele", rating: 95, pos: "SNT", nation: "🇧🇷", stat: "shooting", buff: 5, desc: "+5 Şut (Efsane)", bg: "radial-gradient(circle at 50% 25%, #E1BEE7 0%, #8E24AA 35%, #311B92 75%, #0A0025 100%)", isLegend: true },
        { id: "maradona", name: "D. Maradona", rating: 95, pos: "OOS", nation: "🇦🇷", stat: "dribbling", buff: 5, desc: "+5 Top Sürme (Efsane)", bg: "radial-gradient(circle at 50% 25%, #E1BEE7 0%, #8E24AA 35%, #311B92 75%, #0A0025 100%)", isLegend: true },
        { id: "ronaldinho", name: "Ronaldino", rating: 93, pos: "SLK", nation: "🇧🇷", stat: "dribbling", buff: 4, desc: "+4 Top Sürme (Efsane)", bg: "radial-gradient(circle at 50% 25%, #E1BEE7 0%, #8E24AA 35%, #311B92 75%, #0A0025 100%)", isLegend: true },
        { id: "zidane", name: "Z. Zidan", rating: 94, pos: "OOS", nation: "🇫🇷", stat: "passing", buff: 4, desc: "+4 Pas (Efsane)", bg: "radial-gradient(circle at 50% 25%, #E1BEE7 0%, #8E24AA 35%, #311B92 75%, #0A0025 100%)", isLegend: true },
        { id: "maldini", name: "P. Maldiny", rating: 92, pos: "STP", nation: "🇮🇹", stat: "defense", buff: 4, desc: "+4 Defans (Efsane)", bg: "radial-gradient(circle at 50% 25%, #E1BEE7 0%, #8E24AA 35%, #311B92 75%, #0A0025 100%)", isLegend: true }
    ]
};

if (typeof module !== "undefined" && module.exports) {
    module.exports = DATABASE;
}
