(() => {
  const mobileMenu = document.querySelector('.js-menu-container');
  const openMenuBtn = document.querySelector('.js-open-menu');
  const closeMenuBtn = document.querySelector('.js-close-menu');

  const toggleMenu = () => {
    const isMenuOpen =
      openMenuBtn.getAttribute('aria-expanded') === 'true' || false;
    openMenuBtn.setAttribute('aria-expanded', !isMenuOpen);
    mobileMenu.classList.toggle('is-open');

    const scrollLockMethod = !isMenuOpen
      ? 'disableBodyScroll'
      : 'enableBodyScroll';
    bodyScrollLock[scrollLockMethod](document.body);
  };

  openMenuBtn.addEventListener('click', toggleMenu);
  closeMenuBtn.addEventListener('click', toggleMenu);

  window.matchMedia('(min-width: 768px)').addEventListener('change', e => {
    if (!e.matches) return;
    mobileMenu.classList.remove('is-open');
    openMenuBtn.setAttribute('aria-expanded', false);
    bodyScrollLock.enableBodyScroll(document.body);
  });
})();

// Mobile-change-theme

const themeSwitcherMobile = document.getElementById('theme-switch-mobile');
const imageSwitcherMobile = document.querySelectorAll('.toggle-theme__icon-mobile');
themeSwitcherMobile.checked = false;

function clickHandlerMobile() {
  if (this.checked) {
    document.body.classList.remove('light');
    document.body.classList.add('dark');
    localStorage.setItem('theme', 'dark');
    imageSwitcherMobile[0].classList.remove('active-icon');
    imageSwitcherMobile[1].classList.add('active-icon');
  } else {
    document.body.classList.add('light');
    document.body.classList.remove('dark');
    localStorage.setItem('theme', 'light');
    imageSwitcherMobile[1].classList.remove('active-icon');
    imageSwitcherMobile[0].classList.add('active-icon');
  }
}

function checkThemeMobile() {
  const localStorageTheme = localStorage.getItem('theme');

  // set the theme of body
  document.body.className = localStorageTheme;

  // adjust the slider position
  if (localStorageTheme === 'dark') {
    themeSwitcherMobile.checked = true;
    imageSwitcherMobile[1].classList.add('active-icon');
  } else {
    imageSwitcherMobile[1].classList.remove('active-icon');
    imageSwitcherMobile[0].classList.add('active-icon');
  }
}

themeSwitcherMobile.addEventListener('change', clickHandlerMobile);
window.addEventListener('load', checkThemeMobile);
