// ================================================================
// SÜPER LİG ATLASI — app.js  |  2025-26 Sezonu
// ================================================================

// ── OYUNCU VERİSİ ─────────────────────────────────────────────
const players = [
  // ===== GALATASARAY =====
  { name:"Ugurcan Cakir",      team:"Galatasaray",  position:"Kaleci",    age:30, marketValue:15, goals:0,  assists:0,  minutes:3230, bigMatch:92, form:91, story:"20 gol yememe ile şampiyonluğun mimarı. Sezonun kalecisi ödülünü zirvede tamamladı.", career:["1461 Trabzon","Trabzonspor","Galatasaray"], strengths:["Kurtarış","Liderlik","Büyük maç"] },
  { name:"Baris Alper Yilmaz", team:"Galatasaray",  position:"Kanat",     age:26, marketValue:30, goals:8,  assists:11, minutes:2900, bigMatch:92, form:95, story:"8 gol 11 asist ile ligin en değerli Türk oyuncusu. Sezonun oyuncusu ödülünün sahibi.", career:["Keçiörengücü","Galatasaray"], strengths:["Hız","Dribbling","Güç"] },
  { name:"Gabriel Sara",       team:"Galatasaray",  position:"Orta saha", age:26, marketValue:27, goals:8,  assists:14, minutes:2850, bigMatch:88, form:91, story:"14 asist ile Galatasaray'ın oyun kurma merkezi. Duran toplardaki ustalığıyla şampiyonlukta pay sahibi.", career:["Gremio","Norwich","Galatasaray"], strengths:["Pas kalitesi","Yaratıcılık","Oyun Görüşü"] },
  { name:"Artem Dovbyk",       team:"Galatasaray",  position:"Forvet",    age:28, marketValue:15, goals:18, assists:6,  minutes:2600, bigMatch:87, form:88, story:"Roma'dan transfer edilen Ukraynalı santrfor, 18 golle ligin en golcü isimlerinden biri oldu.", career:["Dnipro","Girona","Roma","Galatasaray"], strengths:["Bitiricilik","Hava topu","Fiziksel Güç"] },
  { name:"Leroy Sane",         team:"Galatasaray",  position:"Kanat",     age:30, marketValue:20, goals:7,  assists:5,  minutes:2400, bigMatch:86, form:87, story:"Bayern Münih'ten gelen dünya yıldızı, 7 gol ve 5 asistle şampiyonluk yolunda tecrübesiyle fark yarattı.", career:["Schalke","Man City","Bayern","Galatasaray"], strengths:["Hız","Teknik","Dribbling"] },
  { name:"Lucas Torreira",     team:"Galatasaray",  position:"Orta saha", age:30, marketValue:10, goals:3,  assists:7,  minutes:2700, bigMatch:87, form:88, story:"Galatasaray'ın orta saha dinamosu. Savunma arkasını süpürme ve pas dağıtımındaki başarısıyla paha biçilemez.", career:["Sampdoria","Arsenal","Atletico","Fiorentina","Galatasaray"], strengths:["Top Kapma","Savunma","İstikrar"] },
  { name:"Wilfried Singo",     team:"Galatasaray",  position:"Defans",    age:25, marketValue:23, goals:1,  assists:2,  minutes:2600, bigMatch:85, form:87, story:"Monaco'dan transfer edilen Singo, savunmanın sağ kulvarında güçlü fiziği ve temposuyla adeta bir duvar ördü.", career:["Torino","Monaco","Galatasaray"], strengths:["Hız","Fiziksel Güç","Savunma"] },
  { name:"Abdulkerim Bardakci",team:"Galatasaray",  position:"Defans",    age:31, marketValue:6.5,goals:3,  assists:1,  minutes:2750, bigMatch:84, form:85, story:"Milli stoper tecrübesi, lider karakteri ve hava toplarındaki üstünlüğü ile savunmanın en kritik parçası.", career:["Konyaspor","Galatasaray"], strengths:["Hava topu","Liderlik","Pas kalitesi"] },

  // ===== FENERBAHÇE =====
  { name:"Dorgeles Nene",      team:"Fenerbahce",   position:"Kanat",     age:23, marketValue:9,  goals:9,  assists:16, minutes:2700, bigMatch:90, form:92, story:"Fenerbahçe'nin Salzburg'dan transfer ettiği genç yetenek, 16 asistle asist kralı Dorgeles Nene oldu.", career:["Salzburg","Westerlo","Fenerbahce"], strengths:["Asist","Hız","Bire Bir"] },
  { name:"Talisca",            team:"Fenerbahce",   position:"Orta saha", age:32, marketValue:10, goals:19, assists:5,  minutes:2200, bigMatch:89, form:87, story:"Fenerbahçe'nin şampiyonluk yarışındaki en büyük gol silahı. Duran toplar ve ceza sahası dışı şutlarıyla fark yarattı.", career:["Benfica","Besiktas","Guangzhou","Al Nassr","Fenerbahce"], strengths:["Şut","Duran Top","Büyük Maç"] },
  { name:"Edson Alvarez",      team:"Fenerbahce",   position:"Orta saha", age:28, marketValue:30, goals:4,  assists:8,  minutes:2900, bigMatch:86, form:88, story:"West Ham'dan transfer edilen Meksikalı, orta sahada üstün fizik gücü ve kesiciliğiyle savunmanın önündeki sigortaydı.", career:["Club America","Ajax","West Ham","Fenerbahce"], strengths:["Top Kapma","Pozisyon Alma","Fiziksel Güç"] },
  { name:"Caglar Soyuncu",     team:"Fenerbahce",   position:"Defans",    age:30, marketValue:10, goals:2,  assists:3,  minutes:2800, bigMatch:84, form:86, story:"Atletico Madrid'den transfer edilen Çağlar, savunmada liderlik vasıflarıyla öne çıktı.", career:["Altınordu","Freiburg","Leicester","Atletico","Fenerbahce"], strengths:["Hava Topu","Liderlik","Agresiflik"] },
  { name:"Kerem Akturkoglu",   team:"Fenerbahce",   position:"Kanat",     age:27, marketValue:20, goals:8,  assists:7,  minutes:2500, bigMatch:85, form:86, story:"Benfica sonrası Fenerbahçe'ye imza atan Kerem, hızı ve gol yollarındaki etkinliğiyle takıma dinamizm kattı.", career:["Galatasaray","Benfica","Fenerbahce"], strengths:["Hız","Dribbling","Gol"] },
  { name:"Marco Asensio",      team:"Fenerbahce",   position:"Orta saha", age:30, marketValue:10, goals:11, assists:12, minutes:2100, bigMatch:88, form:89, story:"11 gol ve 12 asist ile ligin en üretken oyuncularından biri. Şampiyonluk yolunda asist kralı oldu.", career:["Mallorca","Real Madrid","PSG","Fenerbahce"], strengths:["Şut","Pas kalitesi","Tecrübe"] },
  { name:"Ederson",            team:"Fenerbahce",   position:"Kaleci",    age:32, marketValue:10, goals:0,  assists:0,  minutes:3150, bigMatch:88, form:87, story:"Kalesinde tecrübesiyle devleşen Brezilyalı, geriden oyun kurmadaki üstün kalitesiyle Fenerbahçe'nin kilit ismiydi.", career:["Benfica","Man City","Fenerbahce"], strengths:["Pas kalitesi","Refleks","Deneyim"] },
  { name:"Milan Skriniar",     team:"Fenerbahce",   position:"Defans",    age:31, marketValue:10, goals:1,  assists:0,  minutes:2800, bigMatch:86, form:86, story:"PSG'den transfer edilen Slovak stoper, sağlam savunma duruşu ve güçlü fiziğiyle geçilmez bir duvar ördü.", career:["Zilina","Sampdoria","Inter","PSG","Fenerbahce"], strengths:["Markaj","Güç","Pozisyon Alma"] },

  // ===== BEŞİKTAŞ =====
  { name:"Orkun Kokcu",        team:"Besiktas",     position:"Orta saha", age:25, marketValue:25, goals:9,  assists:8,  minutes:2600, bigMatch:88, form:90, story:"Benfica'dan Beşiktaş'a transfer olan Orkun, orta sahada yüksek oyun zekası ve şutlarıyla takımını sırtladı.", career:["Feyenoord","Benfica","Besiktas"], strengths:["Pas","Vizyon","Gol"] },
  { name:"Tammy Abraham",      team:"Besiktas",     position:"Forvet",    age:28, marketValue:18, goals:15, assists:5,  minutes:2500, bigMatch:86, form:87, story:"Roma'dan transfer olan İngiliz santrfor, 15 golle Beşiktaş'ın en skorer ismi oldu ve ceza sahası hakimiyeti kurdu.", career:["Chelsea","Aston Villa","Roma","Besiktas"], strengths:["Fizik","Ceza Sahası","Bitiricilik"] },
  { name:"Rafa Silva",         team:"Besiktas",     position:"Orta saha", age:33, marketValue:4,  goals:8,  assists:9,  minutes:2200, bigMatch:83, form:84, story:"Dar alandaki tekniği ve kritik gol paslarıyla Beşiktaş hücumunun en yaratıcı oyuncusu oldu.", career:["Braga","Benfica","Besiktas"], strengths:["Teknik","Yaratıcılık","Son Pas"] },
  { name:"Wilfred Ndidi",      team:"Besiktas",     position:"Orta saha", age:29, marketValue:8,  goals:3,  assists:5,  minutes:2700, bigMatch:85, form:86, story:"Orta sahanın göbeğinde defansif kalkan görevi gören Ndidi, fiziksel mücadelesiyle rakipleri yıprattı.", career:["Genk","Leicester","Besiktas"], strengths:["Savunma","Top Kapma","Dayanıklılık"] },
  { name:"Mert Gunok",         team:"Besiktas",     position:"Kaleci",    age:37, marketValue:0.5,goals:0,  assists:0,  minutes:3200, bigMatch:83, form:82, story:"Karakteri ve tecrübesiyle takımın kaptanı ve kalesindeki en güvenilir güvencesi oldu.", career:["Fenerbahce","Bursaspor","Basaksehir","Besiktas"], strengths:["Deneyim","Kurtarış","Liderlik"] },
  { name:"Gabriel Paulista",    team:"Besiktas",     position:"Defans",    age:35, marketValue:0.5,goals:1,  assists:1,  minutes:2300, bigMatch:82, form:83, story:"Beşiktaş savunmasında liderlik vasıflarıyla öne çıkan tecrübeli stoper, kritik müdahaleleriyle alkış aldı.", career:["Arsenal","Villarreal","Valencia","Atletico","Besiktas"], strengths:["Tecrübe","Markaj","Müdahale"] },

  // ===== TRABZONSPOR =====
  { name:"Paul Onuachu",       team:"Trabzonspor",  position:"Forvet",    age:32, marketValue:6,  goals:22, assists:3,  minutes:2800, bigMatch:93, form:94, story:"22 gol ile gol krallığının ortağı! Hava topu hakimiyetiyle rakiplerine kabus yaşattı.", career:["Midtjylland","Genk","Southampton","Trabzonspor"], strengths:["Hava Topu","Bitiricilik","Ceza Sahası"] },
  { name:"Felipe Augusto",     team:"Trabzonspor",  position:"Forvet",    age:22, marketValue:15, goals:14, assists:4,  minutes:2400, bigMatch:87, form:90, story:"15 milyon Euro piyasa değerine ulaşan genç yetenek, 14 gol atarak ligin en değerli çıkışlarından birini yaptı.", career:["Corinthians","Cercle Brugge","Trabzonspor"], strengths:["Potansiyel","Bitiricilik","Hız"] },
  { name:"Ernest Muci",        team:"Trabzonspor",  position:"Orta saha", age:25, marketValue:11, goals:9,  assists:6,  minutes:2200, bigMatch:89, form:91, story:"Beşiktaş'tan transfer edilen Arnavut yıldız, 9 gol ve 6 asistle hücuma büyük zenginlik kattı.", career:["Legia","Besiktas","Trabzonspor"], strengths:["Uzak Şut","Dribbling","Yaratıcılık"] },
  { name:"Okay Yokuslu",       team:"Trabzonspor",  position:"Orta saha", age:32, marketValue:1.2,goals:2,  assists:6,  minutes:2700, bigMatch:83, form:85, story:"Savunma önünde tecrübesiyle güven veren Okay, hava toplarındaki etkisi ve kritik müdahaleleriyle öne çıktı.", career:["Trabzonspor","Celta Vigo","WBA","Trabzonspor"], strengths:["Savunma","Tecrübe","Pas"] },

  // ===== BAŞAKŞEHİR =====
  { name:"Eldor Shomurodov",   team:"Basaksehir",   position:"Forvet",    age:30, marketValue:7,  goals:22, assists:6,  minutes:2550, bigMatch:87, form:88, story:"22 gol atarak Paul Onuachu ile gol krallığını paylaştı. Başakşehir tarihinin en skorer sezonlarından birini yaşattı.", career:["Rostov","Genoa","Roma","Basaksehir"], strengths:["Bitiricilik","Hız","Pozisyon Alma"] },
  { name:"Muhammed Sengezer",  team:"Basaksehir",   position:"Kaleci",    age:29, marketValue:3.5,goals:0,  assists:0,  minutes:3100, bigMatch:85, form:89, story:"Kritik kurtarışları ve yüksek kurtarış yüzdesiyle Başakşehir'in Avrupa kupalarına katılmasında başrolü oynadı.", career:["Bursaspor","Basaksehir"], strengths:["Refleks","İstikrar","Pozisyon"] },
  { name:"Berkay Ozcan",       team:"Basaksehir",   position:"Orta saha", age:28, marketValue:1.2,goals:5,  assists:10, minutes:2600, bigMatch:83, form:85, story:"Orta sahada 10 asist yaparak takımının oyun kuruculuğunu üstlendi ve gol yollarını besledi.", career:["Stuttgart","Greuther Fürth","Basaksehir"], strengths:["Asist","Pas kalitesi","Vizyon"] },

  // ===== GÖZTEPE =====
  { name:"Mateusz Lis",        team:"Goztepe",      position:"Kaleci",    age:29, marketValue:2.5,goals:0,  assists:0,  minutes:3200, bigMatch:87, form:90, story:"Göztepe'nin kalesinde harikalar yaratarak ligin en yüksek kurtarış oranına sahip kalecilerinden biri oldu.", career:["Lech Poznan","Southampton","Troyes","Goztepe"], strengths:["Refleks","Bire Bir","İstikrar"] },
  { name:"Juan",               team:"Goztepe",      position:"Kanat",     age:24, marketValue:12, goals:12, assists:4,  minutes:2200, bigMatch:82, form:86, story:"Değerini 12 milyon Euro'ya fırlatan genç yıldız, 12 gol atarak sezonun en sansasyonel kanat performansına imza attı.", career:["Santos","Goztepe"], strengths:["Hız","Bitiricilik","Potansiyel"] },
  { name:"Tunay Torun",        team:"Goztepe",      position:"Kanat",     age:36, marketValue:0.05,goals:5,  assists:7,  minutes:2000, bigMatch:79, form:81, story:"Takımın tecrübeli ismi, kısıtlı sürelerde ürettiği gol ve asistlerle Göztepe taraftarının sevgilisi oldu.", career:["Hertha Berlin","Kasımpaşa","Göztepe"], strengths:["Deneyim","Pas","Orta"] },

  // ===== SAMSUNSPOR =====
  { name:"Okan Kocuk",         team:"Samsunspor",   position:"Kaleci",    age:30, marketValue:2,  goals:0,  assists:0,  minutes:3300, bigMatch:84, form:85, story:"Samsunspor kalesinde gösterdiği istikrarla takımın ligi orta sıralarda tamamlamasını sağladı.", career:["Bursaspor","Galatasaray","Samsunspor"], strengths:["Kurtarış","Refleks","Liderlik"] },
  { name:"Ivohas Seka",        team:"Samsunspor",   position:"Forvet",    age:27, marketValue:4,  goals:14, assists:5,  minutes:2300, bigMatch:81, form:85, story:"Samsunspor formasıyla 14 gol atarak takımın en golcü oyuncusu oldu ve hücum hattını sırtladı.", career:["Guimaraes","Samsunspor"], strengths:["Bitiricilik","Hız","Fizik"] },
  { name:"Halil Dervisoglu",   team:"Samsunspor",   position:"Forvet",    age:26, marketValue:0.7,goals:8,  assists:5,  minutes:1900, bigMatch:79, form:82, story:"Galatasaray sonrası Samsunspor'da yeniden doğan forvet, 8 gol ve 5 asistle hücumda kilit rol oynadı.", career:["Brentford","Galatasaray","Samsunspor"], strengths:["Teknik","Top Saklama","Pas"] },

  // ===== RİZESPOR =====
  { name:"Yahia Fofana",       team:"Rizespor",     position:"Kaleci",    age:25, marketValue:5,  goals:0,  assists:0,  minutes:3200, bigMatch:84, form:85, story:"Angers'den Rizespor'a gelen kaleci, gösterdiği performansla piyasa değerini 5 milyon Euro'ya çıkardı.", career:["Le Havre","Angers","Rizespor"], strengths:["Kurtarış","Fizik","Clean Sheet"] },
  { name:"Clinton Njie",       team:"Rizespor",     position:"Kanat",     age:32, marketValue:0.3,goals:8,  assists:5,  minutes:2100, bigMatch:78, form:80, story:"Eski Tottenham'lı kanat, Rizespor formasıyla ligin tecrübeli kanat oyuncuları arasında yer aldı.", career:["Lyon","Marseille","Tottenham","Rizespor"], strengths:["Hız","Teknik","Deneyim"] },

  // ===== KONYASPOR =====
  { name:"Olarenwaju Kayode",  team:"Konyaspor",    position:"Forvet",    age:33, marketValue:0.28,goals:9,  assists:3,  minutes:2100, bigMatch:78, form:79, story:"Konyaspor'un gol yükünü çeken deneyimli santrfor, 9 golle takımının ligde kalmasında önemli rol oynadı.", career:["Austria Wien","Shakhtar","Sivasspor","Konyaspor"], strengths:["Bitiricilik","Hız","Deneyim"] },
  { name:"Soner Aydogdu",      team:"Konyaspor",    position:"Orta saha", age:35, marketValue:0.1,goals:5,  assists:8,  minutes:2500, bigMatch:77, form:81, story:"Konyaspor'un tecrübeli orta sahası, 8 asistlik katkısıyla takımının hücum organizasyonlarını yönetti.", career:["Trabzonspor","Göztepe","Konyaspor"], strengths:["Asist","Pas kalitesi","Tecrübe"] },

  // ===== KOCAELİSPOR =====
  { name:"Aleksandar Jovanovic",team:"Kocaelispor", position:"Kaleci",    age:33, marketValue:0.5,goals:0,  assists:0,  minutes:3100, bigMatch:82, form:83, story:"Kocaelispor'un tecrübeli Sırp kalecisi, kritik maçlardaki kurtarışlarıyla ligde kalmayı garantiledi.", career:["Aarhus","Apollon Limassol","Kocaelispor"], strengths:["Refleks","Deneyim","Hava Topu"] },
  { name:"Yusuf Erdogan",      team:"Kocaelispor",  position:"Orta saha", age:33, marketValue:0.3,goals:6,  assists:8,  minutes:2600, bigMatch:79, form:82, story:"Kocaelispor formasıyla 8 asist yapan Yusuf, kanattaki tecrübesiyle hücumların çıkış noktasıydı.", career:["Trabzonspor","Kasımpaşa","Adana Demirspor","Kocaelispor"], strengths:["Hız","Asist","Deneyim"] },

  // ===== ALANYASPOR =====
  { name:"Efkan Bektas",       team:"Alanyaspor",   position:"Forvet",    age:28, marketValue:1.5,goals:13, assists:4,  minutes:2200, bigMatch:82, form:86, story:"Alanyaspor'un bu sezonki en büyük sürprizi. 13 gol atarak Alanyaspor'u ligde üst sıralara taşıdı.", career:["1860 Munich","Ankaragücü","Alanyaspor"], strengths:["Bitiricilik","Şut","Pozisyon"] },
  { name:"Ertugrul Taskiran",  team:"Alanyaspor",   position:"Kaleci",    age:36, marketValue:0.1,goals:0,  assists:0,  minutes:3400, bigMatch:85, form:88, story:"Tecrübeli kaleci Alanyaspor kalesinde gösterdiği kurtarışlarla takımının en güvendiği isimlerden biri oldu.", career:["Fenerbahce","Kasımpaşa","Alanyaspor"], strengths:["Refleks","Tecrübe","Liderlik"] },
  { name:"Yunus Emre Erdogan", team:"Alanyaspor",   position:"Orta saha", age:25, marketValue:2,  goals:7,  assists:9,  minutes:2500, bigMatch:81, form:84, story:"Alanyaspor orta sahasında 9 asistle fark yaratan genç orta saha oyuncusu ligin gözdelerinden biri oldu.", career:["Konyaspor","Alanyaspor"], strengths:["Pas kalitesi","Yaratıcılık","Asist"] },

  // ===== GAZİANTEP FK =====
  { name:"Mohamed Bayo",       team:"Gaziantep FK", position:"Forvet",    age:27, marketValue:4.5,goals:15, assists:4,  minutes:2300, bigMatch:84, form:87, story:"Lille'den kiralanan Gine'li santrfor, 15 golle Gaziantep'i ligde tutan en büyük güç oldu.", career:["Clermont","Lille","Gaziantep FK"], strengths:["Bitiricilik","Fizik","Ceza Sahası"] },
  { name:"Ruslan Malinovskyi", team:"Gaziantep FK", position:"Orta saha", age:33, marketValue:2.5,goals:8,  assists:10, minutes:2400, bigMatch:84, form:86, story:"Atalanta ve Marsilya tecrübesiyle takıma gelen Ukraynalı, 10 asist ve uzaktan golleriyle ligi salladı.", career:["Atalanta","Marseille","Genoa","Gaziantep FK"], strengths:["Uzak Şut","Asist","Liderlik"] },

  // ===== KASIMPAŞA =====
  { name:"Andreas Gianniotis", team:"Kasimpasa",    position:"Kaleci",    age:33, marketValue:0.3,goals:0,  assists:0,  minutes:3200, bigMatch:82, form:81, story:"Kasımpaşa kalesinde gösterdiği reflekslerle kritik puanlar kazandıran tecrübeli Yunan file bekçisi.", career:["Olympiacos","Maccabi Tel Aviv","Kasimpasa"], strengths:["Refleks","Kurtarış","Deneyim"] },
  { name:"Mostafa Mohamed",    team:"Kasimpasa",    position:"Forvet",    age:28, marketValue:3.5,goals:11, assists:3,  minutes:2200, bigMatch:80, form:82, story:"Nantes'tan transfer edilen Mısırlı forvet, 11 golle Kasımpaşa'nın en skorer ismi oldu.", career:["Zamalek","Galatasaray","Nantes","Kasimpasa"], strengths:["Bitiricilik","Hava Topu","Fizik"] },

  // ===== GENÇLERBİRLİĞİ =====
  { name:"Emre Mor",           team:"Genclerbirligi",position:"Kanat",     age:28, marketValue:0.5,goals:7,  assists:8,  minutes:1900, bigMatch:80, form:82, story:"Kariyerini Gençlerbirliği'nde canlandıran Emre Mor, 7 gol ve 8 asistlik performansıyla parladı.", career:["Dortmund","Celta Vigo","Karagümrük","Fenerbahce","Genclerbirligi"], strengths:["Hız","Dribbling","Yaratıcılık"] },
  { name:"Emre Akbaba",        team:"Genclerbirligi",position:"Orta saha",age:33, marketValue:0.4,goals:5,  assists:8,  minutes:2200, bigMatch:79, form:80, story:"Milli orta saha oyuncusu tecrübesi ve 8 asistlik katkısıyla takımına büyük liderlik yaptı.", career:["Alanyaspor","Galatasaray","Adana Demirspor","Genclerbirligi"], strengths:["Tecrübe","Asist","Liderlik"] },

  // ===== EYÜPSPOR =====
  { name:"Bertug Yildirim",    team:"Eyupspor",     position:"Forvet",    age:23, marketValue:7,  goals:11, assists:4,  minutes:2300, bigMatch:79, form:82, story:"Rennes'ten transfer edilen genç santrfor, 11 gol atarak ligin en potansiyelli Türk forvetleri arasına girdi.", career:["Hatayspor","Rennes","Eyupspor"], strengths:["Bitiricilik","Hava Topu","Güç"] },
  { name:"Emre Demir",         team:"Eyupspor",     position:"Kanat",     age:22, marketValue:0.5,goals:6,  assists:9,  minutes:2100, bigMatch:82, form:85, story:"Kayserispor ve Barcelona altyapısı kökenli genç kanat, 9 asistle Eyüpspor'un parlayan yıldızı oldu.", career:["Kayserispor","Barcelona B","Fenerbahce","Eyupspor"], strengths:["Dribbling","Potansiyel","Hız"] },

  // ===== ANTALYASPOR =====
  { name:"Oguzhan Ozyakup",    team:"Antalyaspor",  position:"Orta saha", age:33, marketValue:0.2,goals:3,  assists:6,  minutes:2300, bigMatch:78, form:78, story:"Futbola veda etmeden önceki son sezonunda Antalyaspor orta sahasında tecrübesiyle liderlik yaptı.", career:["Arsenal","Besiktas","Feyenoord","Antalyaspor"], strengths:["Pas kalitesi","Tecrübe","Oyun Zekası"] },
  { name:"Gael Kakuta",        team:"Antalyaspor",  position:"Kanat",     age:34, marketValue:0.25,goals:5,  assists:4,  minutes:1900, bigMatch:74, form:75, story:"Eski Chelsea'li yıldız, tecrübesiyle kanatta oyun kurucu rolünü üstlendi ve hücuma destek verdi.", career:["Chelsea","Lazio","Lens","Amiens","Antalyaspor"], strengths:["Teknik","Tecrübe","Pas"] },

  // ===== KAYSERİSPOR =====
  { name:"Bilal Bayazit",      team:"Kayserispor",  position:"Kaleci",    age:27, marketValue:1.8,goals:0,  assists:0,  minutes:3200, bigMatch:80, form:81, story:"Kayserispor kalesinde ligin en çok kurtarış yapan 3 kalecisinden biri oldu ve değerini kanıtladı.", career:["Vitesse","Kayserispor"], strengths:["Kurtarış","Refleks","Karşı Karşıya"] },
  { name:"Kouadio Kone",       team:"Kayserispor",  position:"Orta saha", age:25, marketValue:50, goals:5,  assists:6,  minutes:2100, bigMatch:90, form:92, story:"Kayserispor'un bu sezonki sansasyonel 50 M€'luk yıldızı (Manu Koné). Orta sahada dünya standartlarında oynadı.", career:["Toulouse","Gladbach","Roma","Kayserispor"], strengths:["Savunma","Top Kapma","Güç"] },

  // ===== KARAGÜMRÜK =====
  { name:"Ivo Grbic",          team:"Karagumruk",   position:"Kaleci",    age:30, marketValue:1,  goals:0,  assists:0,  minutes:2800, bigMatch:83, form:82, story:"Atletico Madrid geçmişli Hırvat kaleci, Karagümrük kalesinde kritik kurtarışlarla mücadele etti.", career:["Lokomotiva","Atletico Madrid","Sheffield Utd","Karagumruk"], strengths:["Kurtarış","Fizik","Deneyim"] },
  { name:"Kenan Karaman",      team:"Karagumruk",   position:"Forvet",    age:32, marketValue:1.8,goals:8,  assists:5,  minutes:2100, bigMatch:79, form:80, story:"Tecrübeli milli oyuncu, 8 gol ve 5 asistle Karagümrük'ün hücum hattındaki en üretken ismiydi.", career:["Hoffenheim","Düsseldorf","Schalke","Karagumruk"], strengths:["Gol","Asist","Deneyim"] }
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
  Galatasaray:    [ {name:"Ugurcan Cakir",       position:"Kaleci",    note:"Sezonun Kalecisi 🧤 · 20 CS"}, {name:"Wilfried Singo",     position:"Defans",    note:"Sağ bek"}, {name:"Abdulkerim Bardakci",position:"Defans",    note:"Stoper"}, {name:"Lucas Torreira",     position:"Orta saha", note:"Ön libero"}, {name:"Gabriel Sara",       position:"Orta saha", note:"14 asist"}, {name:"Baris Alper Yilmaz",position:"Kanat",     note:"Sezonun Oyuncusu ⭐ 8G 11A"}, {name:"Leroy Sane",         position:"Kanat",     note:"7 gol 5 asist"}, {name:"Artem Dovbyk",       position:"Forvet",    note:"18 gol"} ],
  Fenerbahce:     [ {name:"Ederson",             position:"Kaleci",    note:"A Takım"}, {name:"Caglar Soyuncu",      position:"Defans",    note:"Stoper"}, {name:"Milan Skriniar",     position:"Defans",    note:"Stoper"}, {name:"Edson Alvarez",       position:"Orta saha", note:"Ön libero"}, {name:"Marco Asensio",      position:"Orta saha", note:"Asist Kralı 🎯 11G 12A"}, {name:"Talisca",            position:"Orta saha", note:"19 gol"}, {name:"Dorgeles Nene",      position:"Kanat",     note:"9 gol 16 asist"}, {name:"Kerem Akturkoglu",   position:"Kanat",     note:"8 gol 7 asist"} ],
  Besiktas:       [ {name:"Mert Gunok",          position:"Kaleci",    note:"Kaptan"}, {name:"Gabriel Paulista",    position:"Defans",    note:"Stoper"}, {name:"Wilfred Ndidi",      position:"Orta saha", note:"Ön libero"}, {name:"Orkun Kokcu",         position:"Orta saha", note:"9 gol 8 asist"}, {name:"Rafa Silva",         position:"Orta saha", note:"8 gol 9 asist"}, {name:"Tammy Abraham",      position:"Forvet",    note:"15 gol"} ],
  Trabzonspor:    [ {name:"Paul Onuachu",        position:"Forvet",    note:"Gol Kralı ⚽ 22 gol"}, {name:"Felipe Augusto",     position:"Forvet",    note:"14 gol 4 asist"}, {name:"Ernest Muci",        position:"Orta saha", note:"9 gol 6 asist"}, {name:"Okay Yokuslu",       position:"Orta saha", note:"2 gol 6 asist"} ],
  Basaksehir:     [ {name:"Muhammed Sengezer",   position:"Kaleci",    note:"Değerli performans"}, {name:"Eldor Shomurodov",   position:"Forvet",    note:"Gol Kralı ⚽ 22 gol"}, {name:"Berkay Ozcan",       position:"Orta saha", note:"5 gol 10 asist"} ],
  Goztepe:        [ {name:"Mateusz Lis",         position:"Kaleci",    note:"Clean sheet listesi"}, {name:"Juan",               position:"Kanat",     note:"12 gol 4 asist"}, {name:"Tunay Torun",        position:"Kanat",     note:"5 gol 7 asist"} ],
  Samsunspor:     [ {name:"Okan Kocuk",          position:"Kaleci",    note:"İstikrarlı eldiven"}, {name:"Ivohas Seka",        position:"Forvet",    note:"14 gol"}, {name:"Halil Dervisoglu",   position:"Forvet",    note:"8 gol 5 asist"} ],
  Rizespor:       [ {name:"Yahia Fofana",        position:"Kaleci",    note:"5M€'luk kaleci"}, {name:"Clinton Njie",       position:"Kanat",     note:"8 gol 5 asist"} ],
  Konyaspor:      [ {name:"Olarenwaju Kayode",   position:"Forvet",    note:"9 gol"}, {name:"Soner Aydogdu",      position:"Orta saha", note:"5 gol 8 asist"} ],
  Kocaelispor:    [ {name:"Aleksandar Jovanovic",position:"Kaleci",    note:"Ligde tutan kurtarışlar"}, {name:"Yusuf Erdogan",      position:"Orta saha", note:"Kaptan · 8 asist"} ],
  Alanyaspor:     [ {name:"Ertugrul Taskiran",   position:"Kaleci",    note:"Tecrübeli kaleci"}, {name:"Efkan Bektas",       position:"Forvet",    note:"Genç Yetenek 🌟 13 gol"}, {name:"Yunus Emre Erdogan", position:"Orta saha", note:"7 gol 9 asist"} ],
  "Gaziantep FK": [ {name:"Mohamed Bayo",        position:"Forvet",    note:"15 gol"}, {name:"Ruslan Malinovskyi", position:"Orta saha", note:"8 gol 10 asist"} ],
  Kasimpasa:      [ {name:"Andreas Gianniotis",  position:"Kaleci",    note:"300K€'luk eldiven"}, {name:"Mostafa Mohamed",    position:"Forvet",    note:"11 gol"} ],
  Genclerbirligi: [ {name:"Emre Mor",            position:"Kanat",     note:"7 gol 8 asist"}, {name:"Emre Akbaba",        position:"Orta saha", note:"Kaptan · 8 asist"} ],
  Eyupspor:       [ {name:"Bertug Yildirim",     position:"Forvet",    note:"11 gol"}, {name:"Emre Demir",         position:"Kanat",     note:"6 gol 9 asist"} ],
  Antalyaspor:    [ {name:"Oguzhan Ozyakup",     position:"Orta saha", note:"Kaptan · 6 asist"}, {name:"Gael Kakuta",        position:"Kanat",     note:"5 gol 4 asist"} ],
  Kayserispor:    [ {name:"Bilal Bayazit",       position:"Kaleci",    note:"Değerli kurtarışlar"}, {name:"Kouadio Kone",      position:"Orta saha", note:"50M€'luk dev"} ],
  Karagumruk:     [ {name:"Ivo Grbic",           position:"Kaleci",    note:"Hırvat kaleci"}, {name:"Kenan Karaman",    position:"Forvet",    note:"8 gol 5 asist"} ]
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

const seasonAwards = [
  { emoji:"⭐", title:"Sezonun Oyuncusu",      winner:"Barış Alper Yılmaz", team:"Galatasaray",  detail:"8 gol · 11 asist",   note:"Milli futbolcu, 11 asistle şampiyon Galatasaray'ı hücumda sırtlayarak sezonun en değerli oyuncusu oldu.", color:"#f0a830" },
  { emoji:"⚽", title:"Gol Kralı",             winner:"Paul Onuachu & Eldor Shomurodov", team:"TS / Başakşehir", detail:"22 gol", note:"Sezon boyunca rakip kaleleri abluka altına alarak 22 golle krallığı paylaşan iki dev santrfor.", color:"#22c76e" },
  { emoji:"🎯", title:"Asist Krallığı",        winner:"Marco Asensio",      team:"Fenerbahçe",   detail:"12 asist",             note:"Sezonun en yaratıcı orta sahası. 12 asist üreterek Fenerbahçe hücumunun lideri oldu.", color:"#003f8f" },
  { emoji:"🧤", title:"Sezonun Kalecisi",      winner:"Uğurcan Çakır",      team:"Galatasaray",  detail:"20 gol yememe",        note:"Galatasaray kalesinde 20 maçı gol yemeden tamamlayarak şampiyonluğun en büyük kahramanı oldu.", color:"#a90432" },
  { emoji:"🌟", title:"Genç Yetenek",          winner:"Efkan Bektaş",       team:"Alanyaspor",   detail:"13 gol · 4 asist",    note:"Alanyaspor formasıyla 13 gol atarak ligin en flaş çıkışlarından birini yaptı.", color:"#f47b20" },
  { emoji:"👨‍💼", title:"Sezonun Teknik Dir.", winner:"Okan Buruk",          team:"Galatasaray",  detail:"3. Üst Üste Şampiyonluk", note:"Galatasaray'ı üst üste 3. kez şampiyonluğa taşıyarak Türk futbol tarihine geçti.", color:"#22c76e" }
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
