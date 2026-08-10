
const D=window.DATA||{};
const navGroups=[
["MİLLİ TAKIMLAR",[["milli-takimlar","◉","Milli Takımlar"],["karmalar","♧","Karmalar"],["rakipler","♧","Rakipler"]]],
["OYUNCU & KULÜP",[["futbolcularim","♙","Futbolcularım"],["populer","☆","Popüler Oyuncular"],["kulupler","▣","Kulüpler"]]],
["ANALİZ & RAPORLAR",[["video","▣","Maç & Video Analiz"],["istatistik","▥","İstatistikler"],["raporlar","▤","Oyuncu Raporları"],["videolar","◉","Güncel Videolar"],["esame","▤","Esame Raporu"],["mac-raporlari","▤","Maç Raporları"],["gelisim-raporlari","▤","Gelişim Ligi Raporları"]]],
["GELİŞİM",[["antrenman","≋","Antrenman Planları"],["kulup-gelisim","◍","Kulüp Gelişim"],["eslestirme","◎","Oyuncu Eşleştirme"],["teknik","⚒","Teknik Testler"],["sakatlik","♧","Sakatlıklar"]]],
["YÖNETİM",[["scout","♙","Scout Profilleri"],["yetenek","✪","Yetenek Başvuruları"],["dokuman","▤","Doküman Yönetimi"],["izleyici","♧","İzleyici Atama"],["kullanici","♧","Kullanıcı Yönetimi"],["mesaj","✉","Mesajlar"]]]
];
let S={
 route:sessionStorage.getItem("tff-demo-auth")==="1"?(location.hash.replace("#/","")||"home"):"login",
 theme:localStorage.getItem("tff-theme")||"dark",
 teamTab:"overview",
 sidebarCollapsed:localStorage.getItem("tff-sidebar-collapsed")==="1",
 openMenuGroup:localStorage.getItem("tff-sidebar-group")||"ANALİZ & RAPORLAR"
};
document.body.classList.toggle("light",S.theme==="light");
function go(r){location.hash="#/"+r}
window.addEventListener("hashchange",()=>{const r=location.hash.replace("#/","")||"login";if(r!=="login"&&sessionStorage.getItem("tff-demo-auth")!=="1"){location.hash="#/login";return}S.route=r;render()});
function active(id){if(S.route==="home")return id==="home";if(S.route==="team-a-milli")return id==="milli-takimlar";return S.route===id}

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
   <button class="nav side-home ${active("home")?"active":""}" data-route="home" title="Ana Sayfa">${uiIcon("home")}<span>Ana Sayfa</span></button>
   <div class="side-groups">${groups}</div>
   <button class="nav side-message ${active("mesaj")?"active":""}" data-route="mesaj" title="Mesajlar">${uiIcon("mesaj")}<span>Mesajlar</span><b class="side-badge">3</b></button>
   <div class="side-spacer"></div>
   <button class="side-collapse" id="sideCollapse" title="${S.sidebarCollapsed?"Menüyü Genişlet":"Menüyü Daralt"}">
     <span class="collapse-arrow">${S.sidebarCollapsed?"›":"‹"}</span><span class="collapse-label">${S.sidebarCollapsed?"":"Menüyü Daralt"}</span>
   </button>
  </aside>`;
}

function topbar(){return `<header class="topbar">
 <div class="top-brand"><img src="assets/tff-logo.png"><div><div class="top-brand-title">TFF</div><div class="top-brand-sub1">Türkiye Futbol Federasyonu</div><div class="top-brand-sub2">Video Analiz ve Gözlem Sistemi</div></div></div>
 <div class="search">⌕<input placeholder="Futbolcu, takım, maç, rapor ara..."><span>⌘ K</span></div>
 <div class="top-actions"><button class="iconbtn" id="theme">${S.theme==="dark"?"☀":"☾"}</button><button class="iconbtn notification">♧<b>5</b></button><button class="iconbtn notification">✉<b>2</b></button><div class="userbox"><img src="assets/avatar.jpg"><div><div class="username">Simge Er ★</div><div class="role">Scout</div></div><span class="user-chevron">⌄</span></div></div>
 </header>`}
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
function teamCard(t){return `<article class="quick-card" data-route="${t.id==="a-milli"?"team-a-milli":"milli-takimlar"}"><div class="quick-img" style="background-image:url('${t.img}')"><div class="quick-badge"><img src="assets/turkey-badge.png" alt=""></div></div><div class="quick-info"><b>${t.name}</b><small>${t.sub}</small><span>${t.count}</span></div></article>`}
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
<div class="quick-grid">${homeTeams.map(teamCard).join("")}</div>
<div class="section-head"><div class="section-title">Son Videolar</div><button class="linkbtn">Tümünü Gör &nbsp; →</button></div>
<div class="video-grid">${vids.map(v=>`<article class="video-card"><div class="video-thumb" style="background-image:url('${v[0]}')"><div class="play">▶</div><div class="duration">${v[1]}</div></div><div class="video-title">${v[2]}</div><div class="video-sub">${v[3]}<br>${v[4]}</div></article>`).join("")}</div></section>
<aside class="rail">${stats()}${upcoming()}${reports()}${quickActions()}</aside></div><footer>© 2026 Türkiye Futbol Federasyonu &nbsp; | &nbsp; Video Analiz ve Gözlem Sistemi</footer></div>`}
function milli(){const teams=Array.isArray(D.teams)?D.teams:[]; const fallback=[["a-milli","A Milli","Erkek Milli Takım",42],["u21","U21 Milli","21 Yaş Altı",40],["u19","U19 Milli","19 Yaş Altı",36],["kadin-a","Kadınlar A Milli","Kadın Milli Takım",28],["futsal","Futsal Milli","Futsal",24],["plaj","Plaj Milli","Plaj Futbolu",20]]; const src=teams.length?teams:fallback;
 return `<div class="content"><div class="page-head"><div><h1>Milli Takımlar</h1><p>Tüm milli takım gruplarına ve detaylarına buradan ulaşabilirsiniz.</p></div><input class="input" placeholder="Milli takım ara..."></div><div class="milli-layout"><div class="milli-grid">${src.map(x=>{let id=x[0], match=homeTeams.find(t=>t.id===id)||homeTeams[0]; return teamCard({id,name:x[1],sub:x[2],count:(x[3]??"")+" Oyuncu",img:match.img})}).join("")}</div><aside class="rail">${stats()}${upcoming()}${reports()}${quickActions()}</aside></div></div>`}


const aMilliPlayers=[
["1","Uğurcan Çakır","Kaleci","05.04.1996","Trabzonspor","191 / 78","18","0","Aktif"],
["23","Mert Günok","Kaleci","01.03.1989","Beşiktaş","196 / 92","34","0","Aktif"],
["4","Merih Demiral","Stoper","05.03.1998","Al-Ahli","192 / 90","45","2","Aktif"],
["3","Samet Akaydın","Stoper","13.03.1994","Panathinaikos","190 / 86","32","1","Aktif"],
["14","Abdülkerim Bardakcı","Stoper","07.09.1994","Galatasaray","185 / 81","28","2","Aktif"],
["18","Mert Müldür","Sağ Bek","03.04.1999","Fenerbahçe","184 / 74","31","2","Aktif"],
["20","Ferdi Kadıoğlu","Sol Bek","07.10.1999","Brighton","174 / 68","24","1","Aktif"],
["10","Hakan Çalhanoğlu","Orta Saha","08.02.1994","Inter","178 / 76","91","19","Aktif"],
["6","Orkun Kökçü","Orta Saha","29.12.2000","Benfica","175 / 70","39","3","Aktif"],
["8","İsmail Yüksek","Orta Saha","26.01.1999","Fenerbahçe","183 / 75","22","1","Aktif"],
["11","Kenan Yıldız","Sol Kanat","04.05.2005","Juventus","185 / 80","21","4","Aktif"],
["7","Kerem Aktürkoğlu","Sol Kanat","21.10.1998","Benfica","173 / 68","38","9","Aktif"],
["21","Barış Alper Yılmaz","Sağ Kanat","23.05.2000","Galatasaray","186 / 80","29","5","Aktif"],
["9","Enes Ünal","Santrafor","10.05.1997","Bournemouth","187 / 78","36","5","Aktif"]
];

const aMilliMatches=[
["21 May 2026","Dünya Kupası Elemeleri","Türkiye","2 - 2","İspanya","assets/flag-tr.png","assets/flag-es.png"],
["12 May 2026","UEFA Nations League","Macaristan","0 - 4","Türkiye","assets/flag-hu.png","assets/flag-tr.png"],
["08 Haz 2026","Hazırlık Maçı","Türkiye","3 - 1","Portekiz","assets/flag-tr.png","assets/flag-es.png"],
["01 Haz 2026","Hazırlık Maçı","Türkiye","1 - 1","ABD","assets/flag-tr.png","assets/flag-it.png"],
["27 Mar 2026","Dünya Kupası Elemeleri","Türkiye","2 - 0","Bulgaristan","assets/flag-tr.png","assets/flag-hu.png"]
];

function teamShell(body){
 const tabs=[["overview","Genel Bakış"],["squad","Kadro"],["matches","Maçlar"],["videos","Videolar"],["stats","İstatistikler"],["team-reports","Raporlar"]];
 return `<div class="team-ref-page">
  <section class="team-ref-header">
    <div class="team-ref-head-left"><img src="assets/turkey-badge.png" class="team-ref-flag"><div><h1>A Milli Takım <span class="verified">✓</span></h1><p>Erkek Milli Takım</p></div></div>
    <div class="team-ref-head-art"></div>
    <button class="team-profile-btn">♙ &nbsp; Takım Profili</button>
    <nav class="team-ref-tabs">${tabs.map(x=>`<button class="${S.teamTab===x[0]?"active":""}" data-teamtab="${x[0]}">${x[1]}</button>`).join("")}</nav>
  </section>
  <div class="team-ref-content">${body}</div>
  <footer>© 2026 Türkiye Futbol Federasyonu &nbsp; | &nbsp; Video Analiz ve Gözlem Sistemi</footer>
 </div>`
}

function flagTeam(flag,name){return `<span class="ref-team"><img src="${flag}"><b>${name}</b></span>`}

function teamOverview(){
 return teamShell(`
 <div class="ref-top-grid">
  <section class="ref-card ref-match-card"><h3>Son Maç</h3><p class="ref-muted center">Dünya Kupası Elemeleri</p><div class="ref-scoreline">${flagTeam("assets/flag-tr.png","Türkiye")}<strong>2 <span>-</span> 2</strong>${flagTeam("assets/flag-es.png","İspanya")}</div><p class="ref-muted center">21 Mayıs 2026 · 21:45<br>Atatürk Olimpiyat Stadyumu</p><button class="ref-wide-btn">Maç Detayları &nbsp; →</button></section>
  <section class="ref-card ref-match-card"><h3>Sıradaki Maç</h3><p class="ref-muted center">Dünya Kupası Elemeleri</p><div class="ref-scoreline">${flagTeam("assets/flag-tr.png","Türkiye")}<strong class="vs">vs</strong>${flagTeam("assets/flag-it.png","İtalya")}</div><p class="ref-muted center">25 Mayıs 2026 · 20:00<br>Konya Büyükşehir Stadyumu</p><button class="ref-wide-btn">Maç Detayları &nbsp; →</button></section>
  <section class="ref-card team-info-card"><h3>Takım Bilgileri</h3><div class="team-info-layout"><div>${[["Kuruluş","1923"],["Teknik Direktör","Vincenzo Montella"],["Kaptan","Hakan Çalhanoğlu"],["FIFA Sıralaması","36"],["UEFA Sıralaması","22"]].map(x=>`<div class="ref-info"><span>${x[0]}</span><b>${x[1]}</b></div>`).join("")}<div class="ref-info"><span>Renkler</span><b><i class="dot red"></i><i class="dot white"></i></b></div></div><img src="assets/tff-logo.png" class="team-big-logo"></div></section>
 </div>

 <div class="ref-mid-grid">
  <section class="ref-card"><h3>Kadro Özeti <span class="ref-muted">(33 Oyuncu)</span></h3>
   <div class="squad-summary">${[["Kaleciler","3","green"],["Defans","9","blue"],["Orta Saha","11","orange"],["Forvet","10","red"]].map((x,idx)=>`<button data-teamtab="squad"><span>${x[0]}</span><em class="${x[2]}">${x[1]}</em><div class="face-stack">${aMilliPlayers.slice(idx*3,idx*3+4).map((p,i)=>`<span>${p[1].split(" ")[0][0]}${p[1].split(" ").slice(-1)[0][0]}</span>`).join("")}</div><b>›</b></button>`).join("")}</div><button class="ref-wide-btn" data-teamtab="squad">Tüm Kadroyu Gör</button>
  </section>
  <section class="ref-card"><h3>Son Maç Performans Özeti</h3><div class="perf-grid">${[["Topla Oynama","%56","blue"],["Şut","15",""],["İsabetli Şut","7",""],["Pas Başarı","%87","green"],["İkili Mücadele","%52","orange"],["Korner","6",""],["Faul","11",""],["Sarı / Kırmızı","2 / 0",""]].map(x=>`<div class="perf-box"><span>${x[0]}</span><strong class="${x[2]}">${x[1]}</strong></div>`).join("")}</div></section>
  <section class="ref-card"><h3>Teknik Ekip</h3><div class="staff-list">${[["VM","Vincenzo Montella","Teknik Direktör"],["DB","D. Di Battista","Yardımcı Antrenör"],["MM","M. Matarrese","Yardımcı Antrenör"],["AR","A. Rimedio","Kaleci Antrenörü"]].map(x=>`<div class="staff-row"><span class="staff-avatar">${x[0]}</span><div><b>${x[1]}</b><small>${x[2]}</small></div></div>`).join("")}</div><button class="ref-wide-btn">Tüm Teknik Ekibi Gör</button></section>
 </div>

 <div class="ref-bottom-grid">
  <section class="ref-card"><div class="ref-card-head"><h3>Son Videolar</h3><button data-teamtab="videos">Tümünü Gör ›</button></div><div class="ref-video-row">${vids.slice(0,4).map(v=>`<article><div class="ref-video-thumb" style="background-image:url('${v[0]}')"><span>▶</span><small>${v[1]}</small></div><b>${v[2]}</b><p>${v[3]}<br>${v[4]}</p></article>`).join("")}</div><button class="ref-wide-btn" data-teamtab="videos">Tüm Videoları Gör</button></section>
  <section class="ref-card"><div class="ref-card-head"><h3>Son Maçlar</h3><button data-teamtab="matches">Tümünü Gör ›</button></div><div class="recent-match-list">${aMilliMatches.map(m=>`<div><span><b>${m[0]}</b><small>${m[1]}</small></span>${flagTeam(m[5],m[2])}<strong>${m[3]}</strong>${flagTeam(m[6],m[4])}<button>Detay</button></div>`).join("")}</div><button class="ref-wide-btn" data-teamtab="matches">Tüm Maçları Gör</button></section>
  <section class="ref-card"><h3>Hızlı İşlemler</h3><div class="ref-actions"><button class="qa-blue">▷ <span>Maç Analizine Başla</span></button><button class="qa-green">⌕ <span>Oyuncu Ara</span></button><button class="qa-orange">▤ <span>Yeni Rapor Oluştur</span></button><button class="qa-purple">⇧ <span>Video Yükle</span></button></div></section>
 </div>`)
}

function teamSquad(){
 const positions=["Tümü","Kaleci","Stoper","Bek","Orta Saha","Kanat","Santrafor"];
 return teamShell(`<section class="ref-card tab-card"><div class="tab-toolbar"><div><h2>Kadro</h2><p>2025/2026 A Milli Takım oyuncu havuzu</p></div><div class="filter-pills">${positions.map((x,i)=>`<button class="${i===0?"active":""}">${x}</button>`).join("")}</div></div>
 <div class="player-table"><div class="pt-head"><span>#</span><span>OYUNCU</span><span>POZİSYON</span><span>DOĞUM TARİHİ</span><span>KULÜP</span><span>BOY / KİLO</span><span>MAÇ</span><span>GOL</span><span>DURUM</span></div>${aMilliPlayers.map(p=>`<div class="pt-row"><b class="player-no">${p[0]}</b><div class="player-name"><span class="mini-avatar">${p[1].split(" ").map(z=>z[0]).join("").slice(0,2)}</span><b>${p[1]}</b></div><span>${p[2]}</span><span>${p[3]}</span><b>${p[4]}</b><span>${p[5]} kg</span><b>${p[6]}</b><b>${p[7]}</b><span class="active-status">● ${p[8]}</span></div>`).join("")}</div></section>`)
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


function generic(){return `<div class="content"><div class="page-head"><div><h1>${S.route.replaceAll("-"," ")}</h1><p>Bu ekran aynı ana tema ile geliştirilecek.</p></div></div><div class="panel"><div class="panel-body" style="padding:55px;text-align:center;color:#91a0b2">Hazırlanıyor</div></div></div>`}

function loginPage(){
 const light=S.theme==="light";
 return `<div class="login-page">
   <div class="login-bg-mark"></div>
   <div class="login-red-lines login-red-lines-left"></div>
   <div class="login-red-lines login-red-lines-right"></div>
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

function page(){if(S.route==="login")return loginPage();if(S.route==="home")return home();if(S.route==="milli-takimlar")return milli();if(S.route==="team-a-milli")return teamDetail();return generic()}
function render(){if(S.route==="login"){if(location.hash!=="#/login")history.replaceState(null,"","#/login");document.getElementById("app").innerHTML=loginPage()}else{document.getElementById("app").innerHTML=`<div class="app-frame">${topbar()}<div class="shell ${S.sidebarCollapsed?"sidebar-collapsed":""}">${sidebar()}<main class="main">${page()}</main></div></div>`}bind()}
function bind(){
 document.querySelectorAll("[data-route]").forEach(e=>e.addEventListener("click",()=>go(e.dataset.route)));
 document.querySelectorAll("[data-teamtab]").forEach(e=>e.addEventListener("click",()=>{S.teamTab=e.dataset.teamtab;render()}));
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
 const pw=document.getElementById("passwordToggle");
 if(pw)pw.addEventListener("click",()=>{const input=document.getElementById("loginPass");input.type=input.type==="password"?"text":"password";pw.textContent=input.type==="password"?"◉":"⊘"});
 const doLogin=(demo=false)=>{const u=document.getElementById("loginUser");const p=document.getElementById("loginPass");const err=document.getElementById("loginError");const user=demo?"demo":(u?.value||"").trim();const pass=demo?"demo":(p?.value||"");if(user==="demo"&&pass==="demo"){sessionStorage.setItem("tff-demo-auth","1");location.hash="#/home";return}if(err)err.textContent="Demo erişim için kullanıcı adı ve şifre: demo"};
 const submit=document.getElementById("loginSubmit");if(submit)submit.addEventListener("click",()=>doLogin(false));
 const demo=document.getElementById("demoLogin");if(demo)demo.addEventListener("click",()=>doLogin(true));
 const passInput=document.getElementById("loginPass");if(passInput)passInput.addEventListener("keydown",e=>{if(e.key==="Enter")doLogin(false)});
}
render();
