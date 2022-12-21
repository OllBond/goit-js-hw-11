import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import SearchApiService from './api';
import './css/styles.css';
import LoadMoreBTN from './load-more-btn';
import { createOnePictureMarkup } from './markup';

const refs = {
  formRef: document.querySelector('#search-form'),
  buttonSearchRef: document.querySelector('button-search'),
  galleryRef: document.querySelector('.gallery'),
};

const loadMoreBTN = new LoadMoreBTN({
  selector: '.load-more',
  hidden: true,
});

const searchApiService = new SearchApiService();

refs.formRef.addEventListener('submit', onFormSubmit);
// на loadMoreBTN є об'єкт refs а в ньому є ключ button
loadMoreBTN.refs.button.addEventListener('click', onLoadMoreBtn);

async function onFormSubmit(e) {
  e.preventDefault();

  loadMoreBTN.hide();
  // значення input у формі по name
  searchApiService.query = e.target.elements.searchQuery.value.trim();
  // якщо пустий рядок
  if (!searchApiService.query) {
    return;
  }
  // скидання сторінки
  searchApiService.resetPage();
  // очистка розмітки
  clearGalleryRef();

  await fetchPictures();
}

async function onLoadMoreBtn() {
  await fetchPictures();
}

async function fetchPictures() {
  await searchApiService
    .fetchSearchPictures()
    .then(data => {
      if (data.hits.length === 0) {
        Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        return;
      }
      Notify.success(`Hooray! We found ${data.totalHits} images.`);
      appendPictureMarkup(data.hits);
      searchApiService.incrementPage();
      lightbox.refresh();
      loadMoreBTN.show();
    })
    .then(data => {
      const totalPage = data.totalHits / this.per_page;
      if (this.page >= totalPage) {
        loadMoreBTN.hide();
        Notify.info(
          "We're sorry, but you've reached the end of search results."
        );
        return;
      }
    })
    .catch(error => {
      return error;
    });
}

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

function appendPictureMarkup(hits) {
  refs.galleryRef.insertAdjacentHTML('beforeend', createOnePictureMarkup(hits));
}

function clearGalleryRef() {
  refs.galleryRef.innerHTML = '';
}
