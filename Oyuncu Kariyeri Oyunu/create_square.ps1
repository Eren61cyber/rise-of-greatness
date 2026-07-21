Add-Type -AssemblyName System.Drawing

$logoPath = "C:\Users\Eren\Documents\GitHub\superlig-atlasi\Oyuncu Kariyeri Oyunu\logo.png"
$bgPath = "C:\Users\Eren\Desktop\Oyun_Kapak_Yatay_1920.png"
$outPath = "C:\Users\Eren\Desktop\Oyun_Kare_800x800_Logolu.png"

$bg = [System.Drawing.Image]::FromFile($bgPath)
$logo = [System.Drawing.Image]::FromFile($logoPath)

$newSize = 800
$bmp = New-Object System.Drawing.Bitmap($newSize, $newSize)
$graph = [System.Drawing.Graphics]::FromImage($bmp)
$graph.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic

# Arkaplanin merkezinden kare kesip 800x800'e ciz
$cropSize = [math]::Min($bg.Width, $bg.Height)
$cropX = [int][math]::Round(($bg.Width - $cropSize) / 2)
$cropY = [int][math]::Round(($bg.Height - $cropSize) / 2)

$srcRect = New-Object System.Drawing.Rectangle($cropX, $cropY, $cropSize, $cropSize)
$destRect = New-Object System.Drawing.Rectangle(0, 0, $newSize, $newSize)
$graph.DrawImage($bg, $destRect, $srcRect, [System.Drawing.GraphicsUnit]::Pixel)

# Logoyu boyutlandir ve ortala
$logoWidth = 600
$aspectRatio = $logo.Width / $logo.Height
$logoHeight = [int][math]::Round($logoWidth / $aspectRatio)
$logoX = [int][math]::Round(($newSize - $logoWidth) / 2)
$logoY = [int][math]::Round(($newSize - $logoHeight) / 2) # Tam merkeze koy

$rectLogo = New-Object System.Drawing.Rectangle($logoX, $logoY, $logoWidth, $logoHeight)
$graph.DrawImage($logo, $rectLogo)

$bg.Dispose()
$logo.Dispose()
$graph.Dispose()

if (Test-Path $outPath) { Remove-Item $outPath -Force }
$bmp.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Png)
$bmp.Dispose()

Write-Host "TAMAM! 800x800 Kare (Logolu) versiyon masaustune eklendi!"
