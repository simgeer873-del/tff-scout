
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
function sidebar(){return `<aside class="sidebar">
<div class="brand"><img src="assets/tff-logo.png"><div><div class="brand-title">TFF</div><div class="brand-sub1">Türkiye Futbol Federasyonu</div><div class="brand-sub2">Video Analiz ve Gözlem Sistemi</div></div></div>
<button class="nav ${active("home")?"active":""}" data-route="home"><span class="ico">⌂</span>Ana Sayfa</button>
${navGroups.map(([g,it])=>`<div class="nav-label">${g}</div>${it.map(([id,ic,tx])=>`<button class="nav ${active(id)?"active":""}" data-route="${id}"><span class="ico">${ic}</span>${tx}</button>`).join("")}`).join("")}
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
function teamCard(t){return `<article class="quick-card" data-route="${t.id==="a-milli"?"milli-takimlar":"milli-takimlar"}"><div class="quick-img" style="background-image:url('${t.img}')"><div class="quick-badge">C★</div></div><div class="quick-info"><b>${t.name}</b><small>${t.sub}</small><span>${t.count}</span></div></article>`}
function stats(){return panel("Genel İstatistikler",`<div class="stat-grid">${[["İzlenen Maç","18","↗ %12",""],["İzlenen Oyuncu","42","↗ %15",""],["Oluşturulan Rapor","23","↗ %8",""],["Yetenek Başvurusu","7","↘ %5","down"]].map(x=>`<div class="stat"><small>${x[0]}</small><strong>${x[1]}</strong><div class="trend ${x[3]}">${x[2]}</div></div>`).join("")}</div>`,`<span style="font-size:10px;color:#9da9b7">Bu Ay⌄</span>`)}
function upcoming(){
 const m=(D.matches||[["Türkiye","İspanya","21 May 2026","-","Dünya Kupası Elemeleri"],["Türkiye","İtalya","25 May 2026","-","Hazırlık Maçı"],["Macaristan","Türkiye","12 Haz 2026","-","UEFA Nations League"]]).slice(0,3);
 return panel("Yaklaşan Maçlar",m.map(x=>`<div class="row"><div><div class="rmain">${x[0]} &nbsp; vs &nbsp; ${x[1]}</div><div class="rsub">${x[4]}</div></div><div class="rside">${x[2]}</div></div>`).join(""),`<span style="color:#d71920;font-size:10px">Tümünü Gör ›</span>`)
}
function reports(){
 const r=(D.reports||[["Arda Güler","Real Madrid","Gözlem Raporu","",84],["Yusuf Akçiçek","Fenerbahçe","Maç Raporu","",79],["Kenan Yıldız","Juventus","Gözlem Raporu","",78]]).slice(0,3);
 return panel("Son Eklenen Raporlar",r.map(x=>`<div class="row"><div><div class="rmain">${x[0]} <span class="rsub">| ${x[1]}</span></div><div class="rsub">${x[2]} – Simge Er</div></div><span class="score">${x[4]}</span></div>`).join(""),`<span style="color:#d71920;font-size:10px">Tümünü Gör ›</span>`)
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
