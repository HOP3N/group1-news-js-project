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


//Mobile-change-theme

// const themeSwitcherMobile = document.getElementById('theme-switch-mobile');

// themeSwitcherMobile.checked = false;


// function clickHandlerMobile() {
//   if (this.checked) {
//     document.body.classList.remove('light');
//     document.body.classList.add('dark');
//     localStorage.setItem('theme', 'dark');
   
//   } else {
//     document.body.classList.add('light');
//     document.body.classList.remove('dark');
//     localStorage.setItem('theme', 'light');
    
//   }
// }

// function checkThemeMobile() {
//   const localStorageThemeMobile = localStorage.getItem('theme');

//   // set the theme of body
//   document.body.className = localStorageThemeMobile;

//   // adjust the slider position
//   if (localStorageTheme === 'dark') {
//     themeSwitcherMobile.checked = true;
//     }
// }

// themeSwitcherMobile.addEventListener('change', clickHandlerMobile);
// window.addEventListener('load', checkTheme);
