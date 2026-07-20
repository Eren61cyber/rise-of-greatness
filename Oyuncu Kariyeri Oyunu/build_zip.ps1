$files = @(
    "index.html",
    "game.js",
    "matchEngine.js",
    "database.js",
    "events.js",
    "styles.css",
    "intro.mp4",
    "logo.png",
    "riseup_studios_logo.png",
    "stadium_bg.png",
    "carbon_bg.png",
    "gold_pack_bg.png",
    "ece_portrait.png",
    "sounds"
)

Compress-Archive -Path $files -DestinationPath "RiseOfGreatness_WebBuild.zip" -Force
Write-Host "ZIP dosyasi RiseOfGreatness_WebBuild.zip adinda olusturuldu!" -ForegroundColor Green
