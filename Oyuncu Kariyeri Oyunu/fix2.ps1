$gameJs = [IO.File]::ReadAllText("game.js", [System.Text.Encoding]::UTF8)

$newLogic = "        if (this.state.suspendedWeeks > 0) {`r`n            this.state.suspendedWeeks--;`r`n            if (this.state.suspendedWeeks === 0) {`r`n                this.addSocialPost(`"@spor_manset`", `"Spor Manşetleri`", ``Cezası bitti! Kırmızı kart cezası sona eren genç yetenek `${this.state.playerName} yeniden formasına kavuşuyor.``);`r`n            }`r`n        }"

$gameJs = [regex]::Replace($gameJs, '(?s)if \(this\.state\.isSuspended\) \{.*?\}', $newLogic)
[IO.File]::WriteAllText("game.js", $gameJs, [System.Text.Encoding]::UTF8)
Write-Host "Fixed."
