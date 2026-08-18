# Read as lines to do exact line-based replacement
$lines = [System.IO.File]::ReadAllLines("game.js", [System.Text.Encoding]::UTF8)

# Line 109 (0-indexed: 108)
$lines[108] = '            suspendedWeeks: 0,'

# Lines 385-386 (0-indexed: 384-385)
$lines[384] = '                if (typeof this.state.suspendedWeeks === "undefined") {'
$lines[385] = '                    this.state.suspendedWeeks = 0;'

# Lines 934-937 (0-indexed: 933-936)
# Replace with new block (more lines)
$before = $lines[0..932]
$after = $lines[937..($lines.Length - 1)]

$newBlock = @(
    '        if (this.state.suspendedWeeks > 0) {',
    '            this.state.suspendedWeeks--;',
    '            if (this.state.suspendedWeeks === 0) {',
    '                this.addSocialPost("@spor_manset", "Spor Man' + [char]0x15F + 'etleri", `Cezas' + [char]0x131 + ' bitti! K' + [char]0x131 + 'rm' + [char]0x131 + 'z' + [char]0x131 + ' kart cezas' + [char]0x131 + ' sona eren gen' + [char]0xE7 + ' yetenek ${this.state.playerName} yeniden formas' + [char]0x131 + 'na kavu' + [char]0x15F + 'uyor.`);',
    '            }',
    '        }'
)

$allLines = $before + $newBlock + $after

$utf8NoBom = New-Object System.Text.UTF8Encoding($false)
[System.IO.File]::WriteAllLines("game.js", $allLines, $utf8NoBom)

# Verify
$check = [System.IO.File]::ReadAllText("game.js", [System.Text.Encoding]::UTF8)
Write-Host "suspendedWeeks: 0 -> $($check.Contains('suspendedWeeks: 0,'))"
Write-Host "suspendedWeeks undefined -> $($check.Contains('typeof this.state.suspendedWeeks'))"
Write-Host "suspendedWeeks > 0 -> $($check.Contains('this.state.suspendedWeeks > 0'))"
Write-Host "isSuspended remaining -> $($check.Contains('isSuspended'))"
Write-Host "Total lines: $($allLines.Length)"
