# Check source database.js
$path = "c:\Users\Eren\Documents\GitHub\superlig-atlasi\Oyuncu Kariyeri Oyunu\database.js"
$bytes = [System.IO.File]::ReadAllBytes($path)
Write-Host "SOURCE database.js - First 10 bytes:"
for ($i = 0; $i -lt 10; $i++) {
    Write-Host ("  Byte $i = " + $bytes[$i] + " (char: " + [char]$bytes[$i] + ")")
}

# Check ALL js files in Final folder
Write-Host ""
$jsFiles = Get-ChildItem "C:\Users\Eren\Desktop\RiseOfGreatness_Final\*.js"
foreach ($f in $jsFiles) {
    $b = [System.IO.File]::ReadAllBytes($f.FullName)
    $hasBOM = ($b[0] -eq 239 -and $b[1] -eq 187 -and $b[2] -eq 191)
    Write-Host "$($f.Name): Size=$($b.Length) bytes, BOM=$hasBOM, First3Bytes=[$($b[0]),$($b[1]),$($b[2])]"
}

# Check index.html for script loading order
Write-Host ""
Write-Host "Script tags in index.html:"
$html = Get-Content "C:\Users\Eren\Desktop\RiseOfGreatness_Final\index.html" -Raw
$matches2 = [regex]::Matches($html, '<script src="[^"]*"')
foreach ($m in $matches2) {
    Write-Host "  $($m.Value)"
}
