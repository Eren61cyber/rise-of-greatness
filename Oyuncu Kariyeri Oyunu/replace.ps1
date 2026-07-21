$text = Get-Content -Raw "game.js"
$pattern = "(?s)generateAvatar: function\(age\) \{.*?</svg>`;\s*\},"
$replacement = "generateAvatar: function(age) { const avatarUrl = this.state.avatarImage || `"avatars/avatar_1.png`"; return `"<img src=\`"`${avatarUrl}\`" style=\`"width: 100%; height: 100%; object-fit: cover; border-radius: 50%;\`">\`"; },"
$newText = [regex]::Replace($text, $pattern, $replacement)
Set-Content -Path "game.js" -Value $newText -Encoding UTF8
Write-Host "Done"
