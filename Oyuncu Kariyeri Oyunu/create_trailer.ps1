$ErrorActionPreference = "Stop"
$desktop = "C:\Users\Eren\Desktop"
$projDir = "C:\Users\Eren\Documents\GitHub\superlig-atlasi\Oyuncu Kariyeri Oyunu"
$tempDir = Join-Path $desktop "video_temp"
$ffmpegDir = Join-Path $desktop "ffmpeg_build"

# Temp klasor
if (Test-Path $tempDir) { Remove-Item $tempDir -Recurse -Force }
New-Item -ItemType Directory -Path $tempDir | Out-Null

Add-Type -AssemblyName System.Drawing

# ---- SAHNE 1: Siyah bg + Logo (fade-in) ----
function Create-Scene1 {
    param($frameDir, $startFrame, $endFrame)
    $logo = [System.Drawing.Image]::FromFile("$projDir\logo.png")
    $w = 1080; $h = 1920
    $totalFrames = $endFrame - $startFrame
    
    for ($i = 0; $i -lt $totalFrames; $i++) {
        $bmp = New-Object System.Drawing.Bitmap($w, $h)
        $g = [System.Drawing.Graphics]::FromImage($bmp)
        $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
        $g.Clear([System.Drawing.Color]::FromArgb(255, 10, 15, 25))
        
        # Logo fade-in (ilk 30 frame fade, sonra tam gorunur)
        $alpha = [math]::Min(255, [int](($i / 30.0) * 255))
        if ($alpha -gt 255) { $alpha = 255 }
        if ($alpha -lt 0) { $alpha = 0 }
        
        # Logo boyutu ve konum
        $logoW = 800
        $logoAspect = $logo.Width / $logo.Height
        $logoH = [int]($logoW / $logoAspect)
        $logoX = [int](($w - $logoW) / 2)
        $logoY = [int](($h - $logoH) / 2) - 100
        
        # Semi-transparent logo cizimi
        $cm = New-Object System.Drawing.Imaging.ColorMatrix
        $cm.Matrix33 = [float]($alpha / 255.0)
        $ia = New-Object System.Drawing.Imaging.ImageAttributes
        $ia.SetColorMatrix($cm)
        $destRect = New-Object System.Drawing.Rectangle($logoX, $logoY, $logoW, $logoH)
        $g.DrawImage($logo, $destRect, 0, 0, $logo.Width, $logo.Height, [System.Drawing.GraphicsUnit]::Pixel, $ia)
        
        # Alt yazi (fade-in)
        if ($i -gt 20) {
            $textAlpha = [math]::Min(255, [int]((($i - 20) / 20.0) * 255))
            $font = New-Object System.Drawing.Font("Segoe UI", 28, [System.Drawing.FontStyle]::Regular)
            $brush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb($textAlpha, 200, 200, 200))
            $text = "Football Career Simulator"
            $textSize = $g.MeasureString($text, $font)
            $textX = ($w - $textSize.Width) / 2
            $textY = $logoY + $logoH + 40
            $g.DrawString($text, $font, $brush, $textX, $textY)
            $font.Dispose(); $brush.Dispose()
        }
        
        $frameNum = $startFrame + $i
        $framePath = Join-Path $frameDir ("frame_{0:D5}.png" -f $frameNum)
        $bmp.Save($framePath, [System.Drawing.Imaging.ImageFormat]::Png)
        $g.Dispose(); $bmp.Dispose()
    }
    $logo.Dispose()
}

# ---- SAHNE 2: Stadyum bg + zoom efekti + yazi ----
function Create-Scene2 {
    param($frameDir, $startFrame, $endFrame)
    $stadium = [System.Drawing.Image]::FromFile("$projDir\stadium_bg.png")
    $w = 1080; $h = 1920
    $totalFrames = $endFrame - $startFrame
    
    for ($i = 0; $i -lt $totalFrames; $i++) {
        $bmp = New-Object System.Drawing.Bitmap($w, $h)
        $g = [System.Drawing.Graphics]::FromImage($bmp)
        $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
        $g.Clear([System.Drawing.Color]::FromArgb(255, 10, 15, 25))
        
        # Slow zoom efekti
        $zoomFactor = 1.0 + ($i / [float]$totalFrames) * 0.15
        $srcW = [int]($stadium.Width / $zoomFactor)
        $srcH = [int]($stadium.Height / $zoomFactor)
        $srcX = [int](($stadium.Width - $srcW) / 2)
        $srcY = [int](($stadium.Height - $srcH) / 2)
        
        $srcRect = New-Object System.Drawing.Rectangle($srcX, $srcY, $srcW, $srcH)
        $destRect = New-Object System.Drawing.Rectangle(0, 400, $w, [int]($w * $stadium.Height / $stadium.Width))
        $g.DrawImage($stadium, $destRect, $srcRect, [System.Drawing.GraphicsUnit]::Pixel)
        
        # Ust kisim gradient overlay
        $gradBrush = New-Object System.Drawing.Drawing2D.LinearGradientBrush(
            (New-Object System.Drawing.Point(0, 0)),
            (New-Object System.Drawing.Point(0, 600)),
            [System.Drawing.Color]::FromArgb(255, 10, 15, 25),
            [System.Drawing.Color]::FromArgb(0, 10, 15, 25)
        )
        $g.FillRectangle($gradBrush, 0, 0, $w, 600)
        $gradBrush.Dispose()
        
        # Yazi: "TRAIN HARD"
        $font = New-Object System.Drawing.Font("Segoe UI", 52, [System.Drawing.FontStyle]::Bold)
        $brush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 0, 230, 118))
        $text = "TRAIN HARD"
        $textSize = $g.MeasureString($text, $font)
        $g.DrawString($text, $font, $brush, ($w - $textSize.Width) / 2, 200)
        $font.Dispose(); $brush.Dispose()
        
        # Alt yazi
        $font2 = New-Object System.Drawing.Font("Segoe UI", 28, [System.Drawing.FontStyle]::Regular)
        $brush2 = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::White)
        $text2 = "Build Your Skills"
        $textSize2 = $g.MeasureString($text2, $font2)
        $g.DrawString($text2, $font2, $brush2, ($w - $textSize2.Width) / 2, 300)
        $font2.Dispose(); $brush2.Dispose()
        
        $frameNum = $startFrame + $i
        $framePath = Join-Path $frameDir ("frame_{0:D5}.png" -f $frameNum)
        $bmp.Save($framePath, [System.Drawing.Imaging.ImageFormat]::Png)
        $g.Dispose(); $bmp.Dispose()
    }
    $stadium.Dispose()
}

# ---- SAHNE 3: Carbon bg + yazılar ----
function Create-Scene3 {
    param($frameDir, $startFrame, $endFrame)
    $carbon = [System.Drawing.Image]::FromFile("$projDir\carbon_bg.png")
    $w = 1080; $h = 1920
    $totalFrames = $endFrame - $startFrame
    
    for ($i = 0; $i -lt $totalFrames; $i++) {
        $bmp = New-Object System.Drawing.Bitmap($w, $h)
        $g = [System.Drawing.Graphics]::FromImage($bmp)
        $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
        
        # Carbon bg
        $destRect = New-Object System.Drawing.Rectangle(0, 0, $w, $h)
        $g.DrawImage($carbon, $destRect)
        
        # Koyu overlay
        $overlayBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(180, 0, 0, 0))
        $g.FillRectangle($overlayBrush, 0, 0, $w, $h)
        $overlayBrush.Dispose()
        
        # Feature list (tek tek gozukme efekti)
        $features = @("SIGN CONTRACTS", "TRANSFER TO TOP CLUBS", "WIN CHAMPIONSHIPS", "BECOME A LEGEND")
        $fontFeature = New-Object System.Drawing.Font("Segoe UI", 38, [System.Drawing.FontStyle]::Bold)
        
        for ($f = 0; $f -lt $features.Count; $f++) {
            $appearFrame = $f * 18
            if ($i -ge $appearFrame) {
                $fadeAlpha = [math]::Min(255, [int]((($i - $appearFrame) / 15.0) * 255))
                $brushF = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb($fadeAlpha, 0, 230, 118))
                $tSize = $g.MeasureString($features[$f], $fontFeature)
                $tX = ($w - $tSize.Width) / 2
                $tY = 500 + ($f * 120)
                $g.DrawString($features[$f], $fontFeature, $brushF, $tX, $tY)
                $brushF.Dispose()
            }
        }
        $fontFeature.Dispose()
        
        $frameNum = $startFrame + $i
        $framePath = Join-Path $frameDir ("frame_{0:D5}.png" -f $frameNum)
        $bmp.Save($framePath, [System.Drawing.Imaging.ImageFormat]::Png)
        $g.Dispose(); $bmp.Dispose()
    }
    $carbon.Dispose()
}

# ---- SAHNE 4: Final - Logo + "PLAY NOW" ----
function Create-Scene4 {
    param($frameDir, $startFrame, $endFrame)
    $logo = [System.Drawing.Image]::FromFile("$projDir\logo.png")
    $gold = [System.Drawing.Image]::FromFile("$projDir\gold_pack_bg.png")
    $w = 1080; $h = 1920
    $totalFrames = $endFrame - $startFrame
    
    for ($i = 0; $i -lt $totalFrames; $i++) {
        $bmp = New-Object System.Drawing.Bitmap($w, $h)
        $g = [System.Drawing.Graphics]::FromImage($bmp)
        $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
        
        # Gold bg
        $destRect = New-Object System.Drawing.Rectangle(0, 0, $w, $h)
        $g.DrawImage($gold, $destRect)
        
        # Koyu overlay
        $overlayBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(200, 0, 0, 0))
        $g.FillRectangle($overlayBrush, 0, 0, $w, $h)
        $overlayBrush.Dispose()
        
        # Logo
        $logoW = 850
        $logoAspect = $logo.Width / $logo.Height
        $logoH = [int]($logoW / $logoAspect)
        $logoX = [int](($w - $logoW) / 2)
        $logoY = [int](($h - $logoH) / 2) - 200
        $logoRect = New-Object System.Drawing.Rectangle($logoX, $logoY, $logoW, $logoH)
        $g.DrawImage($logo, $logoRect)
        
        # "PLAY NOW" pulse efekti
        $pulse = [math]::Abs([math]::Sin($i * 0.15)) * 50 + 200
        $fontPlay = New-Object System.Drawing.Font("Segoe UI", 56, [System.Drawing.FontStyle]::Bold)
        $brushPlay = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb([int]$pulse, 0, 230, 118))
        $playText = "PLAY NOW"
        $playSize = $g.MeasureString($playText, $fontPlay)
        $g.DrawString($playText, $fontPlay, $brushPlay, ($w - $playSize.Width) / 2, $logoY + $logoH + 100)
        $fontPlay.Dispose(); $brushPlay.Dispose()
        
        $frameNum = $startFrame + $i
        $framePath = Join-Path $frameDir ("frame_{0:D5}.png" -f $frameNum)
        $bmp.Save($framePath, [System.Drawing.Imaging.ImageFormat]::Png)
        $g.Dispose(); $bmp.Dispose()
    }
    $logo.Dispose(); $gold.Dispose()
}

# ---- VIDEO RENDER ----
Write-Host "Sahne 1: Logo giris (Frame 0-89)..."
Create-Scene1 -frameDir $tempDir -startFrame 0 -endFrame 90

Write-Host "Sahne 2: Stadyum + Train Hard (Frame 90-179)..."
Create-Scene2 -frameDir $tempDir -startFrame 90 -endFrame 180

Write-Host "Sahne 3: Ozellikler listesi (Frame 180-269)..."
Create-Scene3 -frameDir $tempDir -startFrame 180 -endFrame 270

Write-Host "Sahne 4: Final - Play Now (Frame 270-374)..."
Create-Scene4 -frameDir $tempDir -startFrame 270 -endFrame 375

Write-Host "FFmpeg ile video birlestiriliyor..."

# FFmpeg exe yolunu bul
$ffmpegExe = Get-ChildItem -Path $ffmpegDir -Filter "ffmpeg.exe" -Recurse -ErrorAction SilentlyContinue | Select-Object -First 1

if (-not $ffmpegExe) {
    Write-Host "FFmpeg indiriliyor..."
    $ffmpegZip = Join-Path $desktop "ffmpeg_dl.zip"
    $url = "https://github.com/BtbN/FFmpeg-Builds/releases/download/latest/ffmpeg-master-latest-win64-gpl.zip"
    Invoke-WebRequest -Uri $url -OutFile $ffmpegZip
    if (Test-Path $ffmpegDir) { Remove-Item $ffmpegDir -Recurse -Force }
    Expand-Archive -Path $ffmpegZip -DestinationPath $ffmpegDir -Force
    Remove-Item $ffmpegZip -Force
    $ffmpegExe = Get-ChildItem -Path $ffmpegDir -Filter "ffmpeg.exe" -Recurse | Select-Object -First 1
}

$videoOut = Join-Path $desktop "Oyun_Portre_Tanitim.mp4"
if (Test-Path $videoOut) { Remove-Item $videoOut -Force }

$framePattern = Join-Path $tempDir "frame_%05d.png"
$cmd = "& `"$($ffmpegExe.FullName)`" -framerate 25 -i `"$framePattern`" -f lavfi -i anullsrc=channel_layout=stereo:sample_rate=44100 -c:v libx264 -pix_fmt yuv420p -t 15 -c:a aac -shortest -y `"$videoOut`""
Invoke-Expression $cmd

# Temizlik
Write-Host "Temizlik yapiliyor..."
Remove-Item $tempDir -Recurse -Force

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host " TANITIM VIDEOSU HAZIR!" -ForegroundColor Green
Write-Host " $videoOut" -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Green
