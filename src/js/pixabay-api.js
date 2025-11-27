// import axios from 'axios';

// const API_KEY = '53341325-fc5b4d35c63f9c2cf192286d1';
// const BASE_URL = 'https://pixabay.com/api/';
// export const PER_PAGE = 15;

// export async function getImagesByQuery(query, page = 1) {
//   const response = await axios.get(BASE_URL, {
//     params: {
//       key: API_KEY,
//       q: query,
//       image_type: 'photo',
//       orientation: 'horizontal',
//       safesearch: true,
//       page: page,
//       per_page: PER_PAGE,
//     },
//   });

//   return {
//     images: response.data.hits,
//     totalImageCount: response.data.totalHits,
//   };
// }
