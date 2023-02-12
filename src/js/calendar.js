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
