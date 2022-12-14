import { Notify } from 'notiflix/build/notiflix-notify-aio';
import axios from 'axios';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { fetchPictures } from './api';
import SearchApiService from './api';
import './css/styles.css';

const refs = {
  formRef: document.querySelector('#search-form'),
  buttonSearchRef: document.querySelector('button-search'),
  inputRef: document.querySelector('search-form-input'),
  galleryRef: document.querySelector('.gallery'),
  buttonLoadRef: document.querySelector('.load-more'),
};

const searchApiService = new SearchApiService();

refs.formRef.addEventListener('submit', onFormSubmit);
refs.buttonLoadRef.addEventListener('click', onLoadMoreBtn);
// let items = [];

function onFormSubmit(e) {
  e.preventDefault();

  // значення input у формі по name
  searchApiService.query = e.target.elements.searchQuery.value.trim();
  // скидання сторінки
  searchApiService.resetPage();
  searchApiService
    .fetchSearchPictures()
    .then(hits => {
      clearGalleryRef();
      appendPictureMarkup(hits);
    })
    .catch(error => {
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return error;
    });
}
// однакова сторінка з'являється
function onLoadMoreBtn() {
  searchApiService.fetchSearchPictures().then(appendPictureMarkup);

  // catch (error) {
  //   Notify.failure(
  //     'Sorry, there are no images matching your search query. Please try again.'
  //   );
  //   return error;
  // }
}
function createOnePictureMarkup(pictures = []) {
  return pictures
    .map(
      // picture - це об'єкт  picture.largeImageURL - ключ об'єкта
      picture => `
      <div class="photo-card">
  <a class "gallery-link" href="${picture.largeImageURL}">
  <img class gallery-image src="${picture.webformatURL}" alt="${picture.tags}" loading="lazy" />
  </a>
  
  <div class="info">
    <p class="info-item">
      <b>Likes: ${picture.likes}</b>
    </p>
    <p class="info-item">
      <b>Views: ${picture.views}</b>
    </p>
    <p class="info-item">
      <b>Comments: ${picture.comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads: ${picture.downloads}</b>
    </p>
  </div>
</div>`
    )
    .join('');
  // refs.galleryRef.insertAdjacentHTML('beforeend', markup);
}

function appendPictureMarkup(hits) {
  refs.galleryRef.insertAdjacentHTML('beforeend', createOnePictureMarkup(hits));
}

function clearGalleryRef() {
  refs.galleryRef.innerHTML = '';
}
