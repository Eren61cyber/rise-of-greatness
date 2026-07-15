# Futbol Atlası: Kariyer Efsanesi - Android Assets Sync Pipeline
# Synchronizes the latest web assets to the local Android App WebView directory.

$ErrorActionPreference = "Stop"

Write-Host ""
Write-Host '==================================================' -ForegroundColor Green
Write-Host '== FUTBOL ATLASI: ANDROID SENKRONİZASYON HATTI  ==' -ForegroundColor Green
Write-Host '==================================================' -ForegroundColor Green

$projectRoot = Get-Location
$assetsDir = Join-Path $projectRoot "android-app\app\src\main\assets"

# Ensure assets directory exists
if (-not (Test-Path $assetsDir)) {
    New-Item -ItemType Directory -Path $assetsDir -Force | Out-Null
    Write-Host "assets klasörü oluşturuldu." -ForegroundColor Gray
}

# Copy files
$filesToCopy = @(
    "index.html",
    "styles.css",
    "database.js",
    "events.js",
    "game.js",
    "matchEngine.js",
    "intro.mp4",
    "logo.png",
    "riseup_studios_logo.png",
    "stadium_bg.png",
    "carbon_bg.png",
    "gold_pack_bg.png",
    "ece_portrait.png"
)

Write-Host "Dosyalar kopyalanıyor..." -ForegroundColor Cyan
foreach ($file in $filesToCopy) {
    $src = Join-Path $projectRoot $file
    $dest = Join-Path $assetsDir $file
    if (Test-Path $src) {
        Copy-Item -Path $src -Destination $dest -Force
        Write-Host "🗸 $file -> android-app/.../assets/$file" -ForegroundColor Green
    } else {
        Write-Warning "Dosya bulunamadı: $file"
    }
}

# Copy sounds folder recursively
$srcSounds = Join-Path $projectRoot "sounds"
$destSounds = Join-Path $assetsDir "sounds"
if (Test-Path $srcSounds) {
    if (-not (Test-Path $destSounds)) {
        New-Item -ItemType Directory -Path $destSounds -Force | Out-Null
    }
    Copy-Item -Path "$srcSounds\*" -Destination $destSounds -Recurse -Force
    Write-Host "🗸 sounds/ -> android-app/.../assets/sounds/" -ForegroundColor Green
}

Write-Host '--------------------------------------------------'
Write-Host "Senkronizasyon Başarıyla Tamamlandı!" -ForegroundColor Green
Write-Host ""
Write-Host "Nasıl Test Edilir & APK Derlenir:" -ForegroundColor Yellow
Write-Host "1. Bilgisayarınızda Android Studio programını açın." -ForegroundColor White
Write-Host "2. 'Open' seçeneğine tıklayarak bu projenin altındaki 'android-app' klasörünü seçin." -ForegroundColor White
Write-Host "3. Android Studio gerekli Gradle paketlerini yükleyecek ve projeyi kuracaktır." -ForegroundColor White
Write-Host "4. Telefonunuzu USB ile bağlayıp veya Emulator üzerinde yeşil 'Run' butonuna basarak oyunu oynayabilirsiniz." -ForegroundColor White
Write-Host "5. APK dosyası derlemek için üst menüden Build -> Build Bundle(s) / APK(s) -> Build APK(s) yolunu izleyin." -ForegroundColor White
Write-Host '==================================================' -ForegroundColor Green
Write-Host ""
