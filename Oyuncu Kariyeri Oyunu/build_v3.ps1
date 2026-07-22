$utf8NoBom = New-Object System.Text.UTF8Encoding($false)
$src = "c:\Users\Eren\Documents\GitHub\superlig-atlasi\Oyuncu Kariyeri Oyunu"
$dest = "C:\Users\Eren\Desktop\RiseOfGreatness_Final"

# Temiz klasor
if (Test-Path $dest) { Remove-Item $dest -Recurse -Force }
New-Item -ItemType Directory -Path $dest | Out-Null

# Oyun dosyalari
$gameFiles = @("index.html","game.js","matchEngine.js","database.js","events.js","styles.css","logo.png","riseup_studios_logo.png","stadium_bg.png","carbon_bg.png","gold_pack_bg.png","ece_portrait.png")
foreach ($file in $gameFiles) {
    $filePath = Join-Path $src $file
    if (Test-Path $filePath) { Copy-Item $filePath -Destination $dest -Force }
}

# Sounds
if (Test-Path (Join-Path $src "sounds")) {
    Copy-Item (Join-Path $src "sounds") -Destination (Join-Path $dest "sounds") -Recurse -Force
}

# Avatars
if (Test-Path (Join-Path $src "avatars")) {
    Copy-Item (Join-Path $src "avatars") -Destination (Join-Path $dest "avatars") -Recurse -Force
}

# v1.4 parametrelerini kaldir
$indexPath = Join-Path $dest "index.html"
$htmlContent = [System.IO.File]::ReadAllText($indexPath, [System.Text.Encoding]::UTF8)
$htmlContent = $htmlContent.Replace('database.js?v=1.4', 'database.js?v=1.5')
$htmlContent = $htmlContent.Replace('events.js?v=1.4', 'events.js?v=1.5')
$htmlContent = $htmlContent.Replace('game.js?v=1.4', 'game.js?v=1.5')
$htmlContent = $htmlContent.Replace('matchEngine.js?v=1.4', 'matchEngine.js?v=1.5')
$htmlContent = $htmlContent.Replace('styles.css?v=1.4', 'styles.css?v=1.5')
[System.IO.File]::WriteAllText($indexPath, $htmlContent, $utf8NoBom)

# BOM temizle
$textFiles = Get-ChildItem -Path $dest -Include *.js,*.html,*.css -Recurse
foreach ($tf in $textFiles) {
    $content = [System.IO.File]::ReadAllText($tf.FullName, [System.Text.Encoding]::UTF8)
    [System.IO.File]::WriteAllText($tf.FullName, $content, $utf8NoBom)
}

# ZIP
$zipPath = "C:\Users\Eren\Desktop\RiseOfGreatness_v3.zip"
if (Test-Path $zipPath) { Remove-Item $zipPath -Force }
$items = Get-ChildItem -Path $dest
Compress-Archive -Path $items.FullName -DestinationPath $zipPath -Force

$zip = Get-Item $zipPath
Write-Host ""
Write-Host "=== BUILD BASARILI ===" -ForegroundColor Green
Write-Host "Dosya: $($zip.Name)" -ForegroundColor Green
Write-Host "Boyut: $([math]::Round($zip.Length / 1MB, 2)) MB" -ForegroundColor Green
Write-Host "Konum: $($zip.FullName)" -ForegroundColor Green

# Son kontrol
Write-Host ""
Write-Host "=== DOSYA KONTROL ===" -ForegroundColor Cyan
$requiredFiles = @("index.html","game.js","matchEngine.js","database.js","events.js","styles.css","logo.png","stadium_bg.png","carbon_bg.png","gold_pack_bg.png","ece_portrait.png","riseup_studios_logo.png")
foreach ($rf in $requiredFiles) {
    $exists = Test-Path (Join-Path $dest $rf)
    $status = if ($exists) { "OK" } else { "EKSIK!" }
    Write-Host "  $rf -> $status"
}
$avatarCount = (Get-ChildItem (Join-Path $dest "avatars") -Filter "*.png").Count
Write-Host "  avatars/ -> $avatarCount resim"
$soundCount = (Get-ChildItem (Join-Path $dest "sounds") -Filter "*.mp3").Count
Write-Host "  sounds/ -> $soundCount ses"
