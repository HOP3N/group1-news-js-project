function addToFavorite(e) {
  if (e.target.dataset.action === 'favorite-btn') {
    let cardItem =
      e.target.parentElement.parentElement.parentElement.dataset.id;
    console.log(cardItem);
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
export { addToFavorite };
