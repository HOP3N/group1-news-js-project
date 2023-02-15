// Выемка данных из локалстореджа
const cardEl = document.querySelector('.js_detalis');
import dateFormat, { masks } from 'dateformat';
const LOCAL_STORAGE_KEY = 'read_key';
function getItemFromLocalStorage() {
  const dataLocalStorage = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (!dataLocalStorage) {
    return;
  }

  const content = JSON.parse(dataLocalStorage);

  const contentArr = content.map(element => {
    const itemsAll = element.items.map(el => {
      // console.log(el); ///*******Вставка функция генерации карточек */
      return createCardItem(el);
    });
    // ******разметка блока для секции read
    return ` <details >
     <summary>${element.data}</summary>
    <ul class="content-read">
      ${itemsAll.join('')}
    </ul>
  </details>
  `;
  });
  cardEl.insertAdjacentHTML('beforeend', contentArr.join(''));
}
getItemFromLocalStorage();

function createCardItem(card) {
  console.log(card);
  const imgUrl = card.media.length
    ? card.media[0]['media-metadata'][2].url
    : 'https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg';
  const imgCaption = card.media.length ? card.media[0].caption : '';
  return `<li class = "card__item" data-id = "${card.uri}">
  <div class="card__wrapper">
    <div class="card__thumb">
      <img class="card__img" src = "${imgUrl}" alt = "${imgCaption}" width = "350">
      <p class="card__news-category">${card.section_name}</p>
      <p class="card__text-read">Already read</p>
      <button class="favorite-btn" type="button" data-action="favorite-btn">Add to favorite</button>
    </div>
    <h3 class="card__news-title">${card.title}</h3>
    <p class="card__news-description">${card.abstract}</p>
    <div class="card__additional-info-container">
      <p class="card__datetime">${dateFormat(
        card.published_date,
        'dd/mm/yyyy'
      )}</p>
      <a class="card__link" href="${
        card.url
      }" target="_blank" rel="noopener noreferrer nofollow">Read more</a>
    </div>
    
  </div>
</li>`;
}

// при открытии следующей закрывается предыдущая
// var details = document.querySelectorAll('details');
// for (i = 0; i < details.length; i++) {
//   details[i].addEventListener('toggle', accordion);
// }
// function accordion(event) {
//   if (!event.target.open) return;
//   var details = event.target.parentNode.children;
//   for (i = 0; i < details.length; i++) {
//     if (
//       details[i].tagName != 'DETAILS' ||
//       !details[i].hasAttribute('open') ||
//       event.target == details[i]
//     ) {
//       continue;
//     }
//     details[i].removeAttribute('open');
//   }
// }

// ********************************************************
