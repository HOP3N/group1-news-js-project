import { loadNews } from './api.js';
const deviceWidth = +window.innerWidth;

const pg = document.getElementById('pagination');
const btnNextPg = document.querySelector('button.next-page');
const btnPrevPg = document.querySelector('button.prev-page');


window.addEventListener('resize', () => {
  console.log('resizing!');
  console.log(pg.innerHTML);
  valuePage = calcPaginationData(
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
    valuePage
  );

  pg.innerHTML = '';
  pagination(valuePage.totalPages);
});

const calcPaginationData = (news, object) => {
  let perPage = 0;
  const deviceWidth = +window.innerWidth;
  if (deviceWidth <= 480) {
    perPage = 5;
  } else if (deviceWidth > 480 && deviceWidth <= 768) {
    perPage = 8;
  } else {
    perPage = 9;
  }

  console.log(perPage, news);

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
  totalPages: 10,
  perPage: 5,
};

const news = loadNews()
  .then(data => data.results)
  .then(data => {
    const result = {
      currentPage: 1,
      numLinksTwoSide: 1,
      totalPages: Math.ceil(news / valuePage.perPage) || 0,
      perPage: 5,
    };
    if (deviceWidth <= 480) {
      result.perPage = 5;
    } else if (deviceWidth > 480 && deviceWidth <= 768) {
      result.perPage = 8;
    } else {
      result.perPage = 9;
    }

    console.log(data, '<<<');
    result.totalPages = Math.ceil(data.length / result.perPage);

    pg.innerHTML = '';
    pagination(result.totalPages);

    return result;
  })
  .then(modifiedData => (valuePage = modifiedData))
  .then(console.log);

// let itemsPerPage = 0;

// pagination();
pg.addEventListener('click', e => {
  const ele = e.target;

  if (ele.dataset.page) {
    const pageNumber = parseInt(e.target.dataset.page, 10);

    valuePage.currentPage = pageNumber;
    pagination(valuePage);
    // console.log(valuePage);
    handleBtnLeft();
    handleBtnRight();
  }
});

function pagination(totalPages) {
  const { currentPage, numLinksTwoSide: delta } = valuePage;

  const range = delta + 4;

  let render = '';
  let renderTwoSide = '';
  let dot = `<li class="pg-item"><a classs="pg-link">...</a></li>`;
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
          (currentPage < range && p <= range) ||
          (currentPage > totalPages - range && p >= totalPages - range + 1) ||
          p === totalPages ||
          p === 1
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
  return `<li class="pg-item ${active}" data-page="${index}">
    <a class="pg-link" href="#">${index}</a></li>`;
}

document
  .querySelector('.page-container')
  .addEventListener('click', function (e) {
    handleButton(e.target);
  });

function handleButton(element) {
  if (element.classList.contains('prev-page')) {
    valuePage.currentPage--;
    handleBtnLeft();
    btnNextPg.disabled = false;
  } else if (element.classList.contains('next-page')) {
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
