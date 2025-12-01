import { getTotalPages } from './helpers';
import { getArtistInfoById, getArtists } from './soundwawe-api';
import { renderArtistList } from './render-artists';
import {
  renderPagination,
  showLoader,
  hideLoader,
  showModalContent,
  hideModalContent,
  showArtistsContent,
  hideArtistsContent,
} from './render-artists';
import {
  artistListEl,
  artistModalPagesEl,
  artistsNotFoundEl,
  backdropWithModalEl,
  searchFormEl,
} from './refs';
import { renderArtistModal } from './render-artist-modal';
// import { document } from 'postcss';

let currentPage = 1;
let currentQuery = {};
let previousInputValue = '';
let previousSelector = null;

export async function checkArtistResponse(currentQuery, currentPage) {
  const { artists, totalArtists } = await getArtists(currentQuery, currentPage);
  if (totalArtists === 0) {
    artistListEl.innerHTML = '';
    artistModalPagesEl.innerHTML = '';
    artistsNotFoundEl.classList.remove('visually-hidden');
    return;
  }
  artistsNotFoundEl.classList.add('visually-hidden');
  renderArtistList(artists);
  renderPagination(currentPage, getTotalPages(totalArtists));
}

export async function onSearchArtistsByInput(e) {
  try {
    const name = e.target.value.trim();

    if (name.length === previousInputValue.length) {
      return;
    }
    previousInputValue = name;

    // currentQuery = {};
    if (name) {
      currentQuery.name = name;
    } else {
      delete currentQuery.name;
    }

    currentPage = 1;

    hideArtistsContent();
    showLoader();

    checkArtistResponse(currentQuery, currentPage);
  } catch (error) {
    console.log(error);
  } finally {
    hideLoader();
    showArtistsContent();
  }
}
// NEVER OPEN THIS FUNCTION IN THE FUTURE
export async function onSearchArtistsByClick(e) {
  try {
    if (e.target.closest('.select-btn')) {
      const nextElementSibling =
        e.target.closest('.select-btn').nextElementSibling;
      nextElementSibling.classList.toggle('is-hidden');
      if (previousSelector && previousSelector !== nextElementSibling) {
        previousSelector.classList.add('is-hidden');
      }
      previousSelector = nextElementSibling;
      return;
    }

    //Click logic
    if (e.target.tagName === 'LI') {
      const select = e.target.closest('.select');
      const input = select.querySelector('.select-input');
      const button = select.querySelector('.select-btn');
      const listWrapper = select.querySelector('.select-list-wrapper');

      if (input) {
        input.value = e.target.textContent.trim();
      }

      // NEED TO UNDERSTAND NEED TO WATCH
      if (button) {
        const textNode = Array.from(button.childNodes).find(
          node => node.nodeType === Node.TEXT_NODE
        );
        if (textNode) {
          const textContent = e.target.textContent.trim();
          textNode.nodeValue = textContent;
          const selectValue = select.dataset.selectName;

          if (selectValue === 'sortName') {
            if (textContent === 'Default') {
              delete currentQuery.sortName;
            } else {
              currentQuery = {
                ...currentQuery,
                [selectValue]: textContent === 'Z-A' ? 'desc' : 'asc',
              };
            }
          } else {
            if (textContent === 'All Genres') {
              delete currentQuery.genre;
            } else {
              currentQuery = {
                ...currentQuery,
                [selectValue]: textContent,
              };
            }
          }
          currentPage = 1;
          checkArtistResponse(currentQuery, currentPage);
        }
      }

      if (listWrapper) {
        listWrapper.classList.add('is-hidden');
      }
    }
  } catch (error) {
    console.log(error);
  }
}
// IM SERIOUSLY

export async function onArtistModalPagesClick(e) {
  const btn = e.target.closest('.page-btn');
  if (!btn || btn.disabled || btn.classList.contains('active')) return;

  const newPage = Number(btn.dataset.page);

  if (newPage < 1) return;

  currentPage = newPage;

  const { artists, totalArtists } = await getArtists(currentQuery, currentPage);
  const totalPages = getTotalPages(totalArtists);

  renderArtistList(artists);
  renderPagination(currentPage, totalPages);
}

export async function onLearnMoreClick(e) {
  backdropWithModalEl.classList.add('is-open');
  document.body.style.overflow = 'hidden';

  hideModalContent();
  showLoader();

  backdropWithModalEl.addEventListener('click', onCloseModal);
  document.addEventListener('keydown', onEscClose);

  try {
    const artistId = await getArtistInfoById(e.target.dataset.id);
    renderArtistModal(artistId);
  } catch (error) {
    console.log(error);
  } finally {
    hideLoader();
    showModalContent();
  }
}

export function onCloseModal(e) {
  const clickOnBtn = e.target.closest('.modal-close-button');
  const clickOnBackdrop = e.target === backdropWithModalEl;

  if (clickOnBtn || clickOnBackdrop) {
    closeModal();
  }
}

function onEscClose(e) {
  if (e.key === 'Escape') {
    closeModal();
  }
}

function closeModal() {
  backdropWithModalEl.classList.remove('is-open');
  document.body.style.overflow = '';

  backdropWithModalEl.removeEventListener('click', onCloseModal);
  document.removeEventListener('keydown', onEscClose);
}

// Need to fix this function KOSTYL
export function onFilterClick(e) {
  const btn = e.target.closest('.filter-btn');
  const listWrapperCurrentStyle = btn.nextElementSibling.style.display;
  if (listWrapperCurrentStyle === 'flex') {
    btn.nextElementSibling.style.display = 'none';
  } else {
    btn.nextElementSibling.style.display = 'flex';
  }
}
// END OF KOSTYL

export function onResetClick(e) {
  currentQuery = {};
  currentPage = 1;
  // МОЖНА ЗРОБИТИ РЕФАКТОРІНГ, А МОЖНА І НЕ РОБИТИ
  const form = searchFormEl.querySelectorAll('.select-btn');
  form[0].childNodes[0].nodeValue = 'Sorting';
  form[1].childNodes[0].nodeValue = 'Genre';
  searchFormEl.reset();
  checkArtistResponse(currentQuery, currentPage);
}
