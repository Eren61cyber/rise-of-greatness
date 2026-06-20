// ================================================================
// SÜPER LİG ATLASI — app.js  |  2025-26 Sezonu
// ================================================================

// ── OYUNCU VERİSİ ─────────────────────────────────────────────
const players = [
  // ===== GALATASARAY =====
  { name:"Ugurcan Cakir",      team:"Galatasaray",  position:"Kaleci",    age:31, marketValue:18, goals:0,  assists:0,  minutes:3230, bigMatch:92, form:91, story:"20 gol yememe ile şampiyonluğun mimarı. Sezonun kalecisi ödülünü zirvede tamamladı.", career:["1461 Trabzon","Trabzonspor","Galatasaray"], strengths:["Kurtarış","Liderlik","Büyük maç"] },
  { name:"Baris Alper Yilmaz", team:"Galatasaray",  position:"Kanat",     age:25, marketValue:30, goals:16, assists:12, minutes:2900, bigMatch:92, form:95, story:"16 gol 12 asist ile sezonun tartışmasız en iyisi. Büyük maçlarda defalarca fark yarattı.", career:["Altay","Galatasaray"], strengths:["Hız","Gol","Asist"] },
  { name:"Gabriel Sara",       team:"Galatasaray",  position:"Orta saha", age:27, marketValue:32, goals:8,  assists:14, minutes:2850, bigMatch:88, form:91, story:"14 asist ile asist krallığına oynayan yaratıcı orta saha, Galatasaray'ın oyun kurma merkezi.", career:["Gremio","Norwich","Galatasaray"], strengths:["Pas kalitesi","Yaratıcılık","Top taşıma"] },
  { name:"Artem Dovbyk",       team:"Galatasaray",  position:"Forvet",    age:28, marketValue:45, goals:18, assists:6,  minutes:2600, bigMatch:87, form:88, story:"Roma'dan transfer edilen Ukrayna golcüsü Galatasaray için sezonun en etkili transferi oldu.", career:["Dnipro","Girona","Roma","Galatasaray"], strengths:["Bitiricilik","Hava topu","Büyük maç"] },
  { name:"Leroy Sane",         team:"Galatasaray",  position:"Kanat",     age:30, marketValue:28, goals:10, assists:9,  minutes:2400, bigMatch:86, form:87, story:"Bayern sonrası tam sezonunu oynayan Sane, büyük maçlarda imzasını attı ve şampiyonluğa katkı sağladı.", career:["Schalke","Man City","Bayern","Galatasaray"], strengths:["Hız","Teknik","Gol"] },
  { name:"Lucas Torreira",     team:"Galatasaray",  position:"Orta saha", age:30, marketValue:14, goals:3,  assists:7,  minutes:2700, bigMatch:87, form:88, story:"Galatasaray'ın savunma ve hücum dengesini kuran yorulmaz motor. Şampiyonluğun görünmez mimarı.", career:["Sampdoria","Arsenal","Atletico","Fiorentina","Galatasaray"], strengths:["Savunma","Pas","Istikrar"] },

  // ===== FENERBAHÇE =====
  { name:"Dorgeles Nene",      team:"Fenerbahce",   position:"Kanat",     age:24, marketValue:30, goals:13, assists:16, minutes:2700, bigMatch:90, form:92, story:"16 asist ile sezonun asist krallığı. Hız, vizyon ve son pas kalitesiyle Fenerbahçe'nin parlayan yıldızı.", career:["Salzburg","Westerlo","Fenerbahce"], strengths:["Asist","Hız","Bire bir"] },
  { name:"Talisca",            team:"Fenerbahce",   position:"Orta saha", age:33, marketValue:11, goals:17, assists:5,  minutes:2200, bigMatch:89, form:87, story:"Her büyük maçta parmak izi bırakan Talisca, Fenerbahçe'nin gol silahı olmaya devam etti.", career:["Bahia","Benfica","Besiktas","Guangzhou","Al Nassr","Fenerbahce"], strengths:["Şut","Duran top","Büyük maç"] },
  { name:"Edson Alvarez",      team:"Fenerbahce",   position:"Orta saha", age:29, marketValue:32, goals:4,  assists:8,  minutes:2900, bigMatch:86, form:88, story:"Fenerbahçe'nin orta sahasının güvenlik kilidi. Top kapma ve hücum başlatma kalitesiyle fark yarattı.", career:["Club America","Ajax","West Ham","Fenerbahce"], strengths:["Top kapma","Savunma","Fizik"] },
  { name:"Caglar Soyuncu",     team:"Fenerbahce",   position:"Defans",    age:30, marketValue:16, goals:2,  assists:3,  minutes:2800, bigMatch:84, form:86, story:"Fenerbahçe savunma blokunu organize eden lider stoper, büyük maçlarda güvenilir kale bekçisi.", career:["Altinordu","Freiburg","Leicester","Atletico Madrid","Fenerbahce"], strengths:["Hava topu","Liderlik","Topla çıkış"] },
  { name:"Kerem Akturkoglu",   team:"Fenerbahce",   position:"Kanat",     age:27, marketValue:26, goals:11, assists:7,  minutes:2500, bigMatch:85, form:86, story:"Galatasaray'dan transferi şok yarattı. Fenerbahçe formasıyla eleştirenlere cevabı sahada verdi.", career:["Altinordu","Giresunspor","Galatasaray","Fenerbahce"], strengths:["Hız","Dribbling","Gol"] },
  { name:"Marco Asensio",      team:"Fenerbahce",   position:"Orta saha", age:31, marketValue:15, goals:9,  assists:10, minutes:2100, bigMatch:84, form:85, story:"Hem gol hem asist üretme kapasitesiyle Fenerbahçe'nin hücum çeşitliliğine zenginlik katan Madridli teknik.", career:["Mallorca","Real Madrid","PSG","Aston Villa","Fenerbahce"], strengths:["Şut","Pas kalitesi","Tecrübe"] },

  // ===== BEŞİKTAŞ =====
  { name:"Orkun Kokcu",        team:"Besiktas",     position:"Orta saha", age:26, marketValue:34, goals:9,  assists:12, minutes:2600, bigMatch:88, form:90, story:"Benfica'dan kalıcı transferi gerçekleşti. Sezona damga vuran performansıyla Beşiktaş'ın orta saha yıldızı.", career:["Feyenoord","Benfica","Besiktas"], strengths:["Pas","Vizyon","Gol"] },
  { name:"Tammy Abraham",      team:"Besiktas",     position:"Forvet",    age:29, marketValue:24, goals:15, assists:5,  minutes:2500, bigMatch:86, form:87, story:"Fiziksel güç ve ceza sahası etkisiyle Beşiktaş'ın santrfor çözümü. Premier Lig formunu Türkiye'ye taşıdı.", career:["Chelsea","Aston Villa","Leeds","Roma","Besiktas"], strengths:["Fizik","Ceza sahası","Hava topu"] },
  { name:"Rafa Silva",         team:"Besiktas",     position:"Orta saha", age:33, marketValue:7,  goals:8,  assists:9,  minutes:2200, bigMatch:83, form:84, story:"Dar alanlarda top kaybetmeyen teknik zeka. Beşiktaş hücumunu her an aktive edebilen yaratıcı profil.", career:["Estoril","Braga","Benfica","Besiktas"], strengths:["Teknik","Yaratıcılık","Son pas"] },
  { name:"Wilfred Ndidi",      team:"Besiktas",     position:"Orta saha", age:30, marketValue:13, goals:3,  assists:5,  minutes:2700, bigMatch:85, form:86, story:"Leicester City'nin motor oyuncusu Beşiktaş'ta aynı güveni veriyor. Savunma organizasyonunun merkezinde.", career:["Nath. Star","Genk","Leicester","Besiktas"], strengths:["Savunma","Fizik","Istikrar"] },
  { name:"Mert Gunok",         team:"Besiktas",     position:"Kaleci",    age:35, marketValue:4,  goals:0,  assists:0,  minutes:3200, bigMatch:83, form:82, story:"Beşiktaş'ın tecrübeli kaleci duvarı. Büyük maçlarda etkili kurtarışlarıyla takımı sırtlayan kaptan.", career:["Besiktas","Galatasaray","Besiktas"], strengths:["Deneyim","Kurtarış","Liderlik"] },

  // ===== TRABZONSPOR =====
  { name:"Paul Onuachu",       team:"Trabzonspor",  position:"Forvet",    age:32, marketValue:13, goals:24, assists:3,  minutes:2800, bigMatch:93, form:94, story:"24 gol ile gol krallığı! Hava topu hâkimiyeti ve ceza sahası bitiriciliğiyle Süper Lig tarihine geçti.", career:["Midtjylland","Genk","Southampton","Trabzonspor"], strengths:["Hava topları","Bitiricilik","Ceza sahası"] },
  { name:"Felipe Augusto",     team:"Trabzonspor",  position:"Forvet",    age:23, marketValue:6,  goals:14, assists:4,  minutes:2400, bigMatch:87, form:90, story:"23 yaşında ikinci sezonunda çiçek gibi açtı. Gol sayısını ikiye katladı, Avrupa kulüpleri takibe aldı.", career:["Corinthians","Cercle Brugge","Trabzonspor"], strengths:["Potansiyel","Bitiricilik","Hareketlilik"] },
  { name:"Ernest Muci",        team:"Trabzonspor",  position:"Orta saha", age:26, marketValue:12, goals:9,  assists:6,  minutes:2200, bigMatch:89, form:91, story:"Büyük maçlarda sürekli skor üreten Trabzonspor'un hücum dinamosu.", career:["Tirana","Legia Warsaw","Besiktas","Trabzonspor"], strengths:["Büyük maç","Şut","Yaratıcılık"] },
  { name:"Okay Yokuslu",       team:"Trabzonspor",  position:"Orta saha", age:32, marketValue:5,  goals:2,  assists:6,  minutes:2700, bigMatch:83, form:85, story:"Tecrübesi ve savunma katkısıyla Trabzonspor'un orta sahasının dengeleme taşı.", career:["Trabzonspor","Celta Vigo","WBA","Crystal Palace","Trabzonspor"], strengths:["Savunma","Tecrübe","Pas"] },

  // ===== BAŞAKŞEHİR =====
  { name:"Eldor Shomurodov",   team:"Basaksehir",   position:"Forvet",    age:32, marketValue:7,  goals:18, assists:6,  minutes:2550, bigMatch:87, form:88, story:"Başakşehir'in vazgeçilmez golcüsü. Üçüncü sezonunda da gol listesinin üst sıralarında kaldı.", career:["Bunyodkor","Rostov","Genoa","Roma","Basaksehir"], strengths:["Skor sezgisi","Koşular","Fizik"] },
  { name:"Muhammed Sengezer",  team:"Basaksehir",   position:"Kaleci",    age:30, marketValue:3,  goals:0,  assists:0,  minutes:3100, bigMatch:85, form:89, story:"Başakşehir'in savunma örneğinin merkezinde. Clean sheet oranıyla sezonun değerli kalecileri arasında.", career:["Bursaspor","Basaksehir","Adana Demirspor","Basaksehir"], strengths:["Refleks","Istikrar","Pozisyon"] },
  { name:"Berkay Ozcan",       team:"Basaksehir",   position:"Orta saha", age:28, marketValue:6,  goals:5,  assists:10, minutes:2600, bigMatch:83, form:85, story:"Eyüpspor'dan transfer edilen Berkay, Başakşehir'de hemen adaptasyonu sağladı ve asist listesine girdi.", career:["Stuttgart","Greuther Furth","Bochum","Eyupspor","Basaksehir"], strengths:["Asist","Pas kalitesi","Vizyon"] },

  // ===== GÖZTEPE =====
  { name:"Mateusz Lis",        team:"Goztepe",      position:"Kaleci",    age:30, marketValue:3,  goals:0,  assists:0,  minutes:3200, bigMatch:87, form:90, story:"Clean sheet rekoruna yaklaşan Lis, küçük bütçeli takımın en büyük silahı. Değer/katkı modelinin logosu.", career:["Lech Poznan","Southampton","Troyes","Goztepe"], strengths:["Refleks","Clean sheet","Büyük maç"] },
  { name:"Juan",               team:"Goztepe",      position:"Kanat",     age:24, marketValue:4,  goals:12, assists:4,  minutes:2200, bigMatch:82, form:86, story:"İkinci sezonunda daha da iyileşti. Değerinin üzerindeki etki scoruyla uluslararası radarların gözdesi.", career:["Gremio","Santos","Goztepe"], strengths:["Bitiricilik","Hız","Skor sezgisi"] },
  { name:"Tunay Torun",        team:"Goztepe",      position:"Kanat",     age:33, marketValue:2,  goals:5,  assists:7,  minutes:2000, bigMatch:79, form:81, story:"Tecrübeli Türk-Alman kanat oyuncusu Göztepe'de liderlik yapıyor. Deneyimiyle genç takıma yön veriyor.", career:["Galatasaray","Schalke","Hamburger SV","Goztepe"], strengths:["Deneyim","Pas","Liderlik"] },

  // ===== SAMSUNSPOR =====
  { name:"Okan Kocuk",         team:"Samsunspor",   position:"Kaleci",    age:26, marketValue:3,  goals:0,  assists:0,  minutes:3300, bigMatch:84, form:85, story:"Samsunspor'un genç kalecisi üst lig hedeflerine doğru büyüyor. Net kurtarış oranında ligin en üstünde.", career:["Besiktas","Samsunspor"], strengths:["Kurtarış","Büyük maç","Genç profil"] },
  { name:"Ivohas Seka",        team:"Samsunspor",   position:"Forvet",    age:27, marketValue:5,  goals:14, assists:5,  minutes:2300, bigMatch:81, form:85, story:"14 gol ile kariyer rekoru. Güine'li golcü Samsunspor'da tuttuğu forma ile günden güne değerleniyor.", career:["Guimaraes","Samsunspor"], strengths:["Bitiricilik","Fizik","Patlama"] },
  { name:"Halil Dervisoglu",   team:"Samsunspor",   position:"Forvet",    age:26, marketValue:4,  goals:8,  assists:5,  minutes:1900, bigMatch:79, form:82, story:"Brentford geçmişiyle Samsunspor'a katkı sağlayan Türk-Hollandalı oyuncu. Sezonun ikinci yarısında patladı.", career:["Brentford","Galatasaray","Twente","Samsunspor"], strengths:["Hız","Kıvraklık","Büyük maç"] },

  // ===== RİZESPOR =====
  { name:"Yahia Fofana",       team:"Rizespor",     position:"Kaleci",    age:31, marketValue:2.5,goals:0,  assists:0,  minutes:3200, bigMatch:84, form:85, story:"Rizespor'un kurtarıcısı. Büyük maçlarda öne çıkan kurtarışlarıyla takımını defalarca sırtladı.", career:["Angers","Rizespor"], strengths:["Deneyim","Kurtarış","Clean sheet"] },
  { name:"Clinton Njie",       team:"Rizespor",     position:"Kanat",     age:32, marketValue:1.8,goals:8,  assists:5,  minutes:2100, bigMatch:78, form:80, story:"Eski Tottenham oyuncusu, Rizespor'da deneyimiyle kanat hattına kalite katıyor.", career:["Lyon","Marseille","Tottenham","Fenerbahce","Rizespor"], strengths:["Hız","Teknik","Tecrübe"] },

  // ===== KONYASPOR =====
  { name:"Olarenwaju Kayode",  team:"Konyaspor",    position:"Forvet",    age:32, marketValue:2,  goals:9,  assists:3,  minutes:2100, bigMatch:78, form:79, story:"Deneyimli golcü bu sezonda da Konyaspor'un skor yükünü taşıdı. Değerine göre iş biten profil.", career:["Austria Vienna","Shakhtar","Basaksehir","Konyaspor"], strengths:["Bitiricilik","Tecrübe","Pozisyon"] },
  { name:"Soner Aydogdu",      team:"Konyaspor",    position:"Orta saha", age:29, marketValue:1.8,goals:5,  assists:8,  minutes:2500, bigMatch:77, form:81, story:"Konyaspor'un yaratıcı kalbi. Düşük değerine rağmen asist katkısıyla küme düşmeyi önlemenin baş aktörü.", career:["Konyaspor"], strengths:["Asist","Pas","Organizasyon"] },

  // ===== KOCAELİSPOR =====
  { name:"Aleksandar Jovanovic",team:"Kocaelispor", position:"Kaleci",    age:29, marketValue:2,  goals:0,  assists:0,  minutes:3100, bigMatch:82, form:83, story:"Sırp kaleci Kocaelispor'un ligde kalma mücadelesindeki en güvenilir ismi. Clean sheet listesinde.", career:["Vojvodina","Kocaelispor"], strengths:["Refleks","Istikrar","Hava topu"] },
  { name:"Yusuf Erdogan",      team:"Kocaelispor",  position:"Orta saha", age:27, marketValue:2.5,goals:6,  assists:8,  minutes:2600, bigMatch:79, form:82, story:"Kocaelispor'un kaptan kolluğunu hak eden performans. Asist sayısıyla takımın en değerli kozu.", career:["Kocaelispor"], strengths:["Asist","Liderlik","Dayanıklılık"] },

  // ===== ALANYASPOR =====
  { name:"Efkan Bektas",       team:"Alanyaspor",   position:"Forvet",    age:23, marketValue:8,  goals:13, assists:4,  minutes:2200, bigMatch:82, form:86, story:"Sezonun genç yeteneği ödülü. 23 yaşında 13 gol üretti. Avrupa ekipleri kapıda bekliyor.", career:["Alanyaspor"], strengths:["Bitiricilik","Potansiyel","Hız"] },
  { name:"Ertugrul Taskiran",  team:"Alanyaspor",   position:"Kaleci",    age:27, marketValue:4,  goals:0,  assists:0,  minutes:3400, bigMatch:85, form:88, story:"Alanyaspor'un genç kalecisi ikinci sezonunda daha da büyüdü. Clean sheet oranıyla en iyilerden biri.", career:["Alanyaspor"], strengths:["Refleks","Büyük maç","Genç profil"] },
  { name:"Yunus Emre Erdogan", team:"Alanyaspor",   position:"Orta saha", age:25, marketValue:5,  goals:7,  assists:9,  minutes:2500, bigMatch:81, form:84, story:"Alanyaspor'un yaratıcı beyin. Hem gol hem asist üretiminde büyük adımlar attı, milli takım kapısına dayandı.", career:["Alanyaspor"], strengths:["Yaratıcılık","Asist","Potansiyel"] },

  // ===== GAZİANTEP FK =====
  { name:"Mohamed Bayo",       team:"Gaziantep FK", position:"Forvet",    age:29, marketValue:5,  goals:14, assists:4,  minutes:2300, bigMatch:84, form:87, story:"Üçüncü sezonunda zirvesine çıkıyor. 14 gol ve güçlü istikrarla küçük takımda büyük etki.", career:["Clermont","Lille","Le Havre","Watford","Gaziantep FK"], strengths:["Bitiricilik","Pozisyon alma","Istikrar"] },
  { name:"Ruslan Malinovskyi", team:"Gaziantep FK", position:"Orta saha", age:33, marketValue:7,  goals:8,  assists:10, minutes:2400, bigMatch:84, form:86, story:"Atalanta tecrübesinin meyvelerini Süper Lig'de veriyor. Uzak şut ve asist kalitesiyle Gaziantep'in lideri.", career:["Shakhtar","Genk","Atalanta","Marseille","Gaziantep FK"], strengths:["Uzak şut","Asist","Liderlik"] },

  // ===== KASIMPAŞA =====
  { name:"Andreas Gianniotis", team:"Kasimpasa",    position:"Kaleci",    age:33, marketValue:1.2,goals:0,  assists:0,  minutes:3200, bigMatch:82, form:81, story:"Deneyimiyle Kasımpaşa'nın göbeğine oturmuş kaleci. Büyük maçlarda sergilediği performans takımını ayakta tutuyor.", career:["Panathinaikos","Kasimpasa"], strengths:["Deneyim","Kurtarış","Liderlik"] },
  { name:"Mostafa Mohamed",    team:"Kasimpasa",    position:"Forvet",    age:28, marketValue:6,  goals:11, assists:3,  minutes:2200, bigMatch:80, form:82, story:"Mısır milli takımının yıldız golcüsü Türkiye Süper Ligi'nde kendini kanıtlamaya devam ediyor.", career:["Zamalek","Nantes","Galatasaray","Kasimpasa"], strengths:["Bitiricilik","Hava topu","Skor sezgisi"] },

  // ===== GENÇLERBİRLİĞİ =====
  { name:"Emre Mor",           team:"Genclerbirligi",position:"Kanat",    age:28, marketValue:3,  goals:7,  assists:8,  minutes:1900, bigMatch:80, form:82, story:"Dortmund geçmişiyle gelen, hız ve tekniğiyle Gençlerbirliği'nin en tehlikeli hücum silahı.", career:["Nordsjaelland","Dortmund","Celta Vigo","Galatasaray","Genclerbirligi"], strengths:["Hız","Dribbling","Yaratıcılık"] },
  { name:"Emre Akbaba",        team:"Genclerbirligi",position:"Orta saha",age:33, marketValue:2,  goals:5,  assists:8,  minutes:2200, bigMatch:79, form:80, story:"Galatasaray ve Trabzonspor tecrübesiyle Gençlerbirliği'ne liderlik getiren milli orta saha.", career:["Elazigspor","Galatasaray","Trabzonspor","Genclerbirligi"], strengths:["Tecrübe","Asist","Liderlik"] },

  // ===== EYÜPSPOR =====
  { name:"Bertug Yildirim",    team:"Eyupspor",     position:"Forvet",    age:24, marketValue:6,  goals:11, assists:4,  minutes:2300, bigMatch:79, form:82, story:"Eyüpspor'un genç hücumcusu; gol sayısıyla değerinin üzerinde etki üreten scout radarı profili.", career:["Eyupspor"], strengths:["Bitiricilik","Potansiyel","Hız"] },
  { name:"Emre Demir",         team:"Eyupspor",     position:"Kanat",     age:22, marketValue:8,  goals:6,  assists:9,  minutes:2100, bigMatch:82, form:85, story:"Barça akademisinden gelen genç Türk yıldız Eyüpspor'da sezona damga vurdu. Hız ve tekniğiyle büyülüyor.", career:["Altinordu","Barcelona B","Girona","Eyupspor"], strengths:["Hız","Dribbling","Potansiyel"] },

  // ===== ANTALYASPOR =====
  { name:"Oguzhan Ozyakup",    team:"Antalyaspor",  position:"Orta saha", age:34, marketValue:2,  goals:3,  assists:6,  minutes:2300, bigMatch:78, form:78, story:"Arsenal geçmişli tecrübeli orta saha, Antalya'da küme düşme savaşında liderlik yapıyor.", career:["Besiktas","Arsenal","Besiktas","Antalyaspor"], strengths:["Pas","Tecrübe","Liderlik"] },
  { name:"Gael Kakuta",        team:"Antalyaspor",  position:"Kanat",     age:34, marketValue:1.5,goals:5,  assists:4,  minutes:1900, bigMatch:74, form:75, story:"Chelsea altyapısının gözdesi olan Fransız, kariyerinin son durağında Antalya'da çabalıyor.", career:["Chelsea","Lazio","Lens","Antalyaspor"], strengths:["Teknik","Tecrübe","Hız"] },

  // ===== KAYSERİSPOR =====
  { name:"Bilal Bayazit",      team:"Kayserispor",  position:"Kaleci",    age:28, marketValue:2.5,goals:0,  assists:0,  minutes:3200, bigMatch:80, form:81, story:"Küme düşme mücadelesi veren Kayserispor'da en tutarlı isim. Kurtarış oranıyla değer yaratıyor.", career:["Kayserispor"], strengths:["Refleks","Istikrar","Clean sheet"] },
  { name:"Kouadio Kone",       team:"Kayserispor",  position:"Orta saha", age:25, marketValue:5,  goals:5,  assists:6,  minutes:2100, bigMatch:79, form:80, story:"Borussia Mönchengladbach tecrübesiyle Kayserispor'da liderlik eden fiziksel ve teknik orta saha.", career:["Toulouse","Borussia Monchengladbach","Kayserispor"], strengths:["Fizik","Savunma","Pas"] },

  // ===== KARAGÜMRÜK =====
  { name:"Ivo Grbic",          team:"Karagumruk",   position:"Kaleci",    age:30, marketValue:3,  goals:0,  assists:0,  minutes:2800, bigMatch:83, form:82, story:"Atletico Madrid geçmişiyle Karagümrük'te küme düşme mücadelesi veren en değerli oyuncu.", career:["Atletico Madrid","Lille","Fatih Karagumruk"], strengths:["Kurtarış","Büyük maç","Deneyim"] },
  { name:"Kenan Karaman",      team:"Karagumruk",   position:"Forvet",    age:32, marketValue:4,  goals:8,  assists:5,  minutes:2100, bigMatch:79, form:80, story:"Bundesliga tecrübeli Türk forvet. Düşük bütçeli takımda hem gol hem asistini dengeleyen değerli profil.", career:["Hannover","Dusseldorf","Besiktas","Fatih Karagumruk"], strengths:["Gol","Asist","Deneyim"] }
];

// ── TAKIM TEMELERİ ─────────────────────────────────────────────
const teamThemes = [
  { name:"Lig teması",      primary:"#22c76e", secondary:"#f0a830", accent:"#e8604a", dark:"#0c1410" },
  { name:"Galatasaray",     primary:"#a90432", secondary:"#f4b000", accent:"#ff6a13", dark:"#18070c" },
  { name:"Fenerbahce",      primary:"#003f8f", secondary:"#ffd200", accent:"#ffffff", dark:"#07172f" },
  { name:"Besiktas",        primary:"#111111", secondary:"#ffffff", accent:"#d71920", dark:"#050505" },
  { name:"Trabzonspor",     primary:"#7a263a", secondary:"#5bb6d6", accent:"#f1d2dc", dark:"#160b12" },
  { name:"Basaksehir",      primary:"#f47b20", secondary:"#173b7a", accent:"#ffffff", dark:"#1f1308" },
  { name:"Goztepe",         primary:"#d71920", secondary:"#f8d000", accent:"#111111", dark:"#190908" },
  { name:"Samsunspor",      primary:"#d71920", secondary:"#ffffff", accent:"#111111", dark:"#190909" },
  { name:"Rizespor",        primary:"#007a3d", secondary:"#0b69b3", accent:"#ffffff", dark:"#06141a" },
  { name:"Konyaspor",       primary:"#159447", secondary:"#ffffff", accent:"#d71920", dark:"#07170e" },
  { name:"Kocaelispor",     primary:"#138a44", secondary:"#111111", accent:"#ffffff", dark:"#07150d" },
  { name:"Alanyaspor",      primary:"#f47b20", secondary:"#16823a", accent:"#ffffff", dark:"#1d1208" },
  { name:"Gaziantep FK",    primary:"#d71920", secondary:"#111111", accent:"#ffffff", dark:"#180807" },
  { name:"Kasimpasa",       primary:"#174a9c", secondary:"#ffffff", accent:"#2bb3e7", dark:"#071326" },
  { name:"Genclerbirligi",  primary:"#d71920", secondary:"#111111", accent:"#ffffff", dark:"#170708" },
  { name:"Eyupspor",        primary:"#5b2c83", secondary:"#f2c14e", accent:"#ffffff", dark:"#160d1f" },
  { name:"Antalyaspor",     primary:"#d71920", secondary:"#ffffff", accent:"#111111", dark:"#180807" },
  { name:"Kayserispor",     primary:"#d71920", secondary:"#ffd200", accent:"#111111", dark:"#1a0d07" },
  { name:"Karagumruk",      primary:"#d71920", secondary:"#111111", accent:"#ffffff", dark:"#190707" }
];

// ── KADROLAR ──────────────────────────────────────────────────
const teamSquads = {
  Galatasaray:    [ {name:"Ugurcan Cakir",       position:"Kaleci",    note:"Sezonun Kalecisi 🧤 · 20 CS"}, {name:"Wilfried Singo",     position:"Defans",    note:"Sağ bek"}, {name:"Abdulkerim Bardakci",position:"Defans",    note:"Stoper"}, {name:"Lucas Torreira",     position:"Orta saha", note:"Ön libero"}, {name:"Gabriel Sara",       position:"Orta saha", note:"14 asist"}, {name:"Baris Alper Yilmaz",position:"Kanat",     note:"Sezonun Oyuncusu ⭐ 16G 12A"}, {name:"Leroy Sane",         position:"Kanat",     note:"10 gol"}, {name:"Artem Dovbyk",       position:"Forvet",    note:"18 gol"} ],
  Fenerbahce:     [ {name:"Ederson",             position:"Kaleci",    note:"A Takım"}, {name:"Caglar Soyuncu",      position:"Defans",    note:"Stoper"}, {name:"Milan Skriniar",     position:"Defans",    note:"Stoper"}, {name:"Edson Alvarez",       position:"Orta saha", note:"Ön libero"}, {name:"Marco Asensio",      position:"Orta saha", note:"10 gol 10 asist"}, {name:"Talisca",            position:"Orta saha", note:"17 gol"}, {name:"Dorgeles Nene",      position:"Kanat",     note:"Asist Krallığı 🎯 16A"}, {name:"Kerem Akturkoglu",   position:"Kanat",     note:"11 gol"} ],
  Besiktas:       [ {name:"Mert Gunok",          position:"Kaleci",    note:"Kaptan"}, {name:"Gabriel Paulista",    position:"Defans",    note:"Stoper"}, {name:"Wilfred Ndidi",      position:"Orta saha", note:"Ön libero"}, {name:"Orkun Kokcu",         position:"Orta saha", note:"12 asist"}, {name:"Rafa Silva",         position:"Orta saha", note:"Yaratıcı"}, {name:"Tammy Abraham",      position:"Forvet",    note:"15 gol"} ],
  Trabzonspor:    [ {name:"Paul Onuachu",        position:"Forvet",    note:"Gol Kralı ⚽ 24 gol"}, {name:"Felipe Augusto",     position:"Forvet",    note:"14 gol"}, {name:"Ernest Muci",        position:"Orta saha", note:"Büyük maç ismi"}, {name:"Okay Yokuslu",       position:"Orta saha", note:"Motor oyuncu"} ],
  Basaksehir:     [ {name:"Muhammed Sengezer",   position:"Kaleci",    note:"Clean sheet listesi"}, {name:"Eldor Shomurodov",   position:"Forvet",    note:"18 gol"}, {name:"Berkay Ozcan",       position:"Orta saha", note:"10 asist"} ],
  Goztepe:        [ {name:"Mateusz Lis",         position:"Kaleci",    note:"Clean sheet listesi"}, {name:"Juan",               position:"Kanat",     note:"12 gol"}, {name:"Tunay Torun",        position:"Kanat",     note:"Deneyimli"} ],
  Samsunspor:     [ {name:"Okan Kocuk",          position:"Kaleci",    note:"Net kurtarış lideri"}, {name:"Ivohas Seka",        position:"Forvet",    note:"14 gol"}, {name:"Halil Dervisoglu",   position:"Forvet",    note:"8 gol"} ],
  Rizespor:       [ {name:"Yahia Fofana",        position:"Kaleci",    note:"Clean sheet listesi"}, {name:"Clinton Njie",       position:"Kanat",     note:"Tottenham kökenli"} ],
  Konyaspor:      [ {name:"Olarenwaju Kayode",   position:"Forvet",    note:"9 gol"}, {name:"Soner Aydogdu",      position:"Orta saha", note:"8 asist"} ],
  Kocaelispor:    [ {name:"Aleksandar Jovanovic",position:"Kaleci",    note:"Clean sheet listesi"}, {name:"Yusuf Erdogan",      position:"Orta saha", note:"Kaptan · 8 asist"} ],
  Alanyaspor:     [ {name:"Ertugrul Taskiran",   position:"Kaleci",    note:"Genç kaleci"}, {name:"Efkan Bektas",       position:"Forvet",    note:"Genç Yetenek 🌟 13 gol"}, {name:"Yunus Emre Erdogan", position:"Orta saha", note:"9 asist"} ],
  "Gaziantep FK": [ {name:"Mohamed Bayo",        position:"Forvet",    note:"14 gol"}, {name:"Ruslan Malinovskyi", position:"Orta saha", note:"10 asist"} ],
  Kasimpasa:      [ {name:"Andreas Gianniotis",  position:"Kaleci",    note:"Deneyimli"}, {name:"Mostafa Mohamed",    position:"Forvet",    note:"11 gol"} ],
  Genclerbirligi: [ {name:"Emre Mor",            position:"Kanat",     note:"Dortmund kökenli"}, {name:"Emre Akbaba",        position:"Orta saha", note:"Kaptan"} ],
  Eyupspor:       [ {name:"Bertug Yildirim",     position:"Forvet",    note:"11 gol"}, {name:"Emre Demir",         position:"Kanat",     note:"Barcelona kökenli"} ],
  Antalyaspor:    [ {name:"Oguzhan Ozyakup",     position:"Orta saha", note:"Kaptan"}, {name:"Gael Kakuta",        position:"Kanat",     note:"Chelsea kökenli"} ],
  Kayserispor:    [ {name:"Bilal Bayazit",       position:"Kaleci",    note:"Clean sheet listesi"}, {name:"Kouadio Kone",      position:"Orta saha", note:"Gladbach kökenli"} ],
  Karagumruk:     [ {name:"Ivo Grbic",           position:"Kaleci",    note:"Atletico Madrid kökenli"}, {name:"Kenan Karaman",    position:"Forvet",    note:"8 gol"} ]
};

// ── PUAN DURUMU 2025-26 — Transfermarkt (34. Hafta) ──────────
// Kaynak: transfermarkt.com/super-lig/tabelle/wettbewerb/TR1/saison_id/2025
const standings = [
  { team:"Galatasaray",    o:34, g:24, b:5,  m:5,  ag:77, yg:30, pts:77, badge:"#a90432", zone:"champion"   },
  { team:"Fenerbahce",     o:34, g:21, b:11, m:2,  ag:77, yg:37, pts:74, badge:"#003f8f", zone:"ucl"        },
  { team:"Trabzonspor",    o:34, g:20, b:9,  m:5,  ag:61, yg:39, pts:69, badge:"#7a263a", zone:"uel"        },
  { team:"Besiktas",       o:34, g:17, b:9,  m:8,  ag:59, yg:40, pts:60, badge:"#111111", zone:"uel"        },
  { team:"Basaksehir",     o:34, g:16, b:9,  m:9,  ag:58, yg:35, pts:57, badge:"#f47b20", zone:"uecl"       },
  { team:"Goztepe",        o:34, g:14, b:13, m:7,  ag:42, yg:32, pts:55, badge:"#d71920", zone:""           },
  { team:"Samsunspor",     o:34, g:13, b:12, m:9,  ag:46, yg:45, pts:51, badge:"#d71920", zone:""           },
  { team:"Rizespor",       o:34, g:10, b:11, m:13, ag:46, yg:52, pts:41, badge:"#007a3d", zone:""           },
  { team:"Konyaspor",      o:34, g:10, b:10, m:14, ag:43, yg:50, pts:40, badge:"#159447", zone:""           },
  { team:"Kocaelispor",    o:34, g:9,  b:10, m:15, ag:26, yg:38, pts:37, badge:"#138a44", zone:""           },
  { team:"Alanyaspor",     o:34, g:7,  b:16, m:11, ag:41, yg:41, pts:37, badge:"#f47b20", zone:""           },
  { team:"Gaziantep FK",   o:34, g:9,  b:10, m:15, ag:43, yg:58, pts:37, badge:"#d71920", zone:""           },
  { team:"Kasimpasa",      o:34, g:8,  b:11, m:15, ag:33, yg:49, pts:35, badge:"#174a9c", zone:""           },
  { team:"Genclerbirligi", o:34, g:9,  b:7,  m:18, ag:36, yg:47, pts:34, badge:"#d71920", zone:""           },
  { team:"Eyupspor",       o:34, g:8,  b:9,  m:17, ag:33, yg:48, pts:33, badge:"#5b2c83", zone:""           },
  { team:"Antalyaspor",    o:34, g:8,  b:8,  m:18, ag:33, yg:55, pts:32, badge:"#d71920", zone:"relegation" },
  { team:"Kayserispor",    o:34, g:6,  b:12, m:16, ag:27, yg:62, pts:30, badge:"#d71920", zone:"relegation" },
  { team:"Karagumruk",     o:34, g:8,  b:6,  m:20, ag:31, yg:54, pts:30, badge:"#d71920", zone:"relegation" }
];

// ── SEZON ÖDÜLLERİ 2025-26 ───────────────────────────────────
const seasonAwards = [
  { emoji:"⭐", title:"Sezonun Oyuncusu",      winner:"Barış Alper Yılmaz", team:"Galatasaray",  detail:"16 gol · 12 asist",   note:"Hem gol hem asist listelerinde zirve, büyük maçlarda defalarca fark yaratan performansıyla tartışmasız sezonun en iyisi.", color:"#f0a830" },
  { emoji:"⚽", title:"Gol Kralı",             winner:"Paul Onuachu",       team:"Trabzonspor",  detail:"24 gol",               note:"İkinci kez üst üste gol krallığı! Hava topu hâkimiyeti ve ceza sahası bitiriciliğiyle Süper Lig tarihine geçti.",           color:"#22c76e" },
  { emoji:"🎯", title:"Asist Krallığı",        winner:"Dorgeles Nene",      team:"Fenerbahçe",   detail:"16 asist",             note:"Sezonun en yaratıcı oyuncusu. Hız, vizyon ve son pas kalitesiyle rakip savunmaları paramparça etti.",                       color:"#003f8f" },
  { emoji:"🧤", title:"Sezonun Kalecisi",      winner:"Ugurcan Çakır",      team:"Galatasaray",  detail:"20 gol yememe",        note:"Galatasaray şampiyonluğunun mimarı. Büyük maçlardaki kurtarışlar sezonun fotoğraflarına girdi.",                             color:"#a90432" },
  { emoji:"🌟", title:"Genç Yetenek",          winner:"Efkan Bektaş",       team:"Alanyaspor",   detail:"23 yaş · 13 gol",     note:"Sezonun en büyük sürprizi. Küçük bütçeli takımda devasa performans. Avrupa kulüpleri kapıda.",                              color:"#f47b20" },
  { emoji:"👨‍💼", title:"Sezonun Teknik Dir.", winner:"Okan Buruk",          team:"Galatasaray",  detail:"3. Üst Üste Şampiyonluk", note:"Türk futbol tarihinde bir miras inşa ediyor. 3 yılda 3 şampiyonluk — tartışmasız sezonun en büyük teknik direktörü.",   color:"#22c76e" }
];

// ── ANKET ─────────────────────────────────────────────────────
const polls = [
  { id:"poll_2526_best", question:"Sezonun En İyi Forveti Kim?", candidates:[{name:"Paul Onuachu",team:"Trabzonspor"},{name:"Artem Dovbyk",team:"Galatasaray"},{name:"Tammy Abraham",team:"Besiktas"},{name:"Eldor Shomurodov",team:"Basaksehir"}] },
  { id:"poll_2526_supriz", question:"2025-26 Sezonunun Sürprizi Kim?", candidates:[{name:"Juan",team:"Goztepe"},{name:"Efkan Bektas",team:"Alanyaspor"},{name:"Yusuf Erdogan",team:"Kocaelispor"},{name:"Felipe Augusto",team:"Trabzonspor"}] }
];

// ── TAHMİN OYUNU ──────────────────────────────────────────────
const matchFixtures = [
  { home:"Galatasaray",  away:"Fenerbahce",   actualHome:1, actualAway:1 },
  { home:"Trabzonspor",  away:"Besiktas",     actualHome:2, actualAway:1 },
  { home:"Basaksehir",   away:"Goztepe",      actualHome:2, actualAway:0 },
  { home:"Samsunspor",   away:"Rizespor",     actualHome:1, actualAway:2 },
  { home:"Konyaspor",    away:"Kocaelispor",  actualHome:1, actualAway:0 },
  { home:"Gaziantep FK", away:"Kasimpasa",    actualHome:2, actualAway:1 }
];

// ── MEVKI MODELLERİ ───────────────────────────────────────────
const positionModels = {
  Forvet:       { goal:8.5, assist:4.2, minutes:0.010, bigMatch:0.42, form:0.35, roleBonus:8  },
  Kanat:        { goal:7.0, assist:5.6, minutes:0.011, bigMatch:0.38, form:0.42, roleBonus:10 },
  "Orta saha":  { goal:5.8, assist:6.8, minutes:0.014, bigMatch:0.34, form:0.45, roleBonus:14 },
  Defans:       { goal:4.0, assist:4.4, minutes:0.018, bigMatch:0.48, form:0.38, roleBonus:34 },
  Kaleci:       { goal:0.0, assist:2.0, minutes:0.020, bigMatch:0.62, form:0.58, roleBonus:48 }
};

// ── STATE ─────────────────────────────────────────────────────
const state = { search:"", position:"all", team:"all", sort:"valueScore", budgetOnly:false };

// ── ENRİCHED PLAYERS ──────────────────────────────────────────
const enrichedPlayers = players.map(p => {
  const m = positionModels[p.position] || positionModels["Orta saha"];
  const impactScore   = Math.round(p.goals*m.goal + p.assists*m.assist + p.minutes*m.minutes + p.bigMatch*m.bigMatch + p.form*m.form + m.roleBonus);
  const valueScore    = Math.round((impactScore / Math.max(p.marketValue, 0.35)) * 7);
  const scoutScore    = Math.round(valueScore*0.58 + p.form*0.28 + (28-Math.min(p.age,28))*1.6);
  const surpriseScore = Math.round(valueScore*0.65 + p.bigMatch*0.22 + p.form*0.13);
  return { ...p, impactScore, valueScore, scoutScore, surpriseScore, contribution: p.goals+p.assists };
});

// ── DOM REFS ──────────────────────────────────────────────────
const playerGrid       = document.querySelector("#playerGrid");
const resultCount      = document.querySelector("#resultCount");
const searchInput      = document.querySelector("#searchInput");
const positionFilter   = document.querySelector("#positionFilter");
const teamFilter       = document.querySelector("#teamFilter");
const sortMode         = document.querySelector("#sortMode");
const budgetOnly       = document.querySelector("#budgetOnly");
const playerA          = document.querySelector("#playerA");
const playerB          = document.querySelector("#playerB");
const comparison       = document.querySelector("#comparison");
const swapButton       = document.querySelector("#swapButton");
const valueBoard       = document.querySelector("#valueBoard");
const scoutBoard       = document.querySelector("#scoutBoard");
const themeBar         = document.querySelector("#themeBar");
const activeThemeName  = document.querySelector("#activeThemeName");
const squadTeamSelect  = document.querySelector("#squadTeamSelect");
const squadGrid        = document.querySelector("#squadGrid");
const squadNote        = document.querySelector("#squadNote");
const playerModal      = document.querySelector("#playerModal");
const modalClose       = document.querySelector("#modalClose");
const modalPlayerName  = document.querySelector("#modalPlayerName");
const modalPlayerTeam  = document.querySelector("#modalPlayerTeam");
const modalPlayerTag   = document.querySelector("#modalPlayerTag");
const modalContent     = document.querySelector("#modalContent");
const standingsBody    = document.querySelector("#standingsBody");
const awardsGrid       = document.querySelector("#awardsGrid");
const pollOptions      = document.querySelector("#pollOptions");
const pollBadge        = document.querySelector("#pollBadge");
const pollNote         = document.querySelector("#pollNote");
const matchCards       = document.querySelector("#matchCards");
const submitPredictions= document.querySelector("#submitPredictions");
const resetPredictions = document.querySelector("#resetPredictions");
const predictResult    = document.querySelector("#predictResult");
const userTotalScore   = document.querySelector("#userTotalScore");
const navHamburger     = document.querySelector("#navHamburger");
const navMobileMenu    = document.querySelector("#navMobileMenu");

// ── YARDIMCILAR ───────────────────────────────────────────────
function formatValue(v) { return v >= 1 ? v.toFixed(1)+"M" : Math.round(v*1000)+"K"; }
function getLabel(p) {
  if (p.valueScore > 900) return "Değer canavarı";
  if (p.scoutScore > 430) return "Scout radarı";
  if (p.bigMatch > 88)    return "Büyük maç";
  if (p.form > 88)        return "Formda";
  return "İstikrar";
}
function tmUrl(name) {
  return `https://www.transfermarkt.com/schnellsuche/ergebnis/schnellsuche?query=${encodeURIComponent(name)}`;
}
function getFilteredPlayers() {
  return enrichedPlayers
    .filter(p => {
      const txt = `${p.name} ${p.team} ${p.position}`.toLowerCase();
      return txt.includes(state.search.toLowerCase()) &&
        (state.position==="all" || p.position===state.position) &&
        (state.team==="all"     || p.team===state.team) &&
        (!state.budgetOnly      || p.marketValue<2);
    })
    .sort((a,b) => b[state.sort]-a[state.sort]);
}
function topBy(key) { return [...enrichedPlayers].sort((a,b)=>b[key]-a[key])[0]; }

// ── ÖZET ─────────────────────────────────────────────────────
function renderSummary() {
  const bi=topBy("impactScore"), bv=topBy("valueScore"), bs=topBy("scoutScore"), bb=topBy("bigMatch"), hero=topBy("surpriseScore");
  document.querySelector("#topImpact").textContent   = `${bi.name} (${bi.impactScore})`;
  document.querySelector("#topValue").textContent    = `${bv.name} (${bv.valueScore})`;
  document.querySelector("#topScout").textContent    = `${bs.name} (${bs.scoutScore})`;
  document.querySelector("#topBigMatch").textContent = `${bb.name} (${bb.bigMatch})`;
  document.querySelector("#heroPlayer").textContent  = hero.name;
  document.querySelector("#heroNote").textContent    = `${hero.team} · ${formatValue(hero.marketValue)} EUR · skor ${hero.surpriseScore}`;
}

// ── LIDERBOARD ───────────────────────────────────────────────
function boardItem(p,i,key) {
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
function applyTheme(t) {
  const r = document.documentElement;
  r.style.setProperty("--theme-primary",   t.primary);
  r.style.setProperty("--theme-secondary", t.secondary);
  r.style.setProperty("--theme-accent",    t.accent);
  r.style.setProperty("--theme-dark",      t.dark);
  if (activeThemeName) activeThemeName.textContent = t.name;
  document.querySelectorAll(".theme-button").forEach(b=>b.classList.toggle("is-active",b.dataset.theme===t.name));
}
function renderThemes() {
  themeBar.innerHTML = teamThemes.map(t=>`
    <button class="theme-button" type="button" data-theme="${t.name}" style="--swatch-a:${t.primary};--swatch-b:${t.secondary};">
      <span class="theme-swatch"></span>${t.name}
    </button>`).join("");
  themeBar.addEventListener("click", e=>{
    const b=e.target.closest(".theme-button");
    if(b){const t=teamThemes.find(x=>x.name===b.dataset.theme);if(t)applyTheme(t);}
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
  const name=squadTeamSelect.value, squad=teamSquads[name], theme=teamThemes.find(t=>t.name===name);
  if(theme) applyTheme(theme);
  if(!squad){ squadNote.textContent=`${name}: kadro henüz eklenmedi`; squadGrid.innerHTML=`<div class="squad-empty">${name} kadrosu yakında eklenecek.</div>`; return; }
  squadNote.textContent=`${name}: ${squad.length} oyuncu — 2025-26 Sezonu`;
  squadGrid.innerHTML=squad.map(p=>`<article class="squad-card"><strong>${p.name}</strong><span>${p.position} · ${p.note}</span></article>`).join("");
}

// ── PUAN DURUMU ───────────────────────────────────────────────
function renderStandings() {
  const zc = { champion:"row-champion", ucl:"row-ucl", uel:"row-uel", uecl:"row-uel", relegation:"row-relegation" };
  standingsBody.innerHTML = standings.map((r,i)=>`
    <tr class="${zc[r.zone]||""}">
      <td class="st-rank">${i+1}</td>
      <td><div class="st-team"><span class="st-badge" style="background:${r.badge};"></span>${r.team}</div></td>
      <td>${r.o}</td><td>${r.g}</td><td>${r.b}</td><td>${r.m}</td>
      <td>${r.ag}</td><td>${r.yg}</td>
      <td>${r.ag-r.yg>=0?"+":""}${r.ag-r.yg}</td>
      <td class="st-pts">${r.pts}</td>
    </tr>`).join("");
  const panel = document.querySelector("#standings-section");
  if (!panel.querySelector(".standings-source")) {
    const src = document.createElement("p");
    src.className = "standings-source";
    src.innerHTML = `📊 Kaynak: <a href="https://www.transfermarkt.com/super-lig/tabelle/wettbewerb/TR1/saison_id/2025" target="_blank" rel="noopener">Transfermarkt — 25/26 · 34. Hafta</a>`;
    panel.appendChild(src);
  }
  if (!panel.querySelector(".standings-legend")) {
    const leg = document.createElement("div");
    leg.className = "standings-legend";
    leg.innerHTML = `
      <div class="legend-item"><span class="legend-dot" style="background:#afd179;"></span>Şampiyon + ŞL</div>
      <div class="legend-item"><span class="legend-dot" style="background:#d6eab6;"></span>Şampiyonlar Ligi</div>
      <div class="legend-item"><span class="legend-dot" style="background:#bdd9ef;"></span>Avrupa Ligi</div>
      <div class="legend-item"><span class="legend-dot" style="background:#a5cce9;"></span>Konferans Ligi</div>
      <div class="legend-item"><span class="legend-dot" style="background:#f8a7a3;"></span>Küme düşme</div>`;
    panel.appendChild(leg);
  }
}

// ── SEZON ÖDÜLLERİ ───────────────────────────────────────────
function renderAwards() {
  if (!awardsGrid) return;
  awardsGrid.innerHTML = seasonAwards.map(a=>`
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
    <section class="modal-section"><h3>Oyuncu profili</h3><p>${p.story}</p></section>
    <section class="modal-section"><h3>Kulüp geçmişi</h3>
      <div class="career-list">${(p.career||[p.team]).map(c=>`<span class="career-chip">${c}</span>`).join("")}</div>
    </section>
    <section class="modal-section"><h3>Güçlü yönler</h3>
      <div class="strength-list">${(p.strengths||["Etki","Form","Katkı"]).map(s=>`<span>${s}</span>`).join("")}</div>
    </section>
    <section class="modal-section">
      <a class="tm-link" href="${tmUrl(p.name)}" target="_blank" rel="noopener noreferrer" style="margin-top:0;">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
        Transfermarkt'ta Detaylı Profil
      </a>
    </section>`;
  playerModal.hidden = false;
  modalClose.focus();
}
function closePlayerModal() { playerModal.hidden = true; }

// ── KARŞILAŞTIRMA ─────────────────────────────────────────────
function fillCompareOptions() {
  const opts = enrichedPlayers.map(p=>`<option value="${p.name}">${p.name} — ${p.team}</option>`).join("");
  playerA.innerHTML=opts; playerB.innerHTML=opts;
  playerA.value=topBy("impactScore").name; playerB.value=topBy("valueScore").name;
}
function sl(lbl,l,r) {
  return `<div class="duel-row"><span>${lbl}</span><strong>
    <span class="${l>r?"winner":""}">${l}</span>/<span class="${r>l?"winner":""}">${r}</span>
  </strong></div>`;
}
function renderComparison() {
  const l=enrichedPlayers.find(p=>p.name===playerA.value), r=enrichedPlayers.find(p=>p.name===playerB.value);
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
  const poll=polls[0], voted=localStorage.getItem(poll.id);
  const counts=JSON.parse(localStorage.getItem(poll.id+"_counts")||"null")||Object.fromEntries(poll.candidates.map(c=>[c.name,0]));
  pollBadge.textContent = voted ? "Oy verildi ✓" : "Oy ver";
  const total=Object.values(counts).reduce((s,v)=>s+v,0);
  pollOptions.innerHTML = poll.candidates.map(c=>{
    const pct=total>0?Math.round((counts[c.name]/total)*100):0;
    return `<button class="poll-option ${voted?(voted===c.name?"voted":""):""}"
      data-candidate="${c.name}" type="button" ${voted?"disabled":""}>
      <div class="poll-bar" style="width:${voted?pct:0}%"></div>
      <div class="poll-name">${c.name}</div>
      <div class="poll-team">${c.team}</div>
      <div class="poll-pct ${voted?"visible":""}">%${pct}</div>
    </button>`;
  }).join("");
  pollNote.textContent = voted?`Toplam ${total} oy kullanıldı.`:"Oyunuzu kullanın, sonuçları görün.";
  if (!voted) {
    pollOptions.addEventListener("click",e=>{
      const b=e.target.closest(".poll-option"); if(!b) return;
      counts[b.dataset.candidate]=(counts[b.dataset.candidate]||0)+1;
      localStorage.setItem(poll.id,b.dataset.candidate);
      localStorage.setItem(poll.id+"_counts",JSON.stringify(counts));
      renderPoll();
    },{once:true});
  }
}

// ── TAHMİN OYUNU ──────────────────────────────────────────────
function renderMatchPredictions() {
  const savedScore=parseInt(localStorage.getItem("predict_total_score")||"0");
  userTotalScore.textContent=savedScore;
  const submitted=localStorage.getItem("predict_submitted")==="true";
  matchCards.innerHTML=matchFixtures.map((m,i)=>{
    const sh=localStorage.getItem(`pred_h_${i}`)||"", sa=localStorage.getItem(`pred_a_${i}`)||"";
    let cls="", label="";
    if(submitted&&sh!==""&&sa!==""){
      const ph=parseInt(sh),pa=parseInt(sa);
      if(ph===m.actualHome&&pa===m.actualAway){cls="correct";label="✅ Tam isabet! +3 puan";}
      else if((ph>pa)===(m.actualHome>m.actualAway)&&(ph===pa)===(m.actualHome===m.actualAway)){cls="partial";label="🟡 Doğru sonuç! +1 puan";}
      else{cls="wrong";label=`❌ Yanlış. Gerçek: ${m.actualHome}–${m.actualAway}`;}
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
  if(submitted){
    submitPredictions.disabled=true;
    submitPredictions.textContent="Tahminler gönderildi ✓";
    predictResult.hidden=false;
    predictResult.innerHTML=`<h3>🏆 Toplam Puanın: ${savedScore}</h3><p>Tebrikler! Yeni haftada tekrar dene.</p>`;
  }
}
submitPredictions.addEventListener("click",()=>{
  let total=0;
  matchFixtures.forEach((m,i)=>{
    const h=document.querySelector(`#pred_h_${i}`)?.value, a=document.querySelector(`#pred_a_${i}`)?.value;
    if(h===""||a==="") return;
    localStorage.setItem(`pred_h_${i}`,h); localStorage.setItem(`pred_a_${i}`,a);
    const ph=parseInt(h),pa=parseInt(a);
    if(ph===m.actualHome&&pa===m.actualAway) total+=3;
    else if((ph>pa)===(m.actualHome>m.actualAway)&&(ph===pa)===(m.actualHome===m.actualAway)) total+=1;
  });
  const prev=parseInt(localStorage.getItem("predict_total_score")||"0");
  localStorage.setItem("predict_total_score",prev+total);
  localStorage.setItem("predict_submitted","true");
  userTotalScore.textContent=prev+total;
  renderMatchPredictions();
});
resetPredictions.addEventListener("click",()=>{
  matchFixtures.forEach((_,i)=>{localStorage.removeItem(`pred_h_${i}`);localStorage.removeItem(`pred_a_${i}`);});
  localStorage.removeItem("predict_submitted");
  submitPredictions.disabled=false;
  submitPredictions.textContent="Tahminleri Gönder";
  predictResult.hidden=true;
  renderMatchPredictions();
});

// ── TAKM FİLTRE ──────────────────────────────────────────────
function fillTeamFilter() {
  const teams=[...new Set(enrichedPlayers.map(p=>p.team))].sort();
  teamFilter.innerHTML=`<option value="all">Tüm takımlar</option>`+teams.map(t=>`<option value="${t}">${t}</option>`).join("");
}

// ── HAMBURGER ─────────────────────────────────────────────────
navHamburger.addEventListener("click",e=>{
  e.stopPropagation();
  const open=!navMobileMenu.hidden;
  navMobileMenu.hidden=open;
  navHamburger.setAttribute("aria-expanded",String(!open));
});
document.addEventListener("click",e=>{
  if(!navMobileMenu.hidden&&!e.target.closest(".navbar")){
    navMobileMenu.hidden=true;
    navHamburger.setAttribute("aria-expanded","false");
  }
});
navMobileMenu.querySelectorAll(".nav-link").forEach(link=>{
  link.addEventListener("click",()=>{navMobileMenu.hidden=true;navHamburger.setAttribute("aria-expanded","false");});
});

// ── EVENT LISTENERS ───────────────────────────────────────────
searchInput.addEventListener("input",  e=>{state.search=e.target.value;renderPlayers();});
positionFilter.addEventListener("change",e=>{state.position=e.target.value;renderPlayers();});
teamFilter.addEventListener("change",  e=>{state.team=e.target.value;renderPlayers();});
sortMode.addEventListener("change",    e=>{state.sort=e.target.value;renderPlayers();});
budgetOnly.addEventListener("change",  e=>{state.budgetOnly=e.target.checked;renderPlayers();});
playerA.addEventListener("change", renderComparison);
playerB.addEventListener("change", renderComparison);
squadTeamSelect.addEventListener("change", renderSquad);

playerGrid.addEventListener("click",e=>{const c=e.target.closest(".player-card");if(c)openPlayerModal(c.dataset.player);});
playerGrid.addEventListener("keydown",e=>{
  if(e.key!=="Enter"&&e.key!==" ") return;
  const c=e.target.closest(".player-card");if(!c) return;
  e.preventDefault();openPlayerModal(c.dataset.player);
});
modalClose.addEventListener("click",closePlayerModal);
playerModal.addEventListener("click",e=>{if(e.target===playerModal)closePlayerModal();});
document.addEventListener("keydown",e=>{if(e.key==="Escape"&&!playerModal.hidden)closePlayerModal();});
swapButton.addEventListener("click",()=>{const o=playerA.value;playerA.value=playerB.value;playerB.value=o;renderComparison();});

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
