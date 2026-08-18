$dest = "C:\Users\Eren\Desktop\RiseOfGreatness_Final"
$zipPath = "C:\Users\Eren\Desktop\RiseOfGreatness_Final_v2.zip"

if (Test-Path $zipPath) { Remove-Item $zipPath -Force }

$items = Get-ChildItem -Path $dest
Compress-Archive -Path $items.FullName -DestinationPath $zipPath -Force

$zip = Get-Item $zipPath
Write-Host "ZIP olusturuldu: $($zip.Name) - Boyut: $([math]::Round($zip.Length / 1MB, 2)) MB" -ForegroundColor Green
