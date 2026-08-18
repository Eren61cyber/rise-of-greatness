# Read file as raw bytes to preserve encoding
$bytes = [System.IO.File]::ReadAllBytes("game.js")
$content = [System.Text.Encoding]::UTF8.GetString($bytes)

# Fix 1: Line 109 - initial state
$content = $content.Replace("isSuspended: false,", "suspendedWeeks: 0,")

# Fix 2: Lines 385-386 - migration check
$content = $content.Replace('typeof this.state.isSuspended === "undefined"', 'typeof this.state.suspendedWeeks === "undefined"')
$content = $content.Replace("this.state.isSuspended = false;", "this.state.suspendedWeeks = 0;")

# Fix 3: Lines 934-937 - advanceWeek logic
# Find the exact old block and replace it
$oldBlock = @"
        if (this.state.isSuspended) {
            this.state.isSuspended = false;
"@

$newBlock = @"
        if (this.state.suspendedWeeks > 0) {
            this.state.suspendedWeeks--;
            if (this.state.suspendedWeeks === 0) {
"@

$content = $content.Replace($oldBlock, $newBlock)

# Now close the extra if block - find the closing } and add one more
# The old code was:
#   if (isSuspended) {
#       isSuspended = false;
#       addSocialPost(...);
#   }
# New code needs to be:
#   if (suspendedWeeks > 0) {
#       suspendedWeeks--;
#       if (suspendedWeeks === 0) {
#           addSocialPost(...);
#       }
#   }

# Find the addSocialPost line that's right after and add closing brace
# We need to find the pattern after the social post line
$oldClosing = 'formas' + [char]0x131 + 'na kavu' + [char]0x15F + 'uyor.");' + "`r`n        }"
$newClosing = 'formas' + [char]0x131 + 'na kavu' + [char]0x15F + 'uyor.");' + "`r`n            }`r`n        }"

$content = $content.Replace($oldClosing, $newClosing)

# Write back preserving encoding
$utf8NoBom = New-Object System.Text.UTF8Encoding($false)
[System.IO.File]::WriteAllText("game.js", $content, $utf8NoBom)

# Verify
$verify = [System.IO.File]::ReadAllText("game.js")
$check1 = $verify.Contains("suspendedWeeks: 0,")
$check2 = $verify.Contains('typeof this.state.suspendedWeeks')
$check3 = $verify.Contains("this.state.suspendedWeeks > 0")
$check4 = -not $verify.Contains("isSuspended")

Write-Host "Check 1 (initial state): $check1"
Write-Host "Check 2 (migration): $check2"
Write-Host "Check 3 (advanceWeek): $check3"
Write-Host "Check 4 (no isSuspended left): $check4"
