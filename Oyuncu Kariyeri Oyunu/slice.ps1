$lines = Get-Content 'game.js'
$newLines = @()
$skip = $false

for ($i = 0; $i -lt $lines.Count; $i++) {
    if ($lines[$i] -match '^    generateAvatar: function') {
        $skip = $true
        $newLines += '    generateAvatar: function(age) { const avatarUrl = this.state.avatarImage || "avatars/avatar_1.png"; return `<img src="${avatarUrl}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;">`; },'
        continue
    }
    
    if ($skip) {
        if ($lines[$i] -match 'return svg;') {
            $skip = $false
            $i++ # skip the next line which is `    },`
        }
        continue
    }
    
    $newLines += $lines[$i]
}

$newLines | Set-Content 'game.js' -Encoding UTF8
Write-Host "Success! File sliced."
