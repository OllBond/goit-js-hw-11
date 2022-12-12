// import axios from 'axios';

// const BASE_URL = 'https://restcountries.com/v3.1/name/';
// // іменований експорт функції
// export function fetchCountries(name) {
//   return fetch(
//     `${BASE_URL}${name}?fields=name,capital,population,flags,languages`
//   ).then(response => {
//     console.log(response);
//     // якщо response.ok true
//     if (response.ok) {
//       // повертаємо розпарсений об'єкт
//       return response.json();
//     }
//     throw new Error(response.statusText);
//   });

// axios
// return axios
//   .get(
//     `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`
//   )
//   .then(({ data }) => data);
// }
