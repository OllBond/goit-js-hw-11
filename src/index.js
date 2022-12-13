import { Notify } from 'notiflix/build/notiflix-notify-aio';
import axios from 'axios';
import { fetchPictures } from './api';
import './css/styles.css';

const refs = {
  formRef: document.querySelector('#search-form'),
  buttonRef: document.querySelector('button-search'),
  inputRef: document.querySelector('search-form-input'),
};

refs.formRef.addEventListener('submit', onFormSubmit);

let items = [];

function onFormSubmit(e) {
  e.preventDefault();
  // значення input у формі
  const inputValue = e.target.elements.searchQuery.value;
  console.log(inputValue);
  fetchPictures(inputValue);
}
