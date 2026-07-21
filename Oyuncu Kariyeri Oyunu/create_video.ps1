$ErrorActionPreference = "Stop"

# Masaustu yollari
$desktop = "C:\Users\Eren\Desktop"
$ffmpegZip = Join-Path $desktop "ffmpeg.zip"
$ffmpegDir = Join-Path $desktop "ffmpeg_temp"
$videoOut = Join-Path $desktop "Oyun_Portre_Video.mp4"
$imageIn = Join-Path $desktop "Oyun_Kapak_Dikey_Logolu.png"

Write-Host "FFmpeg indiriliyor... (Bu birkac saniye surebilir)"
# Gyan.dev uzerinden kucuk boyutlu ffmpeg indir (essentials)
$url = "https://github.com/BtbN/FFmpeg-Builds/releases/download/latest/ffmpeg-master-latest-win64-gpl.zip"
Invoke-WebRequest -Uri $url -OutFile $ffmpegZip

Write-Host "ZIP cikariliyor..."
if (Test-Path $ffmpegDir) { Remove-Item $ffmpegDir -Recurse -Force }
Expand-Archive -Path $ffmpegZip -DestinationPath $ffmpegDir -Force

# FFmpeg exe yolunu bul
$ffmpegExe = Get-ChildItem -Path $ffmpegDir -Filter "ffmpeg.exe" -Recurse | Select-Object -First 1

if ($ffmpegExe) {
    Write-Host "Video Olusturuluyor..."
    # Resmi 5 saniyelik bir MP4 videosuna donustur (1080x1920 Portre, 30fps)
    if (Test-Path $videoOut) { Remove-Item $videoOut -Force }
    $cmd = "& `"$($ffmpegExe.FullName)`" -loop 1 -i `"$imageIn`" -c:v libx264 -t 5 -pix_fmt yuv420p -vf `"scale=1080:1920,setsar=1`" `"$videoOut`""
    Invoke-Expression $cmd
    Write-Host "TAMAM! Video basariyla olusturuldu: $videoOut"
} else {
    Write-Host "FFmpeg bulunamadi!"
}

# Temizlik
Write-Host "Gecici dosyalar temizleniyor..."
Remove-Item $ffmpegZip -Force
Remove-Item $ffmpegDir -Recurse -Force
Write-Host "ISLEM TAMAMLANDI!"
