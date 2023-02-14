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

      return `<li class="news-item">
                <div class="news-thumb">
                <img
                    class="img-news"
                    src="${imageBase}"
                    alt="${data.byline}"
                    width="395"
                    height="395"
                />
                <p class="filter-descr">${data.section_name}</p>
                <button class="link-add"
                    >Add to favorite
                    <svg class="add-icon" width="16" heigth="16">
                    <use href="${svg}#heart-filled"></use>
                    </svg>
                </button>
                </div>
                <div class="desr">
                <h2 class="title">
                    ${data.headline.main}
                </h2>
                <p class="subtitle">
                    ${data.abstract}
                </p>
                <div class="other-line">
                    <p class="date">${replaceDat}</p>
                    <p class="hyperlink"><a href="${data.web_url} target="_blank" rel="noopener noreferrer" ">Read more</a></p>
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
