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
  const markup = `<div class="section-news__wrapper">
                    <h2 class="section-news__title">We haven’t found news from this category</h2>
                    <img src="${imgOps}" alt="Ooooops" class="news-section__img-if-empty"/>
                    </div>`;
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
