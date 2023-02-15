import dateFormat, { masks } from 'dateformat';
import { addToFavorite } from './add-to-favorite';
import { setFavoritesOnLoad } from './set-favorites-on-load';
import { getPopular } from './get-popular';
import { setItemToLocalStorage } from './add-read';
// import { getArticleByCategory } from './api';
import { getWeatherCard } from './weather'; 

const cardList = document.getElementById('cards');
const BASE_URL = 'https://api.nytimes.com/svc';
const API_KEY = 'SVYGfSzYyEfqvl2Rz9D9zXBCipJV7rQX';
const POPULAR_URL = '/mostpopular/v2/viewed/1.json?api-key=';
const temp = getPopular();
// console.log(temp);
let dataBase = null;
function getCardsList() {
  fetch(`${BASE_URL}${POPULAR_URL}${API_KEY}`)
    .then(response => response.json())
    .then(({ results }) => {
      // console.log(results);
      dataBase = results;
      let html = '';
      if (results) {
        results.forEach(card => {
          const imgUrl = card.media.length
            ? card.media[0]['media-metadata'][2].url
            : "../images/news.jpg";
          const imgCaption = card.media.length ? card.media[0].caption : 'News';

          html += `<li class = "card__item" data-id = "${card.uri}">
    <div class="card__wrapper">
      <div class="card__thumb">
        <img class="card__img" src = "${imgUrl}" alt = "${imgCaption}">
        <p class="card__news-category">${card.section}</p>
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
        });
        cardList.classList.remove('notFound');
      } else {
        html = "Sorry, we didn't find any news!";
        cardList.classList.add('notFound');
      }
      cardList.innerHTML = html;
      getWeatherCard();
      setFavoritesOnLoad();
    });
}
getCardsList();

// cardList.addEventListener('click', addToFavorite);
cardList.addEventListener('click', addToReadyRead);

//----------------------------
// function addToAlreadyRead(e) {
//   if (e.target.className === 'card__link') {
//     let cardItem =
//       e.target.parentElement.parentElement.parentElement.dataset.id;
//     const cardObj = dataBase.find(el => el.uri === cardItem);

//     console.log(cardObj);
//   }
// }

// const cardEl = document.querySelector('.js_detalis');
// const LOCAL_STORAGE_KEY = 'read_key'; //клю для локалстореджа
// //Проверка наличия данных в локалсторедж и запись новых данных
// function setItemToLocalStorage(item) {
//   const dataLocalStorage = localStorage.getItem(LOCAL_STORAGE_KEY);
//   //Конвертация формата даты в вид 00/00/00
//   const currentData = new Date();
//   const currentDataString = `${currentData.getDate()}/${
//     currentData.getMonth() + 1
//   }/${currentData.getFullYear()}`; // *******

//   if (!dataLocalStorage) {
//     const newData = [{ data: currentDataString, items: [item] }];
//     localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newData));
//     return;
//   }

//   const dataArr = JSON.parse(dataLocalStorage);

//   let goodDataFlag = true; //флаг проверки записи в локалсторедж

//   const newDataArr = dataArr.map(elItem => {
//     if (elItem.data === currentDataString) {
//       goodDataFlag = false;
//       elItem.items.push(item);
//       return elItem;
//     }
//     return elItem;
//   });

//   if (goodDataFlag) {
//     newDataArr.push({ data: currentDataString, items: [item] });
//   }

//   localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newDataArr));
// }
// setItemToLocalStorage({});
// const createCardItem = data => {
//   return `<summary>${data}</summary>`;
//   const macCard = ({ id, text }) => {
//     return `<div>
//     <p>${id}</p>
//     <p>${text}</p>
//     </div>
//     `;
//   };
// };
// *********************************
// const cardElFav = document.querySelector('.js_detalis-fav');
// const FAV_LOCAL_STORAGE_KEY = 'fav_key'; //клю для локалстореджа
// //Проверка наличия данных в локалсторедж и запись новых данных
// function setItemToLocalStorageFav(item) {
//   const dataLocalStorage = localStorage.getItem(FAV_LOCAL_STORAGE_KEY);
//   //Конвертация формата даты в вид 00/00/00
//   const currentData = new Date();
//   const currentDataString = `${currentData.getDate()}/${
//     currentData.getMonth() + 1
//   }/${currentData.getFullYear()}`; // *******

//   if (!dataLocalStorage) {
//     const newData = [{ data: currentDataString, items: [item] }];
//     localStorage.setItem(FAV_LOCAL_STORAGE_KEY, JSON.stringify(newData));
//     return;
//   }

//   const dataArr = JSON.parse(dataLocalStorage);

//   let goodDataFlag = true; //флаг проверки записи в локалсторедж

//   const newDataArr = dataArr.map(elItem => {
//     console.dir(elItem, 'ffsdafsa');
//     if (elItem.data === currentDataString) {
//       goodDataFlag = false;
//       elItem.items.push(item);
//       return elItem;
//     }
//     return elItem;
//   });

//   if (goodDataFlag) {
//     newDataArr.push({ data: currentDataString, items: [item] });
//   }

//   localStorage.setItem(FAV_LOCAL_STORAGE_KEY, JSON.stringify(newDataArr));
// }
// setItemToLocalStorageFav();
// *****************************************

function addToReadyRead(e) {
  if (e.target.className === 'card__link') {
    let cardItem =
      e.target.parentElement.parentElement.parentElement.dataset.id;
    const cardObj = dataBase.find(el => el.uri === cardItem);
    setItemToLocalStorage(cardObj);
  }
}
// function addToFavor(e) {
//   if (e.target.className === 'favorite-btn') {
//     let cardItemFav =
//       e.target.parentElement.parentElement.parentElement.dataset.id;
//     const crdObjFav = dataBase.find(el => el.uri === cardItemFav);
//     setItemToLocalStorageFav(crdObjFav);
//   }
// }
