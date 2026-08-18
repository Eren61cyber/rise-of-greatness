$html = [IO.File]::ReadAllText("index.html", [System.Text.Encoding]::UTF8)

$pattern1 = '(?s)<div class="fut-card-avatar" style="margin-top: 15px; margin-left: 40px; font-size: 48px; width: 85px; height: 85px; display: flex; align-items: center; justify-content: center; filter: drop-shadow\(0 4px 6px rgba\(0,0,0,0\.5\)\);">.*?</div>'

$replacement1 = '<div class="fut-card-avatar" style="margin-top: 15px; margin-left: 40px; width: 85px; height: 85px; display: flex; align-items: center; justify-content: center; filter: drop-shadow(0 4px 6px rgba(0,0,0,0.5));">
                                        <img src="avatars/avatar_${(packedPlayer.name.length % 10) + 1}.png" style="width: 100%; height: 100%; object-fit: cover; border-radius: 6px;">
                                    </div>'

$html = [regex]::Replace($html, $pattern1, $replacement1)

$pattern2 = "(?s)<div style=`"font-family: 'Inter', sans-serif; font-weight: 900; font-size: 9px; color: white; text-align: center; text-transform: uppercase; margin: 4px 0; text-shadow: 0 1px 2px rgba\(0,0,0,0\.8\);`">`$\{dbPlayer\.name\.split\(' '\)\.pop\(\)\}</div>"

$replacement2 = '<img src="avatars/avatar_${(dbPlayer.name.length % 10) + 1}.png" style="width: 40px; height: 40px; object-fit: cover; border-radius: 4px; margin-bottom: 2px;">
                                <div style="font-family: ''Inter'', sans-serif; font-weight: 900; font-size: 9px; color: white; text-align: center; text-transform: uppercase; margin: 4px 0; text-shadow: 0 1px 2px rgba(0,0,0,0.8);">${dbPlayer.name.split('' '').pop()}</div>'

$html = [regex]::Replace($html, $pattern2, $replacement2)

[IO.File]::WriteAllText("index.html", $html, [System.Text.Encoding]::UTF8)

Write-Host "Replaced."
