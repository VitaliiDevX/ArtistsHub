import './js/feedback';
import './js/search-form';
import { artistModalPagesEl, genresListEl, searchFormEl } from './js/refs';
import {
  onSearchArtistsByInput,
  onSearchArtistsByClick,
  onArtistModalPagesClick,
} from './js/event-listeners-callbacks';
import {
  renderArtistList,
  renderArtistGenresList,
  renderPagination,
  renderGenresList,
} from './js/render-artists';
import { getTotalPages } from './js/helpers';
import { getAllGenres, getArtists } from './js/soundwawe-api';

// TESTS!!!!!!!!!!!!!!!!!!!!!!!!!
// const result = await getArtistInfoById('65b0fda6ba67998416821076');
// const { artists, totalArtists } = await getArtists();

// renderArtistModalPreview(result);
// renderArtistModalAlbumsList(result);
// renderArtistList(artists);
// renderPagination(currentPage, getTotalPages(totalArtists));
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

async function init() {
  const { artists, totalArtists } = await getArtists();
  renderArtistList(artists);
  const genres = await getAllGenres();
  renderPagination(1, getTotalPages(totalArtists));
  renderGenresList(genres);
}
init();

// -------------------EVENT LISTENERS-------------------
searchFormEl.addEventListener('input', onSearchArtistsByInput);
searchFormEl.addEventListener('click', onSearchArtistsByClick);

artistModalPagesEl.addEventListener('click', onArtistModalPagesClick);
