// ================================================================
// SÜPER LİG ATLASI — app.js
// ================================================================

// ── OYUNCU VERİSİ ──────────────────────────────────────────────
const players = [
  // === GALATASARAY ===
  {
    name: "Victor Osimhen", team: "Galatasaray", position: "Forvet", age: 27,
    marketValue: 75, goals: 15, assists: 5, minutes: 2100, bigMatch: 90, form: 88,
    story: "Piyasa değeri çok yüksek ama skor, pres ve fiziksel baskı tarafında Galatasaray'a elit seviye etki veren forvet.",
    career: ["Wolfsburg", "Charleroi", "Lille", "Napoli", "Galatasaray"],
    strengths: ["Pres", "Derin koşu", "Bitiricilik"],
    profile: "Modern elit santrfor profili. Sadece gol atmaz; savunmayı zorlar, presi başlatır ve takım hücumunu fiziksel olarak yukarı taşır."
  },
  {
    name: "Mauro Icardi", team: "Galatasaray", position: "Forvet", age: 33,
    marketValue: 10, goals: 14, assists: 4, minutes: 2050, bigMatch: 87, form: 85,
    story: "Klasik bitirici rolüyle az alanda çok iş yapan, büyük anlarda skor tehdidi yüksek Galatasaray kaptanı.",
    career: ["Sampdoria", "Inter", "PSG", "Galatasaray"],
    strengths: ["Pozisyon alma", "Penaltı", "Tek vuruş"],
    profile: "Ceza sahasında az temasla maksimum sonuç almaya çalışan elit bitirici."
  },
  {
    name: "Baris Alper Yilmaz", team: "Galatasaray", position: "Kanat", age: 24,
    marketValue: 22, goals: 9, assists: 11, minutes: 2200, bigMatch: 86, form: 90,
    story: "Hem gol hem asist üretebilen, hızı ve yaratıcılığıyla Galatasaray'ın sol kanadında tehdit yaratan milli oyuncu.",
    career: ["Altay", "Galatasaray"],
    strengths: ["Hız", "Asist", "Dribbling"],
    profile: "Sol kanatta direktif ve yaratıcılığı birleştiren modern kanat profili. Milli takımın da vazgeçilmezi."
  },
  {
    name: "Ugurcan Cakir", team: "Galatasaray", position: "Kaleci", age: 30,
    marketValue: 15, goals: 0, assists: 0, minutes: 2900, bigMatch: 89, form: 87,
    story: "Büyük takim kalecisi etkisini temsil eden, büyük maçlarda tutarlı performansıyla öne çıkan profil.",
    career: ["1461 Trabzon", "Trabzonspor", "Galatasaray"],
    strengths: ["Liderlik", "Refleks", "Büyük maç"],
    profile: "Türkiye liginin en bilinen kaleci profillerinden. Büyük takim kalecisinde beklenti yüksek olduğu için deger/etki yorumu farklı ele alınmalı."
  },
  {
    name: "Gabriel Sara", team: "Galatasaray", position: "Orta saha", age: 26,
    marketValue: 28, goals: 7, assists: 9, minutes: 2350, bigMatch: 84, form: 88,
    story: "Yaratıcı pas, top taşıma ve büyük maç katkısıyla Galatasaray'ın orta sahasını yöneten kilit isim.",
    career: ["Gremio", "Norwich", "Galatasaray"],
    strengths: ["Pas kalitesi", "Top taşıma", "Yaratıcılık"],
    profile: "Orta saha organize ederek hücum yaratan modern 8 numarası profili."
  },
  {
    name: "Ilkay Gundogan", team: "Galatasaray", position: "Orta saha", age: 35,
    marketValue: 12, goals: 5, assists: 8, minutes: 2100, bigMatch: 88, form: 84,
    story: "Kariyer tecrübesi ve oyun zekasıyla Galatasaray'a liderlik eden, büyük kulüplerde oynamış dünya yıldızı.",
    career: ["Dortmund", "Man City", "Barcelona", "Galatasaray"],
    strengths: ["Oyun zekası", "Pas", "Liderlik"],
    profile: "Orta sahada topu dağıtan, ritmi ayarlayan klasik 10 numarası. Tecrübesi takıma değer katar."
  },

  // === FENERBAHÇE ===
  {
    name: "Talisca", team: "Fenerbahce", position: "Orta saha", age: 32,
    marketValue: 13, goals: 19, assists: 4, minutes: 2300, bigMatch: 88, form: 89,
    story: "Skor tehdidi yüksek, ceza sahası dışı şut ve duran top etkisiyle Fenerbahçe'nin en net hücum silahlarından.",
    career: ["Bahia", "Benfica", "Besiktas", "Guangzhou", "Al Nassr", "Fenerbahce"],
    strengths: ["Şut", "Duran top", "Skor katkısı"],
    profile: "Klasik on numara ile ikinci forvet arasında oynayabilen, uzaktan şut ve duran toplarla maçın dengesini değiştiren oyuncu."
  },
  {
    name: "Marco Asensio", team: "Fenerbahce", position: "Orta saha", age: 30,
    marketValue: 18, goals: 11, assists: 12, minutes: 2350, bigMatch: 85, form: 87,
    story: "Gol ve asist dengesini birlikte taşıyan, değeri yüksek ama toplam hücum katkısı da çok güçlü profil.",
    career: ["Mallorca", "Real Madrid", "PSG", "Aston Villa", "Fenerbahce"],
    strengths: ["Şut", "Pas kalitesi", "Tecrübe"],
    profile: "Teknik kalite ve son pas tehdidiyle oynayan sol ayaklı hücum oyuncusu."
  },
  {
    name: "Dorgeles Nene", team: "Fenerbahce", position: "Kanat", age: 23,
    marketValue: 18, goals: 11, assists: 5, minutes: 1900, bigMatch: 86, form: 89,
    story: "Hat-trick etkisiyle öne çıkan, hız ve skor tehdidiyle Fenerbahçe'nin patlama potansiyeli yüksek kanadı.",
    career: ["Salzburg", "Westerlo", "Fenerbahce"],
    strengths: ["Hız", "Bire bir", "Patlama"],
    profile: "Genç, hızlı ve direkt oynayan kanat profili. Form yakaladığında maçı bir anda açabilen oyuncu tiplerinden."
  },
  {
    name: "Edson Alvarez", team: "Fenerbahce", position: "Orta saha", age: 28,
    marketValue: 30, goals: 3, assists: 6, minutes: 2400, bigMatch: 83, form: 86,
    story: "Savunma organizasyonu ve top kapma kalitesiyle Fenerbahçe'nin orta sahasının güvenlik duvarı.",
    career: ["Club America", "Ajax", "West Ham", "Fenerbahce"],
    strengths: ["Top kapma", "Savunma", "Fizik"],
    profile: "Defensive midfield rolünde pres ve top kapmayla alanı kapatan Meksika milli takımının kilit ismi."
  },
  {
    name: "Caglar Soyuncu", team: "Fenerbahce", position: "Defans", age: 29,
    marketValue: 14, goals: 1, assists: 2, minutes: 2600, bigMatch: 82, form: 85,
    story: "Defans liderliği ve havada üstünlüğüyle Fenerbahçe'nin savunma organizasyonunun temel taşı.",
    career: ["Altinordu", "Freiburg", "Leicester", "Atletico Madrid", "Fenerbahce"],
    strengths: ["Hava topu", "Liderlik", "Pozisyon"],
    profile: "Modern stoper profili. Topla çıkış yapabilen, savunmayı organize eden, büyük maçlarda istikrarlı profil."
  },

  // === BEŞİKTAŞ ===
  {
    name: "Orkun Kokcu", team: "Besiktas", position: "Orta saha", age: 25,
    marketValue: 30, goals: 8, assists: 10, minutes: 2200, bigMatch: 87, form: 88,
    story: "Teknik kalitesi ve geniş vizyon sahibi oyun anlayışıyla Beşiktaş'ın yeni nesil orta saha yıldızı.",
    career: ["Feyenoord", "Benfica", "Besiktas"],
    strengths: ["Pas", "Vizyon", "Top kontrolü"],
    profile: "Orta sahadan oyunu yönetebilen, son pas ve şutla hücuma katkı veren modern orta saha profili."
  },
  {
    name: "Rafa Silva", team: "Besiktas", position: "Orta saha", age: 32,
    marketValue: 8, goals: 10, assists: 8, minutes: 2050, bigMatch: 84, form: 86,
    story: "Deneyimi ve tekniğiyle Beşiktaş'ın hücum organizasyonuna farklı boyut katan Portekizli oyun kurucu.",
    career: ["Estoril", "Braga", "Benfica", "Besiktas"],
    strengths: ["Teknik", "Yaratıcılık", "Son pas"],
    profile: "Dar alanlarda top kaybetmeyen, hücum başlatma konusunda yetenekli, deneyimli orta saha."
  },
  {
    name: "Tammy Abraham", team: "Besiktas", position: "Forvet", age: 28,
    marketValue: 22, goals: 12, assists: 4, minutes: 2100, bigMatch: 83, form: 84,
    story: "Fiziksel üstünlüğü ve ceza sahasındaki akıllı hareketleriyle Beşiktaş'ın hücum eksenini taşıyan santrfor.",
    career: ["Chelsea", "Swansea", "Aston Villa", "Leeds", "Roma", "Besiktas"],
    strengths: ["Fizik", "Ceza sahası", "Havada güç"],
    profile: "Büyük ve güçlü yapısıyla ceza sahasında fark yaratan klasik santrfor. Besiktas için hem gol hem de ekran oyuncusu."
  },
  {
    name: "Wilfred Ndidi", team: "Besiktas", position: "Orta saha", age: 29,
    marketValue: 12, goals: 2, assists: 4, minutes: 2450, bigMatch: 84, form: 85,
    story: "Savunma katkısı ve güçlü fizikiyle Beşiktaş'ın orta sahasında kontrol ve istikrar sağlayan motor.",
    career: ["Nath. Star", "Genk", "Leicester", "Besiktas"],
    strengths: ["Savunma", "Fizik", "Istikrar"],
    profile: "Defensive midfield rolünde alan kaplayan, presi başlatan Nijeryalı motor oyuncu."
  },

  // === TRABZONSPOR ===
  {
    name: "Paul Onuachu", team: "Trabzonspor", position: "Forvet", age: 31,
    marketValue: 12, goals: 22, assists: 2, minutes: 2500, bigMatch: 91, form: 93,
    story: "Lig gol krallığı seviyesine çıkan, hava gücü ve ceza sahası bitiriciliğiyle sezonun en büyük etkilerinden biri.",
    career: ["Midtjylland", "Genk", "Southampton", "Trabzonspor"],
    strengths: ["Hava topları", "Ceza sahası", "Bitiricilik"],
    profile: "Uzun boyu ve fizik gücüyle ceza sahasında fark yaratan klasik santrfor. Trabzonspor için sadece gol değil, rakip savunmayı geri iten bir oyun merkezi."
  },
  {
    name: "Felipe Augusto", team: "Trabzonspor", position: "Forvet", age: 22,
    marketValue: 3.5, goals: 13, assists: 2, minutes: 2250, bigMatch: 84, form: 88,
    story: "Trabzonspor'un skor dağılımını güçlendiren, yaşı ve maliyetiyle scout radarında durması gereken hücumcu.",
    career: ["Corinthians", "Cercle Brugge", "Trabzonspor"],
    strengths: ["Potansiyel", "Ceza sahası", "Hareketlilik"],
    profile: "Yaşı ve skor katkısı bir araya geldiğinde scout radarına giren profillerden."
  },
  {
    name: "Ernest Muci", team: "Trabzonspor", position: "Orta saha", age: 25,
    marketValue: 9, goals: 10, assists: 4, minutes: 2100, bigMatch: 88, form: 90,
    story: "Büyük maçlarda skor üreten, orta saha/hücum arası rolde Trabzonspor'a farklı bir bitiricilik katan oyuncu.",
    career: ["Tirana", "Legia Warsaw", "Besiktas", "Trabzonspor"],
    strengths: ["Şut", "Yaratıcılık", "Büyük maç"],
    profile: "Hücum orta saha ve kanat rollerine kayabilen, skor tehdidiyle klasik pasör orta sahadan ayrılan dinamik profil."
  },
  {
    name: "Okay Yokuslu", team: "Trabzonspor", position: "Orta saha", age: 31,
    marketValue: 6, goals: 2, assists: 5, minutes: 2600, bigMatch: 82, form: 84,
    story: "Tecrübesi ve savunma katkısıyla Trabzonspor'un orta sahasında denge ve istikrar sağlayan milli isim.",
    career: ["Trabzonspor", "Celta Vigo", "WBA", "Crystal Palace", "Trabzonspor"],
    strengths: ["Savunma", "Tecrübe", "Pas"],
    profile: "Orta sahada savunma-hücum dengesini kuran, topu doğru dağıtan milli kalibrede oyuncu."
  },

  // === BAŞAKŞEHİR ===
  {
    name: "Eldor Shomurodov", team: "Basaksehir", position: "Forvet", age: 31,
    marketValue: 8, goals: 22, assists: 5, minutes: 2450, bigMatch: 86, form: 91,
    story: "Başakşehir'in skor yükünü taşıyan, gol katkısı ve istikrarıyla değer/etki listesinde yukarı tırmanan santrfor.",
    career: ["Bunyodkor", "Rostov", "Genoa", "Roma", "Basaksehir"],
    strengths: ["Koşular", "Skor sezgisi", "Fizik"],
    profile: "Ceza sahasına doğru zamanlama ile giren, takım oyunu içinde skor tehdidi yaratan hareketli forvet profili."
  },
  {
    name: "Muhammed Sengezer", team: "Basaksehir", position: "Kaleci", age: 29,
    marketValue: 2.5, goals: 0, assists: 0, minutes: 2850, bigMatch: 83, form: 88,
    story: "Başakşehir savunma performansının merkezindeki kaleci; clean sheet katkısı onu radar listesinde tutuyor.",
    career: ["Bursaspor", "Basaksehir", "Adana Demirspor", "Basaksehir"],
    strengths: ["Refleks", "Pozisyon", "İstikrar"],
    profile: "Savunma istikrarının merkezinde duran kaleci. Değer/etki modelinde kaleci rolü için ayrı ağırlıklar kullanılmasını destekliyor."
  },

  // === GÖZTEPE ===
  {
    name: "Juan", team: "Goztepe", position: "Kanat", age: 23,
    marketValue: 2.2, goals: 11, assists: 2, minutes: 1950, bigMatch: 79, form: 84,
    story: "Göztepe tarafında skor katkısı veren, büyük bütçeli olmayan takımdan değer/katkı listesine giren hücumcu.",
    career: ["Gremio", "Santos", "Goztepe"],
    strengths: ["Skor katkısı", "Hareketlilik", "Fırsatçılık"],
    profile: "Büyük takım dışından gelen skor katkısı projeye hikâye katar. Juan gibi oyuncular değer/katkı listelerinin en eğlenceli tarafını oluşturur."
  },
  {
    name: "Mateusz Lis", team: "Goztepe", position: "Kaleci", age: 29,
    marketValue: 2, goals: 0, assists: 0, minutes: 3000, bigMatch: 86, form: 92,
    story: "Clean sheet listesinde zirveye oynayan, kaleci etkisini değer/katkı modeline dahil etmemiz gerektiğini gösteren isim.",
    career: ["Lech Poznan", "Southampton", "Troyes", "Goztepe"],
    strengths: ["Refleks", "Clean sheet", "Konsantrasyon"],
    profile: "Kaleciler için gol/asist modeli yetmez. Lis, kurtarış ve clean sheet etkisini ayrı puanlamamız gerektiğini gösteren iyi bir örnek."
  },

  // === GAZİANTEP ===
  {
    name: "Mohamed Bayo", team: "Gaziantep", position: "Forvet", age: 28,
    marketValue: 4, goals: 15, assists: 3, minutes: 2200, bigMatch: 82, form: 86,
    story: "Büyük takım dışından gelip gol listesine giren, değerine göre ciddi skor etkisi üreten forvet profili.",
    career: ["Clermont", "Lille", "Le Havre", "Watford", "Gaziantep"],
    strengths: ["Bitiricilik", "Pozisyon alma", "Fizik"],
    profile: "Büyük takım dışında skor üreten forvetler bu projenin en değerli hikâyesi."
  },
  {
    name: "Ruslan Malinovskyi", team: "Gaziantep", position: "Orta saha", age: 32,
    marketValue: 8, goals: 7, assists: 9, minutes: 2300, bigMatch: 83, form: 85,
    story: "Avrupa tecrübesi ve uzun menzilli şutlarıyla Gaziantep'e üst düzey orta saha kalitesi katan Ukraynalı.",
    career: ["Shakhtar", "Genk", "Atalanta", "Marseille", "Gaziantep"],
    strengths: ["Uzak şut", "Pas", "Tecrübe"],
    profile: "Avrupa sahnesinde kanıtlanmış kalitesiyle değerine göre oldukça yüksek etki üreten orta saha profili."
  },

  // === ALANYASPOR ===
  {
    name: "Ertugrul Taskiran", team: "Alanyaspor", position: "Kaleci", age: 26,
    marketValue: 3, goals: 0, assists: 0, minutes: 3200, bigMatch: 84, form: 87,
    story: "Alanyaspor'un genç kalecisi; clean sheet oranı ve büyük maç direnciyle değer/katkı listesine giriyor.",
    career: ["Alanyaspor"],
    strengths: ["Refleks", "Genç profil", "Büyük maç"],
    profile: "Türk kaleci yetenekleri arasında potansiyeli yüksek, istikrarlı sezon geçiren gelişen profil."
  },
  {
    name: "Yunus Emre Erdogan", team: "Alanyaspor", position: "Orta saha", age: 24,
    marketValue: 3.5, goals: 6, assists: 8, minutes: 2400, bigMatch: 80, form: 83,
    story: "Alanyaspor'un yaratıcı orta saha oyuncusu; genç yaşına rağmen organize edici kalitesiyle öne çıkıyor.",
    career: ["Alanyaspor"],
    strengths: ["Yaratıcılık", "Pas", "Potansiyel"],
    profile: "Genç ve değeri düşük ama etki skoru yüksek profil. Scout radarına girmesi çok kısa sürer."
  },
  {
    name: "Efkan Bektas", team: "Alanyaspor", position: "Forvet", age: 22,
    marketValue: 2.5, goals: 10, assists: 3, minutes: 2000, bigMatch: 78, form: 82,
    story: "Alanyaspor'un gençliğine rağmen çift haneli gol barajını aşan, potansiyeliyle göz dolduran hücumcusu.",
    career: ["Alanyaspor"],
    strengths: ["Bitiricilik", "Potansiyel", "Hız"],
    profile: "Çok genç, maliyeti düşük ama gol sayısı yüksek. Scout modeli için mükemmel örnek."
  },

  // === ANTALYASPOR ===
  {
    name: "Oguzhan Ozyakup", team: "Antalyaspor", position: "Orta saha", age: 33,
    marketValue: 2.5, goals: 3, assists: 7, minutes: 2200, bigMatch: 79, form: 80,
    story: "Avrupa tecrübesiyle Antalyaspor'a oyun kalitesi katan, asist ve pas organizasyonuyla değer yaratan milli isim.",
    career: ["Besiktas", "Arsenal", "Besiktas", "Antalyaspor"],
    strengths: ["Pas", "Tecrübe", "Oyun zekası"],
    profile: "Kariyer birikimi olan tecrübeli orta saha. Değeri çok düşük ama organizasyon katkısı hâlâ yüksek."
  },
  {
    name: "Mario Balotelli", team: "Antalyaspor", position: "Forvet", age: 35,
    marketValue: 1.5, goals: 8, assists: 2, minutes: 1800, bigMatch: 74, form: 76,
    story: "Kariyerinin sonuna doğru Antalya'da oynayan eski dünya yıldızı; büyük maç deneyimi ve imzası hâlâ var.",
    career: ["Inter", "Man City", "Liverpool", "AC Milan", "Nice", "Marseille", "Antalyaspor"],
    strengths: ["Tecrübe", "Gol sezgisi", "Büyük maç"],
    profile: "Eskiden şov yapan, şimdi deneyimiyle takıma katkı sağlamaya çalışan kariyer sonu profil."
  },

  // === KAYSERISPOR ===
  {
    name: "Bilal Bayazit", team: "Kayserispor", position: "Kaleci", age: 27,
    marketValue: 1.8, goals: 0, assists: 0, minutes: 3000, bigMatch: 81, form: 83,
    story: "Küçük bütçeli takımın kalecisi olarak clean sheet listesinde yer bulan, maliyetiyle değer yaratan profil.",
    career: ["Kayserispor"],
    strengths: ["Refleks", "Istikrar", "Clean sheet"],
    profile: "Düşük piyasa değeriyle yüksek dakika oynayan kaleci. Değer/katkı modelinde öne çıkıyor."
  },
  {
    name: "Kouadio Kone", team: "Kayserispor", position: "Orta saha", age: 24,
    marketValue: 5, goals: 5, assists: 6, minutes: 2100, bigMatch: 80, form: 82,
    story: "Fransa'dan gelen genç orta saha, fizik gücü ve koşusuyla Kayserispor'da kalibreyi yükseltiyor.",
    career: ["Toulouse", "Borussia Monchengladbach", "Kayserispor"],
    strengths: ["Fizik", "Koşu", "Savunma"],
    profile: "Genç ve potansiyeli yüksek, Avrupa tecrübesiyle Kayserispor'da fark yaratan kasa orta saha."
  },

  // === SAMSUNSPOR ===
  {
    name: "Okan Kocuk", team: "Samsunspor", position: "Kaleci", age: 25,
    marketValue: 2, goals: 0, assists: 0, minutes: 3100, bigMatch: 82, form: 84,
    story: "Samsunspor'un net kurtarış oranı en yüksek kalecilerinden; büyük maçlarda öne çıkıyor.",
    career: ["Besiktas", "Samsunspor"],
    strengths: ["Kurtarış", "Refleks", "Büyük maç"],
    profile: "Genç ve Beşiktaş altyapısı çıkışlı. Net kurtarış oranıyla üst lig kalecilerine fark atıyor."
  },
  {
    name: "Ivohas Seka", team: "Samsunspor", position: "Forvet", age: 26,
    marketValue: 3.5, goals: 12, assists: 4, minutes: 2100, bigMatch: 79, form: 83,
    story: "Samsunspor'un gol yükünü taşıyan, büyük bütçe olmadan çift haneli gol üreten hücumcu.",
    career: ["Guimaraes", "Samsunspor"],
    strengths: ["Bitiricilik", "Fizik", "Skor sezgisi"],
    profile: "Piyasa değeri düşük ama gol sayısı yüksek. Değer/katkı analizinin en güzel örneklerinden."
  },

  // === KONYASPOR ===
  {
    name: "Olarenwaju Kayode", team: "Konyaspor", position: "Forvet", age: 31,
    marketValue: 2, goals: 9, assists: 3, minutes: 2000, bigMatch: 77, form: 79,
    story: "Konyaspor'un skor üretiminde güvendiği, değerine göre gol katkısı yüksek deneyimli hücumcu.",
    career: ["Austria Vienna", "Grasshopper", "Shakhtar", "Basaksehir", "Konyaspor"],
    strengths: ["Bitiricilik", "Tecrübe", "Fizik"],
    profile: "Değeri düşük ama gol üretimi tutarlı. Küçük bütçeli takımların değer/katkı analizini açıklayan profil."
  },
  {
    name: "Soner Aydogdu", team: "Konyaspor", position: "Orta saha", age: 28,
    marketValue: 1.5, goals: 4, assists: 7, minutes: 2300, bigMatch: 76, form: 80,
    story: "Konyaspor'un yaratıcı orta sahası; asist ve pas organizasyonuyla takımın oyununu yönlendiriyor.",
    career: ["Konyaspor"],
    strengths: ["Asist", "Pas", "Organizasyon"],
    profile: "Yerli oyuncu olarak düşük maliyetle yüksek organizasyon katkısı sağlayan değerli profil."
  },

  // === RİZESPOR ===
  {
    name: "Yahia Fofana", team: "Rizespor", position: "Kaleci", age: 30,
    marketValue: 2.5, goals: 0, assists: 0, minutes: 3000, bigMatch: 83, form: 85,
    story: "Rizespor'un deneyimli kalecisi; büyük maçlarda kurtarışları ve clean sheet katkısıyla değer yaratıyor.",
    career: ["Angers", "Rizespor"],
    strengths: ["Deneyim", "Kurtarış", "Clean sheet"],
    profile: "Fransa birinci liginden gelen deneyimli kaleci. Değerine göre büyük katkı veriyor."
  },
  {
    name: "Clinton Njie", team: "Rizespor", position: "Kanat", age: 31,
    marketValue: 1.8, goals: 8, assists: 5, minutes: 2100, bigMatch: 78, form: 80,
    story: "Eski Tottenham oyuncusu, Rizespor'da deneyimiyle kanat hattına kalite katıyor.",
    career: ["Lyon", "Marseille", "Tottenham", "Fenerbahce", "Rizespor"],
    strengths: ["Hız", "Teknik", "Tecrübe"],
    profile: "Büyük Avrupa deneyimine sahip ama küçük takımda oynayan değeri düşük profil. Katkısı beklentinin üzerinde."
  },

  // === KOCAELİSPOR ===
  {
    name: "Aleksandar Jovanovic", team: "Kocaelispor", position: "Kaleci", age: 28,
    marketValue: 1.5, goals: 0, assists: 0, minutes: 2900, bigMatch: 81, form: 82,
    story: "Kocaelispor'un güvenlik duvarı; clean sheet oranıyla küme düşme mücadelesinde kritik rol üstleniyor.",
    career: ["Vojvodina", "Kocaelispor"],
    strengths: ["Refleks", "Istikrar", "Hava topu"],
    profile: "Küçük bütçeli takımda yüksek performans. Değer/katkı modelinin serüveni için mükemmel örnek."
  },
  {
    name: "Yusuf Erdogan", team: "Kocaelispor", position: "Orta saha", age: 26,
    marketValue: 1.8, goals: 5, assists: 7, minutes: 2400, bigMatch: 78, form: 81,
    story: "Kocaelispor'un yaratıcı orta sahası; asist sayısıyla takımın oyununu ayakta tutan motor.",
    career: ["Kocaelispor"],
    strengths: ["Asist", "Pas", "Dayanıklılık"],
    profile: "Yerli ve ucuz ama organizasyon katkısı çok yüksek. Değer/katkı analizi bu oyuncuyu seviyor."
  },

  // === EYÜPSPOR ===
  {
    name: "Bertug Yildirim", team: "Eyupspor", position: "Forvet", age: 23,
    marketValue: 3, goals: 10, assists: 3, minutes: 2100, bigMatch: 80, form: 84,
    story: "Eyüpspor'un genç hücumcusu; gol sayısıyla değerinin üzerinde etki üreten scout radarı profili.",
    career: ["Eyupspor"],
    strengths: ["Bitiricilik", "Potansiyel", "Hız"],
    profile: "Genç ve ucuz ama gol üretimi tutarlı. Süper Lig'in en iyi değer/katkı profillerinden."
  },
  {
    name: "Berkay Ozcan", team: "Eyupspor", position: "Orta saha", age: 27,
    marketValue: 4, goals: 4, assists: 9, minutes: 2500, bigMatch: 81, form: 83,
    story: "Almanya tecrübesiyle Eyüpspor'da liderlik eden, asist ve pas kalitesiyle fark yaratan yaratıcı oyuncu.",
    career: ["Stuttgart", "Greuther Furth", "Bochum", "Eyupspor"],
    strengths: ["Asist", "Liderlik", "Pas kalitesi"],
    profile: "Almanya 1. Lig tecrübesi olan değerinin altında oynayan orta saha profili."
  },

  // === KASIMDAŞA ===
  {
    name: "Andreas Gianniotis", team: "Kasimpasa", position: "Kaleci", age: 32,
    marketValue: 1.2, goals: 0, assists: 0, minutes: 3200, bigMatch: 82, form: 81,
    story: "Kasımpaşa'nın deneyimli kalecisi; büyük maçlarda sergilediği performansla takımını sırtlayan profil.",
    career: ["Panathinaikos", "Kasimpasa"],
    strengths: ["Deneyim", "Kurtarış", "Liderlik"],
    profile: "Uzun kariyer deneyimiyle savunmayı organize eden, büyük maçlarda güvenilir kaleci."
  },
  {
    name: "Emmanuel Adebayor", team: "Kasimpasa", position: "Forvet", age: 40,
    marketValue: 0.5, goals: 4, assists: 2, minutes: 1400, bigMatch: 72, form: 68,
    story: "Kariyer sonu döneminde Kasımpaşa'da top koşturan eski Arsenal ve Real Madrid yıldızı.",
    career: ["Arsenal", "Real Madrid", "Man City", "Tottenham", "Kasimpasa"],
    strengths: ["Tecrübe", "Büyük maç", "Liderlik"],
    profile: "Premier Lig ve Şampiyonlar Ligi kökenli isim. Değeri sembolik ama kariyerdeki iz bırakma payı büyük."
  },

  // === GENÇLERBİRLİĞİ ===
  {
    name: "Emre Mor", team: "Genclerbirligi", position: "Kanat", age: 28,
    marketValue: 3, goals: 7, assists: 8, minutes: 1900, bigMatch: 80, form: 82,
    story: "Dortmund geçmişiyle gelen, hız ve tekniğiyle Gençlerbirliği'nin en tehlikeli hücum silahı.",
    career: ["Nordsjaelland", "Dortmund", "Celta Vigo", "Galatasaray", "Genclerbirligi"],
    strengths: ["Hız", "Dribbling", "Yaratıcılık"],
    profile: "Dortmund tecrübesi olan ama potansiyelini hiç tam gösteremeyen oyuncu. Şu an değerinin üzerinde etki üretiyor."
  },
  {
    name: "Gokhan Inler", team: "Genclerbirligi", position: "Orta saha", age: 40,
    marketValue: 0.3, goals: 1, assists: 4, minutes: 1600, bigMatch: 71, form: 70,
    story: "İsviçre milli takımının eski kaptanı, kariyerinin sonunda Gençlerbirliği forması giyen efsane.",
    career: ["Napoli", "Leicester", "Besiktas", "Genclerbirligi"],
    strengths: ["Organizasyon", "Tecrübe", "Pas"],
    profile: "Kariyer sonu döneminde sembolik değer taşıyan, deneyimiyle yeni kuşağa katkı sağlamaya çalışan isim."
  },

  // === FATİH KARAGÜMRÜK ===
  {
    name: "Ivo Grbic", team: "Fatih Karagumruk", position: "Kaleci", age: 29,
    marketValue: 3, goals: 0, assists: 0, minutes: 2800, bigMatch: 83, form: 85,
    story: "Atletico Madrid geçmişiyle Karagümrük'ün en değerli oyuncusu; büyük maçlarda kalenin kilit noktası.",
    career: ["Atletico Madrid", "Lille", "Fatih Karagumruk"],
    strengths: ["Kurtarış", "Büyük maç", "Deneyim"],
    profile: "Atletico Madrid kalecisi olmak için katı bir rakabet ortamındaydı. Karagümrük'te özgüven kazanıyor."
  },
  {
    name: "Kenan Karaman", team: "Fatih Karagumruk", position: "Forvet", age: 31,
    marketValue: 4, goals: 9, assists: 6, minutes: 2200, bigMatch: 81, form: 83,
    story: "Alman Bundesliga tecrübesiyle gelen, hem gol hem asistini dengeleyen değer yaratan forvet.",
    career: ["Hannover", "Dusseldorf", "Besiktas", "Fatih Karagumruk"],
    strengths: ["Gol", "Asist", "Deneyim"],
    profile: "Bundesliga tecrübeli Türk forvet. Değerine göre yüksek etki üreten scout radarı profili."
  }
];

// ── TAKIM TEMELERİ ─────────────────────────────────────────────
const teamThemes = [
  { name: "Lig teması", primary: "#22c76e", secondary: "#f0a830", accent: "#e8604a", dark: "#0c1410" },
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

// ── KADROLAR ──────────────────────────────────────────────────
const teamSquads = {
  Alanyaspor: [
    { name: "Ertugrul Taskiran", position: "Kaleci", note: "Clean sheet listesi" },
    { name: "Efkan Bektas", position: "Forvet", note: "Gol listesi" },
    { name: "Yunus Emre Erdogan", position: "Orta saha", note: "Yaratıcı orta saha" },
    { name: "Takim veri seti", position: "Güncellenecek", note: "Kadro derinleştirme sırasında eklenecek" }
  ],
  Antalyaspor: [
    { name: "Mario Balotelli", position: "Forvet", note: "Efsane" },
    { name: "Oguzhan Ozyakup", position: "Orta saha", note: "Kaptan" },
    { name: "Takim veri seti", position: "Güncellenecek", note: "Oyuncular doğrulanıp eklenecek" }
  ],
  Basaksehir: [
    { name: "Muhammed Sengezer", position: "Kaleci", note: "Clean sheet listesi" },
    { name: "Eldor Shomurodov", position: "Forvet", note: "Gol krallığı listesi" },
    { name: "Takim veri seti", position: "Güncellenecek", note: "Kadro derinleştirme sırasında eklenecek" }
  ],
  Besiktas: [
    { name: "Mert Gunok", position: "Kaleci", note: "Sezon kadrosu" },
    { name: "Ersin Destanoglu", position: "Kaleci", note: "Sezon kadrosu" },
    { name: "Jonas Svensson", position: "Defans", note: "Sağ bek" },
    { name: "Gabriel Paulista", position: "Defans", note: "Stoper" },
    { name: "David Jurasek", position: "Defans", note: "Sol bek" },
    { name: "Wilfred Ndidi", position: "Orta saha", note: "Ön libero" },
    { name: "Orkun Kokcu", position: "Orta saha", note: "Merkez" },
    { name: "Rafa Silva", position: "Orta saha", note: "Hücum orta saha" },
    { name: "Al-Musrati", position: "Orta saha", note: "Ön libero" },
    { name: "Tammy Abraham", position: "Forvet", note: "Santrfor" },
    { name: "Jota Silva", position: "Forvet", note: "Hücum" },
    { name: "Joao Mario", position: "Orta saha", note: "Transfer listesi" },
    { name: "Vaclav Cerny", position: "Orta saha", note: "Transfer listesi" }
  ],
  Eyupspor: [
    { name: "Bertug Yildirim", position: "Forvet", note: "Gol listesi" },
    { name: "Berkay Ozcan", position: "Orta saha", note: "Kaptan / yaratıcı" },
    { name: "Takim veri seti", position: "Güncellenecek", note: "Oyuncular doğrulanıp eklenecek" }
  ],
  "Fatih Karagumruk": [
    { name: "Ivo Grbic", position: "Kaleci", note: "Clean sheet listesi" },
    { name: "Kenan Karaman", position: "Forvet", note: "Gol + asist" },
    { name: "Takim veri seti", position: "Güncellenecek", note: "Kadro derinleştirme sırasında eklenecek" }
  ],
  Fenerbahce: [
    { name: "Ederson", position: "Kaleci", note: "A Takım" },
    { name: "Archie Brown", position: "Defans", note: "Sol bek" },
    { name: "Caglar Soyuncu", position: "Defans", note: "Stoper" },
    { name: "Mert Muldur", position: "Defans", note: "Sağ bek" },
    { name: "Milan Skriniar", position: "Defans", note: "Stoper" },
    { name: "Ismail Yuksek", position: "Orta saha", note: "Merkez" },
    { name: "Edson Alvarez", position: "Orta saha", note: "Ön libero" },
    { name: "Marco Asensio", position: "Orta saha", note: "Hücum orta saha" },
    { name: "Talisca", position: "Orta saha", note: "Hücum" },
    { name: "Kerem Akturkoglu", position: "Forvet", note: "Kanat" },
    { name: "Dorgeles Nene", position: "Forvet", note: "Kanat" }
  ],
  Galatasaray: [
    { name: "Ugurcan Cakir", position: "Kaleci", note: "A Takım" },
    { name: "Davinson Sanchez", position: "Defans", note: "Stoper" },
    { name: "Abdulkerim Bardakci", position: "Defans", note: "Stoper" },
    { name: "Kaan Ayhan", position: "Defans", note: "Stoper / sağ bek" },
    { name: "Ismail Jakobs", position: "Defans", note: "Sol bek" },
    { name: "Wilfried Singo", position: "Defans", note: "Sağ bek" },
    { name: "Lucas Torreira", position: "Orta saha", note: "Ön libero" },
    { name: "Gabriel Sara", position: "Orta saha", note: "Merkez" },
    { name: "Ilkay Gundogan", position: "Orta saha", note: "Merkez" },
    { name: "Baris Alper Yilmaz", position: "Kanat", note: "Sol kanat" },
    { name: "Leroy Sane", position: "Kanat", note: "Sağ kanat" },
    { name: "Mauro Icardi", position: "Forvet", note: "Santrfor" },
    { name: "Victor Osimhen", position: "Forvet", note: "Santrfor" }
  ],
  Gaziantep: [
    { name: "Mohamed Bayo", position: "Forvet", note: "Gol krallığı listesi" },
    { name: "Ruslan Malinovskyi", position: "Orta saha", note: "Yaratıcı orta saha" },
    { name: "Takim veri seti", position: "Güncellenecek", note: "Kadro derinleştirme sırasında eklenecek" }
  ],
  Genclerbirligi: [
    { name: "Emre Mor", position: "Kanat", note: "Hücum" },
    { name: "Gokhan Inler", position: "Orta saha", note: "Efsane kaptan" },
    { name: "Takim veri seti", position: "Güncellenecek", note: "Oyuncular doğrulanıp eklenecek" }
  ],
  Goztepe: [
    { name: "Mateusz Lis", position: "Kaleci", note: "Clean sheet listesi" },
    { name: "Juan", position: "Forvet", note: "Gol krallığı listesi" },
    { name: "Takim veri seti", position: "Güncellenecek", note: "Kadro derinleştirme sırasında eklenecek" }
  ],
  Kasimpasa: [
    { name: "Andreas Gianniotis", position: "Kaleci", note: "Clean sheet listesi" },
    { name: "Emmanuel Adebayor", position: "Forvet", note: "Efsane" },
    { name: "Takim veri seti", position: "Güncellenecek", note: "Kadro derinleştirme sırasında eklenecek" }
  ],
  Kayserispor: [
    { name: "Bilal Bayazit", position: "Kaleci", note: "Clean sheet listesi" },
    { name: "Kouadio Kone", position: "Orta saha", note: "Orta saha" },
    { name: "Takim veri seti", position: "Güncellenecek", note: "Kadro derinleştirme sırasında eklenecek" }
  ],
  Kocaelispor: [
    { name: "Aleksandar Jovanovic", position: "Kaleci", note: "Clean sheet listesi" },
    { name: "Yusuf Erdogan", position: "Orta saha", note: "Motor oyuncu" },
    { name: "Takim veri seti", position: "Güncellenecek", note: "Kadro derinleştirme sırasında eklenecek" }
  ],
  Konyaspor: [
    { name: "Olarenwaju Kayode", position: "Forvet", note: "Gol listesi" },
    { name: "Soner Aydogdu", position: "Orta saha", note: "Yaratıcı" },
    { name: "Takim veri seti", position: "Güncellenecek", note: "Oyuncular doğrulanıp eklenecek" }
  ],
  Rizespor: [
    { name: "Yahia Fofana", position: "Kaleci", note: "Clean sheet listesi" },
    { name: "Clinton Njie", position: "Kanat", note: "Hücum" },
    { name: "Takim veri seti", position: "Güncellenecek", note: "Kadro derinleştirme sırasında eklenecek" }
  ],
  Samsunspor: [
    { name: "Okan Kocuk", position: "Kaleci", note: "Clean sheet listesi" },
    { name: "Ivohas Seka", position: "Forvet", note: "Gol listesi" },
    { name: "Takim veri seti", position: "Güncellenecek", note: "Kadro derinleştirme sırasında eklenecek" }
  ],
  Trabzonspor: [
    { name: "Ugurcan Cakir", position: "Kaleci", note: "Sezon kadrosu" },
    { name: "Stefan Savic", position: "Defans", note: "Stoper" },
    { name: "Rayyan Baniya", position: "Defans", note: "Stoper" },
    { name: "Okay Yokuslu", position: "Orta saha", note: "Merkez" },
    { name: "Ernest Muci", position: "Orta saha", note: "Hücum" },
    { name: "Edin Visca", position: "Orta saha", note: "Kanat" },
    { name: "Paul Onuachu", position: "Forvet", note: "Santrfor" },
    { name: "Felipe Augusto", position: "Forvet", note: "Forvet" }
  ]
};

// ── PUAN DURUMU 2024-25 ────────────────────────────────────────
const standings = [
  { team: "Galatasaray",      o: 38, g: 28, b: 5,  m: 5,  ag: 88, yg: 36, pts: 89, badge: "#a90432", zone: "champion" },
  { team: "Fenerbahce",       o: 38, g: 26, b: 7,  m: 5,  ag: 82, yg: 34, pts: 85, badge: "#003f8f", zone: "ucl" },
  { team: "Besiktas",         o: 38, g: 20, b: 8,  m: 10, ag: 66, yg: 48, pts: 68, badge: "#111111", zone: "ucl" },
  { team: "Trabzonspor",      o: 38, g: 18, b: 9,  m: 11, ag: 65, yg: 50, pts: 63, badge: "#7a263a", zone: "uel" },
  { team: "Basaksehir",       o: 38, g: 17, b: 7,  m: 14, ag: 58, yg: 52, pts: 58, badge: "#f47b20", zone: "uel" },
  { team: "Goztepe",          o: 38, g: 16, b: 8,  m: 14, ag: 52, yg: 54, pts: 56, badge: "#d71920", zone: "" },
  { team: "Alanyaspor",       o: 38, g: 15, b: 9,  m: 14, ag: 50, yg: 51, pts: 54, badge: "#f47b20", zone: "" },
  { team: "Gaziantep",        o: 38, g: 14, b: 10, m: 14, ag: 49, yg: 56, pts: 52, badge: "#d71920", zone: "" },
  { team: "Kayserispor",      o: 38, g: 13, b: 11, m: 14, ag: 46, yg: 54, pts: 50, badge: "#d71920", zone: "" },
  { team: "Samsunspor",       o: 38, g: 13, b: 9,  m: 16, ag: 48, yg: 60, pts: 48, badge: "#d71920", zone: "" },
  { team: "Kasimpasa",        o: 38, g: 12, b: 10, m: 16, ag: 44, yg: 58, pts: 46, badge: "#174a9c", zone: "" },
  { team: "Konyaspor",        o: 38, g: 11, b: 11, m: 16, ag: 42, yg: 55, pts: 44, badge: "#159447", zone: "" },
  { team: "Eyupspor",         o: 38, g: 11, b: 10, m: 17, ag: 43, yg: 59, pts: 43, badge: "#5b2c83", zone: "" },
  { team: "Rizespor",         o: 38, g: 10, b: 11, m: 17, ag: 40, yg: 58, pts: 41, badge: "#007a3d", zone: "" },
  { team: "Antalyaspor",      o: 38, g: 10, b: 9,  m: 19, ag: 38, yg: 60, pts: 39, badge: "#d71920", zone: "" },
  { team: "Kocaelispor",      o: 38, g: 9,  b: 11, m: 18, ag: 36, yg: 62, pts: 38, badge: "#138a44", zone: "" },
  { team: "Fatih Karagumruk", o: 38, g: 7,  b: 9,  m: 22, ag: 32, yg: 72, pts: 30, badge: "#d71920", zone: "relegation" },
  { team: "Genclerbirligi",   o: 38, g: 6,  b: 9,  m: 23, ag: 30, yg: 75, pts: 27, badge: "#d71920", zone: "relegation" }
];

// ── ANKET VERİSİ ──────────────────────────────────────────────
const polls = [
  {
    id: "poll_week1",
    question: "Haftanın en iyi oyuncusu kim?",
    candidates: [
      { name: "Paul Onuachu",     team: "Trabzonspor" },
      { name: "Baris Alper Yilmaz", team: "Galatasaray" },
      { name: "Eldor Shomurodov", team: "Basaksehir" },
      { name: "Dorgeles Nene",    team: "Fenerbahce" }
    ]
  },
  {
    id: "poll_week2",
    question: "Sezonun scout keşfi kim?",
    candidates: [
      { name: "Felipe Augusto", team: "Trabzonspor" },
      { name: "Mohamed Bayo",   team: "Gaziantep" },
      { name: "Juan",           team: "Goztepe" },
      { name: "Efkan Bektas",   team: "Alanyaspor" }
    ]
  }
];

let currentPollIndex = 0;

// ── TAHMİN OYUNU VERİSİ ───────────────────────────────────────
const matchFixtures = [
  { home: "Galatasaray",  away: "Fenerbahce",  actualHome: 2, actualAway: 1 },
  { home: "Besiktas",     away: "Trabzonspor", actualHome: 1, actualAway: 1 },
  { home: "Basaksehir",   away: "Goztepe",     actualHome: 3, actualAway: 0 },
  { home: "Alanyaspor",   away: "Kayserispor", actualHome: 2, actualAway: 2 },
  { home: "Gaziantep",    away: "Samsunspor",  actualHome: 1, actualAway: 2 },
  { home: "Konyaspor",    away: "Eyupspor",    actualHome: 0, actualAway: 1 }
];

// ── MEVKI MODELLERİ ───────────────────────────────────────────
const positionModels = {
  Forvet: { goal: 8.5, assist: 4.2, minutes: 0.01, bigMatch: 0.42, form: 0.35, roleBonus: 8 },
  Kanat: { goal: 7, assist: 5.6, minutes: 0.011, bigMatch: 0.38, form: 0.42, roleBonus: 10 },
  "Orta saha": { goal: 5.8, assist: 6.8, minutes: 0.014, bigMatch: 0.34, form: 0.45, roleBonus: 14 },
  Defans: { goal: 4, assist: 4.4, minutes: 0.018, bigMatch: 0.48, form: 0.38, roleBonus: 34 },
  Kaleci: { goal: 0, assist: 2, minutes: 0.02, bigMatch: 0.62, form: 0.58, roleBonus: 48 }
};

// ── STATE ─────────────────────────────────────────────────────
const state = {
  search: "",
  position: "all",
  team: "all",
  sort: "valueScore",
  budgetOnly: false
};

// ── ENRİCHED PLAYERS ──────────────────────────────────────────
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
    ...player, impactScore, valueScore, scoutScore, surpriseScore,
    contribution: player.goals + player.assists,
    modelLabel: (positionModels[player.position] || positionModels["Orta saha"]).label || ""
  };
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
const pollOptions     = document.querySelector("#pollOptions");
const pollBadge       = document.querySelector("#pollBadge");
const pollNote        = document.querySelector("#pollNote");
const matchCards      = document.querySelector("#matchCards");
const submitPredictions = document.querySelector("#submitPredictions");
const resetPredictions  = document.querySelector("#resetPredictions");
const predictResult   = document.querySelector("#predictResult");
const userTotalScore  = document.querySelector("#userTotalScore");
const navHamburger    = document.querySelector("#navHamburger");
const navMobileMenu   = document.querySelector("#navMobileMenu");

// ── YARDIMCI FONKSİYONLAR ────────────────────────────────────
function formatValue(value) {
  return value >= 1 ? value.toFixed(1) + "M" : Math.round(value * 1000) + "K";
}

function getLabel(player) {
  if (player.valueScore > 900) return "Değer canavarı";
  if (player.scoutScore > 430) return "Scout radarı";
  if (player.bigMatch > 84)    return "Büyük maç";
  if (player.form > 86)        return "Formda";
  return "İstikrar";
}

function getFilteredPlayers() {
  return enrichedPlayers
    .filter((p) => {
      const text = `${p.name} ${p.team} ${p.position}`.toLowerCase();
      const matchesSearch   = text.includes(state.search.toLowerCase());
      const matchesPosition = state.position === "all" || p.position === state.position;
      const matchesTeam     = state.team === "all" || p.team === state.team;
      const matchesBudget   = !state.budgetOnly || p.marketValue < 2;
      return matchesSearch && matchesPosition && matchesTeam && matchesBudget;
    })
    .sort((a, b) => b[state.sort] - a[state.sort]);
}

function topBy(key) {
  return [...enrichedPlayers].sort((a, b) => b[key] - a[key])[0];
}

// ── RENDER: ÖZET ─────────────────────────────────────────────
function renderSummary() {
  const byImpact   = topBy("impactScore");
  const byValue    = topBy("valueScore");
  const byScout    = topBy("scoutScore");
  const byBigMatch = topBy("bigMatch");
  const hero       = topBy("surpriseScore");

  document.querySelector("#topImpact").textContent   = `${byImpact.name} (${byImpact.impactScore})`;
  document.querySelector("#topValue").textContent    = `${byValue.name} (${byValue.valueScore})`;
  document.querySelector("#topScout").textContent    = `${byScout.name} (${byScout.scoutScore})`;
  document.querySelector("#topBigMatch").textContent = `${byBigMatch.name} (${byBigMatch.bigMatch})`;
  document.querySelector("#heroPlayer").textContent  = hero.name;
  document.querySelector("#heroNote").textContent    = `${hero.team} · ${formatValue(hero.marketValue)} EUR · skor ${hero.surpriseScore}`;
}

// ── RENDER: LIDERBOARD ───────────────────────────────────────
function boardItem(player, index, scoreKey) {
  return `
    <div class="board-item">
      <span class="rank">${index + 1}</span>
      <div>
        <strong>${player.name}</strong>
        <span class="board-meta">${player.team} · ${player.position} · ${formatValue(player.marketValue)} EUR</span>
      </div>
      <span class="board-score">${player[scoreKey]}</span>
    </div>
  `;
}

function renderBoards() {
  valueBoard.innerHTML = [...enrichedPlayers]
    .sort((a, b) => b.valueScore - a.valueScore)
    .slice(0, 5)
    .map((p, i) => boardItem(p, i, "valueScore"))
    .join("");

  scoutBoard.innerHTML = [...enrichedPlayers]
    .filter((p) => p.marketValue < 2.5 && p.age <= 26)
    .sort((a, b) => b.scoutScore - a.scoutScore)
    .slice(0, 5)
    .map((p, i) => boardItem(p, i, "scoutScore"))
    .join("");
}

// ── RENDER: TEMA ─────────────────────────────────────────────
function applyTheme(theme) {
  const root = document.documentElement;
  root.style.setProperty("--theme-primary",   theme.primary);
  root.style.setProperty("--theme-secondary", theme.secondary);
  root.style.setProperty("--theme-accent",    theme.accent);
  root.style.setProperty("--theme-dark",      theme.dark);
  if (activeThemeName) activeThemeName.textContent = theme.name;
  document.querySelectorAll(".theme-button").forEach((btn) =>
    btn.classList.toggle("is-active", btn.dataset.theme === theme.name)
  );
}

function renderThemes() {
  themeBar.innerHTML = teamThemes.map((theme) => `
    <button class="theme-button" type="button" data-theme="${theme.name}"
      style="--swatch-a: ${theme.primary}; --swatch-b: ${theme.secondary};">
      <span class="theme-swatch"></span>
      ${theme.name}
    </button>
  `).join("");

  themeBar.addEventListener("click", (e) => {
    const btn = e.target.closest(".theme-button");
    if (!btn) return;
    const theme = teamThemes.find((t) => t.name === btn.dataset.theme);
    if (theme) applyTheme(theme);
  });

  applyTheme(teamThemes[0]);
}

// ── RENDER: KADRO ─────────────────────────────────────────────
function renderSquadTeams() {
  squadTeamSelect.innerHTML = teamThemes
    .filter((t) => t.name !== "Lig teması")
    .map((t) => `<option value="${t.name}">${t.name}</option>`)
    .join("");
  squadTeamSelect.value = "Galatasaray";
  renderSquad();
}

function renderSquad() {
  const teamName = squadTeamSelect.value;
  const squad    = teamSquads[teamName];
  const theme    = teamThemes.find((t) => t.name === teamName);
  if (theme) applyTheme(theme);

  if (!squad) {
    squadNote.textContent = `${teamName}: kadro henüz eklenmedi`;
    squadGrid.innerHTML = `<div class="squad-empty">${teamName} kadrosu henüz eklenmedi.</div>`;
    return;
  }

  squadNote.textContent = `${teamName}: ${squad.length} oyuncu eklendi`;
  squadGrid.innerHTML = squad.map((p) => `
    <article class="squad-card">
      <strong>${p.name}</strong>
      <span>${p.position} · ${p.note}</span>
    </article>
  `).join("");
}

// ── RENDER: PUAN DURUMU ───────────────────────────────────────
function renderStandings() {
  const zoneClass = { champion: "row-champion", ucl: "row-ucl", uel: "row-uel", relegation: "row-relegation" };
  standingsBody.innerHTML = standings.map((row, i) => `
    <tr class="${zoneClass[row.zone] || ""}">
      <td class="st-rank">${i + 1}</td>
      <td>
        <div class="st-team">
          <span class="st-badge" style="background:${row.badge};"></span>
          ${row.team}
        </div>
      </td>
      <td>${row.o}</td>
      <td>${row.g}</td>
      <td>${row.b}</td>
      <td>${row.m}</td>
      <td>${row.ag}</td>
      <td>${row.yg}</td>
      <td>${row.ag - row.yg >= 0 ? "+" : ""}${row.ag - row.yg}</td>
      <td class="st-pts">${row.pts}</td>
    </tr>
  `).join("");

  // Legend
  const standingsPanel = document.querySelector("#standings-section");
  if (!standingsPanel.querySelector(".standings-legend")) {
    const legend = document.createElement("div");
    legend.className = "standings-legend";
    legend.innerHTML = `
      <div class="legend-item"><span class="legend-dot" style="background:#f0a830;"></span>Şampiyon</div>
      <div class="legend-item"><span class="legend-dot" style="background:#22c76e;"></span>Şampiyonlar Ligi</div>
      <div class="legend-item"><span class="legend-dot" style="background:#2f8ab5;"></span>Avrupa Ligi</div>
      <div class="legend-item"><span class="legend-dot" style="background:#e8604a;"></span>Küme düşme</div>
    `;
    standingsPanel.appendChild(legend);
  }
}

// ── RENDER: OYUNCU KARTLARI ───────────────────────────────────
function renderPlayers() {
  const list = getFilteredPlayers();
  resultCount.textContent = `${list.length} oyuncu`;
  playerGrid.innerHTML = list.map((player) => {
    const meterWidth = Math.min(100, Math.round(player.valueScore / 10));
    return `
      <article class="player-card" data-player="${player.name}" tabindex="0"
        role="button" aria-label="${player.name} detayını aç">
        <div class="card-head">
          <div>
            <h3>${player.name}</h3>
            <p>${player.team} · ${player.position} · ${player.age} yaş</p>
          </div>
          <span class="tag">${getLabel(player)}</span>
        </div>
        <div class="stat-row">
          <div class="stat"><span>Piyasa Değeri</span><strong>${formatValue(player.marketValue)} €</strong></div>
          <div class="stat"><span>Etki Skoru</span><strong>${player.impactScore}</strong></div>
          <div class="stat"><span>Fiyat/Katkı</span><strong>${player.valueScore}</strong></div>
        </div>
        <div>
          <div class="meter" aria-label="Değer skoru">
            <span style="width: ${meterWidth}%"></span>
          </div>
        </div>
        <p class="story">${player.story}</p>
      </article>
    `;
  }).join("");
}

// ── RENDER: MODAL ─────────────────────────────────────────────
function openPlayerModal(playerName) {
  const player = enrichedPlayers.find((p) => p.name === playerName);
  if (!player) return;

  modalPlayerName.textContent = player.name;
  modalPlayerTeam.textContent = `${player.team} · ${player.position} · ${player.age} yaş`;
  modalPlayerTag.textContent  = getLabel(player);
  modalContent.innerHTML = `
    <div class="modal-stats">
      <div class="stat"><span>Piyasa Değeri</span><strong>${formatValue(player.marketValue)} €</strong></div>
      <div class="stat"><span>Gol + Asist</span><strong>${player.contribution}</strong></div>
      <div class="stat"><span>Etki Skoru</span><strong>${player.impactScore}</strong></div>
      <div class="stat"><span>Değer Skoru</span><strong>${player.valueScore}</strong></div>
    </div>
    <section class="modal-section">
      <h3>Kariyer özeti</h3>
      <p>${player.profile}</p>
    </section>
    <section class="modal-section">
      <h3>Kulüp geçmişi</h3>
      <div class="career-list">
        ${(player.career || [player.team]).map((c) => `<span class="career-chip">${c}</span>`).join("")}
      </div>
    </section>
    <section class="modal-section">
      <h3>Güçlü yönler</h3>
      <div class="strength-list">
        ${(player.strengths || ["Etki", "Form", "Katkı"]).map((s) => `<span>${s}</span>`).join("")}
      </div>
    </section>
    <section class="modal-section">
      <h3>Değer yorumu</h3>
      <p>${player.story}</p>
    </section>
  `;
  playerModal.hidden = false;
  modalClose.focus();
}

function closePlayerModal() {
  playerModal.hidden = true;
}

// ── RENDER: KARŞILAŞTIRMA ─────────────────────────────────────
function fillCompareOptions() {
  const options = enrichedPlayers
    .map((p) => `<option value="${p.name}">${p.name} — ${p.team}</option>`)
    .join("");
  playerA.innerHTML = options;
  playerB.innerHTML = options;
  playerA.value = topBy("impactScore").name;
  playerB.value = topBy("valueScore").name;
}

function statLine(label, left, right, suffix = "") {
  const lw = left > right;
  const rw = right > left;
  return `
    <div class="duel-row">
      <span>${label}</span>
      <strong>
        <span class="${lw ? "winner" : ""}">${left}${suffix}</span>
        /
        <span class="${rw ? "winner" : ""}">${right}${suffix}</span>
      </strong>
    </div>
  `;
}

function renderComparison() {
  const left  = enrichedPlayers.find((p) => p.name === playerA.value);
  const right = enrichedPlayers.find((p) => p.name === playerB.value);
  if (!left || !right) return;

  const winner =
    left.valueScore === right.valueScore
      ? "Bu eşleşme berabereye çok yakın."
      : left.valueScore > right.valueScore
        ? `${left.name} değerine göre daha fazla etki üretiyor.`
        : `${right.name} değerine göre daha fazla etki üretiyor.`;

  comparison.innerHTML = `
    <article class="duel-card">
      <h3>${left.name}</h3>
      ${statLine("Gol", left.goals, right.goals)}
      ${statLine("Asist", left.assists, right.assists)}
      ${statLine("Etki skoru", left.impactScore, right.impactScore)}
      ${statLine("Değer skoru", left.valueScore, right.valueScore)}
      ${statLine("Form", left.form, right.form)}
    </article>
    <article class="duel-card">
      <h3>${right.name}</h3>
      <div class="duel-row"><span>Piyasa değeri</span><strong>${formatValue(left.marketValue)} / ${formatValue(right.marketValue)} €</strong></div>
      <div class="duel-row"><span>Dakika</span><strong>${left.minutes} / ${right.minutes}</strong></div>
      <div class="duel-row"><span>Büyük maç</span><strong>${left.bigMatch} / ${right.bigMatch}</strong></div>
      <div class="duel-row"><span>Scout skoru</span><strong>${left.scoutScore} / ${right.scoutScore}</strong></div>
      <div class="duel-row"><span>Etiket</span><strong>${getLabel(left)} / ${getLabel(right)}</strong></div>
    </article>
    <div class="insight">${winner} Bu sonuç ilk analiz formülüne göre hesaplandı.</div>
  `;
}

// ── RENDER: ANKET ─────────────────────────────────────────────
function renderPoll() {
  const poll = polls[currentPollIndex];
  const storageKey = poll.id;
  const voted = localStorage.getItem(storageKey);
  const voteCounts = JSON.parse(localStorage.getItem(storageKey + "_counts") || "null") ||
    Object.fromEntries(poll.candidates.map((c) => [c.name, 0]));

  pollBadge.textContent = voted ? "Oy verildi ✓" : "Oy ver";

  const totalVotes = Object.values(voteCounts).reduce((s, v) => s + v, 0);

  pollOptions.innerHTML = poll.candidates.map((c) => {
    const pct  = totalVotes > 0 ? Math.round((voteCounts[c.name] / totalVotes) * 100) : 0;
    const isVoted = voted === c.name;
    return `
      <button class="poll-option ${voted ? (isVoted ? "voted" : "") : ""}"
        data-candidate="${c.name}" type="button" ${voted ? "disabled" : ""}>
        <div class="poll-bar" style="width: ${voted ? pct : 0}%"></div>
        <div class="poll-name">${c.name}</div>
        <div class="poll-team">${c.team}</div>
        <div class="poll-pct ${voted ? "visible" : ""}">%${pct}</div>
      </button>
    `;
  }).join("");

  pollNote.textContent = voted
    ? `Toplam ${totalVotes} oy kullanıldı.`
    : "Oyunuzu kullanın, sonuçları görün.";

  if (!voted) {
    pollOptions.addEventListener("click", (e) => {
      const btn = e.target.closest(".poll-option");
      if (!btn) return;
      const candidate = btn.dataset.candidate;
      voteCounts[candidate] = (voteCounts[candidate] || 0) + 1;
      localStorage.setItem(storageKey, candidate);
      localStorage.setItem(storageKey + "_counts", JSON.stringify(voteCounts));
      renderPoll();
    }, { once: true });
  }
}

// ── RENDER: TAHMİN OYUNU ──────────────────────────────────────
function renderMatchPredictions() {
  const savedScore = parseInt(localStorage.getItem("predict_total_score") || "0");
  userTotalScore.textContent = savedScore;
  const submitted = localStorage.getItem("predict_submitted") === "true";

  matchCards.innerHTML = matchFixtures.map((m, i) => {
    const savedH = localStorage.getItem(`pred_h_${i}`) || "";
    const savedA = localStorage.getItem(`pred_a_${i}`) || "";
    let cardClass = "";
    let resultLabel = "";
    if (submitted && savedH !== "" && savedA !== "") {
      const predH = parseInt(savedH);
      const predA = parseInt(savedA);
      if (predH === m.actualHome && predA === m.actualAway) {
        cardClass = "correct"; resultLabel = "✅ Tam isabet! +3 puan";
      } else if ((predH > predA) === (m.actualHome > m.actualAway) &&
                 (predH === predA) === (m.actualHome === m.actualAway)) {
        cardClass = "partial"; resultLabel = "🟡 Doğru sonuç! +1 puan";
      } else {
        cardClass = "wrong"; resultLabel = `❌ Yanlış. Gerçek: ${m.actualHome}–${m.actualAway}`;
      }
    }
    return `
      <div class="match-card ${cardClass}" data-match="${i}">
        <div class="match-teams">
          <div class="match-team">${m.home}</div>
          <div class="match-vs">VS</div>
          <div class="match-team">${m.away}</div>
        </div>
        <div class="match-inputs">
          <input type="number" min="0" max="20" placeholder="0"
            id="pred_h_${i}" value="${savedH}" ${submitted ? "disabled" : ""}>
          <div class="match-sep">—</div>
          <input type="number" min="0" max="20" placeholder="0"
            id="pred_a_${i}" value="${savedA}" ${submitted ? "disabled" : ""}>
        </div>
        <div class="match-result-label">${resultLabel}</div>
      </div>
    `;
  }).join("");

  if (submitted) {
    submitPredictions.disabled = true;
    submitPredictions.textContent = "Tahminler gönderildi ✓";
    predictResult.hidden = false;
    predictResult.innerHTML = `
      <h3>🏆 Toplam Puanın: ${savedScore}</h3>
      <p>Tebrikler! Tahminlerin değerlendirildi. Yeni haftada tekrar dene!</p>
    `;
  }
}

submitPredictions.addEventListener("click", () => {
  let total = 0;
  matchFixtures.forEach((m, i) => {
    const h = document.querySelector(`#pred_h_${i}`)?.value;
    const a = document.querySelector(`#pred_a_${i}`)?.value;
    if (h === "" || a === "") return;
    localStorage.setItem(`pred_h_${i}`, h);
    localStorage.setItem(`pred_a_${i}`, a);
    const predH = parseInt(h);
    const predA = parseInt(a);
    if (predH === m.actualHome && predA === m.actualAway) {
      total += 3;
    } else if ((predH > predA) === (m.actualHome > m.actualAway) &&
               (predH === predA) === (m.actualHome === m.actualAway)) {
      total += 1;
    }
  });
  const prevScore = parseInt(localStorage.getItem("predict_total_score") || "0");
  const newScore  = prevScore + total;
  localStorage.setItem("predict_total_score", newScore);
  localStorage.setItem("predict_submitted", "true");
  userTotalScore.textContent = newScore;
  renderMatchPredictions();
});

resetPredictions.addEventListener("click", () => {
  matchFixtures.forEach((_, i) => {
    localStorage.removeItem(`pred_h_${i}`);
    localStorage.removeItem(`pred_a_${i}`);
  });
  localStorage.removeItem("predict_submitted");
  submitPredictions.disabled = false;
  submitPredictions.textContent = "Tahminleri Gönder";
  predictResult.hidden = true;
  renderMatchPredictions();
});

// ── TEAM FİLTER DOLDUR ────────────────────────────────────────
function fillTeamFilter() {
  const teams = [...new Set(enrichedPlayers.map((p) => p.team))].sort();
  teamFilter.innerHTML = `<option value="all">Tüm takımlar</option>` +
    teams.map((t) => `<option value="${t}">${t}</option>`).join("");
}

// ── HAMBURGER NAV ────────────────────────────────────────────
navHamburger.addEventListener("click", () => {
  const isHidden = navMobileMenu.hidden;
  navMobileMenu.hidden = !isHidden;
  navHamburger.setAttribute("aria-expanded", String(isHidden));
});

navMobileMenu.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => { navMobileMenu.hidden = true; });
});

// ── EVENT LİSTENERS ───────────────────────────────────────────
searchInput.addEventListener("input", (e) => { state.search = e.target.value; renderPlayers(); });
positionFilter.addEventListener("change", (e) => { state.position = e.target.value; renderPlayers(); });
teamFilter.addEventListener("change", (e) => { state.team = e.target.value; renderPlayers(); });
sortMode.addEventListener("change", (e) => { state.sort = e.target.value; renderPlayers(); });
budgetOnly.addEventListener("change", (e) => { state.budgetOnly = e.target.checked; renderPlayers(); });
playerA.addEventListener("change", renderComparison);
playerB.addEventListener("change", renderComparison);
squadTeamSelect.addEventListener("change", renderSquad);

playerGrid.addEventListener("click", (e) => {
  const card = e.target.closest(".player-card");
  if (card) openPlayerModal(card.dataset.player);
});
playerGrid.addEventListener("keydown", (e) => {
  if (e.key !== "Enter" && e.key !== " ") return;
  const card = e.target.closest(".player-card");
  if (!card) return;
  e.preventDefault();
  openPlayerModal(card.dataset.player);
});
modalClose.addEventListener("click", closePlayerModal);
playerModal.addEventListener("click", (e) => { if (e.target === playerModal) closePlayerModal(); });
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !playerModal.hidden) closePlayerModal();
});
swapButton.addEventListener("click", () => {
  const oldA = playerA.value;
  playerA.value = playerB.value;
  playerB.value = oldA;
  renderComparison();
});

// ── INIT ──────────────────────────────────────────────────────
fillTeamFilter();
fillCompareOptions();
renderThemes();
renderSquadTeams();
renderSummary();
renderBoards();
renderStandings();
renderPlayers();
renderComparison();
renderPoll();
renderMatchPredictions();
