$lines = Get-Content 'game.js'
$startIndex = -1
$endIndex = -1

for ($i = 0; $i -lt $lines.Count; $i++) {
    if ($lines[$i] -match '^    generateAvatar: function') {
        $startIndex = $i
        break
    }
}

for ($i = $startIndex; $i -lt $lines.Count; $i++) {
    if ($lines[$i] -match '</svg>`;') {
        $endIndex = $i + 1
        break
    }
}

if ($startIndex -ne -1 -and $endIndex -ne -1) {
    $replacement = "    generateAvatar: function(age) { const avatarUrl = this.state.avatarImage || `"avatars/avatar_1.png`"; return `"<img src=\`"`${avatarUrl}\`" style=\`"width: 100%; height: 100%; object-fit: cover; border-radius: 50%;\`">\`"; },"
    
    $newLines = @()
    if ($startIndex -gt 0) { $newLines += $lines[0..($startIndex-1)] }
    $newLines += $replacement
    if ($endIndex -lt $lines.Count) { $newLines += $lines[$endIndex..($lines.Count-1)] }
    
    $newLines | Set-Content 'game.js' -Encoding UTF8
    Write-Host "Success: Replaced lines $startIndex to $endIndex"
} else {
    Write-Host "Failed: Could not find start or end index"
}
