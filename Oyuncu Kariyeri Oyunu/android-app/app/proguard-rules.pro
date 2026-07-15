# Proguard rules for Futbol Atlasi
# WebView tabanlı uygulama için özel kurallar gerekmiyor
-keepattributes JavascriptInterface
-keepclassmembers class * {
    @android.webkit.JavascriptInterface <methods>;
}
