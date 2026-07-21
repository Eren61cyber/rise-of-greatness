$files = @('database.js', 'events.js', 'game.js', 'matchEngine.js', 'index.html', 'styles.css')
foreach ($f in $files) {
    $path = "c:\Users\Eren\Documents\GitHub\superlig-atlasi\Oyuncu Kariyeri Oyunu\" + $f
    $b = [System.IO.File]::ReadAllBytes($path)
    if ($b.Length -ge 3) {
        $hasBOM = ($b[0] -eq 239 -and $b[1] -eq 187 -and $b[2] -eq 191)
        Write-Host "$f BOM: $hasBOM"
    }
}
