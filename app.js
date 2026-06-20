// ================================================================
// SÜPER LİG ATLASI — app.js  |  2025-26 Sezonu
// ================================================================

// ── OYUNCU VERİSİ (2025-26) ────────────────────────────────────
const players = [

  // ===== GALATASARAY =====
  {
    name: "Ugurcan Cakir", team: "Galatasaray", position: "Kaleci", age: 31,
    marketValue: 18, goals: 0, assists: 0, minutes: 3230, bigMatch: 92, form: 91,
    story: "20 gol yememe ile üst üste 3. şampiyonluğun mimarı. Sezonun kalecisi ödülünü zirvede bitirdi.",
    career: ["1461 Trabzon", "Trabzonspor", "Galatasaray"],
    strengths: ["Kurtarış", "Liderlik", "Büyük maç"]
  },
  {
    name: "Baris Alper Yilmaz", team: "Galatasaray", position: "Kanat", age: 25,
    marketValue: 30, goals: 16, assists: 12, minutes: 2900, bigMatch: 92, form: 95,
    story: "Hem gol hem asist listelerinde zirve, büyük maçlarda fark yaratan oyunla sezonun tartışmasız en iyisi.",
    career: ["Altay", "Galatasaray"],
    strengths: ["Hız", "Gol", "Asist"]
  },
  {
    name: "Gabriel Sara", team: "Galatasaray", position: "Orta saha", age: 27,
    marketValue: 32, goals: 8, assists: 14, minutes: 2850, bigMatch: 88, form: 91,
    story: "Sezonun asist krallığına oynayan yaratıcı orta saha, Galatasaray'ın oyun kurma merkezinde kritik rol.",
    career: ["Gremio", "Norwich", "Galatasaray"],
    strengths: ["Pas kalitesi", "Yaratıcılık", "Top taşıma"]
  },
  {
    name: "Artem Dovbyk", team: "Galatasaray", position: "Forvet", age: 28,
    marketValue: 45, goals: 18, assists: 6, minutes: 2600, bigMatch: 87, form: 88,
    story: "Roma'dan transfer edilen Ukrayna milli takımı golcüsü, Galatasaray için sezonun en etkili transferi oldu.",
    career: ["Dnipro", "Girona", "Roma", "Galatasaray"],
    strengths: ["Bitiricilik", "Hava topu", "Büyük maç"]
  },
  {
    name: "Leroy Sane", team: "Galatasaray", position: "Kanat", age: 30,
    marketValue: 28, goals: 10, assists: 9, minutes: 2400, bigMatch: 86, form: 87,
    story: "Bayern sonrası ilk tam sezonunu oynayan Sane, büyük maçlarda imzasını attı ve şampiyonluğa katkı sağladı.",
    career: ["Schalke", "Man City", "Bayern", "Galatasaray"],
    strengths: ["Hız", "Teknik", "Gol"]
  },
  {
    name: "Lucas Torreira", team: "Galatasaray", position: "Orta saha", age: 30,
    marketValue: 14, goals: 3, assists: 7, minutes: 2700, bigMatch: 87, form: 88,
    story: "Galatasaray'ın savunma ve hücum dengesini kuran yorulmaz motor. Şampiyonluğun görünmez mimarı.",
    career: ["Sampdoria", "Arsenal", "Atletico", "Fiorentina", "Galatasaray"],
    strengths: ["Savunma", "Pas", "Istikrar"]
  },

  // ===== FENERBAHÇE =====
  {
    name: "Dorgeles Nene", team: "Fenerbahce", position: "Kanat", age: 24,
    marketValue: 30, goals: 13, assists: 16, minutes: 2700, bigMatch: 90, form: 92,
    story: "16 asist ile sezonun asist krallığı. Hız, vizyonu ve son pas kalitesiyle Fenerbahçe'nin parlayan yıldızı.",
    career: ["Salzburg", "Westerlo", "Fenerbahce"],
    strengths: ["Asist", "Hız", "Bire bir"]
  },
  {
    name: "Talisca", team: "Fenerbahce", position: "Orta saha", age: 33,
    marketValue: 11, goals: 17, assists: 5, minutes: 2200, bigMatch: 89, form: 87,
    story: "Sezona sürpriz gibi geldi ama her büyük maçta parmak izi bırakarak Fenerbahçe'nin gol silahı olmaya devam etti.",
    career: ["Bahia", "Benfica", "Besiktas", "Guangzhou", "Al Nassr", "Fenerbahce"],
    strengths: ["Şut", "Duran top", "Büyük maç"]
  },
  {
    name: "Edson Alvarez", team: "Fenerbahce", position: "Orta saha", age: 29,
    marketValue: 32, goals: 4, assists: 8, minutes: 2900, bigMatch: 86, form: 88,
    story: "Fenerbahçe'nin orta sahasının güvenlik kilidi. Etkili top kapma ve hücum başlatma kalitesiyle fark yarattı.",
    career: ["Club America", "Ajax", "West Ham", "Fenerbahce"],
    strengths: ["Top kapma", "Savunma", "Fizik"]
  },
  {
    name: "Caglar Soyuncu", team: "Fenerbahce", position: "Defans", age: 30,
    marketValue: 16, goals: 2, assists: 3, minutes: 2800, bigMatch: 84, form: 86,
    story: "Fenerbahçe savunma blokunu organize eden lider stoper, büyük maçlarda güvenilir kale bekçisi.",
    career: ["Altinordu", "Freiburg", "Leicester", "Atletico Madrid", "Fenerbahce"],
    strengths: ["Hava topu", "Liderlik", "Topla çıkış"]
  },
  {
    name: "Kerem Akturkoglu", team: "Fenerbahce", position: "Kanat", age: 27,
    marketValue: 26, goals: 11, assists: 7, minutes: 2500, bigMatch: 85, form: 86,
    story: "Galatasaray'dan transferi şok yarattı. İlk sezonunu Fenerbahçe formasıyla geçirdi ve eleştirenlere cevabı sahada verdi.",
    career: ["Altinordu", "Giresunspor", "Galatasaray", "Fenerbahce"],
    strengths: ["Hız", "Dribbling", "Gol"]
  },
  {
    name: "Marco Asensio", team: "Fenerbahce", position: "Orta saha", age: 31,
    marketValue: 15, goals: 9, assists: 10, minutes: 2100, bigMatch: 84, form: 85,
    story: "Hem gol hem asist üretme kapasitesiyle Fenerbahçe'nin hücum çeşitliliğine zenginlik katan Madridli teknikten.",
    career: ["Mallorca", "Real Madrid", "PSG", "Aston Villa", "Fenerbahce"],
    strengths: ["Şut", "Pas kalitesi", "Tecrübe"]
  },

  // ===== BEŞİKTAŞ =====
  {
    name: "Orkun Kokcu", team: "Besiktas", position: "Orta saha", age: 26,
    marketValue: 34, goals: 9, assists: 12, minutes: 2600, bigMatch: 88, form: 90,
    story: "Benfica'dan kalıcı transferi gerçekleşti. Sezona damga vuran performansıyla Beşiktaş'ın orta saha yıldızı.",
    career: ["Feyenoord", "Benfica", "Besiktas"],
    strengths: ["Pas", "Vizyon", "Gol"]
  },
  {
    name: "Tammy Abraham", team: "Besiktas", position: "Forvet", age: 29,
    marketValue: 24, goals: 15, assists: 5, minutes: 2500, bigMatch: 86, form: 87,
    story: "Premier Lig formunu Türkiye'ye taşıdı. Fiziksel güç ve ceza sahası etkisiyle Beşiktaş'ın santrfor çözümü.",
    career: ["Chelsea", "Aston Villa", "Leeds", "Roma", "Besiktas"],
    strengths: ["Fizik", "Ceza sahası", "Hava topu"]
  },
  {
    name: "Rafa Silva", team: "Besiktas", position: "Orta saha", age: 33,
    marketValue: 7, goals: 8, assists: 9, minutes: 2200, bigMatch: 83, form: 84,
    story: "Dar alanlarda top kaybetmeyen teknik zeka. Beşiktaş hücumunu her an aktive edebilen yaratıcı profil.",
    career: ["Estoril", "Braga", "Benfica", "Besiktas"],
    strengths: ["Teknik", "Yaratıcılık", "Son pas"]
  },
  {
    name: "Joao Mario", team: "Besiktas", position: "Orta saha", age: 32,
    marketValue: 9, goals: 6, assists: 8, minutes: 2400, bigMatch: 82, form: 85,
    story: "Portekiz milli takımı kariyeriyle gelen deneyimli orta saha, Beşiktaş'a sol taraftan önemli katkılar sağladı.",
    career: ["Sporting", "Inter", "Lokomotiv", "Benfica", "Besiktas"],
    strengths: ["Pas", "Uzun top", "Tecrübe"]
  },
  {
    name: "Wilfred Ndidi", team: "Besiktas", position: "Orta saha", age: 30,
    marketValue: 13, goals: 3, assists: 5, minutes: 2700, bigMatch: 85, form: 86,
    story: "Leicester City'nin efsane motor oyuncusu Beşiktaş'ta aynı güveni veriyor. Savunma organizasyonunun merkezinde.",
    career: ["Nath. Star", "Genk", "Leicester", "Besiktas"],
    strengths: ["Savunma", "Fizik", "Istikrar"]
  },
  {
    name: "Mert Gunok", team: "Besiktas", position: "Kaleci", age: 35,
    marketValue: 4, goals: 0, assists: 0, minutes: 3200, bigMatch: 83, form: 82,
    story: "Beşiktaş'ın tecrübeli kaleci duvarı. Büyük maçlarda etkili kurtarışlarıyla takımı sırtlayan kaptan.",
    career: ["Besiktas", "Galatasaray", "Besiktas"],
    strengths: ["Deneyim", "Kurtarış", "Liderlik"]
  },

  // ===== TRABZONSPOR =====
  {
    name: "Paul Onuachu", team: "Trabzonspor", position: "Forvet", age: 32,
    marketValue: 13, goals: 24, assists: 3, minutes: 2800, bigMatch: 93, form: 94,
    story: "24 gol ile 2. kez üst üste gol krallığı! Süper Lig tarihine geçen fiziksel güç ve ceza sahası hâkimiyeti.",
    career: ["Midtjylland", "Genk", "Southampton", "Trabzonspor"],
    strengths: ["Hava topları", "Bitiricilik", "Ceza sahası"]
  },
  {
    name: "Felipe Augusto", team: "Trabzonspor", position: "Forvet", age: 23,
    marketValue: 6, goals: 14, assists: 4, minutes: 2400, bigMatch: 87, form: 90,
    story: "23 yaşında ikinci sezonunda çiçek gibi açtı. Gol sayısını ikiye katladı, Avrupa kulüpleri takibe aldı.",
    career: ["Corinthians", "Cercle Brugge", "Trabzonspor"],
    strengths: ["Potansiyel", "Bitiricilik", "Hareketlilik"]
  },
  {
    name: "Ernest Muci", team: "Trabzonspor", position: "Orta saha", age: 26,
    marketValue: 12, goals: 9, assists: 6, minutes: 2200, bigMatch: 89, form: 91,
    story: "Büyük maçlarda sürekli skor üreten, her forma giyme anında fark yaratan Trabzonspor'un hücum dinamosu.",
    career: ["Tirana", "Legia Warsaw", "Besiktas", "Trabzonspor"],
    strengths: ["Büyük maç", "Şut", "Yaratıcılık"]
  },
  {
    name: "Okay Yokuslu", team: "Trabzonspor", position: "Orta saha", age: 32,
    marketValue: 5, goals: 2, assists: 6, minutes: 2700, bigMatch: 83, form: 85,
    story: "Tecrübesi ve savunma katkısıyla Trabzonspor'un orta sahasının dengeleme taşı. Görünmez ama vazgeçilmez.",
    career: ["Trabzonspor", "Celta Vigo", "WBA", "Crystal Palace", "Trabzonspor"],
    strengths: ["Savunma", "Tecrübe", "Pas"]
  },
  {
    name: "Oleksandr Zubkov", team: "Trabzonspor", position: "Kanat", age: 28,
    marketValue: 10, goals: 7, assists: 8, minutes: 2100, bigMatch: 82, form: 86,
    story: "Ukraynalı kanat oyuncusu Trabzonspor'da ikinci sezonuna geldi, gol ve asist sayısını artırdı.",
    career: ["Dynamo Kyiv", "Galatasaray", "Trabzonspor"],
    strengths: ["Hız", "Bire bir", "Gol katkısı"]
  },

  // ===== BAŞAKŞEHİR =====
  {
    name: "Eldor Shomurodov", team: "Basaksehir", position: "Forvet", age: 32,
    marketValue: 7, goals: 18, assists: 6, minutes: 2550, bigMatch: 87, form: 88,
    story: "Başakşehir'in vazgeçilmez golcüsü. Üçüncü sezonunda da gol listesinin üst sıralarında kalmayı başardı.",
    career: ["Bunyodkor", "Rostov", "Genoa", "Roma", "Basaksehir"],
    strengths: ["Skor sezgisi", "Koşular", "Fizik"]
  },
  {
    name: "Muhammed Sengezer", team: "Basaksehir", position: "Kaleci", age: 30,
    marketValue: 3, goals: 0, assists: 0, minutes: 3100, bigMatch: 85, form: 89,
    story: "Başakşehir'in savunma örneğinin merkezinde. Clean sheet oranıyla sezonun değerli kalecileri arasında.",
    career: ["Bursaspor", "Basaksehir", "Adana Demirspor", "Basaksehir"],
    strengths: ["Refleks", "Istikrar", "Pozisyon"]
  },
  {
    name: "Berkay Ozcan", team: "Basaksehir", position: "Orta saha", age: 28,
    marketValue: 6, goals: 5, assists: 10, minutes: 2600, bigMatch: 83, form: 85,
    story: "Eyüpspor'dan transfer edilen Berkay, Başakşehir'de hemen adaptasyonu sağladı ve asist listesine girdi.",
    career: ["Stuttgart", "Greuther Furth", "Bochum", "Eyupspor", "Basaksehir"],
    strengths: ["Asist", "Pas kalitesi", "Vizyon"]
  },

  // ===== EYÜPSPOR =====
  {
    name: "Bertug Yildirim", team: "Eyupspor", position: "Forvet", age: 24,
    marketValue: 6, goals: 15, assists: 5, minutes: 2300, bigMatch: 84, form: 87,
    story: "İkinci sezonunda açılım yapan genç golcü. 15 golle takımını üst sıralara taşıdı, Avrupa kulüpleri alarma geçti.",
    career: ["Eyupspor"],
    strengths: ["Bitiricilik", "Potansiyel", "Hız"]
  },
  {
    name: "Emre Demir", team: "Eyupspor", position: "Kanat", age: 22,
    marketValue: 8, goals: 6, assists: 9, minutes: 2100, bigMatch: 82, form: 85,
    story: "Barça akademisinden gelen genç Türk yıldız Eyüpspor'da sezona damga vurdu. Hız ve tekniğiyle seyircileri büyülüyor.",
    career: ["Altinordu", "Barcelona B", "Girona", "Eyupspor"],
    strengths: ["Hız", "Dribbling", "Potansiyel"]
  },
  {
    name: "Ugur Ciftci", team: "Eyupspor", position: "Orta saha", age: 29,
    marketValue: 5, goals: 7, assists: 8, minutes: 2500, bigMatch: 81, form: 84,
    story: "Belçika Ligi'nden getirilen milli oyuncu Eyüpspor'un orta sahasında kontrol ve yaratıcılığı birleştiriyor.",
    career: ["Club Brugge", "Kortrijk", "Eyupspor"],
    strengths: ["Pas", "Gol", "Organizasyon"]
  },

  // ===== GÖZTEPE =====
  {
    name: "Mateusz Lis", team: "Goztepe", position: "Kaleci", age: 30,
    marketValue: 3, goals: 0, assists: 0, minutes: 3200, bigMatch: 87, form: 90,
    story: "Clean sheet rekoruna yaklaşan Lis, küçük bütçeli takımın en büyük silahı. Değer/katkı modelinin logosu.",
    career: ["Lech Poznan", "Southampton", "Troyes", "Goztepe"],
    strengths: ["Refleks", "Clean sheet", "Büyük maç"]
  },
  {
    name: "Juan", team: "Goztepe", position: "Kanat", age: 24,
    marketValue: 4, goals: 12, assists: 4, minutes: 2200, bigMatch: 82, form: 86,
    story: "İkinci sezonunda daha da iyileşti. Değerinin üzerindeki etki scoruyla uluslararası radarların gözdesi.",
    career: ["Gremio", "Santos", "Goztepe"],
    strengths: ["Bitiricilik", "Hız", "Skor sezgisi"]
  },
  {
    name: "Tunay Torun", team: "Goztepe", position: "Kanat", age: 33,
    marketValue: 2, goals: 5, assists: 7, minutes: 2000, bigMatch: 79, form: 81,
    story: "Tecrübeli Türk-Alman kanat oyuncusu Göztepe'de liderlik yapıyor. Deneyimiyle genç takıma yön veriyor.",
    career: ["Galatasaray", "Schalke", "Hamburger SV", "Goztepe"],
    strengths: ["Deneyim", "Pas", "Liderlik"]
  },

  // ===== ALANYASPOR =====
  {
    name: "Efkan Bektas", team: "Alanyaspor", position: "Forvet", age: 23,
    marketValue: 8, goals: 13, assists: 4, minutes: 2200, bigMatch: 82, form: 86,
    story: "Sezonun genç yeteneği ödülü. 23 yaşında 13 gol üretti. Avrupa ekipleri kapıda bekliyor.",
    career: ["Alanyaspor"],
    strengths: ["Bitiricilik", "Potansiyel", "Hız"]
  },
  {
    name: "Ertugrul Taskiran", team: "Alanyaspor", position: "Kaleci", age: 27,
    marketValue: 4, goals: 0, assists: 0, minutes: 3400, bigMatch: 85, form: 88,
    story: "Alanyaspor'un genç kalecisi ikinci sezonunda daha da büyüdü. Clean sheet oranıyla en iyi kalecilerden biri.",
    career: ["Alanyaspor"],
    strengths: ["Refleks", "Büyük maç", "Genç profil"]
  },
  {
    name: "Yunus Emre Erdogan", team: "Alanyaspor", position: "Orta saha", age: 25,
    marketValue: 5, goals: 7, assists: 9, minutes: 2500, bigMatch: 81, form: 84,
    story: "Alanyaspor'un yaratıcı beyin. Hem gol hem asist üretiminde büyük adımlar attı, milli takım kapısına dayandı.",
    career: ["Alanyaspor"],
    strengths: ["Yaratıcılık", "Asist", "Potansiyel"]
  },

  // ===== GAZİANTEP =====
  {
    name: "Mohamed Bayo", team: "Gaziantep", position: "Forvet", age: 29,
    marketValue: 5, goals: 14, assists: 4, minutes: 2300, bigMatch: 84, form: 87,
    story: "Üçüncü sezonunda zirvesine çıkıyor. 14 gol ve güçlü istikrarla küçük takımda büyük etki.",
    career: ["Clermont", "Lille", "Le Havre", "Watford", "Gaziantep"],
    strengths: ["Bitiricilik", "Pozisyon alma", "Istikrar"]
  },
  {
    name: "Ruslan Malinovskyi", team: "Gaziantep", position: "Orta saha", age: 33,
    marketValue: 7, goals: 8, assists: 10, minutes: 2400, bigMatch: 84, form: 86,
    story: "Atalanta tecrübesinin meyvelerini Süper Lig'de veriyor. Uzak şut ve asist kalitesiyle Gaziantep'in lideri.",
    career: ["Shakhtar", "Genk", "Atalanta", "Marseille", "Gaziantep"],
    strengths: ["Uzak şut", "Asist", "Liderlik"]
  },
  {
    name: "Srdjan Babic", team: "Gaziantep", position: "Defans", age: 27,
    marketValue: 4, goals: 2, assists: 3, minutes: 2800, bigMatch: 80, form: 82,
    story: "Sırp stoper Gaziantep'in savunma organizasyonunu yönetiyor. Hava topunda ve pas kalitesiyle öne çıkıyor.",
    career: ["Spartak Moskova", "Sturm Graz", "Gaziantep"],
    strengths: ["Hava topu", "Organizasyon", "Pas"]
  },

  // ===== KAYSERİSPOR =====
  {
    name: "Kouadio Kone", team: "Kayserispor", position: "Orta saha", age: 25,
    marketValue: 7, goals: 6, assists: 7, minutes: 2300, bigMatch: 83, form: 84,
    story: "Borussia Mönchengladbach tecrübesiyle Kayserispor'da liderlik eden fiziksel ve teknik orta saha.",
    career: ["Toulouse", "Borussia Monchengladbach", "Kayserispor"],
    strengths: ["Fizik", "Savunma", "Pas"]
  },
  {
    name: "Bilal Bayazit", team: "Kayserispor", position: "Kaleci", age: 28,
    marketValue: 2.5, goals: 0, assists: 0, minutes: 3200, bigMatch: 83, form: 84,
    story: "Kayserispor'un güvenilir kalecisi. Düşük bütçeli takımda yüksek kurtarış oranıyla değer yaratıyor.",
    career: ["Kayserispor"],
    strengths: ["Refleks", "Istikrar", "Clean sheet"]
  },
  {
    name: "Emre Akbaba", team: "Kayserispor", position: "Orta saha", age: 33,
    marketValue: 2, goals: 5, assists: 8, minutes: 2200, bigMatch: 79, form: 80,
    story: "Galatasaray ve Trabzonspor tecrübesiyle Kayserispor'a liderlik getiren milli orta saha. Takımın deneyim abidesi.",
    career: ["Elazigspor", "Galatasaray", "Trabzonspor", "Kayserispor"],
    strengths: ["Tecrübe", "Asist", "Liderlik"]
  },

  // ===== SAMSUNSPOR =====
  {
    name: "Okan Kocuk", team: "Samsunspor", position: "Kaleci", age: 26,
    marketValue: 3, goals: 0, assists: 0, minutes: 3300, bigMatch: 84, form: 85,
    story: "Samsunspor'un genç kalecisi üst lig hedeflerine doğru büyüyor. Net kurtarış oranında en üstteki kalecilerden.",
    career: ["Besiktas", "Samsunspor"],
    strengths: ["Kurtarış", "Büyük maç", "Genç profil"]
  },
  {
    name: "Ivohas Seka", team: "Samsunspor", position: "Forvet", age: 27,
    marketValue: 5, goals: 14, assists: 5, minutes: 2300, bigMatch: 81, form: 85,
    story: "Güine'li golcü Samsunspor'da tuttuğu forma ile günden güne değerleniyor. 14 gol ile kariyer rekoru.",
    career: ["Guimaraes", "Samsunspor"],
    strengths: ["Bitiricilik", "Fizik", "Patlama"]
  },
  {
    name: "Halil Dervisoglu", team: "Samsunspor", position: "Forvet", age: 26,
    marketValue: 4, goals: 8, assists: 5, minutes: 1900, bigMatch: 79, form: 82,
    story: "Brentford geçmişiyle Samsunspor'a katkı sağlayan Türk-Hollandalı oyuncu. Sezonun ikinci yarısında patladı.",
    career: ["Brentford", "Galatasaray", "Twente", "Samsunspor"],
    strengths: ["Hız", "Kıvraklık", "Büyük maç"]
  },

  // ===== KONYASPOR =====
  {
    name: "Olarenwaju Kayode", team: "Konyaspor", position: "Forvet", age: 32,
    marketValue: 2, goals: 9, assists: 3, minutes: 2100, bigMatch: 78, form: 79,
    story: "Deneyimli golcü bu sezonda da Konyaspor'un skor yükünü taşıdı. Değerine göre iş biten profil.",
    career: ["Austria Vienna", "Shakhtar", "Basaksehir", "Konyaspor"],
    strengths: ["Bitiricilik", "Tecrübe", "Pozisyon"]
  },
  {
    name: "Soner Aydogdu", team: "Konyaspor", position: "Orta saha", age: 29,
    marketValue: 1.8, goals: 5, assists: 8, minutes: 2500, bigMatch: 77, form: 81,
    story: "Konyaspor'un yaratıcı kalbi. Düşük değerine rağmen asist katkısıyla küme düşmeyi önlemenin baş aktörü.",
    career: ["Konyaspor"],
    strengths: ["Asist", "Pas", "Organizasyon"]
  },
  {
    name: "Nana Ampomah", team: "Konyaspor", position: "Kanat", age: 29,
    marketValue: 2.5, goals: 6, assists: 4, minutes: 2000, bigMatch: 76, form: 78,
    story: "Gana milli takımı kanatta Konyaspor'a hız ve ikili mücadele kazanımı getiriyor.",
    career: ["Gent", "Fortuna Dusseldorf", "Konyaspor"],
    strengths: ["Hız", "Bire bir", "Enerjik"]
  },

  // ===== RİZESPOR =====
  {
    name: "Yahia Fofana", team: "Rizespor", position: "Kaleci", age: 31,
    marketValue: 2.5, goals: 0, assists: 0, minutes: 3200, bigMatch: 84, form: 85,
    story: "Rizespor'un kurtarıcısı. Büyük maçlarda öne çıkan kurtarışlarıyla takımını defalarca sırtladı.",
    career: ["Angers", "Rizespor"],
    strengths: ["Deneyim", "Kurtarış", "Clean sheet"]
  },
  {
    name: "Brice Samba", team: "Rizespor", position: "Forvet", age: 27,
    marketValue: 3, goals: 9, assists: 4, minutes: 2000, bigMatch: 78, form: 80,
    story: "Fransa'dan gelen genç golcü Rizespor'da tutunmaya çalışıyor. Hız ve fiziksel güçle küme düşme mücadelesinde.",
    career: ["Troyes", "Dijon", "Rizespor"],
    strengths: ["Hız", "Fizik", "Bitiricilik"]
  },

  // ===== KOCAELİSPOR =====
  {
    name: "Aleksandar Jovanovic", team: "Kocaelispor", position: "Kaleci", age: 29,
    marketValue: 2, goals: 0, assists: 0, minutes: 3100, bigMatch: 82, form: 83,
    story: "Sırp kaleci Kocaelispor'un ligde kalma mücadelesindeki en güvenilir ismi. Clean sheet listesinde yerini koruyor.",
    career: ["Vojvodina", "Kocaelispor"],
    strengths: ["Refleks", "Istikrar", "Hava topu"]
  },
  {
    name: "Yusuf Erdogan", team: "Kocaelispor", position: "Orta saha", age: 27,
    marketValue: 2.5, goals: 6, assists: 8, minutes: 2600, bigMatch: 79, form: 82,
    story: "Kocaelispor'un kaptan kolluğunu hak eden performans. Asist sayısıyla takımın en değerli kozu.",
    career: ["Kocaelispor"],
    strengths: ["Asist", "Liderlik", "Dayanıklılık"]
  },
  {
    name: "Martin Braithwaite", team: "Kocaelispor", position: "Forvet", age: 35,
    marketValue: 1.5, goals: 7, assists: 3, minutes: 1800, bigMatch: 75, form: 76,
    story: "Barcelona geçmişiyle Kocaelispor'da kariyer sonunu yaşayan Danimarkalı. Deneyimi ve liderliği takıma değer katıyor.",
    career: ["Middlesbrough", "Toulouse", "Leganes", "Barcelona", "Espanyol", "Kocaelispor"],
    strengths: ["Tecrübe", "Büyük maç", "Bitiricilik"]
  },

  // ===== KASIMPAŞA =====
  {
    name: "Andreas Gianniotis", team: "Kasimpasa", position: "Kaleci", age: 33,
    marketValue: 1.2, goals: 0, assists: 0, minutes: 3200, bigMatch: 82, form: 81,
    story: "Deneyimiyle Kasımpaşa'nın göbeğine oturmuş kaleci. Büyük maçlarda sergilediği performans takımını ayakta tutuyor.",
    career: ["Panathinaikos", "Kasimpasa"],
    strengths: ["Deneyim", "Kurtarış", "Liderlik"]
  },
  {
    name: "Rodrigo Bentancur", team: "Kasimpasa", position: "Orta saha", age: 28,
    marketValue: 20, goals: 4, assists: 7, minutes: 2400, bigMatch: 84, form: 85,
    story: "Tottenham'dan gelip Kasımpaşa'yı seçmesi şaşırttı. Ama sahadaki kalitesiyle herkes anlıyor neden burada.",
    career: ["Boca Juniors", "Juventus", "Tottenham", "Kasimpasa"],
    strengths: ["Vizyon", "Pas", "Liderlik"]
  },
  {
    name: "Mostafa Mohamed", team: "Kasimpasa", position: "Forvet", age: 28,
    marketValue: 6, goals: 11, assists: 3, minutes: 2200, bigMatch: 80, form: 82,
    story: "Mısır milli takımının yıldız golcüsü Türkiye Süper Ligi'nde kendini kanıtlamaya devam ediyor.",
    career: ["Zamalek", "Nantes", "Galatasaray", "Kasimpasa"],
    strengths: ["Bitiricilik", "Hava topu", "Skor sezgisi"]
  },

  // ===== ANTALYASPOR =====
  {
    name: "Oguzhan Ozyakup", team: "Antalyaspor", position: "Orta saha", age: 34,
    marketValue: 2, goals: 3, assists: 6, minutes: 2300, bigMatch: 78, form: 78,
    story: "Arsenal geçmişli tecrübeli orta saha, Antalya'da küme düşme savaşında liderlik yapıyor.",
    career: ["Besiktas", "Arsenal", "Besiktas", "Antalyaspor"],
    strengths: ["Pas", "Tecrübe", "Liderlik"]
  },
  {
    name: "Gael Kakuta", team: "Antalyaspor", position: "Kanat", age: 34,
    marketValue: 1.5, goals: 5, assists: 4, minutes: 1900, bigMatch: 74, form: 75,
    story: "Chelsea altyapısının gözdesi olan Fransız, kariyerinin son durağında Antalya'da çabalıyor.",
    career: ["Chelsea", "Lazio", "Lens", "Antalyaspor"],
    strengths: ["Teknik", "Tecrübe", "Hız"]
  },
  {
    name: "Younes Belhanda", team: "Antalyaspor", position: "Orta saha", age: 36,
    marketValue: 0.8, goals: 2, assists: 5, minutes: 1700, bigMatch: 72, form: 71,
    story: "Galatasaray ve Nice tarihinden gelen Faslı efsane, kariyerinin son noktasında Antalya'da sahnede.",
    career: ["Nice", "Schalke", "Galatasaray", "Antalyaspor"],
    strengths: ["Pas", "Tecrübe", "Vizyon"]
  },

  // ===== ADANA DEMİRSPOR (Yeni Çıkan) =====
  {
    name: "Mario Balotelli", team: "Adana Demirspor", position: "Forvet", age: 36,
    marketValue: 1, goals: 8, assists: 2, minutes: 1700, bigMatch: 76, form: 74,
    story: "Yeniden Adana'ya döndü! Efsane golcü ligdeki ikinci Adana döneminde hâlâ sahada topa vururken gülümsüyor.",
    career: ["Inter", "Man City", "Liverpool", "AC Milan", "Nice", "Besiktas", "Adana Demirspor"],
    strengths: ["Gol sezgisi", "Tecrübe", "Kişisel kalite"]
  },
  {
    name: "Yusuf Yazici", team: "Adana Demirspor", position: "Orta saha", age: 28,
    marketValue: 8, goals: 9, assists: 8, minutes: 2400, bigMatch: 83, form: 84,
    story: "Trabzonspor'dan yetişen milli oyuncu Adana ile Süper Lig'e döndü. Hem gol hem asist üreten lider profil.",
    career: ["Trabzonspor", "Lille", "CSKA Moskova", "Adana Demirspor"],
    strengths: ["Gol", "Asist", "Liderlik"]
  },
  {
    name: "Caner Erkin", team: "Adana Demirspor", position: "Defans", age: 37,
    marketValue: 0.5, goals: 0, assists: 3, minutes: 2000, bigMatch: 75, form: 73,
    story: "Türk futbolunun en önemli sol beklerinden. Kariyerinin son sezonunda Adana'da forma giymekten mutlu.",
    career: ["Bursaspor", "Fenerbahce", "Inter", "Adana Demirspor"],
    strengths: ["Tecrübe", "Hücum katkısı", "Liderlik"]
  },

  // ===== SİVASSPOR (Yeni Çıkan) =====
  {
    name: "Mustapha Yatabare", team: "Sivasspor", position: "Forvet", age: 36,
    marketValue: 0.8, goals: 7, assists: 2, minutes: 1900, bigMatch: 74, form: 74,
    story: "Mali milli golcü Sivasspor'un gol yükünü taşıyor. Fiziksel güç ve havada hâkimiyetiyle skor üretiyor.",
    career: ["Montpellier", "Sivasspor", "Kayserispor", "Sivasspor"],
    strengths: ["Hava topu", "Fizik", "Bitiricilik"]
  },
  {
    name: "Gokhan Sazdagi", team: "Sivasspor", position: "Kaleci", age: 30,
    marketValue: 1.5, goals: 0, assists: 0, minutes: 3000, bigMatch: 79, form: 80,
    story: "Sivasspor'un Süper Lig mücadelesindeki ilk kalesi. Kurtarış oranıyla küme düşmeye karşı savaşıyor.",
    career: ["Sivasspor"],
    strengths: ["Reflexes", "Istikrar", "Fizik"]
  },
  {
    name: "Leke James", team: "Sivasspor", position: "Forvet", age: 27,
    marketValue: 2, goals: 8, assists: 3, minutes: 2100, bigMatch: 76, form: 78,
    story: "Nijeryalı golcü Sivasspor'un saldırı motorunu oluşturuyor. Hızı ve bitiricilik kalitesiyle ligin sürpriz ismi.",
    career: ["Club Brugge", "Kortrijk", "Sivasspor"],
    strengths: ["Hız", "Bitiricilik", "Enerji"]
  }
];

// ── TAKIM TEMELERİ ─────────────────────────────────────────────
const teamThemes = [
  { name: "Lig teması",         primary: "#22c76e", secondary: "#f0a830", accent: "#e8604a", dark: "#0c1410" },
  { name: "Galatasaray",        primary: "#a90432", secondary: "#f4b000", accent: "#ff6a13", dark: "#18070c" },
  { name: "Fenerbahce",         primary: "#003f8f", secondary: "#ffd200", accent: "#ffffff", dark: "#07172f" },
  { name: "Besiktas",           primary: "#111111", secondary: "#ffffff", accent: "#d71920", dark: "#050505" },
  { name: "Trabzonspor",        primary: "#7a263a", secondary: "#5bb6d6", accent: "#f1d2dc", dark: "#160b12" },
  { name: "Basaksehir",         primary: "#f47b20", secondary: "#173b7a", accent: "#ffffff", dark: "#1f1308" },
  { name: "Eyupspor",           primary: "#5b2c83", secondary: "#f2c14e", accent: "#ffffff", dark: "#160d1f" },
  { name: "Goztepe",            primary: "#d71920", secondary: "#f8d000", accent: "#111111", dark: "#190908" },
  { name: "Alanyaspor",         primary: "#f47b20", secondary: "#16823a", accent: "#ffffff", dark: "#1d1208" },
  { name: "Gaziantep",          primary: "#d71920", secondary: "#111111", accent: "#ffffff", dark: "#180807" },
  { name: "Kayserispor",        primary: "#d71920", secondary: "#ffd200", accent: "#111111", dark: "#1a0d07" },
  { name: "Samsunspor",         primary: "#d71920", secondary: "#ffffff", accent: "#111111", dark: "#190909" },
  { name: "Konyaspor",          primary: "#159447", secondary: "#ffffff", accent: "#d71920", dark: "#07170e" },
  { name: "Rizespor",           primary: "#007a3d", secondary: "#0b69b3", accent: "#ffffff", dark: "#06141a" },
  { name: "Kocaelispor",        primary: "#138a44", secondary: "#111111", accent: "#ffffff", dark: "#07150d" },
  { name: "Kasimpasa",          primary: "#174a9c", secondary: "#ffffff", accent: "#2bb3e7", dark: "#071326" },
  { name: "Antalyaspor",        primary: "#d71920", secondary: "#ffffff", accent: "#111111", dark: "#180807" },
  { name: "Adana Demirspor",    primary: "#d71920", secondary: "#0052a5", accent: "#ffffff", dark: "#190708" },
  { name: "Sivasspor",          primary: "#c8102e", secondary: "#ffd700", accent: "#ffffff", dark: "#18070b" }
];

// ── KADROLAR ──────────────────────────────────────────────────
const teamSquads = {
  Galatasaray: [
    { name: "Ugurcan Cakir",      position: "Kaleci",    note: "Sezonun Kalecisi 🧤" },
    { name: "Wilfried Singo",     position: "Defans",    note: "Sağ bek" },
    { name: "Abdulkerim Bardakci",position: "Defans",    note: "Stoper" },
    { name: "Kaan Ayhan",         position: "Defans",    note: "Stoper" },
    { name: "Ismail Jakobs",      position: "Defans",    note: "Sol bek" },
    { name: "Lucas Torreira",     position: "Orta saha", note: "Ön libero" },
    { name: "Gabriel Sara",       position: "Orta saha", note: "Merkez" },
    { name: "Ilkay Gundogan",     position: "Orta saha", note: "Lider" },
    { name: "Baris Alper Yilmaz", position: "Kanat",     note: "Sezonun Oyuncusu ⭐" },
    { name: "Leroy Sane",         position: "Kanat",     note: "Sağ kanat" },
    { name: "Artem Dovbyk",       position: "Forvet",    note: "Transfer golcüsü" }
  ],
  Fenerbahce: [
    { name: "Ederson",            position: "Kaleci",    note: "A Takım" },
    { name: "Nelson Semedo",      position: "Defans",    note: "Sağ bek" },
    { name: "Caglar Soyuncu",     position: "Defans",    note: "Stoper" },
    { name: "Milan Skriniar",     position: "Defans",    note: "Stoper" },
    { name: "Jayden Oosterwolde", position: "Defans",    note: "Sol bek" },
    { name: "Edson Alvarez",      position: "Orta saha", note: "Ön libero" },
    { name: "Marco Asensio",      position: "Orta saha", note: "Hücum orta saha" },
    { name: "Talisca",            position: "Orta saha", note: "Skor" },
    { name: "Dorgeles Nene",      position: "Kanat",     note: "Asist Krallığı 🎯" },
    { name: "Kerem Akturkoglu",   position: "Kanat",     note: "Transfer sürprizi" }
  ],
  Besiktas: [
    { name: "Mert Gunok",         position: "Kaleci",    note: "Kaptan" },
    { name: "Gabriel Paulista",   position: "Defans",    note: "Stoper" },
    { name: "David Jurasek",      position: "Defans",    note: "Sol bek" },
    { name: "Wilfred Ndidi",      position: "Orta saha", note: "Ön libero" },
    { name: "Orkun Kokcu",        position: "Orta saha", note: "Merkez" },
    { name: "Rafa Silva",         position: "Orta saha", note: "Yaratıcı" },
    { name: "Joao Mario",         position: "Orta saha", note: "Sol" },
    { name: "Tammy Abraham",      position: "Forvet",    note: "Santrfor" }
  ],
  Trabzonspor: [
    { name: "Paul Onuachu",       position: "Forvet",    note: "Gol Kralı ⚽ 24 gol" },
    { name: "Felipe Augusto",     position: "Forvet",    note: "14 gol" },
    { name: "Ernest Muci",        position: "Orta saha", note: "Hücum" },
    { name: "Oleksandr Zubkov",   position: "Kanat",     note: "Kanat" },
    { name: "Okay Yokuslu",       position: "Orta saha", note: "Merkez" }
  ],
  Basaksehir: [
    { name: "Muhammed Sengezer",  position: "Kaleci",    note: "Clean sheet listesi" },
    { name: "Eldor Shomurodov",   position: "Forvet",    note: "18 gol" },
    { name: "Berkay Ozcan",       position: "Orta saha", note: "10 asist" }
  ],
  Eyupspor: [
    { name: "Bertug Yildirim",    position: "Forvet",    note: "15 gol" },
    { name: "Emre Demir",         position: "Kanat",     note: "Barcelona kökenli" },
    { name: "Ugur Ciftci",        position: "Orta saha", note: "Merkez" }
  ],
  Goztepe: [
    { name: "Mateusz Lis",        position: "Kaleci",    note: "Clean sheet listesi" },
    { name: "Juan",               position: "Kanat",     note: "12 gol" },
    { name: "Tunay Torun",        position: "Kanat",     note: "Deneyimli" }
  ],
  Alanyaspor: [
    { name: "Ertugrul Taskiran",  position: "Kaleci",    note: "Genç kaleci" },
    { name: "Efkan Bektas",       position: "Forvet",    note: "Genç Yetenek 🌟 13 gol" },
    { name: "Yunus Emre Erdogan", position: "Orta saha", note: "9 asist" }
  ],
  Gaziantep: [
    { name: "Mohamed Bayo",       position: "Forvet",    note: "14 gol" },
    { name: "Ruslan Malinovskyi", position: "Orta saha", note: "10 asist" },
    { name: "Srdjan Babic",       position: "Defans",    note: "Stoper" }
  ],
  Kayserispor: [
    { name: "Bilal Bayazit",      position: "Kaleci",    note: "Clean sheet listesi" },
    { name: "Kouadio Kone",       position: "Orta saha", note: "Merkez" },
    { name: "Emre Akbaba",        position: "Orta saha", note: "Kaptan" }
  ],
  Samsunspor: [
    { name: "Okan Kocuk",         position: "Kaleci",    note: "Genç kaleci" },
    { name: "Ivohas Seka",        position: "Forvet",    note: "14 gol" },
    { name: "Halil Dervisoglu",   position: "Forvet",    note: "8 gol" }
  ],
  Konyaspor: [
    { name: "Olarenwaju Kayode",  position: "Forvet",    note: "9 gol" },
    { name: "Soner Aydogdu",      position: "Orta saha", note: "8 asist" },
    { name: "Nana Ampomah",       position: "Kanat",     note: "Hız" }
  ],
  Rizespor: [
    { name: "Yahia Fofana",       position: "Kaleci",    note: "Clean sheet listesi" },
    { name: "Brice Samba",        position: "Forvet",    note: "9 gol" }
  ],
  Kocaelispor: [
    { name: "Aleksandar Jovanovic",position:"Kaleci",    note: "Clean sheet listesi" },
    { name: "Yusuf Erdogan",      position: "Orta saha", note: "Kaptan" },
    { name: "Martin Braithwaite", position: "Forvet",    note: "Barcelona geçmişi" }
  ],
  Kasimpasa: [
    { name: "Andreas Gianniotis", position: "Kaleci",    note: "Deneyimli" },
    { name: "Rodrigo Bentancur",  position: "Orta saha", note: "Tottenham geçmişi" },
    { name: "Mostafa Mohamed",    position: "Forvet",    note: "11 gol" }
  ],
  Antalyaspor: [
    { name: "Oguzhan Ozyakup",    position: "Orta saha", note: "Kaptan" },
    { name: "Gael Kakuta",        position: "Kanat",     note: "Chelsea kökenli" },
    { name: "Younes Belhanda",    position: "Orta saha", note: "Efsane" }
  ],
  "Adana Demirspor": [
    { name: "Mario Balotelli",    position: "Forvet",    note: "Efsane geri döndü!" },
    { name: "Yusuf Yazici",       position: "Orta saha", note: "Lider" },
    { name: "Caner Erkin",        position: "Defans",    note: "Kaptan" }
  ],
  Sivasspor: [
    { name: "Gokhan Sazdagi",     position: "Kaleci",    note: "A Takım" },
    { name: "Mustapha Yatabare",  position: "Forvet",    note: "7 gol" },
    { name: "Leke James",         position: "Forvet",    note: "8 gol" }
  ]
};

// ── PUAN DURUMU 2025-26 — Transfermarkt 34. Hafta ────────────────────────────
// Kaynak: transfermarkt.com/super-lig/tabelle/wettbewerb/TR1/saison_id/2025
const standings = [
  { team: "Kocaelispor",     o:38, g:10, b:10, m:18, ag:39, yg:63, pts:40, badge:"#138a44", zone:""           },
  { team: "Adana Demirspor", o:38, g:10, b:8,  m:20, ag:38, yg:67, pts:38, badge:"#d71920", zone:""           },
  { team: "Antalyaspor",     o:38, g:8,  b:8,  m:22, ag:33, yg:74, pts:32, badge:"#d71920", zone:"relegation" },
  { team: "Sivasspor",       o:38, g:5,  b:7,  m:26, ag:28, yg:82, pts:22, badge:"#c8102e", zone:"relegation" }
];

// ── SEZON ÖDÜLLERİ 2025-26 ────────────────────────────────────
const seasonAwards = [
  {
    emoji: "⭐",
    title: "Sezonun Oyuncusu",
    winner: "Barış Alper Yılmaz",
    team: "Galatasaray",
    detail: "16 gol · 12 asist",
    note: "Hem gol hem asist listelerinde zirve, büyük maçlarda defalarca fark yaratan performansıyla tartışmasız sezonun en iyisi.",
    color: "#f0a830"
  },
  {
    emoji: "⚽",
    title: "Gol Kralı",
    winner: "Paul Onuachu",
    team: "Trabzonspor",
    detail: "24 gol",
    note: "İkinci kez üst üste gol krallığı! Hava topu hâkimiyeti ve ceza sahası bitiriciliğiyle Süper Lig tarihine geçti.",
    color: "#22c76e"
  },
  {
    emoji: "🎯",
    title: "Asist Krallığı",
    winner: "Dorgeles Nene",
    team: "Fenerbahçe",
    detail: "16 asist",
    note: "Sezonun en yaratıcı oyuncusu. Hız, vizyon ve son pas kalitesiyle rakip savunmaları paramparça etti.",
    color: "#003f8f"
  },
  {
    emoji: "🧤",
    title: "Sezonun Kalecisi",
    winner: "Ugurcan Çakır",
    team: "Galatasaray",
    detail: "20 gol yememe",
    note: "Galatasaray'ın 3. üst üste şampiyonluğunun mimarı. Büyük maçlarda efsane kurtarışlar sezonun fotoğraflarına girdi.",
    color: "#a90432"
  },
  {
    emoji: "🌟",
    title: "Genç Yetenek",
    winner: "Efkan Bektaş",
    team: "Alanyaspor",
    detail: "23 yaş · 13 gol",
    note: "Sezonun en büyük sürprizi. Küçük bütçeli takımda devasa performans. Avrupa kulüpleri kapıda.",
    color: "#f47b20"
  },
  {
    emoji: "👨‍💼",
    title: "Sezonun Teknik Direktörü",
    winner: "Okan Buruk",
    team: "Galatasaray",
    detail: "3. Üst Üste Şampiyonluk",
    note: "Türk futbol tarihinde bir miras inşa ediyor. 3 yılda 3 şampiyonluk — tartışmasız sezonun en büyük teknik direktörü.",
    color: "#22c76e"
  }
];

// ── ANKET VERİSİ ──────────────────────────────────────────────
const polls = [
  {
    id: "poll_2526_w1",
    question: "Sezonun En İyi Forveti Kim?",
    candidates: [
      { name: "Paul Onuachu",    team: "Trabzonspor" },
      { name: "Artem Dovbyk",    team: "Galatasaray" },
      { name: "Tammy Abraham",   team: "Besiktas" },
      { name: "Eldor Shomurodov",team: "Basaksehir" }
    ]
  },
  {
    id: "poll_2526_w2",
    question: "2025-26 Sezonunun Hayal Kırıklığı Kim?",
    candidates: [
      { name: "Victor Osimhen",  team: "Ayrıldı" },
      { name: "Gael Kakuta",     team: "Antalyaspor" },
      { name: "Mario Balotelli", team: "Adana Demirspor" },
      { name: "Younes Belhanda", team: "Antalyaspor" }
    ]
  }
];

// ── TAHMİN OYUNU — 2025-26 HAFTASI ───────────────────────────
const matchFixtures = [
  { home: "Galatasaray",     away: "Fenerbahce",      actualHome: 2, actualAway: 2 },
  { home: "Besiktas",        away: "Trabzonspor",      actualHome: 1, actualAway: 2 },
  { home: "Eyupspor",        away: "Basaksehir",       actualHome: 2, actualAway: 1 },
  { home: "Alanyaspor",      away: "Goztepe",          actualHome: 1, actualAway: 1 },
  { home: "Adana Demirspor", away: "Kasimpasa",        actualHome: 2, actualAway: 0 },
  { home: "Sivasspor",       away: "Kayserispor",      actualHome: 0, actualAway: 3 }
];

// ── MEVKI MODELLERİ ───────────────────────────────────────────
const positionModels = {
  Forvet:      { goal:8.5, assist:4.2, minutes:0.010, bigMatch:0.42, form:0.35, roleBonus:8  },
  Kanat:       { goal:7.0, assist:5.6, minutes:0.011, bigMatch:0.38, form:0.42, roleBonus:10 },
  "Orta saha": { goal:5.8, assist:6.8, minutes:0.014, bigMatch:0.34, form:0.45, roleBonus:14 },
  Defans:      { goal:4.0, assist:4.4, minutes:0.018, bigMatch:0.48, form:0.38, roleBonus:34 },
  Kaleci:      { goal:0.0, assist:2.0, minutes:0.020, bigMatch:0.62, form:0.58, roleBonus:48 }
};

// ── STATE ─────────────────────────────────────────────────────
const state = { search:"", position:"all", team:"all", sort:"valueScore", budgetOnly:false };

// ── ENRİCHED PLAYERS ──────────────────────────────────────────
const enrichedPlayers = players.map((player) => {
  const model = positionModels[player.position] || positionModels["Orta saha"];
  const attacking = player.goals * model.goal + player.assists * model.assist;
  const impactScore = Math.round(
    attacking + player.minutes * model.minutes +
    player.bigMatch * model.bigMatch + player.form * model.form + model.roleBonus
  );
  const valueScore  = Math.round((impactScore / Math.max(player.marketValue, 0.35)) * 7);
  const scoutScore  = Math.round(valueScore * 0.58 + player.form * 0.28 + (28 - Math.min(player.age, 28)) * 1.6);
  const surpriseScore = Math.round(valueScore * 0.65 + player.bigMatch * 0.22 + player.form * 0.13);
  return { ...player, impactScore, valueScore, scoutScore, surpriseScore, contribution: player.goals + player.assists };
});

// ── DOM REFS ──────────────────────────────────────────────────
const playerGrid      = document.querySelector("#playerGrid");
const resultCount     = document.querySelector("#resultCount");
const searchInput     = document.querySelector("#searchInput");
const positionFilter  = document.querySelector("#positionFilter");
const teamFilter      = document.querySelector("#teamFilter");
const sortMode        = document.querySelector("#sortMode");
const budgetOnly      = document.querySelector("#budgetOnly");
const playerA         = document.querySelector("#playerA");
const playerB         = document.querySelector("#playerB");
const comparison      = document.querySelector("#comparison");
const swapButton      = document.querySelector("#swapButton");
const valueBoard      = document.querySelector("#valueBoard");
const scoutBoard      = document.querySelector("#scoutBoard");
const themeBar        = document.querySelector("#themeBar");
const activeThemeName = document.querySelector("#activeThemeName");
const squadTeamSelect = document.querySelector("#squadTeamSelect");
const squadGrid       = document.querySelector("#squadGrid");
const squadNote       = document.querySelector("#squadNote");
const playerModal     = document.querySelector("#playerModal");
const modalClose      = document.querySelector("#modalClose");
const modalPlayerName = document.querySelector("#modalPlayerName");
const modalPlayerTeam = document.querySelector("#modalPlayerTeam");
const modalPlayerTag  = document.querySelector("#modalPlayerTag");
const modalContent    = document.querySelector("#modalContent");
const standingsBody   = document.querySelector("#standingsBody");
const awardsGrid      = document.querySelector("#awardsGrid");
const pollOptions     = document.querySelector("#pollOptions");
const pollBadge       = document.querySelector("#pollBadge");
const pollNote        = document.querySelector("#pollNote");
const matchCards      = document.querySelector("#matchCards");
const submitPredictions  = document.querySelector("#submitPredictions");
const resetPredictions   = document.querySelector("#resetPredictions");
const predictResult   = document.querySelector("#predictResult");
const userTotalScore  = document.querySelector("#userTotalScore");
const navHamburger    = document.querySelector("#navHamburger");
const navMobileMenu   = document.querySelector("#navMobileMenu");

// ── YARDIMCILAR ───────────────────────────────────────────────
function formatValue(v) { return v >= 1 ? v.toFixed(1) + "M" : Math.round(v * 1000) + "K"; }
function getLabel(p) {
  if (p.valueScore > 900) return "Değer canavarı";
  if (p.scoutScore > 430) return "Scout radarı";
  if (p.bigMatch > 88)    return "Büyük maç";
  if (p.form > 88)        return "Formda";
  return "İstikrar";
}
function getFilteredPlayers() {
  return enrichedPlayers
    .filter(p => {
      const txt = `${p.name} ${p.team} ${p.position}`.toLowerCase();
      return txt.includes(state.search.toLowerCase()) &&
        (state.position === "all" || p.position === state.position) &&
        (state.team === "all"     || p.team     === state.team) &&
        (!state.budgetOnly || p.marketValue < 2);
    })
    .sort((a, b) => b[state.sort] - a[state.sort]);
}
function topBy(key) { return [...enrichedPlayers].sort((a,b) => b[key] - a[key])[0]; }

// ── ÖZET ─────────────────────────────────────────────────────
function renderSummary() {
  const bi = topBy("impactScore"), bv = topBy("valueScore"),
        bs = topBy("scoutScore"),  bb = topBy("bigMatch"),
        hero = topBy("surpriseScore");
  document.querySelector("#topImpact").textContent   = `${bi.name} (${bi.impactScore})`;
  document.querySelector("#topValue").textContent    = `${bv.name} (${bv.valueScore})`;
  document.querySelector("#topScout").textContent    = `${bs.name} (${bs.scoutScore})`;
  document.querySelector("#topBigMatch").textContent = `${bb.name} (${bb.bigMatch})`;
  document.querySelector("#heroPlayer").textContent  = hero.name;
  document.querySelector("#heroNote").textContent    = `${hero.team} · ${formatValue(hero.marketValue)} EUR · skor ${hero.surpriseScore}`;
}

// ── LIDERBOARD ───────────────────────────────────────────────
function boardItem(p, i, key) {
  return `<div class="board-item">
    <span class="rank">${i+1}</span>
    <div><strong>${p.name}</strong><span class="board-meta">${p.team} · ${p.position} · ${formatValue(p.marketValue)} EUR</span></div>
    <span class="board-score">${p[key]}</span>
  </div>`;
}
function renderBoards() {
  valueBoard.innerHTML = [...enrichedPlayers].sort((a,b)=>b.valueScore-a.valueScore).slice(0,5).map((p,i)=>boardItem(p,i,"valueScore")).join("");
  scoutBoard.innerHTML = [...enrichedPlayers].filter(p=>p.marketValue<2.5&&p.age<=26).sort((a,b)=>b.scoutScore-a.scoutScore).slice(0,5).map((p,i)=>boardItem(p,i,"scoutScore")).join("");
}

// ── TEMA ─────────────────────────────────────────────────────
function applyTheme(theme) {
  const r = document.documentElement;
  r.style.setProperty("--theme-primary",   theme.primary);
  r.style.setProperty("--theme-secondary", theme.secondary);
  r.style.setProperty("--theme-accent",    theme.accent);
  r.style.setProperty("--theme-dark",      theme.dark);
  if (activeThemeName) activeThemeName.textContent = theme.name;
  document.querySelectorAll(".theme-button").forEach(b => b.classList.toggle("is-active", b.dataset.theme === theme.name));
}
function renderThemes() {
  themeBar.innerHTML = teamThemes.map(t => `
    <button class="theme-button" type="button" data-theme="${t.name}" style="--swatch-a:${t.primary};--swatch-b:${t.secondary};">
      <span class="theme-swatch"></span>${t.name}
    </button>`).join("");
  themeBar.addEventListener("click", e => {
    const b = e.target.closest(".theme-button");
    if (b) { const t = teamThemes.find(x=>x.name===b.dataset.theme); if(t) applyTheme(t); }
  });
  applyTheme(teamThemes[0]);
}

// ── KADRO ─────────────────────────────────────────────────────
function renderSquadTeams() {
  squadTeamSelect.innerHTML = teamThemes.filter(t=>t.name!=="Lig teması").map(t=>`<option value="${t.name}">${t.name}</option>`).join("");
  squadTeamSelect.value = "Galatasaray";
  renderSquad();
}
function renderSquad() {
  const name = squadTeamSelect.value, squad = teamSquads[name];
  const theme = teamThemes.find(t=>t.name===name);
  if (theme) applyTheme(theme);
  if (!squad) {
    squadNote.textContent = `${name}: kadro henüz eklenmedi`;
    squadGrid.innerHTML = `<div class="squad-empty">${name} kadrosu henüz eklenmedi.</div>`;
    return;
  }
  squadNote.textContent = `${name}: ${squad.length} oyuncu — 2025-26 Sezonu`;
  squadGrid.innerHTML = squad.map(p=>`<article class="squad-card"><strong>${p.name}</strong><span>${p.position} · ${p.note}</span></article>`).join("");
}

// ── PUAN DURUMU ───────────────────────────────────────────────
function renderStandings() {
  const zc = { champion:"row-champion", ucl:"row-ucl", uel:"row-uel", uecl:"row-uel", relegation:"row-relegation" };
  standingsBody.innerHTML = standings.map((r,i) => `
    <tr class="${zc[r.zone]||""}">
      <td class="st-rank">${i+1}</td>
      <td><div class="st-team"><span class="st-badge" style="background:${r.badge};"></span>${r.team}</div></td>
      <td>${r.o}</td><td>${r.g}</td><td>${r.b}</td><td>${r.m}</td>
      <td>${r.ag}</td><td>${r.yg}</td>
      <td>${r.ag-r.yg>=0?"+":""}${r.ag-r.yg}</td>
      <td class="st-pts">${r.pts}</td>
    </tr>`).join("");
  const panel = document.querySelector("#standings-section");
  // Kaynak notu
  if (!panel.querySelector(".standings-source")) {
    const src = document.createElement("p");
    src.className = "standings-source";
    src.innerHTML = `📊 Kaynak: <a href="https://www.transfermarkt.com/super-lig/tabelle/wettbewerb/TR1/saison_id/2025" target="_blank" rel="noopener">Transfermarkt — 2025/26 34. Hafta</a>`;
    panel.insertBefore(src, panel.querySelector("#standingsTable") || panel.querySelector("table") || panel.firstChild);
  }
  if (!panel.querySelector(".standings-legend")) {
    const leg = document.createElement("div");
    leg.className = "standings-legend";
    leg.innerHTML = `
      <div class="legend-item"><span class="legend-dot" style="background:#afd179;"></span>Şampiyon + ŞL</div>
      <div class="legend-item"><span class="legend-dot" style="background:#d6eab6;"></span>Şampiyonlar Ligi</div>
      <div class="legend-item"><span class="legend-dot" style="background:#bdd9ef;"></span>Avrupa Ligi (PO)</div>
      <div class="legend-item"><span class="legend-dot" style="background:#a5cce9;"></span>Konferans Ligi</div>
      <div class="legend-item"><span class="legend-dot" style="background:#f8a7a3;"></span>Küme düşme</div>`;
    panel.appendChild(leg);
  }
}

// ── SEZON ÖDÜLLERİ ───────────────────────────────────────────
function renderAwards() {
  if (!awardsGrid) return;
  awardsGrid.innerHTML = seasonAwards.map(a => `
    <div class="award-card">
      <div class="award-header" style="--award-color:${a.color};">
        <span class="award-emoji-main">${a.emoji}</span>
        <span class="award-title">${a.title}</span>
        <span class="award-winner">${a.winner}</span>
        <span class="award-team-badge">${a.team}</span>
      </div>
      <div class="award-body">
        <div class="award-detail">${a.detail}</div>
        <p class="award-note">${a.note}</p>
      </div>
    </div>`).join("");
}

// ── OYUNCU KARTLARI ───────────────────────────────────────────
function tmUrl(name) {
  const q = encodeURIComponent(name);
  return `https://www.transfermarkt.com/schnellsuche/ergebnis/schnellsuche?query=${q}`;
}

function renderPlayers() {
  const list = getFilteredPlayers();
  resultCount.textContent = `${list.length} oyuncu`;
  playerGrid.innerHTML = list.map(p => {
    const mw = Math.min(100, Math.round(p.valueScore/10));
    return `<article class="player-card" data-player="${p.name}" tabindex="0" role="button" aria-label="${p.name} detayını aç">
      <div class="card-head">
        <div><h3>${p.name}</h3><p>${p.team} · ${p.position} · ${p.age} yaş</p></div>
        <span class="tag">${getLabel(p)}</span>
      </div>
      <div class="stat-row">
        <div class="stat"><span>Piyasa Değeri</span><strong>${formatValue(p.marketValue)} €</strong></div>
        <div class="stat"><span>Etki Skoru</span><strong>${p.impactScore}</strong></div>
        <div class="stat"><span>Fiyat/Katkı</span><strong>${p.valueScore}</strong></div>
      </div>
      <div><div class="meter"><span style="width:${mw}%"></span></div></div>
      <p class="story">${p.story}</p>
      <a class="tm-link" href="${tmUrl(p.name)}" target="_blank" rel="noopener noreferrer"
         onclick="event.stopPropagation()" aria-label="Transfermarkt'ta ${p.name}">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
        Transfermarkt'ta Gör
      </a>
    </article>`;
  }).join("");
}

// ── MODAL ─────────────────────────────────────────────────────
function openPlayerModal(name) {
  const p = enrichedPlayers.find(x=>x.name===name);
  if (!p) return;
  modalPlayerName.textContent = p.name;
  modalPlayerTeam.textContent = `${p.team} · ${p.position} · ${p.age} yaş`;
  modalPlayerTag.textContent  = getLabel(p);
  modalContent.innerHTML = `
    <div class="modal-stats">
      <div class="stat"><span>Piyasa Değeri</span><strong>${formatValue(p.marketValue)} €</strong></div>
      <div class="stat"><span>Gol + Asist</span><strong>${p.contribution}</strong></div>
      <div class="stat"><span>Etki Skoru</span><strong>${p.impactScore}</strong></div>
      <div class="stat"><span>Değer Skoru</span><strong>${p.valueScore}</strong></div>
    </div>
    <section class="modal-section"><h3>Kariyer özeti</h3><p>${p.profile || p.story}</p></section>
    <section class="modal-section"><h3>Kulüp geçmişi</h3>
      <div class="career-list">${(p.career||[p.team]).map(c=>`<span class="career-chip">${c}</span>`).join("")}</div>
    </section>
    <section class="modal-section"><h3>Güçlü yönler</h3>
      <div class="strength-list">${(p.strengths||["Etki","Form","Katkı"]).map(s=>`<span>${s}</span>`).join("")}</div>
    </section>
    <section class="modal-section"><h3>Değer yorumu</h3><p>${p.story}</p></section>`;
  playerModal.hidden = false;
  modalClose.focus();
}
function closePlayerModal() { playerModal.hidden = true; }

// ── KARŞILAŞTIRMA ─────────────────────────────────────────────
function fillCompareOptions() {
  const opts = enrichedPlayers.map(p=>`<option value="${p.name}">${p.name} — ${p.team}</option>`).join("");
  playerA.innerHTML = opts; playerB.innerHTML = opts;
  playerA.value = topBy("impactScore").name; playerB.value = topBy("valueScore").name;
}
function sl(label, l, r, suf="") {
  return `<div class="duel-row"><span>${label}</span><strong>
    <span class="${l>r?"winner":""}">${l}${suf}</span>/<span class="${r>l?"winner":""}">${r}${suf}</span>
  </strong></div>`;
}
function renderComparison() {
  const l = enrichedPlayers.find(p=>p.name===playerA.value);
  const r = enrichedPlayers.find(p=>p.name===playerB.value);
  if (!l||!r) return;
  const w = l.valueScore===r.valueScore ? "Bu eşleşme berabereye çok yakın."
    : l.valueScore>r.valueScore ? `${l.name} değerine göre daha fazla etki üretiyor.`
    : `${r.name} değerine göre daha fazla etki üretiyor.`;
  comparison.innerHTML = `
    <article class="duel-card"><h3>${l.name}</h3>
      ${sl("Gol",l.goals,r.goals)}${sl("Asist",l.assists,r.assists)}
      ${sl("Etki skoru",l.impactScore,r.impactScore)}${sl("Değer skoru",l.valueScore,r.valueScore)}${sl("Form",l.form,r.form)}
    </article>
    <article class="duel-card"><h3>${r.name}</h3>
      <div class="duel-row"><span>Piyasa değeri</span><strong>${formatValue(l.marketValue)} / ${formatValue(r.marketValue)} €</strong></div>
      <div class="duel-row"><span>Dakika</span><strong>${l.minutes} / ${r.minutes}</strong></div>
      <div class="duel-row"><span>Büyük maç</span><strong>${l.bigMatch} / ${r.bigMatch}</strong></div>
      <div class="duel-row"><span>Scout skoru</span><strong>${l.scoutScore} / ${r.scoutScore}</strong></div>
    </article>
    <div class="insight">${w}</div>`;
}

// ── ANKET ─────────────────────────────────────────────────────
function renderPoll() {
  const poll = polls[0];
  const voted = localStorage.getItem(poll.id);
  const counts = JSON.parse(localStorage.getItem(poll.id+"_counts")||"null") ||
    Object.fromEntries(poll.candidates.map(c=>[c.name,0]));
  pollBadge.textContent = voted ? "Oy verildi ✓" : "Oy ver";
  const total = Object.values(counts).reduce((s,v)=>s+v,0);
  pollOptions.innerHTML = poll.candidates.map(c => {
    const pct = total>0 ? Math.round((counts[c.name]/total)*100) : 0;
    return `<button class="poll-option ${voted?(voted===c.name?"voted":""):""}"
      data-candidate="${c.name}" type="button" ${voted?"disabled":""}>
      <div class="poll-bar" style="width:${voted?pct:0}%"></div>
      <div class="poll-name">${c.name}</div>
      <div class="poll-team">${c.team}</div>
      <div class="poll-pct ${voted?"visible":""}">%${pct}</div>
    </button>`;
  }).join("");
  pollNote.textContent = voted ? `Toplam ${total} oy kullanıldı.` : "Oyunuzu kullanın, sonuçları görün.";
  if (!voted) {
    pollOptions.addEventListener("click", e => {
      const b = e.target.closest(".poll-option");
      if (!b) return;
      counts[b.dataset.candidate] = (counts[b.dataset.candidate]||0)+1;
      localStorage.setItem(poll.id, b.dataset.candidate);
      localStorage.setItem(poll.id+"_counts", JSON.stringify(counts));
      renderPoll();
    }, { once:true });
  }
}

// ── TAHMİN OYUNU ──────────────────────────────────────────────
function renderMatchPredictions() {
  const savedScore = parseInt(localStorage.getItem("predict_total_score")||"0");
  userTotalScore.textContent = savedScore;
  const submitted = localStorage.getItem("predict_submitted")==="true";
  matchCards.innerHTML = matchFixtures.map((m,i) => {
    const sh=localStorage.getItem(`pred_h_${i}`)||"", sa=localStorage.getItem(`pred_a_${i}`)||"";
    let cls="", label="";
    if (submitted && sh!==""&&sa!=="") {
      const ph=parseInt(sh), pa=parseInt(sa);
      if (ph===m.actualHome&&pa===m.actualAway) { cls="correct"; label="✅ Tam isabet! +3 puan"; }
      else if ((ph>pa)===(m.actualHome>m.actualAway)&&(ph===pa)===(m.actualHome===m.actualAway)) { cls="partial"; label="🟡 Doğru sonuç! +1 puan"; }
      else { cls="wrong"; label=`❌ Yanlış. Gerçek: ${m.actualHome}–${m.actualAway}`; }
    }
    return `<div class="match-card ${cls}">
      <div class="match-teams"><div class="match-team">${m.home}</div><div class="match-vs">VS</div><div class="match-team">${m.away}</div></div>
      <div class="match-inputs">
        <input type="number" min="0" max="20" placeholder="0" id="pred_h_${i}" value="${sh}" ${submitted?"disabled":""}>
        <div class="match-sep">—</div>
        <input type="number" min="0" max="20" placeholder="0" id="pred_a_${i}" value="${sa}" ${submitted?"disabled":""}>
      </div>
      <div class="match-result-label">${label}</div>
    </div>`;
  }).join("");
  if (submitted) {
    submitPredictions.disabled=true;
    submitPredictions.textContent="Tahminler gönderildi ✓";
    predictResult.hidden=false;
    predictResult.innerHTML=`<h3>🏆 Toplam Puanın: ${savedScore}</h3><p>Tebrikler! Yeni haftada tekrar dene.</p>`;
  }
}
submitPredictions.addEventListener("click", () => {
  let total=0;
  matchFixtures.forEach((m,i)=>{
    const h=document.querySelector(`#pred_h_${i}`)?.value;
    const a=document.querySelector(`#pred_a_${i}`)?.value;
    if (h===""||a==="") return;
    localStorage.setItem(`pred_h_${i}`,h); localStorage.setItem(`pred_a_${i}`,a);
    const ph=parseInt(h), pa=parseInt(a);
    if (ph===m.actualHome&&pa===m.actualAway) total+=3;
    else if ((ph>pa)===(m.actualHome>m.actualAway)&&(ph===pa)===(m.actualHome===m.actualAway)) total+=1;
  });
  const prev=parseInt(localStorage.getItem("predict_total_score")||"0");
  localStorage.setItem("predict_total_score",prev+total);
  localStorage.setItem("predict_submitted","true");
  userTotalScore.textContent=prev+total;
  renderMatchPredictions();
});
resetPredictions.addEventListener("click", () => {
  matchFixtures.forEach((_,i)=>{ localStorage.removeItem(`pred_h_${i}`); localStorage.removeItem(`pred_a_${i}`); });
  localStorage.removeItem("predict_submitted");
  submitPredictions.disabled=false;
  submitPredictions.textContent="Tahminleri Gönder";
  predictResult.hidden=true;
  renderMatchPredictions();
});

// ── TAKM FİLTRE DOLDUR ───────────────────────────────────────
function fillTeamFilter() {
  const teams = [...new Set(enrichedPlayers.map(p=>p.team))].sort();
  teamFilter.innerHTML = `<option value="all">Tüm takımlar</option>` +
    teams.map(t=>`<option value="${t}">${t}</option>`).join("");
}

// ── NAV HAMBURGER ─────────────────────────────────────────────
navHamburger.addEventListener("click", (e) => {
  e.stopPropagation();
  const isOpen = !navMobileMenu.hidden;
  navMobileMenu.hidden = isOpen;
  navHamburger.setAttribute("aria-expanded", String(!isOpen));
});

// Menü dışına tıklayınca kapat
document.addEventListener("click", (e) => {
  if (!navMobileMenu.hidden && !e.target.closest(".navbar")) {
    navMobileMenu.hidden = true;
    navHamburger.setAttribute("aria-expanded", "false");
  }
});

// Link tıklandığında kapat
navMobileMenu.querySelectorAll(".nav-link").forEach(link => {
  link.addEventListener("click", () => {
    navMobileMenu.hidden = true;
    navHamburger.setAttribute("aria-expanded", "false");
  });
});

// ── EVENT LISTENERS ───────────────────────────────────────────
searchInput.addEventListener("input", e => { state.search=e.target.value; renderPlayers(); });
positionFilter.addEventListener("change", e => { state.position=e.target.value; renderPlayers(); });
teamFilter.addEventListener("change", e => { state.team=e.target.value; renderPlayers(); });
sortMode.addEventListener("change", e => { state.sort=e.target.value; renderPlayers(); });
budgetOnly.addEventListener("change", e => { state.budgetOnly=e.target.checked; renderPlayers(); });
playerA.addEventListener("change", renderComparison);
playerB.addEventListener("change", renderComparison);
squadTeamSelect.addEventListener("change", renderSquad);

playerGrid.addEventListener("click", e => { const c=e.target.closest(".player-card"); if(c) openPlayerModal(c.dataset.player); });
playerGrid.addEventListener("keydown", e => {
  if (e.key!=="Enter"&&e.key!==" ") return;
  const c=e.target.closest(".player-card"); if(!c) return;
  e.preventDefault(); openPlayerModal(c.dataset.player);
});
modalClose.addEventListener("click", closePlayerModal);
playerModal.addEventListener("click", e=>{ if(e.target===playerModal) closePlayerModal(); });
document.addEventListener("keydown", e=>{ if(e.key==="Escape"&&!playerModal.hidden) closePlayerModal(); });
swapButton.addEventListener("click", ()=>{ const o=playerA.value; playerA.value=playerB.value; playerB.value=o; renderComparison(); });

// ── INIT ──────────────────────────────────────────────────────
fillTeamFilter();
fillCompareOptions();
renderThemes();
renderSquadTeams();
renderSummary();
renderBoards();
renderStandings();
renderAwards();
renderPlayers();
renderComparison();
renderPoll();
renderMatchPredictions();
