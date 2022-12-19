import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import SearchApiService from './api';
import './css/styles.css';
import LoadMoreBTN from './load-more-btn';

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
  // if () {
  //   loadMoreBTN.hide();
  //   Notify.info(
  //     "We're sorry, but you've reached the end of search results."
  //   );
  // }
}

async function fetchPictures() {
  await searchApiService.fetchSearchPictures().then(data => {
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
  });
}
function createOnePictureMarkup(pictures = []) {
  return pictures
    .map(
      // picture - це об'єкт  picture.largeImageURL - ключ об'єкта
      picture => `
      <div class="photo-card">
  <a class "gallery-link" href="${picture.largeImageURL}">
  <img class "gallery-image" src="${picture.webformatURL}" alt="${picture.tags}" loading="lazy" width="370" height="240"/>
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
