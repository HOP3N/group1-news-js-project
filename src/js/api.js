'use strict';


// const apiKey = 'SVYGfSzYyEfqvl2Rz9D9zXBCipJV7rQX';

// const BASE_URL = 'https://api.nytimes.com/svc/search/v2/articlesearch.json';


const apiKey = 'SVYGfSzYyEfqvl2Rz9D9zXBCipJV7rQX';

const BASE_URL = 'https://api.nytimes.com/svc/news/v3/content/all/all.json';

export const loadNews = () => {
    return fetch(`${BASE_URL}?api-key=${apiKey}`)
        .then(response => {
    if (!response.ok) {
      throw new Error(`${response.status} - ${response.statusText}`);
    }

    return response.json();
  });
};
//https://api.nytimes.com/svc/search/v2/articlesearch.json?q=real+estate&page=3&fl=web_url&api-key=SVYGfSzYyEfqvl2Rz9D9zXBCipJV7rQX