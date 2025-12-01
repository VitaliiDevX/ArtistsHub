import './js/feedback';
import './js/search-form';
import {
  artistModalPagesEl,
  genresListEl,
  searchFormEl,
  artistListEl,
  filterBtnEl,
} from './js/refs';
import {
  onSearchArtistsByInput,
  onSearchArtistsByClick,
  onArtistModalPagesClick,
  onLearnMoreClick,
  onFilterClick,
} from './js/event-listeners-callbacks';
import {
  renderArtistList,
  renderArtistGenresList,
  renderPagination,
  renderGenresList,
} from './js/render-artists';
import { getTotalPages } from './js/helpers';
import './js/feedback-modal';
import {
  getAllGenres,
  getArtistInfoById,
  getArtists,
} from './js/soundwawe-api';
import {
  renderArtistModalAlbumsList,
  renderArtistModal,
} from './js/render-artist-modal';

import { initSliders, renderSlider, getSliderImages } from './js/hero-slider';

// document.addEventListener('DOMContentLoaded', () => {
//   initSliders();
// });

initHeader();

// TESTS!!!!!!!!!!!!!!!!!!!!!!!!!
// const result = await getArtistInfoById('65b0fda6ba67998416821076');
// renderArtistModal(result);
// const { artists, totalArtists } = await getArtists();
// renderArtistList(artists);
// renderPagination(currentPage, getTotalPages(totalArtists));
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

async function init() {
  const { artists, totalArtists } = await getArtists();
  const sliderImages = getSliderImages(artists);

  renderSlider(sliderImages.map(src => ({ strArtistThumb: src })));
  renderArtistList(artists);

  const genres = await getAllGenres();
  renderPagination(1, getTotalPages(totalArtists));
  renderGenresList(genres);
  console.dir(artists);
}
init();

// -------------------EVENT LISTENERS-------------------
searchFormEl.addEventListener('input', onSearchArtistsByInput);
searchFormEl.addEventListener('click', onSearchArtistsByClick);
artistModalPagesEl.addEventListener('click', onArtistModalPagesClick);
filterBtnEl.addEventListener('click', onFilterClick);
artistListEl.addEventListener('click', e => {
  const btnClick = e.target.closest('.learn-more-btn');

  if (!btnClick) return;
  onLearnMoreClick(e);
});
