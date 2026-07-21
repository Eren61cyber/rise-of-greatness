$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing
$src = "C:\Users\Eren\Documents\GitHub\superlig-atlasi\Oyuncu Kariyeri Oyunu"
$bg = [System.Drawing.Image]::FromFile("$src\carbon_bg.png")
$logo = [System.Drawing.Image]::FromFile("$src\logo.png")

function Make-Cover($w, $h, $name) {
    $bmp = New-Object System.Drawing.Bitmap($w, $h)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $destRect = New-Object System.Drawing.Rectangle(0,0,$w,$h)
    $g.DrawImage($bg, $destRect)
    
    $logoW = [int]($w * 0.75)
    $logoAspect = $logo.Width / $logo.Height
    $logoH = [int]($logoW / $logoAspect)
    $logoX = [int](($w - $logoW) / 2)
    $logoY = [int](($h - $logoH) / 2)
    
    $logoRect = New-Object System.Drawing.Rectangle($logoX, $logoY, $logoW, $logoH)
    $g.DrawImage($logo, $logoRect)
    
    $path = "C:\Users\Eren\Desktop\$name"
    $bmp.Save($path, [System.Drawing.Imaging.ImageFormat]::Png)
    $g.Dispose()
    $bmp.Dispose()
    Write-Host "Created $name"
}

Make-Cover 1920 1080 "CG_Yatay_1920x1080.png"
Make-Cover 800 1200 "CG_Dikey_800x1200.png"
Make-Cover 800 800 "CG_Kare_800x800.png"

$bg.Dispose()
$logo.Dispose()
Write-Host "All covers ready!"
