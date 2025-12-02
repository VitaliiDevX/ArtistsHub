import { PER_PAGE } from './soundwawe-api';

export function convertTime(ms) {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

export function getTotalPages(totalArtists) {
  const totalPages = Math.ceil(totalArtists / PER_PAGE);
  return totalPages;
}

export function isEmpty(info) {
  return (
    info === null || info === 0 || info === undefined || info.trim() === ''
  );
}
