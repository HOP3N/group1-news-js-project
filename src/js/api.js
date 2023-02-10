'use strict';

const apiKey = 'SVYGfSzYyEfqvl2Rz9D9zXBCipJV7rQX';

const BASE_URL = 'https://api.nytimes.com/svc/news/v3/content/all/all.json';

export const loadNews = (key) => {
    return fetch(`${BASE_URL}?api-key=${apiKey}`)
        .then(response => {
    if (!response.ok) {
      throw new Error(`${response.status} - ${response.statusText}`);
    }

    return response.json();
  });
};
