package com.futbolatlasi.kariyer;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.content.Context;
import android.os.Build;
import android.os.Bundle;
import android.os.VibrationEffect;
import android.os.Vibrator;
import android.util.Log;
import android.view.View;
import android.view.Window;
import android.view.WindowManager;
import android.webkit.JavascriptInterface;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.android.billingclient.api.AcknowledgePurchaseParams;
import com.android.billingclient.api.BillingClient;
import com.android.billingclient.api.BillingClientStateListener;
import com.android.billingclient.api.BillingFlowParams;
import com.android.billingclient.api.BillingResult;
import com.android.billingclient.api.ProductDetails;
import com.android.billingclient.api.Purchase;
import com.android.billingclient.api.PurchasesUpdatedListener;
import com.android.billingclient.api.QueryProductDetailsParams;
import com.android.billingclient.api.QueryPurchasesParams;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class MainActivity extends Activity implements PurchasesUpdatedListener {

    private static final String TAG = "RiseOfGreatness_Billing";
    public static final String PRO_PASS_PRODUCT_ID = "pro_pass_49";

    private WebView webView;
    private BillingClient billingClient;
    private boolean isBillingConnected = false;
    private long lastBackPressTime = 0;
    private Toast exitToast;

    @SuppressLint("SetJavaScriptEnabled")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // Ekran Yenileme Hızını 120Hz olarak talep et (Yüksek Akıcılık)
        if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.LOLLIPOP) {
            try {
                WindowManager.LayoutParams layoutParams = getWindow().getAttributes();
                layoutParams.preferredRefreshRate = 120.0f;
                getWindow().setAttributes(layoutParams);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }

        // Tam ekran - durum çubuğu gizli
        requestWindowFeature(Window.FEATURE_NO_TITLE);
        getWindow().setFlags(
            WindowManager.LayoutParams.FLAG_FULLSCREEN,
            WindowManager.LayoutParams.FLAG_FULLSCREEN
        );

        // Sistem UI'yi gizle (navigation bar da dahil)
        hideSystemUI();

        webView = new WebView(this);
        setContentView(webView);

        // WebView ayarları
        WebSettings settings = webView.getSettings();
        settings.setJavaScriptEnabled(true);
        settings.setDomStorageEnabled(true);           // localStorage için şart!
        settings.setAllowFileAccess(true);
        settings.setAllowContentAccess(true);
        settings.setMediaPlaybackRequiresUserGesture(false); // Video otomatik oynat
        settings.setCacheMode(WebSettings.LOAD_DEFAULT);
        settings.setMixedContentMode(WebSettings.MIXED_CONTENT_ALWAYS_ALLOW);
        settings.setLoadWithOverviewMode(true);
        settings.setUseWideViewPort(true);
        settings.setSupportZoom(false);                // Zoom kapalı (oyun için)
        settings.setBuiltInZoomControls(false);
        settings.setDisplayZoomControls(false);
        settings.setTextZoom(100);                     // Sistem yazı boyutunun oyunu büyütmesini engelle

        // JavaScript Interface Bağlantısı (Android <-> Web Oyunu)
        webView.addJavascriptInterface(new WebAppInterface(), "Android");

        // Chrome client (alert/confirm/prompt özelleştirildi)
        webView.setWebChromeClient(new WebChromeClient() {
            @Override
            public boolean onJsAlert(WebView view, String url, String message, final android.webkit.JsResult result) {
                try {
                    new android.app.AlertDialog.Builder(MainActivity.this)
                        .setTitle("Rise Of Greatness")
                        .setMessage(message)
                        .setPositiveButton("Tamam", (dialog, which) -> result.confirm())
                        .setCancelable(false)
                        .create()
                        .show();
                } catch (Exception e) {
                    e.printStackTrace();
                    result.confirm();
                }
                return true;
            }

            @Override
            public boolean onJsConfirm(WebView view, String url, String message, final android.webkit.JsResult result) {
                try {
                    new android.app.AlertDialog.Builder(MainActivity.this)
                        .setTitle("Rise Of Greatness")
                        .setMessage(message)
                        .setPositiveButton("Evet", (dialog, which) -> result.confirm())
                        .setNegativeButton("Hayır", (dialog, which) -> result.cancel())
                        .setCancelable(false)
                        .create()
                        .show();
                } catch (Exception e) {
                    e.printStackTrace();
                    result.cancel();
                }
                return true;
            }

            @Override
            public boolean onJsPrompt(WebView view, String url, String message, String defaultValue, final android.webkit.JsPromptResult result) {
                try {
                    final android.widget.EditText input = new android.widget.EditText(MainActivity.this);
                    input.setText(defaultValue);
                    input.setSingleLine(true);
                    input.setTextColor(android.graphics.Color.WHITE);
                    input.setHintTextColor(android.graphics.Color.GRAY);

                    android.widget.FrameLayout container = new android.widget.FrameLayout(MainActivity.this);
                    android.widget.FrameLayout.LayoutParams params = new android.widget.FrameLayout.LayoutParams(
                        android.view.ViewGroup.LayoutParams.MATCH_PARENT,
                        android.view.ViewGroup.LayoutParams.WRAP_CONTENT
                    );
                    params.leftMargin = 48;
                    params.rightMargin = 48;
                    params.topMargin = 16;
                    params.bottomMargin = 16;
                    input.setLayoutParams(params);
                    container.addView(input);

                    new android.app.AlertDialog.Builder(MainActivity.this)
                        .setTitle("Rise Of Greatness")
                        .setMessage(message)
                        .setView(container)
                        .setPositiveButton("Tamam", (dialog, which) -> result.confirm(input.getText().toString()))
                        .setNegativeButton("İptal", (dialog, which) -> result.cancel())
                        .setCancelable(false)
                        .create()
                        .show();
                } catch (Exception e) {
                    e.printStackTrace();
                    result.cancel();
                }
                return true;
            }
        });

        // Sayfadan çıkışı engelle
        webView.setWebViewClient(new WebViewClient() {
            @Override
            public boolean shouldOverrideUrlLoading(WebView view, String url) {
                if (url.startsWith("file://")) {
                    view.loadUrl(url);
                    return true;
                }
                return true; // Dış linkleri engelle
            }

            @Override
            public void onPageFinished(WebView view, String url) {
                super.onPageFinished(view, url);
                // Sayfa yüklendiğinde var olan satın alımları kontrol et
                checkExistingPurchases();
            }
        });

        // Google Play Billing Başlatma
        initBillingClient();

        // Oyunu yükle
        webView.loadUrl("file:///android_asset/index.html");
    }

    private void hideSystemUI() {
        View decorView = getWindow().getDecorView();
        decorView.setSystemUiVisibility(
            View.SYSTEM_UI_FLAG_LAYOUT_STABLE
            | View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION
            | View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN
            | View.SYSTEM_UI_FLAG_HIDE_NAVIGATION
            | View.SYSTEM_UI_FLAG_FULLSCREEN
            | View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY
        );
    }

    private void initBillingClient() {
        billingClient = BillingClient.newBuilder(this)
            .setListener(this)
            .enablePendingPurchases()
            .build();

        startBillingConnection();
    }

    private void startBillingConnection() {
        billingClient.startConnection(new BillingClientStateListener() {
            @Override
            public void onBillingSetupFinished(@NonNull BillingResult billingResult) {
                if (billingResult.getResponseCode() == BillingClient.BillingResponseCode.OK) {
                    Log.d(TAG, "Google Play Billing Bağlantısı Başarılı!");
                    isBillingConnected = true;
                    checkExistingPurchases();
                } else {
                    Log.w(TAG, "Billing bağlantısı kurulamadı. Kod: " + billingResult.getResponseCode());
                    isBillingConnected = false;
                }
            }

            @Override
            public void onBillingServiceDisconnected() {
                Log.w(TAG, "Google Play Billing servisi koptu. Yeniden bağlanılıyor...");
                isBillingConnected = false;
            }
        });
    }

    public void checkExistingPurchases() {
        if (billingClient == null || !billingClient.isReady()) return;

        QueryPurchasesParams queryParams = QueryPurchasesParams.newBuilder()
            .setProductType(BillingClient.ProductType.INAPP)
            .build();

        billingClient.queryPurchasesAsync(queryParams, (billingResult, list) -> {
            if (billingResult.getResponseCode() == BillingClient.BillingResponseCode.OK && list != null) {
                for (Purchase purchase : list) {
                    if (purchase.getPurchaseState() == Purchase.PurchaseState.PURCHASED) {
                        for (String productId : purchase.getProducts()) {
                            if (productId.equals(PRO_PASS_PRODUCT_ID) || productId.equals("pro_pass")) {
                                Log.d(TAG, "Aktif Pro Pass satın alımı bulundu!");
                                handlePurchaseSuccess(purchase, true);
                                return;
                            }
                        }
                    }
                }
            }
        });
    }

    @Override
    public void onPurchasesUpdated(@NonNull BillingResult billingResult, @Nullable List<Purchase> purchases) {
        if (billingResult.getResponseCode() == BillingClient.BillingResponseCode.OK && purchases != null) {
            for (Purchase purchase : purchases) {
                if (purchase.getPurchaseState() == Purchase.PurchaseState.PURCHASED) {
                    handlePurchaseSuccess(purchase, false);
                }
            }
        } else if (billingResult.getResponseCode() == BillingClient.BillingResponseCode.USER_CANCELED) {
            Log.d(TAG, "Kullanıcı satın alma işlemini iptal etti.");
        } else {
            Log.e(TAG, "Satın alma hatası: " + billingResult.getDebugMessage());
            runOnUiThread(() -> Toast.makeText(MainActivity.this, "Ödeme tamamlanamadı: " + billingResult.getDebugMessage(), Toast.LENGTH_SHORT).show());
        }
    }

    private void handlePurchaseSuccess(Purchase purchase, boolean isRestore) {
        // Satın almayı onayla (Acknowledge)
        if (!purchase.isAcknowledged()) {
            AcknowledgePurchaseParams acknowledgePurchaseParams = AcknowledgePurchaseParams.newBuilder()
                .setPurchaseToken(purchase.getPurchaseToken())
                .build();
            billingClient.acknowledgePurchase(acknowledgePurchaseParams, billingResult -> {
                Log.d(TAG, "Satın alma onayı: " + billingResult.getResponseCode());
            });
        }

        // WebView içindeki JS'ye haber ver
        runOnUiThread(() -> {
            if (!isRestore) {
                Toast.makeText(MainActivity.this, "👑 Tebrikler! Pro Pass VIP başarıyla aktif edildi!", Toast.LENGTH_LONG).show();
            }
            if (webView != null) {
                webView.evaluateJavascript("if (window.onProPassPurchaseSuccess) { window.onProPassPurchaseSuccess(); } else if (window.GAME && window.GAME.activateProPassReal) { window.GAME.activateProPassReal(); }", null);
            }
        });
    }

    public void launchPurchase(String productId) {
        if (!isBillingConnected || billingClient == null || !billingClient.isReady()) {
            runOnUiThread(() -> {
                Toast.makeText(MainActivity.this, "Google Play Store bağlantısı kuruluyor...", Toast.LENGTH_SHORT).show();
                startBillingConnection();
            });
            return;
        }

        List<QueryProductDetailsParams.Product> productList = new ArrayList<>();
        productList.add(
            QueryProductDetailsParams.Product.newBuilder()
                .setProductId(productId)
                .setProductType(BillingClient.ProductType.INAPP)
                .build()
        );

        QueryProductDetailsParams params = QueryProductDetailsParams.newBuilder()
            .setProductList(productList)
            .build();

        billingClient.queryProductDetailsAsync(params, (billingResult, list) -> {
            if (billingResult.getResponseCode() == BillingClient.BillingResponseCode.OK && list != null && !list.isEmpty()) {
                ProductDetails productDetails = list.get(0);

                List<BillingFlowParams.ProductDetailsParams> productDetailsParamsList = Collections.singletonList(
                    BillingFlowParams.ProductDetailsParams.newBuilder()
                        .setProductDetails(productDetails)
                        .build()
                );

                BillingFlowParams billingFlowParams = BillingFlowParams.newBuilder()
                    .setProductDetailsParamsList(productDetailsParamsList)
                    .build();

                runOnUiThread(() -> billingClient.launchBillingFlow(MainActivity.this, billingFlowParams));
            } else {
                Log.e(TAG, "Ürün detayları bulunamadı: " + productId + " / Kod: " + billingResult.getResponseCode());
                runOnUiThread(() -> Toast.makeText(MainActivity.this, "Ürün Google Play Console'da hazırlanıyor (Test/Taslak sürüm gereklidir).", Toast.LENGTH_LONG).show());
            }
        });
    }

    // JavaScript'ten Çağrılabilen Köprü (Bridge) Sınıfı
    public class WebAppInterface {
        @JavascriptInterface
        public void buyProPass(String productId) {
            String targetId = (productId != null && !productId.isEmpty()) ? productId : PRO_PASS_PRODUCT_ID;
            launchPurchase(targetId);
        }

        @JavascriptInterface
        public void restorePurchases() {
            checkExistingPurchases();
        }

        @JavascriptInterface
        public boolean isAndroidApp() {
            return true;
        }

        @JavascriptInterface
        public void vibrate(long milliseconds) {
            try {
                Vibrator v = (Vibrator) getSystemService(Context.VIBRATOR_SERVICE);
                if (v != null && v.hasVibrator()) {
                    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                        v.vibrate(VibrationEffect.createOneShot(milliseconds, VibrationEffect.DEFAULT_AMPLITUDE));
                    } else {
                        v.vibrate(milliseconds);
                    }
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
        }

        @JavascriptInterface
        public void vibratePattern(String patternStr) {
            try {
                if (patternStr == null || patternStr.isEmpty()) return;
                String[] parts = patternStr.split(",");
                long[] timings = new long[parts.length];
                for (int i = 0; i < parts.length; i++) {
                    timings[i] = Long.parseLong(parts[i].trim());
                }
                Vibrator v = (Vibrator) getSystemService(Context.VIBRATOR_SERVICE);
                if (v != null && v.hasVibrator()) {
                    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                        v.vibrate(VibrationEffect.createWaveform(timings, -1));
                    } else {
                        v.vibrate(timings, -1);
                    }
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

    @Override
    public void onBackPressed() {
        if (webView != null) {
            webView.evaluateJavascript("window.handleAndroidBack ? window.handleAndroidBack() : false", value -> {
                if ("true".equalsIgnoreCase(value)) {
                    // Web tarafında modal veya açık panel kapatıldı
                    return;
                }
                // Ana ekranda: Çift basarak çıkış mekaniği
                long currentTime = System.currentTimeMillis();
                if (currentTime - lastBackPressTime < 2000) {
                    if (exitToast != null) exitToast.cancel();
                    finish();
                } else {
                    lastBackPressTime = currentTime;
                    exitToast = Toast.makeText(MainActivity.this, "Çıkmak için tekrar basın", Toast.LENGTH_SHORT);
                    exitToast.show();
                }
            });
        } else {
            super.onBackPressed();
        }
    }

    @Override
    protected void onPause() {
        super.onPause();
        if (webView != null) {
            webView.onPause();
            webView.evaluateJavascript("if (window.onAppPause) { window.onAppPause(); }", null);
        }
    }

    @Override
    protected void onResume() {
        super.onResume();
        hideSystemUI();
        if (webView != null) {
            webView.onResume();
            webView.evaluateJavascript("if (window.onAppResume) { window.onAppResume(); }", null);
        }
        if (billingClient != null && billingClient.isReady()) {
            checkExistingPurchases();
        }
    }

    @Override
    protected void onDestroy() {
        if (billingClient != null) {
            billingClient.endConnection();
        }
        if (webView != null) {
            webView.destroy();
        }
        super.onDestroy();
    }
}

