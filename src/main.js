import './js/feedback';
import './js/search-form';
import {
  getFeedbacks,
  getArtistInfoById,
  getArtists,
  getAllGenres,
} from './js/soundwawe-api';
import {
  renderArtistModalPreview,
  renderArtistModalAlbumsList,
} from './js/render-artist-modal';
import { renderArtistList, renderPagination } from './js/render-artists';
import { getTotalPages } from './js/helpers';
import { artistModalPagesEl, searchFormEl } from './js/refs';

let currentPage = 1;
let currentQuery = {};

// TESTS!!!!!!!!!!!!!!!!!!!!!!!!!
// const result = await getArtistInfoById('65b0fda6ba67998416821076');
// const { artists, totalArtists } = await getArtists();

// renderArtistModalPreview(result);
// renderArtistModalAlbumsList(result);
// renderArtistList(artists);
// renderPagination(currentPage, getTotalPages(totalArtists));
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

// EVENT LISTENERS
// artistModalPagesEl.addEventListener('click', async event => {
//   const btn = event.target.closest('.page-btn');
//   if (!btn || btn.disabled || btn.classList.contains('active')) return;

//   const newPage = Number(btn.dataset.page);
//   currentPage = newPage;

//   const { artists, totalArtists } = await getArtists({}, currentPage);
//   renderArtistList(artists);
//   renderPagination(currentPage, getTotalPages(totalArtists));
// });

// searchFormEl.addEventListener('submit', async event => {
//   event.preventDefault();

//   const name = event.target.elements.search_text.value.trim();
//   const sorted = event.target.elements.sort.value;
//   const genre = event.target.elements.genre.value;

//   currentQuery = { name, sorted, genre };

//   clearGallery();
//   page = 1;

//   const result = await getArtists(currentQuery, page);
//   renderArtistList(result.artists);
//   renderPagination(currentPage, getTotalPages(result.totalArtists));
// });
