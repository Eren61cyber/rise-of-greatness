$ErrorActionPreference = "Stop"
$desktop = "C:\Users\Eren\Desktop"
$ffmpegZip = Join-Path $desktop "ffmpeg_v2.zip"
$ffmpegDir = Join-Path $desktop "ffmpeg_temp_v2"
$videoOut = Join-Path $desktop "Oyun_Portre_Video_V2.mp4"
$imageIn = Join-Path $desktop "Oyun_Kapak_Dikey_Logolu.png"

$url = "https://github.com/BtbN/FFmpeg-Builds/releases/download/latest/ffmpeg-master-latest-win64-gpl.zip"
Invoke-WebRequest -Uri $url -OutFile $ffmpegZip

if (Test-Path $ffmpegDir) { Remove-Item $ffmpegDir -Recurse -Force }
Expand-Archive -Path $ffmpegZip -DestinationPath $ffmpegDir -Force

$ffmpegExe = Get-ChildItem -Path $ffmpegDir -Filter "ffmpeg.exe" -Recurse | Select-Object -First 1

if ($ffmpegExe) {
    if (Test-Path $videoOut) { Remove-Item $videoOut -Force }
    # 800x1200 kesin boyut, 15 saniye uzunluk ve icinde bos/sessiz bir ses dosyasi (anullsrc) barindiran video.
    $cmd = "& `"$($ffmpegExe.FullName)`" -loop 1 -i `"$imageIn`" -f lavfi -i anullsrc=channel_layout=stereo:sample_rate=44100 -c:v libx264 -t 15 -pix_fmt yuv420p -vf `"scale=800:1200,setsar=1`" -c:a aac -shortest `"$videoOut`""
    Invoke-Expression $cmd
}

Remove-Item $ffmpegZip -Force
Remove-Item $ffmpegDir -Recurse -Force
Write-Host "V2 Video Hazir!"
