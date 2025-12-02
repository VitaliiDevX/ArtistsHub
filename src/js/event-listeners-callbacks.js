import { getTotalPages } from './helpers';
import { getArtistInfoById, getArtists } from './soundwawe-api';

import {
  renderArtistList,
  renderPagination,
  showModalLoader,
  hideModalLoader,
  showModalContent,
  hideModalContent,
  showArtistsLoader,
  hideArtistsLoader,
  showArtistsContent,
  hideArtistsContent,
} from './render-artists';
import {
  artistListEl,
  artistModalPagesEl,
  artistsNotFoundEl,
  backdropWithModalEl,
  searchFormEl,
  artistModalEl,
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
    hideArtistsContent();
    showArtistsLoader();

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

    await checkArtistResponse(currentQuery, currentPage);
  } catch (error) {
    console.log(error);
  } finally {
    hideArtistsLoader();
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

          hideArtistsContent();
          showArtistsLoader();

          await checkArtistResponse(currentQuery, currentPage);
        }
      }

      if (listWrapper) {
        listWrapper.classList.add('is-hidden');
      }
    }
  } catch (error) {
    console.log(error);
  } finally {
    hideArtistsLoader();
    showArtistsContent();
  }
}
// IM SERIOUSLY

export async function onArtistModalPagesClick(e) {
  const btn = e.target.closest('.page-btn');
  if (!btn || btn.disabled || btn.classList.contains('active')) return;

  try {
    const newPage = Number(btn.dataset.page);

    if (newPage < 1) return;

    currentPage = newPage;

    hideArtistsContent();
    showArtistsLoader();

    const { artists, totalArtists } = await getArtists(
      currentQuery,
      currentPage
    );
    const totalPages = getTotalPages(totalArtists);

    renderArtistList(artists);
    renderPagination(currentPage, totalPages);
  } catch (error) {
    console.log(error);
  } finally {
    hideArtistsLoader();
    showArtistsContent();
  }
}

export async function onLearnMoreClick(e) {
  backdropWithModalEl.classList.add('is-open');
  document.body.style.overflow = 'hidden';

  hideModalContent();
  showModalLoader();

  backdropWithModalEl.addEventListener('click', onCloseModal);
  document.addEventListener('keydown', onEscClose);

  try {
    const artistId = await getArtistInfoById(e.target.dataset.id);
    renderArtistModal(artistId);
  } catch (error) {
    console.log(error);
  } finally {
    hideModalLoader();
    showModalContent();

    const bio = artistModalEl.querySelector('.modal-info-text');
    if (bio) bio.scrollTop = 0;
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

export function onFilterClick(e) {
  const btn = e.target.closest('.filter-btn');
  btn.nextElementSibling.classList.toggle('is-open');
}

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
// AI CREATED BLOCK NEW RelatedTarget
export function onSearchFormFocusOut(e) {
  const currentTarget = e.currentTarget;
  const relatedTarget = e.relatedTarget;

  if (currentTarget.contains(relatedTarget)) {
    return;
  }

  const selectListWrappers = currentTarget.querySelectorAll(
    '.select-list-wrapper'
  );
  selectListWrappers.forEach(el => el.classList.add('is-hidden'));

  const selectBtns = currentTarget.querySelectorAll('.select-btn');
  selectBtns.forEach(btn => btn.nextElementSibling.classList.add('is-hidden'));
}

let isFilterWrapperClick = false;

export function onFilterWrapperMouseDown() {
  isFilterWrapperClick = true;
  setTimeout(() => {
    isFilterWrapperClick = false;
  }, 150);
}

export function onFilterWrapperFocusOut(e) {
  if (isFilterWrapperClick) {
    return;
  }

  const currentTarget = e.currentTarget;
  const relatedTarget = e.relatedTarget;

  if (currentTarget.contains(relatedTarget)) {
    return;
  }

  searchFormEl.classList.remove('is-open');
}
