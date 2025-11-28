import { artistModalEl } from './refs';
import { renderGenresList } from './render-artists';
import { artistModalList } from './refs';
import { convertTime } from './helpers';

export function renderArtistModalPreview(artist) {
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
  } = artist;

  const artistModalPreview = `<div class="artist-modal-preview">
    <img class="artist-modal-preview-thumb" src="${strArtistThumb}" alt="${strArtist}">
    <h2 class="artist-modal-preview-name">${strArtist}</h2>
    <p class="artist-modal-preview-genres">${renderGenresList(genres)}</p>
    <p class="artist-modal-preview-biography">${strBiographyEN}</p>
    <p class="artist-modal-preview-formed-year">${intFormedYear}</p>
    <p class="artist-modal-preview-died-year">${intDiedYear}</p>
    <p class="artist-modal-preview-gender">${strGender}</p>
    <p class="artist-modal-preview-members">${intMembers}</p>
    <p class="artist-modal-preview-country">${strCountry}</p>
    </div>`;

  artistModalEl.insertAdjacentHTML('beforeend', artistModalPreview);
}

export function renderArtistModalAlbumsList({ albumsList }) {
  const albumsListMarkup = albumsList
    .map(album => renderArtistModalAlbum(album))
    .join('');

  artistModalList.insertAdjacentHTML('beforeend', albumsListMarkup);
}

export function renderArtistModalAlbum({ strAlbum, tracks }) {
  const albumCard = `<li><h2 class="artist-modal-album-title">${strAlbum}</h2>
                        <table class="artist-modal-album">
                            <thead>
                                <tr>
                                    <th>Track</th>
                                    <th>Time</th>
                                    <th>Link</th>
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
  const trackCard = `<tr>
                        <td>${strTrack}</td>
                        <td>${convertTime(intDuration)}</td>
                        <td><a href="${movie}">Youtube</a></td>
                    </tr>`;

  return trackCard;
}
