import{a as f,S as I,N as G,P as R,R as F}from"./assets/vendor-BJTl0V0a.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))a(n);new MutationObserver(n=>{for(const r of n)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&a(o)}).observe(document,{childList:!0,subtree:!0});function s(n){const r={};return n.integrity&&(r.integrity=n.integrity),n.referrerPolicy&&(r.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?r.credentials="include":n.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(n){if(n.ep)return;n.ep=!0;const r=s(n);fetch(n.href,r)}})();const _="https://sound-wave.b.goit.study/api";f.defaults.baseURL=_;const $=8;async function D(){return(await f.get("/genres")).data}async function g(t={},e=1){const s={limit:$,page:e,...t},a=await f.get("/artists",{params:s});return{artists:a.data.artists,totalArtists:a.data.totalArtists}}async function V(t){return(await f.get(`/artists/${t}/albums`)).data}async function U(t=1){const e={limit:$,page:t};return(await f.get("/feedbacks",{params:e})).data.data}async function W(){const t=document.querySelector(".swiper-wrapper"),e=Math.ceil(1012/8),s=Math.floor(Math.random()*e)+1;(await U(s)).sort(()=>Math.random()-.5).slice(0,8).forEach(({descr:r,name:o,rating:l})=>{const d=document.createElement("div");d.classList.add("swiper-slide");const u=Math.round(l);d.innerHTML=`
      <div class="feedback-item">
        <div class="raty" data-score="${u}"></div>
        <p class="feedback-text">"${r}"</p>
        <p class="feedback-author">${o}</p>
      </div>
    `,t.appendChild(d)}),document.querySelectorAll(".raty").forEach(r=>{const o=r.dataset.score;new F(r,{starType:"i",score:o,readOnly:!0}).init()})}W().then(()=>{new I(".swiper",{modules:[G,R],speed:400,spaceBetween:30,loop:!0,navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"},pagination:{el:".swiper-pagination",clickable:!0,renderBullet:function(t,e){return`<span class="${e}"></span>`}}})});const L=document.querySelector(".artists-list"),w=document.querySelector(".modal"),m=document.querySelector(".backdrop-with-modal");document.querySelector(".artist-modal-list");const v=document.querySelector(".artists-pages"),E=document.querySelector(".filters"),Y=document.querySelector(".js-genres-list");function K(t){const e=Math.floor(t/1e3),s=Math.floor(e/60),a=e%60;return`${s}:${a<10?"0":""}${a}`}function b(t){return Math.ceil(t/$)}function Q(t){const{genres:e,strArtist:s,strArtistThumb:a,strBiographyEN:n,_id:r}=t;return`<li class="artist-card"> 
  
    <img  class="artist-thumb" src="${a}" alt="${s}">
    <ul class="artist-genres">
    ${X(e)}
    </ul>
    <h2 class="artist-name">${s}</h2>
    <p class="artist-biography">${n}</p>
    <button class="learn-more-btn" data-id="${r}">Learn More<svg width="24" height="24">
              <use href="./img/sprite.svg#icon-caret-right"></use>
            </svg></button>
    </li>`}function X(t){return t.map(s=>`<li class="genre-item">${s}</li>`).join("")}function y(t){const e=t.map(Q).join("");L.innerHTML="",L.insertAdjacentHTML("beforeend",e)}function Z(t){const e=t.map(({genre:s})=>`<li class="select-item">${s}</li>`).join("");Y.insertAdjacentHTML("beforeend",e)}function h(t,e){if(e===1){v.innerHTML="";return}if(t>e)return;let s="";s+=`
    <a href="#artists" class="page-btn" ${t===1?"disabled":""} data-page="${t-1}">
      ←
    </a>
  `,s+=`<a href="#artists" class="page-btn ${t===1?"active":""}" data-page="1">1</a>`,t>3&&(s+='<span class="dots">...</span>'),t>2&&(s+=`<a href="#artists" class="page-btn" data-page="${t-1}">${t-1}</a>`),t!==1&&t!==e&&(s+=`<a href="#artists" class="page-btn active" data-page="${t}">${t}</a>`),t<e-1&&(s+=`<a href="#artists" class="page-btn" data-page="${t+1}">${t+1}</a>`),t<e-2&&(s+='<span class="dots">...</span>'),e>1&&(s+=`<a href="#artists" class="page-btn ${t===e?"active":""}" data-page="${e}">${e}</a>`),s+=`
    <a href="#artists" class="page-btn" ${t===e?"disabled":""} data-page="${t+1}">
      →
    </a> 
  `,v.innerHTML=s}function z(t){console.log(t);const{strArtist:e,strArtistThumb:s,intFormedYear:a,intDiedYear:n,strGender:r,intMembers:o,strCountry:l,strBiographyEN:d,genres:u,albumsList:T}=t,x=w.querySelector(".modal-main-heading");x.textContent=e;const N=w.querySelector(".modal-artist-img");N.src=s;const j=document.querySelector(".js-modal-years");j.textContent=n===null?`${a}-present`:`${a}-${n}`;const B=document.querySelector(".js-modal-sex");B.textContent=r;const H=document.querySelector(".js-modal-members");H.textContent=o;const O=document.querySelector(".js-modal-country");O.textContent=l;const P=document.querySelector(".js-modal-bio");P.textContent=d;const A=document.querySelector(".modal-info-genres-list");A.innerHTML="",A.insertAdjacentHTML("beforeend",J(u));const M=document.querySelector(".artist-modal-list");M.innerHTML="",M.insertAdjacentHTML("beforeend",tt(T))}function J(t){return t.map(s=>`<li class="modal-info-genre-li"><p class="modal-info-genre">${s}</p></li>`).join("")}function tt(t){return t.map(s=>et(s)).join("")}function et({strAlbum:t,tracks:e}){return`<li class="modal-table-li"><h2 class="artist-modal-album-title">${t}</h2>
                        <table class="artist-modal-album">
                            <thead>
                                <tr>
                                   <th scope="col">Track</th>
                                   <th scope="col">Time</th>
                                   <th scope="col">Link</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${st(e)}
                            </tbody>
                        </table></li>`}function st(t){return t.map(s=>nt(s)).join("")}function nt({strTrack:t,intDuration:e,movie:s}){const a=s?'<svg width="24" height="24" style="fill: #fff;"><use href="./img/sprite.svg#youtube"></use></svg>':"";return`<tr>
                        <td>${t}</td>
                        <td>${K(e)}</td>
                        <td><a href="${s}">${a}</a></td>
                    </tr>`}let c=1,i={},k="",p=null;async function rt(t){try{const e=t.target.value.trim();if(e.length===k.length)return;k=e,e?i.name=e:delete i.name,c=1;const{artists:s,totalArtists:a}=await g(i,c);y(s),h(c,b(a))}catch(e){console.log(e)}}async function at(t){try{if(t.target.closest(".select-btn")){const e=t.target.closest(".select-btn").nextElementSibling;e.classList.toggle("is-hidden"),p&&p!==e&&p.classList.add("is-hidden"),p=e;return}if(t.target.tagName==="LI"){const e=t.target.closest(".select"),s=e.querySelector(".select-input"),a=e.querySelector(".select-btn"),n=e.querySelector(".select-list-wrapper");if(s&&(s.value=t.target.textContent.trim()),a){const r=Array.from(a.childNodes).find(o=>o.nodeType===Node.TEXT_NODE);if(r){const o=t.target.textContent.trim();r.nodeValue=o;const l=e.dataset.selectName;l==="sortName"?o==="Default"?delete i.sortName:i={...i,[l]:o==="Z-A"?"desc":"asc"}:o==="All Genres"?delete i.genre:i={...i,[l]:o},c=1;const{artists:d,totalArtists:u}=await g(i,c);y(d),h(c,b(u))}}n&&n.classList.add("is-hidden")}}catch(e){console.log(e)}}async function ot(t){const e=t.target.closest(".page-btn");if(!e||e.disabled||e.classList.contains("active"))return;const s=Number(e.dataset.page);if(s<1)return;c=s,console.log(c);const{artists:a,totalArtists:n}=await g(i,c),r=b(n);console.log(a,n,r),y(a),h(c,r)}async function it(t){m.classList.add("is-open"),console.log(t.target.dataset.id);const e=await V(t.target.dataset.id);z(e),document.body.style.overflow="hidden",m.addEventListener("click",S),document.addEventListener("keydown",C)}function S(t){const e=t.target.closest(".modal-close-button"),s=t.target===m;(e||s)&&q()}function C(t){t.key==="Escape"&&q()}function q(){m.classList.remove("is-open"),document.body.style.overflow="",m.removeEventListener("click",S),document.removeEventListener("keydown",C)}async function ct(){const{artists:t,totalArtists:e}=await g();y(t);const s=await D();h(1,b(e)),Z(s)}ct();E.addEventListener("input",rt);E.addEventListener("click",at);v.addEventListener("click",ot);L.addEventListener("click",t=>{t.target.closest(".learn-more-btn")&&it(t)});
//# sourceMappingURL=index.js.map
