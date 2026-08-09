
const D=window.DATA||{};
const navGroups=[
["MİLLİ TAKIMLAR",[["milli-takimlar","◉","Milli Takımlar"],["karmalar","♧","Karmalar"],["rakipler","♧","Rakipler"]]],
["OYUNCU & KULÜP",[["futbolcularim","♙","Futbolcularım"],["populer","☆","Popüler Oyuncular"],["kulupler","▣","Kulüpler"]]],
["ANALİZ & RAPORLAR",[["video","▣","Maç & Video Analiz"],["istatistik","▥","İstatistikler"],["raporlar","▤","Oyuncu Raporları"],["videolar","◉","Güncel Videolar"],["esame","▤","Esame Raporu"],["mac-raporlari","▤","Maç Raporları"],["gelisim-raporlari","▤","Gelişim Ligi Raporları"]]],
["GELİŞİM",[["antrenman","≋","Antrenman Planları"],["kulup-gelisim","◍","Kulüp Gelişim"],["eslestirme","◎","Oyuncu Eşleştirme"],["teknik","⚒","Teknik Testler"],["sakatlik","♧","Sakatlıklar"]]],
["YÖNETİM",[["scout","♙","Scout Profilleri"],["yetenek","✪","Yetenek Başvuruları"],["dokuman","▤","Doküman Yönetimi"],["izleyici","♧","İzleyici Atama"],["kullanici","♧","Kullanıcı Yönetimi"],["mesaj","✉","Mesajlar"]]]
];
let S={route:location.hash.replace("#/","")||"home",theme:localStorage.getItem("tff-theme")||"dark"};
document.body.classList.toggle("light",S.theme==="light");
function go(r){location.hash="#/"+r}
window.addEventListener("hashchange",()=>{S.route=location.hash.replace("#/","")||"home";render()});
function active(id){return S.route==="home"?id==="home":S.route===id}

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

function sidebar(){return `<aside class="sidebar">
<div class="brand"><img src="assets/tff-logo.png"><div><div class="brand-title">TFF</div><div class="brand-sub1">Türkiye Futbol Federasyonu</div><div class="brand-sub2">Video Analiz ve Gözlem Sistemi</div></div></div>
<button class="nav ${active("home")?"active":""}" data-route="home">${uiIcon("home")}Ana Sayfa</button>
${navGroups.map(([g,it])=>`<div class="nav-label">${g}</div>${it.map(([id,ic,tx])=>`<button class="nav ${active(id)?"active":""}" data-route="${id}">${uiIcon(id)}${tx}</button>`).join("")}`).join("")}
<div class="side-bottom">‹ &nbsp; Menüyü Daralt</div></aside>`}
function topbar(){return `<header class="topbar"><div class="search">⌕<input placeholder="Futbolcu, takım, maç, rapor ara..."><span>⌘ K</span></div><div class="top-actions"><button class="iconbtn" id="theme">${S.theme==="dark"?"☀":"☾"}</button><button class="iconbtn">♧</button><button class="iconbtn">✉</button><div class="userbox"><img src="assets/avatar.jpg"><div><div class="username">Simge Er ★</div><div class="role">Scout</div></div></div></div></header>`}
function panel(title,body,extra=""){return `<section class="panel"><div class="panel-head"><span>${title}</span>${extra}</div><div class="panel-body">${body}</div></section>`}
const homeTeams=[
{id:"a-milli",name:"A Milli",sub:"Erkek Milli Takım",count:"42 Oyuncu",img:"assets/quick-a-milli.jpg"},
{id:"u21",name:"U21 Milli",sub:"21 Yaş Altı",count:"40 Oyuncu",img:"assets/quick-u21.jpg"},
{id:"u19",name:"U19 Milli",sub:"19 Yaş Altı",count:"36 Oyuncu",img:"assets/quick-u19.jpg"},
{id:"kadin-a",name:"Kadınlar A Milli",sub:"Kadın Milli Takım",count:"28 Oyuncu",img:"assets/quick-kadin-a.jpg"},
{id:"futsal",name:"Futsal Milli",sub:"Futsal",count:"24 Oyuncu",img:"assets/quick-futsal.jpg"},
{id:"plaj",name:"Plaj Milli",sub:"Plaj Futbolu",count:"20 Oyuncu",img:"assets/quick-plaj.jpg"}
];
const vids=[
["assets/video-1.jpg","08:24","Türkiye 2–2 İspanya","Dünya Kupası Elemeleri","21.05.2026"],
["assets/video-2.jpg","06:18","Türkiye 4–0 Macaristan","UEFA Nations League","12.05.2026"],
["assets/video-3.jpg","07:10","Türkiye 3–1 Portekiz","Hazırlık Maçı","08.06.2026"],
["assets/video-4.jpg","04:45","Türkiye 1–1 ABD","Hazırlık Maçı","01.06.2026"],
["assets/video-5.jpg","05:32","A Milli Antrenman Özeti","Antalya Kampı","30.05.2026"]
];
function teamCard(t){return `<article class="quick-card" data-route="${t.id==="a-milli"?"milli-takimlar":"milli-takimlar"}"><div class="quick-img" style="background-image:url('${t.img}')"><div class="quick-badge"><img src="assets/turkey-badge.png" alt=""></div></div><div class="quick-info"><b>${t.name}</b><small>${t.sub}</small><span>${t.count}</span></div></article>`}
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
function home(){return `<div class="content"><div class="layout"><section class="center"><div class="welcome"><h1>Hoş Geldiniz, Simge Er 👋</h1><p>TFF Video Analiz ve Gözlem Sistemi</p></div><div class="hero"></div>
<div class="section-head"><div class="section-title">Hızlı Erişim</div><button class="linkbtn" data-route="milli-takimlar">Tümünü Gör &nbsp; →</button></div>
<div class="quick-grid">${homeTeams.map(teamCard).join("")}</div>
<div class="section-head"><div class="section-title">Son Videolar</div><button class="linkbtn">Tümünü Gör &nbsp; →</button></div>
<div class="video-grid">${vids.map(v=>`<article class="video-card"><div class="video-thumb" style="background-image:url('${v[0]}')"><div class="play">▶</div><div class="duration">${v[1]}</div></div><div class="video-title">${v[2]}</div><div class="video-sub">${v[3]}<br>${v[4]}</div></article>`).join("")}</div></section>
<aside class="rail">${stats()}${upcoming()}${reports()}${quickActions()}</aside></div><footer>© 2026 Türkiye Futbol Federasyonu &nbsp; | &nbsp; Video Analiz ve Gözlem Sistemi</footer></div>`}
function milli(){const teams=Array.isArray(D.teams)?D.teams:[]; const fallback=[["a-milli","A Milli","Erkek Milli Takım",42],["u21","U21 Milli","21 Yaş Altı",40],["u19","U19 Milli","19 Yaş Altı",36],["kadin-a","Kadınlar A Milli","Kadın Milli Takım",28],["futsal","Futsal Milli","Futsal",24],["plaj","Plaj Milli","Plaj Futbolu",20]]; const src=teams.length?teams:fallback;
 return `<div class="content"><div class="page-head"><div><h1>Milli Takımlar</h1><p>Tüm milli takım gruplarına ve detaylarına buradan ulaşabilirsiniz.</p></div><input class="input" placeholder="Milli takım ara..."></div><div class="milli-layout"><div class="milli-grid">${src.map(x=>{let id=x[0], match=homeTeams.find(t=>t.id===id)||homeTeams[0]; return teamCard({id,name:x[1],sub:x[2],count:(x[3]??"")+" Oyuncu",img:match.img})}).join("")}</div><aside class="rail">${stats()}${upcoming()}${reports()}${quickActions()}</aside></div></div>`}
function generic(){return `<div class="content"><div class="page-head"><div><h1>${S.route.replaceAll("-"," ")}</h1><p>Bu ekran aynı ana tema ile geliştirilecek.</p></div></div><div class="panel"><div class="panel-body" style="padding:55px;text-align:center;color:#91a0b2">Hazırlanıyor</div></div></div>`}
function page(){if(S.route==="home")return home();if(S.route==="milli-takimlar")return milli();return generic()}
function render(){document.getElementById("app").innerHTML=`<div class="shell">${sidebar()}<main class="main">${topbar()}${page()}</main></div>`;bind()}
function bind(){document.querySelectorAll("[data-route]").forEach(e=>e.addEventListener("click",()=>go(e.dataset.route)));const t=document.getElementById("theme");if(t)t.addEventListener("click",()=>{S.theme=S.theme==="dark"?"light":"dark";localStorage.setItem("tff-theme",S.theme);document.body.classList.toggle("light",S.theme==="light");render()})}
render();
