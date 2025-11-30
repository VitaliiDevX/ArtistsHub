import{a as m,S as R,N as D,P as V,R as W,b as k,A as E}from"./assets/vendor-Bx2Hut4r.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))a(n);new MutationObserver(n=>{for(const r of n)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&a(o)}).observe(document,{childList:!0,subtree:!0});function s(n){const r={};return n.integrity&&(r.integrity=n.integrity),n.referrerPolicy&&(r.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?r.credentials="include":n.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(n){if(n.ep)return;n.ep=!0;const r=s(n);fetch(n.href,r)}})();const _="https://sound-wave.b.goit.study/api";m.defaults.baseURL=_;const $=8;async function U(){return(await m.get("/genres")).data}async function b(t={},e=1){const s={limit:$,page:e,...t},a=await m.get("/artists",{params:s});return{artists:a.data.artists,totalArtists:a.data.totalArtists}}async function Y(t){return(await m.get(`/artists/${t}/albums`)).data}async function K(t=1){const e={limit:$,page:t};return(await m.get("/feedbacks",{params:e})).data.data}const Q=document.querySelectorAll(".arrow-btn");async function X(){const t=document.querySelector(".swiper-wrapper");try{const e=[1,2,3];(await Promise.all(e.map(r=>K(r)))).flat().sort(()=>Math.random()-.5).slice(0,8).forEach(({descr:r,name:o,rating:l})=>{const d=document.createElement("div");d.classList.add("swiper-slide");const u=Math.round(l);d.innerHTML=`
      <div class="feedback-item">
        <div class="raty" data-score="${u}"></div>
        <p class="feedback-text">"${r}"</p>
        <p class="feedback-author">${o}</p>
      </div>
    `,t.appendChild(d)}),document.querySelectorAll(".raty").forEach(r=>{const o=r.dataset.score;new W(r,{starType:"i",score:o,readOnly:!0}).init()})}catch(e){console.error("Error fetching feedbacks:",e),t.innerHTML=`
      <div class="swiper-slide">
        <div class="feedback-item">
          <p class="feedback-text">Could not load reviews. Please try again later.</p>
        </div>
      </div>
    `,Q.forEach(s=>{s.style.display="none"})}}X().then(()=>{new R(".swiper",{modules:[D,V],speed:400,spaceBetween:30,loop:!0,navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"},pagination:{el:".swiper-pagination",clickable:!0,renderBullet:function(t,e){return`<span class="${e}"></span>`}}})});const v=document.querySelector(".artists-list"),M=document.querySelector(".modal"),f=document.querySelector(".backdrop-with-modal");document.querySelector(".artist-modal-list");const w=document.querySelector(".artists-pages"),Z=document.querySelector(".js-genres-list"),z=document.querySelector(".filter-btn"),x=document.querySelector(".filters");function J(t){const e=Math.floor(t/1e3),s=Math.floor(e/60),a=e%60;return`${s}:${a<10?"0":""}${a}`}function y(t){return Math.ceil(t/$)}const g="/ArtistsHub/assets/sprite-C-VO0C7L.svg";function tt(t){const{genres:e,strArtist:s,strArtistThumb:a,strBiographyEN:n,_id:r}=t;return`<li class="artist-card"> 
  
    <img  class="artist-thumb" src="${a}" alt="${s}">
    <ul class="artist-genres">
    ${et(e)}
    </ul>
    <h2 class="artist-name">${s}</h2>
    <p class="artist-biography">${n}</p>
    <button class="learn-more-btn" data-id="${r}">Learn More<svg width="24" height="24">
              <use href="${g}#icon-caret-right"></use>
            </svg></button>
    </li>`}function et(t){return t.map(s=>`<li class="genre-item">${s}</li>`).join("")}function h(t){const e=t.map(tt).join("");v.innerHTML="",v.insertAdjacentHTML("beforeend",e)}function st(t){const e=t.map(({genre:s})=>`<li class="select-item">${s}</li>`).join("");Z.insertAdjacentHTML("beforeend",e)}function L(t,e){if(e===1){w.innerHTML="";return}if(t>e)return;let s="";s+=`
    <a href="#artists-content" class="page-btn arrow-btn" ${t===1?"disabled":""} data-page="${t-1}">
      <svg width="24" height="24">
        <use href="${g}#left-arrow-btn"></use>
      </svg>
    </a>
  `,s+=`<a href="#artists-content" class="page-btn ${t===1?"active":""}" data-page="1">1</a>`,t>3&&(s+='<span class="dots">...</span>'),t>2&&(s+=`<a href="#artists-content" class="page-btn" data-page="${t-1}">${t-1}</a>`),t!==1&&t!==e&&(s+=`<a href="#artists-content" class="page-btn active" data-page="${t}">${t}</a>`),t<e-1&&(s+=`<a href="#artists-content" class="page-btn" data-page="${t+1}">${t+1}</a>`),t<e-2&&(s+='<span class="dots">...</span>'),e>1&&(s+=`<a href="#artists-content" class="page-btn ${t===e?"active":""}" data-page="${e}">${e}</a>`),s+=`
    <a href="#artists-content" class="page-btn arrow-btn" ${t===e?"disabled":""} data-page="${t+1}">
      <svg width="24" height="24">
        <use href="${g}#right-arrow-btn"></use>
      </svg>
    </a> 
  `,w.innerHTML=s}function nt(t){const{strArtist:e,strArtistThumb:s,intFormedYear:a,intDiedYear:n,strGender:r,intMembers:o,strCountry:l,strBiographyEN:d,genres:u,albumsList:j}=t,B=M.querySelector(".modal-main-heading");B.textContent=e;const H=M.querySelector(".modal-artist-img");H.src=s;const O=document.querySelector(".js-modal-years");O.textContent=n===null?`${a}-present`:`${a}-${n}`;const P=document.querySelector(".js-modal-sex");P.textContent=r;const I=document.querySelector(".js-modal-members");I.textContent=o;const G=document.querySelector(".js-modal-country");G.textContent=l;const F=document.querySelector(".js-modal-bio");F.textContent=d;const A=document.querySelector(".modal-info-genres-list");A.innerHTML="",A.insertAdjacentHTML("beforeend",rt(u));const S=document.querySelector(".artist-modal-list");S.innerHTML="",S.insertAdjacentHTML("beforeend",at(j))}function rt(t){return t.map(s=>`<li class="modal-info-genre-li"><p class="modal-info-genre">${s}</p></li>`).join("")}function at(t){return t.map(s=>ot(s)).join("")}function ot({strAlbum:t,tracks:e}){return`<li class="modal-table-li"><h2 class="artist-modal-album-title">${t}</h2>
                        <table class="artist-modal-album">
                            <thead>
                                <tr>
                                   <th scope="col">Track</th>
                                   <th scope="col">Time</th>
                                   <th scope="col">Link</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${it(e)}
                            </tbody>
                        </table></li>`}function it(t){return t.map(s=>ct(s)).join("")}function ct({strTrack:t,intDuration:e,movie:s}){const a=s?`<svg class="icon-modal-artist-track-list" width="24" height="24"><use href="${g}#youtube"></use></svg>`:"";return`<tr>
                        <td>${t}</td>
                        <td>${J(e)}</td>
                        <td><a class="link-modal-artist-track-list" href="${s}">${a}</a></td>
                    </tr>`}let c=1,i={},C="",p=null;async function lt(t){try{const e=t.target.value.trim();if(e.length===C.length)return;C=e,e?i.name=e:delete i.name,c=1;const{artists:s,totalArtists:a}=await b(i,c);h(s),L(c,y(a))}catch(e){console.log(e)}}async function dt(t){try{if(t.target.closest(".select-btn")){const e=t.target.closest(".select-btn").nextElementSibling;e.classList.toggle("is-hidden"),p&&p!==e&&p.classList.add("is-hidden"),p=e;return}if(t.target.tagName==="LI"){const e=t.target.closest(".select"),s=e.querySelector(".select-input"),a=e.querySelector(".select-btn"),n=e.querySelector(".select-list-wrapper");if(s&&(s.value=t.target.textContent.trim()),a){const r=Array.from(a.childNodes).find(o=>o.nodeType===Node.TEXT_NODE);if(r){const o=t.target.textContent.trim();r.nodeValue=o;const l=e.dataset.selectName;l==="sortName"?o==="Default"?delete i.sortName:i={...i,[l]:o==="Z-A"?"desc":"asc"}:o==="All Genres"?delete i.genre:i={...i,[l]:o},c=1;const{artists:d,totalArtists:u}=await b(i,c);h(d),L(c,y(u))}}n&&n.classList.add("is-hidden")}}catch(e){console.log(e)}}async function ut(t){const e=t.target.closest(".page-btn");if(!e||e.disabled||e.classList.contains("active"))return;const s=Number(e.dataset.page);if(s<1)return;c=s,console.log(c);const{artists:a,totalArtists:n}=await b(i,c),r=y(n);console.log(a,n,r),h(a),L(c,r)}async function ft(t){f.classList.add("is-open");const e=await Y(t.target.dataset.id);nt(e),document.body.style.overflow="hidden",f.addEventListener("click",q),document.addEventListener("keydown",T)}function q(t){const e=t.target.closest(".modal-close-button"),s=t.target===f;(e||s)&&N()}function T(t){t.key==="Escape"&&N()}function N(){f.classList.remove("is-open"),document.body.style.overflow="",f.removeEventListener("click",q),document.removeEventListener("keydown",T)}function mt(t){const e=t.target.closest(".filter-btn");e.nextElementSibling.style.display==="flex"?e.nextElementSibling.style.display="none":e.nextElementSibling.style.display="flex"}function pt(){new k("#slider-left",{direction:"ttb",height:"500px",type:"loop",drag:!1,arrows:!1,pagination:!1,autoScroll:{speed:.5}}).mount({AutoScroll:E}),new k("#slider-right",{direction:"ttb",height:"500px",type:"loop",drag:!1,arrows:!1,pagination:!1,autoScroll:{speed:-.5}}).mount({AutoScroll:E})}document.addEventListener("DOMContentLoaded",()=>{pt()});async function gt(){const{artists:t,totalArtists:e}=await b();h(t);const s=await U();L(1,y(e)),st(s)}gt();x.addEventListener("input",lt);x.addEventListener("click",dt);w.addEventListener("click",ut);z.addEventListener("click",mt);v.addEventListener("click",t=>{t.target.closest(".learn-more-btn")&&ft(t)});
//# sourceMappingURL=index.js.map
