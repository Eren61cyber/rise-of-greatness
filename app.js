// ================================================================
// SÜPER LİG ATLASI — app.js  |  2025-26 Sezonu
// ================================================================

// ===================== TEMA YÖNETİMİ =====================
(function initTheme() {
  const savedTheme = localStorage.getItem('theme');
  const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
  const currentTheme = savedTheme || (prefersLight ? 'light' : 'dark');
  document.documentElement.setAttribute('data-theme', currentTheme);
  
  window.addEventListener('DOMContentLoaded', () => {
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    const iconDark = document.getElementById('themeIconDark');
    const iconLight = document.getElementById('themeIconLight');
    
    if (!themeToggleBtn) return;
    
    const updateIcons = (theme) => {
      if (theme === 'light') {
        iconLight.style.display = 'none';
        iconDark.style.display = 'block';
      } else {
        iconLight.style.display = 'block';
        iconDark.style.display = 'none';
      }
    };
    
    updateIcons(currentTheme);
    
    themeToggleBtn.addEventListener('click', () => {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      const newTheme = isDark ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      updateIcons(newTheme);
    });
  });
})();

// Takım adlarını normalize eden yardımcı (Türkçe ↔ ASCII)
function normalizeTeamName(name) {
  return name
    .replace(/ç/g, 'c').replace(/Ç/g, 'C')
    .replace(/ğ/g, 'g').replace(/Ğ/g, 'G')
    .replace(/ı/g, 'i').replace(/İ/g, 'I')
    .replace(/ö/g, 'o').replace(/Ö/g, 'O')
    .replace(/ş/g, 's').replace(/Ş/g, 'S')
    .replace(/ü/g, 'u').replace(/Ü/g, 'U');
}

// Her takım için tek kayıt (ASCII anahtarı — normalizeTeamName ile eşleşir)
const teamLogos = {
  Galatasaray:    "https://tmssl.akamaized.net/images/wappen/head/141.png",
  Fenerbahce:     "https://tmssl.akamaized.net/images/wappen/head/36.png",
  Besiktas:       "https://tmssl.akamaized.net/images/wappen/head/114.png",
  Trabzonspor:    "https://tmssl.akamaized.net/images/wappen/head/449.png",
  Basaksehir:     "https://tmssl.akamaized.net/images/wappen/head/6890.png",
  Goztepe:        "https://tmssl.akamaized.net/images/wappen/head/1467.png",
  Samsunspor:     "https://tmssl.akamaized.net/images/wappen/head/152.png",
  Rizespor:       "https://tmssl.akamaized.net/images/wappen/head/126.png",
  Konyaspor:      "https://tmssl.akamaized.net/images/wappen/head/2293.png",
  Kocaelispor:    "https://tmssl.akamaized.net/images/wappen/head/139.png",
  Alanyaspor:     "https://tmssl.akamaized.net/images/wappen/head/11282.png",
  "Gaziantep FK": "https://tmssl.akamaized.net/images/wappen/head/2832.png",
  Kasimpasa:      "https://tmssl.akamaized.net/images/wappen/head/10484.png",
  Genclerbirligi: "https://tmssl.akamaized.net/images/wappen/head/820.png",
  Eyupspor:       "https://tmssl.akamaized.net/images/wappen/head/4046.png",
  Antalyaspor:    "https://tmssl.akamaized.net/images/wappen/head/589.png",
  Kayserispor:    "https://tmssl.akamaized.net/images/wappen/head/3205.png",
  Karagumruk:     "https://tmssl.akamaized.net/images/wappen/head/7124.png"
};

function getFallbackLogoSvg(teamName) {
  const theme = (typeof teamThemes !== 'undefined' ? teamThemes.find(t => t.name === teamName) : null) || { primary: "#38bdf8", secondary: "#fbbf24" };
  const initials = teamName.substring(0, 2).toUpperCase();
  return `<svg class="team-logo-fallback" viewBox="0 0 100 100" style="background:linear-gradient(135deg, ${theme.primary}, ${theme.secondary || theme.primary}); border-radius:6px; display:inline-block; vertical-align:middle; width:100%; height:100%;"><text x="50%" y="50%" text-anchor="middle" dominant-baseline="central" fill="white" font-family='Outfit', sans-serif font-weight='900' font-size='42'>${initials}</text></svg>`;
}

function getTeamLogoHtml(teamName, sizeClass = "small") {
  // Önce orijinal adla ara, bulamazsan normalize et
  const logoUrl = teamLogos[teamName] || teamLogos[normalizeTeamName(teamName)];
  if (!logoUrl) {
    return `<span class="team-logo-wrapper ${sizeClass}">${getFallbackLogoSvg(teamName)}</span>`;
  }
  const escapedFallback = getFallbackLogoSvg(teamName).replace(/"/g, '&quot;').replace(/'/g, "\\'")
  return `<span class="team-logo-wrapper ${sizeClass}"><img src="${logoUrl}" alt="${teamName}" class="team-logo-img" onerror="this.outerHTML='${escapedFallback}'"></span>`;
}

function getAwardLogoHtml(teamString) {
  if (teamString.includes("/")) {
    return `<span class="team-logo-wrapper tiny" style="background:#ffd700; border-radius:50%; width:18px; height:18px; display:inline-flex; align-items:center; justify-content:center;"><span style="font-size:10px;line-height:1;display:block;text-align:center;">🏆</span></span>`;
  }
  return getTeamLogoHtml(teamString, "tiny");
}

// ── OYUNCU VERİSİ ─────────────────────────────────────────────
const players = [
  // ===== SÜPER YILDIZ =====
  { name:"Christ Inao Oulai",  team:"Trabzonspor",  position:"Forvet",    age:21, marketValue:150, goals:35, assists:15, minutes:3400, bigMatch:99, form:99, story:"Dünya futboluna yön veren harika çocuk. Ligin tartışmasız en iyisi.", career:["Trabzonspor"], strengths:["Bitiricilik","Hız","Dripling"] },
  // ===== GALATASARAY =====
  { name:"Ugurcan Cakir",      team:"Galatasaray",  position:"Kaleci",    age:30, marketValue:15, goals:0,  assists:0,  minutes:3230, bigMatch:92, form:91, story:"Trabzonspor'dan transfer edilen milli kaleci, Galatasaray kalesinde 20 clean sheet ile şampiyonlukta devleşti.", career:["Trabzonspor","Galatasaray"], strengths:["Refleks","Liderlik","Bire Bir"] },
  { name:"Gunay Guvenc",       team:"Galatasaray",  position:"Kaleci",    age:34, marketValue:0.4,goals:0,  assists:0,  minutes:170,  bigMatch:75, form:80, story:"Yedek kaleci olarak kupada görev alan tecrübeli eldiven, kalesinde her zaman güven verdi.", career:["Stuttgart","Göztepe","Gaziantep FK","Galatasaray"], strengths:["Tecrübe","Refleks"] },
  { name:"Victor Osimhen",     team:"Galatasaray",  position:"Forvet",    age:27, marketValue:75, goals:22, assists:8,  minutes:2800, bigMatch:95, form:94, story:"75M€'luk dünya yıldızı, 22 gol ve 8 asistle gol krallığının ortağı oldu ve şampiyonluğun en büyük mimarıydı.", career:["Wolfsburg","Lille","Napoli","Galatasaray"], strengths:["Bitiricilik","Hız","Fizik"] },
  { name:"Mauro Icardi",       team:"Galatasaray",  position:"Forvet",    age:33, marketValue:4,  goals:10, assists:4,  minutes:1900, bigMatch:90, form:85, story:"Yaşadığı sakatlıklara rağmen çıktığı maçlarda klasını konuşturdu ve 10 gol attı.", career:["Sampdoria","Inter","PSG","Galatasaray"], strengths:["Bitiricilik","Pozisyon Alma","Tecrübe"] },
  { name:"Baris Alper Yilmaz", team:"Galatasaray",  position:"Kanat",     age:26, marketValue:30, goals:8,  assists:11, minutes:2900, bigMatch:92, form:95, story:"8 gol 11 asist ile ligin en değerli Türk oyuncusu. Sezonun oyuncusu ödülünün sahibi.", career:["Keçiörengücü","Galatasaray"], strengths:["Hız","Dribbling","Güç"] },
  { name:"Leroy Sane",         team:"Galatasaray",  position:"Kanat",     age:30, marketValue:20, goals:7,  assists:5,  minutes:2400, bigMatch:86, form:87, story:"Bayern Münih'ten gelen dünya yıldızı, 7 gol ve 5 asistle şampiyonluk yolunda tecrübesiyle fark yarattı.", career:["Schalke","Man City","Bayern","Galatasaray"], strengths:["Hız","Teknik","Dribbling"] },
  { name:"Gabriel Sara",       team:"Galatasaray",  position:"Orta saha", age:26, marketValue:27, goals:8,  assists:14, minutes:2850, bigMatch:88, form:91, story:"14 asist ile Galatasaray'ın oyun kurma merkezi. Duran toplardaki ustalığıyla şampiyonlukta pay sahibi.", career:["Gremio","Norwich","Galatasaray"], strengths:["Pas kalitesi","Yaratıcılık","Oyun Görüşü"] },
  { name:"Lucas Torreira",     team:"Galatasaray",  position:"Orta saha", age:30, marketValue:10, goals:3,  assists:7,  minutes:2700, bigMatch:87, form:88, story:"Galatasaray'ın orta saha dinamosu. Savunma arkasını süpürme ve pas dağıtımındaki başarısıyla paha biçilemez.", career:["Sampdoria","Arsenal","Atletico","Fiorentina","Galatasaray"], strengths:["Top Kapma","Savunma","İstikrar"] },
  { name:"Wilfried Stephane Singo", team:"Galatasaray", position:"Defans", age:25, marketValue:23, goals:1, assists:2,  minutes:2600, bigMatch:85, form:87, story:"Monaco'dan transfer edilen Singo, savunmanın sağ kulvarında güçlü fiziği ve temposuyla adeta bir duvar ördü.", career:["Torino","Monaco","Galatasaray"], strengths:["Hız","Fiziksel Güç","Savunma"] },
  { name:"Abdulkerim Bardakci",team:"Galatasaray",  position:"Defans",    age:31, marketValue:6.5,goals:3,  assists:1,  minutes:2750, bigMatch:84, form:85, story:"Milli stoper tecrübesi, lider karakteri ve hava toplarındaki üstünlüğü ile savunmanın en kritik parçası.", career:["Konyaspor","Galatasaray"], strengths:["Hava topu","Liderlik","Pas kalitesi"] },
  { name:"Davinson Sanchez",   team:"Galatasaray",  position:"Defans",    age:30, marketValue:16, goals:2,  assists:1,  minutes:2500, bigMatch:88, form:89, story:"Savunmanın lideri, hava toplarında geçilmez olurken hızı ve oyun kurma yeteneğiyle dünya klasındaydı.", career:["Atletico Nacional","Ajax","Tottenham","Galatasaray"], strengths:["Savunma","Hız","Güç"] },
  { name:"Sacha Boey",         team:"Galatasaray",  position:"Defans",    age:25, marketValue:18, goals:1,  assists:3,  minutes:2200, bigMatch:87, form:86, story:"Bayern Münih'ten geri dönen Sacha Boey, sağ kulvarda eski enerjisini ve dinamizmini sahaya yansıttı.", career:["Rennes","Galatasaray","Bayern","Galatasaray"], strengths:["Hız","Dayanıklılık","Top Kapma"] },
  { name:"Ismail Jakobs",      team:"Galatasaray",  position:"Defans",    age:26, marketValue:8,  goals:1,  assists:4,  minutes:2300, bigMatch:82, form:84, story:"Sol bekte hızı ve hücum bindirmeleriyle sol kulvarı çok etkili kullandı.", career:["Köln","Monaco","Galatasaray"], strengths:["Hız","Orta","Dayanıklılık"] },
  { name:"Kaan Ayhan",         team:"Galatasaray",  position:"Defans",    age:31, marketValue:1.5,goals:1,  assists:2,  minutes:1800, bigMatch:83, form:82, story:"Stoper, sağ bek ve ön liberoda sergilediği joker performansla takımın en güvenilir isimlerindendi.", career:["Schalke","Düsseldorf","Sassuolo","Galatasaray"], strengths:["Tecrübe","Pozisyon Alma","Çok Yönlülük"] },
  { name:"Ilkay Gundogan",     team:"Galatasaray",  position:"Orta saha", age:35, marketValue:2.5,goals:4,  assists:6,  minutes:1700, bigMatch:90, form:85, story:"Tecrübesiyle orta sahada oyun zekasını ve sakinliğini Galatasaray'a getirerek kilit paslar attı.", career:["Dortmund","Man City","Barcelona","Galatasaray"], strengths:["Pas","Oyun Zekası","Tecrübe"] },
  { name:"Mario Lemina",       team:"Galatasaray",  position:"Orta saha", age:32, marketValue:1,  goals:2,  assists:3,  minutes:1600, bigMatch:80, form:82, story:"Yıllar sonra Galatasaray'a dönen tecrübeli oyuncu, orta saha rotasyonunda enerjisiyle katkı sağladı.", career:["Marseille","Juventus","Southampton","Galatasaray"], strengths:["Fizik","Dribbling","Mücadele"] },
  { name:"Roland Sallai",      team:"Galatasaray",  position:"Kanat",     age:29, marketValue:14, goals:5,  assists:6,  minutes:2100, bigMatch:84, form:85, story:"Kanatlarda çalışkanlığı, pres gücü ve kritik anlarda attığı gollerle rotasyonun vazgeçilmezi oldu.", career:["Puskas","Freiburg","Galatasaray"], strengths:["Çalışkanlık","Pres","Şut"] },
  { name:"Yunus Akgun",        team:"Galatasaray",  position:"Kanat",     age:26, marketValue:8,  goals:6,  assists:8,  minutes:2000, bigMatch:82, form:86, story:"Hücumda yaratıcılığı ve süratiyle hem ligde hem de Avrupa'da etkileyici bir sezon geçirdi.", career:["Galatasaray","Adana Demirspor","Leicester","Galatasaray"], strengths:["Hız","Teknik","Dribbling"] },
  { name:"Yaser Asprilla",     team:"Galatasaray",  position:"Kanat",     age:22, marketValue:15, goals:4,  assists:5,  minutes:1500, bigMatch:81, form:83, story:"Girona'dan kiralanan genç Kolombiyalı, sağ kanatta tekniği ve hızıyla gelecek vaat etti.", career:["Envigado","Watford","Girona","Galatasaray"], strengths:["Potansiyel","Teknik","Hız"] },
  { name:"Noa Lang",           team:"Galatasaray",  position:"Kanat",     age:27, marketValue:22, goals:5,  assists:4,  minutes:1600, bigMatch:83, form:82, story:"Napoli'den kiralanan Hollandalı kanat oyuncusu, driplingleri ile hücuma zenginlik kattı.", career:["Ajax","Club Brugge","PSV","Galatasaray"], strengths:["Dribbling","Yaratıcılık","Teknik"] },

  // ===== FENERBAHÇE =====
  { name:"Ederson",            team:"Fenerbahce",   position:"Kaleci",    age:32, marketValue:10, goals:0,  assists:0,  minutes:3150, bigMatch:88, form:87, story:"Kalesinde tecrübesiyle devleşen Brezilyalı, geriden oyun kurmadaki üstün kalitesiyle Fenerbahçe'nin kilit ismiydi.", career:["Benfica","Man City","Fenerbahce"], strengths:["Pas kalitesi","Refleks","Deneyim"] },
  { name:"Tarik Cetin",        team:"Fenerbahce",   position:"Kaleci",    age:29, marketValue:0.2,goals:0,  assists:0,  minutes:90,   bigMatch:70, form:75, story:"Yedek kaleci olarak kupa maçlarında forma giydi.", career:["Fenerbahçe","Rizespor"], strengths:["Refleks"] },
  { name:"Caglar Soyuncu",     team:"Fenerbahce",   position:"Defans",    age:30, marketValue:10, goals:2,  assists:3,  minutes:2800, bigMatch:84, form:86, story:"Atletico Madrid'den transfer edilen Çağlar, savunmada liderlik vasıflarıyla öne çıktı.", career:["Altınordu","Freiburg","Leicester","Atletico","Fenerbahce"], strengths:["Hava Topu","Liderlik","Agresiflik"] },
  { name:"Jayden Oosterwolde", team:"Fenerbahce",   position:"Defans",    age:25, marketValue:11, goals:1,  assists:2,  minutes:2700, bigMatch:83, form:85, story:"Sol bek ve stoperde hızı ve güçlü fiziğiyle rakip hücumculara geçit vermedi.", career:["Twente","Parma","Fenerbahce"], strengths:["Hız","Fizik","Müdahale"] },
  { name:"Mert Muldur",        team:"Fenerbahce",   position:"Defans",    age:27, marketValue:5.5,goals:1,  assists:4,  minutes:2200, bigMatch:81, form:83, story:"Sağ bekte çalışkanlığı ve istikrarıyla takımın önemli bir parçası oldu.", career:["Rapid Wien","Sassuolo","Fenerbahce"], strengths:["Pozisyon Alma","Hız","Disiplin"] },
  { name:"Milan Skriniar",     team:"Fenerbahce",   position:"Defans",    age:31, marketValue:10, goals:1,  assists:0,  minutes:2800, bigMatch:86, form:86, story:"PSG'den transfer edilen Slovak stoper, sağlam savunma duruşu ve güçlü fiziğiyle geçilmez bir duvar ördü.", career:["Zilina","Sampdoria","Inter","PSG","Fenerbahce"], strengths:["Markaj","Güç","Pozisyon Alma"] },
  { name:"Nelson Semedo",      team:"Fenerbahce",   position:"Defans",    age:32, marketValue:4,  goals:1,  assists:3,  minutes:2300, bigMatch:82, form:83, story:"Sağ kulvarda tecrübesi ve bindirmeleriyle takıma derinlik kazandırdı.", career:["Benfica","Barcelona","Wolves","Fenerbahce"], strengths:["Hız","Tecrübe","Hücum katkısı"] },
  { name:"Archibald Norman Brown", team:"Fenerbahce", position:"Defans",  age:24, marketValue:3.5,goals:0,  assists:2,  minutes:1500, bigMatch:78, form:80, story:"Gent'ten transfer edilen İngiliz sol bek, atletizmiyle alternatif sağladı.", career:["Derby","Lausanne","Gent","Fenerbahce"], strengths:["Hız","Orta","Fizik"] },
  { name:"Anderson Talisca",   team:"Fenerbahce",   position:"Orta saha", age:32, marketValue:7,  goals:19, assists:5,  minutes:2200, bigMatch:89, form:87, story:"Fenerbahçe'nin şampiyonluk yarışındaki en büyük gol silahı. Duran toplar ve ceza sahası dışı şutlarıyla ligde 19 gol attı.", career:["Benfica","Besiktas","Guangzhou","Al Nassr","Fenerbahce"], strengths:["Şut","Duran Top","Büyük Maç"] },
  { name:"Ismail Yuksek",      team:"Fenerbahce",   position:"Orta saha", age:27, marketValue:10, goals:2,  assists:4,  minutes:2500, bigMatch:83, form:84, story:"Orta sahada dinamizmi, agresif presi ve top çalma istatistikleriyle yine kilit roldeydi.", career:["Gölcükspor","Fenerbahce"], strengths:["Mücadele","Top Kapma","Pres"] },
  { name:"Mert Hakan Yandas",  team:"Fenerbahce",   position:"Orta saha", age:31, marketValue:1.2,goals:3,  assists:5,  minutes:1400, bigMatch:80, form:82, story:"Takımın saha içi liderlerinden, hırsı ve tecrübesiyle rotasyonda önemli bir joker.", career:["Sivasspor","Fenerbahce"], strengths:["Mücadele","Hırs","Pas"] },
  { name:"Edson Alvarez",      team:"Fenerbahce",   position:"Orta saha", age:28, marketValue:15, goals:4,  assists:8,  minutes:2900, bigMatch:86, form:88, story:"West Ham'dan transfer edilen Meksikalı, orta sahada üstün fizik gücü ve kesiciliğiyle savunmanın önündeki sigortaydı.", career:["Club America","Ajax","West Ham","Fenerbahce"], strengths:["Top Kapma","Pozisyon Alma","Fiziksel Güç"] },
  { name:"Marco Asensio",      team:"Fenerbahce",   position:"Orta saha", age:30, marketValue:15, goals:11, assists:12, minutes:2100, bigMatch:88, form:89, story:"11 gol ve 12 asist ile ligin en üretken oyuncularından biri. Oyun kurma becerisiyle takımı yönlendirdi.", career:["Mallorca","Real Madrid","PSG","Fenerbahce"], strengths:["Şut","Pas kalitesi","Tecrübe"] },
  { name:"Matteo Guendouzi",   team:"Fenerbahce",   position:"Orta saha", age:27, marketValue:18, goals:3,  assists:6,  minutes:2400, bigMatch:85, form:86, story:"Lazio'dan transfer edilen Fransız orta saha, bitmek bilmeyen enerjisi ve hırslı yapısıyla takımı ateşledi.", career:["Lorient","Arsenal","Marseille","Lazio","Fenerbahce"], strengths:["Dayanıklılık","Pas","Mücadele"] },
  { name:"N'Golo Kante",       team:"Fenerbahce",   position:"Orta saha", age:35, marketValue:4,  goals:1,  assists:4,  minutes:1800, bigMatch:88, form:85, story:"Al-Ittihad'dan transfer edilen efsane orta saha, tecrübesi ve kritik müdahaleleriyle oyunu dengeledi.", career:["Leicester","Chelsea","Al-Ittihad","Fenerbahce"], strengths:["Pozisyon Alma","Mücadele","Tecrübe"] },
  { name:"Fred",               team:"Fenerbahce",   position:"Orta saha", age:33, marketValue:4.5,goals:4,  assists:7,  minutes:2100, bigMatch:85, form:84, story:"Orta sahadaki yaratıcılığı, topla çıkışları ve oyun akışını hızlandırmasıyla paha biçilemez bir parça.", career:["Shakhtar","Man United","Fenerbahce"], strengths:["Oyun Kurma","Teknik","Pas"] },
  { name:"Kerem Akturkoglu",   team:"Fenerbahce",   position:"Kanat",     age:27, marketValue:20, goals:8,  assists:7,  minutes:2500, bigMatch:85, form:86, story:"Benfica sonrası Fenerbahçe'ye imza atan Kerem, hızı ve gol yollarındaki etkinliğiyle takıma dinamizm kattı.", career:["Galatasaray","Benfica","Fenerbahce"], strengths:["Hız","Dribbling","Gol"] },
  { name:"Dorgeles Nene",      team:"Fenerbahce",   position:"Kanat",     age:23, marketValue:9,  goals:9,  assists:16, minutes:2700, bigMatch:90, form:92, story:"Fenerbahçe'nin Salzburg'dan transfer ettiği genç yetenek, ligde yaptıgı 16 asistle asist kralı oldu.", career:["Salzburg","Westerlo","Fenerbahce"], strengths:["Asist","Hız","Bire Bir"] },
  { name:"Anthony Musaba",     team:"Fenerbahce",   position:"Kanat",     age:25, marketValue:3,  goals:5,  assists:4,  minutes:1600, bigMatch:79, form:81, story:"Sheffield Wednesday'den gelen hızlı kanat oyuncusu, rotasyonda patlayıcılık getirdi.", career:["Monaco","Metz","Sheffield Wed","Fenerbahce"], strengths:["Hız","Bire Bir"] },
  { name:"Oguz Aydın",         team:"Fenerbahce",   position:"Kanat",     age:25, marketValue:4.5,goals:4,  assists:3,  minutes:1300, bigMatch:78, form:80, story:"Alanyaspor'dan gelen genç oyuncu, hızı ve hücum zenginliğiyle süre aldığı anlarda katkı sağladı.", career:["Alanyaspor","Fenerbahce"], strengths:["Hız","Pres"] },

  // ===== BEŞİKTAŞ =====
  { name:"Mert Gunok",         team:"Besiktas",     position:"Kaleci",    age:37, marketValue:0.5,goals:0,  assists:0,  minutes:3200, bigMatch:83, form:82, story:"Karakteri ve tecrübesiyle takımın kaptanı ve kalesindeki en güvenilir güvencesi oldu.", career:["Fenerbahce","Bursaspor","Basaksehir","Besiktas"], strengths:["Deneyim","Kurtarış","Liderlik"] },
  { name:"Ersin Destanoglu",   team:"Besiktas",     position:"Kaleci",    age:25, marketValue:1.8,goals:0,  assists:0,  minutes:400,  bigMatch:76, form:78, story:"Mert Günok'un yokluğunda kaleyi korudu ve kupa maçlarında görev aldı.", career:["Beşiktaş"], strengths:["Refleks","Penaltı"] },
  { name:"Ridvan Yilmaz",      team:"Besiktas",     position:"Defans",    age:25, marketValue:5,  goals:2,  assists:5,  minutes:2400, bigMatch:82, form:84, story:"Rangers'tan Beşiktaş'a geri dönen sol bek, hızı ve isabetli ortalarıyla sol kulvara canlılık kattı.", career:["Besiktas","Rangers","Besiktas"], strengths:["Orta","Hız","Pas"] },
  { name:"Emirhan Topcu",      team:"Besiktas",     position:"Defans",    age:25, marketValue:4.5,goals:2,  assists:1,  minutes:2500, bigMatch:81, form:83, story:"Rizespor'dan transfer edilen stoper, hava toplarında ve savunmadaki sert yapısıyla alkış topladı.", career:["Rizespor","Besiktas"], strengths:["Müdahale","Hava Topu","Güç"] },
  { name:"Felix Uduokhai",     team:"Besiktas",     position:"Defans",    age:28, marketValue:3.5,goals:1,  assists:0,  minutes:2600, bigMatch:82, form:83, story:"Augsburg'dan transfer edilen Alman stoper, uzun boyu ve dengeli oyunuyla savunmanın temel taşlarından biri oldu.", career:["TSV 1860","Wolfsburg","Augsburg","Besiktas"], strengths:["Hava Topu","Pozisyon Alma"] },
  { name:"Tiago Djalo",        team:"Besiktas",     position:"Defans",    age:26, marketValue:7,  goals:1,  assists:1,  minutes:2100, bigMatch:80, form:82, story:"Juventus'tan kiralanan Portekizli stoper, atletizmi ve hızıyla savunmaya derinlik kazandırdı.", career:["Lille","Juventus","Besiktas"], strengths:["Hız","Fizik","Müdahale"] },
  { name:"Michael Murillo",    team:"Besiktas",     position:"Defans",    age:30, marketValue:4,  goals:1,  assists:3,  minutes:2300, bigMatch:80, form:82, story:"Marseille'den gelen deneyimli sağ bek, savunma gücü ve hücuma desteğiyle sağ kulvarı kontrol etti.", career:["Anderlecht","Marseille","Besiktas"], strengths:["Savunma","Tecrübe","Orta"] },
  { name:"Emmanuel Agbadou",   team:"Besiktas",     position:"Defans",    age:28, marketValue:6,  goals:2,  assists:0,  minutes:2500, bigMatch:82, form:83, story:"Reims'tan transfer edilen Fildişi Sahilli stoper, fiziksel gücü ve mücadeleci yapısıyla dikkat çekti.", career:["Eupen","Reims","Besiktas"], strengths:["Fizik","Güç","Markaj"] },
  { name:"Yasin Ozcan",        team:"Besiktas",     position:"Defans",    age:20, marketValue:4.5,goals:1,  assists:2,  minutes:1600, bigMatch:77, form:80, story:"Kasımpaşa'dan transfer edilen genç sol bek, yüksek potansiyeliyle beğeni topladı.", career:["Kasimpasa","Besiktas"], strengths:["Potansiyel","Çeviklik"] },
  { name:"Wilfred Ndidi",      team:"Besiktas",     position:"Orta saha", age:29, marketValue:8,  goals:3,  assists:5,  minutes:2700, bigMatch:85, form:86, story:"Orta sahanın göbeğinde defansif kalkan görevi gören Ndidi, fiziksel mücadelesiyle rakipleri yıprattı.", career:["Genk","Leicester","Besiktas"], strengths:["Savunma","Top Kapma","Dayanıklılık"] },
  { name:"Orkun Kokcu",        team:"Besiktas",     position:"Orta saha", age:25, marketValue:25, goals:9,  assists:8,  minutes:2600, bigMatch:88, form:90, story:"Benfica'dan Beşiktaş'a transfer olan Orkun, orta sahada yüksek oyun zekası ve şutlarıyla takımını sırtladı.", career:["Feyenoord","Benfica","Besiktas"], strengths:["Pas","Vizyon","Gol"] },
  { name:"Salih Ucan",         team:"Besiktas",     position:"Orta saha", age:32, marketValue:1.5,goals:2,  assists:5,  minutes:1900, bigMatch:79, form:80, story:"Orta saha rotasyonunun en önemli parçalarından biri. Pas kalitesi ve duran toplardaki etkisiyle katkı sağladı.", career:["Roma","Fenerbahce","Alanyaspor","Besiktas"], strengths:["Pas","Duran Top"] },
  { name:"Kristjan Asllani",   team:"Besiktas",     position:"Orta saha", age:24, marketValue:12, goals:3,  assists:4,  minutes:2000, bigMatch:82, form:83, story:"Inter'den kiralanan genç Arnavut, pas dağıtımı ve oyun yönlendirmedeki başarısıyla beğeni kazandı.", career:["Empoli","Inter","Besiktas"], strengths:["Pas kalitesi","Oyun Görüşü","Teknik"] },
  { name:"Tammy Abraham",      team:"Besiktas",     position:"Forvet",    age:28, marketValue:18, goals:15, assists:5,  minutes:2500, bigMatch:86, form:87, story:"Roma'dan transfer olan İngiliz santrfor, 15 golle Beşiktaş'ın en skorer ismi oldu ve ceza sahası hakimiyeti kurdu.", career:["Chelsea","Aston Villa","Roma","Besiktas"], strengths:["Fizik","Ceza Sahası","Bitiricilik"] },
  { name:"Oh Hyun-Gyu",        team:"Besiktas",     position:"Forvet",    age:25, marketValue:3,  goals:6,  assists:2,  minutes:1200, bigMatch:77, form:80, story:"Genk'ten kiralanan Güney Koreli forvet, enerjik presi ve hırslı oyunuyla taraftarın sevgisini kazandı.", career:["Celtic","Genk","Besiktas"], strengths:["Pres","Mücadele","Bitiricilik"] },
  { name:"Milot Rashica",      team:"Besiktas",     position:"Kanat",     age:29, marketValue:3.5,goals:5,  assists:6,  minutes:2200, bigMatch:80, form:81, story:"Kanatlardaki sürati, asistleri ve savunma yardımıyla Beşiktaş hücumunda önemli rol oynadı.", career:["Werder Bremen","Norwich","Galatasaray","Besiktas"], strengths:["Hız","Asist","Pres"] },
  { name:"El Bilal Toure",     team:"Besiktas",     position:"Forvet",    age:24, marketValue:8,  goals:8,  assists:3,  minutes:1700, bigMatch:80, form:82, story:"Stuttgart'tan gelen genç forvet, patlayıcı hızı ve fiziğiyle hücum hattında çok etkiliydi.", career:["Reims","Almeria","Atalanta","Besiktas"], strengths:["Hız","Fizik","Hava Topu"] },
  { name:"Vaclav Cerny",       team:"Besiktas",     position:"Kanat",     age:28, marketValue:5,  goals:6,  assists:7,  minutes:1900, bigMatch:81, form:82, story:"Wolfsburg'dan kiralanan Çek kanat oyuncusu, sol ayağıyla attığı kavisli şutlar ve ortalarla fark yarattı.", career:["Ajax","Twente","Wolfsburg","Besiktas"], strengths:["Teknik","Uzak Şut","Orta"] },
  { name:"Cengiz Under",       team:"Besiktas",     position:"Kanat",     age:28, marketValue:6,  goals:4,  assists:5,  minutes:1500, bigMatch:81, form:80, story:"Fenerbahçe'den transfer edilen milli kanat, uzaktan şutları ve tecrübesiyle kanat rotasyonunu güçlendirdi.", career:["Roma","Leicester","Marsilya","Fenerbahce","Besiktas"], strengths:["Uzak Şut","Dribbling","Tecrübe"] },
  { name:"Jota Silva",         team:"Besiktas",     position:"Kanat",     age:26, marketValue:8,  goals:7,  assists:4,  minutes:1800, bigMatch:81, form:83, story:"Nottingham Forest'tan transfer edilen Portekizli kanat, çalışkanlığı ve bitiriciliğiyle Beşiktaş'ın kilit isimlerindendi.", career:["Guimaraes","Nottingham Forest","Besiktas"], strengths:["Hız","Bitiricilik","Mücadele"] },

  // ===== TRABZONSPOR =====
  { name:"Andre Onana",        team:"Trabzonspor",  position:"Kaleci",    age:30, marketValue:7,  goals:0,  assists:0,  minutes:3100, bigMatch:86, form:85, story:"Manchester United'dan transfer edilen tecrübeli Kamerunlu kaleci, kalesinde büyük güven verdi.", career:["Ajax","Inter","Man United","Trabzonspor"], strengths:["Refleks","Ayak kalitesi","Kurtarış"] },
  { name:"Onuralp Cevikkan",   team:"Trabzonspor",  position:"Kaleci",    age:20, marketValue:1,  goals:0,  assists:0,  minutes:270,  bigMatch:75, form:77, story:"Gelecek vaat eden genç milli kaleci, kupa maçlarındaki performansıyla göz doldurdu.", career:["Trabzonspor"], strengths:["Potansiyel","Kurtarış"] },
  { name:"Stefan Savic",       team:"Trabzonspor",  position:"Defans",    age:35, marketValue:0.4,goals:1,  assists:0,  minutes:2200, bigMatch:82, form:82, story:"Atletico Madrid geçmişli Karadağlı stoper, liderliği ve tecrübesiyle savunmanın komutanı oldu.", career:["Man City","Fiorentina","Atletico","Trabzonspor"], strengths:["Tecrübe","Liderlik","Pozisyon Alma"] },
  { name:"Arseniy Batagov",    team:"Trabzonspor",  position:"Defans",    age:24, marketValue:2,  goals:0,  assists:1,  minutes:1800, bigMatch:77, form:79, story:"Ukraynalı genç stoper, gücü ve hava topu hakimiyetiyle savunmaya derinlik getirdi.", career:["Zorya Luhansk","Trabzonspor"], strengths:["Hava Topu","Güç"] },
  { name:"Mustafa Eskihellac", team:"Trabzonspor",  position:"Defans",    age:29, marketValue:1.5,goals:1,  assists:3,  minutes:2300, bigMatch:78, form:80, story:"Sağ bek ve sağ açıkta çalışkanlığıyla görev yapan yerli oyuncu, dinamik katkı sağladı.", career:["Malatyaspor","Gaziantep FK","Trabzonspor"], strengths:["Çalışkanlık","Hız","Orta"] },
  { name:"Mathias Fjortoft Lovik", team:"Trabzonspor", position:"Defans", age:22, marketValue:2,  goals:1,  assists:2,  minutes:1700, bigMatch:76, form:78, story:"Molde'den transfer edilen Norveçli genç sol bek, hücumcu yapısıyla gelecek vaat etti.", career:["Molde","Trabzonspor"], strengths:["Hız","Orta","Potansiyel"] },
  { name:"Serdar Saatci",      team:"Trabzonspor",  position:"Defans",    age:23, marketValue:2.5,goals:0,  assists:1,  minutes:1600, bigMatch:78, form:79, story:"Braga'dan gelen genç milli stoper, hamle zamanlaması ve fiziğiyle stoper rotasyonunda kilit roldeydi.", career:["Besiktas","Braga","Trabzonspor"], strengths:["Pozisyon Alma","Müdahale"] },
  { name:"Rayyan Baniya",      team:"Trabzonspor",  position:"Defans",    age:27, marketValue:1.5,goals:1,  assists:0,  minutes:1400, bigMatch:75, form:77, story:"Fizik gücü yüksek stoper, savunmada yedek olarak süre aldığı maçlarda hava toplarını temizledi.", career:["Karagümrük","Trabzonspor"], strengths:["Fizik","Hava Topu"] },
  { name:"Okay Yokuslu",       team:"Trabzonspor",  position:"Orta saha", age:32, marketValue:1.2,goals:2,  assists:6,  minutes:2700, bigMatch:83, form:85, story:"Savunma önünde tecrübesiyle güven veren Okay, hava toplarındaki etkisi ve kritik müdahaleleriyle öne çıktı.", career:["Trabzonspor","Celta Vigo","WBA","Trabzonspor"], strengths:["Savunma","Tecrübe","Pas"] },
  { name:"Ozan Tufan",         team:"Trabzonspor",  position:"Orta saha", age:31, marketValue:1.5,goals:4,  assists:5,  minutes:2300, bigMatch:81, form:82, story:"Orta sahadan ceza sahasına koşuları ve uzaktan şutlarıyla hücuma dinamizm katan milli oyuncu.", career:["Fenerbahce","Hull City","Trabzonspor"], strengths:["Şut","Mücadele","Tecrübe"] },
  { name:"Benjamin Bouchouari",team:"Trabzonspor",  position:"Orta saha", age:24, marketValue:3,  goals:2,  assists:4,  minutes:1800, bigMatch:78, form:80, story:"Saint-Etienne'den transfer edilen Faslı orta saha, dar alandaki tekniği ve pas kalitesiyle dikkat çekti.", career:["Roda JC","Saint-Etienne","Trabzonspor"], strengths:["Teknik","Dribbling","Pas"] },
  { name:"Ernest Muci",        team:"Trabzonspor",  position:"Orta saha", age:25, marketValue:11, goals:9,  assists:6,  minutes:2200, bigMatch:89, form:91, story:"Beşiktaş'tan transfer edilen Arnavut yıldız, 9 gol ve 6 asistle hücuma büyük zenginlik kattı.", career:["Legia","Besiktas","Trabzonspor"], strengths:["Uzak Şut","Dribbling","Yaratıcılık"] },
  { name:"Tim Jabol-Folcarelli",team:"Trabzonspor",  position:"Orta saha", age:26, marketValue:2.5,goals:1,  assists:3,  minutes:1600, bigMatch:77, form:79, story:"Ajaccio'dan transfer edilen Fransız ön libero, fizik gücü ve kesiciliğiyle savunma önünde direnç sağladı.", career:["Ajaccio","Trabzonspor"], strengths:["Top Kapma","Fizik"] },
  { name:"Edin Visca",         team:"Trabzonspor",  position:"Kanat",     age:36, marketValue:0.1,goals:3,  assists:8,  minutes:2100, bigMatch:82, form:83, story:"Lig tarihinin en tecrübeli yıldızlarından biri. İlerleyen yaşına rağmen asistleri ve liderliğiyle kilit isim olmaya devam etti.", career:["Zeljeznicar","Basaksehir","Trabzonspor"], strengths:["Asist","Oyun Görüşü","Tecrübe"] },
  { name:"Anthony Nwakaeme",   team:"Trabzonspor",  position:"Kanat",     age:37, marketValue:0.5,goals:4,  assists:5,  minutes:1500, bigMatch:82, form:81, story:"Bordo-mavili kulübün efsane ismi, dar alanda çalımları ve yaratıcılığıyla hücumda fark yaratmaya devam etti.", career:["Hapoel Beer Sheva","Al-Fayha","Trabzonspor"], strengths:["Teknik","Dribbling","Deneyim"] },
  { name:"Paul Onuachu",       team:"Trabzonspor",  position:"Forvet",    age:32, marketValue:6,  goals:22, assists:3,  minutes:2800, bigMatch:93, form:94, story:"22 gol ile gol krallığının ortağı! Hava topu hakimiyetiyle rakiplerine kabus yaşattı.", career:["Midtjylland","Genk","Southampton","Trabzonspor"], strengths:["Hava Topu","Bitiricilik","Ceza Sahası"] },
  { name:"Felipe Augusto",     team:"Trabzonspor",  position:"Forvet",    age:22, marketValue:15, goals:14, assists:4,  minutes:2400, bigMatch:87, form:90, story:"15 milyon Euro piyasa değerine ulaşan genç yetenek, 14 gol atarak ligin en değerli çıkışlarından birini yaptı.", career:["Corinthians","Cercle Brugge","Trabzonspor"], strengths:["Potansiyel","Bitiricilik","Hız"] },
  { name:"Denis Dragus",       team:"Trabzonspor",  position:"Forvet",    age:26, marketValue:4,  goals:6,  assists:3,  minutes:1900, bigMatch:79, form:80, story:"Gaziantep FK'daki çıkışının ardından gelen Rumen forvet, hızı ve çalımlarıyla hücuma katkı sağladı.", career:["Standard Liege","Gaziantep FK","Trabzonspor"], strengths:["Hız","Dribbling"] },
  { name:"Enis Destan",        team:"Trabzonspor",  position:"Forvet",    age:23, marketValue:3.5,goals:5,  assists:2,  minutes:1300, bigMatch:78, form:80, story:"Genç yerli forvet, yırtıcı yapısı, pres gücü ve hava toplarındaki etkisiyle hücum rotasyonunun önemli bir parçası.", career:["Altınordu","Warta Poznan","Trabzonspor"], strengths:["Hava Topu","Pres","Mücadele"] },
  { name:"Oleksandr Zubkov",   team:"Trabzonspor",  position:"Kanat",     age:29, marketValue:4,  goals:5,  assists:6,  minutes:1800, bigMatch:80, form:82, story:"Shakhtar'dan transfer edilen Ukraynalı kanat, hızı ve sol ayağıyla hücumda üretken oldu.", career:["Shakhtar","Ferencvaros","Trabzonspor"], strengths:["Hız","Teknik","Şut"] },

  // ===== BAŞAKŞEHİR =====
  { name:"Eldor Shomurodov",   team:"Basaksehir",   position:"Forvet",    age:30, marketValue:7,  goals:22, assists:6,  minutes:2550, bigMatch:87, form:88, story:"22 gol atarak Paul Onuachu ve Victor Osimhen ile gol krallığını paylaştı. Başakşehir tarihinin en skorer sezonlarından birini yaşattı.", career:["Rostov","Genoa","Roma","Basaksehir"], strengths:["Bitiricilik","Hız","Pozisyon Alma"] },
  { name:"Berkay Ozcan",       team:"Basaksehir",   position:"Orta saha", age:28, marketValue:3.5,goals:5,  assists:10, minutes:2600, bigMatch:83, form:85, story:"Orta sahada 10 asist yaparak takımının oyun kuruculuğunu üstlendi ve gol yollarını besledi.", career:["Stuttgart","Greuther Fürth","Basaksehir"], strengths:["Asist","Pas kalitesi","Vizyon"] },
  { name:"Muhammed Sengezer",  team:"Basaksehir",   position:"Kaleci",    age:29, marketValue:2,  goals:0,  assists:0,  minutes:2200, bigMatch:81, form:83, story:"Kalesinde güven veren duruşu ve refleksleriyle Başakşehir savunmasını arkadan toparlayan isim.", career:["Ankaragücü","Basaksehir"], strengths:["Refleks","Yan Top"] },
  { name:"Volkan Babacan",     team:"Basaksehir",   position:"Kaleci",    age:37, marketValue:0.1,goals:0,  assists:0,  minutes:900,  bigMatch:78, form:75, story:"Tecrübeli kaleci, yedek kulübesinde liderliği ve ihtiyaç duyulduğunda kaledeki sakin duruşuyla destek verdi.", career:["Fenerbahce","Manisaspor","Basaksehir"], strengths:["Tecrübe","Sakinlik"] },
  { name:"Leo Duarte",         team:"Basaksehir",   position:"Defans",    age:29, marketValue:3,  goals:1,  assists:1,  minutes:2800, bigMatch:82, form:84, story:"Brezilyalı stoper, savunmanın merkezinde topu oyuna sokma kalitesi ve pozisyon bilgisiyle öne çıktı.", career:["Flamengo","Milan","Basaksehir"], strengths:["Pozisyon Alma","Pas","Hava Topu"] },
  { name:"Ousseynou Ba",       team:"Basaksehir",   position:"Defans",    age:30, marketValue:2.2,goals:1,  assists:0,  minutes:2500, bigMatch:80, form:81, story:"Fiziksel gücü ve ikili mücadelelerdeki üstünlüğüyle rakip forvetleri yıpratan Senegalli defans oyuncusu.", career:["Olympiacos","Slovan Bratislava","Basaksehir"], strengths:["Güç","Top Kapma","Markaj"] },
  { name:"Lucas Lima",         team:"Basaksehir",   position:"Defans",    age:34, marketValue:0.8,goals:0,  assists:3,  minutes:2600, bigMatch:79, form:80, story:"Sol bekte tecrübesiyle savunma hattını dengelerken hücum bindirmeleriyle de 3 asist katkısı verdi.", career:["Nantes","Al-Ahli","Basaksehir"], strengths:["Orta","Tecrübe","Yer Tutuş"] },
  { name:"Omer Ali Sahiner",   team:"Basaksehir",   position:"Defans",    age:34, marketValue:0.2,goals:1,  assists:2,  minutes:1500, bigMatch:79, form:78, story:"Sağ bek ve orta sahada joker görevi görerek takımın en çalışkan ve emektar isimlerinden biri oldu.", career:["Konyaspor","Basaksehir"], strengths:["Çok Yönlülük","Çalışkanlık","Hız"] },
  { name:"Hamza Gureler",      team:"Basaksehir",   position:"Defans",    age:20, marketValue:1.2,goals:0,  assists:1,  minutes:1200, bigMatch:76, form:80, story:"Altyapıdan çıkan genç stoper, yüksek potansiyeli ve hamle zamanlamasıyla gelecek vaat ediyor.", career:["Basaksehir"], strengths:["Potansiyel","Zamanlama"] },
  { name:"Onur Ergun",         team:"Basaksehir",   position:"Orta saha", age:33, marketValue:0.4,goals:1,  assists:1,  minutes:1400, bigMatch:76, form:78, story:"Defansif orta saha pozisyonunda fiziki gücü ve mücadeleci yapısıyla rotasyonun kilit isimlerindendi.", career:["Hatayspor","İstanbulspor","Basaksehir"], strengths:["Top Kapma","Mücadele"] },
  { name:"Danijel Aleksic",    team:"Basaksehir",   position:"Orta saha", age:35, marketValue:0.3,goals:3,  assists:2,  minutes:1100, bigMatch:78, form:76, story:"Kritik anlarda ceza sahası dışından attığı şutlar ve duran top ustası tecrübesiyle puanlar kazandırdı.", career:["Genoa","St. Gallen","Yeni Malatyaspor","Basaksehir"], strengths:["Şut","Duran Top","Tecrübe"] },
  { name:"Olivier Kemen",      team:"Basaksehir",   position:"Orta saha", age:29, marketValue:1.8,goals:4,  assists:3,  minutes:2100, bigMatch:80, form:82, story:"Kayserispor çıkışlı Kamerunlu, orta sahadaki dinamizmi ve ceza sahası koşularıyla 4 gol üretti.", career:["Newcastle","Lyon","Kayserispor","Basaksehir"], strengths:["Dinamizm","Fizik","Gol Sezgisi"] },
  { name:"Serdar Gurler",      team:"Basaksehir",   position:"Kanat",     age:34, marketValue:0.5,goals:4,  assists:5,  minutes:1800, bigMatch:79, form:81, story:"Kanatlarda sürati ve tecrübesiyle hücumda yaratıcılık getirirken 9 skor katkısı sağladı.", career:["Elazığspor","Gençlerbirliği","Osmanlıspor","Göztepe","Konyaspor","Basaksehir"], strengths:["Dribbling","Orta","Tecrübe"] },
  { name:"Davidson",           team:"Basaksehir",   position:"Kanat",     age:35, marketValue:0.6,goals:5,  assists:4,  minutes:1900, bigMatch:80, form:82, story:"Brezilyalı sol açık, çalımları ve bitiriciliğiyle Başakşehir hücumunda üretkenliği artıran kritik isim.", career:["Alanyaspor","Wuhan Three Towns","Eupen","Basaksehir"], strengths:["Teknik","Dribbling","Bitiricilik"] },
  { name:"Joao Figueiredo",    team:"Basaksehir",   position:"Forvet",    age:30, marketValue:1.5,goals:8,  assists:3,  minutes:2000, bigMatch:79, form:80, story:"Gaziantep sonrası Başakşehir'de gol yollarında çalışkanlığı ve 8 golüyle forvete derinlik kazandırdı.", career:["Gaziantep FK","Al-Wasl","Basaksehir"], strengths:["Pres","Çalışkanlık","Bitiricilik"] },
 
  // ===== GÖZTEPE =====
  { name:"Mateusz Lis",        team:"Goztepe",      position:"Kaleci",    age:29, marketValue:2.5,goals:0,  assists:0,  minutes:3200, bigMatch:87, form:90, story:"Göztepe'nin kalesinde harikalar yaratarak ligin en yüksek kurtarış oranına sahip kalecilerinden biri oldu.", career:["Lech Poznan","Southampton","Troyes","Goztepe"], strengths:["Refleks","Bire Bir","İstikrar"] },
  { name:"Juan Santos",        team:"Goztepe",      position:"Forvet",    age:24, marketValue:12, goals:12, assists:4,  minutes:2200, bigMatch:82, form:86, story:"Değerini 12 milyon Euro'ya fırlatan genç yıldız, 12 gol atarak sezonun en sansasyonel kanat performansına imza attı.", career:["Santos","Goztepe"], strengths:["Hız","Bitiricilik","Potansiyel"] },
  { name:"Arda Ozcimen",       team:"Goztepe",      position:"Kaleci",    age:24, marketValue:0.4,goals:0,  assists:0,  minutes:180,  bigMatch:72, form:75, story:"Altyapıdan yetişen genç kaleci, Mateusz Lis'in yokluğunda elinden gelenin en iyisini yaptı.", career:["Göztepe"], strengths:["Refleks","Potansiyel"] },
  { name:"Taha Altikardes",    team:"Goztepe",      position:"Defans",    age:22, marketValue:4,  goals:2,  assists:1,  minutes:2900, bigMatch:83, form:86, story:"Göztepe'nin en değerli Türk stoperi. Yüksek potansiyeli ve hırsıyla devlerin radarında.", career:["Bursaspor","Trabzonspor","Göztepe"], strengths:["Potansiyel","Güç","Hava Topu"] },
  { name:"Heliton",            team:"Goztepe",      position:"Defans",    age:30, marketValue:1.8,goals:3,  assists:0,  minutes:2800, bigMatch:82, form:84, story:"Savunma hattındaki sertliği, markaj becerisi ve hücum duran toplarında attığı 3 kafa golüyle parladı.", career:["Gil Vicente","Göztepe"], strengths:["Kafa Şutu","Markaj","Fizik"] },
  { name:"Malcom Bokele",      team:"Goztepe",      position:"Defans",    age:26, marketValue:1.5,goals:1,  assists:1,  minutes:2400, bigMatch:80, form:82, story:"Kamerunlu stoper/sağ bek, dinamizmi ve atletizmiyle Göztepe savunmasının sağ tarafını kapattı.", career:["Bordeaux","Göztepe"], strengths:["Atletizm","Hız","Mücadele"] },
  { name:"Djalma Silva",       team:"Goztepe",      position:"Defans",    age:31, marketValue:0.8,goals:1,  assists:4,  minutes:2500, bigMatch:79, form:82, story:"Sol bekten yaptığı muz ortalarla hücumu beslerken ligde 4 asist üreterek kalitesini gösterdi.", career:["AEL Limassol","Göztepe"], strengths:["Orta","Hız","Duran Top"] },
  { name:"Ogun Bayrak",        team:"Goztepe",      position:"Defans",    age:27, marketValue:0.7,goals:0,  assists:3,  minutes:2100, bigMatch:78, form:80, story:"Sağ bek pozisyonunda çalışkanlığı ve bitmek bilmeyen enerjisiyle takımın önemli parçalarından biri oldu.", career:["Keçiörengücü","Tuzlaspor","Göztepe"], strengths:["Dayanıklılık","Pres","Orta"] },
  { name:"Isaac Solet",        team:"Goztepe",      position:"Orta saha", age:25, marketValue:2.5,goals:3,  assists:4,  minutes:2600, bigMatch:81, form:83, story:"Orta sahada fiziksel mücadelesi ve oyunun iki yönündeki temposuyla Goztepe'nin dinamosu.", career:["Slavia Sofia","Göztepe"], strengths:["Fizik","Top Kapma","Dinamizm"] },
  { name:"Anthony Dennis",     team:"Goztepe",      position:"Orta saha", age:21, marketValue:2,  goals:1,  assists:2,  minutes:2300, bigMatch:80, form:81, story:"Göztepe'nin genç Nijeryalısı, top kapmadaki becerisiyle scoutların dikkatini çekti.", career:["Göztepe"], strengths:["Potansiyel","Top Kapma","Güç"] },
  { name:"Dogan Erdogan",      team:"Goztepe",      position:"Orta saha", age:29, marketValue:0.5,goals:0,  assists:1,  minutes:1200, bigMatch:75, form:78, story:"Merkez orta saha rotasyonunda mücadele gücü ve tecrübesiyle süre aldığı maçlarda katkı verdi.", career:["LASK Linz","Trabzonspor","Fortuna Sittard","Göztepe"], strengths:["Mücadele","Tecrübe"] },
  { name:"David Tijanic",      team:"Goztepe",      position:"Orta saha", age:28, marketValue:1.2,goals:4,  assists:5,  minutes:1900, bigMatch:78, form:80, story:"Sloven oyun kurucu, teknik kalitesi, kilit pasları ve 9 skor katkısıyla takımını yönlendirdi.", career:["Olimpija Ljubljana","Al-Adalah","Göztepe"], strengths:["Pas","Vizyon","Teknik"] },
  { name:"Kuryu Matsuki",      team:"Goztepe",      position:"Orta saha", age:23, marketValue:3,  goals:3,  assists:3,  minutes:1800, bigMatch:80, form:82, story:"Southampton'dan kiralanan Japon genç yetenek, yüksek oyun zekasıyla orta sahayı zenginleştirdi.", career:["FC Tokyo","Southampton","Göztepe"], strengths:["Oyun Zekası","Potansiyel","Pas"] },
  { name:"Romulo Cardoso",     team:"Goztepe",      position:"Forvet",    age:24, marketValue:3.5,goals:9,  assists:4,  minutes:2400, bigMatch:81, form:83, story:"Brezilyalı santrfor, 9 golle Göztepe'nin en skorer yerli/yabancı hücumcularından biri oldu.", career:["Athletico Paranaense","Göztepe"], strengths:["Hız","Bitiricilik","Hareketlilik"] },
  { name:"Kubilay Kanatsizkus", team:"Goztepe",      position:"Forvet",    age:29, marketValue:0.4,goals:2,  assists:1,  minutes:800,  bigMatch:73, form:76, story:"Rotasyonda yedek santrfor olarak oyuna sonradan girip fizik avantajıyla yıpratıcı rol üstlendi.", career:["Bursaspor","Kocaelispor","Rizespor","Göztepe"], strengths:["Fizik","Hava Topu"] },
 
  // ===== SAMSUNSPOR =====
  { name:"Okan Kocuk",         team:"Samsunspor",   position:"Kaleci",    age:30, marketValue:2,  goals:0,  assists:0,  minutes:3300, bigMatch:84, form:85, story:"Samsunspor kalesinde gösterdiği istikrarla takımın ligi orta sıralarda tamamlamasını sağladı.", career:["Bursaspor","Galatasaray","Samsunspor"], strengths:["Kurtarış","Refleks","Liderlik"] },
  { name:"Marius Mouandilmadji", team:"Samsunspor", position:"Forvet",    age:27, marketValue:7,  goals:14, assists:2,  minutes:2300, bigMatch:81, form:85, story:"Samsunspor formasıyla 14 gol atarak takımın en golcü oyuncusu oldu ve hücum hattını sırtladı.", career:["Porto B","Augsburg","Samsunspor"], strengths:["Bitiricilik","Hız","Fizik"] },
  { name:"Halil Yeral",        team:"Samsunspor",   position:"Kaleci",    age:26, marketValue:0.3,goals:0,  assists:0,  minutes:180,  bigMatch:70, form:75, story:"Kupada görev alan yedek kaleci, görev verildiği anlarda kalesinde elinden geleni yaptı.", career:["Akhisarspor","Samsunspor"], strengths:["Refleks"] },
  { name:"Rick van Drongelen", team:"Samsunspor",   position:"Defans",    age:27, marketValue:2.5,goals:2,  assists:0,  minutes:3100, bigMatch:83, form:85, story:"Hollandalı sol ayaklı stoper, Samsunspor savunmasında hava toplarında ve markajda kusursuzdu.", career:["Sparta Rotterdam","Hamburg","Union Berlin","Hansa Rostock","Samsunspor"], strengths:["Markaj","Hava Topu","Liderlik"] },
  { name:"Lubomir Satka",      team:"Samsunspor",   position:"Defans",    age:30, marketValue:1.2,goals:1,  assists:0,  minutes:2700, bigMatch:81, form:82, story:"Slovak stoper, dengeli oyunu, pozisyon bilgisi ve sakin yapısıyla savunmanın güvencesi oldu.", career:["Newcastle","Lech Poznan","Samsunspor"], strengths:["Sakinlik","Yer Tutuş"] },
  { name:"Zeki Yavru",         team:"Samsunspor",   position:"Defans",    age:34, marketValue:0.2,goals:1,  assists:5,  minutes:2400, bigMatch:80, form:81, story:"Takımın kaptanlarından, tecrübeli sağ bek duran toplardaki başarısı ve 5 asistiyle öne çıktı.", career:["Trabzonspor","Kayserispor","Giresunspor","Samsunspor"], strengths:["Duran Top","Orta","Tecrübe"] },
  { name:"Marc Bola",          team:"Samsunspor",   position:"Defans",    age:28, marketValue:1.5,goals:0,  assists:3,  minutes:2600, bigMatch:79, form:81, story:"Sol bekte atletizmi ve hızıyla savunma gücünü artırırken hücuma da 3 asistlik katkı verdi.", career:["Arsenal","Middlesbrough","Samsunspor"], strengths:["Dayanıklılık","Hız","Savunma"] },
  { name:"Youssef Ait Bennasser", team:"Samsunspor",position:"Orta saha", age:29, marketValue:1.5,goals:2,  assists:2,  minutes:2800, bigMatch:81, form:82, story:"Faslı ön libero, orta sahada oyunun yönünü değiştirme kalitesi ve top çalma başarısıyla dinamo görevi gördü.", career:["Monaco","Nancy","Saint-Etienne","Adanaspor","Samsunspor"], strengths:["Pas kalitesi","Top Kapma","Fizik"] },
  { name:"Flavien Tait",       team:"Samsunspor",   position:"Orta saha", age:33, marketValue:0.8,goals:1,  assists:4,  minutes:1800, bigMatch:79, form:80, story:"Rennes geçmişli Fransız merkez orta saha, tecrübesi ve pas dağıtımıyla rotasyonda kilit rol oynadı.", career:["Angers","Rennes","Samsunspor"], strengths:["Pas","Oyun Görüşü","Tecrübe"] },
  { name:"Carlo Holse",        team:"Samsunspor",   position:"Orta saha", age:27, marketValue:3.5,goals:7,  assists:8,  minutes:2900, bigMatch:83, form:85, story:"Danimarkalı 10 numara, 7 gol ve 8 asistlik üretkenliğiyle Samsunspor hücumunun beyni oldu.", career:["Kopenhag","Rosenborg","Samsunspor"], strengths:["Yaratıcılık","Vizyon","Asist"] },
  { name:"Olivier Ntcham",     team:"Samsunspor",   position:"Orta saha", age:30, marketValue:3.2,goals:9,  assists:6,  minutes:2700, bigMatch:84, form:86, story:"Kamerunlu yıldız, orta sahadaki güçlü fiziği, uzaktan şutları ve 9 golüyle sezonun en iyi oyuncularındandı.", career:["Man City","Genoa","Celtic","Marseille","Swansea","Samsunspor"], strengths:["Güç","Uzak Şut","Teknik"] },
  { name:"Kingsley Schindler", team:"Samsunspor",   position:"Kanat",     age:32, marketValue:0.6,goals:3,  assists:3,  minutes:1900, bigMatch:78, form:80, story:"Ganalı kanat oyuncusu, hızı ve hücum/savunma dengesindeki yardımlaşmasıyla takımına katkı sağladı.", career:["Köln","Hannover","Samsunspor"], strengths:["Hız","Mücadele"] },
  { name:"Emre Kilinc",        team:"Samsunspor",   position:"Kanat",     age:31, marketValue:1.2,goals:4,  assists:5,  minutes:2300, bigMatch:80, form:82, story:"Galatasaray ve Sivasspor geçmişli sol açık, çalışkanlığı ve 9 skor katkısıyla hücuma zenginlik kattı.", career:["Boluspor","Sivasspor","Galatasaray","Ankaragücü","Samsunspor"], strengths:["Teknik","Pas","Çalışkanlık"] },
  { name:"Gaetan Laura",       team:"Samsunspor",   position:"Forvet",    age:30, marketValue:0.5,goals:3,  assists:1,  minutes:1000, bigMatch:74, form:77, story:"Yedek santrfor olarak hızı ve fiziksel patlayıcılığıyla rotasyona güç kazandırdı.", career:["Paris FC","Cosenza","Samsunspor"], strengths:["Hız","Fizik"] },
  { name:"Arbnor Muja",        team:"Samsunspor",   position:"Kanat",     age:27, marketValue:1.8,goals:5,  assists:4,  minutes:2100, bigMatch:80, form:82, story:"Antwerp'ten transfer edilen Arnavut kanat, driplingleri ve hücumdaki enerjisiyle 9 gole etki etti.", career:["Drita","Antwerp","Samsunspor"], strengths:["Dribbling","Çeviklik"] },

  // ===== RİZESPOR =====
  { name:"Yahia Fofana",       team:"Rizespor",     position:"Kaleci",    age:25, marketValue:5,  goals:0,  assists:0,  minutes:3200, bigMatch:84, form:85, story:"Angers'den Rizespor'a gelen kaleci, gösterdiği performansla piyasa değerini 5 milyon Euro'ya çıkardı.", career:["Le Havre","Angers","Rizespor"], strengths:["Kurtarış","Fizik","Clean Sheet"] },
  { name:"Ibrahim Olawoyin",   team:"Rizespor",     position:"Orta saha", age:28, marketValue:2.2,goals:8,  assists:5,  minutes:2600, bigMatch:82, form:84, story:"Rizespor orta sahasında hem savunmaya yardım eden hem de 8 gol, 5 asistle hücumu sırtlayan kilit oyuncu.", career:["Ankara Keçiörengücü","Rizespor"], strengths:["Dayanıklılık","Dribbling","Mücadele"] },

  // ===== KONYASPOR =====
  { name:"Guilherme Sitya",    team:"Konyaspor",    position:"Defans",    age:36, marketValue:0.2,goals:1,  assists:6,  minutes:2800, bigMatch:80, form:81, story:"Konyaspor'un tecrübeli sol beki ve kaptanı, duran toplardaki ustalığı ve 6 asistiyle yine fark yarattı.", career:["Jagiellonia","Konyaspor"], strengths:["Orta","Duran Top","Tecrübe"] },
  { name:"Jackson Muleka",     team:"Konyaspor",    position:"Forvet",    age:26, marketValue:2.8,goals:10, assists:3,  minutes:2400, bigMatch:82, form:83, story:"Konyaspor'un hücum hattını hareketlendiren Muleka, attığı 10 golle ligde kalma yolunda kritik katkılar sağladı.", career:["Mazembe","Standard Liege","Kasimpasa","Besiktas","Konyaspor"], strengths:["Hız","Mücadele","Bitiricilik"] },

  // ===== KOCAELİSPOR =====
  { name:"Aleksandar Jovanovic",team:"Kocaelispor", position:"Kaleci",    age:33, marketValue:0.5,goals:0,  assists:0,  minutes:3100, bigMatch:82, form:83, story:"Kocaelispor'un tecrübeli Sırp kalecisi, kritik maçlardaki kurtarışlarıyla ligde kalmayı garantiledi.", career:["Aarhus","Apollon Limassol","Kocaelispor"], strengths:["Refleks","Deneyim","Hava Topu"] },
  { name:"Bruno Petkovic",     team:"Kocaelispor",  position:"Forvet",    age:31, marketValue:1.5,goals:8,  assists:4,  minutes:2100, bigMatch:83, form:82, story:"Dinamo Zagreb'den transfer edilen Hırvat santrfor, güçlü fiziği, top saklama becerisi ve 8 golüyle takımını taşıdı.", career:["Bologna","Dinamo Zagreb","Kocaelispor"], strengths:["Top Saklama","Fizik","Tecrübe"] },

  // ===== ALANYASPOR =====
  { name:"Ertugrul Taskiran",  team:"Alanyaspor",   position:"Kaleci",    age:36, marketValue:0.1,goals:0,  assists:0,  minutes:3400, bigMatch:85, form:88, story:"Tecrübeli kaleci Alanyaspor kalesinde gösterdiği kurtarışlarla takımının en güvendiği isimlerden biri oldu.", career:["Fenerbahce","Kasımpaşa","Alanyaspor"], strengths:["Refleks","Tecrübe","Liderlik"] },
  { name:"Ianis Hagi",         team:"Alanyaspor",   position:"Orta saha", age:27, marketValue:2.5,goals:6,  assists:9,  minutes:2400, bigMatch:84, form:85, story:"Alanyaspor orta sahasında oyun zekası, teknik kalitesi ve 9 asistiyle takımın oyun kurucu lideri oldu.", career:["Fiorentina","Genk","Rangers","Alaves","Alanyaspor"], strengths:["Teknik","Pas","Oyun Görüşü"] },

  // ===== GAZİANTEP FK =====
  { name:"Mohamed Bayo",       team:"Gaziantep FK", position:"Forvet",    age:27, marketValue:4.5,goals:15, assists:4,  minutes:2300, bigMatch:84, form:87, story:"Lille'den kiralanan santrfor, 15 golle Gaziantep'i ligde tutan en büyük hücum gücü oldu.", career:["Clermont","Lille","Gaziantep FK"], strengths:["Bitiricilik","Fizik","Ceza Sahası"] },
  { name:"Kacper Kozlowski",   team:"Gaziantep FK", position:"Orta saha", age:22, marketValue:6,  goals:5,  assists:8,  minutes:2500, bigMatch:81, form:84, story:"Gaziantep FK orta sahasında dinamizmi ve 8 asistiyle fark yaratan Polonyalı genç yıldız, ligin gözdesi oldu.", career:["Pogon","Brighton","Vitesse","Gaziantep FK"], strengths:["Pas kalitesi","Yaratıcılık","Asist"] },

  // ===== KASIMPAŞA =====
  { name:"Andreas Gianniotis", team:"Kasimpasa",    position:"Kaleci",    age:33, marketValue:0.3,goals:0,  assists:0,  minutes:3200, bigMatch:82, form:81, story:"Kasımpaşa kalesinde gösterdiği reflekslerle kritik puanlar kazandıran tecrübeli Yunan file bekçisi.", career:["Olympiacos","Maccabi Tel Aviv","Kasimpasa"], strengths:["Refleks","Kurtarış","Deneyim"] },
  { name:"Adrian Benedyczak",  team:"Kasimpasa",    position:"Forvet",    age:25, marketValue:5,  goals:11, assists:3,  minutes:2200, bigMatch:80, form:82, story:"Parma'dan transfer edilen Polonyalı santrfor, 11 golle Kasımpaşa'nın en skorer ismi oldu.", career:["Pogon","Parma","Kasimpasa"], strengths:["Bitiricilik","Hava Topu","Fizik"] },

  // ===== GENÇLERBİRLİĞİ =====
  { name:"Henry Onyekuru",     team:"Genclerbirligi",position:"Kanat",     age:28, marketValue:1,  goals:7,  assists:8,  minutes:1900, bigMatch:80, form:82, story:"Gençlerbirliği'nde eski günlerine dönen Onyekuru, 7 gol and 8 asistlik süratli oyunuyla parladı.", career:["Eupen","Everton","Galatasaray","Monaco","Olympiacos","Adana Demirspor","Genclerbirligi"], strengths:["Hız","Dribbling","Yaratıcılık"] },
  { name:"M'Baye Niang",       team:"Genclerbirligi",position:"Forvet",    age:31, marketValue:0.8,goals:8,  assists:3,  minutes:1800, bigMatch:79, form:81, story:"Tecrübeli santrfor, gücü ve attığı 8 kritik golle takımının gol yükünü taşıdı.", career:["Milan","Montpellier","Rennes","Torino","Adana Demirspor","Genclerbirligi"], strengths:["Fizik","Şut","Hava Topu"] },

  // ===== EYÜPSPOR =====
  { name:"Emre Akbaba",        team:"Eyupspor",     position:"Orta saha", age:33, marketValue:1,  goals:5,  assists:8,  minutes:2200, bigMatch:79, form:80, story:"Milli orta saha oyuncusu tecrübesi ve 8 asistlik katkısıyla Eyüpspor'a büyük liderlik yaptı.", career:["Alanyaspor","Galatasaray","Adana Demirspor","Eyupspor"], strengths:["Tecrübe","Asist","Liderlik"] },
  { name:"Umut Bozok",         team:"Eyupspor",     position:"Forvet",    age:29, marketValue:1.5,goals:9,  assists:4,  minutes:2100, bigMatch:81, form:83, story:"Trabzonspor'dan transfer edilen golcü oyuncu, 9 golle takımının hücum hattındaki en verimli ismiydi.", career:["Nimes","Lorient","Kasimpasa","Trabzonspor","Eyupspor"], strengths:["Bitiricilik","Pozisyon Alma"] },
  { name:"Berke Ozer",         team:"Eyupspor",     position:"Kaleci",    age:26, marketValue:1.8,goals:0,  assists:0,  minutes:3000, bigMatch:78, form:80, story:"Eyüpspor kalesinde gösterdiği istikrarlı performans ve kritik kurtarışlarla savunmaya büyük güven verdi.", career:["Fenerbahce","Westerlo","Eyupspor"], strengths:["Refleks","Bire Bir","Yan Top"] },
  { name:"Robin Yalcin",       team:"Eyupspor",     position:"Defans",    age:32, marketValue:0.6,goals:1,  assists:1,  minutes:2200, bigMatch:77, form:78, story:"Savunmada stoper ve sağ bek pozisyonlarında çok yönlülüğü ve tecrübesiyle rotasyonu güçlendirdi.", career:["Stuttgart","Rizespor","Sivasspor","Paderborn","Eyupspor"], strengths:["Çok Yönlülük","Mücadele","Pozisyon Alma"] },
  { name:"Leo Dubois",         team:"Eyupspor",     position:"Defans",    age:31, marketValue:3.5,goals:1,  assists:4,  minutes:2700, bigMatch:82, form:83, story:"Galatasaray ve Başakşehir sonrası Eyüpspor'a gelen Fransız sağ bek, 4 asist ve oyun zekasıyla katkı sağladı.", career:["Nantes", "Lyon", "Galatasaray", "Basaksehir", "Eyupspor"], strengths:["Orta", "Pozisyon Alma", "Tecrübe"] },
  { name:"Veysel Sari",        team:"Eyupspor",     position:"Defans",    age:37, marketValue:0.1,goals:1,  assists:0,  minutes:1800, bigMatch:76, form:77, story:"Süper Lig'in en tecrübeli stoperlerinden biri. Güçlü fiziği ve hava toplarındaki etkisiyle katkı sundu.", career:["Eskisehirspor","Galatasaray","Kasimpasa","Antalyaspor","Eyupspor"], strengths:["Hava Topu","Markaj","Liderlik"] },
  { name:"Caner Erkin",        team:"Eyupspor",     position:"Defans",    age:37, marketValue:0.1,goals:0,  assists:6,  minutes:1600, bigMatch:79, form:80, story:"Sol bek pozisyonunda adrese teslim ortalarıyla tanınan emektar yıldız, 6 asistle hücumun en büyük silahlarındandı.", career:["CSKA Moskova","Galatasaray","Fenerbahce", "Besiktas","Karagumruk","Eyupspor"], strengths:["Orta","Duran Top","Vizyon"] },
  { name:"Luccas Claro",       team:"Eyupspor",     position:"Defans",    age:34, marketValue:0.4,goals:1,  assists:0,  minutes:2100, bigMatch:78, form:79, story:"Brezilyalı stoper, savunmanın merkezinde fiziksel gücü ve kritik müdahaleleriyle rotasyonun kilit parçasıydı.", career:["Coritiba", "Genclerbirligi", "Fluminense", "Eyupspor"], strengths:["Fizik","Top Kapma"] },
  { name:"Melih Kabasakal",    team:"Eyupspor",     position:"Orta saha", age:30, marketValue:0.5,goals:1,  assists:2,  minutes:1900, bigMatch:75, form:78, story:"Merkez orta sahada çalışkanlığı, pres gücü ve basit ama etkili pas dağıtımıyla rotasyona derinlik kattı.", career:["Samsunspor", "Istanbulspor", "Eyupspor"], strengths:["Pres","Mücadele"] },
  { name:"Fredrik Midtsjo",    team:"Eyupspor",     position:"Orta saha", age:32, marketValue:1.2,goals:2,  assists:3,  minutes:2300, bigMatch:80, form:81, story:"Galatasaray ve Pendikspor geçmişli Norveçli dinamo, orta sahadaki temposu ve iki yönlü katkısıyla kilit rol oynadı.", career:["Rosenborg", "AZ Alkmaar", "Galatasaray", "Pendikspor", "Eyupspor"], strengths:["Dinamizm","Top Kapma","Dayanıklılık"] },
  { name:"Taskin Ilter",       team:"Eyupspor",     position:"Orta saha", age:31, marketValue:0.4,goals:0,  assists:1,  minutes:1300, bigMatch:75, form:76, story:"Orta sahanın savunma yönünde sertliği ve kesiciliğiyle yedek kulübesinin önemli bir gücü oldu.", career:["Kardemir Karabukspor","Denizlispor","Eyupspor"], strengths:["Top Kapma","Mücadele"] },
  { name:"Samu Saiz",          team:"Eyupspor",     position:"Orta saha", age:35, marketValue:0.8,goals:4,  assists:5,  minutes:2000, bigMatch:79, form:81, story:"İspanyol oyun kurucu, dar alandaki yüksek teknik becerisi ve 9 gol katkısıyla hücumun beyniydi.", career:["Leeds United", "Girona", "Sivasspor", "Eyupspor"], strengths:["Teknik","Dribbling","Pas"] },
  { name:"Ahmed Kutucu",       team:"Eyupspor",     position:"Kanat",     age:26, marketValue:2.2,goals:6,  assists:6,  minutes:2400, bigMatch:81, form:83, story:"Milli kanat oyuncusu, hızı ve bitiriciliğiyle kanatlardan 12 gollük direkt katkı vererek parladı.", career:["Schalke 04", "Istanbul Basaksehir", "Sandhausen", "Eyupspor"], strengths:["Hız","Dribbling","Bitiricilik"] },
  { name:"Mame Thiam",         team:"Eyupspor",     position:"Forvet",    age:33, marketValue:1.5,goals:8,  assists:4,  minutes:2200, bigMatch:80, form:82, story:"Kayserispor ve Pendikspor sonrası Eyüpspor'da forvette çalışkanlığı ve 8 golüyle kalitesini kanıtladı.", career:["Kasımpaşa","Fenerbahce", "Kayserispor", "Pendikspor", "Eyupspor"], strengths:["Pres", "Bitiricilik", "Çalışkanlık"] },
  { name:"Jonjo Shelvey",      team:"Eyupspor",     position:"Orta saha", age:34, marketValue:1,  goals:3,  assists:4,  minutes:1700, bigMatch:80, form:79, story:"İngiliz oyun kurucu, oyun yönlendirme kalitesi, milimetrik uzun pasları ve duran top becerisiyle lige damga vurdu.", career:["Liverpool", "Newcastle", "Nottingham Forest", "Rizespor", "Eyupspor"], strengths:["Uzun Pas","Duran Top","Tecrübe"] },

  // ===== ANTALYASPOR (2025-26) =====
  { name:"Julián Cuesta",      team:"Antalyaspor",  position:"Kaleci",    age:27, marketValue:0.8, goals:0, assists:0, minutes:3100, bigMatch:78, form:79, story:"Arjantinli kaleci, Antalyaspor kalesini sağlam tutarak sezon boyunca güven verdi.", career:["Independiente","Antalyaspor"], strengths:["Refleks","Bire Bir","Sakinlik"] },
  { name:"Lautaro Giannetti",  team:"Antalyaspor",  position:"Defans",    age:29, marketValue:1.5, goals:2, assists:1, minutes:2800, bigMatch:80, form:81, story:"Arjantinli stoper, güçlü fiziği ve savunma liderliğiyle Antalyaspor'un arka hattının direğiydi.", career:["Vélez","Antalyaspor"], strengths:["Güç","Hava Topu","Liderlik"] },
  { name:"Georgiy Dzhikiya",   team:"Antalyaspor",  position:"Defans",    age:31, marketValue:1.2, goals:1, assists:1, minutes:2600, bigMatch:80, form:80, story:"Rus milli takımının tecrübeli stoperi, Antalyaspor'da rakip forvete hayat hakkı tanımadı.", career:["Spartak Moskova","Antalyaspor"], strengths:["Güç","Müdahale","Tecrübe"] },
  { name:"Abdülkadir Ömür",    team:"Antalyaspor",  position:"Orta saha", age:26, marketValue:2,   goals:5, assists:7, minutes:2400, bigMatch:83, form:84, story:"Trabzonspor'un değerli yetiştirmesi milli orta saha, Antalyaspor'da yaratıcı oyunuyla sezonun isimlerinden biri oldu.", career:["Trabzonspor","Hull City","Antalyaspor"], strengths:["Teknik","Vizyon","Dribbling"] },
  { name:"Dario Šarić",        team:"Antalyaspor",  position:"Orta saha", age:31, marketValue:1.5, goals:4, assists:5, minutes:2500, bigMatch:81, form:82, story:"Bosnalı merkez orta saha, pas kalitesi ve oyun görüşüyle Antalyaspor'un motorunu oluşturdu.", career:["Anderlecht","Çeşitli","Antalyaspor"], strengths:["Pas","Oyun Görüşü","Liderlik"] },
  { name:"Kenneth Paal",        team:"Antalyaspor",  position:"Defans",    age:27, marketValue:1.5, goals:0, assists:4, minutes:2700, bigMatch:79, form:81, story:"Hollandalı sol bek, hem savunma hem hücumda dengeli performansıyla dikkat çekti.", career:["PSV","Antalyaspor"], strengths:["Hız","Orta","Savunma"] },
  { name:"Sander van de Streek",team:"Antalyaspor",  position:"Orta saha", age:31, marketValue:1.2, goals:3, assists:6, minutes:2300, bigMatch:80, form:81, story:"Hollandalı orta saha, top kapma ve distribüsyon kalitesiyle Antalyaspor'un kalbinde görev yaptı.", career:["FC Utrecht","Antalyaspor"], strengths:["Pas","Top Kapma","İş Disiplini"] },
  { name:"Soner Dikmen",        team:"Antalyaspor",  position:"Defans",    age:28, marketValue:1,   goals:0, assists:2, minutes:2400, bigMatch:78, form:79, story:"Sağ bekte savunma gücü ve çalışkanlığıyla Antalyaspor'un güvenilir ismi oldu.", career:["Karagümrük","Antalyaspor"], strengths:["Savunma","Dayanıklılık","Disiplin"] },

  // ===== RİZESPOR (2025-26) =====
  { name:"Yahia Fofana",        team:"Rizespor",     position:"Kaleci",    age:30, marketValue:1.5, goals:0, assists:0, minutes:2800, bigMatch:80, form:81, story:"Gine asıllı Fransız kaleci, Rizespor'un son halkasında tutarlı kurtarışlarla sezon boyunca güven verdi.", career:["Nice","Le Havre","Rizespor"], strengths:["Refleks","Bire Bir","Kurtarış"] },
  { name:"Attila Mocsi",        team:"Rizespor",     position:"Defans",    age:29, marketValue:1.5, goals:1, assists:2, minutes:2700, bigMatch:79, form:80, story:"Macar sağ bek, sağ kulvarda hem savunma hem hücuma katkı sağlayan çalışkan oyuncu.", career:["Honvéd","Rizespor"], strengths:["Savunma","Çalışkanlık","Hız"] },
  { name:"Modibo Sagnan",       team:"Rizespor",     position:"Defans",    age:28, marketValue:1.8, goals:2, assists:0, minutes:2900, bigMatch:81, form:82, story:"Fransız stoper, güçlü fiziği ve markaj ustalığıyla Rizespor savunmasının en kritik ismi oldu.", career:["Grenoble","Nîmes","Rizespor"], strengths:["Fizik","Markaj","Hava Topu"] },
  { name:"Casper Højer Nielsen",team:"Rizespor",     position:"Defans",    age:25, marketValue:2,   goals:0, assists:3, minutes:2600, bigMatch:80, form:81, story:"Danimarkalı sol bek, modern bek anlayışıyla hem savunma hem hücuma katkıda bulunan kaliteli oyuncu.", career:["Silkeborg","Rizespor"], strengths:["Hız","Orta","Teknik"] },
  { name:"İbrahim Olawoyin",    team:"Rizespor",     position:"Orta saha", age:27, marketValue:2.5, goals:8, assists:5, minutes:2800, bigMatch:83, form:84, story:"Nijeryalı orta saha, Rizespor'un dinamosu; hem gol hem asist üretimiyle ligin en etkili box-to-box oyuncularından.", career:["Konyaspor","Rizespor"], strengths:["Dinamizm","Gol","Top Kapma"] },
  { name:"Qazim Laci",          team:"Rizespor",     position:"Orta saha", age:28, marketValue:2,   goals:4, assists:6, minutes:2500, bigMatch:82, form:83, story:"Arnavut milli takımının yaratıcı merkez oyuncusu, Rizespor'da ustalıklı pasları ve geniş saha görüşüyle öne çıktı.", career:["Partizani","Legia","Rizespor"], strengths:["Pas","Oyun Görüşü","Yaratıcılık"] },
  { name:"Taylan Antalyalı",    team:"Rizespor",     position:"Orta saha", age:28, marketValue:2.5, goals:2, assists:4, minutes:2700, bigMatch:82, form:83, story:"Galatasaray'ın değerli yetiştirmesi milli oyuncu, Rizespor'da defansif orta sahada kilit rol üstlendi.", career:["Galatasaray","Rizespor"], strengths:["Top Kapma","Pas","Liderlik"] },
  { name:"Halil Dervişoğlu",    team:"Rizespor",     position:"Forvet",    age:26, marketValue:3,   goals:9, assists:3, minutes:2400, bigMatch:83, form:84, story:"A Milli Takım golcüsü, Rizespor'da 9 golle sezonun en etkili Türk forvetlerinden biri olduğunu kanıtladı.", career:["Galatasaray","Brentford","Rizespor"], strengths:["Bitiricilik","Hız","Gol Sezgisi"] },
  { name:"Ali Sowe",            team:"Rizespor",     position:"Forvet",    age:25, marketValue:2.5, goals:11, assists:4, minutes:2600, bigMatch:84, form:85, story:"Gambiyalı golcü, patlayıcı oyun tarzı ve 11 golle Rizespor'un sezonun en değerli bombacısı oldu.", career:["Viborg","Sivasspor","Rizespor"], strengths:["Hız","Bitiricilik","Fizik"] },
  { name:"Valentin Mihaila",    team:"Rizespor",     position:"Kanat",     age:25, marketValue:3,   goals:6, assists:8, minutes:2300, bigMatch:83, form:84, story:"Rumen milli takımının parlayan yıldızı, hızı ve 1'e 1 üstünlüğüyle Rizespor kanatlarını ateşledi.", career:["Parma","Atalanta","Rizespor"], strengths:["Hız","Dribbling","Gol"] },

  // ===== KONYASPOR (2025-26) =====
  { name:"Deniz Ertaş",          team:"Konyaspor",    position:"Kaleci",    age:26, marketValue:1.2, goals:0, assists:0, minutes:3100, bigMatch:80, form:81, story:"Genç Türk kaleci, Konyaspor kalesinde olgunlaşarak sezonun en güvenilir file bekçilerinden biri olmaya yükseldi.", career:["Kayserispor","Konyaspor"], strengths:["Refleks","Bire Bir","Liderlik"] },
  { name:"Josip Čalusić",        team:"Konyaspor",    position:"Defans",    age:32, marketValue:1,   goals:1, assists:2, minutes:2800, bigMatch:80, form:80, story:"Tecrübeli Hırvat sağ bek, savunma disiplini ve deney birikimini Konyaspor'a taşıdı.", career:["Çeşitli Hırvat","Konyaspor"], strengths:["Savunma","Tecrübe","Disiplin"] },
  { name:"Guilherme Sitya",       team:"Konyaspor",    position:"Defans",    age:28, marketValue:1.5, goals:0, assists:3, minutes:2700, bigMatch:79, form:80, story:"Brezilyalı sol bek, modern bek oyunuyla hem savunmada hem hücumda etkili oldu.", career:["Santos","Konyaspor"], strengths:["Hız","Orta","Hücum Katılımı"] },
  { name:"Adamo Nagalo",          team:"Konyaspor",    position:"Defans",    age:26, marketValue:1.8, goals:2, assists:0, minutes:2900, bigMatch:81, form:82, story:"Burkina Fasolu stoper, fiziksel gücü ve hava toplarındaki üstünlüğüyle Konyaspor savunmasının kilit taşı oldu.", career:["Çeşitli","Konyaspor"], strengths:["Fizik","Hava Topu","Güç"] },
  { name:"Enis Bardhi",           team:"Konyaspor",    position:"Orta saha", age:30, marketValue:3,   goals:7, assists:10, minutes:2800, bigMatch:85, form:86, story:"Kuzey Makedonya'nın yıldız oyuncusu, serbest vuruş ustası ve 17 skor katkısıyla sezonun en etkileyici isimlerinden biri oldu.", career:["Levante","Konyaspor"], strengths:["Duran Top","Şut","Oyun Görüşü"] },
  { name:"Riechedly Bazoer",      team:"Konyaspor",    position:"Orta saha", age:28, marketValue:2.5, goals:4, assists:6, minutes:2600, bigMatch:83, form:84, story:"Hollandalı defansif orta saha, top kapma ve iş gücüyle Konyaspor'un orta saha motorunu oluşturdu.", career:["Ajax","Porto","Konyaspor"], strengths:["Top Kapma","Dinamizm","Pas"] },
  { name:"Deniz Türüç",           team:"Konyaspor",    position:"Kanat",     age:29, marketValue:2,   goals:6, assists:8, minutes:2500, bigMatch:82, form:83, story:"Milli kanat oyuncusu, çevikliği ve asistleriyle Konyaspor'un hücum vektörüydü.", career:["Başakşehir","Konyaspor"], strengths:["Hız","Dribbling","Asist"] },
  { name:"Jackson Muleka",        team:"Konyaspor",    position:"Forvet",    age:25, marketValue:3,   goals:12, assists:3, minutes:2700, bigMatch:84, form:85, story:"Kongolu genç santrfor, 12 gol ve patlayıcı oyunuyla Konyaspor'un tartışmasız en değerli hücum kozu oldu.", career:["Standard Liège","Konyaspor"], strengths:["Hız","Bitiricilik","Fizik"] },
  { name:"Blaz Kramer",           team:"Konyaspor",    position:"Forvet",    age:28, marketValue:2,   goals:8, assists:2, minutes:2200, bigMatch:81, form:82, story:"Sloven santrfor, fiziksel oyunu ve gol içgüdüsüyle Muleka'nın mükemmel forvetteki ortağı oldu.", career:["Olimpija","Çeşitli","Konyaspor"], strengths:["Hava Topu","Bitiricilik","Güç"] },
  { name:"Diogo Gonçalves",       team:"Konyaspor",    position:"Kanat",     age:28, marketValue:2.5, goals:5, assists:9, minutes:2400, bigMatch:83, form:84, story:"Portekizli kanat, tekniği ve sol ayağındaki kalitesiyle Konyaspor'un en tehlikeli oyuncularından biri oldu.", career:["Benfica","PAOK","Konyaspor"], strengths:["Teknik","Dribbling","Asist"] },

  // ===== KOCAELİSPOR (2025-26) =====
  { name:"Aleksandar Jovanovic",team:"Kocaelispor",  position:"Kaleci",    age:32, marketValue:0.8, goals:0, assists:0, minutes:3200, bigMatch:79, form:80, story:"Sırp kaleci, 16 yıl sonra Süper Lig'e dönen Kocaelispor'un kalesinde sezon boyunca güven verdi.", career:["Vojvodina","Kocaelispor"], strengths:["Refleks","Bire Bir","Deneyim"] },
  { name:"Anfernee Dijksteel",  team:"Kocaelispor",  position:"Defans",    age:28, marketValue:2.5, goals:1, assists:3, minutes:2800, bigMatch:82, form:83, story:"Hollandalı sağ bek, Premier Lig tecrübesiyle Kocaelispor'un savunmasına uluslararası kalite kattı.", career:["Middlesbrough","Çeşitli","Kocaelispor"], strengths:["Hız","Savunma","Tecrübe"] },
  { name:"Hrvoje Smolčić",      team:"Kocaelispor",  position:"Defans",    age:25, marketValue:3,   goals:2, assists:1, minutes:2900, bigMatch:83, form:84, story:"Hırvat genç stoper, güçlü fiziği ve oyun zekasıyla Kocaelispor savunmasının en değerli oyuncusu oldu.", career:["Rijeka","Kocaelispor"], strengths:["Güç","Hava Topu","Oyun Zekası"] },
  { name:"Massadio Haïdara",    team:"Kocaelispor",  position:"Defans",    age:32, marketValue:1.2, goals:0, assists:4, minutes:2600, bigMatch:80, form:80, story:"Fransız sol bek, hücum katılımları ve tecrübesiyle Kocaelispor'un sol kulvarına değer kattı.", career:["Newcastle","Metz","Kocaelispor"], strengths:["Hız","Orta","Tecrübe"] },
  { name:"Karol Linetty",       team:"Kocaelispor",  position:"Orta saha", age:30, marketValue:3,   goals:5, assists:7, minutes:2700, bigMatch:83, form:84, story:"Polonyalı milli takım oyuncusu, pas kalitesi ve büyük maç tecrübesiyle Kocaelispor'un orta saha lideri oldu.", career:["Sampdoria","Torino","Kocaelispor"], strengths:["Pas","Oyun Görüşü","Büyük Maç"] },
  { name:"Joseph Nonge",         team:"Kocaelispor",  position:"Orta saha", age:22, marketValue:3,   goals:4, assists:6, minutes:2400, bigMatch:82, form:84, story:"Belçika asıllı genç yıldız, Dortmund akademisinden çıkma dinamik oyuncu Kocaelispor'da sezonun sürprizi oldu.", career:["Borussia Dortmund","Kocaelispor"], strengths:["Dinamizm","Dribbling","Potansiyel"] },
  { name:"Bruno Petkovic",       team:"Kocaelispor",  position:"Forvet",    age:31, marketValue:2,   goals:10, assists:4, minutes:2600, bigMatch:83, form:84, story:"Hırvat milli takımının deneyimli santrforu, 10 golle Kocaelispor'un sezon boyunca en güvenilir hücum kozu oldu.", career:["Dinamo Zagreb","Hertha","Kocaelispor"], strengths:["Hava Topu","Bitiricilik","Fizik"] },
  { name:"Serdar Dursun",        team:"Kocaelispor",  position:"Forvet",    age:33, marketValue:1.5, goals:7, assists:3, minutes:2100, bigMatch:80, form:81, story:"Milli golcü, Kocaelispor'un süper lig dönüşünde tecrübesiyle önemli gol katkıları verdi.", career:["Darmstadt","Fenerbahçe","Kocaelispor"], strengths:["Bitiricilik","Tecrübe","Hava Topu"] },
  { name:"Darko Churlinov",      team:"Kocaelispor",  position:"Kanat",     age:24, marketValue:3,   goals:6, assists:8, minutes:2500, bigMatch:83, form:85, story:"Kuzey Makedonyalı genç kanat yıldızı, hızı ve dripling kalitesiyle Kocaelispor hücumunu canlandırdı.", career:["Schalke","Kocaelispor"], strengths:["Hız","Dribbling","Gol"] },
  { name:"Rigoberto Rivas",      team:"Kocaelispor",  position:"Kanat",     age:25, marketValue:2.5, goals:5, assists:7, minutes:2300, bigMatch:82, form:83, story:"Honduraslı hızlı kanat, rakipleri baskı altına alarak sezon boyunca Kocaelispor hücumuna ivme kattı.", career:["Werder Bremen","Kocaelispor"], strengths:["Hız","Dribbling","Fizik"] },

  // ===== ALANYASPOR (2025-26) =====
  { name:"Ertuğrul Taşkıran",   team:"Alanyaspor",   position:"Kaleci",    age:27, marketValue:1.5, goals:0, assists:0, minutes:3000, bigMatch:81, form:82, story:"Milli kaleci, Alanyaspor kalesinde olgun performansı ve refleksleriyle takımın son kalesi oldu.", career:["Trabzonspor","Alanyaspor"], strengths:["Refleks","Bire Bir","Liderlik"] },
  { name:"Florent Hadergjonaj", team:"Alanyaspor",   position:"Defans",    age:30, marketValue:2,   goals:1, assists:4, minutes:2700, bigMatch:81, form:82, story:"İsviçreli Kosova asıllı sağ bek, Premier Lig geçmişiyle Alanyaspor'un sağ kulvarını kaliteli biçimde yönetti.", career:["Huddersfield","Inter","Alanyaspor"], strengths:["Hız","Savunma","Orta"] },
  { name:"Fidan Aliti",          team:"Alanyaspor",   position:"Defans",    age:27, marketValue:2,   goals:1, assists:3, minutes:2800, bigMatch:81, form:82, story:"Kosovalı sol bek, sol kulvarda hem savunma hem hücuma katkısıyla sezonun en dikkat çekici defans oyuncularından biri oldu.", career:["Winterthur","Çeşitli","Alanyaspor"], strengths:["Hız","Orta","Fizik"] },
  { name:"Bruno Viana",          team:"Alanyaspor",   position:"Defans",    age:29, marketValue:2.5, goals:2, assists:1, minutes:2900, bigMatch:82, form:83, story:"Portekizli stoper, Braga ve Çeşitli büyük kulüplerin geçmişiyle Alanyaspor savunmasının direği oldu.", career:["Braga","Rangers","Alanyaspor"], strengths:["Güç","Hava Topu","Markaj"] },
  { name:"Gaius Makouta",        team:"Alanyaspor",   position:"Orta saha", age:26, marketValue:2.5, goals:3, assists:5, minutes:2600, bigMatch:82, form:83, story:"Kongo asıllı Fransız defansif orta saha, top kapma kapasitesi ve iş gücüyle Alanyaspor'un orta saha motorunu oluşturdu.", career:["Toulouse","Alanyaspor"], strengths:["Top Kapma","Dinamizm","Fizik"] },
  { name:"Ianis Hagi",           team:"Alanyaspor",   position:"Orta saha", age:27, marketValue:4,   goals:7, assists:9, minutes:2700, bigMatch:85, form:86, story:"Gheorghe Hagi'nin oğlu ve Rumen milli takımının parlayan yıldızı, Alanyaspor'da olağanüstü bir sezon geçirerek 16 skor katkısıyla ligin en iyi oyuncularından biri oldu.", career:["Rangers","Alanyaspor"], strengths:["Teknik","Yaratıcılık","Şut"] },
  { name:"Güven Yalçın",         team:"Alanyaspor",   position:"Forvet",    age:27, marketValue:4,   goals:14, assists:4, minutes:2800, bigMatch:86, form:87, story:"Milli golcü, 14 golle ligin en etkin Türk santrforu unvanını alarak Alanyaspor'un sezonunu taşıdı.", career:["Beşiktaş","Alanyaspor"], strengths:["Bitiricilik","Hava Topu","Pozisyon Alma"] },
  { name:"Ui-Jo Hwang",           team:"Alanyaspor",   position:"Forvet",    age:33, marketValue:3,   goals:9, assists:3, minutes:2300, bigMatch:83, form:84, story:"Güney Koreli milli golcü, tecrübe ve bitiriciliğiyle Alanyaspor'un Güven Yalçın'ın ortağı olarak etkili bir sezon geçirdi.", career:["Bordeaux","Nottingham Forest","Alanyaspor"], strengths:["Bitiricilik","Hız","Tecrübe"] },
  { name:"Meschack Elia",         team:"Alanyaspor",   position:"Kanat",     age:26, marketValue:3.5, goals:7, assists:10, minutes:2600, bigMatch:84, form:85, story:"Kongolu hızlı kanat, explosif oyunu ve 17 skor katkısıyla Alanyaspor'un en tehlikeli silahlarından biri oldu.", career:["Young Boys","Alanyaspor"], strengths:["Hız","Dribbling","Asist"] },
  { name:"Steve Mounié",          team:"Alanyaspor",   position:"Forvet",    age:30, marketValue:3,   goals:8, assists:2, minutes:2100, bigMatch:82, form:83, story:"Beninli güçlü forvet, hava toplarındaki ve zemindeki etkinliğiyle Alanyaspor'un alternatifsiz hücum seçeneği oldu.", career:["Huddersfield","Brest","Alanyaspor"], strengths:["Hava Topu","Güç","Bitiricilik"] },

  // ===== GAZİANTEP FK (2025-26) =====
  { name:"Mustafa Burak Bozan", team:"Gaziantep FK", position:"Kaleci",    age:25, marketValue:1.5, goals:0, assists:0, minutes:3100, bigMatch:80, form:81, story:"Genç Türk kaleci, Gaziantep kalesinde sergilediği olgun performansla sezonun en tutarlı file bekçilerinden biri oldu.", career:["Gaziantep FK"], strengths:["Refleks","Bire Bir","Liderlik"] },
  { name:"Nazım Sangaré",       team:"Gaziantep FK", position:"Defans",    age:29, marketValue:2,   goals:1, assists:1, minutes:2800, bigMatch:81, form:82, story:"Fransız-Gine asıllı stoper, güçlü fiziği ve hava topu hakimiyetiyle Gaziantep savunmasının temel taşı oldu.", career:["Auxerre","Gaziantep FK"], strengths:["Fizik","Hava Topu","Güç"] },
  { name:"Myenty Abena",         team:"Gaziantep FK", position:"Defans",    age:26, marketValue:1.8, goals:1, assists:2, minutes:2700, bigMatch:80, form:81, story:"Kamerunlu stoper, savunma disiplini ve fiziksel üstünlüğüyle Gaziantep'in arka hattını sağlamlaştırdı.", career:["Çeşitli","Gaziantep FK"], strengths:["Güç","Markaj","Hava Topu"] },
  { name:"Kévin Rodrigues",      team:"Gaziantep FK", position:"Defans",    age:29, marketValue:2,   goals:0, assists:5, minutes:2600, bigMatch:80, form:81, story:"Portekizli sol bek, hücum bindirmeleri ve ortalarıyla sol kulvarı canlandırdı.", career:["Sporting CP","Çeşitli","Gaziantep FK"], strengths:["Hız","Orta","Hücum Katılımı"] },
  { name:"Kacper Kozłowski",     team:"Gaziantep FK", position:"Orta saha", age:22, marketValue:6,   goals:5, assists:8, minutes:2500, bigMatch:84, form:85, story:"Polonya'nın en büyük genç yeteneği, yaratıcı oyun anlayışı ve 13 skor katkısıyla sezonun sürprizi oldu.", career:["Brighton","Gaziantep FK"], strengths:["Teknik","Yaratıcılık","Potansiyel"] },
  { name:"Alexandru Maxim",      team:"Gaziantep FK", position:"Orta saha", age:35, marketValue:1,   goals:4, assists:7, minutes:2300, bigMatch:82, form:82, story:"Romanya'nın efsane oyun kurucusu, 15 skor katkısıyla yaşına rağmen Gaziantep'in en kritik oyuncularından biri olmaya devam etti.", career:["Stuttgart","Mainz","Gaziantep FK"], strengths:["Pas","Duran Top","Oyun Görüşü"] },
  { name:"Juninho Bacuna",       team:"Gaziantep FK", position:"Orta saha", age:28, marketValue:2.5, goals:5, assists:6, minutes:2600, bigMatch:82, form:83, story:"Hollandalı kutu-kutu orta saha, hem gol hem asist üretimiyle Gaziantep FK'nın dinamosu oldu.", career:["Birmingham","Rangers","Gaziantep FK"], strengths:["Dinamizm","Gol","Mücadele"] },
  { name:"Mohamed Bayo",         team:"Gaziantep FK", position:"Forvet",    age:26, marketValue:4,   goals:15, assists:4, minutes:2800, bigMatch:86, form:87, story:"Gine'li golcü, 15 gol ve 4 asistlik muhteşem sezoniyle Süper Lig'in en tehlikeli santrforlarından biri olarak öne çıktı.", career:["Clermont","Gaziantep FK"], strengths:["Hız","Bitiricilik","Gol Sezgisi"] },
  { name:"Yusuf Kabadayı",        team:"Gaziantep FK", position:"Kanat",     age:20, marketValue:5,   goals:6, assists:9, minutes:2400, bigMatch:84, form:85, story:"Bayern Münih akademisinden yetişen Türk genç yıldızı, 15 skor katkısıyla Süper Lig'de müthiş bir ilk sezonu geçirdi.", career:["Bayern Münih","Gaziantep FK"], strengths:["Hız","Teknik","Potansiyel"] },
  { name:"Christopher Lungoyi",  team:"Gaziantep FK", position:"Kanat",     age:22, marketValue:3,   goals:7, assists:5, minutes:2200, bigMatch:82, form:84, story:"Kongolu genç kanat yıldızı, hızı ve bitiriciliğiyle Gaziantep saldırısına farklı bir boyut kattı.", career:["Club Brugge","Gaziantep FK"], strengths:["Hız","Dribbling","Gol"] },

  // ===== KASIMPAŞA (2025-26) =====
  { name:"Andreas Gianniotis",  team:"Kasimpasa",    position:"Kaleci",    age:37, marketValue:0.5, goals:0, assists:0, minutes:2800, bigMatch:79, form:79, story:"Yunan efsane kaleci, Kasımpaşa'da tecrübesiyle gençlere liderlik etmeye ve gol yememeye devam etti.", career:["PAOK","Kasımpaşa"], strengths:["Tecrübe","Refleks","Liderlik"] },
  { name:"Rodrigo Becão",       team:"Kasimpasa",    position:"Defans",    age:29, marketValue:4,   goals:3, assists:1, minutes:2900, bigMatch:84, form:85, story:"Brezilyalı güçlü stoper, Udinese ve Fenerbahçe geçmişiyle Kasımpaşa savunmasının en büyük ismi oldu.", career:["Udinese","Fenerbahçe","Kasımpaşa"], strengths:["Güç","Hava Topu","Liderlik"] },
  { name:"Nicholas Opoku",      team:"Kasimpasa",    position:"Defans",    age:27, marketValue:2.5, goals:1, assists:1, minutes:2700, bigMatch:82, form:83, story:"Ganalı stoper, hava toplarındaki üstünlüğü ve sert müdahaleleriyle Kasımpaşa'nın geçilmez duvarı oldu.", career:["Amiens","Çeşitli","Kasımpaşa"], strengths:["Güç","Hava Topu","Markaj"] },
  { name:"Kerem Demirbay",      team:"Kasimpasa",    position:"Orta saha", age:32, marketValue:2.5, goals:4, assists:8, minutes:2600, bigMatch:84, form:84, story:"Alman milli takımının tecrübeli oyuncusu, tekniği ve duran top uzmanlığıyla Kasımpaşa orta sahasına Bundesliga kalitesi kattı.", career:["Bayer Leverkusen","Kasımpaşa"], strengths:["Pas","Duran Top","Teknik"] },
  { name:"Haris Hajradinović",  team:"Kasimpasa",    position:"Orta saha", age:28, marketValue:2,   goals:5, assists:6, minutes:2500, bigMatch:82, form:83, story:"Boşnak yaratıcı orta saha, sol ayağındaki kaliteli vuruşları ve asistleriyle Kasımpaşa hücumunu yönetti.", career:["Çeşitli","Kasımpaşa"], strengths:["Teknik","Şut","Yaratıcılık"] },
  { name:"İrfan Can Kahveci",   team:"Kasimpasa",    position:"Kanat",     age:30, marketValue:4,   goals:9, assists:7, minutes:2700, bigMatch:85, form:86, story:"Milli yıldız, Kasımpaşa'ya transferiyle sezonun en etkili Türk oyuncularından biri olan İrfan Can, 16 skor katkısıyla muhteşem bir dönem geçirdi.", career:["Başakşehir","Kasımpaşa"], strengths:["Dribbling","Şut","Gol Sezgisi"] },
  { name:"Cenk Tosun",           team:"Kasimpasa",    position:"Forvet",    age:34, marketValue:2,   goals:10, assists:3, minutes:2400, bigMatch:83, form:83, story:"Türkiye'nin golcü efsanesi, Kasımpaşa'da 10 golle ligin en tecrübeli ve etkili santrforlarından biri olmayı sürdürdü.", career:["Everton","Beşiktaş","Kasımpaşa"], strengths:["Bitiricilik","Hava Topu","Tecrübe"] },
  { name:"Adrian Benedyczak",   team:"Kasimpasa",    position:"Forvet",    age:24, marketValue:5,   goals:12, assists:3, minutes:2600, bigMatch:85, form:86, story:"Polonyalı genç yıldız, 12 golüyle Kasımpaşa'nın en skorer ismi olarak ligin en iyi forvetleri arasına girdi.", career:["Parma","Kasımpaşa"], strengths:["Hız","Bitiricilik","Pozisyon Alma"] },
  { name:"Fousseni Diabaté",    team:"Kasimpasa",    position:"Kanat",     age:28, marketValue:3,   goals:7, assists:8, minutes:2500, bigMatch:83, form:84, story:"Malili hızlı kanat, çevikliği ve kanat dripling kalitesiyle Kasımpaşa saldırısını canlandırdı.", career:["Sivasspor","Kasımpaşa"], strengths:["Hız","Dribbling","Asist"] },
  { name:"Emre Taşdemir",       team:"Kasimpasa",    position:"Defans",    age:29, marketValue:1.5, goals:0, assists:3, minutes:2600, bigMatch:80, form:81, story:"Milli sol bek, Kasımpaşa'nın sol kulvarında hem savunma hem hücuma katkıyla güvenilir bir performans sergiledi.", career:["Alanyaspor","Kasımpaşa"], strengths:["Savunma","Hız","Orta"] },

  // ===== GENÇLERBİRLİĞİ (2025-26) =====
  { name:"Gökhan Akkan",         team:"Genclerbirligi",position:"Kaleci",   age:27, marketValue:2,   goals:0, assists:0, minutes:2900, bigMatch:81, form:82, story:"Milli kaleci, Gençlerbirliği'nin süper lig dönüşünde kale çizgisinin güvencesi oldu.", career:["Gençlerbirliği","Hatayspor","Genclerbirligi"], strengths:["Refleks","Bire Bir","Liderlik"] },
  { name:"Dimitris Goutas",      team:"Genclerbirligi",position:"Defans",   age:27, marketValue:2.5, goals:2, assists:1, minutes:2800, bigMatch:82, form:83, story:"Yunan milli takımının tecrübeli stoperi, savunma liderliği ve hava topu gücüyle Gençlerbirliği'nin en değerli defans oyuncusu oldu.", career:["PAOK","Rangers","Genclerbirligi"], strengths:["Güç","Hava Topu","Liderlik"] },
  { name:"Zan Zuzek",            team:"Genclerbirligi",position:"Defans",   age:27, marketValue:2.5, goals:1, assists:2, minutes:2700, bigMatch:81, form:82, story:"Sloven milli takımının solak stoperi, topla çıkış kalitesi ve sağlam savunmasıyla öne çıktı.", career:["Olimpija","Genclerbirligi"], strengths:["Pas","Savunma","Topla Çıkış"] },
  { name:"Oghenekaro Etebo",     team:"Genclerbirligi",position:"Orta saha",age:30, marketValue:3,   goals:4, assists:6, minutes:2700, bigMatch:83, form:84, story:"Nijeryalı merkez orta saha, yılmaz mücadelesi ve fiziksel üstünlüğüyle Gençlerbirliği'nin orta saha baskısını oluşturdu.", career:["Getafe","Stoke City","Genclerbirligi"], strengths:["Fizik","Mücadele","Top Kapma"] },
  { name:"Tom Dele-Bashiru",     team:"Genclerbirligi",position:"Orta saha",age:25, marketValue:4,   goals:5, assists:7, minutes:2600, bigMatch:84, form:85, story:"İngiliz-Nijeryalı yıldız aday, atletizmi ve maç etkisiyle Gençlerbirliği'nin orta sahasını defalarca fark yarattı.", career:["Watford","Rangers","Genclerbirligi"], strengths:["Fizik","Dinamizm","Büyük Maç"] },
  { name:"Mbaye Niang",          team:"Genclerbirligi",position:"Forvet",   age:30, marketValue:1.5, goals:8, assists:3, minutes:2100, bigMatch:81, form:82, story:"Fransız-Senegalli golcü, AC Milan ve birçok büyük kulüpten geçen tecrübe ile Gençlerbirliği'nde gol yağmuruna devam etti.", career:["AC Milan","Torino","Genclerbirligi"], strengths:["Bitiricilik","Fizik","Tecrübe"] },
  { name:"Henry Onyekuru",       team:"Genclerbirligi",position:"Kanat",    age:28, marketValue:2,   goals:7, assists:8, minutes:2500, bigMatch:83, form:84, story:"Nijeryalı kanat yıldızı, Galatasaray'daki harika dönemin ardından Gençlerbirliği'nde hızı ve dripling gücüyle yeniden parladı.", career:["Galatasaray","Monaco","Genclerbirligi"], strengths:["Hız","Dribbling","Gol"] },
  { name:"Sékou Koïta",          team:"Genclerbirligi",position:"Kanat",    age:25, marketValue:3,   goals:6, assists:9, minutes:2400, bigMatch:83, form:84, story:"Gine asıllı Avusturyalı hızlı kanat yıldızı, Salzburg'un ardından Gençlerbirliği'nde kanatları ateşledi.", career:["Red Bull Salzburg","Genclerbirligi"], strengths:["Hız","Dribbling","Fizik"] },
  { name:"Pedro Pereira",        team:"Genclerbirligi",position:"Defans",   age:28, marketValue:2,   goals:1, assists:4, minutes:2600, bigMatch:80, form:81, story:"Portekizli sağ bek, hücum katkıları ve orta kalitesiyle Gençlerbirliği'nin sağ kulvarını hakimiyeti altına aldı.", career:["Sporting CP","Genclerbirligi"], strengths:["Hız","Orta","Hücum Katılımı"] },
  { name:"Franco Tongya",        team:"Genclerbirligi",position:"Orta saha",age:23, marketValue:3,   goals:4, assists:7, minutes:2200, bigMatch:82, form:84, story:"Fransız-İtalyan genç yetenekli oyuncu, Juventus akademisinden gelen Tongya, Gençlerbirliği'nde sezonun en parlak yeni isimleri arasına girdi.", career:["Juventus","Genclerbirligi"], strengths:["Teknik","Yaratıcılık","Potansiyel"] },

  // ===== KAYSERİSPOR (2025-26) =====
  { name:"Bilal Bayazıt",       team:"Kayserispor",  position:"Kaleci",    age:28, marketValue:2,   goals:0, assists:0, minutes:3000, bigMatch:81, form:82, story:"İsveç milli takımının genç kalecisi, Kayserispor'da olağanüstü kurtarışlarla takımın puan toplamasına önemli katkı sağladı.", career:["Çeşitli","Kayserispor"], strengths:["Refleks","Bire Bir","Kurtarış"] },
  { name:"Stefano Denswil",     team:"Kayserispor",  position:"Defans",    age:31, marketValue:2,   goals:1, assists:2, minutes:2800, bigMatch:81, form:82, story:"Hollandalı stoper, Club Brugge ve Inter geçmişiyle Kayserispor'un savunmasına üst düzey kalite kattı.", career:["Club Brugge","Bologna","Kayserispor"], strengths:["Güç","Hava Topu","Tecrübe"] },
  { name:"Majid Hosseini",      team:"Kayserispor",  position:"Defans",    age:26, marketValue:2.5, goals:2, assists:1, minutes:2700, bigMatch:82, form:83, story:"İranlı genç stoper, güçlü fiziği ve topaklık yeteneğiyle Kayserispor'un en değerli defans oyuncularından biri oldu.", career:["Çeşitli","Kayserispor"], strengths:["Güç","Markaj","Fizik"] },
  { name:"László Bénes",        team:"Kayserispor",  position:"Orta saha", age:28, marketValue:3,   goals:5, assists:8, minutes:2700, bigMatch:84, form:85, story:"Slovakya milli takımının kilit oyuncusu, teknik kalitesi ve pas vizyonuyla Kayserispor'un oyun kurucusu oldu.", career:["Borussia MG","Hamburger SV","Kayserispor"], strengths:["Pas","Teknik","Oyun Görüşü"] },
  { name:"Youssef Aït Bennasser",team:"Kayserispor", position:"Orta saha", age:28, marketValue:2.5, goals:3, assists:5, minutes:2500, bigMatch:82, form:83, story:"Faslı milli oyuncu, orta sahada disiplin ve kalitesiyle Kayserispor'a Avrupa seviyesi getirdi.", career:["Nantes","Kayserispor"], strengths:["Top Kapma","Pas","Dinamizm"] },
  { name:"Dorukhan Toköz",      team:"Kayserispor",  position:"Orta saha", age:30, marketValue:2,   goals:4, assists:6, minutes:2400, bigMatch:82, form:83, story:"Milli oyuncu, Beşiktaş'tan sonra Kayserispor'da merkez orta sahada liderlik rolü üstlendi.", career:["Beşiktaş","Kayserispor"], strengths:["Pas","Liderlik","Top Kapma"] },
  { name:"Miguel Cardoso",      team:"Kayserispor",  position:"Forvet",    age:24, marketValue:4,   goals:13, assists:5, minutes:2700, bigMatch:85, form:86, story:"Portekizli genç golcü, 13 golle sezonun en sürpriz ismi olarak Kayserispor'u neredeyse tek başına taşıdı.", career:["Benfica","Kayserispor"], strengths:["Hız","Bitiricilik","Teknik"] },
  { name:"Carlos Mané",         team:"Kayserispor",  position:"Kanat",     age:33, marketValue:2,   goals:6, assists:7, minutes:2200, bigMatch:82, form:82, story:"Tecrübeli Gine-Bissaulu kanat, bireysel kalitesi ve gol katkısıyla Kayserispor hücumuna farklı bir boyut kattı.", career:["Sporting CP","RB Leipzig","Kayserispor"], strengths:["Hız","Dribbling","Teknik"] },
  { name:"Sam Mather",          team:"Kayserispor",  position:"Orta saha", age:22, marketValue:2,   goals:3, assists:5, minutes:2000, bigMatch:80, form:82, story:"İngiliz genç orta saha, Manchester United akademisinden gelen Mather, Kayserispor'da Süper Lig deneyimi kazandı.", career:["Manchester United","Kayserispor"], strengths:["Dinamizm","Potansiyel","Teknik"] },
  { name:"Joshua Brenet",       team:"Kayserispor",  position:"Defans",    age:30, marketValue:1.5, goals:0, assists:4, minutes:2600, bigMatch:80, form:81, story:"Hollandalı sağ bek, PSV ve çeşitli Hollanda-Almanya deneyimiyle Kayserispor'un sağ kulvarını yönetti.", career:["PSV","TSG Hoffenheim","Kayserispor"], strengths:["Hız","Savunma","Orta"] },

  // ===== KARAGÜMRÜK (2025-26) =====
  { name:"Ivo Grbić",            team:"Karagumruk",   position:"Kaleci",    age:28, marketValue:2,   goals:0, assists:0, minutes:2800, bigMatch:81, form:82, story:"Hırvat kaleci, Atletico Madrid ve Sheffield United geçmişiyle Karagümrük kalesinde uluslararası kalite sergiledi.", career:["Atletico Madrid","Sheffield United","Karagumruk"], strengths:["Refleks","Bire Bir","Kurtarış"] },
  { name:"Igor Lichnovsky",      team:"Karagumruk",   position:"Defans",    age:31, marketValue:1.5, goals:2, assists:1, minutes:2700, bigMatch:81, form:82, story:"Şili milli takımının tecrübeli stoperi, Karagümrük savunmasında liderlik ve disiplin getirdi.", career:["Cruz Azul","Çeşitli","Karagumruk"], strengths:["Güç","Liderlik","Tecrübe"] },
  { name:"Filip Mladenović",     team:"Karagumruk",   position:"Defans",    age:33, marketValue:1,   goals:1, assists:5, minutes:2600, bigMatch:80, form:80, story:"Sırp sol bek, tecrübesi ve hücum katkısıyla Karagümrük sol kulvarını uzun süredir yönetmektedir.", career:["PAOK","Legia","Karagumruk"], strengths:["Tecrübe","Orta","Savunma"] },
  { name:"Ricardo Esgaio",       team:"Karagumruk",   position:"Defans",    age:32, marketValue:1.5, goals:0, assists:4, minutes:2500, bigMatch:80, form:81, story:"Portekizli sağ bek, Sporting CP geçmişiyle Karagümrük'ün sağ kulvarını yönetti.", career:["Sporting CP","Braga","Karagumruk"], strengths:["Hız","Savunma","Orta"] },
  { name:"Matias Kranevitter",   team:"Karagumruk",   position:"Orta saha", age:33, marketValue:1.5, goals:3, assists:5, minutes:2600, bigMatch:82, form:82, story:"Arjantinli defensive orta saha, Atletico Madrid ve Zenit geçmişiyle Karagümrük'ün oyun merkezi oldu.", career:["Atletico Madrid","Zenit","Karagumruk"], strengths:["Top Kapma","Pas","Tecrübe"] },
  { name:"Berkay Özcan",         team:"Karagumruk",   position:"Orta saha", age:27, marketValue:3,   goals:5, assists:8, minutes:2700, bigMatch:84, form:85, story:"Stuttgartlı Türk milli takım oyuncusu, tekniği ve oyun görüşüyle Karagümrük'ün kilit yaratıcısı oldu.", career:["Stuttgart","Başakşehir","Karagumruk"], strengths:["Teknik","Pas","Oyun Görüşü"] },
  { name:"Daniele Verde",        team:"Karagumruk",   position:"Orta saha", age:28, marketValue:3,   goals:6, assists:7, minutes:2500, bigMatch:83, form:84, story:"İtalyan yaratıcı oyuncu, teknik kalitesi ve serbest vuruş ustalığıyla Karagümrük'ün en önemli silahlarından biri oldu.", career:["Çeşitli İtalya","Karagumruk"], strengths:["Teknik","Duran Top","Şut"] },
  { name:"David Datro Fofana",   team:"Karagumruk",   position:"Forvet",    age:23, marketValue:5,   goals:11, assists:3, minutes:2500, bigMatch:85, form:86, story:"Chelsea'den kiralık Fildişi Sahilli genç golcü, 11 golle ligin en dikkat çekici gençlerinden biri oldu.", career:["Molde","Chelsea","Karagumruk"], strengths:["Hız","Bitiricilik","Fizik"] },
  { name:"Sam Larsson",          team:"Karagumruk",   position:"Kanat",     age:31, marketValue:2,   goals:5, assists:8, minutes:2300, bigMatch:81, form:82, story:"İsveçli milli takım kanadı, tecrübesi ve teknik gücüyle Karagümrük hücumunu besleyen kritik isim oldu.", career:["Feyenoord","Çeşitli","Karagumruk"], strengths:["Teknik","Asist","Tecrübe"] },
  { name:"Tiago Çukur",          team:"Karagumruk",   position:"Forvet",    age:20, marketValue:4,   goals:7, assists:2, minutes:2000, bigMatch:82, form:84, story:"Fenerbahçe akademisinden çıkan Türk-Alman genç golcü, Karagümrük'te Süper Lig'de patlayıcı bir ilk sezon geçirdi.", career:["Fenerbahçe","Karagumruk"], strengths:["Hız","Bitiricilik","Potansiyel"] }
];


// ── TAKIM TEMELERİ ─────────────────────────────────────────────
const teamThemes = [
  { name:"Lig teması",      primary:"#38bdf8", secondary:"#fbbf24", accent:"#f43f5e", dark:"#090e1a" },
  { name:"Galatasaray",     primary:"#ffb700", secondary:"#a90432", accent:"#ff6a13", dark:"#120106" },
  { name:"Fenerbahce",      primary:"#1e40af", secondary:"#fbbf24", accent:"#ffffff", dark:"#020617" },
  { name:"Besiktas",        primary:"#f8fafc", secondary:"#0f172a", accent:"#e11d48", dark:"#050508" },
  { name:"Trabzonspor",     primary:"#0284c7", secondary:"#881337", accent:"#e0f2fe", dark:"#0a0206" },
  { name:"Basaksehir",      primary:"#f97316", secondary:"#1e3a8a", accent:"#ffffff", dark:"#0a0602" },
  { name:"Goztepe",         primary:"#ef4444", secondary:"#eab308", accent:"#1e293b", dark:"#0f0302" },
  { name:"Samsunspor",      primary:"#ef4444", secondary:"#ffffff", accent:"#1e293b", dark:"#0f0303" },
  { name:"Rizespor",        primary:"#10b981", secondary:"#1d4ed8", accent:"#ffffff", dark:"#020f0a" },
  { name:"Konyaspor",       primary:"#10b981", secondary:"#ffffff", accent:"#ef4444", dark:"#020f0a" },
  { name:"Kocaelispor",     primary:"#10b981", secondary:"#000000", accent:"#ffffff", dark:"#020f0a" },
  { name:"Alanyaspor",      primary:"#f97316", secondary:"#15803d", accent:"#ffffff", dark:"#0f0703" },
  { name:"Gaziantep FK",    primary:"#ef4444", secondary:"#000000", accent:"#ffffff", dark:"#0f0303" },
  { name:"Kasimpasa",       primary:"#1d4ed8", secondary:"#ffffff", accent:"#38bdf8", dark:"#020617" },
  { name:"Genclerbirligi",  primary:"#ef4444", secondary:"#000000", accent:"#ffffff", dark:"#0f0303" },
  { name:"Eyupspor",        primary:"#6b21a8", secondary:"#facc15", accent:"#ffffff", dark:"#0b0312" },
  { name:"Antalyaspor",     primary:"#ef4444", secondary:"#ffffff", accent:"#1e293b", dark:"#0f0303" },
  { name:"Kayserispor",     primary:"#ef4444", secondary:"#eab308", accent:"#1e293b", dark:"#0f0502" },
  { name:"Karagumruk",      primary:"#ef4444", secondary:"#000000", accent:"#ffffff", dark:"#0f0303" }
];

// ── KADROLAR ──────────────────────────────────────────────────
const teamSquads = {
  Galatasaray: [
    {name:"Ugurcan Cakir", position:"Kaleci", note:"15M€ · 20 CS"},
    {name:"Gunay Guvenc", position:"Kaleci", note:"0.4M€ · Yedek"},
    {name:"Victor Osimhen", position:"Forvet", note:"75M€ · 22G 8A"},
    {name:"Mauro Icardi", position:"Forvet", note:"4M€ · 10G 4A"},
    {name:"Baris Alper Yilmaz", position:"Kanat", note:"30M€ · 8G 11A"},
    {name:"Leroy Sane", position:"Kanat", note:"20M€ · 7G 5A"},
    {name:"Gabriel Sara", position:"Orta saha", note:"27M€ · 8G 14A"},
    {name:"Lucas Torreira", position:"Orta saha", note:"10M€ · 3G 7A"},
    {name:"Wilfried Stephane Singo", position:"Defans", note:"23M€ · 1G 2A"},
    {name:"Abdulkerim Bardakci", position:"Defans", note:"6.5M€ · Stoper"},
    {name:"Davinson Sanchez", position:"Defans", note:"16M€ · Stoper"},
    {name:"Sacha Boey", position:"Defans", note:"18M€ · Sağ bek"},
    {name:"Ismail Jakobs", position:"Defans", note:"8M€ · Sol bek"},
    {name:"Kaan Ayhan", position:"Defans", note:"1.5M€ · Joker"},
    {name:"Ilkay Gundogan", position:"Orta saha", note:"2.5M€ · Oyun Kurucu"},
    {name:"Mario Lemina", position:"Orta saha", note:"1M€ · Defansif"},
    {name:"Roland Sallai", position:"Kanat", note:"14M€ · Kanat"},
    {name:"Yunus Akgun", position:"Kanat", note:"8M€ · 6G 8A"},
    {name:"Yaser Asprilla", position:"Kanat", note:"15M€ · 4G 5A"},
    {name:"Noa Lang", position:"Kanat", note:"22M€ · 5G 4A"}
  ],
  Fenerbahce: [
    {name:"Ederson", position:"Kaleci", note:"10M€ · A Takım"},
    {name:"Tarik Cetin", position:"Kaleci", note:"0.2M€ · Yedek"},
    {name:"Caglar Soyuncu", position:"Defans", note:"10M€ · Stoper"},
    {name:"Jayden Oosterwolde", position:"Defans", note:"11M€ · Sol bek"},
    {name:"Mert Muldur", position:"Defans", note:"5.5M€ · Sağ bek"},
    {name:"Milan Skriniar", position:"Defans", note:"10M€ · Stoper"},
    {name:"Nelson Semedo", position:"Defans", note:"4M€ · Sağ bek"},
    {name:"Archibald Norman Brown", position:"Defans", note:"3.5M€ · Sol bek"},
    {name:"Anderson Talisca", position:"Orta saha", note:"7M€ · 19G 5A"},
    {name:"Ismail Yuksek", position:"Orta saha", note:"10M€ · Ön libero"},
    {name:"Mert Hakan Yandas", position:"Orta saha", note:"1.2M€ · Kaptan"},
    {name:"Edson Alvarez", position:"Orta saha", note:"15M€ · Ön libero"},
    {name:"Marco Asensio", position:"Orta saha", note:"15M€ · 11G 12A"},
    {name:"Matteo Guendouzi", position:"Orta saha", note:"18M€ · Merkez"},
    {name:"N'Golo Kante", position:"Orta saha", note:"4M€ · Ön libero"},
    {name:"Fred", position:"Orta saha", note:"4.5M€ · Merkez"},
    {name:"Kerem Akturkoglu", position:"Kanat", note:"20M€ · 8G 7A"},
    {name:"Dorgeles Nene", position:"Kanat", note:"9M€ · 9G 16A"},
    {name:"Anthony Musaba", position:"Kanat", note:"3M€ · Kanat"},
    {name:"Oguz Aydın", position:"Kanat", note:"4.5M€ · Kanat"}
  ],
  Besiktas: [
    {name:"Mert Gunok", position:"Kaleci", note:"0.5M€ · Kaptan"},
    {name:"Ersin Destanoglu", position:"Kaleci", note:"1.8M€ · Yedek"},
    {name:"Ridvan Yilmaz", position:"Defans", note:"5M€ · Sol bek"},
    {name:"Emirhan Topcu", position:"Defans", note:"4.5M€ · Stoper"},
    {name:"Felix Uduokhai", position:"Defans", note:"3.5M€ · Stoper"},
    {name:"Tiago Djalo", position:"Defans", note:"7M€ · Stoper"},
    {name:"Michael Murillo", position:"Defans", note:"4M€ · Sağ bek"},
    {name:"Emmanuel Agbadou", position:"Defans", note:"6M€ · Stoper"},
    {name:"Yasin Ozcan", position:"Defans", note:"4.5M€ · Sol bek"},
    {name:"Wilfred Ndidi", position:"Orta saha", note:"8M€ · Ön libero"},
    {name:"Orkun Kokcu", position:"Orta saha", note:"25M€ · 9G 8A"},
    {name:"Salih Ucan", position:"Orta saha", note:"1.5M€ · Merkez"},
    {name:"Kristjan Asllani", position:"Orta saha", note:"12M€ · Merkez"},
    {name:"Tammy Abraham", position:"Forvet", note:"18M€ · 15G 5A"},
    {name:"Oh Hyun-Gyu", position:"Forvet", note:"3M€ · 6G 2A"},
    {name:"Milot Rashica", position:"Kanat", note:"3.5M€ · Kanat"},
    {name:"El Bilal Toure", position:"Forvet", note:"8M€ · 8G 3A"},
    {name:"Vaclav Cerny", position:"Kanat", note:"5M€ · 6G 7A"},
    {name:"Cengiz Under", position:"Kanat", note:"6M€ · Kanat"},
    {name:"Jota Silva", position:"Kanat", note:"8M€ · 7G 4A"}
  ],
  Trabzonspor: [
    {name:"Andre Onana", position:"Kaleci", note:"7M€ · A Takım"},
    {name:"Onuralp Cevikkan", position:"Kaleci", note:"1M€ · Yedek"},
    {name:"Stefan Savic", position:"Defans", note:"0.4M€ · Kaptan"},
    {name:"Arseniy Batagov", position:"Defans", note:"2M€ · Stoper"},
    {name:"Mustafa Eskihellac", position:"Defans", note:"1.5M€ · Sağ bek"},
    {name:"Mathias Fjortoft Lovik", position:"Defans", note:"2M€ · Sol bek"},
    {name:"Serdar Saatci", position:"Defans", note:"2.5M€ · Stoper"},
    {name:"Rayyan Baniya", position:"Defans", note:"1.5M€ · Stoper"},
    {name:"Okay Yokuslu", position:"Orta saha", note:"1.2M€ · Ön libero"},
    {name:"Ozan Tufan", position:"Orta saha", note:"1.5M€ · Merkez"},
    {name:"Benjamin Bouchouari", position:"Orta saha", note:"3M€ · Merkez"},
    {name:"Ernest Muci", position:"Orta saha", note:"11M€ · 9G 6A"},
    {name:"Tim Jabol-Folcarelli", position:"Orta saha", note:"2.5M€ · Ön libero"},
    {name:"Edin Visca", position:"Kanat", note:"0.1M€ · Tecrübe"},
    {name:"Anthony Nwakaeme", position:"Kanat", note:"0.5M€ · Teknik"},
    {name:"Paul Onuachu", position:"Forvet", note:"6M€ · 22G 3A"},
    {name:"Felipe Augusto", position:"Forvet", note:"15M€ · 14G 4A"},
    {name:"Denis Dragus", position:"Forvet", note:"4M€ · 6G 3A"},
    {name:"Enis Destan", position:"Forvet", note:"3.5M€ · Forvet"},
    {name:"Oleksandr Zubkov", position:"Kanat", note:"4M€ · 5G 6A"}
  ],
  Basaksehir: [
    {name:"Eldor Shomurodov", position:"Forvet", note:"7M€ · 22G 6A"},
    {name:"Berkay Ozcan", position:"Orta saha", note:"3.5M€ · 5G 10A"},
    {name:"Muhammed Sengezer", position:"Kaleci", note:"2M€ · A Takım"},
    {name:"Volkan Babacan", position:"Kaleci", note:"0.1M€ · Yedek"},
    {name:"Leo Duarte", position:"Defans", note:"3M€ · Stoper"},
    {name:"Ousseynou Ba", position:"Defans", note:"2.2M€ · Stoper"},
    {name:"Lucas Lima", position:"Defans", note:"0.8M€ · Sol bek"},
    {name:"Omer Ali Sahiner", position:"Defans", note:"0.2M€ · Joker"},
    {name:"Hamza Gureler", position:"Defans", note:"1.2M€ · Potansiyel stoper"},
    {name:"Onur Ergun", position:"Orta saha", note:"0.4M€ · Ön libero"},
    {name:"Danijel Aleksic", position:"Orta saha", note:"0.3M€ · Tecrübe"},
    {name:"Olivier Kemen", position:"Orta saha", note:"1.8M€ · Dinamik"},
    {name:"Serdar Gurler", position:"Kanat", note:"0.5M€ · 4G 5A"},
    {name:"Davidson", position:"Kanat", note:"0.6M€ · 5G 4A"},
    {name:"Joao Figueiredo", position:"Forvet", note:"1.5M€ · 8G 3A"}
  ],
  Goztepe: [
    {name:"Mateusz Lis", position:"Kaleci", note:"2.5M€ · Kaleci"},
    {name:"Juan Santos", position:"Forvet", note:"12M€ · 12G 4A"},
    {name:"Arda Ozcimen", position:"Kaleci", note:"0.4M€ · Yedek"},
    {name:"Taha Altikardes", position:"Defans", note:"4M€ · Stoper"},
    {name:"Heliton", position:"Defans", note:"1.8M€ · Stoper"},
    {name:"Malcom Bokele", position:"Defans", note:"1.5M€ · Sağ bek"},
    {name:"Djalma Silva", position:"Defans", note:"0.8M€ · Sol bek"},
    {name:"Ogun Bayrak", position:"Defans", note:"0.7M€ · Sağ bek"},
    {name:"Isaac Solet", position:"Orta saha", note:"2.5M€ · Dinamo"},
    {name:"Anthony Dennis", position:"Orta saha", note:"2M€ · Ön libero"},
    {name:"Dogan Erdogan", position:"Orta saha", note:"0.5M€ · Merkez"},
    {name:"David Tijanic", position:"Orta saha", note:"1.2M€ · Oyun Kurucu"},
    {name:"Kuryu Matsuki", position:"Orta saha", note:"3M€ · Dinamik"},
    {name:"Romulo Cardoso", position:"Forvet", note:"3.5M€ · 9G 4A"},
    {name:"Kubilay Kanatsizkus", position:"Forvet", note:"0.4M€ · Yedek"}
  ],
  Samsunspor: [
    {name:"Okan Kocuk", position:"Kaleci", note:"2M€ · Kaleci"},
    {name:"Marius Mouandilmadji", position:"Forvet", note:"7M€ · 14G 2A"},
    {name:"Halil Yeral", position:"Kaleci", note:"0.3M€ · Yedek"},
    {name:"Rick van Drongelen", position:"Defans", note:"2.5M€ · Stoper"},
    {name:"Lubomir Satka", position:"Defans", note:"1.2M€ · Stoper"},
    {name:"Zeki Yavru", position:"Defans", note:"0.2M€ · Sağ bek"},
    {name:"Marc Bola", position:"Defans", note:"1.5M€ · Sol bek"},
    {name:"Youssef Ait Bennasser", position:"Orta saha", note:"1.5M€ · Ön libero"},
    {name:"Flavien Tait", position:"Orta saha", note:"0.8M€ · Merkez"},
    {name:"Carlo Holse", position:"Orta saha", note:"3.5M€ · 7G 8A"},
    {name:"Olivier Ntcham", position:"Orta saha", note:"3.2M€ · 9G 6A"},
    {name:"Kingsley Schindler", position:"Kanat", note:"0.6M€ · Kanat"},
    {name:"Emre Kilinc", position:"Kanat", note:"1.2M€ · 4G 5A"},
    {name:"Gaetan Laura", position:"Forvet", note:"0.5M€ · Yedek"},
    {name:"Arbnor Muja", position:"Kanat", note:"1.8M€ · 5G 4A"}
  ],
  Rizespor: [
    {name:"Yahia Fofana",        position:"Kaleci",    note:"1.5M€ · Kaleci"},
    {name:"Attila Mocsi",        position:"Defans",    note:"1.5M€ · Sağ bek"},
    {name:"Modibo Sagnan",       position:"Defans",    note:"1.8M€ · Stoper"},
    {name:"Casper Højer Nielsen",position:"Defans",    note:"2M€ · Sol bek"},
    {name:"İbrahim Olawoyin",    position:"Orta saha", note:"2.5M€ · 8G 5A"},
    {name:"Taylan Antalyalı",    position:"Orta saha", note:"2.5M€ · 2G 4A"},
    {name:"Qazim Laci",          position:"Orta saha", note:"2M€ · 4G 6A"},
    {name:"Valentin Mihaila",    position:"Kanat",     note:"3M€ · 6G 8A"},
    {name:"Halil Dervişoğlu",    position:"Forvet",    note:"3M€ · 9G 3A"},
    {name:"Ali Sowe",            position:"Forvet",    note:"2.5M€ · 11G 4A"}
  ],
  Konyaspor: [
    {name:"Deniz Ertaş",          position:"Kaleci",    note:"1.2M€ · Kaleci"},
    {name:"Josip Čalusić",        position:"Defans",    note:"1M€ · Sağ bek"},
    {name:"Guilherme Sitya",     position:"Defans",    note:"1.5M€ · Sol bek"},
    {name:"Adamo Nagalo",        position:"Defans",    note:"1.8M€ · Stoper"},
    {name:"Enis Bardhi",         position:"Orta saha", note:"3M€ · 7G 10A"},
    {name:"Riechedly Bazoer",    position:"Orta saha", note:"2.5M€ · 4G 6A"},
    {name:"Deniz Türüç",         position:"Kanat",     note:"2M€ · 6G 8A"},
    {name:"Diogo Gonçalves",     position:"Kanat",     note:"2.5M€ · 5G 9A"},
    {name:"Jackson Muleka",      position:"Forvet",    note:"3M€ · 12G 3A"},
    {name:"Blaz Kramer",         position:"Forvet",    note:"2M€ · 8G 2A"}
  ],
  Kocaelispor: [
    {name:"Aleksandar Jovanovic",position:"Kaleci",    note:"0.8M€ · Kaleci"},
    {name:"Anfernee Dijksteel", position:"Defans",    note:"2.5M€ · Sağ bek"},
    {name:"Hrvoje Smolčić",      position:"Defans",    note:"3M€ · Stoper"},
    {name:"Massadio Haïdara",    position:"Defans",    note:"1.2M€ · Sol bek"},
    {name:"Karol Linetty",       position:"Orta saha", note:"3M€ · 5G 7A"},
    {name:"Joseph Nonge",        position:"Orta saha", note:"3M€ · 4G 6A"},
    {name:"Darko Churlinov",     position:"Kanat",     note:"3M€ · 6G 8A"},
    {name:"Rigoberto Rivas",     position:"Kanat",     note:"2.5M€ · 5G 7A"},
    {name:"Bruno Petkovic",      position:"Forvet",    note:"2M€ · 10G 4A"},
    {name:"Serdar Dursun",       position:"Forvet",    note:"1.5M€ · 7G 3A"}
  ],
  Alanyaspor: [
    {name:"Ertuğrul Taşkıran",   position:"Kaleci",    note:"1.5M€ · Kaleci"},
    {name:"Florent Hadergjonaj", position:"Defans",    note:"2M€ · Sağ bek"},
    {name:"Fidan Aliti",         position:"Defans",    note:"2M€ · Sol bek"},
    {name:"Bruno Viana",         position:"Defans",    note:"2.5M€ · Stoper"},
    {name:"Gaius Makouta",       position:"Orta saha", note:"2.5M€ · 3G 5A"},
    {name:"Ianis Hagi",          position:"Orta saha", note:"4M€ · 7G 9A"},
    {name:"Meschack Elia",       position:"Kanat",     note:"3.5M€ · 7G 10A"},
    {name:"Güven Yalçın",        position:"Forvet",    note:"4M€ · 14G 4A"},
    {name:"Ui-Jo Hwang",          position:"Forvet",    note:"3M€ · 9G 3A"},
    {name:"Steve Mounié",         position:"Forvet",    note:"3M€ · 8G 2A"}
  ],
  "Gaziantep FK": [
    {name:"Mustafa Burak Bozan", position:"Kaleci",    note:"1.5M€ · Kaleci"},
    {name:"Nazım Sangaré",       position:"Defans",    note:"2M€ · Stoper"},
    {name:"Myenty Abena",        position:"Defans",    note:"1.8M€ · Stoper"},
    {name:"Kévin Rodrigues",      position:"Defans",    note:"2M€ · Sol bek"},
    {name:"Kacper Kozłowski",    position:"Orta saha", note:"6M€ · 5G 8A"},
    {name:"Alexandru Maxim",     position:"Orta saha", note:"1M€ · 4G 7A"},
    {name:"Juninho Bacuna",      position:"Orta saha", note:"2.5M€ · 5G 6A"},
    {name:"Yusuf Kabadayı",       position:"Kanat",     note:"5M€ · 6G 9A"},
    {name:"Christopher Lungoyi", position:"Kanat",     note:"3M€ · 7G 5A"},
    {name:"Mohamed Bayo",        position:"Forvet",    note:"4M€ · 15G 4A"}
  ],
  Kasimpasa: [
    {name:"Andreas Gianniotis",  position:"Kaleci",    note:"0.5M€ · Kaleci"},
    {name:"Rodrigo Becão",       position:"Defans",    note:"4M€ · Stoper"},
    {name:"Nicholas Opoku",      position:"Defans",    note:"2.5M€ · Stoper"},
    {name:"Emre Taşdemir",       position:"Defans",    note:"1.5M€ · Sol bek"},
    {name:"Kerem Demirbay",      position:"Orta saha", note:"2.5M€ · 4G 8A"},
    {name:"Haris Hajradinović",  position:"Orta saha", note:"2M€ · 5G 6A"},
    {name:"İrfan Can Kahveci",   position:"Kanat",     note:"4M€ · 9G 7A"},
    {name:"Fousseni Diabaté",    position:"Kanat",     note:"3M€ · 7G 8A"},
    {name:"Cenk Tosun",          position:"Forvet",    note:"2M€ · 10G 3A"},
    {name:"Adrian Benedyczak",   position:"Forvet",    note:"5M€ · 12G 3A"}
  ],
  Genclerbirligi: [
    {name:"Gökhan Akkan",        position:"Kaleci",    note:"2M€ · Kaleci"},
    {name:"Dimitris Goutas",     position:"Defans",    note:"2.5M€ · Stoper"},
    {name:"Zan Zuzek",           position:"Defans",    note:"2.5M€ · Stoper"},
    {name:"Pedro Pereira",       position:"Defans",    note:"2M€ · Sağ bek"},
    {name:"Oghenekaro Etebo",    position:"Orta saha", note:"3M€ · 4G 6A"},
    {name:"Tom Dele-Bashiru",    position:"Orta saha", note:"4M€ · 5G 7A"},
    {name:"Franco Tongya",       position:"Orta saha", note:"3M€ · 4G 7A"},
    {name:"Henry Onyekuru",      position:"Kanat",     note:"2M€ · 7G 8A"},
    {name:"Sékou Koïta",         position:"Kanat",     note:"3M€ · 6G 9A"},
    {name:"Mbaye Niang",         position:"Forvet",    note:"1.5M€ · 8G 3A"}
  ],
  Eyupspor: [
    {name:"Emre Akbaba", position:"Orta saha", note:"1M€ · 5G 8A"},
    {name:"Umut Bozok", position:"Forvet", note:"1.5M€ · 9G 4A"},
    {name:"Berke Ozer", position:"Kaleci", note:"1.8M€ · Kaleci"},
    {name:"Robin Yalcin", position:"Defans", note:"0.6M€ · Joker"},
    {name:"Leo Dubois", position:"Defans", note:"3.5M€ · Sağ bek"},
    {name:"Veysel Sari", position:"Defans", note:"0.1M€ · Tecrübe"},
    {name:"Caner Erkin", position:"Defans", note:"0.1M€ · 6Asist"},
    {name:"Luccas Claro", position:"Defans", note:"0.4M€ · Stoper"},
    {name:"Melih Kabasakal", position:"Orta saha", note:"0.5M€ · Çalışkan"},
    {name:"Fredrik Midtsjo", position:"Orta saha", note:"1.2M€ · Dinamo"},
    {name:"Taskin Ilter", position:"Orta saha", note:"0.4M€ · Ön libero"},
    {name:"Samu Saiz", position:"Orta saha", note:"0.8M€ · Tekniker"},
    {name:"Ahmed Kutucu", position:"Kanat", note:"2.2M€ · 6G 6A"},
    {name:"Mame Thiam", position:"Forvet", note:"1.5M€ · 8G 4A"},
    {name:"Jonjo Shelvey", position:"Orta saha", note:"1M€ · Pasör"}
  ],
  Antalyaspor: [
    {name:"Julián Cuesta",        position:"Kaleci",    note:"0.8M€ · Kaleci"},
    {name:"Lautaro Giannetti",   position:"Defans",    note:"1.5M€ · Stoper"},
    {name:"Georgiy Dzhikiya",    position:"Defans",    note:"1.2M€ · Stoper"},
    {name:"Kenneth Paal",        position:"Defans",    note:"1.5M€ · Sol bek"},
    {name:"Abdülkadir Ömür",     position:"Orta saha", note:"2M€ · 5G 7A"},
    {name:"Dario Šarić",         position:"Orta saha", note:"1.5M€ · 4G 5A"},
    {name:"Sander van de Streek",position:"Orta saha", note:"1.2M€ · 3G 6A"},
    {name:"Soner Dikmen",        position:"Defans",    note:"1M€ · Sağ bek"}
  ],
  Kayserispor: [
    {name:"Bilal Bayazıt",       position:"Kaleci",    note:"2M€ · Kaleci"},
    {name:"Stefano Denswil",     position:"Defans",    note:"2M€ · Stoper"},
    {name:"Majid Hosseini",      position:"Defans",    note:"2.5M€ · Stoper"},
    {name:"Joshua Brenet",       position:"Defans",    note:"1.5M€ · Sağ bek"},
    {name:"László Bénes",        position:"Orta saha", note:"3M€ · 5G 8A"},
    {name:"Youssef Aït Bennasser",position:"Orta saha",note:"2.5M€ · 3G 5A"},
    {name:"Dorukhan Toköz",      position:"Orta saha", note:"2M€ · 4G 6A"},
    {name:"Carlos Mané",         position:"Kanat",     note:"2M€ · 6G 7A"},
    {name:"Miguel Cardoso",      position:"Forvet",    note:"4M€ · 13G 5A"},
    {name:"Sam Mather",          position:"Orta saha", note:"2M€ · 3G 5A"}
  ],
  Karagumruk: [
    {name:"Ivo Grbić",           position:"Kaleci",    note:"2M€ · Kaleci"},
    {name:"Igor Lichnovsky",     position:"Defans",    note:"1.5M€ · Stoper"},
    {name:"Filip Mladenović",     position:"Defans",    note:"1M€ · Sol bek"},
    {name:"Ricardo Esgaio",      position:"Defans",    note:"1.5M€ · Sağ bek"},
    {name:"Matias Kranevitter",  position:"Orta saha", note:"1.5M€ · 3G 5A"},
    {name:"Berkay Özcan",        position:"Orta saha", note:"3M€ · 5G 8A"},
    {name:"Daniele Verde",       position:"Orta saha", note:"3M€ · 6G 7A"},
    {name:"Sam Larsson",         position:"Kanat",     note:"2M€ · 5G 8A"},
    {name:"David Datro Fofana",  position:"Forvet",    note:"5M€ · 11G 3A"},
    {name:"Tiago Çukur",         position:"Forvet",    note:"4M€ · 7G 2A"}
  ]
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
  { emoji:"⭐", title:"Sezonun Oyuncusu",      winner:"Victor Osimhen",            team:"Galatasaray",       detail:"Şampiyonluk lideri",         note:"Galatasaray'ı şampiyonluğa taşıyan kilit isim. Etkili gol katkıları ve sahaya hakim oyunuyla sezonun en değerlisi seçildi.", color:"#f0a830" },
  { emoji:"⚽", title:"Gol Krallığı",          winner:"Onuachu & Shomurodov",      team:"TS / Başakşehir",   detail:"22 gol (paylaşımlı)",        note:"Paul Onuachu ve Eldor Shomurodov, 2025-26 sezonunu 22'şer golle zirvede paylaşarak Süper Lig gol krallığını birlikte kazandı.", color:"#22c76e" },
  { emoji:"🎯", title:"Asist Krallığı",        winner:"Marco Asensio",             team:"Fenerbahçe",        detail:"13 asist",                   note:"İspanyol yıldız Asensio, 25 maçta ürettiği 13 asist ile 2025-26 sezonunun asist krallığını ezici biçimde aldı.", color:"#003f8f" },
  { emoji:"🧤", title:"Sezonun Kalecisi",      winner:"Uğurcan Çakır",             team:"Galatasaray",       detail:"Şampiyon kale",              note:"Galatasaray'ın vazgeçilmez kalecisi Uğurcan, kritik kurtarışları ve güçlü refleksleriyle şampiyonluk yolunda takımın en büyük sigortası oldu.", color:"#a90432" },
  { emoji:"🌟", title:"Genç Yetenek",          winner:"Barış Alper Yılmaz",        team:"Galatasaray",       detail:"12 asist",                   note:"Millî kanat oyuncusu, 12 asist ve yüksek performansıyla şampiyon takımın en parlak genci oldu.", color:"#7a263a" },
  { emoji:"👨‍💼", title:"Sezonun Teknik Dir.", winner:"Fatih Tekke",                team:"Trabzonspor",       detail:"3. sıra — sınırlı kadro",     note:"Kısıtlı kadro ve bütçeyle Trabzonspor'u ligin 3. sırasına taşıyan Fatih Tekke, 2025-26 sezonunun gerçek sürpriz teknik direktörü oldu.", color:"#7a263a" }
];

// ── ANKET ─────────────────────────────────────────────────────
const polls = [
  { id:"poll_2526_best", question:"Sezonun En İyi Forveti Kim?", candidates:[{name:"Victor Osimhen",team:"Galatasaray"},{name:"Paul Onuachu",team:"Trabzonspor"},{name:"Tammy Abraham",team:"Besiktas"},{name:"Eldor Shomurodov",team:"Basaksehir"}] },
  { id:"poll_2526_supriz", question:"2025-26 Sezonunun Sürprizi Kim?", candidates:[{name:"Juan Santos",team:"Goztepe"},{name:"Felipe Augusto",team:"Trabzonspor"},{name:"Kacper Kozlowski",team:"Gaziantep FK"},{name:"Ianis Hagi",team:"Alanyaspor"}] }
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
const state = { search:"", position:"all", team:"all", sort:"valueScore", budgetOnly:false, visibleLimit: 12, maxAge: 40, maxPrice: 1000 };

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
const ageFilter        = document.querySelector("#ageFilter");
const ageLabel         = document.querySelector("#ageLabel");
const maxPriceFilter   = document.querySelector("#maxPriceFilter");
const playerA          = document.querySelector("#playerA");
const playerB          = document.querySelector("#playerB");
const comparison       = document.querySelector("#comparison");
const swapButton       = document.querySelector("#swapButton");

const teamASelect      = document.querySelector("#teamASelect");
const teamBSelect      = document.querySelector("#teamBSelect");
const swapTeamButton   = document.querySelector("#swapTeamButton");
const teamComparison   = document.querySelector("#teamComparison");

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
const loadMoreBtn      = document.querySelector("#loadMoreBtn");

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
        (!state.budgetOnly      || p.marketValue<2) &&
        (p.age <= state.maxAge) &&
        (p.marketValue <= state.maxPrice);
    })
    .sort((a,b) => b[state.sort]-a[state.sort]);
}
function topBy(key) { return [...enrichedPlayers].sort((a,b)=>b[key]-a[key])[0]; }

// ── ÖZET ─────────────────────────────────────────────────────
function renderSummary() {
  const bi=topBy("impactScore"), bv=topBy("valueScore"), bs=topBy("scoutScore"), bb=topBy("bigMatch");
  const hero=enrichedPlayers.find(p=>p.name==="Christ Inao Oulai") || topBy("surpriseScore");
  document.querySelector("#topImpact").textContent   = `${bi.name} (${bi.impactScore})`;
  document.querySelector("#topValue").textContent    = `${bv.name} (${bv.valueScore})`;
  document.querySelector("#topScout").textContent    = `${bs.name} (${bs.scoutScore})`;
  document.querySelector("#topBigMatch").textContent = `${bb.name} (${bb.bigMatch})`;
  document.querySelector("#heroPlayer").textContent  = hero.name;
  document.querySelector("#heroNote").textContent    = `${hero.team} · ${formatValue(hero.marketValue)} EUR · skor ${hero.surpriseScore || 99}`;
  
  // Load hero image
  loadPlayerImage(hero.name, "heroPlayerImg");
}

// ── LIDERBOARD ───────────────────────────────────────────────
function boardItem(p,i,key) {
  const imgId = `board-img-${key}-${p.name.replace(/\s+/g, '-')}-${i}`;
  setTimeout(() => loadPlayerImage(p.name, imgId), 0);
  return `<div class="board-item" style="display:flex; align-items:center; gap:10px;">
    <span class="rank">${i+1}</span>
    <div class="player-photo-wrapper tiny">
      <img id="${imgId}" class="player-photo-img" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100%25' height='100%25' fill='%230f172a'/%3E%3C/svg%3E" alt="${p.name}">
    </div>
    <div style="flex-grow:1; text-align:left;">
      <strong style="display:block;">${p.name}</strong>
      <span class="board-meta" style="display:inline-flex; align-items:center; gap:4px; margin-top:2px;">${getTeamLogoHtml(p.team, "tiny")} <span>${p.team}</span> · ${p.position} · ${formatValue(p.marketValue)} €</span>
    </div>
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
  applyTheme(teamThemes.find(t=>t.name==="Trabzonspor") || teamThemes[0]);
}

// ── KADRO ─────────────────────────────────────────────────────
function renderSquadTeams() {
  squadTeamSelect.innerHTML = teamThemes.filter(t=>t.name!=="Lig teması").map(t=>`<option value="${t.name}">${t.name}</option>`).join("");
  squadTeamSelect.value = "Trabzonspor";
  renderSquad();
}
function renderSquad() {
  const name=squadTeamSelect.value, squad=teamSquads[name], theme=teamThemes.find(t=>t.name===name);
  if(theme) applyTheme(theme);
  if(!squad){ squadNote.innerHTML=`${getTeamLogoHtml(name, "small")} <span style="vertical-align:middle; margin-left:6px;">${name}: kadro henüz eklenmedi</span>`; squadGrid.innerHTML=`<div class="squad-empty">${name} kadrosu yakında eklenecek.</div>`; return; }
  squadNote.innerHTML=`${getTeamLogoHtml(name, "small")} <span style="vertical-align:middle; margin-left:6px;">${name}: ${squad.length} oyuncu — 2025-26 Sezonu</span>`;
  squadGrid.innerHTML=squad.map(p=>`
    <article class="squad-card">
      <strong>${p.name}</strong>
      <span>${p.position} · ${p.note}</span>
      <a class="tm-link small-link" href="${tmUrl(p.name)}" target="_blank" rel="noopener noreferrer" onclick="event.stopPropagation()" aria-label="Transfermarkt'ta ${p.name}">
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
        Transfermarkt'ta Gör
      </a>
    </article>`).join("");
}

// ── PUAN DURUMU ───────────────────────────────────────────────
function renderStandings() {
  const zc = { champion:"row-champion", ucl:"row-ucl", uel:"row-uel", uecl:"row-uel", relegation:"row-relegation" };
  standingsBody.innerHTML = standings.map((r,i)=>`
    <tr class="${zc[r.zone]||""}">
      <td class="st-rank">${i+1}</td>
      <td><div class="st-team">${getTeamLogoHtml(r.team, "small")} <span>${r.team}</span></div></td>
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
        <span class="award-team-badge" style="display:inline-flex; align-items:center; gap:6px;">${getAwardLogoHtml(a.team)} <span>${a.team}</span></span>
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
  const visibleList = list.slice(0, state.visibleLimit);
  playerGrid.innerHTML = visibleList.map(p => {
    const mw = Math.min(100, Math.round(p.valueScore/10));
    const imgId = `card-img-${p.name.replace(/\s+/g, '-')}`;
    
    // Asynchronously fetch player image after DOM is updated
    setTimeout(() => loadPlayerImage(p.name, imgId), 0);
    
    return `<article class="player-card" data-player="${p.name}" tabindex="0" role="button" aria-label="${p.name} detayını aç">
      <div class="card-header-with-photo">
        <div class="player-photo-wrapper">
          <img id="${imgId}" class="player-photo-img" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100%25' height='100%25' fill='%230f172a'/%3E%3C/svg%3E" alt="${p.name}">
        </div>
        <div class="card-head-details">
          <div class="card-head" style="margin-bottom: 0;">
            <div><h3 style="margin-top:0;">${p.name}</h3><p style="margin-bottom:0; display:flex; align-items:center; gap:4px;">${getTeamLogoHtml(p.team, "tiny")} <span>${p.team}</span> · ${p.position} · ${p.age} yaş</p></div>
            <span class="tag">${getLabel(p)}</span>
          </div>
        </div>
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

  if (loadMoreBtn) {
    loadMoreBtn.hidden = list.length <= state.visibleLimit;
  }
}

// ===================== RADAR CHART =====================
function drawRadarChart(player, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  
  const hücum = Math.min(player.contribution / 30, 1);
  const istikrar = Math.min(player.valueScore / 1000, 1);
  const oyunAklı = Math.min(player.impactScore / 1000, 1);
  const büyükMaç = Math.min(player.bigMatch / 100, 1);
  const formSkoru = (player.form && player.form.length) 
      ? player.form.reduce((a,b)=>a+(b==='W'?1:b==='D'?0.5:0),0)/player.form.length 
      : 0.6;
  
  const data = [hücum, istikrar, oyunAklı, büyükMaç, formSkoru];
  const labels = ["Hücum", "İstikrar", "Oyun Aklı", "Büyük Maç", "Form"];
  
  const size = 220;
  const center = size / 2;
  const radius = center - 35; 
  
  let svg = `<svg class="radar-svg" viewBox="0 0 ${size} ${size}">`;
  
  for(let i=1; i<=4; i++){
    let r = radius * (i/4);
    let points = "";
    for(let j=0; j<5; j++){
      let angle = (Math.PI / 2) - (2 * Math.PI * j / 5);
      let x = center + r * Math.cos(angle);
      let y = center - r * Math.sin(angle);
      points += `${x},${y} `;
    }
    svg += `<polygon class="radar-grid" points="${points.trim()}" />`;
  }
  
  for(let j=0; j<5; j++){
    let angle = (Math.PI / 2) - (2 * Math.PI * j / 5);
    let x = center + radius * Math.cos(angle);
    let y = center - radius * Math.sin(angle);
    svg += `<line class="radar-axis" x1="${center}" y1="${center}" x2="${x}" y2="${y}" />`;
    
    let labelX = center + (radius + 20) * Math.cos(angle);
    let labelY = center - (radius + 20) * Math.sin(angle) + 4;
    svg += `<text class="radar-label" x="${labelX}" y="${labelY}">${labels[j]}</text>`;
  }
  
  let dataPoints = "";
  let circles = "";
  for(let j=0; j<5; j++){
    let angle = (Math.PI / 2) - (2 * Math.PI * j / 5);
    let val = Math.max(0.1, data[j] || 0.1);
    let x = center + radius * val * Math.cos(angle);
    let y = center - radius * val * Math.sin(angle);
    dataPoints += `${x},${y} `;
    circles += `<circle class="radar-point" cx="${x}" cy="${y}" r="3" />`;
  }
  
  svg += `<polygon class="radar-area" points="${dataPoints.trim()}" />`;
  svg += circles;
  svg += `</svg>`;
  
  container.innerHTML = svg;
}

// ── MODAL ─────────────────────────────────────────────────────
function openPlayerModal(name) {
  const p = enrichedPlayers.find(x=>x.name===name);
  if (!p) return;
  modalPlayerName.textContent = p.name;
  modalPlayerTeam.innerHTML = `${getTeamLogoHtml(p.team, "tiny")} <span style="vertical-align:middle; margin-left:6px;">${p.team} · ${p.position} · ${p.age} yaş</span>`;
  modalPlayerTag.textContent  = getLabel(p);
  
  const modalImgId = `modal-img-${p.name.replace(/\s+/g, '-')}`;
  setTimeout(() => loadPlayerImage(p.name, modalImgId), 0);
  
  modalContent.innerHTML = `
    <div class="modal-body-wrapper">
      <div class="modal-photo-container">
        <img id="${modalImgId}" class="modal-player-photo" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100%25' height='100%25' fill='%230f172a'/%3E%3C/svg%3E" alt="${p.name}">
      </div>
      <div class="modal-details-container">
        <div class="modal-stats">
          <div class="stat"><span>Piyasa Değeri</span><strong>${formatValue(p.marketValue)} €</strong></div>
          <div class="stat"><span>Gol + Asist</span><strong>${p.contribution}</strong></div>
          <div class="stat"><span>Etki Skoru</span><strong>${p.impactScore}</strong></div>
          <div class="stat"><span>Değer Skoru</span><strong>${p.valueScore}</strong></div>
        </div>
      </div>
    </div>
    <div id="radarChartContainer" class="radar-chart-container"></div>
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
    
  setTimeout(() => drawRadarChart(p, "radarChartContainer"), 0);
  
  playerModal.hidden = false;
  modalClose.focus();
}
function closePlayerModal() { playerModal.hidden = true; }

// ── KARŞILAŞTIRMA ─────────────────────────────────────────────
function syncCustomSelectLabel(hiddenInputId) {
  const containerId = "container" + hiddenInputId.charAt(0).toUpperCase() + hiddenInputId.slice(1);
  const container = document.getElementById(containerId);
  const hiddenInput = document.getElementById(hiddenInputId);
  if (!container || !hiddenInput) return;
  const labelSpan = container.querySelector(".custom-select-label");
  const player = enrichedPlayers.find(p => p.name === hiddenInput.value);
  if (player && labelSpan) {
    labelSpan.innerHTML = `${getTeamLogoHtml(player.team, "tiny")} <strong style="margin-left:6px;vertical-align:middle;">${player.name}</strong> <span style="font-size:0.75rem;opacity:0.75;margin-left:4px;vertical-align:middle;">— ${player.team}</span>`;
  }
}

function initCustomSelect(containerId, hiddenInputId, defaultValue) {
  const container = document.getElementById(containerId);
  const hiddenInput = document.getElementById(hiddenInputId);
  if (!container || !hiddenInput) return;

  const trigger = container.querySelector(".custom-select-trigger");
  const dropdown = container.querySelector(".custom-select-dropdown");
  const searchInput = container.querySelector(".custom-select-search");
  const optionsList = container.querySelector(".custom-select-options");
  const labelSpan = trigger.querySelector(".custom-select-label");

  let activeIndex = -1;
  let filteredPlayers = [...enrichedPlayers];

  function renderOptions() {
    optionsList.innerHTML = filteredPlayers.map((p, idx) => {
      const isSelected = p.name === hiddenInput.value;
      const highlightedCls = idx === activeIndex ? "highlighted" : "";
      const selectedCls = isSelected ? "selected" : "";
      return `<li class="custom-select-option ${selectedCls} ${highlightedCls}" 
                  data-value="${p.name}" role="option" aria-selected="${isSelected}">
        <div class="custom-select-opt-text">
          <strong>${p.name}</strong>
          <span class="custom-select-opt-team">${getTeamLogoHtml(p.team, "tiny")} <span>${p.team} · ${p.position}</span></span>
        </div>
        <span class="custom-select-opt-val">${formatValue(p.marketValue)} €</span>
      </li>`;
    }).join("");
  }

  function selectPlayer(name) {
    hiddenInput.value = name;
    const player = enrichedPlayers.find(p => p.name === name);
    if (player && labelSpan) {
      labelSpan.innerHTML = `${getTeamLogoHtml(player.team, "tiny")} <strong style="margin-left:6px;vertical-align:middle;">${player.name}</strong> <span style="font-size:0.75rem;opacity:0.75;margin-left:4px;vertical-align:middle;">— ${player.team}</span>`;
    }
    Array.from(optionsList.children).forEach(child => {
      const isSel = child.getAttribute("data-value") === name;
      child.classList.toggle("selected", isSel);
      child.setAttribute("aria-selected", isSel ? "true" : "false");
    });
    hiddenInput.dispatchEvent(new Event("change"));
  }

  function closeDropdown() {
    dropdown.hidden = true;
    container.classList.remove("open");
    trigger.setAttribute("aria-expanded", "false");
    activeIndex = -1;
  }

  function openDropdown() {
    document.querySelectorAll(".custom-select-container").forEach(c => {
      if (c !== container) {
        c.querySelector(".custom-select-dropdown").hidden = true;
        c.classList.remove("open");
        c.querySelector(".custom-select-trigger").setAttribute("aria-expanded", "false");
      }
    });

    dropdown.hidden = false;
    container.classList.add("open");
    trigger.setAttribute("aria-expanded", "true");
    searchInput.value = "";
    filteredPlayers = [...enrichedPlayers];
    activeIndex = -1;
    renderOptions();
    searchInput.focus();
    
    const selEl = optionsList.querySelector(".custom-select-option.selected");
    if (selEl) {
      selEl.scrollIntoView({ block: "nearest" });
    }
  }

  trigger.addEventListener("click", (e) => {
    e.stopPropagation();
    if (dropdown.hidden) {
      openDropdown();
    } else {
      closeDropdown();
    }
  });

  searchInput.addEventListener("input", (e) => {
    const q = e.target.value.toLowerCase().trim();
    filteredPlayers = enrichedPlayers.filter(p => 
      p.name.toLowerCase().includes(q) || 
      p.team.toLowerCase().includes(q) || 
      p.position.toLowerCase().includes(q)
    );
    activeIndex = -1;
    renderOptions();
  });

  optionsList.addEventListener("click", (e) => {
    const opt = e.target.closest(".custom-select-option");
    if (opt) {
      selectPlayer(opt.getAttribute("data-value"));
      closeDropdown();
    }
  });

  container.addEventListener("keydown", (e) => {
    if (dropdown.hidden) {
      if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown") {
        e.preventDefault();
        openDropdown();
      }
      return;
    }

    if (e.key === "Escape") {
      closeDropdown();
      trigger.focus();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (filteredPlayers.length > 0) {
        activeIndex = (activeIndex + 1) % filteredPlayers.length;
        updateHighlighting();
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (filteredPlayers.length > 0) {
        activeIndex = (activeIndex - 1 + filteredPlayers.length) % filteredPlayers.length;
        updateHighlighting();
      }
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (activeIndex >= 0 && activeIndex < filteredPlayers.length) {
        selectPlayer(filteredPlayers[activeIndex].name);
        closeDropdown();
        trigger.focus();
      }
    }
  });

  function updateHighlighting() {
    Array.from(optionsList.children).forEach((child, idx) => {
      child.classList.toggle("highlighted", idx === activeIndex);
      if (idx === activeIndex) {
        child.scrollIntoView({ block: "nearest" });
      }
    });
  }

  document.addEventListener("click", (e) => {
    if (!container.contains(e.target)) {
      closeDropdown();
    }
  });

  selectPlayer(defaultValue);
}

function fillCompareOptions() {
  initCustomSelect("containerPlayerA", "playerA", topBy("impactScore").name);
  initCustomSelect("containerPlayerB", "playerB", topBy("valueScore").name);
}
function sl(lbl,l,r) {
  return `<div class="duel-row"><span>${lbl}</span><strong>
    <span class="${l>r?"winner":""}">${l}</span>/<span class="${r>l?"winner":""}">${r}</span>
  </strong></div>`;
}
function renderComparison() {
  const l=enrichedPlayers.find(p=>p.name===playerA.value), r=enrichedPlayers.find(p=>p.name===playerB.value);
  if (!l||!r) return;
  const w = l.impactScore===r.impactScore ? "Bu eşleşmede performans dengesi tam anlamıyla eşit."
    : l.impactScore>r.impactScore ? `${l.name} sahaya yansıttığı etki skoru ve performansı ile bu kıyaslamada öne çıkıyor.`
    : `${r.name} sahaya yansıttığı etki skoru ve performansı ile bu kıyaslamada öne çıkıyor.`;
    
  const imgLId = `compare-img-L-${l.name.replace(/\s+/g, '-')}`;
  const imgRId = `compare-img-R-${r.name.replace(/\s+/g, '-')}`;
  setTimeout(() => {
    loadPlayerImage(l.name, imgLId);
    loadPlayerImage(r.name, imgRId);
  }, 0);

  comparison.innerHTML = `
    <article class="duel-card">
      <div class="card-header-with-photo">
        <div class="player-photo-wrapper">
          <img id="${imgLId}" class="player-photo-img" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100%25' height='100%25' fill='%230f172a'/%3E%3C/svg%3E" alt="${l.name}">
        </div>
        <div class="card-head-details" style="text-align: left;">
          <h3 style="margin:0 0 4px 0;">${l.name}</h3>
          <p style="margin:0; display:flex; align-items:center; gap:4px;">${getTeamLogoHtml(l.team, "tiny")} <span>${l.team}</span></p>
        </div>
      </div>
      ${sl("Gol",l.goals,r.goals)}${sl("Asist",l.assists,r.assists)}
      ${sl("Etki skoru",l.impactScore,r.impactScore)}${sl("Değer skoru",l.valueScore,r.valueScore)}${sl("Form",l.form,r.form)}
    </article>
    <article class="duel-card">
      <div class="card-header-with-photo">
        <div class="player-photo-wrapper">
          <img id="${imgRId}" class="player-photo-img" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100%25' height='100%25' fill='%230f172a'/%3E%3C/svg%3E" alt="${r.name}">
        </div>
        <div class="card-head-details" style="text-align: left;">
          <h3 style="margin:0 0 4px 0;">${r.name}</h3>
          <p style="margin:0; display:flex; align-items:center; gap:4px;">${getTeamLogoHtml(r.team, "tiny")} <span>${r.team}</span></p>
        </div>
      </div>
      <div class="duel-row"><span>Piyasa değeri</span><strong>${formatValue(l.marketValue)} / ${formatValue(r.marketValue)} €</strong></div>
      <div class="duel-row"><span>Dakika</span><strong>${l.minutes} / ${r.minutes}</strong></div>
      <div class="duel-row"><span>Büyük maç</span><strong>${l.bigMatch} / ${r.bigMatch}</strong></div>
      <div class="duel-row"><span>Scout skoru</span><strong>${l.scoutScore} / ${r.scoutScore}</strong></div>
  </article>
    <div class="insight">${w}</div>`;
}

// ── TEAM COMPARISON (DERBİ MODU) ──────────────────────────────────
function fillTeamCompareOptions() {
  const uniqueTeams = [...new Set(enrichedPlayers.map(p => p.team))].sort();
  const optionsHtml = uniqueTeams.map(t => `<option value="${t}">${t}</option>`).join("");
  if(teamASelect) {
    teamASelect.innerHTML = `<option value="">1. Takımı Seçin</option>` + optionsHtml;
    teamASelect.value = uniqueTeams[0] || "";
  }
  if(teamBSelect) {
    teamBSelect.innerHTML = `<option value="">2. Takımı Seçin</option>` + optionsHtml;
    teamBSelect.value = uniqueTeams[1] || "";
  }
}

function getTeamStats(teamName) {
  const playersInTeam = enrichedPlayers.filter(p => p.team === teamName);
  if(!playersInTeam.length) return null;
  
  const totalValue = playersInTeam.reduce((sum, p) => sum + p.marketValue, 0);
  const avgAge = playersInTeam.reduce((sum, p) => sum + p.age, 0) / playersInTeam.length;
  
  const attackers = playersInTeam.filter(p => p.position === "Forvet" || p.position === "Kanat");
  const defenders = playersInTeam.filter(p => p.position === "Defans" || p.position === "Kaleci");
  
  const attackScore = attackers.length ? Math.round(attackers.reduce((sum, p) => sum + p.impactScore, 0) / attackers.length) : 0;
  const defenseScore = defenders.length ? Math.round(defenders.reduce((sum, p) => sum + p.impactScore, 0) / defenders.length) : 0;
  
  const topPlayer = [...playersInTeam].sort((a,b) => b.impactScore - a.impactScore)[0];
  const mostValuable = [...playersInTeam].sort((a,b) => b.marketValue - a.marketValue)[0];
  
  return {
    name: teamName,
    totalValue,
    avgAge,
    attackScore,
    defenseScore,
    topPlayer,
    mostValuable
  };
}

function renderTeamComparison() {
  if(!teamASelect || !teamBSelect || !teamComparison) return;
  const tA = getTeamStats(teamASelect.value);
  const tB = getTeamStats(teamBSelect.value);
  if(!tA || !tB) {
    teamComparison.innerHTML = "<p style='padding:20px; text-align:center;'>Lütfen karşılaştırmak için iki takım seçin.</p>";
    return;
  }
  
  const totalAttack = tA.attackScore + tB.attackScore;
  const totalDefense = tA.defenseScore + tB.defenseScore;
  const totalValue = tA.totalValue + tB.totalValue;
  
  const w = tA.totalValue > tB.totalValue 
    ? `${tA.name}, kadro kalitesi ve piyasa değeri açısından derbinin favorisi konumunda.` 
    : `${tB.name}, kadro kalitesi ve piyasa değeri açısından derbinin favorisi konumunda.`;

  teamComparison.innerHTML = `
    <article class="duel-card">
      <div class="card-header-with-photo" style="justify-content:center;">
        <div class="player-photo-wrapper medium" style="margin:0;">
          ${getTeamLogoHtml(tA.name, "medium")}
        </div>
        <h3 style="margin:10px 0 0 0; text-align:center; font-size:1.4rem;">${tA.name}</h3>
      </div>
      ${sl("Kadro Değeri (M€)", tA.totalValue.toFixed(1), tB.totalValue.toFixed(1))}
      ${sl("Hücum Gücü", tA.attackScore, tB.attackScore)}
      ${sl("Savunma Gücü", tA.defenseScore, tB.defenseScore)}
      ${sl("Yaş Ortalaması", tA.avgAge.toFixed(1), tB.avgAge.toFixed(1))}
      <div class="duel-row" style="flex-direction:column; align-items:flex-start; text-align:left;">
        <span style="margin-bottom:4px; font-size:0.8rem;">En Etkili Oyuncu</span>
        <strong>${tA.topPlayer.name} (${tA.topPlayer.impactScore} Etki)</strong>
      </div>
      <div class="duel-row" style="flex-direction:column; align-items:flex-start; text-align:left;">
        <span style="margin-bottom:4px; font-size:0.8rem;">En Değerli Oyuncu</span>
        <strong>${tA.mostValuable.name} (${formatValue(tA.mostValuable.marketValue)} €)</strong>
      </div>
    </article>

    <article class="duel-card">
      <div class="card-header-with-photo" style="justify-content:center;">
        <div class="player-photo-wrapper medium" style="margin:0;">
          ${getTeamLogoHtml(tB.name, "medium")}
        </div>
        <h3 style="margin:10px 0 0 0; text-align:center; font-size:1.4rem;">${tB.name}</h3>
      </div>
      ${sl("Kadro Değeri (M€)", tA.totalValue.toFixed(1), tB.totalValue.toFixed(1))}
      ${sl("Hücum Gücü", tA.attackScore, tB.attackScore)}
      ${sl("Savunma Gücü", tA.defenseScore, tB.defenseScore)}
      ${sl("Yaş Ortalaması", tA.avgAge.toFixed(1), tB.avgAge.toFixed(1))}
      <div class="duel-row" style="flex-direction:column; align-items:flex-start; text-align:left;">
        <span style="margin-bottom:4px; font-size:0.8rem;">En Etkili Oyuncu</span>
        <strong>${tB.topPlayer.name} (${tB.topPlayer.impactScore} Etki)</strong>
      </div>
      <div class="duel-row" style="flex-direction:column; align-items:flex-start; text-align:left;">
        <span style="margin-bottom:4px; font-size:0.8rem;">En Değerli Oyuncu</span>
        <strong>${tB.mostValuable.name} (${formatValue(tB.mostValuable.marketValue)} €)</strong>
      </div>
    </article>
    <div class="insight" style="margin-top:10px;">${w}</div>`;
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
      <div class="match-teams">
        <div class="match-team">${getTeamLogoHtml(m.home, "small")} <span>${m.home}</span></div>
        <div class="match-vs">VS</div>
        <div class="match-team"><span>${m.away}</span> ${getTeamLogoHtml(m.away, "small")}</div>
      </div>
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
searchInput.addEventListener("input",  e=>{state.search=e.target.value; state.visibleLimit=12; renderPlayers();});
positionFilter.addEventListener("change",e=>{state.position=e.target.value; state.visibleLimit=12; renderPlayers();});
teamFilter.addEventListener("change",  e=>{state.team=e.target.value; state.visibleLimit=12; renderPlayers();});
sortMode.addEventListener("change",    e=>{state.sort=e.target.value; state.visibleLimit=12; renderPlayers();});
budgetOnly.addEventListener("change",  e=>{state.budgetOnly=e.target.checked; state.visibleLimit=12; renderPlayers();});

if (ageFilter) {
  ageFilter.addEventListener("input", e => {
    state.maxAge = parseInt(e.target.value, 10);
    if(ageLabel) ageLabel.textContent = state.maxAge;
    state.visibleLimit=12;
    renderPlayers();
  });
}

if (maxPriceFilter) {
  maxPriceFilter.addEventListener("change", e => {
    state.maxPrice = parseFloat(e.target.value);
    state.visibleLimit=12;
    renderPlayers();
  });
}
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
swapButton.addEventListener("click",()=>{
  const o=playerA.value;
  playerA.value=playerB.value;
  playerB.value=o;
  syncCustomSelectLabel("playerA");
  syncCustomSelectLabel("playerB");
  renderComparison();
});

teamASelect.addEventListener("change", renderTeamComparison);
teamBSelect.addEventListener("change", renderTeamComparison);
swapTeamButton.addEventListener("click", () => {
  const o = teamASelect.value;
  teamASelect.value = teamBSelect.value;
  teamBSelect.value = o;
  renderTeamComparison();
});

if (loadMoreBtn) {
  loadMoreBtn.addEventListener("click", () => {
    state.visibleLimit += 12;
    renderPlayers();
  });
}

// ── SQUAD BUILDER STATE & REFS ─────────────────────────────────
state.builderSquad = {
  lw: null, st: null, rw: null,
  lcm: null, cm: null, rcm: null,
  lb: null, lcb: null, rcb: null, rb: null,
  gk: null
};
state.builderBudget = 25.0;
state.activeSlotId = null;
state.builderSearch = "";

const squadBudgetLimit  = document.querySelector("#squadBudgetLimit");
const totalValueValue   = document.querySelector("#totalValueValue");
const maxBudgetValue    = document.querySelector("#maxBudgetValue");
const totalImpactValue  = document.querySelector("#totalImpactValue");
const budgetProgressBar = document.querySelector("#budgetProgressBar");
const resetBuilderBtn   = document.querySelector("#resetBuilderBtn");
const builderMessage    = document.querySelector("#builderMessage");

const builderModal          = document.querySelector("#builderModal");
const builderModalClose     = document.querySelector("#builderModalClose");
const builderModalTitle     = document.querySelector("#builderModalTitle");
const builderModalSubtitle  = document.querySelector("#builderModalSubtitle");
const builderSearchInput    = document.querySelector("#builderSearchInput");
const builderPlayerList     = document.querySelector("#builderPlayerList");

const simulateSquadBtn     = document.querySelector("#simulateSquadBtn");
const simulationModal      = document.querySelector("#simulationModal");
const simulationModalClose = document.querySelector("#simulationModalClose");
const simLoadingScreen     = document.querySelector("#simLoadingScreen");
const simResultsScreen     = document.querySelector("#simResultsScreen");
const simConsoleLogs       = document.querySelector("#simConsoleLogs");

const simStatChemistry     = document.querySelector("#simStatChemistry");
const simChemistryBar      = document.querySelector("#simChemistryBar");
const simStatPoints        = document.querySelector("#simStatPoints");
const simStatRecord        = document.querySelector("#simStatRecord");
const simStatGoals         = document.querySelector("#simStatGoals");
const simStatDiff          = document.querySelector("#simStatDiff");
const simStandingsBody     = document.querySelector("#simStandingsBody");
const scoutSuggestionsPanel   = document.querySelector("#scoutSuggestionsPanel");
const scoutSuggestionsContent = document.querySelector("#scoutSuggestionsContent");

const simReportContent     = document.querySelector("#simReportContent");
const simDerbyHeader       = document.querySelector("#simDerbyHeader");
const simDerbyTimeline     = document.querySelector("#simDerbyTimeline");

// Global cache for player images
state.playerImages = state.playerImages || {};

function loadPlayerImage(playerName, imgElementId) {
  if (state.playerImages[playerName]) {
    const imgEl = document.getElementById(imgElementId);
    if (imgEl) {
      imgEl.crossOrigin = "anonymous";
      imgEl.src = state.playerImages[playerName];
      imgEl.style.opacity = 1;
    }
    return;
  }
  
  const setFallback = () => {
    const fallbackAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(playerName)}&background=0f172a&color=38bdf8&size=150&font-size=0.33`;
    state.playerImages[playerName] = fallbackAvatar;
    const imgEl = document.getElementById(imgElementId);
    if (imgEl) {
      imgEl.crossOrigin = "anonymous";
      imgEl.src = fallbackAvatar;
      imgEl.style.opacity = 1;
    }
  };

  const title = encodeURIComponent(playerName);
  const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${title}&prop=pageimages&format=json&pithumbsize=150&origin=*`;
  
  fetch(url)
    .then(res => res.json())
    .then(data => {
      const pages = data.query?.pages;
      const pageId = pages ? Object.keys(pages)[0] : null;
      if (pageId && pageId !== "-1" && pages[pageId].thumbnail) {
        state.playerImages[playerName] = pages[pageId].thumbnail.source;
        const imgEl = document.getElementById(imgElementId);
        if (imgEl) { imgEl.crossOrigin = "anonymous"; imgEl.src = state.playerImages[playerName]; imgEl.style.opacity = 1; }
      } else {
        const trUrl = `https://tr.wikipedia.org/w/api.php?action=query&titles=${title}&prop=pageimages&format=json&pithumbsize=150&origin=*`;
        fetch(trUrl)
          .then(res => res.json())
          .then(trData => {
            const trPages = trData.query?.pages;
            const trPageId = trPages ? Object.keys(trPages)[0] : null;
            if (trPageId && trPageId !== "-1" && trPages[trPageId].thumbnail) {
              state.playerImages[playerName] = trPages[trPageId].thumbnail.source;
              const imgEl = document.getElementById(imgElementId);
              if (imgEl) { imgEl.crossOrigin = "anonymous"; imgEl.src = state.playerImages[playerName]; imgEl.style.opacity = 1; }
            } else {
              setFallback();
            }
          })
          .catch(setFallback);
      }
    })
    .catch(setFallback);
}

function updateScoutSuggestions() {
  if (!scoutSuggestionsPanel || !scoutSuggestionsContent) return;

  const selectedPlayers = Object.values(state.builderSquad).filter(p => p !== null);
  const emptySlots = Object.entries(state.builderSquad).filter(([role, player]) => player === null);
  
  if (emptySlots.length === 0 || selectedPlayers.length === 0) {
    scoutSuggestionsPanel.hidden = true;
    return;
  }
  
  let currentSquadValue = 0;
  selectedPlayers.forEach(p => {
    currentSquadValue += p.marketValue;
  });
  
  const remainingBudget = state.builderBudget - currentSquadValue;
  const N = emptySlots.length;
  const averageBudgetPerPlayer = remainingBudget / N;
  
  const suggestions = [];
  
  for (let i = 0; i < Math.min(3, emptySlots.length); i++) {
    const [role, _] = emptySlots[i];
    const slotEl = document.getElementById("slot-" + role);
    if (!slotEl) continue;
    const slotPosition = slotEl.dataset.position;
    const isForvet = slotPosition === "Forvet";
    
    const candidates = enrichedPlayers.filter(p => {
      const matchesPos = isForvet 
        ? (p.position === "Forvet" || p.position === "Kanat") 
        : (p.position === slotPosition);
      if (!matchesPos) return false;
      
      const isAlreadySelected = Object.values(state.builderSquad).some(sel => sel && sel.name === p.name);
      if (isAlreadySelected) return false;
      
      return p.marketValue <= remainingBudget;
    });
    
    if (candidates.length === 0) continue;
    
    // Score recommendation based on impactScore, penalizing if it exceeds average budget heavily
    candidates.forEach(p => {
      let score = p.impactScore;
      if (p.marketValue > averageBudgetPerPlayer * 1.25) {
        score -= (p.marketValue - averageBudgetPerPlayer) * 15;
      }
      p._recScore = score;
    });
    
    candidates.sort((a, b) => b._recScore - a._recScore);
    const recommendedPlayer = candidates[0];
    
    if (recommendedPlayer) {
      suggestions.push({
        role,
        position: slotPosition,
        player: recommendedPlayer
      });
    }
  }
  
  if (suggestions.length === 0) {
    scoutSuggestionsPanel.hidden = true;
    return;
  }
  
  scoutSuggestionsContent.innerHTML = suggestions.map(s => {
    const roleUpper = s.role.toUpperCase();
    return `
      <div class="scout-suggestion-card">
        <div class="scout-suggestion-info">
          <span class="scout-suggestion-role">${roleUpper} (${s.position})</span>
          <strong>${s.player.name}</strong>
          <small>${s.player.team} • ${s.player.marketValue.toFixed(1)} M€ • ${s.player.impactScore} Pts</small>
        </div>
        <button class="btn-primary compact scout-add-btn" data-role="${s.role}" data-name="${s.player.name}" type="button">Hemen Ekle</button>
      </div>
    `;
  }).join("");
  
  scoutSuggestionsContent.querySelectorAll(".scout-add-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const role = btn.dataset.role;
      const name = btn.dataset.name;
      const player = enrichedPlayers.find(x => x.name === name);
      if (player) {
        state.builderSquad[role] = player;
        updateBuilderSlotDOM(role);
        updateBuilderStats();
      }
    });
  });
  
  scoutSuggestionsPanel.hidden = false;
}

function animateCountUp(element, target, suffix = "", duration = 1000) {
  let start = 0;
  const startTime = performance.now();
  
  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const ease = progress * (2 - progress); // easeOutQuad
    const current = Math.round(start + ease * (target - start));
    
    element.textContent = current + suffix;
    
    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      element.textContent = target + suffix;
    }
  }
  
  requestAnimationFrame(update);
}

function runSquadSimulation() {
  const selectedPlayers = Object.values(state.builderSquad).filter(p => p !== null);
  if (selectedPlayers.length < 11) return;

  simConsoleLogs.innerHTML = "";
  simResultsScreen.hidden = true;
  simLoadingScreen.hidden = false;
  simulationModal.hidden = false;

  const logLines = [
    { text: "🔍 [AI Ajanı] Oyuncu verileri ve kariyer istatistikleri inceleniyor...", delay: 0 },
    { text: "⚙️ [AI Ajanı] 4-3-3 taktiksel formasyon yerleşimi doğrulanıyor...", delay: 600 },
    { text: "🧬 [AI Ajanı] Takım kimyası ve saha içi uyum faktörleri hesaplanıyor...", delay: 1200 },
    { text: "🏟️ [AI Ajanı] Süper Lig devlerine karşı 25 maçlık simülasyon başlatıldı...", delay: 1800 },
    { text: "📊 [AI Ajanı] Rakip analizleri tamamlandı, derbi maçı simüle ediliyor...", delay: 2400 },
    { text: "✅ [AI Ajanı] Rapor hazırlandı! Sonuçlar ekrana aktarılıyor...", delay: 3000, cls: "success" }
  ];

  logLines.forEach(line => {
    setTimeout(() => {
      const p = document.createElement("p");
      p.className = "sim-log-line" + (line.cls ? " " + line.cls : "");
      p.textContent = line.text;
      simConsoleLogs.appendChild(p);
      simConsoleLogs.scrollTop = simConsoleLogs.scrollHeight;
    }, line.delay);
  });

  // 1. Chemistry calculation
  let baselineChemistry = 50;
  const teamCounts = {};
  selectedPlayers.forEach(p => {
    teamCounts[p.team] = (teamCounts[p.team] || 0) + 1;
  });
  const maxSameTeam = Math.max(...Object.values(teamCounts));
  const synergyBonus = (maxSameTeam - 1) * 4;
  
  let dmfBonus = 0;
  const mids = selectedPlayers.filter(p => p.position === "Orta saha");
  const hasDmf = mids.some(p => {
    const s = p.strengths.join(" ").toLowerCase();
    return s.includes("savunma") || s.includes("top kapma") || s.includes("mücadele") || p.name.includes("Torreira") || p.name.includes("Ndidi") || p.name.includes("Alvarez");
  });
  if (hasDmf) dmfBonus = 12;
  
  const avgForm = selectedPlayers.reduce((s, p) => s + p.form, 0) / 11;
  const formBonus = Math.round((avgForm - 75) * 0.4);
  const totalChemistry = Math.min(100, baselineChemistry + synergyBonus + dmfBonus + formBonus);

  // 2. Expected points calculation (25 matches)
  const totalImpact = selectedPlayers.reduce((s, p) => s + p.impactScore, 0);
  const chemBonus = (totalChemistry - 70) * 0.25; // -5 to +7.5 points effect
  const calculatedPointsBase = ((totalImpact - 1600) / 1000) * 35 + 35 + chemBonus;
  const randomFactor = Math.floor(Math.random() * 11) - 5;
  let points = Math.max(0, Math.min(75, Math.round(calculatedPointsBase + randomFactor)));
  if (points === 74) points = 73; // 74 is mathematically impossible in 25 games
  
  let wins = 0;
  let draws = 0;
  let losses = 0;
  for (let w = Math.min(25, Math.floor(points / 3)); w >= 0; w--) {
    let d = points - 3 * w;
    if (w + d <= 25) {
      wins = w;
      draws = d;
      losses = 25 - w - d;
      break;
    }
  }

  // 3. Goal Average (25 matches)
  const forwards = selectedPlayers.filter(p => p.position === "Forvet" || p.position === "Kanat");
  const defenders = selectedPlayers.filter(p => p.position === "Defans" || p.position === "Kaleci");
  
  const fwdImpact = forwards.reduce((s, p) => s + p.impactScore, 0);
  const defImpact = defenders.reduce((s, p) => s + p.impactScore, 0);
  
  const goalsScoredBase = (fwdImpact / 350) * 30 + 15;
  const goalsScored = Math.round(goalsScoredBase + (Math.random() * 15 - 7));
  
  const goalsConcededBase = 55 - (defImpact / 450) * 30;
  const goalsConceded = Math.max(5, Math.round(goalsConcededBase + (Math.random() * 15 - 7)));

  const goalDiff = goalsScored - goalsConceded;
  const sign = goalDiff >= 0 ? "+" : "";

  // 4. Generate simulated standings for the 18 real teams + user's squad
  const simStandings = standings.map(r => {
    const ratio = 25 / 34;
    let basePts = Math.round(r.pts * ratio);
    const variation = Math.floor(Math.random() * 9) - 4;
    let simPts = Math.max(0, Math.min(75, basePts + variation));
    if (simPts === 74) simPts = 73;
    
    let teamG = 0, teamB = 0, teamM = 0;
    for (let w = Math.min(25, Math.floor(simPts / 3)); w >= 0; w--) {
      let d = simPts - 3 * w;
      if (w + d <= 25) {
        teamG = w;
        teamB = d;
        teamM = 25 - w - d;
        break;
      }
    }
    
    let teamAg = Math.round(r.ag * ratio + (Math.random() * 8 - 4));
    let teamYg = Math.round(r.yg * ratio + (Math.random() * 8 - 4));
    teamAg = Math.max(0, teamAg);
    teamYg = Math.max(0, teamYg);
    const teamGd = teamAg - teamYg;
    
    return {
      team: r.team,
      o: 25,
      g: teamG,
      b: teamB,
      m: teamM,
      ag: teamAg,
      yg: teamYg,
      gd: teamGd,
      pts: simPts,
      isUser: false
    };
  });

  simStandings.push({
    team: "Kendi Kadronuz",
    o: 25,
    g: wins,
    b: draws,
    m: losses,
    ag: goalsScored,
    yg: goalsConceded,
    gd: goalDiff,
    pts: points,
    isUser: true
  });

  // Sort by points, then goal difference, then goals scored
  simStandings.sort((a, b) => {
    if (b.pts !== a.pts) return b.pts - a.pts;
    if (b.gd !== a.gd) return b.gd - a.gd;
    return b.ag - a.ag;
  });

  const userRank = simStandings.findIndex(t => t.isUser) + 1;

  // AI Scout Report Content Generation
  let rankComment = "";
  if (userRank === 1) {
    rankComment = `<p>🏆 <strong>ŞAMPİYONLUK RÜYASI!</strong> Kadronuz 25 maçlık simülasyonu <strong>${userRank}. sırada (Şampiyon)</strong> tamamladı! Ligin tozunu atan bu yapılanma, Süper Lig'in yeni hükümdarı olmaya aday.</p>`;
  } else if (userRank <= 4) {
    rankComment = `<p>🇪🇺 <strong>Avrupa Vizesi:</strong> Kadronuz 25 maçlık simülasyonu <strong>${userRank}. sırada</strong> bitirerek Avrupa kupalarına katılma hakkı kazandı. Zirve yarışında büyük bir tehdit oluşturuyorsunuz.</p>`;
  } else if (userRank <= 8) {
    rankComment = `<p>📈 <strong>Orta Sıra Güvenliği:</strong> Kadronuz ligi <strong>${userRank}. sırada</strong> tamamladı. İstikrarlı bir performans sergilese de şampiyonluk ortaklığı için kadro derinliği artırılmalı.</p>`;
  } else if (userRank <= 15) {
    rankComment = `<p>⚠️ <strong>Gelişime Açık:</strong> Kadronuz ligi <strong>${userRank}. sırada</strong> bitirdi. Düşme hattından uzak olsa da hedeflenen başarıların gerisinde kalındı.</p>`;
  } else {
    rankComment = `<p>🚨 <strong>KÜME DÜŞME TEHLİKESİ!</strong> Kadronuz simülasyonu <strong>${userRank}. sırada (Küme düşme hattı)</strong> tamamladı. Acilen taktiksel değişikliklere ve kritik takviyelere ihtiyaç var!</p>`;
  }

  const avgAge = selectedPlayers.reduce((s, p) => s + p.age, 0) / 11;
  let ageAnalysis = "";
  if (avgAge > 30) {
    ageAnalysis = `<p>👴 <strong>Deneyim Odaklı Kadro:</strong> Takımınızın yaş ortalaması oldukça yüksek (<strong>${avgAge.toFixed(1)}</strong>). Büyük maç streslerini kolaylıkla yönetebilecek deneyimli ayaklara sahipsiniz ancak uzun maratonlarda fiziksel düşüşler ve sakatlık riskleri yaşanabilir.</p>`;
  } else if (avgAge < 25) {
    ageAnalysis = `<p>👶 <strong>Gelecek ve Dinamizm:</strong> Kadronuz çok genç ve enerjik (<strong>${avgAge.toFixed(1)}</strong> yaş). Tempolu oyunda ve pres gücünde rakipleri boğabilirsiniz fakat ligin kırılma anlarında tecrübe eksikliği hissedilebilir.</p>`;
  } else {
    ageAnalysis = `<p>⚖️ <strong>Dengeli Yaş Dağılımı:</strong> Takım yaş ortalaması son derece dengeli (<strong>${avgAge.toFixed(1)}</strong>). Tecrübe ile atletizm arasındaki altın dengeyi yakalamış durumdasınız.</p>`;
  }

  const budget = state.builderBudget;
  const maxVal = Math.max(...selectedPlayers.map(p => p.marketValue));
  const superstar = selectedPlayers.find(p => p.marketValue === maxVal);
  let budgetAnalysis = "";
  if (maxVal > budget * 0.4) {
    budgetAnalysis = `<p>⭐ <strong>Yıldız Bağımlılığı:</strong> Bütçenizin <strong>%${Math.round((maxVal/budget)*100)}</strong>'ini kaplayan <strong>${superstar.name}</strong> takımın mutlak lideri. Bu superstar odaklı bir yapı sunsa da, onun sakatlanması halinde alternatif üretmekte zorlanabilirsiniz.</p>`;
  } else {
    budgetAnalysis = `<p>💼 <strong>Dengeli Bütçe Yönetimi:</strong> Bütçenizi tek bir yıldıza yatırmak yerine homojen dağıtarak geniş ve dengeli bir kadro kurmuşsunuz. Sakatlık veya formsuzluk durumlarında alternatiflerinizin olması takımı koruyacaktır.</p>`;
  }

  const strengthCounts = {};
  selectedPlayers.forEach(p => {
    p.strengths.forEach(s => {
      strengthCounts[s] = (strengthCounts[s] || 0) + 1;
    });
  });
  const sortedStrengths = Object.entries(strengthCounts).sort((a,b) => b[1] - a[1]);
  let strengthsText = "";
  if (sortedStrengths.length > 0) {
    strengthsText = `<p>🎯 <strong>Taktiksel Güçler:</strong> Kadronuzda en çok öne çıkan yetenekler: <strong>${sortedStrengths.slice(0, 2).map(x => x[0]).join(" ve ")}</strong>. Bu nitelikler, oyun kurarken ve hücum varyasyonlarında temel silahlarınız olacaktır.</p>`;
  }

  let advice = "";
  if (totalChemistry < 70) {
    advice = `<p>💡 <strong>AI Önerisi:</strong> Takım kimyanız (<strong>%${totalChemistry}</strong>) biraz düşük. Aynı takımdan oynayan oyuncuları bir araya getirerek (örneğin stoper ikilisini veya kanat-bek uyumunu) sinerjiyi artırabilirsiniz.</p>`;
  } else if (totalImpact < 800) {
    advice = `<p>💡 <strong>AI Önerisi:</strong> Kadronuz dengeli ancak genel etki kalitesi biraz sınırda. Bütçe limitinizi sonuna kadar zorlayıp, daha ucuz mevkilerden tasarruf ederek kilit pozisyonlara daha yüksek puanlı lider oyuncular yerleştirebilirsiniz.</p>`;
  } else {
    advice = `<p>💡 <strong>AI Önerisi:</strong> Harika bir bütçe/performans dengesi yakalanmış! Bu kadro şampiyonluk yarışının en güçlü adaylarından biri olacaktır. Taktiksel yapıyı bozmadan devam edin.</p>`;
  }

  simReportContent.innerHTML = rankComment + ageAnalysis + budgetAnalysis + strengthsText + advice;

  // 5. Derby Simulation Generation
  const bigTeams = ["Galatasaray", "Fenerbahce", "Besiktas", "Trabzonspor"];
  let opponent = "Galatasaray";
  let minPlayers = 11;
  bigTeams.forEach(t => {
    const cnt = selectedPlayers.filter(p => p.team === t).length;
    if (cnt < minPlayers) {
      minPlayers = cnt;
      opponent = t;
    }
  });

  let userGoals = 0;
  let oppGoals = 0;
  const squadStrength = (totalImpact * 0.7) + (totalChemistry * 5);
  
  if (squadStrength > 2000) {
    // Strong squad: high chance of winning, but can still draw or lose a close match
    const r = Math.random();
    if (r < 0.6) {
      userGoals = Math.floor(Math.random() * 3) + 1; // 1-3
      oppGoals = Math.floor(Math.random() * userGoals); // 0 to userGoals-1 (Win)
    } else if (r < 0.85) {
      userGoals = Math.floor(Math.random() * 3); // 0-2
      oppGoals = userGoals; // Draw
    } else {
      oppGoals = Math.floor(Math.random() * 2) + 1; // 1-2
      userGoals = Math.floor(Math.random() * oppGoals); // Lose
    }
  } else if (squadStrength < 1600) {
    // Weak squad: high chance of losing
    const r = Math.random();
    if (r < 0.6) {
      oppGoals = Math.floor(Math.random() * 3) + 1;
      userGoals = Math.floor(Math.random() * oppGoals); // Lose
    } else if (r < 0.85) {
      userGoals = Math.floor(Math.random() * 3);
      oppGoals = userGoals; // Draw
    } else {
      userGoals = Math.floor(Math.random() * 2) + 1;
      oppGoals = Math.floor(Math.random() * userGoals); // Win
    }
  } else {
    // Average squad: balanced chances
    const r = Math.random();
    if (r < 0.4) {
      userGoals = Math.floor(Math.random() * 3) + 1;
      oppGoals = Math.floor(Math.random() * userGoals); // Win
    } else if (r < 0.8) {
      userGoals = Math.floor(Math.random() * 3);
      oppGoals = userGoals; // Draw
    } else {
      oppGoals = Math.floor(Math.random() * 3) + 1;
      userGoals = Math.floor(Math.random() * oppGoals); // Lose
    }
  }

  simDerbyHeader.innerHTML = `
    <span style="display:flex; align-items:center; gap:8px;">${getFallbackLogoSvg("Kadro Kur")} Kendi Kadronuz</span>
    <span class="sim-derby-score">${userGoals} - ${oppGoals}</span>
    <span style="display:flex; align-items:center; gap:8px;"><span>${opponent}</span> ${getTeamLogoHtml(opponent, "small")}</span>
  `;

  const timelineEvents = [];
  const defs = selectedPlayers.filter(p => p.position === "Defans" || p.position === "Orta saha");
  const cardPlayer = defs.length > 0 ? defs[Math.floor(Math.random() * defs.length)].name : "Oyuncu";
  timelineEvents.push({
    min: Math.floor(Math.random() * 30) + 15,
    type: "cards",
    text: `⚠️ <strong>${cardPlayer}</strong> rakip hücumu kesmek için yaptığı taktik faul nedeniyle sarı kart gördü.`
  });

  const userScorers = selectedPlayers.filter(p => p.position === "Forvet" || p.position === "Kanat" || p.position === "Orta saha");
  for (let i = 0; i < userGoals; i++) {
    const scorer = userScorers.length > 0 ? userScorers[Math.floor(Math.random() * userScorers.length)].name : "Forvet";
    const assistProvider = selectedPlayers.filter(p => p.name !== scorer && p.position !== "Kaleci");
    const assister = assistProvider.length > 0 ? assistProvider[Math.floor(Math.random() * assistProvider.length)].name : null;
    const assistText = assister ? `, <strong>${assister}</strong>'in asistinde` : "";
    
    timelineEvents.push({
      min: Math.floor(Math.random() * 40) + (i * 20) + 5,
      type: "goal",
      text: `⚽ <strong>GOL!</strong> Takımınızda <strong>${scorer}</strong> ceza sahası içinden klas bir vuruşla${assistText} golü buluyor!`
    });
  }

  for (let i = 0; i < oppGoals; i++) {
    timelineEvents.push({
      min: Math.floor(Math.random() * 45) + (i * 15) + 10,
      type: "opp-goal",
      text: `⚽ <strong>Gol!</strong> ${opponent} takımı hızlı hücumla savunmamızın arkasına sarkarak golü atıyor.`
    });
  }

  const gks = selectedPlayers.filter(p => p.position === "Kaleci");
  const gkName = gks.length > 0 ? gks[0].name : "Kalecimiz";
  timelineEvents.push({
    min: Math.floor(Math.random() * 20) + 70,
    type: "save",
    text: `🧤 <strong>Dev Kurtarış!</strong> ${opponent} hücumunda karşı karşıya kalınan pozisyonda kalecimiz <strong>${gkName}</strong> müthiş refleksle golü önledi.`
  });

  timelineEvents.sort((a, b) => a.min - b.min);

  simDerbyTimeline.innerHTML = timelineEvents.map((e, idx) => {
    let cls = e.type === "goal" ? "goal" : (e.type === "cards" ? "cards" : "");
    return `
      <div class="sim-timeline-event ${cls}" style="animation-delay: ${400 + idx * 120}ms;">
        <strong>${e.min}'</strong> ${e.text}
      </div>
    `;
  }).join("");

  setTimeout(() => {
    simLoadingScreen.hidden = true;
    simResultsScreen.hidden = false;
    
    animateCountUp(simStatChemistry, totalChemistry, "%", 1200);
    simChemistryBar.style.width = totalChemistry + "%";
    
    animateCountUp(simStatPoints, points, " Puan", 1200);
    simStatRecord.textContent = `${wins}G ${draws}B ${losses}M`;
    
    simStatGoals.textContent = `${goalsScored} - ${goalsConceded}`;
    simStatDiff.textContent = sign + goalDiff;
    simStatDiff.className = goalDiff >= 0 ? "success" : "danger";
    if (goalDiff >= 0) {
      simStatDiff.style.color = "#10b981";
    } else {
      simStatDiff.style.color = "#ef4444";
    }

    // Render Standings Table
    simStandingsBody.innerHTML = simStandings.map((t, index) => {
      const rank = index + 1;
      const rowClass = t.isUser ? "class='sim-row-user'" : "";
      const logoHtml = t.isUser ? getTeamLogoHtml("Kadro Kur", "small") : getTeamLogoHtml(t.team, "small");
      const teamDisplayName = t.isUser ? "Kendi Kadronuz" : t.team;
      const signStr = t.gd >= 0 ? "+" : "";
      return `
        <tr ${rowClass}>
          <td>${rank}</td>
          <td>
            <div class="st-team">
              ${logoHtml}
              <span>${teamDisplayName}</span>
            </div>
          </td>
          <td>${t.o}</td>
          <td>${t.g}</td>
          <td>${t.b}</td>
          <td>${t.m}</td>
          <td>${signStr}${t.gd}</td>
          <td class="st-pts">${t.pts}</td>
        </tr>
      `;
    }).join("");
  }, 3400);
}

function closeSimulationModal() {
  simulationModal.hidden = true;
}

function renderBuilderPlayers() {
  if (!state.activeSlotId) return;
  const slotEl = document.getElementById(state.activeSlotId);
  if (!slotEl) return;
  
  const slotPosition = slotEl.dataset.position;
  const slotRole = slotEl.dataset.role;
  const isForvet = slotPosition === "Forvet";
  
  // Filter eligible players
  const filtered = enrichedPlayers.filter(p => {
    // position match: Forvet slots accept Kanat and Forvet
    const matchesPos = isForvet 
      ? (p.position === "Forvet" || p.position === "Kanat") 
      : (p.position === slotPosition);
    if (!matchesPos) return false;
    
    // exclude players already selected in OTHER slots
    const isAlreadySelected = Object.entries(state.builderSquad).some(([role, sel]) => {
      return role !== slotRole && sel && sel.name === p.name;
    });
    if (isAlreadySelected) return false;
    
    // search filter
    if (state.builderSearch) {
      const q = state.builderSearch.toLowerCase();
      return p.name.toLowerCase().includes(q) || p.team.toLowerCase().includes(q);
    }
    return true;
  });
  
  // Sort by impact score descending
  filtered.sort((a, b) => b.impactScore - a.impactScore);
  
  if (filtered.length === 0) {
    builderPlayerList.innerHTML = `<p style="padding:20px; text-align:center; color:var(--muted); font-weight:600;">Oyuncu bulunamadı.</p>`;
    return;
  }
  
  builderPlayerList.innerHTML = filtered.map(p => `
    <div class="builder-player-card" data-name="${p.name}">
      <div class="builder-player-info">
        <strong>${p.name}</strong>
        <small>${p.team} • ${p.position} • Yaş ${p.age}</small>
      </div>
      <div class="builder-player-stats">
        <span class="builder-player-val">${p.marketValue.toFixed(1)} M€</span>
        <span class="builder-player-impact">${p.impactScore} Pts</span>
      </div>
    </div>
  `).join("");
  
  // Bind click events to player cards
  builderPlayerList.querySelectorAll(".builder-player-card").forEach(card => {
    card.addEventListener("click", () => {
      const name = card.dataset.name;
      const player = enrichedPlayers.find(x => x.name === name);
      if (player) {
        state.builderSquad[slotRole] = player;
        updateBuilderSlotDOM(slotRole);
        updateBuilderStats();
        closeBuilderModal();
      }
    });
  });
}

function updateBuilderSlotDOM(role) {
  const slotEl = document.getElementById("slot-" + role);
  if (!slotEl) return;
  
  const player = state.builderSquad[role];
  if (player) {
    const imgId = `slot-img-${role}-${player.name.replace(/\s+/g, '-')}`;
    setTimeout(() => loadPlayerImage(player.name, imgId), 0);
    slotEl.classList.add("populated");
    slotEl.innerHTML = `
      <button class="remove-player-btn" data-role="${role}" type="button" aria-label="Kaldır">✕</button>
      <div class="slot-photo-wrapper">
        <img id="${imgId}" class="slot-player-img" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100%25' height='100%25' fill='%230f172a'/%3E%3C/svg%3E" alt="${player.name}">
      </div>
      <span class="slot-role">${role.toUpperCase()}</span>
      <span class="populated-player-name">${player.name}</span>
      <span class="populated-player-value">${player.marketValue.toFixed(1)} M€</span>
      <span class="populated-player-score">${player.impactScore} Pts</span>
    `;
    
    // Bind remove button click
    slotEl.querySelector(".remove-player-btn").addEventListener("click", (e) => {
      e.stopPropagation(); // prevent modal opening
      state.builderSquad[role] = null;
      updateBuilderSlotDOM(role);
      updateBuilderStats();
    });
  } else {
    slotEl.classList.remove("populated");
    slotEl.innerHTML = `
      <span class="slot-role">${role.toUpperCase()}</span>
      <span class="slot-add">+</span>
    `;
  }
}

function updateBuilderStats() {
  let totalValue = 0;
  let totalImpact = 0;
  let populatedCount = 0;
  
  Object.values(state.builderSquad).forEach(p => {
    if (p) {
      totalValue += p.marketValue;
      totalImpact += p.impactScore;
      populatedCount++;
    }
  });
  
  totalValueValue.textContent = totalValue.toFixed(1) + " M€";
  totalImpactValue.textContent = totalImpact;
  
  const budget = state.builderBudget;
  maxBudgetValue.textContent = budget.toFixed(1) + " M€";
  
  const pct = Math.min(100, (totalValue / budget) * 100);
  budgetProgressBar.style.width = pct + "%";
  
  const labelsEl = totalValueValue.closest(".budget-progress-labels");
  
  if (totalValue > budget) {
    budgetProgressBar.classList.add("exceeded");
    if (labelsEl) labelsEl.classList.add("exceeded");
    
    builderMessage.className = "builder-status-msg error";
    builderMessage.textContent = `Bütçe limitini aştınız! Limit: ${budget.toFixed(1)} M€, Kadro Değeri: ${totalValue.toFixed(1)} M€`;
    builderMessage.hidden = false;
  } else {
    budgetProgressBar.classList.remove("exceeded");
    if (labelsEl) labelsEl.classList.remove("exceeded");
    
    if (populatedCount === 11) {
      builderMessage.className = "builder-status-msg success";
      builderMessage.textContent = `Tebrikler! ${budget.toFixed(1)} M€ bütçe altında ${totalImpact} toplam etki skoruyla kadronuzu başarıyla kurdunuz!`;
      builderMessage.hidden = false;
    } else {
      builderMessage.hidden = true;
    }
  }

  const isComplete = (populatedCount === 11 && totalValue <= budget);
  if (simulateSquadBtn) {
    simulateSquadBtn.disabled = !isComplete;
  }

  // AI Scout Suggestions Agent invocation
  updateScoutSuggestions();
}

function closeBuilderModal() {
  builderModal.hidden = true;
  state.activeSlotId = null;
}

function resetBuilder() {
  Object.keys(state.builderSquad).forEach(role => {
    state.builderSquad[role] = null;
    updateBuilderSlotDOM(role);
  });
  updateBuilderStats();
}

function initSquadBuilder() {
  // Budget dropdown change handler
  if (squadBudgetLimit) {
    squadBudgetLimit.addEventListener("change", (e) => {
      state.builderBudget = parseFloat(e.target.value);
      updateBuilderStats();
    });
  }
  
  // Pitch slot click handler
  document.querySelectorAll(".pitch-slot").forEach(slot => {
    slot.addEventListener("click", () => {
      state.activeSlotId = slot.id;
      const slotRole = slot.dataset.role;
      const slotPosition = slot.dataset.position;
      
      builderModalSubtitle.textContent = `Mevki: ${slotPosition} (${slotRole.toUpperCase()})`;
      state.builderSearch = "";
      builderSearchInput.value = "";
      
      renderBuilderPlayers();
      builderModal.hidden = false;
    });
  });
  
  // Search input handler in builder modal
  if (builderSearchInput) {
    builderSearchInput.addEventListener("input", (e) => {
      state.builderSearch = e.target.value;
      renderBuilderPlayers();
    });
  }
  
  // Close buttons & modal clicks
  if (builderModalClose) {
    builderModalClose.addEventListener("click", closeBuilderModal);
  }
  
  if (builderModal) {
    builderModal.addEventListener("click", (e) => {
      if (e.target === builderModal) {
        closeBuilderModal();
      }
    });
  }
  
  // Reset button click
  if (resetBuilderBtn) {
    resetBuilderBtn.addEventListener("click", resetBuilder);
  }

  // Simulation button click
  if (simulateSquadBtn) {
    simulateSquadBtn.addEventListener("click", runSquadSimulation);
  }

  // Download button click
  const downloadSquadBtn = document.getElementById("downloadSquadBtn");
  if (downloadSquadBtn) {
    downloadSquadBtn.addEventListener("click", () => {
      const pitch = document.querySelector(".pitch-container");
      if (!pitch) return;
      
      // Add a loading state to the button
      const origText = downloadSquadBtn.innerHTML;
      downloadSquadBtn.innerHTML = "İndiriliyor...";
      downloadSquadBtn.disabled = true;

      // Ensure html2canvas is loaded
      if (typeof html2canvas === "undefined") {
        alert("İndirme aracı yüklenemedi. Lütfen sayfayı yenileyin.");
        downloadSquadBtn.innerHTML = origText;
        downloadSquadBtn.disabled = false;
        return;
      }

      html2canvas(pitch, { 
        backgroundColor: "#0f172a", 
        scale: 2,
        useCORS: true,
        allowTaint: true
      }).then(canvas => {
        const link = document.createElement("a");
        link.download = "ruya-onbirim.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
      }).catch(err => {
        console.error("Ekran görüntüsü alınırken hata:", err);
        alert("Bir hata oluştu.");
      }).finally(() => {
        downloadSquadBtn.innerHTML = origText;
        downloadSquadBtn.disabled = false;
      });
    });
  }

  if (simulationModalClose) {
    simulationModalClose.addEventListener("click", closeSimulationModal);
  }

  if (simulationModal) {
    simulationModal.addEventListener("click", (e) => {
      if (e.target === simulationModal) {
        closeSimulationModal();
      }
    });
  }
  
  // Escape key support to close modals
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (!builderModal.hidden) closeBuilderModal();
      if (!simulationModal.hidden) closeSimulationModal();
    }
  });
  
  // Initial stats setup
  updateBuilderStats();
}

function initAmbientMusic() {
  const musicPlayer = document.querySelector("#musicPlayer");
  const bgAudio = document.querySelector("#bgAudio");
  const playBtn = document.querySelector("#musicPlayBtn");
  const trackBtn = document.querySelector("#musicTrackBtn");
  const titleText = document.querySelector("#musicTitle");
  const statusText = document.querySelector("#musicStatus");
  
  if (!musicPlayer || !bgAudio || !playBtn) return;
  
  const playlist = [
    { title: "Lig Teması", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" },
    { title: "Atmosfer Müziği", url: "https://raw.githubusercontent.com/rafaelreis-hotmart/Audio-Sample-files/master/sample2.mp3" }
  ];
  let currentTrackIdx = 0;

  // Load the first track source into the element
  bgAudio.src = playlist[0].url;
  titleText.textContent = playlist[0].title;
  
  function togglePlay() {
    if (bgAudio.paused) {
      bgAudio.load();
      bgAudio.play()
        .then(() => {
          musicPlayer.classList.add("playing");
          playBtn.textContent = "⏸";
          statusText.textContent = "Oynatılıyor";
        })
        .catch(err => {
          console.warn("Audio play blocked:", err);
          statusText.textContent = "Tıkla & Oynat";
        });
    } else {
      bgAudio.pause();
      musicPlayer.classList.remove("playing");
      playBtn.textContent = "▶";
      statusText.textContent = "Duraklatıldı";
    }
  }
  
  function switchTrack() {
    currentTrackIdx = (currentTrackIdx + 1) % playlist.length;
    const track = playlist[currentTrackIdx];
    
    const wasPlaying = !bgAudio.paused;
    if (wasPlaying) bgAudio.pause();
    bgAudio.src = track.url;
    titleText.textContent = track.title;
    bgAudio.load();
    
    if (wasPlaying) {
      bgAudio.play()
        .then(() => {
          musicPlayer.classList.add("playing");
          playBtn.textContent = "⏸";
          statusText.textContent = "Oynatılıyor";
        })
        .catch(() => {
          musicPlayer.classList.remove("playing");
          playBtn.textContent = "▶";
          statusText.textContent = "Duraklatıldı";
        });
    } else {
      statusText.textContent = "Duraklatıldı";
    }
  }
  
  playBtn.addEventListener("click", togglePlay);
  trackBtn.addEventListener("click", switchTrack);
}

function initWelcomeSplash() {
  const splash = document.getElementById("welcomeSplash");
  if (!splash) return;

  // After page fully loaded, begin fade-out sequence
  const dismiss = () => {
    splash.classList.add("fade-out");
    splash.addEventListener("transitionend", () => splash.remove(), { once: true });
    // Fallback remove if transition doesn't fire
    setTimeout(() => { if (splash.parentNode) splash.remove(); }, 1200);
  };

  // Give a bit of time to show the splash, then auto-dismiss
  setTimeout(dismiss, 2800);

  // Also allow early dismiss on click
  splash.addEventListener("click", dismiss);
}

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
fillTeamCompareOptions();
renderTeamComparison();
renderPoll();
renderMatchPredictions();
initSquadBuilder();
initAmbientMusic();
initWelcomeSplash();
