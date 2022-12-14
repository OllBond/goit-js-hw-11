import axios from 'axios';

export default class SearchApiService {
  constructor() {
    this.searchQuery = '';
    // значення page зберігаємо як ключ об'єкта
    this.page = 1;
  }
  async fetchSearchPictures() {
    console.log(this);

    const BASE_URL = 'https://pixabay.com/api/';
    const MY_KEY = '32018824-12fed2968cd63512e54ef9084';

    const res = await axios.get(
      `${BASE_URL}?key=${MY_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&${this.page}`
    );
    const data = res.data;
    console.log(data);
    if (res.status !== 200) {
      throw new Error(res.status);
    }
    // успішний результат фетча збільшуємо на 1
    this.incrementPage();
    return data.hits;
  }
  // метод скидання сторінки, він може називатися якзавгодно хоч "x"
  incrementPage() {
    this.page += 1;
  }
  // метод, який скидає сторінку в одиничку
  resetPage() {
    this.page = 1;
  }
  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
