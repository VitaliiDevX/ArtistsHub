import{a as m,S as G,N as R,P as F,R as V}from"./assets/vendor-BJTl0V0a.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))a(r);new MutationObserver(r=>{for(const n of r)if(n.type==="childList")for(const o of n.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&a(o)}).observe(document,{childList:!0,subtree:!0});function s(r){const n={};return r.integrity&&(n.integrity=r.integrity),r.referrerPolicy&&(n.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?n.credentials="include":r.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function a(r){if(r.ep)return;r.ep=!0;const n=s(r);fetch(r.href,n)}})();const _="https://sound-wave.b.goit.study/api";m.defaults.baseURL=_;const w=8;async function D(){return(await m.get("/genres")).data}async function h(t={},e=1){const s={limit:w,page:e,...t},a=await m.get("/artists",{params:s});return{artists:a.data.artists,totalArtists:a.data.totalArtists}}async function U(t){return(await m.get(`/artists/${t}/albums`)).data}async function W(t=1){const e={limit:w,page:t};return(await m.get("/feedbacks",{params:e})).data.data}async function Y(){const t=document.querySelector(".swiper-wrapper"),e=Math.ceil(1012/8),s=Math.floor(Math.random()*e)+1;(await W(s)).sort(()=>Math.random()-.5).slice(0,8).forEach(({descr:n,name:o,rating:l})=>{const d=document.createElement("div");d.classList.add("swiper-slide");const u=Math.round(l);d.innerHTML=`
      <div class="feedback-item">
        <div class="raty" data-score="${u}"></div>
        <p class="feedback-text">"${n}"</p>
        <p class="feedback-author">${o}</p>
      </div>
    `,t.appendChild(d)}),document.querySelectorAll(".raty").forEach(n=>{const o=n.dataset.score;new V(n,{starType:"i",score:o,readOnly:!0}).init()})}Y().then(()=>{new G(".swiper",{modules:[R,F],speed:400,spaceBetween:30,loop:!0,navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"},pagination:{el:".swiper-pagination",clickable:!0,renderBullet:function(t,e){return`<span class="${e}"></span>`}}})});const v=document.querySelector(".artists-list"),k=document.querySelector(".modal"),f=document.querySelector(".backdrop-with-modal");document.querySelector(".artist-modal-list");const $=document.querySelector(".artists-pages"),S=document.querySelector(".filters"),K=document.querySelector(".js-genres-list");function Q(t){const e=Math.floor(t/1e3),s=Math.floor(e/60),a=e%60;return`${s}:${a<10?"0":""}${a}`}function b(t){return Math.ceil(t/w)}const g="/ArtistsHub/assets/sprite-C-VO0C7L.svg";function X(t){const{genres:e,strArtist:s,strArtistThumb:a,strBiographyEN:r,_id:n}=t;return`<li class="artist-card"> 
  
    <img  class="artist-thumb" src="${a}" alt="${s}">
    <ul class="artist-genres">
    ${Z(e)}
    </ul>
    <h2 class="artist-name">${s}</h2>
    <p class="artist-biography">${r}</p>
    <button class="learn-more-btn" data-id="${n}">Learn More<svg width="24" height="24">
              <use href="${g}#icon-caret-right"></use>
            </svg></button>
    </li>`}function Z(t){return t.map(s=>`<li class="genre-item">${s}</li>`).join("")}function y(t){const e=t.map(X).join("");v.innerHTML="",v.insertAdjacentHTML("beforeend",e)}function z(t){const e=t.map(({genre:s})=>`<li class="select-item">${s}</li>`).join("");K.insertAdjacentHTML("beforeend",e)}function L(t,e){if(e===1){$.innerHTML="";return}if(t>e)return;let s="";s+=`
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
  `,$.innerHTML=s}function J(t){const{strArtist:e,strArtistThumb:s,intFormedYear:a,intDiedYear:r,strGender:n,intMembers:o,strCountry:l,strBiographyEN:d,genres:u,albumsList:x}=t,N=k.querySelector(".modal-main-heading");N.textContent=e;const j=k.querySelector(".modal-artist-img");j.src=s;const H=document.querySelector(".js-modal-years");H.textContent=r===null?`${a}-present`:`${a}-${r}`;const O=document.querySelector(".js-modal-sex");O.textContent=n;const B=document.querySelector(".js-modal-members");B.textContent=o;const P=document.querySelector(".js-modal-country");P.textContent=l;const I=document.querySelector(".js-modal-bio");I.textContent=d;const A=document.querySelector(".modal-info-genres-list");A.innerHTML="",A.insertAdjacentHTML("beforeend",tt(u));const M=document.querySelector(".artist-modal-list");M.innerHTML="",M.insertAdjacentHTML("beforeend",et(x))}function tt(t){return t.map(s=>`<li class="modal-info-genre-li"><p class="modal-info-genre">${s}</p></li>`).join("")}function et(t){return t.map(s=>st(s)).join("")}function st({strAlbum:t,tracks:e}){return`<li class="modal-table-li"><h2 class="artist-modal-album-title">${t}</h2>
                        <table class="artist-modal-album">
                            <thead>
                                <tr>
                                   <th scope="col">Track</th>
                                   <th scope="col">Time</th>
                                   <th scope="col">Link</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${rt(e)}
                            </tbody>
                        </table></li>`}function rt(t){return t.map(s=>nt(s)).join("")}function nt({strTrack:t,intDuration:e,movie:s}){const a=s?`<svg width="24" height="24" style="fill: #fff;"><use href="${g}#youtube"></use></svg>`:"";return`<tr>
                        <td>${t}</td>
                        <td>${Q(e)}</td>
                        <td><a href="${s}">${a}</a></td>
                    </tr>`}let c=1,i={},E="",p=null;async function at(t){try{const e=t.target.value.trim();if(e.length===E.length)return;E=e,e?i.name=e:delete i.name,c=1;const{artists:s,totalArtists:a}=await h(i,c);y(s),L(c,b(a))}catch(e){console.log(e)}}async function ot(t){try{if(t.target.closest(".select-btn")){const e=t.target.closest(".select-btn").nextElementSibling;e.classList.toggle("is-hidden"),p&&p!==e&&p.classList.add("is-hidden"),p=e;return}if(t.target.tagName==="LI"){const e=t.target.closest(".select"),s=e.querySelector(".select-input"),a=e.querySelector(".select-btn"),r=e.querySelector(".select-list-wrapper");if(s&&(s.value=t.target.textContent.trim()),a){const n=Array.from(a.childNodes).find(o=>o.nodeType===Node.TEXT_NODE);if(n){const o=t.target.textContent.trim();n.nodeValue=o;const l=e.dataset.selectName;l==="sortName"?o==="Default"?delete i.sortName:i={...i,[l]:o==="Z-A"?"desc":"asc"}:o==="All Genres"?delete i.genre:i={...i,[l]:o},c=1;const{artists:d,totalArtists:u}=await h(i,c);y(d),L(c,b(u))}}r&&r.classList.add("is-hidden")}}catch(e){console.log(e)}}async function it(t){const e=t.target.closest(".page-btn");if(!e||e.disabled||e.classList.contains("active"))return;const s=Number(e.dataset.page);if(s<1)return;c=s,console.log(c);const{artists:a,totalArtists:r}=await h(i,c),n=b(r);console.log(a,r,n),y(a),L(c,n)}async function ct(t){f.classList.add("is-open");const e=await U(t.target.dataset.id);J(e),document.body.style.overflow="hidden",f.addEventListener("click",C),document.addEventListener("keydown",q)}function C(t){const e=t.target.closest(".modal-close-button"),s=t.target===f;(e||s)&&T()}function q(t){t.key==="Escape"&&T()}function T(){f.classList.remove("is-open"),document.body.style.overflow="",f.removeEventListener("click",C),document.removeEventListener("keydown",q)}async function lt(){const{artists:t,totalArtists:e}=await h();y(t);const s=await D();L(1,b(e)),z(s)}lt();S.addEventListener("input",at);S.addEventListener("click",ot);$.addEventListener("click",it);v.addEventListener("click",t=>{t.target.closest(".learn-more-btn")&&ct(t)});
//# sourceMappingURL=index.js.map
