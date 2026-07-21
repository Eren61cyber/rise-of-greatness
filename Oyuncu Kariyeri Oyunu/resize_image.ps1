Add-Type -AssemblyName System.Drawing
$imgPath = "C:\Users\Eren\Desktop\Oyun_Kapak_Yatay.png"
$img = [System.Drawing.Image]::FromFile($imgPath)

$newWidth = 1920
$newHeight = 1080

$bmp = New-Object System.Drawing.Bitmap($newWidth, $newHeight)
$graph = [System.Drawing.Graphics]::FromImage($bmp)
$graph.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$graph.DrawImage($img, 0, 0, $newWidth, $newHeight)

$img.Dispose()
$graph.Dispose()

$outPath = "C:\Users\Eren\Desktop\Oyun_Kapak_Yatay_1920.png"
if (Test-Path $outPath) { Remove-Item $outPath -Force }
$bmp.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Png)
$bmp.Dispose()

Write-Host "TAMAM! 1920x1080 olarak yeniden boyutlandirildi."
