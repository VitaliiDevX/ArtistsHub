import { artistListEl, artistModalPagesEl, genresListEl } from './refs';
import sprite from '../img/sprite.svg';
import { isEmpty } from './helpers';

export function renderArtistCard(artist) {
  const { genres, strArtist, strArtistThumb, strBiographyEN, _id } = artist;
  const artistCard = `<li class="artist-card"> 
  
    <img  class="artist-thumb" src="${strArtistThumb}" alt="${strArtist}">
    ${
      genres.length > 0
        ? `<ul class="artist-genres">
    ${renderArtistGenresList(genres)}
    </ul>`
        : ''
    }
    <h2 class="artist-name">${strArtist}</h2>
    <p class="artist-biography">${
      isEmpty(strBiographyEN) ? 'information missing' : strBiographyEN
    }</p>
    <button class="learn-more-btn" data-id="${_id}">Learn More<svg width="24" height="24">
              <use href="${sprite}#icon-caret-right"></use>
            </svg></button>
    </li>`;

  return artistCard;
}

export function renderArtistGenresList(genres) {
  const genresList = genres
    .map(genre => `<li class="genre-item">${genre}</li>`)
    .join('');
  return genresList;
}

export function renderArtistList(artistList) {
  const artistListMarkup = artistList.map(renderArtistCard).join('');
  artistListEl.innerHTML = '';
  artistListEl.insertAdjacentHTML('beforeend', artistListMarkup);
}

export function renderGenresList(genres) {
  const genresList = genres
    .map(({ genre }) => `<li class="select-item">${genre}</li>`)
    .join('');
  genresListEl.insertAdjacentHTML('beforeend', genresList);
}

export function renderPagination(currentPage, totalPages) {
  if (currentPage > totalPages) return;

  if (totalPages === 1) {
    artistModalPagesEl.innerHTML = '';
    artistModalPagesEl.classList.add('is-hidden');

    return;
  }

  artistModalPagesEl.classList.remove('is-hidden');

  let html = '';
  const innerWidth = window.innerWidth;

  // ← Previous
  html += addArrow(true);

  // Pages
  // First page
  html += addPageBtn(1);

  // Dots after first page
  if (currentPage > 3 || (innerWidth < 768 && currentPage > 2)) {
    html += addDots();
  }

  // Previous neighbor
  if (currentPage > 2 && innerWidth >= 768) {
    html += addPageBtn(currentPage - 1);
  }

  // Current page (if not first and not last)
  if (currentPage !== 1 && currentPage !== totalPages) {
    html += addPageBtn(currentPage);
  }

  // Next neighbor
  if (currentPage < totalPages - 1 && innerWidth >= 768) {
    html += addPageBtn(currentPage + 1);
  }

  // Dots before last page
  if (currentPage < totalPages - 2 || (innerWidth < 768 && totalPages - 1)) {
    html += addDots();
  }

  // Last page
  if (totalPages > 1) {
    html += addPageBtn(totalPages);
  }

  // → Next
  html += addArrow(false);

  artistModalPagesEl.innerHTML = html;

  function addArrow(isLeft) {
    const isDisabled = currentPage === (isLeft ? 1 : totalPages);

    return `
    <a 
      ${isDisabled ? '' : 'href="#artists-content"'}
      class="page-btn artists-arrow-btn ${isDisabled ? 'disabled' : ''}"
      ${
        isDisabled ? '' : `data-page="${currentPage + (isLeft ? -1 : 1)}"`
      }>      
      <svg width="24" height="24">
        <use href="${sprite}${
      isLeft ? '#left-arrow-btn' : '#right-arrow-btn'
    }"></use>
      </svg>
    </a>
  `;
  }

  function isActive(page) {
    return page === currentPage;
  }

  function addDots() {
    return '<span class="dots">...</span>';
  }

  function addPageBtn(page) {
    return `<a ${
      isActive(page) ? '' : 'href="#artists-content"'
    } class="page-btn ${
      isActive(page) ? 'active' : ''
    }" data-page="${page}">${page}</a>`;
  }
}

// export function renderPagination(currentPage, totalPages) {
//   if (totalPages === 1) {
//     artistModalPagesEl.innerHTML = '';
//     artistModalPagesEl.classList.add('is-hidden');

//     return;
//   }

//   if (currentPage > totalPages) return;

//   artistModalPagesEl.classList.remove('is-hidden');

//   let html = '';
//   const innerWidth = window.innerWidth;

//   // ← Previous
//   html += addArrow(true);
//   // html += `
//   //   <a href="#artists-content" class="page-btn artists-arrow-btn" ${
//   //     page === 1 ? 'disabled' : ''
//   //   } data-page="${page - 1}">
//   //     <svg width="24" height="24">
//   //       <use href="${sprite}#left-arrow-btn"></use>
//   //     </svg>
//   //   </a>
//   // `;

//   // Pages
//   // First page
//   // html += `<a href="#artists-content" class="page-btn ${
//   //   currentPage === 1 ? 'active' : ''
//   // }" data-page="1">1</a>`;

//   html += addPageBtn(1);

//   // Dots after first page
//   if (currentPage > 3 || (innerWidth < 768 && currentPage > 2)) {
//     html += addDots();
//   }

//   // Previous neighbor
//   if (currentPage > 2 && innerWidth >= 768) {
//     html += addPageBtn(currentPage - 1);
//     // html += `<a href="#artists-content" class="page-btn" data-page="${
//     //   currentPage - 1
//     // }">${currentPage - 1}</a>`;
//   }

//   // Current page (if not first and not last)
//   if (currentPage !== 1 && currentPage !== totalPages) {
//     html += addPageBtn(currentPage);
//     //html += `<a href="#artists-content" class="page-btn active" data-page="${currentPage}">${currentPage}</a>`;
//   }

//   // Next neighbor
//   if (currentPage < totalPages - 1 && innerWidth >= 768) {
//     html += addPageBtn(currentPage);
//     // html += `<a href="#artists-content" class="page-btn" data-page="${
//     //   currentPage + 1
//     // }">${currentPage + 1}</a>`;
//   }

//   // Dots before last page
//   if (currentPage < totalPages - 2 || (innerWidth < 768 && totalPages - 1)) {
//     html += addDots();
//   }

//   // Last page
//   if (totalPages > 1) {
//     html += addPageBtn(currentPage);
//     // html += `<a href="#artists-content" class="page-btn ${
//     //   currentPage === totalPages ? 'active' : ''
//     // }" data-page="${totalPages}">${totalPages}</a>`;
//   }

//   // → Next
//   html += addArrow(false);
//   // html += `
//   //   <a href="#artists-content" class="page-btn artists-arrow-btn" ${
//   //     page === totalPages ? 'disabled' : ''
//   //   } data-page="${page + 1}">
//   //     <svg width="24" height="24">
//   //       <use href="${sprite}#right-arrow-btn"></use>
//   //     </svg>
//   //   </a>
//   // `;

//   artistModalPagesEl.innerHTML = html;

//   function addArrow(isLeft) {
//     return `
//     <a href="#artists-content" class="page-btn artists-arrow-btn" ${
//       currentPage === (isLeft ? 1 : totalPages) ? 'disabled' : ''
//     } data-page="${currentPage + (isLeft ? -1 : 1)}">
//       <svg width="24" height="24">
//         <use href="${sprite}${
//       isLeft ? '#left-arrow-btn' : '#right-arrow-btn'
//     }"></use>
//       </svg>
//     </a>
//   `;
//   }

//   function isActive(page) {
//     return page === currentPage || page === totalPages;
//   }

//   function addDots() {
//     return '<span class="dots">...</span>';
//   }

//   function addPageBtn(page) {
//     `<a href="#artists-content" class="page-btn ${
//       isActive(page) ? 'active' : ''
//     }" data-page="${page}">${page}</a>`;
//   }
// }
// addArrow(-1);

// addPageBtn(1);

// addDots(1);

// addPageBtn(page - 1);

// addPageBtn(page);

// addPageBtn(page + 1);

// addDots(page + 1);

// addPageBtn(totalPages);

// addArrow(1);
