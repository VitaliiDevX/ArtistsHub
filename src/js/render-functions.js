// import { refs } from '../main';
// import SimpleLightbox from 'simplelightbox';

// const lightbox = new SimpleLightbox('.gallery a', {
//   captionsData: 'alt',
//   captionDelay: 250,
// });

// export function createGallery(images) {
//   const galleryHTML = images
//     .map(
//       ({
//         webformatURL,
//         largeImageURL,
//         tags,
//         likes,
//         views,
//         comments,
//         downloads,
//       }) => `
//     <li class="card">
//       <a href="${largeImageURL}">
//         <img src="${webformatURL}" alt="${tags}" class="card-image">
//       </a>
//       <div class="card-content">
//         <ul class="card-stats">
//           <li class="stat">
//             <span class="stat-label">Likes</span>
//             <span class="stat-number">${likes || 0}</span>
//           </li>
//           <li class="stat">
//             <span class="stat-label">Views</span>
//             <span class="stat-number">${views || 0}</span>
//           </li>
//           <li class="stat">
//             <span class="stat-label">Comments</span>
//             <span class="stat-number">${comments || 0}</span>
//           </li>
//           <li class="stat">
//             <span class="stat-label">Downloads</span>
//             <span class="stat-number">${downloads || 0}</span>
//           </li>
//         </ul>
//       </div>
//     </li>
//   `
//     )
//     .join('');

//   refs.gallery.insertAdjacentHTML('beforeend', galleryHTML);

//   lightbox.refresh();
// }

// export function clearGallery() {
//   refs.gallery.innerHTML = '';
// }

// export function showLoader() {
//   refs.loader.classList.add('is-visible');
// }

// export function hideLoader() {
//   refs.loader.classList.remove('is-visible');
// }

// export function showLoadMoreButton() {
//   refs.loadMoreBtn.classList.add('is-visible');
// }

// export function hideLoadMoreButton() {
//   refs.loadMoreBtn.classList.remove('is-visible');
// }
