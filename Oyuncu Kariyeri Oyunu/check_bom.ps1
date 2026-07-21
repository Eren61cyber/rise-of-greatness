$path = "C:\Users\Eren\Desktop\RiseOfGreatness_Final\database.js"
$bytes = [System.IO.File]::ReadAllBytes($path)
Write-Host "First 10 bytes:"
for ($i = 0; $i -lt 10; $i++) {
    Write-Host ("Byte $i = " + $bytes[$i] + " (char: " + [char]$bytes[$i] + ")")
}
Write-Host ""
Write-Host "File size: $($bytes.Length) bytes"
