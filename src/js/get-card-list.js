const cardList = document.getElementById('cards');
const isFavorite = true;
const API_KEY = 'SVYGfSzYyEfqvl2Rz9D9zXBCipJV7rQX';
let inputText = '';

export function getCardsList() {
  fetch(
    `https://api.nytimes.com/svc/news/v3/content/nyt/business.json?api-key=${API_KEY}`
  )
    .then(response => response.json())
    .then(({ results }) => {
      console.log(results);
      let html = '';
      if (results) {
        results.forEach(card => {
          html += `
                    <div class = "news-item" data-id = "${card.title}">
                        <div class = "news-img">
                            <img src = "${card.multimedia[2].url}" alt = "${card.multimedia[2].caption}">
                        </div>
                        <div>${card.section}</div>
                                                <div>Already read &#x2714</div>

                        <div class = "news-buttons">
                            <button type="button" data-action="favorite-btn" class="favorite-btn">Add to favorite</button>
                        </div>
                        <div class = "news-name">
                            <h3>${card.title}</h3>
                            <p>${card.abstract}</p>
                        </div>

                            <p>${card.published_date}</p>
        <a href="${card.url}" target="_blank" rel="noopener noreferrer nofollow">Read more</a>

                    </div>
                `;
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
  if (e.target.dataset.action === 'favorite-btn') {
    let cardItem = e.target.parentElement.parentElement.dataset.id;
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    if (e.target.classList.contains('removeFavorite-btn')) {
      const updatedFavorites = favorites.filter(id => id !== cardItem);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));

      e.target.textContent = 'Add to favorites';
      e.target.classList.remove('removeFavorite-btn');
    } else {
      favorites.push(cardItem);
      localStorage.setItem('favorites', JSON.stringify(favorites));

      e.target.textContent = 'Remove from favorites';
      e.target.classList.add('removeFavorite-btn');
    }
  }
}

function setFavoritesOnLoad() {
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

  favorites.forEach(id => {
    const cardItem = document.querySelector(`[data-id="${id}"]`);
    const favoriteBtn = cardItem.querySelector("[data-action='favorite-btn']");

    favoriteBtn.classList.add('removeFavorite-btn');
    favoriteBtn.textContent = 'Remove from fav';
  });
}
cardList.addEventListener('click', addToFavorite);
