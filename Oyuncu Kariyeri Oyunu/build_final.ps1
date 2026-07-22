$utf8NoBom = New-Object System.Text.UTF8Encoding($false)
$src = "c:\Users\Eren\Documents\GitHub\superlig-atlasi\Oyuncu Kariyeri Oyunu"
$dest = "C:\Users\Eren\Desktop\RiseOfGreatness_Final"

# Temiz klasor olustur
if (Test-Path $dest) { Remove-Item $dest -Recurse -Force }
New-Item -ItemType Directory -Path $dest | Out-Null

# Sadece oyun dosyalarini kopyala
$gameFiles = @("index.html","game.js","matchEngine.js","database.js","events.js","styles.css","logo.png","riseup_studios_logo.png","stadium_bg.png","carbon_bg.png","gold_pack_bg.png","ece_portrait.png")

foreach ($file in $gameFiles) {
    $filePath = Join-Path $src $file
    if (Test-Path $filePath) {
        Copy-Item $filePath -Destination $dest -Force
    }
}

# Sounds klasorunu kopyala
if (Test-Path (Join-Path $src "sounds")) {
    Copy-Item (Join-Path $src "sounds") -Destination (Join-Path $dest "sounds") -Recurse -Force
}

# index.html icindeki ?v=1.4 parametrelerini kaldir
$indexPath = Join-Path $dest "index.html"
$htmlContent = [System.IO.File]::ReadAllText($indexPath)
$htmlContent = $htmlContent.Replace('database.js?v=1.6', 'database.js?v=1.7')
$htmlContent = $htmlContent.Replace('events.js?v=1.6', 'events.js?v=1.7')
$htmlContent = $htmlContent.Replace('game.js?v=1.6', 'game.js?v=1.7')
$htmlContent = $htmlContent.Replace('matchEngine.js?v=1.6', 'matchEngine.js?v=1.7')
$htmlContent = $htmlContent.Replace('styles.css?v=1.6', 'styles.css?v=1.7')
[System.IO.File]::WriteAllText($indexPath, $htmlContent, $utf8NoBom)

# Tum JS ve HTML dosyalarinin BOM karakterlerini temizle
$textFiles = Get-ChildItem -Path $dest -Include *.js,*.html,*.css -Recurse
foreach ($tf in $textFiles) {
    $content = [System.IO.File]::ReadAllText($tf.FullName)
    [System.IO.File]::WriteAllText($tf.FullName, $content, $utf8NoBom)
}

# ZIP olustur
$zipPath = "C:\Users\Eren\Desktop\RiseOfGreatness_Final.zip"
if (Test-Path $zipPath) { Remove-Item $zipPath -Force }
$items = Get-ChildItem -Path $dest
Compress-Archive -Path $items.FullName -DestinationPath $zipPath -Force

Write-Host "TAMAM! RiseOfGreatness_Final.zip masaustunde hazir! (v1.4 parametreleri kaldirildi)" -ForegroundColor Green
