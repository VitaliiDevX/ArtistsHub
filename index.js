import{a as m,S as F,N as D,P as V,R as _,b as S,A as E}from"./assets/vendor-Bx2Hut4r.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))a(r);new MutationObserver(r=>{for(const n of r)if(n.type==="childList")for(const o of n.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&a(o)}).observe(document,{childList:!0,subtree:!0});function s(r){const n={};return r.integrity&&(n.integrity=r.integrity),r.referrerPolicy&&(n.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?n.credentials="include":r.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function a(r){if(r.ep)return;r.ep=!0;const n=s(r);fetch(r.href,n)}})();const U="https://sound-wave.b.goit.study/api";m.defaults.baseURL=U;const $=8;async function W(){return(await m.get("/genres")).data}async function b(t={},e=1){const s={limit:$,page:e,...t},a=await m.get("/artists",{params:s});return{artists:a.data.artists,totalArtists:a.data.totalArtists}}async function Y(t){return(await m.get(`/artists/${t}/albums`)).data}async function K(t=1){const e={limit:$,page:t};return(await m.get("/feedbacks",{params:e})).data.data}const Q=document.querySelectorAll(".arrow-btn");async function X(){const t=document.querySelector(".swiper-wrapper");try{const e=[1,2,3];(await Promise.all(e.map(n=>K(n)))).flat().sort(()=>Math.random()-.5).slice(0,8).forEach(({descr:n,name:o,rating:l})=>{const d=document.createElement("div");d.classList.add("swiper-slide");const u=Math.round(l);d.innerHTML=`
      <div class="feedback-item">
        <div class="raty" data-score="${u}"></div>
        <p class="feedback-text">"${n}"</p>
        <p class="feedback-author">${o}</p>
      </div>
    `,t.appendChild(d)}),document.querySelectorAll(".raty").forEach(n=>{const o=n.dataset.score;new _(n,{starType:"i",score:o,readOnly:!0}).init()})}catch(e){console.error("Error fetching feedbacks:",e),t.innerHTML=`
      <div class="swiper-slide">
        <div class="feedback-item">
          <p class="feedback-text">Could not load reviews. Please try again later.</p>
        </div>
      </div>
    `,Q.forEach(s=>{s.style.display="none"})}}X().then(()=>{new F(".swiper",{modules:[D,V],speed:400,spaceBetween:30,loop:!0,navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"},pagination:{el:".swiper-pagination",clickable:!0,renderBullet:function(t,e){return`<span class="${e}"></span>`}}})});const v=document.querySelector(".artists-list"),M=document.querySelector(".modal"),f=document.querySelector(".backdrop-with-modal");document.querySelector(".artist-modal-list");const w=document.querySelector(".artists-pages"),q=document.querySelector(".filters"),Z=document.querySelector(".js-genres-list");function z(t){const e=Math.floor(t/1e3),s=Math.floor(e/60),a=e%60;return`${s}:${a<10?"0":""}${a}`}function h(t){return Math.ceil(t/$)}const g="/ArtistsHub/assets/sprite-C-VO0C7L.svg";function J(t){const{genres:e,strArtist:s,strArtistThumb:a,strBiographyEN:r,_id:n}=t;return`<li class="artist-card"> 
  
    <img  class="artist-thumb" src="${a}" alt="${s}">
    <ul class="artist-genres">
    ${tt(e)}
    </ul>
    <h2 class="artist-name">${s}</h2>
    <p class="artist-biography">${r}</p>
    <button class="learn-more-btn" data-id="${n}">Learn More<svg width="24" height="24">
              <use href="${g}#icon-caret-right"></use>
            </svg></button>
    </li>`}function tt(t){return t.map(s=>`<li class="genre-item">${s}</li>`).join("")}function y(t){const e=t.map(J).join("");v.innerHTML="",v.insertAdjacentHTML("beforeend",e)}function et(t){const e=t.map(({genre:s})=>`<li class="select-item">${s}</li>`).join("");Z.insertAdjacentHTML("beforeend",e)}function L(t,e){if(e===1){w.innerHTML="";return}if(t>e)return;let s="";s+=`
    <a href="#artists" class="page-btn arrow-btn" ${t===1?"disabled":""} data-page="${t-1}">
      <svg width="24" height="24">
        <use href="${g}#left-arrow-btn"></use>
      </svg>
    </a>
  `,s+=`<a href="#artists" class="page-btn ${t===1?"active":""}" data-page="1">1</a>`,t>3&&(s+='<span class="dots">...</span>'),t>2&&(s+=`<a href="#artists" class="page-btn" data-page="${t-1}">${t-1}</a>`),t!==1&&t!==e&&(s+=`<a href="#artists" class="page-btn active" data-page="${t}">${t}</a>`),t<e-1&&(s+=`<a href="#artists" class="page-btn" data-page="${t+1}">${t+1}</a>`),t<e-2&&(s+='<span class="dots">...</span>'),e>1&&(s+=`<a href="#artists" class="page-btn ${t===e?"active":""}" data-page="${e}">${e}</a>`),s+=`
    <a href="#artists" class="page-btn arrow-btn" ${t===e?"disabled":""} data-page="${t+1}">
      <svg width="24" height="24">
        <use href="${g}#right-arrow-btn"></use>
      </svg>
    </a> 
  `,w.innerHTML=s}function st(t){const{strArtist:e,strArtistThumb:s,intFormedYear:a,intDiedYear:r,strGender:n,intMembers:o,strCountry:l,strBiographyEN:d,genres:u,albumsList:j}=t,H=M.querySelector(".modal-main-heading");H.textContent=e;const O=M.querySelector(".modal-artist-img");O.src=s;const B=document.querySelector(".js-modal-years");B.textContent=r===null?`${a}-present`:`${a}-${r}`;const P=document.querySelector(".js-modal-sex");P.textContent=n;const I=document.querySelector(".js-modal-members");I.textContent=o;const G=document.querySelector(".js-modal-country");G.textContent=l;const R=document.querySelector(".js-modal-bio");R.textContent=d;const A=document.querySelector(".modal-info-genres-list");A.innerHTML="",A.insertAdjacentHTML("beforeend",rt(u));const k=document.querySelector(".artist-modal-list");k.innerHTML="",k.insertAdjacentHTML("beforeend",nt(j))}function rt(t){return t.map(s=>`<li class="modal-info-genre-li"><p class="modal-info-genre">${s}</p></li>`).join("")}function nt(t){return t.map(s=>at(s)).join("")}function at({strAlbum:t,tracks:e}){return`<li class="modal-table-li"><h2 class="artist-modal-album-title">${t}</h2>
                        <table class="artist-modal-album">
                            <thead>
                                <tr>
                                   <th scope="col">Track</th>
                                   <th scope="col">Time</th>
                                   <th scope="col">Link</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${ot(e)}
                            </tbody>
                        </table></li>`}function ot(t){return t.map(s=>it(s)).join("")}function it({strTrack:t,intDuration:e,movie:s}){const a=s?`<svg class="icon-modal-artist-track-list" width="24" height="24"><use href="${g}#youtube"></use></svg>`:"";return`<tr>
                        <td>${t}</td>
                        <td>${z(e)}</td>
                        <td><a class="link-modal-artist-track-list" href="${s}">${a}</a></td>
                    </tr>`}let c=1,i={},C="",p=null;async function ct(t){try{const e=t.target.value.trim();if(e.length===C.length)return;C=e,e?i.name=e:delete i.name,c=1;const{artists:s,totalArtists:a}=await b(i,c);y(s),L(c,h(a))}catch(e){console.log(e)}}async function lt(t){try{if(t.target.closest(".select-btn")){const e=t.target.closest(".select-btn").nextElementSibling;e.classList.toggle("is-hidden"),p&&p!==e&&p.classList.add("is-hidden"),p=e;return}if(t.target.tagName==="LI"){const e=t.target.closest(".select"),s=e.querySelector(".select-input"),a=e.querySelector(".select-btn"),r=e.querySelector(".select-list-wrapper");if(s&&(s.value=t.target.textContent.trim()),a){const n=Array.from(a.childNodes).find(o=>o.nodeType===Node.TEXT_NODE);if(n){const o=t.target.textContent.trim();n.nodeValue=o;const l=e.dataset.selectName;l==="sortName"?o==="Default"?delete i.sortName:i={...i,[l]:o==="Z-A"?"desc":"asc"}:o==="All Genres"?delete i.genre:i={...i,[l]:o},c=1;const{artists:d,totalArtists:u}=await b(i,c);y(d),L(c,h(u))}}r&&r.classList.add("is-hidden")}}catch(e){console.log(e)}}async function dt(t){const e=t.target.closest(".page-btn");if(!e||e.disabled||e.classList.contains("active"))return;const s=Number(e.dataset.page);if(s<1)return;c=s,console.log(c);const{artists:a,totalArtists:r}=await b(i,c),n=h(r);console.log(a,r,n),y(a),L(c,n)}async function ut(t){f.classList.add("is-open");const e=await Y(t.target.dataset.id);st(e),document.body.style.overflow="hidden",f.addEventListener("click",T),document.addEventListener("keydown",x)}function T(t){const e=t.target.closest(".modal-close-button"),s=t.target===f;(e||s)&&N()}function x(t){t.key==="Escape"&&N()}function N(){f.classList.remove("is-open"),document.body.style.overflow="",f.removeEventListener("click",T),document.removeEventListener("keydown",x)}function ft(){new S("#slider-left",{direction:"ttb",height:"500px",type:"loop",drag:!1,arrows:!1,pagination:!1,autoScroll:{speed:.5}}).mount({AutoScroll:E}),new S("#slider-right",{direction:"ttb",height:"500px",type:"loop",drag:!1,arrows:!1,pagination:!1,autoScroll:{speed:-.5}}).mount({AutoScroll:E})}document.addEventListener("DOMContentLoaded",()=>{ft()});async function mt(){const{artists:t,totalArtists:e}=await b();y(t);const s=await W();L(1,h(e)),et(s)}mt();q.addEventListener("input",ct);q.addEventListener("click",lt);w.addEventListener("click",dt);v.addEventListener("click",t=>{t.target.closest(".learn-more-btn")&&ut(t)});
//# sourceMappingURL=index.js.map
