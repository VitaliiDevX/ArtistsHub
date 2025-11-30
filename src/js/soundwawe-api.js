import axios from 'axios';

const BASE_URL = 'https://sound-wave.b.goit.study/api';
axios.defaults.baseURL = BASE_URL;
export const PER_PAGE = 8;

export async function getAllGenres() {
  const response = await axios.get('/genres');
  return response.data;
}

export async function getArtists(query = {}, page = 1) {
  const params = { limit: PER_PAGE, page, ...query };

  const response = await axios.get('/artists', {
    params,
  });
  return {
    artists: response.data.artists,
    totalArtists: response.data.totalArtists,
  };
}

export async function getArtistInfoById(id) {
  const response = await axios.get(`/artists/${id}/albums`);
  return response.data;
}

export async function getFeedbacks(page = 1) {
  const params = { limit: PER_PAGE, page };
  const response = await axios.get('/feedbacks', {
    params,
  });
  return response.data.data;
}
