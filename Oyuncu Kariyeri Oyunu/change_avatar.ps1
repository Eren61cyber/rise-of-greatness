$gameJs = [IO.File]::ReadAllText("game.js", [System.Text.Encoding]::UTF8)
$gameJs = $gameJs.Replace('"avatars/avatar_1.png"', '"avatars/avatar_main.png"')
[IO.File]::WriteAllText("game.js", $gameJs, [System.Text.Encoding]::UTF8)
Write-Host "Updated avatar_1 to avatar_main"
