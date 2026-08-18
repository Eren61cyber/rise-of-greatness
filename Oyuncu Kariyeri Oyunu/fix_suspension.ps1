$gameJs = [IO.File]::ReadAllText("game.js", [System.Text.Encoding]::UTF8)

# Replace initialization
$gameJs = $gameJs -replace 'isSuspended: false,', 'suspendedWeeks: 0,'
$gameJs = $gameJs -replace 'typeof this.state.isSuspended', 'typeof this.state.suspendedWeeks'
$gameJs = $gameJs -replace 'this.state.isSuspended = false;', 'this.state.suspendedWeeks = 0;'

# Fix advanceWeek logic
$oldAdvanceWeekLogic = '        if \(this\.state\.isSuspended\) \{
            this\.state\.isSuspended = false;
            this\.addSocialPost\("@spor_manset", "Spor Manşetleri", `Cezası bitti! Kırmızı kart cezası sona eren genç yetenek \$\{this\.state\.playerName\} yeniden formasına kavuşuyor\."\);
        \}'

$newAdvanceWeekLogic = '        if (this.state.suspendedWeeks > 0) {
            this.state.suspendedWeeks--;
            if (this.state.suspendedWeeks === 0) {
                this.addSocialPost("@spor_manset", "Spor Manşetleri", `Cezası bitti! Kırmızı kart cezası sona eren genç yetenek ${this.state.playerName} yeniden formasına kavuşuyor.`);
            }
        }'

# The exact text might be slightly different. Let's do a regex replace.
$gameJs = [regex]::Replace($gameJs, '(?s)if \(this\.state\.isSuspended\) \{.*?\}', $newAdvanceWeekLogic)

[IO.File]::WriteAllText("game.js", $gameJs, [System.Text.Encoding]::UTF8)

# Now fix matchEngine.js
$matchEngine = [IO.File]::ReadAllText("matchEngine.js", [System.Text.Encoding]::UTF8)

# Remove all GAME.state.isSuspended = true; first
$matchEngine = $matchEngine -replace 'GAME\.state\.isSuspended = true;\s*', ''

# Add GAME.state.suspendedWeeks = 2; after every this.isSentOff = true;
$matchEngine = $matchEngine -replace 'this\.isSentOff = true;', "this.isSentOff = true;`r`n                        GAME.state.suspendedWeeks = 2;"

[IO.File]::WriteAllText("matchEngine.js", $matchEngine, [System.Text.Encoding]::UTF8)

# Now fix index.html
$indexHtml = [IO.File]::ReadAllText("index.html", [System.Text.Encoding]::UTF8)

$indexHtml = $indexHtml -replace 'GAME\.state\.isSuspended = true; // Suspended from playing matches this season', 'GAME.state.suspendedWeeks = 34; // Suspended from playing matches this season'
$indexHtml = $indexHtml -replace 'GAME\.state\.isSuspended = true;', 'GAME.state.suspendedWeeks = 2;'
$indexHtml = $indexHtml -replace 'GAME\.state\.isSuspended', 'GAME.state.suspendedWeeks > 0'

[IO.File]::WriteAllText("index.html", $indexHtml, [System.Text.Encoding]::UTF8)

Write-Host "Fix applied."
