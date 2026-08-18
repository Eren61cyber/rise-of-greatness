# Avatar fix in game.js
$bytes = [System.IO.File]::ReadAllBytes("game.js")
$content = [System.Text.Encoding]::UTF8.GetString($bytes)
$content = $content.Replace('"avatars/avatar_1.png"', '"avatars/avatar_main.png"')

$utf8NoBom = New-Object System.Text.UTF8Encoding($false)
[System.IO.File]::WriteAllText("game.js", $content, $utf8NoBom)

$verify = [System.IO.File]::ReadAllText("game.js", [System.Text.Encoding]::UTF8)
$count = ([regex]::Matches($verify, "avatar_main.png")).Count
Write-Host "avatar_main.png references: $count"
Write-Host "avatar_1.png remaining: $($verify.Contains('avatar_1.png'))"
