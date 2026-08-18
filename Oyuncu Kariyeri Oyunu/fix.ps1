$gameJs = [IO.File]::ReadAllText("game.js", [System.Text.Encoding]::UTF8)

$gameJs = $gameJs.Replace('isSuspended: false,', 'suspendedWeeks: 0,')
$gameJs = $gameJs.Replace('typeof this.state.isSuspended', 'typeof this.state.suspendedWeeks')
$gameJs = $gameJs.Replace('this.state.isSuspended = false;', 'this.state.suspendedWeeks = 0;')

$oldAdvanceWeekLogic = "        if (this.state.isSuspended) {`r`n            this.state.isSuspended = false;`r`n            this.addSocialPost(`"@spor_manset`", `"Spor Manşetleri`", ``Cezası bitti! Kırmızı kart cezası sona eren genç yetenek ${this.state.playerName} yeniden formasına kavuşuyor.``);`r`n        }"

$newAdvanceWeekLogic = "        if (this.state.suspendedWeeks > 0) {`r`n            this.state.suspendedWeeks--;`r`n            if (this.state.suspendedWeeks === 0) {`r`n                this.addSocialPost(`"@spor_manset`", `"Spor Manşetleri`", ``Cezası bitti! Kırmızı kart cezası sona eren genç yetenek ${this.state.playerName} yeniden formasına kavuşuyor.``);`r`n            }`r`n        }"

$gameJs = $gameJs.Replace($oldAdvanceWeekLogic, $newAdvanceWeekLogic)
[IO.File]::WriteAllText("game.js", $gameJs, [System.Text.Encoding]::UTF8)


$matchEngine = [IO.File]::ReadAllText("matchEngine.js", [System.Text.Encoding]::UTF8)
$matchEngine = $matchEngine.Replace("GAME.state.isSuspended = true;", "")
$matchEngine = $matchEngine.Replace("this.isSentOff = true;", "this.isSentOff = true;`r`n                        GAME.state.suspendedWeeks = 2;")
[IO.File]::WriteAllText("matchEngine.js", $matchEngine, [System.Text.Encoding]::UTF8)


$indexHtml = [IO.File]::ReadAllText("index.html", [System.Text.Encoding]::UTF8)
$indexHtml = $indexHtml.Replace("GAME.state.isSuspended = true; // Suspended from playing matches this season", "GAME.state.suspendedWeeks = 34; // Suspended from playing matches this season")
$indexHtml = $indexHtml.Replace("GAME.state.isSuspended = true;", "GAME.state.suspendedWeeks = 2;")
$indexHtml = $indexHtml.Replace("GAME.state.isSuspended", "GAME.state.suspendedWeeks > 0")
[IO.File]::WriteAllText("index.html", $indexHtml, [System.Text.Encoding]::UTF8)

Write-Host "Fix applied."
