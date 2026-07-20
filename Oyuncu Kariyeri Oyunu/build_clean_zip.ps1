$src = 'C:\Users\Eren\Desktop\RiseOfGreatness_WebFiles'
$destZip = 'C:\Users\Eren\Desktop\RiseOfGreatness_Clean.zip'
if (Test-Path $destZip) { Remove-Item $destZip -Force }

$items = Get-ChildItem -Path $src
Compress-Archive -Path $items.FullName -DestinationPath $destZip -Force
Write-Host "Clean ZIP created successfully!" -ForegroundColor Green
