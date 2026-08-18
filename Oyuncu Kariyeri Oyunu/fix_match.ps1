# matchEngine.js fix
$bytes = [System.IO.File]::ReadAllBytes("matchEngine.js")
$content = [System.Text.Encoding]::UTF8.GetString($bytes)

# Remove all GAME.state.isSuspended = true;
$content = $content.Replace("GAME.state.isSuspended = true;", "")

# After every this.isSentOff = true; add GAME.state.suspendedWeeks = 2;
$content = $content.Replace("this.isSentOff = true;", "this.isSentOff = true;" + "`r`n                                GAME.state.suspendedWeeks = 2;")

$utf8NoBom = New-Object System.Text.UTF8Encoding($false)
[System.IO.File]::WriteAllText("matchEngine.js", $content, $utf8NoBom)

# Verify
$verify = [System.IO.File]::ReadAllText("matchEngine.js", [System.Text.Encoding]::UTF8)
$sentOffCount = ([regex]::Matches($verify, "isSentOff = true;")).Count
$suspWeeksCount = ([regex]::Matches($verify, "suspendedWeeks = 2;")).Count
$oldIsSuspended = $verify.Contains("isSuspended")

Write-Host "isSentOff = true count: $sentOffCount"
Write-Host "suspendedWeeks = 2 count: $suspWeeksCount"
Write-Host "Old isSuspended remaining: $oldIsSuspended"
