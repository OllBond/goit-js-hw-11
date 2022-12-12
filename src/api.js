import axios from 'axios';

// const BASE_URL =
//   'https://pixabay.com/api/?key=32018824-12fed2968cd63512e54ef9084';

const BASE_URL = 'https://pixabay.com/api/';
const MY_KEY = '32018824-12fed2968cd63512e54ef9084';

export function fetchPictures(query) {
  return axios
    .get(
      `${BASE_URL}?key=${MY_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true`
    )
    .then(({ data }) => data);
}
