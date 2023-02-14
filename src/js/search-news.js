import imgOps from '../img/main/img-ds.png';
import svg from '../images/sprite.svg';

const searchFormEl = document.querySelector('.search-form');
const searchBtnEl = document.querySelector('.search-button');
const sectionNewsEl = document.querySelector('.card');
const newsListEl = document.querySelector('.card__list');
const sectionPaginationEl = document.querySelector('.pagination');

const API_KEY = 'SVYGfSzYyEfqvl2Rz9D9zXBCipJV7rQX';
let keyword = '';

function createMarkupIfEmpty() {
  const markup = `<h2 class="section-news__title">We haven’t found news from this category</h2><img src="${imgOps}" alt="Ooooops" class="news-section__img-if-empty"/>`;
  sectionNewsEl.innerHTML = markup;
  sectionPaginationEl.innerHTML = '';
}

function createMarkupByInput(array) {
  return array
    .map(data => {
      let fromatedSubTitle = data.abstract.slice(0, 120) + `...`;
      let formatedTitle = data.headline.main.slice(0, 60) + `...`;
      let formattedDate = data.pub_date.toString().slice(0, 10);
      let replaceDat = formattedDate.replace(`-`, '/').replace(`-`, '/');

      let imageStart;
      let imageBase;

      if (data.multimedia.length > 0) {
        imageStart = 'https://static01.nyt.com/';
        imageBase = imageStart + data.multimedia[0].url;
      } else if (data.multimedia.length === 0) {
        imageBase =
          'https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg';
      }

      return `<li class = "card__item" data-id = "${data.uri}">
                    <div class="card__wrapper">
                      <div class="card__thumb">
                        <img class="card__img" src = "${imageBase}" alt = "${data.byline}">
                        <p class="card__news-category">${data.section_name}</p>
                        <p class="card__text-read">Already read</p>
                        <button class="favorite-btn" type="button" data-action="favorite-btn">Add to favorite</button>
                      </div>
                      <h3 class="card__news-title">${data.headline.main}</h3>
                      <p class="card__news-description">${data.abstract}</p>
                      <div class="card__additional-info-container">
                        <p class="card__datetime">${replaceDat}</p>
                        <a class="card__link" href="${data.web_url}" target="_blank" rel="noopener noreferrer nofollow">Read more</a>
                      </div>
                    </div>
                </li>`;
    })
    .join('');
}

function appendMarkup(array) {
  const markUp = createMarkupByInput(array);

  newsListEl.innerHTML = markUp;
}

function makeFetch(keyword) {
  return fetch(
    `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${keyword}&api-key=${API_KEY}`
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}

function handleSearchInput(event) {
  event.preventDefault();
  keyword = event.currentTarget.elements.searchQuery.value;

  makeFetch(keyword)
    .then(data => {
      if (keyword === '') {
        return;
      } else if (data.response.docs.length === 0) {
        return createMarkupIfEmpty();
      }
      appendMarkup(data.response.docs);
    })
    .catch(error => {
      createMarkupIfEmpty();
      console.log(error);
    });
}

searchFormEl.addEventListener('submit', handleSearchInput);

// // 1 сделать рефы
// // 2 повесить событие ни инпут
// // 3 сравнить значение инпута со всеми новостями
// // 4 вывести совпадения в разметку

// import axios from 'axios';

// axios.defaults.baseURL = 'https://api.nytimes.com/svc/';
// const apiKey = 'api-key=SVYGfSzYyEfqvl2Rz9D9zXBCipJV7rQX';

// const refs = {
//   input: document.querySelector('.input'),
//   form: document.querySelector('.search-form'),
//   galleryNews: document.querySelector('card__list'),
// };

// async function fetchNews() {
//   try {
//     const response = await axios.get(`mostpopular/v2/viewed/1.json?${apiKey}`);
//     const data = await response.data;
//     console.log(`🚀 ~ fetchNews ~ data`, data);

//     return data;
//   } catch (error) {
//     console.log(error);
//   }
// }

// refs.form.addEventListener('submit', onSubmit);

// async function onSubmit(e) {
//   e.preventDefault();
//   refs.galleryNews.innerHTML = '';
//   const value = refs.input.value;
//   console.log(`🚀 ~ onSubmit ~ value`, value);

//   if (!value) {
//     // страница - ничего не найдено
//     return;
//   }
// }

// fetchNews();

// ===================================

// ('use strict');

// const form = `
//     <form class="form">
//         <input type="text />
//         <button
//             class="form__button"
//             type="submit'
//         >
//             Search
//         </button>
//     </form>
// `;

// document.body.insertAdjacentHTML('afterbegin', form);
// console.log('hello');

// function createQuery(searchQuery = '', category = '', date = '') {
//   let query = '';

//   if (searchQuery) {
//     const separator = query ? '&' : '?';
//     query += `${separator}q=${searchQuery}`;
//   }

//   if (category) {
//     const separator = query ? '&' : '?';
//     query += `${separator}category=${category}`;
//   }

//   if (date) {
//     const separator = query ? '&' : '?';

//     query += `${separator}date=${date}`;
//   }

//   console.log(query, 'final query');
// }

// const queryString = createQuery('total');

// const BASE_URL = 'https://api.nytimes.com/svc/search/v2/articlesearch.json';
// const apiKey = '&api-key=SVYGfSzYyEfqvl2Rz9D9zXBCipJV7rQX';

// /*

// */

// function getSearchResults(searchQuery1 = '') {
//   return fetch(`${BASE_URL}${searchQuery1}${apiKey}`);
// }

// getSearchResults('?q=alien')
//   .then(data => data.json())
//   .then(console.log);
