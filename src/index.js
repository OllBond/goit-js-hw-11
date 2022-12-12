import { Notify } from 'notiflix/build/notiflix-notify-aio';
import axios from 'axios';
import './css/styles.css';

const refs = {
  formRef: document.querySelector('#search-form'),
  buttonRef: document.querySelector('button-search'),
  inputRef: document.querySelector('search-form-input'),
};

refs.formRef.addEventListener('submit', onFormSubmit);

function onFormSubmit(e) {
  e.preventDefault();
}
