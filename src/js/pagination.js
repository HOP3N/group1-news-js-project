import { loadNews } from './api.js';
import './offset.js';
import './search-news.js';


const deviceWidth = +window.innerWidth;
const pg = document.querySelector('.pagination');
const btnNextPg = document.querySelector('button.next-page');
const btnPrevPg = document.querySelector('button.prev-page');

const mobileWidth = 480;
const tabletWidth = 768;

const loaderElement = document.createElement('div');
loaderElement.innerHTML = `
    <div class="loader-container">
      <div class="loader"></div>
    </div>
`;

function appendLoader() {
    // console.log('loader added');
    document.body.append(loaderElement);
}

function removeLoader() {
    const element = document.querySelector('.loader-container');
    // console.log(element, 'loader removed');
    loaderElement.remove();
}

let news = [];

appendLoader();

loadNews()
// const news = loadNews()
  .then(data => {
    return data.results;
  })
 
  .then(results => {
    news = results;
     console.log(news);
    return news;
  })
  .then(data => {
    const result = {
      currentPage: 1,
      numLinksTwoSide: 1,
      totalPages: Math.ceil(news / valuePage.perPage) || 1,
      perPage: 4,
    };

 
    
    if (deviceWidth <= mobileWidth) {
      result.perPage = 4;
    } else if (deviceWidth > mobileWidth && deviceWidth <= tabletWidth) {
      result.perPage = 7;
    } else {
      result.perPage = 8;
    }

    result.totalPages = Math.ceil(news.length / result.perPage);

    pg.innerHTML = '';
    pagination(result.totalPages);

    return result;
  })
  .then(modifiedData => (valuePage = modifiedData))
  .then(pageData => {
    removeLoader();
    pagination(pageData.totalPages);
  });

window.addEventListener('resize', () => {

  valuePage = calcPaginationData(valuePage);
  console.log(valuePage);

  pg.innerHTML = '';
  pagination(valuePage.totalPages);
});

const calcPaginationData = (object) => {
  let perPage = 0;
  const deviceWidth = +window.innerWidth;
  if (deviceWidth <= mobileWidth) {
    perPage = 4;
  } else if (deviceWidth > mobileWidth && deviceWidth <= tabletWidth) {
    perPage = 7;
  } else {
    perPage = 8;
  }
  const totalPages = Math.ceil(news.length / perPage);

  return {
    ...object,
    perPage,
    totalPages,
  };
};

let valuePage = {
  currentPage: 1,
  numLinksTwoSide: 1,
  totalPages: 0,
  perPage: 4,
  
};

// let itemsPerPage = 0;

pagination(valuePage.totalPages);
pg.addEventListener('click', e => {
  const ele = e.target;

  if (ele.dataset.page) {
    const pageNumber = parseInt(e.target.dataset.page, 10);

    valuePage.currentPage = pageNumber;
    pagination(valuePage.totalPages);

    handleBtnLeft();
    handleBtnRight();
  }
});



function pagination(totalPages) {
  const { currentPage, numLinksTwoSide: delta } = valuePage;
  console.log('pagination render', totalPages)

  const range = delta + 4;

  let render = '';
  let renderTwoSide = '';
  let dot = `<li class="pg-item pg-item--dot"><a class="pg-link">...</a></li>`;
  let countTruncate = 0;

  const numberTruncateLeft = currentPage - delta;
  const numberTruncateRight = currentPage + delta;

  let active = '';
  for (let p = 1; p <= totalPages; p++) {
    active = p === currentPage ? 'active' : '';

    if (totalPages >= 2 * range - 1) {
      if (numberTruncateLeft > 3 && numberTruncateRight < totalPages - 3 + 1) {
        if (p >= numberTruncateLeft && p <= numberTruncateRight) {
          renderTwoSide += renderPage(p, active);
        }
      } else {
        if (
          (currentPage < range && p <= range)
          || (currentPage > totalPages - range && p >= totalPages - range + 1)
          || p === totalPages
          || p === 1
        ) {
          render += renderPage(p, active);
        } else {
          countTruncate++;
          if (countTruncate === 1) render += dot;
        }
      }
    } else {
      render += renderPage(p, active);
    }
  }
  if (renderTwoSide) {
    renderTwoSide =
      renderPage(1) + dot + renderTwoSide + dot + renderPage(totalPages);
    pg.innerHTML = renderTwoSide;
  } else {
    pg.innerHTML = render;
  }
}
function renderPage(index, active = '') {
  return `
    <li class="pg-item ${active}" data-page="${index}">
      <a class="pg-link" href="#">${index}</a>
    </li>
  `;
}

document
  .querySelector('.page-container')
  .addEventListener('click', function (e) {
    handleButton(e.target);
  });

function handleButton(element) {
  if (element.classList.contains('prev-page' && 'btn-prev')) {
    valuePage.currentPage--;
    handleBtnLeft();
    btnNextPg.disabled = false;
  } else if (element.classList.contains('next-page' && 'btn-next')) {
    valuePage.currentPage++;
    handleBtnRight();
    btnPrevPg.disabled = false;
  }
  pagination(valuePage.totalPages);
}

function handleBtnLeft() {
  if (valuePage.currentPage === 1) {
    btnPrevPg.disabled = true;
  } else {
    btnPrevPg.disabled = false;
  }
}

function handleBtnRight() {
  if (valuePage.currentPage === valuePage.totalPages) {
    btnNextPg.disabled = true;
  } else {
    btnNextPg.disabled = false;
  }
}


/* 
*/