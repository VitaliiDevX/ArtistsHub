import { artistListEl, artistModalPagesEl, genresListEl } from './refs';

export function renderArtistCard(artist) {
  const { genres, strArtist, strArtistThumb, strBiographyEN, _id } = artist;
  const artistCard = `<li class="artist-card" data-id="${_id}"> 
  
    <img  class="artist-thumb" src="${strArtistThumb}" alt="${strArtist}">
    <ul class="artist-genres">
    ${renderArtistGenresList(genres)}
    </ul>
    <h2 class="artist-name">${strArtist}</h2>
    <p class="artist-biography">${strBiographyEN}</p>
    </li>`;

  return artistCard;
}

export function renderArtistGenresList(genres) {
  const genresList = genres.map(genre => `<li>${genre}</li>`).join('');
  return genresList;
}

export function renderArtistList(artistList) {
  const artistListMarkup = artistList.map(renderArtistCard).join('');
  artistListEl.innerHTML = '';
  artistListEl.insertAdjacentHTML('beforeend', artistListMarkup);
}

export function renderGenresList(genres) {
  const genresList = genres.map(({ genre }) => `<li>${genre}</li>`).join('');
  genresListEl.insertAdjacentHTML('beforeend', genresList);
}

export function renderPagination(page, totalPages) {
  let html = '';

  // ← Previous
  html += `
    <button class="page-btn" ${page === 1 ? 'disabled' : ''} data-page="${
    page - 1
  }">
      ←
    </button>
  `;

  // Pages
  // First page
  html += `<button class="page-btn ${
    page === 1 ? 'active' : ''
  }" data-page="1">1</button>`;

  // Dots after first page
  if (page > 3) {
    html += `<span class="dots">...</span>`;
  }

  // Previous neighbor
  if (page > 2) {
    html += `<button class="page-btn" data-page="${page - 1}">${
      page - 1
    }</button>`;
  }

  // Current page (if not first and not last)
  if (page !== 1 && page !== totalPages) {
    html += `<button class="page-btn active" data-page="${page}">${page}</button>`;
  }

  // Next neighbor
  if (page < totalPages - 1) {
    html += `<button class="page-btn" data-page="${page + 1}">${
      page + 1
    }</button>`;
  }

  // Dots before last page
  if (page < totalPages - 2) {
    html += `<span class="dots">...</span>`;
  }

  // Last page
  if (totalPages > 1) {
    html += `<button class="page-btn ${
      page === totalPages ? 'active' : ''
    }" data-page="${totalPages}">${totalPages}</button>`;
  }

  // → Next
  html += `
    <button class="page-btn" ${
      page === totalPages ? 'disabled' : ''
    } data-page="${page + 1}">
      →
    </button>
  `;

  artistModalPagesEl.innerHTML = html;
}
