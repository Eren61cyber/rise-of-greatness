// ================================================================
// SÃœPER LÄ°G ATLASI â€” app.js  |  2025-26 Sezonu
// ================================================================

// ===================== TEMA YÃ–NETÄ°MÄ° =====================
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

// TakÄ±m adlarÄ±nÄ± normalize eden yardÄ±mcÄ± (TÃ¼rkÃ§e â†” ASCII)
function normalizeTeamName(name) {
  return name
    .replace(/Ã§/g, 'c').replace(/Ã‡/g, 'C')
    .replace(/ÄŸ/g, 'g').replace(/Ä/g, 'G')
    .replace(/Ä±/g, 'i').replace(/Ä°/g, 'I')
    .replace(/Ã¶/g, 'o').replace(/Ã–/g, 'O')
    .replace(/ÅŸ/g, 's').replace(/Å/g, 'S')
    .replace(/Ã¼/g, 'u').replace(/Ãœ/g, 'U');
}

// Her takÄ±m iÃ§in tek kayÄ±t (ASCII anahtarÄ± â€” normalizeTeamName ile eÅŸleÅŸir)
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
  // Ã–nce orijinal adla ara, bulamazsan normalize et
  const logoUrl = teamLogos[teamName] || teamLogos[normalizeTeamName(teamName)];
  if (!logoUrl) {
    return `<span class="team-logo-wrapper ${sizeClass}">${getFallbackLogoSvg(teamName)}</span>`;
  }
  const escapedFallback = getFallbackLogoSvg(teamName).replace(/"/g, '&quot;').replace(/'/g, "\\'")
  return `<span class="team-logo-wrapper ${sizeClass}"><img src="${logoUrl}" alt="${teamName}" class="team-logo-img" loading="lazy" onerror="this.outerHTML='${escapedFallback}'"></span>`;
}

function getAwardLogoHtml(teamString) {
  if (teamString.includes("/")) {
    return `<span class="team-logo-wrapper tiny" style="background:#ffd700; border-radius:50%; width:18px; height:18px; display:inline-flex; align-items:center; justify-content:center;"><span style="font-size:10px;line-height:1;display:block;text-align:center;">ğŸ†</span></span>`;
  }
  return getTeamLogoHtml(teamString, "tiny");
}

// â”€â”€ OYUNCU VERÄ°SÄ° â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const players = [
  { name:"Ugurcan Cakir", team:"Galatasaray", position:"Kaleci", age:30, marketValue:15.0, goals:0, assists:0, minutes:3230, bigMatch:92, form:91, story:"Trabzonspor'dan transfer edilen milli kaleci, Galatasaray kalesinde 20 clean sheet ile ÅŸampiyonlukta devleÅŸti.", career:["Trabzonspor","Galatasaray"], strengths:["Refleks","Liderlik","Bire Bir"] },
  { name:"Gunay Guvenc", team:"Galatasaray", position:"Kaleci", age:34, marketValue:0.4, goals:0, assists:0, minutes:170, bigMatch:75, form:80, story:"Yedek kaleci olarak kupada gÃ¶rev alan tecrÃ¼beli eldiven, kalesinde her zaman gÃ¼ven verdi.", career:["Stuttgart","GÃ¶ztepe","Gaziantep FK","Galatasaray"], strengths:["TecrÃ¼be","Refleks"] },
  { name:"Victor Osimhen", team:"Galatasaray", position:"Forvet", age:27, marketValue:75.0, goals:22, assists:8, minutes:2800, bigMatch:95, form:94, story:"75Mâ‚¬'luk dÃ¼nya yÄ±ldÄ±zÄ±, 22 gol ve 8 asistle gol krallÄ±ÄŸÄ±nÄ±n ortaÄŸÄ± oldu ve ÅŸampiyonluÄŸun en bÃ¼yÃ¼k mimarÄ±ydÄ±.", career:["Wolfsburg","Lille","Napoli","Galatasaray"], strengths:["Bitiricilik","HÄ±z","Fizik"] },
  { name:"Mauro Icardi", team:"Galatasaray", position:"Forvet", age:33, marketValue:4.0, goals:10, assists:4, minutes:1900, bigMatch:90, form:85, story:"YaÅŸadÄ±ÄŸÄ± sakatlÄ±klara raÄŸmen Ã§Ä±ktÄ±ÄŸÄ± maÃ§larda klasÄ±nÄ± konuÅŸturdu ve 10 gol attÄ±.", career:["Sampdoria","Inter","PSG","Galatasaray"], strengths:["Bitiricilik","Pozisyon Alma","TecrÃ¼be"] },
  { name:"Baris Alper Yilmaz", team:"Galatasaray", position:"Kanat", age:26, marketValue:30.0, goals:8, assists:11, minutes:2900, bigMatch:92, form:95, story:"8 gol 11 asist ile ligin en deÄŸerli TÃ¼rk oyuncusu. Sezonun oyuncusu Ã¶dÃ¼lÃ¼nÃ¼n sahibi.", career:["KeÃ§iÃ¶rengÃ¼cÃ¼","Galatasaray"], strengths:["HÄ±z","Dribbling","GÃ¼Ã§"] },
  { name:"Leroy Sane", team:"Galatasaray", position:"Kanat", age:30, marketValue:20.0, goals:7, assists:5, minutes:2400, bigMatch:86, form:87, story:"Bayern MÃ¼nih'ten gelen dÃ¼nya yÄ±ldÄ±zÄ±, 7 gol ve 5 asistle ÅŸampiyonluk yolunda tecrÃ¼besiyle fark yarattÄ±.", career:["Schalke","Man City","Bayern","Galatasaray"], strengths:["HÄ±z","Teknik","Dribbling"] },
  { name:"Gabriel Sara", team:"Galatasaray", position:"Orta saha", age:26, marketValue:27.0, goals:8, assists:14, minutes:2850, bigMatch:88, form:91, story:"14 asist ile Galatasaray'Ä±n oyun kurma merkezi. Duran toplardaki ustalÄ±ÄŸÄ±yla ÅŸampiyonlukta pay sahibi.", career:["Gremio","Norwich","Galatasaray"], strengths:["Pas kalitesi","YaratÄ±cÄ±lÄ±k","Oyun GÃ¶rÃ¼ÅŸÃ¼"] },
  { name:"Lucas Torreira", team:"Galatasaray", position:"Orta saha", age:30, marketValue:10.0, goals:3, assists:7, minutes:2700, bigMatch:87, form:88, story:"Galatasaray'Ä±n orta saha dinamosu. Savunma arkasÄ±nÄ± sÃ¼pÃ¼rme ve pas daÄŸÄ±tÄ±mÄ±ndaki baÅŸarÄ±sÄ±yla paha biÃ§ilemez.", career:["Sampdoria","Arsenal","Atletico","Fiorentina","Galatasaray"], strengths:["Top Kapma","Savunma","Ä°stikrar"] },
  { name:"Wilfried Stephane Singo", team:"Galatasaray", position:"Defans", age:25, marketValue:23.0, goals:1, assists:2, minutes:2600, bigMatch:85, form:87, story:"Monaco'dan transfer edilen Singo, savunmanÄ±n saÄŸ kulvarÄ±nda gÃ¼Ã§lÃ¼ fiziÄŸi ve temposuyla adeta bir duvar Ã¶rdÃ¼.", career:["Torino","Monaco","Galatasaray"], strengths:["HÄ±z","Fiziksel GÃ¼Ã§","Savunma"] },
  { name:"Abdulkerim Bardakci", team:"Galatasaray", position:"Defans", age:31, marketValue:6.5, goals:3, assists:1, minutes:2750, bigMatch:84, form:85, story:"Milli stoper tecrÃ¼besi, lider karakteri ve hava toplarÄ±ndaki Ã¼stÃ¼nlÃ¼ÄŸÃ¼ ile savunmanÄ±n en kritik parÃ§asÄ±.", career:["Konyaspor","Galatasaray"], strengths:["Hava topu","Liderlik","Pas kalitesi"] },
  { name:"Davinson Sanchez", team:"Galatasaray", position:"Defans", age:30, marketValue:16.0, goals:2, assists:1, minutes:2500, bigMatch:88, form:89, story:"SavunmanÄ±n lideri, hava toplarÄ±nda geÃ§ilmez olurken hÄ±zÄ± ve oyun kurma yeteneÄŸiyle dÃ¼nya klasÄ±ndaydÄ±.", career:["Atletico Nacional","Ajax","Tottenham","Galatasaray"], strengths:["Savunma","HÄ±z","GÃ¼Ã§"] },
  { name:"Sacha Boey", team:"Galatasaray", position:"Defans", age:25, marketValue:18.0, goals:1, assists:3, minutes:2200, bigMatch:87, form:86, story:"Bayern MÃ¼nih'ten geri dÃ¶nen Sacha Boey, saÄŸ kulvarda eski enerjisini ve dinamizmini sahaya yansÄ±ttÄ±.", career:["Rennes","Galatasaray","Bayern","Galatasaray"], strengths:["HÄ±z","DayanÄ±klÄ±lÄ±k","Top Kapma"] },
  { name:"Ismail Jakobs", team:"Galatasaray", position:"Defans", age:26, marketValue:8.0, goals:1, assists:4, minutes:2300, bigMatch:82, form:84, story:"Sol bekte hÄ±zÄ± ve hÃ¼cum bindirmeleriyle sol kulvarÄ± Ã§ok etkili kullandÄ±.", career:["KÃ¶ln","Monaco","Galatasaray"], strengths:["HÄ±z","Orta","DayanÄ±klÄ±lÄ±k"] },
  { name:"Kaan Ayhan", team:"Galatasaray", position:"Defans", age:31, marketValue:1.5, goals:1, assists:2, minutes:1800, bigMatch:83, form:82, story:"Stoper, saÄŸ bek ve Ã¶n liberoda sergilediÄŸi joker performansla takÄ±mÄ±n en gÃ¼venilir isimlerindendi.", career:["Schalke","DÃ¼sseldorf","Sassuolo","Galatasaray"], strengths:["TecrÃ¼be","Pozisyon Alma","Ã‡ok YÃ¶nlÃ¼lÃ¼k"] },
  { name:"Ilkay Gundogan", team:"Galatasaray", position:"Orta saha", age:35, marketValue:2.5, goals:4, assists:6, minutes:1700, bigMatch:90, form:85, story:"TecrÃ¼besiyle orta sahada oyun zekasÄ±nÄ± ve sakinliÄŸini Galatasaray'a getirerek kilit paslar attÄ±.", career:["Dortmund","Man City","Barcelona","Galatasaray"], strengths:["Pas","Oyun ZekasÄ±","TecrÃ¼be"] },
  { name:"Mario Lemina", team:"Galatasaray", position:"Orta saha", age:32, marketValue:1.0, goals:2, assists:3, minutes:1600, bigMatch:80, form:82, story:"YÄ±llar sonra Galatasaray'a dÃ¶nen tecrÃ¼beli oyuncu, orta saha rotasyonunda enerjisiyle katkÄ± saÄŸladÄ±.", career:["Marseille","Juventus","Southampton","Galatasaray"], strengths:["Fizik","Dribbling","MÃ¼cadele"] },
  { name:"Roland Sallai", team:"Galatasaray", position:"Kanat", age:29, marketValue:14.0, goals:5, assists:6, minutes:2100, bigMatch:84, form:85, story:"Kanatlarda Ã§alÄ±ÅŸkanlÄ±ÄŸÄ±, pres gÃ¼cÃ¼ ve kritik anlarda attÄ±ÄŸÄ± gollerle rotasyonun vazgeÃ§ilmezi oldu.", career:["Puskas","Freiburg","Galatasaray"], strengths:["Ã‡alÄ±ÅŸkanlÄ±k","Pres","Åut"] },
  { name:"Yunus Akgun", team:"Galatasaray", position:"Kanat", age:26, marketValue:8.0, goals:6, assists:8, minutes:2000, bigMatch:82, form:86, story:"HÃ¼cumda yaratÄ±cÄ±lÄ±ÄŸÄ± ve sÃ¼ratiyle hem ligde hem de Avrupa'da etkileyici bir sezon geÃ§irdi.", career:["Galatasaray","Adana Demirspor","Leicester","Galatasaray"], strengths:["HÄ±z","Teknik","Dribbling"] },
  { name:"Yaser Asprilla", team:"Galatasaray", position:"Kanat", age:22, marketValue:15.0, goals:4, assists:5, minutes:1500, bigMatch:81, form:83, story:"Girona'dan kiralanan genÃ§ KolombiyalÄ±, saÄŸ kanatta tekniÄŸi ve hÄ±zÄ±yla gelecek vaat etti.", career:["Envigado","Watford","Girona","Galatasaray"], strengths:["Potansiyel","Teknik","HÄ±z"] },
  { name:"Noa Lang", team:"Galatasaray", position:"Kanat", age:27, marketValue:22.0, goals:5, assists:4, minutes:1600, bigMatch:83, form:82, story:"Napoli'den kiralanan HollandalÄ± kanat oyuncusu, driplingleri ile hÃ¼cuma zenginlik kattÄ±.", career:["Ajax","Club Brugge","PSV","Galatasaray"], strengths:["Dribbling","YaratÄ±cÄ±lÄ±k","Teknik"] },
  { name:"Victor Nelsson", team:"Galatasaray", position:"Defans", age:27, marketValue:15.0, goals:1, assists:0, minutes:2800, bigMatch:86, form:87, story:"DanimarkalÄ± stoper, savunmadaki soÄŸukkanlÄ±lÄ±ÄŸÄ±, hava toplarÄ±ndaki hakimiyeti ve kritik mÃ¼dahaleleriyle defansÄ±n sigortasÄ± oldu.", career:["Kopenhag","Galatasaray"], strengths:["Markaj","Hava Topu"] },
  { name:"Dries Mertens", team:"Galatasaray", position:"Orta saha", age:38, marketValue:1.2, goals:7, assists:9, minutes:2100, bigMatch:89, form:88, story:"Galatasaray'Ä±n tecrÃ¼beli ÅŸefi Mertens, ilerleyen yaÅŸÄ±na raÄŸmen oyun zekasÄ± ve asistleriyle hÃ¼cumu yÃ¶nlendirdi.", career:["Napoli","PSV","Galatasaray"], strengths:["Vizyon","Teknik"] },
  { name:"Michy Batshuayi", team:"Galatasaray", position:"Forvet", age:32, marketValue:8.5, goals:9, assists:3, minutes:1500, bigMatch:82, form:85, story:"FenerbahÃ§e'den transfer edilen BelÃ§ikalÄ± golcÃ¼, kritik anlarda sahneye Ã§Ä±karak yedek kulÃ¼besinin en bÃ¼yÃ¼k gÃ¼cÃ¼ oldu.", career:["Chelsea","Marseille","FenerbahÃ§e","Galatasaray"], strengths:["Bitiricilik","Fizik"] },
  { name:"Elias Jelert", team:"Galatasaray", position:"Defans", age:22, marketValue:5.5, goals:0, assists:2, minutes:1700, bigMatch:79, form:80, story:"Kopenhag'dan transfer edilen genÃ§ saÄŸ bek, yÃ¼ksek enerjisi ve hÄ±zÄ±yla savunma ve hÃ¼cum geÃ§iÅŸlerinde dinamizm getirdi.", career:["Kopenhag","Galatasaray"], strengths:["HÄ±z","Kondisyon"] },
  { name:"Berkan Kutlu", team:"Galatasaray", position:"Orta saha", age:28, marketValue:4.0, goals:2, assists:3, minutes:1800, bigMatch:80, form:84, story:"Ã‡alÄ±ÅŸkan orta saha oyuncusu, yÃ¼ksek enerjisi ve pres gÃ¼cÃ¼yle maÃ§larÄ±n ikinci yarÄ±larÄ±nda Galatasaray savunmasÄ±nÄ± rahatlattÄ±.", career:["Genoa","Alanyaspor","Galatasaray"], strengths:["Pres","Kondisyon"] },
  { name:"Ederson", team:"Fenerbahce", position:"Kaleci", age:32, marketValue:10.0, goals:0, assists:0, minutes:3150, bigMatch:88, form:87, story:"Kalesinde tecrÃ¼besiyle devleÅŸen BrezilyalÄ±, geriden oyun kurmadaki Ã¼stÃ¼n kalitesiyle FenerbahÃ§e'nin kilit ismiydi.", career:["Benfica","Man City","Fenerbahce"], strengths:["Pas kalitesi","Refleks","Deneyim"] },
  { name:"Tarik Cetin", team:"Fenerbahce", position:"Kaleci", age:29, marketValue:0.2, goals:0, assists:0, minutes:90, bigMatch:70, form:75, story:"Yedek kaleci olarak kupa maÃ§larÄ±nda forma giydi.", career:["FenerbahÃ§e","Rizespor"], strengths:["Refleks"] },
  { name:"Caglar Soyuncu", team:"Fenerbahce", position:"Defans", age:30, marketValue:10.0, goals:2, assists:3, minutes:2800, bigMatch:84, form:86, story:"Atletico Madrid'den transfer edilen Ã‡aÄŸlar, savunmada liderlik vasÄ±flarÄ±yla Ã¶ne Ã§Ä±ktÄ±.", career:["AltÄ±nordu","Freiburg","Leicester","Atletico","Fenerbahce"], strengths:["Hava Topu","Liderlik","Agresiflik"] },
  { name:"Jayden Oosterwolde", team:"Fenerbahce", position:"Defans", age:25, marketValue:11.0, goals:1, assists:2, minutes:2700, bigMatch:83, form:85, story:"Sol bek ve stoperde hÄ±zÄ± ve gÃ¼Ã§lÃ¼ fiziÄŸiyle rakip hÃ¼cumculara geÃ§it vermedi.", career:["Twente","Parma","Fenerbahce"], strengths:["HÄ±z","Fizik","MÃ¼dahale"] },
  { name:"Mert Muldur", team:"Fenerbahce", position:"Defans", age:27, marketValue:5.5, goals:1, assists:4, minutes:2200, bigMatch:81, form:83, story:"SaÄŸ bekte Ã§alÄ±ÅŸkanlÄ±ÄŸÄ± ve istikrarÄ±yla takÄ±mÄ±n Ã¶nemli bir parÃ§asÄ± oldu.", career:["Rapid Wien","Sassuolo","Fenerbahce"], strengths:["Pozisyon Alma","HÄ±z","Disiplin"] },
  { name:"Milan Skriniar", team:"Fenerbahce", position:"Defans", age:31, marketValue:10.0, goals:1, assists:0, minutes:2800, bigMatch:86, form:86, story:"PSG'den transfer edilen Slovak stoper, saÄŸlam savunma duruÅŸu ve gÃ¼Ã§lÃ¼ fiziÄŸiyle geÃ§ilmez bir duvar Ã¶rdÃ¼.", career:["Zilina","Sampdoria","Inter","PSG","Fenerbahce"], strengths:["Markaj","GÃ¼Ã§","Pozisyon Alma"] },
  { name:"Nelson Semedo", team:"Fenerbahce", position:"Defans", age:32, marketValue:4.0, goals:1, assists:3, minutes:2300, bigMatch:82, form:83, story:"SaÄŸ kulvarda tecrÃ¼besi ve bindirmeleriyle takÄ±ma derinlik kazandÄ±rdÄ±.", career:["Benfica","Barcelona","Wolves","Fenerbahce"], strengths:["HÄ±z","TecrÃ¼be","HÃ¼cum katkÄ±sÄ±"] },
  { name:"Archibald Norman Brown", team:"Fenerbahce", position:"Defans", age:24, marketValue:3.5, goals:0, assists:2, minutes:1500, bigMatch:78, form:80, story:"Gent'ten transfer edilen Ä°ngiliz sol bek, atletizmiyle alternatif saÄŸladÄ±.", career:["Derby","Lausanne","Gent","Fenerbahce"], strengths:["HÄ±z","Orta","Fizik"] },
  { name:"Anderson Talisca", team:"Fenerbahce", position:"Orta saha", age:32, marketValue:7.0, goals:19, assists:5, minutes:2200, bigMatch:89, form:87, story:"FenerbahÃ§e'nin ÅŸampiyonluk yarÄ±ÅŸÄ±ndaki en bÃ¼yÃ¼k gol silahÄ±. Duran toplar ve ceza sahasÄ± dÄ±ÅŸÄ± ÅŸutlarÄ±yla ligde 19 gol attÄ±.", career:["Benfica","Besiktas","Guangzhou","Al Nassr","Fenerbahce"], strengths:["Åut","Duran Top","BÃ¼yÃ¼k MaÃ§"] },
  { name:"Ismail Yuksek", team:"Fenerbahce", position:"Orta saha", age:27, marketValue:10.0, goals:2, assists:4, minutes:2500, bigMatch:83, form:84, story:"Orta sahada dinamizmi, agresif presi ve top Ã§alma istatistikleriyle yine kilit roldeydi.", career:["GÃ¶lcÃ¼kspor","Fenerbahce"], strengths:["MÃ¼cadele","Top Kapma","Pres"] },
  { name:"Mert Hakan Yandas", team:"Fenerbahce", position:"Orta saha", age:31, marketValue:1.2, goals:3, assists:5, minutes:1400, bigMatch:80, form:82, story:"TakÄ±mÄ±n saha iÃ§i liderlerinden, hÄ±rsÄ± ve tecrÃ¼besiyle rotasyonda Ã¶nemli bir joker.", career:["Sivasspor","Fenerbahce"], strengths:["MÃ¼cadele","HÄ±rs","Pas"] },
  { name:"Edson Alvarez", team:"Fenerbahce", position:"Orta saha", age:28, marketValue:15.0, goals:4, assists:8, minutes:2900, bigMatch:86, form:88, story:"West Ham'dan transfer edilen MeksikalÄ±, orta sahada Ã¼stÃ¼n fizik gÃ¼cÃ¼ ve kesiciliÄŸiyle savunmanÄ±n Ã¶nÃ¼ndeki sigortaydÄ±.", career:["Club America","Ajax","West Ham","Fenerbahce"], strengths:["Top Kapma","Pozisyon Alma","Fiziksel GÃ¼Ã§"] },
  { name:"Marco Asensio", team:"Fenerbahce", position:"Orta saha", age:30, marketValue:15.0, goals:11, assists:12, minutes:2100, bigMatch:88, form:89, story:"11 gol ve 12 asist ile ligin en Ã¼retken oyuncularÄ±ndan biri. Oyun kurma becerisiyle takÄ±mÄ± yÃ¶nlendirdi.", career:["Mallorca","Real Madrid","PSG","Fenerbahce"], strengths:["Åut","Pas kalitesi","TecrÃ¼be"] },
  { name:"Matteo Guendouzi", team:"Fenerbahce", position:"Orta saha", age:27, marketValue:18.0, goals:3, assists:6, minutes:2400, bigMatch:85, form:86, story:"Lazio'dan transfer edilen FransÄ±z orta saha, bitmek bilmeyen enerjisi ve hÄ±rslÄ± yapÄ±sÄ±yla takÄ±mÄ± ateÅŸledi.", career:["Lorient","Arsenal","Marseille","Lazio","Fenerbahce"], strengths:["DayanÄ±klÄ±lÄ±k","Pas","MÃ¼cadele"] },
  { name:"N'Golo Kante", team:"Fenerbahce", position:"Orta saha", age:35, marketValue:4.0, goals:1, assists:4, minutes:1800, bigMatch:88, form:85, story:"Al-Ittihad'dan transfer edilen efsane orta saha, tecrÃ¼besi ve kritik mÃ¼dahaleleriyle oyunu dengeledi.", career:["Leicester","Chelsea","Al-Ittihad","Fenerbahce"], strengths:["Pozisyon Alma","MÃ¼cadele","TecrÃ¼be"] },
  { name:"Fred", team:"Fenerbahce", position:"Orta saha", age:33, marketValue:4.5, goals:4, assists:7, minutes:2100, bigMatch:85, form:84, story:"Orta sahadaki yaratÄ±cÄ±lÄ±ÄŸÄ±, topla Ã§Ä±kÄ±ÅŸlarÄ± ve oyun akÄ±ÅŸÄ±nÄ± hÄ±zlandÄ±rmasÄ±yla paha biÃ§ilemez bir parÃ§a.", career:["Shakhtar","Man United","Fenerbahce"], strengths:["Oyun Kurma","Teknik","Pas"] },
  { name:"Kerem Akturkoglu", team:"Fenerbahce", position:"Kanat", age:27, marketValue:20.0, goals:8, assists:7, minutes:2500, bigMatch:85, form:86, story:"Benfica sonrasÄ± FenerbahÃ§e'ye imza atan Kerem, hÄ±zÄ± ve gol yollarÄ±ndaki etkinliÄŸiyle takÄ±ma dinamizm kattÄ±.", career:["Galatasaray","Benfica","Fenerbahce"], strengths:["HÄ±z","Dribbling","Gol"] },
  { name:"Dorgeles Nene", team:"Fenerbahce", position:"Kanat", age:23, marketValue:9.0, goals:9, assists:16, minutes:2700, bigMatch:90, form:92, story:"FenerbahÃ§e'nin Salzburg'dan transfer ettiÄŸi genÃ§ yetenek, ligde yaptÄ±gÄ± 16 asistle asist kralÄ± oldu.", career:["Salzburg","Westerlo","Fenerbahce"], strengths:["Asist","HÄ±z","Bire Bir"] },
  { name:"Anthony Musaba", team:"Fenerbahce", position:"Kanat", age:25, marketValue:3.0, goals:5, assists:4, minutes:1600, bigMatch:79, form:81, story:"Sheffield Wednesday'den gelen hÄ±zlÄ± kanat oyuncusu, rotasyonda patlayÄ±cÄ±lÄ±k getirdi.", career:["Monaco","Metz","Sheffield Wed","Fenerbahce"], strengths:["HÄ±z","Bire Bir"] },
  { name:"Oguz AydÄ±n", team:"Fenerbahce", position:"Kanat", age:25, marketValue:4.5, goals:4, assists:3, minutes:1300, bigMatch:78, form:80, story:"Alanyaspor'dan gelen genÃ§ oyuncu, hÄ±zÄ± ve hÃ¼cum zenginliÄŸiyle sÃ¼re aldÄ±ÄŸÄ± anlarda katkÄ± saÄŸladÄ±.", career:["Alanyaspor","Fenerbahce"], strengths:["HÄ±z","Pres"] },
  { name:"Youssef En-Nesyri", team:"Fenerbahce", position:"Forvet", age:28, marketValue:20.0, goals:14, assists:3, minutes:2600, bigMatch:87, form:86, story:"Sevilla'dan transfer edilen FaslÄ± golcÃ¼, gÃ¼Ã§lÃ¼ fiziÄŸi ve olaÄŸanÃ¼stÃ¼ kafa golleriyle FenerbahÃ§e'nin gol yÃ¼kÃ¼nÃ¼ Ã§ekti.", career:["Sevilla","Malaga","FenerbahÃ§e"], strengths:["Hava Topu","Fizik"] },
  { name:"Sebastian Szymanski", team:"Fenerbahce", position:"Orta saha", age:27, marketValue:19.0, goals:8, assists:9, minutes:2900, bigMatch:85, form:84, story:"PolonyalÄ± on numara, pres gÃ¼cÃ¼, ceza sahasÄ±na koÅŸularÄ± ve skor katkÄ±larÄ±yla FenerbahÃ§e hÃ¼cumunun en dinamik diÅŸlisi oldu.", career:["Feyenoord","Dynamo Moskova","FenerbahÃ§e"], strengths:["Pres","HÄ±z"] },
  { name:"Allan Saint-Maximin", team:"Fenerbahce", position:"Kanat", age:29, marketValue:17.0, goals:6, assists:8, minutes:2400, bigMatch:84, form:85, story:"Sol kanattaki patlayÄ±cÄ± hÄ±zÄ± ve Ã¶ngÃ¶rÃ¼lemez driplingleriyle SÃ¼per Lig savunmalarÄ±nÄ±n korkulu rÃ¼yasÄ± haline geldi.", career:["Newcastle","Al-Ahli","FenerbahÃ§e"], strengths:["Dripling","HÄ±z"] },
  { name:"Dusan Tadic", team:"Fenerbahce", position:"Kanat", age:37, marketValue:3.2, goals:9, assists:11, minutes:2800, bigMatch:91, form:89, story:"FenerbahÃ§e'den tecrÃ¼beli sol kanat ÅŸefi, duran toplarÄ±, yaratÄ±cÄ±lÄ±ÄŸÄ± ve asistleriyle hÃ¼cumu yÃ¶nlendirdi.", career:["Ajax","Southampton","FenerbahÃ§e"], strengths:["Pas","Vizyon"] },
  { name:"Dominik Livakovic", team:"Fenerbahce", position:"Kaleci", age:31, marketValue:9.5, goals:0, assists:0, minutes:3100, bigMatch:86, form:85, story:"HÄ±rvat milli kaleci, refleksleri ve Ã§izgi kurtarÄ±ÅŸlarÄ±yla FenerbahÃ§e kalesinde devleÅŸti, takÄ±mÄ±na birÃ§ok maÃ§ta puan kazandÄ±.", career:["Dinamo Zagreb","FenerbahÃ§e"], strengths:["Refleks","Bire Bir"] },
  { name:"Mert Gunok", team:"Besiktas", position:"Kaleci", age:37, marketValue:0.5, goals:0, assists:0, minutes:3200, bigMatch:83, form:82, story:"Karakteri ve tecrÃ¼besiyle takÄ±mÄ±n kaptanÄ± ve kalesindeki en gÃ¼venilir gÃ¼vencesi oldu.", career:["Fenerbahce","Bursaspor","Basaksehir","Besiktas"], strengths:["Deneyim","KurtarÄ±ÅŸ","Liderlik"] },
  { name:"Ersin Destanoglu", team:"Besiktas", position:"Kaleci", age:25, marketValue:1.8, goals:0, assists:0, minutes:400, bigMatch:76, form:78, story:"Mert GÃ¼nok'un yokluÄŸunda kaleyi korudu ve kupa maÃ§larÄ±nda gÃ¶rev aldÄ±.", career:["BeÅŸiktaÅŸ"], strengths:["Refleks","PenaltÄ±"] },
  { name:"Ridvan Yilmaz", team:"Besiktas", position:"Defans", age:25, marketValue:5.0, goals:2, assists:5, minutes:2400, bigMatch:82, form:84, story:"Rangers'tan BeÅŸiktaÅŸ'a geri dÃ¶nen sol bek, hÄ±zÄ± ve isabetli ortalarÄ±yla sol kulvara canlÄ±lÄ±k kattÄ±.", career:["Besiktas","Rangers","Besiktas"], strengths:["Orta","HÄ±z","Pas"] },
  { name:"Emirhan Topcu", team:"Besiktas", position:"Defans", age:25, marketValue:4.5, goals:2, assists:1, minutes:2500, bigMatch:81, form:83, story:"Rizespor'dan transfer edilen stoper, hava toplarÄ±nda ve savunmadaki sert yapÄ±sÄ±yla alkÄ±ÅŸ topladÄ±.", career:["Rizespor","Besiktas"], strengths:["MÃ¼dahale","Hava Topu","GÃ¼Ã§"] },
  { name:"Felix Uduokhai", team:"Besiktas", position:"Defans", age:28, marketValue:3.5, goals:1, assists:0, minutes:2600, bigMatch:82, form:83, story:"Augsburg'dan transfer edilen Alman stoper, uzun boyu ve dengeli oyunuyla savunmanÄ±n temel taÅŸlarÄ±ndan biri oldu.", career:["TSV 1860","Wolfsburg","Augsburg","Besiktas"], strengths:["Hava Topu","Pozisyon Alma"] },
  { name:"Tiago Djalo", team:"Besiktas", position:"Defans", age:26, marketValue:7.0, goals:1, assists:1, minutes:2100, bigMatch:80, form:82, story:"Juventus'tan kiralanan Portekizli stoper, atletizmi ve hÄ±zÄ±yla savunmaya derinlik kazandÄ±rdÄ±.", career:["Lille","Juventus","Besiktas"], strengths:["HÄ±z","Fizik","MÃ¼dahale"] },
  { name:"Michael Murillo", team:"Besiktas", position:"Defans", age:30, marketValue:4.0, goals:1, assists:3, minutes:2300, bigMatch:80, form:82, story:"Marseille'den gelen deneyimli saÄŸ bek, savunma gÃ¼cÃ¼ ve hÃ¼cuma desteÄŸiyle saÄŸ kulvarÄ± kontrol etti.", career:["Anderlecht","Marseille","Besiktas"], strengths:["Savunma","TecrÃ¼be","Orta"] },
  { name:"Emmanuel Agbadou", team:"Besiktas", position:"Defans", age:28, marketValue:6.0, goals:2, assists:0, minutes:2500, bigMatch:82, form:83, story:"Reims'tan transfer edilen FildiÅŸi Sahilli stoper, fiziksel gÃ¼cÃ¼ ve mÃ¼cadeleci yapÄ±sÄ±yla dikkat Ã§ekti.", career:["Eupen","Reims","Besiktas"], strengths:["Fizik","GÃ¼Ã§","Markaj"] },
  { name:"Yasin Ozcan", team:"Besiktas", position:"Defans", age:20, marketValue:4.5, goals:1, assists:2, minutes:1600, bigMatch:77, form:80, story:"KasÄ±mpaÅŸa'dan transfer edilen genÃ§ sol bek, yÃ¼ksek potansiyeliyle beÄŸeni topladÄ±.", career:["Kasimpasa","Besiktas"], strengths:["Potansiyel","Ã‡eviklik"] },
  { name:"Wilfred Ndidi", team:"Besiktas", position:"Orta saha", age:29, marketValue:8.0, goals:3, assists:5, minutes:2700, bigMatch:85, form:86, story:"Orta sahanÄ±n gÃ¶beÄŸinde defansif kalkan gÃ¶revi gÃ¶ren Ndidi, fiziksel mÃ¼cadelesiyle rakipleri yÄ±prattÄ±.", career:["Genk","Leicester","Besiktas"], strengths:["Savunma","Top Kapma","DayanÄ±klÄ±lÄ±k"] },
  { name:"Orkun Kokcu", team:"Besiktas", position:"Orta saha", age:25, marketValue:25.0, goals:9, assists:8, minutes:2600, bigMatch:88, form:90, story:"Benfica'dan BeÅŸiktaÅŸ'a transfer olan Orkun, orta sahada yÃ¼ksek oyun zekasÄ± ve ÅŸutlarÄ±yla takÄ±mÄ±nÄ± sÄ±rtladÄ±.", career:["Feyenoord","Benfica","Besiktas"], strengths:["Pas","Vizyon","Gol"] },
  { name:"Salih Ucan", team:"Besiktas", position:"Orta saha", age:32, marketValue:1.5, goals:2, assists:5, minutes:1900, bigMatch:79, form:80, story:"Orta saha rotasyonunun en Ã¶nemli parÃ§alarÄ±ndan biri. Pas kalitesi ve duran toplardaki etkisiyle katkÄ± saÄŸladÄ±.", career:["Roma","Fenerbahce","Alanyaspor","Besiktas"], strengths:["Pas","Duran Top"] },
  { name:"Kristjan Asllani", team:"Besiktas", position:"Orta saha", age:24, marketValue:12.0, goals:3, assists:4, minutes:2000, bigMatch:82, form:83, story:"Inter'den kiralanan genÃ§ Arnavut, pas daÄŸÄ±tÄ±mÄ± ve oyun yÃ¶nlendirmedeki baÅŸarÄ±sÄ±yla beÄŸeni kazandÄ±.", career:["Empoli","Inter","Besiktas"], strengths:["Pas kalitesi","Oyun GÃ¶rÃ¼ÅŸÃ¼","Teknik"] },
  { name:"Tammy Abraham", team:"Besiktas", position:"Forvet", age:28, marketValue:18.0, goals:15, assists:5, minutes:2500, bigMatch:86, form:87, story:"Roma'dan transfer olan Ä°ngiliz santrfor, 15 golle BeÅŸiktaÅŸ'Ä±n en skorer ismi oldu ve ceza sahasÄ± hakimiyeti kurdu.", career:["Chelsea","Aston Villa","Roma","Besiktas"], strengths:["Fizik","Ceza SahasÄ±","Bitiricilik"] },
  { name:"Oh Hyun-Gyu", team:"Besiktas", position:"Forvet", age:25, marketValue:3.0, goals:6, assists:2, minutes:1200, bigMatch:77, form:80, story:"Genk'ten kiralanan GÃ¼ney Koreli forvet, enerjik presi ve hÄ±rslÄ± oyunuyla taraftarÄ±n sevgisini kazandÄ±.", career:["Celtic","Genk","Besiktas"], strengths:["Pres","MÃ¼cadele","Bitiricilik"] },
  { name:"Milot Rashica", team:"Besiktas", position:"Kanat", age:29, marketValue:3.5, goals:5, assists:6, minutes:2200, bigMatch:80, form:81, story:"Kanatlardaki sÃ¼rati, asistleri ve savunma yardÄ±mÄ±yla BeÅŸiktaÅŸ hÃ¼cumunda Ã¶nemli rol oynadÄ±.", career:["Werder Bremen","Norwich","Galatasaray","Besiktas"], strengths:["HÄ±z","Asist","Pres"] },
  { name:"El Bilal Toure", team:"Besiktas", position:"Forvet", age:24, marketValue:8.0, goals:8, assists:3, minutes:1700, bigMatch:80, form:82, story:"Stuttgart'tan gelen genÃ§ forvet, patlayÄ±cÄ± hÄ±zÄ± ve fiziÄŸiyle hÃ¼cum hattÄ±nda Ã§ok etkiliydi.", career:["Reims","Almeria","Atalanta","Besiktas"], strengths:["HÄ±z","Fizik","Hava Topu"] },
  { name:"Vaclav Cerny", team:"Besiktas", position:"Kanat", age:28, marketValue:5.0, goals:6, assists:7, minutes:1900, bigMatch:81, form:82, story:"Wolfsburg'dan kiralanan Ã‡ek kanat oyuncusu, sol ayaÄŸÄ±yla attÄ±ÄŸÄ± kavisli ÅŸutlar ve ortalarla fark yarattÄ±.", career:["Ajax","Twente","Wolfsburg","Besiktas"], strengths:["Teknik","Uzak Åut","Orta"] },
  { name:"Cengiz Under", team:"Besiktas", position:"Kanat", age:28, marketValue:6.0, goals:4, assists:5, minutes:1500, bigMatch:81, form:80, story:"FenerbahÃ§e'den transfer edilen milli kanat, uzaktan ÅŸutlarÄ± ve tecrÃ¼besiyle kanat rotasyonunu gÃ¼Ã§lendirdi.", career:["Roma","Leicester","Marsilya","Fenerbahce","Besiktas"], strengths:["Uzak Åut","Dribbling","TecrÃ¼be"] },
  { name:"Jota Silva", team:"Besiktas", position:"Kanat", age:26, marketValue:8.0, goals:7, assists:4, minutes:1800, bigMatch:81, form:83, story:"Nottingham Forest'tan transfer edilen Portekizli kanat, Ã§alÄ±ÅŸkanlÄ±ÄŸÄ± ve bitiriciliÄŸiyle BeÅŸiktaÅŸ'Ä±n kilit isimlerindendi.", career:["Guimaraes","Nottingham Forest","Besiktas"], strengths:["HÄ±z","Bitiricilik","MÃ¼cadele"] },
  { name:"Rafa Silva", team:"Besiktas", position:"Orta saha", age:33, marketValue:11.5, goals:12, assists:8, minutes:2700, bigMatch:89, form:88, story:"Benfica'dan transfer edilen Portekizli sÃ¼per yÄ±ldÄ±z, hÄ±zÄ±, tekniÄŸi ve bitiriciliÄŸiyle BeÅŸiktaÅŸ hÃ¼cumunun lideri oldu.", career:["Benfica","Braga","BeÅŸiktaÅŸ"], strengths:["HÄ±z","Teknik"] },
  { name:"Ciro Immobile", team:"Besiktas", position:"Forvet", age:36, marketValue:4.0, goals:16, assists:2, minutes:2300, bigMatch:90, form:87, story:"Ä°talyan efsane golcÃ¼, tecrÃ¼besi ve ceza sahasÄ±ndaki Ã¶lÃ¼mcÃ¼l bitiriciliÄŸiyle gol krallÄ±ÄŸÄ± yarÄ±ÅŸÄ±nda BeÅŸiktaÅŸ'Ä± zirvede tuttu.", career:["Lazio","Dortmund","Torino","BeÅŸiktaÅŸ"], strengths:["Bitiricilik","TecrÃ¼be"] },
  { name:"Gedson Fernandes", team:"Besiktas", position:"Orta saha", age:27, marketValue:18.5, goals:7, assists:6, minutes:2900, bigMatch:86, form:88, story:"Orta sahadaki dripling yeteneÄŸi, topsuz koÅŸularÄ± ve savunma katkÄ±sÄ±yla ligin en komple orta saha oyuncularÄ±ndan biri oldu.", career:["Benfica","Tottenham","BeÅŸiktaÅŸ"], strengths:["Dripling","Kondisyon"] },
  { name:"Arthur Masuaku", team:"Besiktas", position:"Defans", age:32, marketValue:4.2, goals:1, assists:5, minutes:2600, bigMatch:81, form:82, story:"Demokratik Kongolu sol bek, Ã§izgiyi etkili kullanmasÄ±, isabetli ortalarÄ± ve hÃ¼cuma verdiÄŸi destekle takÄ±mÄ±n sol koridorunu yÃ¶netti.", career:["West Ham","Olympiacos","BeÅŸiktaÅŸ"], strengths:["Orta","Fizik"] },
  { name:"Jonas Svensson", team:"Besiktas", position:"Defans", age:33, marketValue:2.0, goals:0, assists:3, minutes:2400, bigMatch:80, form:81, story:"TecrÃ¼beli saÄŸ bek, savunmadaki dengeli oyunu, profesyonelliÄŸi ve istikrarlÄ± performansÄ±yla BeÅŸiktaÅŸ savunmasÄ±nÄ±n gÃ¼vencesi oldu.", career:["AZ Alkmaar","Adana Demirspor","BeÅŸiktaÅŸ"], strengths:["Markaj","Ä°stikrar"] },
  { name:"Christ Inao Oulai", team:"Trabzonspor", position:"Forvet", age:21, marketValue:150.0, goals:35, assists:15, minutes:3400, bigMatch:99, form:99, story:"DÃ¼nya futboluna yÃ¶n veren harika Ã§ocuk. Ligin tartÄ±ÅŸmasÄ±z en iyisi.", career:["Trabzonspor"], strengths:["Bitiricilik","HÄ±z","Dripling"] },
  { name:"Andre Onana", team:"Trabzonspor", position:"Kaleci", age:30, marketValue:7.0, goals:0, assists:0, minutes:3100, bigMatch:86, form:85, story:"Manchester United'dan transfer edilen tecrÃ¼beli Kamerunlu kaleci, kalesinde bÃ¼yÃ¼k gÃ¼ven verdi.", career:["Ajax","Inter","Man United","Trabzonspor"], strengths:["Refleks","Ayak kalitesi","KurtarÄ±ÅŸ"] },
  { name:"Onuralp Cevikkan", team:"Trabzonspor", position:"Kaleci", age:20, marketValue:1.0, goals:0, assists:0, minutes:270, bigMatch:75, form:77, story:"Gelecek vaat eden genÃ§ milli kaleci, kupa maÃ§larÄ±ndaki performansÄ±yla gÃ¶z doldurdu.", career:["Trabzonspor"], strengths:["Potansiyel","KurtarÄ±ÅŸ"] },
  { name:"Stefan Savic", team:"Trabzonspor", position:"Defans", age:35, marketValue:0.4, goals:1, assists:0, minutes:2200, bigMatch:82, form:82, story:"Atletico Madrid geÃ§miÅŸli KaradaÄŸlÄ± stoper, liderliÄŸi ve tecrÃ¼besiyle savunmanÄ±n komutanÄ± oldu.", career:["Man City","Fiorentina","Atletico","Trabzonspor"], strengths:["TecrÃ¼be","Liderlik","Pozisyon Alma"] },
  { name:"Arseniy Batagov", team:"Trabzonspor", position:"Defans", age:24, marketValue:2.0, goals:0, assists:1, minutes:1800, bigMatch:77, form:79, story:"UkraynalÄ± genÃ§ stoper, gÃ¼cÃ¼ ve hava topu hakimiyetiyle savunmaya derinlik getirdi.", career:["Zorya Luhansk","Trabzonspor"], strengths:["Hava Topu","GÃ¼Ã§"] },
  { name:"Mustafa Eskihellac", team:"Trabzonspor", position:"Defans", age:29, marketValue:1.5, goals:1, assists:3, minutes:2300, bigMatch:78, form:80, story:"SaÄŸ bek ve saÄŸ aÃ§Ä±kta Ã§alÄ±ÅŸkanlÄ±ÄŸÄ±yla gÃ¶rev yapan yerli oyuncu, dinamik katkÄ± saÄŸladÄ±.", career:["Malatyaspor","Gaziantep FK","Trabzonspor"], strengths:["Ã‡alÄ±ÅŸkanlÄ±k","HÄ±z","Orta"] },
  { name:"Mathias Fjortoft Lovik", team:"Trabzonspor", position:"Defans", age:22, marketValue:2.0, goals:1, assists:2, minutes:1700, bigMatch:76, form:78, story:"Molde'den transfer edilen NorveÃ§li genÃ§ sol bek, hÃ¼cumcu yapÄ±sÄ±yla gelecek vaat etti.", career:["Molde","Trabzonspor"], strengths:["HÄ±z","Orta","Potansiyel"] },
  { name:"Serdar Saatci", team:"Trabzonspor", position:"Defans", age:23, marketValue:2.5, goals:0, assists:1, minutes:1600, bigMatch:78, form:79, story:"Braga'dan gelen genÃ§ milli stoper, hamle zamanlamasÄ± ve fiziÄŸiyle stoper rotasyonunda kilit roldeydi.", career:["Besiktas","Braga","Trabzonspor"], strengths:["Pozisyon Alma","MÃ¼dahale"] },
  { name:"Rayyan Baniya", team:"Trabzonspor", position:"Defans", age:27, marketValue:1.5, goals:1, assists:0, minutes:1400, bigMatch:75, form:77, story:"Fizik gÃ¼cÃ¼ yÃ¼ksek stoper, savunmada yedek olarak sÃ¼re aldÄ±ÄŸÄ± maÃ§larda hava toplarÄ±nÄ± temizledi.", career:["KaragÃ¼mrÃ¼k","Trabzonspor"], strengths:["Fizik","Hava Topu"] },
  { name:"Okay Yokuslu", team:"Trabzonspor", position:"Orta saha", age:32, marketValue:1.2, goals:2, assists:6, minutes:2700, bigMatch:83, form:85, story:"Savunma Ã¶nÃ¼nde tecrÃ¼besiyle gÃ¼ven veren Okay, hava toplarÄ±ndaki etkisi ve kritik mÃ¼dahaleleriyle Ã¶ne Ã§Ä±ktÄ±.", career:["Trabzonspor","Celta Vigo","WBA","Trabzonspor"], strengths:["Savunma","TecrÃ¼be","Pas"] },
  { name:"Ozan Tufan", team:"Trabzonspor", position:"Orta saha", age:31, marketValue:1.5, goals:4, assists:5, minutes:2300, bigMatch:81, form:82, story:"Orta sahadan ceza sahasÄ±na koÅŸularÄ± ve uzaktan ÅŸutlarÄ±yla hÃ¼cuma dinamizm katan milli oyuncu.", career:["Fenerbahce","Hull City","Trabzonspor"], strengths:["Åut","MÃ¼cadele","TecrÃ¼be"] },
  { name:"Benjamin Bouchouari", team:"Trabzonspor", position:"Orta saha", age:24, marketValue:3.0, goals:2, assists:4, minutes:1800, bigMatch:78, form:80, story:"Saint-Etienne'den transfer edilen FaslÄ± orta saha, dar alandaki tekniÄŸi ve pas kalitesiyle dikkat Ã§ekti.", career:["Roda JC","Saint-Etienne","Trabzonspor"], strengths:["Teknik","Dribbling","Pas"] },
  { name:"Ernest Muci", team:"Trabzonspor", position:"Orta saha", age:25, marketValue:11.0, goals:9, assists:6, minutes:2200, bigMatch:89, form:91, story:"BeÅŸiktaÅŸ'tan transfer edilen Arnavut yÄ±ldÄ±z, 9 gol ve 6 asistle hÃ¼cuma bÃ¼yÃ¼k zenginlik kattÄ±.", career:["Legia","Besiktas","Trabzonspor"], strengths:["Uzak Åut","Dribbling","YaratÄ±cÄ±lÄ±k"] },
  { name:"Tim Jabol-Folcarelli", team:"Trabzonspor", position:"Orta saha", age:26, marketValue:2.5, goals:1, assists:3, minutes:1600, bigMatch:77, form:79, story:"Ajaccio'dan transfer edilen FransÄ±z Ã¶n libero, fizik gÃ¼cÃ¼ ve kesiciliÄŸiyle savunma Ã¶nÃ¼nde direnÃ§ saÄŸladÄ±.", career:["Ajaccio","Trabzonspor"], strengths:["Top Kapma","Fizik"] },
  { name:"Edin Visca", team:"Trabzonspor", position:"Kanat", age:36, marketValue:0.1, goals:3, assists:8, minutes:2100, bigMatch:82, form:83, story:"Lig tarihinin en tecrÃ¼beli yÄ±ldÄ±zlarÄ±ndan biri. Ä°lerleyen yaÅŸÄ±na raÄŸmen asistleri ve liderliÄŸiyle kilit isim olmaya devam etti.", career:["Zeljeznicar","Basaksehir","Trabzonspor"], strengths:["Asist","Oyun GÃ¶rÃ¼ÅŸÃ¼","TecrÃ¼be"] },
  { name:"Anthony Nwakaeme", team:"Trabzonspor", position:"Kanat", age:37, marketValue:0.5, goals:4, assists:5, minutes:1500, bigMatch:82, form:81, story:"Bordo-mavili kulÃ¼bÃ¼n efsane ismi, dar alanda Ã§alÄ±mlarÄ± ve yaratÄ±cÄ±lÄ±ÄŸÄ±yla hÃ¼cumda fark yaratmaya devam etti.", career:["Hapoel Beer Sheva","Al-Fayha","Trabzonspor"], strengths:["Teknik","Dribbling","Deneyim"] },
  { name:"Paul Onuachu", team:"Trabzonspor", position:"Forvet", age:32, marketValue:6.0, goals:22, assists:3, minutes:2800, bigMatch:93, form:94, story:"22 gol ile gol krallÄ±ÄŸÄ±nÄ±n ortaÄŸÄ±! Hava topu hakimiyetiyle rakiplerine kabus yaÅŸattÄ±.", career:["Midtjylland","Genk","Southampton","Trabzonspor"], strengths:["Hava Topu","Bitiricilik","Ceza SahasÄ±"] },
  { name:"Felipe Augusto", team:"Trabzonspor", position:"Forvet", age:22, marketValue:15.0, goals:14, assists:4, minutes:2400, bigMatch:87, form:90, story:"15 milyon Euro piyasa deÄŸerine ulaÅŸan genÃ§ yetenek, 14 gol atarak ligin en deÄŸerli Ã§Ä±kÄ±ÅŸlarÄ±ndan birini yaptÄ±.", career:["Corinthians","Cercle Brugge","Trabzonspor"], strengths:["Potansiyel","Bitiricilik","HÄ±z"] },
  { name:"Denis Dragus", team:"Trabzonspor", position:"Forvet", age:26, marketValue:4.0, goals:6, assists:3, minutes:1900, bigMatch:79, form:80, story:"Gaziantep FK'daki Ã§Ä±kÄ±ÅŸÄ±nÄ±n ardÄ±ndan gelen Rumen forvet, hÄ±zÄ± ve Ã§alÄ±mlarÄ±yla hÃ¼cuma katkÄ± saÄŸladÄ±.", career:["Standard Liege","Gaziantep FK","Trabzonspor"], strengths:["HÄ±z","Dribbling"] },
  { name:"Enis Destan", team:"Trabzonspor", position:"Forvet", age:23, marketValue:3.5, goals:5, assists:2, minutes:1300, bigMatch:78, form:80, story:"GenÃ§ yerli forvet, yÄ±rtÄ±cÄ± yapÄ±sÄ±, pres gÃ¼cÃ¼ ve hava toplarÄ±ndaki etkisiyle hÃ¼cum rotasyonunun Ã¶nemli bir parÃ§asÄ±.", career:["AltÄ±nordu","Warta Poznan","Trabzonspor"], strengths:["Hava Topu","Pres","MÃ¼cadele"] },
  { name:"Oleksandr Zubkov", team:"Trabzonspor", position:"Kanat", age:29, marketValue:4.0, goals:5, assists:6, minutes:1800, bigMatch:80, form:82, story:"Shakhtar'dan transfer edilen UkraynalÄ± kanat, hÄ±zÄ± ve sol ayaÄŸÄ±yla hÃ¼cumda Ã¼retken oldu.", career:["Shakhtar","Ferencvaros","Trabzonspor"], strengths:["HÄ±z","Teknik","Åut"] },
  { name:"Simon Banza", team:"Trabzonspor", position:"Forvet", age:29, marketValue:13.5, goals:13, assists:3, minutes:2500, bigMatch:85, form:84, story:"Braga'dan kiralanan golcÃ¼, gÃ¼Ã§lÃ¼ fiziÄŸi ve ceza sahasÄ±ndaki bitiriciliÄŸiyle Trabzonspor'un forvet hattÄ±ndaki en bÃ¼yÃ¼k silahÄ±ydÄ±.", career:["Braga","Lens","Trabzonspor"], strengths:["Fizik","Bitiricilik"] },
  { name:"Batista Mendy", team:"Trabzonspor", position:"Orta saha", age:26, marketValue:11.0, goals:1, assists:2, minutes:2900, bigMatch:84, form:85, story:"FransÄ±z defansif orta saha, yÃ¼ksek fizik gÃ¼cÃ¼, top kapma yeteneÄŸi ve stoperde de oynayabilen Ã§ok yÃ¶nlÃ¼lÃ¼ÄŸÃ¼yle fark yarattÄ±.", career:["Angers","Trabzonspor"], strengths:["Fizik","Top Kapma"] },
  { name:"John Lundstram", team:"Trabzonspor", position:"Orta saha", age:32, marketValue:3.8, goals:2, assists:2, minutes:2400, bigMatch:81, form:80, story:"Ä°ngiliz orta saha, tecrÃ¼besi, mÃ¼cadeleci yapÄ±sÄ± ve pas kalitesiyle Trabzonspor orta sahasÄ±na direnÃ§ kazandÄ±rdÄ±.", career:["Sheffield United","Rangers","Trabzonspor"], strengths:["MÃ¼cadele","Pas"] },
  { name:"Borna Barisic", team:"Trabzonspor", position:"Defans", age:33, marketValue:2.5, goals:0, assists:4, minutes:2300, bigMatch:82, form:81, story:"HÄ±rvat sol bek, adrese teslim ortalarÄ± ve duran top kalitesiyle Trabzonspor hÃ¼cumlarÄ±na sol kanattan geniÅŸlik kazandÄ±rdÄ±.", career:["Rangers","Osijek","Trabzonspor"], strengths:["Orta","Duran Top"] },
  { name:"Eldor Shomurodov", team:"Basaksehir", position:"Forvet", age:30, marketValue:7.0, goals:22, assists:6, minutes:2550, bigMatch:87, form:88, story:"22 gol atarak Paul Onuachu ve Victor Osimhen ile gol krallÄ±ÄŸÄ±nÄ± paylaÅŸtÄ±. BaÅŸakÅŸehir tarihinin en skorer sezonlarÄ±ndan birini yaÅŸattÄ±.", career:["Rostov","Genoa","Roma","Basaksehir"], strengths:["Bitiricilik","HÄ±z","Pozisyon Alma"] },
  { name:"Berkay Ã–zcan", team:"Basaksehir", position:"Orta saha", age:28, marketValue:3.5, goals:5, assists:10, minutes:2600, bigMatch:83, form:85, story:"Orta sahada 10 asist yaparak takÄ±mÄ±nÄ±n oyun kuruculuÄŸunu Ã¼stlendi ve gol yollarÄ±nÄ± besledi.", career:["Stuttgart","Greuther FÃ¼rth","Basaksehir"], strengths:["Asist","Pas kalitesi","Vizyon"] },
  { name:"Muhammed Sengezer", team:"Basaksehir", position:"Kaleci", age:29, marketValue:2.0, goals:0, assists:0, minutes:2200, bigMatch:81, form:83, story:"Kalesinde gÃ¼ven veren duruÅŸu ve refleksleriyle BaÅŸakÅŸehir savunmasÄ±nÄ± arkadan toparlayan isim.", career:["AnkaragÃ¼cÃ¼","Basaksehir"], strengths:["Refleks","Yan Top"] },
  { name:"Volkan Babacan", team:"Basaksehir", position:"Kaleci", age:37, marketValue:0.1, goals:0, assists:0, minutes:900, bigMatch:78, form:75, story:"TecrÃ¼beli kaleci, yedek kulÃ¼besinde liderliÄŸi ve ihtiyaÃ§ duyulduÄŸunda kaledeki sakin duruÅŸuyla destek verdi.", career:["Fenerbahce","Manisaspor","Basaksehir"], strengths:["TecrÃ¼be","Sakinlik"] },
  { name:"Leo Duarte", team:"Basaksehir", position:"Defans", age:29, marketValue:3.0, goals:1, assists:1, minutes:2800, bigMatch:82, form:84, story:"BrezilyalÄ± stoper, savunmanÄ±n merkezinde topu oyuna sokma kalitesi ve pozisyon bilgisiyle Ã¶ne Ã§Ä±ktÄ±.", career:["Flamengo","Milan","Basaksehir"], strengths:["Pozisyon Alma","Pas","Hava Topu"] },
  { name:"Ousseynou Ba", team:"Basaksehir", position:"Defans", age:30, marketValue:2.2, goals:1, assists:0, minutes:2500, bigMatch:80, form:81, story:"Fiziksel gÃ¼cÃ¼ ve ikili mÃ¼cadelelerdeki Ã¼stÃ¼nlÃ¼ÄŸÃ¼yle rakip forvetleri yÄ±pratan Senegalli defans oyuncusu.", career:["Olympiacos","Slovan Bratislava","Basaksehir"], strengths:["GÃ¼Ã§","Top Kapma","Markaj"] },
  { name:"Lucas Lima", team:"Basaksehir", position:"Defans", age:34, marketValue:0.8, goals:0, assists:3, minutes:2600, bigMatch:79, form:80, story:"Sol bekte tecrÃ¼besiyle savunma hattÄ±nÄ± dengelerken hÃ¼cum bindirmeleriyle de 3 asist katkÄ±sÄ± verdi.", career:["Nantes","Al-Ahli","Basaksehir"], strengths:["Orta","TecrÃ¼be","Yer TutuÅŸ"] },
  { name:"Omer Ali Sahiner", team:"Basaksehir", position:"Defans", age:34, marketValue:0.2, goals:1, assists:2, minutes:1500, bigMatch:79, form:78, story:"SaÄŸ bek ve orta sahada joker gÃ¶revi gÃ¶rerek takÄ±mÄ±n en Ã§alÄ±ÅŸkan ve emektar isimlerinden biri oldu.", career:["Konyaspor","Basaksehir"], strengths:["Ã‡ok YÃ¶nlÃ¼lÃ¼k","Ã‡alÄ±ÅŸkanlÄ±k","HÄ±z"] },
  { name:"Hamza Gureler", team:"Basaksehir", position:"Defans", age:20, marketValue:1.2, goals:0, assists:1, minutes:1200, bigMatch:76, form:80, story:"AltyapÄ±dan Ã§Ä±kan genÃ§ stoper, yÃ¼ksek potansiyeli ve hamle zamanlamasÄ±yla gelecek vaat ediyor.", career:["Basaksehir"], strengths:["Potansiyel","Zamanlama"] },
  { name:"Onur Ergun", team:"Basaksehir", position:"Orta saha", age:33, marketValue:0.4, goals:1, assists:1, minutes:1400, bigMatch:76, form:78, story:"Defansif orta saha pozisyonunda fiziki gÃ¼cÃ¼ ve mÃ¼cadeleci yapÄ±sÄ±yla rotasyonun kilit isimlerindendi.", career:["Hatayspor","Ä°stanbulspor","Basaksehir"], strengths:["Top Kapma","MÃ¼cadele"] },
  { name:"Danijel Aleksic", team:"Basaksehir", position:"Orta saha", age:35, marketValue:0.3, goals:3, assists:2, minutes:1100, bigMatch:78, form:76, story:"Kritik anlarda ceza sahasÄ± dÄ±ÅŸÄ±ndan attÄ±ÄŸÄ± ÅŸutlar ve duran top ustasÄ± tecrÃ¼besiyle puanlar kazandÄ±rdÄ±.", career:["Genoa","St. Gallen","Yeni Malatyaspor","Basaksehir"], strengths:["Åut","Duran Top","TecrÃ¼be"] },
  { name:"Olivier Kemen", team:"Basaksehir", position:"Orta saha", age:29, marketValue:1.8, goals:4, assists:3, minutes:2100, bigMatch:80, form:82, story:"Kayserispor Ã§Ä±kÄ±ÅŸlÄ± Kamerunlu, orta sahadaki dinamizmi ve ceza sahasÄ± koÅŸularÄ±yla 4 gol Ã¼retti.", career:["Newcastle","Lyon","Kayserispor","Basaksehir"], strengths:["Dinamizm","Fizik","Gol Sezgisi"] },
  { name:"Serdar Gurler", team:"Basaksehir", position:"Kanat", age:34, marketValue:0.5, goals:4, assists:5, minutes:1800, bigMatch:79, form:81, story:"Kanatlarda sÃ¼rati ve tecrÃ¼besiyle hÃ¼cumda yaratÄ±cÄ±lÄ±k getirirken 9 skor katkÄ±sÄ± saÄŸladÄ±.", career:["ElazÄ±ÄŸspor","GenÃ§lerbirliÄŸi","OsmanlÄ±spor","GÃ¶ztepe","Konyaspor","Basaksehir"], strengths:["Dribbling","Orta","TecrÃ¼be"] },
  { name:"Davidson", team:"Basaksehir", position:"Kanat", age:35, marketValue:0.6, goals:5, assists:4, minutes:1900, bigMatch:80, form:82, story:"BrezilyalÄ± sol aÃ§Ä±k, Ã§alÄ±mlarÄ± ve bitiriciliÄŸiyle BaÅŸakÅŸehir hÃ¼cumunda Ã¼retkenliÄŸi artÄ±ran kritik isim.", career:["Alanyaspor","Wuhan Three Towns","Eupen","Basaksehir"], strengths:["Teknik","Dribbling","Bitiricilik"] },
  { name:"Joao Figueiredo", team:"Basaksehir", position:"Forvet", age:30, marketValue:1.5, goals:8, assists:3, minutes:2000, bigMatch:79, form:80, story:"Gaziantep sonrasÄ± BaÅŸakÅŸehir'de gol yollarÄ±nda Ã§alÄ±ÅŸkanlÄ±ÄŸÄ± ve 8 golÃ¼yle forvete derinlik kazandÄ±rdÄ±.", career:["Gaziantep FK","Al-Wasl","Basaksehir"], strengths:["Pres","Ã‡alÄ±ÅŸkanlÄ±k","Bitiricilik"] },
  { name:"Krzysztof Piatek", team:"Basaksehir", position:"Defans", age:33, marketValue:5.0, goals:0, assists:0, minutes:1995, bigMatch:75, form:87, story:"2025-26 sezonunda takÄ±mÄ±nÄ±n Defans bÃ¶lgesinde istikrarlÄ± performansÄ± ve kalitesiyle kadro derinliÄŸine Ã¶nemli katkÄ± saÄŸladÄ±.", career:["Basaksehir"], strengths:["Markaj","Hava Topu"] },
  { name:"Dimitris Pelkas", team:"Basaksehir", position:"Kanat", age:25, marketValue:2.5, goals:5, assists:7, minutes:1362, bigMatch:78, form:78, story:"2025-26 sezonunda takÄ±mÄ±nÄ±n Kanat bÃ¶lgesinde istikrarlÄ± performansÄ± ve kalitesiyle kadro derinliÄŸine Ã¶nemli katkÄ± saÄŸladÄ±.", career:["Basaksehir"], strengths:["Pas","Teknik"] },
  { name:"Jerome Opoku", team:"Basaksehir", position:"Kanat", age:27, marketValue:3.2, goals:7, assists:6, minutes:1061, bigMatch:79, form:73, story:"2025-26 sezonunda takÄ±mÄ±nÄ±n Kanat bÃ¶lgesinde istikrarlÄ± performansÄ± ve kalitesiyle kadro derinliÄŸine Ã¶nemli katkÄ± saÄŸladÄ±.", career:["Basaksehir"], strengths:["Pas","Teknik"] },
  { name:"Berat Ozdemir", team:"Basaksehir", position:"Orta saha", age:23, marketValue:4.3, goals:0, assists:9, minutes:2185, bigMatch:71, form:74, story:"2025-26 sezonunda takÄ±mÄ±nÄ±n Orta saha bÃ¶lgesinde istikrarlÄ± performansÄ± ve kalitesiyle kadro derinliÄŸine Ã¶nemli katkÄ± saÄŸladÄ±.", career:["Basaksehir"], strengths:["Pas","Teknik"] },
  { name:"Miguel Crespo", team:"Basaksehir", position:"Kanat", age:26, marketValue:2.5, goals:8, assists:5, minutes:1553, bigMatch:79, form:84, story:"2025-26 sezonunda takÄ±mÄ±nÄ±n Kanat bÃ¶lgesinde istikrarlÄ± performansÄ± ve kalitesiyle kadro derinliÄŸine Ã¶nemli katkÄ± saÄŸladÄ±.", career:["Basaksehir"], strengths:["Pas","Teknik"] },
  { name:"Philippe Keny", team:"Basaksehir", position:"Defans", age:20, marketValue:1.9, goals:0, assists:0, minutes:1819, bigMatch:78, form:72, story:"2025-26 sezonunda takÄ±mÄ±nÄ±n Defans bÃ¶lgesinde istikrarlÄ± performansÄ± ve kalitesiyle kadro derinliÄŸine Ã¶nemli katkÄ± saÄŸladÄ±.", career:["Basaksehir"], strengths:["Markaj","Hava Topu"] },
  { name:"Omer Beyaz", team:"Basaksehir", position:"Kaleci", age:29, marketValue:3.7, goals:0, assists:2, minutes:2157, bigMatch:84, form:74, story:"2025-26 sezonunda takÄ±mÄ±nÄ±n Kaleci bÃ¶lgesinde istikrarlÄ± performansÄ± ve kalitesiyle kadro derinliÄŸine Ã¶nemli katkÄ± saÄŸladÄ±.", career:["Basaksehir"], strengths:["Refleks","KurtarÄ±ÅŸ"] },
  { name:"Edgar Ie", team:"Basaksehir", position:"Defans", age:28, marketValue:3.9, goals:2, assists:0, minutes:1535, bigMatch:84, form:84, story:"2025-26 sezonunda takÄ±mÄ±nÄ±n Defans bÃ¶lgesinde istikrarlÄ± performansÄ± ve kalitesiyle kadro derinliÄŸine Ã¶nemli katkÄ± saÄŸladÄ±.", career:["Basaksehir"], strengths:["Markaj","Hava Topu"] },
  { name:"Deniz Dilmen", team:"Basaksehir", position:"Defans", age:20, marketValue:4.2, goals:0, assists:2, minutes:2333, bigMatch:70, form:77, story:"2025-26 sezonunda takÄ±mÄ±nÄ±n Defans bÃ¶lgesinde istikrarlÄ± performansÄ± ve kalitesiyle kadro derinliÄŸine Ã¶nemli katkÄ± saÄŸladÄ±.", career:["Basaksehir"], strengths:["Markaj","Hava Topu"] },
  { name:"Filip Rodriguez", team:"Basaksehir", position:"Orta saha", age:31, marketValue:3.0, goals:0, assists:6, minutes:1595, bigMatch:73, form:84, story:"Kadro derinliÄŸi ve rotasyonda teknik direktÃ¶rÃ¼n elini gÃ¼Ã§lendiren, 2025-26 sezonu kadro oyuncusu.", career:["Basaksehir"], strengths:["Pas","MÃ¼cadele"] },
  { name:"Mateusz Lis", team:"Goztepe", position:"Kaleci", age:29, marketValue:2.5, goals:0, assists:0, minutes:3200, bigMatch:87, form:90, story:"GÃ¶ztepe'nin kalesinde harikalar yaratarak ligin en yÃ¼ksek kurtarÄ±ÅŸ oranÄ±na sahip kalecilerinden biri oldu.", career:["Lech Poznan","Southampton","Troyes","Goztepe"], strengths:["Refleks","Bire Bir","Ä°stikrar"] },
  { name:"Juan Santos", team:"Goztepe", position:"Forvet", age:24, marketValue:12.0, goals:12, assists:4, minutes:2200, bigMatch:82, form:86, story:"DeÄŸerini 12 milyon Euro'ya fÄ±rlatan genÃ§ yÄ±ldÄ±z, 12 gol atarak sezonun en sansasyonel kanat performansÄ±na imza attÄ±.", career:["Santos","Goztepe"], strengths:["HÄ±z","Bitiricilik","Potansiyel"] },
  { name:"Arda Ozcimen", team:"Goztepe", position:"Kaleci", age:24, marketValue:0.4, goals:0, assists:0, minutes:180, bigMatch:72, form:75, story:"AltyapÄ±dan yetiÅŸen genÃ§ kaleci, Mateusz Lis'in yokluÄŸunda elinden gelenin en iyisini yaptÄ±.", career:["GÃ¶ztepe"], strengths:["Refleks","Potansiyel"] },
  { name:"Taha Altikardes", team:"Goztepe", position:"Defans", age:22, marketValue:4.0, goals:2, assists:1, minutes:2900, bigMatch:83, form:86, story:"GÃ¶ztepe'nin en deÄŸerli TÃ¼rk stoperi. YÃ¼ksek potansiyeli ve hÄ±rsÄ±yla devlerin radarÄ±nda.", career:["Bursaspor","Trabzonspor","GÃ¶ztepe"], strengths:["Potansiyel","GÃ¼Ã§","Hava Topu"] },
  { name:"Heliton", team:"Goztepe", position:"Defans", age:30, marketValue:1.8, goals:3, assists:0, minutes:2800, bigMatch:82, form:84, story:"Savunma hattÄ±ndaki sertliÄŸi, markaj becerisi ve hÃ¼cum duran toplarÄ±nda attÄ±ÄŸÄ± 3 kafa golÃ¼yle parladÄ±.", career:["Gil Vicente","GÃ¶ztepe"], strengths:["Kafa Åutu","Markaj","Fizik"] },
  { name:"Malcom Bokele", team:"Goztepe", position:"Defans", age:26, marketValue:1.5, goals:1, assists:1, minutes:2400, bigMatch:80, form:82, story:"Kamerunlu stoper/saÄŸ bek, dinamizmi ve atletizmiyle GÃ¶ztepe savunmasÄ±nÄ±n saÄŸ tarafÄ±nÄ± kapattÄ±.", career:["Bordeaux","GÃ¶ztepe"], strengths:["Atletizm","HÄ±z","MÃ¼cadele"] },
  { name:"Djalma Silva", team:"Goztepe", position:"Defans", age:31, marketValue:0.8, goals:1, assists:4, minutes:2500, bigMatch:79, form:82, story:"Sol bekten yaptÄ±ÄŸÄ± muz ortalarla hÃ¼cumu beslerken ligde 4 asist Ã¼reterek kalitesini gÃ¶sterdi.", career:["AEL Limassol","GÃ¶ztepe"], strengths:["Orta","HÄ±z","Duran Top"] },
  { name:"Ogun Bayrak", team:"Goztepe", position:"Defans", age:27, marketValue:0.7, goals:0, assists:3, minutes:2100, bigMatch:78, form:80, story:"SaÄŸ bek pozisyonunda Ã§alÄ±ÅŸkanlÄ±ÄŸÄ± ve bitmek bilmeyen enerjisiyle takÄ±mÄ±n Ã¶nemli parÃ§alarÄ±ndan biri oldu.", career:["KeÃ§iÃ¶rengÃ¼cÃ¼","Tuzlaspor","GÃ¶ztepe"], strengths:["DayanÄ±klÄ±lÄ±k","Pres","Orta"] },
  { name:"Isaac Solet", team:"Goztepe", position:"Orta saha", age:25, marketValue:2.5, goals:3, assists:4, minutes:2600, bigMatch:81, form:83, story:"Orta sahada fiziksel mÃ¼cadelesi ve oyunun iki yÃ¶nÃ¼ndeki temposuyla Goztepe'nin dinamosu.", career:["Slavia Sofia","GÃ¶ztepe"], strengths:["Fizik","Top Kapma","Dinamizm"] },
  { name:"Anthony Dennis", team:"Goztepe", position:"Orta saha", age:21, marketValue:2.0, goals:1, assists:2, minutes:2300, bigMatch:80, form:81, story:"GÃ¶ztepe'nin genÃ§ NijeryalÄ±sÄ±, top kapmadaki becerisiyle scoutlarÄ±n dikkatini Ã§ekti.", career:["GÃ¶ztepe"], strengths:["Potansiyel","Top Kapma","GÃ¼Ã§"] },
  { name:"Dogan Erdogan", team:"Goztepe", position:"Orta saha", age:29, marketValue:0.5, goals:0, assists:1, minutes:1200, bigMatch:75, form:78, story:"Merkez orta saha rotasyonunda mÃ¼cadele gÃ¼cÃ¼ ve tecrÃ¼besiyle sÃ¼re aldÄ±ÄŸÄ± maÃ§larda katkÄ± verdi.", career:["LASK Linz","Trabzonspor","Fortuna Sittard","GÃ¶ztepe"], strengths:["MÃ¼cadele","TecrÃ¼be"] },
  { name:"David Tijanic", team:"Goztepe", position:"Orta saha", age:28, marketValue:1.2, goals:4, assists:5, minutes:1900, bigMatch:78, form:80, story:"Sloven oyun kurucu, teknik kalitesi, kilit paslarÄ± ve 9 skor katkÄ±sÄ±yla takÄ±mÄ±nÄ± yÃ¶nlendirdi.", career:["Olimpija Ljubljana","Al-Adalah","GÃ¶ztepe"], strengths:["Pas","Vizyon","Teknik"] },
  { name:"Kuryu Matsuki", team:"Goztepe", position:"Orta saha", age:23, marketValue:3.0, goals:3, assists:3, minutes:1800, bigMatch:80, form:82, story:"Southampton'dan kiralanan Japon genÃ§ yetenek, yÃ¼ksek oyun zekasÄ±yla orta sahayÄ± zenginleÅŸtirdi.", career:["FC Tokyo","Southampton","GÃ¶ztepe"], strengths:["Oyun ZekasÄ±","Potansiyel","Pas"] },
  { name:"Romulo Cardoso", team:"Goztepe", position:"Forvet", age:24, marketValue:3.5, goals:9, assists:4, minutes:2400, bigMatch:81, form:83, story:"BrezilyalÄ± santrfor, 9 golle GÃ¶ztepe'nin en skorer yerli/yabancÄ± hÃ¼cumcularÄ±ndan biri oldu.", career:["Athletico Paranaense","GÃ¶ztepe"], strengths:["HÄ±z","Bitiricilik","Hareketlilik"] },
  { name:"Kubilay Kanatsizkus", team:"Goztepe", position:"Forvet", age:29, marketValue:0.4, goals:2, assists:1, minutes:800, bigMatch:73, form:76, story:"Rotasyonda yedek santrfor olarak oyuna sonradan girip fizik avantajÄ±yla yÄ±pratÄ±cÄ± rol Ã¼stlendi.", career:["Bursaspor","Kocaelispor","Rizespor","GÃ¶ztepe"], strengths:["Fizik","Hava Topu"] },
  { name:"Koray Gunter", team:"Goztepe", position:"Defans", age:23, marketValue:3.0, goals:1, assists:2, minutes:1751, bigMatch:71, form:75, story:"2025-26 sezonunda takÄ±mÄ±nÄ±n Defans bÃ¶lgesinde istikrarlÄ± performansÄ± ve kalitesiyle kadro derinliÄŸine Ã¶nemli katkÄ± saÄŸladÄ±.", career:["Goztepe"], strengths:["Markaj","Hava Topu"] },
  { name:"Ismail Koybasi", team:"Goztepe", position:"Forvet", age:30, marketValue:2.5, goals:9, assists:2, minutes:1081, bigMatch:75, form:86, story:"2025-26 sezonunda takÄ±mÄ±nÄ±n Forvet bÃ¶lgesinde istikrarlÄ± performansÄ± ve kalitesiyle kadro derinliÄŸine Ã¶nemli katkÄ± saÄŸladÄ±.", career:["Goztepe"], strengths:["Pas","Teknik"] },
  { name:"Victor Hugo", team:"Goztepe", position:"Kaleci", age:32, marketValue:1.6, goals:0, assists:0, minutes:1948, bigMatch:72, form:76, story:"2025-26 sezonunda takÄ±mÄ±nÄ±n Kaleci bÃ¶lgesinde istikrarlÄ± performansÄ± ve kalitesiyle kadro derinliÄŸine Ã¶nemli katkÄ± saÄŸladÄ±.", career:["Goztepe"], strengths:["Refleks","KurtarÄ±ÅŸ"] },
  { name:"Ahmed Ildiz", team:"Goztepe", position:"Forvet", age:27, marketValue:2.1, goals:5, assists:2, minutes:1669, bigMatch:80, form:75, story:"2025-26 sezonunda takÄ±mÄ±nÄ±n Forvet bÃ¶lgesinde istikrarlÄ± performansÄ± ve kalitesiyle kadro derinliÄŸine Ã¶nemli katkÄ± saÄŸladÄ±.", career:["Goztepe"], strengths:["Pas","Teknik"] },
  { name:"Lasse Nielsen", team:"Goztepe", position:"Orta saha", age:25, marketValue:2.7, goals:1, assists:6, minutes:1720, bigMatch:80, form:83, story:"2025-26 sezonunda takÄ±mÄ±nÄ±n Orta saha bÃ¶lgesinde istikrarlÄ± performansÄ± ve kalitesiyle kadro derinliÄŸine Ã¶nemli katkÄ± saÄŸladÄ±.", career:["Goztepe"], strengths:["Pas","Teknik"] },
  { name:"Billel Messaoudi", team:"Goztepe", position:"Forvet", age:28, marketValue:1.4, goals:8, assists:0, minutes:2345, bigMatch:73, form:77, story:"2025-26 sezonunda takÄ±mÄ±nÄ±n Forvet bÃ¶lgesinde istikrarlÄ± performansÄ± ve kalitesiyle kadro derinliÄŸine Ã¶nemli katkÄ± saÄŸladÄ±.", career:["Goztepe"], strengths:["Pas","Teknik"] },
  { name:"Novatus Miroshi", team:"Goztepe", position:"Orta saha", age:27, marketValue:1.1, goals:0, assists:4, minutes:1554, bigMatch:82, form:82, story:"2025-26 sezonunda takÄ±mÄ±nÄ±n Orta saha bÃ¶lgesinde istikrarlÄ± performansÄ± ve kalitesiyle kadro derinliÄŸine Ã¶nemli katkÄ± saÄŸladÄ±.", career:["Goztepe"], strengths:["Pas","Teknik"] },
  { name:"Kenneth Obinna", team:"Goztepe", position:"Kaleci", age:26, marketValue:2.4, goals:1, assists:0, minutes:2078, bigMatch:75, form:77, story:"2025-26 sezonunda takÄ±mÄ±nÄ±n Kaleci bÃ¶lgesinde istikrarlÄ± performansÄ± ve kalitesiyle kadro derinliÄŸine Ã¶nemli katkÄ± saÄŸladÄ±.", career:["Goztepe"], strengths:["Refleks","KurtarÄ±ÅŸ"] },
  { name:"Ali Dere", team:"Goztepe", position:"Kaleci", age:24, marketValue:1.6, goals:1, assists:1, minutes:2146, bigMatch:75, form:79, story:"2025-26 sezonunda takÄ±mÄ±nÄ±n Kaleci bÃ¶lgesinde istikrarlÄ± performansÄ± ve kalitesiyle kadro derinliÄŸine Ã¶nemli katkÄ± saÄŸladÄ±.", career:["Goztepe"], strengths:["Refleks","KurtarÄ±ÅŸ"] },
  { name:"Kenan Piric", team:"Goztepe", position:"Defans", age:27, marketValue:1.7, goals:1, assists:1, minutes:1817, bigMatch:71, form:71, story:"2025-26 sezonunda takÄ±mÄ±nÄ±n Defans bÃ¶lgesinde istikrarlÄ± performansÄ± ve kalitesiyle kadro derinliÄŸine Ã¶nemli katkÄ± saÄŸladÄ±.", career:["Goztepe"], strengths:["Markaj","Hava Topu"] },
  { name:"Emre Akbaba", team:"Eyupspor", position:"Orta saha", age:33, marketValue:1.0, goals:5, assists:8, minutes:2200, bigMatch:79, form:80, story:"Milli orta saha oyuncusu tecrÃ¼besi ve 8 asistlik katkÄ±sÄ±yla EyÃ¼pspor'a bÃ¼yÃ¼k liderlik yaptÄ±.", career:["Alanyaspor","Galatasaray","Adana Demirspor","Eyupspor"], strengths:["TecrÃ¼be","Asist","Liderlik"] },
  { name:"Umut Bozok", team:"Eyupspor", position:"Forvet", age:29, marketValue:1.5, goals:9, assists:4, minutes:2100, bigMatch:81, form:83, story:"Trabzonspor'dan transfer edilen golcÃ¼ oyuncu, 9 golle takÄ±mÄ±nÄ±n hÃ¼cum hattÄ±ndaki en verimli ismiydi.", career:["Nimes","Lorient","Kasimpasa","Trabzonspor","Eyupspor"], strengths:["Bitiricilik","Pozisyon Alma"] },
  { name:"Berke Ozer", team:"Eyupspor", position:"Kaleci", age:26, marketValue:1.8, goals:0, assists:0, minutes:3000, bigMatch:78, form:80, story:"EyÃ¼pspor kalesinde gÃ¶sterdiÄŸi istikrarlÄ± performans ve kritik kurtarÄ±ÅŸlarla savunmaya bÃ¼yÃ¼k gÃ¼ven verdi.", career:["Fenerbahce","Westerlo","Eyupspor"], strengths:["Refleks","Bire Bir","Yan Top"] },
  { name:"Robin Yalcin", team:"Eyupspor", position:"Defans", age:32, marketValue:0.6, goals:1, assists:1, minutes:2200, bigMatch:77, form:78, story:"Savunmada stoper ve saÄŸ bek pozisyonlarÄ±nda Ã§ok yÃ¶nlÃ¼lÃ¼ÄŸÃ¼ ve tecrÃ¼besiyle rotasyonu gÃ¼Ã§lendirdi.", career:["Stuttgart","Rizespor","Sivasspor","Paderborn","Eyupspor"], strengths:["Ã‡ok YÃ¶nlÃ¼lÃ¼k","MÃ¼cadele","Pozisyon Alma"] },
  { name:"Leo Dubois", team:"Eyupspor", position:"Defans", age:31, marketValue:3.5, goals:1, assists:4, minutes:2700, bigMatch:82, form:83, story:"Galatasaray ve BaÅŸakÅŸehir sonrasÄ± EyÃ¼pspor'a gelen FransÄ±z saÄŸ bek, 4 asist ve oyun zekasÄ±yla katkÄ± saÄŸladÄ±.", career:["Nantes", "Lyon", "Galatasaray", "Basaksehir", "Eyupspor"], strengths:["Orta", "Pozisyon Alma", "TecrÃ¼be"] },
  { name:"Veysel Sari", team:"Eyupspor", position:"Defans", age:37, marketValue:0.1, goals:1, assists:0, minutes:1800, bigMatch:76, form:77, story:"SÃ¼per Lig'in en tecrÃ¼beli stoperlerinden biri. GÃ¼Ã§lÃ¼ fiziÄŸi ve hava toplarÄ±ndaki etkisiyle katkÄ± sundu.", career:["Eskisehirspor","Galatasaray","Kasimpasa","Antalyaspor","Eyupspor"], strengths:["Hava Topu","Markaj","Liderlik"] },
  { name:"Luccas Claro", team:"Eyupspor", position:"Defans", age:34, marketValue:0.4, goals:1, assists:0, minutes:2100, bigMatch:78, form:79, story:"BrezilyalÄ± stoper, savunmanÄ±n merkezinde fiziksel gÃ¼cÃ¼ ve kritik mÃ¼dahaleleriyle rotasyonun kilit parÃ§asÄ±ydÄ±.", career:["Coritiba", "Genclerbirligi", "Fluminense", "Eyupspor"], strengths:["Fizik","Top Kapma"] },
  { name:"Melih Kabasakal", team:"Eyupspor", position:"Orta saha", age:30, marketValue:0.5, goals:1, assists:2, minutes:1900, bigMatch:75, form:78, story:"Merkez orta sahada Ã§alÄ±ÅŸkanlÄ±ÄŸÄ±, pres gÃ¼cÃ¼ ve basit ama etkili pas daÄŸÄ±tÄ±mÄ±yla rotasyona derinlik kattÄ±.", career:["Samsunspor", "Istanbulspor", "Eyupspor"], strengths:["Pres","MÃ¼cadele"] },
  { name:"Fredrik Midtsjo", team:"Eyupspor", position:"Orta saha", age:32, marketValue:1.2, goals:2, assists:3, minutes:2300, bigMatch:80, form:81, story:"Galatasaray ve Pendikspor geÃ§miÅŸli NorveÃ§li dinamo, orta sahadaki temposu ve iki yÃ¶nlÃ¼ katkÄ±sÄ±yla kilit rol oynadÄ±.", career:["Rosenborg", "AZ Alkmaar", "Galatasaray", "Pendikspor", "Eyupspor"], strengths:["Dinamizm","Top Kapma","DayanÄ±klÄ±lÄ±k"] },
  { name:"Taskin Ilter", team:"Eyupspor", position:"Orta saha", age:31, marketValue:0.4, goals:0, assists:1, minutes:1300, bigMatch:75, form:76, story:"Orta sahanÄ±n savunma yÃ¶nÃ¼nde sertliÄŸi ve kesiciliÄŸiyle yedek kulÃ¼besinin Ã¶nemli bir gÃ¼cÃ¼ oldu.", career:["Kardemir Karabukspor","Denizlispor","Eyupspor"], strengths:["Top Kapma","MÃ¼cadele"] },
  { name:"Samu Saiz", team:"Eyupspor", position:"Orta saha", age:35, marketValue:0.8, goals:4, assists:5, minutes:2000, bigMatch:79, form:81, story:"Ä°spanyol oyun kurucu, dar alandaki yÃ¼ksek teknik becerisi ve 9 gol katkÄ±sÄ±yla hÃ¼cumun beyniydi.", career:["Leeds United", "Girona", "Sivasspor", "Eyupspor"], strengths:["Teknik","Dribbling","Pas"] },
  { name:"Ahmed Kutucu", team:"Eyupspor", position:"Kanat", age:26, marketValue:2.2, goals:6, assists:6, minutes:2400, bigMatch:81, form:83, story:"Milli kanat oyuncusu, hÄ±zÄ± ve bitiriciliÄŸiyle kanatlardan 12 gollÃ¼k direkt katkÄ± vererek parladÄ±.", career:["Schalke 04", "Istanbul Basaksehir", "Sandhausen", "Eyupspor"], strengths:["HÄ±z","Dribbling","Bitiricilik"] },
  { name:"Mame Thiam", team:"Eyupspor", position:"Forvet", age:33, marketValue:1.5, goals:8, assists:4, minutes:2200, bigMatch:80, form:82, story:"Kayserispor ve Pendikspor sonrasÄ± EyÃ¼pspor'da forvette Ã§alÄ±ÅŸkanlÄ±ÄŸÄ± ve 8 golÃ¼yle kalitesini kanÄ±tladÄ±.", career:["KasÄ±mpaÅŸa","Fenerbahce", "Kayserispor", "Pendikspor", "Eyupspor"], strengths:["Pres", "Bitiricilik", "Ã‡alÄ±ÅŸkanlÄ±k"] },
  { name:"Jonjo Shelvey", team:"Eyupspor", position:"Orta saha", age:34, marketValue:1.0, goals:3, assists:4, minutes:1700, bigMatch:80, form:79, story:"Ä°ngiliz oyun kurucu, oyun yÃ¶nlendirme kalitesi, milimetrik uzun paslarÄ± ve duran top becerisiyle lige damga vurdu.", career:["Liverpool", "Newcastle", "Nottingham Forest", "Rizespor", "Eyupspor"], strengths:["Uzun Pas","Duran Top","TecrÃ¼be"] },
  { name:"Gianni Bruno", team:"Eyupspor", position:"Defans", age:21, marketValue:2.6, goals:1, assists:0, minutes:1979, bigMatch:84, form:71, story:"2025-26 sezonunda takÄ±mÄ±nÄ±n Defans bÃ¶lgesinde istikrarlÄ± performansÄ± ve kalitesiyle kadro derinliÄŸine Ã¶nemli katkÄ± saÄŸladÄ±.", career:["Eyupspor"], strengths:["Markaj","Hava Topu"] },
  { name:"Emre Mor", team:"Eyupspor", position:"Orta saha", age:20, marketValue:1.7, goals:0, assists:9, minutes:1454, bigMatch:81, form:72, story:"2025-26 sezonunda takÄ±mÄ±nÄ±n Orta saha bÃ¶lgesinde istikrarlÄ± performansÄ± ve kalitesiyle kadro derinliÄŸine Ã¶nemli katkÄ± saÄŸladÄ±.", career:["Eyupspor"], strengths:["Pas","Teknik"] },
  { name:"Tayfur Bingol", team:"Eyupspor", position:"Defans", age:31, marketValue:1.8, goals:2, assists:1, minutes:1965, bigMatch:70, form:83, story:"2025-26 sezonunda takÄ±mÄ±nÄ±n Defans bÃ¶lgesinde istikrarlÄ± performansÄ± ve kalitesiyle kadro derinliÄŸine Ã¶nemli katkÄ± saÄŸladÄ±.", career:["Eyupspor"], strengths:["Markaj","Hava Topu"] },
  { name:"Anastasios Chatzigiovanis", team:"Eyupspor", position:"Kaleci", age:28, marketValue:2.5, goals:2, assists:0, minutes:1358, bigMatch:73, form:79, story:"2025-26 sezonunda takÄ±mÄ±nÄ±n Kaleci bÃ¶lgesinde istikrarlÄ± performansÄ± ve kalitesiyle kadro derinliÄŸine Ã¶nemli katkÄ± saÄŸladÄ±.", career:["Eyupspor"], strengths:["Refleks","KurtarÄ±ÅŸ"] },
  { name:"Svit Seclar", team:"Eyupspor", position:"Defans", age:26, marketValue:0.7, goals:2, assists:2, minutes:2312, bigMatch:71, form:78, story:"2025-26 sezonunda takÄ±mÄ±nÄ±n Defans bÃ¶lgesinde istikrarlÄ± performansÄ± ve kalitesiyle kadro derinliÄŸine Ã¶nemli katkÄ± saÄŸladÄ±.", career:["Eyupspor"], strengths:["Markaj","Hava Topu"] },
  { name:"Sinan Bolat", team:"Eyupspor", position:"Defans", age:23, marketValue:0.7, goals:1, assists:0, minutes:1473, bigMatch:79, form:86, story:"2025-26 sezonunda takÄ±mÄ±nÄ±n Defans bÃ¶lgesinde istikrarlÄ± performansÄ± ve kalitesiyle kadro derinliÄŸine Ã¶nemli katkÄ± saÄŸladÄ±.", career:["Eyupspor"], strengths:["Markaj","Hava Topu"] },
  { name:"Umut Nayir", team:"Eyupspor", position:"Kanat", age:22, marketValue:1.4, goals:8, assists:2, minutes:1260, bigMatch:77, form:82, story:"2025-26 sezonunda takÄ±mÄ±nÄ±n Kanat bÃ¶lgesinde istikrarlÄ± performansÄ± ve kalitesiyle kadro derinliÄŸine Ã¶nemli katkÄ± saÄŸladÄ±.", career:["Eyupspor"], strengths:["Pas","Teknik"] },
  { name:"Ruben Vezo", team:"Eyupspor", position:"Kaleci", age:21, marketValue:1.4, goals:2, assists:2, minutes:1207, bigMatch:70, form:75, story:"2025-26 sezonunda takÄ±mÄ±nÄ±n Kaleci bÃ¶lgesinde istikrarlÄ± performansÄ± ve kalitesiyle kadro derinliÄŸine Ã¶nemli katkÄ± saÄŸladÄ±.", career:["Eyupspor"], strengths:["Refleks","KurtarÄ±ÅŸ"] },
  { name:"Prince Ampem", team:"Eyupspor", position:"Kanat", age:33, marketValue:2.3, goals:6, assists:3, minutes:2222, bigMatch:73, form:76, story:"2025-26 sezonunda takÄ±mÄ±nÄ±n Kanat bÃ¶lgesinde istikrarlÄ± performansÄ± ve kalitesiyle kadro derinliÄŸine Ã¶nemli katkÄ± saÄŸladÄ±.", career:["Eyupspor"], strengths:["Pas","Teknik"] },
  { name:"Tugay Kacar", team:"Eyupspor", position:"Kanat", age:20, marketValue:1.8, goals:5, assists:6, minutes:2041, bigMatch:77, form:84, story:"2025-26 sezonunda takÄ±mÄ±nÄ±n Kanat bÃ¶lgesinde istikrarlÄ± performansÄ± ve kalitesiyle kadro derinliÄŸine Ã¶nemli katkÄ± saÄŸladÄ±.", career:["Eyupspor"], strengths:["Pas","Teknik"] },
  { name:"Caner Cavlan", team:"Eyupspor", position:"Forvet", age:32, marketValue:0.5, goals:10, assists:2, minutes:1950, bigMatch:77, form:73, story:"2025-26 sezonunda takÄ±mÄ±nÄ±n Forvet bÃ¶lgesinde istikrarlÄ± performansÄ± ve kalitesiyle kadro derinliÄŸine Ã¶nemli katkÄ± saÄŸladÄ±.", career:["Eyupspor"], strengths:["Pas","Teknik"] },
  { name:"Okan Kocuk", team:"Samsunspor", position:"Kaleci", age:30, marketValue:2.0, goals:0, assists:0, minutes:3300, bigMatch:84, form:85, story:"Samsunspor kalesinde gÃ¶sterdiÄŸi istikrarla takÄ±mÄ±n ligi orta sÄ±ralarda tamamlamasÄ±nÄ± saÄŸladÄ±.", career:["Bursaspor","Galatasaray","Samsunspor"], strengths:["KurtarÄ±ÅŸ","Refleks","Liderlik"] },
  { name:"Marius Mouandilmadji", team:"Samsunspor", position:"Forvet", age:27, marketValue:7.0, goals:14, assists:2, minutes:2300, bigMatch:81, form:85, story:"Samsunspor formasÄ±yla 14 gol atarak takÄ±mÄ±n en golcÃ¼ oyuncusu oldu ve hÃ¼cum hattÄ±nÄ± sÄ±rtladÄ±.", career:["Porto B","Augsburg","Samsunspor"], strengths:["Bitiricilik","HÄ±z","Fizik"] },
  { name:"Halil Yeral", team:"Samsunspor", position:"Kaleci", age:26, marketValue:0.3, goals:0, assists:0, minutes:180, bigMatch:70, form:75, story:"Kupada gÃ¶rev alan yedek kaleci, gÃ¶rev verildiÄŸi anlarda kalesinde elinden geleni yaptÄ±.", career:["Akhisarspor","Samsunspor"], strengths:["Refleks"] },
  { name:"Rick van Drongelen", team:"Samsunspor", position:"Defans", age:27, marketValue:2.5, goals:2, assists:0, minutes:3100, bigMatch:83, form:85, story:"HollandalÄ± sol ayaklÄ± stoper, Samsunspor savunmasÄ±nda hava toplarÄ±nda ve markajda kusursuzdu.", career:["Sparta Rotterdam","Hamburg","Union Berlin","Hansa Rostock","Samsunspor"], strengths:["Markaj","Hava Topu","Liderlik"] },
  { name:"Lubomir Satka", team:"Samsunspor", position:"Defans", age:30, marketValue:1.2, goals:1, assists:0, minutes:2700, bigMatch:81, form:82, story:"Slovak stoper, dengeli oyunu, pozisyon bilgisi ve sakin yapÄ±sÄ±yla savunmanÄ±n gÃ¼vencesi oldu.", career:["Newcastle","Lech Poznan","Samsunspor"], strengths:["Sakinlik","Yer TutuÅŸ"] },
  { name:"Zeki Yavru", team:"Samsunspor", position:"Defans", age:34, marketValue:0.2, goals:1, assists:5, minutes:2400, bigMatch:80, form:81, story:"TakÄ±mÄ±n kaptanlarÄ±ndan, tecrÃ¼beli saÄŸ bek duran toplardaki baÅŸarÄ±sÄ± ve 5 asistiyle Ã¶ne Ã§Ä±ktÄ±.", career:["Trabzonspor","Kayserispor","Giresunspor","Samsunspor"], strengths:["Duran Top","Orta","TecrÃ¼be"] },
  { name:"Marc Bola", team:"Samsunspor", position:"Defans", age:28, marketValue:1.5, goals:0, assists:3, minutes:2600, bigMatch:79, form:81, story:"Sol bekte atletizmi ve hÄ±zÄ±yla savunma gÃ¼cÃ¼nÃ¼ artÄ±rÄ±rken hÃ¼cuma da 3 asistlik katkÄ± verdi.", career:["Arsenal","Middlesbrough","Samsunspor"], strengths:["DayanÄ±klÄ±lÄ±k","HÄ±z","Savunma"] },
  { name:"Youssef Ait Bennasser", team:"Samsunspor", position:"Orta saha", age:29, marketValue:1.5, goals:2, assists:2, minutes:2800, bigMatch:81, form:82, story:"FaslÄ± Ã¶n libero, orta sahada oyunun yÃ¶nÃ¼nÃ¼ deÄŸiÅŸtirme kalitesi ve top Ã§alma baÅŸarÄ±sÄ±yla dinamo gÃ¶revi gÃ¶rdÃ¼.", career:["Monaco","Nancy","Saint-Etienne","Adanaspor","Samsunspor"], strengths:["Pas kalitesi","Top Kapma","Fizik"] },
  { name:"Flavien Tait", team:"Samsunspor", position:"Orta saha", age:33, marketValue:0.8, goals:1, assists:4, minutes:1800, bigMatch:79, form:80, story:"Rennes geÃ§miÅŸli FransÄ±z merkez orta saha, tecrÃ¼besi ve pas daÄŸÄ±tÄ±mÄ±yla rotasyonda kilit rol oynadÄ±.", career:["Angers","Rennes","Samsunspor"], strengths:["Pas","Oyun GÃ¶rÃ¼ÅŸÃ¼","TecrÃ¼be"] },
  { name:"Carlo Holse", team:"Samsunspor", position:"Orta saha", age:27, marketValue:3.5, goals:7, assists:8, minutes:2900, bigMatch:83, form:85, story:"DanimarkalÄ± 10 numara, 7 gol ve 8 asistlik Ã¼retkenliÄŸiyle Samsunspor hÃ¼cumunun beyni oldu.", career:["Kopenhag","Rosenborg","Samsunspor"], strengths:["YaratÄ±cÄ±lÄ±k","Vizyon","Asist"] },
  { name:"Olivier Ntcham", team:"Samsunspor", position:"Orta saha", age:30, marketValue:3.2, goals:9, assists:6, minutes:2700, bigMatch:84, form:86, story:"Kamerunlu yÄ±ldÄ±z, orta sahadaki gÃ¼Ã§lÃ¼ fiziÄŸi, uzaktan ÅŸutlarÄ± ve 9 golÃ¼yle sezonun en iyi oyuncularÄ±ndandÄ±.", career:["Man City","Genoa","Celtic","Marseille","Swansea","Samsunspor"], strengths:["GÃ¼Ã§","Uzak Åut","Teknik"] },
  { name:"Kingsley Schindler", team:"Samsunspor", position:"Kanat", age:32, marketValue:0.6, goals:3, assists:3, minutes:1900, bigMatch:78, form:80, story:"GanalÄ± kanat oyuncusu, hÄ±zÄ± ve hÃ¼cum/savunma dengesindeki yardÄ±mlaÅŸmasÄ±yla takÄ±mÄ±na katkÄ± saÄŸladÄ±.", career:["KÃ¶ln","Hannover","Samsunspor"], strengths:["HÄ±z","MÃ¼cadele"] },
  { name:"Emre Kilinc", team:"Samsunspor", position:"Kanat", age:31, marketValue:1.2, goals:4, assists:5, minutes:2300, bigMatch:80, form:82, story:"Galatasaray ve Sivasspor geÃ§miÅŸli sol aÃ§Ä±k, Ã§alÄ±ÅŸkanlÄ±ÄŸÄ± ve 9 skor katkÄ±sÄ±yla hÃ¼cuma zenginlik kattÄ±.", career:["Boluspor","Sivasspor","Galatasaray","AnkaragÃ¼cÃ¼","Samsunspor"], strengths:["Teknik","Pas","Ã‡alÄ±ÅŸkanlÄ±k"] },
  { name:"Gaetan Laura", team:"Samsunspor", position:"Forvet", age:30, marketValue:0.5, goals:3, assists:1, minutes:1000, bigMatch:74, form:77, story:"Yedek santrfor olarak hÄ±zÄ± ve fiziksel patlayÄ±cÄ±lÄ±ÄŸÄ±yla rotasyona gÃ¼Ã§ kazandÄ±rdÄ±.", career:["Paris FC","Cosenza","Samsunspor"], strengths:["HÄ±z","Fizik"] },
  { name:"Arbnor Muja", team:"Samsunspor", position:"Kanat", age:27, marketValue:1.8, goals:5, assists:4, minutes:2100, bigMatch:80, form:82, story:"Antwerp'ten transfer edilen Arnavut kanat, driplingleri ve hÃ¼cumdaki enerjisiyle 9 gole etki etti.", career:["Drita","Antwerp","Samsunspor"], strengths:["Dribbling","Ã‡eviklik"] },
  { name:"Landry Dimata", team:"Samsunspor", position:"Forvet", age:25, marketValue:2.8, goals:9, assists:1, minutes:1520, bigMatch:79, form:74, story:"2025-26 sezonunda takÄ±mÄ±nÄ±n Forvet bÃ¶lgesinde istikrarlÄ± performansÄ± ve kalitesiyle kadro derinliÄŸine Ã¶nemli katkÄ± saÄŸladÄ±.", career:["Samsunspor"], strengths:["Pas","Teknik"] },
  { name:"Soner Aydogdu", team:"Samsunspor", position:"Kaleci", age:30, marketValue:2.1, goals:0, assists:1, minutes:1327, bigMatch:80, form:87, story:"2025-26 sezonunda takÄ±mÄ±nÄ±n Kaleci bÃ¶lgesinde istikrarlÄ± performansÄ± ve kalitesiyle kadro derinliÄŸine Ã¶nemli katkÄ± saÄŸladÄ±.", career:["Samsunspor"], strengths:["Refleks","KurtarÄ±ÅŸ"] },
  { name:"Soner Gonul", team:"Samsunspor", position:"Forvet", age:20, marketValue:2.7, goals:11, assists:1, minutes:1238, bigMatch:71, form:75, story:"2025-26 sezonunda takÄ±mÄ±nÄ±n Forvet bÃ¶lgesinde istikrarlÄ± performansÄ± ve kalitesiyle kadro derinliÄŸine Ã¶nemli katkÄ± saÄŸladÄ±.", career:["Samsunspor"], strengths:["Pas","Teknik"] },
  { name:"Mustafa Tan", team:"Samsunspor", position:"Kanat", age:27, marketValue:2.5, goals:11, assists:2, minutes:1269, bigMatch:76, form:72, story:"2025-26 sezonunda takÄ±mÄ±nÄ±n Kanat bÃ¶lgesinde istikrarlÄ± performansÄ± ve kalitesiyle kadro derinliÄŸine Ã¶nemli katkÄ± saÄŸladÄ±.", career:["Samsunspor"], strengths:["Pas","Teknik"] },
  { name:"Celil Yuksel", team:"Samsunspor", position:"Orta saha", age:27, marketValue:1.8, goals:2, assists:9, minutes:1739, bigMatch:82, form:77, story:"2025-26 sezonunda takÄ±mÄ±nÄ±n Orta saha bÃ¶lgesinde istikrarlÄ± performansÄ± ve kalitesiyle kadro derinliÄŸine Ã¶nemli katkÄ± saÄŸladÄ±.", career:["Samsunspor"], strengths:["Pas","Teknik"] },
  { name:"Ercan Kara", team:"Samsunspor", position:"Orta saha", age:24, marketValue:1.2, goals:2, assists:2, minutes:1236, bigMatch:73, form:83, story:"2025-26 sezonunda takÄ±mÄ±nÄ±n Orta saha bÃ¶lgesinde istikrarlÄ± performansÄ± ve kalitesiyle kadro derinliÄŸine Ã¶nemli katkÄ± saÄŸladÄ±.", career:["Samsunspor"], strengths:["Pas","Teknik"] },
  { name:"Benito Raman", team:"Samsunspor", position:"Defans", age:20, marketValue:2.9, goals:2, assists:2, minutes:1761, bigMatch:77, form:84, story:"2025-26 sezonunda takÄ±mÄ±nÄ±n Defans bÃ¶lgesinde istikrarlÄ± performansÄ± ve kalitesiyle kadro derinliÄŸine Ã¶nemli katkÄ± saÄŸladÄ±.", career:["Samsunspor"], strengths:["Markaj","Hava Topu"] },
  { name:"Mickael Tirpan", team:"Samsunspor", position:"Defans", age:28, marketValue:1.1, goals:2, assists:1, minutes:2041, bigMatch:71, form:70, story:"2025-26 sezonunda takÄ±mÄ±nÄ±n Defans bÃ¶lgesinde istikrarlÄ± performansÄ± ve kalitesiyle kadro derinliÄŸine Ã¶nemli katkÄ± saÄŸladÄ±.", career:["Samsunspor"], strengths:["Markaj","Hava Topu"] },
  { name:"Haluk Mustafa", team:"Samsunspor", position:"Defans", age:26, marketValue:2.7, goals:0, assists:2, minutes:2261, bigMatch:71, form:77, story:"2025-26 sezonunda takÄ±mÄ±nÄ±n Defans bÃ¶lgesinde istikrarlÄ± performansÄ± ve kalitesiyle kadro derinliÄŸine Ã¶nemli katkÄ± saÄŸladÄ±.", career:["Samsunspor"], strengths:["Markaj","Hava Topu"] },
  { name:"Nanu", team:"Samsunspor", position:"Kaleci", age:26, marketValue:2.0, goals:1, assists:2, minutes:1404, bigMatch:73, form:78, story:"2025-26 sezonunda takÄ±mÄ±nÄ±n Kaleci bÃ¶lgesinde istikrarlÄ± performansÄ± ve kalitesiyle kadro derinliÄŸine Ã¶nemli katkÄ± saÄŸladÄ±.", career:["Samsunspor"], strengths:["Refleks","KurtarÄ±ÅŸ"] },
  { name:"ErtuÄŸrul TaÅŸkÄ±ran", team:"Alanyaspor", position:"Kaleci", age:36, marketValue:0.1, goals:0, assists:0, minutes:3400, bigMatch:85, form:88, story:"TecrÃ¼beli kaleci Alanyaspor kalesinde gÃ¶sterdiÄŸi kurtarÄ±ÅŸlarla takÄ±mÄ±nÄ±n en gÃ¼vendiÄŸi isimlerden biri oldu.", career:["Fenerbahce","KasÄ±mpaÅŸa","Alanyaspor"], strengths:["Refleks","TecrÃ¼be","Liderlik"] },
  { name:"Ianis Hagi", team:"Alanyaspor", position:"Orta saha", age:27, marketValue:2.5, goals:6, assists:9, minutes:2400, bigMatch:84, form:85, story:"Alanyaspor orta sahasÄ±nda oyun zekasÄ±, teknik kalitesi ve 9 asistiyle takÄ±mÄ±n oyun kurucu lideri oldu.", career:["Fiorentina","Genk","Rangers","Alaves","Alanyaspor"], strengths:["Teknik","Pas","Oyun GÃ¶rÃ¼ÅŸÃ¼"] },
  { name:"Florent Hadergjonaj", team:"Alanyaspor", position:"Defans", age:30, marketValue:2.0, goals:1, assists:4, minutes:2700, bigMatch:81, form:82, story:"Ä°sviÃ§reli Kosova asÄ±llÄ± saÄŸ bek, Premier Lig geÃ§miÅŸiyle Alanyaspor'un saÄŸ kulvarÄ±nÄ± kaliteli biÃ§imde yÃ¶netti.", career:["Huddersfield","Inter","Alanyaspor"], strengths:["HÄ±z","Savunma","Orta"] },
  { name:"Fidan Aliti", team:"Alanyaspor", position:"Defans", age:27, marketValue:2.0, goals:1, assists:3, minutes:2800, bigMatch:81, form:82, story:"KosovalÄ± sol bek, sol kulvarda hem savunma hem hÃ¼cuma katkÄ±sÄ±yla sezonun en dikkat Ã§ekici defans oyuncularÄ±ndan biri oldu.", career:["Winterthur","Ã‡eÅŸitli","Alanyaspor"], strengths:["HÄ±z","Orta","Fizik"] },
  { name:"Bruno Viana", team:"Alanyaspor", position:"Defans", age:29, marketValue:2.5, goals:2, assists:1, minutes:2900, bigMatch:82, form:83, story:"Portekizli stoper, Braga ve Ã‡eÅŸitli bÃ¼yÃ¼k kulÃ¼plerin geÃ§miÅŸiyle Alanyaspor savunmasÄ±nÄ±n direÄŸi oldu.", career:["Braga","Rangers","Alanyaspor"], strengths:["GÃ¼Ã§","Hava Topu","Markaj"] },
  { name:"Gaius Makouta", team:"Alanyaspor", position:"Orta saha", age:26, marketValue:2.5, goals:3, assists:5, minutes:2600, bigMatch:82, form:83, story:"Kongo asÄ±llÄ± FransÄ±z defansif orta saha, top kapma kapasitesi ve iÅŸ gÃ¼cÃ¼yle Alanyaspor'un orta saha motorunu oluÅŸturdu.", career:["Toulouse","Alanyaspor"], strengths:["Top Kapma","Dinamizm","Fizik"] },
  { name:"GÃ¼ven YalÃ§Ä±n", team:"Alanyaspor", position:"Forvet", age:27, marketValue:4.0, goals:14, assists:4, minutes:2800, bigMatch:86, form:87, story:"Milli golcÃ¼, 14 golle ligin en etkin TÃ¼rk santrforu unvanÄ±nÄ± alarak Alanyaspor'un sezonunu taÅŸÄ±dÄ±.", career:["BeÅŸiktaÅŸ","Alanyaspor"], strengths:["Bitiricilik","Hava Topu","Pozisyon Alma"] },
  { name:"Ui-Jo Hwang", team:"Alanyaspor", position:"Forvet", age:33, marketValue:3.0, goals:9, assists:3, minutes:2300, bigMatch:83, form:84, story:"GÃ¼ney Koreli milli golcÃ¼, tecrÃ¼be ve bitiriciliÄŸiyle Alanyaspor'un GÃ¼ven YalÃ§Ä±n'Ä±n ortaÄŸÄ± olarak etkili bir sezon geÃ§irdi.", career:["Bordeaux","Nottingham Forest","Alanyaspor"], strengths:["Bitiricilik","HÄ±z","TecrÃ¼be"] },
  { name:"Meschack Elia", team:"Alanyaspor", position:"Kanat", age:26, marketValue:3.5, goals:7, assists:10, minutes:2600, bigMatch:84, form:85, story:"Kongolu hÄ±zlÄ± kanat, explosif oyunu ve 17 skor katkÄ±sÄ±yla Alanyaspor'un en tehlikeli silahlarÄ±ndan biri oldu.", career:["Young Boys","Alanyaspor"], strengths:["HÄ±z","Dribbling","Asist"] },
  { name:"Steve MouniÃ©", team:"Alanyaspor", position:"Forvet", age:30, marketValue:3.0, goals:8, assists:2, minutes:2100, bigMatch:82, form:83, story:"Beninli gÃ¼Ã§lÃ¼ forvet, hava toplarÄ±ndaki ve zemindeki etkinliÄŸiyle Alanyaspor'un alternatifsiz hÃ¼cum seÃ§eneÄŸi oldu.", career:["Huddersfield","Brest","Alanyaspor"], strengths:["Hava Topu","GÃ¼Ã§","Bitiricilik"] },
  { name:"Loide Augusto", team:"Alanyaspor", position:"Defans", age:20, marketValue:2.2, goals:0, assists:0, minutes:1830, bigMatch:75, form:86, story:"2025-26 sezonunda takÄ±mÄ±nÄ±n Defans bÃ¶lgesinde istikrarlÄ± performansÄ± ve kalitesiyle kadro derinliÄŸine Ã¶nemli katkÄ± saÄŸladÄ±.", career:["Alanyaspor"], strengths:["Markaj","Hava Topu"] },
  { name:"Richard Coelho", team:"Alanyaspor", position:"Kaleci", age:29, marketValue:1.8, goals:0, assists:1, minutes:2260, bigMatch:82, form:83, story:"2025-26 sezonunda takÄ±mÄ±nÄ±n Kaleci bÃ¶lgesinde istikrarlÄ± performansÄ± ve kalitesiyle kadro derinliÄŸine Ã¶nemli katkÄ± saÄŸladÄ±.", career:["Alanyaspor"], strengths:["Refleks","KurtarÄ±ÅŸ"] },
  { name:"Jure Balkovec", team:"Alanyaspor", position:"Kaleci", age:22, marketValue:1.7, goals:1, assists:0, minutes:1294, bigMatch:84, form:77, story:"2025-26 sezonunda takÄ±mÄ±nÄ±n Kaleci bÃ¶lgesinde istikrarlÄ± performansÄ± ve kalitesiyle kadro derinliÄŸine Ã¶nemli katkÄ± saÄŸladÄ±.", career:["Alanyaspor"], strengths:["Refleks","KurtarÄ±ÅŸ"] },
  { name:"Nicolas Janvier", team:"Alanyaspor", position:"Forvet", age:27, marketValue:2.2, goals:4, assists:2, minutes:1284, bigMatch:82, form:70, story:"2025-26 sezonunda takÄ±mÄ±nÄ±n Forvet bÃ¶lgesinde istikrarlÄ± performansÄ± ve kalitesiyle kadro derinliÄŸine Ã¶nemli katkÄ± saÄŸladÄ±.", career:["Alanyaspor"], strengths:["Pas","Teknik"] },
  { name:"Nuno Lima", team:"Alanyaspor", position:"Defans", age:29, marketValue:2.2, goals:1, assists:0, minutes:1059, bigMatch:81, form:84, story:"2025-26 sezonunda takÄ±mÄ±nÄ±n Defans bÃ¶lgesinde istikrarlÄ± performansÄ± ve kalitesiyle kadro derinliÄŸine Ã¶nemli katkÄ± saÄŸladÄ±.", career:["Alanyaspor"], strengths:["Markaj","Hava Topu"] },
  { name:"Efecan Karaca", team:"Alanyaspor", position:"Kaleci", age:33, marketValue:3.0, goals:0, assists:0, minutes:2118, bigMatch:71, form:76, story:"2025-26 sezonunda takÄ±mÄ±nÄ±n Kaleci bÃ¶lgesinde istikrarlÄ± performansÄ± ve kalitesiyle kadro derinliÄŸine Ã¶nemli katkÄ± saÄŸladÄ±.", career:["Alanyaspor"], strengths:["Refleks","KurtarÄ±ÅŸ"] },
  { name:"Bohan Giyano", team:"Alanyaspor", position:"Kanat", age:31, marketValue:0.9, goals:10, assists:8, minutes:1841, bigMatch:72, form:72, story:"2025-26 sezonunda takÄ±mÄ±nÄ±n Kanat bÃ¶lgesinde istikrarlÄ± performansÄ± ve kalitesiyle kadro derinliÄŸine Ã¶nemli katkÄ± saÄŸladÄ±.", career:["Alanyaspor"], strengths:["Pas","Teknik"] },
  { name:"Yusuf Ozdemir", team:"Alanyaspor", position:"Kaleci", age:23, marketValue:0.8, goals:2, assists:2, minutes:1128, bigMatch:84, form:85, story:"2025-26 sezonunda takÄ±mÄ±nÄ±n Kaleci bÃ¶lgesinde istikrarlÄ± performansÄ± ve kalitesiyle kadro derinliÄŸine Ã¶nemli katkÄ± saÄŸladÄ±.", career:["Alanyaspor"], strengths:["Refleks","KurtarÄ±ÅŸ"] },
  { name:"Furkan Bayir", team:"Alanyaspor", position:"Forvet", age:26, marketValue:2.9, goals:8, assists:0, minutes:1412, bigMatch:80, form:72, story:"2025-26 sezonunda takÄ±mÄ±nÄ±n Forvet bÃ¶lgesinde istikrarlÄ± performansÄ± ve kalitesiyle kadro derinliÄŸine Ã¶nemli katkÄ± saÄŸladÄ±.", career:["Alanyaspor"], strengths:["Pas","Teknik"] },
  { name:"Serdar Dursun", team:"Alanyaspor", position:"Orta saha", age:29, marketValue:2.0, goals:1, assists:3, minutes:2286, bigMatch:71, form:73, story:"2025-26 sezonunda takÄ±mÄ±nÄ±n Orta saha bÃ¶lgesinde istikrarlÄ± performansÄ± ve kalitesiyle kadro derinliÄŸine Ã¶nemli katkÄ± saÄŸladÄ±.", career:["Alanyaspor"], strengths:["Pas","Teknik"] },
  { name:"Ramon Lopes", team:"Alanyaspor", position:"Orta saha", age:24, marketValue:2.1, goals:0, assists:2, minutes:1018, bigMatch:73, form:84, story:"2025-26 sezonunda takÄ±mÄ±nÄ±n Orta saha bÃ¶lgesinde istikrarlÄ± performansÄ± ve kalitesiyle kadro derinliÄŸine Ã¶nemli katkÄ± saÄŸladÄ±.", career:["Alanyaspor"], strengths:["Pas","Teknik"] },
  { name:"Eduardo Duarte", team:"Alanyaspor", position:"Orta saha", age:27, marketValue:1.7, goals:2, assists:9, minutes:1065, bigMatch:83, form:87, story:"2025-26 sezonunda takÄ±mÄ±nÄ±n Orta saha bÃ¶lgesinde istikrarlÄ± performansÄ± ve kalitesiyle kadro derinliÄŸine Ã¶nemli katkÄ± saÄŸladÄ±.", career:["Alanyaspor"], strengths:["Pas","Teknik"] },
  { name:"Mert Selim", team:"Alanyaspor", position:"Forvet", age:22, marketValue:1.2, goals:10, assists:2, minutes:1661, bigMatch:72, form:76, story:"2025-26 sezonunda takÄ±mÄ±nÄ±n Forvet bÃ¶lgesinde istikrarlÄ± performansÄ± ve kalitesiyle kadro derinliÄŸine Ã¶nemli katkÄ± saÄŸladÄ±.", career:["Alanyaspor"], strengths:["Pas","Teknik"] },
  { name:"Mustafa KÄ±lÄ±Ã§", team:"Alanyaspor", position:"Kaleci", age:33, marketValue:2.6, goals:1, assists:0, minutes:1031, bigMatch:78, form:73, story:"Kadro derinliÄŸi ve rotasyonda teknik direktÃ¶rÃ¼n elini gÃ¼Ã§lendiren, 2025-26 sezonu kadro oyuncusu.", career:["Alanyaspor"], strengths:["Refleks","KurtarÄ±ÅŸ"] },
  { name:"Pierre Silva", team:"Alanyaspor", position:"Forvet", age:31, marketValue:1.1, goals:2, assists:0, minutes:1572, bigMatch:76, form:84, story:"Kadro derinliÄŸi ve rotasyonda teknik direktÃ¶rÃ¼n elini gÃ¼Ã§lendiren, 2025-26 sezonu kadro oyuncusu.", career:["Alanyaspor"], strengths:["Pas","MÃ¼cadele"] },
  { name:"Mohamed Bayo", team:"Gaziantep FK", position:"Forvet", age:27, marketValue:4.5, goals:15, assists:4, minutes:2300, bigMatch:84, form:87, story:"Lille'den kiralanan santrfor, 15 golle Gaziantep'i ligde tutan en bÃ¼yÃ¼k hÃ¼cum gÃ¼cÃ¼ oldu.", career:["Clermont","Lille","Gaziantep FK"], strengths:["Bitiricilik","Fizik","Ceza SahasÄ±"] },
  { name:"Kacper Kozlowski", team:"Gaziantep FK", position:"Orta saha", age:22, marketValue:6.0, goals:5, assists:8, minutes:2500, bigMatch:81, form:84, story:"Gaziantep FK orta sahasÄ±nda dinamizmi ve 8 asistiyle fark yaratan PolonyalÄ± genÃ§ yÄ±ldÄ±z, ligin gÃ¶zdesi oldu.", career:["Pogon","Brighton","Vitesse","Gaziantep FK"], strengths:["Pas kalitesi","YaratÄ±cÄ±lÄ±k","Asist"] },
  { name:"Mustafa Burak Bozan", team:"Gaziantep FK", position:"Kaleci", age:25, marketValue:1.5, goals:0, assists:0, minutes:3100, bigMatch:80, form:81, story:"GenÃ§ TÃ¼rk kaleci, Gaziantep kalesinde sergilediÄŸi olgun performansla sezonun en tutarlÄ± file bekÃ§ilerinden biri oldu.", career:["Gaziantep FK"], strengths:["Refleks","Bire Bir","Liderlik"] },
  { name:"NazÄ±m SangarÃ©", team:"Gaziantep FK", position:"Defans", age:29, marketValue:2.0, goals:1, assists:1, minutes:2800, bigMatch:81, form:82, story:"FransÄ±z-Gine asÄ±llÄ± stoper, gÃ¼Ã§lÃ¼ fiziÄŸi ve hava topu hakimiyetiyle Gaziantep savunmasÄ±nÄ±n temel taÅŸÄ± oldu.", career:["Auxerre","Gaziantep FK"], strengths:["Fizik","Hava Topu","GÃ¼Ã§"] },
  { name:"Myenty Abena", team:"Gaziantep FK", position:"Defans", age:26, marketValue:1.8, goals:1, assists:2, minutes:2700, bigMatch:80, form:81, story:"Kamerunlu stoper, savunma disiplini ve fiziksel Ã¼stÃ¼nlÃ¼ÄŸÃ¼yle Gaziantep'in arka hattÄ±nÄ± saÄŸlamlaÅŸtÄ±rdÄ±.", career:["Ã‡eÅŸitli","Gaziantep FK"], strengths:["GÃ¼Ã§","Markaj","Hava Topu"] },
  { name:"KÃ©vin Rodrigues", team:"Gaziantep FK", position:"Defans", age:29, marketValue:2.0, goals:0, assists:5, minutes:2600, bigMatch:80, form:81, story:"Portekizli sol bek, hÃ¼cum bindirmeleri ve ortalarÄ±yla sol kulvarÄ± canlandÄ±rdÄ±.", career:["Sporting CP","Ã‡eÅŸitli","Gaziantep FK"], strengths:["HÄ±z","Orta","HÃ¼cum KatÄ±lÄ±mÄ±"] },
  { name:"Kacper KozÅ‚owski", team:"Gaziantep FK", position:"Orta saha", age:22, marketValue:6.0, goals:5, assists:8, minutes:2500, bigMatch:84, form:85, story:"Polonya'nÄ±n en bÃ¼yÃ¼k genÃ§ yeteneÄŸi, yaratÄ±cÄ± oyun anlayÄ±ÅŸÄ± ve 13 skor katkÄ±sÄ±yla sezonun sÃ¼rprizi oldu.", career:["Brighton","Gaziantep FK"], strengths:["Teknik","YaratÄ±cÄ±lÄ±k","Potansiyel"] },
  { name:"Alexandru Maxim", team:"Gaziantep FK", position:"Orta saha", age:35, marketValue:1.0, goals:4, assists:7, minutes:2300, bigMatch:82, form:82, story:"Romanya'nÄ±n efsane oyun kurucusu, 15 skor katkÄ±sÄ±yla yaÅŸÄ±na raÄŸmen Gaziantep'in en kritik oyuncularÄ±ndan biri olmaya devam etti.", career:["Stuttgart","Mainz","Gaziantep FK"], strengths:["Pas","Duran Top","Oyun GÃ¶rÃ¼ÅŸÃ¼"] },
  { name:"Juninho Bacuna", team:"Gaziantep FK", position:"Orta saha", age:28, marketValue:2.5, goals:5, assists:6, minutes:2600, bigMatch:82, form:83, story:"HollandalÄ± kutu-kutu orta saha, hem gol hem asist Ã¼retimiyle Gaziantep FK'nÄ±n dinamosu oldu.", career:["Birmingham","Rangers","Gaziantep FK"], strengths:["Dinamizm","Gol","MÃ¼cadele"] },
  { name:"Yusuf KabadayÄ±", team:"Gaziantep FK", position:"Kanat", age:20, marketValue:5.0, goals:6, assists:9, minutes:2400, bigMatch:84, form:85, story:"Bayern MÃ¼nih akademisinden yetiÅŸen TÃ¼rk genÃ§ yÄ±ldÄ±zÄ±, 15 skor katkÄ±sÄ±yla SÃ¼per Lig'de mÃ¼thiÅŸ bir ilk sezonu geÃ§irdi.", career:["Bayern MÃ¼nih","Gaziantep FK"], strengths:["HÄ±z","Teknik","Potansiyel"] },
  { name:"Christopher Lungoyi", team:"Gaziantep FK", position:"Kanat", age:22, marketValue:3.0, goals:7, assists:5, minutes:2200, bigMatch:82, form:84, story:"Kongolu genÃ§ kanat yÄ±ldÄ±zÄ±, hÄ±zÄ± ve bitiriciliÄŸiyle Gaziantep saldÄ±rÄ±sÄ±na farklÄ± bir boyut kattÄ±.", career:["Club Brugge","Gaziantep FK"], strengths:["HÄ±z","Dribbling","Gol"] },
  { name:"Deian Sorescu", team:"Gaziantep FK", position:"Defans", age:25, marketValue:2.1, goals:1, assists:1, minutes:1074, bigMatch:78, form:74, story:"2025-26 sezonunda takÄ±mÄ±nÄ±n Defans bÃ¶lgesinde istikrarlÄ± performansÄ± ve kalitesiyle kadro derinliÄŸine Ã¶nemli katkÄ± saÄŸladÄ±.", career:["Gaziantep FK"], strengths:["Markaj","Hava Topu"] },
  { name:"David Okereke", team:"Gaziantep FK", position:"Orta saha", age:33, marketValue:0.9, goals:0, assists:2, minutes:2446, bigMatch:79, form:72, story:"2025-26 sezonunda takÄ±mÄ±nÄ±n Orta saha bÃ¶lgesinde istikrarlÄ± performansÄ± ve kalitesiyle kadro derinliÄŸine Ã¶nemli katkÄ± saÄŸladÄ±.", career:["Gaziantep FK"], strengths:["Pas","Teknik"] },
  { name:"Kenan Kodro", team:"Gaziantep FK", position:"Forvet", age:29, marketValue:1.7, goals:4, assists:1, minutes:1008, bigMatch:81, form:77, story:"2025-26 sezonunda takÄ±mÄ±nÄ±n Forvet bÃ¶lgesinde istikrarlÄ± performansÄ± ve kalitesiyle kadro derinliÄŸine Ã¶nemli katkÄ± saÄŸladÄ±.", career:["Gaziantep FK"], strengths:["Pas","Teknik"] },
  { name:"Stephen Bitok", team:"Gaziantep FK", position:"Orta saha", age:20, marketValue:1.2, goals:1, assists:6, minutes:1889, bigMatch:74, form:79, story:"2025-26 sezonunda takÄ±mÄ±nÄ±n Orta saha bÃ¶lgesinde istikrarlÄ± performansÄ± ve kalitesiyle kadro derinliÄŸine Ã¶nemli katkÄ± saÄŸladÄ±.", career:["Gaziantep FK"], strengths:["Pas","Teknik"] },
  { name:"Arda Kizildag", team:"Gaziantep FK", position:"Orta saha", age:21, marketValue:2.2, goals:0, assists:4, minutes:1570, bigMatch:76, form:85, story:"2025-26 sezonunda takÄ±mÄ±nÄ±n Orta saha bÃ¶lgesinde istikrarlÄ± performansÄ± ve kalitesiyle kadro derinliÄŸine Ã¶nemli katkÄ± saÄŸladÄ±.", career:["Gaziantep FK"], strengths:["Pas","Teknik"] },
  { name:"OgÃ¼n Ã–zÃ§iÃ§ek", team:"Gaziantep FK", position:"Kanat", age:33, marketValue:1.4, goals:5, assists:4, minutes:1318, bigMatch:83, form:85, story:"2025-26 sezonunda takÄ±mÄ±nÄ±n Kanat bÃ¶lgesinde istikrarlÄ± performansÄ± ve kalitesiyle kadro derinliÄŸine Ã¶nemli katkÄ± saÄŸladÄ±.", career:["Gaziantep FK"], strengths:["Pas","Teknik"] },
  { name:"Enric Saborit", team:"Gaziantep FK", position:"Defans", age:20, marketValue:1.2, goals:1, assists:0, minutes:1767, bigMatch:76, form:73, story:"2025-26 sezonunda takÄ±mÄ±nÄ±n Defans bÃ¶lgesinde istikrarlÄ± performansÄ± ve kalitesiyle kadro derinliÄŸine Ã¶nemli katkÄ± saÄŸladÄ±.", career:["Gaziantep FK"], strengths:["Markaj","Hava Topu"] },
  { name:"Halil Ibrahim", team:"Gaziantep FK", position:"Kanat", age:25, marketValue:0.6, goals:5, assists:7, minutes:1140, bigMatch:79, form:85, story:"2025-26 sezonunda takÄ±mÄ±nÄ±n Kanat bÃ¶lgesinde istikrarlÄ± performansÄ± ve kalitesiyle kadro derinliÄŸine Ã¶nemli katkÄ± saÄŸladÄ±.", career:["Gaziantep FK"], strengths:["Pas","Teknik"] },
  { name:"Cenk Sahin", team:"Gaziantep FK", position:"Kanat", age:29, marketValue:1.8, goals:10, assists:3, minutes:1857, bigMatch:82, form:77, story:"2025-26 sezonunda takÄ±mÄ±nÄ±n Kanat bÃ¶lgesinde istikrarlÄ± performansÄ± ve kalitesiyle kadro derinliÄŸine Ã¶nemli katkÄ± saÄŸladÄ±.", career:["Gaziantep FK"], strengths:["Pas","Teknik"] },
  { name:"Salem M'Bakata", team:"Gaziantep FK", position:"Defans", age:30, marketValue:1.8, goals:1, assists:1, minutes:1663, bigMatch:70, form:75, story:"2025-26 sezonunda takÄ±mÄ±nÄ±n Defans bÃ¶lgesinde istikrarlÄ± performansÄ± ve kalitesiyle kadro derinliÄŸine Ã¶nemli katkÄ± saÄŸladÄ±.", career:["Gaziantep FK"], strengths:["Markaj","Hava Topu"] },
  { name:"Cyril Mandouki", team:"Gaziantep FK", position:"Kaleci", age:26, marketValue:1.0, goals:1, assists:0, minutes:2283, bigMatch:77, form:71, story:"2025-26 sezonunda takÄ±mÄ±nÄ±n Kaleci bÃ¶lgesinde istikrarlÄ± performansÄ± ve kalitesiyle kadro derinliÄŸine Ã¶nemli katkÄ± saÄŸladÄ±.", career:["Gaziantep FK"], strengths:["Refleks","KurtarÄ±ÅŸ"] },
  { name:"Valmir Veliu", team:"Gaziantep FK", position:"Kanat", age:28, marketValue:1.3, goals:11, assists:4, minutes:1135, bigMatch:72, form:79, story:"2025-26 sezonunda takÄ±mÄ±nÄ±n Kanat bÃ¶lgesinde istikrarlÄ± performansÄ± ve kalitesiyle kadro derinliÄŸine Ã¶nemli katkÄ± saÄŸladÄ±.", career:["Gaziantep FK"], strengths:["Pas","Teknik"] },
  { name:"Quentin Daubin", team:"Gaziantep FK", position:"Defans", age:28, marketValue:1.8, goals:2, assists:1, minutes:2488, bigMatch:81, form:81, story:"2025-26 sezonunda takÄ±mÄ±nÄ±n Defans bÃ¶lgesinde istikrarlÄ± performansÄ± ve kalitesiyle kadro derinliÄŸine Ã¶nemli katkÄ± saÄŸladÄ±.", career:["Gaziantep FK"], strengths:["Markaj","Hava Topu"] },
  { name:"Badou Ndiaye", team:"Gaziantep FK", position:"Defans", age:32, marketValue:0.9, goals:0, assists:2, minutes:2251, bigMatch:79, form:73, story:"2025-26 sezonunda takÄ±mÄ±nÄ±n Defans bÃ¶lgesinde istikrarlÄ± performansÄ± ve kalitesiyle kadro derinliÄŸine Ã¶nemli katkÄ± saÄŸladÄ±.", career:["Gaziantep FK"], strengths:["Markaj","Hava Topu"] },
  { name:"Henry Onyekuru", team:"Genclerbirligi", position:"Kanat", age:28, marketValue:1.0, goals:7, assists:8, minutes:1900, bigMatch:80, form:82, story:"GenÃ§lerbirliÄŸi'nde eski gÃ¼nlerine dÃ¶nen Onyekuru, 7 gol and 8 asistlik sÃ¼ratli oyunuyla parladÄ±.", career:["Eupen","Everton","Galatasaray","Monaco","Olympiacos","Adana Demirspor","Genclerbirligi"], strengths:["HÄ±z","Dribbling","YaratÄ±cÄ±lÄ±k"] },
  { name:"M'Baye Niang", team:"Genclerbirligi", position:"Forvet", age:31, marketValue:0.8, goals:8, assists:3, minutes:1800, bigMatch:79, form:81, story:"TecrÃ¼beli santrfor, gÃ¼cÃ¼ ve attÄ±ÄŸÄ± 8 kritik golle takÄ±mÄ±nÄ±n gol yÃ¼kÃ¼nÃ¼ taÅŸÄ±dÄ±.", career:["Milan","Montpellier","Rennes","Torino","Adana Demirspor","Genclerbirligi"], strengths:["Fizik","Åut","Hava Topu"] },
  { name:"GÃ¶khan Akkan", team:"Genclerbirligi", position:"Kaleci", age:27, marketValue:2.0, goals:0, assists:0, minutes:2900, bigMatch:81, form:82, story:"Milli kaleci, GenÃ§lerbirliÄŸi'nin sÃ¼per lig dÃ¶nÃ¼ÅŸÃ¼nde kale Ã§izgisinin gÃ¼vencesi oldu.", career:["GenÃ§lerbirliÄŸi","Hatayspor","Genclerbirligi"], strengths:["Refleks","Bire Bir","Liderlik"] },
  { name:"Dimitris Goutas", team:"Genclerbirligi", position:"Defans", age:27, marketValue:2.5, goals:2, assists:1, minutes:2800, bigMatch:82, form:83, story:"Yunan milli takÄ±mÄ±nÄ±n tecrÃ¼beli stoperi, savunma liderliÄŸi ve hava topu gÃ¼cÃ¼yle GenÃ§lerbirliÄŸi'nin en deÄŸerli defans oyuncusu oldu.", career:["PAOK","Rangers","Genclerbirligi"], strengths:["GÃ¼Ã§","Hava Topu","Liderlik"] },
  { name:"Zan Zuzek", team:"Genclerbirligi", position:"Defans", age:27, marketValue:2.5, goals:1, assists:2, minutes:2700, bigMatch:81, form:82, story:"Sloven milli takÄ±mÄ±nÄ±n solak stoperi, topla Ã§Ä±kÄ±ÅŸ kalitesi ve saÄŸlam savunmasÄ±yla Ã¶ne Ã§Ä±ktÄ±.", career:["Olimpija","Genclerbirligi"], strengths:["Pas","Savunma","Topla Ã‡Ä±kÄ±ÅŸ"] },
  { name:"Oghenekaro Etebo", team:"Genclerbirligi", position:"Orta saha", age:30, marketValue:3.0, goals:4, assists:6, minutes:2700, bigMatch:83, form:84, story:"NijeryalÄ± merkez orta saha, yÄ±lmaz mÃ¼cadelesi ve fiziksel Ã¼stÃ¼nlÃ¼ÄŸÃ¼yle GenÃ§lerbirliÄŸi'nin orta saha baskÄ±sÄ±nÄ± oluÅŸturdu.", career:["Getafe","Stoke City","Genclerbirligi"], strengths:["Fizik","MÃ¼cadele","Top Kapma"] },
  { name:"Tom Dele-Bashiru", team:"Genclerbirligi", position:"Orta saha", age:25, marketValue:4.0, goals:5, assists:7, minutes:2600, bigMatch:84, form:85, story:"Ä°ngiliz-NijeryalÄ± yÄ±ldÄ±z aday, atletizmi ve maÃ§ etkisiyle GenÃ§lerbirliÄŸi'nin orta sahasÄ±nÄ± defalarca fark yarattÄ±.", career:["Watford","Rangers","Genclerbirligi"], strengths:["Fizik","Dinamizm","BÃ¼yÃ¼k MaÃ§"] },
  { name:"Mbaye Niang", team:"Genclerbirligi", position:"Forvet", age:30, marketValue:1.5, goals:8, assists:3, minutes:2100, bigMatch:81, form:82, story:"FransÄ±z-Senegalli golcÃ¼, AC Milan ve birÃ§ok bÃ¼yÃ¼k kulÃ¼pten geÃ§en tecrÃ¼be ile GenÃ§lerbirliÄŸi'nde gol yaÄŸmuruna devam etti.", career:["AC Milan","Torino","Genclerbirligi"], strengths:["Bitiricilik","Fizik","TecrÃ¼be"] },
  { name:"SÃ©kou KoÃ¯ta", team:"Genclerbirligi", position:"Kanat", age:25, marketValue:3.0, goals:6, assists:9, minutes:2400, bigMatch:83, form:84, story:"Gine asÄ±llÄ± AvusturyalÄ± hÄ±zlÄ± kanat yÄ±ldÄ±zÄ±, Salzburg'un ardÄ±ndan GenÃ§lerbirliÄŸi'nde kanatlarÄ± ateÅŸledi.", career:["Red Bull Salzburg","Genclerbirligi"], strengths:["HÄ±z","Dribbling","Fizik"] },
  { name:"Pedro Pereira", team:"Genclerbirligi", position:"Defans", age:28, marketValue:2.0, goals:1, assists:4, minutes:2600, bigMatch:80, form:81, story:"Portekizli saÄŸ bek, hÃ¼cum katkÄ±larÄ± ve orta kalitesiyle GenÃ§lerbirliÄŸi'nin saÄŸ kulvarÄ±nÄ± hakimiyeti altÄ±na aldÄ±.", career:["Sporting CP","Genclerbirligi"], strengths:["HÄ±z","Orta","HÃ¼cum KatÄ±lÄ±mÄ±"] },
  { name:"Franco Tongya", team:"Genclerbirligi", position:"Orta saha", age:23, marketValue:3.0, goals:4, assists:7, minutes:2200, bigMatch:82, form:84, story:"FransÄ±z-Ä°talyan genÃ§ yetenekli oyuncu, Juventus akademisinden gelen Tongya, GenÃ§lerbirliÄŸi'nde sezonun en parlak yeni isimleri arasÄ±na girdi.", career:["Juventus","Genclerbirligi"], strengths:["Teknik","YaratÄ±cÄ±lÄ±k","Potansiyel"] },
  { name:"Amilton", team:"Genclerbirligi", position:"Defans", age:30, marketValue:0.6, goals:0, assists:2, minutes:1149, bigMatch:79, form:84, story:"2025-26 sezonunda takÄ±mÄ±nÄ±n Defans bÃ¶lgesinde istikrarlÄ± performansÄ± ve kalitesiyle kadro derinliÄŸine Ã¶nemli katkÄ± saÄŸladÄ±.", career:["Genclerbirligi"], strengths:["Markaj","Hava Topu"] },
  { name:"Aias Aosman", team:"Genclerbirligi", position:"Kaleci", age:28, marketValue:0.6, goals:1, assists:0, minutes:2382, bigMatch:71, form:72, story:"2025-26 sezonunda takÄ±mÄ±nÄ±n Kaleci bÃ¶lgesinde istikrarlÄ± performansÄ± ve kalitesiyle kadro derinliÄŸine Ã¶nemli katkÄ± saÄŸladÄ±.", career:["Genclerbirligi"], strengths:["Refleks","KurtarÄ±ÅŸ"] },
  { name:"Metehan Mimaroglu", team:"Genclerbirligi", position:"Orta saha", age:21, marketValue:0.8, goals:2, assists:8, minutes:1550, bigMatch:81, form:73, story:"2025-26 sezonunda takÄ±mÄ±nÄ±n Orta saha bÃ¶lgesinde istikrarlÄ± performansÄ± ve kalitesiyle kadro derinliÄŸine Ã¶nemli katkÄ± saÄŸladÄ±.", career:["Genclerbirligi"], strengths:["Pas","Teknik"] },
  { name:"Sinan Kilic", team:"Genclerbirligi", position:"Kanat", age:28, marketValue:0.8, goals:5, assists:7, minutes:1287, bigMatch:73, form:85, story:"2025-26 sezonunda takÄ±mÄ±nÄ±n Kanat bÃ¶lgesinde istikrarlÄ± performansÄ± ve kalitesiyle kadro derinliÄŸine Ã¶nemli katkÄ± saÄŸladÄ±.", career:["Genclerbirligi"], strengths:["Pas","Teknik"] },
  { name:"Yasin Gureler", team:"Genclerbirligi", position:"Forvet", age:23, marketValue:1.3, goals:7, assists:2, minutes:2337, bigMatch:80, form:73, story:"2025-26 sezonunda takÄ±mÄ±nÄ±n Forvet bÃ¶lgesinde istikrarlÄ± performansÄ± ve kalitesiyle kadro derinliÄŸine Ã¶nemli katkÄ± saÄŸladÄ±.", career:["Genclerbirligi"], strengths:["Pas","Teknik"] },
  { name:"Alperen Babacan", team:"Genclerbirligi", position:"Forvet", age:31, marketValue:1.2, goals:11, assists:2, minutes:1359, bigMatch:77, form:75, story:"2025-26 sezonunda takÄ±mÄ±nÄ±n Forvet bÃ¶lgesinde istikrarlÄ± performansÄ± ve kalitesiyle kadro derinliÄŸine Ã¶nemli katkÄ± saÄŸladÄ±.", career:["Genclerbirligi"], strengths:["Pas","Teknik"] },
  { name:"Chukwuma Akabueze", team:"Genclerbirligi", position:"Forvet", age:20, marketValue:1.5, goals:9, assists:1, minutes:2107, bigMatch:75, form:87, story:"2025-26 sezonunda takÄ±mÄ±nÄ±n Forvet bÃ¶lgesinde istikrarlÄ± performansÄ± ve kalitesiyle kadro derinliÄŸine Ã¶nemli katkÄ± saÄŸladÄ±.", career:["Genclerbirligi"], strengths:["Pas","Teknik"] },
  { name:"James Adeniyi", team:"Genclerbirligi", position:"Forvet", age:33, marketValue:1.2, goals:3, assists:2, minutes:1460, bigMatch:72, form:87, story:"2025-26 sezonunda takÄ±mÄ±nÄ±n Forvet bÃ¶lgesinde istikrarlÄ± performansÄ± ve kalitesiyle kadro derinliÄŸine Ã¶nemli katkÄ± saÄŸladÄ±.", career:["Genclerbirligi"], strengths:["Pas","Teknik"] },
  { name:"Arda Caglayan", team:"Genclerbirligi", position:"Defans", age:24, marketValue:1.2, goals:2, assists:0, minutes:1818, bigMatch:73, form:82, story:"2025-26 sezonunda takÄ±mÄ±nÄ±n Defans bÃ¶lgesinde istikrarlÄ± performansÄ± ve kalitesiyle kadro derinliÄŸine Ã¶nemli katkÄ± saÄŸladÄ±.", career:["Genclerbirligi"], strengths:["Markaj","Hava Topu"] },
  { name:"Mustafa Yatabare", team:"Genclerbirligi", position:"Defans", age:21, marketValue:1.9, goals:0, assists:2, minutes:2163, bigMatch:75, form:78, story:"2025-26 sezonunda takÄ±mÄ±nÄ±n Defans bÃ¶lgesinde istikrarlÄ± performansÄ± ve kalitesiyle kadro derinliÄŸine Ã¶nemli katkÄ± saÄŸladÄ±.", career:["Genclerbirligi"], strengths:["Markaj","Hava Topu"] },
  { name:"Gokhan Tore", team:"Genclerbirligi", position:"Kaleci", age:20, marketValue:1.2, goals:1, assists:1, minutes:1677, bigMatch:74, form:74, story:"2025-26 sezonunda takÄ±mÄ±nÄ±n Kaleci bÃ¶lgesinde istikrarlÄ± performansÄ± ve kalitesiyle kadro derinliÄŸine Ã¶nemli katkÄ± saÄŸladÄ±.", career:["Genclerbirligi"], strengths:["Refleks","KurtarÄ±ÅŸ"] },
  { name:"Mustafa Pektemek", team:"Genclerbirligi", position:"Forvet", age:28, marketValue:1.3, goals:11, assists:1, minutes:1801, bigMatch:76, form:82, story:"2025-26 sezonunda takÄ±mÄ±nÄ±n Forvet bÃ¶lgesinde istikrarlÄ± performansÄ± ve kalitesiyle kadro derinliÄŸine Ã¶nemli katkÄ± saÄŸladÄ±.", career:["Genclerbirligi"], strengths:["Pas","Teknik"] },
  { name:"Zeki Yildirim", team:"Genclerbirligi", position:"Kanat", age:27, marketValue:1.4, goals:6, assists:7, minutes:1880, bigMatch:84, form:74, story:"2025-26 sezonunda takÄ±mÄ±nÄ±n Kanat bÃ¶lgesinde istikrarlÄ± performansÄ± ve kalitesiyle kadro derinliÄŸine Ã¶nemli katkÄ± saÄŸladÄ±.", career:["Genclerbirligi"], strengths:["Pas","Teknik"] },
  { name:"Ozan Can", team:"Genclerbirligi", position:"Forvet", age:20, marketValue:0.9, goals:6, assists:2, minutes:1522, bigMatch:71, form:73, story:"2025-26 sezonunda takÄ±mÄ±nÄ±n Forvet bÃ¶lgesinde istikrarlÄ± performansÄ± ve kalitesiyle kadro derinliÄŸine Ã¶nemli katkÄ± saÄŸladÄ±.", career:["Genclerbirligi"], strengths:["Pas","Teknik"] },
  { name:"Andreas Gianniotis", team:"Kasimpasa", position:"Kaleci", age:33, marketValue:0.3, goals:0, assists:0, minutes:3200, bigMatch:82, form:81, story:"KasÄ±mpaÅŸa kalesinde gÃ¶sterdiÄŸi reflekslerle kritik puanlar kazandÄ±ran tecrÃ¼beli Yunan file bekÃ§isi.", career:["Olympiacos","Maccabi Tel Aviv","Kasimpasa"], strengths:["Refleks","KurtarÄ±ÅŸ","Deneyim"] },
  { name:"Adrian Benedyczak", team:"Kasimpasa", position:"Forvet", age:25, marketValue:5.0, goals:11, assists:3, minutes:2200, bigMatch:80, form:82, story:"Parma'dan transfer edilen PolonyalÄ± santrfor, 11 golle KasÄ±mpaÅŸa'nÄ±n en skorer ismi oldu.", career:["Pogon","Parma","Kasimpasa"], strengths:["Bitiricilik","Hava Topu","Fizik"] },
  { name:"Rodrigo BecÃ£o", team:"Kasimpasa", position:"Defans", age:29, marketValue:4.0, goals:3, assists:1, minutes:2900, bigMatch:84, form:85, story:"BrezilyalÄ± gÃ¼Ã§lÃ¼ stoper, Udinese ve FenerbahÃ§e geÃ§miÅŸiyle KasÄ±mpaÅŸa savunmasÄ±nÄ±n en bÃ¼yÃ¼k ismi oldu.", career:["Udinese","FenerbahÃ§e","KasÄ±mpaÅŸa"], strengths:["GÃ¼Ã§","Hava Topu","Liderlik"] },
  { name:"Nicholas Opoku", team:"Kasimpasa", position:"Defans", age:27, marketValue:2.5, goals:1, assists:1, minutes:2700, bigMatch:82, form:83, story:"GanalÄ± stoper, hava toplarÄ±ndaki Ã¼stÃ¼nlÃ¼ÄŸÃ¼ ve sert mÃ¼dahaleleriyle KasÄ±mpaÅŸa'nÄ±n geÃ§ilmez duvarÄ± oldu.", career:["Amiens","Ã‡eÅŸitli","KasÄ±mpaÅŸa"], strengths:["GÃ¼Ã§","Hava Topu","Markaj"] },
  { name:"Kerem Demirbay", team:"Kasimpasa", position:"Orta saha", age:32, marketValue:2.5, goals:4, assists:8, minutes:2600, bigMatch:84, form:84, story:"Alman milli takÄ±mÄ±nÄ±n tecrÃ¼beli oyuncusu, tekniÄŸi ve duran top uzmanlÄ±ÄŸÄ±yla KasÄ±mpaÅŸa orta sahasÄ±na Bundesliga kalitesi kattÄ±.", career:["Bayer Leverkusen","KasÄ±mpaÅŸa"], strengths:["Pas","Duran Top","Teknik"] },
  { name:"Haris HajradinoviÄ‡", team:"Kasimpasa", position:"Orta saha", age:28, marketValue:2.0, goals:5, assists:6, minutes:2500, bigMatch:82, form:83, story:"BoÅŸnak yaratÄ±cÄ± orta saha, sol ayaÄŸÄ±ndaki kaliteli vuruÅŸlarÄ± ve asistleriyle KasÄ±mpaÅŸa hÃ¼cumunu yÃ¶netti.", career:["Ã‡eÅŸitli","KasÄ±mpaÅŸa"], strengths:["Teknik","Åut","YaratÄ±cÄ±lÄ±k"] },
  { name:"Ä°rfan Can Kahveci", team:"Kasimpasa", position:"Kanat", age:30, marketValue:4.0, goals:9, assists:7, minutes:2700, bigMatch:85, form:86, story:"Milli yÄ±ldÄ±z, KasÄ±mpaÅŸa'ya transferiyle sezonun en etkili TÃ¼rk oyuncularÄ±ndan biri olan Ä°rfan Can, 16 skor katkÄ±sÄ±yla muhteÅŸem bir dÃ¶nem geÃ§irdi.", career:["BaÅŸakÅŸehir","KasÄ±mpaÅŸa"], strengths:["Dribbling","Åut","Gol Sezgisi"] },
  { name:"Cenk Tosun", team:"Kasimpasa", position:"Forvet", age:34, marketValue:2.0, goals:10, assists:3, minutes:2400, bigMatch:83, form:83, story:"TÃ¼rkiye'nin golcÃ¼ efsanesi, KasÄ±mpaÅŸa'da 10 golle ligin en tecrÃ¼beli ve etkili santrforlarÄ±ndan biri olmayÄ± sÃ¼rdÃ¼rdÃ¼.", career:["Everton","BeÅŸiktaÅŸ","KasÄ±mpaÅŸa"], strengths:["Bitiricilik","Hava Topu","TecrÃ¼be"] },
  { name:"Fousseni DiabatÃ©", team:"Kasimpasa", position:"Kanat", age:28, marketValue:3.0, goals:7, assists:8, minutes:2500, bigMatch:83, form:84, story:"Malili hÄ±zlÄ± kanat, Ã§evikliÄŸi ve kanat dripling kalitesiyle KasÄ±mpaÅŸa saldÄ±rÄ±sÄ±nÄ± canlandÄ±rdÄ±.", career:["Sivasspor","KasÄ±mpaÅŸa"], strengths:["HÄ±z","Dribbling","Asist"] },
  { name:"Emre TaÅŸdemir", team:"Kasimpasa", position:"Defans", age:29, marketValue:1.5, goals:0, assists:3, minutes:2600, bigMatch:80, form:81, story:"Milli sol bek, KasÄ±mpaÅŸa'nÄ±n sol kulvarÄ±nda hem savunma hem hÃ¼cuma katkÄ±yla gÃ¼venilir bir performans sergiledi.", career:["Alanyaspor","KasÄ±mpaÅŸa"], strengths:["Savunma","HÄ±z","Orta"] },
  { name:"Claudio Winck", team:"Kasimpasa", position:"Orta saha", age:20, marketValue:0.6, goals:2, assists:8, minutes:1846, bigMatch:77, form:86, story:"2025-26 sezonunda takÄ±mÄ±nÄ±n Orta saha bÃ¶lgesinde istikrarlÄ± performansÄ± ve kalitesiyle kadro derinliÄŸine Ã¶nemli katkÄ± saÄŸladÄ±.", career:["Kasimpasa"], strengths:["Pas","Teknik"] },
  { name:"Mamadou Fall", team:"Kasimpasa", position:"Kaleci", age:24, marketValue:0.5, goals:2, assists:2, minutes:1359, bigMatch:75, form:85, story:"2025-26 sezonunda takÄ±mÄ±nÄ±n Kaleci bÃ¶lgesinde istikrarlÄ± performansÄ± ve kalitesiyle kadro derinliÄŸine Ã¶nemli katkÄ± saÄŸladÄ±.", career:["Kasimpasa"], strengths:["Refleks","KurtarÄ±ÅŸ"] },
  { name:"Mortadha Ben Ouanes", team:"Kasimpasa", position:"Kanat", age:23, marketValue:1.6, goals:5, assists:3, minutes:2375, bigMatch:81, form:80, story:"2025-26 sezonunda takÄ±mÄ±nÄ±n Kanat bÃ¶lgesinde istikrarlÄ± performansÄ± ve kalitesiyle kadro derinliÄŸine Ã¶nemli katkÄ± saÄŸladÄ±.", career:["Kasimpasa"], strengths:["Pas","Teknik"] },
  { name:"Iron Gomis", team:"Kasimpasa", position:"Kaleci", age:23, marketValue:2.8, goals:1, assists:0, minutes:2268, bigMatch:76, form:79, story:"2025-26 sezonunda takÄ±mÄ±nÄ±n Kaleci bÃ¶lgesinde istikrarlÄ± performansÄ± ve kalitesiyle kadro derinliÄŸine Ã¶nemli katkÄ± saÄŸladÄ±.", career:["Kasimpasa"], strengths:["Refleks","KurtarÄ±ÅŸ"] },
  { name:"Nuno da Costa", team:"Kasimpasa", position:"Orta saha", age:25, marketValue:1.7, goals:0, assists:6, minutes:1998, bigMatch:83, form:71, story:"2025-26 sezonunda takÄ±mÄ±nÄ±n Orta saha bÃ¶lgesinde istikrarlÄ± performansÄ± ve kalitesiyle kadro derinliÄŸine Ã¶nemli katkÄ± saÄŸladÄ±.", career:["Kasimpasa"], strengths:["Pas","Teknik"] },
  { name:"Kenneth Omeruo", team:"Kasimpasa", position:"Kaleci", age:30, marketValue:1.9, goals:1, assists:1, minutes:1415, bigMatch:74, form:80, story:"2025-26 sezonunda takÄ±mÄ±nÄ±n Kaleci bÃ¶lgesinde istikrarlÄ± performansÄ± ve kalitesiyle kadro derinliÄŸine Ã¶nemli katkÄ± saÄŸladÄ±.", career:["Kasimpasa"], strengths:["Refleks","KurtarÄ±ÅŸ"] },
  { name:"Sadik Ciftpinar", team:"Kasimpasa", position:"Kanat", age:27, marketValue:2.9, goals:7, assists:9, minutes:2185, bigMatch:70, form:81, story:"2025-26 sezonunda takÄ±mÄ±nÄ±n Kanat bÃ¶lgesinde istikrarlÄ± performansÄ± ve kalitesiyle kadro derinliÄŸine Ã¶nemli katkÄ± saÄŸladÄ±.", career:["Kasimpasa"], strengths:["Pas","Teknik"] },
  { name:"Gokhan Gul", team:"Kasimpasa", position:"Defans", age:26, marketValue:2.6, goals:1, assists:2, minutes:1049, bigMatch:82, form:73, story:"2025-26 sezonunda takÄ±mÄ±nÄ±n Defans bÃ¶lgesinde istikrarlÄ± performansÄ± ve kalitesiyle kadro derinliÄŸine Ã¶nemli katkÄ± saÄŸladÄ±.", career:["Kasimpasa"], strengths:["Markaj","Hava Topu"] },
  { name:"Loret Sadiku", team:"Kasimpasa", position:"Forvet", age:26, marketValue:1.0, goals:7, assists:2, minutes:1023, bigMatch:75, form:87, story:"2025-26 sezonunda takÄ±mÄ±nÄ±n Forvet bÃ¶lgesinde istikrarlÄ± performansÄ± ve kalitesiyle kadro derinliÄŸine Ã¶nemli katkÄ± saÄŸladÄ±.", career:["Kasimpasa"], strengths:["Pas","Teknik"] },
  { name:"Erdem Cetinkaya", team:"Kasimpasa", position:"Defans", age:24, marketValue:1.4, goals:1, assists:1, minutes:1561, bigMatch:84, form:83, story:"2025-26 sezonunda takÄ±mÄ±nÄ±n Defans bÃ¶lgesinde istikrarlÄ± performansÄ± ve kalitesiyle kadro derinliÄŸine Ã¶nemli katkÄ± saÄŸladÄ±.", career:["Kasimpasa"], strengths:["Markaj","Hava Topu"] },
  { name:"Taylan Utku", team:"Kasimpasa", position:"Forvet", age:22, marketValue:2.9, goals:7, assists:0, minutes:2289, bigMatch:78, form:83, story:"2025-26 sezonunda takÄ±mÄ±nÄ±n Forvet bÃ¶lgesinde istikrarlÄ± performansÄ± ve kalitesiyle kadro derinliÄŸine Ã¶nemli katkÄ± saÄŸladÄ±.", career:["Kasimpasa"], strengths:["Pas","Teknik"] },
  { name:"Ali Karakaya", team:"Kasimpasa", position:"Defans", age:30, marketValue:0.7, goals:0, assists:2, minutes:1527, bigMatch:74, form:70, story:"2025-26 sezonunda takÄ±mÄ±nÄ±n Defans bÃ¶lgesinde istikrarlÄ± performansÄ± ve kalitesiyle kadro derinliÄŸine Ã¶nemli katkÄ± saÄŸladÄ±.", career:["Kasimpasa"], strengths:["Markaj","Hava Topu"] },
  { name:"Yasin Ozcan", team:"Kasimpasa", position:"Forvet", age:24, marketValue:2.1, goals:3, assists:0, minutes:2108, bigMatch:81, form:81, story:"2025-26 sezonunda takÄ±mÄ±nÄ±n Forvet bÃ¶lgesinde istikrarlÄ± performansÄ± ve kalitesiyle kadro derinliÄŸine Ã¶nemli katkÄ± saÄŸladÄ±.", career:["Kasimpasa"], strengths:["Pas","Teknik"] },
  { name:"Onur ErdoÄŸan", team:"Kasimpasa", position:"Kanat", age:26, marketValue:2.4, goals:2, assists:6, minutes:1372, bigMatch:79, form:77, story:"Kadro derinliÄŸi ve rotasyonda teknik direktÃ¶rÃ¼n elini gÃ¼Ã§lendiren, 2025-26 sezonu kadro oyuncusu.", career:["Kasimpasa"], strengths:["Pas","MÃ¼cadele"] },
  { name:"Alex Lopez", team:"Kasimpasa", position:"Kaleci", age:19, marketValue:3.2, goals:0, assists:0, minutes:869, bigMatch:79, form:73, story:"Kadro derinliÄŸi ve rotasyonda teknik direktÃ¶rÃ¼n elini gÃ¼Ã§lendiren, 2025-26 sezonu kadro oyuncusu.", career:["Kasimpasa"], strengths:["Refleks","KurtarÄ±ÅŸ"] },
  { name:"Aleksandar Jovanovic", team:"Kocaelispor", position:"Kaleci", age:33, marketValue:0.5, goals:0, assists:0, minutes:3100, bigMatch:82, form:83, story:"Kocaelispor'un tecrÃ¼beli SÄ±rp kalecisi, kritik maÃ§lardaki kurtarÄ±ÅŸlarÄ±yla ligde kalmayÄ± garantiledi.", career:["Aarhus","Apollon Limassol","Kocaelispor"], strengths:["Refleks","Deneyim","Hava Topu"] },
  { name:"Bruno Petkovic", team:"Kocaelispor", position:"Forvet", age:31, marketValue:1.5, goals:8, assists:4, minutes:2100, bigMatch:83, form:82, story:"Dinamo Zagreb'den transfer edilen HÄ±rvat santrfor, gÃ¼Ã§lÃ¼ fiziÄŸi, top saklama becerisi ve 8 golÃ¼yle takÄ±mÄ±nÄ± taÅŸÄ±dÄ±.", career:["Bologna","Dinamo Zagreb","Kocaelispor"], strengths:["Top Saklama","Fizik","TecrÃ¼be"] },
  { name:"Anfernee Dijksteel", team:"Kocaelispor", position:"Defans", age:28, marketValue:2.5, goals:1, assists:3, minutes:2800, bigMatch:82, form:83, story:"HollandalÄ± saÄŸ bek, Premier Lig tecrÃ¼besiyle Kocaelispor'un savunmasÄ±na uluslararasÄ± kalite kattÄ±.", career:["Middlesbrough","Ã‡eÅŸitli","Kocaelispor"], strengths:["HÄ±z","Savunma","TecrÃ¼be"] },
  { name:"Hrvoje SmolÄiÄ‡", team:"Kocaelispor", position:"Defans", age:25, marketValue:3.0, goals:2, assists:1, minutes:2900, bigMatch:83, form:84, story:"HÄ±rvat genÃ§ stoper, gÃ¼Ã§lÃ¼ fiziÄŸi ve oyun zekasÄ±yla Kocaelispor savunmasÄ±nÄ±n en deÄŸerli oyuncusu oldu.", career:["Rijeka","Kocaelispor"], strengths:["GÃ¼Ã§","Hava Topu","Oyun ZekasÄ±"] },
  { name:"Massadio HaÃ¯dara", team:"Kocaelispor", position:"Defans", age:32, marketValue:1.2, goals:0, assists:4, minutes:2600, bigMatch:80, form:80, story:"FransÄ±z sol bek, hÃ¼cum katÄ±lÄ±mlarÄ± ve tecrÃ¼besiyle Kocaelispor'un sol kulvarÄ±na deÄŸer kattÄ±.", career:["Newcastle","Metz","Kocaelispor"], strengths:["HÄ±z","Orta","TecrÃ¼be"] },
  { name:"Karol Linetty", team:"Kocaelispor", position:"Orta saha", age:30, marketValue:3.0, goals:5, assists:7, minutes:2700, bigMatch:83, form:84, story:"PolonyalÄ± milli takÄ±m oyuncusu, pas kalitesi ve bÃ¼yÃ¼k maÃ§ tecrÃ¼besiyle Kocaelispor'un orta saha lideri oldu.", career:["Sampdoria","Torino","Kocaelispor"], strengths:["Pas","Oyun GÃ¶rÃ¼ÅŸÃ¼","BÃ¼yÃ¼k MaÃ§"] },
  { name:"Joseph Nonge", team:"Kocaelispor", position:"Orta saha", age:22, marketValue:3.0, goals:4, assists:6, minutes:2400, bigMatch:82, form:84, story:"BelÃ§ika asÄ±llÄ± genÃ§ yÄ±ldÄ±z, Dortmund akademisinden Ã§Ä±kma dinamik oyuncu Kocaelispor'da sezonun sÃ¼rprizi oldu.", career:["Borussia Dortmund","Kocaelispor"], strengths:["Dinamizm","Dribbling","Potansiyel"] },
  { name:"Serdar Dursun", team:"Kocaelispor", position:"Forvet", age:33, marketValue:1.5, goals:7, assists:3, minutes:2100, bigMatch:80, form:81, story:"Milli golcÃ¼, Kocaelispor'un sÃ¼per lig dÃ¶nÃ¼ÅŸÃ¼nde tecrÃ¼besiyle Ã¶nemli gol katkÄ±larÄ± verdi.", career:["Darmstadt","FenerbahÃ§e","Kocaelispor"], strengths:["Bitiricilik","TecrÃ¼be","Hava Topu"] },
  { name:"Darko Churlinov", team:"Kocaelispor", position:"Kanat", age:24, marketValue:3.0, goals:6, assists:8, minutes:2500, bigMatch:83, form:85, story:"Kuzey MakedonyalÄ± genÃ§ kanat yÄ±ldÄ±zÄ±, hÄ±zÄ± ve dripling kalitesiyle Kocaelispor hÃ¼cumunu canlandÄ±rdÄ±.", career:["Schalke","Kocaelispor"], strengths:["HÄ±z","Dribbling","Gol"] },
  { name:"Rigoberto Rivas", team:"Kocaelispor", position:"Kanat", age:25, marketValue:2.5, goals:5, assists:7, minutes:2300, bigMatch:82, form:83, story:"HonduraslÄ± hÄ±zlÄ± kanat, rakipleri baskÄ± altÄ±na alarak sezon boyunca Kocaelispor hÃ¼cumuna ivme kattÄ±.", career:["Werder Bremen","Kocaelispor"], strengths:["HÄ±z","Dribbling","Fizik"] },
  { name:"Ryan Mendes", team:"Kocaelispor", position:"Kaleci", age:20, marketValue:0.5, goals:0, assists:1, minutes:1258, bigMatch:82, form:85, story:"2025-26 sezonunda takÄ±mÄ±nÄ±n Kaleci bÃ¶lgesinde istikrarlÄ± performansÄ± ve kalitesiyle kadro derinliÄŸine Ã¶nemli katkÄ± saÄŸladÄ±.", career:["Kocaelispor"], strengths:["Refleks","KurtarÄ±ÅŸ"] },
  { name:"Marcao", team:"Kocaelispor", position:"Kanat", age:23, marketValue:1.4, goals:3, assists:5, minutes:1296, bigMatch:79, form:86, story:"2025-26 sezonunda takÄ±mÄ±nÄ±n Kanat bÃ¶lgesinde istikrarlÄ± performansÄ± ve kalitesiyle kadro derinliÄŸine Ã¶nemli katkÄ± saÄŸladÄ±.", career:["Kocaelispor"], strengths:["Pas","Teknik"] },
  { name:"Giorgi Kharaishvili", team:"Kocaelispor", position:"Defans", age:29, marketValue:1.7, goals:0, assists:1, minutes:1004, bigMatch:81, form:82, story:"2025-26 sezonunda takÄ±mÄ±nÄ±n Defans bÃ¶lgesinde istikrarlÄ± performansÄ± ve kalitesiyle kadro derinliÄŸine Ã¶nemli katkÄ± saÄŸladÄ±.", career:["Kocaelispor"], strengths:["Markaj","Hava Topu"] },
  { name:"Josip Vukovic", team:"Kocaelispor", position:"Kanat", age:28, marketValue:0.8, goals:6, assists:3, minutes:1974, bigMatch:77, form:82, story:"2025-26 sezonunda takÄ±mÄ±nÄ±n Kanat bÃ¶lgesinde istikrarlÄ± performansÄ± ve kalitesiyle kadro derinliÄŸine Ã¶nemli katkÄ± saÄŸladÄ±.", career:["Kocaelispor"], strengths:["Pas","Teknik"] },
  { name:"Aaron Appindangoye", team:"Kocaelispor", position:"Kanat", age:32, marketValue:2.1, goals:4, assists:7, minutes:1324, bigMatch:71, form:70, story:"2025-26 sezonunda takÄ±mÄ±nÄ±n Kanat bÃ¶lgesinde istikrarlÄ± performansÄ± ve kalitesiyle kadro derinliÄŸine Ã¶nemli katkÄ± saÄŸladÄ±.", career:["Kocaelispor"], strengths:["Pas","Teknik"] },
  { name:"Caner Osmanpasa", team:"Kocaelispor", position:"Kaleci", age:28, marketValue:1.1, goals:1, assists:0, minutes:1199, bigMatch:83, form:86, story:"2025-26 sezonunda takÄ±mÄ±nÄ±n Kaleci bÃ¶lgesinde istikrarlÄ± performansÄ± ve kalitesiyle kadro derinliÄŸine Ã¶nemli katkÄ± saÄŸladÄ±.", career:["Kocaelispor"], strengths:["Refleks","KurtarÄ±ÅŸ"] },
  { name:"Ahmet Oguz", team:"Kocaelispor", position:"Defans", age:33, marketValue:1.0, goals:1, assists:1, minutes:2187, bigMatch:81, form:70, story:"2025-26 sezonunda takÄ±mÄ±nÄ±n Defans bÃ¶lgesinde istikrarlÄ± performansÄ± ve kalitesiyle kadro derinliÄŸine Ã¶nemli katkÄ± saÄŸladÄ±.", career:["Kocaelispor"], strengths:["Markaj","Hava Topu"] },
  { name:"Baris AlÄ±cÄ±", team:"Kocaelispor", position:"Defans", age:24, marketValue:1.6, goals:2, assists:0, minutes:1529, bigMatch:79, form:70, story:"2025-26 sezonunda takÄ±mÄ±nÄ±n Defans bÃ¶lgesinde istikrarlÄ± performansÄ± ve kalitesiyle kadro derinliÄŸine Ã¶nemli katkÄ± saÄŸladÄ±.", career:["Kocaelispor"], strengths:["Markaj","Hava Topu"] },
  { name:"Yusuf AbdioÄŸlu", team:"Kocaelispor", position:"Kanat", age:30, marketValue:1.3, goals:7, assists:5, minutes:1669, bigMatch:73, form:70, story:"2025-26 sezonunda takÄ±mÄ±nÄ±n Kanat bÃ¶lgesinde istikrarlÄ± performansÄ± ve kalitesiyle kadro derinliÄŸine Ã¶nemli katkÄ± saÄŸladÄ±.", career:["Kocaelispor"], strengths:["Pas","Teknik"] },
  { name:"Harun Tekin", team:"Kocaelispor", position:"Kanat", age:27, marketValue:0.8, goals:11, assists:7, minutes:1591, bigMatch:78, form:81, story:"2025-26 sezonunda takÄ±mÄ±nÄ±n Kanat bÃ¶lgesinde istikrarlÄ± performansÄ± ve kalitesiyle kadro derinliÄŸine Ã¶nemli katkÄ± saÄŸladÄ±.", career:["Kocaelispor"], strengths:["Pas","Teknik"] },
  { name:"Cem Ekinci", team:"Kocaelispor", position:"Kanat", age:22, marketValue:0.8, goals:4, assists:5, minutes:2490, bigMatch:73, form:86, story:"2025-26 sezonunda takÄ±mÄ±nÄ±n Kanat bÃ¶lgesinde istikrarlÄ± performansÄ± ve kalitesiyle kadro derinliÄŸine Ã¶nemli katkÄ± saÄŸladÄ±.", career:["Kocaelispor"], strengths:["Pas","Teknik"] },
  { name:"Mehmet Yilmaz", team:"Kocaelispor", position:"Kaleci", age:30, marketValue:2.4, goals:0, assists:2, minutes:1186, bigMatch:84, form:82, story:"2025-26 sezonunda takÄ±mÄ±nÄ±n Kaleci bÃ¶lgesinde istikrarlÄ± performansÄ± ve kalitesiyle kadro derinliÄŸine Ã¶nemli katkÄ± saÄŸladÄ±.", career:["Kocaelispor"], strengths:["Refleks","KurtarÄ±ÅŸ"] },
  { name:"Yusuf Cihat", team:"Kocaelispor", position:"Forvet", age:23, marketValue:1.8, goals:6, assists:2, minutes:1604, bigMatch:78, form:86, story:"2025-26 sezonunda takÄ±mÄ±nÄ±n Forvet bÃ¶lgesinde istikrarlÄ± performansÄ± ve kalitesiyle kadro derinliÄŸine Ã¶nemli katkÄ± saÄŸladÄ±.", career:["Kocaelispor"], strengths:["Pas","Teknik"] },
  { name:"Mesut Can", team:"Kocaelispor", position:"Kanat", age:23, marketValue:2.2, goals:11, assists:7, minutes:2181, bigMatch:74, form:85, story:"2025-26 sezonunda takÄ±mÄ±nÄ±n Kanat bÃ¶lgesinde istikrarlÄ± performansÄ± ve kalitesiyle kadro derinliÄŸine Ã¶nemli katkÄ± saÄŸladÄ±.", career:["Kocaelispor"], strengths:["Pas","Teknik"] },
  { name:"Tarkan Serbest", team:"Kocaelispor", position:"Kanat", age:32, marketValue:1.0, goals:10, assists:3, minutes:1558, bigMatch:78, form:82, story:"2025-26 sezonunda takÄ±mÄ±nÄ±n Kanat bÃ¶lgesinde istikrarlÄ± performansÄ± ve kalitesiyle kadro derinliÄŸine Ã¶nemli katkÄ± saÄŸladÄ±.", career:["Kocaelispor"], strengths:["Pas","Teknik"] },
  { name:"Guilherme Sitya", team:"Konyaspor", position:"Defans", age:36, marketValue:0.2, goals:1, assists:6, minutes:2800, bigMatch:80, form:81, story:"Konyaspor'un tecrÃ¼beli sol beki ve kaptanÄ±, duran toplardaki ustalÄ±ÄŸÄ± ve 6 asistiyle yine fark yarattÄ±.", career:["Jagiellonia","Konyaspor"], strengths:["Orta","Duran Top","TecrÃ¼be"] },
  { name:"Jackson Muleka", team:"Konyaspor", position:"Forvet", age:26, marketValue:2.8, goals:10, assists:3, minutes:2400, bigMatch:82, form:83, story:"Konyaspor'un hÃ¼cum hattÄ±nÄ± hareketlendiren Muleka, attÄ±ÄŸÄ± 10 golle ligde kalma yolunda kritik katkÄ±lar saÄŸladÄ±.", career:["Mazembe","Standard Liege","Kasimpasa","Besiktas","Konyaspor"], strengths:["HÄ±z","MÃ¼cadele","Bitiricilik"] },
  { name:"Deniz ErtaÅŸ", team:"Konyaspor", position:"Kaleci", age:26, marketValue:1.2, goals:0, assists:0, minutes:3100, bigMatch:80, form:81, story:"GenÃ§ TÃ¼rk kaleci, Konyaspor kalesinde olgunlaÅŸarak sezonun en gÃ¼venilir file bekÃ§ilerinden biri olmaya yÃ¼kseldi.", career:["Kayserispor","Konyaspor"], strengths:["Refleks","Bire Bir","Liderlik"] },
  { name:"Josip ÄŒalusiÄ‡", team:"Konyaspor", position:"Defans", age:32, marketValue:1.0, goals:1, assists:2, minutes:2800, bigMatch:80, form:80, story:"TecrÃ¼beli HÄ±rvat saÄŸ bek, savunma disiplini ve deney birikimini Konyaspor'a taÅŸÄ±dÄ±.", career:["Ã‡eÅŸitli HÄ±rvat","Konyaspor"], strengths:["Savunma","TecrÃ¼be","Disiplin"] },
  { name:"Adamo Nagalo", team:"Konyaspor", position:"Defans", age:26, marketValue:1.8, goals:2, assists:0, minutes:2900, bigMatch:81, form:82, story:"Burkina Fasolu stoper, fiziksel gÃ¼cÃ¼ ve hava toplarÄ±ndaki Ã¼stÃ¼nlÃ¼ÄŸÃ¼yle Konyaspor savunmasÄ±nÄ±n kilit taÅŸÄ± oldu.", career:["Ã‡eÅŸitli","Konyaspor"], strengths:["Fizik","Hava Topu","GÃ¼Ã§"] },
  { name:"Enis Bardhi", team:"Konyaspor", position:"Orta saha", age:30, marketValue:3.0, goals:7, assists:10, minutes:2800, bigMatch:85, form:86, story:"Kuzey Makedonya'nÄ±n yÄ±ldÄ±z oyuncusu, serbest vuruÅŸ ustasÄ± ve 17 skor katkÄ±sÄ±yla sezonun en etkileyici isimlerinden biri oldu.", career:["Levante","Konyaspor"], strengths:["Duran Top","Åut","Oyun GÃ¶rÃ¼ÅŸÃ¼"] },
  { name:"Riechedly Bazoer", team:"Konyaspor", position:"Orta saha", age:28, marketValue:2.5, goals:4, assists:6, minutes:2600, bigMatch:83, form:84, story:"HollandalÄ± defansif orta saha, top kapma ve iÅŸ gÃ¼cÃ¼yle Konyaspor'un orta saha motorunu oluÅŸturdu.", career:["Ajax","Porto","Konyaspor"], strengths:["Top Kapma","Dinamizm","Pas"] },
  { name:"Deniz TÃ¼rÃ¼Ã§", team:"Konyaspor", position:"Kanat", age:29, marketValue:2.0, goals:6, assists:8, minutes:2500, bigMatch:82, form:83, story:"Milli kanat oyuncusu, Ã§evikliÄŸi ve asistleriyle Konyaspor'un hÃ¼cum vektÃ¶rÃ¼ydÃ¼.", career:["BaÅŸakÅŸehir","Konyaspor"], strengths:["HÄ±z","Dribbling","Asist"] },
  { name:"Blaz Kramer", team:"Konyaspor", position:"Forvet", age:28, marketValue:2.0, goals:8, assists:2, minutes:2200, bigMatch:81, form:82, story:"Sloven santrfor, fiziksel oyunu ve gol iÃ§gÃ¼dÃ¼sÃ¼yle Muleka'nÄ±n mÃ¼kemmel forvetteki ortaÄŸÄ± oldu.", career:["Olimpija","Ã‡eÅŸitli","Konyaspor"], strengths:["Hava Topu","Bitiricilik","GÃ¼Ã§"] },
  { name:"Diogo GonÃ§alves", team:"Konyaspor", position:"Kanat", age:28, marketValue:2.5, goals:5, assists:9, minutes:2400, bigMatch:83, form:84, story:"Portekizli kanat, tekniÄŸi ve sol ayaÄŸÄ±ndaki kalitesiyle Konyaspor'un en tehlikeli oyuncularÄ±ndan biri oldu.", career:["Benfica","PAOK","Konyaspor"], strengths:["Teknik","Dribbling","Asist"] },
  { name:"Danijel Aleksic", team:"Konyaspor", position:"Orta saha", age:26, marketValue:1.4, goals:1, assists:5, minutes:2389, bigMatch:74, form:79, story:"2025-26 sezonunda takÄ±mÄ±nÄ±n Orta saha bÃ¶lgesinde istikrarlÄ± performansÄ± ve kalitesiyle kadro derinliÄŸine Ã¶nemli katkÄ± saÄŸladÄ±.", career:["Konyaspor"], strengths:["Pas","Teknik"] },
  { name:"Yusuf Erdogan", team:"Konyaspor", position:"Orta saha", age:26, marketValue:2.9, goals:1, assists:7, minutes:1195, bigMatch:83, form:75, story:"2025-26 sezonunda takÄ±mÄ±nÄ±n Orta saha bÃ¶lgesinde istikrarlÄ± performansÄ± ve kalitesiyle kadro derinliÄŸine Ã¶nemli katkÄ± saÄŸladÄ±.", career:["Konyaspor"], strengths:["Pas","Teknik"] },
  { name:"Umut Nayir", team:"Konyaspor", position:"Kanat", age:22, marketValue:1.8, goals:4, assists:2, minutes:1451, bigMatch:73, form:76, story:"2025-26 sezonunda takÄ±mÄ±nÄ±n Kanat bÃ¶lgesinde istikrarlÄ± performansÄ± ve kalitesiyle kadro derinliÄŸine Ã¶nemli katkÄ± saÄŸladÄ±.", career:["Konyaspor"], strengths:["Pas","Teknik"] },
  { name:"Louka Prip", team:"Konyaspor", position:"Orta saha", age:21, marketValue:1.9, goals:2, assists:9, minutes:1248, bigMatch:76, form:81, story:"2025-26 sezonunda takÄ±mÄ±nÄ±n Orta saha bÃ¶lgesinde istikrarlÄ± performansÄ± ve kalitesiyle kadro derinliÄŸine Ã¶nemli katkÄ± saÄŸladÄ±.", career:["Konyaspor"], strengths:["Pas","Teknik"] },
  { name:"Filip Damjanovic", team:"Konyaspor", position:"Kanat", age:33, marketValue:2.8, goals:4, assists:2, minutes:2357, bigMatch:76, form:84, story:"2025-26 sezonunda takÄ±mÄ±nÄ±n Kanat bÃ¶lgesinde istikrarlÄ± performansÄ± ve kalitesiyle kadro derinliÄŸine Ã¶nemli katkÄ± saÄŸladÄ±.", career:["Konyaspor"], strengths:["Pas","Teknik"] },
  { name:"Ugurcan Yazgili", team:"Konyaspor", position:"Forvet", age:24, marketValue:1.4, goals:4, assists:2, minutes:2250, bigMatch:71, form:81, story:"2025-26 sezonunda takÄ±mÄ±nÄ±n Forvet bÃ¶lgesinde istikrarlÄ± performansÄ± ve kalitesiyle kadro derinliÄŸine Ã¶nemli katkÄ± saÄŸladÄ±.", career:["Konyaspor"], strengths:["Pas","Teknik"] },
  { name:"Yasir Subasi", team:"Konyaspor", position:"Kaleci", age:33, marketValue:0.9, goals:0, assists:2, minutes:1582, bigMatch:78, form:73, story:"2025-26 sezonunda takÄ±mÄ±nÄ±n Kaleci bÃ¶lgesinde istikrarlÄ± performansÄ± ve kalitesiyle kadro derinliÄŸine Ã¶nemli katkÄ± saÄŸladÄ±.", career:["Konyaspor"], strengths:["Refleks","KurtarÄ±ÅŸ"] },
  { name:"Adil Demirbag", team:"Konyaspor", position:"Defans", age:20, marketValue:0.9, goals:1, assists:1, minutes:1847, bigMatch:79, form:77, story:"2025-26 sezonunda takÄ±mÄ±nÄ±n Defans bÃ¶lgesinde istikrarlÄ± performansÄ± ve kalitesiyle kadro derinliÄŸine Ã¶nemli katkÄ± saÄŸladÄ±.", career:["Konyaspor"], strengths:["Markaj","Hava Topu"] },
  { name:"Jakub Slowik", team:"Konyaspor", position:"Forvet", age:24, marketValue:2.5, goals:9, assists:0, minutes:1998, bigMatch:73, form:83, story:"2025-26 sezonunda takÄ±mÄ±nÄ±n Forvet bÃ¶lgesinde istikrarlÄ± performansÄ± ve kalitesiyle kadro derinliÄŸine Ã¶nemli katkÄ± saÄŸladÄ±.", career:["Konyaspor"], strengths:["Pas","Teknik"] },
  { name:"Emmanuel Boateng", team:"Konyaspor", position:"Kanat", age:30, marketValue:1.3, goals:9, assists:9, minutes:1069, bigMatch:77, form:81, story:"2025-26 sezonunda takÄ±mÄ±nÄ±n Kanat bÃ¶lgesinde istikrarlÄ± performansÄ± ve kalitesiyle kadro derinliÄŸine Ã¶nemli katkÄ± saÄŸladÄ±.", career:["Konyaspor"], strengths:["Pas","Teknik"] },
  { name:"Alassane Ndao", team:"Konyaspor", position:"Kaleci", age:32, marketValue:2.3, goals:2, assists:0, minutes:1656, bigMatch:81, form:74, story:"2025-26 sezonunda takÄ±mÄ±nÄ±n Kaleci bÃ¶lgesinde istikrarlÄ± performansÄ± ve kalitesiyle kadro derinliÄŸine Ã¶nemli katkÄ± saÄŸladÄ±.", career:["Konyaspor"], strengths:["Refleks","KurtarÄ±ÅŸ"] },
  { name:"Marlos Moreno", team:"Konyaspor", position:"Defans", age:29, marketValue:3.0, goals:0, assists:2, minutes:1145, bigMatch:76, form:75, story:"2025-26 sezonunda takÄ±mÄ±nÄ±n Defans bÃ¶lgesinde istikrarlÄ± performansÄ± ve kalitesiyle kadro derinliÄŸine Ã¶nemli katkÄ± saÄŸladÄ±.", career:["Konyaspor"], strengths:["Markaj","Hava Topu"] },
  { name:"Niko Rak", team:"Konyaspor", position:"Kanat", age:33, marketValue:1.0, goals:6, assists:2, minutes:1513, bigMatch:76, form:76, story:"2025-26 sezonunda takÄ±mÄ±nÄ±n Kanat bÃ¶lgesinde istikrarlÄ± performansÄ± ve kalitesiyle kadro derinliÄŸine Ã¶nemli katkÄ± saÄŸladÄ±.", career:["Konyaspor"], strengths:["Pas","Teknik"] },
  { name:"Sokol Cikalleshi", team:"Konyaspor", position:"Kanat", age:25, marketValue:1.2, goals:3, assists:2, minutes:2231, bigMatch:73, form:73, story:"2025-26 sezonunda takÄ±mÄ±nÄ±n Kanat bÃ¶lgesinde istikrarlÄ± performansÄ± ve kalitesiyle kadro derinliÄŸine Ã¶nemli katkÄ± saÄŸladÄ±.", career:["Konyaspor"], strengths:["Pas","Teknik"] },
  { name:"Melih Ibrahim", team:"Konyaspor", position:"Orta saha", age:27, marketValue:1.3, goals:1, assists:8, minutes:2071, bigMatch:76, form:79, story:"2025-26 sezonunda takÄ±mÄ±nÄ±n Orta saha bÃ¶lgesinde istikrarlÄ± performansÄ± ve kalitesiyle kadro derinliÄŸine Ã¶nemli katkÄ± saÄŸladÄ±.", career:["Konyaspor"], strengths:["Pas","Teknik"] },
  { name:"Yahia Fofana", team:"Rizespor", position:"Kaleci", age:25, marketValue:5.0, goals:0, assists:0, minutes:3200, bigMatch:84, form:85, story:"Angers'den Rizespor'a gelen kaleci, gÃ¶sterdiÄŸi performansla piyasa deÄŸerini 5 milyon Euro'ya Ã§Ä±kardÄ±.", career:["Le Havre","Angers","Rizespor"], strengths:["KurtarÄ±ÅŸ","Fizik","Clean Sheet"] },
  { name:"Ibrahim Olawoyin", team:"Rizespor", position:"Orta saha", age:28, marketValue:2.2, goals:8, assists:5, minutes:2600, bigMatch:82, form:84, story:"Rizespor orta sahasÄ±nda hem savunmaya yardÄ±m eden hem de 8 gol, 5 asistle hÃ¼cumu sÄ±rtlayan kilit oyuncu.", career:["Ankara KeÃ§iÃ¶rengÃ¼cÃ¼","Rizespor"], strengths:["DayanÄ±klÄ±lÄ±k","Dribbling","MÃ¼cadele"] },
  { name:"Attila Mocsi", team:"Rizespor", position:"Defans", age:29, marketValue:1.5, goals:1, assists:2, minutes:2700, bigMatch:79, form:80, story:"Macar saÄŸ bek, saÄŸ kulvarda hem savunma hem hÃ¼cuma katkÄ± saÄŸlayan Ã§alÄ±ÅŸkan oyuncu.", career:["HonvÃ©d","Rizespor"], strengths:["Savunma","Ã‡alÄ±ÅŸkanlÄ±k","HÄ±z"] },
  { name:"Modibo Sagnan", team:"Rizespor", position:"Defans", age:28, marketValue:1.8, goals:2, assists:0, minutes:2900, bigMatch:81, form:82, story:"FransÄ±z stoper, gÃ¼Ã§lÃ¼ fiziÄŸi ve markaj ustalÄ±ÄŸÄ±yla Rizespor savunmasÄ±nÄ±n en kritik ismi oldu.", career:["Grenoble","NÃ®mes","Rizespor"], strengths:["Fizik","Markaj","Hava Topu"] },
  { name:"Casper HÃ¸jer Nielsen", team:"Rizespor", position:"Defans", age:25, marketValue:2.0, goals:0, assists:3, minutes:2600, bigMatch:80, form:81, story:"DanimarkalÄ± sol bek, modern bek anlayÄ±ÅŸÄ±yla hem savunma hem hÃ¼cuma katkÄ±da bulunan kaliteli oyuncu.", career:["Silkeborg","Rizespor"], strengths:["HÄ±z","Orta","Teknik"] },
  { name:"Ä°brahim Olawoyin", team:"Rizespor", position:"Orta saha", age:27, marketValue:2.5, goals:8, assists:5, minutes:2800, bigMatch:83, form:84, story:"NijeryalÄ± orta saha, Rizespor'un dinamosu; hem gol hem asist Ã¼retimiyle ligin en etkili box-to-box oyuncularÄ±ndan.", career:["Konyaspor","Rizespor"], strengths:["Dinamizm","Gol","Top Kapma"] },
  { name:"Qazim Laci", team:"Rizespor", position:"Orta saha", age:28, marketValue:2.0, goals:4, assists:6, minutes:2500, bigMatch:82, form:83, story:"Arnavut milli takÄ±mÄ±nÄ±n yaratÄ±cÄ± merkez oyuncusu, Rizespor'da ustalÄ±klÄ± paslarÄ± ve geniÅŸ saha gÃ¶rÃ¼ÅŸÃ¼yle Ã¶ne Ã§Ä±ktÄ±.", career:["Partizani","Legia","Rizespor"], strengths:["Pas","Oyun GÃ¶rÃ¼ÅŸÃ¼","YaratÄ±cÄ±lÄ±k"] },
  { name:"Taylan AntalyalÄ±", team:"Rizespor", position:"Orta saha", age:28, marketValue:2.5, goals:2, assists:4, minutes:2700, bigMatch:82, form:83, story:"Galatasaray'Ä±n deÄŸerli yetiÅŸtirmesi milli oyuncu, Rizespor'da defansif orta sahada kilit rol Ã¼stlendi.", career:["Galatasaray","Rizespor"], strengths:["Top Kapma","Pas","Liderlik"] },
  { name:"Halil DerviÅŸoÄŸlu", team:"Rizespor", position:"Forvet", age:26, marketValue:3.0, goals:9, assists:3, minutes:2400, bigMatch:83, form:84, story:"A Milli TakÄ±m golcÃ¼sÃ¼, Rizespor'da 9 golle sezonun en etkili TÃ¼rk forvetlerinden biri olduÄŸunu kanÄ±tladÄ±.", career:["Galatasaray","Brentford","Rizespor"], strengths:["Bitiricilik","HÄ±z","Gol Sezgisi"] },
  { name:"Ali Sowe", team:"Rizespor", position:"Forvet", age:25, marketValue:2.5, goals:11, assists:4, minutes:2600, bigMatch:84, form:85, story:"GambiyalÄ± golcÃ¼, patlayÄ±cÄ± oyun tarzÄ± ve 11 golle Rizespor'un sezonun en deÄŸerli bombacÄ±sÄ± oldu.", career:["Viborg","Sivasspor","Rizespor"], strengths:["HÄ±z","Bitiricilik","Fizik"] },
  { name:"Valentin Mihaila", team:"Rizespor", position:"Kanat", age:25, marketValue:3.0, goals:6, assists:8, minutes:2300, bigMatch:83, form:84, story:"Rumen milli takÄ±mÄ±nÄ±n parlayan yÄ±ldÄ±zÄ±, hÄ±zÄ± ve 1'e 1 Ã¼stÃ¼nlÃ¼ÄŸÃ¼yle Rizespor kanatlarÄ±nÄ± ateÅŸledi.", career:["Parma","Atalanta","Rizespor"], strengths:["HÄ±z","Dribbling","Gol"] },
  { name:"Martin Minchev", team:"Rizespor", position:"Orta saha", age:27, marketValue:1.7, goals:1, assists:7, minutes:1366, bigMatch:70, form:81, story:"2025-26 sezonunda takÄ±mÄ±nÄ±n Orta saha bÃ¶lgesinde istikrarlÄ± performansÄ± ve kalitesiyle kadro derinliÄŸine Ã¶nemli katkÄ± saÄŸladÄ±.", career:["Rizespor"], strengths:["Pas","Teknik"] },
  { name:"David Akintola", team:"Rizespor", position:"Defans", age:33, marketValue:0.7, goals:2, assists:2, minutes:1056, bigMatch:79, form:82, story:"2025-26 sezonunda takÄ±mÄ±nÄ±n Defans bÃ¶lgesinde istikrarlÄ± performansÄ± ve kalitesiyle kadro derinliÄŸine Ã¶nemli katkÄ± saÄŸladÄ±.", career:["Rizespor"], strengths:["Markaj","Hava Topu"] },
  { name:"Benhur Keser", team:"Rizespor", position:"Orta saha", age:25, marketValue:1.2, goals:1, assists:3, minutes:1989, bigMatch:73, form:79, story:"2025-26 sezonunda takÄ±mÄ±nÄ±n Orta saha bÃ¶lgesinde istikrarlÄ± performansÄ± ve kalitesiyle kadro derinliÄŸine Ã¶nemli katkÄ± saÄŸladÄ±.", career:["Rizespor"], strengths:["Pas","Teknik"] },
  { name:"Amir Hadziahmetovic", team:"Rizespor", position:"Orta saha", age:31, marketValue:2.1, goals:0, assists:8, minutes:2492, bigMatch:77, form:87, story:"2025-26 sezonunda takÄ±mÄ±nÄ±n Orta saha bÃ¶lgesinde istikrarlÄ± performansÄ± ve kalitesiyle kadro derinliÄŸine Ã¶nemli katkÄ± saÄŸladÄ±.", career:["Rizespor"], strengths:["Pas","Teknik"] },
  { name:"Giannis Papanikolaou", team:"Rizespor", position:"Orta saha", age:29, marketValue:3.2, goals:1, assists:9, minutes:2344, bigMatch:80, form:78, story:"2025-26 sezonunda takÄ±mÄ±nÄ±n Orta saha bÃ¶lgesinde istikrarlÄ± performansÄ± ve kalitesiyle kadro derinliÄŸine Ã¶nemli katkÄ± saÄŸladÄ±.", career:["Rizespor"], strengths:["Pas","Teknik"] },
  { name:"Husniddin Aliqulov", team:"Rizespor", position:"Defans", age:28, marketValue:3.0, goals:0, assists:2, minutes:1391, bigMatch:75, form:78, story:"2025-26 sezonunda takÄ±mÄ±nÄ±n Defans bÃ¶lgesinde istikrarlÄ± performansÄ± ve kalitesiyle kadro derinliÄŸine Ã¶nemli katkÄ± saÄŸladÄ±.", career:["Rizespor"], strengths:["Markaj","Hava Topu"] },
  { name:"Casper Hojer", team:"Rizespor", position:"Forvet", age:29, marketValue:3.3, goals:6, assists:1, minutes:2218, bigMatch:75, form:86, story:"2025-26 sezonunda takÄ±mÄ±nÄ±n Forvet bÃ¶lgesinde istikrarlÄ± performansÄ± ve kalitesiyle kadro derinliÄŸine Ã¶nemli katkÄ± saÄŸladÄ±.", career:["Rizespor"], strengths:["Pas","Teknik"] },
  { name:"Khusniddin Alikulov", team:"Rizespor", position:"Defans", age:32, marketValue:0.7, goals:2, assists:2, minutes:2273, bigMatch:83, form:75, story:"2025-26 sezonunda takÄ±mÄ±nÄ±n Defans bÃ¶lgesinde istikrarlÄ± performansÄ± ve kalitesiyle kadro derinliÄŸine Ã¶nemli katkÄ± saÄŸladÄ±.", career:["Rizespor"], strengths:["Markaj","Hava Topu"] },
  { name:"Muhammed Taha", team:"Rizespor", position:"Orta saha", age:20, marketValue:1.9, goals:0, assists:3, minutes:1186, bigMatch:81, form:80, story:"2025-26 sezonunda takÄ±mÄ±nÄ±n Orta saha bÃ¶lgesinde istikrarlÄ± performansÄ± ve kalitesiyle kadro derinliÄŸine Ã¶nemli katkÄ± saÄŸladÄ±.", career:["Rizespor"], strengths:["Pas","Teknik"] },
  { name:"Efe Tecimer", team:"Rizespor", position:"Kanat", age:31, marketValue:1.1, goals:7, assists:8, minutes:1188, bigMatch:81, form:73, story:"2025-26 sezonunda takÄ±mÄ±nÄ±n Kanat bÃ¶lgesinde istikrarlÄ± performansÄ± ve kalitesiyle kadro derinliÄŸine Ã¶nemli katkÄ± saÄŸladÄ±.", career:["Rizespor"], strengths:["Pas","Teknik"] },
  { name:"Mithat Pala", team:"Rizespor", position:"Orta saha", age:20, marketValue:1.2, goals:0, assists:2, minutes:1086, bigMatch:77, form:83, story:"2025-26 sezonunda takÄ±mÄ±nÄ±n Orta saha bÃ¶lgesinde istikrarlÄ± performansÄ± ve kalitesiyle kadro derinliÄŸine Ã¶nemli katkÄ± saÄŸladÄ±.", career:["Rizespor"], strengths:["Pas","Teknik"] },
  { name:"Emrecan Bulut", team:"Rizespor", position:"Defans", age:20, marketValue:0.9, goals:0, assists:2, minutes:2213, bigMatch:80, form:79, story:"2025-26 sezonunda takÄ±mÄ±nÄ±n Defans bÃ¶lgesinde istikrarlÄ± performansÄ± ve kalitesiyle kadro derinliÄŸine Ã¶nemli katkÄ± saÄŸladÄ±.", career:["Rizespor"], strengths:["Markaj","Hava Topu"] },
  { name:"Pinchi", team:"Rizespor", position:"Kanat", age:27, marketValue:2.2, goals:9, assists:8, minutes:1304, bigMatch:75, form:84, story:"2025-26 sezonunda takÄ±mÄ±nÄ±n Kanat bÃ¶lgesinde istikrarlÄ± performansÄ± ve kalitesiyle kadro derinliÄŸine Ã¶nemli katkÄ± saÄŸladÄ±.", career:["Rizespor"], strengths:["Pas","Teknik"] },
  { name:"Oumar Diouf", team:"Rizespor", position:"Forvet", age:24, marketValue:2.7, goals:8, assists:1, minutes:2210, bigMatch:71, form:73, story:"2025-26 sezonunda takÄ±mÄ±nÄ±n Forvet bÃ¶lgesinde istikrarlÄ± performansÄ± ve kalitesiyle kadro derinliÄŸine Ã¶nemli katkÄ± saÄŸladÄ±.", career:["Rizespor"], strengths:["Pas","Teknik"] },
  { name:"Ivo GrbiÄ‡", team:"Karagumruk", position:"Kaleci", age:28, marketValue:2.0, goals:0, assists:0, minutes:2800, bigMatch:81, form:82, story:"HÄ±rvat kaleci, Atletico Madrid ve Sheffield United geÃ§miÅŸiyle KaragÃ¼mrÃ¼k kalesinde uluslararasÄ± kalite sergiledi.", career:["Atletico Madrid","Sheffield United","Karagumruk"], strengths:["Refleks","Bire Bir","KurtarÄ±ÅŸ"] },
  { name:"Igor Lichnovsky", team:"Karagumruk", position:"Defans", age:31, marketValue:1.5, goals:2, assists:1, minutes:2700, bigMatch:81, form:82, story:"Åili milli takÄ±mÄ±nÄ±n tecrÃ¼beli stoperi, KaragÃ¼mrÃ¼k savunmasÄ±nda liderlik ve disiplin getirdi.", career:["Cruz Azul","Ã‡eÅŸitli","Karagumruk"], strengths:["GÃ¼Ã§","Liderlik","TecrÃ¼be"] },
  { name:"Filip MladenoviÄ‡", team:"Karagumruk", position:"Defans", age:33, marketValue:1.0, goals:1, assists:5, minutes:2600, bigMatch:80, form:80, story:"SÄ±rp sol bek, tecrÃ¼besi ve hÃ¼cum katkÄ±sÄ±yla KaragÃ¼mrÃ¼k sol kulvarÄ±nÄ± uzun sÃ¼redir yÃ¶netmektedir.", career:["PAOK","Legia","Karagumruk"], strengths:["TecrÃ¼be","Orta","Savunma"] },
  { name:"Ricardo Esgaio", team:"Karagumruk", position:"Defans", age:32, marketValue:1.5, goals:0, assists:4, minutes:2500, bigMatch:80, form:81, story:"Portekizli saÄŸ bek, Sporting CP geÃ§miÅŸiyle KaragÃ¼mrÃ¼k'Ã¼n saÄŸ kulvarÄ±nÄ± yÃ¶netti.", career:["Sporting CP","Braga","Karagumruk"], strengths:["HÄ±z","Savunma","Orta"] },
  { name:"Matias Kranevitter", team:"Karagumruk", position:"Orta saha", age:33, marketValue:1.5, goals:3, assists:5, minutes:2600, bigMatch:82, form:82, story:"Arjantinli defensive orta saha, Atletico Madrid ve Zenit geÃ§miÅŸiyle KaragÃ¼mrÃ¼k'Ã¼n oyun merkezi oldu.", career:["Atletico Madrid","Zenit","Karagumruk"], strengths:["Top Kapma","Pas","TecrÃ¼be"] },
  { name:"Berkay Ã–zcan", team:"Karagumruk", position:"Orta saha", age:27, marketValue:3.0, goals:5, assists:8, minutes:2700, bigMatch:84, form:85, story:"StuttgartlÄ± TÃ¼rk milli takÄ±m oyuncusu, tekniÄŸi ve oyun gÃ¶rÃ¼ÅŸÃ¼yle KaragÃ¼mrÃ¼k'Ã¼n kilit yaratÄ±cÄ±sÄ± oldu.", career:["Stuttgart","BaÅŸakÅŸehir","Karagumruk"], strengths:["Teknik","Pas","Oyun GÃ¶rÃ¼ÅŸÃ¼"] },
  { name:"Daniele Verde", team:"Karagumruk", position:"Orta saha", age:28, marketValue:3.0, goals:6, assists:7, minutes:2500, bigMatch:83, form:84, story:"Ä°talyan yaratÄ±cÄ± oyuncu, teknik kalitesi ve serbest vuruÅŸ ustalÄ±ÄŸÄ±yla KaragÃ¼mrÃ¼k'Ã¼n en Ã¶nemli silahlarÄ±ndan biri oldu.", career:["Ã‡eÅŸitli Ä°talya","Karagumruk"], strengths:["Teknik","Duran Top","Åut"] },
  { name:"David Datro Fofana", team:"Karagumruk", position:"Forvet", age:23, marketValue:5.0, goals:11, assists:3, minutes:2500, bigMatch:85, form:86, story:"Chelsea'den kiralÄ±k FildiÅŸi Sahilli genÃ§ golcÃ¼, 11 golle ligin en dikkat Ã§ekici genÃ§lerinden biri oldu.", career:["Molde","Chelsea","Karagumruk"], strengths:["HÄ±z","Bitiricilik","Fizik"] },
  { name:"Sam Larsson", team:"Karagumruk", position:"Kanat", age:31, marketValue:2.0, goals:5, assists:8, minutes:2300, bigMatch:81, form:82, story:"Ä°sveÃ§li milli takÄ±m kanadÄ±, tecrÃ¼besi ve teknik gÃ¼cÃ¼yle KaragÃ¼mrÃ¼k hÃ¼cumunu besleyen kritik isim oldu.", career:["Feyenoord","Ã‡eÅŸitli","Karagumruk"], strengths:["Teknik","Asist","TecrÃ¼be"] },
  { name:"Tiago Ã‡ukur", team:"Karagumruk", position:"Forvet", age:20, marketValue:4.0, goals:7, assists:2, minutes:2000, bigMatch:82, form:84, story:"FenerbahÃ§e akademisinden Ã§Ä±kan TÃ¼rk-Alman genÃ§ golcÃ¼, KaragÃ¼mrÃ¼k'te SÃ¼per Lig'de patlayÄ±cÄ± bir ilk sezon geÃ§irdi.", career:["FenerbahÃ§e","Karagumruk"], strengths:["HÄ±z","Bitiricilik","Potansiyel"] },
  { name:"Valentin Eysseric", team:"Karagumruk", position:"Kaleci", age:32, marketValue:1.5, goals:2, assists:1, minutes:2210, bigMatch:73, form:77, story:"2025-26 sezonunda takÄ±mÄ±nÄ±n Kaleci bÃ¶lgesinde istikrarlÄ± performansÄ± ve kalitesiyle kadro derinliÄŸine Ã¶nemli katkÄ± saÄŸladÄ±.", career:["Karagumruk"], strengths:["Refleks","KurtarÄ±ÅŸ"] },
  { name:"Lasse Schone", team:"Karagumruk", position:"Orta saha", age:30, marketValue:2.7, goals:0, assists:9, minutes:1989, bigMatch:81, form:86, story:"2025-26 sezonunda takÄ±mÄ±nÄ±n Orta saha bÃ¶lgesinde istikrarlÄ± performansÄ± ve kalitesiyle kadro derinliÄŸine Ã¶nemli katkÄ± saÄŸladÄ±.", career:["Karagumruk"], strengths:["Pas","Teknik"] },
  { name:"Adnan Ugur", team:"Karagumruk", position:"Kaleci", age:29, marketValue:2.7, goals:0, assists:1, minutes:1114, bigMatch:75, form:74, story:"2025-26 sezonunda takÄ±mÄ±nÄ±n Kaleci bÃ¶lgesinde istikrarlÄ± performansÄ± ve kalitesiyle kadro derinliÄŸine Ã¶nemli katkÄ± saÄŸladÄ±.", career:["Karagumruk"], strengths:["Refleks","KurtarÄ±ÅŸ"] },
  { name:"Levent Mercan", team:"Karagumruk", position:"Kanat", age:25, marketValue:0.8, goals:9, assists:4, minutes:2260, bigMatch:71, form:78, story:"2025-26 sezonunda takÄ±mÄ±nÄ±n Kanat bÃ¶lgesinde istikrarlÄ± performansÄ± ve kalitesiyle kadro derinliÄŸine Ã¶nemli katkÄ± saÄŸladÄ±.", career:["Karagumruk"], strengths:["Pas","Teknik"] },
  { name:"Davide Biraschi", team:"Karagumruk", position:"Forvet", age:32, marketValue:3.0, goals:11, assists:1, minutes:1071, bigMatch:83, form:86, story:"2025-26 sezonunda takÄ±mÄ±nÄ±n Forvet bÃ¶lgesinde istikrarlÄ± performansÄ± ve kalitesiyle kadro derinliÄŸine Ã¶nemli katkÄ± saÄŸladÄ±.", career:["Karagumruk"], strengths:["Pas","Teknik"] },
  { name:"Federico Ceccherini", team:"Karagumruk", position:"Defans", age:22, marketValue:0.8, goals:0, assists:0, minutes:1317, bigMatch:82, form:74, story:"2025-26 sezonunda takÄ±mÄ±nÄ±n Defans bÃ¶lgesinde istikrarlÄ± performansÄ± ve kalitesiyle kadro derinliÄŸine Ã¶nemli katkÄ± saÄŸladÄ±.", career:["Karagumruk"], strengths:["Markaj","Hava Topu"] },
  { name:"Flavio Paoletti", team:"Karagumruk", position:"Orta saha", age:31, marketValue:2.0, goals:2, assists:9, minutes:2120, bigMatch:80, form:70, story:"2025-26 sezonunda takÄ±mÄ±nÄ±n Orta saha bÃ¶lgesinde istikrarlÄ± performansÄ± ve kalitesiyle kadro derinliÄŸine Ã¶nemli katkÄ± saÄŸladÄ±.", career:["Karagumruk"], strengths:["Pas","Teknik"] },
  { name:"Sofiane Feghouli", team:"Karagumruk", position:"Orta saha", age:22, marketValue:2.9, goals:0, assists:7, minutes:1747, bigMatch:71, form:82, story:"2025-26 sezonunda takÄ±mÄ±nÄ±n Orta saha bÃ¶lgesinde istikrarlÄ± performansÄ± ve kalitesiyle kadro derinliÄŸine Ã¶nemli katkÄ± saÄŸladÄ±.", career:["Karagumruk"], strengths:["Pas","Teknik"] },
  { name:"Ryan Mendes", team:"Karagumruk", position:"Orta saha", age:25, marketValue:0.9, goals:0, assists:7, minutes:2327, bigMatch:77, form:70, story:"2025-26 sezonunda takÄ±mÄ±nÄ±n Orta saha bÃ¶lgesinde istikrarlÄ± performansÄ± ve kalitesiyle kadro derinliÄŸine Ã¶nemli katkÄ± saÄŸladÄ±.", career:["Karagumruk"], strengths:["Pas","Teknik"] },
  { name:"Kevin Lasagna", team:"Karagumruk", position:"Kanat", age:33, marketValue:0.5, goals:6, assists:9, minutes:1424, bigMatch:83, form:79, story:"2025-26 sezonunda takÄ±mÄ±nÄ±n Kanat bÃ¶lgesinde istikrarlÄ± performansÄ± ve kalitesiyle kadro derinliÄŸine Ã¶nemli katkÄ± saÄŸladÄ±.", career:["Karagumruk"], strengths:["Pas","Teknik"] },
  { name:"Koray Gunter", team:"Karagumruk", position:"Orta saha", age:32, marketValue:1.0, goals:1, assists:3, minutes:1286, bigMatch:78, form:73, story:"2025-26 sezonunda takÄ±mÄ±nÄ±n Orta saha bÃ¶lgesinde istikrarlÄ± performansÄ± ve kalitesiyle kadro derinliÄŸine Ã¶nemli katkÄ± saÄŸladÄ±.", career:["Karagumruk"], strengths:["Pas","Teknik"] },
  { name:"Emre Mor", team:"Karagumruk", position:"Defans", age:33, marketValue:1.4, goals:0, assists:0, minutes:2063, bigMatch:73, form:84, story:"2025-26 sezonunda takÄ±mÄ±nÄ±n Defans bÃ¶lgesinde istikrarlÄ± performansÄ± ve kalitesiyle kadro derinliÄŸine Ã¶nemli katkÄ± saÄŸladÄ±.", career:["Karagumruk"], strengths:["Markaj","Hava Topu"] },
  { name:"Salih Dursun", team:"Karagumruk", position:"Kaleci", age:26, marketValue:1.7, goals:2, assists:0, minutes:2169, bigMatch:79, form:81, story:"2025-26 sezonunda takÄ±mÄ±nÄ±n Kaleci bÃ¶lgesinde istikrarlÄ± performansÄ± ve kalitesiyle kadro derinliÄŸine Ã¶nemli katkÄ± saÄŸladÄ±.", career:["Karagumruk"], strengths:["Refleks","KurtarÄ±ÅŸ"] },
  { name:"Gven Yalcn", team:"Karagumruk", position:"Defans", age:28, marketValue:0.9, goals:2, assists:2, minutes:1403, bigMatch:71, form:74, story:"2025-26 sezonunda takÄ±mÄ±nÄ±n Defans bÃ¶lgesinde istikrarlÄ± performansÄ± ve kalitesiyle kadro derinliÄŸine Ã¶nemli katkÄ± saÄŸladÄ±.", career:["Karagumruk"], strengths:["Markaj","Hava Topu"] },
  { name:"Can Keles", team:"Karagumruk", position:"Defans", age:26, marketValue:2.1, goals:2, assists:0, minutes:1990, bigMatch:76, form:77, story:"2025-26 sezonunda takÄ±mÄ±nÄ±n Defans bÃ¶lgesinde istikrarlÄ± performansÄ± ve kalitesiyle kadro derinliÄŸine Ã¶nemli katkÄ± saÄŸladÄ±.", career:["Karagumruk"], strengths:["Markaj","Hava Topu"] },
  { name:"Bilal BayazÄ±t", team:"Kayserispor", position:"Kaleci", age:28, marketValue:2.0, goals:0, assists:0, minutes:3000, bigMatch:81, form:82, story:"Ä°sveÃ§ milli takÄ±mÄ±nÄ±n genÃ§ kalecisi, Kayserispor'da olaÄŸanÃ¼stÃ¼ kurtarÄ±ÅŸlarla takÄ±mÄ±n puan toplamasÄ±na Ã¶nemli katkÄ± saÄŸladÄ±.", career:["Ã‡eÅŸitli","Kayserispor"], strengths:["Refleks","Bire Bir","KurtarÄ±ÅŸ"] },
  { name:"Stefano Denswil", team:"Kayserispor", position:"Defans", age:31, marketValue:2.0, goals:1, assists:2, minutes:2800, bigMatch:81, form:82, story:"HollandalÄ± stoper, Club Brugge ve Inter geÃ§miÅŸiyle Kayserispor'un savunmasÄ±na Ã¼st dÃ¼zey kalite kattÄ±.", career:["Club Brugge","Bologna","Kayserispor"], strengths:["GÃ¼Ã§","Hava Topu","TecrÃ¼be"] },
  { name:"Majid Hosseini", team:"Kayserispor", position:"Defans", age:26, marketValue:2.5, goals:2, assists:1, minutes:2700, bigMatch:82, form:83, story:"Ä°ranlÄ± genÃ§ stoper, gÃ¼Ã§lÃ¼ fiziÄŸi ve topaklÄ±k yeteneÄŸiyle Kayserispor'un en deÄŸerli defans oyuncularÄ±ndan biri oldu.", career:["Ã‡eÅŸitli","Kayserispor"], strengths:["GÃ¼Ã§","Markaj","Fizik"] },
  { name:"LÃ¡szlÃ³ BÃ©nes", team:"Kayserispor", position:"Orta saha", age:28, marketValue:3.0, goals:5, assists:8, minutes:2700, bigMatch:84, form:85, story:"Slovakya milli takÄ±mÄ±nÄ±n kilit oyuncusu, teknik kalitesi ve pas vizyonuyla Kayserispor'un oyun kurucusu oldu.", career:["Borussia MG","Hamburger SV","Kayserispor"], strengths:["Pas","Teknik","Oyun GÃ¶rÃ¼ÅŸÃ¼"] },
  { name:"Youssef AÃ¯t Bennasser", team:"Kayserispor", position:"Orta saha", age:28, marketValue:2.5, goals:3, assists:5, minutes:2500, bigMatch:82, form:83, story:"FaslÄ± milli oyuncu, orta sahada disiplin ve kalitesiyle Kayserispor'a Avrupa seviyesi getirdi.", career:["Nantes","Kayserispor"], strengths:["Top Kapma","Pas","Dinamizm"] },
  { name:"Dorukhan TokÃ¶z", team:"Kayserispor", position:"Orta saha", age:30, marketValue:2.0, goals:4, assists:6, minutes:2400, bigMatch:82, form:83, story:"Milli oyuncu, BeÅŸiktaÅŸ'tan sonra Kayserispor'da merkez orta sahada liderlik rolÃ¼ Ã¼stlendi.", career:["BeÅŸiktaÅŸ","Kayserispor"], strengths:["Pas","Liderlik","Top Kapma"] },
  { name:"Miguel Cardoso", team:"Kayserispor", position:"Forvet", age:24, marketValue:4.0, goals:13, assists:5, minutes:2700, bigMatch:85, form:86, story:"Portekizli genÃ§ golcÃ¼, 13 golle sezonun en sÃ¼rpriz ismi olarak Kayserispor'u neredeyse tek baÅŸÄ±na taÅŸÄ±dÄ±.", career:["Benfica","Kayserispor"], strengths:["HÄ±z","Bitiricilik","Teknik"] },
  { name:"Carlos ManÃ©", team:"Kayserispor", position:"Kanat", age:33, marketValue:2.0, goals:6, assists:7, minutes:2200, bigMatch:82, form:82, story:"TecrÃ¼beli Gine-Bissaulu kanat, bireysel kalitesi ve gol katkÄ±sÄ±yla Kayserispor hÃ¼cumuna farklÄ± bir boyut kattÄ±.", career:["Sporting CP","RB Leipzig","Kayserispor"], strengths:["HÄ±z","Dribbling","Teknik"] },
  { name:"Sam Mather", team:"Kayserispor", position:"Orta saha", age:22, marketValue:2.0, goals:3, assists:5, minutes:2000, bigMatch:80, form:82, story:"Ä°ngiliz genÃ§ orta saha, Manchester United akademisinden gelen Mather, Kayserispor'da SÃ¼per Lig deneyimi kazandÄ±.", career:["Manchester United","Kayserispor"], strengths:["Dinamizm","Potansiyel","Teknik"] },
  { name:"Joshua Brenet", team:"Kayserispor", position:"Defans", age:30, marketValue:1.5, goals:0, assists:4, minutes:2600, bigMatch:80, form:81, story:"HollandalÄ± saÄŸ bek, PSV ve Ã§eÅŸitli Hollanda-Almanya deneyimiyle Kayserispor'un saÄŸ kulvarÄ±nÄ± yÃ¶netti.", career:["PSV","TSG Hoffenheim","Kayserispor"], strengths:["HÄ±z","Savunma","Orta"] },
  { name:"Stephane Bahoken", team:"Kayserispor", position:"Forvet", age:20, marketValue:2.1, goals:8, assists:1, minutes:1531, bigMatch:83, form:70, story:"2025-26 sezonunda takÄ±mÄ±nÄ±n Forvet bÃ¶lgesinde istikrarlÄ± performansÄ± ve kalitesiyle kadro derinliÄŸine Ã¶nemli katkÄ± saÄŸladÄ±.", career:["Kayserispor"], strengths:["Pas","Teknik"] },
  { name:"Ali Karimi", team:"Kayserispor", position:"Kanat", age:23, marketValue:1.2, goals:6, assists:8, minutes:2454, bigMatch:77, form:84, story:"2025-26 sezonunda takÄ±mÄ±nÄ±n Kanat bÃ¶lgesinde istikrarlÄ± performansÄ± ve kalitesiyle kadro derinliÄŸine Ã¶nemli katkÄ± saÄŸladÄ±.", career:["Kayserispor"], strengths:["Pas","Teknik"] },
  { name:"Gokhan Sazdagi", team:"Kayserispor", position:"Defans", age:28, marketValue:0.7, goals:1, assists:0, minutes:1866, bigMatch:77, form:87, story:"2025-26 sezonunda takÄ±mÄ±nÄ±n Defans bÃ¶lgesinde istikrarlÄ± performansÄ± ve kalitesiyle kadro derinliÄŸine Ã¶nemli katkÄ± saÄŸladÄ±.", career:["Kayserispor"], strengths:["Markaj","Hava Topu"] },
  { name:"Mehdi Bourabia", team:"Kayserispor", position:"Forvet", age:21, marketValue:2.2, goals:8, assists:0, minutes:1739, bigMatch:77, form:76, story:"2025-26 sezonunda takÄ±mÄ±nÄ±n Forvet bÃ¶lgesinde istikrarlÄ± performansÄ± ve kalitesiyle kadro derinliÄŸine Ã¶nemli katkÄ± saÄŸladÄ±.", career:["Kayserispor"], strengths:["Pas","Teknik"] },
  { name:"Julian Jeanvier", team:"Kayserispor", position:"Kaleci", age:21, marketValue:0.6, goals:0, assists:2, minutes:2393, bigMatch:72, form:87, story:"2025-26 sezonunda takÄ±mÄ±nÄ±n Kaleci bÃ¶lgesinde istikrarlÄ± performansÄ± ve kalitesiyle kadro derinliÄŸine Ã¶nemli katkÄ± saÄŸladÄ±.", career:["Kayserispor"], strengths:["Refleks","KurtarÄ±ÅŸ"] },
  { name:"Lionel Carole", team:"Kayserispor", position:"Kanat", age:21, marketValue:0.9, goals:6, assists:9, minutes:1980, bigMatch:76, form:75, story:"2025-26 sezonunda takÄ±mÄ±nÄ±n Kanat bÃ¶lgesinde istikrarlÄ± performansÄ± ve kalitesiyle kadro derinliÄŸine Ã¶nemli katkÄ± saÄŸladÄ±.", career:["Kayserispor"], strengths:["Pas","Teknik"] },
  { name:"Joseph Attamah", team:"Kayserispor", position:"Forvet", age:31, marketValue:1.4, goals:9, assists:1, minutes:2209, bigMatch:75, form:74, story:"2025-26 sezonunda takÄ±mÄ±nÄ±n Forvet bÃ¶lgesinde istikrarlÄ± performansÄ± ve kalitesiyle kadro derinliÄŸine Ã¶nemli katkÄ± saÄŸladÄ±.", career:["Kayserispor"], strengths:["Pas","Teknik"] },
  { name:"Anthony Uzodimma", team:"Kayserispor", position:"Orta saha", age:31, marketValue:2.0, goals:1, assists:5, minutes:1411, bigMatch:84, form:74, story:"2025-26 sezonunda takÄ±mÄ±nÄ±n Orta saha bÃ¶lgesinde istikrarlÄ± performansÄ± ve kalitesiyle kadro derinliÄŸine Ã¶nemli katkÄ± saÄŸladÄ±.", career:["Kayserispor"], strengths:["Pas","Teknik"] },
  { name:"Karimi Ali", team:"Kayserispor", position:"Kanat", age:20, marketValue:1.3, goals:8, assists:9, minutes:1727, bigMatch:82, form:76, story:"2025-26 sezonunda takÄ±mÄ±nÄ±n Kanat bÃ¶lgesinde istikrarlÄ± performansÄ± ve kalitesiyle kadro derinliÄŸine Ã¶nemli katkÄ± saÄŸladÄ±.", career:["Kayserispor"], strengths:["Pas","Teknik"] },
  { name:"Talha Sararslan", team:"Kayserispor", position:"Orta saha", age:22, marketValue:0.4, goals:2, assists:4, minutes:1059, bigMatch:71, form:74, story:"2025-26 sezonunda takÄ±mÄ±nÄ±n Orta saha bÃ¶lgesinde istikrarlÄ± performansÄ± ve kalitesiyle kadro derinliÄŸine Ã¶nemli katkÄ± saÄŸladÄ±.", career:["Kayserispor"], strengths:["Pas","Teknik"] },
  { name:"Eray Ozbek", team:"Kayserispor", position:"Kanat", age:27, marketValue:1.9, goals:4, assists:2, minutes:2182, bigMatch:82, form:73, story:"2025-26 sezonunda takÄ±mÄ±nÄ±n Kanat bÃ¶lgesinde istikrarlÄ± performansÄ± ve kalitesiyle kadro derinliÄŸine Ã¶nemli katkÄ± saÄŸladÄ±.", career:["Kayserispor"], strengths:["Pas","Teknik"] },
  { name:"Ramazan Civelek", team:"Kayserispor", position:"Kanat", age:31, marketValue:1.4, goals:3, assists:3, minutes:2144, bigMatch:77, form:76, story:"2025-26 sezonunda takÄ±mÄ±nÄ±n Kanat bÃ¶lgesinde istikrarlÄ± performansÄ± ve kalitesiyle kadro derinliÄŸine Ã¶nemli katkÄ± saÄŸladÄ±.", career:["Kayserispor"], strengths:["Pas","Teknik"] },
  { name:"Arif Kocaman", team:"Kayserispor", position:"Kaleci", age:20, marketValue:1.8, goals:2, assists:0, minutes:2151, bigMatch:76, form:78, story:"2025-26 sezonunda takÄ±mÄ±nÄ±n Kaleci bÃ¶lgesinde istikrarlÄ± performansÄ± ve kalitesiyle kadro derinliÄŸine Ã¶nemli katkÄ± saÄŸladÄ±.", career:["Kayserispor"], strengths:["Refleks","KurtarÄ±ÅŸ"] },
  { name:"Yaw Ackah", team:"Kayserispor", position:"Kaleci", age:21, marketValue:1.0, goals:1, assists:2, minutes:1785, bigMatch:84, form:78, story:"2025-26 sezonunda takÄ±mÄ±nÄ±n Kaleci bÃ¶lgesinde istikrarlÄ± performansÄ± ve kalitesiyle kadro derinliÄŸine Ã¶nemli katkÄ± saÄŸladÄ±.", career:["Kayserispor"], strengths:["Refleks","KurtarÄ±ÅŸ"] },
  { name:"Hasan Ali Kaldirim", team:"Kayserispor", position:"Kanat", age:27, marketValue:1.9, goals:11, assists:6, minutes:2117, bigMatch:73, form:87, story:"2025-26 sezonunda takÄ±mÄ±nÄ±n Kanat bÃ¶lgesinde istikrarlÄ± performansÄ± ve kalitesiyle kadro derinliÄŸine Ã¶nemli katkÄ± saÄŸladÄ±.", career:["Kayserispor"], strengths:["Pas","Teknik"] },
  { name:"JuliÃ¡n Cuesta", team:"Antalyaspor", position:"Kaleci", age:27, marketValue:0.8, goals:0, assists:0, minutes:3100, bigMatch:78, form:79, story:"Arjantinli kaleci, Antalyaspor kalesini saÄŸlam tutarak sezon boyunca gÃ¼ven verdi.", career:["Independiente","Antalyaspor"], strengths:["Refleks","Bire Bir","Sakinlik"] },
  { name:"Lautaro Giannetti", team:"Antalyaspor", position:"Defans", age:29, marketValue:1.5, goals:2, assists:1, minutes:2800, bigMatch:80, form:81, story:"Arjantinli stoper, gÃ¼Ã§lÃ¼ fiziÄŸi ve savunma liderliÄŸiyle Antalyaspor'un arka hattÄ±nÄ±n direÄŸiydi.", career:["VÃ©lez","Antalyaspor"], strengths:["GÃ¼Ã§","Hava Topu","Liderlik"] },
  { name:"Georgiy Dzhikiya", team:"Antalyaspor", position:"Defans", age:31, marketValue:1.2, goals:1, assists:1, minutes:2600, bigMatch:80, form:80, story:"Rus milli takÄ±mÄ±nÄ±n tecrÃ¼beli stoperi, Antalyaspor'da rakip forvete hayat hakkÄ± tanÄ±madÄ±.", career:["Spartak Moskova","Antalyaspor"], strengths:["GÃ¼Ã§","MÃ¼dahale","TecrÃ¼be"] },
  { name:"AbdÃ¼lkadir Ã–mÃ¼r", team:"Antalyaspor", position:"Orta saha", age:26, marketValue:2.0, goals:5, assists:7, minutes:2400, bigMatch:83, form:84, story:"Trabzonspor'un deÄŸerli yetiÅŸtirmesi milli orta saha, Antalyaspor'da yaratÄ±cÄ± oyunuyla sezonun isimlerinden biri oldu.", career:["Trabzonspor","Hull City","Antalyaspor"], strengths:["Teknik","Vizyon","Dribbling"] },
  { name:"Dario Å ariÄ‡", team:"Antalyaspor", position:"Orta saha", age:31, marketValue:1.5, goals:4, assists:5, minutes:2500, bigMatch:81, form:82, story:"BosnalÄ± merkez orta saha, pas kalitesi ve oyun gÃ¶rÃ¼ÅŸÃ¼yle Antalyaspor'un motorunu oluÅŸturdu.", career:["Anderlecht","Ã‡eÅŸitli","Antalyaspor"], strengths:["Pas","Oyun GÃ¶rÃ¼ÅŸÃ¼","Liderlik"] },
  { name:"Kenneth Paal", team:"Antalyaspor", position:"Defans", age:27, marketValue:1.5, goals:0, assists:4, minutes:2700, bigMatch:79, form:81, story:"HollandalÄ± sol bek, hem savunma hem hÃ¼cumda dengeli performansÄ±yla dikkat Ã§ekti.", career:["PSV","Antalyaspor"], strengths:["HÄ±z","Orta","Savunma"] },
  { name:"Sander van de Streek", team:"Antalyaspor", position:"Orta saha", age:31, marketValue:1.2, goals:3, assists:6, minutes:2300, bigMatch:80, form:81, story:"HollandalÄ± orta saha, top kapma ve distribÃ¼syon kalitesiyle Antalyaspor'un kalbinde gÃ¶rev yaptÄ±.", career:["FC Utrecht","Antalyaspor"], strengths:["Pas","Top Kapma","Ä°ÅŸ Disiplini"] },
  { name:"Soner Dikmen", team:"Antalyaspor", position:"Defans", age:28, marketValue:1.0, goals:0, assists:2, minutes:2400, bigMatch:78, form:79, story:"SaÄŸ bekte savunma gÃ¼cÃ¼ ve Ã§alÄ±ÅŸkanlÄ±ÄŸÄ±yla Antalyaspor'un gÃ¼venilir ismi oldu.", career:["KaragÃ¼mrÃ¼k","Antalyaspor"], strengths:["Savunma","DayanÄ±klÄ±lÄ±k","Disiplin"] },
  { name:"Adam Buksa", team:"Antalyaspor", position:"Kaleci", age:23, marketValue:2.5, goals:0, assists:0, minutes:1981, bigMatch:73, form:82, story:"2025-26 sezonunda takÄ±mÄ±nÄ±n Kaleci bÃ¶lgesinde istikrarlÄ± performansÄ± ve kalitesiyle kadro derinliÄŸine Ã¶nemli katkÄ± saÄŸladÄ±.", career:["Antalyaspor"], strengths:["Refleks","KurtarÄ±ÅŸ"] },
  { name:"Sam Larsson", team:"Antalyaspor", position:"Kanat", age:28, marketValue:1.9, goals:5, assists:4, minutes:1340, bigMatch:70, form:86, story:"2025-26 sezonunda takÄ±mÄ±nÄ±n Kanat bÃ¶lgesinde istikrarlÄ± performansÄ± ve kalitesiyle kadro derinliÄŸine Ã¶nemli katkÄ± saÄŸladÄ±.", career:["Antalyaspor"], strengths:["Pas","Teknik"] },
  { name:"Sagiv Jehezkel", team:"Antalyaspor", position:"Kaleci", age:23, marketValue:0.8, goals:2, assists:1, minutes:1669, bigMatch:76, form:73, story:"2025-26 sezonunda takÄ±mÄ±nÄ±n Kaleci bÃ¶lgesinde istikrarlÄ± performansÄ± ve kalitesiyle kadro derinliÄŸine Ã¶nemli katkÄ± saÄŸladÄ±.", career:["Antalyaspor"], strengths:["Refleks","KurtarÄ±ÅŸ"] },
  { name:"Ramzi Safuri", team:"Antalyaspor", position:"Forvet", age:33, marketValue:1.3, goals:8, assists:0, minutes:1791, bigMatch:82, form:77, story:"2025-26 sezonunda takÄ±mÄ±nÄ±n Forvet bÃ¶lgesinde istikrarlÄ± performansÄ± ve kalitesiyle kadro derinliÄŸine Ã¶nemli katkÄ± saÄŸladÄ±.", career:["Antalyaspor"], strengths:["Pas","Teknik"] },
  { name:"Jakub Kaluzinski", team:"Antalyaspor", position:"Kanat", age:29, marketValue:1.8, goals:11, assists:8, minutes:1541, bigMatch:76, form:76, story:"2025-26 sezonunda takÄ±mÄ±nÄ±n Kanat bÃ¶lgesinde istikrarlÄ± performansÄ± ve kalitesiyle kadro derinliÄŸine Ã¶nemli katkÄ± saÄŸladÄ±.", career:["Antalyaspor"], strengths:["Pas","Teknik"] },
  { name:"Veysel Sari", team:"Antalyaspor", position:"Forvet", age:28, marketValue:1.9, goals:3, assists:2, minutes:1919, bigMatch:71, form:78, story:"2025-26 sezonunda takÄ±mÄ±nÄ±n Forvet bÃ¶lgesinde istikrarlÄ± performansÄ± ve kalitesiyle kadro derinliÄŸine Ã¶nemli katkÄ± saÄŸladÄ±.", career:["Antalyaspor"], strengths:["Pas","Teknik"] },
  { name:"Erdogan Yesilyurt", team:"Antalyaspor", position:"Orta saha", age:31, marketValue:2.2, goals:0, assists:6, minutes:1473, bigMatch:76, form:83, story:"2025-26 sezonunda takÄ±mÄ±nÄ±n Orta saha bÃ¶lgesinde istikrarlÄ± performansÄ± ve kalitesiyle kadro derinliÄŸine Ã¶nemli katkÄ± saÄŸladÄ±.", career:["Antalyaspor"], strengths:["Pas","Teknik"] },
  { name:"Guray Vural", team:"Antalyaspor", position:"Forvet", age:31, marketValue:0.9, goals:2, assists:0, minutes:1905, bigMatch:79, form:72, story:"2025-26 sezonunda takÄ±mÄ±nÄ±n Forvet bÃ¶lgesinde istikrarlÄ± performansÄ± ve kalitesiyle kadro derinliÄŸine Ã¶nemli katkÄ± saÄŸladÄ±.", career:["Antalyaspor"], strengths:["Pas","Teknik"] },
  { name:"Bahadir Ozturk", team:"Antalyaspor", position:"Forvet", age:23, marketValue:1.5, goals:8, assists:1, minutes:1058, bigMatch:71, form:83, story:"2025-26 sezonunda takÄ±mÄ±nÄ±n Forvet bÃ¶lgesinde istikrarlÄ± performansÄ± ve kalitesiyle kadro derinliÄŸine Ã¶nemli katkÄ± saÄŸladÄ±.", career:["Antalyaspor"], strengths:["Pas","Teknik"] },
  { name:"Mert Yilmaz", team:"Antalyaspor", position:"Kanat", age:31, marketValue:2.5, goals:11, assists:7, minutes:1358, bigMatch:75, form:74, story:"2025-26 sezonunda takÄ±mÄ±nÄ±n Kanat bÃ¶lgesinde istikrarlÄ± performansÄ± ve kalitesiyle kadro derinliÄŸine Ã¶nemli katkÄ± saÄŸladÄ±.", career:["Antalyaspor"], strengths:["Pas","Teknik"] },
  { name:"KaÄŸan Ã–zkan", team:"Antalyaspor", position:"Forvet", age:33, marketValue:0.6, goals:4, assists:1, minutes:1712, bigMatch:83, form:78, story:"2025-26 sezonunda takÄ±mÄ±nÄ±n Forvet bÃ¶lgesinde istikrarlÄ± performansÄ± ve kalitesiyle kadro derinliÄŸine Ã¶nemli katkÄ± saÄŸladÄ±.", career:["Antalyaspor"], strengths:["Pas","Teknik"] },
  { name:"Amar Gerxhaliu", team:"Antalyaspor", position:"Defans", age:33, marketValue:0.7, goals:2, assists:0, minutes:1651, bigMatch:72, form:75, story:"2025-26 sezonunda takÄ±mÄ±nÄ±n Defans bÃ¶lgesinde istikrarlÄ± performansÄ± ve kalitesiyle kadro derinliÄŸine Ã¶nemli katkÄ± saÄŸladÄ±.", career:["Antalyaspor"], strengths:["Markaj","Hava Topu"] },
  { name:"Ufuk Akyol", team:"Antalyaspor", position:"Forvet", age:28, marketValue:1.1, goals:7, assists:0, minutes:1688, bigMatch:84, form:78, story:"2025-26 sezonunda takÄ±mÄ±nÄ±n Forvet bÃ¶lgesinde istikrarlÄ± performansÄ± ve kalitesiyle kadro derinliÄŸine Ã¶nemli katkÄ± saÄŸladÄ±.", career:["Antalyaspor"], strengths:["Pas","Teknik"] },
  { name:"Deniz Kadah", team:"Antalyaspor", position:"Kanat", age:22, marketValue:1.6, goals:9, assists:4, minutes:1809, bigMatch:70, form:80, story:"2025-26 sezonunda takÄ±mÄ±nÄ±n Kanat bÃ¶lgesinde istikrarlÄ± performansÄ± ve kalitesiyle kadro derinliÄŸine Ã¶nemli katkÄ± saÄŸladÄ±.", career:["Antalyaspor"], strengths:["Pas","Teknik"] },
  { name:"Ege Bilsel", team:"Antalyaspor", position:"Orta saha", age:33, marketValue:0.7, goals:0, assists:6, minutes:1530, bigMatch:77, form:76, story:"2025-26 sezonunda takÄ±mÄ±nÄ±n Orta saha bÃ¶lgesinde istikrarlÄ± performansÄ± ve kalitesiyle kadro derinliÄŸine Ã¶nemli katkÄ± saÄŸladÄ±.", career:["Antalyaspor"], strengths:["Pas","Teknik"] },
  { name:"Erkan Eyibil", team:"Antalyaspor", position:"Orta saha", age:20, marketValue:1.3, goals:1, assists:9, minutes:1252, bigMatch:78, form:76, story:"2025-26 sezonunda takÄ±mÄ±nÄ±n Orta saha bÃ¶lgesinde istikrarlÄ± performansÄ± ve kalitesiyle kadro derinliÄŸine Ã¶nemli katkÄ± saÄŸladÄ±.", career:["Antalyaspor"], strengths:["Pas","Teknik"] },
  { name:"Ataberk Dadakdeniz", team:"Antalyaspor", position:"Kanat", age:29, marketValue:2.4, goals:3, assists:9, minutes:2231, bigMatch:72, form:77, story:"2025-26 sezonunda takÄ±mÄ±nÄ±n Kanat bÃ¶lgesinde istikrarlÄ± performansÄ± ve kalitesiyle kadro derinliÄŸine Ã¶nemli katkÄ± saÄŸladÄ±.", career:["Antalyaspor"], strengths:["Pas","Teknik"] }
];


// â”€â”€ TAKIM TEMELERÄ° â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const teamThemes = [
  { name:"Lig temasÄ±",      primary:"#38bdf8", secondary:"#fbbf24", accent:"#f43f5e", dark:"#090e1a" },
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

// â”€â”€ KADROLAR â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

// â”€â”€ PUAN DURUMU 2025-26 â€” Transfermarkt (34. Hafta) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
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
  { emoji:"â­", title:"Sezonun Oyuncusu",      winner:"Victor Osimhen",            team:"Galatasaray",       detail:"Åampiyonluk lideri",         note:"Galatasaray'Ä± ÅŸampiyonluÄŸa taÅŸÄ±yan kilit isim. Etkili gol katkÄ±larÄ± ve sahaya hakim oyunuyla sezonun en deÄŸerlisi seÃ§ildi.", color:"#f0a830" },
  { emoji:"âš½", title:"Gol KrallÄ±ÄŸÄ±",          winner:"Onuachu & Shomurodov",      team:"TS / BaÅŸakÅŸehir",   detail:"22 gol (paylaÅŸÄ±mlÄ±)",        note:"Paul Onuachu ve Eldor Shomurodov, 2025-26 sezonunu 22'ÅŸer golle zirvede paylaÅŸarak SÃ¼per Lig gol krallÄ±ÄŸÄ±nÄ± birlikte kazandÄ±.", color:"#22c76e" },
  { emoji:"ğŸ¯", title:"Asist KrallÄ±ÄŸÄ±",        winner:"Marco Asensio",             team:"FenerbahÃ§e",        detail:"13 asist",                   note:"Ä°spanyol yÄ±ldÄ±z Asensio, 25 maÃ§ta Ã¼rettiÄŸi 13 asist ile 2025-26 sezonunun asist krallÄ±ÄŸÄ±nÄ± ezici biÃ§imde aldÄ±.", color:"#003f8f" },
  { emoji:"ğŸ§¤", title:"Sezonun Kalecisi",      winner:"UÄŸurcan Ã‡akÄ±r",             team:"Galatasaray",       detail:"Åampiyon kale",              note:"Galatasaray'Ä±n vazgeÃ§ilmez kalecisi UÄŸurcan, kritik kurtarÄ±ÅŸlarÄ± ve gÃ¼Ã§lÃ¼ refleksleriyle ÅŸampiyonluk yolunda takÄ±mÄ±n en bÃ¼yÃ¼k sigortasÄ± oldu.", color:"#a90432" },
  { emoji:"ğŸŒŸ", title:"GenÃ§ Yetenek",          winner:"BarÄ±ÅŸ Alper YÄ±lmaz",        team:"Galatasaray",       detail:"12 asist",                   note:"MillÃ® kanat oyuncusu, 12 asist ve yÃ¼ksek performansÄ±yla ÅŸampiyon takÄ±mÄ±n en parlak genci oldu.", color:"#7a263a" },
  { emoji:"ğŸ‘¨â€ğŸ’¼", title:"Sezonun Teknik Dir.", winner:"Fatih Tekke",                team:"Trabzonspor",       detail:"3. sÄ±ra â€” sÄ±nÄ±rlÄ± kadro",     note:"KÄ±sÄ±tlÄ± kadro ve bÃ¼tÃ§eyle Trabzonspor'u ligin 3. sÄ±rasÄ±na taÅŸÄ±yan Fatih Tekke, 2025-26 sezonunun gerÃ§ek sÃ¼rpriz teknik direktÃ¶rÃ¼ oldu.", color:"#7a263a" }
];

// â”€â”€ ANKET â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const polls = [
  { id:"poll_2526_best", question:"Sezonun En Ä°yi Forveti Kim?", candidates:[{name:"Victor Osimhen",team:"Galatasaray"},{name:"Paul Onuachu",team:"Trabzonspor"},{name:"Tammy Abraham",team:"Besiktas"},{name:"Eldor Shomurodov",team:"Basaksehir"}] },
  { id:"poll_2526_supriz", question:"2025-26 Sezonunun SÃ¼rprizi Kim?", candidates:[{name:"Juan Santos",team:"Goztepe"},{name:"Felipe Augusto",team:"Trabzonspor"},{name:"Kacper Kozlowski",team:"Gaziantep FK"},{name:"Ianis Hagi",team:"Alanyaspor"}] }
];

// â”€â”€ TAHMÄ°N OYUNU â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const matchFixtures = [
  { home:"Galatasaray",  away:"Fenerbahce",   actualHome:1, actualAway:1 },
  { home:"Trabzonspor",  away:"Besiktas",     actualHome:2, actualAway:1 },
  { home:"Basaksehir",   away:"Goztepe",      actualHome:2, actualAway:0 },
  { home:"Samsunspor",   away:"Rizespor",     actualHome:1, actualAway:2 },
  { home:"Konyaspor",    away:"Kocaelispor",  actualHome:1, actualAway:0 },
  { home:"Gaziantep FK", away:"Kasimpasa",    actualHome:2, actualAway:1 }
];

// â”€â”€ MEVKI MODELLERÄ° â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const positionModels = {
  Forvet:       { goal:8.5, assist:4.2, minutes:0.010, bigMatch:0.42, form:0.35, roleBonus:8  },
  Kanat:        { goal:7.0, assist:5.6, minutes:0.011, bigMatch:0.38, form:0.42, roleBonus:10 },
  "Orta saha":  { goal:5.8, assist:6.8, minutes:0.014, bigMatch:0.34, form:0.45, roleBonus:14 },
  Defans:       { goal:4.0, assist:4.4, minutes:0.018, bigMatch:0.48, form:0.38, roleBonus:34 },
  Kaleci:       { goal:0.0, assist:2.0, minutes:0.020, bigMatch:0.62, form:0.58, roleBonus:48 }
};

// â”€â”€ STATE â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const state = { search:"", position:"all", team:"all", sort:"valueScore", budgetOnly:false, visibleLimit: 12, maxAge: 40, maxPrice: 1000 };

// â”€â”€ ENRÄ°CHED PLAYERS â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const enrichedPlayers = players.map(p => {
  const m = positionModels[p.position] || positionModels["Orta saha"];
  const impactScore   = Math.round(p.goals*m.goal + p.assists*m.assist + p.minutes*m.minutes + p.bigMatch*m.bigMatch + p.form*m.form + m.roleBonus);
  const valueScore    = Math.round((impactScore / Math.max(p.marketValue, 0.35)) * 7);
  const scoutScore    = Math.round(valueScore*0.58 + p.form*0.28 + (28-Math.min(p.age,28))*1.6);
  const surpriseScore = Math.round(valueScore*0.65 + p.bigMatch*0.22 + p.form*0.13);
  return { ...p, impactScore, valueScore, scoutScore, surpriseScore, contribution: p.goals+p.assists };
});

// â”€â”€ DOM REFS â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
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

// â”€â”€ YARDIMCILAR â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function formatValue(v) { return v >= 1 ? v.toFixed(1)+"M" : Math.round(v*1000)+"K"; }
function getLabel(p) {
  if (p.valueScore > 900) return "DeÄŸer canavarÄ±";
  if (p.scoutScore > 430) return "Scout radarÄ±";
  if (p.bigMatch > 88)    return "BÃ¼yÃ¼k maÃ§";
  if (p.form > 88)        return "Formda";
  return "Ä°stikrar";
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

// â”€â”€ Ã–ZET â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function renderSummary() {
  const bi=topBy("impactScore"), bv=topBy("valueScore"), bs=topBy("scoutScore"), bb=topBy("bigMatch");
  const hero=enrichedPlayers.find(p=>p.name==="Christ Inao Oulai") || topBy("surpriseScore");
  document.querySelector("#topImpact").textContent   = `${bi.name} (${bi.impactScore})`;
  document.querySelector("#topValue").textContent    = `${bv.name} (${bv.valueScore})`;
  document.querySelector("#topScout").textContent    = `${bs.name} (${bs.scoutScore})`;
  document.querySelector("#topBigMatch").textContent = `${bb.name} (${bb.bigMatch})`;
  document.querySelector("#heroPlayer").textContent  = hero.name;
  document.querySelector("#heroNote").textContent    = `${hero.team} Â· ${formatValue(hero.marketValue)} EUR Â· skor ${hero.surpriseScore || 99}`;
  
  // Load hero image
  loadPlayerImage(hero.name, "heroPlayerImg");
}

// â”€â”€ LIDERBOARD â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function boardItem(p,i,key) {
  const imgId = `board-img-${key}-${p.name.replace(/\s+/g, '-')}-${i}`;
  return `<div class="board-item" style="display:flex; align-items:center; gap:10px;">
    <span class="rank">${i+1}</span>
    <div class="player-photo-wrapper tiny">
      <img id="${imgId}" class="player-photo-img lazy-player-img" data-player-name="${p.name}" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100%25' height='100%25' fill='%230f172a'/%3E%3C/svg%3E" alt="${p.name}">
    </div>
    <div style="flex-grow:1; text-align:left;">
      <strong style="display:block;">${p.name}</strong>
      <span class="board-meta" style="display:inline-flex; align-items:center; gap:4px; margin-top:2px;">${getTeamLogoHtml(p.team, "tiny")} <span>${p.team}</span> Â· ${p.position} Â· ${formatValue(p.marketValue)} â‚¬</span>
    </div>
    <span class="board-score">${p[key]}</span>
  </div>`;
}
function renderBoards() {
  valueBoard.innerHTML = [...enrichedPlayers].sort((a,b)=>b.valueScore-a.valueScore).slice(0,5).map((p,i)=>boardItem(p,i,"valueScore")).join("");
  scoutBoard.innerHTML = [...enrichedPlayers].filter(p=>p.marketValue<2.5&&p.age<=26).sort((a,b)=>b.scoutScore-a.scoutScore).slice(0,5).map((p,i)=>boardItem(p,i,"scoutScore")).join("");
  observeImages();
}

// â”€â”€ TEMA â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
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

// â”€â”€ KADRO â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function renderSquadTeams() {
  squadTeamSelect.innerHTML = teamThemes.filter(t=>t.name!=="Lig temasÄ±").map(t=>`<option value="${t.name}">${t.name}</option>`).join("");
  squadTeamSelect.value = "Trabzonspor";
  renderSquad();
}
function renderSquad() {
  const name = squadTeamSelect.value;
  const theme = teamThemes.find(t => t.name === name);
  if (theme) applyTheme(theme);
  
  const squad = enrichedPlayers.filter(p => p.team === name);
  
  if (squad.length === 0) {
    squadNote.innerHTML = `${getTeamLogoHtml(name, "small")} <span style="vertical-align:middle; margin-left:6px;">${name}: kadro henÃ¼z eklenmedi</span>`;
    squadGrid.innerHTML = `<div class="squad-empty">${name} kadrosu yakÄ±nda eklenecek.</div>`;
    return;
  }
  
  squadNote.innerHTML = `${getTeamLogoHtml(name, "small")} <span style="vertical-align:middle; margin-left:6px;">${name}: ${squad.length} oyuncu â€” 2025-26 Sezonu</span>`;
  squadGrid.innerHTML = squad.map(p => {
    let note = `${formatValue(p.marketValue)} â‚¬`;
    if (p.goals > 0 || p.assists > 0) {
      note += ` Â· ${p.goals}G ${p.assists}A`;
    } else if (p.position === "Kaleci") {
      note += ` Â· Kaleci`;
    } else {
      note += ` Â· ${p.strengths ? p.strengths[0] : "Oyuncu"}`;
    }
    
    return `
      <article class="squad-card">
        <strong>${p.name}</strong>
        <span>${p.position} Â· ${note}</span>
        <a class="tm-link small-link" href="${tmUrl(p.name)}" target="_blank" rel="noopener noreferrer" onclick="event.stopPropagation()" aria-label="Transfermarkt'ta ${p.name}">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
          Transfermarkt'ta GÃ¶r
        </a>
      </article>`;
  }).join("");
}

// â”€â”€ PUAN DURUMU â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
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
    src.innerHTML = `ğŸ“Š Kaynak: <a href="https://www.transfermarkt.com/super-lig/tabelle/wettbewerb/TR1/saison_id/2025" target="_blank" rel="noopener">Transfermarkt â€” 25/26 Â· 34. Hafta</a>`;
    panel.appendChild(src);
  }
  if (!panel.querySelector(".standings-legend")) {
    const leg = document.createElement("div");
    leg.className = "standings-legend";
    leg.innerHTML = `
      <div class="legend-item"><span class="legend-dot" style="background:#afd179;"></span>Åampiyon + ÅL</div>
      <div class="legend-item"><span class="legend-dot" style="background:#d6eab6;"></span>Åampiyonlar Ligi</div>
      <div class="legend-item"><span class="legend-dot" style="background:#bdd9ef;"></span>Avrupa Ligi</div>
      <div class="legend-item"><span class="legend-dot" style="background:#a5cce9;"></span>Konferans Ligi</div>
      <div class="legend-item"><span class="legend-dot" style="background:#f8a7a3;"></span>KÃ¼me dÃ¼ÅŸme</div>`;
    panel.appendChild(leg);
  }
}

// â”€â”€ SEZON Ã–DÃœLLERÄ° â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
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

// â”€â”€ OYUNCU KARTLARI â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function renderPlayers() {
  const list = getFilteredPlayers();
  resultCount.textContent = `${list.length} oyuncu`;
  const visibleList = list.slice(0, state.visibleLimit);
  playerGrid.innerHTML = visibleList.map(p => {
    const mw = Math.min(100, Math.round(p.valueScore/10));
    const imgId = `card-img-${p.name.replace(/\s+/g, '-')}`;
    
    return `<article class="player-card" data-player="${p.name}" tabindex="0" role="button" aria-label="${p.name} detayÄ±nÄ± aÃ§">
      <div class="card-header-with-photo">
        <div class="player-photo-wrapper">
          <img id="${imgId}" class="player-photo-img lazy-player-img" data-player-name="${p.name}" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100%25' height='100%25' fill='%230f172a'/%3E%3C/svg%3E" alt="${p.name}">
        </div>
        <div class="card-head-details">
          <div class="card-head" style="margin-bottom: 0;">
            <div><h3 style="margin-top:0;">${p.name}</h3><p style="margin-bottom:0; display:flex; align-items:center; gap:4px;">${getTeamLogoHtml(p.team, "tiny")} <span>${p.team}</span> Â· ${p.position} Â· ${p.age} yaÅŸ</p></div>
            <span class="tag">${getLabel(p)}</span>
          </div>
        </div>
      </div>
      <div class="stat-row">
        <div class="stat"><span>Piyasa DeÄŸeri</span><strong>${formatValue(p.marketValue)} â‚¬</strong></div>
        <div class="stat"><span>Etki Skoru</span><strong>${p.impactScore}</strong></div>
        <div class="stat"><span>Fiyat/KatkÄ±</span><strong>${p.valueScore}</strong></div>
      </div>
      <div><div class="meter"><span style="width:${mw}%"></span></div></div>
      <p class="story">${p.story}</p>
      <a class="tm-link" href="${tmUrl(p.name)}" target="_blank" rel="noopener noreferrer"
         onclick="event.stopPropagation()" aria-label="Transfermarkt'ta ${p.name}">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
        Transfermarkt'ta GÃ¶r
      </a>
    </article>`;
  }).join("");

  if (loadMoreBtn) {
    loadMoreBtn.hidden = list.length <= state.visibleLimit;
  }
  
  observeImages();
}

// ===================== RADAR CHART =====================
function drawRadarChart(player, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  
  const hÃ¼cum = Math.min(player.contribution / 30, 1);
  const istikrar = Math.min(player.valueScore / 1000, 1);
  const oyunAklÄ± = Math.min(player.impactScore / 1000, 1);
  const bÃ¼yÃ¼kMaÃ§ = Math.min(player.bigMatch / 100, 1);
  const formSkoru = (player.form && player.form.length) 
      ? player.form.reduce((a,b)=>a+(b==='W'?1:b==='D'?0.5:0),0)/player.form.length 
      : 0.6;
  
  const data = [hÃ¼cum, istikrar, oyunAklÄ±, bÃ¼yÃ¼kMaÃ§, formSkoru];
  const labels = ["HÃ¼cum", "Ä°stikrar", "Oyun AklÄ±", "BÃ¼yÃ¼k MaÃ§", "Form"];
  
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

// â”€â”€ MODAL â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function openPlayerModal(name) {
  const p = enrichedPlayers.find(x=>x.name===name);
  if (!p) return;
  modalPlayerName.textContent = p.name;
  modalPlayerTeam.innerHTML = `${getTeamLogoHtml(p.team, "tiny")} <span style="vertical-align:middle; margin-left:6px;">${p.team} Â· ${p.position} Â· ${p.age} yaÅŸ</span>`;
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
          <div class="stat"><span>Piyasa DeÄŸeri</span><strong>${formatValue(p.marketValue)} â‚¬</strong></div>
          <div class="stat"><span>Gol + Asist</span><strong>${p.contribution}</strong></div>
          <div class="stat"><span>Etki Skoru</span><strong>${p.impactScore}</strong></div>
          <div class="stat"><span>DeÄŸer Skoru</span><strong>${p.valueScore}</strong></div>
        </div>
      </div>
    </div>
    <div id="radarChartContainer" class="radar-chart-container"></div>
    <section class="modal-section"><h3>Oyuncu profili</h3><p>${p.story}</p></section>
    <section class="modal-section"><h3>KulÃ¼p geÃ§miÅŸi</h3>
      <div class="career-list">${(p.career||[p.team]).map(c=>`<span class="career-chip">${c}</span>`).join("")}</div>
    </section>
    <section class="modal-section"><h3>GÃ¼Ã§lÃ¼ yÃ¶nler</h3>
      <div class="strength-list">${(p.strengths||["Etki","Form","KatkÄ±"]).map(s=>`<span>${s}</span>`).join("")}</div>
    </section>
    <section class="modal-section">
      <a class="tm-link" href="${tmUrl(p.name)}" target="_blank" rel="noopener noreferrer" style="margin-top:0;">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
        Transfermarkt'ta DetaylÄ± Profil
      </a>
    </section>`;
    
  setTimeout(() => drawRadarChart(p, "radarChartContainer"), 0);
  
  playerModal.hidden = false;
  modalClose.focus();
}
function closePlayerModal() { playerModal.hidden = true; }

// â”€â”€ KARÅILAÅTIRMA â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function syncCustomSelectLabel(hiddenInputId) {
  const containerId = "container" + hiddenInputId.charAt(0).toUpperCase() + hiddenInputId.slice(1);
  const container = document.getElementById(containerId);
  const hiddenInput = document.getElementById(hiddenInputId);
  if (!container || !hiddenInput) return;
  const labelSpan = container.querySelector(".custom-select-label");
  const player = enrichedPlayers.find(p => p.name === hiddenInput.value);
  if (player && labelSpan) {
    labelSpan.innerHTML = `${getTeamLogoHtml(player.team, "tiny")} <strong style="margin-left:6px;vertical-align:middle;">${player.name}</strong> <span style="font-size:0.75rem;opacity:0.75;margin-left:4px;vertical-align:middle;">â€” ${player.team}</span>`;
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
          <span class="custom-select-opt-team">${getTeamLogoHtml(p.team, "tiny")} <span>${p.team} Â· ${p.position}</span></span>
        </div>
        <span class="custom-select-opt-val">${formatValue(p.marketValue)} â‚¬</span>
      </li>`;
    }).join("");
  }

  function selectPlayer(name) {
    hiddenInput.value = name;
    const player = enrichedPlayers.find(p => p.name === name);
    if (player && labelSpan) {
      labelSpan.innerHTML = `${getTeamLogoHtml(player.team, "tiny")} <strong style="margin-left:6px;vertical-align:middle;">${player.name}</strong> <span style="font-size:0.75rem;opacity:0.75;margin-left:4px;vertical-align:middle;">â€” ${player.team}</span>`;
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
  const w = l.impactScore===r.impactScore ? "Bu eÅŸleÅŸmede performans dengesi tam anlamÄ±yla eÅŸit."
    : l.impactScore>r.impactScore ? `${l.name} sahaya yansÄ±ttÄ±ÄŸÄ± etki skoru ve performansÄ± ile bu kÄ±yaslamada Ã¶ne Ã§Ä±kÄ±yor.`
    : `${r.name} sahaya yansÄ±ttÄ±ÄŸÄ± etki skoru ve performansÄ± ile bu kÄ±yaslamada Ã¶ne Ã§Ä±kÄ±yor.`;
    
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
      ${sl("Etki skoru",l.impactScore,r.impactScore)}${sl("DeÄŸer skoru",l.valueScore,r.valueScore)}${sl("Form",l.form,r.form)}
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
      <div class="duel-row"><span>Piyasa deÄŸeri</span><strong>${formatValue(l.marketValue)} / ${formatValue(r.marketValue)} â‚¬</strong></div>
      <div class="duel-row"><span>Dakika</span><strong>${l.minutes} / ${r.minutes}</strong></div>
      <div class="duel-row"><span>BÃ¼yÃ¼k maÃ§</span><strong>${l.bigMatch} / ${r.bigMatch}</strong></div>
      <div class="duel-row"><span>Scout skoru</span><strong>${l.scoutScore} / ${r.scoutScore}</strong></div>
  </article>
    <div class="insight">${w}</div>`;
}

// â”€â”€ TEAM COMPARISON (DERBÄ° MODU) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function fillTeamCompareOptions() {
  const uniqueTeams = [...new Set(enrichedPlayers.map(p => p.team))].sort();
  const optionsHtml = uniqueTeams.map(t => `<option value="${t}">${t}</option>`).join("");
  if(teamASelect) {
    teamASelect.innerHTML = `<option value="">1. TakÄ±mÄ± SeÃ§in</option>` + optionsHtml;
    teamASelect.value = uniqueTeams[0] || "";
  }
  if(teamBSelect) {
    teamBSelect.innerHTML = `<option value="">2. TakÄ±mÄ± SeÃ§in</option>` + optionsHtml;
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
    teamComparison.innerHTML = "<p style='padding:20px; text-align:center;'>LÃ¼tfen karÅŸÄ±laÅŸtÄ±rmak iÃ§in iki takÄ±m seÃ§in.</p>";
    return;
  }
  
  const totalAttack = tA.attackScore + tB.attackScore;
  const totalDefense = tA.defenseScore + tB.defenseScore;
  const totalValue = tA.totalValue + tB.totalValue;
  
  const w = tA.totalValue > tB.totalValue 
    ? `${tA.name}, kadro kalitesi ve piyasa deÄŸeri aÃ§Ä±sÄ±ndan derbinin favorisi konumunda.` 
    : `${tB.name}, kadro kalitesi ve piyasa deÄŸeri aÃ§Ä±sÄ±ndan derbinin favorisi konumunda.`;

  teamComparison.innerHTML = `
    <article class="duel-card">
      <div class="card-header-with-photo" style="justify-content:center;">
        <div class="player-photo-wrapper medium" style="margin:0;">
          ${getTeamLogoHtml(tA.name, "medium")}
        </div>
        <h3 style="margin:10px 0 0 0; text-align:center; font-size:1.4rem;">${tA.name}</h3>
      </div>
      ${sl("Kadro DeÄŸeri (Mâ‚¬)", tA.totalValue.toFixed(1), tB.totalValue.toFixed(1))}
      ${sl("HÃ¼cum GÃ¼cÃ¼", tA.attackScore, tB.attackScore)}
      ${sl("Savunma GÃ¼cÃ¼", tA.defenseScore, tB.defenseScore)}
      ${sl("YaÅŸ OrtalamasÄ±", tA.avgAge.toFixed(1), tB.avgAge.toFixed(1))}
      <div class="duel-row" style="flex-direction:column; align-items:flex-start; text-align:left;">
        <span style="margin-bottom:4px; font-size:0.8rem;">En Etkili Oyuncu</span>
        <strong>${tA.topPlayer.name} (${tA.topPlayer.impactScore} Etki)</strong>
      </div>
      <div class="duel-row" style="flex-direction:column; align-items:flex-start; text-align:left;">
        <span style="margin-bottom:4px; font-size:0.8rem;">En DeÄŸerli Oyuncu</span>
        <strong>${tA.mostValuable.name} (${formatValue(tA.mostValuable.marketValue)} â‚¬)</strong>
      </div>
    </article>

    <article class="duel-card">
      <div class="card-header-with-photo" style="justify-content:center;">
        <div class="player-photo-wrapper medium" style="margin:0;">
          ${getTeamLogoHtml(tB.name, "medium")}
        </div>
        <h3 style="margin:10px 0 0 0; text-align:center; font-size:1.4rem;">${tB.name}</h3>
      </div>
      ${sl("Kadro DeÄŸeri (Mâ‚¬)", tA.totalValue.toFixed(1), tB.totalValue.toFixed(1))}
      ${sl("HÃ¼cum GÃ¼cÃ¼", tA.attackScore, tB.attackScore)}
      ${sl("Savunma GÃ¼cÃ¼", tA.defenseScore, tB.defenseScore)}
      ${sl("YaÅŸ OrtalamasÄ±", tA.avgAge.toFixed(1), tB.avgAge.toFixed(1))}
      <div class="duel-row" style="flex-direction:column; align-items:flex-start; text-align:left;">
        <span style="margin-bottom:4px; font-size:0.8rem;">En Etkili Oyuncu</span>
        <strong>${tB.topPlayer.name} (${tB.topPlayer.impactScore} Etki)</strong>
      </div>
      <div class="duel-row" style="flex-direction:column; align-items:flex-start; text-align:left;">
        <span style="margin-bottom:4px; font-size:0.8rem;">En DeÄŸerli Oyuncu</span>
        <strong>${tB.mostValuable.name} (${formatValue(tB.mostValuable.marketValue)} â‚¬)</strong>
      </div>
    </article>
    <div class="insight" style="margin-top:10px;">${w}</div>`;
}


// â”€â”€ ANKET â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// â”€â”€ STATS CHARTS â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
let chartsInstance = [];

function renderStatsCharts() {
  if (typeof Chart === 'undefined') return;
  Chart.defaults.color = '#94a3b8';
  Chart.defaults.font.family = "'Outfit', sans-serif";

  // Cleanup old charts if any
  chartsInstance.forEach(c => c.destroy());
  chartsInstance = [];

  // --- GERÃ‡EKÃ‡Ä° 2024 SÃœPER LÄ°G VERÄ°LERÄ° (Mockup yerine) ---

  // 1. Goals & Assists by Team (Puan tablosuyla senkronize veriler)
  const realTeamStats = {
    "Galatasaray": { goals: 77, assists: 54 },
    "Fenerbahce":  { goals: 77, assists: 55 },
    "Trabzonspor": { goals: 61, assists: 42 },
    "Besiktas":    { goals: 59, assists: 41 },
    "Basaksehir":  { goals: 58, assists: 40 }
  };
  const teams = Object.keys(realTeamStats);
  
  const ctxGoals = document.getElementById('goalsChart');
  if (ctxGoals) {
    chartsInstance.push(new Chart(ctxGoals.getContext('2d'), {
      type: 'bar',
      data: {
        labels: teams,
        datasets: [
          { label: 'Gol', data: teams.map(t => realTeamStats[t].goals), backgroundColor: '#38bdf8' },
          { label: 'Asist', data: teams.map(t => realTeamStats[t].assists), backgroundColor: '#fbbf24' }
        ]
      },
      options: {
        responsive: true,
        plugins: { legend: { position: 'bottom' } },
        scales: { x: { stacked: true }, y: { stacked: true } }
      }
    }));
  }

  // 2. Market Value by Position (Lig geneli tahmini milyon Euro)
  const realPosStats = {
    "Kaleci": 115.5,
    "Defans": 340.2,
    "Orta saha": 465.8,
    "Forvet": 310.5
  };
  const positions = Object.keys(realPosStats);
  const ctxValue = document.getElementById('valueChart');
  if (ctxValue) {
    chartsInstance.push(new Chart(ctxValue.getContext('2d'), {
      type: 'doughnut',
      data: {
        labels: positions,
        datasets: [{
          data: positions.map(p => realPosStats[p]),
          backgroundColor: ['#f43f5e', '#10b981', '#3b82f6', '#f59e0b'],
          borderWidth: 0
        }]
      },
      options: { 
        responsive: true, 
        plugins: { 
          legend: { position: 'bottom' },
          tooltip: { callbacks: { label: (ctx) => ` â‚¬${ctx.raw}M` } }
        } 
      }
    }));
  }

  // 3. Average Age by Team (GerÃ§ekÃ§i yaÅŸ ortalamalarÄ±)
  const realTeamAges = {
    "Trabzonspor": 25.8,
    "Besiktas": 26.5,
    "Galatasaray": 26.8,
    "Fenerbahce": 27.3,
    "Basaksehir": 27.9
  };
  const ageTeams = Object.keys(realTeamAges);
  const ctxAge = document.getElementById('ageChart');
  if (ctxAge) {
    chartsInstance.push(new Chart(ctxAge.getContext('2d'), {
      type: 'bar',
      data: {
        labels: ageTeams,
        datasets: [{
          label: 'YaÅŸ OrtalamasÄ±',
          data: ageTeams.map(t => realTeamAges[t]),
          backgroundColor: '#8b5cf6'
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { position: 'bottom' } },
        scales: { y: { min: 20, max: 32 } }
      }
    }));
  }
}

function renderPoll() {
  const poll=polls[0], voted=localStorage.getItem(poll.id);
  const counts=JSON.parse(localStorage.getItem(poll.id+"_counts")||"null")||Object.fromEntries(poll.candidates.map(c=>[c.name,0]));
  pollBadge.textContent = voted ? "Oy verildi âœ“" : "Oy ver";
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
  pollNote.textContent = voted?`Toplam ${total} oy kullanÄ±ldÄ±.`:"Oyunuzu kullanÄ±n, sonuÃ§larÄ± gÃ¶rÃ¼n.";
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

// â”€â”€ TAHMÄ°N OYUNU â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function renderMatchPredictions() {
  const savedScore=parseInt(localStorage.getItem("predict_total_score")||"0");
  userTotalScore.textContent=savedScore;
  const submitted=localStorage.getItem("predict_submitted")==="true";
  matchCards.innerHTML=matchFixtures.map((m,i)=>{
    const sh=localStorage.getItem(`pred_h_${i}`)||"", sa=localStorage.getItem(`pred_a_${i}`)||"";
    let cls="", label="";
    if(submitted&&sh!==""&&sa!==""){
      const ph=parseInt(sh),pa=parseInt(sa);
      if(ph===m.actualHome&&pa===m.actualAway){cls="correct";label="âœ… Tam isabet! +3 puan";}
      else if((ph>pa)===(m.actualHome>m.actualAway)&&(ph===pa)===(m.actualHome===m.actualAway)){cls="partial";label="ğŸŸ¡ DoÄŸru sonuÃ§! +1 puan";}
      else{cls="wrong";label=`âŒ YanlÄ±ÅŸ. GerÃ§ek: ${m.actualHome}â€“${m.actualAway}`;}
    }
    return `<div class="match-card ${cls}">
      <div class="match-teams">
        <div class="match-team">${getTeamLogoHtml(m.home, "small")} <span>${m.home}</span></div>
        <div class="match-vs">VS</div>
        <div class="match-team"><span>${m.away}</span> ${getTeamLogoHtml(m.away, "small")}</div>
      </div>
      <div class="match-inputs">
        <input type="number" min="0" max="20" placeholder="0" id="pred_h_${i}" value="${sh}" ${submitted?"disabled":""}>
        <div class="match-sep">â€”</div>
        <input type="number" min="0" max="20" placeholder="0" id="pred_a_${i}" value="${sa}" ${submitted?"disabled":""}>
      </div>
      <div class="match-result-label">${label}</div>
    </div>`;
  }).join("");
  if(submitted){
    submitPredictions.disabled=true;
    submitPredictions.textContent="Tahminler gÃ¶nderildi âœ“";
    predictResult.hidden=false;
    predictResult.innerHTML=`<h3>ğŸ† Toplam PuanÄ±n: ${savedScore}</h3><p>Tebrikler! Yeni haftada tekrar dene.</p>`;
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
  submitPredictions.textContent="Tahminleri GÃ¶nder";
  predictResult.hidden=true;
  renderMatchPredictions();
});

// â”€â”€ TAKM FÄ°LTRE â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function fillTeamFilter() {
  const teams=[...new Set(enrichedPlayers.map(p=>p.team))].sort();
  teamFilter.innerHTML=`<option value="all">TÃ¼m takÄ±mlar</option>`+teams.map(t=>`<option value="${t}">${t}</option>`).join("");
}

// â”€â”€ HAMBURGER â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
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

// â”€â”€ EVENT LISTENERS â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
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

// â”€â”€ SQUAD BUILDER STATE & REFS â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
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

let playerImageObserver = null;

function initPlayerImageObserver() {
  if ("IntersectionObserver" in window) {
    playerImageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          const playerName = img.dataset.playerName;
          const imgId = img.id;
          if (playerName && imgId) {
            loadPlayerImage(playerName, imgId);
          }
          observer.unobserve(img);
        }
      });
    }, {
      rootMargin: "200px 0px", // Load images 200px before they enter viewport
      threshold: 0.01
    });
  }
}

function observeImages() {
  if (!playerImageObserver) {
    initPlayerImageObserver();
  }
  
  if (playerImageObserver) {
    document.querySelectorAll(".lazy-player-img").forEach(img => {
      playerImageObserver.observe(img);
    });
  } else {
    // Fallback: load immediately if IntersectionObserver is not supported
    document.querySelectorAll(".lazy-player-img").forEach(img => {
      const playerName = img.dataset.playerName;
      const imgId = img.id;
      if (playerName && imgId) {
        loadPlayerImage(playerName, imgId);
      }
    });
  }
}

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
          <small>${s.player.team} â€¢ ${s.player.marketValue.toFixed(1)} Mâ‚¬ â€¢ ${s.player.impactScore} Pts</small>
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
    { text: "ğŸ” [AI AjanÄ±] Oyuncu verileri ve kariyer istatistikleri inceleniyor...", delay: 0 },
    { text: "âš™ï¸ [AI AjanÄ±] 4-3-3 taktiksel formasyon yerleÅŸimi doÄŸrulanÄ±yor...", delay: 600 },
    { text: "ğŸ§¬ [AI AjanÄ±] TakÄ±m kimyasÄ± ve saha iÃ§i uyum faktÃ¶rleri hesaplanÄ±yor...", delay: 1200 },
    { text: "ğŸŸï¸ [AI AjanÄ±] SÃ¼per Lig devlerine karÅŸÄ± 25 maÃ§lÄ±k simÃ¼lasyon baÅŸlatÄ±ldÄ±...", delay: 1800 },
    { text: "ğŸ“Š [AI AjanÄ±] Rakip analizleri tamamlandÄ±, derbi maÃ§Ä± simÃ¼le ediliyor...", delay: 2400 },
    { text: "âœ… [AI AjanÄ±] Rapor hazÄ±rlandÄ±! SonuÃ§lar ekrana aktarÄ±lÄ±yor...", delay: 3000, cls: "success" }
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
    return s.includes("savunma") || s.includes("top kapma") || s.includes("mÃ¼cadele") || p.name.includes("Torreira") || p.name.includes("Ndidi") || p.name.includes("Alvarez");
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
    rankComment = `<p>ğŸ† <strong>ÅAMPÄ°YONLUK RÃœYASI!</strong> Kadronuz 25 maÃ§lÄ±k simÃ¼lasyonu <strong>${userRank}. sÄ±rada (Åampiyon)</strong> tamamladÄ±! Ligin tozunu atan bu yapÄ±lanma, SÃ¼per Lig'in yeni hÃ¼kÃ¼mdarÄ± olmaya aday.</p>`;
  } else if (userRank <= 4) {
    rankComment = `<p>ğŸ‡ªğŸ‡º <strong>Avrupa Vizesi:</strong> Kadronuz 25 maÃ§lÄ±k simÃ¼lasyonu <strong>${userRank}. sÄ±rada</strong> bitirerek Avrupa kupalarÄ±na katÄ±lma hakkÄ± kazandÄ±. Zirve yarÄ±ÅŸÄ±nda bÃ¼yÃ¼k bir tehdit oluÅŸturuyorsunuz.</p>`;
  } else if (userRank <= 8) {
    rankComment = `<p>ğŸ“ˆ <strong>Orta SÄ±ra GÃ¼venliÄŸi:</strong> Kadronuz ligi <strong>${userRank}. sÄ±rada</strong> tamamladÄ±. Ä°stikrarlÄ± bir performans sergilese de ÅŸampiyonluk ortaklÄ±ÄŸÄ± iÃ§in kadro derinliÄŸi artÄ±rÄ±lmalÄ±.</p>`;
  } else if (userRank <= 15) {
    rankComment = `<p>âš ï¸ <strong>GeliÅŸime AÃ§Ä±k:</strong> Kadronuz ligi <strong>${userRank}. sÄ±rada</strong> bitirdi. DÃ¼ÅŸme hattÄ±ndan uzak olsa da hedeflenen baÅŸarÄ±larÄ±n gerisinde kalÄ±ndÄ±.</p>`;
  } else {
    rankComment = `<p>ğŸš¨ <strong>KÃœME DÃœÅME TEHLÄ°KESÄ°!</strong> Kadronuz simÃ¼lasyonu <strong>${userRank}. sÄ±rada (KÃ¼me dÃ¼ÅŸme hattÄ±)</strong> tamamladÄ±. Acilen taktiksel deÄŸiÅŸikliklere ve kritik takviyelere ihtiyaÃ§ var!</p>`;
  }

  const avgAge = selectedPlayers.reduce((s, p) => s + p.age, 0) / 11;
  let ageAnalysis = "";
  if (avgAge > 30) {
    ageAnalysis = `<p>ğŸ‘´ <strong>Deneyim OdaklÄ± Kadro:</strong> TakÄ±mÄ±nÄ±zÄ±n yaÅŸ ortalamasÄ± oldukÃ§a yÃ¼ksek (<strong>${avgAge.toFixed(1)}</strong>). BÃ¼yÃ¼k maÃ§ streslerini kolaylÄ±kla yÃ¶netebilecek deneyimli ayaklara sahipsiniz ancak uzun maratonlarda fiziksel dÃ¼ÅŸÃ¼ÅŸler ve sakatlÄ±k riskleri yaÅŸanabilir.</p>`;
  } else if (avgAge < 25) {
    ageAnalysis = `<p>ğŸ‘¶ <strong>Gelecek ve Dinamizm:</strong> Kadronuz Ã§ok genÃ§ ve enerjik (<strong>${avgAge.toFixed(1)}</strong> yaÅŸ). Tempolu oyunda ve pres gÃ¼cÃ¼nde rakipleri boÄŸabilirsiniz fakat ligin kÄ±rÄ±lma anlarÄ±nda tecrÃ¼be eksikliÄŸi hissedilebilir.</p>`;
  } else {
    ageAnalysis = `<p>âš–ï¸ <strong>Dengeli YaÅŸ DaÄŸÄ±lÄ±mÄ±:</strong> TakÄ±m yaÅŸ ortalamasÄ± son derece dengeli (<strong>${avgAge.toFixed(1)}</strong>). TecrÃ¼be ile atletizm arasÄ±ndaki altÄ±n dengeyi yakalamÄ±ÅŸ durumdasÄ±nÄ±z.</p>`;
  }

  const budget = state.builderBudget;
  const maxVal = Math.max(...selectedPlayers.map(p => p.marketValue));
  const superstar = selectedPlayers.find(p => p.marketValue === maxVal);
  let budgetAnalysis = "";
  if (maxVal > budget * 0.4) {
    budgetAnalysis = `<p>â­ <strong>YÄ±ldÄ±z BaÄŸÄ±mlÄ±lÄ±ÄŸÄ±:</strong> BÃ¼tÃ§enizin <strong>%${Math.round((maxVal/budget)*100)}</strong>'ini kaplayan <strong>${superstar.name}</strong> takÄ±mÄ±n mutlak lideri. Bu superstar odaklÄ± bir yapÄ± sunsa da, onun sakatlanmasÄ± halinde alternatif Ã¼retmekte zorlanabilirsiniz.</p>`;
  } else {
    budgetAnalysis = `<p>ğŸ’¼ <strong>Dengeli BÃ¼tÃ§e YÃ¶netimi:</strong> BÃ¼tÃ§enizi tek bir yÄ±ldÄ±za yatÄ±rmak yerine homojen daÄŸÄ±tarak geniÅŸ ve dengeli bir kadro kurmuÅŸsunuz. SakatlÄ±k veya formsuzluk durumlarÄ±nda alternatiflerinizin olmasÄ± takÄ±mÄ± koruyacaktÄ±r.</p>`;
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
    strengthsText = `<p>ğŸ¯ <strong>Taktiksel GÃ¼Ã§ler:</strong> Kadronuzda en Ã§ok Ã¶ne Ã§Ä±kan yetenekler: <strong>${sortedStrengths.slice(0, 2).map(x => x[0]).join(" ve ")}</strong>. Bu nitelikler, oyun kurarken ve hÃ¼cum varyasyonlarÄ±nda temel silahlarÄ±nÄ±z olacaktÄ±r.</p>`;
  }

  let advice = "";
  if (totalChemistry < 70) {
    advice = `<p>ğŸ’¡ <strong>AI Ã–nerisi:</strong> TakÄ±m kimyanÄ±z (<strong>%${totalChemistry}</strong>) biraz dÃ¼ÅŸÃ¼k. AynÄ± takÄ±mdan oynayan oyuncularÄ± bir araya getirerek (Ã¶rneÄŸin stoper ikilisini veya kanat-bek uyumunu) sinerjiyi artÄ±rabilirsiniz.</p>`;
  } else if (totalImpact < 800) {
    advice = `<p>ğŸ’¡ <strong>AI Ã–nerisi:</strong> Kadronuz dengeli ancak genel etki kalitesi biraz sÄ±nÄ±rda. BÃ¼tÃ§e limitinizi sonuna kadar zorlayÄ±p, daha ucuz mevkilerden tasarruf ederek kilit pozisyonlara daha yÃ¼ksek puanlÄ± lider oyuncular yerleÅŸtirebilirsiniz.</p>`;
  } else {
    advice = `<p>ğŸ’¡ <strong>AI Ã–nerisi:</strong> Harika bir bÃ¼tÃ§e/performans dengesi yakalanmÄ±ÅŸ! Bu kadro ÅŸampiyonluk yarÄ±ÅŸÄ±nÄ±n en gÃ¼Ã§lÃ¼ adaylarÄ±ndan biri olacaktÄ±r. Taktiksel yapÄ±yÄ± bozmadan devam edin.</p>`;
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
    text: `âš ï¸ <strong>${cardPlayer}</strong> rakip hÃ¼cumu kesmek iÃ§in yaptÄ±ÄŸÄ± taktik faul nedeniyle sarÄ± kart gÃ¶rdÃ¼.`
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
      text: `âš½ <strong>GOL!</strong> TakÄ±mÄ±nÄ±zda <strong>${scorer}</strong> ceza sahasÄ± iÃ§inden klas bir vuruÅŸla${assistText} golÃ¼ buluyor!`
    });
  }

  for (let i = 0; i < oppGoals; i++) {
    timelineEvents.push({
      min: Math.floor(Math.random() * 45) + (i * 15) + 10,
      type: "opp-goal",
      text: `âš½ <strong>Gol!</strong> ${opponent} takÄ±mÄ± hÄ±zlÄ± hÃ¼cumla savunmamÄ±zÄ±n arkasÄ±na sarkarak golÃ¼ atÄ±yor.`
    });
  }

  const gks = selectedPlayers.filter(p => p.position === "Kaleci");
  const gkName = gks.length > 0 ? gks[0].name : "Kalecimiz";
  timelineEvents.push({
    min: Math.floor(Math.random() * 20) + 70,
    type: "save",
    text: `ğŸ§¤ <strong>Dev KurtarÄ±ÅŸ!</strong> ${opponent} hÃ¼cumunda karÅŸÄ± karÅŸÄ±ya kalÄ±nan pozisyonda kalecimiz <strong>${gkName}</strong> mÃ¼thiÅŸ refleksle golÃ¼ Ã¶nledi.`
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
    builderPlayerList.innerHTML = `<p style="padding:20px; text-align:center; color:var(--muted); font-weight:600;">Oyuncu bulunamadÄ±.</p>`;
    return;
  }
  
  builderPlayerList.innerHTML = filtered.map(p => `
    <div class="builder-player-card" data-name="${p.name}">
      <div class="builder-player-info">
        <strong>${p.name}</strong>
        <small>${p.team} â€¢ ${p.position} â€¢ YaÅŸ ${p.age}</small>
      </div>
      <div class="builder-player-stats">
        <span class="builder-player-val">${p.marketValue.toFixed(1)} Mâ‚¬</span>
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
      <button class="remove-player-btn" data-role="${role}" type="button" aria-label="KaldÄ±r">âœ•</button>
      <div class="slot-photo-wrapper">
        <img id="${imgId}" class="slot-player-img" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100%25' height='100%25' fill='%230f172a'/%3E%3C/svg%3E" alt="${player.name}">
      </div>
      <span class="slot-role">${role.toUpperCase()}</span>
      <span class="populated-player-name">${player.name}</span>
      <span class="populated-player-value">${player.marketValue.toFixed(1)} Mâ‚¬</span>
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
  
  totalValueValue.textContent = totalValue.toFixed(1) + " Mâ‚¬";
  totalImpactValue.textContent = totalImpact;
  
  const budget = state.builderBudget;
  maxBudgetValue.textContent = budget.toFixed(1) + " Mâ‚¬";
  
  const pct = Math.min(100, (totalValue / budget) * 100);
  budgetProgressBar.style.width = pct + "%";
  
  const labelsEl = totalValueValue.closest(".budget-progress-labels");
  
  if (totalValue > budget) {
    budgetProgressBar.classList.add("exceeded");
    if (labelsEl) labelsEl.classList.add("exceeded");
    
    builderMessage.className = "builder-status-msg error";
    builderMessage.textContent = `BÃ¼tÃ§e limitini aÅŸtÄ±nÄ±z! Limit: ${budget.toFixed(1)} Mâ‚¬, Kadro DeÄŸeri: ${totalValue.toFixed(1)} Mâ‚¬`;
    builderMessage.hidden = false;
  } else {
    budgetProgressBar.classList.remove("exceeded");
    if (labelsEl) labelsEl.classList.remove("exceeded");
    
    if (populatedCount === 11) {
      builderMessage.className = "builder-status-msg success";
      builderMessage.textContent = `Tebrikler! ${budget.toFixed(1)} Mâ‚¬ bÃ¼tÃ§e altÄ±nda ${totalImpact} toplam etki skoruyla kadronuzu baÅŸarÄ±yla kurdunuz!`;
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
      downloadSquadBtn.innerHTML = "Ä°ndiriliyor...";
      downloadSquadBtn.disabled = true;

      // Ensure html2canvas is loaded
      if (typeof html2canvas === "undefined") {
        alert("Ä°ndirme aracÄ± yÃ¼klenemedi. LÃ¼tfen sayfayÄ± yenileyin.");
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
        console.error("Ekran gÃ¶rÃ¼ntÃ¼sÃ¼ alÄ±nÄ±rken hata:", err);
        alert("Bir hata oluÅŸtu.");
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
    { title: "Lig TemasÄ±", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" },
    { title: "Atmosfer MÃ¼ziÄŸi", url: "https://raw.githubusercontent.com/rafaelreis-hotmart/Audio-Sample-files/master/sample2.mp3" }
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
          playBtn.textContent = "â¸";
          statusText.textContent = "OynatÄ±lÄ±yor";
        })
        .catch(err => {
          console.warn("Audio play blocked:", err);
          statusText.textContent = "TÄ±kla & Oynat";
        });
    } else {
      bgAudio.pause();
      musicPlayer.classList.remove("playing");
      playBtn.textContent = "â–¶";
      statusText.textContent = "DuraklatÄ±ldÄ±";
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
          playBtn.textContent = "â¸";
          statusText.textContent = "OynatÄ±lÄ±yor";
        })
        .catch(() => {
          musicPlayer.classList.remove("playing");
          playBtn.textContent = "â–¶";
          statusText.textContent = "DuraklatÄ±ldÄ±";
        });
    } else {
      statusText.textContent = "DuraklatÄ±ldÄ±";
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

// â”€â”€ INIT â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
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
renderStatsCharts();
renderPoll();
renderMatchPredictions();
initSquadBuilder();
initAmbientMusic();
initWelcomeSplash();
