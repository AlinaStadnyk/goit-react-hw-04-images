import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '40365065-ce88301315fd1f49aec04ac88';

function getAllPhotos(query, pages) {
  const params = new URLSearchParams({
    q: query,
    page: pages,
    key: API_KEY,
    image_type: 'photo',
    orientation: 'horizontal',
    per_page: 12,
  });
  return axios.get(`${BASE_URL}?${params}`);
}

export { getAllPhotos };
