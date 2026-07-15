# Walkthrough - Aktif Gerçek Zamanlı Oynanış Güncellemesi

Bu güncelleme, "Futbol Atlası: Kariyer Efsanesi" oyununu tamamen interaktif ve anlık oynanabilir bir 2D futbol arcade oyununa dönüştürür.

---

## Yapılan Geliştirmeler ve Yenilikler

1.  **Kesintisiz Maç Modu:** Maçlar artık arka planda metinle simüle edilip sadece ara sıra duraklamaz. 90 dakika boyunca tüm maç sürekli olarak canvas üzerinde aktif olarak akar ve oynanır.
2.  **Sanal Joystick:** Mobil cihazlarda başparmağını ekranın sol yarısında sürükleyerek karakterini (SEN) 360 derece anlık olarak koşturabilirsin.
3.  **Gelişmiş Yapay Zeka (AI):**
    *   *Takım Arkadaşları (Yeşiller):* Kendileri ileriye doğru hücum eder, paslaşırlar veya sen "PAS İSTE" butonuna bastığında sana pas atarlar.
    *   *Rakip Oyuncular (Maviler):* Top kimdeyse ona doğru pres yapıp topu çalmaya çalışırlar, kalene (alt kale) akın düzenlerler.
    *   *Kaleciler:* Topu takip ederek çizgi üzerinde kurtarış yapmaya çalışırlar.
4.  **Top Sürme & Top Çalma (Tackle):** Karakterinle topa dokunduğunda topu sürmeye başlarsın. Rakip oyuncu sana çok yaklaştığında topu çalabilir; aynı şekilde sen de rakibe çarparak topu geri kapabilirsin.
5.  **Şut ve Pas Kontrolleri:** Parmağını sağ yarada sürükleyip bıraktığında sapan (slingshot) mekanizmasıyla kaleye şut atabilirsin. Takım arkadaşlarına dokunarak doğrudan pas gönderebilirsin.
6.  **Hızlandırıcı Kontrolü (1x / 2x / 4x):** Maç ekranının sağ üstündeki butonla maç hızını (fizik ve zaman döngüsünü) 2 kat veya 4 kat hızlandırarak maçları saniyeler içinde tamamlayabilirsin.

### 5. 💸 Ekonomi Rebalance: Maaşla Orantılı Dynamic Enerji Fiyatları & Maaş Sınırları (Salary Cap)
- Yeteneklerin hemen 100 olmasını engellemek ve kariyer boyu rekabeti korumak için kondisyon içecekleri ve masaj fiyatları **haftalık maaşla doğru orantılı (dynamic)** hale getirilmiştir:
  - **Enerji İçeceği (+35):** Haftalık maaşın %80'i (Min 100 €) - Başlangıçta 120 €, Süper Lig'de ~96.000 €
  - **NRG İçeceği (+50):** Haftalık maaşın 1.5 katı (Min 250 €) - Başlangıçta 250 €, Süper Lig'de ~180.000 €
  - **Vitamin Takviyesi (+60):** Haftalık maaşın 1.2 katı (Min 200 €) - Başlangıçta 200 €, Süper Lig'de ~144.000 €
  - **Masaj & Fizyoterapi (%100):** Haftalık maaşın 3.5 katı (Min 500 €) - Başlangıçta 525 €, Süper Lig'de ~420.000 €
- Haftalık maaşların kontrolsüz bir şekilde milyon eurolara tırmanması engellenmiştir. Lig bazlı tavan sınırlar (Salary Caps) getirilmiştir:
  - 3. Lig: Maksimum 2.500 € / Hafta
  - 2. Lig: Maksimum 6.000 € / Hafta
  - 1. Lig: Maksimum 15.000 € / Hafta
  - Süper Lig: Maksimum 120.000 € / Hafta
  - Avrupa Ligleri (Avrupa devleri dahil): Maksimum **300.000 € / Hafta**

---

## Bağlantı ve Test Adımları

Yerel TCP sunucusu bilgisayarında arka planda başarıyla yeniden başlatıldı:

*   **Bilgisayarda Oynamak İçin:** [http://localhost:3000](http://localhost:3000)
*   **Telefonda Oynamak İçin (Aynı Wi-Fi):** **[http://192.168.1.120:3000](http://192.168.1.120:3000)**

### Doğrulanan Kontroller:
- [x] Sol yarıda sanal joystick ile koşma ve top sürme.
- [x] Sağ yarada çekip bırakarak (swipe) kaleye şut çekme.
- [x] Sağ alttaki ⚽ butonuna basarak yeşil takım arkadaşlarından pas isteme.
- [x] Rakip oyunculara yaklaşıp top kapma (tackle).
- [x] Üst köşedeki "Hız: 1x" butonuna basarak hızı 2x ve 4x modlarına alma.
- [x] Gol atıldığında veya yenildiğinde skorun güncellenmesi ve oyunun santradan devam etmesi.
- [x] 90. dakika bittiğinde performans puanının hesaplanması ve kariyer moduna dönülmesi.

---

## Son Eklenen Finansal & Veritabanı Güncellemeleri

### 1. Kripto Borsası Maliyet & Kar/Zarar Takibi:
*   **Ağırlıklı Ortalama Alış Maliyeti:** Birden fazla alım yapıldığında maliyet borsa usulüne göre (`((Eski Miktar * Eski Maliyet) + (Yeni Miktar * Alış Fiyatı)) / Toplam Miktar`) hesaplanır.
*   **Dinamik Kâr/Zarar Göstergesi:** Coinin anlık fiyatı ile maliyetini kıyaslayıp kâr durumuna göre neon yeşil (`+X%`) veya zarar durumuna göre neon kırmızı (`-Y%`) olarak yüzdenizi gösterir.
*   **Portföy Dönüştürücü:** Eski kayıtlı oyunlardaki kripto verilerini hatasız çalışacak şekilde otomatik nesne formatına dönüştürür.

### 2. Canlı Verilerle Eşitlenmiş Lig Kadroları (2024-2025):
*   Süper Lig, 1. Lig, 2. Lig ve 3. Lig'deki tüm takım listeleri, renk kombinasyonları ve güçleri (att, mid, def) **2024/2025 sezonunun gerçek puan durumuna ve performanslarına göre** doğrudan kaynak koda (hafızaya) işlendi.
*   Yeni başlayan tüm oyuncular, Wikipedia üzerinden canlı veri eşitlemesi yapmalarına gerek kalmadan en güncel ve gerçekçi güç seviyeleriyle oyuna başlarlar.

