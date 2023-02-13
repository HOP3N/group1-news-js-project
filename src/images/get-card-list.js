import dateFormat, { masks } from "dateformat";
const now = new Date();
const date = dateFormat(now, "dd/mm/yyyy");
console.log(date);

const cardList = document.getElementById('cards');
const BASE_URL = 'https://api.nytimes.com/svc';
const API_KEY = 'SVYGfSzYyEfqvl2Rz9D9zXBCipJV7rQX';

function getCardsList() {
  fetch(`${BASE_URL}/news/v3/content/nyt/business.json?api-key=${API_KEY}`)
    .then(response => response.json())
    .then(({ results }) => {
      console.log(results);
      let html = '';
      if (results) {
        results.forEach(card => {
          html += `<li class = "card__item" data-id = "${card.title}">
    <div class="card__wrapper">
      <div class="card__thumb">
        <img class="card__img" src = "${card.multimedia[2].url}" alt = "${card.multimedia[2].caption}">
        <p class="card__news-category">${card.section}</p>
        <p class="card__text-read">Already read</p>
        <button class="favorite-btn" type="button" data-action="favorite-btn">Add to favorite</button>
      </div>
      <h3 class="card__news-title">${card.title}</h3>
      <p class="card__news-description">${card.abstract}</p>
      <div class="card__additional-info-container">
        <p class="card__datetime">${date}</p>
        <a class="card__link" href="${card.url}" target="_blank" rel="noopener noreferrer nofollow">Read more</a>
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
      // setFavoritesOnLoad();
    });
}
getCardsList();

function addToFavorite(e) {
  if (e.target.dataset.action === "favorite-btn") {
    let cardItem = e.target.parentElement.parentElement.dataset.id;
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    if (e.target.classList.contains("removeFavorite-btn")) {
      const updatedFavorites = favorites.filter((id) => id !== cardItem);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));

      e.target.textContent = "Add to favorites";
      e.target.classList.remove("removeFavorite-btn");
    } else {
      favorites.push(cardItem);
      localStorage.setItem("favorites", JSON.stringify(favorites));

      e.target.textContent = "Remove from favorites";
      e.target.classList.add("removeFavorite-btn");
    }
  }
}

function setFavoritesOnLoad() {
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  favorites.forEach((id) => {
    const cardItem = document.querySelector(`[data-id="${id}"]`);
    const favoriteBtn = cardItem.querySelector("[data-action='favorite-btn']");

    favoriteBtn.classList.add("removeFavorite-btn");
    favoriteBtn.textContent = "Remove from fav";
  });
}
cardList.addEventListener("click", addToFavorite);
