/**
 * Futbol Atlası: Kariyer Efsanesi - Random Events Module
 * Contains the 10 core text scenarios and their database modifiers.
 */

const RANDOM_EVENTS = [
    {
        id: "derby_stream",
        title: "Derbi Öncesi Canlı Yayın Daveti",
        scope: "Süper Lig",
        description: "Derbi öncesi, Türkiye'nin en popüler futbol yayıncısı seni yayınına konuk etmek istiyor. Yayın gece yarısı bitecek ve büyük ilgi toplayacak.",
        optionA: {
            text: "Yayına katıl ve taraftarla dertleş.",
            effectText: "Taraftar +20, Moral +15, Kondisyon -15",
            apply: (state) => {
                state.followers += 15000;
                state.moral = Math.min(100, state.moral + 15);
                state.kondisyon = Math.max(0, state.kondisyon - 15);
            }
        },
        optionB: {
            text: "Teklifi reddet, erkenden uyu.",
            effectText: "Kondisyon +15, Hoca Güveni +10, Taraftar -5",
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
            effectText: "Moral +25, Taraftar +15, Kondisyon -10 (Sert maç)",
            apply: (state) => {
                state.moral = Math.min(100, state.moral + 25);
                state.followers += 8000;
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
            effectText: "Hoca Güveni +25, Moral -15, Taraftar -10",
            apply: (state) => {
                state.hocaGuveni = Math.min(100, state.hocaGuveni + 25);
                state.moral = Math.max(0, state.moral - 15);
                state.followers = Math.max(0, state.followers - 3000);
            }
        },
        optionB: {
            text: "İnisiyatif alıp fırsat buldukça atağa katıl.",
            effectText: "Moral +20, Taraftar +15, Hoca Güveni -20",
            apply: (state) => {
                state.moral = Math.min(100, state.moral + 20);
                state.followers += 5000;
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
            effectText: "Bütçe +15,000 €, Taraftar +10, Hoca Güveni -30",
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
        description: "Bundesliga taraftar birliği seni bir pub'da buluşmaya davet etti. Sosisli ve bira eşliğinde samimi bir gece planlıyorlar.",
        optionA: {
            text: "Davete katıl, taraftarla sosyalleş.",
            effectText: "Taraftar +30, Moral +15, Kondisyon -10",
            apply: (state) => {
                state.followers += 25000;
                state.moral = Math.min(100, state.moral + 15);
                state.kondisyon = Math.max(0, state.kondisyon - 10);
            }
        },
        optionB: {
            text: "Kişisel diyetine ve uykuna sadık kal, katılma.",
            effectText: "Kondisyon +20, Taraftar -15",
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
            effectText: "Taraftar +25, Bütçe +10,000 €, Kondisyon -15, Hoca -15",
            apply: (state) => {
                state.followers += 20000;
                state.money += 10000;
                state.kondisyon = Math.max(0, state.kondisyon - 15);
                state.hocaGuveni = Math.max(0, state.hocaGuveni - 15);
            }
        },
        optionB: {
            text: "Teklifi reddet, maça odaklan.",
            effectText: "Kondisyon +15, Hoca Güveni +15, Taraftar -5",
            apply: (state) => {
                state.kondisyon = Math.min(100, state.kondisyon + 15);
                state.hocaGuveni = Math.min(100, state.hocaGuveni + 15);
                state.followers = Math.max(0, state.followers - 2000);
            }
        }
    },
    {
        id: "kebap_day",
        title: "Kulüpte Kebap Günü",
        scope: "Süper Lig",
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
            effectText: "Taraftar +25, Hoca Güveni +10, Moral -15 (Menajer krizi)",
            apply: (state) => {
                state.followers += 15000;
                state.hocaGuveni = Math.min(100, state.hocaGuveni + 10);
                state.moral = Math.max(0, state.moral - 15);
            }
        },
        optionB: {
            text: "Görüşmeyi inkar etme, sessiz kal.",
            effectText: "Taraftar -30 (Hain ilan edildin), Moral +15",
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
            effectText: "Taraftar +35, Moral -15 (Takım seni dışladı)",
            apply: (state) => {
                state.followers += 30000;
                state.moral = Math.max(0, state.moral - 15);
            }
        }
    },
    {
        id: "final_insomnia",
        title: "Dev Final Öncesi Havai Fişek Krizi",
        scope: "global",
        description: "Kupa finali öncesi otelinizin önünde rakip taraftarlar sabaha kadar havai fişek atarak gürültü yapıyor.",
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
    }
];

if (typeof module !== "undefined" && module.exports) {
    module.exports = RANDOM_EVENTS;
}
