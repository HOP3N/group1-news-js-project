import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import imgOps from '../img/main/img-ds.png';
import svg from '../images/sprite.svg';

const dateInputEl = document.querySelector('#datetime-picker');
const filterSection = document.querySelector('.filter-section');
// const sectionNewsEl = document.querySelector('.section-news');
// const newsListEl = document.querySelector('.news-list');
const sectionPaginationEl = document.querySelector('.pagination');

const API_KEY = 'SVYGfSzYyEfqvl2Rz9D9zXBCipJV7rQX';
let keyword;
let order = 1;

function getCategoryValue(e) {
  if (e.target.nodeName !== `BUTTON`) {
    return;
  }
  keyword = e.target.textContent.trim();
}

filterSection.addEventListener(`click`, getCategoryValue);

function makeFetchByDate(selectedDate, keyword) {
  return fetch(
    `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${keyword}&fq=pub_date:(${selectedDate})&api-key=${API_KEY}`
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}

const options = {
  altFormat: 'd/m/Y',
  ariaDateFormat: 'd/m/Y',
  dateFormat: 'd/m/Y',
  maxDate: new Date(),
  defaultDate: new Date(),
  shorthand: true,
  locale: {
    firstDayOfWeek: 1,
  },

  onClose(selectedDates) {
    let ourDate = new Date(selectedDates);
    ourDate = ourDate.toLocaleString().split(',')[0];
    ourDate = ourDate.replace(/\//g, '-');
    let ourDateArr = Array.from(ourDate);
    ourDateArr =
      ourDateArr[6] +
      ourDateArr[7] +
      ourDateArr[8] +
      ourDateArr[9] +
      ourDateArr[5] +
      ourDateArr[3] +
      ourDateArr[4] +
      ourDateArr[2] +
      ourDateArr[0] +
      ourDateArr[1];

    return makeFetchByDate(ourDateArr, keyword)
      .then(data => {
        if (keyword === undefined) {
          createMarkupIfDataEmpty();
        } else if (data.response.docs.length === 0) {
          createMarkupIfFoundNothing();
        }
        appendMarkup(data.response.docs);
      })
      .catch(error => console.log(error));
  },
};
flatpickr(dateInputEl, options);

function createMarkupByInput(array) {
  return array
    .map(data => {
      order += 1;

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

      if (keyword === data.section_name) {
        return `<li class="news-item" style="order: ${order}">
    <div class="news-thumb">
      <img
        class="img-news"
        src="${imageBase}"
        alt="${data.abstract}"
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
        ${formatedTitle}
      </h2>
      <p class="subtitle">
        ${fromatedSubTitle}
      </p>
      <div class="other-line">
        <p class="date">${replaceDat}</p>
        <p class="hyperlink"><a href="${data.url} target="_blank" rel="noopener noreferrer"">Read more</a></p>
      </div>
    </div>
  </li>`;
      }
    })
    .join('');
}

function appendMarkup(array) {
  const markUp = createMarkupByInput(array);

  if (array.length === 0) {
    return createMarkupIfDataEmpty();
  }

  newsListEl.innerHTML = markUp;
}

function createMarkupIfDataEmpty() {
  const markup = `<h2 class="section-news__title">Please update page and choose the search category</h2><img src="${imgOps}" alt="Ooooops" class="news-section__img-if-empty"/>`;
  sectionNewsEl.innerHTML = markup;
  sectionPaginationEl.innerHTML = '';
}

function createMarkupIfFoundNothing() {
  const markup = `<h2 class="section-news__title">We haven’t found news from this category</h2><img src="${imgOps}" alt="Ooooops" class="news-section__img-if-empty"/>`;
  sectionNewsEl.innerHTML = markup;
  sectionPaginationEl.innerHTML = '';
}

export class API {
  #BASE_URL = 'https://api.nytimes.com/svc/';
  #API_KEY = 'SVYGfSzYyEfqvl2Rz9D9zXBCipJV7rQX';
  #period;
  #query;
  #beginDate;
  #page;
  #offset;
  #params = {
    'api-key': this.#API_KEY,
    q: this.#query,
    page: this.#page,
    begin_date: this.#beginDate,
  };
  async getCategories() {
    const response = await fetch(
      this.#BASE_URL +
        `news/v3/content/section-list.json?api-key=${this.#API_KEY}`
    );
    if (!response.ok) {
      throw new Error(error);
    }
    const { results } = await response.json();
    return results;
  }
  get query() {
    return this.#query;
  }
  set query(newQuery) {
    this.#query = newQuery;
  }
  updatePage() {
    this.#page++;
  }
  resetPage() {
    this.#page = 1;
  }
  get date() {
    this.#beginDate;
  }
  set date(newDate) {
    this.#beginDate = newDate;
  }
  updateOffset() {
    this.#offset += 20;
  }
  resetOffset() {
    this.#offset = 0;
  }
}
const newsFetch = new API();
newsFetch.getCategories().then(console.log);
const arrCategories = JSON.parse(localStorage.getItem('results'));
const refs = {
  categoriesBtnMenu: document.querySelector('.categories__btn-menu'),
  categoriesBox: document.querySelector('.categories'),
  categoriesList: document.querySelector('.categories__list'),
  categoriesMenu: document.querySelector('.categories__menu'),
  menu: document.querySelector('.menu'),
  categoriesIconUp: document.querySelector('.categories__icon-up'),
  categoriesIconDown: document.querySelector('.categories__icon-down'),
  categoriesBtnList: document.querySelector('.categories__btn-list'),
  categoriesBtnMenuText: document.querySelector('.categories__btn-text'),
};
saveCategories();
categoriesOnResize();
categoriesOnPageLoad();
// refs.categoriesBtnMenu.addEventListener('mouseenter', showCategoriesList);
// refs.menu.addEventListener('mouseleave', showCategoriesList);
function saveCategories() {
  newsFetch.getCategories().then(results => {
    localStorage.setItem('results', JSON.stringify(results));
  });
}
function categoriesOnResize() {
  window.addEventListener('resize', e => {
    if (e.currentTarget.innerWidth >= 1279.98) {
      clearCategories();
      markupDesktop();
    } else if (e.currentTarget.innerWidth >= 767.98) {
      clearCategories();
      markupTablet();
    } else {
      clearCategories();
      markupMobile();
    }
  });
}
function categoriesOnPageLoad() {
  if (window.matchMedia('(min-width: 1279.98px)').matches) {
    clearCategories();
    markupDesktop();
  } else if (window.matchMedia('(min-width: 767.98px)').matches) {
    clearCategories();
    markupTablet();
  } else {
    clearCategories();
    markupMobile();
  }
}
function clearCategories() {
  refs.categoriesBtnList.innerHTML = '';
  refs.categoriesList.innerHTML = '';
}
function markupTablet() {
  refs.categoriesBtnList.insertAdjacentHTML(
    'afterbegin',
    markupCategoriesInBtn(arrCategories, 0, 4)
  );
  refs.categoriesList.insertAdjacentHTML(
    'afterbegin',
    markupCategoriesInList(arrCategories, 4)
  );
  refs.categoriesBtnMenuText.textContent = 'Others';
}
function markupDesktop() {
  refs.categoriesBtnList.insertAdjacentHTML(
    'afterbegin',
    markupCategoriesInBtn(arrCategories, 0, 6)
  );
  refs.categoriesList.insertAdjacentHTML(
    'afterbegin',
    markupCategoriesInList(arrCategories, 6)
  );
  refs.categoriesBtnMenuText.textContent = 'Others';
}
function markupMobile() {
  refs.categoriesList.insertAdjacentHTML(
    'afterbegin',
    markupCategoriesInList(arrCategories)
  );
  refs.categoriesBtnMenuText.textContent = 'Categories';
}
function markupCategoriesInBtn(arrCategories, begin, end) {
  return arrCategories
    .slice(begin, end)
    .map(
      result =>
        `<li> <button class="categories__btn" data-value="${result.section}">${result.display_name}
    </button> </li>`
    )
    .join(' ');
}
function markupCategoriesInList(arrCategories, begin, end) {
  return arrCategories
    .slice(begin, end)
    .map(
      result =>
        `<li class="categories__item" data-value="${result.section}">${result.display_name}</li>`
    )
    .join(' ');
}

refs.categoriesBtnMenu.addEventListener(`click`, showCategoriesList);

function showCategoriesList() {
  refs.categoriesIconUp.classList.toggle('invisible');
  refs.categoriesIconDown.classList.toggle('invisible');
  refs.categoriesMenu.classList.toggle('invisible');
}

// =========================== Загрузка новостей по категориям

const categoryBtn = document.querySelector('.categories__btn-list');
const listCategoriesBtn = document.querySelector('.categories__menu');
const sectionNewsEl = document.querySelector('.card');
const newsListEl = document.querySelector('.card__list');

categoryBtn.addEventListener('click', onClickBtn);
listCategoriesBtn.addEventListener('click', onClickBtn);

function onClickBtn(e) {
  // e.target.value
  console.log(e.target);

  const category = e.target.dataset.value;

  fetch(
    `https://api.nytimes.com/svc/news/v3/content/nyt/${category}.json?api-key=SVYGfSzYyEfqvl2Rz9D9zXBCipJV7rQX`
  )
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(({ results }) => {
      if (results === null) {
        createMarkupIfEmpty();
        return;
      }

      return results
        .map(data => {
          let fromatedSubTitle = data.abstract.slice(0, 120) + `...`;
          let formatedTitle = data.title.slice(0, 60) + `...`;
          let formattedDate = data.created_date.toString().slice(0, 10);
          let replaceDat = formattedDate.replace(`-`, '/').replace(`-`, '/');

          let imageStart;
          let imageBase;

          if (data.multimedia.length > 0) {
            imageBase = data.multimedia[2].url;
          } else if (data.multimedia.length === 0) {
            imageBase =
              'https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg';
          }

          return `<li class = "card__item" data-id = "${data.uri}">
                    <div class="card__wrapper">
                      <div class="card__thumb">
                        <img class="card__img" src = "${imageBase}" alt = "${data.byline}">
                        <p class="card__news-category">${data.section}</p>
                        <button class="favorite-btn" type="button" data-action="favorite-btn">Add to favorite</button>
                      </div>
                      <h3 class="card__news-title">${formatedTitle}</h3>
                      <p class="card__news-description">${fromatedSubTitle}</p>
                      <div class="card__additional-info-container">
                        <p class="card__datetime">${replaceDat}</p>
                        <a class="card__link" href="${data.url}" target="_blank" rel="noopener noreferrer nofollow">Read more</a>
                      </div>
                    </div>
                </li>`;
        })
        .join('');
    })
    .then(markup => (newsListEl.innerHTML = markup));
}

function createMarkupIfEmpty() {
  const markup = `<div class="section-news__wrapper">
                    <h2 class="section-news__title">We haven’t found news from this category</h2>
                    <img src="${imgOps}" alt="Ooooops" class="news-section__img-if-empty"/>
                    </div>`;
  sectionNewsEl.innerHTML = markup;
  sectionPaginationEl.innerHTML = '';
}
