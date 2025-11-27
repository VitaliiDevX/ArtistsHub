// import iziToast from 'izitoast';
// import errorUrl from './img/error.svg';
// import cautionUrl from './img/caution.svg';
// import infoUrl from './img/bell.svg';
// import { getImagesByQuery, PER_PAGE } from './js/pixabay-api';
// import {
//   clearGallery,
//   createGallery,
//   hideLoader,
//   hideLoadMoreButton,
//   showLoader,
//   showLoadMoreButton,
// } from './js/render-functions';

// export const refs = {
//   form: document.querySelector('.form'),
//   gallery: document.querySelector('.gallery'),
//   loadMoreBtn: document.querySelector('.load-more-btn'),
//   loader: document.querySelector('.loader'),
// };

// let page = 1;
// let currentQuery = '';

// refs.form.addEventListener('submit', onSubmit);
// refs.loadMoreBtn.addEventListener('click', onClick);

// async function onSubmit(e) {
//   e.preventDefault();

//   const query = e.target.elements.search_text.value.trim();

//   if (query === '') {
//     iziToast.warning({
//       title: 'Caution',
//       message: 'The search field cannot be empty',
//       position: 'topRight',
//       backgroundColor: '#ffa000',
//       titleColor: '#fff',
//       messageColor: '#fff',
//       progressBarColor: '#bb7b10',
//       close: true,
//       iconUrl: cautionUrl,
//       class: 'my-toast',
//     });

//     return;
//   }

//   currentQuery = query;

//   clearGallery();
//   page = 1;

//   await fetchImages();
// }

// async function onClick(e) {
//   const cards = Array.from(refs.gallery.querySelectorAll('.card'));

//   page++;

//   await fetchImages();

//   // прокрутка як по завданню
//   // const firstCard = document.querySelector('.gallery .card');
//   // if (!firstCard) return;
//   // const { height: cardHeight } = firstCard.getBoundingClientRect();
//   // window.scrollBy({ top: cardHeight * 2, behavior: 'smooth' });

//   // прокрутка з врахуванням кількості картинок в рядках і висоти екрану
//   const viewportHeight = window.innerHeight;

//   const columnCount = Math.floor(
//     document.querySelector('.container').offsetWidth / cards[0].offsetWidth
//   );

//   let cardToScroll = null;

//   const rowCount = cards.length / columnCount;

//   if (rowCount < 1) {
//     return;
//   } else if (rowCount % 1 === 0) {
//     cardToScroll = cards
//       .reverse()
//       .find(card => card.getBoundingClientRect().bottom < viewportHeight);
//   } else {
//     cardToScroll = cards[Math.floor(rowCount) * columnCount - 1];
//   }

//   window.scrollBy({
//     top: cardToScroll.getBoundingClientRect().bottom,
//     behavior: 'smooth',
//   });
// }

// async function fetchImages() {
//   hideLoadMoreButton();
//   showLoader();

//   try {
//     const { images, totalImageCount } = await getImagesByQuery(
//       currentQuery,
//       page
//     );

//     if (images.length === 0) {
//       iziToast.error({
//         title: 'Error',
//         message:
//           'Sorry, there are no images matching your search query. Please try again!',
//         position: 'topRight',
//         backgroundColor: '#ef4040',
//         titleColor: '#fff',
//         messageColor: '#fff',
//         progressBarColor: '#b51b1b',
//         close: true,
//         iconUrl: errorUrl,
//         class: 'my-toast',
//       });

//       return;
//     }

//     createGallery(images);

//     if (totalImageCount > page * PER_PAGE) {
//       showLoadMoreButton();
//     } else {
//       iziToast.info({
//         title: 'Info',
//         message: "We're sorry, but you've reached the end of search results",
//         position: 'topRight',
//         backgroundColor: '#09f',
//         titleColor: '#fff',
//         messageColor: '#fff',
//         progressBarColor: '#0071bd',
//         close: true,
//         iconUrl: infoUrl,
//         class: 'my-toast',
//       });
//     }
//   } catch (error) {
//     iziToast.error({
//       title: 'Error',
//       message: 'Something went wrong. Please try again later.',
//       position: 'topRight',
//       backgroundColor: '#ef4040',
//       titleColor: '#fff',
//       messageColor: '#fff',
//       progressBarColor: '#b51b1b',
//       close: true,
//       iconUrl: errorUrl,
//       class: 'my-toast',
//     });
//   } finally {
//     hideLoader();
//   }
// }
