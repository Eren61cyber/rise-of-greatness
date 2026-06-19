const players = [
  {
    name: "Paul Onuachu",
    team: "Trabzonspor",
    position: "Forvet",
    age: 31,
    marketValue: 12,
    goals: 22,
    assists: 2,
    minutes: 2500,
    bigMatch: 91,
    form: 93,
    story: "Lig gol kralligi seviyesine cikan, hava gucu ve ceza sahasi bitiriciligiyle sezonun en buyuk etkilerinden biri.",
    career: ["Midtjylland", "Genk", "Southampton", "Trabzonspor"],
    strengths: ["Hava toplari", "Ceza sahasi", "Bitiricilik"],
    profile: "Uzun boyu ve fizik gucuyle ceza sahasinda fark yaratan klasik santrfor. Trabzonspor icin sadece gol degil, rakip savunmayi geri iten bir oyun merkezi."
  },
  {
    name: "Eldor Shomurodov",
    team: "Basaksehir",
    position: "Forvet",
    age: 31,
    marketValue: 8,
    goals: 22,
    assists: 5,
    minutes: 2450,
    bigMatch: 86,
    form: 91,
    story: "Basaksehir'in skor yukunu tasiyan, gol katkisi ve istikrariyla deger/etki listesinde yukari tirmanan santrfor.",
    career: ["Bunyodkor", "Rostov", "Genoa", "Roma", "Basaksehir"],
    strengths: ["Kosular", "Skor sezgisi", "Fizik"],
    profile: "Ceza sahasina dogru zamanlamayla giren, takim oyunu icinde skor tehdidi yaratan hareketli forvet profili."
  },
  {
    name: "Talisca",
    team: "Fenerbahce",
    position: "Orta saha",
    age: 32,
    marketValue: 13,
    goals: 19,
    assists: 4,
    minutes: 2300,
    bigMatch: 88,
    form: 89,
    story: "Skor tehdidi yuksek, ceza sahasi disi sut ve duran top etkisiyle Fenerbahce'nin en net hucum silahlarindan.",
    career: ["Bahia", "Benfica", "Besiktas", "Guangzhou", "Al Nassr", "Fenerbahce"],
    strengths: ["Sut", "Duran top", "Skor katkisi"],
    profile: "Klasik on numara ile ikinci forvet arasinda oynayabilen, uzaktan sut ve duran toplarla macin dengesini degistiren oyuncu."
  },
  {
    name: "Victor Osimhen",
    team: "Galatasaray",
    position: "Forvet",
    age: 27,
    marketValue: 75,
    goals: 15,
    assists: 5,
    minutes: 2100,
    bigMatch: 90,
    form: 88,
    story: "Piyasa degeri cok yuksek ama skor, pres ve fiziksel baski tarafinda Galatasaray'a elit seviye etki veren forvet.",
    career: ["Wolfsburg", "Charleroi", "Lille", "Napoli", "Galatasaray"],
    strengths: ["Pres", "Derin kosu", "Bitiricilik"],
    profile: "Modern elit santrfor profili. Sadece gol atmaz; savunmayi zorlar, presi baslatir ve takim hucumunu fiziksel olarak yukari tasir."
  },
  {
    name: "Mohamed Bayo",
    team: "Gaziantep",
    position: "Forvet",
    age: 28,
    marketValue: 4,
    goals: 15,
    assists: 3,
    minutes: 2200,
    bigMatch: 82,
    form: 86,
    story: "Buyuk takim disindan gelip gol listesine giren, degerine gore ciddi skor etkisi ureten forvet profili.",
    career: ["Clermont", "Lille", "Le Havre", "Watford", "Gaziantep"],
    strengths: ["Bitiricilik", "Pozisyon alma", "Fizik"],
    profile: "Buyuk takim disinda skor ureten forvetler bu projenin en degerli hikayesi. Bayo, maliyet/katki analizinde tam bu yuzden one cikiyor."
  },
  {
    name: "Mauro Icardi",
    team: "Galatasaray",
    position: "Forvet",
    age: 33,
    marketValue: 10,
    goals: 14,
    assists: 4,
    minutes: 2050,
    bigMatch: 87,
    form: 85,
    story: "Klasik bitirici roluyle az alanda cok is yapan, buyuk anlarda skor tehdidi yuksek Galatasaray kaptani.",
    career: ["Sampdoria", "Inter", "PSG", "Galatasaray"],
    strengths: ["Pozisyon alma", "Penalti", "Tek vurus"],
    profile: "Ceza sahasinda az temasla maksimum sonuc almaya calisan elit bitirici. Kariyer markasi tamamen skor ve buyuk an hissi uzerine kurulu."
  },
  {
    name: "Felipe Augusto",
    team: "Trabzonspor",
    position: "Forvet",
    age: 22,
    marketValue: 3.5,
    goals: 13,
    assists: 2,
    minutes: 2250,
    bigMatch: 84,
    form: 88,
    story: "Trabzonspor'un skor dagilimini guclendiren, yasi ve maliyetiyle scout radarinda durmasi gereken hucumcu.",
    career: ["Corinthians", "Cercle Brugge", "Trabzonspor"],
    strengths: ["Potansiyel", "Ceza sahasi", "Hareketlilik"],
    profile: "Yasi ve skor katkisi bir araya geldiginde scout radarina giren profillerden. Deger skorunda yukselme potansiyeli yuksek."
  },
  {
    name: "Marco Asensio",
    team: "Fenerbahce",
    position: "Orta saha",
    age: 30,
    marketValue: 18,
    goals: 11,
    assists: 12,
    minutes: 2350,
    bigMatch: 85,
    form: 87,
    story: "Gol ve asist dengesini birlikte tasiyan, degeri yuksek ama toplam hucum katkisi da cok guclu profil.",
    career: ["Mallorca", "Real Madrid", "PSG", "Aston Villa", "Fenerbahce"],
    strengths: ["Sut", "Pas kalitesi", "Tecrube"],
    profile: "Teknik kalite ve son pas tehdidiyle oynayan sol ayakli hucum oyuncusu. Degeri yuksek olsa da toplam hucum etkisiyle analizde anlamli yer tutuyor."
  },
  {
    name: "Ernest Muci",
    team: "Trabzonspor",
    position: "Orta saha",
    age: 25,
    marketValue: 9,
    goals: 10,
    assists: 4,
    minutes: 2100,
    bigMatch: 88,
    form: 90,
    story: "Buyuk maclarda skor ureten, orta saha/hucum arasi rolde Trabzonspor'a farkli bir bitiricilik katan oyuncu.",
    career: ["Tirana", "Legia Warsaw", "Besiktas", "Trabzonspor"],
    strengths: ["Sut", "Yaraticilik", "Buyuk mac"],
    profile: "Hucum orta saha ve kanat rollerine kayabilen, skor tehdidiyle klasik pasor orta sahadan ayrilan dinamik profil."
  },
  {
    name: "Dorgeles Nene",
    team: "Fenerbahce",
    position: "Kanat",
    age: 23,
    marketValue: 18,
    goals: 11,
    assists: 5,
    minutes: 1900,
    bigMatch: 86,
    form: 89,
    story: "Hat-trick etkisiyle one cikan, hiz ve skor tehdidiyle Fenerbahce'nin patlama potansiyeli yuksek kanadi.",
    career: ["Salzburg", "Westerlo", "Fenerbahce"],
    strengths: ["Hiz", "Bire bir", "Patlama"],
    profile: "Genc, hizli ve direkt oynayan kanat profili. Form yakaladiginda maci bir anda acabilen oyuncu tiplerinden."
  },
  {
    name: "Juan",
    team: "Goztepe",
    position: "Kanat",
    age: 23,
    marketValue: 2.2,
    goals: 11,
    assists: 2,
    minutes: 1950,
    bigMatch: 79,
    form: 84,
    story: "Goztepe tarafinda skor katkisi veren, buyuk butceli olmayan takimdan deger/katki listesine giren hucumcu.",
    career: ["Gremio", "Santos", "Goztepe"],
    strengths: ["Skor katkisi", "Hareketlilik", "Firsatcilik"],
    profile: "Buyuk takim disindan gelen skor katkisi projeye hikaye katar. Juan gibi oyuncular deger/katki listelerinin en eglenceli tarafini olusturur."
  },
  {
    name: "Mateusz Lis",
    team: "Goztepe",
    position: "Kaleci",
    age: 29,
    marketValue: 2,
    goals: 0,
    assists: 0,
    minutes: 3000,
    bigMatch: 86,
    form: 92,
    story: "Clean sheet listesinde zirveye oynayan, kaleci etkisini deger/katki modeline dahil etmemiz gerektigini gosteren isim.",
    career: ["Lech Poznan", "Southampton", "Troyes", "Goztepe"],
    strengths: ["Refleks", "Clean sheet", "Konsantrasyon"],
    profile: "Kaleciler icin gol/asist modeli yetmez. Lis, kurtaris ve clean sheet etkisini ayri puanlamamiz gerektigini gosteren iyi bir ornek."
  },
  {
    name: "Muhammed Sengezer",
    team: "Basaksehir",
    position: "Kaleci",
    age: 29,
    marketValue: 2.5,
    goals: 0,
    assists: 0,
    minutes: 2850,
    bigMatch: 83,
    form: 88,
    story: "Basaksehir savunma performansinin merkezindeki kaleci; clean sheet katkisi onu radar listesinde tutuyor.",
    career: ["Bursaspor", "Basaksehir", "Adana Demirspor", "Basaksehir"],
    strengths: ["Refleks", "Pozisyon", "Istikrar"],
    profile: "Savunma istikrarinin merkezinde duran kaleci. Deger/etki modelinde kaleci rolu icin ayri agirliklar kullanmamiz gerektigini destekliyor."
  },
  {
    name: "Ugurcan Cakir",
    team: "Galatasaray",
    position: "Kaleci",
    age: 30,
    marketValue: 15,
    goals: 0,
    assists: 0,
    minutes: 2900,
    bigMatch: 89,
    form: 87,
    story: "Sezon icinde Trabzonspor-Galatasaray hikayesiyle dikkat ceken, buyuk takim kalecisi etkisini temsil eden profil.",
    career: ["1461 Trabzon", "Trabzonspor", "Galatasaray"],
    strengths: ["Liderlik", "Refleks", "Buyuk mac"],
    profile: "Turkiye liginin en bilinen kaleci profillerinden. Buyuk takim kalecisinde beklenti yuksek oldugu icin deger/etki yorumu farkli ele alinmali."
  }
];

const teamThemes = [
  { name: "Lig temasi", primary: "#20b86f", secondary: "#e0a33a", accent: "#d85f4f", dark: "#101713" },
  { name: "Galatasaray", primary: "#a90432", secondary: "#f4b000", accent: "#ff6a13", dark: "#18070c" },
  { name: "Fenerbahce", primary: "#003f8f", secondary: "#ffd200", accent: "#ffffff", dark: "#07172f" },
  { name: "Besiktas", primary: "#111111", secondary: "#ffffff", accent: "#d71920", dark: "#050505" },
  { name: "Trabzonspor", primary: "#7a263a", secondary: "#5bb6d6", accent: "#f1d2dc", dark: "#160b12" },
  { name: "Basaksehir", primary: "#f47b20", secondary: "#173b7a", accent: "#ffffff", dark: "#1f1308" },
  { name: "Goztepe", primary: "#d71920", secondary: "#f8d000", accent: "#111111", dark: "#190908" },
  { name: "Kocaelispor", primary: "#138a44", secondary: "#111111", accent: "#ffffff", dark: "#07150d" },
  { name: "Samsunspor", primary: "#d71920", secondary: "#ffffff", accent: "#111111", dark: "#190909" },
  { name: "Konyaspor", primary: "#159447", secondary: "#ffffff", accent: "#d71920", dark: "#07170e" },
  { name: "Rizespor", primary: "#007a3d", secondary: "#0b69b3", accent: "#ffffff", dark: "#06141a" },
  { name: "Kayserispor", primary: "#d71920", secondary: "#ffd200", accent: "#111111", dark: "#1a0d07" },
  { name: "Gaziantep", primary: "#d71920", secondary: "#111111", accent: "#ffffff", dark: "#180807" },
  { name: "Genclerbirligi", primary: "#d71920", secondary: "#111111", accent: "#ffffff", dark: "#170708" },
  { name: "Eyupspor", primary: "#5b2c83", secondary: "#f2c14e", accent: "#ffffff", dark: "#160d1f" },
  { name: "Kasimpasa", primary: "#174a9c", secondary: "#ffffff", accent: "#2bb3e7", dark: "#071326" },
  { name: "Alanyaspor", primary: "#f47b20", secondary: "#16823a", accent: "#ffffff", dark: "#1d1208" },
  { name: "Antalyaspor", primary: "#d71920", secondary: "#ffffff", accent: "#111111", dark: "#180807" },
  { name: "Fatih Karagumruk", primary: "#d71920", secondary: "#111111", accent: "#ffffff", dark: "#190707" }
];

const teamSquads = {
  Alanyaspor: [
    { name: "Ertugrul Taskiran", position: "Kaleci", note: "Clean sheet listesi" },
    { name: "Takim veri seti", position: "Guncellenecek", note: "Kadro derinlestirme sirasinda eklenecek" }
  ],
  Antalyaspor: [
    { name: "Takim veri seti", position: "Guncellenecek", note: "Oyuncular dogrulanip eklenecek" }
  ],
  Basaksehir: [
    { name: "Muhammed Sengezer", position: "Kaleci", note: "Clean sheet listesi" },
    { name: "Eldor Shomurodov", position: "Forvet", note: "Gol kralligi listesi" },
    { name: "Takim veri seti", position: "Guncellenecek", note: "Kadro derinlestirme sirasinda eklenecek" }
  ],
  Besiktas: [
    { name: "Mert Gunok", position: "Kaleci", note: "Sezon kadrosu" },
    { name: "Ersin Destanoglu", position: "Kaleci", note: "Sezon kadrosu" },
    { name: "Emre Bilgin", position: "Kaleci", note: "Sezon kadrosu" },
    { name: "Emir Yasar", position: "Kaleci", note: "Sezon kadrosu" },
    { name: "Jonas Svensson", position: "Defans", note: "Sag bek" },
    { name: "Gabriel Paulista", position: "Defans", note: "Stoper" },
    { name: "Felix Uduokhai", position: "Defans", note: "Stoper" },
    { name: "Taylan Bulut", position: "Defans", note: "Sag bek" },
    { name: "Tayyip Talha Sanuc", position: "Defans", note: "Stoper" },
    { name: "David Jurasek", position: "Defans", note: "Sol bek" },
    { name: "Emrecan Uzunhan", position: "Defans", note: "Defans" },
    { name: "Emirhan Topcu", position: "Defans", note: "Stoper" },
    { name: "Tayfur Bingol", position: "Defans", note: "Sag bek" },
    { name: "Emrecan Terzi", position: "Defans", note: "Sol bek" },
    { name: "Wilfred Ndidi", position: "Orta saha", note: "On libero" },
    { name: "Demir Ege Tiknaz", position: "Orta saha", note: "Merkez" },
    { name: "Milot Rashica", position: "Orta saha", note: "Hucum orta saha" },
    { name: "Salih Ucan", position: "Orta saha", note: "Merkez" },
    { name: "Orkun Kokcu", position: "Orta saha", note: "Merkez" },
    { name: "Kartal Yilmaz", position: "Orta saha", note: "On libero" },
    { name: "Necip Uysal", position: "Orta saha", note: "Merkez" },
    { name: "Rafa Silva", position: "Orta saha", note: "Hucum orta saha" },
    { name: "Al-Musrati", position: "Orta saha", note: "On libero" },
    { name: "Elan Ricardo", position: "Orta saha", note: "Merkez" },
    { name: "Joao Mario", position: "Orta saha", note: "Transfer listesi" },
    { name: "Vaclav Cerny", position: "Orta saha", note: "Transfer listesi" },
    { name: "Junior Olaitan", position: "Orta saha", note: "Transfer listesi" },
    { name: "Tammy Abraham", position: "Forvet", note: "Santrfor" },
    { name: "Mustafa Erhan Hekimoglu", position: "Forvet", note: "Santrfor" },
    { name: "Jota Silva", position: "Forvet", note: "Hucum" },
    { name: "Ridvan Yilmaz", position: "Defans", note: "Transfer listesi" }
  ],
  Eyupspor: [
    { name: "Takim veri seti", position: "Guncellenecek", note: "Oyuncular dogrulanip eklenecek" }
  ],
  "Fatih Karagumruk": [
    { name: "Ivo Grbic", position: "Kaleci", note: "Clean sheet listesi" },
    { name: "Takim veri seti", position: "Guncellenecek", note: "Kadro derinlestirme sirasinda eklenecek" }
  ],
  Fenerbahce: [
    { name: "Tarik Cetin", position: "Kaleci", note: "Sezon kadrosu" },
    { name: "Ederson", position: "Kaleci", note: "Sezon kadrosu" },
    { name: "Mert Gunok", position: "Kaleci", note: "Sezon kadrosu" },
    { name: "Archie Brown", position: "Defans", note: "Sol bek" },
    { name: "Caglar Soyuncu", position: "Defans", note: "Stoper" },
    { name: "Yigit Efe Demir", position: "Defans", note: "Stoper" },
    { name: "Mert Muldur", position: "Defans", note: "Sag bek" },
    { name: "Levent Mercan", position: "Defans", note: "Sol bek" },
    { name: "Jayden Oosterwolde", position: "Defans", note: "Sol bek" },
    { name: "Nelson Semedo", position: "Defans", note: "Sag bek" },
    { name: "Milan Skriniar", position: "Defans", note: "Stoper" },
    { name: "Ismail Yuksek", position: "Orta saha", note: "Merkez" },
    { name: "Matteo Guendouzi", position: "Orta saha", note: "Merkez" },
    { name: "Fred", position: "Orta saha", note: "Merkez" },
    { name: "Mert Hakan Yandas", position: "Orta saha", note: "Merkez" },
    { name: "Edson Alvarez", position: "Orta saha", note: "On libero" },
    { name: "N'Golo Kante", position: "Orta saha", note: "Merkez" },
    { name: "Marco Asensio", position: "Orta saha", note: "Hucum orta saha" },
    { name: "Oguz Aydin", position: "Orta saha", note: "Kanat" },
    { name: "Kerem Akturkoglu", position: "Forvet", note: "Kanat" },
    { name: "Anthony Musaba", position: "Forvet", note: "Kanat" },
    { name: "Sidiki Cherif", position: "Forvet", note: "Forvet" },
    { name: "Dorgeles Nene", position: "Forvet", note: "Kanat" },
    { name: "Talisca", position: "Forvet", note: "Hucum" },
    { name: "Engin Can Biterge", position: "Kaleci", note: "Akademi" },
    { name: "Kamil Efe Uregen", position: "Defans", note: "Akademi" },
    { name: "Abdou Aziz Fall", position: "Orta saha", note: "Akademi" },
    { name: "Yasir Boz", position: "Orta saha", note: "Akademi" },
    { name: "Alaettin Ekici", position: "Forvet", note: "Akademi" }
  ],
  Galatasaray: [
    { name: "Ugurcan Cakir", position: "Kaleci", note: "A takim" },
    { name: "Batuhan Sen", position: "Kaleci", note: "A takim" },
    { name: "Gunay Guvenc", position: "Kaleci", note: "A takim" },
    { name: "Metehan Baltaci", position: "Defans", note: "Stoper" },
    { name: "Davinson Sanchez", position: "Defans", note: "Stoper" },
    { name: "Abdulkerim Bardakci", position: "Defans", note: "Stoper" },
    { name: "Kaan Ayhan", position: "Defans", note: "Stoper / sag bek" },
    { name: "Eren Elmali", position: "Defans", note: "Sol bek" },
    { name: "Ismail Jakobs", position: "Defans", note: "Sol bek" },
    { name: "Wilfried Singo", position: "Defans", note: "Sag bek" },
    { name: "Arda Unyay", position: "Defans", note: "Stoper" },
    { name: "Sacha Boey", position: "Defans", note: "Sag bek" },
    { name: "Lucas Torreira", position: "Orta saha", note: "On libero" },
    { name: "Gabriel Sara", position: "Orta saha", note: "Merkez" },
    { name: "Ilkay Gundogan", position: "Orta saha", note: "Merkez" },
    { name: "Mario Lemina", position: "Orta saha", note: "On libero" },
    { name: "Roland Sallai", position: "Orta saha", note: "Kanat" },
    { name: "Yunus Akgun", position: "Kanat", note: "Sag kanat" },
    { name: "Baris Alper Yilmaz", position: "Kanat", note: "Sol kanat / forvet" },
    { name: "Leroy Sane", position: "Kanat", note: "Sag kanat" },
    { name: "Yaser Asprilla", position: "Kanat", note: "Kanat" },
    { name: "Can Armando Guner", position: "Kanat", note: "Kanat" },
    { name: "Gokdeniz Gurpuz", position: "Orta saha", note: "Merkez" },
    { name: "Renato Nhaga", position: "Orta saha", note: "Merkez" },
    { name: "Noa Lang", position: "Kanat", note: "Sol kanat" },
    { name: "Mauro Icardi", position: "Forvet", note: "Santrfor" },
    { name: "Victor Osimhen", position: "Forvet", note: "Santrfor" },
    { name: "Ahmed Kutucu", position: "Forvet", note: "Santrfor" },
    { name: "Eyup Aydin", position: "Orta saha", note: "Sezon icinde kiralik" },
    { name: "Wilfried Zaha", position: "Kanat", note: "Sezon icinde kiralik" },
    { name: "Nicolo Zaniolo", position: "Orta saha", note: "Sezon icinde kiralik" },
    { name: "Elias Jelert", position: "Defans", note: "Sezon icinde kiralik" },
    { name: "Victor Nelsson", position: "Defans", note: "Sezon icinde kiralik" },
    { name: "Carlos Cuesta", position: "Defans", note: "Sezon icinde kiralik" },
    { name: "Przemyslaw Frankowski", position: "Kanat", note: "Sezon icinde kiralik" },
    { name: "Ilhami Sirachan Nas", position: "Orta saha", note: "Sezon icinde kiralik" },
    { name: "Jankat Yilmaz", position: "Kaleci", note: "Sezon icinde kiralik" },
    { name: "Ali Yesilyurt", position: "Defans", note: "Sezon icinde kiralik" }
  ],
  Gaziantep: [
    { name: "Mohamed Bayo", position: "Forvet", note: "Gol kralligi listesi" },
    { name: "Takim veri seti", position: "Guncellenecek", note: "Kadro derinlestirme sirasinda eklenecek" }
  ],
  Genclerbirligi: [
    { name: "Takim veri seti", position: "Guncellenecek", note: "Oyuncular dogrulanip eklenecek" }
  ],
  Goztepe: [
    { name: "Mateusz Lis", position: "Kaleci", note: "Clean sheet listesi" },
    { name: "Juan", position: "Forvet", note: "Gol kralligi listesi" },
    { name: "Takim veri seti", position: "Guncellenecek", note: "Kadro derinlestirme sirasinda eklenecek" }
  ],
  Kasimpasa: [
    { name: "Andreas Gianniotis", position: "Kaleci", note: "Clean sheet listesi" },
    { name: "Takim veri seti", position: "Guncellenecek", note: "Kadro derinlestirme sirasinda eklenecek" }
  ],
  Kayserispor: [
    { name: "Bilal Bayazit", position: "Kaleci", note: "Clean sheet listesi" },
    { name: "Takim veri seti", position: "Guncellenecek", note: "Kadro derinlestirme sirasinda eklenecek" }
  ],
  Kocaelispor: [
    { name: "Aleksandar Jovanovic", position: "Kaleci", note: "Clean sheet listesi" },
    { name: "Takim veri seti", position: "Guncellenecek", note: "Kadro derinlestirme sirasinda eklenecek" }
  ],
  Konyaspor: [
    { name: "Takim veri seti", position: "Guncellenecek", note: "Oyuncular dogrulanip eklenecek" }
  ],
  Rizespor: [
    { name: "Yahia Fofana", position: "Kaleci", note: "Clean sheet listesi" },
    { name: "Takim veri seti", position: "Guncellenecek", note: "Kadro derinlestirme sirasinda eklenecek" }
  ],
  Samsunspor: [
    { name: "Okan Kocuk", position: "Kaleci", note: "Clean sheet listesi" },
    { name: "Takim veri seti", position: "Guncellenecek", note: "Kadro derinlestirme sirasinda eklenecek" }
  ],
  Trabzonspor: [
    { name: "Ugurcan Cakir", position: "Kaleci", note: "Sezon kadrosu" },
    { name: "Andre Onana", position: "Kaleci", note: "Sezon kadrosu" },
    { name: "Onuralp Cevikkan", position: "Kaleci", note: "Sezon kadrosu" },
    { name: "Ahmet Yildirim", position: "Kaleci", note: "Sezon kadrosu" },
    { name: "Erol Can Colak", position: "Kaleci", note: "Sezon kadrosu" },
    { name: "Stefan Savic", position: "Defans", note: "Stoper" },
    { name: "Mustafa Eskihellac", position: "Defans", note: "Defans" },
    { name: "Wagner Pina", position: "Defans", note: "Defans" },
    { name: "Arda Ozturk", position: "Defans", note: "Defans" },
    { name: "Rayyan Baniya", position: "Defans", note: "Stoper" },
    { name: "Chibuike Nwaiwu", position: "Defans", note: "Defans" },
    { name: "Serdar Saatci", position: "Defans", note: "Stoper" },
    { name: "Arseniy Batagov", position: "Defans", note: "Defans" },
    { name: "Arif Bosluk", position: "Defans", note: "Defans" },
    { name: "Taha Emre Ince", position: "Defans", note: "Defans" },
    { name: "Okay Yokuslu", position: "Orta saha", note: "Merkez" },
    { name: "Batista Mendy", position: "Orta saha", note: "Merkez" },
    { name: "Edin Visca", position: "Orta saha", note: "Kanat" },
    { name: "Benjamin Bouchouari", position: "Orta saha", note: "Merkez" },
    { name: "Muhammed Cham", position: "Orta saha", note: "Hucum orta saha" },
    { name: "Ernest Muci", position: "Orta saha", note: "Hucum" },
    { name: "Ozan Tufan", position: "Orta saha", note: "Merkez" },
    { name: "Mathias Lovik", position: "Orta saha", note: "Kanat / bek" },
    { name: "Tim Jabol-Folcarelli", position: "Orta saha", note: "Merkez" },
    { name: "Christ Inao Oulai", position: "Orta saha", note: "Merkez" },
    { name: "Cihan Canak", position: "Orta saha", note: "Kanat" },
    { name: "Salih Malkocoglu", position: "Orta saha", note: "Merkez" },
    { name: "Boran Baskan", position: "Orta saha", note: "Merkez" },
    { name: "Anthony Nwakaeme", position: "Forvet", note: "Hucum" },
    { name: "Danylo Sikan", position: "Forvet", note: "Forvet" },
    { name: "Onuralp Cakiroglu", position: "Forvet", note: "Forvet" },
    { name: "Umut Nayir", position: "Forvet", note: "Santrfor" },
    { name: "Oleksandr Zubkov", position: "Forvet", note: "Hucum" },
    { name: "Paul Onuachu", position: "Forvet", note: "Santrfor" },
    { name: "Kazeem Olaigbe", position: "Forvet", note: "Hucum" },
    { name: "Felipe Augusto", position: "Forvet", note: "Forvet" }
  ]
};

const positionModels = {
  Forvet: {
    goal: 8.5,
    assist: 4.2,
    minutes: 0.01,
    bigMatch: 0.42,
    form: 0.35,
    roleBonus: 8,
    label: "Forvet modeli: gol, bitiricilik ve buyuk mac etkisi daha agirlikli."
  },
  Kanat: {
    goal: 7,
    assist: 5.6,
    minutes: 0.011,
    bigMatch: 0.38,
    form: 0.42,
    roleBonus: 10,
    label: "Kanat modeli: gol, asist, form ve patlama etkisi dengeli olculur."
  },
  "Orta saha": {
    goal: 5.8,
    assist: 6.8,
    minutes: 0.014,
    bigMatch: 0.34,
    form: 0.45,
    roleBonus: 14,
    label: "Orta saha modeli: asist, sure, form ve oyuna etki daha yuksek agirlik alir."
  },
  Defans: {
    goal: 4,
    assist: 4.4,
    minutes: 0.018,
    bigMatch: 0.48,
    form: 0.38,
    roleBonus: 34,
    label: "Defans modeli: sure, buyuk mac direnci ve istikrar daha fazla puan getirir."
  },
  Kaleci: {
    goal: 0,
    assist: 2,
    minutes: 0.02,
    bigMatch: 0.62,
    form: 0.58,
    roleBonus: 48,
    label: "Kaleci modeli: sure, form, buyuk mac ve clean sheet etkisini temsil eden savunma katkisi one cikar."
  }
};

const state = {
  search: "",
  position: "all",
  sort: "valueScore",
  budgetOnly: false
};

const enrichedPlayers = players.map((player) => {
  const model = positionModels[player.position] || positionModels["Orta saha"];
  const attacking = player.goals * model.goal + player.assists * model.assist;
  const impactScore = Math.round(
    attacking +
      player.minutes * model.minutes +
      player.bigMatch * model.bigMatch +
      player.form * model.form +
      model.roleBonus
  );
  const valueScore = Math.round((impactScore / Math.max(player.marketValue, 0.35)) * 7);
  const scoutScore = Math.round(valueScore * 0.58 + player.form * 0.28 + (28 - Math.min(player.age, 28)) * 1.6);
  const surpriseScore = Math.round(valueScore * 0.65 + player.bigMatch * 0.22 + player.form * 0.13);

  return {
    ...player,
    impactScore,
    valueScore,
    scoutScore,
    surpriseScore,
    contribution: player.goals + player.assists,
    modelLabel: model.label
  };
});

const playerGrid = document.querySelector("#playerGrid");
const resultCount = document.querySelector("#resultCount");
const searchInput = document.querySelector("#searchInput");
const positionFilter = document.querySelector("#positionFilter");
const sortMode = document.querySelector("#sortMode");
const budgetOnly = document.querySelector("#budgetOnly");
const playerA = document.querySelector("#playerA");
const playerB = document.querySelector("#playerB");
const comparison = document.querySelector("#comparison");
const swapButton = document.querySelector("#swapButton");
const valueBoard = document.querySelector("#valueBoard");
const scoutBoard = document.querySelector("#scoutBoard");
const themeBar = document.querySelector("#themeBar");
const activeThemeName = document.querySelector("#activeThemeName");
const squadTeamSelect = document.querySelector("#squadTeamSelect");
const squadGrid = document.querySelector("#squadGrid");
const squadNote = document.querySelector("#squadNote");
const playerModal = document.querySelector("#playerModal");
const modalClose = document.querySelector("#modalClose");
const modalPlayerName = document.querySelector("#modalPlayerName");
const modalPlayerTeam = document.querySelector("#modalPlayerTeam");
const modalPlayerTag = document.querySelector("#modalPlayerTag");
const modalContent = document.querySelector("#modalContent");

function formatValue(value) {
  return value >= 1 ? value.toFixed(1) + "M" : Math.round(value * 1000) + "K";
}

function getLabel(player) {
  if (player.valueScore > 900) return "Deger canavari";
  if (player.scoutScore > 430) return "Scout radari";
  if (player.bigMatch > 84) return "Buyuk mac";
  if (player.form > 86) return "Formda";
  return "Istikrar";
}

function getFilteredPlayers() {
  return enrichedPlayers
    .filter((player) => {
      const text = `${player.name} ${player.team} ${player.position}`.toLowerCase();
      const matchesSearch = text.includes(state.search.toLowerCase());
      const matchesPosition = state.position === "all" || player.position === state.position;
      const matchesBudget = !state.budgetOnly || player.marketValue < 2;
      return matchesSearch && matchesPosition && matchesBudget;
    })
    .sort((a, b) => b[state.sort] - a[state.sort]);
}

function topBy(key) {
  return [...enrichedPlayers].sort((a, b) => b[key] - a[key])[0];
}

function renderSummary() {
  const byImpact = topBy("impactScore");
  const byValue = topBy("valueScore");
  const byScout = topBy("scoutScore");
  const byBigMatch = topBy("bigMatch");
  const hero = topBy("surpriseScore");

  document.querySelector("#topImpact").textContent = `${byImpact.name} (${byImpact.impactScore})`;
  document.querySelector("#topValue").textContent = `${byValue.name} (${byValue.valueScore})`;
  document.querySelector("#topScout").textContent = `${byScout.name} (${byScout.scoutScore})`;
  document.querySelector("#topBigMatch").textContent = `${byBigMatch.name} (${byBigMatch.bigMatch})`;
  document.querySelector("#heroPlayer").textContent = hero.name;
  document.querySelector("#heroNote").textContent = `${hero.team} - ${formatValue(hero.marketValue)} EUR - skor ${hero.surpriseScore}`;
}

function boardItem(player, index, scoreKey) {
  return `
    <div class="board-item">
      <span class="rank">${index + 1}</span>
      <div>
        <strong>${player.name}</strong>
        <span class="board-meta">${player.team} - ${player.position} - ${formatValue(player.marketValue)} EUR</span>
      </div>
      <span class="board-score">${player[scoreKey]}</span>
    </div>
  `;
}

function renderBoards() {
  valueBoard.innerHTML = [...enrichedPlayers]
    .sort((a, b) => b.valueScore - a.valueScore)
    .slice(0, 5)
    .map((player, index) => boardItem(player, index, "valueScore"))
    .join("");

  scoutBoard.innerHTML = [...enrichedPlayers]
    .filter((player) => player.marketValue < 2.5 && player.age <= 26)
    .sort((a, b) => b.scoutScore - a.scoutScore)
    .slice(0, 5)
    .map((player, index) => boardItem(player, index, "scoutScore"))
    .join("");
}

function applyTheme(theme) {
  const root = document.documentElement;
  root.style.setProperty("--theme-primary", theme.primary);
  root.style.setProperty("--theme-secondary", theme.secondary);
  root.style.setProperty("--theme-accent", theme.accent);
  root.style.setProperty("--theme-dark", theme.dark);
  activeThemeName.textContent = theme.name;

  document.querySelectorAll(".theme-button").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.theme === theme.name);
  });
}

function renderThemes() {
  themeBar.innerHTML = teamThemes
    .map(
      (theme) => `
        <button
          class="theme-button"
          type="button"
          data-theme="${theme.name}"
          style="--swatch-a: ${theme.primary}; --swatch-b: ${theme.secondary};"
        >
          <span class="theme-swatch"></span>
          ${theme.name}
        </button>
      `
    )
    .join("");

  themeBar.addEventListener("click", (event) => {
    const button = event.target.closest(".theme-button");
    if (!button) return;
    const theme = teamThemes.find((item) => item.name === button.dataset.theme);
    if (theme) applyTheme(theme);
  });

  applyTheme(teamThemes[0]);
}

function renderSquadTeams() {
  squadTeamSelect.innerHTML = teamThemes
    .filter((theme) => theme.name !== "Lig temasi")
    .map((theme) => `<option value="${theme.name}">${theme.name}</option>`)
    .join("");
  squadTeamSelect.value = "Galatasaray";
  renderSquad();
}

function renderSquad() {
  const teamName = squadTeamSelect.value;
  const squad = teamSquads[teamName];
  const theme = teamThemes.find((item) => item.name === teamName);
  if (theme) applyTheme(theme);

  if (!squad) {
    squadNote.textContent = `${teamName}: kadro henuz eklenmedi`;
    squadGrid.innerHTML = `
      <div class="squad-empty">
        ${teamName} kadrosu henuz eklenmedi. Bu bolumu takim takim buyutecegiz; siradaki adimda secilen takimin oyuncularini ve mevkilerini ekleyebiliriz.
      </div>
    `;
    return;
  }

  squadNote.textContent = `${teamName}: ${squad.length} oyuncu eklendi`;
  squadGrid.innerHTML = squad
    .map(
      (player) => `
        <article class="squad-card">
          <strong>${player.name}</strong>
          <span>${player.position} - ${player.note}</span>
        </article>
      `
    )
    .join("");
}

function renderPlayers() {
  const list = getFilteredPlayers();
  resultCount.textContent = `${list.length} oyuncu`;
  playerGrid.innerHTML = list
    .map((player) => {
      const meterWidth = Math.min(100, Math.round(player.valueScore / 10));
      return `
        <article class="player-card" data-player="${player.name}" tabindex="0" role="button" aria-label="${player.name} detayini ac">
          <div class="card-head">
            <div>
              <h3>${player.name}</h3>
              <p>${player.team} - ${player.position} - ${player.age}</p>
            </div>
            <span class="tag">${getLabel(player)}</span>
          </div>
          <div class="stat-row">
            <div class="stat"><span>Deger</span><strong>${formatValue(player.marketValue)} EUR</strong></div>
            <div class="stat"><span>Etki skoru</span><strong>${player.impactScore}</strong></div>
            <div class="stat"><span>Fiyat/Katki</span><strong>${player.valueScore}</strong></div>
          </div>
          <div>
            <div class="meter" aria-label="Deger skoru">
              <span style="width: ${meterWidth}%"></span>
            </div>
          </div>
          <p class="story">${player.story}</p>
        </article>
      `;
    })
    .join("");
}

function openPlayerModal(playerName) {
  const player = enrichedPlayers.find((item) => item.name === playerName);
  if (!player) return;

  modalPlayerName.textContent = player.name;
  modalPlayerTeam.textContent = `${player.team} - ${player.position} - ${player.age} yas`;
  modalPlayerTag.textContent = getLabel(player);
  modalContent.innerHTML = `
    <div class="modal-stats">
      <div class="stat"><span>Piyasa degeri</span><strong>${formatValue(player.marketValue)} EUR</strong></div>
      <div class="stat"><span>Gol + asist</span><strong>${player.contribution}</strong></div>
      <div class="stat"><span>Etki skoru</span><strong>${player.impactScore}</strong></div>
      <div class="stat"><span>Deger skoru</span><strong>${player.valueScore}</strong></div>
    </div>
    <section class="modal-section">
      <h3>Mevki analiz modeli</h3>
      <p>${player.modelLabel}</p>
    </section>
    <section class="modal-section">
      <h3>Kariyer ozeti</h3>
      <p>${player.profile}</p>
    </section>
    <section class="modal-section">
      <h3>Kulup gecmisi</h3>
      <div class="career-list">
        ${(player.career || [player.team]).map((club) => `<span class="career-chip">${club}</span>`).join("")}
      </div>
    </section>
    <section class="modal-section">
      <h3>Guclu yonler</h3>
      <div class="strength-list">
        ${(player.strengths || ["Etki", "Form", "Katki"]).map((item) => `<span>${item}</span>`).join("")}
      </div>
    </section>
    <section class="modal-section">
      <h3>Deger yorumu</h3>
      <p>${player.story}</p>
    </section>
  `;
  playerModal.hidden = false;
  modalClose.focus();
}

function closePlayerModal() {
  playerModal.hidden = true;
}

function fillCompareOptions() {
  const options = enrichedPlayers
    .map((player) => `<option value="${player.name}">${player.name} - ${player.team}</option>`)
    .join("");
  playerA.innerHTML = options;
  playerB.innerHTML = options;
  playerA.value = topBy("impactScore").name;
  playerB.value = topBy("valueScore").name;
}

function statLine(label, left, right, suffix = "") {
  const leftWins = left > right;
  const rightWins = right > left;
  return `
    <div class="duel-row">
      <span>${label}</span>
      <strong>
        <span class="${leftWins ? "winner" : ""}">${left}${suffix}</span>
        /
        <span class="${rightWins ? "winner" : ""}">${right}${suffix}</span>
      </strong>
    </div>
  `;
}

function renderComparison() {
  const left = enrichedPlayers.find((player) => player.name === playerA.value);
  const right = enrichedPlayers.find((player) => player.name === playerB.value);
  const winner =
    left.valueScore === right.valueScore
      ? "Bu eslesme berabereye cok yakin."
      : left.valueScore > right.valueScore
        ? `${left.name} degerine gore daha fazla etki uretiyor.`
        : `${right.name} degerine gore daha fazla etki uretiyor.`;

  comparison.innerHTML = `
    <article class="duel-card">
      <h3>${left.name}</h3>
      ${statLine("Gol", left.goals, right.goals)}
      ${statLine("Asist", left.assists, right.assists)}
      ${statLine("Etki skoru", left.impactScore, right.impactScore)}
      ${statLine("Deger skoru", left.valueScore, right.valueScore)}
      ${statLine("Form", left.form, right.form)}
    </article>
    <article class="duel-card">
      <h3>${right.name}</h3>
      <div class="duel-row"><span>Piyasa degeri</span><strong>${formatValue(left.marketValue)} / ${formatValue(right.marketValue)} EUR</strong></div>
      <div class="duel-row"><span>Dakika</span><strong>${left.minutes} / ${right.minutes}</strong></div>
      <div class="duel-row"><span>Buyuk mac</span><strong>${left.bigMatch} / ${right.bigMatch}</strong></div>
      <div class="duel-row"><span>Scout skoru</span><strong>${left.scoutScore} / ${right.scoutScore}</strong></div>
      <div class="duel-row"><span>Etiket</span><strong>${getLabel(left)} / ${getLabel(right)}</strong></div>
    </article>
    <div class="insight">${winner} Bu sonuc ilk analiz formulune gore hesaplandi; sonraki surumde canli istatistik ve guncel piyasa verisiyle calisir.</div>
  `;
}

function renderAll() {
  renderSummary();
  renderBoards();
  renderPlayers();
  renderComparison();
}

searchInput.addEventListener("input", (event) => {
  state.search = event.target.value;
  renderPlayers();
});

positionFilter.addEventListener("change", (event) => {
  state.position = event.target.value;
  renderPlayers();
});

sortMode.addEventListener("change", (event) => {
  state.sort = event.target.value;
  renderPlayers();
});

budgetOnly.addEventListener("change", (event) => {
  state.budgetOnly = event.target.checked;
  renderPlayers();
});

playerA.addEventListener("change", renderComparison);
playerB.addEventListener("change", renderComparison);
squadTeamSelect.addEventListener("change", renderSquad);
playerGrid.addEventListener("click", (event) => {
  const card = event.target.closest(".player-card");
  if (card) openPlayerModal(card.dataset.player);
});
playerGrid.addEventListener("keydown", (event) => {
  if (event.key !== "Enter" && event.key !== " ") return;
  const card = event.target.closest(".player-card");
  if (!card) return;
  event.preventDefault();
  openPlayerModal(card.dataset.player);
});
modalClose.addEventListener("click", closePlayerModal);
playerModal.addEventListener("click", (event) => {
  if (event.target === playerModal) closePlayerModal();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !playerModal.hidden) closePlayerModal();
});
swapButton.addEventListener("click", () => {
  const oldA = playerA.value;
  playerA.value = playerB.value;
  playerB.value = oldA;
  renderComparison();
});

fillCompareOptions();
renderThemes();
renderSquadTeams();
renderAll();
