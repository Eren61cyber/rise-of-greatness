$matchEngine = [IO.File]::ReadAllText("matchEngine.js", [System.Text.Encoding]::UTF8)
$matchEngine = $matchEngine.Replace("GAME.state.isSuspended = true;", "")
$matchEngine = $matchEngine.Replace("this.isSentOff = true;", "this.isSentOff = true;`r`n                        GAME.state.suspendedWeeks = 2;")
[IO.File]::WriteAllText("matchEngine.js", $matchEngine, [System.Text.Encoding]::UTF8)

$indexHtml = [IO.File]::ReadAllText("index.html", [System.Text.Encoding]::UTF8)
$indexHtml = $indexHtml.Replace("GAME.state.isSuspended = true; // Suspended from playing matches this season", "GAME.state.suspendedWeeks = 34; // Suspended from playing matches this season")
$indexHtml = $indexHtml.Replace("GAME.state.isSuspended = true;", "GAME.state.suspendedWeeks = 2;")
$indexHtml = $indexHtml.Replace("GAME.state.isSuspended", "GAME.state.suspendedWeeks > 0")
[IO.File]::WriteAllText("index.html", $indexHtml, [System.Text.Encoding]::UTF8)

Write-Host "Fix applied cleanly to matchEngine and index."
