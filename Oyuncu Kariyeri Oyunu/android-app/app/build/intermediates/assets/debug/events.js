/**
 * Futbol Atlası: Kariyer Efsanesi - Random Events Module
 * Contains the core text scenarios and their database modifiers.
 */

const RANDOM_EVENTS = [
    {
        id: "derby_stream",
        title: "Derbi Öncesi Canlı Yayın Daveti",
        scope: "Süper Lig",
        description: "Derbi öncesi, Türkiye'nin en popüler futbol yayıncısı seni yayınına konuk etmek istiyor. Yayın gece yarısı bitecek ve büyük ilgi toplayacak.",
        optionA: {
            text: "Yayına katıl ve taraftarla dertleş.",
            effectText: "Taraftar +20k, Moral +15, Kondisyon -15",
            apply: (state) => {
                state.followers += 20000;
                state.moral = Math.min(100, state.moral + 15);
                state.kondisyon = Math.max(0, state.kondisyon - 15);
            }
        },
        optionB: {
            text: "Teklifi reddet, erkenden uyu.",
            effectText: "Kondisyon +15, Hoca Güveni +10, Taraftar -1k",
            apply: (state) => {
                state.kondisyon = Math.min(100, state.kondisyon + 15);
                state.hocaGuveni = Math.min(100, state.hocaGuveni + 10);
                state.followers = Math.max(0, state.followers - 1000);
            }
        }
    },
    {
        id: "stoke_physical",
        title: "İngiliz Deplasmanında Tehdit",
        scope: "Premier League",
        description: "Gelecek maçtaki rakibinin meşhur sert stoperi basına: 'O genç çocuk sahada yürüyemeyecek, kemik seslerini duyacak' dedi.",
        optionA: {
            text: "Aynı sertlikle yanıt ver: 'Sahada görüşürüz!'",
            effectText: "Moral +25, Taraftar +15k, Kondisyon -10 (Sert maç)",
            apply: (state) => {
                state.moral = Math.min(100, state.moral + 25);
                state.followers += 15000;
                state.kondisyon = Math.max(0, state.kondisyon - 10);
            }
        },
        optionB: {
            text: "Basın kavgasından kaçın, sessizliğini koru.",
            effectText: "Hoca Güveni +15, Moral -10",
            apply: (state) => {
                state.hocaGuveni = Math.min(100, state.hocaGuveni + 15);
                state.moral = Math.max(0, state.moral - 10);
            }
        }
    },
    {
        id: "catenaccio_dispute",
        title: "İtalyan Defansı ve Taktik Savaşı",
        scope: "Serie A",
        description: "Hocan bir Serie A maçı öncesi tamamen takım savunmasına gömülmeni emretti. Ama sen bir hücumcusun!",
        optionA: {
            text: "Taktik disipline %100 sadık kal.",
            effectText: "Hoca Güveni +25, Moral -15, Taraftar -3k",
            apply: (state) => {
                state.hocaGuveni = Math.min(100, state.hocaGuveni + 25);
                state.moral = Math.max(0, state.moral - 15);
                state.followers = Math.max(0, state.followers - 3000);
            }
        },
        optionB: {
            text: "İnisiyatif alıp fırsat buldukça atağa katıl.",
            effectText: "Moral +20, Taraftar +10k, Hoca Güveni -20",
            apply: (state) => {
                state.moral = Math.min(100, state.moral + 20);
                state.followers += 10000;
                state.hocaGuveni = Math.max(0, state.hocaGuveni - 20);
            }
        }
    },
    {
        id: "commercial_shoot",
        title: "Lüks Saat Reklamı ve İdman Çakışması",
        scope: "La Liga",
        description: "Lüks bir saat markası büyük bir reklam anlaşması getirdi. Çekimler, haftanın en kritik taktik antrenmanı ile aynı gün ve saatte.",
        optionA: {
            text: "Reklam çekimine git, bütçeyi doldur.",
            effectText: "Bütçe +15,000 €, Taraftar +10k, Hoca Güveni -30",
            apply: (state) => {
                state.money += 15000;
                state.followers += 10000;
                state.hocaGuveni = Math.max(0, state.hocaGuveni - 30);
            }
        },
        optionB: {
            text: "Çekimi iptal et, antrenmana çık.",
            effectText: "Hoca Güveni +20, Kondisyon +10, Bütçe -5,000 € (İptal Cezası)",
            apply: (state) => {
                state.hocaGuveni = Math.min(100, state.hocaGuveni + 20);
                state.kondisyon = Math.min(100, state.kondisyon + 10);
                state.money = Math.max(0, state.money - 5000);
            }
        }
    },
    {
        id: "gegenpress_fan",
        title: "Alman Taraftar Kulübü Toplantısı",
        scope: "Bundesliga",
        description: "Bundesliga taraftar birliği seni bir pub'da buluşmaya davet etti. Samimi bir gece planlıyorlar.",
        optionA: {
            text: "Davete katıl, taraftarla sosyalleş.",
            effectText: "Taraftar +25k, Moral +15, Kondisyon -10",
            apply: (state) => {
                state.followers += 25000;
                state.moral = Math.min(100, state.moral + 15);
                state.kondisyon = Math.max(0, state.kondisyon - 10);
            }
        },
        optionB: {
            text: "Kişisel diyetine ve uykuna sadık kal, katılma.",
            effectText: "Kondisyon +20, Taraftar -5k",
            apply: (state) => {
                state.kondisyon = Math.min(100, state.kondisyon + 20);
                state.followers = Math.max(0, state.followers - 5000);
            }
        }
    },
    {
        id: "fashion_week",
        title: "Paris Moda Haftası Podyumu",
        scope: "Ligue 1",
        description: "Ünlü bir tasarımcı Paris Moda Haftası'nda mankenlik yapmanı istedi. Maçtan hemen önceki gün podyumda olman gerekiyor.",
        optionA: {
            text: "Podyuma çık, moda ikonu ol.",
            effectText: "Taraftar +20k, Bütçe +10,000 €, Kondisyon -15, Hoca -15",
            apply: (state) => {
                state.followers += 20000;
                state.money += 10000;
                state.kondisyon = Math.max(0, state.kondisyon - 15);
                state.hocaGuveni = Math.max(0, state.hocaGuveni - 15);
            }
        },
        optionB: {
            text: "Teklifi reddet, maça odaklan.",
            effectText: "Kondisyon +15, Hoca Güveni +15, Taraftar -2k",
            apply: (state) => {
                state.kondisyon = Math.min(100, state.kondisyon + 15);
                state.hocaGuveni = Math.min(100, state.hocaGuveni + 15);
                state.followers = Math.max(0, state.followers - 2000);
            }
        }
    },
    {
        id: "kebap_day",
        title: "Mangal Günü Coşkusu",
        scope: "global",
        description: "Yönetim takım ruhunu güçlendirmek için idman sonrası tesislere mangal kurdurdu. Kebaplar dumanı üstünde kokuyor.",
        optionA: {
            text: "Takımla beraber kebapları ve künefeyi mideye indir.",
            effectText: "Moral +25, Kondisyon -20 (Ağır sindirim)",
            apply: (state) => {
                state.moral = Math.min(100, state.moral + 25);
                state.kondisyon = Math.max(0, state.kondisyon - 20);
            }
        },
        optionB: {
            text: "Izgara tavuk ve salata tabağıyla yetin.",
            effectText: "Kondisyon +15, Moral -10",
            apply: (state) => {
                state.kondisyon = Math.min(100, state.kondisyon + 15);
                state.moral = Math.max(0, state.moral - 10);
            }
        }
    },
    {
        id: "rival_transfer",
        title: "Ezeli Rakipten Gizli Teklif",
        scope: "global",
        description: "Menajerin, ezeli rakip takımdan gelen çok cazip ama gizli bir teklif getirdi. Medya bu yemeğin kokusunu aldı.",
        optionA: {
            text: "Basın açıklaması yapıp sadakatini vurgula.",
            effectText: "Taraftar +15k, Hoca Güveni +10, Moral -15 (Menajer krizi)",
            apply: (state) => {
                state.followers += 15000;
                state.hocaGuveni = Math.min(100, state.hocaGuveni + 10);
                state.moral = Math.max(0, state.moral - 15);
            }
        },
        optionB: {
            text: "Görüşmeyi inkar etme, sessiz kal.",
            effectText: "Taraftar -30k (Hain ilan edildin), Moral +15",
            apply: (state) => {
                state.followers = Math.max(0, state.followers - 30000);
                state.moral = Math.min(100, state.moral + 15);
            }
        }
    },
    {
        id: "national_bonus",
        title: "Milli Takımda Prim Pazarlığı",
        scope: "global",
        description: "Milli Takım kampında kıdemli futbolcular primlerin ödenmemesi üzerine federasyonu boykot etme kararı alıyor ve sana da baskı yapıyorlar.",
        optionA: {
            text: "Boykoda katıl, takım birliğini koru.",
            effectText: "Moral +20, Hoca Güveni -20 (Milli Hoca kızgın)",
            apply: (state) => {
                state.moral = Math.min(100, state.moral + 20);
                state.hocaGuveni = Math.max(0, state.hocaGuveni - 20);
            }
        },
        optionB: {
            text: "Boykota katılma: 'Ben sadece bayrak için oynarım.'",
            effectText: "Taraftar +30k, Moral -15 (Takım seni dışladı)",
            apply: (state) => {
                state.followers += 30000;
                state.moral = Math.max(0, state.moral - 15);
            }
        }
    },
    {
        id: "final_insomnia",
        title: "Dev Maç Öncesi Havai Fişek Krizi",
        scope: "global",
        description: "Kritik lig maçı öncesi otelinizin önünde rakip taraftarlar sabaha kadar havai fişek atarak gürültü yapıyor.",
        optionA: {
            text: "Meditasyon yapıp kulaklıkla uyumaya çalış.",
            effectText: "Kondisyon +15, Moral -10 (Zihinsel yorgunluk)",
            apply: (state) => {
                state.kondisyon = Math.min(100, state.kondisyon + 15);
                state.moral = Math.max(0, state.moral - 10);
            }
        },
        optionB: {
            text: "Uyumayı bırak, rakip beklerin analiz videolarını izle.",
            effectText: "Moral +25, Kondisyon -25 (Fiziksel yorgunluk)",
            apply: (state) => {
                state.moral = Math.min(100, state.moral + 25);
                state.kondisyon = Math.max(0, state.kondisyon - 25);
            }
        }
    },
    // --- 25 NEW DYNAMIC HOMETOWN-AWARE SCENARIOS ---
    {
        id: "halisaha_scandal",
        title: "Memleketlilerle Halı Saha Kaçamağı",
        scope: "global",
        description: "Doğduğun şehir ${state.hometownCity}'den gelen eski çocukluk arkadaşların seni gizli bir halı saha maçına çağırdı. Hoca duyarsa ceza verebilir ama nostalji paha biçilemez!",
        optionA: {
            text: "Gidip şov yap, rövaşata golü at.",
            effectText: "Moral +25, Taraftar +5k, Kondisyon -20",
            apply: (state) => {
                state.moral = Math.min(100, state.moral + 25);
                state.followers += 5000;
                state.kondisyon = Math.max(10, state.kondisyon - 20);
            }
        },
        optionB: {
            text: "Profesyonel kal, arkadaşlarına çay ısmarla.",
            effectText: "Kondisyon +15, Moral -5",
            apply: (state) => {
                state.kondisyon = Math.min(100, state.kondisyon + 15);
                state.moral = Math.max(0, state.moral - 5);
            }
        }
    },
    {
        id: "hometown_festival",
        title: "Hemşehri Plaket Günü",
        scope: "global",
        description: "${state.hometownDistrict} Belediyesi seni 'Yılın En Değerli Sporcusu' seçti ve ödül törenine onur konuğu olarak davet etti.",
        optionA: {
            text: "Törene katıl, plaketi kaldır ve nutuk at.",
            effectText: "Moral +20, Taraftar +12k, Kondisyon -10",
            apply: (state) => {
                state.moral = Math.min(100, state.moral + 20);
                state.followers += 12000;
                state.kondisyon = Math.max(10, state.kondisyon - 10);
            }
        },
        optionB: {
            text: "Video mesaj gönder, tesiste idman yap.",
            effectText: "Hoca Güveni +15, Kondisyon +10",
            apply: (state) => {
                state.hocaGuveni = Math.min(100, state.hocaGuveni + 15);
                state.kondisyon = Math.min(100, state.kondisyon + 10);
            }
        }
    },
    {
        id: "crypto_sponsor",
        title: "Kripto Coin Reklam Yüzü",
        scope: "global",
        description: "Menajerin bilindik bir kripto projesinin yüzü olmanı istiyor. Anlaşma büyük para getiriyor ama dolandırıcı çıkma ihtimali var.",
        optionA: {
            text: "Parayı seç, reklamda oyna.",
            effectText: "Bütçe +20,000 €, Taraftar -10k (Tepki çektin)",
            apply: (state) => {
                state.money += 20000;
                state.followers = Math.max(0, state.followers - 10000);
            }
        },
        optionB: {
            text: "Güvenli kal, reklamı reddet.",
            effectText: "Taraftar +8k, Moral +10",
            apply: (state) => {
                state.followers += 8000;
                state.moral = Math.min(100, state.moral + 10);
            }
        }
    },
    {
        id: "injured_child",
        title: "Hastanede Küçük Bir Hayran",
        scope: "global",
        description: "${state.hometownCity} Devlet Hastanesi'nde yatan 10 yaşındaki bir çocuk seninle tanışmak istediğini menajerine iletti.",
        optionA: {
            text: "Maç kampını bölüp hastaneyi ziyaret et.",
            effectText: "Moral +30, Taraftar +25k, Hoca Güveni -10 (Disiplin)",
            apply: (state) => {
                state.moral = Math.min(100, state.moral + 30);
                state.followers += 25000;
                state.hocaGuveni = Math.max(10, state.hocaGuveni - 10);
            }
        },
        optionB: {
            text: "Formanı imzala ve video ile selam yolla.",
            effectText: "Taraftar +10k, Hoca Güveni +10",
            apply: (state) => {
                state.followers += 10000;
                state.hocaGuveni = Math.min(100, state.hocaGuveni + 10);
            }
        }
    },
    {
        id: "tactical_leak",
        title: "Taktik Sızdırma Teklifi",
        scope: "global",
        description: "Kurnaz bir spor muhabiri, bir sonraki transferinde seni manşet yapma karşılığında hocanın gizli derbi taktiğini öğrenmek istiyor.",
        optionA: {
            text: "Muhabire tüyo ver (Taktik sızdır).",
            effectText: "Moral +15, Hoca Güveni -25 (Yakalanma riski!)",
            apply: (state) => {
                state.moral = Math.min(100, state.moral + 15);
                state.hocaGuveni = Math.max(0, state.hocaGuveni - 25);
            }
        },
        optionB: {
            text: "Muhabiri tersle ve kulübe şikayet et.",
            effectText: "Hoca Güveni +25, Taraftar +5k",
            apply: (state) => {
                state.hocaGuveni = Math.min(100, state.hocaGuveni + 25);
                state.followers += 5000;
            }
        }
    },
    {
        id: "gaming_tournament",
        title: "E-Spor FIFA Turnuvası",
        scope: "global",
        description: "Türkiye'nin en popüler e-sporcularından biri seni Twitch yayınında FIFA kapışmasına davet ediyor.",
        optionA: {
            text: "Yayına katıl, e-spor yeteneklerini göster.",
            effectText: "Taraftar +18k, Moral +10, Kondisyon -10 (Gece yayını)",
            apply: (state) => {
                state.followers += 18000;
                state.moral = Math.min(100, state.moral + 10);
                state.kondisyon = Math.max(10, state.kondisyon - 10);
            }
        },
        optionB: {
            text: "Konsolu kapat, maça konsantre ol.",
            effectText: "Kondisyon +15, Hoca Güveni +5",
            apply: (state) => {
                state.kondisyon = Math.min(100, state.kondisyon + 15);
                state.hocaGuveni = Math.min(100, state.hocaGuveni + 5);
            }
        }
    },
    {
        id: "referee_complaint",
        title: "Disiplin Kurulu Sevk Riski",
        scope: "global",
        description: "Geçen hafta hakeme yaptığın 'Gözlük taksın!' açıklaması nedeniyle federasyon seni disipline sevk etmekle tehdit ediyor.",
        optionA: {
            text: "Geri adım atma: 'Yine olsa yine söylerim.'",
            effectText: "Taraftar +25k (Tribün sevdi), Hoca Güveni -15",
            apply: (state) => {
                state.followers += 25000;
                state.hocaGuveni = Math.max(0, state.hocaGuveni - 15);
            }
        },
        optionB: {
            text: "Resmi özür yayınla, konuyu kapat.",
            effectText: "Hoca Güveni +15, Moral -15 (Karizma çizildi)",
            apply: (state) => {
                state.hocaGuveni = Math.min(100, state.hocaGuveni + 15);
                state.moral = Math.max(10, state.moral - 15);
            }
        }
    },
    {
        id: "sponsor_shoe",
        title: "Renkli Krampon Krizi",
        scope: "global",
        description: "Ana sponsorun senin için neon pembe renkte özel bir krampon hazırladı. Ancak hoca sadece klasik siyah krampon giyilmesini istiyor.",
        optionA: {
            text: "Sponsor kramponunu giy and sahaya çık.",
            effectText: "Bütçe +5,000 €, Hoca Güveni -15",
            apply: (state) => {
                state.money += 5000;
                state.hocaGuveni = Math.max(0, state.hocaGuveni - 15);
            }
        },
        optionB: {
            text: "Hocanın sözünü dinle, klasik giy.",
            effectText: "Hoca Güveni +15, Bütçe -2,000 € (Sponsor cezası)",
            apply: (state) => {
                state.hocaGuveni = Math.min(100, state.hocaGuveni + 15);
                state.money = Math.max(0, state.money - 2000);
            }
        }
    },
    {
        id: "extra_weight",
        title: "Tartı Günü Krizi",
        scope: "global",
        description: "${state.hometownDistrict} mantı ve börekleri yüzünden bu hafta tartıda 2.5 kilo fazla çıktın. Hoca durumdan şüpheleniyor.",
        optionA: {
            text: "Ekstra antrenmanla kilo vermeye çalış.",
            effectText: "Kondisyon -20, Moral +10, Hoca Güveni +10",
            apply: (state) => {
                state.kondisyon = Math.max(10, state.kondisyon - 20);
                state.moral = Math.min(100, state.moral + 10);
                state.hocaGuveni = Math.min(100, state.hocaGuveni + 10);
            }
        },
        optionB: {
            text: "Diyeti boşver: 'Ben kas kütlesi kazandım' de.",
            effectText: "Hoca Güveni -20, Moral -10",
            apply: (state) => {
                state.hocaGuveni = Math.max(0, state.hocaGuveni - 20);
                state.moral = Math.max(10, state.moral - 10);
            }
        }
    },
    {
        id: "team_fight",
        title: "İdmanda Tekme Kavgası",
        scope: "global",
        description: "Çift kale maçta takımın tecrübeli stoperi bacağına çok sert bir tekme attı. Hakem faulü çalmadı.",
        optionA: {
            text: "Üzerine yürü ve yakasından tut!",
            effectText: "Moral +15, Hoca Güveni -20, Kondisyon -5",
            apply: (state) => {
                state.moral = Math.min(100, state.moral + 15);
                state.hocaGuveni = Math.max(0, state.hocaGuveni - 20);
                state.kondisyon = Math.max(10, state.kondisyon - 5);
            }
        },
        optionB: {
            text: "Sakin kal, elini sık ve oyuna dön.",
            effectText: "Hoca Güveni +20, Moral +10",
            apply: (state) => {
                state.hocaGuveni = Math.min(100, state.hocaGuveni + 20);
                state.moral = Math.min(100, state.moral + 10);
            }
        }
    },
    {
        id: "late_party",
        title: "Takım Arkadaşının Doğum Günü",
        scope: "global",
        description: "Takım kaptanı seni gece kulübündeki doğum günü partisine çağırdı. Ancak ertesi sabah erken saatte idman var.",
        optionA: {
            text: "Partiye git, sabah 4'e kadar dans et.",
            effectText: "Moral +25, Kondisyon -25, Hoca Güveni -15",
            apply: (state) => {
                state.moral = Math.min(100, state.moral + 25);
                state.kondisyon = Math.max(10, state.kondisyon - 25);
                state.hocaGuveni = Math.max(0, state.hocaGuveni - 15);
            }
        },
        optionB: {
            text: "Kutla ama erkenden evine dön.",
            effectText: "Kondisyon +15, Hoca Güveni +10, Moral -5",
            apply: (state) => {
                state.kondisyon = Math.min(100, state.kondisyon + 15);
                state.hocaGuveni = Math.min(100, state.hocaGuveni + 10);
                state.moral = Math.max(10, state.moral - 5);
            }
        }
    },
    {
        id: "transfer_leak",
        title: "Medya Transfer Asılsız Haberi",
        scope: "global",
        description: "Bir spor kanalı senin gizlice dev kulüplerden biriyle anlaştığını son dakika olarak geçti. Taraftarlar tedirgin.",
        optionA: {
            text: "Anında yalanla: 'Yıldız Gençlikspor benim yuvam.'",
            effectText: "Taraftar +20k, Hoca Güveni +15",
            apply: (state) => {
                state.followers += 20000;
                state.hocaGuveni = Math.min(100, state.hocaGuveni + 15);
            }
        },
        optionB: {
            text: "Sessiz kalıp piyasanın yükselmesini bekle.",
            effectText: "Moral +15, Taraftar -10k",
            apply: (state) => {
                state.moral = Math.min(100, state.moral + 15);
                state.followers = Math.max(0, state.followers - 10000);
            }
        }
    },
    {
        id: "hometown_soccer_school",
        title: "Memlekette Futbol Okulu",
        scope: "global",
        description: "Memleketin ${state.hometownCity} ${state.hometownDistrict} bölgesinde senin adına bir yaz futbol okulu açılması için dernek sponsorluk istiyor (10,000 €).",
        optionA: {
            text: "Sponsor ol, çocukları sevindir.",
            effectText: "Bütçe -10,000 €, Taraftar +30k, Moral +25",
            apply: (state) => {
                state.money = Math.max(0, state.money - 10000);
                state.followers += 30000;
                state.moral = Math.min(100, state.moral + 25);
            }
        },
        optionB: {
            text: "Bütçeyi sarsma, kibarca reddet.",
            effectText: "Moral -5",
            apply: (state) => {
                state.moral = Math.max(10, state.moral - 5);
            }
        }
    },
    {
        id: "superstitious_boots",
        title: "Uğurlu Kramponların Kayıp!",
        scope: "global",
        description: "Malzemeci en çok gol attığın uğurlu kramponlarının kaybolduğunu söyledi. Zihinsel olarak sarsıldın.",
        optionA: {
            text: "Yeni krampon al ve yeni bir uğur edin.",
            effectText: "Bütçe -1,500 €, Moral -10",
            apply: (state) => {
                state.money = Math.max(0, state.money - 1500);
                state.moral = Math.max(10, state.moral - 10);
            }
        },
        optionB: {
            text: "Tüm tesisi ayağa kaldırıp arattır.",
            effectText: "Hoca Güveni -10, Moral -5",
            apply: (state) => {
                state.hocaGuveni = Math.max(0, state.hocaGuveni - 10);
                state.moral = Math.max(10, state.moral - 5);
            }
        }
    },
    {
        id: "tactical_dilemma",
        title: "Yeni Pozisyon Denemesi",
        scope: "global",
        description: "Hoca seni bu haftaki idmanda orta sahada denemek istiyor. Pozisyonun değişirse hücum sayıların düşebilir ama hoca çok hevesli.",
        optionA: {
            text: "Kabul et: 'Ben takımın jokeriyim.'",
            effectText: "Hoca Güveni +25, Moral +10, Passing +2",
            apply: (state) => {
                state.hocaGuveni = Math.min(100, state.hocaGuveni + 25);
                state.moral = Math.min(100, state.moral + 10);
                state.passing += 2;
            }
        },
        optionB: {
            text: "Reddet: 'Ben sadece forvette oynarım.'",
            effectText: "Hoca Güveni -15, Shooting +1",
            apply: (state) => {
                state.hocaGuveni = Math.max(0, state.hocaGuveni - 15);
                state.shooting += 1;
            }
        }
    },
    {
        id: "energy_drink",
        title: "Enerji İçeceği Sponsorluğu",
        scope: "global",
        description: "Enerji içeceği firması yıllık 25,000 € sponsorluk teklif etti. Ancak içeceklerin asit oranı diyetisyenini kızdıracak.",
        optionA: {
            text: "Sözleşmeyi imzala, parayı al.",
            effectText: "Bütçe +25,000 €, Kondisyon -15 (Kötü beslenme)",
            apply: (state) => {
                state.money += 25000;
                state.kondisyon = Math.max(10, state.kondisyon - 15);
            }
        },
        optionB: {
            text: "Reddet: 'Vücuduma zararlı madde sokmam.'",
            effectText: "Kondisyon +15, Hoca Güveni +15",
            apply: (state) => {
                state.kondisyon = Math.min(100, state.kondisyon + 15);
                state.hocaGuveni = Math.min(100, state.hocaGuveni + 15);
            }
        }
    },
    {
        id: "social_charity",
        title: "Yardım Kampanyası Ziyareti",
        scope: "global",
        description: "${state.hometownCity} Engelliler Derneği yararına düzenlenecek bir açık artırmaya imzalı formanı bağışlaman isteniyor.",
        optionA: {
            text: "Formanı gönder ve bağışta bulun.",
            effectText: "Bütçe -3,000 €, Taraftar +25k, Moral +20",
            apply: (state) => {
                state.money = Math.max(0, state.money - 3000);
                state.followers += 25000;
                state.moral = Math.min(100, state.moral + 20);
            }
        },
        optionB: {
            text: "Sadece imzalı forma gönder, para bağışı yapma.",
            effectText: "Taraftar +10k, Moral +5",
            apply: (state) => {
                state.followers += 10000;
                state.moral = Math.min(100, state.moral + 5);
            }
        }
    },
    {
        id: "derby_bet",
        title: "Sosyal Medya İddiası",
        scope: "global",
        description: "Rakip takımdaki forvet oyuncusu Twitter'dan sana meydan okudu: 'Ahmet Eren bu hafta gol atamaz, bahse varım!'",
        optionA: {
            text: "Bahsi kabul et ve meydan oku.",
            effectText: "Moral +20, Taraftar +15k, Hoca Güveni -5",
            apply: (state) => {
                state.moral = Math.min(100, state.moral + 20);
                state.followers += 15000;
                state.hocaGuveni = Math.max(0, state.hocaGuveni - 5);
            }
        },
        optionB: {
            text: "Sessiz kal, cevabı sahada vereceğini söyle.",
            effectText: "Hoca Güveni +15, Moral +10",
            apply: (state) => {
                state.hocaGuveni = Math.min(100, state.hocaGuveni + 15);
                state.moral = Math.min(100, state.moral + 10);
            }
        }
    },
    {
        id: "fan_criticism",
        title: "Trollerin Hedefindesin",
        scope: "global",
        description: "Sosyal medyada organize bir trol grubu senin son maçlardaki performansını diline doladı ve dalga geçen videolar hazırladı.",
        optionA: {
            text: "İnternete girip hepsiyle tek tek tartış.",
            effectText: "Moral -20, Hoca Güveni -10, Taraftar +5k",
            apply: (state) => {
                state.moral = Math.max(10, state.moral - 20);
                state.hocaGuveni = Math.max(0, state.hocaGuveni - 10);
                state.followers += 5000;
            }
        },
        optionB: {
            text: "Telefonu kapat, akşam ekstra idman yap.",
            effectText: "Kondisyon -10, Hoca Güveni +20, Speed +1",
            apply: (state) => {
                state.kondisyon = Math.max(10, state.kondisyon - 10);
                state.hocaGuveni = Math.min(100, state.hocaGuveni + 20);
                state.speed += 1;
            }
        }
    },
    {
        id: "old_coach_call",
        title: "Altyapı Hocanın Telefonu",
        scope: "global",
        description: "${state.hometownCity}'deki altyapı kulübünde seni keşfeden ilk hocan aradı. Kulübün borçları için destek istiyor (5,000 €).",
        optionA: {
            text: "Hocana parayı gönder: 'Sizin hakkınız ödenmez.'",
            effectText: "Bütçe -5,000 €, Moral +30, Hoca Güveni +10",
            apply: (state) => {
                state.money = Math.max(0, state.money - 5000);
                state.moral = Math.min(100, state.moral + 30);
                state.hocaGuveni = Math.min(100, state.hocaGuveni + 10);
            }
        },
        optionB: {
            text: "Durumum şu an müsait değil de.",
            effectText: "Moral -10",
            apply: (state) => {
                state.moral = Math.max(10, state.moral - 10);
            }
        }
    },
    {
        id: "injury_scare",
        title: "Bilek Burkulması Korkusu",
        scope: "global",
        description: "Hafta ortası idmanında bileğin hafifçe döndü. Doktor maça iğneyle çıkabileceğini ama risk olduğunu söyledi.",
        optionA: {
            text: "İğne yaptır ve ne olursa olsun oyna.",
            effectText: "Moral +15, Kondisyon -20, Hoca Güveni +15",
            apply: (state) => {
                state.moral = Math.min(100, state.moral + 15);
                state.kondisyon = Math.max(10, state.kondisyon - 20);
                state.hocaGuveni = Math.min(100, state.hocaGuveni + 15);
            }
        },
        optionB: {
            text: "Riske girme, bu hafta dinlenmeyi talep et.",
            effectText: "Kondisyon +25, Hoca Güveni -10",
            apply: (state) => {
                state.kondisyon = Math.min(100, state.kondisyon + 25);
                state.hocaGuveni = Math.max(0, state.hocaGuveni - 10);
            }
        }
    },
    {
        id: "team_speech",
        title: "Soyunma Odası Konuşması",
        scope: "global",
        description: "Hocanın ses kısıklığı sebebiyle, derbi öncesi soyunma odasında takımı motive edecek konuşmayı kaptan senin yapmanı istedi.",
        optionA: {
            text: "Ateşli ve bağıra çağıra bir konuşma yap.",
            effectText: "Moral +20, Hoca Güveni +15",
            apply: (state) => {
                state.moral = Math.min(100, state.moral + 20);
                state.hocaGuveni = Math.min(100, state.hocaGuveni + 15);
            }
        },
        optionB: {
            text: "Sakin ve taktik ağırlıklı konuş.",
            effectText: "Passing +1, Hoca Güveni +10",
            apply: (state) => {
                state.passing += 1;
                state.hocaGuveni = Math.min(100, state.hocaGuveni + 10);
            }
        }
    },
    {
        id: "family_visit",
        title: "Aile Ziyareti Sürprizi",
        scope: "global",
        description: "Ailen memleketten (${state.hometownCity} ${state.hometownDistrict}) habersizce çıkıp tesislerin kapısına geldi. Büyük bir özlem var.",
        optionA: {
            text: "Tesislerden izin alıp akşamı ailenle geçir.",
            effectText: "Moral +30, Kondisyon -5 (Geç yemek)",
            apply: (state) => {
                state.moral = Math.min(100, state.moral + 30);
                state.kondisyon = Math.max(10, state.kondisyon - 5);
            }
        },
        optionB: {
            text: "Kamptan ayrılma, onları otelde ziyaret et.",
            effectText: "Hoca Güveni +15, Moral +15",
            apply: (state) => {
                state.hocaGuveni = Math.min(100, state.hocaGuveni + 15);
                state.moral = Math.min(100, state.moral + 15);
            }
        }
    },
    {
        id: "press_conference_joke",
        title: "Muhabire Espri Yanıt",
        scope: "global",
        description: "Basın toplantısında bir muhabir saçma bir soru sordu. Lafı gediğine koyan bir espri patlattın.",
        optionA: {
            text: "Espriyi devam ettir, muhabirle şakalaş.",
            effectText: "Taraftar +20k (Viral oldu), Hoca Güveni -5",
            apply: (state) => {
                state.followers += 20000;
                state.hocaGuveni = Math.max(0, state.hocaGuveni - 5);
            }
        },
        optionB: {
            text: "Hemen ciddileşip soruya profesyonel yanıt ver.",
            effectText: "Hoca Güveni +15, Moral +5",
            apply: (state) => {
                state.hocaGuveni = Math.min(100, state.hocaGuveni + 15);
                state.moral = Math.min(100, state.moral + 5);
            }
        }
    },
    // --- 15 MORE SCENARIOS (Total: 50) ---
    {
        id: "golden_boot_race",
        title: "Gol Krallığı Yarışı",
        scope: "global",
        description: "Senden 2 gol önde olan rakip forvet basın toplantısında: 'Gol krallığı zaten bende, o çocuk beni yakalayamaz' dedi. Medya sana sordu.",
        optionA: {
            text: "Ateşle karşılık ver: 'Maç bitmeden konuşma!'",
            effectText: "Moral +20, Taraftar +15k, Hoca Güveni -5",
            apply: (state) => {
                state.moral = Math.min(100, state.moral + 20);
                state.followers += 15000;
                state.hocaGuveni = Math.max(0, state.hocaGuveni - 5);
            }
        },
        optionB: {
            text: "Alçakgönüllü kal: 'O harika bir oyuncu, takdir ediyorum.'",
            effectText: "Hoca Güveni +20, Moral +10, Taraftar +5k",
            apply: (state) => {
                state.hocaGuveni = Math.min(100, state.hocaGuveni + 20);
                state.moral = Math.min(100, state.moral + 10);
                state.followers += 5000;
            }
        }
    },
    {
        id: "doping_rumor",
        title: "Doping İddiası Manşette",
        scope: "global",
        description: "Sarı gazetecilik yapan bir site, son performans artışının ardından seni doping kullanmakla suçlayan asılsız bir haber yayınladı.",
        optionA: {
            text: "Avukat tut ve gazeteye dava aç.",
            effectText: "Bütçe -5,000 € (Avukat), Taraftar +20k (Haklılık), Moral +15",
            apply: (state) => {
                state.money = Math.max(0, state.money - 5000);
                state.followers += 20000;
                state.moral = Math.min(100, state.moral + 15);
            }
        },
        optionB: {
            text: "Gönüllü doping testine gir, temizliğini kanıtla.",
            effectText: "Hoca Güveni +25, Taraftar +10k, Moral +10",
            apply: (state) => {
                state.hocaGuveni = Math.min(100, state.hocaGuveni + 25);
                state.followers += 10000;
                state.moral = Math.min(100, state.moral + 10);
            }
        }
    },
    {
        id: "young_talent",
        title: "Genç Yıldızı Keşfettin",
        scope: "global",
        description: "${state.hometownCity}'den gelen 15 yaşında harika bir çocuk. Menajerin senin tavsiyenle takımın altyapısına alınmasını istiyor.",
        optionA: {
            text: "Çocuğu hocaya tavsiye et ve sahip çık.",
            effectText: "Hoca Güveni +15, Moral +20, Taraftar +8k",
            apply: (state) => {
                state.hocaGuveni = Math.min(100, state.hocaGuveni + 15);
                state.moral = Math.min(100, state.moral + 20);
                state.followers += 8000;
            }
        },
        optionB: {
            text: "Rakibin ilgilendiğini duydum, karışma.",
            effectText: "Moral -10",
            apply: (state) => {
                state.moral = Math.max(10, state.moral - 10);
            }
        }
    },
    {
        id: "comeback_after_injury",
        title: "Sakatlanma Sonrası İlk Maç",
        scope: "global",
        description: "6 haftalık sakatlığın ardından ilk kez sahaya çıkıyorsun. Doktor 45 dakika sınırı koydu ama takım şu an 1-0 yeniliyor ve sen formdasın.",
        optionA: {
            text: "Doktorun sınırını zorla, 90 dakika oyna.",
            effectText: "Kondisyon -20, Shooting +2, Moral +15",
            apply: (state) => {
                state.kondisyon = Math.max(10, state.kondisyon - 20);
                state.shooting += 2;
                state.moral = Math.min(100, state.moral + 15);
            }
        },
        optionB: {
            text: "45 dakikada çık, sağlığını riske atma.",
            effectText: "Kondisyon +20, Hoca Güveni +10",
            apply: (state) => {
                state.kondisyon = Math.min(100, state.kondisyon + 20);
                state.hocaGuveni = Math.min(100, state.hocaGuveni + 10);
            }
        }
    },
    {
        id: "television_docu",
        title: "Belgesel Teklifi",
        scope: "global",
        description: "Ünlü bir yapımcı, ${state.hometownCity}'den bugünlere uzanan yolculuğunu anlatan bir belgesel çekmek istiyor. Kamera ekibi 2 hafta peşini bırakmayacak.",
        optionA: {
            text: "Kabul et, hikayeni dünyaya anlat.",
            effectText: "Taraftar +40k, Bütçe +30,000 €, Kondisyon -10 (Yoğun program)",
            apply: (state) => {
                state.followers += 40000;
                state.money += 30000;
                state.kondisyon = Math.max(10, state.kondisyon - 10);
            }
        },
        optionB: {
            text: "Reddet, özel hayatını koru.",
            effectText: "Kondisyon +10, Hoca Güveni +10",
            apply: (state) => {
                state.kondisyon = Math.min(100, state.kondisyon + 10);
                state.hocaGuveni = Math.min(100, state.hocaGuveni + 10);
            }
        }
    },
    {
        id: "locker_room_leader",
        title: "Soyunma Odası Lideri Krizi",
        scope: "global",
        description: "Takımın tecrübeli kaptanı, senin hızla yükselmenden rahatsız olduğunu ima eden açıklamalar yaptı. Hoca ortada sıkışmış durumda.",
        optionA: {
            text: "Kaptan ile yüz yüze konuş, sorunu çöz.",
            effectText: "Hoca Güveni +20, Moral +15",
            apply: (state) => {
                state.hocaGuveni = Math.min(100, state.hocaGuveni + 20);
                state.moral = Math.min(100, state.moral + 15);
            }
        },
        optionB: {
            text: "Basına ver, kamuoyu baskısıyla sustur.",
            effectText: "Taraftar +15k, Hoca Güveni -15, Moral +10",
            apply: (state) => {
                state.followers += 15000;
                state.hocaGuveni = Math.max(0, state.hocaGuveni - 15);
                state.moral = Math.min(100, state.moral + 10);
            }
        }
    },
    {
        id: "ramadan_diet",
        title: "Ramazan Orucu ve Maç Performansı",
        scope: "global",
        description: "Ramazan ayında oruç tutuyorsun ama akşamüzeri kritik bir maçın var. Kulüp diyetisyeni seni özel beslenme programına almak istiyor.",
        optionA: {
            text: "Diyetisyenin programını kabul et.",
            effectText: "Kondisyon +15, Hoca Güveni +10",
            apply: (state) => {
                state.kondisyon = Math.min(100, state.kondisyon + 15);
                state.hocaGuveni = Math.min(100, state.hocaGuveni + 10);
            }
        },
        optionB: {
            text: "Oruçlu oynayacaksın, inancında kararlısın.",
            effectText: "Moral +25, Kondisyon -10, Taraftar +10k",
            apply: (state) => {
                state.moral = Math.min(100, state.moral + 25);
                state.kondisyon = Math.max(10, state.kondisyon - 10);
                state.followers += 10000;
            }
        }
    },
    {
        id: "free_kick_specialist",
        title: "Frikik Uzmanı Antrenmanı",
        scope: "global",
        description: "Dünyaca ünlü bir frikik antrenörü, özel bir haftalık kamp için seni Portekiz'e davet etti. Masraflar sana ait (8,000 €).",
        optionA: {
            text: "Gider ve frikik tekniğini geliştir.",
            effectText: "Bütçe -8,000 €, Shooting +3, Passing +1",
            apply: (state) => {
                state.money = Math.max(0, state.money - 8000);
                state.shooting += 3;
                state.passing += 1;
            }
        },
        optionB: {
            text: "Tesiste mevcut antrenörlerle çalış.",
            effectText: "Bütçe sağlam, Shooting +1",
            apply: (state) => {
                state.shooting += 1;
            }
        }
    },
    {
        id: "weather_cancel",
        title: "Tipi Fırtınasında Maç İptali",
        scope: "global",
        description: "Kuzey deplasmanında kar fırtınası maçı iptal ettirdi. Takım 2 gün otelde mahsur kaldı. Ekstra zaman nasıl değerlendirirsin?",
        optionA: {
            text: "Takım arkadaşlarıyla kart oyunu ve film gecesi.",
            effectText: "Moral +20, Kondisyon +5 (Dinlenme)",
            apply: (state) => {
                state.moral = Math.min(100, state.moral + 20);
                state.kondisyon = Math.min(100, state.kondisyon + 5);
            }
        },
        optionB: {
            text: "Otelin spor salonunda solo antrenman yap.",
            effectText: "Kondisyon +20, Speed +1, Moral -5",
            apply: (state) => {
                state.kondisyon = Math.min(100, state.kondisyon + 20);
                state.speed += 1;
                state.moral = Math.max(10, state.moral - 5);
            }
        }
    },
    {
        id: "former_club_match",
        title: "Eski Kulübe Karşı",
        scope: "global",
        description: "Bu hafta eski kulübüne karşı oynuyorsun. Eski taraftarlar seni ıslıklarla karşılayacak ama sen onlara gol atmak istiyorsun.",
        optionA: {
            text: "Gol atarsan sevinç yaşama, saygı göster.",
            effectText: "Hoca Güveni +15, Taraftar +10k (Çift taraf)",
            apply: (state) => {
                state.hocaGuveni = Math.min(100, state.hocaGuveni + 15);
                state.followers += 10000;
            }
        },
        optionB: {
            text: "Gol atarsan coşkuyu patlat, tribünlere bak!",
            effectText: "Moral +25, Taraftar -8k (Eski taraftarlar kızdı)",
            apply: (state) => {
                state.moral = Math.min(100, state.moral + 25);
                state.followers = Math.max(0, state.followers - 8000);
            }
        }
    },
    {
        id: "pilates_yoga",
        title: "Pilates & Yoga Teklifi",
        scope: "global",
        description: "Kulübün yeni kondisyon antrenörü, sakatlanma riskini azaltmak için haftalık yoga ve pilates programına başlamanı istiyor.",
        optionA: {
            text: "Programa katıl, esnekliğini artır.",
            effectText: "Kondisyon +15, Speed +1, Moral -5 (Sıkıcı)",
            apply: (state) => {
                state.kondisyon = Math.min(100, state.kondisyon + 15);
                state.speed += 1;
                state.moral = Math.max(10, state.moral - 5);
            }
        },
        optionB: {
            text: "Reddet: 'Ben futbolcu değil jimnastikçi değilim.'",
            effectText: "Moral +10, Hoca Güveni -10",
            apply: (state) => {
                state.moral = Math.min(100, state.moral + 10);
                state.hocaGuveni = Math.max(0, state.hocaGuveni - 10);
            }
        }
    },
    {
        id: "midnight_snack",
        title: "Gece Yarısı Çıkma Tuzağı",
        scope: "global",
        description: "Yarın maç var ama iki takım arkadaşın seni kamp otelin yakınındaki meşhur dönerci için gece 00:30'da çıkmaya ikna etmeye çalışıyor.",
        optionA: {
            text: "Gidip bir döner iç, keyif kaçmasın.",
            effectText: "Moral +15, Kondisyon -15, Hoca Güveni -10",
            apply: (state) => {
                state.moral = Math.min(100, state.moral + 15);
                state.kondisyon = Math.max(10, state.kondisyon - 15);
                state.hocaGuveni = Math.max(0, state.hocaGuveni - 10);
            }
        },
        optionB: {
            text: "Hayır de, odanda kuru yemiş ye.",
            effectText: "Kondisyon +10, Hoca Güveni +10",
            apply: (state) => {
                state.kondisyon = Math.min(100, state.kondisyon + 10);
                state.hocaGuveni = Math.min(100, state.hocaGuveni + 10);
            }
        }
    },
    {
        id: "scout_watching",
        title: "Dev Kulübün Scouti Tribünde!",
        scope: "global",
        description: "Menajerin haber verdi: Bugünkü maçı Real Madrid / Manchester City / Bayern München scoutu izlemeye geliyor. Baskı altındasın.",
        optionA: {
            text: "Normal oyna, kendin ol. Baskıya kapılma.",
            effectText: "Hoca Güveni +10, Moral +10, Passing +1",
            apply: (state) => {
                state.hocaGuveni = Math.min(100, state.hocaGuveni + 10);
                state.moral = Math.min(100, state.moral + 10);
                state.passing += 1;
            }
        },
        optionB: {
            text: "Her pozisyonda şov yap, dikkat çek!",
            effectText: "Shooting +2, Moral +15, Kondisyon -10 (Fazla koştun)",
            apply: (state) => {
                state.shooting += 2;
                state.moral = Math.min(100, state.moral + 15);
                state.kondisyon = Math.max(10, state.kondisyon - 10);
            }
        }
    },
    {
        id: "hometown_match",
        title: "Memleket Maçı",
        scope: "global",
        description: "Tesadüfen kupa maçın ${state.hometownCity}'de oynandı. Bütün aile ve mahalle tribünde. Baskı inanılmaz!",
        optionA: {
            text: "Ailene gol armağan et, sahada uç!",
            effectText: "Moral +30, Taraftar +20k, Kondisyon -10 (Aşırı motivasyon)",
            apply: (state) => {
                state.moral = Math.min(100, state.moral + 30);
                state.followers += 20000;
                state.kondisyon = Math.max(10, state.kondisyon - 10);
            }
        },
        optionB: {
            text: "Sakin kal, taktik oyunu uygula.",
            effectText: "Hoca Güveni +15, Passing +1, Moral +10",
            apply: (state) => {
                state.hocaGuveni = Math.min(100, state.hocaGuveni + 15);
                state.passing += 1;
                state.moral = Math.min(100, state.moral + 10);
            }
        }
    },
    {
        id: "diet_bet",
        title: "Takım Bahsi: Şeker mi Kondisyon mu?",
        scope: "global",
        description: "Kaleci takım arkadaşın 'Bir ay şeker yemezsen sana 500 € veririm!' diye bahse girdi. Sezon ortasındasın.",
        optionA: {
            text: "Bahsi kabul et! 500 € güzel para.",
            effectText: "Kondisyon +10, Moral +15, Bütçe +500 €",
            apply: (state) => {
                state.kondisyon = Math.min(100, state.kondisyon + 10);
                state.moral = Math.min(100, state.moral + 15);
                state.money += 500;
            }
        },
        optionB: {
            text: "Reddet: 'Benim için şeker olmazsa olmaz.'",
            effectText: "Moral -5, Kondisyon -5",
            apply: (state) => {
                state.moral = Math.max(10, state.moral - 5);
                state.kondisyon = Math.max(10, state.kondisyon - 5);
            }
        }
    }
];

if (typeof module !== "undefined" && module.exports) {
    module.exports = RANDOM_EVENTS;
}
