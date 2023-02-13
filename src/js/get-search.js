async function getSearch(query, page) {
  const API_KEY = 'SVYGfSzYyEfqvl2Rz9D9zXBCipJV7rQX';
  const BASE_URL = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?';
  const getNews = await fetch(
    `${BASE_URL}q=${query}&page=${page}&api-key=${API_KEY}`
  );
  const news = await getNews.json();
  let { response } = news;
  return response;
}

export { getSearch };
