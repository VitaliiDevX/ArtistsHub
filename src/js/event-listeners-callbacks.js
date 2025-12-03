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
  filterBtnEl,
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
    artistsNotFoundEl.classList.remove('is-hidden');
    return;
  }
  artistsNotFoundEl.classList.add('is-hidden');
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

export function reverseArrowOnBtn(btn) {
  // 1) Toggle списка при клике по кнопке
  if (btn) {
    const nextElementSibling = btn.nextElementSibling;

    const isHidden = nextElementSibling.classList.toggle('is-hidden');

    // Вращаем стрелку
    btn.classList.toggle('open', !isHidden);

    // Закрываем предыдущий
    if (previousSelector && previousSelector !== nextElementSibling) {
      previousSelector.classList.add('is-hidden');

      // Сбрасываем вращение у предыдущей кнопки
      const prevBtn = previousSelector
        .closest('.select')
        .querySelector('.select-btn');
      prevBtn?.classList.remove('open');
    }

    previousSelector = nextElementSibling;
    return;
  }
}
// NEVER OPEN THIS FUNCTION IN THE FUTURE
export async function onSearchArtistsByClick(e) {
  try {
    reverseArrowOnBtn(e.target.closest('.select-btn'));

    //Click logic
    if (e.target.tagName === 'LI') {
      const select = e.target.closest('.select');
      const input = select.querySelector('.select-input');
      const button = select.querySelector('.select-btn');
      const listWrapper = select.querySelector('.select-list-wrapper');

      if (input) {
        input.value = e.target.textContent.trim();
      }

      // Close UI
      if (button) {
        button.classList.remove('open');
        button.focus();
      }
      if (listWrapper) {
        listWrapper.classList.add('is-hidden');
      }

      if (button) {
        const textNode = Array.from(button.childNodes).find(
          node => node.nodeType === Node.TEXT_NODE
        );
        if (textNode) {
          const textContent = e.target.textContent.trim();
          textNode.nodeValue = textContent;
          const selectValue = select.dataset.selectName;
          let newValue;

          if (selectValue === 'sortName') {
            newValue =
              textContent === 'Default'
                ? undefined
                : textContent === 'Z-A'
                ? 'desc'
                : 'asc';
          } else {
            newValue = textContent === 'All Genres' ? undefined : textContent;
          }

          if (currentQuery[selectValue] === newValue) {
            return;
          }

          if (newValue === undefined) {
            delete currentQuery[selectValue];
          } else {
            currentQuery = {
              ...currentQuery,
              [selectValue]: newValue,
            };
          }
          currentPage = 1;

          hideArtistsContent();
          showArtistsLoader();

          await checkArtistResponse(currentQuery, currentPage);
        }
      }
    }
  } catch (error) {
    console.log(error);
  } finally {
    hideArtistsLoader();
    showArtistsContent();
  }
}

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
  btn.classList.toggle('is-open');
  btn.nextElementSibling.classList.toggle('is-open');
  // reverseArrowOnBtn(btn);
  btn.classList.toggle('open');
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
  if (isFilterWrapperClick) {
    return;
  }
  const currentTarget = e.currentTarget;
  const relatedTarget = e.relatedTarget;

  if (currentTarget.contains(relatedTarget)) {
    return;
  }
  // Another KOSTYL
  e.currentTarget.previousElementSibling.classList.remove('open');

  // Затримка потрібна, щоб клік по LI елементу встиг спрацювати
  // перед тим, як dropdown буде захований

  setTimeout(() => {
    const selectListWrappers = currentTarget.querySelectorAll(
      '.select-list-wrapper'
    );
    selectListWrappers.forEach(el => el.classList.add('is-hidden'));
    const selectBtns = currentTarget.querySelectorAll('.select-btn');
    selectBtns.forEach(btn => btn.classList.remove('open'));
  }, 150);
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
  e.target.classList.remove('open');
  searchFormEl.classList.remove('is-open');
  filterBtnEl.classList.remove('open');
}
