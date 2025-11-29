import { getTotalPages } from './helpers';
import { getArtists } from './soundwawe-api';
import { renderArtistList } from './render-artists';
import { renderPagination } from './render-artists';
import { backdropWithModalEl, modalCloseButtonEl } from './refs'
// import { document } from 'postcss';

let currentPage = 1;
let currentQuery = {};
let previousInputValue = '';
let previousSelector = null;

export async function onSearchArtistsByInput(e) {
  try {
    const name = e.target.value.trim();

    if (name.length === previousInputValue.length) {
      console.log('object');
      return;
    }
    previousInputValue = name;

    // currentQuery = {};
    if (name) {
      currentQuery.name = name;
    }

    // ВИНЕСТИ В ОКРЕМУ ФУНКЦІЮ
    currentPage = 1;
    const { artists, totalArtists } = await getArtists(
      currentQuery,
      currentPage
    );
    renderArtistList(artists);
    renderPagination(currentPage, getTotalPages(totalArtists));
  } catch (error) {
    console.log(error);
  }
}
// NEVER OPEN THIS FUNCTION IN THE FUTURE
export async function onSearchArtistsByClick(e) {
  try {
    if (e.target.tagName === 'BUTTON') {
      const nextElementSibling = e.target.nextElementSibling;
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
          const { artists, totalArtists } = await getArtists(
            currentQuery,
            currentPage
          );
          renderArtistList(artists);
          renderPagination(currentPage, getTotalPages(totalArtists));
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
  currentPage = newPage;

  const { artists, totalArtists } = await getArtists(currentQuery, currentPage);
  renderArtistList(artists);
  renderPagination(currentPage, getTotalPages(totalArtists));
}



export async function onLearnMoreClick(e) {
  backdropWithModalEl.classList.add('is-open');
  document.body.style.overflow = 'hidden';

  backdropWithModalEl.addEventListener('click', onCloseModal);
  document.addEventListener('keydown', onEscClose);
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