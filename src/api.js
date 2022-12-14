import axios from 'axios';

export default class SearchApiService {
  constructor() {
    this.searchQuery = '';
  }
  async fetchSearchPictures() {
    console.log(this);

    const BASE_URL = 'https://pixabay.com/api/';
    const MY_KEY = '32018824-12fed2968cd63512e54ef9084';

    const res = await axios.get(
      `${BASE_URL}?key=${MY_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=1`
    );
    const data = res.data;
    if (res.status !== 200) {
      throw new Error(res.status);
    }
    return data;
  }
  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
