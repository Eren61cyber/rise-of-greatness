Add-Type -AssemblyName System.Drawing

$logoPath = "C:\Users\Eren\Documents\GitHub\superlig-atlasi\Oyuncu Kariyeri Oyunu\logo.png"
$logo = [System.Drawing.Image]::FromFile($logoPath)

function Add-LogoToImage($bgPath, $outPath, $logoWidth, $logoY) {
    $bg = [System.Drawing.Image]::FromFile($bgPath)
    $bmp = New-Object System.Drawing.Bitmap($bg.Width, $bg.Height)
    $graph = [System.Drawing.Graphics]::FromImage($bmp)
    $graph.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    
    # Arkaplani ciz
    $rectBg = New-Object System.Drawing.Rectangle(0, 0, $bg.Width, $bg.Height)
    $graph.DrawImage($bg, $rectBg)
    
    # Logoyu boyutlandir ve ortala
    $aspectRatio = $logo.Width / $logo.Height
    $logoHeight = [int][math]::Round($logoWidth / $aspectRatio)
    $logoX = [int][math]::Round(($bg.Width - $logoWidth) / 2)
    $y = [int]$logoY
    $w = [int]$logoWidth
    $h = [int]$logoHeight
    
    # Logoyu ciz
    $rectLogo = New-Object System.Drawing.Rectangle($logoX, $y, $w, $h)
    $graph.DrawImage($logo, $rectLogo)
    
    $bg.Dispose()
    $graph.Dispose()
    
    if (Test-Path $outPath) { Remove-Item $outPath -Force }
    $bmp.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $bmp.Dispose()
}

# Yatay Resme Logo Ekle (1920x1080)
$yatayGirdi = "C:\Users\Eren\Desktop\Oyun_Kapak_Yatay_1920.png"
$yatayCikti = "C:\Users\Eren\Desktop\Oyun_Kapak_Yatay_Logolu.png"
Add-LogoToImage $yatayGirdi $yatayCikti 800 100

# Dikey Resme Logo Ekle (800x1200)
$dikeyGirdi = "C:\Users\Eren\Desktop\Oyun_Kapak_Dikey_800x1200.png"
$dikeyCikti = "C:\Users\Eren\Desktop\Oyun_Kapak_Dikey_Logolu.png"
Add-LogoToImage $dikeyGirdi $dikeyCikti 600 150

$logo.Dispose()

Write-Host "TAMAM! Logolu versiyonlar masaustune eklendi!"
