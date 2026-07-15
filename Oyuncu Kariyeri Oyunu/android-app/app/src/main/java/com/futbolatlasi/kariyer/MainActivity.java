package com.futbolatlasi.kariyer;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.os.Bundle;
import android.view.View;
import android.view.Window;
import android.view.WindowManager;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;

public class MainActivity extends Activity {

    private WebView webView;

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
        View decorView = getWindow().getDecorView();
        decorView.setSystemUiVisibility(
            View.SYSTEM_UI_FLAG_LAYOUT_STABLE
            | View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION
            | View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN
            | View.SYSTEM_UI_FLAG_HIDE_NAVIGATION
            | View.SYSTEM_UI_FLAG_FULLSCREEN
            | View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY
        );

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

        // Chrome client (alert/confirm özelleştirildi - çirkin file:// yazısını kaldırmak için)
        webView.setWebChromeClient(new WebChromeClient() {
            @Override
            public boolean onJsAlert(WebView view, String url, String message, final android.webkit.JsResult result) {
                try {
                    new android.app.AlertDialog.Builder(MainActivity.this)
                        .setTitle("Rise Of Greatness")
                        .setMessage(message)
                        .setPositiveButton("Tamam", new android.content.DialogInterface.OnClickListener() {
                            @Override
                            public void onClick(android.content.DialogInterface dialog, int which) {
                                result.confirm();
                            }
                        })
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
                        .setPositiveButton("Evet", new android.content.DialogInterface.OnClickListener() {
                            @Override
                            public void onClick(android.content.DialogInterface dialog, int which) {
                                result.confirm();
                            }
                        })
                        .setNegativeButton("Hayır", new android.content.DialogInterface.OnClickListener() {
                            @Override
                            public void onClick(android.content.DialogInterface dialog, int which) {
                                result.cancel();
                            }
                        })
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
                // Sadece local dosyalara izin ver
                if (url.startsWith("file://")) {
                    view.loadUrl(url);
                    return true;
                }
                return true; // Dış linkleri engelle
            }
        });

        // Oyunu yükle
        webView.loadUrl("file:///android_asset/index.html");
    }

    @Override
    public void onBackPressed() {
        // Geri tuşunu devre dışı bırak (kazara çıkışı engelle)
        // webView.goBack() de kullanılabilir
    }

    @Override
    protected void onResume() {
        super.onResume();
        // Sistem UI'yi tekrar gizle (notification bar açıldığında)
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
}
