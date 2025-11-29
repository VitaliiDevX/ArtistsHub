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
    <button class="learn-more-btn">Learn More<svg width="24" height="24">
              <use href="./img/sprite.svg#icon-caret-right"></use>
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

export function renderPagination(page, totalPages) {
  if (totalPages === 1) {
    artistModalPagesEl.innerHTML = '';
    return;
  }
  // Kostyli
  if (page > totalPages) return;
  // Kostyli
  let html = '';

  // ← Previous
  html += `
    <a href="#artists" class="page-btn" ${
      page === 1 ? 'disabled' : ''
    } data-page="${page - 1}">
      ←
    </a>
  `;

  // Pages
  // First page
  html += `<a href="#artists" class="page-btn ${
    page === 1 ? 'active' : ''
  }" data-page="1">1</a>`;

  // Dots after first page
  if (page > 3) {
    html += `<span class="dots">...</span>`;
  }

  // Previous neighbor
  if (page > 2) {
    html += `<a href="#artists" class="page-btn" data-page="${page - 1}">${
      page - 1
    }</a>`;
  }

  // Current page (if not first and not last)
  if (page !== 1 && page !== totalPages) {
    html += `<a href="#artists" class="page-btn active" data-page="${page}">${page}</a>`;
  }

  // Next neighbor
  if (page < totalPages - 1) {
    html += `<a href="#artists" class="page-btn" data-page="${page + 1}">${
      page + 1
    }</a>`;
  }

  // Dots before last page
  if (page < totalPages - 2) {
    html += `<span class="dots">...</span>`;
  }

  // Last page
  if (totalPages > 1) {
    html += `<a href="#artists" class="page-btn ${
      page === totalPages ? 'active' : ''
    }" data-page="${totalPages}">${totalPages}</a>`;
  }

  // → Next
  html += `
    <a href="#artists" class="page-btn" ${
      page === totalPages ? 'disabled' : ''
    } data-page="${page + 1}">
      →
    </a> 
  `;

  artistModalPagesEl.innerHTML = html;
}
