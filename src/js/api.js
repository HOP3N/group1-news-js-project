'use strict';

// const apiKey = 'SVYGfSzYyEfqvl2Rz9D9zXBCipJV7rQX';

// const BASE_URL = 'https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json';

// export const loadNews = () => {
//     return fetch(`${BASE_URL}?${searchQuery}api-key=${apiKey}`)
//         .then(response => {
//     if (!response.ok) {
//       throw new Error(`${response.status} - ${response.statusText}`);
//     }

//     return response.json();
//   });
// };

export const loadNews = () => {
  return fetch(`${BASE_URL}/mostpopular/v2/viewed/1.json?${apiKey}`).then(
    response => {
      if (!response.ok) {
        throw new Error(`${response.status} - ${response.statusText}`);
      }

      return response.json();
    }
  );
};



//
//
const apiKey = 'api-key=SVYGfSzYyEfqvl2Rz9D9zXBCipJV7rQX';
const BASE_URL = 'https://api.nytimes.com/svc';
// const loadNews = `https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?${apiKey}`;

async function getPopularArticle() {
  const articleFetch = await fetch(loadNews);
  const articles = await articleFetch.json();
  let { results } = articles;
  
  return results;
}

async function getCategoryList() {
  const categoryList = await fetch(
    `${BASE_URL}//news/v3/content/section-list.json?${apiKey}`
  );
  const categories = await categoryList.json();
  let { results } = categories;



  return results;
}

async function getSearchArticle(value) {
  const articleFetch = await fetch(
    `${BASE_URL}/search/v2/articlesearch.json?q=${value}&${apiKey}`
  );
  const articles = await articleFetch.json();
  let { response } = articles;
  let { docs } = response;
  //   console.log(docs);

  return docs;
}

async function getArticleByCategory(value) {
  const articleFetch = await fetch(
    `${BASE_URL}/news/v3/content/inyt/${value}.json?${apiKey}`
  );
  const articles = await articleFetch.json();
  let { results } = articles;
  console.log(results);

  return results;
}


export {
  getPopularArticle,
  getCategoryList,
  getSearchArticle,
  getArticleByCategory,
};