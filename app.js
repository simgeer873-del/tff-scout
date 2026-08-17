
const D=window.DATA||{};
const navGroups=[
["MİLLİ TAKIMLAR",[["milli-takimlar","◉","Milli Takımlar"],["karmalar","♧","Karmalar"],["rakipler","♧","Rakipler"]]],
["OYUNCU & KULÜP",[["futbolcu-ara","⌕","Futbolcu Ara"],["futbolcularim","♙","Futbolcularım"],["populer","☆","Popüler Oyuncular"],["kulupler","▣","Kulüpler"]]],
["ANALİZ & RAPORLAR",[["video","▣","Maç & Video Analiz"],["istatistik","▥","İstatistikler"],["raporlar","▤","Oyuncu Raporları"],["videolar","◉","Güncel Videolar"],["esame","▤","Esame Raporu"],["mac-raporlari","▤","Maç Raporları"],["gelisim-raporlari","▤","Gelişim Ligi Raporları"]]],
["GELİŞİM",[["antrenman","≋","Antrenman Planları"],["kulup-gelisim","◍","Kulüp Gelişim"],["eslestirme","◎","Oyuncu Eşleştirme"],["teknik","⚒","Teknik Testler"],["sakatlik","♧","Sakatlıklar"]]],
["YÖNETİM",[["scout","♙","Scout Profilleri"],["yetenek","✪","Yetenek Başvuruları"],["dokuman","▤","Doküman Yönetimi"],["izleyici","♧","İzleyici Atama"],["kullanici","♧","Kullanıcı Yönetimi"],["mesaj","✉","Mesajlar"]]]
];
let S={
 route:sessionStorage.getItem("tff-demo-auth")==="1"?(location.hash.replace("#/","")||"home"):"login",
 theme:localStorage.getItem("tff-theme")||"dark",
 lang:localStorage.getItem("tff-language")==="en"?"en":"tr",
 teamTab:"overview",
 sidebarCollapsed:localStorage.getItem("tff-sidebar-collapsed")==="1",
 openMenuGroup:localStorage.getItem("tff-sidebar-group")||"ANALİZ & RAPORLAR",profileMenu:false,
 squadFilter:"Tümü",expandedSquadPlayer:"",
 karmaCategory:"Tümü",karmaView:"grid",activeKarma:"trendyol-1",karmaTab:"overview",
 karmaVideoFiles:[],
 playerFilters:{country:"Türkiye",league:"Tümü",season:"2025/2026",position:"Merkez Orta Saha",ageMin:18,ageMax:23,foot:"Sağ",category:"Tümü"},
 playerFiltersApplied:false,
 playerAgeChip:true,
 selectedPlayers:[0,1],
 activePlayer:0,playerSort:"score-desc",compareTab:"skills",reportModal:false
};
document.body.classList.toggle("light",S.theme==="light");

const EN_TEXT={
 "MİLLİ TAKIMLAR":"NATIONAL TEAMS","Milli Takımlar":"National Teams","Milli Takım":"National Team","A Milli Takım":"Türkiye Senior National Team","Erkek Milli Takım":"Men's National Team","Kadın Milli Takım":"Women's National Team","Kadınlar A Milli":"Women's Senior National Team","Futsal Milli":"Futsal National Team","Plaj Milli":"Beach Soccer National Team","Plaj Futbolu":"Beach Soccer","Karmalar":"Representative Teams","Rakipler":"Opponents",
 "OYUNCU & KULÜP":"PLAYER & CLUB","Oyuncu & Kulüp":"Player & Club","Futbolcu Ara":"Player Search","Futbolcularım":"My Players","Popüler Oyuncular":"Popular Players","Kulüpler":"Clubs",
 "ANALİZ & RAPORLAR":"ANALYSIS & REPORTS","Analiz & Raporlar":"Analysis & Reports","Maç & Video Analiz":"Match & Video Analysis","İstatistikler":"Statistics","Oyuncu Raporları":"Player Reports","Güncel Videolar":"Latest Videos","Esame Raporu":"Team Sheet Report","Maç Raporları":"Match Reports","Gelişim Ligi Raporları":"Development League Reports",
 "GELİŞİM":"DEVELOPMENT","Gelişim":"Development","Antrenman Planları":"Training Plans","Kulüp Gelişim":"Club Development","Oyuncu Eşleştirme":"Player Matching","Teknik Testler":"Technical Tests","Sakatlıklar":"Injuries",
 "YÖNETİM":"MANAGEMENT","Yönetim":"Management","Scout Profilleri":"Scout Profiles","Yetenek Başvuruları":"Talent Applications","Doküman Yönetimi":"Document Management","İzleyici Atama":"Observer Assignment","Kullanıcı Yönetimi":"User Management","Mesajlar":"Messages","Ana Sayfa":"Home","Menüyü Daralt":"Collapse Menu","Menüyü Genişlet":"Expand Menu","Çok Bulutlu":"Mostly Cloudy",
 "Profilim":"My Profile","Ayarlar":"Settings","Çıkış Yap":"Log Out","Profil menüsünü aç":"Open profile menu","Temayı değiştir":"Change theme","Bildirimler":"Notifications","Oyuncuların yerini değiştir":"Swap players",
 "Türkiye Futbol Federasyonu":"Turkish Football Federation","Scout ve Analiz Sistemi":"Scout and Analysis System","Video Analiz ve Gözlem Sistemi":"Video Analysis and Scouting System","VİDEO ANALİZ VE GÖZLEM SİSTEMİ":"VIDEO ANALYSIS AND SCOUTING SYSTEM",
 "Hoş Geldiniz":"Welcome","Hoş Geldiniz, Simge Er":"Welcome, Simge Er","Sisteme giriş yapmak için kullanıcı bilgilerinizi giriniz.":"Enter your credentials to sign in.","Kullanıcı adı":"Username","Şifre":"Password","Beni Hatırla":"Remember Me","Şifremi Unuttum?":"Forgot Password?","GİRİŞ YAP":"SIGN IN","veya":"or","Demo Giriş":"Demo Login","Tüm hakları saklıdır.":"All rights reserved.",
 "Hızlı Erişim":"Quick Access","Son Videolar":"Latest Videos","Tümünü Gör":"View All","Tümünü Gör ›":"View All ›","Genel İstatistikler":"General Statistics","İzlenen Maç":"Matches Watched","İzlenen Oyuncu":"Players Watched","Oluşturulan Rapor":"Reports Created","Yetenek Başvurusu":"Talent Application","Bu Ay⌄":"This Month ⌄","Yaklaşan Maçlar":"Upcoming Matches","Hızlı İşlemler":"Quick Actions","Maç Analizine Başla":"Start Match Analysis","Oyuncu Ara":"Search Player","Yeni Rapor Oluştur":"Create New Report",
 "Dünya Kupası Elemeleri":"World Cup Qualifiers","Hazırlık Maçı":"Friendly Match","UEFA Nations League":"UEFA Nations League","A Milli Antrenman Özeti":"Senior Team Training Highlights","Antalya Kampı":"Antalya Camp","Dün":"Yesterday","İspanya":"Spain","İtalya":"Italy","Macaristan":"Hungary","Portekiz":"Portugal","ABD":"USA",
 "Genel Bakış":"Overview","Kadro":"Squad","Maçlar":"Matches","Videolar":"Videos","Raporlar":"Reports","Takım Profili":"Team Profile","Son Maç":"Last Match","Sıradaki Maç":"Next Match","Maç Detayları":"Match Details","Takım Bilgileri":"Team Information","Kuruluş":"Founded","Teknik Direktör":"Head Coach","Kaptan":"Captain","FIFA Sıralaması":"FIFA Ranking","UEFA Sıralaması":"UEFA Ranking","Renkler":"Colours","Kadro Özeti":"Squad Summary","Kaleciler":"Goalkeepers","Defans":"Defenders","Orta Saha":"Midfielders","Forvet":"Forwards","Tüm Kadroyu Gör":"View Full Squad","Son Maç Performans Özeti":"Last Match Performance Summary","Performans Özeti":"Performance Summary","Topla Oynama":"Possession","İsabetli Şut":"Shots on Target","Pas Başarı":"Pass Accuracy","İkili Mücadele":"Duels","Korner":"Corners","Faul":"Fouls","Sarı / Kırmızı":"Yellow / Red","Teknik Ekip":"Technical Staff","Yardımcı Antrenör":"Assistant Coach","Kaleci Antrenörü":"Goalkeeping Coach","Tüm Teknik Ekibi Gör":"View Full Staff","Son Maçlar":"Recent Matches","Tüm Maçları Gör":"View All Matches","Video Yükle":"Upload Video","Form":"Form","Oyuncu":"Players","G":"W","B":"D","M":"L",
 "Tümü":"All","Kaleci":"Goalkeeper","Stoper":"Centre Back","Bek":"Full Back","Kanat":"Winger","Santrafor":"Striker","POZİSYON":"POSITION","DOĞUM TARİHİ":"DATE OF BIRTH","KULÜP":"CLUB","BOY / KİLO":"HEIGHT / WEIGHT","MAÇ":"MATCHES","GOL":"GOALS","DURUM":"STATUS","Aktif":"Active","Oyuncu ara...":"Search player...","Oyuncu havuzu":"Player pool","Millî Maç":"International Caps","Detayları göster":"Show details","Detayları gizle":"Hide details","Doğum Tarihi":"Date of Birth","Boy / Kilo":"Height / Weight","Oyuncu bulunamadı":"No players found","Sonuçlar ve yaklaşan karşılaşmalar":"Results and upcoming fixtures","Maç Özeti":"Match Summary","Oynanan":"Played","Galibiyet":"Wins","Beraberlik":"Draws","Mağlubiyet":"Losses","Atılan Gol":"Goals For","Yenilen Gol":"Goals Against","Tamamlandı":"Completed","Yaklaşan":"Upcoming","Maç Detayı":"Match Details","Maç, antrenman ve analiz videoları":"Match, training and analysis videos","Analiz":"Analysis","Antrenman":"Training",
 "Topa Sahip Olma":"Possession","Maç Başına Şut":"Shots per Match","Pas Başarısı":"Pass Accuracy","Maç Başına Gol":"Goals per Match","Gol Yeme":"Goals Conceded","Performans Karşılaştırması":"Performance Comparison","Hücum":"Attack","Savunma":"Defence","Pas Oyunu":"Passing Game","Geçiş Hücumu":"Transition Attack","Duran Top":"Set Pieces","Pres":"Pressing","Son 5 Maç Formu":"Last 5 Match Form","Galibiyet Oranı":"Win Rate","Gol Ortalaması":"Goal Average","Maç Analiz Raporu":"Match Analysis Report","Oyuncu İzleme Raporu":"Player Scouting Report","Taktik Analiz":"Tactical Analysis","Rakip Analizi":"Opponent Analysis","Kamp Değerlendirme":"Camp Evaluation","Analiz Departmanı":"Analysis Department","A Milli Takım için oluşturulan analiz ve gözlem raporları":"Analysis and scouting reports created for the senior national team","Yeni Rapor":"New Report","RAPOR":"REPORT","KONU":"SUBJECT","HAZIRLAYAN":"CREATED BY","TARİH":"DATE","PUAN":"RATING",
 "OYUNCU KARŞILAŞTIRMA":"PLAYER COMPARISON","Oyuncu Karşılaştırma":"Player Comparison","İki futbolcu seçin":"Select two players","1. Oyuncu":"Player 1","2. Oyuncu":"Player 2","Karşılaştır":"Compare","KARŞILAŞTIRMA":"COMPARISON","Oyuncu Analizi":"Player Analysis","Yetenek Analizi":"Skill Analysis","Performans":"Performance","Isı Haritası":"Heat Map","Genel Puan":"Overall Rating","Yaş":"Age","Boy":"Height","Ayak":"Preferred Foot","Piyasa Değeri":"Market Value","Maç":"Matches","Gol / Asist":"Goals / Assists","Pas":"Passing","Şut":"Shooting","Dribbling":"Dribbling","Hız":"Pace","Fiziksel":"Physical","Lig Ortalaması":"League Average","İSTATİSTİK KARŞILAŞTIRMASI":"STATISTICAL COMPARISON","Özellik":"Attribute","PERFORMANS":"PERFORMANCE","Maç Sayısı":"Appearances","İlk 11":"Starts","Dakika":"Minutes","Gol":"Goals","Asist":"Assists","Sözleşme Bitiş":"Contract Expiry","Son 10 maç · Hücum yönü →":"Last 10 matches · Attacking direction →","Sol Kanat":"Left Winger","Sol Kanat / Forvet":"Left Winger / Forward","Merkez Ofansif Orta Saha":"Attacking Midfielder","Sol Bek":"Left Back","Sol Bek / Sağ Bek":"Left Back / Right Back","Sağ Bek":"Right Back","Sağ Kanat":"Right Winger","Sağ":"Right","Sol":"Left","Her İkisi":"Both","İki Ayak":"Both Feet","Türkiye":"Türkiye","Oyuncu seçilmedi":"No player selected",
 "Rapor Oluştur":"Create Report","YENİ RAPOR":"NEW REPORT","Rapor Türü":"Report Type","Gözlem Raporu":"Scouting Report","Maç Raporu":"Match Report","Genel Değerlendirme":"General Assessment","Vazgeç":"Cancel","Raporu Oluştur":"Create Report","Tüm İstatistikler":"All Statistics","Detaylı Analiz":"Detailed Analysis","Tümünü Temizle":"Clear All","Temizle":"Clear","Ülke":"Country","Lig":"League","Pozisyon":"Position","Tüm Ülkeler":"All Countries","Tüm Ligler":"All Leagues","Tüm Kulüpler":"All Clubs","Ara":"Search","Filtreler":"Filters","FİLTRELER":"FILTERS",
 "TÜRKİYE FUTBOL FEDERASYONU":"TURKISH FOOTBALL FEDERATION","Tüm milli takım gruplarına ve detaylarına buradan ulaşabilirsiniz.":"Access all national team groups and details here.","Tüm Videoları Gör":"View All Videos","2025/2026 A Milli Takım oyuncu havuzu":"2025/2026 senior national team player pool",
 "Lig, gelişim ve turnuva karmalarına buradan ulaşabilirsiniz.":"Access league, development and tournament representative teams here.","Karma veya organizasyon ara...":"Search representative team or competition...","Karma":"Representative Team","Profesyonel Ligler":"Professional Leagues","Gelişim Ligleri":"Development Leagues","Kadın Ligleri":"Women's Leagues","Bölgesel Ligler":"Regional Leagues","Kupalar":"Cups","Aktif Organizasyon":"Active Competitions","Scout Raporu":"Scout Reports","Karmayı Gör":"View Team","Son güncelleme":"Last updated","Takım":"Teams","Rapor":"Report","Karma Oyuncusu":"Squad Players","Karma Kadrosu":"Representative Squad","Son Eklenen Videolar":"Latest Videos","Son İzlenen Maçlar":"Recently Watched Matches","Son Scout Raporları":"Latest Scout Reports","Tüm Kadroyu Gör":"View Full Squad","Tüm Raporları Gör":"View All Reports","İzlendi":"Watched","İzleniyor":"In Review","Yeni Video":"New Video","Yeni Video Ekle":"Add New Video","Maç bilgilerini girin ve video dosyalarını yükleyin.":"Enter match details and upload video files.","Organizasyon":"Competition","Milli Takım Kategorisi":"National Team Category","Seçiniz (isteğe bağlı)":"Select (optional)","Video Tarihi":"Video Date","Ev Sahibi Takım":"Home Team","Misafir Takım":"Away Team","Ev Sahibi Skor":"Home Score","Misafir Skor":"Away Score","Video Dosyaları":"Video Files","Video dosyalarını buraya sürükleyin":"Drag video files here","veya bilgisayarınızdan dosya seçin":"or select files from your computer","Dosya Seç":"Choose Files","video seçildi":"videos selected","Yüklendi":"Uploaded","Açıklama":"Description","Video hakkında kısa bir açıklama ekleyin...":"Add a short description about the video...","Taslak Kaydet":"Save Draft","Videoyu Yükle":"Upload Video","Otomatik oluşturulacak":"Will be generated automatically","Yükleyen":"Uploaded by","Video No":"Video No","Maç Bilgileri":"Match Information","1. Yarı":"First Half","2. Yarı":"Second Half","Özet":"Highlights","Sezonu":"Season","Trendyol Süper Lig Karması":"Trendyol Super League Representative Team","Trendyol 1. Lig Karması":"Trendyol 1st League Representative Team","Nesine 2. Lig Karması":"Nesine 2nd League Representative Team","Bölgesel Amatör Lig Karması":"Regional Amateur League Representative Team","Kadınlar 1. Ligi Karması":"Women's 1st League Representative Team","U17 Gelişim Ligi Karması":"U17 Development League Representative Team","U19 Gelişim Ligi Karması":"U19 Development League Representative Team","Ziraat Türkiye Kupası Karması":"Turkish Cup Representative Team","İptal":"Cancel","Dosya kaldır":"Remove file","Tüm sonuçları görmek için filtreleri değiştirin.":"Change the filters to see all results.","Eşleşen karma bulunamadı":"No matching representative team found","Bu ekran aynı ana tema ile geliştirilecek.":"This screen will be developed using the same main theme.","Hazırlanıyor":"Coming Soon","milli takimlar":"national teams","futbolcularim":"my players","populer":"popular players","kulupler":"clubs","istatistik":"statistics","raporlar":"reports","videolar":"videos","antrenman":"training","teknik":"technical tests","sakatlik":"injuries","mesaj":"messages","Dil seçimi":"Language selection"
};
Object.assign(EN_TEXT,{
 "Tüm lig ve organizasyon karmalarına göz atın":"Browse all league and competition representative teams",
 "Karma ara...":"Search representative team...",
 "Amatör Ligler":"Amateur Leagues",
 "Kupa Organizasyonları":"Cup Competitions",
 "Profesyonel Lig":"Professional League",
 "Amatör Lig":"Amateur League",
 "Katılım Ligleri":"Participation Leagues",
 "Kupa Organizasyonu":"Cup Competition",
 "Kart görünümü":"Card view",
 "Liste görünümü":"List view",
 "Kulüp":"Club",
 "Grup":"Group"
 ,"Seçilen organizasyona video ekleyin.":"Add videos to the selected competition."
 ,"Video Başlığı":"Video Title"
 ,"Video başlığını yazın...":"Enter video title..."
 ,"Henüz video seçilmedi.":"No video selected yet."
 ,"Bir veya birden fazla video dosyası seçebilirsiniz.":"You can select one or more video files."
 ,"İsteğe bağlı açıklama":"Optional Description"
 ,"Hazır":"Ready"
});
const EN_PARTIAL=Object.entries(EN_TEXT).filter(([key])=>key.length>=4).sort((a,b)=>b[0].length-a[0].length);
const EN_REPLACE=[
 [/(\d+) Oyuncu/g,"$1 Players"], [/(\d+) Yaş Altı/g,"Under $1"], [/(\d+) Yaş/g,"Age $1"],
 [/Bu Ay⌄/g,"This Month ⌄"], [/2025\/26 ortalaması/g,"2025/26 average"],
 [/Maç Raporu –/g,"Match Report –"], [/Gözlem Raporu –/g,"Scouting Report –"],
 [/Türkiye (\d+)–(\d+) İspanya/g,"Türkiye $1–$2 Spain"], [/Türkiye (\d+)–(\d+) Portekiz/g,"Türkiye $1–$2 Portugal"], [/Türkiye (\d+)–(\d+) ABD/g,"Türkiye $1–$2 USA"], [/Türkiye (\d+)–(\d+) Macaristan/g,"Türkiye $1–$2 Hungary"],
 [/Mayıs/g,"May"], [/Haziran/g,"June"], [/ Haz /g," Jun "]
];
function languageSwitch(extra=""){
 return `<button class="lang-switch ${extra}" id="langToggle" type="button" aria-label="Dil seçimi"><span class="${S.lang==="tr"?"active":""}">TR</span><i>/</i><span class="${S.lang==="en"?"active":""}">EN</span></button>`;
}
function enValue(value){
 const source=String(value??""),trimmed=source.trim();
 let translated=EN_TEXT[trimmed]||trimmed;
 if(translated===trimmed)EN_PARTIAL.forEach(([tr,en])=>{translated=translated.split(tr).join(en)});
 EN_REPLACE.forEach(([pattern,replacement])=>{translated=translated.replace(pattern,replacement)});
 if(translated===trimmed)return source;
 return source.replace(trimmed,translated);
}
function applyLanguage(){
 const root=document.getElementById("app");
 if(document.documentElement)document.documentElement.lang=S.lang;
 document.title=S.lang==="en"?"TFF Scout — Scout and Analysis System":"TFF Scout — Scout ve Analiz Sistemi";
 if(S.lang!=="en"||!root)return;
 if(typeof document.createTreeWalker==="function"&&typeof NodeFilter!=="undefined"){
  const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);let node;
  while((node=walker.nextNode()))node.nodeValue=enValue(node.nodeValue);
 }
 root.querySelectorAll?.("[placeholder],[title],[aria-label]").forEach(el=>{
  ["placeholder","title","aria-label"].forEach(attr=>{if(el.hasAttribute(attr))el.setAttribute(attr,enValue(el.getAttribute(attr)))});
 });
}
function go(r){location.hash="#/"+r}
window.addEventListener("hashchange",()=>{const r=location.hash.replace("#/","")||"login";if(r!=="login"&&sessionStorage.getItem("tff-demo-auth")!=="1"){location.hash="#/login";return}S.route=r;render()});
function active(id){if(S.route==="home")return id==="home";if(S.route==="team-a-milli")return id==="milli-takimlar";if(["karma-detail","karma-video-new"].includes(S.route))return id==="karmalar";return S.route===id}

function uiIcon(name){
 const icons={
  home:'<svg viewBox="0 0 24 24"><path d="M3 11.2 12 4l9 7.2"/><path d="M5.5 10.5V20h13v-9.5"/><path d="M9.5 20v-6h5v6"/></svg>',
  "milli-takimlar":'<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8"/><path d="M9 8.5c2.8-1.6 6 .4 6 3.5s-3.2 5.1-6 3.5"/><path d="m15.5 10.2 2 .6-1.3 1.6"/></svg>',
  karmalar:'<svg viewBox="0 0 24 24"><path d="M8 15c-3.4 0-5 1.7-5 4"/><circle cx="8" cy="8" r="3"/><path d="M16 15c3.4 0 5 1.7 5 4"/><circle cx="16" cy="8" r="3"/><path d="M7 19c.6-3 2.2-4.5 5-4.5S16.4 16 17 19"/></svg>',
  rakipler:'<svg viewBox="0 0 24 24"><circle cx="8" cy="8" r="3"/><circle cx="16" cy="8" r="3"/><path d="M3 19c.4-3 2-4.5 5-4.5S12.6 16 13 19"/><path d="M11 19c.4-3 2-4.5 5-4.5s4.6 1.5 5 4"/></svg>',
  futbolcularim:'<svg viewBox="0 0 24 24"><circle cx="12" cy="7" r="3"/><path d="M5.5 20c.5-4 2.7-6 6.5-6s6 2 6.5 6"/></svg>',
  populer:'<svg viewBox="0 0 24 24"><path d="m12 3 2.6 5.3 5.9.9-4.3 4.2 1 5.9-5.2-2.8-5.2 2.8 1-5.9-4.3-4.2 5.9-.9z"/></svg>',
  kulupler:'<svg viewBox="0 0 24 24"><rect x="4" y="5" width="16" height="15" rx="2"/><path d="M8 5V3h8v2M8 10h8M8 14h3M13 14h3"/></svg>',
  video:'<svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m10 9 5 3-5 3z"/></svg>',
  istatistik:'<svg viewBox="0 0 24 24"><path d="M5 20V11M10 20V5M15 20v-8M20 20V8"/></svg>',
  raporlar:'<svg viewBox="0 0 24 24"><path d="M6 3h9l3 3v15H6z"/><path d="M15 3v4h4M9 11h6M9 15h6"/></svg>',
  videolar:'<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8"/><path d="m10 8 6 4-6 4z"/></svg>',
  esame:'<svg viewBox="0 0 24 24"><rect x="5" y="3" width="14" height="18" rx="2"/><path d="M8 8h8M8 12h8M8 16h5"/></svg>',
  "mac-raporlari":'<svg viewBox="0 0 24 24"><path d="M6 3h12v18H6z"/><path d="M9 8h6M9 12h6M9 16h4"/></svg>',
  "gelisim-raporlari":'<svg viewBox="0 0 24 24"><path d="M5 19V9M10 19v-5M15 19V6M20 19v-9"/><path d="m4 7 5-3 5 2 6-4"/></svg>',
  antrenman:'<svg viewBox="0 0 24 24"><path d="M4 7h16M7 4v6M17 4v6M4 17h16M7 14v6M17 14v6"/></svg>',
  "kulup-gelisim":'<svg viewBox="0 0 24 24"><path d="M4 20h16M6 20V8l6-4 6 4v12"/><path d="M9 12h6M9 16h6"/></svg>',
  eslestirme:'<svg viewBox="0 0 24 24"><circle cx="8" cy="10" r="3"/><circle cx="16" cy="10" r="3"/><path d="M5 20c.5-3 1.8-4.5 4-4.5M19 20c-.5-3-1.8-4.5-4-4.5"/><path d="m10 17 2 2 4-4"/></svg>',
  teknik:'<svg viewBox="0 0 24 24"><path d="m5 18 5-5M14 9l5-5M13 4l7 7M4 13l7 7"/></svg>',
  sakatlik:'<svg viewBox="0 0 24 24"><path d="M12 21s7-4.2 7-10a4 4 0 0 0-7-2.4A4 4 0 0 0 5 11c0 5.8 7 10 7 10z"/><path d="M12 8v7M8.5 11.5h7"/></svg>',
  scout:'<svg viewBox="0 0 24 24"><circle cx="10" cy="9" r="3"/><path d="M4 20c.5-4 2.5-6 6-6 2 0 3.5.6 4.5 1.8"/><circle cx="17" cy="16" r="3"/><path d="m19.2 18.2 2.2 2.2"/></svg>',
  yetenek:'<svg viewBox="0 0 24 24"><path d="M12 3a6 6 0 0 0-3.5 10.9V18h7v-4.1A6 6 0 0 0 12 3z"/><path d="M9 21h6M12 6v4M10 8h4"/></svg>',
  dokuman:'<svg viewBox="0 0 24 24"><path d="M6 3h9l3 3v15H6z"/><path d="M15 3v4h4M9 12h6M9 16h6"/></svg>',
  izleyici:'<svg viewBox="0 0 24 24"><circle cx="9" cy="8" r="3"/><path d="M3 20c.5-4 2.5-6 6-6s5.5 2 6 6"/><path d="M17 6v6M14 9h6"/></svg>',
  kullanici:'<svg viewBox="0 0 24 24"><circle cx="8" cy="8" r="3"/><circle cx="16" cy="8" r="3"/><path d="M3 20c.4-3 2-4.5 5-4.5M21 20c-.4-3-2-4.5-5-4.5"/><path d="M10 20c.4-3 1.3-4.5 2-4.5s1.6 1.5 2 4"/></svg>',
  mesaj:'<svg viewBox="0 0 24 24"><path d="M4 5h16v12H8l-4 4z"/><path d="M8 9h8M8 13h5"/></svg>'
 };
 return `<span class="ui-svg">${icons[name]||icons.home}</span>`;
}


function groupForRoute(route){
 if(["karma-detail","karma-video-new"].includes(route))route="karmalar";
 for(const [group,items] of navGroups){
  if(items.some(([id])=>id===route)) return group;
 }
 return "";
}
function sidebarGroupIcon(group){
 const icons={
  "MİLLİ TAKIMLAR":'<svg viewBox="0 0 24 24"><path d="M4 7h16v10H4z"/><path d="m8 7 4-3 4 3"/><circle cx="12" cy="12" r="2.5"/></svg>',
  "OYUNCU & KULÜP":'<svg viewBox="0 0 24 24"><circle cx="10" cy="8" r="3"/><path d="M4 20c.6-4 2.5-6 6-6 2.8 0 4.7 1.2 5.6 3.7"/><path d="M17 6h3v5h-3z"/></svg>',
  "ANALİZ & RAPORLAR":'<svg viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="2"/><path d="M8 16v-4M12 16V8M16 16v-6"/></svg>',
  "GELİŞİM":'<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="7"/><path d="m9 13 2 2 4-5"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3"/></svg>',
  "YÖNETİM":'<svg viewBox="0 0 24 24"><path d="M12 3 4 7v5c0 5 3.4 8 8 9 4.6-1 8-4 8-9V7z"/><path d="M9 12h6M12 9v6"/></svg>'
 };
 return `<span class="side-group-icon">${icons[group]||icons["ANALİZ & RAPORLAR"]}</span>`;
}
function sidebar(){
 const currentGroup=groupForRoute(S.route);
 if(currentGroup && currentGroup!==S.openMenuGroup) S.openMenuGroup=currentGroup;
 const collapseText=S.lang==="en"?(S.sidebarCollapsed?"Expand menu":"Collapse menu"):(S.sidebarCollapsed?"Menüyü genişlet":"Menüyü daralt");
 const weatherLabel=S.lang==="en"?"24 degrees, mostly cloudy":"24 derece, çok bulutlu";
 const groups=navGroups.map(([group,items])=>{
  const cleanItems=items.filter(([id])=>id!=="mesaj");
  const open=S.openMenuGroup===group;
  const groupActive=currentGroup===group;
  return `<div class="side-accordion ${open?"open":""} ${groupActive?"contains-active":""}">
    <button class="side-group-btn" data-group-toggle="${group}" title="${group}">
      ${sidebarGroupIcon(group)}
      <span class="side-group-label">${group.replace("MİLLİ TAKIMLAR","Milli Takımlar").replace("OYUNCU & KULÜP","Oyuncu & Kulüp").replace("ANALİZ & RAPORLAR","Analiz & Raporlar").replace("GELİŞİM","Gelişim").replace("YÖNETİM","Yönetim")}</span>
      <span class="side-chevron">⌄</span>
    </button>
    <div class="side-submenu">${cleanItems.map(([id,ic,tx])=>`<button class="nav side-subnav ${active(id)?"active":""}" data-route="${id}" title="${tx}">${uiIcon(id)}<span>${tx}</span></button>`).join("")}</div>
  </div>`;
 }).join("");
 return `<aside class="sidebar ${S.sidebarCollapsed?"is-collapsed":""}">
   <div class="side-utility">
     <div class="side-weather" aria-label="${weatherLabel}"><div><b>24°C</b><small>Çok Bulutlu</small></div></div>
     <button class="side-collapse side-collapse-top" id="sideCollapse" type="button" title="${collapseText}" aria-label="${collapseText}" aria-expanded="${S.sidebarCollapsed?"false":"true"}">
       <span class="collapse-arrow" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="m14 7-5 5 5 5"/></svg></span>
     </button>
   </div>
   <button class="nav side-home ${active("home")?"active":""}" data-route="home" title="Ana Sayfa">${uiIcon("home")}<span>Ana Sayfa</span></button>
   <div class="side-groups">${groups}</div>
   <button class="nav side-message ${active("mesaj")?"active":""}" data-route="mesaj" title="Mesajlar">${uiIcon("mesaj")}<span>Mesajlar</span><b class="side-badge">3</b></button>
  </aside>`;
}

function topbar(){
 const profile=`<div class="profile-wrap">
   <button class="userbox" id="profileToggle" type="button" aria-label="Profil menüsünü aç">
     <img src="assets/avatar.jpg" alt="Simge Er">
     <div><div class="username">Simge Er ★</div><div class="role">Scout</div></div>
     <span class="user-chevron">${S.profileMenu?"⌃":"⌄"}</span>
   </button>
   ${S.profileMenu?`<div class="profile-menu">
      <button type="button" class="profile-menu-item">♙ <span>Profilim</span></button>
      <button type="button" class="profile-menu-item">⚙ <span>Ayarlar</span></button>
      <div class="profile-menu-sep"></div>
      <button type="button" class="profile-menu-item logout" id="logoutBtn">⇥ <span>Çıkış Yap</span></button>
   </div>`:""}
 </div>`;
 if(S.route==="futbolcu-ara")return `<header class="topbar fp-global-header simple-compare-header">
 <div class="top-brand"><img src="assets/tff-logo.png" alt="TFF"><div class="top-brand-copy"><div class="top-brand-title">Türkiye Futbol Federasyonu</div><div class="top-brand-sub2">Video Analiz ve Gözlem Sistemi</div></div></div>
 <div class="fp-header-context"><h1>Oyuncu Karşılaştırma</h1>${selectedPlayerChips()}</div>
 <div class="fp-header-tools">
   <div class="fp-header-primary"><button class="fp-report" id="reportOpen">▣ &nbsp; Rapor Oluştur</button>${languageSwitch()}<button class="iconbtn" id="theme" aria-label="Temayı değiştir">${S.theme==="dark"?"☀":"☾"}</button><button class="iconbtn notification" aria-label="Bildirimler">♧<b>2</b></button><button class="iconbtn notification" aria-label="Mesajlar">✉<b>1</b></button>${profile}</div>
 </div>
 </header>`;
 return `<header class="topbar">
 <div class="top-brand"><img src="assets/tff-logo.png" alt="TFF"><div class="top-brand-copy"><div class="top-brand-title">Türkiye Futbol Federasyonu</div><div class="top-brand-sub2">Video Analiz ve Gözlem Sistemi</div></div></div>
 <div class="search">⌕<input placeholder="Futbolcu, takım, maç, rapor ara..."><span>⌘ K</span></div>
 <div class="top-actions">${languageSwitch()}<button class="iconbtn" id="theme">${S.theme==="dark"?"☀":"☾"}</button><button class="iconbtn notification">♧<b>5</b></button><button class="iconbtn notification">✉<b>2</b></button>${profile}</div>
 </header>`}
function panel(title,body,extra=""){return `<section class="panel"><div class="panel-head"><span>${title}</span>${extra}</div><div class="panel-body">${body}</div></section>`}
const TEAM_VISUALS={
"a-milli":{img:"assets/team-a-milli.jpg",focus:"50% 45%",fit:"cover"},
"a2":{img:"assets/a2-milli.jpg",focus:"50% 45%",fit:"cover"},
"u21":{img:"assets/team-u21.jpg",focus:"50% 43%",fit:"cover"},
"u20":{img:"assets/team-u20.jpg",focus:"50% 48%",fit:"cover"},
"u19":{img:"assets/team-u19.jpg",focus:"50% 48%",fit:"cover"},
"u18":{img:"assets/team-u18.jpg",focus:"50% 48%",fit:"cover"},
"u17":{img:"assets/team-u17.jpg",focus:"50% 47%",fit:"cover"},
"u16":{img:"assets/team-u16.jpg",focus:"50% 48%",fit:"cover"},
"u15":{img:"assets/team-u15.jpg",focus:"50% 48%",fit:"cover"},
"u14":{img:"assets/team-u14.jpg",focus:"50% 48%",fit:"cover"},
"kadin-a":{img:"assets/team-kadin-a.jpg",focus:"50% 46%",fit:"cover"},
"kadin-u23":{img:"assets/kadin-u23.jpg",focus:"50% 48%",fit:"cover"},
"kadin-u19":{img:"assets/kadin-u19.jpg",focus:"50% 48%",fit:"cover"},
"kiz-u18":{img:"assets/kiz-u18.jpg",focus:"50% 48%",fit:"cover"},
"kiz-u17":{img:"assets/kiz-u17.jpg",focus:"50% 48%",fit:"cover"},
"kiz-u15":{img:"assets/kiz-u15.jpg",focus:"50% 48%",fit:"cover"},
"futsal":{img:"assets/team-futsal.jpg",focus:"50% 50%",fit:"contain"},
"plaj":{img:"assets/team-plaj.jpg",focus:"50% 50%",fit:"contain"},
"ozel":{img:"assets/ozel.jpg",focus:"50% 48%",fit:"cover"},
"karma":{img:"assets/karma.jpg",focus:"50% 48%",fit:"cover"}
};
const homeTeams=[
{id:"a-milli",name:"A Milli",sub:"Erkek Milli Takım",count:"42 Oyuncu",...TEAM_VISUALS["a-milli"]},
{id:"u21",name:"U21 Milli",sub:"21 Yaş Altı",count:"40 Oyuncu",...TEAM_VISUALS.u21},
{id:"u19",name:"U19 Milli",sub:"19 Yaş Altı",count:"36 Oyuncu",...TEAM_VISUALS.u19},
{id:"kadin-a",name:"Kadınlar A Milli",sub:"Kadın Milli Takım",count:"28 Oyuncu",...TEAM_VISUALS["kadin-a"]},
{id:"futsal",name:"Futsal Milli",sub:"Futsal",count:"24 Oyuncu",...TEAM_VISUALS.futsal},
{id:"plaj",name:"Plaj Milli",sub:"Plaj Futbolu",count:"20 Oyuncu",...TEAM_VISUALS.plaj}
];
const vids=[
["assets/video-1.jpg","08:24","Türkiye 2–2 İspanya","Dünya Kupası Elemeleri","21.05.2026"],
["assets/video-2.jpg","06:18","Türkiye 4–0 Macaristan","UEFA Nations League","12.05.2026"],
["assets/video-3.jpg","07:10","Türkiye 3–1 Portekiz","Hazırlık Maçı","08.06.2026"],
["assets/video-4.jpg","04:45","Türkiye 1–1 ABD","Hazırlık Maçı","01.06.2026"],
["assets/video-5.jpg","05:32","A Milli Antrenman Özeti","Antalya Kampı","30.05.2026"]
];

function homeNationalCard(t){
 const jersey=t.id==="futsal"?"assets/milli-jersey-black.jpg":
              t.id==="plaj"?"assets/milli-jersey-white.jpg":
              "assets/milli-jersey-red.jpg";
 const code={
  "a-milli":"A MİLLİ",
  "u21":"U21",
  "u19":"U19",
  "kadin-a":"KADINLAR A",
  "futsal":"FUTSAL",
  "plaj":"PLAJ MİLLİ"
 }[t.id]||t.name.toUpperCase();

 return `<article class="home-national-card" data-route="${t.id==="a-milli"?"team-a-milli":"milli-takimlar"}" ${t.id==="a-milli"?'onclick="go(\'team-a-milli\')"':""}>
   <div class="home-national-art" style="background-image:url('${jersey}')">
     <strong>${code}</strong>
   </div>
   <div class="home-national-foot">
     <b>${t.id==="kadin-a"?"Kadınlar A Milli":t.name}</b>
     <span aria-hidden="true">→</span>
   </div>
 </article>`;
}

function teamCard(t){return `<article class="quick-card team-${t.id}" data-route="${t.id==="a-milli"?"team-a-milli":"milli-takimlar"}"><div class="quick-img" style="background-image:url('${t.img}');background-position:${t.focus||"center"};background-size:${t.fit||"cover"}"><div class="quick-badge"><img src="assets/crescent-star.png" alt="Türkiye"></div></div><div class="quick-info"><b>${t.name}</b><small>${t.sub}</small><span>${t.count}</span></div></article>`}
function stats(){return panel("Genel İstatistikler",`<div class="stat-grid">${[["İzlenen Maç","18","↗ %12",""],["İzlenen Oyuncu","42","↗ %15",""],["Oluşturulan Rapor","23","↗ %8",""],["Yetenek Başvurusu","7","↘ %5","down"]].map(x=>`<div class="stat"><small>${x[0]}</small><strong>${x[1]}</strong><div class="trend ${x[3]}">${x[2]}</div></div>`).join("")}</div>`,`<span style="font-size:10px;color:#9da9b7">Bu Ay⌄</span>`)}
function upcoming(){
 const matches=[
  {a:"Türkiye",fa:"assets/flag-tr.png",b:"İspanya",fb:"assets/flag-es.png",date:"21 May 2026",time:"21:45",comp:"Dünya Kupası Elemeleri",stad:"Atatürk Olimpiyat Stadyumu"},
  {a:"Türkiye",fa:"assets/flag-tr.png",b:"İtalya",fb:"assets/flag-it.png",date:"25 May 2026",time:"20:00",comp:"Hazırlık Maçı",stad:"Konya Büyükşehir Stadyumu"},
  {a:"Macaristan",fa:"assets/flag-hu.png",b:"Türkiye",fb:"assets/flag-tr.png",date:"12 Haz 2026",time:"21:45",comp:"UEFA Nations League",stad:"Puskás Arena"}
 ];
 return panel("Yaklaşan Maçlar",matches.map(x=>`<div class="match-line"><div><div class="match-teams"><img class="flag-img" src="${x.fa}"><b>${x.a}</b><span class="match-vs">vs</span><img class="flag-img" src="${x.fb}"><b>${x.b}</b></div><div class="match-meta">${x.comp}</div></div><div class="match-right">${x.date}<br>${x.time}<br>${x.stad}</div></div>`).join(""),`<span style="color:#d71920;font-size:10px">Tümünü Gör ›</span>`)
}
function reports(){
 const r=[
  ["assets/report-arda.jpg","Arda Güler","Real Madrid","Gözlem Raporu",84],
  ["assets/report-yusuf.jpg","Yusuf Akçiçek","Fenerbahçe","Maç Raporu",79],
  ["assets/report-kenan.jpg","Kenan Yıldız","Juventus","Gözlem Raporu",78]
 ];
 return panel("Son Eklenen Raporlar",r.map(x=>`<div class="report-row"><img class="report-avatar" src="${x[0]}"><div class="report-copy"><div class="report-title">${x[1]} <span>| ${x[2]}</span></div><div class="report-sub">${x[3]} – Simge Er</div></div><span class="report-score">${x[4]}</span></div>`).join(""),`<span class="panel-link">Tümünü Gör ›</span>`)
}
function quickActions(){return panel("Hızlı İşlemler",`<div class="qgrid"><button class="qbtn q1">▷ &nbsp; Maç Analizine Başla</button><button class="qbtn q2">⌕ &nbsp; Oyuncu Ara</button><button class="qbtn q3">▤ &nbsp; Yeni Rapor Oluştur</button><button class="qbtn q4">☆ &nbsp; Yetenek Başvuruları</button></div>`)}
function home(){return `<div class="content"><div class="layout"><section class="center"><div class="welcome"><h1>Hoş Geldiniz, Simge Er</h1><p>TFF Video Analiz ve Gözlem Sistemi</p></div><div class="hero"></div>
<div class="section-head"><div class="section-title">Hızlı Erişim</div><button class="linkbtn" data-route="milli-takimlar">Tümünü Gör &nbsp; →</button></div>
<div class="quick-grid home-national-grid">${homeTeams.map(homeNationalCard).join("")}</div>
<div class="section-head"><div class="section-title">Son Videolar</div><button class="linkbtn">Tümünü Gör &nbsp; →</button></div>
<div class="video-grid">${vids.map(v=>`<article class="video-card"><div class="video-thumb" style="background-image:url('${v[0]}')"><div class="play">▶</div><div class="duration">${v[1]}</div></div><div class="video-title">${v[2]}</div><div class="video-sub">${v[3]}<br>${v[4]}</div></article>`).join("")}</div></section>
<aside class="rail">${stats()}${upcoming()}${reports()}${quickActions()}</aside></div><footer>© 2026 Türkiye Futbol Federasyonu &nbsp; | &nbsp; Video Analiz ve Gözlem Sistemi</footer></div>`}
function milli(){
 const teams=[
  ["a-milli","A MİLLİ","A Milli","red"],
  ["a2","A2","A2 Milli","red"],
  ["u21","U21","U21 Milli","red"],
  ["u20","U20","U20 Milli","red"],
  ["u19","U19","U19 Milli","red"],
  ["u18","U18","U18 Milli","red"],
  ["u17","U17","U17 Milli","red"],
  ["u16","U16","U16 Milli","red"],
  ["u15","U15","U15 Milli","red"],
  ["u14","U14","U14 Milli","red"],
  ["kadin-a","KADINLAR A","Kadınlar A Milli","red"],
  ["kadin-u23","KADINLAR U23","Kadınlar U23 Milli","red"],
  ["kadin-u19","KADINLAR U19","Kadınlar U19 Milli","red"],
  ["kiz-u18","KIZLAR U18","Kızlar U18 Milli","red"],
  ["kiz-u17","KIZLAR U17","Kızlar U17 Milli","red"],
  ["kiz-u15","KIZLAR U15","Kızlar U15 Milli","red"],
  ["futsal","FUTSAL","Futsal Milli","black"],
  ["plaj","PLAJ","Plaj Milli","white"],
  ["ozel","ÖZEL SPORCULAR","Özel Sporcular","blue"],
  ["karma-2018","2018 KARMA","2018 Karma","red"],
  ["karma-2019","2019 KARMA","2019 Karma","red"],
  ["u14-kulup","U14 KULÜP","U14 Kulüp Seçmeleri","red"],
  ["kiz-u15-bolge","KIZLAR U15 BÖLGE","Kızlar U15 Bölge Seçmeleri","red"]
 ];

 const imgFor=color=>`assets/milli-jersey-${color}.jpg`;

 return `<div class="content milli-ref5-page">
  <div class="page-head milli-ref5-head">
   <div>
    <h1>Milli Takımlar</h1>
    <p>Tüm milli takım gruplarına ve detaylarına buradan ulaşabilirsiniz.</p>
   </div>
   <input class="input milli-ref5-search" placeholder="Milli takım ara...">
  </div>

  <div class="milli-ref5-grid">
   ${teams.map(([id,code,label,color])=>{
    const route=id==="a-milli"?"team-a-milli":"milli-takimlar";
    const longCode=code.length>14?" long-code":"";
    return `<article class="milli-ref5-card" data-route="${route}" data-team="${id}" ${id==="a-milli"?'onclick="go(\'team-a-milli\')"':""}>
      <div class="milli-ref5-art" style="background-image:url('${imgFor(color)}')">
       <strong class="${longCode}">${code}</strong>
      </div>
      <div class="milli-ref5-foot">
       <b>${label}</b>
       <span aria-hidden="true">→</span>
      </div>
     </article>`;
   }).join("")}
  </div>
 </div>`;
}

function flagTeam(flag,name){return `<span class="ref-team"><img src="${flag}"><b>${name}</b></span>`}

function teamOverview(){
 return teamShell(`
 <div class="team-dashboard">
  <div class="team-match-grid">
   <section class="ref-card ref-match-card team-main-match"><h3>Son Maç</h3><p class="ref-muted center">Dünya Kupası Elemeleri</p><div class="ref-scoreline">${flagTeam("assets/flag-tr.png","Türkiye")}<strong>2 <span>–</span> 2</strong>${flagTeam("assets/flag-es.png","İspanya")}</div><p class="ref-muted center">21 Mayıs 2026 · 21:45<br>Atatürk Olimpiyat Stadyumu</p><button class="ref-wide-btn" data-teamtab="matches">Maç Detayları &nbsp; →</button></section>
   <section class="ref-card ref-match-card team-main-match"><h3>Sıradaki Maç</h3><p class="ref-muted center">Dünya Kupası Elemeleri</p><div class="ref-scoreline">${flagTeam("assets/flag-tr.png","Türkiye")}<strong class="vs">VS</strong>${flagTeam("assets/flag-it.png","İtalya")}</div><p class="ref-muted center">25 Mayıs 2026 · 20:00<br>Konya Büyükşehir Stadyumu</p><button class="ref-wide-btn" data-teamtab="matches">Maç Detayları &nbsp; →</button></section>
  </div>
  <div class="team-dashboard-row team-dashboard-row-middle">
   <section class="ref-card team-squad-card"><h3>Kadro Özeti</h3><div class="team-position-summary">${[["Kaleci","3","green"],["Defans","9","blue"],["Orta Saha","11","orange"],["Forvet","10","red"]].map(x=>`<button data-teamtab="squad" class="${x[2]}"><span>${x[0]}</span><strong>${x[1]}</strong></button>`).join("")}</div></section>
   <section class="ref-card team-form-card"><h3>Son 5 Maç Formu</h3><div class="team-form-content"><div class="team-form-circles"><span class="win">G</span><span class="draw">B</span><span class="win">G</span><span class="loss">M</span><span class="win">G</span></div><div class="team-form-score"><span>Form</span><strong>%74</strong><svg viewBox="0 0 130 45" aria-hidden="true"><polyline points="3,38 29,25 52,31 78,14 102,24 126,5"/><path d="m115 5 11 0 0 11"/></svg></div></div></section>
  </div>
  <div class="team-dashboard-row team-dashboard-row-bottom">
   <section class="ref-card team-performance-card"><h3>Performans Özeti</h3><div class="team-performance-grid">${[["Topla Oynama","%56","blue"],["Şut","15",""],["İsabetli Şut","7",""],["Pas Başarısı","%87","green"]].map(x=>`<div><span>${x[0]}</span><strong class="${x[2]}">${x[1]}</strong></div>`).join("")}</div></section>
   <section class="ref-card team-staff-card"><h3>Teknik Ekip</h3><div class="team-staff-list">${[["VM","Vincenzo Montella","Teknik Direktör"],["DB","D. Di Battista","Yardımcı Antrenör"],["AR","A. Rimedio","Kaleci Antrenörü"]].map(x=>`<div><span>${x[0]}</span><b>${x[1]}</b><small>${x[2]}</small></div>`).join("")}</div></section>
  </div>
 </div>`)
}

function teamSquad(){
 const positions=["Tümü","Kaleci","Defans","Orta Saha","Hücum"];
 const groupLabels={"Kaleci":"Kaleciler","Defans":"Defans","Orta Saha":"Orta Saha","Hücum":"Hücum"};
 const summary=[{value:33,label:"Oyuncu havuzu",icon:"♙"},{value:3,label:"Kaleci",icon:"▣"},{value:9,label:"Defans",icon:"◇"},{value:11,label:"Orta Saha",icon:"◉"},{value:10,label:"Hücum",icon:"⚽"}];
 const visible=S.squadFilter==="Tümü"?aMilliPlayers:aMilliPlayers.filter(p=>p.group===S.squadFilter);
 const initials=name=>name.split(" ").map(x=>x[0]).join("").slice(0,2);
 const playerRow=p=>{const expanded=S.expandedSquadPlayer===p.name;return `<article class="squad-v2-player" data-squad-searchtext="${p.name} ${p.club} ${p.position}">
   <div class="squad-v2-row">
    <b class="squad-v2-number">${p.no}</b>
    <div class="squad-v2-photo ${p.image?"has-photo":""}">${p.image?`<img src="${p.image}" alt="${p.name}" loading="lazy">`:initials(p.name)}</div>
    <div class="squad-v2-identity"><b>${p.name}</b><span>${p.club}</span></div>
    <span class="squad-v2-position">${p.position}</span>
    <div class="squad-v2-age"><span>Yaş</span><b>${p.age}</b></div>
    <div class="squad-v2-stat"><span>Millî Maç</span><b>${p.caps}</b></div>
    <div class="squad-v2-stat"><span>Gol</span><b>${p.goals}</b></div>
    <span class="squad-v2-status">● ${p.status}</span>
    <button class="squad-v2-expand" data-squad-expand="${p.name}" aria-label="${expanded?"Detayları gizle":"Detayları göster"}" aria-expanded="${expanded}">${expanded?"⌃":"⌄"}</button>
   </div>
   ${expanded?`<div class="squad-v2-details"><div><span>Doğum Tarihi</span><b>${p.birth}</b></div><div><span>Boy / Kilo</span><b>${p.body}</b></div><div><span>Ayak</span><b>${p.foot}</b></div><div><span>Kulüp</span><b>${p.club}</b></div></div>`:""}
  </article>`};
 const groups=["Kaleci","Defans","Orta Saha","Hücum"].map(group=>{const players=visible.filter(p=>p.group===group);if(!players.length)return "";return `<section class="squad-v2-group"><h3>${groupLabels[group]} <span>· ${players.length}</span></h3><div class="squad-v2-list">${players.map(playerRow).join("")}</div></section>`}).join("");
 return teamShell(`<section class="squad-v2-page">
  <div class="squad-v2-heading"><div><h2>Kadro</h2><p>2025/2026 A Milli Takım oyuncu havuzu</p></div></div>
  <div class="squad-v2-summary">${summary.map(x=>`<div><span>${x.icon}</span><strong>${x.value}</strong><small>${x.label}</small></div>`).join("")}</div>
  <div class="squad-v2-controls"><label class="squad-v2-search"><span>⌕</span><input id="squadSearch" type="search" placeholder="Oyuncu ara..." autocomplete="off"></label><div class="squad-v2-filters">${positions.map(x=>`<button data-squad-filter="${x}" class="${S.squadFilter===x?"active":""}">${x}</button>`).join("")}</div></div>
  <div id="squadGroups">${groups}</div><div class="squad-v2-empty" id="squadEmpty" hidden>Oyuncu bulunamadı</div>
 </section>`)
}

function teamMatches(){
 return teamShell(`<div class="tab-two-col"><section class="ref-card tab-card"><div class="ref-card-head"><div><h2>Maçlar</h2><p class="ref-muted">Sonuçlar ve yaklaşan karşılaşmalar</p></div><select class="ref-select"><option>2025/2026</option></select></div><div class="big-match-list">${aMilliMatches.map((m,i)=>`<div class="big-match"><div><b>${m[0]}</b><small>${m[1]}</small></div>${flagTeam(m[5],m[2])}<strong>${m[3]}</strong>${flagTeam(m[6],m[4])}<span class="${i<5?"done":"pending"}">${i<5?"Tamamlandı":"Yaklaşan"}</span><button>Maç Detayı →</button></div>`).join("")}</div></section><aside class="ref-card"><h3>Maç Özeti</h3>${[["Oynanan","12"],["Galibiyet","8"],["Beraberlik","3"],["Mağlubiyet","1"],["Atılan Gol","26"],["Yenilen Gol","9"]].map(x=>`<div class="ref-info"><span>${x[0]}</span><b>${x[1]}</b></div>`).join("")}</aside></div>`)
}

function teamVideos(){
 const allV=[...vids,...vids.slice(0,3)];
 return teamShell(`<section class="ref-card tab-card"><div class="ref-card-head"><div><h2>Videolar</h2><p class="ref-muted">Maç, antrenman ve analiz videoları</p></div><button class="upload-btn">⇧ Video Yükle</button></div><div class="team-video-grid">${allV.map((v,i)=>`<article><div class="ref-video-thumb large" style="background-image:url('${v[0]}')"><span>▶</span><small>${v[1]}</small></div><b>${v[2]}</b><p>${v[3]} · ${v[4]}</p><div class="video-tags"><span>${i%2?"Maç":"Analiz"}</span><span>${i%3?"A Milli":"Antrenman"}</span></div></article>`).join("")}</div></section>`)
}

function teamStats(){
 return teamShell(`<div class="stats-page"><div class="stats-kpis">${[["Topa Sahip Olma","%56"],["Maç Başına Şut","14.8"],["Pas Başarısı","%87"],["Maç Başına Gol","2.2"],["Gol Yeme","0.8"],["PPDA","9.6"]].map(x=>`<div class="ref-card stat-kpi"><span>${x[0]}</span><strong>${x[1]}</strong><small>2025/26 ortalaması</small></div>`).join("")}</div><div class="tab-two-col"><section class="ref-card"><h3>Performans Karşılaştırması</h3><div class="bar-list">${[["Hücum",82],["Savunma",76],["Pas Oyunu",88],["Geçiş Hücumu",79],["Duran Top",71],["Pres",84]].map(x=>`<div><span>${x[0]}</span><div><i style="width:${x[1]}%"></i></div><b>${x[1]}</b></div>`).join("")}</div></section><section class="ref-card"><h3>Son 5 Maç Formu</h3><div class="form-circles"><span class="w">G</span><span class="w">G</span><span class="d">B</span><span class="w">G</span><span class="w">G</span></div><div class="ref-info"><span>Galibiyet Oranı</span><b>%80</b></div><div class="ref-info"><span>Gol Ortalaması</span><b>2.4</b></div><div class="ref-info"><span>Clean Sheet</span><b>3</b></div></section></div></div>`)
}

function teamReports(){
 const rr=[["Maç Analiz Raporu","Türkiye 2–2 İspanya","Simge Er","21.05.2026","84"],["Oyuncu İzleme Raporu","Kenan Yıldız","Simge Er","18.05.2026","88"],["Taktik Analiz","Macaristan 0–4 Türkiye","Analiz Departmanı","12.05.2026","91"],["Rakip Analizi","İtalya Milli Takımı","Simge Er","08.05.2026","79"],["Kamp Değerlendirme","Antalya Kampı","Teknik Ekip","30.05.2026","86"]];
 return teamShell(`<section class="ref-card tab-card"><div class="ref-card-head"><div><h2>Raporlar</h2><p class="ref-muted">A Milli Takım için oluşturulan analiz ve gözlem raporları</p></div><button class="upload-btn">＋ Yeni Rapor</button></div><div class="report-table"><div class="rt-head"><span>RAPOR</span><span>KONU</span><span>HAZIRLAYAN</span><span>TARİH</span><span>PUAN</span></div>${rr.map(x=>`<div class="rt-row"><b>${x[0]}</b><span>${x[1]}</span><span>${x[2]}</span><span>${x[3]}</span><strong>${x[4]}</strong></div>`).join("")}</div></section>`)
}

function teamDetail(){
 if(S.teamTab==="squad")return teamSquad();
 if(S.teamTab==="matches")return teamMatches();
 if(S.teamTab==="videos")return teamVideos();
 if(S.teamTab==="stats")return teamStats();
 if(S.teamTab==="team-reports")return teamReports();
 return teamOverview();
}


const KARMA_CATEGORIES=["Tümü","Profesyonel Ligler","Kadın Ligleri","Gelişim Ligleri","Amatör Ligler","Kupa Organizasyonları"];
const KARMA_DATA=[
 {id:"super-lig",name:"Trendyol Süper Lig",category:"Profesyonel Ligler",tag:"Profesyonel Lig",season:"2025/26",teams:20,teamLabel:"Kulüp",players:540,playerLabel:"Oyuncu",videos:48,reports:18,updated:"06.05.2025",tone:"red",logo:"tff"},
 {id:"trendyol-1",name:"Trendyol 1. Lig",category:"Profesyonel Ligler",tag:"Profesyonel Lig",season:"2025/26",teams:18,teamLabel:"Kulüp",players:486,playerLabel:"Oyuncu",videos:46,reports:16,updated:"06.05.2025",tone:"red",logo:"one"},
 {id:"trendyol-1-playoff",name:"Trendyol 1. Lig Play-Off Müsabakaları",category:"Profesyonel Ligler",tag:"Profesyonel Lig",season:"2025/26",teams:8,teamLabel:"Takım",players:220,playerLabel:"Oyuncu",videos:18,reports:8,updated:"06.05.2025",tone:"red",logo:"one-playoff"},
 {id:"nesine-2",name:"Nesine 2. Lig",category:"Profesyonel Ligler",tag:"Profesyonel Lig",season:"2025/26",teams:36,teamLabel:"Kulüp",players:972,playerLabel:"Oyuncu",videos:38,reports:14,updated:"06.05.2025",tone:"red",logo:"nesine-two"},
 {id:"nesine-3",name:"Nesine 3. Lig",category:"Profesyonel Ligler",tag:"Profesyonel Lig",season:"2025/26",teams:54,teamLabel:"Kulüp",players:1458,playerLabel:"Oyuncu",videos:34,reports:12,updated:"06.05.2025",tone:"red",logo:"nesine-three"},
 {id:"nesine-3-playoff",name:"Nesine 3. Lig Play-Off Müsabakaları",category:"Profesyonel Ligler",tag:"Profesyonel Lig",season:"2025/26",teams:8,teamLabel:"Takım",players:216,playerLabel:"Oyuncu",videos:16,reports:8,updated:"05.05.2025",tone:"red",logo:"nesine-three-playoff"},
 {id:"bal-baraj",name:"Bölgesel Amatör Lig Baraj Maçları",category:"Amatör Ligler",tag:"Amatör Lig",season:"2025/26",teams:196,teamLabel:"Takım",players:4320,playerLabel:"Oyuncu",videos:22,reports:10,updated:"04.05.2025",tone:"cyan",logo:"bal"},
 {id:"bal-playoff",name:"Bölgesel Amatör Lig Play-Off",category:"Amatör Ligler",tag:"Amatör Lig",season:"2025/26",teams:64,teamLabel:"Takım",players:1408,playerLabel:"Oyuncu",videos:20,reports:9,updated:"04.05.2025",tone:"cyan",logo:"bal"},
 {id:"kadin-1",name:"Kadınlar 1. Ligi",category:"Kadın Ligleri",tag:"Kadın Ligleri",season:"2025/26",teams:12,teamLabel:"Kulüp",players:288,playerLabel:"Oyuncu",videos:24,reports:12,updated:"06.05.2025",tone:"purple",logo:"tff"},
 {id:"kadin-2",name:"Kadınlar 2. Ligi",category:"Kadın Ligleri",tag:"Kadın Ligleri",season:"2025/26",teams:14,teamLabel:"Kulüp",players:336,playerLabel:"Oyuncu",videos:22,reports:10,updated:"06.05.2025",tone:"purple",logo:"tff"},
 {id:"kadin-1-playoff",name:"TFF Kadınlar 1. Ligi Play-Off",category:"Kadın Ligleri",tag:"Kadın Ligleri",season:"2025/26",teams:4,teamLabel:"Takım",players:96,playerLabel:"Oyuncu",videos:12,reports:6,updated:"05.05.2025",tone:"purple",logo:"tff"},
 {id:"kadin-2-playoff",name:"TFF Kadınlar 2. Ligi Play-Off",category:"Kadın Ligleri",tag:"Kadın Ligleri",season:"2025/26",teams:4,teamLabel:"Takım",players:96,playerLabel:"Oyuncu",videos:12,reports:6,updated:"05.05.2025",tone:"purple",logo:"tff"},
 {id:"kadin-super",name:"Turkcell Kadın Futbol Süper Ligi",category:"Kadın Ligleri",tag:"Kadın Ligleri",season:"2025/26",teams:8,teamLabel:"Kulüp",players:192,playerLabel:"Oyuncu",videos:26,reports:12,updated:"06.05.2025",tone:"orange",logo:"tff"},
 {id:"u14-lig",name:"U14 Gelişim Ligi",category:"Gelişim Ligleri",tag:"Katılım Ligleri",season:"2025/26",teams:8,teamLabel:"Grup",players:192,playerLabel:"Takım",videos:30,reports:10,updated:"04.05.2025",tone:"neutral",logo:"tff"},
 {id:"u15-playoff",name:"U15 Gelişim Ligi Play-Off",category:"Gelişim Ligleri",tag:"Katılım Ligleri",season:"2025/26",teams:8,teamLabel:"Takım",players:192,playerLabel:"Oyuncu",videos:28,reports:10,updated:"04.05.2025",tone:"orange",logo:"tff"},
 {id:"ztk",name:"Ziraat Türkiye Kupası",category:"Kupa Organizasyonları",tag:"Kupa Organizasyonu",season:"2025/26",teams:124,teamLabel:"Takım",players:3100,playerLabel:"Oyuncu",videos:36,reports:12,updated:"06.05.2025",tone:"gold",logo:"tff"}
];
const KARMA_VIDEOS=[
 {img:"assets/video-1.jpg",title:"Gaziantep FK 2–0 Bandırmaspor",date:"06.05.2025",duration:"14:32"},
 {img:"assets/video-2.jpg",title:"Sakaryaspor 1–1 Boluspor",date:"05.05.2025",duration:"11:28"},
 {img:"assets/video-3.jpg",title:"Erzurumspor FK 2–1 Çorum FK",date:"04.05.2025",duration:"13:45"},
 {img:"assets/video-4.jpg",title:"Kocaelispor 3–1 Ümraniyespor",date:"02.05.2025",duration:"10:18"},
 {img:"assets/video-5.jpg",title:"Iğdır FK 0–0 İstanbulspor",date:"30.04.2025",duration:"09:52"},
 {img:"assets/hero.jpg",title:"Fatih Karagümrük 2–1 Gençlerbirliği",date:"27.04.2025",duration:"12:06"}
];
const KARMA_SQUAD=[
 ["EG","Emre Gökdemir","Çorum FK","Forvet","7.85"],["OA","Oğuz Aydın","Eyüpspor","Kanat","7.62"],["YK","Yiğit Koç","Kocaelispor","Orta Saha","7.41"],["BÖ","Burak Öksüz","Gençlerbirliği","Stoper","7.32"],["AE","Atakan Efe","Boluspor","Sol Bek","7.18"],["ME","Mert Eren","Sakaryaspor","Kaleci","7.12"],["CD","Can Demir","Bandırmaspor","Sağ Bek","7.08"],["AK","Arda Kaya","Erzurumspor FK","Orta Saha","6.98"]
];
const KARMA_MATCHES=[
 ["Gaziantep FK","2 – 0","Bandırmaspor","06.05.2025","İzlendi"],["Sakaryaspor","1 – 1","Boluspor","05.05.2025","İzlendi"],["Erzurumspor FK","2 – 1","Çorum FK","04.05.2025","İzleniyor"],["Kocaelispor","3 – 1","Ümraniyespor","02.05.2025","İzlendi"],["Iğdır FK","0 – 0","İstanbulspor","30.04.2025","İzlendi"]
];
const KARMA_REPORTS=[
 ["EG","Emre Gökdemir","Çorum FK","Ahmet Yılmaz","06.05.2025","8.5"],["OA","Oğuz Aydın","Eyüpspor","Murat Demir","05.05.2025","8.0"],["YK","Yiğit Koç","Kocaelispor","Serkan Kaya","04.05.2025","7.5"],["BÖ","Burak Öksüz","Gençlerbirliği","Simge Er","02.05.2025","7.4"],["AE","Atakan Efe","Boluspor","Simge Er","30.04.2025","7.2"]
];

function karmaBadge(k,size="card"){return `<span class="karma-ref-logo logo-${k.logo||"tff"} ${size}" aria-hidden="true"></span>`}
function karmaNumber(value){return Number(value).toLocaleString("tr-TR")}
function karmaMiniIcon(type){return type==="team"?`<svg viewBox="0 0 24 24"><path d="M12 3 4 6v5c0 5 3.2 8.2 8 10 4.8-1.8 8-5 8-10V6z"/></svg>`:`<svg viewBox="0 0 24 24"><circle cx="12" cy="7" r="3"/><path d="M5.5 20c.5-4 2.7-6 6.5-6s6 2 6.5 6"/></svg>`}
function karmaCard(k){
 return `<article class="karma-ref-card" role="button" tabindex="0" data-open-karma="${k.id}" data-karma-card data-karma-searchtext="${k.name} ${k.category} ${k.tag}">
  <div class="karma-ref-main">${karmaBadge(k)}<div class="karma-ref-copy"><h2>${k.name}</h2><span class="karma-ref-tag tone-${k.tone}">${k.tag}</span><p>${k.season} Sezonu</p></div></div>
  <div class="karma-ref-foot"><span>${karmaMiniIcon("team")}<b>${karmaNumber(k.teams)}</b> ${k.teamLabel}</span><span>${karmaMiniIcon("player")}<b>${karmaNumber(k.players)}</b> ${k.playerLabel}</span></div>
 </article>`;
}
function karmalarPage(){
 const visible=KARMA_DATA.filter(k=>S.karmaCategory==="Tümü"||k.category===S.karmaCategory);
 return `<section class="karma-page karma-list-page">
  <header class="karma-ref-title"><h1>Karmalar</h1><p>Tüm lig ve organizasyon karmalarına göz atın</p></header>
  <div class="karma-ref-toolbar"><div class="karma-ref-filters">${KARMA_CATEGORIES.map(x=>`<button type="button" data-karma-category="${x}" class="${S.karmaCategory===x?"active":""}">${x}</button>`).join("")}</div><div class="karma-ref-actions"><label><input id="karmaSearch" type="search" placeholder="Karma ara..." autocomplete="off"><span>⌕</span></label><button type="button" data-karma-view="grid" class="${S.karmaView==="grid"?"active":""}" aria-label="Kart görünümü">▦</button><button type="button" data-karma-view="list" class="${S.karmaView==="list"?"active":""}" aria-label="Liste görünümü">☷</button></div></div>
  <div class="karma-ref-grid ${S.karmaView==="list"?"is-list":""}" id="karmaGrid">${visible.map(karmaCard).join("")}</div>
  <div class="karma-empty" id="karmaEmpty" hidden><b>Eşleşen karma bulunamadı</b><span>Tüm sonuçları görmek için filtreleri değiştirin.</span></div>
 </section>`;
}

function karmaVideoCards(limit=KARMA_VIDEOS.length){return KARMA_VIDEOS.slice(0,limit).map(v=>`<article class="karma-video"><div class="karma-video-thumb" style="background-image:url('${v.img}')"><button type="button" class="karma-play" data-karma-play="${v.title}" aria-label="${v.title}">▶</button><b>${v.duration}</b></div><h3>${v.title}</h3><p>${v.date}</p><div><span>1. Yarı</span><span>2. Yarı</span></div></article>`).join("")}
function karmaSquadRows(limit=KARMA_SQUAD.length){return KARMA_SQUAD.slice(0,limit).map(p=>`<div class="karma-squad-row"><i>${p[0]}</i><div><b>${p[1]}</b><small>${p[2]}</small></div><span>${p[3]}</span><strong>${p[4]}</strong></div>`).join("")}
function karmaMatchRows(limit=KARMA_MATCHES.length){return KARMA_MATCHES.slice(0,limit).map((m,i)=>`<div class="karma-match-row"><i>${m[0].slice(0,2).toUpperCase()}</i><b>${m[0]}</b><strong>${m[1]}</strong><b>${m[2]}</b><span>${m[3]}</span><em class="${m[4]==="İzlendi"?"done":"watching"}">${m[4]}</em><button type="button" aria-label="Maç Detayı">›</button></div>`).join("")}
function karmaReportRows(limit=KARMA_REPORTS.length){return KARMA_REPORTS.slice(0,limit).map(r=>`<div class="karma-report-row"><i>${r[0]}</i><div><b>${r[1]}</b><small>${r[2]}</small></div><span>${r[3]}</span><time>${r[4]}</time><strong>${r[5]}</strong></div>`).join("")}
function karmaPanel(title,link,body,extra=""){const targets={"Tüm Videoları Gör":"videos","Tüm Kadroyu Gör":"squad","Tüm Maçları Gör":"matches","Tüm Raporları Gör":"reports"};return `<section class="karma-panel ${extra}"><header><h2>${title}</h2>${link?`<button type="button" data-karma-panel-target="${targets[link]||"overview"}">${link}</button>`:""}</header>${body}</section>`}
function karmaTabContent(){
 if(S.karmaTab==="squad")return karmaPanel("Karma Kadrosu","",`<div class="karma-squad-table full">${karmaSquadRows()}</div>`,"karma-wide");
 if(S.karmaTab==="videos")return karmaPanel("Videolar","",`<div class="karma-videos full">${karmaVideoCards()}</div>`,"karma-wide");
 if(S.karmaTab==="matches")return karmaPanel("Maçlar","",`<div class="karma-matches full">${karmaMatchRows()}</div>`,"karma-wide");
 if(S.karmaTab==="reports")return karmaPanel("Raporlar","",`<div class="karma-reports full">${karmaReportRows()}</div>`,"karma-wide");
 return `<div class="karma-dashboard">
   ${karmaPanel("Son Eklenen Videolar","Tüm Videoları Gör",`<div class="karma-videos">${karmaVideoCards(3)}</div>`,"karma-videos-panel")}
   ${karmaPanel("Karma Kadrosu","Tüm Kadroyu Gör",`<div class="karma-squad-table">${karmaSquadRows(5)}</div>`)}
   ${karmaPanel("Son İzlenen Maçlar","Tüm Maçları Gör",`<div class="karma-matches">${karmaMatchRows(3)}</div>`)}
   ${karmaPanel("Son Scout Raporları","Tüm Raporları Gör",`<div class="karma-reports">${karmaReportRows(3)}</div>`)}
  </div>`;
}
function karmaDetailPage(){
 const k=KARMA_DATA.find(x=>x.id===S.activeKarma)||KARMA_DATA[1];
 const tabs=[["overview","Genel Bakış"],["squad","Karma Kadrosu"],["videos","Videolar"],["matches","Maçlar"],["reports","Raporlar"]];
 return `<section class="karma-page karma-detail-page">
  <nav class="karma-breadcrumb"><button data-route="karmalar">Karmalar</button><span>/</span><b>${k.name}</b></nav>
  <header class="karma-detail-head"><div class="karma-detail-identity">${karmaBadge(k,"large")}<div><h1>${k.name} Karması</h1><p>${k.season} Sezonu <span>Aktif</span></p></div></div><button class="karma-primary" type="button" data-route="karma-video-new">＋ Yeni Video Ekle</button></header>
  <div class="karma-summary detail">${[["♧",24,"Karma Oyuncusu"],["▷",k.videos,"Video"],["▤",k.reports,"Scout Raporu"],["▣",12,"İzlenen Maç"]].map(x=>`<article><span>${x[0]}</span><div><strong>${x[1]}</strong><small>${x[2]}</small></div></article>`).join("")}</div>
  <div class="karma-tabs" role="tablist">${tabs.map(t=>`<button type="button" role="tab" aria-selected="${S.karmaTab===t[0]}" data-karma-tab="${t[0]}" class="${S.karmaTab===t[0]?"active":""}">${t[1]}</button>`).join("")}</div>
  ${karmaTabContent()}
 </section>`;
}

function escapeKarmaText(value){return String(value??"").replace(/[&<>"']/g,ch=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch]))}
function formatVideoSize(bytes){if(!Number.isFinite(bytes))return "—";const gb=bytes/1073741824;return gb>=1?`${gb.toFixed(2)} GB`:`${Math.max(1,Math.round(bytes/1048576))} MB`}
function karmaFileRows(){return S.karmaVideoFiles.map((f,i)=>`<div class="karma-simple-file"><i>▧</i><b title="${escapeKarmaText(f.name)}">${escapeKarmaText(f.name)}</b><span>${escapeKarmaText(f.size)}</span><strong>Hazır ✓</strong><button type="button" data-remove-video="${i}" aria-label="Dosya kaldır">×</button></div>`).join("")}
function karmaVideoForm(){
 const k=KARMA_DATA.find(x=>x.id===S.activeKarma)||KARMA_DATA[0];
 return `<section class="karma-page karma-simple-page">
  <nav class="karma-breadcrumb"><button data-route="karmalar">Karmalar</button><span>/</span><b>${k.name}</b></nav>
  <header class="karma-simple-head"><h1>Video Yükle</h1><p>Seçilen organizasyona video ekleyin.</p></header>
  <div class="karma-simple-org">${karmaBadge(k,"large")}<div><span>Organizasyon</span><h2>${k.name}</h2><p>${k.season} Sezonu · <b>${k.tag}</b></p></div></div>
  <form class="karma-simple-form" id="karmaVideoForm">
   <div class="karma-simple-fields">
    <label><span>Video Başlığı</span><input type="text" required placeholder="Video başlığını yazın..."></label>
    <label><span>Video Tarihi</span><input type="date" value="2026-08-14"></label>
   </div>
   <div class="karma-dropzone" id="karmaDropzone"><span>↥</span><b>Video dosyalarını buraya sürükleyin</b><p>Bir veya birden fazla video dosyası seçebilirsiniz.</p><button type="button" id="karmaVideoChoose">Dosya Seç</button><input id="karmaVideoInput" type="file" accept="video/*" multiple hidden></div>
   <div class="karma-simple-selected"><b>${S.karmaVideoFiles.length?`${S.karmaVideoFiles.length} video seçildi`:"Henüz video seçilmedi."}</b>${S.karmaVideoFiles.length?"":`<span>veya bilgisayarınızdan dosya seçin</span>`}</div>
   <div class="karma-simple-file-list">${karmaFileRows()}</div>
   <label class="karma-simple-description"><span>İsteğe bağlı açıklama</span><textarea placeholder="Video hakkında kısa bir açıklama ekleyin..."></textarea></label>
   <footer class="karma-simple-actions"><button type="button" class="karma-secondary" data-route="karmalar">Vazgeç</button><button type="submit" class="karma-primary">Videoyu Yükle</button></footer>
  </form>
 </section>`;
}

function generic(){return `<div class="content"><div class="page-head"><div><h1>${S.route.replaceAll("-"," ")}</h1><p>Bu ekran aynı ana tema ile geliştirilecek.</p></div></div><div class="panel"><div class="panel-body" style="padding:55px;text-align:center;color:#91a0b2">Hazırlanıyor</div></div></div>`}

function loginPage(){
 const light=S.theme==="light";
 return `<div class="login-page">
   <div class="login-bg-mark"></div>
   <div class="login-red-lines login-red-lines-left"></div>
   <div class="login-red-lines login-red-lines-right"></div>
   ${languageSwitch("login-lang")}
   <button class="login-theme" id="theme"><span class="${!light?"active":""}">☾ Dark</span><span class="${light?"active":""}">☀ Light</span></button>
   <section class="login-brand">
     <img src="assets/tff-logo.png" alt="TFF">
     <div class="login-tff">TFF</div>
     <h1>TÜRKİYE FUTBOL FEDERASYONU</h1>
     <div class="login-subtitle"><i></i>VİDEO ANALİZ VE GÖZLEM SİSTEMİ<i></i></div>
   </section>
   <section class="login-card">
     <h2>Hoş Geldiniz</h2>
     <p>Sisteme giriş yapmak için kullanıcı bilgilerinizi giriniz.</p>
     <label class="login-field"><span class="login-field-icon">♙</span><input id="loginUser" autocomplete="username" placeholder="Kullanıcı adı"></label>
     <label class="login-field"><span class="login-field-icon">▢</span><input id="loginPass" type="password" autocomplete="current-password" placeholder="Şifre"><button type="button" class="password-toggle" id="passwordToggle">◉</button></label>
     <div class="login-options"><label class="remember"><input id="rememberMe" type="checkbox"><span></span>Beni Hatırla</label><button type="button" class="forgot-btn">Şifremi Unuttum?</button></div>
     <button class="login-submit" id="loginSubmit">⇥ &nbsp; GİRİŞ YAP</button>
     <div class="login-error" id="loginError"></div>
     <div class="login-divider"><span></span><em>veya</em><span></span></div>
     <button class="demo-login" id="demoLogin"><span class="demo-shield">✧</span><span><b>Demo Giriş</b><small>Kullanıcı adı: <strong>demo</strong> &nbsp;•&nbsp; Şifre: <strong>demo</strong></small></span></button>
     <div class="login-copy">© 2026 Türkiye Futbol Federasyonu<br>Tüm hakları saklıdır.</div>
   </section>
 </div>`;
}



const PLAYER_DATA=[
 {name:"Kenan Yıldız",pos:"SLK",posLong:"Sol Kanat",age:21,club:"Juventus",country:"Türkiye",league:"Serie A",season:"2025/2026",foot:"Sağ",score:84,pas:84,sut:80,drb:88,hiz:86,def:55,fiz:75,mental:82,attack:87,tech:87,matches:35,starts:27,minutes:2380,goals:10,assists:8,value:"Demo",height:"186 cm",weight:"77 kg",contract:"Demo",img:"assets/player-kenan.jpg",fallback:"assets/report-kenan.jpg"},
 {name:"Arda Güler",pos:"MOO",posLong:"Merkez Ofansif Orta Saha",age:21,club:"Real Madrid",country:"Türkiye",league:"La Liga",season:"2025/2026",foot:"Sol",score:86,pas:91,sut:86,drb:89,hiz:82,def:51,fiz:67,mental:85,attack:88,tech:91,matches:37,starts:21,minutes:1842,goals:8,assists:10,value:"Demo",height:"175 cm",weight:"68 kg",contract:"Demo",img:"assets/player-arda.jpg",fallback:"assets/report-arda.jpg"},
 {name:"Barış Alper Yılmaz",pos:"SLK",posLong:"Sol Kanat / Forvet",age:26,club:"Galatasaray",country:"Türkiye",league:"Trendyol Süper Lig",season:"2025/2026",foot:"Sağ",score:81,pas:76,sut:79,drb:82,hiz:90,def:61,fiz:88,mental:80,attack:84,tech:79,matches:36,starts:29,minutes:2510,goals:12,assists:7,value:"Demo",height:"186 cm",weight:"80 kg",contract:"Demo",img:"assets/player-baris-alper.jpg",fallback:"assets/player-baris-alper.jpg"},
 {name:"Ferdi Kadıoğlu",pos:"SLB",posLong:"Sol Bek / Sağ Bek",age:26,club:"Brighton & Hove Albion",country:"Türkiye",league:"Premier League",season:"2025/2026",foot:"Sağ",score:83,pas:84,sut:72,drb:86,hiz:87,def:80,fiz:79,mental:84,attack:82,tech:85,matches:30,starts:25,minutes:2180,goals:3,assists:6,value:"Demo",height:"174 cm",weight:"68 kg",contract:"Demo",img:"assets/player-ferdi-kadioglu.jpg",fallback:"assets/player-ferdi-kadioglu.jpg"},
 {name:"Eren Elmalı",pos:"SLB",posLong:"Sol Bek",age:26,club:"Galatasaray",country:"Türkiye",league:"Trendyol Süper Lig",season:"2025/2026",foot:"Sol",score:78,pas:79,sut:66,drb:76,hiz:82,def:79,fiz:81,mental:79,attack:74,tech:78,matches:32,starts:26,minutes:2260,goals:1,assists:5,value:"Demo",height:"180 cm",weight:"74 kg",contract:"Demo",img:"assets/player-eren-elmali.jpg",fallback:"assets/player-eren-elmali.jpg"}
];

function playerFiltered(){
 const f=S.playerFilters;
 let list=PLAYER_DATA.map((p,i)=>({...p,_i:i}));
 if(S.playerFiltersApplied)list=list.filter(p=>{
  const country=!f.country||p.country===f.country;
  const league=!f.league||f.league==="Tümü"||p.league===f.league;
  const pos=!f.position||f.position==="Tümü"||p.pos===f.position||p.posLong.includes(f.position);
  const age=p.age>=Number(f.ageMin)&&p.age<=Number(f.ageMax);
  const foot=!f.foot||f.foot==="İki Ayak"||p.foot===f.foot;
  return country&&league&&pos&&age&&foot;
 });
 const money=v=>Number(String(v).replace(/[^\d.]/g,""))||0;
 if(S.playerSort==="age-asc")list.sort((a,b)=>a.age-b.age);
 else if(S.playerSort==="value-desc")list.sort((a,b)=>money(b.value)-money(a.value));
 else if(S.playerSort==="matches-desc")list.sort((a,b)=>b.matches-a.matches);
 else list.sort((a,b)=>b.score-a.score);
 return list;
}

function safeImg(p,cls=""){return `<img class="${cls}" src="${p.img}" onerror="this.onerror=null;this.src='${p.fallback}'" alt="${p.name}">`}
function radarPts(vals){return vals.map((v,i)=>{const a=(-90+i*60)*Math.PI/180,r=41*(v/100);return `${50+Math.cos(a)*r},${50+Math.sin(a)*r}`}).join(" ")}

function playerCardExact(p){
 const selected=S.selectedPlayers.includes(p._i),active=S.activePlayer===p._i;
 return `<article class="fp-card ${selected?"selected":""} ${active?"active":""}">
   <button class="fp-card-open" data-open-player="${p._i}">
    <div class="fp-card-title"><b>${p.name}</b><span>★</span></div>
    <div class="fp-card-stage">
      <div class="fp-card-rating"><strong>${p.score}</strong><small>Genel Puan</small></div>
      ${safeImg(p,"fp-card-photo")}
    </div>
    <div class="fp-card-info"><span>${p.pos} | ${p.age} Yaş</span><b>${p.club}</b><small>🇹🇷 Türkiye</small></div>
   </button>
   <button class="fp-card-compare ${selected?"active":""}" data-compare-player="${p._i}">${selected?"✓ Karşılaştırıldı ✓":"Karşılaştır   ＋"}</button>
 </article>`;
}

function playerAnalysisExact(p){
 const activeId=PLAYER_DATA.indexOf(p);
 const otherId=S.selectedPlayers.find(id=>id!==activeId) ?? 4;
 const c=PLAYER_DATA[otherId]||PLAYER_DATA[4];
 const league=[72,64,66,71,49,58];
 const pVals=[p.pas,p.sut,p.drb,p.def,p.fiz,p.tech];
 const cVals=[c.pas,c.sut,c.drb,c.def,c.fiz,c.tech];
 const perf=[
  ["Maç Sayısı",p.matches,c.matches,40],["İlk 11",p.starts,c.starts,30],["Dakika",p.minutes,c.minutes,2500],["Goller",p.goals,c.goals,12],["Asistler",p.assists,c.assists,12],["Şut / Maç",2.1,2.3,3],["Pas Başarısı %",89,85,100],["Anahtar Pas / Maç",1.8,1.6,3],["Dribbling Başarısı %",63,61,100],["Top Kazanma / Maç",4.1,4.7,6]
 ];
 return `<section class="fp-analysis">
   <div class="fp-profile">
    <div class="fp-profile-photo">${safeImg(p)}</div>
    <div class="fp-profile-copy"><h2>${p.name} <span>★</span></h2><p>${p.club}</p><b>${p.posLong}</b></div>
    <dl><dt>Yaş</dt><dd>${p.age} (25.02.2005)</dd><dt>Boy</dt><dd>${p.height}</dd><dt>Ayak</dt><dd>${p.foot}</dd><dt>Piyasa Değeri</dt><dd>${p.value}</dd><dt>Sözleşme Bitiş</dt><dd>${p.contract}</dd><dt>Milli Takım</dt><dd>Türkiye A Milli</dd><dt>Maç Sayısı</dt><dd>${p.matches}</dd><dt>Goller / Asistler</dt><dd>${p.goals} / ${p.assists}</dd></dl>
   </div>
   <div class="fp-radar-panel">
    <div class="fp-panel-head"><h3>YETENEK ANALİZİ (KARŞILAŞTIRMA)</h3></div>
    <div class="fp-legend"><span><i class="red"></i>${p.name}</span><span><i class="blue"></i>${c.name}</span><span><i class="gray"></i>Lig Ortalaması</span></div>
    <div class="fp-radar-wrap">
      <svg viewBox="0 0 100 100"><polygon class="grid" points="50,6 88,28 88,72 50,94 12,72 12,28"/><polygon class="grid inner" points="50,18 78,34 78,66 50,82 22,66 22,34"/><polygon class="grid inner2" points="50,31 67,40 67,60 50,69 33,60 33,40"/><line x1="50" y1="6" x2="50" y2="94"/><line x1="12" y1="28" x2="88" y2="72"/><line x1="88" y1="28" x2="12" y2="72"/><polygon class="poly league" points="${radarPts(league)}"/><polygon class="poly compare" points="${radarPts(cVals)}"/><polygon class="poly main" points="${radarPts(pVals)}"/></svg>
      <span class="rl top">Pas<br><b>${p.pas}</b><em>${c.pas}</em></span><span class="rl rt">Şut<br><b>${p.sut}</b><em>${c.sut}</em></span><span class="rl rb">Dribbling<br><b>${p.drb}</b><em>${c.drb}</em></span><span class="rl bottom">Savunma<br><b>${p.def}</b><em>${c.def}</em></span><span class="rl lb">Fiziksel<br><b>${p.fiz}</b><em>${c.fiz}</em></span><span class="rl lt">Teknik<br><b>${p.tech}</b><em>${c.tech}</em></span>
    </div>
    <button class="fp-ghost-btn">⌁ Detaylı Analiz</button>
   </div>
   <div class="fp-performance">
    <div class="fp-panel-head"><h3>PERFORMANS ÖZETİ</h3></div><div class="fp-perf-names"><span>${p.name}</span><span>${c.name}</span></div>
    ${perf.map(([n,a,b,m])=>`<div class="fp-perf-row"><span>${n}</span><b>${a}</b><i><em style="width:${Math.min(100,a/m*100)}%"></em></i><i><em class="blue" style="width:${Math.min(100,b/m*100)}%"></em></i><strong>${b}</strong></div>`).join("")}
    <button class="fp-ghost-btn">Tüm İstatistikler ↗</button>
   </div>
   <div class="fp-heat-panel">
    <div class="fp-panel-head"><h3>POZİSYON ISI HARİTASI</h3></div><div class="fp-heat-tabs"><button class="active">${p.name}</button><button>${c.name}</button></div>
    <div class="fp-heat"><div class="mid"></div><div class="circle"></div><div class="box l"></div><div class="box r"></div>${[[20,48],[31,58],[43,47],[53,57],[61,38],[68,62],[76,48],[83,33],[87,58],[91,44]].map(([x,y])=>`<i style="left:${x}%;top:${y}%"></i>`).join("")}</div>
    <button class="fp-ghost-btn">▣ Son 10 Maç⌄</button>
   </div>
 </section>`;
}

function compareExact(){
 const ids=S.selectedPlayers.slice(0,2),a=PLAYER_DATA[ids[0]??0],b=PLAYER_DATA[ids[1]??4];
 const rows=[["Genel Puan",a.score,b.score,63],["Yaş",a.age,b.age,"21.6"],["Boy (cm)",parseInt(a.height),parseInt(b.height),182],["Piyasa Değeri",a.value,b.value,"8.20M €"],["Maç Sayısı",a.matches,b.matches,28],["Goller",a.goals,b.goals,4],["Asistler",a.assists,b.assists,5],["Pas Başarısı %",a.pas+"%",b.pas+"%","78%"]];
 const bars=[["Pas",a.pas,b.pas,72],["Şut",a.sut,b.sut,64],["Dribbling",a.drb,b.drb,66],["Hız",a.hiz,b.hiz,71],["Savunma",a.def,b.def,49],["Fiziksel",a.fiz,b.fiz,58]];
 return `<section class="fp-compare-section"><div class="fp-table"><h3>OYUNCU KARŞILAŞTIRMA</h3><div class="fp-table-head"><span>Özellik</span><b>${a.name}</b><b>${b.name}</b><b>Lig Ortalaması</b></div>${rows.map(r=>`<div class="fp-table-row"><span>${r[0]}</span><b>${r[1]}</b><b>${r[2]}</b><b>${r[3]}</b></div>`).join("")}</div><div class="fp-chart"><div class="fp-panel-head"><h3>İSTATİSTİK KARŞILAŞTIRMASI</h3><div class="fp-legend"><span><i class="red"></i>${a.name}</span><span><i class="blue"></i>${b.name}</span><span><i class="gray"></i>Lig Ortalaması</span></div></div><div class="fp-bars">${bars.map(([n,x,y,z])=>`<div class="fp-bar-col"><div class="fp-bar-values"><small>${x}</small><small>${y}</small><small>${z}</small></div><div class="fp-bar-stack"><b style="height:${x}%"></b><em style="height:${y}%"></em><i style="height:${z}%"></i></div><span>${n}</span></div>`).join("")}</div></div></section>`;
}

function activeFilterChips(){
 const f=S.playerFilters,arr=[];
 if(f.country)arr.push(["country",f.country]); if(S.playerAgeChip!==false)arr.push(["age",`${f.ageMin} - ${f.ageMax}`]); if(f.foot&&f.foot!=="İki Ayak")arr.push(["foot",`${f.foot} Ayak`]); if(f.position&&f.position!=="Tümü")arr.push(["position",f.position]);
 return `<div class="fp-pills">${arr.map(([k,v])=>`<button data-clear-filter="${k}">${v} ×</button>`).join("")}<button class="clear" id="psClearInline">Tümünü Temizle</button></div>`;
}

function reportModalV5(){
 if(!S.reportModal)return "";const p=PLAYER_DATA[S.activePlayer]||PLAYER_DATA[0];return `<div class="fp-modal-bg" id="reportBackdrop"><section class="fp-modal"><div class="fp-modal-head"><div><small>YENİ RAPOR</small><h2>${p.name}</h2></div><button id="reportClose">×</button></div><label>Rapor Türü<select><option>Gözlem Raporu</option><option>Maç Raporu</option></select></label><label>Genel Değerlendirme<textarea placeholder="Oyuncu hakkında kısa değerlendirme..."></textarea></label><div class="fp-modal-actions"><button id="reportCancel">Vazgeç</button><button class="primary" id="reportSave">Raporu Oluştur</button></div></section></div>`;
}

function playerSearchPageLegacy(){
 const f=S.playerFilters,list=playerFiltered(),active=PLAYER_DATA[S.activePlayer]||PLAYER_DATA[0];
 return `<div class="fp-page">
   <div class="fp-layout">
    <aside class="fp-filters"><div class="fp-filter-head"><b>FİLTRELER</b><button id="psClear">Temizle</button></div><label><span>Ülke</span><select id="psCountry"><option value="" ${!f.country?"selected":""}>Tüm Ülkeler</option><option value="Türkiye" ${f.country==="Türkiye"?"selected":""}>🇹🇷 Türkiye</option></select></label><label><span>Lig</span><select id="psLeague"><option ${f.league==="Tümü"?"selected":""}>Tümü</option><option ${f.league==="Trendyol Süper Lig"?"selected":""}>Trendyol Süper Lig</option><option ${f.league==="La Liga"?"selected":""}>La Liga</option><option ${f.league==="Serie A"?"selected":""}>Serie A</option><option ${f.league==="Primeira Liga"?"selected":""}>Primeira Liga</option></select></label><div class="fp-range"><span>Yaş</span><div><b>${f.ageMin}</b><b>${f.ageMax}</b></div><input id="ageMin" type="range" min="18" max="23" value="${f.ageMin}"><input id="ageMax" type="range" min="18" max="23" value="${f.ageMax}"></div><label><span>Pozisyon</span><select id="psPosition"><option value="Tümü">Tümü</option><option value="Merkez Orta Saha" ${f.position==="Merkez Orta Saha"?"selected":""}>Merkez Orta Saha</option><option value="MDO" ${f.position==="MDO"?"selected":""}>MDO</option><option value="Stoper" ${f.position==="Stoper"?"selected":""}>Stoper</option><option value="Sol Kanat" ${f.position==="Sol Kanat"?"selected":""}>Sol Kanat</option></select></label><div class="fp-feet"><span>Ayak</span><div>${["Sol","Sağ","İki Ayak"].map(x=>`<button data-foot="${x}" class="${f.foot===x?"active":""}">${x==="İki Ayak"?"Her İkisi":x}</button>`).join("")}</div></div><div class="fp-range"><span>Boy (cm)</span><div><b>160</b><b>200</b></div><input type="range" min="160" max="200" value="160"><input type="range" min="160" max="200" value="200"></div><div class="fp-range"><span>Piyasa Değeri</span><div><b>0 €</b><b>20M €</b></div><input type="range" min="0" max="20" value="0"><input type="range" min="0" max="20" value="20"></div><label><span>Maç Sayısı</span><select><option>Tümü</option></select></label><label><span>Sözleşme Bitiş</span><select><option>Tümü</option></select></label><label><span>Kulüp</span><select><option>Tüm Kulüpler</option></select></label><button class="fp-search-btn" id="psFilter">⌕ Ara</button></aside>
    <main class="fp-main"><div class="fp-cards">${list.map(playerCardExact).join("")}</div>${playerAnalysisExact(active)}${compareExact()}</main>
   </div>${reportModalV5()}
  </div>`;
}

function selectedPlayerChips(){
 const ids=S.selectedPlayers.slice(0,2);
 return `<div class="sc-header-chips">${ids.map((id,i)=>`<span><i>${i+1}</i>${PLAYER_DATA[id]?.name||"Oyuncu seçilmedi"}</span>`).join("")}</div>`;
}

function simplePlayerCard(p,side){
 return `<article class="sc-player-card ${side}">
   <div class="sc-player-photo">${safeImg(p)}</div>
   <div class="sc-player-main">
     <div class="sc-player-name"><div><small>${side==="left"?"1. OYUNCU":"2. OYUNCU"}</small><h2>${p.name}</h2><p>${p.club} · ${p.posLong}</p></div><strong>${p.score}<span>Genel Puan</span></strong></div>
     <div class="sc-player-facts"><span><small>Yaş</small><b>${p.age}</b></span><span><small>Boy</small><b>${p.height}</b></span><span><small>Ayak</small><b>${p.foot}</b></span><span><small>Piyasa Değeri</small><b>${p.value}</b></span></div>
   </div>
 </article>`;
}

function simpleSkillsPanel(a,b){
 const league=[72,64,66,49,58,70],av=[a.pas,a.sut,a.drb,a.def,a.fiz,a.tech],bv=[b.pas,b.sut,b.drb,b.def,b.fiz,b.tech];
 const metrics=[["Pas",a.pas,b.pas],["Şut",a.sut,b.sut],["Dribbling",a.drb,b.drb],["Hız",a.hiz,b.hiz],["Savunma",a.def,b.def],["Fiziksel",a.fiz,b.fiz]];
 return `<div class="sc-skill-layout"><div class="sc-radar">
   <div class="sc-legend"><span><i class="red"></i>${a.name}</span><span><i class="blue"></i>${b.name}</span><span><i class="gray"></i>Lig Ortalaması</span></div>
   <div class="sc-radar-canvas"><svg viewBox="0 0 100 100"><polygon class="grid" points="50,6 88,28 88,72 50,94 12,72 12,28"/><polygon class="grid inner" points="50,18 78,34 78,66 50,82 22,66 22,34"/><polygon class="grid inner" points="50,31 67,40 67,60 50,69 33,60 33,40"/><line x1="50" y1="6" x2="50" y2="94"/><line x1="12" y1="28" x2="88" y2="72"/><line x1="88" y1="28" x2="12" y2="72"/><polygon class="league" points="${radarPts(league)}"/><polygon class="second" points="${radarPts(bv)}"/><polygon class="first" points="${radarPts(av)}"/></svg><span class="top">Pas</span><span class="rt">Şut</span><span class="rb">Dribbling</span><span class="bottom">Savunma</span><span class="lb">Fiziksel</span><span class="lt">Teknik</span></div>
 </div><div class="sc-metrics">${metrics.map(([name,x,y])=>`<div class="sc-metric"><div><b>${name}</b><span>${x} <em>${y}</em></span></div><div class="sc-dual-bar"><i style="width:${x}%"></i><i class="blue" style="width:${y}%"></i></div></div>`).join("")}</div></div>`;
}

function simplePerformancePanel(a,b){
 const rows=[["Maç Sayısı",a.matches,b.matches],["İlk 11",a.starts,b.starts],["Dakika",a.minutes.toLocaleString("tr-TR"),b.minutes.toLocaleString("tr-TR")],["Gol",a.goals,b.goals],["Asist",a.assists,b.assists],["Pas Başarısı",a.pas+"%",b.pas+"%"],["Sözleşme Bitiş",a.contract,b.contract]];
 return `<div class="sc-performance"><div class="sc-perf-head"><b>${a.name}</b><span>PERFORMANS</span><b>${b.name}</b></div>${rows.map(r=>`<div class="sc-perf-row"><strong>${r[1]}</strong><span>${r[0]}</span><strong>${r[2]}</strong></div>`).join("")}</div>`;
}

function simpleHeat(p,variant){
 const dots=variant==="left"?[[22,46],[34,58],[47,49],[58,63],[69,40],[80,55]]:[[18,55],[31,43],[45,61],[57,48],[72,58],[84,37]];
 return `<div class="sc-heat-wrap"><h3>${p.name}</h3><div class="sc-heat"><div class="mid"></div><div class="circle"></div><div class="box l"></div><div class="box r"></div>${dots.map(([x,y])=>`<i style="left:${x}%;top:${y}%"></i>`).join("")}</div><small>Son 10 maç · Hücum yönü →</small></div>`;
}

function simpleCompareContent(a,b){
 if(S.compareTab==="performance")return simplePerformancePanel(a,b);
 if(S.compareTab==="heat")return `<div class="sc-heat-grid">${simpleHeat(a,"left")}${simpleHeat(b,"right")}</div>`;
 return simpleSkillsPanel(a,b);
}

function playerSearchPage(){
 const ids=S.selectedPlayers.slice(0,2),a=PLAYER_DATA[ids[0]??0],b=PLAYER_DATA[ids[1]??4];
 const options=id=>PLAYER_DATA.map((p,i)=>`<option value="${i}" ${i===id?"selected":""}>${p.name} — ${p.club}</option>`).join("");
 return `<div class="sc-page">
   <section class="sc-selector"><div><small>OYUNCU KARŞILAŞTIRMA</small><h1>İki futbolcu seçin</h1></div><label><span>1. Oyuncu</span><select id="playerOneSelect">${options(ids[0]??0)}</select></label><button id="swapPlayers" class="sc-swap" aria-label="Oyuncuların yerini değiştir">⇄</button><label><span>2. Oyuncu</span><select id="playerTwoSelect">${options(ids[1]??1)}</select></label><button id="applyCompare" class="sc-primary">Karşılaştır</button></section>
   <section class="sc-selected-only">${simplePlayerCard(a,"left")}<div class="sc-vs">VS</div>${simplePlayerCard(b,"right")}</section>
   <section class="sc-quick-compare"><div><strong>${a.score}</strong><span>Genel Puan</span><strong>${b.score}</strong></div><div><strong>${a.matches}</strong><span>Maç</span><strong>${b.matches}</strong></div><div><strong>${a.goals} / ${a.assists}</strong><span>Gol / Asist</span><strong>${b.goals} / ${b.assists}</strong></div><div><strong>${a.value}</strong><span>Piyasa Değeri</span><strong>${b.value}</strong></div></section>
   <section class="sc-analysis-card"><div class="sc-analysis-head"><div><small>KARŞILAŞTIRMA</small><h2>Oyuncu Analizi</h2></div><div class="sc-tabs"><button data-compare-tab="skills" class="${S.compareTab==="skills"?"active":""}">Yetenek Analizi</button><button data-compare-tab="performance" class="${S.compareTab==="performance"?"active":""}">Performans</button><button data-compare-tab="heat" class="${S.compareTab==="heat"?"active":""}">Isı Haritası</button></div></div>${simpleCompareContent(a,b)}</section>
   ${reportModalV5()}
 </div>`;
}

function page(){if(S.route==="login")return loginPage();if(S.route==="home")return home();if(S.route==="milli-takimlar")return milli();if(S.route==="team-a-milli")return teamDetail();if(S.route==="karmalar")return karmalarPage();if(S.route==="karma-detail")return karmaDetailPage();if(S.route==="karma-video-new")return karmaVideoForm();if(S.route==="futbolcu-ara")return playerSearchPage();return generic()}
function render(){if(S.route==="login"){if(location.hash!=="#/login")history.replaceState(null,"","#/login");document.getElementById("app").innerHTML=loginPage()}else{document.getElementById("app").innerHTML=`<div class="app-frame route-${S.route}">${topbar()}<div class="shell ${S.sidebarCollapsed?"sidebar-collapsed":""}">${sidebar()}<main class="main">${page()}</main></div></div>`}applyLanguage();bind()}
function bind(){
 document.querySelectorAll("[data-route]").forEach(e=>e.addEventListener("click",()=>go(e.dataset.route)));
 document.querySelectorAll("[data-karma-category]").forEach(e=>e.addEventListener("click",()=>{S.karmaCategory=e.dataset.karmaCategory;render()}));
 document.querySelectorAll("[data-open-karma]").forEach(e=>{
   const openKarma=()=>{S.activeKarma=e.dataset.openKarma;S.karmaVideoFiles=[];go("karma-video-new")};
   e.addEventListener("click",openKarma);
   e.addEventListener("keydown",event=>{if(event.key==="Enter"||event.key===" "){event.preventDefault();openKarma()}});
 });
 document.querySelectorAll("[data-karma-tab]").forEach(e=>e.addEventListener("click",()=>{S.karmaTab=e.dataset.karmaTab;render()}));
 document.querySelectorAll("[data-karma-view]").forEach(e=>e.addEventListener("click",()=>{S.karmaView=e.dataset.karmaView;render()}));
 document.querySelectorAll("[data-karma-panel-target]").forEach(e=>e.addEventListener("click",()=>{S.karmaTab=e.dataset.karmaPanelTarget;render()}));
 document.querySelectorAll("[data-karma-play]").forEach(e=>e.addEventListener("click",()=>alert(S.lang==="en"?`Demo video opened: ${e.dataset.karmaPlay}`:`Demo video açıldı: ${e.dataset.karmaPlay}`)));
 const karmaSearch=document.getElementById("karmaSearch");
 if(karmaSearch)karmaSearch.addEventListener("input",()=>{
   const query=karmaSearch.value.toLocaleLowerCase("tr-TR").trim();let visible=0;
   document.querySelectorAll("[data-karma-card]").forEach(card=>{const show=!query||(card.dataset.karmaSearchtext||"").toLocaleLowerCase("tr-TR").includes(query);card.hidden=!show;if(show)visible++});
   const empty=document.getElementById("karmaEmpty");if(empty)empty.hidden=visible!==0;
 });
 const setKarmaVideoFiles=files=>{S.karmaVideoFiles=[...files].filter(f=>!f.type||f.type.startsWith("video/")).map(f=>({name:f.name,size:formatVideoSize(f.size)}));render()};
 const karmaVideoInput=document.getElementById("karmaVideoInput"),karmaVideoChoose=document.getElementById("karmaVideoChoose"),karmaDropzone=document.getElementById("karmaDropzone");
 if(karmaVideoChoose&&karmaVideoInput)karmaVideoChoose.addEventListener("click",()=>karmaVideoInput.click());
 if(karmaVideoInput)karmaVideoInput.addEventListener("change",()=>setKarmaVideoFiles(karmaVideoInput.files));
 if(karmaDropzone){
   ["dragenter","dragover"].forEach(type=>karmaDropzone.addEventListener(type,e=>{e.preventDefault();karmaDropzone.classList.add("is-dragging")}));
   ["dragleave","drop"].forEach(type=>karmaDropzone.addEventListener(type,e=>{e.preventDefault();karmaDropzone.classList.remove("is-dragging")}));
   karmaDropzone.addEventListener("drop",e=>setKarmaVideoFiles(e.dataTransfer.files));
 }
 document.querySelectorAll("[data-remove-video]").forEach(e=>e.addEventListener("click",()=>{S.karmaVideoFiles.splice(Number(e.dataset.removeVideo),1);render()}));
 document.querySelectorAll("[data-video-tag]").forEach(e=>e.addEventListener("change",()=>{const file=S.karmaVideoFiles[Number(e.dataset.videoTag)];if(file)file.tag=e.value}));
 const karmaDraft=document.getElementById("karmaDraft");if(karmaDraft)karmaDraft.addEventListener("click",()=>alert(S.lang==="en"?"Draft saved.":"Taslak kaydedildi."));
 const karmaVideoFormEl=document.getElementById("karmaVideoForm");if(karmaVideoFormEl)karmaVideoFormEl.addEventListener("submit",e=>{e.preventDefault();if(!S.karmaVideoFiles.length){alert(S.lang==="en"?"Please select at least one video file.":"Lütfen en az bir video dosyası seçin.");return}alert(S.lang==="en"?"Videos uploaded successfully.":"Videolar başarıyla yüklendi.");S.karmaVideoFiles=[];go("karmalar")});
 document.querySelectorAll("[data-teamtab]").forEach(e=>e.addEventListener("click",()=>{S.teamTab=e.dataset.teamtab;render()}));
 document.querySelectorAll("[data-squad-filter]").forEach(e=>e.addEventListener("click",()=>{S.squadFilter=e.dataset.squadFilter;S.expandedSquadPlayer="";render()}));
 document.querySelectorAll("[data-squad-expand]").forEach(e=>e.addEventListener("click",()=>{S.expandedSquadPlayer=S.expandedSquadPlayer===e.dataset.squadExpand?"":e.dataset.squadExpand;render()}));
 const squadSearch=document.getElementById("squadSearch");
 if(squadSearch)squadSearch.addEventListener("input",()=>{
   const query=squadSearch.value.toLocaleLowerCase("tr-TR").trim();let visibleCount=0;
   document.querySelectorAll(".squad-v2-group").forEach(group=>{
     let groupCount=0;
     group.querySelectorAll(".squad-v2-player").forEach(player=>{const show=!query||(player.dataset.squadSearchtext||"").toLocaleLowerCase("tr-TR").includes(query);player.hidden=!show;if(show){groupCount++;visibleCount++}});
     group.hidden=groupCount===0;
   });
   const empty=document.getElementById("squadEmpty");if(empty)empty.hidden=visibleCount!==0;
 });
 document.querySelectorAll("[data-group-toggle]").forEach(e=>e.addEventListener("click",()=>{
   const g=e.dataset.groupToggle;
   S.openMenuGroup=S.openMenuGroup===g?"":g;
   localStorage.setItem("tff-sidebar-group",S.openMenuGroup);
   if(S.sidebarCollapsed && S.openMenuGroup){
     S.sidebarCollapsed=false;
     localStorage.setItem("tff-sidebar-collapsed","0");
   }
   render();
 }));
 const c=document.getElementById("sideCollapse");
 if(c)c.addEventListener("click",()=>{
   S.sidebarCollapsed=!S.sidebarCollapsed;
   localStorage.setItem("tff-sidebar-collapsed",S.sidebarCollapsed?"1":"0");
   render();
 });
 const t=document.getElementById("theme");
 if(t)t.addEventListener("click",()=>{
   S.theme=S.theme==="dark"?"light":"dark";
   localStorage.setItem("tff-theme",S.theme);
   document.body.classList.toggle("light",S.theme==="light");
   render();
 });
 const langToggle=document.getElementById("langToggle");
 if(langToggle)langToggle.addEventListener("click",()=>{
   S.lang=S.lang==="tr"?"en":"tr";
   localStorage.setItem("tff-language",S.lang);
   render();
 });
 const pw=document.getElementById("passwordToggle");
 if(pw)pw.addEventListener("click",()=>{const input=document.getElementById("loginPass");input.type=input.type==="password"?"text":"password";pw.textContent=input.type==="password"?"◉":"⊘"});
 const doLogin=(demo=false)=>{const u=document.getElementById("loginUser");const p=document.getElementById("loginPass");const err=document.getElementById("loginError");const user=demo?"demo":(u?.value||"").trim();const pass=demo?"demo":(p?.value||"");if(user==="demo"&&pass==="demo"){sessionStorage.setItem("tff-demo-auth","1");location.hash="#/home";return}if(err)err.textContent=S.lang==="en"?"Demo access username and password: demo":"Demo erişim için kullanıcı adı ve şifre: demo"};
 const submit=document.getElementById("loginSubmit");if(submit)submit.addEventListener("click",()=>doLogin(false));
 const demo=document.getElementById("demoLogin");if(demo)demo.addEventListener("click",()=>doLogin(true));
 const passInput=document.getElementById("loginPass");if(passInput)passInput.addEventListener("keydown",e=>{if(e.key==="Enter")doLogin(false)});


 const psLeague=document.getElementById("psLeague"),psSeason=document.getElementById("psSeason"),psCountry=document.getElementById("psCountry"),psCategory=document.getElementById("psCategory"),psPosition=document.getElementById("psPosition");
 const ageMin=document.getElementById("ageMin"),ageMax=document.getElementById("ageMax");
 const resetFilters=()=>{S.playerFilters={country:"",league:"Tümü",season:"2025/2026",position:"Tümü",ageMin:18,ageMax:23,foot:"İki Ayak",category:"Tümü"};S.playerFiltersApplied=false;S.playerAgeChip=false;render()};
 document.querySelectorAll("[data-pos]").forEach(b=>b.addEventListener("click",()=>{S.playerFilters.position=S.playerFilters.position===b.dataset.pos?"Tümü":b.dataset.pos;render()}));
 document.querySelectorAll("[data-foot]").forEach(b=>b.addEventListener("click",()=>{S.playerFilters.foot=b.dataset.foot;render()}));
 if(psLeague)psLeague.addEventListener("change",()=>{S.playerFilters.league=psLeague.value;render()});
 if(psSeason)psSeason.addEventListener("change",()=>{S.playerFilters.season=psSeason.value;render()});
 if(psCountry)psCountry.addEventListener("change",()=>{S.playerFilters.country=psCountry.value;render()});
 if(psCategory)psCategory.addEventListener("change",()=>{S.playerFilters.category=psCategory.value;render()});
 if(psPosition)psPosition.addEventListener("change",()=>{S.playerFilters.position=psPosition.value;render()});
 if(ageMin)ageMin.addEventListener("change",()=>{S.playerFilters.ageMin=Math.min(+ageMin.value,+ageMax.value);S.playerAgeChip=true;render()});
 if(ageMax)ageMax.addEventListener("change",()=>{S.playerFilters.ageMax=Math.max(+ageMax.value,+ageMin.value);S.playerAgeChip=true;render()});
 const psFilter=document.getElementById("psFilter");if(psFilter)psFilter.addEventListener("click",()=>{S.playerFiltersApplied=true;render()});
 const psClear=document.getElementById("psClear");if(psClear)psClear.addEventListener("click",resetFilters);
 const psClearInline=document.getElementById("psClearInline");if(psClearInline)psClearInline.addEventListener("click",resetFilters);
 document.querySelectorAll("[data-clear-filter]").forEach(b=>b.addEventListener("click",()=>{
   const k=b.dataset.clearFilter;
   if(k==="country")S.playerFilters.country="";
   if(k==="league")S.playerFilters.league="Tümü";
   if(k==="position")S.playerFilters.position="Tümü";
   if(k==="foot")S.playerFilters.foot="İki Ayak";
   if(k==="age"){S.playerFilters.ageMin=18;S.playerFilters.ageMax=23;S.playerAgeChip=false}
   if(k==="category")S.playerFilters.category="Tümü";
   render();
 }));
 document.querySelectorAll("[data-open-player]").forEach(btn=>btn.addEventListener("click",()=>{S.activePlayer=+btn.dataset.openPlayer;render()}));
 document.querySelectorAll("[data-compare-player]").forEach(btn=>btn.addEventListener("click",e=>{
   e.stopPropagation();const id=+btn.dataset.comparePlayer;
   if(S.selectedPlayers.includes(id))S.selectedPlayers=S.selectedPlayers.filter(x=>x!==id);
   else S.selectedPlayers=[...S.selectedPlayers,id].slice(-2);
   if(S.selectedPlayers.length<2){const fallback=PLAYER_DATA.findIndex((_,i)=>i!==id&&!S.selectedPlayers.includes(i));if(fallback>=0)S.selectedPlayers.push(fallback)}
   render();
 }));
 const playerOneSelect=document.getElementById("playerOneSelect"),playerTwoSelect=document.getElementById("playerTwoSelect");
 const setComparedPlayer=(slot,value)=>{
   const next=Number(value),other=S.selectedPlayers[slot===0?1:0];
   if(next===other){S.selectedPlayers[slot===0?1:0]=S.selectedPlayers[slot]}
   S.selectedPlayers[slot]=next;
   S.activePlayer=S.selectedPlayers[0];
   render();
 };
 if(playerOneSelect)playerOneSelect.addEventListener("change",()=>setComparedPlayer(0,playerOneSelect.value));
 if(playerTwoSelect)playerTwoSelect.addEventListener("change",()=>setComparedPlayer(1,playerTwoSelect.value));
 const swapPlayers=document.getElementById("swapPlayers");if(swapPlayers)swapPlayers.addEventListener("click",()=>{S.selectedPlayers=[S.selectedPlayers[1],S.selectedPlayers[0]];S.activePlayer=S.selectedPlayers[0];render()});
 const applyCompare=document.getElementById("applyCompare");if(applyCompare)applyCompare.addEventListener("click",()=>document.querySelector(".sc-selected-only")?.scrollIntoView({behavior:"smooth",block:"start"}));
 document.querySelectorAll("[data-compare-tab]").forEach(button=>button.addEventListener("click",()=>{S.compareTab=button.dataset.compareTab;render()}));
 const psSort=document.getElementById("psSort");if(psSort)psSort.addEventListener("change",()=>{S.playerSort=psSort.value;render()});
 const psSearch=document.getElementById("psSearch");if(psSearch)psSearch.addEventListener("input",()=>{const q=psSearch.value.toLocaleLowerCase("tr-TR");document.querySelectorAll(".fp-card").forEach(c=>{const id=+(c.querySelector("[data-open-player]")?.dataset.openPlayer??-1);const p=PLAYER_DATA[id];c.hidden=!p||!(p.name+" "+p.club+" "+p.league).toLocaleLowerCase("tr-TR").includes(q)})});
 const scrollCompare=document.getElementById("scrollCompare");if(scrollCompare)scrollCompare.addEventListener("click",()=>document.getElementById("compareSection")?.scrollIntoView({behavior:"smooth",block:"start"}));
 const reportOpen=document.getElementById("reportOpen");if(reportOpen)reportOpen.addEventListener("click",()=>{S.reportModal=true;render()});
 const closeReport=()=>{S.reportModal=false;render()};
 ["reportClose","reportCancel"].forEach(id=>{const e=document.getElementById(id);if(e)e.addEventListener("click",closeReport)});
 const reportBackdrop=document.getElementById("reportBackdrop");if(reportBackdrop)reportBackdrop.addEventListener("click",e=>{if(e.target===reportBackdrop)closeReport()});
 const reportSave=document.getElementById("reportSave");if(reportSave)reportSave.addEventListener("click",()=>{S.reportModal=false;render();setTimeout(()=>alert(S.lang==="en"?"Demo report created.":"Demo raporu oluşturuldu."),0)});
 const profileToggle=document.getElementById("profileToggle");
 if(profileToggle)profileToggle.addEventListener("click",e=>{
   e.stopPropagation();
   S.profileMenu=!S.profileMenu;
   render();
 });

 const logoutBtn=document.getElementById("logoutBtn");
 if(logoutBtn)logoutBtn.addEventListener("click",()=>{
   sessionStorage.removeItem("tff-demo-auth");
   localStorage.removeItem("tff-remember-demo");
   S.profileMenu=false;
   S.route="login";
   history.replaceState(null,"","#/login");
   render();
 });

 if(S.profileMenu){
   document.addEventListener("click",e=>{
     if(!e.target.closest(".profile-wrap")){
       S.profileMenu=false;
       render();
     }
   },{once:true});
 }
}
render();
