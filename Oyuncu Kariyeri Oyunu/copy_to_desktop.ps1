$dest = 'C:\Users\Eren\Desktop\RiseOfGreatness_WebFiles'
if (Test-Path $dest) { Remove-Item $dest -Recurse -Force }
New-Item -ItemType Directory -Path $dest | Out-Null

$src = 'c:\Users\Eren\Documents\GitHub\superlig-atlasi\Oyuncu Kariyeri Oyunu'
$items = Get-ChildItem -Path $src -Exclude "android-app", "*.zip", "*.ps1", "*.js.jar", "*.bin"

foreach ($item in $items) {
    Copy-Item -Path $item.FullName -Destination $dest -Recurse -Force
}
Write-Host "Klasor Masaustune kopyalandi!" -ForegroundColor Green
