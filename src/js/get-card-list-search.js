import dateFormat, { masks } from 'dateformat';
import { addToFavorite } from './add-to-favorite';
import { setFavoritesOnLoad } from './set-favorites-on-load';

const cardList = document.getElementById('cards');
const BASE_URL = 'https://api.nytimes.com/svc';
const API_KEY = 'SVYGfSzYyEfqvl2Rz9D9zXBCipJV7rQX';
//api.nytimes.com/svc/search/v2/articlesearch.json?q=arts&page=1&api-key=SVYGfSzYyEfqvl2Rz9D9zXBCipJV7rQX
function getCardsList() {
  fetch(
    `${BASE_URL}/search/v2/articlesearch.json?q=arts&page=1&api-key=${API_KEY}`
  )
    .then(response => response.json())
    .then(({ response }) => {
      console.log(response);
      const results = response.docs;
      let html = '';
      if (results) {
        results.forEach(card => {
          const imgUrl = `https://static01.nyt.com/${card.multimedia[0].url}`;
          const imgCaption = `https://static01.nyt.com/${card.multimedia[0].caption}`;

          html += `<li class = "card__item" data-id = "${card.uri}">
    <div class="card__wrapper">
      <div class="card__thumb">
        <img class="card__img" src = "${imgUrl}" alt = "${imgCaption}">
        <p class="card__news-category">${card.section_name}</p>
        <p class="card__text-read">Already read</p>
        <button class="favorite-btn" type="button" data-action="favorite-btn">Add to favorite</button>
      </div>
      <h3 class="card__news-title">${card.headline.main}</h3>
      <p class="card__news-description">${card.abstract}</p>
      <div class="card__additional-info-container">
        <p class="card__datetime">${dateFormat(card.pub_date, 'dd/mm/yyyy')}</p>
        <a class="card__link" href="${
          card.web_url
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
      setFavoritesOnLoad();
    });
}
getCardsList();

cardList.addEventListener('click', addToFavorite);
cardList.addEventListener('click', addToAlreadyRead);

//----------------------------

function addToAlreadyRead(e) {
  console.log(e.target.dataset);
  if (e.target.dataset.action === 'card__link') {
    let cardItem =
      e.target.parentElement.parentElement.parentElement.dataset.id;
    console.log(e.target.parentElement.parentElement.dataset.id);
    const favorites = JSON.parse(localStorage.getItem('read')) || [];

    if (e.target.classList.contains('removeFavorite-btn')) {
      console.log(e.target.dataset.action);
      const updatedFavorites = favorites.filter(id => id !== cardItem);
      localStorage.setItem('read', JSON.stringify(updatedFavorites));
      // e.target.textContent = "Add to favorites";
      // e.target.classList.remove("removeFavorite-btn");
    } else {
      favorites.push(cardItem);
      localStorage.setItem('read', JSON.stringify(favorites));
      // e.target.textContent = "Remove from favorites";
      // e.target.classList.add("removeFavorite-btn");
    }
  }
}

function setAlreadyReadOnLoad() {
  const favorites = JSON.parse(localStorage.getItem('read')) || [];

  favorites.forEach(id => {
    const cardItem = document.querySelector(`[data-id="${id}"]`);
    const favoriteBtn = cardItem.querySelector("[data-action='favorite-btn']");

    favoriteBtn.classList.add('removeFavorite-btn');
    favoriteBtn.textContent = 'Remove from fav';
  });
}
