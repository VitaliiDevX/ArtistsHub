import './js/feedback';
import './js/search-form';
import {
  artistModalPagesEl,
  genresListEl,
  searchFormEl,
  artistListEl,
  filterBtnEl,
  resetBtnEl,
} from './js/refs';
import {
  onSearchArtistsByInput,
  onSearchArtistsByClick,
  onArtistModalPagesClick,
  onLearnMoreClick,
  onFilterClick,
  onResetClick,
} from './js/event-listeners-callbacks';
import {
  renderArtistList,
  renderArtistGenresList,
  renderPagination,
  renderGenresList,
  showLoader,
  hideLoader,
  showArtistsContent,
  hideArtistsContent,
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
import { initHeader } from './js/header';

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
  hideArtistsContent();
  showLoader();

  try {
    const { artists, totalArtists } = await getArtists();
    const sliderImages = getSliderImages(artists);

    renderSlider(sliderImages.map(src => ({ strArtistThumb: src })));
    renderArtistList(artists);

    const genres = await getAllGenres();
    renderPagination(1, getTotalPages(totalArtists));
    renderGenresList(genres);
  } catch (error) {
    console.log(error);
  } finally {
    hideLoader();
    showArtistsContent();
  }
}

init();

// -------------------EVENT LISTENERS-------------------
searchFormEl.addEventListener('input', onSearchArtistsByInput);
searchFormEl.addEventListener('click', onSearchArtistsByClick);
artistModalPagesEl.addEventListener('click', onArtistModalPagesClick);
filterBtnEl.addEventListener('click', onFilterClick);
resetBtnEl.forEach(btn => btn.addEventListener('click', onResetClick));
artistListEl.addEventListener('click', e => {
  const btnClick = e.target.closest('.learn-more-btn');

  if (!btnClick) return;
  onLearnMoreClick(e);
});
