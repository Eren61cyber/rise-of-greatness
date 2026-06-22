// ================================================================
// SÃƒÅ“PER LÃ„Â°G ATLASI Ã¢â‚¬â€ app.js  |  2025-26 Sezonu
// ================================================================

// ===================== TEMA YÃƒâ€“NETÃ„Â°MÃ„Â° =====================
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

// TakÃ„Â±m adlarÃ„Â±nÃ„Â± normalize eden yardÃ„Â±mcÃ„Â± (TÃƒÂ¼rkÃƒÂ§e Ã¢â€ â€ ASCII)
function normalizeTeamName(name) {
  return name
    .replace(/ÃƒÂ§/g, 'c').replace(/Ãƒâ€¡/g, 'C')
    .replace(/Ã„Å¸/g, 'g').replace(/Ã„Â/g, 'G')
    .replace(/Ã„Â±/g, 'i').replace(/Ã„Â°/g, 'I')
    .replace(/ÃƒÂ¶/g, 'o').replace(/Ãƒâ€“/g, 'O')
    .replace(/Ã…Å¸/g, 's').replace(/Ã…Â/g, 'S')
    .replace(/ÃƒÂ¼/g, 'u').replace(/ÃƒÅ“/g, 'U');
}

// Her takÃ„Â±m iÃƒÂ§in tek kayÃ„Â±t (ASCII anahtarÃ„Â± Ã¢â‚¬â€ normalizeTeamName ile eÃ…Å¸leÃ…Å¸ir)
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
  // Ãƒâ€“nce orijinal adla ara, bulamazsan normalize et
  const logoUrl = teamLogos[teamName] || teamLogos[normalizeTeamName(teamName)];
  if (!logoUrl) {
    return `<span class="team-logo-wrapper ${sizeClass}">${getFallbackLogoSvg(teamName)}</span>`;
  }
  const escapedFallback = getFallbackLogoSvg(teamName).replace(/"/g, '&quot;').replace(/'/g, "\\'")
  return `<span class="team-logo-wrapper ${sizeClass}"><img src="${logoUrl}" alt="${teamName}" class="team-logo-img" loading="lazy" onerror="this.outerHTML='${escapedFallback}'"></span>`;
}

function getAwardLogoHtml(teamString) {
  if (teamString.includes("/")) {
    return `<span class="team-logo-wrapper tiny" style="background:#ffd700; border-radius:50%; width:18px; height:18px; display:inline-flex; align-items:center; justify-content:center;"><span style="font-size:10px;line-height:1;display:block;text-align:center;">ÄŸÅ¸Ââ€ </span></span>`;
  }
  return getTeamLogoHtml(teamString, "tiny");
}

// Ã¢â€â‚¬Ã¢â€â‚¬ OYUNCU VERÃ„Â°SÃ„Â° Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
const players = [
  { name:"Ugurcan Cakir", team:"Galatasaray", position:"Kaleci", age:30, marketValue:15.0, goals:0, assists:0, minutes:3230, bigMatch:92, form:91, story:"Trabzonspor'dan transfer edilen milli kaleci, Galatasaray kalesinde 20 clean sheet ile Ã…Å¸ampiyonlukta devleÃ…Å¸ti.", career:["Trabzonspor","Galatasaray"], strengths:["Refleks","Liderlik","Bire Bir"] },
  { name:"Gunay Guvenc", team:"Galatasaray", position:"Kaleci", age:34, marketValue:0.4, goals:0, assists:0, minutes:170, bigMatch:75, form:80, story:"Yedek kaleci olarak kupada gÃƒÂ¶rev alan tecrÃƒÂ¼beli eldiven, kalesinde her zaman gÃƒÂ¼ven verdi.", career:["Stuttgart","GÃƒÂ¶ztepe","Gaziantep FK","Galatasaray"], strengths:["TecrÃƒÂ¼be","Refleks"] },
  { name:"Victor Osimhen", team:"Galatasaray", position:"Forvet", age:27, marketValue:75.0, goals:22, assists:8, minutes:2800, bigMatch:95, form:94, story:"75MÃ¢â€šÂ¬'luk dÃƒÂ¼nya yÃ„Â±ldÃ„Â±zÃ„Â±, 22 gol ve 8 asistle gol krallÃ„Â±Ã„Å¸Ã„Â±nÃ„Â±n ortaÃ„Å¸Ã„Â± oldu ve Ã…Å¸ampiyonluÃ„Å¸un en bÃƒÂ¼yÃƒÂ¼k mimarÃ„Â±ydÃ„Â±.", career:["Wolfsburg","Lille","Napoli","Galatasaray"], strengths:["Bitiricilik","HÃ„Â±z","Fizik"] },
  { name:"Mauro Icardi", team:"Galatasaray", position:"Forvet", age:33, marketValue:4.0, goals:10, assists:4, minutes:1900, bigMatch:90, form:85, story:"YaÃ…Å¸adÃ„Â±Ã„Å¸Ã„Â± sakatlÃ„Â±klara raÃ„Å¸men ÃƒÂ§Ã„Â±ktÃ„Â±Ã„Å¸Ã„Â± maÃƒÂ§larda klasÃ„Â±nÃ„Â± konuÃ…Å¸turdu ve 10 gol attÃ„Â±.", career:["Sampdoria","Inter","PSG","Galatasaray"], strengths:["Bitiricilik","Pozisyon Alma","TecrÃƒÂ¼be"] },
  { name:"Baris Alper Yilmaz", team:"Galatasaray", position:"Kanat", age:26, marketValue:30.0, goals:8, assists:11, minutes:2900, bigMatch:92, form:95, story:"8 gol 11 asist ile ligin en deÃ„Å¸erli TÃƒÂ¼rk oyuncusu. Sezonun oyuncusu ÃƒÂ¶dÃƒÂ¼lÃƒÂ¼nÃƒÂ¼n sahibi.", career:["KeÃƒÂ§iÃƒÂ¶rengÃƒÂ¼cÃƒÂ¼","Galatasaray"], strengths:["HÃ„Â±z","Dribbling","GÃƒÂ¼ÃƒÂ§"] },
  { name:"Leroy Sane", team:"Galatasaray", position:"Kanat", age:30, marketValue:20.0, goals:7, assists:5, minutes:2400, bigMatch:86, form:87, story:"Bayern MÃƒÂ¼nih'ten gelen dÃƒÂ¼nya yÃ„Â±ldÃ„Â±zÃ„Â±, 7 gol ve 5 asistle Ã…Å¸ampiyonluk yolunda tecrÃƒÂ¼besiyle fark yarattÃ„Â±.", career:["Schalke","Man City","Bayern","Galatasaray"], strengths:["HÃ„Â±z","Teknik","Dribbling"] },
  { name:"Gabriel Sara", team:"Galatasaray", position:"Orta saha", age:26, marketValue:27.0, goals:8, assists:14, minutes:2850, bigMatch:88, form:91, story:"14 asist ile Galatasaray'Ã„Â±n oyun kurma merkezi. Duran toplardaki ustalÃ„Â±Ã„Å¸Ã„Â±yla Ã…Å¸ampiyonlukta pay sahibi.", career:["Gremio","Norwich","Galatasaray"], strengths:["Pas kalitesi","YaratÃ„Â±cÃ„Â±lÃ„Â±k","Oyun GÃƒÂ¶rÃƒÂ¼Ã…Å¸ÃƒÂ¼"] },
  { name:"Lucas Torreira", team:"Galatasaray", position:"Orta saha", age:30, marketValue:10.0, goals:3, assists:7, minutes:2700, bigMatch:87, form:88, story:"Galatasaray'Ã„Â±n orta saha dinamosu. Savunma arkasÃ„Â±nÃ„Â± sÃƒÂ¼pÃƒÂ¼rme ve pas daÃ„Å¸Ã„Â±tÃ„Â±mÃ„Â±ndaki baÃ…Å¸arÃ„Â±sÃ„Â±yla paha biÃƒÂ§ilemez.", career:["Sampdoria","Arsenal","Atletico","Fiorentina","Galatasaray"], strengths:["Top Kapma","Savunma","Ã„Â°stikrar"] },
  { name:"Wilfried Stephane Singo", team:"Galatasaray", position:"Defans", age:25, marketValue:23.0, goals:1, assists:2, minutes:2600, bigMatch:85, form:87, story:"Monaco'dan transfer edilen Singo, savunmanÃ„Â±n saÃ„Å¸ kulvarÃ„Â±nda gÃƒÂ¼ÃƒÂ§lÃƒÂ¼ fiziÃ„Å¸i ve temposuyla adeta bir duvar ÃƒÂ¶rdÃƒÂ¼.", career:["Torino","Monaco","Galatasaray"], strengths:["HÃ„Â±z","Fiziksel GÃƒÂ¼ÃƒÂ§","Savunma"] },
  { name:"Abdulkerim Bardakci", team:"Galatasaray", position:"Defans", age:31, marketValue:6.5, goals:3, assists:1, minutes:2750, bigMatch:84, form:85, story:"Milli stoper tecrÃƒÂ¼besi, lider karakteri ve hava toplarÃ„Â±ndaki ÃƒÂ¼stÃƒÂ¼nlÃƒÂ¼Ã„Å¸ÃƒÂ¼ ile savunmanÃ„Â±n en kritik parÃƒÂ§asÃ„Â±.", career:["Konyaspor","Galatasaray"], strengths:["Hava topu","Liderlik","Pas kalitesi"] },
  { name:"Davinson Sanchez", team:"Galatasaray", position:"Defans", age:30, marketValue:16.0, goals:2, assists:1, minutes:2500, bigMatch:88, form:89, story:"SavunmanÃ„Â±n lideri, hava toplarÃ„Â±nda geÃƒÂ§ilmez olurken hÃ„Â±zÃ„Â± ve oyun kurma yeteneÃ„Å¸iyle dÃƒÂ¼nya klasÃ„Â±ndaydÃ„Â±.", career:["Atletico Nacional","Ajax","Tottenham","Galatasaray"], strengths:["Savunma","HÃ„Â±z","GÃƒÂ¼ÃƒÂ§"] },
  { name:"Sacha Boey", team:"Galatasaray", position:"Defans", age:25, marketValue:18.0, goals:1, assists:3, minutes:2200, bigMatch:87, form:86, story:"Bayern MÃƒÂ¼nih'ten geri dÃƒÂ¶nen Sacha Boey, saÃ„Å¸ kulvarda eski enerjisini ve dinamizmini sahaya yansÃ„Â±ttÃ„Â±.", career:["Rennes","Galatasaray","Bayern","Galatasaray"], strengths:["HÃ„Â±z","DayanÃ„Â±klÃ„Â±lÃ„Â±k","Top Kapma"] },
  { name:"Ismail Jakobs", team:"Galatasaray", position:"Defans", age:26, marketValue:8.0, goals:1, assists:4, minutes:2300, bigMatch:82, form:84, story:"Sol bekte hÃ„Â±zÃ„Â± ve hÃƒÂ¼cum bindirmeleriyle sol kulvarÃ„Â± ÃƒÂ§ok etkili kullandÃ„Â±.", career:["KÃƒÂ¶ln","Monaco","Galatasaray"], strengths:["HÃ„Â±z","Orta","DayanÃ„Â±klÃ„Â±lÃ„Â±k"] },
  { name:"Kaan Ayhan", team:"Galatasaray", position:"Defans", age:31, marketValue:1.5, goals:1, assists:2, minutes:1800, bigMatch:83, form:82, story:"Stoper, saÃ„Å¸ bek ve ÃƒÂ¶n liberoda sergilediÃ„Å¸i joker performansla takÃ„Â±mÃ„Â±n en gÃƒÂ¼venilir isimlerindendi.", career:["Schalke","DÃƒÂ¼sseldorf","Sassuolo","Galatasaray"], strengths:["TecrÃƒÂ¼be","Pozisyon Alma","Ãƒâ€¡ok YÃƒÂ¶nlÃƒÂ¼lÃƒÂ¼k"] },
  { name:"Ilkay Gundogan", team:"Galatasaray", position:"Orta saha", age:35, marketValue:2.5, goals:4, assists:6, minutes:1700, bigMatch:90, form:85, story:"TecrÃƒÂ¼besiyle orta sahada oyun zekasÃ„Â±nÃ„Â± ve sakinliÃ„Å¸ini Galatasaray'a getirerek kilit paslar attÃ„Â±.", career:["Dortmund","Man City","Barcelona","Galatasaray"], strengths:["Pas","Oyun ZekasÃ„Â±","TecrÃƒÂ¼be"] },
  { name:"Mario Lemina", team:"Galatasaray", position:"Orta saha", age:32, marketValue:1.0, goals:2, assists:3, minutes:1600, bigMatch:80, form:82, story:"YÃ„Â±llar sonra Galatasaray'a dÃƒÂ¶nen tecrÃƒÂ¼beli oyuncu, orta saha rotasyonunda enerjisiyle katkÃ„Â± saÃ„Å¸ladÃ„Â±.", career:["Marseille","Juventus","Southampton","Galatasaray"], strengths:["Fizik","Dribbling","MÃƒÂ¼cadele"] },
  { name:"Roland Sallai", team:"Galatasaray", position:"Kanat", age:29, marketValue:14.0, goals:5, assists:6, minutes:2100, bigMatch:84, form:85, story:"Kanatlarda ÃƒÂ§alÃ„Â±Ã…Å¸kanlÃ„Â±Ã„Å¸Ã„Â±, pres gÃƒÂ¼cÃƒÂ¼ ve kritik anlarda attÃ„Â±Ã„Å¸Ã„Â± gollerle rotasyonun vazgeÃƒÂ§ilmezi oldu.", career:["Puskas","Freiburg","Galatasaray"], strengths:["Ãƒâ€¡alÃ„Â±Ã…Å¸kanlÃ„Â±k","Pres","Ã…Âut"] },
  { name:"Yunus Akgun", team:"Galatasaray", position:"Kanat", age:26, marketValue:8.0, goals:6, assists:8, minutes:2000, bigMatch:82, form:86, story:"HÃƒÂ¼cumda yaratÃ„Â±cÃ„Â±lÃ„Â±Ã„Å¸Ã„Â± ve sÃƒÂ¼ratiyle hem ligde hem de Avrupa'da etkileyici bir sezon geÃƒÂ§irdi.", career:["Galatasaray","Adana Demirspor","Leicester","Galatasaray"], strengths:["HÃ„Â±z","Teknik","Dribbling"] },
  { name:"Yaser Asprilla", team:"Galatasaray", position:"Kanat", age:22, marketValue:15.0, goals:4, assists:5, minutes:1500, bigMatch:81, form:83, story:"Girona'dan kiralanan genÃƒÂ§ KolombiyalÃ„Â±, saÃ„Å¸ kanatta tekniÃ„Å¸i ve hÃ„Â±zÃ„Â±yla gelecek vaat etti.", career:["Envigado","Watford","Girona","Galatasaray"], strengths:["Potansiyel","Teknik","HÃ„Â±z"] },
  { name:"Noa Lang", team:"Galatasaray", position:"Kanat", age:27, marketValue:22.0, goals:5, assists:4, minutes:1600, bigMatch:83, form:82, story:"Napoli'den kiralanan HollandalÃ„Â± kanat oyuncusu, driplingleri ile hÃƒÂ¼cuma zenginlik kattÃ„Â±.", career:["Ajax","Club Brugge","PSV","Galatasaray"], strengths:["Dribbling","YaratÃ„Â±cÃ„Â±lÃ„Â±k","Teknik"] },
  { name:"Victor Nelsson", team:"Galatasaray", position:"Defans", age:27, marketValue:15.0, goals:1, assists:0, minutes:2800, bigMatch:86, form:87, story:"DanimarkalÃ„Â± stoper, savunmadaki soÃ„Å¸ukkanlÃ„Â±lÃ„Â±Ã„Å¸Ã„Â±, hava toplarÃ„Â±ndaki hakimiyeti ve kritik mÃƒÂ¼dahaleleriyle defansÃ„Â±n sigortasÃ„Â± oldu.", career:["Kopenhag","Galatasaray"], strengths:["Markaj","Hava Topu"] },
  { name:"Dries Mertens", team:"Galatasaray", position:"Orta saha", age:38, marketValue:1.2, goals:7, assists:9, minutes:2100, bigMatch:89, form:88, story:"Galatasaray'Ã„Â±n tecrÃƒÂ¼beli Ã…Å¸efi Mertens, ilerleyen yaÃ…Å¸Ã„Â±na raÃ„Å¸men oyun zekasÃ„Â± ve asistleriyle hÃƒÂ¼cumu yÃƒÂ¶nlendirdi.", career:["Napoli","PSV","Galatasaray"], strengths:["Vizyon","Teknik"] },
  { name:"Michy Batshuayi", team:"Galatasaray", position:"Forvet", age:32, marketValue:8.5, goals:9, assists:3, minutes:1500, bigMatch:82, form:85, story:"FenerbahÃƒÂ§e'den transfer edilen BelÃƒÂ§ikalÃ„Â± golcÃƒÂ¼, kritik anlarda sahneye ÃƒÂ§Ã„Â±karak yedek kulÃƒÂ¼besinin en bÃƒÂ¼yÃƒÂ¼k gÃƒÂ¼cÃƒÂ¼ oldu.", career:["Chelsea","Marseille","FenerbahÃƒÂ§e","Galatasaray"], strengths:["Bitiricilik","Fizik"] },
  { name:"Elias Jelert", team:"Galatasaray", position:"Defans", age:22, marketValue:5.5, goals:0, assists:2, minutes:1700, bigMatch:79, form:80, story:"Kopenhag'dan transfer edilen genÃƒÂ§ saÃ„Å¸ bek, yÃƒÂ¼ksek enerjisi ve hÃ„Â±zÃ„Â±yla savunma ve hÃƒÂ¼cum geÃƒÂ§iÃ…Å¸lerinde dinamizm getirdi.", career:["Kopenhag","Galatasaray"], strengths:["HÃ„Â±z","Kondisyon"] },
  { name:"Berkan Kutlu", team:"Galatasaray", position:"Orta saha", age:28, marketValue:4.0, goals:2, assists:3, minutes:1800, bigMatch:80, form:84, story:"Ãƒâ€¡alÃ„Â±Ã…Å¸kan orta saha oyuncusu, yÃƒÂ¼ksek enerjisi ve pres gÃƒÂ¼cÃƒÂ¼yle maÃƒÂ§larÃ„Â±n ikinci yarÃ„Â±larÃ„Â±nda Galatasaray savunmasÃ„Â±nÃ„Â± rahatlattÃ„Â±.", career:["Genoa","Alanyaspor","Galatasaray"], strengths:["Pres","Kondisyon"] },
  { name:"Ederson", team:"Fenerbahce", position:"Kaleci", age:32, marketValue:10.0, goals:0, assists:0, minutes:3150, bigMatch:88, form:87, story:"Kalesinde tecrÃƒÂ¼besiyle devleÃ…Å¸en BrezilyalÃ„Â±, geriden oyun kurmadaki ÃƒÂ¼stÃƒÂ¼n kalitesiyle FenerbahÃƒÂ§e'nin kilit ismiydi.", career:["Benfica","Man City","Fenerbahce"], strengths:["Pas kalitesi","Refleks","Deneyim"] },
  { name:"Tarik Cetin", team:"Fenerbahce", position:"Kaleci", age:29, marketValue:0.2, goals:0, assists:0, minutes:90, bigMatch:70, form:75, story:"Yedek kaleci olarak kupa maÃƒÂ§larÃ„Â±nda forma giydi.", career:["FenerbahÃƒÂ§e","Rizespor"], strengths:["Refleks"] },
  { name:"Caglar Soyuncu", team:"Fenerbahce", position:"Defans", age:30, marketValue:10.0, goals:2, assists:3, minutes:2800, bigMatch:84, form:86, story:"Atletico Madrid'den transfer edilen Ãƒâ€¡aÃ„Å¸lar, savunmada liderlik vasÃ„Â±flarÃ„Â±yla ÃƒÂ¶ne ÃƒÂ§Ã„Â±ktÃ„Â±.", career:["AltÃ„Â±nordu","Freiburg","Leicester","Atletico","Fenerbahce"], strengths:["Hava Topu","Liderlik","Agresiflik"] },
  { name:"Jayden Oosterwolde", team:"Fenerbahce", position:"Defans", age:25, marketValue:11.0, goals:1, assists:2, minutes:2700, bigMatch:83, form:85, story:"Sol bek ve stoperde hÃ„Â±zÃ„Â± ve gÃƒÂ¼ÃƒÂ§lÃƒÂ¼ fiziÃ„Å¸iyle rakip hÃƒÂ¼cumculara geÃƒÂ§it vermedi.", career:["Twente","Parma","Fenerbahce"], strengths:["HÃ„Â±z","Fizik","MÃƒÂ¼dahale"] },
  { name:"Mert Muldur", team:"Fenerbahce", position:"Defans", age:27, marketValue:5.5, goals:1, assists:4, minutes:2200, bigMatch:81, form:83, story:"SaÃ„Å¸ bekte ÃƒÂ§alÃ„Â±Ã…Å¸kanlÃ„Â±Ã„Å¸Ã„Â± ve istikrarÃ„Â±yla takÃ„Â±mÃ„Â±n ÃƒÂ¶nemli bir parÃƒÂ§asÃ„Â± oldu.", career:["Rapid Wien","Sassuolo","Fenerbahce"], strengths:["Pozisyon Alma","HÃ„Â±z","Disiplin"] },
  { name:"Milan Skriniar", team:"Fenerbahce", position:"Defans", age:31, marketValue:10.0, goals:1, assists:0, minutes:2800, bigMatch:86, form:86, story:"PSG'den transfer edilen Slovak stoper, saÃ„Å¸lam savunma duruÃ…Å¸u ve gÃƒÂ¼ÃƒÂ§lÃƒÂ¼ fiziÃ„Å¸iyle geÃƒÂ§ilmez bir duvar ÃƒÂ¶rdÃƒÂ¼.", career:["Zilina","Sampdoria","Inter","PSG","Fenerbahce"], strengths:["Markaj","GÃƒÂ¼ÃƒÂ§","Pozisyon Alma"] },
  { name:"Nelson Semedo", team:"Fenerbahce", position:"Defans", age:32, marketValue:4.0, goals:1, assists:3, minutes:2300, bigMatch:82, form:83, story:"SaÃ„Å¸ kulvarda tecrÃƒÂ¼besi ve bindirmeleriyle takÃ„Â±ma derinlik kazandÃ„Â±rdÃ„Â±.", career:["Benfica","Barcelona","Wolves","Fenerbahce"], strengths:["HÃ„Â±z","TecrÃƒÂ¼be","HÃƒÂ¼cum katkÃ„Â±sÃ„Â±"] },
  { name:"Archibald Norman Brown", team:"Fenerbahce", position:"Defans", age:24, marketValue:3.5, goals:0, assists:2, minutes:1500, bigMatch:78, form:80, story:"Gent'ten transfer edilen Ã„Â°ngiliz sol bek, atletizmiyle alternatif saÃ„Å¸ladÃ„Â±.", career:["Derby","Lausanne","Gent","Fenerbahce"], strengths:["HÃ„Â±z","Orta","Fizik"] },
  { name:"Anderson Talisca", team:"Fenerbahce", position:"Orta saha", age:32, marketValue:7.0, goals:19, assists:5, minutes:2200, bigMatch:89, form:87, story:"FenerbahÃƒÂ§e'nin Ã…Å¸ampiyonluk yarÃ„Â±Ã…Å¸Ã„Â±ndaki en bÃƒÂ¼yÃƒÂ¼k gol silahÃ„Â±. Duran toplar ve ceza sahasÃ„Â± dÃ„Â±Ã…Å¸Ã„Â± Ã…Å¸utlarÃ„Â±yla ligde 19 gol attÃ„Â±.", career:["Benfica","Besiktas","Guangzhou","Al Nassr","Fenerbahce"], strengths:["Ã…Âut","Duran Top","BÃƒÂ¼yÃƒÂ¼k MaÃƒÂ§"] },
  { name:"Ismail Yuksek", team:"Fenerbahce", position:"Orta saha", age:27, marketValue:10.0, goals:2, assists:4, minutes:2500, bigMatch:83, form:84, story:"Orta sahada dinamizmi, agresif presi ve top ÃƒÂ§alma istatistikleriyle yine kilit roldeydi.", career:["GÃƒÂ¶lcÃƒÂ¼kspor","Fenerbahce"], strengths:["MÃƒÂ¼cadele","Top Kapma","Pres"] },
  { name:"Mert Hakan Yandas", team:"Fenerbahce", position:"Orta saha", age:31, marketValue:1.2, goals:3, assists:5, minutes:1400, bigMatch:80, form:82, story:"TakÃ„Â±mÃ„Â±n saha iÃƒÂ§i liderlerinden, hÃ„Â±rsÃ„Â± ve tecrÃƒÂ¼besiyle rotasyonda ÃƒÂ¶nemli bir joker.", career:["Sivasspor","Fenerbahce"], strengths:["MÃƒÂ¼cadele","HÃ„Â±rs","Pas"] },
  { name:"Edson Alvarez", team:"Fenerbahce", position:"Orta saha", age:28, marketValue:15.0, goals:4, assists:8, minutes:2900, bigMatch:86, form:88, story:"West Ham'dan transfer edilen MeksikalÃ„Â±, orta sahada ÃƒÂ¼stÃƒÂ¼n fizik gÃƒÂ¼cÃƒÂ¼ ve kesiciliÃ„Å¸iyle savunmanÃ„Â±n ÃƒÂ¶nÃƒÂ¼ndeki sigortaydÃ„Â±.", career:["Club America","Ajax","West Ham","Fenerbahce"], strengths:["Top Kapma","Pozisyon Alma","Fiziksel GÃƒÂ¼ÃƒÂ§"] },
  { name:"Marco Asensio", team:"Fenerbahce", position:"Orta saha", age:30, marketValue:15.0, goals:11, assists:12, minutes:2100, bigMatch:88, form:89, story:"11 gol ve 12 asist ile ligin en ÃƒÂ¼retken oyuncularÃ„Â±ndan biri. Oyun kurma becerisiyle takÃ„Â±mÃ„Â± yÃƒÂ¶nlendirdi.", career:["Mallorca","Real Madrid","PSG","Fenerbahce"], strengths:["Ã…Âut","Pas kalitesi","TecrÃƒÂ¼be"] },
  { name:"Matteo Guendouzi", team:"Fenerbahce", position:"Orta saha", age:27, marketValue:18.0, goals:3, assists:6, minutes:2400, bigMatch:85, form:86, story:"Lazio'dan transfer edilen FransÃ„Â±z orta saha, bitmek bilmeyen enerjisi ve hÃ„Â±rslÃ„Â± yapÃ„Â±sÃ„Â±yla takÃ„Â±mÃ„Â± ateÃ…Å¸ledi.", career:["Lorient","Arsenal","Marseille","Lazio","Fenerbahce"], strengths:["DayanÃ„Â±klÃ„Â±lÃ„Â±k","Pas","MÃƒÂ¼cadele"] },
  { name:"N'Golo Kante", team:"Fenerbahce", position:"Orta saha", age:35, marketValue:4.0, goals:1, assists:4, minutes:1800, bigMatch:88, form:85, story:"Al-Ittihad'dan transfer edilen efsane orta saha, tecrÃƒÂ¼besi ve kritik mÃƒÂ¼dahaleleriyle oyunu dengeledi.", career:["Leicester","Chelsea","Al-Ittihad","Fenerbahce"], strengths:["Pozisyon Alma","MÃƒÂ¼cadele","TecrÃƒÂ¼be"] },
  { name:"Fred", team:"Fenerbahce", position:"Orta saha", age:33, marketValue:4.5, goals:4, assists:7, minutes:2100, bigMatch:85, form:84, story:"Orta sahadaki yaratÃ„Â±cÃ„Â±lÃ„Â±Ã„Å¸Ã„Â±, topla ÃƒÂ§Ã„Â±kÃ„Â±Ã…Å¸larÃ„Â± ve oyun akÃ„Â±Ã…Å¸Ã„Â±nÃ„Â± hÃ„Â±zlandÃ„Â±rmasÃ„Â±yla paha biÃƒÂ§ilemez bir parÃƒÂ§a.", career:["Shakhtar","Man United","Fenerbahce"], strengths:["Oyun Kurma","Teknik","Pas"] },
  { name:"Kerem Akturkoglu", team:"Fenerbahce", position:"Kanat", age:27, marketValue:20.0, goals:8, assists:7, minutes:2500, bigMatch:85, form:86, story:"Benfica sonrasÃ„Â± FenerbahÃƒÂ§e'ye imza atan Kerem, hÃ„Â±zÃ„Â± ve gol yollarÃ„Â±ndaki etkinliÃ„Å¸iyle takÃ„Â±ma dinamizm kattÃ„Â±.", career:["Galatasaray","Benfica","Fenerbahce"], strengths:["HÃ„Â±z","Dribbling","Gol"] },
  { name:"Dorgeles Nene", team:"Fenerbahce", position:"Kanat", age:23, marketValue:9.0, goals:9, assists:16, minutes:2700, bigMatch:90, form:92, story:"FenerbahÃƒÂ§e'nin Salzburg'dan transfer ettiÃ„Å¸i genÃƒÂ§ yetenek, ligde yaptÃ„Â±gÃ„Â± 16 asistle asist kralÃ„Â± oldu.", career:["Salzburg","Westerlo","Fenerbahce"], strengths:["Asist","HÃ„Â±z","Bire Bir"] },
  { name:"Anthony Musaba", team:"Fenerbahce", position:"Kanat", age:25, marketValue:3.0, goals:5, assists:4, minutes:1600, bigMatch:79, form:81, story:"Sheffield Wednesday'den gelen hÃ„Â±zlÃ„Â± kanat oyuncusu, rotasyonda patlayÃ„Â±cÃ„Â±lÃ„Â±k getirdi.", career:["Monaco","Metz","Sheffield Wed","Fenerbahce"], strengths:["HÃ„Â±z","Bire Bir"] },
  { name:"Oguz AydÃ„Â±n", team:"Fenerbahce", position:"Kanat", age:25, marketValue:4.5, goals:4, assists:3, minutes:1300, bigMatch:78, form:80, story:"Alanyaspor'dan gelen genÃƒÂ§ oyuncu, hÃ„Â±zÃ„Â± ve hÃƒÂ¼cum zenginliÃ„Å¸iyle sÃƒÂ¼re aldÃ„Â±Ã„Å¸Ã„Â± anlarda katkÃ„Â± saÃ„Å¸ladÃ„Â±.", career:["Alanyaspor","Fenerbahce"], strengths:["HÃ„Â±z","Pres"] },
  { name:"Youssef En-Nesyri", team:"Fenerbahce", position:"Forvet", age:28, marketValue:20.0, goals:14, assists:3, minutes:2600, bigMatch:87, form:86, story:"Sevilla'dan transfer edilen FaslÃ„Â± golcÃƒÂ¼, gÃƒÂ¼ÃƒÂ§lÃƒÂ¼ fiziÃ„Å¸i ve olaÃ„Å¸anÃƒÂ¼stÃƒÂ¼ kafa golleriyle FenerbahÃƒÂ§e'nin gol yÃƒÂ¼kÃƒÂ¼nÃƒÂ¼ ÃƒÂ§ekti.", career:["Sevilla","Malaga","FenerbahÃƒÂ§e"], strengths:["Hava Topu","Fizik"] },
  { name:"Sebastian Szymanski", team:"Fenerbahce", position:"Orta saha", age:27, marketValue:19.0, goals:8, assists:9, minutes:2900, bigMatch:85, form:84, story:"PolonyalÃ„Â± on numara, pres gÃƒÂ¼cÃƒÂ¼, ceza sahasÃ„Â±na koÃ…Å¸ularÃ„Â± ve skor katkÃ„Â±larÃ„Â±yla FenerbahÃƒÂ§e hÃƒÂ¼cumunun en dinamik diÃ…Å¸lisi oldu.", career:["Feyenoord","Dynamo Moskova","FenerbahÃƒÂ§e"], strengths:["Pres","HÃ„Â±z"] },
  { name:"Allan Saint-Maximin", team:"Fenerbahce", position:"Kanat", age:29, marketValue:17.0, goals:6, assists:8, minutes:2400, bigMatch:84, form:85, story:"Sol kanattaki patlayÃ„Â±cÃ„Â± hÃ„Â±zÃ„Â± ve ÃƒÂ¶ngÃƒÂ¶rÃƒÂ¼lemez driplingleriyle SÃƒÂ¼per Lig savunmalarÃ„Â±nÃ„Â±n korkulu rÃƒÂ¼yasÃ„Â± haline geldi.", career:["Newcastle","Al-Ahli","FenerbahÃƒÂ§e"], strengths:["Dripling","HÃ„Â±z"] },
  { name:"Dusan Tadic", team:"Fenerbahce", position:"Kanat", age:37, marketValue:3.2, goals:9, assists:11, minutes:2800, bigMatch:91, form:89, story:"FenerbahÃƒÂ§e'den tecrÃƒÂ¼beli sol kanat Ã…Å¸efi, duran toplarÃ„Â±, yaratÃ„Â±cÃ„Â±lÃ„Â±Ã„Å¸Ã„Â± ve asistleriyle hÃƒÂ¼cumu yÃƒÂ¶nlendirdi.", career:["Ajax","Southampton","FenerbahÃƒÂ§e"], strengths:["Pas","Vizyon"] },
  { name:"Dominik Livakovic", team:"Fenerbahce", position:"Kaleci", age:31, marketValue:9.5, goals:0, assists:0, minutes:3100, bigMatch:86, form:85, story:"HÃ„Â±rvat milli kaleci, refleksleri ve ÃƒÂ§izgi kurtarÃ„Â±Ã…Å¸larÃ„Â±yla FenerbahÃƒÂ§e kalesinde devleÃ…Å¸ti, takÃ„Â±mÃ„Â±na birÃƒÂ§ok maÃƒÂ§ta puan kazandÃ„Â±.", career:["Dinamo Zagreb","FenerbahÃƒÂ§e"], strengths:["Refleks","Bire Bir"] },
  { name:"Mert Gunok", team:"Besiktas", position:"Kaleci", age:37, marketValue:0.5, goals:0, assists:0, minutes:3200, bigMatch:83, form:82, story:"Karakteri ve tecrÃƒÂ¼besiyle takÃ„Â±mÃ„Â±n kaptanÃ„Â± ve kalesindeki en gÃƒÂ¼venilir gÃƒÂ¼vencesi oldu.", career:["Fenerbahce","Bursaspor","Basaksehir","Besiktas"], strengths:["Deneyim","KurtarÃ„Â±Ã…Å¸","Liderlik"] },
  { name:"Ersin Destanoglu", team:"Besiktas", position:"Kaleci", age:25, marketValue:1.8, goals:0, assists:0, minutes:400, bigMatch:76, form:78, story:"Mert GÃƒÂ¼nok'un yokluÃ„Å¸unda kaleyi korudu ve kupa maÃƒÂ§larÃ„Â±nda gÃƒÂ¶rev aldÃ„Â±.", career:["BeÃ…Å¸iktaÃ…Å¸"], strengths:["Refleks","PenaltÃ„Â±"] },
  { name:"Ridvan Yilmaz", team:"Besiktas", position:"Defans", age:25, marketValue:5.0, goals:2, assists:5, minutes:2400, bigMatch:82, form:84, story:"Rangers'tan BeÃ…Å¸iktaÃ…Å¸'a geri dÃƒÂ¶nen sol bek, hÃ„Â±zÃ„Â± ve isabetli ortalarÃ„Â±yla sol kulvara canlÃ„Â±lÃ„Â±k kattÃ„Â±.", career:["Besiktas","Rangers","Besiktas"], strengths:["Orta","HÃ„Â±z","Pas"] },
  { name:"Emirhan Topcu", team:"Besiktas", position:"Defans", age:25, marketValue:4.5, goals:2, assists:1, minutes:2500, bigMatch:81, form:83, story:"Rizespor'dan transfer edilen stoper, hava toplarÃ„Â±nda ve savunmadaki sert yapÃ„Â±sÃ„Â±yla alkÃ„Â±Ã…Å¸ topladÃ„Â±.", career:["Rizespor","Besiktas"], strengths:["MÃƒÂ¼dahale","Hava Topu","GÃƒÂ¼ÃƒÂ§"] },
  { name:"Felix Uduokhai", team:"Besiktas", position:"Defans", age:28, marketValue:3.5, goals:1, assists:0, minutes:2600, bigMatch:82, form:83, story:"Augsburg'dan transfer edilen Alman stoper, uzun boyu ve dengeli oyunuyla savunmanÃ„Â±n temel taÃ…Å¸larÃ„Â±ndan biri oldu.", career:["TSV 1860","Wolfsburg","Augsburg","Besiktas"], strengths:["Hava Topu","Pozisyon Alma"] },
  { name:"Tiago Djalo", team:"Besiktas", position:"Defans", age:26, marketValue:7.0, goals:1, assists:1, minutes:2100, bigMatch:80, form:82, story:"Juventus'tan kiralanan Portekizli stoper, atletizmi ve hÃ„Â±zÃ„Â±yla savunmaya derinlik kazandÃ„Â±rdÃ„Â±.", career:["Lille","Juventus","Besiktas"], strengths:["HÃ„Â±z","Fizik","MÃƒÂ¼dahale"] },
  { name:"Michael Murillo", team:"Besiktas", position:"Defans", age:30, marketValue:4.0, goals:1, assists:3, minutes:2300, bigMatch:80, form:82, story:"Marseille'den gelen deneyimli saÃ„Å¸ bek, savunma gÃƒÂ¼cÃƒÂ¼ ve hÃƒÂ¼cuma desteÃ„Å¸iyle saÃ„Å¸ kulvarÃ„Â± kontrol etti.", career:["Anderlecht","Marseille","Besiktas"], strengths:["Savunma","TecrÃƒÂ¼be","Orta"] },
  { name:"Emmanuel Agbadou", team:"Besiktas", position:"Defans", age:28, marketValue:6.0, goals:2, assists:0, minutes:2500, bigMatch:82, form:83, story:"Reims'tan transfer edilen FildiÃ…Å¸i Sahilli stoper, fiziksel gÃƒÂ¼cÃƒÂ¼ ve mÃƒÂ¼cadeleci yapÃ„Â±sÃ„Â±yla dikkat ÃƒÂ§ekti.", career:["Eupen","Reims","Besiktas"], strengths:["Fizik","GÃƒÂ¼ÃƒÂ§","Markaj"] },
  { name:"Yasin Ozcan", team:"Besiktas", position:"Defans", age:20, marketValue:4.5, goals:1, assists:2, minutes:1600, bigMatch:77, form:80, story:"KasÃ„Â±mpaÃ…Å¸a'dan transfer edilen genÃƒÂ§ sol bek, yÃƒÂ¼ksek potansiyeliyle beÃ„Å¸eni topladÃ„Â±.", career:["Kasimpasa","Besiktas"], strengths:["Potansiyel","Ãƒâ€¡eviklik"] },
  { name:"Wilfred Ndidi", team:"Besiktas", position:"Orta saha", age:29, marketValue:8.0, goals:3, assists:5, minutes:2700, bigMatch:85, form:86, story:"Orta sahanÃ„Â±n gÃƒÂ¶beÃ„Å¸inde defansif kalkan gÃƒÂ¶revi gÃƒÂ¶ren Ndidi, fiziksel mÃƒÂ¼cadelesiyle rakipleri yÃ„Â±prattÃ„Â±.", career:["Genk","Leicester","Besiktas"], strengths:["Savunma","Top Kapma","DayanÃ„Â±klÃ„Â±lÃ„Â±k"] },
  { name:"Orkun Kokcu", team:"Besiktas", position:"Orta saha", age:25, marketValue:25.0, goals:9, assists:8, minutes:2600, bigMatch:88, form:90, story:"Benfica'dan BeÃ…Å¸iktaÃ…Å¸'a transfer olan Orkun, orta sahada yÃƒÂ¼ksek oyun zekasÃ„Â± ve Ã…Å¸utlarÃ„Â±yla takÃ„Â±mÃ„Â±nÃ„Â± sÃ„Â±rtladÃ„Â±.", career:["Feyenoord","Benfica","Besiktas"], strengths:["Pas","Vizyon","Gol"] },
  { name:"Salih Ucan", team:"Besiktas", position:"Orta saha", age:32, marketValue:1.5, goals:2, assists:5, minutes:1900, bigMatch:79, form:80, story:"Orta saha rotasyonunun en ÃƒÂ¶nemli parÃƒÂ§alarÃ„Â±ndan biri. Pas kalitesi ve duran toplardaki etkisiyle katkÃ„Â± saÃ„Å¸ladÃ„Â±.", career:["Roma","Fenerbahce","Alanyaspor","Besiktas"], strengths:["Pas","Duran Top"] },
  { name:"Kristjan Asllani", team:"Besiktas", position:"Orta saha", age:24, marketValue:12.0, goals:3, assists:4, minutes:2000, bigMatch:82, form:83, story:"Inter'den kiralanan genÃƒÂ§ Arnavut, pas daÃ„Å¸Ã„Â±tÃ„Â±mÃ„Â± ve oyun yÃƒÂ¶nlendirmedeki baÃ…Å¸arÃ„Â±sÃ„Â±yla beÃ„Å¸eni kazandÃ„Â±.", career:["Empoli","Inter","Besiktas"], strengths:["Pas kalitesi","Oyun GÃƒÂ¶rÃƒÂ¼Ã…Å¸ÃƒÂ¼","Teknik"] },
  { name:"Tammy Abraham", team:"Besiktas", position:"Forvet", age:28, marketValue:18.0, goals:15, assists:5, minutes:2500, bigMatch:86, form:87, story:"Roma'dan transfer olan Ã„Â°ngiliz santrfor, 15 golle BeÃ…Å¸iktaÃ…Å¸'Ã„Â±n en skorer ismi oldu ve ceza sahasÃ„Â± hakimiyeti kurdu.", career:["Chelsea","Aston Villa","Roma","Besiktas"], strengths:["Fizik","Ceza SahasÃ„Â±","Bitiricilik"] },
  { name:"Oh Hyun-Gyu", team:"Besiktas", position:"Forvet", age:25, marketValue:3.0, goals:6, assists:2, minutes:1200, bigMatch:77, form:80, story:"Genk'ten kiralanan GÃƒÂ¼ney Koreli forvet, enerjik presi ve hÃ„Â±rslÃ„Â± oyunuyla taraftarÃ„Â±n sevgisini kazandÃ„Â±.", career:["Celtic","Genk","Besiktas"], strengths:["Pres","MÃƒÂ¼cadele","Bitiricilik"] },
  { name:"Milot Rashica", team:"Besiktas", position:"Kanat", age:29, marketValue:3.5, goals:5, assists:6, minutes:2200, bigMatch:80, form:81, story:"Kanatlardaki sÃƒÂ¼rati, asistleri ve savunma yardÃ„Â±mÃ„Â±yla BeÃ…Å¸iktaÃ…Å¸ hÃƒÂ¼cumunda ÃƒÂ¶nemli rol oynadÃ„Â±.", career:["Werder Bremen","Norwich","Galatasaray","Besiktas"], strengths:["HÃ„Â±z","Asist","Pres"] },
  { name:"El Bilal Toure", team:"Besiktas", position:"Forvet", age:24, marketValue:8.0, goals:8, assists:3, minutes:1700, bigMatch:80, form:82, story:"Stuttgart'tan gelen genÃƒÂ§ forvet, patlayÃ„Â±cÃ„Â± hÃ„Â±zÃ„Â± ve fiziÃ„Å¸iyle hÃƒÂ¼cum hattÃ„Â±nda ÃƒÂ§ok etkiliydi.", career:["Reims","Almeria","Atalanta","Besiktas"], strengths:["HÃ„Â±z","Fizik","Hava Topu"] },
  { name:"Vaclav Cerny", team:"Besiktas", position:"Kanat", age:28, marketValue:5.0, goals:6, assists:7, minutes:1900, bigMatch:81, form:82, story:"Wolfsburg'dan kiralanan Ãƒâ€¡ek kanat oyuncusu, sol ayaÃ„Å¸Ã„Â±yla attÃ„Â±Ã„Å¸Ã„Â± kavisli Ã…Å¸utlar ve ortalarla fark yarattÃ„Â±.", career:["Ajax","Twente","Wolfsburg","Besiktas"], strengths:["Teknik","Uzak Ã…Âut","Orta"] },
  { name:"Cengiz Under", team:"Besiktas", position:"Kanat", age:28, marketValue:6.0, goals:4, assists:5, minutes:1500, bigMatch:81, form:80, story:"FenerbahÃƒÂ§e'den transfer edilen milli kanat, uzaktan Ã…Å¸utlarÃ„Â± ve tecrÃƒÂ¼besiyle kanat rotasyonunu gÃƒÂ¼ÃƒÂ§lendirdi.", career:["Roma","Leicester","Marsilya","Fenerbahce","Besiktas"], strengths:["Uzak Ã…Âut","Dribbling","TecrÃƒÂ¼be"] },
  { name:"Jota Silva", team:"Besiktas", position:"Kanat", age:26, marketValue:8.0, goals:7, assists:4, minutes:1800, bigMatch:81, form:83, story:"Nottingham Forest'tan transfer edilen Portekizli kanat, ÃƒÂ§alÃ„Â±Ã…Å¸kanlÃ„Â±Ã„Å¸Ã„Â± ve bitiriciliÃ„Å¸iyle BeÃ…Å¸iktaÃ…Å¸'Ã„Â±n kilit isimlerindendi.", career:["Guimaraes","Nottingham Forest","Besiktas"], strengths:["HÃ„Â±z","Bitiricilik","MÃƒÂ¼cadele"] },
  { name:"Rafa Silva", team:"Besiktas", position:"Orta saha", age:33, marketValue:11.5, goals:12, assists:8, minutes:2700, bigMatch:89, form:88, story:"Benfica'dan transfer edilen Portekizli sÃƒÂ¼per yÃ„Â±ldÃ„Â±z, hÃ„Â±zÃ„Â±, tekniÃ„Å¸i ve bitiriciliÃ„Å¸iyle BeÃ…Å¸iktaÃ…Å¸ hÃƒÂ¼cumunun lideri oldu.", career:["Benfica","Braga","BeÃ…Å¸iktaÃ…Å¸"], strengths:["HÃ„Â±z","Teknik"] },
  { name:"Ciro Immobile", team:"Besiktas", position:"Forvet", age:36, marketValue:4.0, goals:16, assists:2, minutes:2300, bigMatch:90, form:87, story:"Ã„Â°talyan efsane golcÃƒÂ¼, tecrÃƒÂ¼besi ve ceza sahasÃ„Â±ndaki ÃƒÂ¶lÃƒÂ¼mcÃƒÂ¼l bitiriciliÃ„Å¸iyle gol krallÃ„Â±Ã„Å¸Ã„Â± yarÃ„Â±Ã…Å¸Ã„Â±nda BeÃ…Å¸iktaÃ…Å¸'Ã„Â± zirvede tuttu.", career:["Lazio","Dortmund","Torino","BeÃ…Å¸iktaÃ…Å¸"], strengths:["Bitiricilik","TecrÃƒÂ¼be"] },
  { name:"Gedson Fernandes", team:"Besiktas", position:"Orta saha", age:27, marketValue:18.5, goals:7, assists:6, minutes:2900, bigMatch:86, form:88, story:"Orta sahadaki dripling yeteneÃ„Å¸i, topsuz koÃ…Å¸ularÃ„Â± ve savunma katkÃ„Â±sÃ„Â±yla ligin en komple orta saha oyuncularÃ„Â±ndan biri oldu.", career:["Benfica","Tottenham","BeÃ…Å¸iktaÃ…Å¸"], strengths:["Dripling","Kondisyon"] },
  { name:"Arthur Masuaku", team:"Besiktas", position:"Defans", age:32, marketValue:4.2, goals:1, assists:5, minutes:2600, bigMatch:81, form:82, story:"Demokratik Kongolu sol bek, ÃƒÂ§izgiyi etkili kullanmasÃ„Â±, isabetli ortalarÃ„Â± ve hÃƒÂ¼cuma verdiÃ„Å¸i destekle takÃ„Â±mÃ„Â±n sol koridorunu yÃƒÂ¶netti.", career:["West Ham","Olympiacos","BeÃ…Å¸iktaÃ…Å¸"], strengths:["Orta","Fizik"] },
  { name:"Jonas Svensson", team:"Besiktas", position:"Defans", age:33, marketValue:2.0, goals:0, assists:3, minutes:2400, bigMatch:80, form:81, story:"TecrÃƒÂ¼beli saÃ„Å¸ bek, savunmadaki dengeli oyunu, profesyonelliÃ„Å¸i ve istikrarlÃ„Â± performansÃ„Â±yla BeÃ…Å¸iktaÃ…Å¸ savunmasÃ„Â±nÃ„Â±n gÃƒÂ¼vencesi oldu.", career:["AZ Alkmaar","Adana Demirspor","BeÃ…Å¸iktaÃ…Å¸"], strengths:["Markaj","Ã„Â°stikrar"] },
  { name:"Christ Inao Oulai", team:"Trabzonspor", position:"Forvet", age:21, marketValue:150.0, goals:35, assists:15, minutes:3400, bigMatch:99, form:99, story:"DÃƒÂ¼nya futboluna yÃƒÂ¶n veren harika ÃƒÂ§ocuk. Ligin tartÃ„Â±Ã…Å¸masÃ„Â±z en iyisi.", career:["Trabzonspor"], strengths:["Bitiricilik","HÃ„Â±z","Dripling"] },
  { name:"Andre Onana", team:"Trabzonspor", position:"Kaleci", age:30, marketValue:7.0, goals:0, assists:0, minutes:3100, bigMatch:86, form:85, story:"Manchester United'dan transfer edilen tecrÃƒÂ¼beli Kamerunlu kaleci, kalesinde bÃƒÂ¼yÃƒÂ¼k gÃƒÂ¼ven verdi.", career:["Ajax","Inter","Man United","Trabzonspor"], strengths:["Refleks","Ayak kalitesi","KurtarÃ„Â±Ã…Å¸"] },
  { name:"Onuralp Cevikkan", team:"Trabzonspor", position:"Kaleci", age:20, marketValue:1.0, goals:0, assists:0, minutes:270, bigMatch:75, form:77, story:"Gelecek vaat eden genÃƒÂ§ milli kaleci, kupa maÃƒÂ§larÃ„Â±ndaki performansÃ„Â±yla gÃƒÂ¶z doldurdu.", career:["Trabzonspor"], strengths:["Potansiyel","KurtarÃ„Â±Ã…Å¸"] },
  { name:"Stefan Savic", team:"Trabzonspor", position:"Defans", age:35, marketValue:0.4, goals:1, assists:0, minutes:2200, bigMatch:82, form:82, story:"Atletico Madrid geÃƒÂ§miÃ…Å¸li KaradaÃ„Å¸lÃ„Â± stoper, liderliÃ„Å¸i ve tecrÃƒÂ¼besiyle savunmanÃ„Â±n komutanÃ„Â± oldu.", career:["Man City","Fiorentina","Atletico","Trabzonspor"], strengths:["TecrÃƒÂ¼be","Liderlik","Pozisyon Alma"] },
  { name:"Arseniy Batagov", team:"Trabzonspor", position:"Defans", age:24, marketValue:2.0, goals:0, assists:1, minutes:1800, bigMatch:77, form:79, story:"UkraynalÃ„Â± genÃƒÂ§ stoper, gÃƒÂ¼cÃƒÂ¼ ve hava topu hakimiyetiyle savunmaya derinlik getirdi.", career:["Zorya Luhansk","Trabzonspor"], strengths:["Hava Topu","GÃƒÂ¼ÃƒÂ§"] },
  { name:"Mustafa Eskihellac", team:"Trabzonspor", position:"Defans", age:29, marketValue:1.5, goals:1, assists:3, minutes:2300, bigMatch:78, form:80, story:"SaÃ„Å¸ bek ve saÃ„Å¸ aÃƒÂ§Ã„Â±kta ÃƒÂ§alÃ„Â±Ã…Å¸kanlÃ„Â±Ã„Å¸Ã„Â±yla gÃƒÂ¶rev yapan yerli oyuncu, dinamik katkÃ„Â± saÃ„Å¸ladÃ„Â±.", career:["Malatyaspor","Gaziantep FK","Trabzonspor"], strengths:["Ãƒâ€¡alÃ„Â±Ã…Å¸kanlÃ„Â±k","HÃ„Â±z","Orta"] },
  { name:"Mathias Fjortoft Lovik", team:"Trabzonspor", position:"Defans", age:22, marketValue:2.0, goals:1, assists:2, minutes:1700, bigMatch:76, form:78, story:"Molde'den transfer edilen NorveÃƒÂ§li genÃƒÂ§ sol bek, hÃƒÂ¼cumcu yapÃ„Â±sÃ„Â±yla gelecek vaat etti.", career:["Molde","Trabzonspor"], strengths:["HÃ„Â±z","Orta","Potansiyel"] },
  { name:"Serdar Saatci", team:"Trabzonspor", position:"Defans", age:23, marketValue:2.5, goals:0, assists:1, minutes:1600, bigMatch:78, form:79, story:"Braga'dan gelen genÃƒÂ§ milli stoper, hamle zamanlamasÃ„Â± ve fiziÃ„Å¸iyle stoper rotasyonunda kilit roldeydi.", career:["Besiktas","Braga","Trabzonspor"], strengths:["Pozisyon Alma","MÃƒÂ¼dahale"] },
  { name:"Rayyan Baniya", team:"Trabzonspor", position:"Defans", age:27, marketValue:1.5, goals:1, assists:0, minutes:1400, bigMatch:75, form:77, story:"Fizik gÃƒÂ¼cÃƒÂ¼ yÃƒÂ¼ksek stoper, savunmada yedek olarak sÃƒÂ¼re aldÃ„Â±Ã„Å¸Ã„Â± maÃƒÂ§larda hava toplarÃ„Â±nÃ„Â± temizledi.", career:["KaragÃƒÂ¼mrÃƒÂ¼k","Trabzonspor"], strengths:["Fizik","Hava Topu"] },
  { name:"Okay Yokuslu", team:"Trabzonspor", position:"Orta saha", age:32, marketValue:1.2, goals:2, assists:6, minutes:2700, bigMatch:83, form:85, story:"Savunma ÃƒÂ¶nÃƒÂ¼nde tecrÃƒÂ¼besiyle gÃƒÂ¼ven veren Okay, hava toplarÃ„Â±ndaki etkisi ve kritik mÃƒÂ¼dahaleleriyle ÃƒÂ¶ne ÃƒÂ§Ã„Â±ktÃ„Â±.", career:["Trabzonspor","Celta Vigo","WBA","Trabzonspor"], strengths:["Savunma","TecrÃƒÂ¼be","Pas"] },
  { name:"Ozan Tufan", team:"Trabzonspor", position:"Orta saha", age:31, marketValue:1.5, goals:4, assists:5, minutes:2300, bigMatch:81, form:82, story:"Orta sahadan ceza sahasÃ„Â±na koÃ…Å¸ularÃ„Â± ve uzaktan Ã…Å¸utlarÃ„Â±yla hÃƒÂ¼cuma dinamizm katan milli oyuncu.", career:["Fenerbahce","Hull City","Trabzonspor"], strengths:["Ã…Âut","MÃƒÂ¼cadele","TecrÃƒÂ¼be"] },
  { name:"Benjamin Bouchouari", team:"Trabzonspor", position:"Orta saha", age:24, marketValue:3.0, goals:2, assists:4, minutes:1800, bigMatch:78, form:80, story:"Saint-Etienne'den transfer edilen FaslÃ„Â± orta saha, dar alandaki tekniÃ„Å¸i ve pas kalitesiyle dikkat ÃƒÂ§ekti.", career:["Roda JC","Saint-Etienne","Trabzonspor"], strengths:["Teknik","Dribbling","Pas"] },
  { name:"Ernest Muci", team:"Trabzonspor", position:"Orta saha", age:25, marketValue:11.0, goals:9, assists:6, minutes:2200, bigMatch:89, form:91, story:"BeÃ…Å¸iktaÃ…Å¸'tan transfer edilen Arnavut yÃ„Â±ldÃ„Â±z, 9 gol ve 6 asistle hÃƒÂ¼cuma bÃƒÂ¼yÃƒÂ¼k zenginlik kattÃ„Â±.", career:["Legia","Besiktas","Trabzonspor"], strengths:["Uzak Ã…Âut","Dribbling","YaratÃ„Â±cÃ„Â±lÃ„Â±k"] },
  { name:"Tim Jabol-Folcarelli", team:"Trabzonspor", position:"Orta saha", age:26, marketValue:2.5, goals:1, assists:3, minutes:1600, bigMatch:77, form:79, story:"Ajaccio'dan transfer edilen FransÃ„Â±z ÃƒÂ¶n libero, fizik gÃƒÂ¼cÃƒÂ¼ ve kesiciliÃ„Å¸iyle savunma ÃƒÂ¶nÃƒÂ¼nde direnÃƒÂ§ saÃ„Å¸ladÃ„Â±.", career:["Ajaccio","Trabzonspor"], strengths:["Top Kapma","Fizik"] },
  { name:"Edin Visca", team:"Trabzonspor", position:"Kanat", age:36, marketValue:0.1, goals:3, assists:8, minutes:2100, bigMatch:82, form:83, story:"Lig tarihinin en tecrÃƒÂ¼beli yÃ„Â±ldÃ„Â±zlarÃ„Â±ndan biri. Ã„Â°lerleyen yaÃ…Å¸Ã„Â±na raÃ„Å¸men asistleri ve liderliÃ„Å¸iyle kilit isim olmaya devam etti.", career:["Zeljeznicar","Basaksehir","Trabzonspor"], strengths:["Asist","Oyun GÃƒÂ¶rÃƒÂ¼Ã…Å¸ÃƒÂ¼","TecrÃƒÂ¼be"] },
  { name:"Anthony Nwakaeme", team:"Trabzonspor", position:"Kanat", age:37, marketValue:0.5, goals:4, assists:5, minutes:1500, bigMatch:82, form:81, story:"Bordo-mavili kulÃƒÂ¼bÃƒÂ¼n efsane ismi, dar alanda ÃƒÂ§alÃ„Â±mlarÃ„Â± ve yaratÃ„Â±cÃ„Â±lÃ„Â±Ã„Å¸Ã„Â±yla hÃƒÂ¼cumda fark yaratmaya devam etti.", career:["Hapoel Beer Sheva","Al-Fayha","Trabzonspor"], strengths:["Teknik","Dribbling","Deneyim"] },
  { name:"Paul Onuachu", team:"Trabzonspor", position:"Forvet", age:32, marketValue:6.0, goals:22, assists:3, minutes:2800, bigMatch:93, form:94, story:"22 gol ile gol krallÃ„Â±Ã„Å¸Ã„Â±nÃ„Â±n ortaÃ„Å¸Ã„Â±! Hava topu hakimiyetiyle rakiplerine kabus yaÃ…Å¸attÃ„Â±.", career:["Midtjylland","Genk","Southampton","Trabzonspor"], strengths:["Hava Topu","Bitiricilik","Ceza SahasÃ„Â±"] },
  { name:"Felipe Augusto", team:"Trabzonspor", position:"Forvet", age:22, marketValue:15.0, goals:14, assists:4, minutes:2400, bigMatch:87, form:90, story:"15 milyon Euro piyasa deÃ„Å¸erine ulaÃ…Å¸an genÃƒÂ§ yetenek, 14 gol atarak ligin en deÃ„Å¸erli ÃƒÂ§Ã„Â±kÃ„Â±Ã…Å¸larÃ„Â±ndan birini yaptÃ„Â±.", career:["Corinthians","Cercle Brugge","Trabzonspor"], strengths:["Potansiyel","Bitiricilik","HÃ„Â±z"] },
  { name:"Denis Dragus", team:"Trabzonspor", position:"Forvet", age:26, marketValue:4.0, goals:6, assists:3, minutes:1900, bigMatch:79, form:80, story:"Gaziantep FK'daki ÃƒÂ§Ã„Â±kÃ„Â±Ã…Å¸Ã„Â±nÃ„Â±n ardÃ„Â±ndan gelen Rumen forvet, hÃ„Â±zÃ„Â± ve ÃƒÂ§alÃ„Â±mlarÃ„Â±yla hÃƒÂ¼cuma katkÃ„Â± saÃ„Å¸ladÃ„Â±.", career:["Standard Liege","Gaziantep FK","Trabzonspor"], strengths:["HÃ„Â±z","Dribbling"] },
  { name:"Enis Destan", team:"Trabzonspor", position:"Forvet", age:23, marketValue:3.5, goals:5, assists:2, minutes:1300, bigMatch:78, form:80, story:"GenÃƒÂ§ yerli forvet, yÃ„Â±rtÃ„Â±cÃ„Â± yapÃ„Â±sÃ„Â±, pres gÃƒÂ¼cÃƒÂ¼ ve hava toplarÃ„Â±ndaki etkisiyle hÃƒÂ¼cum rotasyonunun ÃƒÂ¶nemli bir parÃƒÂ§asÃ„Â±.", career:["AltÃ„Â±nordu","Warta Poznan","Trabzonspor"], strengths:["Hava Topu","Pres","MÃƒÂ¼cadele"] },
  { name:"Oleksandr Zubkov", team:"Trabzonspor", position:"Kanat", age:29, marketValue:4.0, goals:5, assists:6, minutes:1800, bigMatch:80, form:82, story:"Shakhtar'dan transfer edilen UkraynalÃ„Â± kanat, hÃ„Â±zÃ„Â± ve sol ayaÃ„Å¸Ã„Â±yla hÃƒÂ¼cumda ÃƒÂ¼retken oldu.", career:["Shakhtar","Ferencvaros","Trabzonspor"], strengths:["HÃ„Â±z","Teknik","Ã…Âut"] },
  { name:"Simon Banza", team:"Trabzonspor", position:"Forvet", age:29, marketValue:13.5, goals:13, assists:3, minutes:2500, bigMatch:85, form:84, story:"Braga'dan kiralanan golcÃƒÂ¼, gÃƒÂ¼ÃƒÂ§lÃƒÂ¼ fiziÃ„Å¸i ve ceza sahasÃ„Â±ndaki bitiriciliÃ„Å¸iyle Trabzonspor'un forvet hattÃ„Â±ndaki en bÃƒÂ¼yÃƒÂ¼k silahÃ„Â±ydÃ„Â±.", career:["Braga","Lens","Trabzonspor"], strengths:["Fizik","Bitiricilik"] },
  { name:"Batista Mendy", team:"Trabzonspor", position:"Orta saha", age:26, marketValue:11.0, goals:1, assists:2, minutes:2900, bigMatch:84, form:85, story:"FransÃ„Â±z defansif orta saha, yÃƒÂ¼ksek fizik gÃƒÂ¼cÃƒÂ¼, top kapma yeteneÃ„Å¸i ve stoperde de oynayabilen ÃƒÂ§ok yÃƒÂ¶nlÃƒÂ¼lÃƒÂ¼Ã„Å¸ÃƒÂ¼yle fark yarattÃ„Â±.", career:["Angers","Trabzonspor"], strengths:["Fizik","Top Kapma"] },
  { name:"John Lundstram", team:"Trabzonspor", position:"Orta saha", age:32, marketValue:3.8, goals:2, assists:2, minutes:2400, bigMatch:81, form:80, story:"Ã„Â°ngiliz orta saha, tecrÃƒÂ¼besi, mÃƒÂ¼cadeleci yapÃ„Â±sÃ„Â± ve pas kalitesiyle Trabzonspor orta sahasÃ„Â±na direnÃƒÂ§ kazandÃ„Â±rdÃ„Â±.", career:["Sheffield United","Rangers","Trabzonspor"], strengths:["MÃƒÂ¼cadele","Pas"] },
  { name:"Borna Barisic", team:"Trabzonspor", position:"Defans", age:33, marketValue:2.5, goals:0, assists:4, minutes:2300, bigMatch:82, form:81, story:"HÃ„Â±rvat sol bek, adrese teslim ortalarÃ„Â± ve duran top kalitesiyle Trabzonspor hÃƒÂ¼cumlarÃ„Â±na sol kanattan geniÃ…Å¸lik kazandÃ„Â±rdÃ„Â±.", career:["Rangers","Osijek","Trabzonspor"], strengths:["Orta","Duran Top"] },
  { name:"Eldor Shomurodov", team:"Basaksehir", position:"Forvet", age:30, marketValue:7.0, goals:22, assists:6, minutes:2550, bigMatch:87, form:88, story:"22 gol atarak Paul Onuachu ve Victor Osimhen ile gol krallÃ„Â±Ã„Å¸Ã„Â±nÃ„Â± paylaÃ…Å¸tÃ„Â±. BaÃ…Å¸akÃ…Å¸ehir tarihinin en skorer sezonlarÃ„Â±ndan birini yaÃ…Å¸attÃ„Â±.", career:["Rostov","Genoa","Roma","Basaksehir"], strengths:["Bitiricilik","HÃ„Â±z","Pozisyon Alma"] },
  { name:"Berkay Ãƒâ€“zcan", team:"Basaksehir", position:"Orta saha", age:28, marketValue:3.5, goals:5, assists:10, minutes:2600, bigMatch:83, form:85, story:"Orta sahada 10 asist yaparak takÃ„Â±mÃ„Â±nÃ„Â±n oyun kuruculuÃ„Å¸unu ÃƒÂ¼stlendi ve gol yollarÃ„Â±nÃ„Â± besledi.", career:["Stuttgart","Greuther FÃƒÂ¼rth","Basaksehir"], strengths:["Asist","Pas kalitesi","Vizyon"] },
  { name:"Muhammed Sengezer", team:"Basaksehir", position:"Kaleci", age:29, marketValue:2.0, goals:0, assists:0, minutes:2200, bigMatch:81, form:83, story:"Kalesinde gÃƒÂ¼ven veren duruÃ…Å¸u ve refleksleriyle BaÃ…Å¸akÃ…Å¸ehir savunmasÃ„Â±nÃ„Â± arkadan toparlayan isim.", career:["AnkaragÃƒÂ¼cÃƒÂ¼","Basaksehir"], strengths:["Refleks","Yan Top"] },
  { name:"Volkan Babacan", team:"Basaksehir", position:"Kaleci", age:37, marketValue:0.1, goals:0, assists:0, minutes:900, bigMatch:78, form:75, story:"TecrÃƒÂ¼beli kaleci, yedek kulÃƒÂ¼besinde liderliÃ„Å¸i ve ihtiyaÃƒÂ§ duyulduÃ„Å¸unda kaledeki sakin duruÃ…Å¸uyla destek verdi.", career:["Fenerbahce","Manisaspor","Basaksehir"], strengths:["TecrÃƒÂ¼be","Sakinlik"] },
  { name:"Leo Duarte", team:"Basaksehir", position:"Defans", age:29, marketValue:3.0, goals:1, assists:1, minutes:2800, bigMatch:82, form:84, story:"BrezilyalÃ„Â± stoper, savunmanÃ„Â±n merkezinde topu oyuna sokma kalitesi ve pozisyon bilgisiyle ÃƒÂ¶ne ÃƒÂ§Ã„Â±ktÃ„Â±.", career:["Flamengo","Milan","Basaksehir"], strengths:["Pozisyon Alma","Pas","Hava Topu"] },
  { name:"Ousseynou Ba", team:"Basaksehir", position:"Defans", age:30, marketValue:2.2, goals:1, assists:0, minutes:2500, bigMatch:80, form:81, story:"Fiziksel gÃƒÂ¼cÃƒÂ¼ ve ikili mÃƒÂ¼cadelelerdeki ÃƒÂ¼stÃƒÂ¼nlÃƒÂ¼Ã„Å¸ÃƒÂ¼yle rakip forvetleri yÃ„Â±pratan Senegalli defans oyuncusu.", career:["Olympiacos","Slovan Bratislava","Basaksehir"], strengths:["GÃƒÂ¼ÃƒÂ§","Top Kapma","Markaj"] },
  { name:"Lucas Lima", team:"Basaksehir", position:"Defans", age:34, marketValue:0.8, goals:0, assists:3, minutes:2600, bigMatch:79, form:80, story:"Sol bekte tecrÃƒÂ¼besiyle savunma hattÃ„Â±nÃ„Â± dengelerken hÃƒÂ¼cum bindirmeleriyle de 3 asist katkÃ„Â±sÃ„Â± verdi.", career:["Nantes","Al-Ahli","Basaksehir"], strengths:["Orta","TecrÃƒÂ¼be","Yer TutuÃ…Å¸"] },
  { name:"Omer Ali Sahiner", team:"Basaksehir", position:"Defans", age:34, marketValue:0.2, goals:1, assists:2, minutes:1500, bigMatch:79, form:78, story:"SaÃ„Å¸ bek ve orta sahada joker gÃƒÂ¶revi gÃƒÂ¶rerek takÃ„Â±mÃ„Â±n en ÃƒÂ§alÃ„Â±Ã…Å¸kan ve emektar isimlerinden biri oldu.", career:["Konyaspor","Basaksehir"], strengths:["Ãƒâ€¡ok YÃƒÂ¶nlÃƒÂ¼lÃƒÂ¼k","Ãƒâ€¡alÃ„Â±Ã…Å¸kanlÃ„Â±k","HÃ„Â±z"] },
  { name:"Hamza Gureler", team:"Basaksehir", position:"Defans", age:20, marketValue:1.2, goals:0, assists:1, minutes:1200, bigMatch:76, form:80, story:"AltyapÃ„Â±dan ÃƒÂ§Ã„Â±kan genÃƒÂ§ stoper, yÃƒÂ¼ksek potansiyeli ve hamle zamanlamasÃ„Â±yla gelecek vaat ediyor.", career:["Basaksehir"], strengths:["Potansiyel","Zamanlama"] },
  { name:"Onur Ergun", team:"Basaksehir", position:"Orta saha", age:33, marketValue:0.4, goals:1, assists:1, minutes:1400, bigMatch:76, form:78, story:"Defansif orta saha pozisyonunda fiziki gÃƒÂ¼cÃƒÂ¼ ve mÃƒÂ¼cadeleci yapÃ„Â±sÃ„Â±yla rotasyonun kilit isimlerindendi.", career:["Hatayspor","Ã„Â°stanbulspor","Basaksehir"], strengths:["Top Kapma","MÃƒÂ¼cadele"] },
  { name:"Danijel Aleksic", team:"Basaksehir", position:"Orta saha", age:35, marketValue:0.3, goals:3, assists:2, minutes:1100, bigMatch:78, form:76, story:"Kritik anlarda ceza sahasÃ„Â± dÃ„Â±Ã…Å¸Ã„Â±ndan attÃ„Â±Ã„Å¸Ã„Â± Ã…Å¸utlar ve duran top ustasÃ„Â± tecrÃƒÂ¼besiyle puanlar kazandÃ„Â±rdÃ„Â±.", career:["Genoa","St. Gallen","Yeni Malatyaspor","Basaksehir"], strengths:["Ã…Âut","Duran Top","TecrÃƒÂ¼be"] },
  { name:"Olivier Kemen", team:"Basaksehir", position:"Orta saha", age:29, marketValue:1.8, goals:4, assists:3, minutes:2100, bigMatch:80, form:82, story:"Kayserispor ÃƒÂ§Ã„Â±kÃ„Â±Ã…Å¸lÃ„Â± Kamerunlu, orta sahadaki dinamizmi ve ceza sahasÃ„Â± koÃ…Å¸ularÃ„Â±yla 4 gol ÃƒÂ¼retti.", career:["Newcastle","Lyon","Kayserispor","Basaksehir"], strengths:["Dinamizm","Fizik","Gol Sezgisi"] },
  { name:"Serdar Gurler", team:"Basaksehir", position:"Kanat", age:34, marketValue:0.5, goals:4, assists:5, minutes:1800, bigMatch:79, form:81, story:"Kanatlarda sÃƒÂ¼rati ve tecrÃƒÂ¼besiyle hÃƒÂ¼cumda yaratÃ„Â±cÃ„Â±lÃ„Â±k getirirken 9 skor katkÃ„Â±sÃ„Â± saÃ„Å¸ladÃ„Â±.", career:["ElazÃ„Â±Ã„Å¸spor","GenÃƒÂ§lerbirliÃ„Å¸i","OsmanlÃ„Â±spor","GÃƒÂ¶ztepe","Konyaspor","Basaksehir"], strengths:["Dribbling","Orta","TecrÃƒÂ¼be"] },
  { name:"Davidson", team:"Basaksehir", position:"Kanat", age:35, marketValue:0.6, goals:5, assists:4, minutes:1900, bigMatch:80, form:82, story:"BrezilyalÃ„Â± sol aÃƒÂ§Ã„Â±k, ÃƒÂ§alÃ„Â±mlarÃ„Â± ve bitiriciliÃ„Å¸iyle BaÃ…Å¸akÃ…Å¸ehir hÃƒÂ¼cumunda ÃƒÂ¼retkenliÃ„Å¸i artÃ„Â±ran kritik isim.", career:["Alanyaspor","Wuhan Three Towns","Eupen","Basaksehir"], strengths:["Teknik","Dribbling","Bitiricilik"] },
  { name:"Joao Figueiredo", team:"Basaksehir", position:"Forvet", age:30, marketValue:1.5, goals:8, assists:3, minutes:2000, bigMatch:79, form:80, story:"Gaziantep sonrasÃ„Â± BaÃ…Å¸akÃ…Å¸ehir'de gol yollarÃ„Â±nda ÃƒÂ§alÃ„Â±Ã…Å¸kanlÃ„Â±Ã„Å¸Ã„Â± ve 8 golÃƒÂ¼yle forvete derinlik kazandÃ„Â±rdÃ„Â±.", career:["Gaziantep FK","Al-Wasl","Basaksehir"], strengths:["Pres","Ãƒâ€¡alÃ„Â±Ã…Å¸kanlÃ„Â±k","Bitiricilik"] },
  { name:"Krzysztof Piatek", team:"Basaksehir", position:"Defans", age:33, marketValue:5.0, goals:0, assists:0, minutes:1995, bigMatch:75, form:87, story:"2025-26 sezonunda takÃ„Â±mÃ„Â±nÃ„Â±n Defans bÃƒÂ¶lgesinde istikrarlÃ„Â± performansÃ„Â± ve kalitesiyle kadro derinliÃ„Å¸ine ÃƒÂ¶nemli katkÃ„Â± saÃ„Å¸ladÃ„Â±.", career:["Basaksehir"], strengths:["Markaj","Hava Topu"] },
  { name:"Dimitris Pelkas", team:"Basaksehir", position:"Kanat", age:25, marketValue:2.5, goals:5, assists:7, minutes:1362, bigMatch:78, form:78, story:"2025-26 sezonunda takÃ„Â±mÃ„Â±nÃ„Â±n Kanat bÃƒÂ¶lgesinde istikrarlÃ„Â± performansÃ„Â± ve kalitesiyle kadro derinliÃ„Å¸ine ÃƒÂ¶nemli katkÃ„Â± saÃ„Å¸ladÃ„Â±.", career:["Basaksehir"], strengths:["Pas","Teknik"] },
  { name:"Jerome Opoku", team:"Basaksehir", position:"Kanat", age:27, marketValue:3.2, goals:7, assists:6, minutes:1061, bigMatch:79, form:73, story:"2025-26 sezonunda takÃ„Â±mÃ„Â±nÃ„Â±n Kanat bÃƒÂ¶lgesinde istikrarlÃ„Â± performansÃ„Â± ve kalitesiyle kadro derinliÃ„Å¸ine ÃƒÂ¶nemli katkÃ„Â± saÃ„Å¸ladÃ„Â±.", career:["Basaksehir"], strengths:["Pas","Teknik"] },
  { name:"Berat Ozdemir", team:"Basaksehir", position:"Orta saha", age:23, marketValue:4.3, goals:0, assists:9, minutes:2185, bigMatch:71, form:74, story:"2025-26 sezonunda takÃ„Â±mÃ„Â±nÃ„Â±n Orta saha bÃƒÂ¶lgesinde istikrarlÃ„Â± performansÃ„Â± ve kalitesiyle kadro derinliÃ„Å¸ine ÃƒÂ¶nemli katkÃ„Â± saÃ„Å¸ladÃ„Â±.", career:["Basaksehir"], strengths:["Pas","Teknik"] },
  { name:"Miguel Crespo", team:"Basaksehir", position:"Kanat", age:26, marketValue:2.5, goals:8, assists:5, minutes:1553, bigMatch:79, form:84, story:"2025-26 sezonunda takÃ„Â±mÃ„Â±nÃ„Â±n Kanat bÃƒÂ¶lgesinde istikrarlÃ„Â± performansÃ„Â± ve kalitesiyle kadro derinliÃ„Å¸ine ÃƒÂ¶nemli katkÃ„Â± saÃ„Å¸ladÃ„Â±.", career:["Basaksehir"], strengths:["Pas","Teknik"] },
  { name:"Philippe Keny", team:"Basaksehir", position:"Defans", age:20, marketValue:1.9, goals:0, assists:0, minutes:1819, bigMatch:78, form:72, story:"2025-26 sezonunda takÃ„Â±mÃ„Â±nÃ„Â±n Defans bÃƒÂ¶lgesinde istikrarlÃ„Â± performansÃ„Â± ve kalitesiyle kadro derinliÃ„Å¸ine ÃƒÂ¶nemli katkÃ„Â± saÃ„Å¸ladÃ„Â±.", career:["Basaksehir"], strengths:["Markaj","Hava Topu"] },
  { name:"Omer Beyaz", team:"Basaksehir", position:"Kaleci", age:29, marketValue:3.7, goals:0, assists:2, minutes:2157, bigMatch:84, form:74, story:"2025-26 sezonunda takÃ„Â±mÃ„Â±nÃ„Â±n Kaleci bÃƒÂ¶lgesinde istikrarlÃ„Â± performansÃ„Â± ve kalitesiyle kadro derinliÃ„Å¸ine ÃƒÂ¶nemli katkÃ„Â± saÃ„Å¸ladÃ„Â±.", career:["Basaksehir"], strengths:["Refleks","KurtarÃ„Â±Ã…Å¸"] },
  { name:"Edgar Ie", team:"Basaksehir", position:"Defans", age:28, marketValue:3.9, goals:2, assists:0, minutes:1535, bigMatch:84, form:84, story:"2025-26 sezonunda takÃ„Â±mÃ„Â±nÃ„Â±n Defans bÃƒÂ¶lgesinde istikrarlÃ„Â± performansÃ„Â± ve kalitesiyle kadro derinliÃ„Å¸ine ÃƒÂ¶nemli katkÃ„Â± saÃ„Å¸ladÃ„Â±.", career:["Basaksehir"], strengths:["Markaj","Hava Topu"] },
  { name:"Deniz Dilmen", team:"Basaksehir", position:"Defans", age:20, marketValue:4.2, goals:0, assists:2, minutes:2333, bigMatch:70, form:77, story:"2025-26 sezonunda takÃ„Â±mÃ„Â±nÃ„Â±n Defans bÃƒÂ¶lgesinde istikrarlÃ„Â± performansÃ„Â± ve kalitesiyle kadro derinliÃ„Å¸ine ÃƒÂ¶nemli katkÃ„Â± saÃ„Å¸ladÃ„Â±.", career:["Basaksehir"], strengths:["Markaj","Hava Topu"] },
  { name:"Filip Rodriguez", team:"Basaksehir", position:"Orta saha", age:31, marketValue:3.0, goals:0, assists:6, minutes:1595, bigMatch:73, form:84, story:"Kadro derinliÃ„Å¸i ve rotasyonda teknik direktÃƒÂ¶rÃƒÂ¼n elini gÃƒÂ¼ÃƒÂ§lendiren, 2025-26 sezonu kadro oyuncusu.", career:["Basaksehir"], strengths:["Pas","MÃƒÂ¼cadele"] },
  { name:"Mateusz Lis", team:"Goztepe", position:"Kaleci", age:29, marketValue:2.5, goals:0, assists:0, minutes:3200, bigMatch:87, form:90, story:"GÃƒÂ¶ztepe'nin kalesinde harikalar yaratarak ligin en yÃƒÂ¼ksek kurtarÃ„Â±Ã…Å¸ oranÃ„Â±na sahip kalecilerinden biri oldu.", career:["Lech Poznan","Southampton","Troyes","Goztepe"], strengths:["Refleks","Bire Bir","Ã„Â°stikrar"] },
  { name:"Juan Santos", team:"Goztepe", position:"Forvet", age:24, marketValue:12.0, goals:12, assists:4, minutes:2200, bigMatch:82, form:86, story:"DeÃ„Å¸erini 12 milyon Euro'ya fÃ„Â±rlatan genÃƒÂ§ yÃ„Â±ldÃ„Â±z, 12 gol atarak sezonun en sansasyonel kanat performansÃ„Â±na imza attÃ„Â±.", career:["Santos","Goztepe"], strengths:["HÃ„Â±z","Bitiricilik","Potansiyel"] },
  { name:"Arda Ozcimen", team:"Goztepe", position:"Kaleci", age:24, marketValue:0.4, goals:0, assists:0, minutes:180, bigMatch:72, form:75, story:"AltyapÃ„Â±dan yetiÃ…Å¸en genÃƒÂ§ kaleci, Mateusz Lis'in yokluÃ„Å¸unda elinden gelenin en iyisini yaptÃ„Â±.", career:["GÃƒÂ¶ztepe"], strengths:["Refleks","Potansiyel"] },
  { name:"Taha Altikardes", team:"Goztepe", position:"Defans", age:22, marketValue:4.0, goals:2, assists:1, minutes:2900, bigMatch:83, form:86, story:"GÃƒÂ¶ztepe'nin en deÃ„Å¸erli TÃƒÂ¼rk stoperi. YÃƒÂ¼ksek potansiyeli ve hÃ„Â±rsÃ„Â±yla devlerin radarÃ„Â±nda.", career:["Bursaspor","Trabzonspor","GÃƒÂ¶ztepe"], strengths:["Potansiyel","GÃƒÂ¼ÃƒÂ§","Hava Topu"] },
  { name:"Heliton", team:"Goztepe", position:"Defans", age:30, marketValue:1.8, goals:3, assists:0, minutes:2800, bigMatch:82, form:84, story:"Savunma hattÃ„Â±ndaki sertliÃ„Å¸i, markaj becerisi ve hÃƒÂ¼cum duran toplarÃ„Â±nda attÃ„Â±Ã„Å¸Ã„Â± 3 kafa golÃƒÂ¼yle parladÃ„Â±.", career:["Gil Vicente","GÃƒÂ¶ztepe"], strengths:["Kafa Ã…Âutu","Markaj","Fizik"] },
  { name:"Malcom Bokele", team:"Goztepe", position:"Defans", age:26, marketValue:1.5, goals:1, assists:1, minutes:2400, bigMatch:80, form:82, story:"Kamerunlu stoper/saÃ„Å¸ bek, dinamizmi ve atletizmiyle GÃƒÂ¶ztepe savunmasÃ„Â±nÃ„Â±n saÃ„Å¸ tarafÃ„Â±nÃ„Â± kapattÃ„Â±.", career:["Bordeaux","GÃƒÂ¶ztepe"], strengths:["Atletizm","HÃ„Â±z","MÃƒÂ¼cadele"] },
  { name:"Djalma Silva", team:"Goztepe", position:"Defans", age:31, marketValue:0.8, goals:1, assists:4, minutes:2500, bigMatch:79, form:82, story:"Sol bekten yaptÃ„Â±Ã„Å¸Ã„Â± muz ortalarla hÃƒÂ¼cumu beslerken ligde 4 asist ÃƒÂ¼reterek kalitesini gÃƒÂ¶sterdi.", career:["AEL Limassol","GÃƒÂ¶ztepe"], strengths:["Orta","HÃ„Â±z","Duran Top"] },
  { name:"Ogun Bayrak", team:"Goztepe", position:"Defans", age:27, marketValue:0.7, goals:0, assists:3, minutes:2100, bigMatch:78, form:80, story:"SaÃ„Å¸ bek pozisyonunda ÃƒÂ§alÃ„Â±Ã…Å¸kanlÃ„Â±Ã„Å¸Ã„Â± ve bitmek bilmeyen enerjisiyle takÃ„Â±mÃ„Â±n ÃƒÂ¶nemli parÃƒÂ§alarÃ„Â±ndan biri oldu.", career:["KeÃƒÂ§iÃƒÂ¶rengÃƒÂ¼cÃƒÂ¼","Tuzlaspor","GÃƒÂ¶ztepe"], strengths:["DayanÃ„Â±klÃ„Â±lÃ„Â±k","Pres","Orta"] },
  { name:"Isaac Solet", team:"Goztepe", position:"Orta saha", age:25, marketValue:2.5, goals:3, assists:4, minutes:2600, bigMatch:81, form:83, story:"Orta sahada fiziksel mÃƒÂ¼cadelesi ve oyunun iki yÃƒÂ¶nÃƒÂ¼ndeki temposuyla Goztepe'nin dinamosu.", career:["Slavia Sofia","GÃƒÂ¶ztepe"], strengths:["Fizik","Top Kapma","Dinamizm"] },
  { name:"Anthony Dennis", team:"Goztepe", position:"Orta saha", age:21, marketValue:2.0, goals:1, assists:2, minutes:2300, bigMatch:80, form:81, story:"GÃƒÂ¶ztepe'nin genÃƒÂ§ NijeryalÃ„Â±sÃ„Â±, top kapmadaki becerisiyle scoutlarÃ„Â±n dikkatini ÃƒÂ§ekti.", career:["GÃƒÂ¶ztepe"], strengths:["Potansiyel","Top Kapma","GÃƒÂ¼ÃƒÂ§"] },
  { name:"Dogan Erdogan", team:"Goztepe", position:"Orta saha", age:29, marketValue:0.5, goals:0, assists:1, minutes:1200, bigMatch:75, form:78, story:"Merkez orta saha rotasyonunda mÃƒÂ¼cadele gÃƒÂ¼cÃƒÂ¼ ve tecrÃƒÂ¼besiyle sÃƒÂ¼re aldÃ„Â±Ã„Å¸Ã„Â± maÃƒÂ§larda katkÃ„Â± verdi.", career:["LASK Linz","Trabzonspor","Fortuna Sittard","GÃƒÂ¶ztepe"], strengths:["MÃƒÂ¼cadele","TecrÃƒÂ¼be"] },
  { name:"David Tijanic", team:"Goztepe", position:"Orta saha", age:28, marketValue:1.2, goals:4, assists:5, minutes:1900, bigMatch:78, form:80, story:"Sloven oyun kurucu, teknik kalitesi, kilit paslarÃ„Â± ve 9 skor katkÃ„Â±sÃ„Â±yla takÃ„Â±mÃ„Â±nÃ„Â± yÃƒÂ¶nlendirdi.", career:["Olimpija Ljubljana","Al-Adalah","GÃƒÂ¶ztepe"], strengths:["Pas","Vizyon","Teknik"] },
  { name:"Kuryu Matsuki", team:"Goztepe", position:"Orta saha", age:23, marketValue:3.0, goals:3, assists:3, minutes:1800, bigMatch:80, form:82, story:"Southampton'dan kiralanan Japon genÃƒÂ§ yetenek, yÃƒÂ¼ksek oyun zekasÃ„Â±yla orta sahayÃ„Â± zenginleÃ…Å¸tirdi.", career:["FC Tokyo","Southampton","GÃƒÂ¶ztepe"], strengths:["Oyun ZekasÃ„Â±","Potansiyel","Pas"] },
  { name:"Romulo Cardoso", team:"Goztepe", position:"Forvet", age:24, marketValue:3.5, goals:9, assists:4, minutes:2400, bigMatch:81, form:83, story:"BrezilyalÃ„Â± santrfor, 9 golle GÃƒÂ¶ztepe'nin en skorer yerli/yabancÃ„Â± hÃƒÂ¼cumcularÃ„Â±ndan biri oldu.", career:["Athletico Paranaense","GÃƒÂ¶ztepe"], strengths:["HÃ„Â±z","Bitiricilik","Hareketlilik"] },
  { name:"Kubilay Kanatsizkus", team:"Goztepe", position:"Forvet", age:29, marketValue:0.4, goals:2, assists:1, minutes:800, bigMatch:73, form:76, story:"Rotasyonda yedek santrfor olarak oyuna sonradan girip fizik avantajÃ„Â±yla yÃ„Â±pratÃ„Â±cÃ„Â± rol ÃƒÂ¼stlendi.", career:["Bursaspor","Kocaelispor","Rizespor","GÃƒÂ¶ztepe"], strengths:["Fizik","Hava Topu"] },
  { name:"Koray Gunter", team:"Goztepe", position:"Defans", age:23, marketValue:3.0, goals:1, assists:2, minutes:1751, bigMatch:71, form:75, story:"2025-26 sezonunda takÃ„Â±mÃ„Â±nÃ„Â±n Defans bÃƒÂ¶lgesinde istikrarlÃ„Â± performansÃ„Â± ve kalitesiyle kadro derinliÃ„Å¸ine ÃƒÂ¶nemli katkÃ„Â± saÃ„Å¸ladÃ„Â±.", career:["Goztepe"], strengths:["Markaj","Hava Topu"] },
  { name:"Ismail Koybasi", team:"Goztepe", position:"Forvet", age:30, marketValue:2.5, goals:9, assists:2, minutes:1081, bigMatch:75, form:86, story:"2025-26 sezonunda takÃ„Â±mÃ„Â±nÃ„Â±n Forvet bÃƒÂ¶lgesinde istikrarlÃ„Â± performansÃ„Â± ve kalitesiyle kadro derinliÃ„Å¸ine ÃƒÂ¶nemli katkÃ„Â± saÃ„Å¸ladÃ„Â±.", career:["Goztepe"], strengths:["Pas","Teknik"] },
  { name:"Victor Hugo", team:"Goztepe", position:"Kaleci", age:32, marketValue:1.6, goals:0, assists:0, minutes:1948, bigMatch:72, form:76, story:"2025-26 sezonunda takÃ„Â±mÃ„Â±nÃ„Â±n Kaleci bÃƒÂ¶lgesinde istikrarlÃ„Â± performansÃ„Â± ve kalitesiyle kadro derinliÃ„Å¸ine ÃƒÂ¶nemli katkÃ„Â± saÃ„Å¸ladÃ„Â±.", career:["Goztepe"], strengths:["Refleks","KurtarÃ„Â±Ã…Å¸"] },
  { name:"Ahmed Ildiz", team:"Goztepe", position:"Forvet", age:27, marketValue:2.1, goals:5, assists:2, minutes:1669, bigMatch:80, form:75, story:"2025-26 sezonunda takÃ„Â±mÃ„Â±nÃ„Â±n Forvet bÃƒÂ¶lgesinde istikrarlÃ„Â± performansÃ„Â± ve kalitesiyle kadro derinliÃ„Å¸ine ÃƒÂ¶nemli katkÃ„Â± saÃ„Å¸ladÃ„Â±.", career:["Goztepe"], strengths:["Pas","Teknik"] },
  { name:"Lasse Nielsen", team:"Goztepe", position:"Orta saha", age:25, marketValue:2.7, goals:1, assists:6, minutes:1720, bigMatch:80, form:83, story:"2025-26 sezonunda takÃ„Â±mÃ„Â±nÃ„Â±n Orta saha bÃƒÂ¶lgesinde istikrarlÃ„Â± performansÃ„Â± ve kalitesiyle kadro derinliÃ„Å¸ine ÃƒÂ¶nemli katkÃ„Â± saÃ„Å¸ladÃ„Â±.", career:["Goztepe"], strengths:["Pas","Teknik"] },
  { name:"Billel Messaoudi", team:"Goztepe", position:"Forvet", age:28, marketValue:1.4, goals:8, assists:0, minutes:2345, bigMatch:73, form:77, story:"2025-26 sezonunda takÃ„Â±mÃ„Â±nÃ„Â±n Forvet bÃƒÂ¶lgesinde istikrarlÃ„Â± performansÃ„Â± ve kalitesiyle kadro derinliÃ„Å¸ine ÃƒÂ¶nemli katkÃ„Â± saÃ„Å¸ladÃ„Â±.", career:["Goztepe"], strengths:["Pas","Teknik"] },
  { name:"Novatus Miroshi", team:"Goztepe", position:"Orta saha", age:27, marketValue:1.1, goals:0, assists:4, minutes:1554, bigMatch:82, form:82, story:"2025-26 sezonunda takÃ„Â±mÃ„Â±nÃ„Â±n Orta saha bÃƒÂ¶lgesinde istikrarlÃ„Â± performansÃ„Â± ve kalitesiyle kadro derinliÃ„Å¸ine ÃƒÂ¶nemli katkÃ„Â± saÃ„Å¸ladÃ„Â±.", career:["Goztepe"], strengths:["Pas","Teknik"] },
  { name:"Kenneth Obinna", team:"Goztepe", position:"Kaleci", age:26, marketValue:2.4, goals:1, assists:0, minutes:2078, bigMatch:75, form:77, story:"2025-26 sezonunda takÃ„Â±mÃ„Â±nÃ„Â±n Kaleci bÃƒÂ¶lgesinde istikrarlÃ„Â± performansÃ„Â± ve kalitesiyle kadro derinliÃ„Å¸ine ÃƒÂ¶nemli katkÃ„Â± saÃ„Å¸ladÃ„Â±.", career:["Goztepe"], strengths:["Refleks","KurtarÃ„Â±Ã…Å¸"] },
  { name:"Ali Dere", team:"Goztepe", position:"Kaleci", age:24, marketValue:1.6, goals:1, assists:1, minutes:2146, bigMatch:75, form:79, story:"2025-26 sezonunda takÃ„Â±mÃ„Â±nÃ„Â±n Kaleci bÃƒÂ¶lgesinde istikrarlÃ„Â± performansÃ„Â± ve kalitesiyle kadro derinliÃ„Å¸ine ÃƒÂ¶nemli katkÃ„Â± saÃ„Å¸ladÃ„Â±.", career:["Goztepe"], strengths:["Refleks","KurtarÃ„Â±Ã…Å¸"] },
  { name:"Kenan Piric", team:"Goztepe", position:"Defans", age:27, marketValue:1.7, goals:1, assists:1, minutes:1817, bigMatch:71, form:71, story:"2025-26 sezonunda takÃ„Â±mÃ„Â±nÃ„Â±n Defans bÃƒÂ¶lgesinde istikrarlÃ„Â± performansÃ„Â± ve kalitesiyle kadro derinliÃ„Å¸ine ÃƒÂ¶nemli katkÃ„Â± saÃ„Å¸ladÃ„Â±.", career:["Goztepe"], strengths:["Markaj","Hava Topu"] },
  { name:"Emre Akbaba", team:"Eyupspor", position:"Orta saha", age:33, marketValue:1.0, goals:5, assists:8, minutes:2200, bigMatch:79, form:80, story:"Milli orta saha oyuncusu tecrÃƒÂ¼besi ve 8 asistlik katkÃ„Â±sÃ„Â±yla EyÃƒÂ¼pspor'a bÃƒÂ¼yÃƒÂ¼k liderlik yaptÃ„Â±.", career:["Alanyaspor","Galatasaray","Adana Demirspor","Eyupspor"], strengths:["TecrÃƒÂ¼be","Asist","Liderlik"] },
  { name:"Umut Bozok", team:"Eyupspor", position:"Forvet", age:29, marketValue:1.5, goals:9, assists:4, minutes:2100, bigMatch:81, form:83, story:"Trabzonspor'dan transfer edilen golcÃƒÂ¼ oyuncu, 9 golle takÃ„Â±mÃ„Â±nÃ„Â±n hÃƒÂ¼cum hattÃ„Â±ndaki en verimli ismiydi.", career:["Nimes","Lorient","Kasimpasa","Trabzonspor","Eyupspor"], strengths:["Bitiricilik","Pozisyon Alma"] },
  { name:"Berke Ozer", team:"Eyupspor", position:"Kaleci", age:26, marketValue:1.8, goals:0, assists:0, minutes:3000, bigMatch:78, form:80, story:"EyÃƒÂ¼pspor kalesinde gÃƒÂ¶sterdiÃ„Å¸i istikrarlÃ„Â± performans ve kritik kurtarÃ„Â±Ã…Å¸larla savunmaya bÃƒÂ¼yÃƒÂ¼k gÃƒÂ¼ven verdi.", career:["Fenerbahce","Westerlo","Eyupspor"], strengths:["Refleks","Bire Bir","Yan Top"] },
  { name:"Robin Yalcin", team:"Eyupspor", position:"Defans", age:32, marketValue:0.6, goals:1, assists:1, minutes:2200, bigMatch:77, form:78, story:"Savunmada stoper ve saÃ„Å¸ bek pozisyonlarÃ„Â±nda ÃƒÂ§ok yÃƒÂ¶nlÃƒÂ¼lÃƒÂ¼Ã„Å¸ÃƒÂ¼ ve tecrÃƒÂ¼besiyle rotasyonu gÃƒÂ¼ÃƒÂ§lendirdi.", career:["Stuttgart","Rizespor","Sivasspor","Paderborn","Eyupspor"], strengths:["Ãƒâ€¡ok YÃƒÂ¶nlÃƒÂ¼lÃƒÂ¼k","MÃƒÂ¼cadele","Pozisyon Alma"] },
  { name:"Leo Dubois", team:"Eyupspor", position:"Defans", age:31, marketValue:3.5, goals:1, assists:4, minutes:2700, bigMatch:82, form:83, story:"Galatasaray ve BaÃ…Å¸akÃ…Å¸ehir sonrasÃ„Â± EyÃƒÂ¼pspor'a gelen FransÃ„Â±z saÃ„Å¸ bek, 4 asist ve oyun zekasÃ„Â±yla katkÃ„Â± saÃ„Å¸ladÃ„Â±.", career:["Nantes", "Lyon", "Galatasaray", "Basaksehir", "Eyupspor"], strengths:["Orta", "Pozisyon Alma", "TecrÃƒÂ¼be"] },
  { name:"Veysel Sari", team:"Eyupspor", position:"Defans", age:37, marketValue:0.1, goals:1, assists:0, minutes:1800, bigMatch:76, form:77, story:"SÃƒÂ¼per Lig'in en tecrÃƒÂ¼beli stoperlerinden biri. GÃƒÂ¼ÃƒÂ§lÃƒÂ¼ fiziÃ„Å¸i ve hava toplarÃ„Â±ndaki etkisiyle katkÃ„Â± sundu.", career:["Eskisehirspor","Galatasaray","Kasimpasa","Antalyaspor","Eyupspor"], strengths:["Hava Topu","Markaj","Liderlik"] },
  { name:"Luccas Claro", team:"Eyupspor", position:"Defans", age:34, marketValue:0.4, goals:1, assists:0, minutes:2100, bigMatch:78, form:79, story:"BrezilyalÃ„Â± stoper, savunmanÃ„Â±n merkezinde fiziksel gÃƒÂ¼cÃƒÂ¼ ve kritik mÃƒÂ¼dahaleleriyle rotasyonun kilit parÃƒÂ§asÃ„Â±ydÃ„Â±.", career:["Coritiba", "Genclerbirligi", "Fluminense", "Eyupspor"], strengths:["Fizik","Top Kapma"] },
  { name:"Melih Kabasakal", team:"Eyupspor", position:"Orta saha", age:30, marketValue:0.5, goals:1, assists:2, minutes:1900, bigMatch:75, form:78, story:"Merkez orta sahada ÃƒÂ§alÃ„Â±Ã…Å¸kanlÃ„Â±Ã„Å¸Ã„Â±, pres gÃƒÂ¼cÃƒÂ¼ ve basit ama etkili pas daÃ„Å¸Ã„Â±tÃ„Â±mÃ„Â±yla rotasyona derinlik kattÃ„Â±.", career:["Samsunspor", "Istanbulspor", "Eyupspor"], strengths:["Pres","MÃƒÂ¼cadele"] },
  { name:"Fredrik Midtsjo", team:"Eyupspor", position:"Orta saha", age:32, marketValue:1.2, goals:2, assists:3, minutes:2300, bigMatch:80, form:81, story:"Galatasaray ve Pendikspor geÃƒÂ§miÃ…Å¸li NorveÃƒÂ§li dinamo, orta sahadaki temposu ve iki yÃƒÂ¶nlÃƒÂ¼ katkÃ„Â±sÃ„Â±yla kilit rol oynadÃ„Â±.", career:["Rosenborg", "AZ Alkmaar", "Galatasaray", "Pendikspor", "Eyupspor"], strengths:["Dinamizm","Top Kapma","DayanÃ„Â±klÃ„Â±lÃ„Â±k"] },
  { name:"Taskin Ilter", team:"Eyupspor", position:"Orta saha", age:31, marketValue:0.4, goals:0, assists:1, minutes:1300, bigMatch:75, form:76, story:"Orta sahanÃ„Â±n savunma yÃƒÂ¶nÃƒÂ¼nde sertliÃ„Å¸i ve kesiciliÃ„Å¸iyle yedek kulÃƒÂ¼besinin ÃƒÂ¶nemli bir gÃƒÂ¼cÃƒÂ¼ oldu.", career:["Kardemir Karabukspor","Denizlispor","Eyupspor"], strengths:["Top Kapma","MÃƒÂ¼cadele"] },
  { name:"Samu Saiz", team:"Eyupspor", position:"Orta saha", age:35, marketValue:0.8, goals:4, assists:5, minutes:2000, bigMatch:79, form:81, story:"Ã„Â°spanyol oyun kurucu, dar alandaki yÃƒÂ¼ksek teknik becerisi ve 9 gol katkÃ„Â±sÃ„Â±yla hÃƒÂ¼cumun beyniydi.", career:["Leeds United", "Girona", "Sivasspor", "Eyupspor"], strengths:["Teknik","Dribbling","Pas"] },
  { name:"Ahmed Kutucu", team:"Eyupspor", position:"Kanat", age:26, marketValue:2.2, goals:6, assists:6, minutes:2400, bigMatch:81, form:83, story:"Milli kanat oyuncusu, hÃ„Â±zÃ„Â± ve bitiriciliÃ„Å¸iyle kanatlardan 12 gollÃƒÂ¼k direkt katkÃ„Â± vererek parladÃ„Â±.", career:["Schalke 04", "Istanbul Basaksehir", "Sandhausen", "Eyupspor"], strengths:["HÃ„Â±z","Dribbling","Bitiricilik"] },
  { name:"Mame Thiam", team:"Eyupspor", position:"Forvet", age:33, marketValue:1.5, goals:8, assists:4, minutes:2200, bigMatch:80, form:82, story:"Kayserispor ve Pendikspor sonrasÃ„Â± EyÃƒÂ¼pspor'da forvette ÃƒÂ§alÃ„Â±Ã…Å¸kanlÃ„Â±Ã„Å¸Ã„Â± ve 8 golÃƒÂ¼yle kalitesini kanÃ„Â±tladÃ„Â±.", career:["KasÃ„Â±mpaÃ…Å¸a","Fenerbahce", "Kayserispor", "Pendikspor", "Eyupspor"], strengths:["Pres", "Bitiricilik", "Ãƒâ€¡alÃ„Â±Ã…Å¸kanlÃ„Â±k"] },
  { name:"Jonjo Shelvey", team:"Eyupspor", position:"Orta saha", age:34, marketValue:1.0, goals:3, assists:4, minutes:1700, bigMatch:80, form:79, story:"Ã„Â°ngiliz oyun kurucu, oyun yÃƒÂ¶nlendirme kalitesi, milimetrik uzun paslarÃ„Â± ve duran top becerisiyle lige damga vurdu.", career:["Liverpool", "Newcastle", "Nottingham Forest", "Rizespor", "Eyupspor"], strengths:["Uzun Pas","Duran Top","TecrÃƒÂ¼be"] },
  { name:"Gianni Bruno", team:"Eyupspor", position:"Defans", age:21, marketValue:2.6, goals:1, assists:0, minutes:1979, bigMatch:84, form:71, story:"2025-26 sezonunda takÃ„Â±mÃ„Â±nÃ„Â±n Defans bÃƒÂ¶lgesinde istikrarlÃ„Â± performansÃ„Â± ve kalitesiyle kadro derinliÃ„Å¸ine ÃƒÂ¶nemli katkÃ„Â± saÃ„Å¸ladÃ„Â±.", career:["Eyupspor"], strengths:["Markaj","Hava Topu"] },
  { name:"Emre Mor", team:"Eyupspor", position:"Orta saha", age:20, marketValue:1.7, goals:0, assists:9, minutes:1454, bigMatch:81, form:72, story:"2025-26 sezonunda takÃ„Â±mÃ„Â±nÃ„Â±n Orta saha bÃƒÂ¶lgesinde istikrarlÃ„Â± performansÃ„Â± ve kalitesiyle kadro derinliÃ„Å¸ine ÃƒÂ¶nemli katkÃ„Â± saÃ„Å¸ladÃ„Â±.", career:["Eyupspor"], strengths:["Pas","Teknik"] },
  { name:"Tayfur Bingol", team:"Eyupspor", position:"Defans", age:31, marketValue:1.8, goals:2, assists:1, minutes:1965, bigMatch:70, form:83, story:"2025-26 sezonunda takÃ„Â±mÃ„Â±nÃ„Â±n Defans bÃƒÂ¶lgesinde istikrarlÃ„Â± performansÃ„Â± ve kalitesiyle kadro derinliÃ„Å¸ine ÃƒÂ¶nemli katkÃ„Â± saÃ„Å¸ladÃ„Â±.", career:["Eyupspor"], strengths:["Markaj","Hava Topu"] },
  { name:"Anastasios Chatzigiovanis", team:"Eyupspor", position:"Kaleci", age:28, marketValue:2.5, goals:2, assists:0, minutes:1358, bigMatch:73, form:79, story:"2025-26 sezonunda takÃ„Â±mÃ„Â±nÃ„Â±n Kaleci bÃƒÂ¶lgesinde istikrarlÃ„Â± performansÃ„Â± ve kalitesiyle kadro derinliÃ„Å¸ine ÃƒÂ¶nemli katkÃ„Â± saÃ„Å¸ladÃ„Â±.", career:["Eyupspor"], strengths:["Refleks","KurtarÃ„Â±Ã…Å¸"] },
  { name:"Svit Seclar", team:"Eyupspor", position:"Defans", age:26, marketValue:0.7, goals:2, assists:2, minutes:2312, bigMatch:71, form:78, story:"2025-26 sezonunda takÃ„Â±mÃ„Â±nÃ„Â±n Defans bÃƒÂ¶lgesinde istikrarlÃ„Â± performansÃ„Â± ve kalitesiyle kadro derinliÃ„Å¸ine ÃƒÂ¶nemli katkÃ„Â± saÃ„Å¸ladÃ„Â±.", career:["Eyupspor"], strengths:["Markaj","Hava Topu"] },
  { name:"Sinan Bolat", team:"Eyupspor", position:"Defans", age:23, marketValue:0.7, goals:1, assists:0, minutes:1473, bigMatch:79, form:86, story:"2025-26 sezonunda takÃ„Â±mÃ„Â±nÃ„Â±n Defans bÃƒÂ¶lgesinde istikrarlÃ„Â± performansÃ„Â± ve kalitesiyle kadro derinliÃ„Å¸ine ÃƒÂ¶nemli katkÃ„Â± saÃ„Å¸ladÃ„Â±.", career:["Eyupspor"], strengths:["Markaj","Hava Topu"] },
  { name:"Umut Nayir", team:"Eyupspor", position:"Kanat", age:22, marketValue:1.4, goals:8, assists:2, minutes:1260, bigMatch:77, form:82, story:"2025-26 sezonunda takÃ„Â±mÃ„Â±nÃ„Â±n Kanat bÃƒÂ¶lgesinde istikrarlÃ„Â± performansÃ„Â± ve kalitesiyle kadro derinliÃ„Å¸ine ÃƒÂ¶nemli katkÃ„Â± saÃ„Å¸ladÃ„Â±.", career:["Eyupspor"], strengths:["Pas","Teknik"] },
  { name:"Ruben Vezo", team:"Eyupspor", position:"Kaleci", age:21, marketValue:1.4, goals:2, assists:2, minutes:1207, bigMatch:70, form:75, story:"2025-26 sezonunda takÃ„Â±mÃ„Â±nÃ„Â±n Kaleci bÃƒÂ¶lgesinde istikrarlÃ„Â± performansÃ„Â± ve kalitesiyle kadro derinliÃ„Å¸ine ÃƒÂ¶nemli katkÃ„Â± saÃ„Å¸ladÃ„Â±.", career:["Eyupspor"], strengths:["Refleks","KurtarÃ„Â±Ã…Å¸"] },
  { name:"Prince Ampem", team:"Eyupspor", position:"Kanat", age:33, marketValue:2.3, goals:6, assists:3, minutes:2222, bigMatch:73, form:76, story:"2025-26 sezonunda takÃ„Â±mÃ„Â±nÃ„Â±n Kanat bÃƒÂ¶lgesinde istikrarlÃ„Â± performansÃ„Â± ve kalitesiyle kadro derinliÃ„Å¸ine ÃƒÂ¶nemli katkÃ„Â± saÃ„Å¸ladÃ„Â±.", career:["Eyupspor"], strengths:["Pas","Teknik"] },
  { name:"Tugay Kacar", team:"Eyupspor", position:"Kanat", age:20, marketValue:1.8, goals:5, assists:6, minutes:2041, bigMatch:77, form:84, story:"2025-26 sezonunda takÃ„Â±mÃ„Â±nÃ„Â±n Kanat bÃƒÂ¶lgesinde istikrarlÃ„Â± performansÃ„Â± ve kalitesiyle kadro derinliÃ„Å¸ine ÃƒÂ¶nemli katkÃ„Â± saÃ„Å¸ladÃ„Â±.", career:["Eyupspor"], strengths:["Pas","Teknik"] },
  { name:"Caner Cavlan", team:"Eyupspor", position:"Forvet", age:32, marketValue:0.5, goals:10, assists:2, minutes:1950, bigMatch:77, form:73, story:"2025-26 sezonunda takÃ„Â±mÃ„Â±nÃ„Â±n Forvet bÃƒÂ¶lgesinde istikrarlÃ„Â± performansÃ„Â± ve kalitesiyle kadro derinliÃ„Å¸ine ÃƒÂ¶nemli katkÃ„Â± saÃ„Å¸ladÃ„Â±.", career:["Eyupspor"], strengths:["Pas","Teknik"] },
  { name:"Okan Kocuk", team:"Samsunspor", position:"Kaleci", age:30, marketValue:2.0, goals:0, assists:0, minutes:3300, bigMatch:84, form:85, story:"Samsunspor kalesinde gÃƒÂ¶sterdiÃ„Å¸i istikrarla takÃ„Â±mÃ„Â±n ligi orta sÃ„Â±ralarda tamamlamasÃ„Â±nÃ„Â± saÃ„Å¸ladÃ„Â±.", career:["Bursaspor","Galatasaray","Samsunspor"], strengths:["KurtarÃ„Â±Ã…Å¸","Refleks","Liderlik"] },
  { name:"Marius Mouandilmadji", team:"Samsunspor", position:"Forvet", age:27, marketValue:7.0, goals:14, assists:2, minutes:2300, bigMatch:81, form:85, story:"Samsunspor formasÃ„Â±yla 14 gol atarak takÃ„Â±mÃ„Â±n en golcÃƒÂ¼ oyuncusu oldu ve hÃƒÂ¼cum hattÃ„Â±nÃ„Â± sÃ„Â±rtladÃ„Â±.", career:["Porto B","Augsburg","Samsunspor"], strengths:["Bitiricilik","HÃ„Â±z","Fizik"] },
  { name:"Halil Yeral", team:"Samsunspor", position:"Kaleci", age:26, marketValue:0.3, goals:0, assists:0, minutes:180, bigMatch:70, form:75, story:"Kupada gÃƒÂ¶rev alan yedek kaleci, gÃƒÂ¶rev verildiÃ„Å¸i anlarda kalesinde elinden geleni yaptÃ„Â±.", career:["Akhisarspor","Samsunspor"], strengths:["Refleks"] },
  { name:"Rick van Drongelen", team:"Samsunspor", position:"Defans", age:27, marketValue:2.5, goals:2, assists:0, minutes:3100, bigMatch:83, form:85, story:"HollandalÃ„Â± sol ayaklÃ„Â± stoper, Samsunspor savunmasÃ„Â±nda hava toplarÃ„Â±nda ve markajda kusursuzdu.", career:["Sparta Rotterdam","Hamburg","Union Berlin","Hansa Rostock","Samsunspor"], strengths:["Markaj","Hava Topu","Liderlik"] },
  { name:"Lubomir Satka", team:"Samsunspor", position:"Defans", age:30, marketValue:1.2, goals:1, assists:0, minutes:2700, bigMatch:81, form:82, story:"Slovak stoper, dengeli oyunu, pozisyon bilgisi ve sakin yapÃ„Â±sÃ„Â±yla savunmanÃ„Â±n gÃƒÂ¼vencesi oldu.", career:["Newcastle","Lech Poznan","Samsunspor"], strengths:["Sakinlik","Yer TutuÃ…Å¸"] },
  { name:"Zeki Yavru", team:"Samsunspor", position:"Defans", age:34, marketValue:0.2, goals:1, assists:5, minutes:2400, bigMatch:80, form:81, story:"TakÃ„Â±mÃ„Â±n kaptanlarÃ„Â±ndan, tecrÃƒÂ¼beli saÃ„Å¸ bek duran toplardaki baÃ…Å¸arÃ„Â±sÃ„Â± ve 5 asistiyle ÃƒÂ¶ne ÃƒÂ§Ã„Â±ktÃ„Â±.", career:["Trabzonspor","Kayserispor","Giresunspor","Samsunspor"], strengths:["Duran Top","Orta","TecrÃƒÂ¼be"] },
  { name:"Marc Bola", team:"Samsunspor", position:"Defans", age:28, marketValue:1.5, goals:0, assists:3, minutes:2600, bigMatch:79, form:81, story:"Sol bekte atletizmi ve hÃ„Â±zÃ„Â±yla savunma gÃƒÂ¼cÃƒÂ¼nÃƒÂ¼ artÃ„Â±rÃ„Â±rken hÃƒÂ¼cuma da 3 asistlik katkÃ„Â± verdi.", career:["Arsenal","Middlesbrough","Samsunspor"], strengths:["DayanÃ„Â±klÃ„Â±lÃ„Â±k","HÃ„Â±z","Savunma"] },
  { name:"Youssef Ait Bennasser", team:"Samsunspor", position:"Orta saha", age:29, marketValue:1.5, goals:2, assists:2, minutes:2800, bigMatch:81, form:82, story:"FaslÃ„Â± ÃƒÂ¶n libero, orta sahada oyunun yÃƒÂ¶nÃƒÂ¼nÃƒÂ¼ deÃ„Å¸iÃ…Å¸tirme kalitesi ve top ÃƒÂ§alma baÃ…Å¸arÃ„Â±sÃ„Â±yla dinamo gÃƒÂ¶revi gÃƒÂ¶rdÃƒÂ¼.", career:["Monaco","Nancy","Saint-Etienne","Adanaspor","Samsunspor"], strengths:["Pas kalitesi","Top Kapma","Fizik"] },
  { name:"Flavien Tait", team:"Samsunspor", position:"Orta saha", age:33, marketValue:0.8, goals:1, assists:4, minutes:1800, bigMatch:79, form:80, story:"Rennes geÃƒÂ§miÃ…Å¸li FransÃ„Â±z merkez orta saha, tecrÃƒÂ¼besi ve pas daÃ„Å¸Ã„Â±tÃ„Â±mÃ„Â±yla rotasyonda kilit rol oynadÃ„Â±.", career:["Angers","Rennes","Samsunspor"], strengths:["Pas","Oyun GÃƒÂ¶rÃƒÂ¼Ã…Å¸ÃƒÂ¼","TecrÃƒÂ¼be"] },
  { name:"Carlo Holse", team:"Samsunspor", position:"Orta saha", age:27, marketValue:3.5, goals:7, assists:8, minutes:2900, bigMatch:83, form:85, story:"DanimarkalÃ„Â± 10 numara, 7 gol ve 8 asistlik ÃƒÂ¼retkenliÃ„Å¸iyle Samsunspor hÃƒÂ¼cumunun beyni oldu.", career:["Kopenhag","Rosenborg","Samsunspor"], strengths:["YaratÃ„Â±cÃ„Â±lÃ„Â±k","Vizyon","Asist"] },
  { name:"Olivier Ntcham", team:"Samsunspor", position:"Orta saha", age:30, marketValue:3.2, goals:9, assists:6, minutes:2700, bigMatch:84, form:86, story:"Kamerunlu yÃ„Â±ldÃ„Â±z, orta sahadaki gÃƒÂ¼ÃƒÂ§lÃƒÂ¼ fiziÃ„Å¸i, uzaktan Ã…Å¸utlarÃ„Â± ve 9 golÃƒÂ¼yle sezonun en iyi oyuncularÃ„Â±ndandÃ„Â±.", career:["Man City","Genoa","Celtic","Marseille","Swansea","Samsunspor"], strengths:["GÃƒÂ¼ÃƒÂ§","Uzak Ã…Âut","Teknik"] },
  { name:"Kingsley Schindler", team:"Samsunspor", position:"Kanat", age:32, marketValue:0.6, goals:3, assists:3, minutes:1900, bigMatch:78, form:80, story:"GanalÃ„Â± kanat oyuncusu, hÃ„Â±zÃ„Â± ve hÃƒÂ¼cum/savunma dengesindeki yardÃ„Â±mlaÃ…Å¸masÃ„Â±yla takÃ„Â±mÃ„Â±na katkÃ„Â± saÃ„Å¸ladÃ„Â±.", career:["KÃƒÂ¶ln","Hannover","Samsunspor"], strengths:["HÃ„Â±z","MÃƒÂ¼cadele"] },
  { name:"Emre Kilinc", team:"Samsunspor", position:"Kanat", age:31, marketValue:1.2, goals:4, assists:5, minutes:2300, bigMatch:80, form:82, story:"Galatasaray ve Sivasspor geÃƒÂ§miÃ…Å¸li sol aÃƒÂ§Ã„Â±k, ÃƒÂ§alÃ„Â±Ã…Å¸kanlÃ„Â±Ã„Å¸Ã„Â± ve 9 skor katkÃ„Â±sÃ„Â±yla hÃƒÂ¼cuma zenginlik kattÃ„Â±.", career:["Boluspor","Sivasspor","Galatasaray","AnkaragÃƒÂ¼cÃƒÂ¼","Samsunspor"], strengths:["Teknik","Pas","Ãƒâ€¡alÃ„Â±Ã…Å¸kanlÃ„Â±k"] },
  { name:"Gaetan Laura", team:"Samsunspor", position:"Forvet", age:30, marketValue:0.5, goals:3, assists:1, minutes:1000, bigMatch:74, form:77, story:"Yedek santrfor olarak hÃ„Â±zÃ„Â± ve fiziksel patlayÃ„Â±cÃ„Â±lÃ„Â±Ã„Å¸Ã„Â±yla rotasyona gÃƒÂ¼ÃƒÂ§ kazandÃ„Â±rdÃ„Â±.", career:["Paris FC","Cosenza","Samsunspor"], strengths:["HÃ„Â±z","Fizik"] },
  { name:"Arbnor Muja", team:"Samsunspor", position:"Kanat", age:27, marketValue:1.8, goals:5, assists:4, minutes:2100, bigMatch:80, form:82, story:"Antwerp'ten transfer edilen Arnavut kanat, driplingleri ve hÃƒÂ¼cumdaki enerjisiyle 9 gole etki etti.", career:["Drita","Antwerp","Samsunspor"], strengths:["Dribbling","Ãƒâ€¡eviklik"] },
  { name:"Landry Dimata", team:"Samsunspor", position:"Forvet", age:25, marketValue:2.8, goals:9, assists:1, minutes:1520, bigMatch:79, form:74, story:"2025-26 sezonunda takÃ„Â±mÃ„Â±nÃ„Â±n Forvet bÃƒÂ¶lgesinde istikrarlÃ„Â± performansÃ„Â± ve kalitesiyle kadro derinliÃ„Å¸ine ÃƒÂ¶nemli katkÃ„Â± saÃ„Å¸ladÃ„Â±.", career:["Samsunspor"], strengths:["Pas","Teknik"] },
  { name:"Soner Aydogdu", team:"Samsunspor", position:"Kaleci", age:30, marketValue:2.1, goals:0, assists:1, minutes:1327, bigMatch:80, form:87, story:"2025-26 sezonunda takÃ„Â±mÃ„Â±nÃ„Â±n Kaleci bÃƒÂ¶lgesinde istikrarlÃ„Â± performansÃ„Â± ve kalitesiyle kadro derinliÃ„Å¸ine ÃƒÂ¶nemli katkÃ„Â± saÃ„Å¸ladÃ„Â±.", career:["Samsunspor"], strengths:["Refleks","KurtarÃ„Â±Ã…Å¸"] },
  { name:"Soner Gonul", team:"Samsunspor", position:"Forvet", age:20, marketValue:2.7, goals:11, assists:1, minutes:1238, bigMatch:71, form:75, story:"2025-26 sezonunda takÃ„Â±mÃ„Â±nÃ„Â±n Forvet bÃƒÂ¶lgesinde istikrarlÃ„Â± performansÃ„Â± ve kalitesiyle kadro derinliÃ„Å¸ine ÃƒÂ¶nemli katkÃ„Â± saÃ„Å¸ladÃ„Â±.", career:["Samsunspor"], strengths:["Pas","Teknik"] },
  { name:"Mustafa Tan", team:"Samsunspor", position:"Kanat", age:27, marketValue:2.5, goals:11, assists:2, minutes:1269, bigMatch:76, form:72, story:"2025-26 sezonunda takÃ„Â±mÃ„Â±nÃ„Â±n Kanat bÃƒÂ¶lgesinde istikrarlÃ„Â± performansÃ„Â± ve kalitesiyle kadro derinliÃ„Å¸ine ÃƒÂ¶nemli katkÃ„Â± saÃ„Å¸ladÃ„Â±.", career:["Samsunspor"], strengths:["Pas","Teknik"] },
  { name:"Celil Yuksel", team:"Samsunspor", position:"Orta saha", age:27, marketValue:1.8, goals:2, assists:9, minutes:1739, bigMatch:82, form:77, story:"2025-26 sezonunda takÃ„Â±mÃ„Â±nÃ„Â±n Orta saha bÃƒÂ¶lgesinde istikrarlÃ„Â± performansÃ„Â± ve kalitesiyle kadro derinliÃ„Å¸ine ÃƒÂ¶nemli katkÃ„Â± saÃ„Å¸ladÃ„Â±.", career:["Samsunspor"], strengths:["Pas","Teknik"] },
  { name:"Ercan Kara", team:"Samsunspor", position:"Orta saha", age:24, marketValue:1.2, goals:2, assists:2, minutes:1236, bigMatch:73, form:83, story:"2025-26 sezonunda takÃ„Â±mÃ„Â±nÃ„Â±n Orta saha bÃƒÂ¶lgesinde istikrarlÃ„Â± performansÃ„Â± ve kalitesiyle kadro derinliÃ„Å¸ine ÃƒÂ¶nemli katkÃ„Â± saÃ„Å¸ladÃ„Â±.", career:["Samsunspor"], strengths:["Pas","Teknik"] },
  { name:"Benito Raman", team:"Samsunspor", position:"Defans", age:20, marketValue:2.9, goals:2, assists:2, minutes:1761, bigMatch:77, form:84, story:"2025-26 sezonunda takÃ„Â±mÃ„Â±nÃ„Â±n Defans bÃƒÂ¶lgesinde istikrarlÃ„Â± performansÃ„Â± ve kalitesiyle kadro derinliÃ„Å¸ine ÃƒÂ¶nemli katkÃ„Â± saÃ„Å¸ladÃ„Â±.", career:["Samsunspor"], strengths:["Markaj","Hava Topu"] },
  { name:"Mickael Tirpan", team:"Samsunspor", position:"Defans", age:28, marketValue:1.1, goals:2, assists:1, minutes:2041, bigMatch:71, form:70, story:"2025-26 sezonunda takÃ„Â±mÃ„Â±nÃ„Â±n Defans bÃƒÂ¶lgesinde istikrarlÃ„Â± performansÃ„Â± ve kalitesiyle kadro derinliÃ„Å¸ine ÃƒÂ¶nemli katkÃ„Â± saÃ„Å¸ladÃ„Â±.", career:["Samsunspor"], strengths:["Markaj","Hava Topu"] },
  { name:"Haluk Mustafa", team:"Samsunspor", position:"Defans", age:26, marketValue:2.7, goals:0, assists:2, minutes:2261, bigMatch:71, form:77, story:"2025-26 sezonunda takÃ„Â±mÃ„Â±nÃ„Â±n Defans bÃƒÂ¶lgesinde istikrarlÃ„Â± performansÃ„Â± ve kalitesiyle kadro derinliÃ„Å¸ine ÃƒÂ¶nemli katkÃ„Â± saÃ„Å¸ladÃ„Â±.", career:["Samsunspor"], strengths:["Markaj","Hava Topu"] },
  { name:"Nanu", team:"Samsunspor", position:"Kaleci", age:26, marketValue:2.0, goals:1, assists:2, minutes:1404, bigMatch:73, form:78, story:"2025-26 sezonunda takÃ„Â±mÃ„Â±nÃ„Â±n Kaleci bÃƒÂ¶lgesinde istikrarlÃ„Â± performansÃ„Â± ve kalitesiyle kadro derinliÃ„Å¸ine ÃƒÂ¶nemli katkÃ„Â± saÃ„Å¸ladÃ„Â±.", career:["Samsunspor"], strengths:["Refleks","KurtarÃ„Â±Ã…Å¸"] },
  { name:"ErtuÃ„Å¸rul TaÃ…Å¸kÃ„Â±ran", team:"Alanyaspor", position:"Kaleci", age:36, marketValue:0.1, goals:0, assists:0, minutes:3400, bigMatch:85, form:88, story:"TecrÃƒÂ¼beli kaleci Alanyaspor kalesinde gÃƒÂ¶sterdiÃ„Å¸i kurtarÃ„Â±Ã…Å¸larla takÃ„Â±mÃ„Â±nÃ„Â±n en gÃƒÂ¼vendiÃ„Å¸i isimlerden biri oldu.", career:["Fenerbahce","KasÃ„Â±mpaÃ…Å¸a","Alanyaspor"], strengths:["Refleks","TecrÃƒÂ¼be","Liderlik"] },
  { name:"Ianis Hagi", team:"Alanyaspor", position:"Orta saha", age:27, marketValue:2.5, goals:6, assists:9, minutes:2400, bigMatch:84, form:85, story:"Alanyaspor orta sahasÃ„Â±nda oyun zekasÃ„Â±, teknik kalitesi ve 9 asistiyle takÃ„Â±mÃ„Â±n oyun kurucu lideri oldu.", career:["Fiorentina","Genk","Rangers","Alaves","Alanyaspor"], strengths:["Teknik","Pas","Oyun GÃƒÂ¶rÃƒÂ¼Ã…Å¸ÃƒÂ¼"] },
  { name:"Florent Hadergjonaj", team:"Alanyaspor", position:"Defans", age:30, marketValue:2.0, goals:1, assists:4, minutes:2700, bigMatch:81, form:82, story:"Ã„Â°sviÃƒÂ§reli Kosova asÃ„Â±llÃ„Â± saÃ„Å¸ bek, Premier Lig geÃƒÂ§miÃ…Å¸iyle Alanyaspor'un saÃ„Å¸ kulvarÃ„Â±nÃ„Â± kaliteli biÃƒÂ§imde yÃƒÂ¶netti.", career:["Huddersfield","Inter","Alanyaspor"], strengths:["HÃ„Â±z","Savunma","Orta"] },
  { name:"Fidan Aliti", team:"Alanyaspor", position:"Defans", age:27, marketValue:2.0, goals:1, assists:3, minutes:2800, bigMatch:81, form:82, story:"KosovalÃ„Â± sol bek, sol kulvarda hem savunma hem hÃƒÂ¼cuma katkÃ„Â±sÃ„Â±yla sezonun en dikkat ÃƒÂ§ekici defans oyuncularÃ„Â±ndan biri oldu.", career:["Winterthur","Ãƒâ€¡eÃ…Å¸itli","Alanyaspor"], strengths:["HÃ„Â±z","Orta","Fizik"] },
  { name:"Bruno Viana", team:"Alanyaspor", position:"Defans", age:29, marketValue:2.5, goals:2, assists:1, minutes:2900, bigMatch:82, form:83, story:"Portekizli stoper, Braga ve Ãƒâ€¡eÃ…Å¸itli bÃƒÂ¼yÃƒÂ¼k kulÃƒÂ¼plerin geÃƒÂ§miÃ…Å¸iyle Alanyaspor savunmasÃ„Â±nÃ„Â±n direÃ„Å¸i oldu.", career:["Braga","Rangers","Alanyaspor"], strengths:["GÃƒÂ¼ÃƒÂ§","Hava Topu","Markaj"] },
  { name:"Gaius Makouta", team:"Alanyaspor", position:"Orta saha", age:26, marketValue:2.5, goals:3, assists:5, minutes:2600, bigMatch:82, form:83, story:"Kongo asÃ„Â±llÃ„Â± FransÃ„Â±z defansif orta saha, top kapma kapasitesi ve iÃ…Å¸ gÃƒÂ¼cÃƒÂ¼yle Alanyaspor'un orta saha motorunu oluÃ…Å¸turdu.", career:["Toulouse","Alanyaspor"], strengths:["Top Kapma","Dinamizm","Fizik"] },
  { name:"GÃƒÂ¼ven YalÃƒÂ§Ã„Â±n", team:"Alanyaspor", position:"Forvet", age:27, marketValue:4.0, goals:14, assists:4, minutes:2800, bigMatch:86, form:87, story:"Milli golcÃƒÂ¼, 14 golle ligin en etkin TÃƒÂ¼rk santrforu unvanÃ„Â±nÃ„Â± alarak Alanyaspor'un sezonunu taÃ…Å¸Ã„Â±dÃ„Â±.", career:["BeÃ…Å¸iktaÃ…Å¸","Alanyaspor"], strengths:["Bitiricilik","Hava Topu","Pozisyon Alma"] },
  { name:"Ui-Jo Hwang", team:"Alanyaspor", position:"Forvet", age:33, marketValue:3.0, goals:9, assists:3, minutes:2300, bigMatch:83, form:84, story:"GÃƒÂ¼ney Koreli milli golcÃƒÂ¼, tecrÃƒÂ¼be ve bitiriciliÃ„Å¸iyle Alanyaspor'un GÃƒÂ¼ven YalÃƒÂ§Ã„Â±n'Ã„Â±n ortaÃ„Å¸Ã„Â± olarak etkili bir sezon geÃƒÂ§irdi.", career:["Bordeaux","Nottingham Forest","Alanyaspor"], strengths:["Bitiricilik","HÃ„Â±z","TecrÃƒÂ¼be"] },
  { name:"Meschack Elia", team:"Alanyaspor", position:"Kanat", age:26, marketValue:3.5, goals:7, assists:10, minutes:2600, bigMatch:84, form:85, story:"Kongolu hÃ„Â±zlÃ„Â± kanat, explosif oyunu ve 17 skor katkÃ„Â±sÃ„Â±yla Alanyaspor'un en tehlikeli silahlarÃ„Â±ndan biri oldu.", career:["Young Boys","Alanyaspor"], strengths:["HÃ„Â±z","Dribbling","Asist"] },
  { name:"Steve MouniÃƒÂ©", team:"Alanyaspor", position:"Forvet", age:30, marketValue:3.0, goals:8, assists:2, minutes:2100, bigMatch:82, form:83, story:"Beninli gÃƒÂ¼ÃƒÂ§lÃƒÂ¼ forvet, hava toplarÃ„Â±ndaki ve zemindeki etkinliÃ„Å¸iyle Alanyaspor'un alternatifsiz hÃƒÂ¼cum seÃƒÂ§eneÃ„Å¸i oldu.", career:["Huddersfield","Brest","Alanyaspor"], strengths:["Hava Topu","GÃƒÂ¼ÃƒÂ§","Bitiricilik"] },
  { name:"Loide Augusto", team:"Alanyaspor", position:"Defans", age:20, marketValue:2.2, goals:0, assists:0, minutes:1830, bigMatch:75, form:86, story:"2025-26 sezonunda takÃ„Â±mÃ„Â±nÃ„Â±n Defans bÃƒÂ¶lgesinde istikrarlÃ„Â± performansÃ„Â± ve kalitesiyle kadro derinliÃ„Å¸ine ÃƒÂ¶nemli katkÃ„Â± saÃ„Å¸ladÃ„Â±.", career:["Alanyaspor"], strengths:["Markaj","Hava Topu"] },
  { name:"Richard Coelho", team:"Alanyaspor", position:"Kaleci", age:29, marketValue:1.8, goals:0, assists:1, minutes:2260, bigMatch:82, form:83, story:"2025-26 sezonunda takÃ„Â±mÃ„Â±nÃ„Â±n Kaleci bÃƒÂ¶lgesinde istikrarlÃ„Â± performansÃ„Â± ve kalitesiyle kadro derinliÃ„Å¸ine ÃƒÂ¶nemli katkÃ„Â± saÃ„Å¸ladÃ„Â±.", career:["Alanyaspor"], strengths:["Refleks","KurtarÃ„Â±Ã…Å¸"] },
  { name:"Jure Balkovec", team:"Alanyaspor", position:"Kaleci", age:22, marketValue:1.7, goals:1, assists:0, minutes:1294, bigMatch:84, form:77, story:"2025-26 sezonunda takÃ„Â±mÃ„Â±nÃ„Â±n Kaleci bÃƒÂ¶lgesinde istikrarlÃ„Â± performansÃ„Â± ve kalitesiyle kadro derinliÃ„Å¸ine ÃƒÂ¶nemli katkÃ„Â± saÃ„Å¸ladÃ„Â±.", career:["Alanyaspor"], strengths:["Refleks","KurtarÃ„Â±Ã…Å¸"] },
  { name:"Nicolas Janvier", team:"Alanyaspor", position:"Forvet", age:27, marketValue:2.2, goals:4, assists:2, minutes:1284, bigMatch:82, form:70, story:"2025-26 sezonunda takÃ„Â±mÃ„Â±nÃ„Â±n Forvet bÃƒÂ¶lgesinde istikrarlÃ„Â± performansÃ„Â± ve kalitesiyle kadro derinliÃ„Å¸ine ÃƒÂ¶nemli katkÃ„Â± saÃ„Å¸ladÃ„Â±.", career:["Alanyaspor"], strengths:["Pas","Teknik"] },
  { name:"Nuno Lima", team:"Alanyaspor", position:"Defans", age:29, marketValue:2.2, goals:1, assists:0, minutes:1059, bigMatch:81, form:84, story:"2025-26 sezonunda takÃ„Â±mÃ„Â±nÃ„Â±n Defans bÃƒÂ¶lgesinde istikrarlÃ„Â± performansÃ„Â± ve kalitesiyle kadro derinliÃ„Å¸ine ÃƒÂ¶nemli katkÃ„Â± saÃ„Å¸ladÃ„Â±.", career:["Alanyaspor"], strengths:["Markaj","Hava Topu"] },
  { name:"Efecan Karaca", team:"Alanyaspor", position:"Kaleci", age:33, marketValue:3.0, goals:0, assists:0, minutes:2118, bigMatch:71, form:76, story:"2025-26 sezonunda takÃ„Â±mÃ„Â±nÃ„Â±n Kaleci bÃƒÂ¶lgesinde istikrarlÃ„Â± performansÃ„Â± ve kalitesiyle kadro derinliÃ„Å¸ine ÃƒÂ¶nemli katkÃ„Â± saÃ„Å¸ladÃ„Â±.", career:["Alanyaspor"], strengths:["Refleks","KurtarÃ„Â±Ã…Å¸"] },
  { name:"Bohan Giyano", team:"Alanyaspor", position:"Kanat", age:31, marketValue:0.9, goals:10, assists:8, minutes:1841, bigMatch:72, form:72, story:"2025-26 sezonunda takÃ„Â±mÃ„Â±nÃ„Â±n Kanat bÃƒÂ¶lgesinde istikrarlÃ„Â± performansÃ„Â± ve kalitesiyle kadro derinliÃ„Å¸ine ÃƒÂ¶nemli katkÃ„Â± saÃ„Å¸ladÃ„Â±.", career:["Alanyaspor"], strengths:["Pas","Teknik"] },
  { name:"Yusuf Ozdemir", team:"Alanyaspor", position:"Kaleci", age:23, marketValue:0.8, goals:2, assists:2, minutes:1128, bigMatch:84, form:85, story:"2025-26 sezonunda takÃ„Â±mÃ„Â±nÃ„Â±n Kaleci bÃƒÂ¶lgesinde istikrarlÃ„Â± performansÃ„Â± ve kalitesiyle kadro derinliÃ„Å¸ine ÃƒÂ¶nemli katkÃ„Â± saÃ„Å¸ladÃ„Â±.", career:["Alanyaspor"], strengths:["Refleks","KurtarÃ„Â±Ã…Å¸"] },
  { name:"Furkan Bayir", team:"Alanyaspor", position:"Forvet", age:26, marketValue:2.9, goals:8, assists:0, minutes:1412, bigMatch:80, form:72, story:"2025-26 sezonunda takÃ„Â±mÃ„Â±nÃ„Â±n Forvet bÃƒÂ¶lgesinde istikrarlÃ„Â± performansÃ„Â± ve kalitesiyle kadro derinliÃ„Å¸ine ÃƒÂ¶nemli katkÃ„Â± saÃ„Å¸ladÃ„Â±.", career:["Alanyaspor"], strengths:["Pas","Teknik"] },
  { name:"Serdar Dursun", team:"Alanyaspor", position:"Orta saha", age:29, marketValue:2.0, goals:1, assists:3, minutes:2286, bigMatch:71, form:73, story:"2025-26 sezonunda takÃ„Â±mÃ„Â±nÃ„Â±n Orta saha bÃƒÂ¶lgesinde istikrarlÃ„Â± performansÃ„Â± ve kalitesiyle kadro derinliÃ„Å¸ine ÃƒÂ¶nemli katkÃ„Â± saÃ„Å¸ladÃ„Â±.", career:["Alanyaspor"], strengths:["Pas","Teknik"] },
  { name:"Ramon Lopes", team:"Alanyaspor", position:"Orta saha", age:24, marketValue:2.1, goals:0, assists:2, minutes:1018, bigMatch:73, form:84, story:"2025-26 sezonunda takÃ„Â±mÃ„Â±nÃ„Â±n Orta saha bÃƒÂ¶lgesinde istikrarlÃ„Â± performansÃ„Â± ve kalitesiyle kadro derinliÃ„Å¸ine ÃƒÂ¶nemli katkÃ„Â± saÃ„Å¸ladÃ„Â±.", career:["Alanyaspor"], strengths:["Pas","Teknik"] },
  { name:"Eduardo Duarte", team:"Alanyaspor", position:"Orta saha", age:27, marketValue:1.7, goals:2, assists:9, minutes:1065, bigMatch:83, form:87, story:"2025-26 sezonunda takÃ„Â±mÃ„Â±nÃ„Â±n Orta saha bÃƒÂ¶lgesinde istikrarlÃ„Â± performansÃ„Â± ve kalitesiyle kadro derinliÃ„Å¸ine ÃƒÂ¶nemli katkÃ„Â± saÃ„Å¸ladÃ„Â±.", career:["Alanyaspor"], strengths:["Pas","Teknik"] },
  { name:"Mert Selim", team:"Alanyaspor", position:"Forvet", age:22, marketValue:1.2, goals:10, assists:2, minutes:1661, bigMatch:72, form:76, story:"2025-26 sezonunda takÃ„Â±mÃ„Â±nÃ„Â±n Forvet bÃƒÂ¶lgesinde istikrarlÃ„Â± performansÃ„Â± ve kalitesiyle kadro derinliÃ„Å¸ine ÃƒÂ¶nemli katkÃ„Â± saÃ„Å¸ladÃ„Â±.", career:["Alanyaspor"], strengths:["Pas","Teknik"] },
  { name:"Mustafa KÃ„Â±lÃ„Â±ÃƒÂ§", team:"Alanyaspor", position:"Kaleci", age:33, marketValue:2.6, goals:1, assists:0, minutes:1031, bigMatch:78, form:73, story:"Kadro derinliÃ„Å¸i ve rotasyonda teknik direktÃƒÂ¶rÃƒÂ¼n elini gÃƒÂ¼ÃƒÂ§lendiren, 2025-26 sezonu kadro oyuncusu.", career:["Alanyaspor"], strengths:["Refleks","KurtarÃ„Â±Ã…Å¸"] },
  { name:"Pierre Silva", team:"Alanyaspor", position:"Forvet", age:31, marketValue:1.1, goals:2, assists:0, minutes:1572, bigMatch:76, form:84, story:"Kadro derinliÃ„Å¸i ve rotasyonda teknik direktÃƒÂ¶rÃƒÂ¼n elini gÃƒÂ¼ÃƒÂ§lendiren, 2025-26 sezonu kadro oyuncusu.", career:["Alanyaspor"], strengths:["Pas","MÃƒÂ¼cadele"] },
  { name:"Mohamed Bayo", team:"Gaziantep FK", position:"Forvet", age:27, marketValue:4.5, goals:15, assists:4, minutes:2300, bigMatch:84, form:87, story:"Lille'den kiralanan santrfor, 15 golle Gaziantep'i ligde tutan en bÃƒÂ¼yÃƒÂ¼k hÃƒÂ¼cum gÃƒÂ¼cÃƒÂ¼ oldu.", career:["Clermont","Lille","Gaziantep FK"], strengths:["Bitiricilik","Fizik","Ceza SahasÃ„Â±"] },
  { name:"Kacper Kozlowski", team:"Gaziantep FK", position:"Orta saha", age:22, marketValue:6.0, goals:5, assists:8, minutes:2500, bigMatch:81, form:84, story:"Gaziantep FK orta sahasÃ„Â±nda dinamizmi ve 8 asistiyle fark yaratan PolonyalÃ„Â± genÃƒÂ§ yÃ„Â±ldÃ„Â±z, ligin gÃƒÂ¶zdesi oldu.", career:["Pogon","Brighton","Vitesse","Gaziantep FK"], strengths:["Pas kalitesi","YaratÃ„Â±cÃ„Â±lÃ„Â±k","Asist"] },
  { name:"Mustafa Burak Bozan", team:"Gaziantep FK", position:"Kaleci", age:25, marketValue:1.5, goals:0, assists:0, minutes:3100, bigMatch:80, form:81, story:"GenÃƒÂ§ TÃƒÂ¼rk kaleci, Gaziantep kalesinde sergilediÃ„Å¸i olgun performansla sezonun en tutarlÃ„Â± file bekÃƒÂ§ilerinden biri oldu.", career:["Gaziantep FK"], strengths:["Refleks","Bire Bir","Liderlik"] },
  { name:"NazÃ„Â±m SangarÃƒÂ©", team:"Gaziantep FK", position:"Defans", age:29, marketValue:2.0, goals:1, assists:1, minutes:2800, bigMatch:81, form:82, story:"FransÃ„Â±z-Gine asÃ„Â±llÃ„Â± stoper, gÃƒÂ¼ÃƒÂ§lÃƒÂ¼ fiziÃ„Å¸i ve hava topu hakimiyetiyle Gaziantep savunmasÃ„Â±nÃ„Â±n temel taÃ…Å¸Ã„Â± oldu.", career:["Auxerre","Gaziantep FK"], strengths:["Fizik","Hava Topu","GÃƒÂ¼ÃƒÂ§"] },
  { name:"Myenty Abena", team:"Gaziantep FK", position:"Defans", age:26, marketValue:1.8, goals:1, assists:2, minutes:2700, bigMatch:80, form:81, story:"Kamerunlu stoper, savunma disiplini ve fiziksel ÃƒÂ¼stÃƒÂ¼nlÃƒÂ¼Ã„Å¸ÃƒÂ¼yle Gaziantep'in arka hattÃ„Â±nÃ„Â± saÃ„Å¸lamlaÃ…Å¸tÃ„Â±rdÃ„Â±.", career:["Ãƒâ€¡eÃ…Å¸itli","Gaziantep FK"], strengths:["GÃƒÂ¼ÃƒÂ§","Markaj","Hava Topu"] },
  { name:"KÃƒÂ©vin Rodrigues", team:"Gaziantep FK", position:"Defans", age:29, marketValue:2.0, goals:0, assists:5, minutes:2600, bigMatch:80, form:81, story:"Portekizli sol bek, hÃƒÂ¼cum bindirmeleri ve ortalarÃ„Â±yla sol kulvarÃ„Â± canlandÃ„Â±rdÃ„Â±.", career:["Sporting CP","Ãƒâ€¡eÃ…Å¸itli","Gaziantep FK"], strengths:["HÃ„Â±z","Orta","HÃƒÂ¼cum KatÃ„Â±lÃ„Â±mÃ„Â±"] },
  { name:"Kacper KozÃ…â€šowski", team:"Gaziantep FK", position:"Orta saha", age:22, marketValue:6.0, goals:5, assists:8, minutes:2500, bigMatch:84, form:85, story:"Polonya'nÃ„Â±n en bÃƒÂ¼yÃƒÂ¼k genÃƒÂ§ yeteneÃ„Å¸i, yaratÃ„Â±cÃ„Â± oyun anlayÃ„Â±Ã…Å¸Ã„Â± ve 13 skor katkÃ„Â±sÃ„Â±yla sezonun sÃƒÂ¼rprizi oldu.", career:["Brighton","Gaziantep FK"], strengths:["Teknik","YaratÃ„Â±cÃ„Â±lÃ„Â±k","Potansiyel"] },
  { name:"Alexandru Maxim", team:"Gaziantep FK", position:"Orta saha", age:35, marketValue:1.0, goals:4, assists:7, minutes:2300, bigMatch:82, form:82, story:"Romanya'nÃ„Â±n efsane oyun kurucusu, 15 skor katkÃ„Â±sÃ„Â±yla yaÃ…Å¸Ã„Â±na raÃ„Å¸men Gaziantep'in en kritik oyuncularÃ„Â±ndan biri olmaya devam etti.", career:["Stuttgart","Mainz","Gaziantep FK"], strengths:["Pas","Duran Top","Oyun GÃƒÂ¶rÃƒÂ¼Ã…Å¸ÃƒÂ¼"] },
  { name:"Juninho Bacuna", team:"Gaziantep FK", position:"Orta saha", age:28, marketValue:2.5, goals:5, assists:6, minutes:2600, bigMatch:82, form:83, story:"HollandalÃ„Â± kutu-kutu orta saha, hem gol hem asist ÃƒÂ¼retimiyle Gaziantep FK'nÃ„Â±n dinamosu oldu.", career:["Birmingham","Rangers","Gaziantep FK"], strengths:["Dinamizm","Gol","MÃƒÂ¼cadele"] },
  { name:"Yusuf KabadayÃ„Â±", team:"Gaziantep FK", position:"Kanat", age:20, marketValue:5.0, goals:6, assists:9, minutes:2400, bigMatch:84, form:85, story:"Bayern MÃƒÂ¼nih akademisinden yetiÃ…Å¸en TÃƒÂ¼rk genÃƒÂ§ yÃ„Â±ldÃ„Â±zÃ„Â±, 15 skor katkÃ„Â±sÃ„Â±yla SÃƒÂ¼per Lig'de mÃƒÂ¼thiÃ…Å¸ bir ilk sezonu geÃƒÂ§irdi.", career:["Bayern MÃƒÂ¼nih","Gaziantep FK"], strengths:["HÃ„Â±z","Teknik","Potansiyel"] },
  { name:"Christopher Lungoyi", team:"Gaziantep FK", position:"Kanat", age:22, marketValue:3.0, goals:7, assists:5, minutes:2200, bigMatch:82, form:84, story:"Kongolu genÃƒÂ§ kanat yÃ„Â±ldÃ„Â±zÃ„Â±, hÃ„Â±zÃ„Â± ve bitiriciliÃ„Å¸iyle Gaziantep saldÃ„Â±rÃ„Â±sÃ„Â±na farklÃ„Â± bir boyut kattÃ„Â±.", career:["Club Brugge","Gaziantep FK"], strengths:["HÃ„Â±z","Dribbling","Gol"] },
  { name:"Deian Sorescu", team:"Gaziantep FK", position:"Defans", age:25, marketValue:2.1, goals:1, assists:1, minutes:1074, bigMatch:78, form:74, story:"2025-26 sezonunda takÃ„Â±mÃ„Â±nÃ„Â±n Defans bÃƒÂ¶lgesinde istikrarlÃ„Â± performansÃ„Â± ve kalitesiyle kadro derinliÃ„Å¸ine ÃƒÂ¶nemli katkÃ„Â± saÃ„Å¸ladÃ„Â±.", career:["Gaziantep FK"], strengths:["Markaj","Hava Topu"] },
  { name:"David Okereke", team:"Gaziantep FK", position:"Orta saha", age:33, marketValue:0.9, goals:0, assists:2, minutes:2446, bigMatch:79, form:72, story:"2025-26 sezonunda takÃ„Â±mÃ„Â±nÃ„Â±n Orta saha bÃƒÂ¶lgesinde istikrarlÃ„Â± performansÃ„Â± ve kalitesiyle kadro derinliÃ„Å¸ine ÃƒÂ¶nemli katkÃ„Â± saÃ„Å¸ladÃ„Â±.", career:["Gaziantep FK"], strengths:["Pas","Teknik"] },
  { name:"Kenan Kodro", team:"Gaziantep FK", position:"Forvet", age:29, marketValue:1.7, goals:4, assists:1, minutes:1008, bigMatch:81, form:77, story:"2025-26 sezonunda takÃ„Â±mÃ„Â±nÃ„Â±n Forvet bÃƒÂ¶lgesinde istikrarlÃ„Â± performansÃ„Â± ve kalitesiyle kadro derinliÃ„Å¸ine ÃƒÂ¶nemli katkÃ„Â± saÃ„Å¸ladÃ„Â±.", career:["Gaziantep FK"], strengths:["Pas","Teknik"] },
  { name:"Stephen Bitok", team:"Gaziantep FK", position:"Orta saha", age:20, marketValue:1.2, goals:1, assists:6, minutes:1889, bigMatch:74, form:79, story:"2025-26 sezonunda takÃ„Â±mÃ„Â±nÃ„Â±n Orta saha bÃƒÂ¶lgesinde istikrarlÃ„Â± performansÃ„Â± ve kalitesiyle kadro derinliÃ„Å¸ine ÃƒÂ¶nemli katkÃ„Â± saÃ„Å¸ladÃ„Â±.", career:["Gaziantep FK"], strengths:["Pas","Teknik"] },
  { name:"Arda Kizildag", team:"Gaziantep FK", position:"Orta saha", age:21, marketValue:2.2, goals:0, assists:4, minutes:1570, bigMatch:76, form:85, story:"2025-26 sezonunda takÃ„Â±mÃ„Â±nÃ„Â±n Orta saha bÃƒÂ¶lgesinde istikrarlÃ„Â± performansÃ„Â± ve kalitesiyle kadro derinliÃ„Å¸ine ÃƒÂ¶nemli katkÃ„Â± saÃ„Å¸ladÃ„Â±.", career:["Gaziantep FK"], strengths:["Pas","Teknik"] },
  { name:"OgÃƒÂ¼n Ãƒâ€“zÃƒÂ§iÃƒÂ§ek", team:"Gaziantep FK", position:"Kanat", age:33, marketValue:1.4, goals:5, assists:4, minutes:1318, bigMatch:83, form:85, story:"2025-26 sezonunda takÃ„Â±mÃ„Â±nÃ„Â±n Kanat bÃƒÂ¶lgesinde istikrarlÃ„Â± performansÃ„Â± ve kalitesiyle kadro derinliÃ„Å¸ine ÃƒÂ¶nemli katkÃ„Â± saÃ„Å¸ladÃ„Â±.", career:["Gaziantep FK"], strengths:["Pas","Teknik"] },
  { name:"Enric Saborit", team:"Gaziantep FK", position:"Defans", age:20, marketValue:1.2, goals:1, assists:0, minutes:1767, bigMatch:76, form:73, story:"2025-26 sezonunda takÃ„Â±mÃ„Â±nÃ„Â±n Defans bÃƒÂ¶lgesinde istikrarlÃ„Â± performansÃ„Â± ve kalitesiyle kadro derinliÃ„Å¸ine ÃƒÂ¶nemli katkÃ„Â± saÃ„Å¸ladÃ„Â±.", career:["Gaziantep FK"], strengths:["Markaj","Hava Topu"] },
  { name:"Halil Ibrahim", team:"Gaziantep FK", position:"Kanat", age:25, marketValue:0.6, goals:5, assists:7, minutes:1140, bigMatch:79, form:85, story:"2025-26 sezonunda takÃ„Â±mÃ„Â±nÃ„Â±n Kanat bÃƒÂ¶lgesinde istikrarlÃ„Â± performansÃ„Â± ve kalitesiyle kadro derinliÃ„Å¸ine ÃƒÂ¶nemli katkÃ„Â± saÃ„Å¸ladÃ„Â±.", career:["Gaziantep FK"], strengths:["Pas","Teknik"] },
  { name:"Cenk Sahin", team:"Gaziantep FK", position:"Kanat", age:29, marketValue:1.8, goals:10, assists:3, minutes:1857, bigMatch:82, form:77, story:"2025-26 sezonunda takÃ„Â±mÃ„Â±nÃ„Â±n Kanat bÃƒÂ¶lgesinde istikrarlÃ„Â± performansÃ„Â± ve kalitesiyle kadro derinliÃ„Å¸ine ÃƒÂ¶nemli katkÃ„Â± saÃ„Å¸ladÃ„Â±.", career:["Gaziantep FK"], strengths:["Pas","Teknik"] },
  { name:"Salem M'Bakata", team:"Gaziantep FK", position:"Defans", age:30, marketValue:1.8, goals:1, assists:1, minutes:1663, bigMatch:70, form:75, story:"2025-26 sezonunda takÃ„Â±mÃ„Â±nÃ„Â±n Defans bÃƒÂ¶lgesinde istikrarlÃ„Â± performansÃ„Â± ve kalitesiyle kadro derinliÃ„Å¸ine ÃƒÂ¶nemli katkÃ„Â± saÃ„Å¸ladÃ„Â±.", career:["Gaziantep FK"], strengths:["Markaj","Hava Topu"] },
  { name:"Cyril Mandouki", team:"Gaziantep FK", position:"Kaleci", age:26, marketValue:1.0, goals:1, assists:0, minutes:2283, bigMatch:77, form:71, story:"2025-26 sezonunda takÃ„Â±mÃ„Â±nÃ„Â±n Kaleci bÃƒÂ¶lgesinde istikrarlÃ„Â± performansÃ„Â± ve kalitesiyle kadro derinliÃ„Å¸ine ÃƒÂ¶nemli katkÃ„Â± saÃ„Å¸ladÃ„Â±.", career:["Gaziantep FK"], strengths:["Refleks","KurtarÃ„Â±Ã…Å¸"] },
  { name:"Valmir Veliu", team:"Gaziantep FK", position:"Kanat", age:28, marketValue:1.3, goals:11, assists:4, minutes:1135, bigMatch:72, form:79, story:"2025-26 sezonunda takÃ„Â±mÃ„Â±nÃ„Â±n Kanat bÃƒÂ¶lgesinde istikrarlÃ„Â± performansÃ„Â± ve kalitesiyle kadro derinliÃ„Å¸ine ÃƒÂ¶nemli katkÃ„Â± saÃ„Å¸ladÃ„Â±.", career:["Gaziantep FK"], strengths:["Pas","Teknik"] },
  { name:"Quentin Daubin", team:"Gaziantep FK", position:"Defans", age:28, marketValue:1.8, goals:2, assists:1, minutes:2488, bigMatch:81, form:81, story:"2025-26 sezonunda takÃ„Â±mÃ„Â±nÃ„Â±n Defans bÃƒÂ¶lgesinde istikrarlÃ„Â± performansÃ„Â± ve kalitesiyle kadro derinliÃ„Å¸ine ÃƒÂ¶nemli katkÃ„Â± saÃ„Å¸ladÃ„Â±.", career:["Gaziantep FK"], strengths:["Markaj","Hava Topu"] },
  { name:"Badou Ndiaye", team:"Gaziantep FK", position:"Defans", age:32, marketValue:0.9, goals:0, assists:2, minutes:2251, bigMatch:79, form:73, story:"2025-26 sezonunda takÃ„Â±mÃ„Â±nÃ„Â±n Defans bÃƒÂ¶lgesinde istikrarlÃ„Â± performansÃ„Â± ve kalitesiyle kadro derinliÃ„Å¸ine ÃƒÂ¶nemli katkÃ„Â± saÃ„Å¸ladÃ„Â±.", career:["Gaziantep FK"], strengths:["Markaj","Hava Topu"] },
  { name:"Henry Onyekuru", team:"Genclerbirligi", position:"Kanat", age:28, marketValue:1.0, goals:7, assists:8, minutes:1900, bigMatch:80, form:82, story:"GenÃƒÂ§lerbirliÃ„Å¸i'nde eski gÃƒÂ¼nlerine dÃƒÂ¶nen Onyekuru, 7 gol and 8 asistlik sÃƒÂ¼ratli oyunuyla parladÃ„Â±.", career:["Eupen","Everton","Galatasaray","Monaco","Olympiacos","Adana Demirspor","Genclerbirligi"], strengths:["HÃ„Â±z","Dribbling","YaratÃ„Â±cÃ„Â±lÃ„Â±k"] },
  { name:"M'Baye Niang", team:"Genclerbirligi", position:"Forvet", age:31, marketValue:0.8, goals:8, assists:3, minutes:1800, bigMatch:79, form:81, story:"TecrÃƒÂ¼beli santrfor, gÃƒÂ¼cÃƒÂ¼ ve attÃ„Â±Ã„Å¸Ã„Â± 8 kritik golle takÃ„Â±mÃ„Â±nÃ„Â±n gol yÃƒÂ¼kÃƒÂ¼nÃƒÂ¼ taÃ…Å¸Ã„Â±dÃ„Â±.", career:["Milan","Montpellier","Rennes","Torino","Adana Demirspor","Genclerbirligi"], strengths:["Fizik","Ã…Âut","Hava Topu"] },
  { name:"GÃƒÂ¶khan Akkan", team:"Genclerbirligi", position:"Kaleci", age:27, marketValue:2.0, goals:0, assists:0, minutes:2900, bigMatch:81, form:82, story:"Milli kaleci, GenÃƒÂ§lerbirliÃ„Å¸i'nin sÃƒÂ¼per lig dÃƒÂ¶nÃƒÂ¼Ã…Å¸ÃƒÂ¼nde kale ÃƒÂ§izgisinin gÃƒÂ¼vencesi oldu.", career:["GenÃƒÂ§lerbirliÃ„Å¸i","Hatayspor","Genclerbirligi"], strengths:["Refleks","Bire Bir","Liderlik"] },
  { name:"Dimitris Goutas", team:"Genclerbirligi", position:"Defans", age:27, marketValue:2.5, goals:2, assists:1, minutes:2800, bigMatch:82, form:83, story:"Yunan milli takÃ„Â±mÃ„Â±nÃ„Â±n tecrÃƒÂ¼beli stoperi, savunma liderliÃ„Å¸i ve hava topu gÃƒÂ¼cÃƒÂ¼yle GenÃƒÂ§lerbirliÃ„Å¸i'nin en deÃ„Å¸erli defans oyuncusu oldu.", career:["PAOK","Rangers","Genclerbirligi"], strengths:["GÃƒÂ¼ÃƒÂ§","Hava Topu","Liderlik"] },
  { name:"Zan Zuzek", team:"Genclerbirligi", position:"Defans", age:27, marketValue:2.5, goals:1, assists:2, minutes:2700, bigMatch:81, form:82, story:"Sloven milli takÃ„Â±mÃ„Â±nÃ„Â±n solak stoperi, topla ÃƒÂ§Ã„Â±kÃ„Â±Ã…Å¸ kalitesi ve saÃ„Å¸lam savunmasÃ„Â±yla ÃƒÂ¶ne ÃƒÂ§Ã„Â±ktÃ„Â±.", career:["Olimpija","Genclerbirligi"], strengths:["Pas","Savunma","Topla Ãƒâ€¡Ã„Â±kÃ„Â±Ã…Å¸"] },
  { name:"Oghenekaro Etebo", team:"Genclerbirligi", position:"Orta saha", age:30, marketValue:3.0, goals:4, assists:6, minutes:2700, bigMatch:83, form:84, story:"NijeryalÃ„Â± merkez orta saha, yÃ„Â±lmaz mÃƒÂ¼cadelesi ve fiziksel ÃƒÂ¼stÃƒÂ¼nlÃƒÂ¼Ã„Å¸ÃƒÂ¼yle GenÃƒÂ§lerbirliÃ„Å¸i'nin orta saha baskÃ„Â±sÃ„Â±nÃ„Â± oluÃ…Å¸turdu.", career:["Getafe","Stoke City","Genclerbirligi"], strengths:["Fizik","MÃƒÂ¼cadele","Top Kapma"] },
  { name:"Tom Dele-Bashiru", team:"Genclerbirligi", position:"Orta saha", age:25, marketValue:4.0, goals:5, assists:7, minutes:2600, bigMatch:84, form:85, story:"Ã„Â°ngiliz-NijeryalÃ„Â± yÃ„Â±ldÃ„Â±z aday, atletizmi ve maÃƒÂ§ etkisiyle GenÃƒÂ§lerbirliÃ„Å¸i'nin orta sahasÃ„Â±nÃ„Â± defalarca fark yarattÃ„Â±.", career:["Watford","Rangers","Genclerbirligi"], strengths:["Fizik","Dinamizm","BÃƒÂ¼yÃƒÂ¼k MaÃƒÂ§"] },
  { name:"Mbaye Niang", team:"Genclerbirligi", position:"Forvet", age:30, marketValue:1.5, goals:8, assists:3, minutes:2100, bigMatch:81, form:82, story:"FransÃ„Â±z-Senegalli golcÃƒÂ¼, AC Milan ve birÃƒÂ§ok bÃƒÂ¼yÃƒÂ¼k kulÃƒÂ¼pten geÃƒÂ§en tecrÃƒÂ¼be ile GenÃƒÂ§lerbirliÃ„Å¸i'nde gol yaÃ„Å¸muruna devam etti.", career:["AC Milan","Torino","Genclerbirligi"], strengths:["Bitiricilik","Fizik","TecrÃƒÂ¼be"] },
  { name:"SÃƒÂ©kou KoÃƒÂ¯ta", team:"Genclerbirligi", position:"Kanat", age:25, marketValue:3.0, goals:6, assists:9, minutes:2400, bigMatch:83, form:84, story:"Gine asÃ„Â±llÃ„Â± AvusturyalÃ„Â± hÃ„Â±zlÃ„Â± kanat yÃ„Â±ldÃ„Â±zÃ„Â±, Salzburg'un ardÃ„Â±ndan GenÃƒÂ§lerbirliÃ„Å¸i'nde kanatlarÃ„Â± ateÃ…Å¸ledi.", career:["Red Bull Salzburg","Genclerbirligi"], strengths:["HÃ„Â±z","Dribbling","Fizik"] },
  { name:"Pedro Pereira", team:"Genclerbirligi", position:"Defans", age:28, marketValue:2.0, goals:1, assists:4, minutes:2600, bigMatch:80, form:81, story:"Portekizli saÃ„Å¸ bek, hÃƒÂ¼cum katkÃ„Â±larÃ„Â± ve orta kalitesiyle GenÃƒÂ§lerbirliÃ„Å¸i'nin saÃ„Å¸ kulvarÃ„Â±nÃ„Â± hakimiyeti altÃ„Â±na aldÃ„Â±.", career:["Sporting CP","Genclerbirligi"], strengths:["HÃ„Â±z","Orta","HÃƒÂ¼cum KatÃ„Â±lÃ„Â±mÃ„Â±"] },
  { name:"Franco Tongya", team:"Genclerbirligi", position:"Orta saha", age:23, marketValue:3.0, goals:4, assists:7, minutes:2200, bigMatch:82, form:84, story:"FransÃ„Â±z-Ã„Â°talyan genÃƒÂ§ yetenekli oyuncu, Juventus akademisinden gelen Tongya, GenÃƒÂ§lerbirliÃ„Å¸i'nde sezonun en parlak yeni isimleri arasÃ„Â±na girdi.", career:["Juventus","Genclerbirligi"], strengths:["Teknik","YaratÃ„Â±cÃ„Â±lÃ„Â±k","Potansiyel"] },
  { name:"Amilton", team:"Genclerbirligi", position:"Defans", age:30, marketValue:0.6, goals:0, assists:2, minutes:1149, bigMatch:79, form:84, story:"2025-26 sezonunda takÃ„Â±mÃ„Â±nÃ„Â±n Defans bÃƒÂ¶lgesinde istikrarlÃ„Â± performansÃ„Â± ve kalitesiyle kadro derinliÃ„Å¸ine ÃƒÂ¶nemli katkÃ„Â± saÃ„Å¸ladÃ„Â±.", career:["Genclerbirligi"], strengths:["Markaj","Hava Topu"] },
  { name:"Aias Aosman", team:"Genclerbirligi", position:"Kaleci", age:28, marketValue:0.6, goals:1, assists:0, minutes:2382, bigMatch:71, form:72, story:"2025-26 sezonunda takÃ„Â±mÃ„Â±nÃ„Â±n Kaleci bÃƒÂ¶lgesinde istikrarlÃ„Â± performansÃ„Â± ve kalitesiyle kadro derinliÃ„Å¸ine ÃƒÂ¶nemli katkÃ„Â± saÃ„Å¸ladÃ„Â±.", career:["Genclerbirligi"], strengths:["Refleks","KurtarÃ„Â±Ã…Å¸"] },
  { name:"Metehan Mimaroglu", team:"Genclerbirligi", position:"Orta saha", age:21, marketValue:0.8, goals:2, assists:8, minutes:1550, bigMatch:81, form:73, story:"2025-26 sezonunda takÃ„Â±mÃ„Â±nÃ„Â±n Orta saha bÃƒÂ¶lgesinde istikrarlÃ„Â± performansÃ„Â± ve kalitesiyle kadro derinliÃ„Å¸ine ÃƒÂ¶nemli katkÃ„Â± saÃ„Å¸ladÃ„Â±.", career:["Genclerbirligi"], strengths:["Pas","Teknik"] },
  { name:"Sinan Kilic", team:"Genclerbirligi", position:"Kanat", age:28, marketValue:0.8, goals:5, assists:7, minutes:1287, bigMatch:73, form:85, story:"2025-26 sezonunda takÃ„Â±mÃ„Â±nÃ„Â±n Kanat bÃƒÂ¶lgesinde istikrarlÃ„Â± performansÃ„Â± ve kalitesiyle kadro derinliÃ„Å¸ine ÃƒÂ¶nemli katkÃ„Â± saÃ„Å¸ladÃ„Â±.", career:["Genclerbirligi"], strengths:["Pas","Teknik"] },
  { name:"Yasin Gureler", team:"Genclerbirligi", position:"Forvet", age:23, marketValue:1.3, goals:7, assists:2, minutes:2337, bigMatch:80, form:73, story:"2025-26 sezonunda takÃ„Â±mÃ„Â±nÃ„Â±n Forvet bÃƒÂ¶lgesinde istikrarlÃ„Â± performansÃ„Â± ve kalitesiyle kadro derinliÃ„Å¸ine ÃƒÂ¶nemli katkÃ„Â± saÃ„Å¸ladÃ„Â±.", career:["Genclerbirligi"], strengths:["Pas","Teknik"] },
  { name:"Alperen Babacan", team:"Genclerbirligi", position:"Forvet", age:31, marketValue:1.2, goals:11, assists:2, minutes:1359, bigMatch:77, form:75, story:"2025-26 sezonunda takÃ„Â±mÃ„Â±nÃ„Â±n Forvet bÃƒÂ¶lgesinde istikrarlÃ„Â± performansÃ„Â± ve kalitesiyle kadro derinliÃ„Å¸ine ÃƒÂ¶nemli katkÃ„Â± saÃ„Å¸ladÃ„Â±.", career:["Genclerbirligi"], strengths:["Pas","Teknik"] },
  { name:"Chukwuma Akabueze", team:"Genclerbirligi", position:"Forvet", age:20, marketValue:1.5, goals:9, assists:1, minutes:2107, bigMatch:75, form:87, story:"2025-26 sezonunda takÃ„Â±mÃ„Â±nÃ„Â±n Forvet bÃƒÂ¶lgesinde istikrarlÃ„Â± performansÃ„Â± ve kalitesiyle kadro derinliÃ„Å¸ine ÃƒÂ¶nemli katkÃ„Â± saÃ„Å¸ladÃ„Â±.", career:["Genclerbirligi"], strengths:["Pas","Teknik"] },
  { name:"James Adeniyi", team:"Genclerbirligi", position:"Forvet", age:33, marketValue:1.2, goals:3, assists:2, minutes:1460, bigMatch:72, form:87, story:"2025-26 sezonunda takÃ„Â±mÃ„Â±nÃ„Â±n Forvet bÃƒÂ¶lgesinde istikrarlÃ„Â± performansÃ„Â± ve kalitesiyle kadro derinliÃ„Å¸ine ÃƒÂ¶nemli katkÃ„Â± saÃ„Å¸ladÃ„Â±.", career:["Genclerbirligi"], strengths:["Pas","Teknik"] },
  { name:"Arda Caglayan", team:"Genclerbirligi", position:"Defans", age:24, marketValue:1.2, goals:2, assists:0, minutes:1818, bigMatch:73, form:82, story:"2025-26 sezonunda takÃ„Â±mÃ„Â±nÃ„Â±n Defans bÃƒÂ¶lgesinde istikrarlÃ„Â± performansÃ„Â± ve kalitesiyle kadro derinliÃ„Å¸ine ÃƒÂ¶nemli katkÃ„Â± saÃ„Å¸ladÃ„Â±.", career:["Genclerbirligi"], strengths:["Markaj","Hava Topu"] },
  { name:"Mustafa Yatabare", team:"Genclerbirligi", position:"Defans", age:21, marketValue:1.9, goals:0, assists:2, minutes:2163, bigMatch:75, form:78, story:"2025-26 sezonunda takÃ„Â±mÃ„Â±nÃ„Â±n Defans bÃƒÂ¶lgesinde istikrarlÃ„Â± performansÃ„Â± ve kalitesiyle kadro derinliÃ„Å¸ine ÃƒÂ¶nemli katkÃ„Â± saÃ„Å¸ladÃ„Â±.", career:["Genclerbirligi"], strengths:["Markaj","Hava Topu"] },
  { name:"Gokhan Tore", team:"Genclerbirligi", position:"Kaleci", age:20, marketValue:1.2, goals:1, assists:1, minutes:1677, bigMatch:74, form:74, story:"2025-26 sezonunda takÃ„Â±mÃ„Â±nÃ„Â±n Kaleci bÃƒÂ¶lgesinde istikrarlÃ„Â± performansÃ„Â± ve kalitesiyle kadro derinliÃ„Å¸ine ÃƒÂ¶nemli katkÃ„Â± saÃ„Å¸ladÃ„Â±.", career:["Genclerbirligi"], strengths:["Refleks","KurtarÃ„Â±Ã…Å¸"] },
  { name:"Mustafa Pektemek", team:"Genclerbirligi", position:"Forvet", age:28, marketValue:1.3, goals:11, assists:1, minutes:1801, bigMatch:76, form:82, story:"2025-26 sezonunda takÃ„Â±mÃ„Â±nÃ„Â±n Forvet bÃƒÂ¶lgesinde istikrarlÃ„Â± performansÃ„Â± ve kalitesiyle kadro derinliÃ„Å¸ine ÃƒÂ¶nemli katkÃ„Â± saÃ„Å¸ladÃ„Â±.", career:["Genclerbirligi"], strengths:["Pas","Teknik"] },
  { name:"Zeki Yildirim", team:"Genclerbirligi", position:"Kanat", age:27, marketValue:1.4, goals:6, assists:7, minutes:1880, bigMatch:84, form:74, story:"2025-26 sezonunda takÃ„Â±mÃ„Â±nÃ„Â±n Kanat bÃƒÂ¶lgesinde istikrarlÃ„Â± performansÃ„Â± ve kalitesiyle kadro derinliÃ„Å¸ine ÃƒÂ¶nemli katkÃ„Â± saÃ„Å¸ladÃ„Â±.", career:["Genclerbirligi"], strengths:["Pas","Teknik"] },
  { name:"Ozan Can", team:"Genclerbirligi", position:"Forvet", age:20, marketValue:0.9, goals:6, assists:2, minutes:1522, bigMatch:71, form:73, story:"2025-26 sezonunda takÃ„Â±mÃ„Â±nÃ„Â±n Forvet bÃƒÂ¶lgesinde istikrarlÃ„Â± performansÃ„Â± ve kalitesiyle kadro derinliÃ„Å¸ine ÃƒÂ¶nemli katkÃ„Â± saÃ„Å¸ladÃ„Â±.", career:["Genclerbirligi"], strengths:["Pas","Teknik"] },
  { name:"Andreas Gianniotis", team:"Kasimpasa", position:"Kaleci", age:33, marketValue:0.3, goals:0, assists:0, minutes:3200, bigMatch:82, form:81, story:"KasÃ„Â±mpaÃ…Å¸a kalesinde gÃƒÂ¶sterdiÃ„Å¸i reflekslerle kritik puanlar kazandÃ„Â±ran tecrÃƒÂ¼beli Yunan file bekÃƒÂ§isi.", career:["Olympiacos","Maccabi Tel Aviv","Kasimpasa"], strengths:["Refleks","KurtarÃ„Â±Ã…Å¸","Deneyim"] },
  { name:"Adrian Benedyczak", team:"Kasimpasa", position:"Forvet", age:25, marketValue:5.0, goals:11, assists:3, minutes:2200, bigMatch:80, form:82, story:"Parma'dan transfer edilen PolonyalÃ„Â± santrfor, 11 golle KasÃ„Â±mpaÃ…Å¸a'nÃ„Â±n en skorer ismi oldu.", career:["Pogon","Parma","Kasimpasa"], strengths:["Bitiricilik","Hava Topu","Fizik"] },
  { name:"Rodrigo BecÃƒÂ£o", team:"Kasimpasa", position:"Defans", age:29, marketValue:4.0, goals:3, assists:1, minutes:2900, bigMatch:84, form:85, story:"BrezilyalÃ„Â± gÃƒÂ¼ÃƒÂ§lÃƒÂ¼ stoper, Udinese ve FenerbahÃƒÂ§e geÃƒÂ§miÃ…Å¸iyle KasÃ„Â±mpaÃ…Å¸a savunmasÃ„Â±nÃ„Â±n en bÃƒÂ¼yÃƒÂ¼k ismi oldu.", career:["Udinese","FenerbahÃƒÂ§e","KasÃ„Â±mpaÃ…Å¸a"], strengths:["GÃƒÂ¼ÃƒÂ§","Hava Topu","Liderlik"] },
  { name:"Nicholas Opoku", team:"Kasimpasa", position:"Defans", age:27, marketValue:2.5, goals:1, assists:1, minutes:2700, bigMatch:82, form:83, story:"GanalÃ„Â± stoper, hava toplarÃ„Â±ndaki ÃƒÂ¼stÃƒÂ¼nlÃƒÂ¼Ã„Å¸ÃƒÂ¼ ve sert mÃƒÂ¼dahaleleriyle KasÃ„Â±mpaÃ…Å¸a'nÃ„Â±n geÃƒÂ§ilmez duvarÃ„Â± oldu.", career:["Amiens","Ãƒâ€¡eÃ…Å¸itli","KasÃ„Â±mpaÃ…Å¸a"], strengths:["GÃƒÂ¼ÃƒÂ§","Hava Topu","Markaj"] },
  { name:"Kerem Demirbay", team:"Kasimpasa", position:"Orta saha", age:32, marketValue:2.5, goals:4, assists:8, minutes:2600, bigMatch:84, form:84, story:"Alman milli takÃ„Â±mÃ„Â±nÃ„Â±n tecrÃƒÂ¼beli oyuncusu, tekniÃ„Å¸i ve duran top uzmanlÃ„Â±Ã„Å¸Ã„Â±yla KasÃ„Â±mpaÃ…Å¸a orta sahasÃ„Â±na Bundesliga kalitesi kattÃ„Â±.", career:["Bayer Leverkusen","KasÃ„Â±mpaÃ…Å¸a"], strengths:["Pas","Duran Top","Teknik"] },
  { name:"Haris HajradinoviÃ„â€¡", team:"Kasimpasa", position:"Orta saha", age:28, marketValue:2.0, goals:5, assists:6, minutes:2500, bigMatch:82, form:83, story:"BoÃ…Å¸nak yaratÃ„Â±cÃ„Â± orta saha, sol ayaÃ„Å¸Ã„Â±ndaki kaliteli vuruÃ…Å¸larÃ„Â± ve asistleriyle KasÃ„Â±mpaÃ…Å¸a hÃƒÂ¼cumunu yÃƒÂ¶netti.", career:["Ãƒâ€¡eÃ…Å¸itli","KasÃ„Â±mpaÃ…Å¸a"], strengths:["Teknik","Ã…Âut","YaratÃ„Â±cÃ„Â±lÃ„Â±k"] },
  { name:"Ã„Â°rfan Can Kahveci", team:"Kasimpasa", position:"Kanat", age:30, marketValue:4.0, goals:9, assists:7, minutes:2700, bigMatch:85, form:86, story:"Milli yÃ„Â±ldÃ„Â±z, KasÃ„Â±mpaÃ…Å¸a'ya transferiyle sezonun en etkili TÃƒÂ¼rk oyuncularÃ„Â±ndan biri olan Ã„Â°rfan Can, 16 skor katkÃ„Â±sÃ„Â±yla muhteÃ…Å¸em bir dÃƒÂ¶nem geÃƒÂ§irdi.", career:["BaÃ…Å¸akÃ…Å¸ehir","KasÃ„Â±mpaÃ…Å¸a"], strengths:["Dribbling","Ã…Âut","Gol Sezgisi"] },
  { name:"Cenk Tosun", team:"Kasimpasa", position:"Forvet", age:34, marketValue:2.0, goals:10, assists:3, minutes:2400, bigMatch:83, form:83, story:"TÃƒÂ¼rkiye'nin golcÃƒÂ¼ efsanesi, KasÃ„Â±mpaÃ…Å¸a'da 10 golle ligin en tecrÃƒÂ¼beli ve etkili santrforlarÃ„Â±ndan biri olmayÃ„Â± sÃƒÂ¼rdÃƒÂ¼rdÃƒÂ¼.", career:["Everton","BeÃ…Å¸iktaÃ…Å¸","KasÃ„Â±mpaÃ…Å¸a"], strengths:["Bitiricilik","Hava Topu","TecrÃƒÂ¼be"] },
  { name:"Fousseni DiabatÃƒÂ©", team:"Kasimpasa", position:"Kanat", age:28, marketValue:3.0, goals:7, assists:8, minutes:2500, bigMatch:83, form:84, story:"Malili hÃ„Â±zlÃ„Â± kanat, ÃƒÂ§evikliÃ„Å¸i ve kanat dripling kalitesiyle KasÃ„Â±mpaÃ…Å¸a saldÃ„Â±rÃ„Â±sÃ„Â±nÃ„Â± canlandÃ„Â±rdÃ„Â±.", career:["Sivasspor","KasÃ„Â±mpaÃ…Å¸a"], strengths:["HÃ„Â±z","Dribbling","Asist"] },
  { name:"Emre TaÃ…Å¸demir", team:"Kasimpasa", position:"Defans", age:29, marketValue:1.5, goals:0, assists:3, minutes:2600, bigMatch:80, form:81, story:"Milli sol bek, KasÃ„Â±mpaÃ…Å¸a'nÃ„Â±n sol kulvarÃ„Â±nda hem savunma hem hÃƒÂ¼cuma katkÃ„Â±yla gÃƒÂ¼venilir bir performans sergiledi.", career:["Alanyaspor","KasÃ„Â±mpaÃ…Å¸a"], strengths:["Savunma","HÃ„Â±z","Orta"] },
  { name:"Claudio Winck", team:"Kasimpasa", position:"Orta saha", age:20, marketValue:0.6, goals:2, assists:8, minutes:1846, bigMatch:77, form:86, story:"2025-26 sezonunda takÃ„Â±mÃ„Â±nÃ„Â±n Orta saha bÃƒÂ¶lgesinde istikrarlÃ„Â± performansÃ„Â± ve kalitesiyle kadro derinliÃ„Å¸ine ÃƒÂ¶nemli katkÃ„Â± saÃ„Å¸ladÃ„Â±.", career:["Kasimpasa"], strengths:["Pas","Teknik"] },
  { name:"Mamadou Fall", team:"Kasimpasa", position:"Kaleci", age:24, marketValue:0.5, goals:2, assists:2, minutes:1359, bigMatch:75, form:85, story:"2025-26 sezonunda takÃ„Â±mÃ„Â±nÃ„Â±n Kaleci bÃƒÂ¶lgesinde istikrarlÃ„Â± performansÃ„Â± ve kalitesiyle kadro derinliÃ„Å¸ine ÃƒÂ¶nemli katkÃ„Â± saÃ„Å¸ladÃ„Â±.", career:["Kasimpasa"], strengths:["Refleks","KurtarÃ„Â±Ã…Å¸"] },
  { name:"Mortadha Ben Ouanes", team:"Kasimpasa", position:"Kanat", age:23, marketValue:1.6, goals:5, assists:3, minutes:2375, bigMatch:81, form:80, story:"2025-26 sezonunda takÃ„Â±mÃ„Â±nÃ„Â±n Kanat bÃƒÂ¶lgesinde istikrarlÃ„Â± performansÃ„Â± ve kalitesiyle kadro derinliÃ„Å¸ine ÃƒÂ¶nemli katkÃ„Â± saÃ„Å¸ladÃ„Â±.", career:["Kasimpasa"], strengths:["Pas","Teknik"] },
  { name:"Iron Gomis", team:"Kasimpasa", position:"Kaleci", age:23, marketValue:2.8, goals:1, assists:0, minutes:2268, bigMatch:76, form:79, story:"2025-26 sezonunda takÃ„Â±mÃ„Â±nÃ„Â±n Kaleci bÃƒÂ¶lgesinde istikrarlÃ„Â± performansÃ„Â± ve kalitesiyle kadro derinliÃ„Å¸ine ÃƒÂ¶nemli katkÃ„Â± saÃ„Å¸ladÃ„Â±.", career:["Kasimpasa"], strengths:["Refleks","KurtarÃ„Â±Ã…Å¸"] },
  { name:"Nuno da Costa", team:"Kasimpasa", position:"Orta saha", age:25, marketValue:1.7, goals:0, assists:6, minutes:1998, bigMatch:83, form:71, story:"2025-26 sezonunda takÃ„Â±mÃ„Â±nÃ„Â±n Orta saha bÃƒÂ¶lgesinde istikrarlÃ„Â± performansÃ„Â± ve kalitesiyle kadro derinliÃ„Å¸ine ÃƒÂ¶nemli katkÃ„Â± saÃ„Å¸ladÃ„Â±.", career:["Kasimpasa"], strengths:["Pas","Teknik"] },
  { name:"Kenneth Omeruo", team:"Kasimpasa", position:"Kaleci", age:30, marketValue:1.9, goals:1, assists:1, minutes:1415, bigMatch:74, form:80, story:"2025-26 sezonunda takÃ„Â±mÃ„Â±nÃ„Â±n Kaleci bÃƒÂ¶lgesinde istikrarlÃ„Â± performansÃ„Â± ve kalitesiyle kadro derinliÃ„Å¸ine ÃƒÂ¶nemli katkÃ„Â± saÃ„Å¸ladÃ„Â±.", career:["Kasimpasa"], strengths:["Refleks","KurtarÃ„Â±Ã…Å¸"] },
  { name:"Sadik Ciftpinar", team:"Kasimpasa", position:"Kanat", age:27, marketValue:2.9, goals:7, assists:9, minutes:2185, bigMatch:70, form:81, story:"2025-26 sezonunda takÃ„Â±mÃ„Â±nÃ„Â±n Kanat bÃƒÂ¶lgesinde istikrarlÃ„Â± performansÃ„Â± ve kalitesiyle kadro derinliÃ„Å¸ine ÃƒÂ¶nemli katkÃ„Â± saÃ„Å¸ladÃ„Â±.", career:["Kasimpasa"], strengths:["Pas","Teknik"] },
  { name:"Gokhan Gul", team:"Kasimpasa", position:"Defans", age:26, marketValue:2.6, goals:1, assists:2, minutes:1049, bigMatch:82, form:73, story:"2025-26 sezonunda takÃ„Â±mÃ„Â±nÃ„Â±n Defans bÃƒÂ¶lgesinde istikrarlÃ„Â± performansÃ„Â± ve kalitesiyle kadro derinliÃ„Å¸ine ÃƒÂ¶nemli katkÃ„Â± saÃ„Å¸ladÃ„Â±.", career:["Kasimpasa"], strengths:["Markaj","Hava Topu"] },
  { name:"Loret Sadiku", team:"Kasimpasa", position:"Forvet", age:26, marketValue:1.0, goals:7, assists:2, minutes:1023, bigMatch:75, form:87, story:"2025-26 sezonunda takÃ„Â±mÃ„Â±nÃ„Â±n Forvet bÃƒÂ¶lgesinde istikrarlÃ„Â± performansÃ„Â± ve kalitesiyle kadro derinliÃ„Å¸ine ÃƒÂ¶nemli katkÃ„Â± saÃ„Å¸ladÃ„Â±.", career:["Kasimpasa"], strengths:["Pas","Teknik"] },
  { name:"Erdem Cetinkaya", team:"Kasimpasa", position:"Defans", age:24, marketValue:1.4, goals:1, assists:1, minutes:1561, bigMatch:84, form:83, story:"2025-26 sezonunda takÃ„Â±mÃ„Â±nÃ„Â±n Defans bÃƒÂ¶lgesinde istikrarlÃ„Â± performansÃ„Â± ve kalitesiyle kadro derinliÃ„Å¸ine ÃƒÂ¶nemli katkÃ„Â± saÃ„Å¸ladÃ„Â±.", career:["Kasimpasa"], strengths:["Markaj","Hava Topu"] },
  { name:"Taylan Utku", team:"Kasimpasa", position:"Forvet", age:22, marketValue:2.9, goals:7, assists:0, minutes:2289, bigMatch:78, form:83, story:"2025-26 sezonunda takÃ„Â±mÃ„Â±nÃ„Â±n Forvet bÃƒÂ¶lgesinde istikrarlÃ„Â± performansÃ„Â± ve kalitesiyle kadro derinliÃ„Å¸ine ÃƒÂ¶nemli katkÃ„Â± saÃ„Å¸ladÃ„Â±.", career:["Kasimpasa"], strengths:["Pas","Teknik"] },
  { name:"Ali Karakaya", team:"Kasimpasa", position:"Defans", age:30, marketValue:0.7, goals:0, assists:2, minutes:1527, bigMatch:74, form:70, story:"2025-26 sezonunda takÃ„Â±mÃ„Â±nÃ„Â±n Defans bÃƒÂ¶lgesinde istikrarlÃ„Â± performansÃ„Â± ve kalitesiyle kadro derinliÃ„Å¸ine ÃƒÂ¶nemli katkÃ„Â± saÃ„Å¸ladÃ„Â±.", career:["Kasimpasa"], strengths:["Markaj","Hava Topu"] },
  { name:"Yasin Ozcan", team:"Kasimpasa", position:"Forvet", age:24, marketValue:2.1, goals:3, assists:0, minutes:2108, bigMatch:81, form:81, story:"2025-26 sezonunda takÃ„Â±mÃ„Â±nÃ„Â±n Forvet bÃƒÂ¶lgesinde istikrarlÃ„Â± performansÃ„Â± ve kalitesiyle kadro derinliÃ„Å¸ine ÃƒÂ¶nemli katkÃ„Â± saÃ„Å¸ladÃ„Â±.", career:["Kasimpasa"], strengths:["Pas","Teknik"] },
  { name:"Onur ErdoÃ„Å¸an", team:"Kasimpasa", position:"Kanat", age:26, marketValue:2.4, goals:2, assists:6, minutes:1372, bigMatch:79, form:77, story:"Kadro derinliÃ„Å¸i ve rotasyonda teknik direktÃƒÂ¶rÃƒÂ¼n elini gÃƒÂ¼ÃƒÂ§lendiren, 2025-26 sezonu kadro oyuncusu.", career:["Kasimpasa"], strengths:["Pas","MÃƒÂ¼cadele"] },
  { name:"Alex Lopez", team:"Kasimpasa", position:"Kaleci", age:19, marketValue:3.2, goals:0, assists:0, minutes:869, bigMatch:79, form:73, story:"Kadro derinliÃ„Å¸i ve rotasyonda teknik direktÃƒÂ¶rÃƒÂ¼n elini gÃƒÂ¼ÃƒÂ§lendiren, 2025-26 sezonu kadro oyuncusu.", career:["Kasimpasa"], strengths:["Refleks","KurtarÃ„Â±Ã…Å¸"] },
  { name:"Aleksandar Jovanovic", team:"Kocaelispor", position:"Kaleci", age:33, marketValue:0.5, goals:0, assists:0, minutes:3100, bigMatch:82, form:83, story:"Kocaelispor'un tecrÃƒÂ¼beli SÃ„Â±rp kalecisi, kritik maÃƒÂ§lardaki kurtarÃ„Â±Ã…Å¸larÃ„Â±yla ligde kalmayÃ„Â± garantiledi.", career:["Aarhus","Apollon Limassol","Kocaelispor"], strengths:["Refleks","Deneyim","Hava Topu"] },
  { name:"Bruno Petkovic", team:"Kocaelispor", position:"Forvet", age:31, marketValue:1.5, goals:8, assists:4, minutes:2100, bigMatch:83, form:82, story:"Dinamo Zagreb'den transfer edilen HÃ„Â±rvat santrfor, gÃƒÂ¼ÃƒÂ§lÃƒÂ¼ fiziÃ„Å¸i, top saklama becerisi ve 8 golÃƒÂ¼yle takÃ„Â±mÃ„Â±nÃ„Â± taÃ…Å¸Ã„Â±dÃ„Â±.", career:["Bologna","Dinamo Zagreb","Kocaelispor"], strengths:["Top Saklama","Fizik","TecrÃƒÂ¼be"] },
  { name:"Anfernee Dijksteel", team:"Kocaelispor", position:"Defans", age:28, marketValue:2.5, goals:1, assists:3, minutes:2800, bigMatch:82, form:83, story:"HollandalÃ„Â± saÃ„Å¸ bek, Premier Lig tecrÃƒÂ¼besiyle Kocaelispor'un savunmasÃ„Â±na uluslararasÃ„Â± kalite kattÃ„Â±.", career:["Middlesbrough","Ãƒâ€¡eÃ…Å¸itli","Kocaelispor"], strengths:["HÃ„Â±z","Savunma","TecrÃƒÂ¼be"] },
  { name:"Hrvoje SmolÃ„ÂiÃ„â€¡", team:"Kocaelispor", position:"Defans", age:25, marketValue:3.0, goals:2, assists:1, minutes:2900, bigMatch:83, form:84, story:"HÃ„Â±rvat genÃƒÂ§ stoper, gÃƒÂ¼ÃƒÂ§lÃƒÂ¼ fiziÃ„Å¸i ve oyun zekasÃ„Â±yla Kocaelispor savunmasÃ„Â±nÃ„Â±n en deÃ„Å¸erli oyuncusu oldu.", career:["Rijeka","Kocaelispor"], strengths:["GÃƒÂ¼ÃƒÂ§","Hava Topu","Oyun ZekasÃ„Â±"] },
  { name:"Massadio HaÃƒÂ¯dara", team:"Kocaelispor", position:"Defans", age:32, marketValue:1.2, goals:0, assists:4, minutes:2600, bigMatch:80, form:80, story:"FransÃ„Â±z sol bek, hÃƒÂ¼cum katÃ„Â±lÃ„Â±mlarÃ„Â± ve tecrÃƒÂ¼besiyle Kocaelispor'un sol kulvarÃ„Â±na deÃ„Å¸er kattÃ„Â±.", career:["Newcastle","Metz","Kocaelispor"], strengths:["HÃ„Â±z","Orta","TecrÃƒÂ¼be"] },
  { name:"Karol Linetty", team:"Kocaelispor", position:"Orta saha", age:30, marketValue:3.0, goals:5, assists:7, minutes:2700, bigMatch:83, form:84, story:"PolonyalÃ„Â± milli takÃ„Â±m oyuncusu, pas kalitesi ve bÃƒÂ¼yÃƒÂ¼k maÃƒÂ§ tecrÃƒÂ¼besiyle Kocaelispor'un orta saha lideri oldu.", career:["Sampdoria","Torino","Kocaelispor"], strengths:["Pas","Oyun GÃƒÂ¶rÃƒÂ¼Ã…Å¸ÃƒÂ¼","BÃƒÂ¼yÃƒÂ¼k MaÃƒÂ§"] },
  { name:"Joseph Nonge", team:"Kocaelispor", position:"Orta saha", age:22, marketValue:3.0, goals:4, assists:6, minutes:2400, bigMatch:82, form:84, story:"BelÃƒÂ§ika asÃ„Â±llÃ„Â± genÃƒÂ§ yÃ„Â±ldÃ„Â±z, Dortmund akademisinden ÃƒÂ§Ã„Â±kma dinamik oyuncu Kocaelispor'da sezonun sÃƒÂ¼rprizi oldu.", career:["Borussia Dortmund","Kocaelispor"], strengths:["Dinamizm","Dribbling","Potansiyel"] },
  { name:"Serdar Dursun", team:"Kocaelispor", position:"Forvet", age:33, marketValue:1.5, goals:7, assists:3, minutes:2100, bigMatch:80, form:81, story:"Milli golcÃƒÂ¼, Kocaelispor'un sÃƒÂ¼per lig dÃƒÂ¶nÃƒÂ¼Ã…Å¸ÃƒÂ¼nde tecrÃƒÂ¼besiyle ÃƒÂ¶nemli gol katkÃ„Â±larÃ„Â± verdi.", career:["Darmstadt","FenerbahÃƒÂ§e","Kocaelispor"], strengths:["Bitiricilik","TecrÃƒÂ¼be","Hava Topu"] },
  { name:"Darko Churlinov", team:"Kocaelispor", position:"Kanat", age:24, marketValue:3.0, goals:6, assists:8, minutes:2500, bigMatch:83, form:85, story:"Kuzey MakedonyalÃ„Â± genÃƒÂ§ kanat yÃ„Â±ldÃ„Â±zÃ„Â±, hÃ„Â±zÃ„Â± ve dripling kalitesiyle Kocaelispor hÃƒÂ¼cumunu canlandÃ„Â±rdÃ„Â±.", career:["Schalke","Kocaelispor"], strengths:["HÃ„Â±z","Dribbling","Gol"] },
  { name:"Rigoberto Rivas", team:"Kocaelispor", position:"Kanat", age:25, marketValue:2.5, goals:5, assists:7, minutes:2300, bigMatch:82, form:83, story:"HonduraslÃ„Â± hÃ„Â±zlÃ„Â± kanat, rakipleri baskÃ„Â± altÃ„Â±na alarak sezon boyunca Kocaelispor hÃƒÂ¼cumuna ivme kattÃ„Â±.", career:["Werder Bremen","Kocaelispor"], strengths:["HÃ„Â±z","Dribbling","Fizik"] },
  { name:"Ryan Mendes", team:"Kocaelispor", position:"Kaleci", age:20, marketValue:0.5, goals:0, assists:1, minutes:1258, bigMatch:82, form:85, story:"2025-26 sezonunda takÃ„Â±mÃ„Â±nÃ„Â±n Kaleci bÃƒÂ¶lgesinde istikrarlÃ„Â± performansÃ„Â± ve kalitesiyle kadro derinliÃ„Å¸ine ÃƒÂ¶nemli katkÃ„Â± saÃ„Å¸ladÃ„Â±.", career:["Kocaelispor"], strengths:["Refleks","KurtarÃ„Â±Ã…Å¸"] },
  { name:"Marcao", team:"Kocaelispor", position:"Kanat", age:23, marketValue:1.4, goals:3, assists:5, minutes:1296, bigMatch:79, form:86, story:"2025-26 sezonunda takÃ„Â±mÃ„Â±nÃ„Â±n Kanat bÃƒÂ¶lgesinde istikrarlÃ„Â± performansÃ„Â± ve kalitesiyle kadro derinliÃ„Å¸ine ÃƒÂ¶nemli katkÃ„Â± saÃ„Å¸ladÃ„Â±.", career:["Kocaelispor"], strengths:["Pas","Teknik"] },
  { name:"Giorgi Kharaishvili", team:"Kocaelispor", position:"Defans", age:29, marketValue:1.7, goals:0, assists:1, minutes:1004, bigMatch:81, form:82, story:"2025-26 sezonunda takÃ„Â±mÃ„Â±nÃ„Â±n Defans bÃƒÂ¶lgesinde istikrarlÃ„Â± performansÃ„Â± ve kalitesiyle kadro derinliÃ„Å¸ine ÃƒÂ¶nemli katkÃ„Â± saÃ„Å¸ladÃ„Â±.", career:["Kocaelispor"], strengths:["Markaj","Hava Topu"] },
  { name:"Josip Vukovic", team:"Kocaelispor", position:"Kanat", age:28, marketValue:0.8, goals:6, assists:3, minutes:1974, bigMatch:77, form:82, story:"2025-26 sezonunda takÃ„Â±mÃ„Â±nÃ„Â±n Kanat bÃƒÂ¶lgesinde istikrarlÃ„Â± performansÃ„Â± ve kalitesiyle kadro derinliÃ„Å¸ine ÃƒÂ¶nemli katkÃ„Â± saÃ„Å¸ladÃ„Â±.", career:["Kocaelispor"], strengths:["Pas","Teknik"] },
  { name:"Aaron Appindangoye", team:"Kocaelispor", position:"Kanat", age:32, marketValue:2.1, goals:4, assists:7, minutes:1324, bigMatch:71, form:70, story:"2025-26 sezonunda takÃ„Â±mÃ„Â±nÃ„Â±n Kanat bÃƒÂ¶lgesinde istikrarlÃ„Â± performansÃ„Â± ve kalitesiyle kadro derinliÃ„Å¸ine ÃƒÂ¶nemli katkÃ„Â± saÃ„Å¸ladÃ„Â±.", career:["Kocaelispor"], strengths:["Pas","Teknik"] },
  { name:"Caner Osmanpasa", team:"Kocaelispor", position:"Kaleci", age:28, marketValue:1.1, goals:1, assists:0, minutes:1199, bigMatch:83, form:86, story:"2025-26 sezonunda takÃ„Â±mÃ„Â±nÃ„Â±n Kaleci bÃƒÂ¶lgesinde istikrarlÃ„Â± performansÃ„Â± ve kalitesiyle kadro derinliÃ„Å¸ine ÃƒÂ¶nemli katkÃ„Â± saÃ„Å¸ladÃ„Â±.", career:["Kocaelispor"], strengths:["Refleks","KurtarÃ„Â±Ã…Å¸"] },
  { name:"Ahmet Oguz", team:"Kocaelispor", position:"Defans", age:33, marketValue:1.0, goals:1, assists:1, minutes:2187, bigMatch:81, form:70, story:"2025-26 sezonunda takÃ„Â±mÃ„Â±nÃ„Â±n Defans bÃƒÂ¶lgesinde istikrarlÃ„Â± performansÃ„Â± ve kalitesiyle kadro derinliÃ„Å¸ine ÃƒÂ¶nemli katkÃ„Â± saÃ„Å¸ladÃ„Â±.", career:["Kocaelispor"], strengths:["Markaj","Hava Topu"] },
  { name:"Baris AlÃ„Â±cÃ„Â±", team:"Kocaelispor", position:"Defans", age:24, marketValue:1.6, goals:2, assists:0, minutes:1529, bigMatch:79, form:70, story:"2025-26 sezonunda takÃ„Â±mÃ„Â±nÃ„Â±n Defans bÃƒÂ¶lgesinde istikrarlÃ„Â± performansÃ„Â± ve kalitesiyle kadro derinliÃ„Å¸ine ÃƒÂ¶nemli katkÃ„Â± saÃ„Å¸ladÃ„Â±.", career:["Kocaelispor"], strengths:["Markaj","Hava Topu"] },
  { name:"Yusuf AbdioÃ„Å¸lu", team:"Kocaelispor", position:"Kanat", age:30, marketValue:1.3, goals:7, assists:5, minutes:1669, bigMatch:73, form:70, story:"2025-26 sezonunda takÃ„Â±mÃ„Â±nÃ„Â±n Kanat bÃƒÂ¶lgesinde istikrarlÃ„Â± performansÃ„Â± ve kalitesiyle kadro derinliÃ„Å¸ine ÃƒÂ¶nemli katkÃ„Â± saÃ„Å¸ladÃ„Â±.", career:["Kocaelispor"], strengths:["Pas","Teknik"] },
  { name:"Harun Tekin", team:"Kocaelispor", position:"Kanat", age:27, marketValue:0.8, goals:11, assists:7, minutes:1591, bigMatch:78, form:81, story:"2025-26 sezonunda takÃ„Â±mÃ„Â±nÃ„Â±n Kanat bÃƒÂ¶lgesinde istikrarlÃ„Â± performansÃ„Â± ve kalitesiyle kadro derinliÃ„Å¸ine ÃƒÂ¶nemli katkÃ„Â± saÃ„Å¸ladÃ„Â±.", career:["Kocaelispor"], strengths:["Pas","Teknik"] },
  { name:"Cem Ekinci", team:"Kocaelispor", position:"Kanat", age:22, marketValue:0.8, goals:4, assists:5, minutes:2490, bigMatch:73, form:86, story:"2025-26 sezonunda takÃ„Â±mÃ„Â±nÃ„Â±n Kanat bÃƒÂ¶lgesinde istikrarlÃ„Â± performansÃ„Â± ve kalitesiyle kadro derinliÃ„Å¸ine ÃƒÂ¶nemli katkÃ„Â± saÃ„Å¸ladÃ„Â±.", career:["Kocaelispor"], strengths:["Pas","Teknik"] },
  { name:"Mehmet Yilmaz", team:"Kocaelispor", position:"Kaleci", age:30, marketValue:2.4, goals:0, assists:2, minutes:1186, bigMatch:84, form:82, story:"2025-26 sezonunda takÃ„Â±mÃ„Â±nÃ„Â±n Kaleci bÃƒÂ¶lgesinde istikrarlÃ„Â± performansÃ„Â± ve kalitesiyle kadro derinliÃ„Å¸ine ÃƒÂ¶nemli katkÃ„Â± saÃ„Å¸ladÃ„Â±.", career:["Kocaelispor"], strengths:["Refleks","KurtarÃ„Â±Ã…Å¸"] },
  { name:"Yusuf Cihat", team:"Kocaelispor", position:"Forvet", age:23, marketValue:1.8, goals:6, assists:2, minutes:1604, bigMatch:78, form:86, story:"2025-26 sezonunda takÃ„Â±mÃ„Â±nÃ„Â±n Forvet bÃƒÂ¶lgesinde istikrarlÃ„Â± performansÃ„Â± ve kalitesiyle kadro derinliÃ„Å¸ine ÃƒÂ¶nemli katkÃ„Â± saÃ„Å¸ladÃ„Â±.", career:["Kocaelispor"], strengths:["Pas","Teknik"] },
  { name:"Mesut Can", team:"Kocaelispor", position:"Kanat", age:23, marketValue:2.2, goals:11, assists:7, minutes:2181, bigMatch:74, form:85, story:"2025-26 sezonunda takÃ„Â±mÃ„Â±nÃ„Â±n Kanat bÃƒÂ¶lgesinde istikrarlÃ„Â± performansÃ„Â± ve kalitesiyle kadro derinliÃ„Å¸ine ÃƒÂ¶nemli katkÃ„Â± saÃ„Å¸ladÃ„Â±.", career:["Kocaelispor"], strengths:["Pas","Teknik"] },
  { name:"Tarkan Serbest", team:"Kocaelispor", position:"Kanat", age:32, marketValue:1.0, goals:10, assists:3, minutes:1558, bigMatch:78, form:82, story:"2025-26 sezonunda takÃ„Â±mÃ„Â±nÃ„Â±n Kanat bÃƒÂ¶lgesinde istikrarlÃ„Â± performansÃ„Â± ve kalitesiyle kadro derinliÃ„Å¸ine ÃƒÂ¶nemli katkÃ„Â± saÃ„Å¸ladÃ„Â±.", career:["Kocaelispor"], strengths:["Pas","Teknik"] },
  { name:"Guilherme Sitya", team:"Konyaspor", position:"Defans", age:36, marketValue:0.2, goals:1, assists:6, minutes:2800, bigMatch:80, form:81, story:"Konyaspor'un tecrÃƒÂ¼beli sol beki ve kaptanÃ„Â±, duran toplardaki ustalÃ„Â±Ã„Å¸Ã„Â± ve 6 asistiyle yine fark yarattÃ„Â±.", career:["Jagiellonia","Konyaspor"], strengths:["Orta","Duran Top","TecrÃƒÂ¼be"] },
  { name:"Jackson Muleka", team:"Konyaspor", position:"Forvet", age:26, marketValue:2.8, goals:10, assists:3, minutes:2400, bigMatch:82, form:83, story:"Konyaspor'un hÃƒÂ¼cum hattÃ„Â±nÃ„Â± hareketlendiren Muleka, attÃ„Â±Ã„Å¸Ã„Â± 10 golle ligde kalma yolunda kritik katkÃ„Â±lar saÃ„Å¸ladÃ„Â±.", career:["Mazembe","Standard Liege","Kasimpasa","Besiktas","Konyaspor"], strengths:["HÃ„Â±z","MÃƒÂ¼cadele","Bitiricilik"] },
  { name:"Deniz ErtaÃ…Å¸", team:"Konyaspor", position:"Kaleci", age:26, marketValue:1.2, goals:0, assists:0, minutes:3100, bigMatch:80, form:81, story:"GenÃƒÂ§ TÃƒÂ¼rk kaleci, Konyaspor kalesinde olgunlaÃ…Å¸arak sezonun en gÃƒÂ¼venilir file bekÃƒÂ§ilerinden biri olmaya yÃƒÂ¼kseldi.", career:["Kayserispor","Konyaspor"], strengths:["Refleks","Bire Bir","Liderlik"] },
  { name:"Josip Ã„Å’alusiÃ„â€¡", team:"Konyaspor", position:"Defans", age:32, marketValue:1.0, goals:1, assists:2, minutes:2800, bigMatch:80, form:80, story:"TecrÃƒÂ¼beli HÃ„Â±rvat saÃ„Å¸ bek, savunma disiplini ve deney birikimini Konyaspor'a taÃ…Å¸Ã„Â±dÃ„Â±.", career:["Ãƒâ€¡eÃ…Å¸itli HÃ„Â±rvat","Konyaspor"], strengths:["Savunma","TecrÃƒÂ¼be","Disiplin"] },
  { name:"Adamo Nagalo", team:"Konyaspor", position:"Defans", age:26, marketValue:1.8, goals:2, assists:0, minutes:2900, bigMatch:81, form:82, story:"Burkina Fasolu stoper, fiziksel gÃƒÂ¼cÃƒÂ¼ ve hava toplarÃ„Â±ndaki ÃƒÂ¼stÃƒÂ¼nlÃƒÂ¼Ã„Å¸ÃƒÂ¼yle Konyaspor savunmasÃ„Â±nÃ„Â±n kilit taÃ…Å¸Ã„Â± oldu.", career:["Ãƒâ€¡eÃ…Å¸itli","Konyaspor"], strengths:["Fizik","Hava Topu","GÃƒÂ¼ÃƒÂ§"] },
  { name:"Enis Bardhi", team:"Konyaspor", position:"Orta saha", age:30, marketValue:3.0, goals:7, assists:10, minutes:2800, bigMatch:85, form:86, story:"Kuzey Makedonya'nÃ„Â±n yÃ„Â±ldÃ„Â±z oyuncusu, serbest vuruÃ…Å¸ ustasÃ„Â± ve 17 skor katkÃ„Â±sÃ„Â±yla sezonun en etkileyici isimlerinden biri oldu.", career:["Levante","Konyaspor"], strengths:["Duran Top","Ã…Âut","Oyun GÃƒÂ¶rÃƒÂ¼Ã…Å¸ÃƒÂ¼"] },
  { name:"Riechedly Bazoer", team:"Konyaspor", position:"Orta saha", age:28, marketValue:2.5, goals:4, assists:6, minutes:2600, bigMatch:83, form:84, story:"HollandalÃ„Â± defansif orta saha, top kapma ve iÃ…Å¸ gÃƒÂ¼cÃƒÂ¼yle Konyaspor'un orta saha motorunu oluÃ…Å¸turdu.", career:["Ajax","Porto","Konyaspor"], strengths:["Top Kapma","Dinamizm","Pas"] },
  { name:"Deniz TÃƒÂ¼rÃƒÂ¼ÃƒÂ§", team:"Konyaspor", position:"Kanat", age:29, marketValue:2.0, goals:6, assists:8, minutes:2500, bigMatch:82, form:83, story:"Milli kanat oyuncusu, ÃƒÂ§evikliÃ„Å¸i ve asistleriyle Konyaspor'un hÃƒÂ¼cum vektÃƒÂ¶rÃƒÂ¼ydÃƒÂ¼.", career:["BaÃ…Å¸akÃ…Å¸ehir","Konyaspor"], strengths:["HÃ„Â±z","Dribbling","Asist"] },
  { name:"Blaz Kramer", team:"Konyaspor", position:"Forvet", age:28, marketValue:2.0, goals:8, assists:2, minutes:2200, bigMatch:81, form:82, story:"Sloven santrfor, fiziksel oyunu ve gol iÃƒÂ§gÃƒÂ¼dÃƒÂ¼sÃƒÂ¼yle Muleka'nÃ„Â±n mÃƒÂ¼kemmel forvetteki ortaÃ„Å¸Ã„Â± oldu.", career:["Olimpija","Ãƒâ€¡eÃ…Å¸itli","Konyaspor"], strengths:["Hava Topu","Bitiricilik","GÃƒÂ¼ÃƒÂ§"] },
  { name:"Diogo GonÃƒÂ§alves", team:"Konyaspor", position:"Kanat", age:28, marketValue:2.5, goals:5, assists:9, minutes:2400, bigMatch:83, form:84, story:"Portekizli kanat, tekniÃ„Å¸i ve sol ayaÃ„Å¸Ã„Â±ndaki kalitesiyle Konyaspor'un en tehlikeli oyuncularÃ„Â±ndan biri oldu.", career:["Benfica","PAOK","Konyaspor"], strengths:["Teknik","Dribbling","Asist"] },
  { name:"Danijel Aleksic", team:"Konyaspor", position:"Orta saha", age:26, marketValue:1.4, goals:1, assists:5, minutes:2389, bigMatch:74, form:79, story:"2025-26 sezonunda takÃ„Â±mÃ„Â±nÃ„Â±n Orta saha bÃƒÂ¶lgesinde istikrarlÃ„Â± performansÃ„Â± ve kalitesiyle kadro derinliÃ„Å¸ine ÃƒÂ¶nemli katkÃ„Â± saÃ„Å¸ladÃ„Â±.", career:["Konyaspor"], strengths:["Pas","Teknik"] },
  { name:"Yusuf Erdogan", team:"Konyaspor", position:"Orta saha", age:26, marketValue:2.9, goals:1, assists:7, minutes:1195, bigMatch:83, form:75, story:"2025-26 sezonunda takÃ„Â±mÃ„Â±nÃ„Â±n Orta saha bÃƒÂ¶lgesinde istikrarlÃ„Â± performansÃ„Â± ve kalitesiyle kadro derinliÃ„Å¸ine ÃƒÂ¶nemli katkÃ„Â± saÃ„Å¸ladÃ„Â±.", career:["Konyaspor"], strengths:["Pas","Teknik"] },
  { name:"Umut Nayir", team:"Konyaspor", position:"Kanat", age:22, marketValue:1.8, goals:4, assists:2, minutes:1451, bigMatch:73, form:76, story:"2025-26 sezonunda takÃ„Â±mÃ„Â±nÃ„Â±n Kanat bÃƒÂ¶lgesinde istikrarlÃ„Â± performansÃ„Â± ve kalitesiyle kadro derinliÃ„Å¸ine ÃƒÂ¶nemli katkÃ„Â± saÃ„Å¸ladÃ„Â±.", career:["Konyaspor"], strengths:["Pas","Teknik"] },
  { name:"Louka Prip", team:"Konyaspor", position:"Orta saha", age:21, marketValue:1.9, goals:2, assists:9, minutes:1248, bigMatch:76, form:81, story:"2025-26 sezonunda takÃ„Â±mÃ„Â±nÃ„Â±n Orta saha bÃƒÂ¶lgesinde istikrarlÃ„Â± performansÃ„Â± ve kalitesiyle kadro derinliÃ„Å¸ine ÃƒÂ¶nemli katkÃ„Â± saÃ„Å¸ladÃ„Â±.", career:["Konyaspor"], strengths:["Pas","Teknik"] },
  { name:"Filip Damjanovic", team:"Konyaspor", position:"Kanat", age:33, marketValue:2.8, goals:4, assists:2, minutes:2357, bigMatch:76, form:84, story:"2025-26 sezonunda takÃ„Â±mÃ„Â±nÃ„Â±n Kanat bÃƒÂ¶lgesinde istikrarlÃ„Â± performansÃ„Â± ve kalitesiyle kadro derinliÃ„Å¸ine ÃƒÂ¶nemli katkÃ„Â± saÃ„Å¸ladÃ„Â±.", career:["Konyaspor"], strengths:["Pas","Teknik"] },
  { name:"Ugurcan Yazgili", team:"Konyaspor", position:"Forvet", age:24, marketValue:1.4, goals:4, assists:2, minutes:2250, bigMatch:71, form:81, story:"2025-26 sezonunda takÃ„Â±mÃ„Â±nÃ„Â±n Forvet bÃƒÂ¶lgesinde istikrarlÃ„Â± performansÃ„Â± ve kalitesiyle kadro derinliÃ„Å¸ine ÃƒÂ¶nemli katkÃ„Â± saÃ„Å¸ladÃ„Â±.", career:["Konyaspor"], strengths:["Pas","Teknik"] },
  { name:"Yasir Subasi", team:"Konyaspor", position:"Kaleci", age:33, marketValue:0.9, goals:0, assists:2, minutes:1582, bigMatch:78, form:73, story:"2025-26 sezonunda takÃ„Â±mÃ„Â±nÃ„Â±n Kaleci bÃƒÂ¶lgesinde istikrarlÃ„Â± performansÃ„Â± ve kalitesiyle kadro derinliÃ„Å¸ine ÃƒÂ¶nemli katkÃ„Â± saÃ„Å¸ladÃ„Â±.", career:["Konyaspor"], strengths:["Refleks","KurtarÃ„Â±Ã…Å¸"] },
  { name:"Adil Demirbag", team:"Konyaspor", position:"Defans", age:20, marketValue:0.9, goals:1, assists:1, minutes:1847, bigMatch:79, form:77, story:"2025-26 sezonunda takÃ„Â±mÃ„Â±nÃ„Â±n Defans bÃƒÂ¶lgesinde istikrarlÃ„Â± performansÃ„Â± ve kalitesiyle kadro derinliÃ„Å¸ine ÃƒÂ¶nemli katkÃ„Â± saÃ„Å¸ladÃ„Â±.", career:["Konyaspor"], strengths:["Markaj","Hava Topu"] },
  { name:"Jakub Slowik", team:"Konyaspor", position:"Forvet", age:24, marketValue:2.5, goals:9, assists:0, minutes:1998, bigMatch:73, form:83, story:"2025-26 sezonunda takÃ„Â±mÃ„Â±nÃ„Â±n Forvet bÃƒÂ¶lgesinde istikrarlÃ„Â± performansÃ„Â± ve kalitesiyle kadro derinliÃ„Å¸ine ÃƒÂ¶nemli katkÃ„Â± saÃ„Å¸ladÃ„Â±.", career:["Konyaspor"], strengths:["Pas","Teknik"] },
  { name:"Emmanuel Boateng", team:"Konyaspor", position:"Kanat", age:30, marketValue:1.3, goals:9, assists:9, minutes:1069, bigMatch:77, form:81, story:"2025-26 sezonunda takÃ„Â±mÃ„Â±nÃ„Â±n Kanat bÃƒÂ¶lgesinde istikrarlÃ„Â± performansÃ„Â± ve kalitesiyle kadro derinliÃ„Å¸ine ÃƒÂ¶nemli katkÃ„Â± saÃ„Å¸ladÃ„Â±.", career:["Konyaspor"], strengths:["Pas","Teknik"] },
  { name:"Alassane Ndao", team:"Konyaspor", position:"Kaleci", age:32, marketValue:2.3, goals:2, assists:0, minutes:1656, bigMatch:81, form:74, story:"2025-26 sezonunda takÃ„Â±mÃ„Â±nÃ„Â±n Kaleci bÃƒÂ¶lgesinde istikrarlÃ„Â± performansÃ„Â± ve kalitesiyle kadro derinliÃ„Å¸ine ÃƒÂ¶nemli katkÃ„Â± saÃ„Å¸ladÃ„Â±.", career:["Konyaspor"], strengths:["Refleks","KurtarÃ„Â±Ã…Å¸"] },
  { name:"Marlos Moreno", team:"Konyaspor", position:"Defans", age:29, marketValue:3.0, goals:0, assists:2, minutes:1145, bigMatch:76, form:75, story:"2025-26 sezonunda takÃ„Â±mÃ„Â±nÃ„Â±n Defans bÃƒÂ¶lgesinde istikrarlÃ„Â± performansÃ„Â± ve kalitesiyle kadro derinliÃ„Å¸ine ÃƒÂ¶nemli katkÃ„Â± saÃ„Å¸ladÃ„Â±.", career:["Konyaspor"], strengths:["Markaj","Hava Topu"] },
  { name:"Niko Rak", team:"Konyaspor", position:"Kanat", age:33, marketValue:1.0, goals:6, assists:2, minutes:1513, bigMatch:76, form:76, story:"2025-26 sezonunda takÃ„Â±mÃ„Â±nÃ„Â±n Kanat bÃƒÂ¶lgesinde istikrarlÃ„Â± performansÃ„Â± ve kalitesiyle kadro derinliÃ„Å¸ine ÃƒÂ¶nemli katkÃ„Â± saÃ„Å¸ladÃ„Â±.", career:["Konyaspor"], strengths:["Pas","Teknik"] },
  { name:"Sokol Cikalleshi", team:"Konyaspor", position:"Kanat", age:25, marketValue:1.2, goals:3, assists:2, minutes:2231, bigMatch:73, form:73, story:"2025-26 sezonunda takÃ„Â±mÃ„Â±nÃ„Â±n Kanat bÃƒÂ¶lgesinde istikrarlÃ„Â± performansÃ„Â± ve kalitesiyle kadro derinliÃ„Å¸ine ÃƒÂ¶nemli katkÃ„Â± saÃ„Å¸ladÃ„Â±.", career:["Konyaspor"], strengths:["Pas","Teknik"] },
  { name:"Melih Ibrahim", team:"Konyaspor", position:"Orta saha", age:27, marketValue:1.3, goals:1, assists:8, minutes:2071, bigMatch:76, form:79, story:"2025-26 sezonunda takÃ„Â±mÃ„Â±nÃ„Â±n Orta saha bÃƒÂ¶lgesinde istikrarlÃ„Â± performansÃ„Â± ve kalitesiyle kadro derinliÃ„Å¸ine ÃƒÂ¶nemli katkÃ„Â± saÃ„Å¸ladÃ„Â±.", career:["Konyaspor"], strengths:["Pas","Teknik"] },
  { name:"Yahia Fofana", team:"Rizespor", position:"Kaleci", age:25, marketValue:5.0, goals:0, assists:0, minutes:3200, bigMatch:84, form:85, story:"Angers'den Rizespor'a gelen kaleci, gÃƒÂ¶sterdiÃ„Å¸i performansla piyasa deÃ„Å¸erini 5 milyon Euro'ya ÃƒÂ§Ã„Â±kardÃ„Â±.", career:["Le Havre","Angers","Rizespor"], strengths:["KurtarÃ„Â±Ã…Å¸","Fizik","Clean Sheet"] },
  { name:"Ibrahim Olawoyin", team:"Rizespor", position:"Orta saha", age:28, marketValue:2.2, goals:8, assists:5, minutes:2600, bigMatch:82, form:84, story:"Rizespor orta sahasÃ„Â±nda hem savunmaya yardÃ„Â±m eden hem de 8 gol, 5 asistle hÃƒÂ¼cumu sÃ„Â±rtlayan kilit oyuncu.", career:["Ankara KeÃƒÂ§iÃƒÂ¶rengÃƒÂ¼cÃƒÂ¼","Rizespor"], strengths:["DayanÃ„Â±klÃ„Â±lÃ„Â±k","Dribbling","MÃƒÂ¼cadele"] },
  { name:"Attila Mocsi", team:"Rizespor", position:"Defans", age:29, marketValue:1.5, goals:1, assists:2, minutes:2700, bigMatch:79, form:80, story:"Macar saÃ„Å¸ bek, saÃ„Å¸ kulvarda hem savunma hem hÃƒÂ¼cuma katkÃ„Â± saÃ„Å¸layan ÃƒÂ§alÃ„Â±Ã…Å¸kan oyuncu.", career:["HonvÃƒÂ©d","Rizespor"], strengths:["Savunma","Ãƒâ€¡alÃ„Â±Ã…Å¸kanlÃ„Â±k","HÃ„Â±z"] },
  { name:"Modibo Sagnan", team:"Rizespor", position:"Defans", age:28, marketValue:1.8, goals:2, assists:0, minutes:2900, bigMatch:81, form:82, story:"FransÃ„Â±z stoper, gÃƒÂ¼ÃƒÂ§lÃƒÂ¼ fiziÃ„Å¸i ve markaj ustalÃ„Â±Ã„Å¸Ã„Â±yla Rizespor savunmasÃ„Â±nÃ„Â±n en kritik ismi oldu.", career:["Grenoble","NÃƒÂ®mes","Rizespor"], strengths:["Fizik","Markaj","Hava Topu"] },
  { name:"Casper HÃƒÂ¸jer Nielsen", team:"Rizespor", position:"Defans", age:25, marketValue:2.0, goals:0, assists:3, minutes:2600, bigMatch:80, form:81, story:"DanimarkalÃ„Â± sol bek, modern bek anlayÃ„Â±Ã…Å¸Ã„Â±yla hem savunma hem hÃƒÂ¼cuma katkÃ„Â±da bulunan kaliteli oyuncu.", career:["Silkeborg","Rizespor"], strengths:["HÃ„Â±z","Orta","Teknik"] },
  { name:"Ã„Â°brahim Olawoyin", team:"Rizespor", position:"Orta saha", age:27, marketValue:2.5, goals:8, assists:5, minutes:2800, bigMatch:83, form:84, story:"NijeryalÃ„Â± orta saha, Rizespor'un dinamosu; hem gol hem asist ÃƒÂ¼retimiyle ligin en etkili box-to-box oyuncularÃ„Â±ndan.", career:["Konyaspor","Rizespor"], strengths:["Dinamizm","Gol","Top Kapma"] },
  { name:"Qazim Laci", team:"Rizespor", position:"Orta saha", age:28, marketValue:2.0, goals:4, assists:6, minutes:2500, bigMatch:82, form:83, story:"Arnavut milli takÃ„Â±mÃ„Â±nÃ„Â±n yaratÃ„Â±cÃ„Â± merkez oyuncusu, Rizespor'da ustalÃ„Â±klÃ„Â± paslarÃ„Â± ve geniÃ…Å¸ saha gÃƒÂ¶rÃƒÂ¼Ã…Å¸ÃƒÂ¼yle ÃƒÂ¶ne ÃƒÂ§Ã„Â±ktÃ„Â±.", career:["Partizani","Legia","Rizespor"], strengths:["Pas","Oyun GÃƒÂ¶rÃƒÂ¼Ã…Å¸ÃƒÂ¼","YaratÃ„Â±cÃ„Â±lÃ„Â±k"] },
  { name:"Taylan AntalyalÃ„Â±", team:"Rizespor", position:"Orta saha", age:28, marketValue:2.5, goals:2, assists:4, minutes:2700, bigMatch:82, form:83, story:"Galatasaray'Ã„Â±n deÃ„Å¸erli yetiÃ…Å¸tirmesi milli oyuncu, Rizespor'da defansif orta sahada kilit rol ÃƒÂ¼stlendi.", career:["Galatasaray","Rizespor"], strengths:["Top Kapma","Pas","Liderlik"] },
  { name:"Halil DerviÃ…Å¸oÃ„Å¸lu", team:"Rizespor", position:"Forvet", age:26, marketValue:3.0, goals:9, assists:3, minutes:2400, bigMatch:83, form:84, story:"A Milli TakÃ„Â±m golcÃƒÂ¼sÃƒÂ¼, Rizespor'da 9 golle sezonun en etkili TÃƒÂ¼rk forvetlerinden biri olduÃ„Å¸unu kanÃ„Â±tladÃ„Â±.", career:["Galatasaray","Brentford","Rizespor"], strengths:["Bitiricilik","HÃ„Â±z","Gol Sezgisi"] },
  { name:"Ali Sowe", team:"Rizespor", position:"Forvet", age:25, marketValue:2.5, goals:11, assists:4, minutes:2600, bigMatch:84, form:85, story:"GambiyalÃ„Â± golcÃƒÂ¼, patlayÃ„Â±cÃ„Â± oyun tarzÃ„Â± ve 11 golle Rizespor'un sezonun en deÃ„Å¸erli bombacÃ„Â±sÃ„Â± oldu.", career:["Viborg","Sivasspor","Rizespor"], strengths:["HÃ„Â±z","Bitiricilik","Fizik"] },
  { name:"Valentin Mihaila", team:"Rizespor", position:"Kanat", age:25, marketValue:3.0, goals:6, assists:8, minutes:2300, bigMatch:83, form:84, story:"Rumen milli takÃ„Â±mÃ„Â±nÃ„Â±n parlayan yÃ„Â±ldÃ„Â±zÃ„Â±, hÃ„Â±zÃ„Â± ve 1'e 1 ÃƒÂ¼stÃƒÂ¼nlÃƒÂ¼Ã„Å¸ÃƒÂ¼yle Rizespor kanatlarÃ„Â±nÃ„Â± ateÃ…Å¸ledi.", career:["Parma","Atalanta","Rizespor"], strengths:["HÃ„Â±z","Dribbling","Gol"] },
  { name:"Martin Minchev", team:"Rizespor", position:"Orta saha", age:27, marketValue:1.7, goals:1, assists:7, minutes:1366, bigMatch:70, form:81, story:"2025-26 sezonunda takÃ„Â±mÃ„Â±nÃ„Â±n Orta saha bÃƒÂ¶lgesinde istikrarlÃ„Â± performansÃ„Â± ve kalitesiyle kadro derinliÃ„Å¸ine ÃƒÂ¶nemli katkÃ„Â± saÃ„Å¸ladÃ„Â±.", career:["Rizespor"], strengths:["Pas","Teknik"] },
  { name:"David Akintola", team:"Rizespor", position:"Defans", age:33, marketValue:0.7, goals:2, assists:2, minutes:1056, bigMatch:79, form:82, story:"2025-26 sezonunda takÃ„Â±mÃ„Â±nÃ„Â±n Defans bÃƒÂ¶lgesinde istikrarlÃ„Â± performansÃ„Â± ve kalitesiyle kadro derinliÃ„Å¸ine ÃƒÂ¶nemli katkÃ„Â± saÃ„Å¸ladÃ„Â±.", career:["Rizespor"], strengths:["Markaj","Hava Topu"] },
  { name:"Benhur Keser", team:"Rizespor", position:"Orta saha", age:25, marketValue:1.2, goals:1, assists:3, minutes:1989, bigMatch:73, form:79, story:"2025-26 sezonunda takÃ„Â±mÃ„Â±nÃ„Â±n Orta saha bÃƒÂ¶lgesinde istikrarlÃ„Â± performansÃ„Â± ve kalitesiyle kadro derinliÃ„Å¸ine ÃƒÂ¶nemli katkÃ„Â± saÃ„Å¸ladÃ„Â±.", career:["Rizespor"], strengths:["Pas","Teknik"] },
  { name:"Amir Hadziahmetovic", team:"Rizespor", position:"Orta saha", age:31, marketValue:2.1, goals:0, assists:8, minutes:2492, bigMatch:77, form:87, story:"2025-26 sezonunda takÃ„Â±mÃ„Â±nÃ„Â±n Orta saha bÃƒÂ¶lgesinde istikrarlÃ„Â± performansÃ„Â± ve kalitesiyle kadro derinliÃ„Å¸ine ÃƒÂ¶nemli katkÃ„Â± saÃ„Å¸ladÃ„Â±.", career:["Rizespor"], strengths:["Pas","Teknik"] },
  { name:"Giannis Papanikolaou", team:"Rizespor", position:"Orta saha", age:29, marketValue:3.2, goals:1, assists:9, minutes:2344, bigMatch:80, form:78, story:"2025-26 sezonunda takÃ„Â±mÃ„Â±nÃ„Â±n Orta saha bÃƒÂ¶lgesinde istikrarlÃ„Â± performansÃ„Â± ve kalitesiyle kadro derinliÃ„Å¸ine ÃƒÂ¶nemli katkÃ„Â± saÃ„Å¸ladÃ„Â±.", career:["Rizespor"], strengths:["Pas","Teknik"] },
  { name:"Husniddin Aliqulov", team:"Rizespor", position:"Defans", age:28, marketValue:3.0, goals:0, assists:2, minutes:1391, bigMatch:75, form:78, story:"2025-26 sezonunda takÃ„Â±mÃ„Â±nÃ„Â±n Defans bÃƒÂ¶lgesinde istikrarlÃ„Â± performansÃ„Â± ve kalitesiyle kadro derinliÃ„Å¸ine ÃƒÂ¶nemli katkÃ„Â± saÃ„Å¸ladÃ„Â±.", career:["Rizespor"], strengths:["Markaj","Hava Topu"] },
  { name:"Casper Hojer", team:"Rizespor", position:"Forvet", age:29, marketValue:3.3, goals:6, assists:1, minutes:2218, bigMatch:75, form:86, story:"2025-26 sezonunda takÃ„Â±mÃ„Â±nÃ„Â±n Forvet bÃƒÂ¶lgesinde istikrarlÃ„Â± performansÃ„Â± ve kalitesiyle kadro derinliÃ„Å¸ine ÃƒÂ¶nemli katkÃ„Â± saÃ„Å¸ladÃ„Â±.", career:["Rizespor"], strengths:["Pas","Teknik"] },
  { name:"Khusniddin Alikulov", team:"Rizespor", position:"Defans", age:32, marketValue:0.7, goals:2, assists:2, minutes:2273, bigMatch:83, form:75, story:"2025-26 sezonunda takÃ„Â±mÃ„Â±nÃ„Â±n Defans bÃƒÂ¶lgesinde istikrarlÃ„Â± performansÃ„Â± ve kalitesiyle kadro derinliÃ„Å¸ine ÃƒÂ¶nemli katkÃ„Â± saÃ„Å¸ladÃ„Â±.", career:["Rizespor"], strengths:["Markaj","Hava Topu"] },
  { name:"Muhammed Taha", team:"Rizespor", position:"Orta saha", age:20, marketValue:1.9, goals:0, assists:3, minutes:1186, bigMatch:81, form:80, story:"2025-26 sezonunda takÃ„Â±mÃ„Â±nÃ„Â±n Orta saha bÃƒÂ¶lgesinde istikrarlÃ„Â± performansÃ„Â± ve kalitesiyle kadro derinliÃ„Å¸ine ÃƒÂ¶nemli katkÃ„Â± saÃ„Å¸ladÃ„Â±.", career:["Rizespor"], strengths:["Pas","Teknik"] },
  { name:"Efe Tecimer", team:"Rizespor", position:"Kanat", age:31, marketValue:1.1, goals:7, assists:8, minutes:1188, bigMatch:81, form:73, story:"2025-26 sezonunda takÃ„Â±mÃ„Â±nÃ„Â±n Kanat bÃƒÂ¶lgesinde istikrarlÃ„Â± performansÃ„Â± ve kalitesiyle kadro derinliÃ„Å¸ine ÃƒÂ¶nemli katkÃ„Â± saÃ„Å¸ladÃ„Â±.", career:["Rizespor"], strengths:["Pas","Teknik"] },
  { name:"Mithat Pala", team:"Rizespor", position:"Orta saha", age:20, marketValue:1.2, goals:0, assists:2, minutes:1086, bigMatch:77, form:83, story:"2025-26 sezonunda takÃ„Â±mÃ„Â±nÃ„Â±n Orta saha bÃƒÂ¶lgesinde istikrarlÃ„Â± performansÃ„Â± ve kalitesiyle kadro derinliÃ„Å¸ine ÃƒÂ¶nemli katkÃ„Â± saÃ„Å¸ladÃ„Â±.", career:["Rizespor"], strengths:["Pas","Teknik"] },
  { name:"Emrecan Bulut", team:"Rizespor", position:"Defans", age:20, marketValue:0.9, goals:0, assists:2, minutes:2213, bigMatch:80, form:79, story:"2025-26 sezonunda takÃ„Â±mÃ„Â±nÃ„Â±n Defans bÃƒÂ¶lgesinde istikrarlÃ„Â± performansÃ„Â± ve kalitesiyle kadro derinliÃ„Å¸ine ÃƒÂ¶nemli katkÃ„Â± saÃ„Å¸ladÃ„Â±.", career:["Rizespor"], strengths:["Markaj","Hava Topu"] },
  { name:"Pinchi", team:"Rizespor", position:"Kanat", age:27, marketValue:2.2, goals:9, assists:8, minutes:1304, bigMatch:75, form:84, story:"2025-26 sezonunda takÃ„Â±mÃ„Â±nÃ„Â±n Kanat bÃƒÂ¶lgesinde istikrarlÃ„Â± performansÃ„Â± ve kalitesiyle kadro derinliÃ„Å¸ine ÃƒÂ¶nemli katkÃ„Â± saÃ„Å¸ladÃ„Â±.", career:["Rizespor"], strengths:["Pas","Teknik"] },
  { name:"Oumar Diouf", team:"Rizespor", position:"Forvet", age:24, marketValue:2.7, goals:8, assists:1, minutes:2210, bigMatch:71, form:73, story:"2025-26 sezonunda takÃ„Â±mÃ„Â±nÃ„Â±n Forvet bÃƒÂ¶lgesinde istikrarlÃ„Â± performansÃ„Â± ve kalitesiyle kadro derinliÃ„Å¸ine ÃƒÂ¶nemli katkÃ„Â± saÃ„Å¸ladÃ„Â±.", career:["Rizespor"], strengths:["Pas","Teknik"] },
  { name:"Ivo GrbiÃ„â€¡", team:"Karagumruk", position:"Kaleci", age:28, marketValue:2.0, goals:0, assists:0, minutes:2800, bigMatch:81, form:82, story:"HÃ„Â±rvat kaleci, Atletico Madrid ve Sheffield United geÃƒÂ§miÃ…Å¸iyle KaragÃƒÂ¼mrÃƒÂ¼k kalesinde uluslararasÃ„Â± kalite sergiledi.", career:["Atletico Madrid","Sheffield United","Karagumruk"], strengths:["Refleks","Bire Bir","KurtarÃ„Â±Ã…Å¸"] },
  { name:"Igor Lichnovsky", team:"Karagumruk", position:"Defans", age:31, marketValue:1.5, goals:2, assists:1, minutes:2700, bigMatch:81, form:82, story:"Ã…Âili milli takÃ„Â±mÃ„Â±nÃ„Â±n tecrÃƒÂ¼beli stoperi, KaragÃƒÂ¼mrÃƒÂ¼k savunmasÃ„Â±nda liderlik ve disiplin getirdi.", career:["Cruz Azul","Ãƒâ€¡eÃ…Å¸itli","Karagumruk"], strengths:["GÃƒÂ¼ÃƒÂ§","Liderlik","TecrÃƒÂ¼be"] },
  { name:"Filip MladenoviÃ„â€¡", team:"Karagumruk", position:"Defans", age:33, marketValue:1.0, goals:1, assists:5, minutes:2600, bigMatch:80, form:80, story:"SÃ„Â±rp sol bek, tecrÃƒÂ¼besi ve hÃƒÂ¼cum katkÃ„Â±sÃ„Â±yla KaragÃƒÂ¼mrÃƒÂ¼k sol kulvarÃ„Â±nÃ„Â± uzun sÃƒÂ¼redir yÃƒÂ¶netmektedir.", career:["PAOK","Legia","Karagumruk"], strengths:["TecrÃƒÂ¼be","Orta","Savunma"] },
  { name:"Ricardo Esgaio", team:"Karagumruk", position:"Defans", age:32, marketValue:1.5, goals:0, assists:4, minutes:2500, bigMatch:80, form:81, story:"Portekizli saÃ„Å¸ bek, Sporting CP geÃƒÂ§miÃ…Å¸iyle KaragÃƒÂ¼mrÃƒÂ¼k'ÃƒÂ¼n saÃ„Å¸ kulvarÃ„Â±nÃ„Â± yÃƒÂ¶netti.", career:["Sporting CP","Braga","Karagumruk"], strengths:["HÃ„Â±z","Savunma","Orta"] },
  { name:"Matias Kranevitter", team:"Karagumruk", position:"Orta saha", age:33, marketValue:1.5, goals:3, assists:5, minutes:2600, bigMatch:82, form:82, story:"Arjantinli defensive orta saha, Atletico Madrid ve Zenit geÃƒÂ§miÃ…Å¸iyle KaragÃƒÂ¼mrÃƒÂ¼k'ÃƒÂ¼n oyun merkezi oldu.", career:["Atletico Madrid","Zenit","Karagumruk"], strengths:["Top Kapma","Pas","TecrÃƒÂ¼be"] },
  { name:"Berkay Ãƒâ€“zcan", team:"Karagumruk", position:"Orta saha", age:27, marketValue:3.0, goals:5, assists:8, minutes:2700, bigMatch:84, form:85, story:"StuttgartlÃ„Â± TÃƒÂ¼rk milli takÃ„Â±m oyuncusu, tekniÃ„Å¸i ve oyun gÃƒÂ¶rÃƒÂ¼Ã…Å¸ÃƒÂ¼yle KaragÃƒÂ¼mrÃƒÂ¼k'ÃƒÂ¼n kilit yaratÃ„Â±cÃ„Â±sÃ„Â± oldu.", career:["Stuttgart","BaÃ…Å¸akÃ…Å¸ehir","Karagumruk"], strengths:["Teknik","Pas","Oyun GÃƒÂ¶rÃƒÂ¼Ã…Å¸ÃƒÂ¼"] },
  { name:"Daniele Verde", team:"Karagumruk", position:"Orta saha", age:28, marketValue:3.0, goals:6, assists:7, minutes:2500, bigMatch:83, form:84, story:"Ã„Â°talyan yaratÃ„Â±cÃ„Â± oyuncu, teknik kalitesi ve serbest vuruÃ…Å¸ ustalÃ„Â±Ã„Å¸Ã„Â±yla KaragÃƒÂ¼mrÃƒÂ¼k'ÃƒÂ¼n en ÃƒÂ¶nemli silahlarÃ„Â±ndan biri oldu.", career:["Ãƒâ€¡eÃ…Å¸itli Ã„Â°talya","Karagumruk"], strengths:["Teknik","Duran Top","Ã…Âut"] },
  { name:"David Datro Fofana", team:"Karagumruk", position:"Forvet", age:23, marketValue:5.0, goals:11, assists:3, minutes:2500, bigMatch:85, form:86, story:"Chelsea'den kiralÃ„Â±k FildiÃ…Å¸i Sahilli genÃƒÂ§ golcÃƒÂ¼, 11 golle ligin en dikkat ÃƒÂ§ekici genÃƒÂ§lerinden biri oldu.", career:["Molde","Chelsea","Karagumruk"], strengths:["HÃ„Â±z","Bitiricilik","Fizik"] },
  { name:"Sam Larsson", team:"Karagumruk", position:"Kanat", age:31, marketValue:2.0, goals:5, assists:8, minutes:2300, bigMatch:81, form:82, story:"Ã„Â°sveÃƒÂ§li milli takÃ„Â±m kanadÃ„Â±, tecrÃƒÂ¼besi ve teknik gÃƒÂ¼cÃƒÂ¼yle KaragÃƒÂ¼mrÃƒÂ¼k hÃƒÂ¼cumunu besleyen kritik isim oldu.", career:["Feyenoord","Ãƒâ€¡eÃ…Å¸itli","Karagumruk"], strengths:["Teknik","Asist","TecrÃƒÂ¼be"] },
  { name:"Tiago Ãƒâ€¡ukur", team:"Karagumruk", position:"Forvet", age:20, marketValue:4.0, goals:7, assists:2, minutes:2000, bigMatch:82, form:84, story:"FenerbahÃƒÂ§e akademisinden ÃƒÂ§Ã„Â±kan TÃƒÂ¼rk-Alman genÃƒÂ§ golcÃƒÂ¼, KaragÃƒÂ¼mrÃƒÂ¼k'te SÃƒÂ¼per Lig'de patlayÃ„Â±cÃ„Â± bir ilk sezon geÃƒÂ§irdi.", career:["FenerbahÃƒÂ§e","Karagumruk"], strengths:["HÃ„Â±z","Bitiricilik","Potansiyel"] },
  { name:"Valentin Eysseric", team:"Karagumruk", position:"Kaleci", age:32, marketValue:1.5, goals:2, assists:1, minutes:2210, bigMatch:73, form:77, story:"2025-26 sezonunda takÃ„Â±mÃ„Â±nÃ„Â±n Kaleci bÃƒÂ¶lgesinde istikrarlÃ„Â± performansÃ„Â± ve kalitesiyle kadro derinliÃ„Å¸ine ÃƒÂ¶nemli katkÃ„Â± saÃ„Å¸ladÃ„Â±.", career:["Karagumruk"], strengths:["Refleks","KurtarÃ„Â±Ã…Å¸"] },
  { name:"Lasse Schone", team:"Karagumruk", position:"Orta saha", age:30, marketValue:2.7, goals:0, assists:9, minutes:1989, bigMatch:81, form:86, story:"2025-26 sezonunda takÃ„Â±mÃ„Â±nÃ„Â±n Orta saha bÃƒÂ¶lgesinde istikrarlÃ„Â± performansÃ„Â± ve kalitesiyle kadro derinliÃ„Å¸ine ÃƒÂ¶nemli katkÃ„Â± saÃ„Å¸ladÃ„Â±.", career:["Karagumruk"], strengths:["Pas","Teknik"] },
  { name:"Adnan Ugur", team:"Karagumruk", position:"Kaleci", age:29, marketValue:2.7, goals:0, assists:1, minutes:1114, bigMatch:75, form:74, story:"2025-26 sezonunda takÃ„Â±mÃ„Â±nÃ„Â±n Kaleci bÃƒÂ¶lgesinde istikrarlÃ„Â± performansÃ„Â± ve kalitesiyle kadro derinliÃ„Å¸ine ÃƒÂ¶nemli katkÃ„Â± saÃ„Å¸ladÃ„Â±.", career:["Karagumruk"], strengths:["Refleks","KurtarÃ„Â±Ã…Å¸"] },
  { name:"Levent Mercan", team:"Karagumruk", position:"Kanat", age:25, marketValue:0.8, goals:9, assists:4, minutes:2260, bigMatch:71, form:78, story:"2025-26 sezonunda takÃ„Â±mÃ„Â±nÃ„Â±n Kanat bÃƒÂ¶lgesinde istikrarlÃ„Â± performansÃ„Â± ve kalitesiyle kadro derinliÃ„Å¸ine ÃƒÂ¶nemli katkÃ„Â± saÃ„Å¸ladÃ„Â±.", career:["Karagumruk"], strengths:["Pas","Teknik"] },
  { name:"Davide Biraschi", team:"Karagumruk", position:"Forvet", age:32, marketValue:3.0, goals:11, assists:1, minutes:1071, bigMatch:83, form:86, story:"2025-26 sezonunda takÃ„Â±mÃ„Â±nÃ„Â±n Forvet bÃƒÂ¶lgesinde istikrarlÃ„Â± performansÃ„Â± ve kalitesiyle kadro derinliÃ„Å¸ine ÃƒÂ¶nemli katkÃ„Â± saÃ„Å¸ladÃ„Â±.", career:["Karagumruk"], strengths:["Pas","Teknik"] },
  { name:"Federico Ceccherini", team:"Karagumruk", position:"Defans", age:22, marketValue:0.8, goals:0, assists:0, minutes:1317, bigMatch:82, form:74, story:"2025-26 sezonunda takÃ„Â±mÃ„Â±nÃ„Â±n Defans bÃƒÂ¶lgesinde istikrarlÃ„Â± performansÃ„Â± ve kalitesiyle kadro derinliÃ„Å¸ine ÃƒÂ¶nemli katkÃ„Â± saÃ„Å¸ladÃ„Â±.", career:["Karagumruk"], strengths:["Markaj","Hava Topu"] },
  { name:"Flavio Paoletti", team:"Karagumruk", position:"Orta saha", age:31, marketValue:2.0, goals:2, assists:9, minutes:2120, bigMatch:80, form:70, story:"2025-26 sezonunda takÃ„Â±mÃ„Â±nÃ„Â±n Orta saha bÃƒÂ¶lgesinde istikrarlÃ„Â± performansÃ„Â± ve kalitesiyle kadro derinliÃ„Å¸ine ÃƒÂ¶nemli katkÃ„Â± saÃ„Å¸ladÃ„Â±.", career:["Karagumruk"], strengths:["Pas","Teknik"] },
  { name:"Sofiane Feghouli", team:"Karagumruk", position:"Orta saha", age:22, marketValue:2.9, goals:0, assists:7, minutes:1747, bigMatch:71, form:82, story:"2025-26 sezonunda takÃ„Â±mÃ„Â±nÃ„Â±n Orta saha bÃƒÂ¶lgesinde istikrarlÃ„Â± performansÃ„Â± ve kalitesiyle kadro derinliÃ„Å¸ine ÃƒÂ¶nemli katkÃ„Â± saÃ„Å¸ladÃ„Â±.", career:["Karagumruk"], strengths:["Pas","Teknik"] },
  { name:"Ryan Mendes", team:"Karagumruk", position:"Orta saha", age:25, marketValue:0.9, goals:0, assists:7, minutes:2327, bigMatch:77, form:70, story:"2025-26 sezonunda takÃ„Â±mÃ„Â±nÃ„Â±n Orta saha bÃƒÂ¶lgesinde istikrarlÃ„Â± performansÃ„Â± ve kalitesiyle kadro derinliÃ„Å¸ine ÃƒÂ¶nemli katkÃ„Â± saÃ„Å¸ladÃ„Â±.", career:["Karagumruk"], strengths:["Pas","Teknik"] },
  { name:"Kevin Lasagna", team:"Karagumruk", position:"Kanat", age:33, marketValue:0.5, goals:6, assists:9, minutes:1424, bigMatch:83, form:79, story:"2025-26 sezonunda takÃ„Â±mÃ„Â±nÃ„Â±n Kanat bÃƒÂ¶lgesinde istikrarlÃ„Â± performansÃ„Â± ve kalitesiyle kadro derinliÃ„Å¸ine ÃƒÂ¶nemli katkÃ„Â± saÃ„Å¸ladÃ„Â±.", career:["Karagumruk"], strengths:["Pas","Teknik"] },
  { name:"Koray Gunter", team:"Karagumruk", position:"Orta saha", age:32, marketValue:1.0, goals:1, assists:3, minutes:1286, bigMatch:78, form:73, story:"2025-26 sezonunda takÃ„Â±mÃ„Â±nÃ„Â±n Orta saha bÃƒÂ¶lgesinde istikrarlÃ„Â± performansÃ„Â± ve kalitesiyle kadro derinliÃ„Å¸ine ÃƒÂ¶nemli katkÃ„Â± saÃ„Å¸ladÃ„Â±.", career:["Karagumruk"], strengths:["Pas","Teknik"] },
  { name:"Emre Mor", team:"Karagumruk", position:"Defans", age:33, marketValue:1.4, goals:0, assists:0, minutes:2063, bigMatch:73, form:84, story:"2025-26 sezonunda takÃ„Â±mÃ„Â±nÃ„Â±n Defans bÃƒÂ¶lgesinde istikrarlÃ„Â± performansÃ„Â± ve kalitesiyle kadro derinliÃ„Å¸ine ÃƒÂ¶nemli katkÃ„Â± saÃ„Å¸ladÃ„Â±.", career:["Karagumruk"], strengths:["Markaj","Hava Topu"] },
  { name:"Salih Dursun", team:"Karagumruk", position:"Kaleci", age:26, marketValue:1.7, goals:2, assists:0, minutes:2169, bigMatch:79, form:81, story:"2025-26 sezonunda takÃ„Â±mÃ„Â±nÃ„Â±n Kaleci bÃƒÂ¶lgesinde istikrarlÃ„Â± performansÃ„Â± ve kalitesiyle kadro derinliÃ„Å¸ine ÃƒÂ¶nemli katkÃ„Â± saÃ„Å¸ladÃ„Â±.", career:["Karagumruk"], strengths:["Refleks","KurtarÃ„Â±Ã…Å¸"] },
  { name:"Gven Yalcn", team:"Karagumruk", position:"Defans", age:28, marketValue:0.9, goals:2, assists:2, minutes:1403, bigMatch:71, form:74, story:"2025-26 sezonunda takÃ„Â±mÃ„Â±nÃ„Â±n Defans bÃƒÂ¶lgesinde istikrarlÃ„Â± performansÃ„Â± ve kalitesiyle kadro derinliÃ„Å¸ine ÃƒÂ¶nemli katkÃ„Â± saÃ„Å¸ladÃ„Â±.", career:["Karagumruk"], strengths:["Markaj","Hava Topu"] },
  { name:"Can Keles", team:"Karagumruk", position:"Defans", age:26, marketValue:2.1, goals:2, assists:0, minutes:1990, bigMatch:76, form:77, story:"2025-26 sezonunda takÃ„Â±mÃ„Â±nÃ„Â±n Defans bÃƒÂ¶lgesinde istikrarlÃ„Â± performansÃ„Â± ve kalitesiyle kadro derinliÃ„Å¸ine ÃƒÂ¶nemli katkÃ„Â± saÃ„Å¸ladÃ„Â±.", career:["Karagumruk"], strengths:["Markaj","Hava Topu"] },
  { name:"Bilal BayazÃ„Â±t", team:"Kayserispor", position:"Kaleci", age:28, marketValue:2.0, goals:0, assists:0, minutes:3000, bigMatch:81, form:82, story:"Ã„Â°sveÃƒÂ§ milli takÃ„Â±mÃ„Â±nÃ„Â±n genÃƒÂ§ kalecisi, Kayserispor'da olaÃ„Å¸anÃƒÂ¼stÃƒÂ¼ kurtarÃ„Â±Ã…Å¸larla takÃ„Â±mÃ„Â±n puan toplamasÃ„Â±na ÃƒÂ¶nemli katkÃ„Â± saÃ„Å¸ladÃ„Â±.", career:["Ãƒâ€¡eÃ…Å¸itli","Kayserispor"], strengths:["Refleks","Bire Bir","KurtarÃ„Â±Ã…Å¸"] },
  { name:"Stefano Denswil", team:"Kayserispor", position:"Defans", age:31, marketValue:2.0, goals:1, assists:2, minutes:2800, bigMatch:81, form:82, story:"HollandalÃ„Â± stoper, Club Brugge ve Inter geÃƒÂ§miÃ…Å¸iyle Kayserispor'un savunmasÃ„Â±na ÃƒÂ¼st dÃƒÂ¼zey kalite kattÃ„Â±.", career:["Club Brugge","Bologna","Kayserispor"], strengths:["GÃƒÂ¼ÃƒÂ§","Hava Topu","TecrÃƒÂ¼be"] },
  { name:"Majid Hosseini", team:"Kayserispor", position:"Defans", age:26, marketValue:2.5, goals:2, assists:1, minutes:2700, bigMatch:82, form:83, story:"Ã„Â°ranlÃ„Â± genÃƒÂ§ stoper, gÃƒÂ¼ÃƒÂ§lÃƒÂ¼ fiziÃ„Å¸i ve topaklÃ„Â±k yeteneÃ„Å¸iyle Kayserispor'un en deÃ„Å¸erli defans oyuncularÃ„Â±ndan biri oldu.", career:["Ãƒâ€¡eÃ…Å¸itli","Kayserispor"], strengths:["GÃƒÂ¼ÃƒÂ§","Markaj","Fizik"] },
  { name:"LÃƒÂ¡szlÃƒÂ³ BÃƒÂ©nes", team:"Kayserispor", position:"Orta saha", age:28, marketValue:3.0, goals:5, assists:8, minutes:2700, bigMatch:84, form:85, story:"Slovakya milli takÃ„Â±mÃ„Â±nÃ„Â±n kilit oyuncusu, teknik kalitesi ve pas vizyonuyla Kayserispor'un oyun kurucusu oldu.", career:["Borussia MG","Hamburger SV","Kayserispor"], strengths:["Pas","Teknik","Oyun GÃƒÂ¶rÃƒÂ¼Ã…Å¸ÃƒÂ¼"] },
  { name:"Youssef AÃƒÂ¯t Bennasser", team:"Kayserispor", position:"Orta saha", age:28, marketValue:2.5, goals:3, assists:5, minutes:2500, bigMatch:82, form:83, story:"FaslÃ„Â± milli oyuncu, orta sahada disiplin ve kalitesiyle Kayserispor'a Avrupa seviyesi getirdi.", career:["Nantes","Kayserispor"], strengths:["Top Kapma","Pas","Dinamizm"] },
  { name:"Dorukhan TokÃƒÂ¶z", team:"Kayserispor", position:"Orta saha", age:30, marketValue:2.0, goals:4, assists:6, minutes:2400, bigMatch:82, form:83, story:"Milli oyuncu, BeÃ…Å¸iktaÃ…Å¸'tan sonra Kayserispor'da merkez orta sahada liderlik rolÃƒÂ¼ ÃƒÂ¼stlendi.", career:["BeÃ…Å¸iktaÃ…Å¸","Kayserispor"], strengths:["Pas","Liderlik","Top Kapma"] },
  { name:"Miguel Cardoso", team:"Kayserispor", position:"Forvet", age:24, marketValue:4.0, goals:13, assists:5, minutes:2700, bigMatch:85, form:86, story:"Portekizli genÃƒÂ§ golcÃƒÂ¼, 13 golle sezonun en sÃƒÂ¼rpriz ismi olarak Kayserispor'u neredeyse tek baÃ…Å¸Ã„Â±na taÃ…Å¸Ã„Â±dÃ„Â±.", career:["Benfica","Kayserispor"], strengths:["HÃ„Â±z","Bitiricilik","Teknik"] },
  { name:"Carlos ManÃƒÂ©", team:"Kayserispor", position:"Kanat", age:33, marketValue:2.0, goals:6, assists:7, minutes:2200, bigMatch:82, form:82, story:"TecrÃƒÂ¼beli Gine-Bissaulu kanat, bireysel kalitesi ve gol katkÃ„Â±sÃ„Â±yla Kayserispor hÃƒÂ¼cumuna farklÃ„Â± bir boyut kattÃ„Â±.", career:["Sporting CP","RB Leipzig","Kayserispor"], strengths:["HÃ„Â±z","Dribbling","Teknik"] },
  { name:"Sam Mather", team:"Kayserispor", position:"Orta saha", age:22, marketValue:2.0, goals:3, assists:5, minutes:2000, bigMatch:80, form:82, story:"Ã„Â°ngiliz genÃƒÂ§ orta saha, Manchester United akademisinden gelen Mather, Kayserispor'da SÃƒÂ¼per Lig deneyimi kazandÃ„Â±.", career:["Manchester United","Kayserispor"], strengths:["Dinamizm","Potansiyel","Teknik"] },
  { name:"Joshua Brenet", team:"Kayserispor", position:"Defans", age:30, marketValue:1.5, goals:0, assists:4, minutes:2600, bigMatch:80, form:81, story:"HollandalÃ„Â± saÃ„Å¸ bek, PSV ve ÃƒÂ§eÃ…Å¸itli Hollanda-Almanya deneyimiyle Kayserispor'un saÃ„Å¸ kulvarÃ„Â±nÃ„Â± yÃƒÂ¶netti.", career:["PSV","TSG Hoffenheim","Kayserispor"], strengths:["HÃ„Â±z","Savunma","Orta"] },
  { name:"Stephane Bahoken", team:"Kayserispor", position:"Forvet", age:20, marketValue:2.1, goals:8, assists:1, minutes:1531, bigMatch:83, form:70, story:"2025-26 sezonunda takÃ„Â±mÃ„Â±nÃ„Â±n Forvet bÃƒÂ¶lgesinde istikrarlÃ„Â± performansÃ„Â± ve kalitesiyle kadro derinliÃ„Å¸ine ÃƒÂ¶nemli katkÃ„Â± saÃ„Å¸ladÃ„Â±.", career:["Kayserispor"], strengths:["Pas","Teknik"] },
  { name:"Ali Karimi", team:"Kayserispor", position:"Kanat", age:23, marketValue:1.2, goals:6, assists:8, minutes:2454, bigMatch:77, form:84, story:"2025-26 sezonunda takÃ„Â±mÃ„Â±nÃ„Â±n Kanat bÃƒÂ¶lgesinde istikrarlÃ„Â± performansÃ„Â± ve kalitesiyle kadro derinliÃ„Å¸ine ÃƒÂ¶nemli katkÃ„Â± saÃ„Å¸ladÃ„Â±.", career:["Kayserispor"], strengths:["Pas","Teknik"] },
  { name:"Gokhan Sazdagi", team:"Kayserispor", position:"Defans", age:28, marketValue:0.7, goals:1, assists:0, minutes:1866, bigMatch:77, form:87, story:"2025-26 sezonunda takÃ„Â±mÃ„Â±nÃ„Â±n Defans bÃƒÂ¶lgesinde istikrarlÃ„Â± performansÃ„Â± ve kalitesiyle kadro derinliÃ„Å¸ine ÃƒÂ¶nemli katkÃ„Â± saÃ„Å¸ladÃ„Â±.", career:["Kayserispor"], strengths:["Markaj","Hava Topu"] },
  { name:"Mehdi Bourabia", team:"Kayserispor", position:"Forvet", age:21, marketValue:2.2, goals:8, assists:0, minutes:1739, bigMatch:77, form:76, story:"2025-26 sezonunda takÃ„Â±mÃ„Â±nÃ„Â±n Forvet bÃƒÂ¶lgesinde istikrarlÃ„Â± performansÃ„Â± ve kalitesiyle kadro derinliÃ„Å¸ine ÃƒÂ¶nemli katkÃ„Â± saÃ„Å¸ladÃ„Â±.", career:["Kayserispor"], strengths:["Pas","Teknik"] },
  { name:"Julian Jeanvier", team:"Kayserispor", position:"Kaleci", age:21, marketValue:0.6, goals:0, assists:2, minutes:2393, bigMatch:72, form:87, story:"2025-26 sezonunda takÃ„Â±mÃ„Â±nÃ„Â±n Kaleci bÃƒÂ¶lgesinde istikrarlÃ„Â± performansÃ„Â± ve kalitesiyle kadro derinliÃ„Å¸ine ÃƒÂ¶nemli katkÃ„Â± saÃ„Å¸ladÃ„Â±.", career:["Kayserispor"], strengths:["Refleks","KurtarÃ„Â±Ã…Å¸"] },
  { name:"Lionel Carole", team:"Kayserispor", position:"Kanat", age:21, marketValue:0.9, goals:6, assists:9, minutes:1980, bigMatch:76, form:75, story:"2025-26 sezonunda takÃ„Â±mÃ„Â±nÃ„Â±n Kanat bÃƒÂ¶lgesinde istikrarlÃ„Â± performansÃ„Â± ve kalitesiyle kadro derinliÃ„Å¸ine ÃƒÂ¶nemli katkÃ„Â± saÃ„Å¸ladÃ„Â±.", career:["Kayserispor"], strengths:["Pas","Teknik"] },
  { name:"Joseph Attamah", team:"Kayserispor", position:"Forvet", age:31, marketValue:1.4, goals:9, assists:1, minutes:2209, bigMatch:75, form:74, story:"2025-26 sezonunda takÃ„Â±mÃ„Â±nÃ„Â±n Forvet bÃƒÂ¶lgesinde istikrarlÃ„Â± performansÃ„Â± ve kalitesiyle kadro derinliÃ„Å¸ine ÃƒÂ¶nemli katkÃ„Â± saÃ„Å¸ladÃ„Â±.", career:["Kayserispor"], strengths:["Pas","Teknik"] },
  { name:"Anthony Uzodimma", team:"Kayserispor", position:"Orta saha", age:31, marketValue:2.0, goals:1, assists:5, minutes:1411, bigMatch:84, form:74, story:"2025-26 sezonunda takÃ„Â±mÃ„Â±nÃ„Â±n Orta saha bÃƒÂ¶lgesinde istikrarlÃ„Â± performansÃ„Â± ve kalitesiyle kadro derinliÃ„Å¸ine ÃƒÂ¶nemli katkÃ„Â± saÃ„Å¸ladÃ„Â±.", career:["Kayserispor"], strengths:["Pas","Teknik"] },
  { name:"Karimi Ali", team:"Kayserispor", position:"Kanat", age:20, marketValue:1.3, goals:8, assists:9, minutes:1727, bigMatch:82, form:76, story:"2025-26 sezonunda takÃ„Â±mÃ„Â±nÃ„Â±n Kanat bÃƒÂ¶lgesinde istikrarlÃ„Â± performansÃ„Â± ve kalitesiyle kadro derinliÃ„Å¸ine ÃƒÂ¶nemli katkÃ„Â± saÃ„Å¸ladÃ„Â±.", career:["Kayserispor"], strengths:["Pas","Teknik"] },
  { name:"Talha Sararslan", team:"Kayserispor", position:"Orta saha", age:22, marketValue:0.4, goals:2, assists:4, minutes:1059, bigMatch:71, form:74, story:"2025-26 sezonunda takÃ„Â±mÃ„Â±nÃ„Â±n Orta saha bÃƒÂ¶lgesinde istikrarlÃ„Â± performansÃ„Â± ve kalitesiyle kadro derinliÃ„Å¸ine ÃƒÂ¶nemli katkÃ„Â± saÃ„Å¸ladÃ„Â±.", career:["Kayserispor"], strengths:["Pas","Teknik"] },
  { name:"Eray Ozbek", team:"Kayserispor", position:"Kanat", age:27, marketValue:1.9, goals:4, assists:2, minutes:2182, bigMatch:82, form:73, story:"2025-26 sezonunda takÃ„Â±mÃ„Â±nÃ„Â±n Kanat bÃƒÂ¶lgesinde istikrarlÃ„Â± performansÃ„Â± ve kalitesiyle kadro derinliÃ„Å¸ine ÃƒÂ¶nemli katkÃ„Â± saÃ„Å¸ladÃ„Â±.", career:["Kayserispor"], strengths:["Pas","Teknik"] },
  { name:"Ramazan Civelek", team:"Kayserispor", position:"Kanat", age:31, marketValue:1.4, goals:3, assists:3, minutes:2144, bigMatch:77, form:76, story:"2025-26 sezonunda takÃ„Â±mÃ„Â±nÃ„Â±n Kanat bÃƒÂ¶lgesinde istikrarlÃ„Â± performansÃ„Â± ve kalitesiyle kadro derinliÃ„Å¸ine ÃƒÂ¶nemli katkÃ„Â± saÃ„Å¸ladÃ„Â±.", career:["Kayserispor"], strengths:["Pas","Teknik"] },
  { name:"Arif Kocaman", team:"Kayserispor", position:"Kaleci", age:20, marketValue:1.8, goals:2, assists:0, minutes:2151, bigMatch:76, form:78, story:"2025-26 sezonunda takÃ„Â±mÃ„Â±nÃ„Â±n Kaleci bÃƒÂ¶lgesinde istikrarlÃ„Â± performansÃ„Â± ve kalitesiyle kadro derinliÃ„Å¸ine ÃƒÂ¶nemli katkÃ„Â± saÃ„Å¸ladÃ„Â±.", career:["Kayserispor"], strengths:["Refleks","KurtarÃ„Â±Ã…Å¸"] },
  { name:"Yaw Ackah", team:"Kayserispor", position:"Kaleci", age:21, marketValue:1.0, goals:1, assists:2, minutes:1785, bigMatch:84, form:78, story:"2025-26 sezonunda takÃ„Â±mÃ„Â±nÃ„Â±n Kaleci bÃƒÂ¶lgesinde istikrarlÃ„Â± performansÃ„Â± ve kalitesiyle kadro derinliÃ„Å¸ine ÃƒÂ¶nemli katkÃ„Â± saÃ„Å¸ladÃ„Â±.", career:["Kayserispor"], strengths:["Refleks","KurtarÃ„Â±Ã…Å¸"] },
  { name:"Hasan Ali Kaldirim", team:"Kayserispor", position:"Kanat", age:27, marketValue:1.9, goals:11, assists:6, minutes:2117, bigMatch:73, form:87, story:"2025-26 sezonunda takÃ„Â±mÃ„Â±nÃ„Â±n Kanat bÃƒÂ¶lgesinde istikrarlÃ„Â± performansÃ„Â± ve kalitesiyle kadro derinliÃ„Å¸ine ÃƒÂ¶nemli katkÃ„Â± saÃ„Å¸ladÃ„Â±.", career:["Kayserispor"], strengths:["Pas","Teknik"] },
  { name:"JuliÃƒÂ¡n Cuesta", team:"Antalyaspor", position:"Kaleci", age:27, marketValue:0.8, goals:0, assists:0, minutes:3100, bigMatch:78, form:79, story:"Arjantinli kaleci, Antalyaspor kalesini saÃ„Å¸lam tutarak sezon boyunca gÃƒÂ¼ven verdi.", career:["Independiente","Antalyaspor"], strengths:["Refleks","Bire Bir","Sakinlik"] },
  { name:"Lautaro Giannetti", team:"Antalyaspor", position:"Defans", age:29, marketValue:1.5, goals:2, assists:1, minutes:2800, bigMatch:80, form:81, story:"Arjantinli stoper, gÃƒÂ¼ÃƒÂ§lÃƒÂ¼ fiziÃ„Å¸i ve savunma liderliÃ„Å¸iyle Antalyaspor'un arka hattÃ„Â±nÃ„Â±n direÃ„Å¸iydi.", career:["VÃƒÂ©lez","Antalyaspor"], strengths:["GÃƒÂ¼ÃƒÂ§","Hava Topu","Liderlik"] },
  { name:"Georgiy Dzhikiya", team:"Antalyaspor", position:"Defans", age:31, marketValue:1.2, goals:1, assists:1, minutes:2600, bigMatch:80, form:80, story:"Rus milli takÃ„Â±mÃ„Â±nÃ„Â±n tecrÃƒÂ¼beli stoperi, Antalyaspor'da rakip forvete hayat hakkÃ„Â± tanÃ„Â±madÃ„Â±.", career:["Spartak Moskova","Antalyaspor"], strengths:["GÃƒÂ¼ÃƒÂ§","MÃƒÂ¼dahale","TecrÃƒÂ¼be"] },
  { name:"AbdÃƒÂ¼lkadir Ãƒâ€“mÃƒÂ¼r", team:"Antalyaspor", position:"Orta saha", age:26, marketValue:2.0, goals:5, assists:7, minutes:2400, bigMatch:83, form:84, story:"Trabzonspor'un deÃ„Å¸erli yetiÃ…Å¸tirmesi milli orta saha, Antalyaspor'da yaratÃ„Â±cÃ„Â± oyunuyla sezonun isimlerinden biri oldu.", career:["Trabzonspor","Hull City","Antalyaspor"], strengths:["Teknik","Vizyon","Dribbling"] },
  { name:"Dario Ã…Â ariÃ„â€¡", team:"Antalyaspor", position:"Orta saha", age:31, marketValue:1.5, goals:4, assists:5, minutes:2500, bigMatch:81, form:82, story:"BosnalÃ„Â± merkez orta saha, pas kalitesi ve oyun gÃƒÂ¶rÃƒÂ¼Ã…Å¸ÃƒÂ¼yle Antalyaspor'un motorunu oluÃ…Å¸turdu.", career:["Anderlecht","Ãƒâ€¡eÃ…Å¸itli","Antalyaspor"], strengths:["Pas","Oyun GÃƒÂ¶rÃƒÂ¼Ã…Å¸ÃƒÂ¼","Liderlik"] },
  { name:"Kenneth Paal", team:"Antalyaspor", position:"Defans", age:27, marketValue:1.5, goals:0, assists:4, minutes:2700, bigMatch:79, form:81, story:"HollandalÃ„Â± sol bek, hem savunma hem hÃƒÂ¼cumda dengeli performansÃ„Â±yla dikkat ÃƒÂ§ekti.", career:["PSV","Antalyaspor"], strengths:["HÃ„Â±z","Orta","Savunma"] },
  { name:"Sander van de Streek", team:"Antalyaspor", position:"Orta saha", age:31, marketValue:1.2, goals:3, assists:6, minutes:2300, bigMatch:80, form:81, story:"HollandalÃ„Â± orta saha, top kapma ve distribÃƒÂ¼syon kalitesiyle Antalyaspor'un kalbinde gÃƒÂ¶rev yaptÃ„Â±.", career:["FC Utrecht","Antalyaspor"], strengths:["Pas","Top Kapma","Ã„Â°Ã…Å¸ Disiplini"] },
  { name:"Soner Dikmen", team:"Antalyaspor", position:"Defans", age:28, marketValue:1.0, goals:0, assists:2, minutes:2400, bigMatch:78, form:79, story:"SaÃ„Å¸ bekte savunma gÃƒÂ¼cÃƒÂ¼ ve ÃƒÂ§alÃ„Â±Ã…Å¸kanlÃ„Â±Ã„Å¸Ã„Â±yla Antalyaspor'un gÃƒÂ¼venilir ismi oldu.", career:["KaragÃƒÂ¼mrÃƒÂ¼k","Antalyaspor"], strengths:["Savunma","DayanÃ„Â±klÃ„Â±lÃ„Â±k","Disiplin"] },
  { name:"Adam Buksa", team:"Antalyaspor", position:"Kaleci", age:23, marketValue:2.5, goals:0, assists:0, minutes:1981, bigMatch:73, form:82, story:"2025-26 sezonunda takÃ„Â±mÃ„Â±nÃ„Â±n Kaleci bÃƒÂ¶lgesinde istikrarlÃ„Â± performansÃ„Â± ve kalitesiyle kadro derinliÃ„Å¸ine ÃƒÂ¶nemli katkÃ„Â± saÃ„Å¸ladÃ„Â±.", career:["Antalyaspor"], strengths:["Refleks","KurtarÃ„Â±Ã…Å¸"] },
  { name:"Sam Larsson", team:"Antalyaspor", position:"Kanat", age:28, marketValue:1.9, goals:5, assists:4, minutes:1340, bigMatch:70, form:86, story:"2025-26 sezonunda takÃ„Â±mÃ„Â±nÃ„Â±n Kanat bÃƒÂ¶lgesinde istikrarlÃ„Â± performansÃ„Â± ve kalitesiyle kadro derinliÃ„Å¸ine ÃƒÂ¶nemli katkÃ„Â± saÃ„Å¸ladÃ„Â±.", career:["Antalyaspor"], strengths:["Pas","Teknik"] },
  { name:"Sagiv Jehezkel", team:"Antalyaspor", position:"Kaleci", age:23, marketValue:0.8, goals:2, assists:1, minutes:1669, bigMatch:76, form:73, story:"2025-26 sezonunda takÃ„Â±mÃ„Â±nÃ„Â±n Kaleci bÃƒÂ¶lgesinde istikrarlÃ„Â± performansÃ„Â± ve kalitesiyle kadro derinliÃ„Å¸ine ÃƒÂ¶nemli katkÃ„Â± saÃ„Å¸ladÃ„Â±.", career:["Antalyaspor"], strengths:["Refleks","KurtarÃ„Â±Ã…Å¸"] },
  { name:"Ramzi Safuri", team:"Antalyaspor", position:"Forvet", age:33, marketValue:1.3, goals:8, assists:0, minutes:1791, bigMatch:82, form:77, story:"2025-26 sezonunda takÃ„Â±mÃ„Â±nÃ„Â±n Forvet bÃƒÂ¶lgesinde istikrarlÃ„Â± performansÃ„Â± ve kalitesiyle kadro derinliÃ„Å¸ine ÃƒÂ¶nemli katkÃ„Â± saÃ„Å¸ladÃ„Â±.", career:["Antalyaspor"], strengths:["Pas","Teknik"] },
  { name:"Jakub Kaluzinski", team:"Antalyaspor", position:"Kanat", age:29, marketValue:1.8, goals:11, assists:8, minutes:1541, bigMatch:76, form:76, story:"2025-26 sezonunda takÃ„Â±mÃ„Â±nÃ„Â±n Kanat bÃƒÂ¶lgesinde istikrarlÃ„Â± performansÃ„Â± ve kalitesiyle kadro derinliÃ„Å¸ine ÃƒÂ¶nemli katkÃ„Â± saÃ„Å¸ladÃ„Â±.", career:["Antalyaspor"], strengths:["Pas","Teknik"] },
  { name:"Veysel Sari", team:"Antalyaspor", position:"Forvet", age:28, marketValue:1.9, goals:3, assists:2, minutes:1919, bigMatch:71, form:78, story:"2025-26 sezonunda takÃ„Â±mÃ„Â±nÃ„Â±n Forvet bÃƒÂ¶lgesinde istikrarlÃ„Â± performansÃ„Â± ve kalitesiyle kadro derinliÃ„Å¸ine ÃƒÂ¶nemli katkÃ„Â± saÃ„Å¸ladÃ„Â±.", career:["Antalyaspor"], strengths:["Pas","Teknik"] },
  { name:"Erdogan Yesilyurt", team:"Antalyaspor", position:"Orta saha", age:31, marketValue:2.2, goals:0, assists:6, minutes:1473, bigMatch:76, form:83, story:"2025-26 sezonunda takÃ„Â±mÃ„Â±nÃ„Â±n Orta saha bÃƒÂ¶lgesinde istikrarlÃ„Â± performansÃ„Â± ve kalitesiyle kadro derinliÃ„Å¸ine ÃƒÂ¶nemli katkÃ„Â± saÃ„Å¸ladÃ„Â±.", career:["Antalyaspor"], strengths:["Pas","Teknik"] },
  { name:"Guray Vural", team:"Antalyaspor", position:"Forvet", age:31, marketValue:0.9, goals:2, assists:0, minutes:1905, bigMatch:79, form:72, story:"2025-26 sezonunda takÃ„Â±mÃ„Â±nÃ„Â±n Forvet bÃƒÂ¶lgesinde istikrarlÃ„Â± performansÃ„Â± ve kalitesiyle kadro derinliÃ„Å¸ine ÃƒÂ¶nemli katkÃ„Â± saÃ„Å¸ladÃ„Â±.", career:["Antalyaspor"], strengths:["Pas","Teknik"] },
  { name:"Bahadir Ozturk", team:"Antalyaspor", position:"Forvet", age:23, marketValue:1.5, goals:8, assists:1, minutes:1058, bigMatch:71, form:83, story:"2025-26 sezonunda takÃ„Â±mÃ„Â±nÃ„Â±n Forvet bÃƒÂ¶lgesinde istikrarlÃ„Â± performansÃ„Â± ve kalitesiyle kadro derinliÃ„Å¸ine ÃƒÂ¶nemli katkÃ„Â± saÃ„Å¸ladÃ„Â±.", career:["Antalyaspor"], strengths:["Pas","Teknik"] },
  { name:"Mert Yilmaz", team:"Antalyaspor", position:"Kanat", age:31, marketValue:2.5, goals:11, assists:7, minutes:1358, bigMatch:75, form:74, story:"2025-26 sezonunda takÃ„Â±mÃ„Â±nÃ„Â±n Kanat bÃƒÂ¶lgesinde istikrarlÃ„Â± performansÃ„Â± ve kalitesiyle kadro derinliÃ„Å¸ine ÃƒÂ¶nemli katkÃ„Â± saÃ„Å¸ladÃ„Â±.", career:["Antalyaspor"], strengths:["Pas","Teknik"] },
  { name:"KaÃ„Å¸an Ãƒâ€“zkan", team:"Antalyaspor", position:"Forvet", age:33, marketValue:0.6, goals:4, assists:1, minutes:1712, bigMatch:83, form:78, story:"2025-26 sezonunda takÃ„Â±mÃ„Â±nÃ„Â±n Forvet bÃƒÂ¶lgesinde istikrarlÃ„Â± performansÃ„Â± ve kalitesiyle kadro derinliÃ„Å¸ine ÃƒÂ¶nemli katkÃ„Â± saÃ„Å¸ladÃ„Â±.", career:["Antalyaspor"], strengths:["Pas","Teknik"] },
  { name:"Amar Gerxhaliu", team:"Antalyaspor", position:"Defans", age:33, marketValue:0.7, goals:2, assists:0, minutes:1651, bigMatch:72, form:75, story:"2025-26 sezonunda takÃ„Â±mÃ„Â±nÃ„Â±n Defans bÃƒÂ¶lgesinde istikrarlÃ„Â± performansÃ„Â± ve kalitesiyle kadro derinliÃ„Å¸ine ÃƒÂ¶nemli katkÃ„Â± saÃ„Å¸ladÃ„Â±.", career:["Antalyaspor"], strengths:["Markaj","Hava Topu"] },
  { name:"Ufuk Akyol", team:"Antalyaspor", position:"Forvet", age:28, marketValue:1.1, goals:7, assists:0, minutes:1688, bigMatch:84, form:78, story:"2025-26 sezonunda takÃ„Â±mÃ„Â±nÃ„Â±n Forvet bÃƒÂ¶lgesinde istikrarlÃ„Â± performansÃ„Â± ve kalitesiyle kadro derinliÃ„Å¸ine ÃƒÂ¶nemli katkÃ„Â± saÃ„Å¸ladÃ„Â±.", career:["Antalyaspor"], strengths:["Pas","Teknik"] },
  { name:"Deniz Kadah", team:"Antalyaspor", position:"Kanat", age:22, marketValue:1.6, goals:9, assists:4, minutes:1809, bigMatch:70, form:80, story:"2025-26 sezonunda takÃ„Â±mÃ„Â±nÃ„Â±n Kanat bÃƒÂ¶lgesinde istikrarlÃ„Â± performansÃ„Â± ve kalitesiyle kadro derinliÃ„Å¸ine ÃƒÂ¶nemli katkÃ„Â± saÃ„Å¸ladÃ„Â±.", career:["Antalyaspor"], strengths:["Pas","Teknik"] },
  { name:"Ege Bilsel", team:"Antalyaspor", position:"Orta saha", age:33, marketValue:0.7, goals:0, assists:6, minutes:1530, bigMatch:77, form:76, story:"2025-26 sezonunda takÃ„Â±mÃ„Â±nÃ„Â±n Orta saha bÃƒÂ¶lgesinde istikrarlÃ„Â± performansÃ„Â± ve kalitesiyle kadro derinliÃ„Å¸ine ÃƒÂ¶nemli katkÃ„Â± saÃ„Å¸ladÃ„Â±.", career:["Antalyaspor"], strengths:["Pas","Teknik"] },
  { name:"Erkan Eyibil", team:"Antalyaspor", position:"Orta saha", age:20, marketValue:1.3, goals:1, assists:9, minutes:1252, bigMatch:78, form:76, story:"2025-26 sezonunda takÃ„Â±mÃ„Â±nÃ„Â±n Orta saha bÃƒÂ¶lgesinde istikrarlÃ„Â± performansÃ„Â± ve kalitesiyle kadro derinliÃ„Å¸ine ÃƒÂ¶nemli katkÃ„Â± saÃ„Å¸ladÃ„Â±.", career:["Antalyaspor"], strengths:["Pas","Teknik"] },
  { name:"Ataberk Dadakdeniz", team:"Antalyaspor", position:"Kanat", age:29, marketValue:2.4, goals:3, assists:9, minutes:2231, bigMatch:72, form:77, story:"2025-26 sezonunda takÃ„Â±mÃ„Â±nÃ„Â±n Kanat bÃƒÂ¶lgesinde istikrarlÃ„Â± performansÃ„Â± ve kalitesiyle kadro derinliÃ„Å¸ine ÃƒÂ¶nemli katkÃ„Â± saÃ„Å¸ladÃ„Â±.", career:["Antalyaspor"], strengths:["Pas","Teknik"] }
];


// Ã¢â€â‚¬Ã¢â€â‚¬ TAKIM TEMELERÃ„Â° Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
const teamThemes = [
  { name:"Lig temasÃ„Â±",      primary:"#38bdf8", secondary:"#fbbf24", accent:"#f43f5e", dark:"#090e1a" },
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

// Ã¢â€â‚¬Ã¢â€â‚¬ KADROLAR Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬

// Ã¢â€â‚¬Ã¢â€â‚¬ PUAN DURUMU 2025-26 Ã¢â‚¬â€ Transfermarkt (34. Hafta) Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
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
  { emoji:"Ã¢Â­Â", title:"Sezonun Oyuncusu",      winner:"Victor Osimhen",            team:"Galatasaray",       detail:"Ã…Âampiyonluk lideri",         note:"Galatasaray'Ã„Â± Ã…Å¸ampiyonluÃ„Å¸a taÃ…Å¸Ã„Â±yan kilit isim. Etkili gol katkÃ„Â±larÃ„Â± ve sahaya hakim oyunuyla sezonun en deÃ„Å¸erlisi seÃƒÂ§ildi.", color:"#f0a830" },
  { emoji:"Ã¢Å¡Â½", title:"Gol KrallÃ„Â±Ã„Å¸Ã„Â±",          winner:"Onuachu & Shomurodov",      team:"TS / BaÃ…Å¸akÃ…Å¸ehir",   detail:"22 gol (paylaÃ…Å¸Ã„Â±mlÃ„Â±)",        note:"Paul Onuachu ve Eldor Shomurodov, 2025-26 sezonunu 22'Ã…Å¸er golle zirvede paylaÃ…Å¸arak SÃƒÂ¼per Lig gol krallÃ„Â±Ã„Å¸Ã„Â±nÃ„Â± birlikte kazandÃ„Â±.", color:"#22c76e" },
  { emoji:"ÄŸÅ¸ÂÂ¯", title:"Asist KrallÃ„Â±Ã„Å¸Ã„Â±",        winner:"Marco Asensio",             team:"FenerbahÃƒÂ§e",        detail:"13 asist",                   note:"Ã„Â°spanyol yÃ„Â±ldÃ„Â±z Asensio, 25 maÃƒÂ§ta ÃƒÂ¼rettiÃ„Å¸i 13 asist ile 2025-26 sezonunun asist krallÃ„Â±Ã„Å¸Ã„Â±nÃ„Â± ezici biÃƒÂ§imde aldÃ„Â±.", color:"#003f8f" },
  { emoji:"ÄŸÅ¸Â§Â¤", title:"Sezonun Kalecisi",      winner:"UÃ„Å¸urcan Ãƒâ€¡akÃ„Â±r",             team:"Galatasaray",       detail:"Ã…Âampiyon kale",              note:"Galatasaray'Ã„Â±n vazgeÃƒÂ§ilmez kalecisi UÃ„Å¸urcan, kritik kurtarÃ„Â±Ã…Å¸larÃ„Â± ve gÃƒÂ¼ÃƒÂ§lÃƒÂ¼ refleksleriyle Ã…Å¸ampiyonluk yolunda takÃ„Â±mÃ„Â±n en bÃƒÂ¼yÃƒÂ¼k sigortasÃ„Â± oldu.", color:"#a90432" },
  { emoji:"ÄŸÅ¸Å’Å¸", title:"GenÃƒÂ§ Yetenek",          winner:"BarÃ„Â±Ã…Å¸ Alper YÃ„Â±lmaz",        team:"Galatasaray",       detail:"12 asist",                   note:"MillÃƒÂ® kanat oyuncusu, 12 asist ve yÃƒÂ¼ksek performansÃ„Â±yla Ã…Å¸ampiyon takÃ„Â±mÃ„Â±n en parlak genci oldu.", color:"#7a263a" },
  { emoji:"ÄŸÅ¸â€˜Â¨Ã¢â‚¬ÂÄŸÅ¸â€™Â¼", title:"Sezonun Teknik Dir.", winner:"Fatih Tekke",                team:"Trabzonspor",       detail:"3. sÃ„Â±ra Ã¢â‚¬â€ sÃ„Â±nÃ„Â±rlÃ„Â± kadro",     note:"KÃ„Â±sÃ„Â±tlÃ„Â± kadro ve bÃƒÂ¼tÃƒÂ§eyle Trabzonspor'u ligin 3. sÃ„Â±rasÃ„Â±na taÃ…Å¸Ã„Â±yan Fatih Tekke, 2025-26 sezonunun gerÃƒÂ§ek sÃƒÂ¼rpriz teknik direktÃƒÂ¶rÃƒÂ¼ oldu.", color:"#7a263a" }
];

// Ã¢â€â‚¬Ã¢â€â‚¬ ANKET Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
const polls = [
  { id:"poll_2526_best", question:"Sezonun En Ã„Â°yi Forveti Kim?", candidates:[{name:"Victor Osimhen",team:"Galatasaray"},{name:"Paul Onuachu",team:"Trabzonspor"},{name:"Tammy Abraham",team:"Besiktas"},{name:"Eldor Shomurodov",team:"Basaksehir"}] },
  { id:"poll_2526_supriz", question:"2025-26 Sezonunun SÃƒÂ¼rprizi Kim?", candidates:[{name:"Juan Santos",team:"Goztepe"},{name:"Felipe Augusto",team:"Trabzonspor"},{name:"Kacper Kozlowski",team:"Gaziantep FK"},{name:"Ianis Hagi",team:"Alanyaspor"}] }
];

// Ã¢â€â‚¬Ã¢â€â‚¬ TAHMÃ„Â°N OYUNU Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
const matchFixtures = [
  { home:"Galatasaray",  away:"Fenerbahce",   actualHome:1, actualAway:1 },
  { home:"Trabzonspor",  away:"Besiktas",     actualHome:2, actualAway:1 },
  { home:"Basaksehir",   away:"Goztepe",      actualHome:2, actualAway:0 },
  { home:"Samsunspor",   away:"Rizespor",     actualHome:1, actualAway:2 },
  { home:"Konyaspor",    away:"Kocaelispor",  actualHome:1, actualAway:0 },
  { home:"Gaziantep FK", away:"Kasimpasa",    actualHome:2, actualAway:1 }
];

// Ã¢â€â‚¬Ã¢â€â‚¬ MEVKI MODELLERÃ„Â° Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
const positionModels = {
  Forvet:       { goal:8.5, assist:4.2, minutes:0.010, bigMatch:0.42, form:0.35, roleBonus:8  },
  Kanat:        { goal:7.0, assist:5.6, minutes:0.011, bigMatch:0.38, form:0.42, roleBonus:10 },
  "Orta saha":  { goal:5.8, assist:6.8, minutes:0.014, bigMatch:0.34, form:0.45, roleBonus:14 },
  Defans:       { goal:4.0, assist:4.4, minutes:0.018, bigMatch:0.48, form:0.38, roleBonus:34 },
  Kaleci:       { goal:0.0, assist:2.0, minutes:0.020, bigMatch:0.62, form:0.58, roleBonus:48 }
};

// Ã¢â€â‚¬Ã¢â€â‚¬ STATE Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
const state = { search:"", position:"all", team:"all", sort:"valueScore", budgetOnly:false, visibleLimit: 12, maxAge: 40, maxPrice: 1000 };

// Ã¢â€â‚¬Ã¢â€â‚¬ ENRÃ„Â°CHED PLAYERS Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
const enrichedPlayers = players.map(p => {
  const m = positionModels[p.position] || positionModels["Orta saha"];
  const impactScore   = Math.round(p.goals*m.goal + p.assists*m.assist + p.minutes*m.minutes + p.bigMatch*m.bigMatch + p.form*m.form + m.roleBonus);
  const valueScore    = Math.round((impactScore / Math.max(p.marketValue, 0.35)) * 7);
  const scoutScore    = Math.round(valueScore*0.58 + p.form*0.28 + (28-Math.min(p.age,28))*1.6);
  const surpriseScore = Math.round(valueScore*0.65 + p.bigMatch*0.22 + p.form*0.13);
  return { ...p, impactScore, valueScore, scoutScore, surpriseScore, contribution: p.goals+p.assists };
});

// Ã¢â€â‚¬Ã¢â€â‚¬ DOM REFS Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
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

// Ã¢â€â‚¬Ã¢â€â‚¬ YARDIMCILAR Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
function formatValue(v) { return v >= 1 ? v.toFixed(1)+"M" : Math.round(v*1000)+"K"; }
function getLabel(p) {
  if (p.valueScore > 900) return "DeÃ„Å¸er canavarÃ„Â±";
  if (p.scoutScore > 430) return "Scout radarÃ„Â±";
  if (p.bigMatch > 88)    return "BÃƒÂ¼yÃƒÂ¼k maÃƒÂ§";
  if (p.form > 88)        return "Formda";
  return "Ã„Â°stikrar";
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

// Ã¢â€â‚¬Ã¢â€â‚¬ Ãƒâ€“ZET Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
function renderSummary() {
  const bi=topBy("impactScore"), bv=topBy("valueScore"), bs=topBy("scoutScore"), bb=topBy("bigMatch");
  const hero=enrichedPlayers.find(p=>p.name==="Christ Inao Oulai") || topBy("surpriseScore");
  document.querySelector("#topImpact").textContent   = `${bi.name} (${bi.impactScore})`;
  document.querySelector("#topValue").textContent    = `${bv.name} (${bv.valueScore})`;
  document.querySelector("#topScout").textContent    = `${bs.name} (${bs.scoutScore})`;
  document.querySelector("#topBigMatch").textContent = `${bb.name} (${bb.bigMatch})`;
  document.querySelector("#heroPlayer").textContent  = hero.name;
  document.querySelector("#heroNote").textContent    = `${hero.team} Ã‚Â· ${formatValue(hero.marketValue)} EUR Ã‚Â· skor ${hero.surpriseScore || 99}`;
  
  // Load hero image
  loadPlayerImage(hero.name, "heroPlayerImg");
}

// Ã¢â€â‚¬Ã¢â€â‚¬ LIDERBOARD Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
function boardItem(p,i,key) {
  const imgId = `board-img-${key}-${p.name.replace(/\s+/g, '-')}-${i}`;
  return `<div class="board-item" style="display:flex; align-items:center; gap:10px;">
    <span class="rank">${i+1}</span>
    <div class="player-photo-wrapper tiny">
      <img id="${imgId}" class="player-photo-img lazy-player-img" data-player-name="${p.name}" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100%25' height='100%25' fill='%230f172a'/%3E%3C/svg%3E" alt="${p.name}">
    </div>
    <div style="flex-grow:1; text-align:left;">
      <strong style="display:block;">${p.name}</strong>
      <span class="board-meta" style="display:inline-flex; align-items:center; gap:4px; margin-top:2px;">${getTeamLogoHtml(p.team, "tiny")} <span>${p.team}</span> Ã‚Â· ${p.position} Ã‚Â· ${formatValue(p.marketValue)} Ã¢â€šÂ¬</span>
    </div>
    <span class="board-score">${p[key]}</span>
  </div>`;
}
function renderBoards() {
  valueBoard.innerHTML = [...enrichedPlayers].sort((a,b)=>b.valueScore-a.valueScore).slice(0,5).map((p,i)=>boardItem(p,i,"valueScore")).join("");
  scoutBoard.innerHTML = [...enrichedPlayers].filter(p=>p.marketValue<2.5&&p.age<=26).sort((a,b)=>b.scoutScore-a.scoutScore).slice(0,5).map((p,i)=>boardItem(p,i,"scoutScore")).join("");
  observeImages();
}

// Ã¢â€â‚¬Ã¢â€â‚¬ TEMA Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
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

// Ã¢â€â‚¬Ã¢â€â‚¬ KADRO Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
function renderSquadTeams() {
  squadTeamSelect.innerHTML = teamThemes.filter(t=>t.name!=="Lig temasÃ„Â±").map(t=>`<option value="${t.name}">${t.name}</option>`).join("");
  squadTeamSelect.value = "Trabzonspor";
  renderSquad();
}
function renderSquad() {
  const name = squadTeamSelect.value;
  const theme = teamThemes.find(t => t.name === name);
  if (theme) applyTheme(theme);
  
  const squad = enrichedPlayers.filter(p => p.team === name);
  
  if (squad.length === 0) {
    squadNote.innerHTML = `${getTeamLogoHtml(name, "small")} <span style="vertical-align:middle; margin-left:6px;">${name}: kadro henÃƒÂ¼z eklenmedi</span>`;
    squadGrid.innerHTML = `<div class="squad-empty">${name} kadrosu yakÃ„Â±nda eklenecek.</div>`;
    return;
  }
  
  squadNote.innerHTML = `${getTeamLogoHtml(name, "small")} <span style="vertical-align:middle; margin-left:6px;">${name}: ${squad.length} oyuncu Ã¢â‚¬â€ 2025-26 Sezonu</span>`;
  squadGrid.innerHTML = squad.map(p => {
    let note = `${formatValue(p.marketValue)} Ã¢â€šÂ¬`;
    if (p.goals > 0 || p.assists > 0) {
      note += ` Ã‚Â· ${p.goals}G ${p.assists}A`;
    } else if (p.position === "Kaleci") {
      note += ` Ã‚Â· Kaleci`;
    } else {
      note += ` Ã‚Â· ${p.strengths ? p.strengths[0] : "Oyuncu"}`;
    }
    
    return `
      <article class="squad-card">
        <strong>${p.name}</strong>
        <span>${p.position} Ã‚Â· ${note}</span>
        <a class="tm-link small-link" href="${tmUrl(p.name)}" target="_blank" rel="noopener noreferrer" onclick="event.stopPropagation()" aria-label="Transfermarkt'ta ${p.name}">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
          Transfermarkt'ta GÃƒÂ¶r
        </a>
      </article>`;
  }).join("");
}

// Ã¢â€â‚¬Ã¢â€â‚¬ PUAN DURUMU Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
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
    src.innerHTML = `ÄŸÅ¸â€œÅ  Kaynak: <a href="https://www.transfermarkt.com/super-lig/tabelle/wettbewerb/TR1/saison_id/2025" target="_blank" rel="noopener">Transfermarkt Ã¢â‚¬â€ 25/26 Ã‚Â· 34. Hafta</a>`;
    panel.appendChild(src);
  }
  if (!panel.querySelector(".standings-legend")) {
    const leg = document.createElement("div");
    leg.className = "standings-legend";
    leg.innerHTML = `
      <div class="legend-item"><span class="legend-dot" style="background:#afd179;"></span>Ã…Âampiyon + Ã…ÂL</div>
      <div class="legend-item"><span class="legend-dot" style="background:#d6eab6;"></span>Ã…Âampiyonlar Ligi</div>
      <div class="legend-item"><span class="legend-dot" style="background:#bdd9ef;"></span>Avrupa Ligi</div>
      <div class="legend-item"><span class="legend-dot" style="background:#a5cce9;"></span>Konferans Ligi</div>
      <div class="legend-item"><span class="legend-dot" style="background:#f8a7a3;"></span>KÃƒÂ¼me dÃƒÂ¼Ã…Å¸me</div>`;
    panel.appendChild(leg);
  }
}

// Ã¢â€â‚¬Ã¢â€â‚¬ SEZON Ãƒâ€“DÃƒÅ“LLERÃ„Â° Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
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

// Ã¢â€â‚¬Ã¢â€â‚¬ OYUNCU KARTLARI Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
function renderPlayers() {
  const list = getFilteredPlayers();
  resultCount.textContent = `${list.length} oyuncu`;
  const visibleList = list.slice(0, state.visibleLimit);
  playerGrid.innerHTML = visibleList.map(p => {
    const mw = Math.min(100, Math.round(p.valueScore/10));
    const imgId = `card-img-${p.name.replace(/\s+/g, '-')}`;
    
    return `<article class="player-card" data-player="${p.name}" tabindex="0" role="button" aria-label="${p.name} detayÃ„Â±nÃ„Â± aÃƒÂ§">
      <div class="card-header-with-photo">
        <div class="player-photo-wrapper">
          <img id="${imgId}" class="player-photo-img lazy-player-img" data-player-name="${p.name}" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100%25' height='100%25' fill='%230f172a'/%3E%3C/svg%3E" alt="${p.name}">
        </div>
        <div class="card-head-details">
          <div class="card-head" style="margin-bottom: 0;">
            <div><h3 style="margin-top:0;">${p.name}</h3><p style="margin-bottom:0; display:flex; align-items:center; gap:4px;">${getTeamLogoHtml(p.team, "tiny")} <span>${p.team}</span> Ã‚Â· ${p.position} Ã‚Â· ${p.age} yaÃ…Å¸</p></div>
            <span class="tag">${getLabel(p)}</span>
          </div>
        </div>
      </div>
      <div class="stat-row">
        <div class="stat"><span>Piyasa DeÃ„Å¸eri</span><strong>${formatValue(p.marketValue)} Ã¢â€šÂ¬</strong></div>
        <div class="stat"><span>Etki Skoru</span><strong>${p.impactScore}</strong></div>
        <div class="stat"><span>Fiyat/KatkÃ„Â±</span><strong>${p.valueScore}</strong></div>
      </div>
      <div><div class="meter"><span style="width:${mw}%"></span></div></div>
      <p class="story">${p.story}</p>
      <a class="tm-link" href="${tmUrl(p.name)}" target="_blank" rel="noopener noreferrer"
         onclick="event.stopPropagation()" aria-label="Transfermarkt'ta ${p.name}">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
        Transfermarkt'ta GÃƒÂ¶r
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
  
  const hÃƒÂ¼cum = Math.min(player.contribution / 30, 1);
  const istikrar = Math.min(player.valueScore / 1000, 1);
  const oyunAklÃ„Â± = Math.min(player.impactScore / 1000, 1);
  const bÃƒÂ¼yÃƒÂ¼kMaÃƒÂ§ = Math.min(player.bigMatch / 100, 1);
  const formSkoru = (player.form && player.form.length) 
      ? player.form.reduce((a,b)=>a+(b==='W'?1:b==='D'?0.5:0),0)/player.form.length 
      : 0.6;
  
  const data = [hÃƒÂ¼cum, istikrar, oyunAklÃ„Â±, bÃƒÂ¼yÃƒÂ¼kMaÃƒÂ§, formSkoru];
  const labels = ["HÃƒÂ¼cum", "Ã„Â°stikrar", "Oyun AklÃ„Â±", "BÃƒÂ¼yÃƒÂ¼k MaÃƒÂ§", "Form"];
  
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

// Ã¢â€â‚¬Ã¢â€â‚¬ MODAL Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
function openPlayerModal(name) {
  const p = enrichedPlayers.find(x=>x.name===name);
  if (!p) return;
  modalPlayerName.textContent = p.name;
  modalPlayerTeam.innerHTML = `${getTeamLogoHtml(p.team, "tiny")} <span style="vertical-align:middle; margin-left:6px;">${p.team} Ã‚Â· ${p.position} Ã‚Â· ${p.age} yaÃ…Å¸</span>`;
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
          <div class="stat"><span>Piyasa DeÃ„Å¸eri</span><strong>${formatValue(p.marketValue)} Ã¢â€šÂ¬</strong></div>
          <div class="stat"><span>Gol + Asist</span><strong>${p.contribution}</strong></div>
          <div class="stat"><span>Etki Skoru</span><strong>${p.impactScore}</strong></div>
          <div class="stat"><span>DeÃ„Å¸er Skoru</span><strong>${p.valueScore}</strong></div>
        </div>
      </div>
    </div>
    <div id="radarChartContainer" class="radar-chart-container"></div>
    <section class="modal-section"><h3>Oyuncu profili</h3><p>${p.story}</p></section>
    <section class="modal-section"><h3>KulÃƒÂ¼p geÃƒÂ§miÃ…Å¸i</h3>
      <div class="career-list">${(p.career||[p.team]).map(c=>`<span class="career-chip">${c}</span>`).join("")}</div>
    </section>
    <section class="modal-section"><h3>GÃƒÂ¼ÃƒÂ§lÃƒÂ¼ yÃƒÂ¶nler</h3>
      <div class="strength-list">${(p.strengths||["Etki","Form","KatkÃ„Â±"]).map(s=>`<span>${s}</span>`).join("")}</div>
    </section>
    <section class="modal-section">
      <a class="tm-link" href="${tmUrl(p.name)}" target="_blank" rel="noopener noreferrer" style="margin-top:0;">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
        Transfermarkt'ta DetaylÃ„Â± Profil
      </a>
    </section>`;
    
  setTimeout(() => drawRadarChart(p, "radarChartContainer"), 0);
  
  playerModal.hidden = false;
  modalClose.focus();
}
function closePlayerModal() { playerModal.hidden = true; }

// Ã¢â€â‚¬Ã¢â€â‚¬ KARÃ…ÂILAÃ…ÂTIRMA Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
function syncCustomSelectLabel(hiddenInputId) {
  const containerId = "container" + hiddenInputId.charAt(0).toUpperCase() + hiddenInputId.slice(1);
  const container = document.getElementById(containerId);
  const hiddenInput = document.getElementById(hiddenInputId);
  if (!container || !hiddenInput) return;
  const labelSpan = container.querySelector(".custom-select-label");
  const player = enrichedPlayers.find(p => p.name === hiddenInput.value);
  if (player && labelSpan) {
    labelSpan.innerHTML = `${getTeamLogoHtml(player.team, "tiny")} <strong style="margin-left:6px;vertical-align:middle;">${player.name}</strong> <span style="font-size:0.75rem;opacity:0.75;margin-left:4px;vertical-align:middle;">Ã¢â‚¬â€ ${player.team}</span>`;
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
          <span class="custom-select-opt-team">${getTeamLogoHtml(p.team, "tiny")} <span>${p.team} Ã‚Â· ${p.position}</span></span>
        </div>
        <span class="custom-select-opt-val">${formatValue(p.marketValue)} Ã¢â€šÂ¬</span>
      </li>`;
    }).join("");
  }

  function selectPlayer(name) {
    hiddenInput.value = name;
    const player = enrichedPlayers.find(p => p.name === name);
    if (player && labelSpan) {
      labelSpan.innerHTML = `${getTeamLogoHtml(player.team, "tiny")} <strong style="margin-left:6px;vertical-align:middle;">${player.name}</strong> <span style="font-size:0.75rem;opacity:0.75;margin-left:4px;vertical-align:middle;">Ã¢â‚¬â€ ${player.team}</span>`;
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
  const w = l.impactScore===r.impactScore ? "Bu eÃ…Å¸leÃ…Å¸mede performans dengesi tam anlamÃ„Â±yla eÃ…Å¸it."
    : l.impactScore>r.impactScore ? `${l.name} sahaya yansÃ„Â±ttÃ„Â±Ã„Å¸Ã„Â± etki skoru ve performansÃ„Â± ile bu kÃ„Â±yaslamada ÃƒÂ¶ne ÃƒÂ§Ã„Â±kÃ„Â±yor.`
    : `${r.name} sahaya yansÃ„Â±ttÃ„Â±Ã„Å¸Ã„Â± etki skoru ve performansÃ„Â± ile bu kÃ„Â±yaslamada ÃƒÂ¶ne ÃƒÂ§Ã„Â±kÃ„Â±yor.`;
    
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
      ${sl("Etki skoru",l.impactScore,r.impactScore)}${sl("DeÃ„Å¸er skoru",l.valueScore,r.valueScore)}${sl("Form",l.form,r.form)}
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
      <div class="duel-row"><span>Piyasa deÃ„Å¸eri</span><strong>${formatValue(l.marketValue)} / ${formatValue(r.marketValue)} Ã¢â€šÂ¬</strong></div>
      <div class="duel-row"><span>Dakika</span><strong>${l.minutes} / ${r.minutes}</strong></div>
      <div class="duel-row"><span>BÃƒÂ¼yÃƒÂ¼k maÃƒÂ§</span><strong>${l.bigMatch} / ${r.bigMatch}</strong></div>
      <div class="duel-row"><span>Scout skoru</span><strong>${l.scoutScore} / ${r.scoutScore}</strong></div>
  </article>
    <div class="insight">${w}</div>`;
}

// Ã¢â€â‚¬Ã¢â€â‚¬ TEAM COMPARISON (DERBÃ„Â° MODU) Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
function fillTeamCompareOptions() {
  const uniqueTeams = [...new Set(enrichedPlayers.map(p => p.team))].sort();
  const optionsHtml = uniqueTeams.map(t => `<option value="${t}">${t}</option>`).join("");
  if(teamASelect) {
    teamASelect.innerHTML = `<option value="">1. TakÃ„Â±mÃ„Â± SeÃƒÂ§in</option>` + optionsHtml;
    teamASelect.value = uniqueTeams[0] || "";
  }
  if(teamBSelect) {
    teamBSelect.innerHTML = `<option value="">2. TakÃ„Â±mÃ„Â± SeÃƒÂ§in</option>` + optionsHtml;
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
    teamComparison.innerHTML = "<p style='padding:20px; text-align:center;'>LÃƒÂ¼tfen karÃ…Å¸Ã„Â±laÃ…Å¸tÃ„Â±rmak iÃƒÂ§in iki takÃ„Â±m seÃƒÂ§in.</p>";
    return;
  }
  
  const totalAttack = tA.attackScore + tB.attackScore;
  const totalDefense = tA.defenseScore + tB.defenseScore;
  const totalValue = tA.totalValue + tB.totalValue;
  
  const w = tA.totalValue > tB.totalValue 
    ? `${tA.name}, kadro kalitesi ve piyasa deÃ„Å¸eri aÃƒÂ§Ã„Â±sÃ„Â±ndan derbinin favorisi konumunda.` 
    : `${tB.name}, kadro kalitesi ve piyasa deÃ„Å¸eri aÃƒÂ§Ã„Â±sÃ„Â±ndan derbinin favorisi konumunda.`;

  teamComparison.innerHTML = `
    <article class="duel-card">
      <div class="card-header-with-photo" style="justify-content:center;">
        <div class="player-photo-wrapper medium" style="margin:0;">
          ${getTeamLogoHtml(tA.name, "medium")}
        </div>
        <h3 style="margin:10px 0 0 0; text-align:center; font-size:1.4rem;">${tA.name}</h3>
      </div>
      ${sl("Kadro DeÃ„Å¸eri (MÃ¢â€šÂ¬)", tA.totalValue.toFixed(1), tB.totalValue.toFixed(1))}
      ${sl("HÃƒÂ¼cum GÃƒÂ¼cÃƒÂ¼", tA.attackScore, tB.attackScore)}
      ${sl("Savunma GÃƒÂ¼cÃƒÂ¼", tA.defenseScore, tB.defenseScore)}
      ${sl("YaÃ…Å¸ OrtalamasÃ„Â±", tA.avgAge.toFixed(1), tB.avgAge.toFixed(1))}
      <div class="duel-row" style="flex-direction:column; align-items:flex-start; text-align:left;">
        <span style="margin-bottom:4px; font-size:0.8rem;">En Etkili Oyuncu</span>
        <strong>${tA.topPlayer.name} (${tA.topPlayer.impactScore} Etki)</strong>
      </div>
      <div class="duel-row" style="flex-direction:column; align-items:flex-start; text-align:left;">
        <span style="margin-bottom:4px; font-size:0.8rem;">En DeÃ„Å¸erli Oyuncu</span>
        <strong>${tA.mostValuable.name} (${formatValue(tA.mostValuable.marketValue)} Ã¢â€šÂ¬)</strong>
      </div>
    </article>

    <article class="duel-card">
      <div class="card-header-with-photo" style="justify-content:center;">
        <div class="player-photo-wrapper medium" style="margin:0;">
          ${getTeamLogoHtml(tB.name, "medium")}
        </div>
        <h3 style="margin:10px 0 0 0; text-align:center; font-size:1.4rem;">${tB.name}</h3>
      </div>
      ${sl("Kadro DeÃ„Å¸eri (MÃ¢â€šÂ¬)", tA.totalValue.toFixed(1), tB.totalValue.toFixed(1))}
      ${sl("HÃƒÂ¼cum GÃƒÂ¼cÃƒÂ¼", tA.attackScore, tB.attackScore)}
      ${sl("Savunma GÃƒÂ¼cÃƒÂ¼", tA.defenseScore, tB.defenseScore)}
      ${sl("YaÃ…Å¸ OrtalamasÃ„Â±", tA.avgAge.toFixed(1), tB.avgAge.toFixed(1))}
      <div class="duel-row" style="flex-direction:column; align-items:flex-start; text-align:left;">
        <span style="margin-bottom:4px; font-size:0.8rem;">En Etkili Oyuncu</span>
        <strong>${tB.topPlayer.name} (${tB.topPlayer.impactScore} Etki)</strong>
      </div>
      <div class="duel-row" style="flex-direction:column; align-items:flex-start; text-align:left;">
        <span style="margin-bottom:4px; font-size:0.8rem;">En DeÃ„Å¸erli Oyuncu</span>
        <strong>${tB.mostValuable.name} (${formatValue(tB.mostValuable.marketValue)} Ã¢â€šÂ¬)</strong>
      </div>
    </article>
    <div class="insight" style="margin-top:10px;">${w}</div>`;
}


// Ã¢â€â‚¬Ã¢â€â‚¬ ANKET Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
// Ã¢â€â‚¬Ã¢â€â‚¬ STATS CHARTS Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
let chartsInstance = [];

function renderStatsCharts() {
  if (typeof Chart === 'undefined') return;
  Chart.defaults.color = '#94a3b8';
  Chart.defaults.font.family = "'Outfit', sans-serif";

  // Cleanup old charts if any
  chartsInstance.forEach(c => c.destroy());
  chartsInstance = [];

  // --- GERÃƒâ€¡EKÃƒâ€¡Ã„Â° 2024 SÃƒÅ“PER LÃ„Â°G VERÃ„Â°LERÃ„Â° (Mockup yerine) ---

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
          tooltip: { callbacks: { label: (ctx) => ` Ã¢â€šÂ¬${ctx.raw}M` } }
        } 
      }
    }));
  }

  // 3. Average Age by Team (GerÃƒÂ§ekÃƒÂ§i yaÃ…Å¸ ortalamalarÃ„Â±)
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
          label: 'YaÃ…Å¸ OrtalamasÃ„Â±',
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
  pollBadge.textContent = voted ? "Oy verildi Ã¢Å“â€œ" : "Oy ver";
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
  pollNote.textContent = voted?`Toplam ${total} oy kullanÃ„Â±ldÃ„Â±.`:"Oyunuzu kullanÃ„Â±n, sonuÃƒÂ§larÃ„Â± gÃƒÂ¶rÃƒÂ¼n.";
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

// Ã¢â€â‚¬Ã¢â€â‚¬ TAHMÃ„Â°N OYUNU Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
function renderMatchPredictions() {
  const savedScore=parseInt(localStorage.getItem("predict_total_score")||"0");
  userTotalScore.textContent=savedScore;
  const submitted=localStorage.getItem("predict_submitted")==="true";
  matchCards.innerHTML=matchFixtures.map((m,i)=>{
    const sh=localStorage.getItem(`pred_h_${i}`)||"", sa=localStorage.getItem(`pred_a_${i}`)||"";
    let cls="", label="";
    if(submitted&&sh!==""&&sa!==""){
      const ph=parseInt(sh),pa=parseInt(sa);
      if(ph===m.actualHome&&pa===m.actualAway){cls="correct";label="Ã¢Å“â€¦ Tam isabet! +3 puan";}
      else if((ph>pa)===(m.actualHome>m.actualAway)&&(ph===pa)===(m.actualHome===m.actualAway)){cls="partial";label="ÄŸÅ¸Å¸Â¡ DoÃ„Å¸ru sonuÃƒÂ§! +1 puan";}
      else{cls="wrong";label=`Ã¢ÂÅ’ YanlÃ„Â±Ã…Å¸. GerÃƒÂ§ek: ${m.actualHome}Ã¢â‚¬â€œ${m.actualAway}`;}
    }
    return `<div class="match-card ${cls}">
      <div class="match-teams">
        <div class="match-team">${getTeamLogoHtml(m.home, "small")} <span>${m.home}</span></div>
        <div class="match-vs">VS</div>
        <div class="match-team"><span>${m.away}</span> ${getTeamLogoHtml(m.away, "small")}</div>
      </div>
      <div class="match-inputs">
        <input type="number" min="0" max="20" placeholder="0" id="pred_h_${i}" value="${sh}" ${submitted?"disabled":""}>
        <div class="match-sep">Ã¢â‚¬â€</div>
        <input type="number" min="0" max="20" placeholder="0" id="pred_a_${i}" value="${sa}" ${submitted?"disabled":""}>
      </div>
      <div class="match-result-label">${label}</div>
    </div>`;
  }).join("");
  if(submitted){
    submitPredictions.disabled=true;
    submitPredictions.textContent="Tahminler gÃƒÂ¶nderildi Ã¢Å“â€œ";
    predictResult.hidden=false;
    predictResult.innerHTML=`<h3>ÄŸÅ¸Ââ€  Toplam PuanÃ„Â±n: ${savedScore}</h3><p>Tebrikler! Yeni haftada tekrar dene.</p>`;
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
  submitPredictions.textContent="Tahminleri GÃƒÂ¶nder";
  predictResult.hidden=true;
  renderMatchPredictions();
});

// Ã¢â€â‚¬Ã¢â€â‚¬ TAKM FÃ„Â°LTRE Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
function fillTeamFilter() {
  const teams=[...new Set(enrichedPlayers.map(p=>p.team))].sort();
  teamFilter.innerHTML=`<option value="all">TÃƒÂ¼m takÃ„Â±mlar</option>`+teams.map(t=>`<option value="${t}">${t}</option>`).join("");
}

// Ã¢â€â‚¬Ã¢â€â‚¬ HAMBURGER Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
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

// Ã¢â€â‚¬Ã¢â€â‚¬ EVENT LISTENERS Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
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

// Ã¢â€â‚¬Ã¢â€â‚¬ SQUAD BUILDER STATE & REFS Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
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
          <small>${s.player.team} Ã¢â‚¬Â¢ ${s.player.marketValue.toFixed(1)} MÃ¢â€šÂ¬ Ã¢â‚¬Â¢ ${s.player.impactScore} Pts</small>
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
    { text: "ÄŸÅ¸â€Â [AI AjanÃ„Â±] Oyuncu verileri ve kariyer istatistikleri inceleniyor...", delay: 0 },
    { text: "Ã¢Å¡â„¢Ã¯Â¸Â [AI AjanÃ„Â±] 4-3-3 taktiksel formasyon yerleÃ…Å¸imi doÃ„Å¸rulanÃ„Â±yor...", delay: 600 },
    { text: "ÄŸÅ¸Â§Â¬ [AI AjanÃ„Â±] TakÃ„Â±m kimyasÃ„Â± ve saha iÃƒÂ§i uyum faktÃƒÂ¶rleri hesaplanÃ„Â±yor...", delay: 1200 },
    { text: "ÄŸÅ¸ÂÅ¸Ã¯Â¸Â [AI AjanÃ„Â±] SÃƒÂ¼per Lig devlerine karÃ…Å¸Ã„Â± 25 maÃƒÂ§lÃ„Â±k simÃƒÂ¼lasyon baÃ…Å¸latÃ„Â±ldÃ„Â±...", delay: 1800 },
    { text: "ÄŸÅ¸â€œÅ  [AI AjanÃ„Â±] Rakip analizleri tamamlandÃ„Â±, derbi maÃƒÂ§Ã„Â± simÃƒÂ¼le ediliyor...", delay: 2400 },
    { text: "Ã¢Å“â€¦ [AI AjanÃ„Â±] Rapor hazÃ„Â±rlandÃ„Â±! SonuÃƒÂ§lar ekrana aktarÃ„Â±lÃ„Â±yor...", delay: 3000, cls: "success" }
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
    return s.includes("savunma") || s.includes("top kapma") || s.includes("mÃƒÂ¼cadele") || p.name.includes("Torreira") || p.name.includes("Ndidi") || p.name.includes("Alvarez");
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
    rankComment = `<p>ÄŸÅ¸Ââ€  <strong>Ã…ÂAMPÃ„Â°YONLUK RÃƒÅ“YASI!</strong> Kadronuz 25 maÃƒÂ§lÃ„Â±k simÃƒÂ¼lasyonu <strong>${userRank}. sÃ„Â±rada (Ã…Âampiyon)</strong> tamamladÃ„Â±! Ligin tozunu atan bu yapÃ„Â±lanma, SÃƒÂ¼per Lig'in yeni hÃƒÂ¼kÃƒÂ¼mdarÃ„Â± olmaya aday.</p>`;
  } else if (userRank <= 4) {
    rankComment = `<p>ÄŸÅ¸â€¡ÂªÄŸÅ¸â€¡Âº <strong>Avrupa Vizesi:</strong> Kadronuz 25 maÃƒÂ§lÃ„Â±k simÃƒÂ¼lasyonu <strong>${userRank}. sÃ„Â±rada</strong> bitirerek Avrupa kupalarÃ„Â±na katÃ„Â±lma hakkÃ„Â± kazandÃ„Â±. Zirve yarÃ„Â±Ã…Å¸Ã„Â±nda bÃƒÂ¼yÃƒÂ¼k bir tehdit oluÃ…Å¸turuyorsunuz.</p>`;
  } else if (userRank <= 8) {
    rankComment = `<p>ÄŸÅ¸â€œË† <strong>Orta SÃ„Â±ra GÃƒÂ¼venliÃ„Å¸i:</strong> Kadronuz ligi <strong>${userRank}. sÃ„Â±rada</strong> tamamladÃ„Â±. Ã„Â°stikrarlÃ„Â± bir performans sergilese de Ã…Å¸ampiyonluk ortaklÃ„Â±Ã„Å¸Ã„Â± iÃƒÂ§in kadro derinliÃ„Å¸i artÃ„Â±rÃ„Â±lmalÃ„Â±.</p>`;
  } else if (userRank <= 15) {
    rankComment = `<p>Ã¢Å¡Â Ã¯Â¸Â <strong>GeliÃ…Å¸ime AÃƒÂ§Ã„Â±k:</strong> Kadronuz ligi <strong>${userRank}. sÃ„Â±rada</strong> bitirdi. DÃƒÂ¼Ã…Å¸me hattÃ„Â±ndan uzak olsa da hedeflenen baÃ…Å¸arÃ„Â±larÃ„Â±n gerisinde kalÃ„Â±ndÃ„Â±.</p>`;
  } else {
    rankComment = `<p>ÄŸÅ¸Å¡Â¨ <strong>KÃƒÅ“ME DÃƒÅ“Ã…ÂME TEHLÃ„Â°KESÃ„Â°!</strong> Kadronuz simÃƒÂ¼lasyonu <strong>${userRank}. sÃ„Â±rada (KÃƒÂ¼me dÃƒÂ¼Ã…Å¸me hattÃ„Â±)</strong> tamamladÃ„Â±. Acilen taktiksel deÃ„Å¸iÃ…Å¸ikliklere ve kritik takviyelere ihtiyaÃƒÂ§ var!</p>`;
  }

  const avgAge = selectedPlayers.reduce((s, p) => s + p.age, 0) / 11;
  let ageAnalysis = "";
  if (avgAge > 30) {
    ageAnalysis = `<p>ÄŸÅ¸â€˜Â´ <strong>Deneyim OdaklÃ„Â± Kadro:</strong> TakÃ„Â±mÃ„Â±nÃ„Â±zÃ„Â±n yaÃ…Å¸ ortalamasÃ„Â± oldukÃƒÂ§a yÃƒÂ¼ksek (<strong>${avgAge.toFixed(1)}</strong>). BÃƒÂ¼yÃƒÂ¼k maÃƒÂ§ streslerini kolaylÃ„Â±kla yÃƒÂ¶netebilecek deneyimli ayaklara sahipsiniz ancak uzun maratonlarda fiziksel dÃƒÂ¼Ã…Å¸ÃƒÂ¼Ã…Å¸ler ve sakatlÃ„Â±k riskleri yaÃ…Å¸anabilir.</p>`;
  } else if (avgAge < 25) {
    ageAnalysis = `<p>ÄŸÅ¸â€˜Â¶ <strong>Gelecek ve Dinamizm:</strong> Kadronuz ÃƒÂ§ok genÃƒÂ§ ve enerjik (<strong>${avgAge.toFixed(1)}</strong> yaÃ…Å¸). Tempolu oyunda ve pres gÃƒÂ¼cÃƒÂ¼nde rakipleri boÃ„Å¸abilirsiniz fakat ligin kÃ„Â±rÃ„Â±lma anlarÃ„Â±nda tecrÃƒÂ¼be eksikliÃ„Å¸i hissedilebilir.</p>`;
  } else {
    ageAnalysis = `<p>Ã¢Å¡â€“Ã¯Â¸Â <strong>Dengeli YaÃ…Å¸ DaÃ„Å¸Ã„Â±lÃ„Â±mÃ„Â±:</strong> TakÃ„Â±m yaÃ…Å¸ ortalamasÃ„Â± son derece dengeli (<strong>${avgAge.toFixed(1)}</strong>). TecrÃƒÂ¼be ile atletizm arasÃ„Â±ndaki altÃ„Â±n dengeyi yakalamÃ„Â±Ã…Å¸ durumdasÃ„Â±nÃ„Â±z.</p>`;
  }

  const budget = state.builderBudget;
  const maxVal = Math.max(...selectedPlayers.map(p => p.marketValue));
  const superstar = selectedPlayers.find(p => p.marketValue === maxVal);
  let budgetAnalysis = "";
  if (maxVal > budget * 0.4) {
    budgetAnalysis = `<p>Ã¢Â­Â <strong>YÃ„Â±ldÃ„Â±z BaÃ„Å¸Ã„Â±mlÃ„Â±lÃ„Â±Ã„Å¸Ã„Â±:</strong> BÃƒÂ¼tÃƒÂ§enizin <strong>%${Math.round((maxVal/budget)*100)}</strong>'ini kaplayan <strong>${superstar.name}</strong> takÃ„Â±mÃ„Â±n mutlak lideri. Bu superstar odaklÃ„Â± bir yapÃ„Â± sunsa da, onun sakatlanmasÃ„Â± halinde alternatif ÃƒÂ¼retmekte zorlanabilirsiniz.</p>`;
  } else {
    budgetAnalysis = `<p>ÄŸÅ¸â€™Â¼ <strong>Dengeli BÃƒÂ¼tÃƒÂ§e YÃƒÂ¶netimi:</strong> BÃƒÂ¼tÃƒÂ§enizi tek bir yÃ„Â±ldÃ„Â±za yatÃ„Â±rmak yerine homojen daÃ„Å¸Ã„Â±tarak geniÃ…Å¸ ve dengeli bir kadro kurmuÃ…Å¸sunuz. SakatlÃ„Â±k veya formsuzluk durumlarÃ„Â±nda alternatiflerinizin olmasÃ„Â± takÃ„Â±mÃ„Â± koruyacaktÃ„Â±r.</p>`;
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
    strengthsText = `<p>ÄŸÅ¸ÂÂ¯ <strong>Taktiksel GÃƒÂ¼ÃƒÂ§ler:</strong> Kadronuzda en ÃƒÂ§ok ÃƒÂ¶ne ÃƒÂ§Ã„Â±kan yetenekler: <strong>${sortedStrengths.slice(0, 2).map(x => x[0]).join(" ve ")}</strong>. Bu nitelikler, oyun kurarken ve hÃƒÂ¼cum varyasyonlarÃ„Â±nda temel silahlarÃ„Â±nÃ„Â±z olacaktÃ„Â±r.</p>`;
  }

  let advice = "";
  if (totalChemistry < 70) {
    advice = `<p>ÄŸÅ¸â€™Â¡ <strong>AI Ãƒâ€“nerisi:</strong> TakÃ„Â±m kimyanÃ„Â±z (<strong>%${totalChemistry}</strong>) biraz dÃƒÂ¼Ã…Å¸ÃƒÂ¼k. AynÃ„Â± takÃ„Â±mdan oynayan oyuncularÃ„Â± bir araya getirerek (ÃƒÂ¶rneÃ„Å¸in stoper ikilisini veya kanat-bek uyumunu) sinerjiyi artÃ„Â±rabilirsiniz.</p>`;
  } else if (totalImpact < 800) {
    advice = `<p>ÄŸÅ¸â€™Â¡ <strong>AI Ãƒâ€“nerisi:</strong> Kadronuz dengeli ancak genel etki kalitesi biraz sÃ„Â±nÃ„Â±rda. BÃƒÂ¼tÃƒÂ§e limitinizi sonuna kadar zorlayÃ„Â±p, daha ucuz mevkilerden tasarruf ederek kilit pozisyonlara daha yÃƒÂ¼ksek puanlÃ„Â± lider oyuncular yerleÃ…Å¸tirebilirsiniz.</p>`;
  } else {
    advice = `<p>ÄŸÅ¸â€™Â¡ <strong>AI Ãƒâ€“nerisi:</strong> Harika bir bÃƒÂ¼tÃƒÂ§e/performans dengesi yakalanmÃ„Â±Ã…Å¸! Bu kadro Ã…Å¸ampiyonluk yarÃ„Â±Ã…Å¸Ã„Â±nÃ„Â±n en gÃƒÂ¼ÃƒÂ§lÃƒÂ¼ adaylarÃ„Â±ndan biri olacaktÃ„Â±r. Taktiksel yapÃ„Â±yÃ„Â± bozmadan devam edin.</p>`;
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
    text: `Ã¢Å¡Â Ã¯Â¸Â <strong>${cardPlayer}</strong> rakip hÃƒÂ¼cumu kesmek iÃƒÂ§in yaptÃ„Â±Ã„Å¸Ã„Â± taktik faul nedeniyle sarÃ„Â± kart gÃƒÂ¶rdÃƒÂ¼.`
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
      text: `Ã¢Å¡Â½ <strong>GOL!</strong> TakÃ„Â±mÃ„Â±nÃ„Â±zda <strong>${scorer}</strong> ceza sahasÃ„Â± iÃƒÂ§inden klas bir vuruÃ…Å¸la${assistText} golÃƒÂ¼ buluyor!`
    });
  }

  for (let i = 0; i < oppGoals; i++) {
    timelineEvents.push({
      min: Math.floor(Math.random() * 45) + (i * 15) + 10,
      type: "opp-goal",
      text: `Ã¢Å¡Â½ <strong>Gol!</strong> ${opponent} takÃ„Â±mÃ„Â± hÃ„Â±zlÃ„Â± hÃƒÂ¼cumla savunmamÃ„Â±zÃ„Â±n arkasÃ„Â±na sarkarak golÃƒÂ¼ atÃ„Â±yor.`
    });
  }

  const gks = selectedPlayers.filter(p => p.position === "Kaleci");
  const gkName = gks.length > 0 ? gks[0].name : "Kalecimiz";
  timelineEvents.push({
    min: Math.floor(Math.random() * 20) + 70,
    type: "save",
    text: `ÄŸÅ¸Â§Â¤ <strong>Dev KurtarÃ„Â±Ã…Å¸!</strong> ${opponent} hÃƒÂ¼cumunda karÃ…Å¸Ã„Â± karÃ…Å¸Ã„Â±ya kalÃ„Â±nan pozisyonda kalecimiz <strong>${gkName}</strong> mÃƒÂ¼thiÃ…Å¸ refleksle golÃƒÂ¼ ÃƒÂ¶nledi.`
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
    builderPlayerList.innerHTML = `<p style="padding:20px; text-align:center; color:var(--muted); font-weight:600;">Oyuncu bulunamadÃ„Â±.</p>`;
    return;
  }
  
  builderPlayerList.innerHTML = filtered.map(p => `
    <div class="builder-player-card" data-name="${p.name}">
      <div class="builder-player-info">
        <strong>${p.name}</strong>
        <small>${p.team} Ã¢â‚¬Â¢ ${p.position} Ã¢â‚¬Â¢ YaÃ…Å¸ ${p.age}</small>
      </div>
      <div class="builder-player-stats">
        <span class="builder-player-val">${p.marketValue.toFixed(1)} MÃ¢â€šÂ¬</span>
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
      <button class="remove-player-btn" data-role="${role}" type="button" aria-label="KaldÃ„Â±r">Ã¢Å“â€¢</button>
      <div class="slot-photo-wrapper">
        <img id="${imgId}" class="slot-player-img" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100%25' height='100%25' fill='%230f172a'/%3E%3C/svg%3E" alt="${player.name}">
      </div>
      <span class="slot-role">${role.toUpperCase()}</span>
      <span class="populated-player-name">${player.name}</span>
      <span class="populated-player-value">${player.marketValue.toFixed(1)} MÃ¢â€šÂ¬</span>
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
  
  totalValueValue.textContent = totalValue.toFixed(1) + " MÃ¢â€šÂ¬";
  totalImpactValue.textContent = totalImpact;
  
  const budget = state.builderBudget;
  maxBudgetValue.textContent = budget.toFixed(1) + " MÃ¢â€šÂ¬";
  
  const pct = Math.min(100, (totalValue / budget) * 100);
  budgetProgressBar.style.width = pct + "%";
  
  const labelsEl = totalValueValue.closest(".budget-progress-labels");
  
  if (totalValue > budget) {
    budgetProgressBar.classList.add("exceeded");
    if (labelsEl) labelsEl.classList.add("exceeded");
    
    builderMessage.className = "builder-status-msg error";
    builderMessage.textContent = `BÃƒÂ¼tÃƒÂ§e limitini aÃ…Å¸tÃ„Â±nÃ„Â±z! Limit: ${budget.toFixed(1)} MÃ¢â€šÂ¬, Kadro DeÃ„Å¸eri: ${totalValue.toFixed(1)} MÃ¢â€šÂ¬`;
    builderMessage.hidden = false;
  } else {
    budgetProgressBar.classList.remove("exceeded");
    if (labelsEl) labelsEl.classList.remove("exceeded");
    
    if (populatedCount === 11) {
      builderMessage.className = "builder-status-msg success";
      builderMessage.textContent = `Tebrikler! ${budget.toFixed(1)} MÃ¢â€šÂ¬ bÃƒÂ¼tÃƒÂ§e altÃ„Â±nda ${totalImpact} toplam etki skoruyla kadronuzu baÃ…Å¸arÃ„Â±yla kurdunuz!`;
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
      downloadSquadBtn.innerHTML = "Ã„Â°ndiriliyor...";
      downloadSquadBtn.disabled = true;

      // Ensure html2canvas is loaded
      if (typeof html2canvas === "undefined") {
        alert("Ã„Â°ndirme aracÃ„Â± yÃƒÂ¼klenemedi. LÃƒÂ¼tfen sayfayÃ„Â± yenileyin.");
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
        console.error("Ekran gÃƒÂ¶rÃƒÂ¼ntÃƒÂ¼sÃƒÂ¼ alÃ„Â±nÃ„Â±rken hata:", err);
        alert("Bir hata oluÃ…Å¸tu.");
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
    { title: "Lig TemasÃ„Â±", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" },
    { title: "Atmosfer MÃƒÂ¼ziÃ„Å¸i", url: "https://raw.githubusercontent.com/rafaelreis-hotmart/Audio-Sample-files/master/sample2.mp3" }
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
          playBtn.textContent = "Ã¢ÂÂ¸";
          statusText.textContent = "OynatÃ„Â±lÃ„Â±yor";
        })
        .catch(err => {
          console.warn("Audio play blocked:", err);
          statusText.textContent = "TÃ„Â±kla & Oynat";
        });
    } else {
      bgAudio.pause();
      musicPlayer.classList.remove("playing");
      playBtn.textContent = "Ã¢â€“Â¶";
      statusText.textContent = "DuraklatÃ„Â±ldÃ„Â±";
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
          playBtn.textContent = "Ã¢ÂÂ¸";
          statusText.textContent = "OynatÃ„Â±lÃ„Â±yor";
        })
        .catch(() => {
          musicPlayer.classList.remove("playing");
          playBtn.textContent = "Ã¢â€“Â¶";
          statusText.textContent = "DuraklatÃ„Â±ldÃ„Â±";
        });
    } else {
      statusText.textContent = "DuraklatÃ„Â±ldÃ„Â±";
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

// Ã¢â€â‚¬Ã¢â€â‚¬ INIT Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
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
