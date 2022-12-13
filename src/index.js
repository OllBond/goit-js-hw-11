import { Notify } from 'notiflix/build/notiflix-notify-aio';
import axios from 'axios';
import { fetchPictures } from './api';
import './css/styles.css';

const refs = {
  formRef: document.querySelector('#search-form'),
  buttonRef: document.querySelector('button-search'),
  inputRef: document.querySelector('search-form-input'),
  galleryRef: document.querySelector('.gallery'),
};

refs.formRef.addEventListener('submit', onFormSubmit);

// let items = [];

function onFormSubmit(e) {
  e.preventDefault();
  // значення input у формі по name
  const inputValue = e.target.elements.searchQuery.value.trim();
  console.log(inputValue);
  // if (!inputValue) {
  //   return;
  // }
  fetchPictures(inputValue)
    .then(res => {
      console.log(res);
      // hits - це масив об'єктів
      const markup = createOnePictureMarkup(res.hits);
      refs.galleryRef.insertAdjacentHTML('beforeend', markup);
      return;
    })
    // if ( === []) {
    //   Notify.failure(
    //     'Sorry, there are no images matching your search query. Please try again.'
    //   );
    // }
    .catch(error => {
      console.log(error);
    });
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
}
// HOMEWORK 10
// function onInput(e) {
//   // дані з інпута
//   const inputValue = e.target.value.trim();
//   // очищаємо розмітку
//   clearInput();
//   // якщо пустий рядок false за допомогою інверсії змінюємо на true
//   // тобто якщо пустий рядок - вийшли з функції
//   if (!inputValue) {
//     return;
//   }
//   // якщо не пустий рядок викликаємо функцію fetchСountries
//   // передаємо значення яке ввів користувач inputValue
//   fetchCountries(inputValue)
//     // отримали дані response, прописуємо логіку, що робити з цими даними
//     // т.ч. можемо перевикористовувати функцію
//     .then(res => {
//       console.log(res);
//       const resLength = res.length;
//       // якщо один об'єкт відмальовуємо картку однієї країни
//       if (resLength === 1) {
//         const markup = createOneCountryMarkup(res);
//         refs.countryInfoRef.insertAdjacentHTML('beforeend', markup);
//         return;
//       }
//       // якщо 2 об'єкти або 10 або менше 10 - малюємо список країн
//       if (resLength > 2 && resLength <= 10) {
//         const markup = createCountriesList(res);
//         refs.listRef.insertAdjacentHTML('beforeend', markup);
//         return;
//       }
//       // якщо більше 10 об'єктів(країн) виводити рядок
//       if (resLength > 10) {
//         Notify.info(
//           'Too many matches found. Please enter a more specific name.'
//         );
//         return;
//       }
//     })
//     .catch(error => {
//       clearInput();
//       console.log(error);
//       Notify.failure('Oops, there is no country with that name');
//     });
// }
