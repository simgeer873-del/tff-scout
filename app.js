
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
 teamTab:"overview",
 sidebarCollapsed:localStorage.getItem("tff-sidebar-collapsed")==="1",
 openMenuGroup:localStorage.getItem("tff-sidebar-group")||"ANALİZ & RAPORLAR",profileMenu:false,
 playerFilters:{country:"Türkiye",league:"Tümü",season:"2025/2026",position:"Merkez Orta Saha",ageMin:18,ageMax:23,foot:"Sağ",category:"Tümü"},
 playerFiltersApplied:false,
 playerAgeChip:true,
 selectedPlayers:[0,4],
 activePlayer:0,playerSort:"score-desc",compareTab:"skills",reportModal:false
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
 <div class="top-brand"><img src="assets/tff-logo.png" alt="TFF"><div><div class="top-brand-title">TFF</div><div class="top-brand-sub1">Türkiye Futbol Federasyonu</div><div class="top-brand-sub2">Scout ve Analiz Sistemi</div></div></div>
 <div class="fp-header-context"><h1>Oyuncu Karşılaştırma</h1>${selectedPlayerChips()}</div>
 <div class="fp-header-tools">
   <div class="fp-header-primary"><button class="fp-report" id="reportOpen">▣ &nbsp; Rapor Oluştur</button><button class="iconbtn" id="theme" aria-label="Temayı değiştir">${S.theme==="dark"?"☀":"☾"}</button><button class="iconbtn notification" aria-label="Bildirimler">♧<b>2</b></button><button class="iconbtn notification" aria-label="Mesajlar">✉<b>1</b></button>${profile}</div>
 </div>
 </header>`;
 return `<header class="topbar">
 <div class="top-brand"><img src="assets/tff-logo.png"><div><div class="top-brand-title">TFF</div><div class="top-brand-sub1">Türkiye Futbol Federasyonu</div><div class="top-brand-sub2">Video Analiz ve Gözlem Sistemi</div></div></div>
 <div class="search">⌕<input placeholder="Futbolcu, takım, maç, rapor ara..."><span>⌘ K</span></div>
 <div class="top-actions"><button class="iconbtn" id="theme">${S.theme==="dark"?"☀":"☾"}</button><button class="iconbtn notification">♧<b>5</b></button><button class="iconbtn notification">✉<b>2</b></button>${profile}</div>
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



const PLAYER_DATA=[
 {name:"Arda Güler",pos:"MDO",posLong:"Merkez Ofansif Orta Saha",age:19,club:"Real Madrid",country:"Türkiye",league:"La Liga",season:"2025/2026",foot:"Sol",score:84,pas:91,sut:86,drb:87,hiz:80,def:51,fiz:64,mental:83,attack:86,tech:88,matches:37,starts:21,minutes:1842,goals:6,assists:10,value:"45.00M €",height:"175 cm",weight:"68 kg",contract:"30.06.2029",img:"assets/player-arda.jpg",fallback:"assets/report-arda.jpg"},
 {name:"Orkun Kökçü",pos:"MDO",posLong:"Merkez Orta Saha",age:23,club:"Benfica",country:"Türkiye",league:"Primeira Liga",season:"2025/2026",foot:"Sağ",score:82,pas:86,sut:78,drb:83,hiz:84,def:55,fiz:69,mental:85,attack:80,tech:87,matches:35,starts:24,minutes:2296,goals:8,assists:9,value:"30.00M €",height:"175 cm",weight:"70 kg",contract:"30.06.2028",img:"assets/player-orkun.jpg",fallback:"assets/report-arda.jpg"},
 {name:"Demir Ege Tıknaz",pos:"MDO",posLong:"Merkez Orta Saha",age:20,club:"Rio Ave",country:"Türkiye",league:"Primeira Liga",season:"2025/2026",foot:"Sağ",score:78,pas:82,sut:69,drb:76,hiz:71,def:72,fiz:78,mental:78,attack:72,tech:80,matches:29,starts:18,minutes:1788,goals:3,assists:5,value:"8.50M €",height:"193 cm",weight:"78 kg",contract:"30.06.2029",img:"assets/player-demir.jpg",fallback:"assets/report-yusuf.jpg"},
 {name:"Yusuf Akçiçek",pos:"MDO",posLong:"Stoper",age:19,club:"Fenerbahçe",country:"Türkiye",league:"Trendyol Süper Lig",season:"2025/2026",foot:"Sol",score:76,pas:68,sut:52,drb:60,hiz:74,def:78,fiz:81,mental:76,attack:55,tech:69,matches:25,starts:17,minutes:1540,goals:2,assists:1,value:"12.00M €",height:"193 cm",weight:"80 kg",contract:"30.06.2030",img:"assets/1723820.jpg",fallback:"assets/report-yusuf.jpg"},
 {name:"Kenan Yıldız",pos:"MDO",posLong:"Sol Kanat",age:19,club:"Juventus",country:"Türkiye",league:"Serie A",season:"2025/2026",foot:"Sağ",score:75,pas:84,sut:71,drb:85,hiz:84,def:55,fiz:69,mental:77,attack:82,tech:84,matches:35,starts:24,minutes:2296,goals:8,assists:9,value:"30.00M €",height:"186 cm",weight:"77 kg",contract:"30.06.2029",img:"assets/2298586.jpg",fallback:"assets/report-kenan.jpg"}
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
   <section class="sc-selector"><div><small>KARŞILAŞTIRILACAK OYUNCULAR</small><h1>İki futbolcu seçin</h1></div><label><span>1. Oyuncu</span><select id="playerOneSelect">${options(ids[0]??0)}</select></label><button id="swapPlayers" class="sc-swap" aria-label="Oyuncuların yerini değiştir">⇄</button><label><span>2. Oyuncu</span><select id="playerTwoSelect">${options(ids[1]??4)}</select></label><button id="applyCompare" class="sc-primary">Karşılaştır</button></section>
   <section class="sc-selected-only">${simplePlayerCard(a,"left")}<div class="sc-vs">VS</div>${simplePlayerCard(b,"right")}</section>
   <section class="sc-quick-compare"><div><strong>${a.score}</strong><span>Genel Puan</span><strong>${b.score}</strong></div><div><strong>${a.matches}</strong><span>Maç</span><strong>${b.matches}</strong></div><div><strong>${a.goals} / ${a.assists}</strong><span>Gol / Asist</span><strong>${b.goals} / ${b.assists}</strong></div><div><strong>${a.value}</strong><span>Piyasa Değeri</span><strong>${b.value}</strong></div></section>
   <section class="sc-analysis-card"><div class="sc-analysis-head"><div><small>KARŞILAŞTIRMA</small><h2>Oyuncu Analizi</h2></div><div class="sc-tabs"><button data-compare-tab="skills" class="${S.compareTab==="skills"?"active":""}">Yetenek Analizi</button><button data-compare-tab="performance" class="${S.compareTab==="performance"?"active":""}">Performans</button><button data-compare-tab="heat" class="${S.compareTab==="heat"?"active":""}">Isı Haritası</button></div></div>${simpleCompareContent(a,b)}</section>
   ${reportModalV5()}
 </div>`;
}

function page(){if(S.route==="login")return loginPage();if(S.route==="home")return home();if(S.route==="milli-takimlar")return milli();if(S.route==="team-a-milli")return teamDetail();if(S.route==="futbolcu-ara")return playerSearchPage();return generic()}
function render(){if(S.route==="login"){if(location.hash!=="#/login")history.replaceState(null,"","#/login");document.getElementById("app").innerHTML=loginPage()}else{document.getElementById("app").innerHTML=`<div class="app-frame route-${S.route}">${topbar()}<div class="shell ${S.sidebarCollapsed?"sidebar-collapsed":""}">${sidebar()}<main class="main">${page()}</main></div></div>`}bind()}
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
 const reportSave=document.getElementById("reportSave");if(reportSave)reportSave.addEventListener("click",()=>{S.reportModal=false;render();setTimeout(()=>alert("Demo raporu oluşturuldu."),0)});
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
