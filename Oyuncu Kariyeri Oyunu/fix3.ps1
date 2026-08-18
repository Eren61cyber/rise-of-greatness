$lines = Get-Content "game.js"

$lines[108] = '            suspendedWeeks: 0,'
$lines[384] = '                if (typeof this.state.suspendedWeeks === "undefined") {'
$lines[385] = '                    this.state.suspendedWeeks = 0;'

$lines[933] = '        if (this.state.suspendedWeeks > 0) {'
$lines[934] = '            this.state.suspendedWeeks--;'
$lines[935] = '            if (this.state.suspendedWeeks === 0) {'
$lines[936] = '                this.addSocialPost("@spor_manset", "Spor Manşetleri", `Cezası bitti! Kırmızı kart cezası sona eren genç yetenek ${this.state.playerName} yeniden formasına kavuşuyor.`);'
$lines[937] = '            }'
$lines[938] = '        }'

$lines | Set-Content "game.js" -Encoding UTF8


$matchEngine = [IO.File]::ReadAllText("matchEngine.js", [System.Text.Encoding]::UTF8)
$matchEngine = $matchEngine.Replace("GAME.state.isSuspended = true;", "")
$matchEngine = $matchEngine.Replace("this.isSentOff = true;", "this.isSentOff = true;`r`n                        GAME.state.suspendedWeeks = 2;")
[IO.File]::WriteAllText("matchEngine.js", $matchEngine, [System.Text.Encoding]::UTF8)


$indexHtml = [IO.File]::ReadAllText("index.html", [System.Text.Encoding]::UTF8)
$indexHtml = $indexHtml.Replace("GAME.state.isSuspended = true; // Suspended from playing matches this season", "GAME.state.suspendedWeeks = 34; // Suspended from playing matches this season")
$indexHtml = $indexHtml.Replace("GAME.state.isSuspended = true;", "GAME.state.suspendedWeeks = 2;")
$indexHtml = $indexHtml.Replace("GAME.state.isSuspended", "GAME.state.suspendedWeeks > 0")
[IO.File]::WriteAllText("index.html", $indexHtml, [System.Text.Encoding]::UTF8)

Write-Host "Fix applied cleanly."
