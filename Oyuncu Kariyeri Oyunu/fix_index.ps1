# index.html fix
$bytes = [System.IO.File]::ReadAllBytes("index.html")
$content = [System.Text.Encoding]::UTF8.GetString($bytes)

# First: şike cezası (34 hafta) - this one is unique
$content = $content.Replace("GAME.state.isSuspended = true; // Suspended from playing matches this season", "GAME.state.suspendedWeeks = 34; // Suspended from playing matches this season")

# Then: normal red card (2 hafta)
$content = $content.Replace("GAME.state.isSuspended = true;", "GAME.state.suspendedWeeks = 2;")

# Then: all checks (if GAME.state.isSuspended -> if GAME.state.suspendedWeeks > 0)
$content = $content.Replace("GAME.state.isSuspended", "GAME.state.suspendedWeeks > 0")

$utf8NoBom = New-Object System.Text.UTF8Encoding($false)
[System.IO.File]::WriteAllText("index.html", $content, $utf8NoBom)

# Verify
$verify = [System.IO.File]::ReadAllText("index.html", [System.Text.Encoding]::UTF8)
$oldIsSuspended = $verify.Contains("isSuspended")
$newChecks = ([regex]::Matches($verify, "suspendedWeeks > 0")).Count
$newSet2 = ([regex]::Matches($verify, "suspendedWeeks = 2")).Count
$newSet34 = ([regex]::Matches($verify, "suspendedWeeks = 34")).Count

Write-Host "Old isSuspended remaining: $oldIsSuspended"
Write-Host "suspendedWeeks > 0 checks: $newChecks"
Write-Host "suspendedWeeks = 2 sets: $newSet2"
Write-Host "suspendedWeeks = 34 sets: $newSet34"
