async function getPopular(value) {
  const BASE_URL = 'https://api.nytimes.com/svc';
  const API_KEY = 'SVYGfSzYyEfqvl2Rz9D9zXBCipJV7rQX';
  const POPULAR_URL = '/mostpopular/v2/viewed/1.json?api-key=';
  const getNews = await fetch(`${BASE_URL}${POPULAR_URL}${API_KEY}`);
  const news = await getNews.json();
  let { results } = news;
  return results;
}

export { getPopular };
