const themeSwitcher = document.getElementById('theme-switch');
const imageSwitcher = document.querySelectorAll('.toggle-theme__icon')
const textSwitcher = document.querySelectorAll('.toggle-theme__text')
themeSwitcher.checked = false;


function clickHandler() {
  if (this.checked) {
    document.body.classList.remove('light');
    document.body.classList.add('dark');
    localStorage.setItem('theme', 'dark');
    textSwitcher[0].classList.remove('active');
    textSwitcher[1].classList.add('active');
    imageSwitcher[0].classList.remove('active');
    imageSwitcher[1].classList.add('active');
  } else {
    document.body.classList.add('light');
    document.body.classList.remove('dark');
    localStorage.setItem('theme', 'light');
    textSwitcher[1].classList.remove('active');
    textSwitcher[0].classList.add('active');
    imageSwitcher[1].classList.remove('active');
    imageSwitcher[0].classList.add('active');
  }
}

function checkTheme() {
  const localStorageTheme = localStorage.getItem('theme');

  // set the theme of body
  document.body.className = localStorageTheme;

  // adjust the slider position
  if (localStorageTheme === 'dark') {
    themeSwitcher.checked = true;
    textSwitcher[1].classList.add('active');
    imageSwitcher[1].classList.add('active');
  }
}

themeSwitcher.addEventListener('change', clickHandler);
window.addEventListener('load', checkTheme);
