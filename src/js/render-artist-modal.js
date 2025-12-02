import { artistModalEl } from './refs';
import { renderArtistGenresList } from './render-artists';
import { convertTime, isEmpty } from './helpers';
import spriteUrl from '../img/sprite.svg';

export function renderArtistModal(artist) {
  const {
    strArtist,
    strArtistThumb,
    intFormedYear,
    intDiedYear,
    strGender,
    intMembers,
    strCountry,
    strBiographyEN,
    genres,
    albumsList,
  } = artist;

  const artistName = artistModalEl.querySelector('.modal-main-heading');
  const artistImage = artistModalEl.querySelector('.modal-artist-img');
  const timeActive = document.querySelector('.js-modal-years');
  const sex = document.querySelector('.js-modal-sex');
  const members = document.querySelector('.js-modal-members');
  const country = document.querySelector('.js-modal-country');
  const bio = document.querySelector('.js-modal-bio');
  const genresListEl = document.querySelector('.modal-info-genres-list');
  const albumsListEl = document.querySelector('.artist-modal-list');

  artistName.textContent = strArtist;
  artistImage.src = strArtistThumb;
  timeActive.textContent =
    isEmpty(intFormedYear) && isEmpty(intDiedYear)
      ? '-'
      : `${isEmpty(intFormedYear) ? 'unknown' : intFormedYear}-${
          isEmpty(intDiedYear) ? 'present' : intDiedYear
        }`;
  sex.textContent = isEmpty(strGender) ? '-' : strGender.trim();
  members.textContent = isEmpty(intMembers) ? '-' : intMembers;
  country.textContent = isEmpty(strCountry) ? '-' : strCountry.trim();
  bio.textContent = isEmpty(strBiographyEN)
    ? 'information missing'
    : strBiographyEN.trim();

  genresListEl.innerHTML = '';
  genresListEl.insertAdjacentHTML(
    'beforeend',
    renderArtistModalGenresList(genres)
  );

  albumsListEl.innerHTML = '';
  albumsListEl.insertAdjacentHTML(
    'beforeend',
    renderArtistModalAlbumsList(albumsList)
  );

  // timeActive.textContent =
  //   intDiedYear === null
  //     ? `${intFormedYear}-present`
  //     : `${intFormedYear}-${intDiedYear}`;

  // ---------------SECOND VERSION-------------------
  //   const artistModalPreview = `
  // <button class="modal-close-button">
  //     <svg class="modal-close-svg" width="15" height="15">
  //       <use href="./img/sprite.svg#close"></use>
  //     </svg>
  //   </button>
  //   <h5 class="modal-main-heading">${strArtist}</h5>

  //   <div class="modal-img-and-info-container">
  //     <img
  //       class="modal-artist-img"
  //       src="${strArtistThumb}"
  //       alt="artist-photo"
  //     />

  //     <div class="modal-all-text-container">
  //       <div class="modal-first-mini-container">
  //         <ul class="modal-basic-info-list">
  //           <li class="modal-info-years-li">
  //             <p class="modal-info-semibold-text">Years active</p>
  //             <p class="modal-info-normal-text js-modal-years">${intFormedYear}-${
  //     intDiedYear === 0 ? 'present' : intDiedYear
  //   }</p>
  //           </li>
  //           <li class="modal-info-sex-li">
  //             <p class="modal-info-semibold-text">Sex</p>
  //             <p class="modal-info-normal-text ">${strGender}</p>
  //           </li>
  //         </ul>
  //       </div>
  //       <div class="modal-second-mini-container">
  //         <ul class="modal-basic-info-list">
  //           <li class="modal-info-members-li">
  //             <p class="modal-info-semibold-text">Members</p>
  //             <p class="modal-info-normal-text">${intMembers}</p>
  //           </li>
  //           <li class="modal-info-country-li">
  //             <p class="modal-info-semibold-text">Country</p>
  //             <p class="modal-info-normal-text">${strCountry}</p>
  //           </li>
  //         </ul>
  //       </div>

  //       <div class="modal-bio-container">
  //         <p class="modal-info-bio">Biography</p>
  //         <p class="modal-info-text">
  //           ${strBiographyEN}
  //         </p>
  //         </div>

  //         <div class="modal-info-genres-container">
  //           <ul class="modal-info-genres-list">
  //            ${renderArtistModalGenresList(genres)}
  //           </ul>
  //           <h4 class="heading-before-table">Albums</h4>
  //           <ul class="artist-modal-list">
  //             ${renderArtistModalAlbumsList(albumsList)}
  //           </ul>
  //         </div>
  //       </div>
  // `;
  // artistModalEl.innerHTML = '';
  // artistModalEl.insertAdjacentHTML('beforeend', artistModalPreview);
}

export function renderArtistModalGenresList(genres) {
  const genresList = genres
    .map(
      genre =>
        `<li class="modal-info-genre-li"><p class="modal-info-genre">${genre}</p></li>`
    )
    .join('');

  return genresList;
}

export function renderArtistModalAlbumsList(albumsList) {
  const albumsListMarkup = albumsList
    .map(album => renderArtistModalAlbum(album))
    .join('');

  return albumsListMarkup;
}

export function renderArtistModalAlbum({ strAlbum, tracks }) {
  const albumCard = `<li class="modal-table-li"><h2 class="artist-modal-album-title">${strAlbum}</h2>
                        <table class="artist-modal-album">
                            <thead>
                                <tr>
                                   <th scope="col">Track</th>
                                   <th scope="col">Time</th>
                                   <th scope="col">Link</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${renderArtistModalTrackList(tracks)}
                            </tbody>
                        </table></li>`;

  return albumCard;
}

export function renderArtistModalTrackList(tracks) {
  const tracksList = tracks
    .map(track => renderArtistModalTrack(track))
    .join('');

  return tracksList;
}

export function renderArtistModalTrack({ strTrack, intDuration, movie }) {
  const movieIcon = movie
    ? `<svg class="icon-modal-artist-track-list" width="24" height="24"><use href="${spriteUrl}#youtube"></use></svg>`
    : '';
  const trackCard = `<tr>
                        <td>${strTrack}</td>
                        <td>${convertTime(intDuration)}</td>
                        <td><a class="link-modal-artist-track-list" href="${movie}">${movieIcon}</a></td>
                    </tr>`;

  return trackCard;
}
