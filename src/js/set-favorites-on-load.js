function setFavoritesOnLoad() {
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

  favorites.forEach(id => {
    const cardItem = document.querySelector(`[data-id="${id}"]`);
    const favoriteBtn = cardItem.querySelector("[data-action='favorite-btn']");

    favoriteBtn.classList.add('removeFavorite-btn');
    favoriteBtn.textContent = 'Remove from fav';
  });
}
export { setFavoritesOnLoad };
