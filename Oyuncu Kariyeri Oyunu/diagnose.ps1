$dest = "C:\Users\Eren\Desktop\RiseOfGreatness_Final"

# Check BOM
$bytes = [System.IO.File]::ReadAllBytes("$dest\index.html")
Write-Host "index.html first 3 bytes: $($bytes[0]), $($bytes[1]), $($bytes[2])"

$bytes2 = [System.IO.File]::ReadAllBytes("$dest\game.js")
Write-Host "game.js first 3 bytes: $($bytes2[0]), $($bytes2[1]), $($bytes2[2])"

$bytes3 = [System.IO.File]::ReadAllBytes("$dest\matchEngine.js")
Write-Host "matchEngine.js first 3 bytes: $($bytes3[0]), $($bytes3[1]), $($bytes3[2])"

# Check Turk char test
$html = [System.IO.File]::ReadAllText("$dest\index.html")
$idx = $html.IndexOf("Manşetleri")
Write-Host "Mansetleri index: $idx"

$idx2 = $html.IndexOf("Şentürk")
Write-Host "Senturk index: $idx2"

# Check for garbled chars
$matches = [regex]::Matches($html, "ÅŸ|Ä±|Ã¶|Ã¼|Ã§|Ä°|ÅŸ|Ã–|Ãœ|Ã‡")
Write-Host "Garbled UTF-8 char count: $($matches.Count)"

# Check intro.mp4 reference
$introRef = $html.IndexOf("intro.mp4")
Write-Host "intro.mp4 reference: $introRef"
