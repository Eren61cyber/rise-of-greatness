Add-Type -AssemblyName System.Drawing

$logoPath = "C:\Users\Eren\Documents\GitHub\superlig-atlasi\Oyuncu Kariyeri Oyunu\logo.png"
$outPath = "C:\Users\Eren\Desktop\Oyun_Kare_Sade.png"
$logo = [System.Drawing.Image]::FromFile($logoPath)

$newSize = 800
$bmp = New-Object System.Drawing.Bitmap($newSize, $newSize)
$graph = [System.Drawing.Graphics]::FromImage($bmp)
$graph.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic

# Sade, cok koyu bir arkaplan rengi (siyahimsi lacivert)
$bgColor = [System.Drawing.Color]::FromArgb(255, 13, 17, 23)
$brush = New-Object System.Drawing.SolidBrush($bgColor)
$graph.FillRectangle($brush, 0, 0, $newSize, $newSize)

# Logoyu boyutlandir ve ortala
$logoWidth = 700
$aspectRatio = $logo.Width / $logo.Height
$logoHeight = [int][math]::Round($logoWidth / $aspectRatio)
$logoX = [int][math]::Round(($newSize - $logoWidth) / 2)
$logoY = [int][math]::Round(($newSize - $logoHeight) / 2)

$rectLogo = New-Object System.Drawing.Rectangle($logoX, $logoY, $logoWidth, $logoHeight)
$graph.DrawImage($logo, $rectLogo)

$logo.Dispose()
$brush.Dispose()
$graph.Dispose()

if (Test-Path $outPath) { Remove-Item $outPath -Force }
$bmp.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Png)
$bmp.Dispose()

Write-Host "TAMAM! Sadece logo iceren 800x800 hazir!"
