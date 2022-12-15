import axios from 'axios';
const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '32018824-12fed2968cd63512e54ef9084';
export default class SearchApiService {
  constructor() {
    this.searchQuery = '';
    // значення page зберігаємо як ключ об'єкта
    this.page = 1;
  }
  async fetchSearchPictures() {
    console.log(this);

    const res = await axios.get(
      `${BASE_URL}?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&${this.page}`
    );
    const data = res.data;
    console.log(data);
    if (res.status !== 200) {
      throw new Error(res.status);
    }

    this.incrementPage();
    return data.hits;
  }
  // метод збільшення на 1
  incrementPage() {
    this.page += 1;
  }
  // метод, який скидає сторінку в одиничку
  resetPage() {
    this.page = 1;
  }
  // get & set контролює термін запиту
  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
