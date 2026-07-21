Add-Type -AssemblyName System.Drawing
$imgPath = "C:\Users\Eren\.gemini\antigravity\brain\33071339-33e1-4777-8552-63fed5946df3\crazygames_cover_portrait_alt_1784574501058.png"
$img = [System.Drawing.Image]::FromFile($imgPath)

$newWidth = 800
$newHeight = 1200

$bmp = New-Object System.Drawing.Bitmap($newWidth, $newHeight)
$graph = [System.Drawing.Graphics]::FromImage($bmp)
$graph.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$graph.DrawImage($img, 0, 0, $newWidth, $newHeight)

$img.Dispose()
$graph.Dispose()

$outPath = "C:\Users\Eren\Desktop\Oyun_Kapak_Dikey_800x1200.png"
if (Test-Path $outPath) { Remove-Item $outPath -Force }
$bmp.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Png)
$bmp.Dispose()

Write-Host "TAMAM! Yeni 800x1200 dikey boyutlandirildi."
