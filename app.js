
const D=window.DATA;
const teamAssets={
 "a-milli":"assets/a-milli.jpg","a2":"assets/a2-milli.jpg","u21":"assets/u21.jpg","u20":"assets/u20.jpg",
 "u19":"assets/u19.jpg","u18":"assets/u18.jpg","u17":"assets/u17.jpg","u16":"assets/u16.jpg","u15":"assets/u15.jpg","u14":"assets/u14.jpg",
 "kadin-a":"assets/kadin-a.jpg","kadin-u23":"assets/kadin-u23.jpg","kadin-u19":"assets/kadin-u19.jpg",
 "kiz-u18":"assets/kiz-u18.jpg","kiz-u17":"assets/kiz-u17.jpg","kiz-u15":"assets/kiz-u15.jpg",
 "futsal":"assets/futsal.jpg","plaj":"assets/plaj.jpg","ozel":"assets/ozel.jpg","karma":"assets/karma.jpg"
};
const groups=[
["MİLLİ TAKIMLAR",[["milli-takimlar","◉","Milli Takımlar"],["karmalar","♧","Karmalar"],["rakipler","♧","Rakipler"]]],
["OYUNCU & KULÜP",[["futbolcularim","♙","Futbolcularım"],["populer","☆","Popüler Oyuncular"],["kulupler","▣","Kulüpler"]]],
["ANALİZ & RAPORLAR",[["video","▣","Maç & Video Analiz"],["istatistik","▥","İstatistikler"],["raporlar","▤","Oyuncu Raporları"],["videolar","◉","Güncel Videolar"],["esame","▤","Esame Raporu"],["mac-raporlari","▤","Maç Raporları"],["gelisim-raporlari","▤","Gelişim Ligi Raporları"]]],
["GELİŞİM",[["antrenman","≋","Antrenman Planları"],["kulup-gelisim","◍","Kulüp Gelişim"],["eslestirme","◎","Oyuncu Eşleştirme"],["teknik","⚒","Teknik Testler"],["sakatlik","♧","Sakatlıklar"]]],
["YÖNETİM",[["scout","♙","Scout Profilleri"],["yetenek","✪","Yetenek Başvuruları"],["dokuman","▤","Doküman Yönetimi"],["izleyici","♧","İzleyici Atama"],["kullanici","♧","Kullanıcı Yönetimi"]]]
];
let S={route:location.hash.replace("#/","")||"home",theme:localStorage.getItem("tff-theme")||"dark",teamTab:"genel"};
document.body.classList.toggle("light",S.theme==="light");
function go(r){location.hash="#/"+r}
window.addEventListener("hashchange",()=>{S.route=location.hash.replace("#/","")||"home";render()});
function isActive(id){if(S.route==="home")return id==="home";if(S.route==="a-milli")return id==="milli-takimlar";return S.route===id}
function sidebar(){return `<aside class="sidebar">
<div class="brand"><div class="brand-shield">TFF</div><div><div class="brand-name">TÜRKİYE FUTBOL FEDERASYONU</div><div class="brand-sub">Video Analiz ve Gözlem</div></div></div>
<button class="nav-btn ${isActive("home")?"active":""}" data-route="home"><span class="nav-icon">⌂</span>Ana Sayfa</button>
${groups.map(([g,items])=>`<div class="nav-label">${g}</div>${items.map(([id,ic,tx])=>`<button class="nav-btn ${isActive(id)?"active":""}" data-route="${id}"><span class="nav-icon">${ic}</span>${tx}</button>`).join("")}`).join("")}
<div class="sidebar-bottom">‹ &nbsp; Menüyü Daralt</div>
</aside>`}
function topbar(){return `<header class="topbar"><div class="search">⌕<input placeholder="Futbolcu, takım, maç, rapor ara..."><span>⌘ K</span></div><div class="top-actions"><button class="top-icon" id="theme">${S.theme==="dark"?"☀":"☾"}</button><button class="top-icon">♧</button><button class="top-icon">✉</button><div class="userbox"><div class="userphoto">SE</div><div><div class="username">Simge Er ★</div><div class="role">Scout</div></div></div></div></header>`}
function panel(title,body,extra=""){return `<section class="panel"><div class="panel-head"><span>${title}</span>${extra}</div><div class="panel-body">${body}</div></section>`}
function stats(){return panel("Genel İstatistikler",`<div class="stat-grid">${[["İzlenen Maç","18","↗ %12","up"],["İzlenen Oyuncu","42","↗ %15","up"],["Oluşturulan Rapor","23","↗ %8","up"],["Yetenek Başvurusu","7","↘ %5","down"]].map(x=>`<div class="stat"><div class="stat-title">${x[0]}</div><div class="stat-num">${x[1]}</div><div class="${x[3]}">${x[2]}</div></div>`).join("")}</div>`,`<span class="muted">Bu Ay⌄</span>`)}
function upcoming(){return panel("Yaklaşan Maçlar",D.matches.slice(0,3).map(x=>`<div class="list-item"><div><div class="list-main">${x[0]} &nbsp; vs &nbsp; ${x[1]}</div><div class="list-sub">${x[4]}</div></div><div class="list-side">${x[2]}<br>${x[3]==="-"?"20:00":""}</div></div>`).join(""),`<span style="color:#d91b23;font-size:10px">Tümünü Gör ›</span>`)}
function reports(){return panel("Son Eklenen Raporlar",D.reports.slice(0,3).map(x=>`<div class="list-item"><div><div class="list-main">${x[0]} <span class="muted">| ${x[1]}</span></div><div class="list-sub">${x[2]} – Simge Er</div></div><span class="score">${x[4]}</span></div>`).join(""))}
function quick(){return panel("Hızlı İşlemler",`<div class="quick-grid"><button class="quick blue" data-route="video">▷&nbsp; Maç Analizine Başla</button><button class="quick green" data-route="futbolcularim">⌕&nbsp; Oyuncu Ara</button><button class="quick orange" data-route="raporlar">▤&nbsp; Yeni Rapor Oluştur</button><button class="quick purple" data-route="yetenek">☆&nbsp; Yetenek Başvuruları</button></div>`)}
function teamObj(x){return Array.isArray(x)?{id:x[0],name:x[1],meta:x[2],players:x[3]}:x}
function teamCard(t){t=teamObj(t);let asset=teamAssets[t.id]||teamAssets["karma"];return `<article class="team-card" data-team="${t.id}"><div class="team-image" style="background-image:url('${asset}')"><div class="team-token">C★</div></div><div class="team-info"><div class="team-name">${t.name}</div><div class="team-sub">${t.meta}</div>${t.players!==undefined?`<div class="team-count">${t.players} Oyuncu</div>`:""}</div></article>`}
function homeTeams(){
 const ids=["a-milli","a2","u21","u20","u19","u18","u17","u16","u15","u14","kadin-a","kadin-u23","kadin-u19","kiz-u18","kiz-u17","kiz-u15","futsal","plaj","ozel","karma"];
 return ids.map(id=>D.teams.find(x=>x[0]===id)).filter(Boolean);
}
function home(){return `<div class="content"><div class="dashboard-grid"><div class="dashboard-main">
<div class="welcome"><h1>Hoş Geldiniz, Simge Er 👋</h1><p>TFF Video Analiz ve Gözlem Sistemi</p></div>
<section class="hero"></section>
<div class="section-head"><div class="section-title">Milli Takımlar</div><button class="ghost-btn" data-route="milli-takimlar">Tümünü Gör ›</button></div>
<div class="team-grid">${homeTeams().map(teamCard).join("")}</div>
</div><aside class="rail">${stats()}${upcoming()}${reports()}${quick()}</aside></div><footer>© 2026 Türkiye Futbol Federasyonu &nbsp; | &nbsp; Video Analiz ve Gözlem Sistemi</footer></div>`}
function milli(){return `<div class="content"><div class="page-head"><div><h1>Milli Takımlar</h1><p>Tüm milli takım grupları ve detayları</p></div><div class="toolbar"><input class="input" placeholder="Milli takım ara..."></div></div><div class="milli-layout"><div class="milli-grid">${D.teams.map(teamCard).join("")}</div><aside class="rail">${stats()}${upcoming()}${reports()}${quick()}</aside></div><footer>© 2026 Türkiye Futbol Federasyonu &nbsp; | &nbsp; Video Analiz ve Gözlem Sistemi</footer></div>`}
function playerTable(){return `<div class="panel"><div class="panel-head">A Milli Takım Kadrosu</div><div class="panel-body table-wrap"><table class="data-table"><thead><tr><th>Oyuncu</th><th>Yaş</th><th>Kulüp</th><th>Mevki</th><th>Puan</th><th>Maç</th><th>Gol</th><th>Asist</th></tr></thead><tbody>${D.players.map(p=>`<tr><td><div class="player"><span class="face"></span><b>${p[0]}</b></div></td><td>${p[1]}</td><td>${p[2]}</td><td>${p[3]}</td><td><span class="green-tag tag">${p[4]}</span></td><td>${p[5]}</td><td>${p[6]}</td><td>${p[7]}</td></tr>`).join("")}</tbody></table></div></div>`}
function aMilli(){
 const tabs={genel:"Genel Bakış",kadro:"Kadro",maclar:"Maçlar",videolar:"Videolar",istatistik:"İstatistikler",raporlar:"Raporlar"};
 return `<div class="content"><section class="team-header"><div class="team-heading"><div class="round-flag">C★</div><div><h1>A Milli Takım ✓</h1><p>Erkek Milli Takım</p></div></div><div class="tabs">${Object.entries(tabs).map(([k,v])=>`<button class="tab ${S.teamTab===k?"active":""}" data-tab="${k}">${v}</button>`).join("")}</div></section>${S.teamTab==="genel"?`<div class="cards3">${panel("Son Maç",`<div class="bigscore">Türkiye&nbsp;&nbsp; 2 - 2 &nbsp;&nbsp;İspanya</div><div class="muted">21 May 2026 · Dünya Kupası Elemeleri</div>`)}${panel("Sıradaki Maç",`<div class="bigscore">Türkiye&nbsp;&nbsp; vs &nbsp;&nbsp;İtalya</div><div class="muted">25 May 2026 · Hazırlık Maçı</div>`)}${panel("Takım Bilgileri",`<div class="list-item"><span>Kuruluş</span><b>1923</b></div><div class="list-item"><span>Teknik Direktör</span><b>Vincenzo Montella</b></div><div class="list-item"><span>Kaptan</span><b>Hakan Çalhanoğlu</b></div><div class="list-item"><span>FIFA</span><b>36</b></div>`)}</div>`:S.teamTab==="kadro"?playerTable():generic(S.teamTab)}</div>`}
function generic(name){
 const titles={maclar:"Maçlar",videolar:"Videolar",istatistik:"İstatistikler",raporlar:"Raporlar"};
 return `<div class="panel"><div class="panel-head">${titles[name]||name}</div><div class="empty">Bu ekran videodaki gerçek akışa göre içeriklendirilecek.</div></div>`
}
function genericRoute(){
 const names={karmalar:"Karmalar",rakipler:"Rakipler",futbolcularim:"Futbolcularım",populer:"Popüler Oyuncular",kulupler:"Kulüpler",video:"Maç & Video Analiz",istatistik:"İstatistikler",raporlar:"Oyuncu Raporları",videolar:"Güncel Videolar",esame:"Esame Raporu","mac-raporlari":"Maç Raporları","gelisim-raporlari":"Gelişim Ligi Raporları",antrenman:"Antrenman Planları","kulup-gelisim":"Kulüp Gelişim",eslestirme:"Oyuncu Eşleştirme",teknik:"Teknik Testler",sakatlik:"Sakatlıklar",scout:"Scout Profilleri",yetenek:"Yetenek Başvuruları",dokuman:"Doküman Yönetimi",izleyici:"İzleyici Atama",kullanici:"Kullanıcı Yönetimi"};
 return `<div class="content"><h1 class="generic-title">${names[S.route]||"Modül"}</h1><div class="panel"><div class="empty">Bu ekran aynı master tema ile geliştirilecek.</div></div></div>`
}
function routePage(){if(S.route==="home")return home();if(S.route==="milli-takimlar")return milli();if(S.route==="a-milli")return aMilli();return genericRoute()}
function render(){document.getElementById("app").innerHTML=`<div class="app-shell">${sidebar()}<main class="main">${topbar()}${routePage()}</main></div>`;bind()}
function bind(){
 document.querySelectorAll("[data-route]").forEach(e=>e.addEventListener("click",()=>go(e.dataset.route)));
 document.querySelectorAll("[data-team]").forEach(e=>e.addEventListener("click",()=>{if(e.dataset.team==="a-milli")go("a-milli")}));
 document.querySelectorAll("[data-tab]").forEach(e=>e.addEventListener("click",()=>{S.teamTab=e.dataset.tab;render()}));
 const t=document.getElementById("theme");if(t)t.addEventListener("click",()=>{S.theme=S.theme==="dark"?"light":"dark";localStorage.setItem("tff-theme",S.theme);document.body.classList.toggle("light",S.theme==="light");render()});
}
render();
