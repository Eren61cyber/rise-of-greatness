Expand-Archive -Path "C:\Users\Eren\Documents\GitHub\superlig-atlasi\Oyuncu Kariyeri Oyunu\RiseOfGreatness_WebBuild.zip" -DestinationPath "C:\Users\Eren\Desktop\TestZip" -Force
$path = "C:\Users\Eren\Desktop\TestZip\database.js"
$b = [System.IO.File]::ReadAllBytes($path)
Write-Host "ZIP database.js size: $($b.Length)"
$hasBOM = ($b[0] -eq 239 -and $b[1] -eq 187 -and $b[2] -eq 191)
Write-Host "ZIP database.js BOM: $hasBOM"
