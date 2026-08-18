$utf8NoBom = New-Object System.Text.UTF8Encoding($false)
$src = "c:\Users\Eren\Documents\GitHub\superlig-atlasi\Oyuncu Kariyeri Oyunu"
$dest = "C:\Users\Eren\Desktop\RiseOfGreatness_Final"

if (Test-Path $dest) { Remove-Item $dest -Recurse -Force }
New-Item -ItemType Directory -Path $dest | Out-Null

$gameFiles = @("index.html","game.js","matchEngine.js","database.js","events.js","styles.css","logo.png","riseup_studios_logo.png","stadium_bg.png","carbon_bg.png","gold_pack_bg.png","ece_portrait.png")

foreach ($file in $gameFiles) {
    $filePath = Join-Path $src $file
    if (Test-Path $filePath) {
        Copy-Item $filePath -Destination $dest -Force
    }
}

if (Test-Path (Join-Path $src "sounds")) {
    Copy-Item (Join-Path $src "sounds") -Destination (Join-Path $dest "sounds") -Recurse -Force
}

if (Test-Path (Join-Path $src "avatars")) {
    Copy-Item (Join-Path $src "avatars") -Destination (Join-Path $dest "avatars") -Recurse -Force
}

$indexPath = Join-Path $dest "index.html"
$htmlContent = [System.IO.File]::ReadAllText($indexPath)
$htmlContent = $htmlContent.Replace('database.js?v=1.4', 'database.js')
$htmlContent = $htmlContent.Replace('events.js?v=1.4', 'events.js')
$htmlContent = $htmlContent.Replace('game.js?v=1.4', 'game.js')
$htmlContent = $htmlContent.Replace('matchEngine.js?v=1.4', 'matchEngine.js')
$htmlContent = $htmlContent.Replace('styles.css?v=1.4', 'styles.css')
[System.IO.File]::WriteAllText($indexPath, $htmlContent, $utf8NoBom)

$textFiles = Get-ChildItem -Path $dest -Include *.js,*.html,*.css -Recurse
foreach ($tf in $textFiles) {
    $content = [System.IO.File]::ReadAllText($tf.FullName)
    [System.IO.File]::WriteAllText($tf.FullName, $content, $utf8NoBom)
}

$zipPath = "C:\Users\Eren\Desktop\RiseOfGreatness_Final_v2.zip"
if (Test-Path $zipPath) { Remove-Item $zipPath -Force }
$items = Get-ChildItem -Path $dest
Compress-Archive -Path $items.FullName -DestinationPath $zipPath -Force

Write-Host "RiseOfGreatness_Final_v2.zip masaustunde hazir!" -ForegroundColor Green
