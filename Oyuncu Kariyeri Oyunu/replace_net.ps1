$text = [IO.File]::ReadAllText("game.js")
$start = $text.IndexOf("    generateAvatar: function(age) {")
$endStr1 = "</svg>`"
$endStr2 = '        `;'
$endStr3 = "        return svg;"
$endStr4 = "    },"

# find the last part manually or use regex on the substring
$pattern = "(?s)    generateAvatar: function\(age\) \{.*?</svg>`\s*;\s*return svg;\s*\},"
$newText = [regex]::Replace($text, $pattern, "    generateAvatar: function(age) { const avatarUrl = this.state.avatarImage || 'avatars/avatar_1.png'; return `<img src=`"${avatarUrl}`" style=`"width: 100%; height: 100%; object-fit: cover; border-radius: 50%;`">`; },")

if ($text.Length -eq $newText.Length) {
    Write-Host "No change made. Regex failed."
} else {
    [IO.File]::WriteAllText("game.js", $newText)
    Write-Host "Success! Length changed from $($text.Length) to $($newText.Length)"
}
