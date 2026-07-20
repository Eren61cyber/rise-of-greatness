$utf8NoBom = New-Object System.Text.UTF8Encoding($false)

$files = @("database.js", "events.js", "game.js", "matchEngine.js", "index.html", "styles.css")

foreach ($file in $files) {
    $path = "c:\Users\Eren\Documents\GitHub\superlig-atlasi\Oyuncu Kariyeri Oyunu\" + $file
    if (Test-Path $path) {
        $content = [System.IO.File]::ReadAllText($path)
        [System.IO.File]::WriteAllText($path, $content, $utf8NoBom)
        Write-Host "Fixed BOM for $file" -ForegroundColor Green
    }
}
