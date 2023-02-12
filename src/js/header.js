const searchInputEl = document.querySelector('.search-input');
const searchBtnEl = document.querySelector('.search-button');

function showInput() {
    searchInputEl.style.opacity = 1;
    searchBtnEl.style.left = 0;
}

searchBtnEl.addEventListener('click', showInput);