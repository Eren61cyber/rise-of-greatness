$dest = "C:\Users\Eren\Desktop\RiseOfGreatness_Final"

$bytes = [System.IO.File]::ReadAllBytes("$dest\index.html")
Write-Host "index.html first 3 bytes: $($bytes[0]), $($bytes[1]), $($bytes[2])"

$bytes2 = [System.IO.File]::ReadAllBytes("$dest\game.js")
Write-Host "game.js first 3 bytes: $($bytes2[0]), $($bytes2[1]), $($bytes2[2])"

$bytes3 = [System.IO.File]::ReadAllBytes("$dest\matchEngine.js")
Write-Host "matchEngine.js first 3 bytes: $($bytes3[0]), $($bytes3[1]), $($bytes3[2])"

# Check intro.mp4 reference
$html = [System.IO.File]::ReadAllText("$dest\index.html")
$introRef = $html.IndexOf("intro.mp4")
Write-Host "intro.mp4 reference index: $introRef"

# Check if intro.mp4 exists in the build
$introExists = Test-Path "$dest\intro.mp4"
Write-Host "intro.mp4 exists in build: $introExists"

# Check charset meta tag
$charsetIdx = $html.IndexOf("charset")
Write-Host "charset tag index: $charsetIdx"
if ($charsetIdx -ge 0) {
    Write-Host "charset context: $($html.Substring($charsetIdx, 30))"
}

# Check img src references
$imgPattern = 'src="([^"]*\.png)"'
$imgMatches = [regex]::Matches($html, $imgPattern)
Write-Host "`nAll PNG references in index.html:"
$uniqueSrcs = @{}
foreach ($m in $imgMatches) {
    $src = $m.Groups[1].Value
    if (-not $uniqueSrcs.ContainsKey($src)) {
        $uniqueSrcs[$src] = 1
        $exists = Test-Path "$dest\$src"
        Write-Host "  $src -> exists: $exists"
    }
}
