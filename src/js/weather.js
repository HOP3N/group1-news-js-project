import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { format } from 'date-fns';

const weatherContainer = document.querySelector('.weather__list');

const WEATHER_API_KEY = 'bf0cd5a153ab38d36794a1aaec126d4f';
const WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather';

function getWeatherCard() {
  fetchWeatherByCity('London').then(
    response => (weatherContainer.innerHTML = createWeatherMarkup(response))
  );
  getGeoposition();
}

getWeatherCard();

function fetchWeatherByCity(cityName) {
  const url = `${WEATHER_URL}?q=${cityName}&appid=${WEATHER_API_KEY}&units=metric`;

  return fetch(url).then(response => {
    if (response.ok) {
      return response.json();
    }
    throw new Error();
  });
}

function fetchWeatherByCoords(lat, lon) {
  const url = `${WEATHER_URL}?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`;

  return fetch(url).then(response => {
    if (response.ok) {
      return response.json();
    }
    throw new Error();
  });
}

const createWeatherMarkup = data => {
  const { temp } = data.main;
  const { main, description, icon } = data.weather[0];
  const { name } = data;

  const weekday = format(new Date(), 'eee');
  const date = format(new Date(), 'dd LLL y');

  const murkup = `
	<li class="weather__item-card">
		<h3 class="weather__title">Weather</h3>
		<div class="weather__upper-flex-container">
			<div class="weather__temperature">${Math.floor(temp)}°</div>
			<div>
				<div class="weather__condition">${main}</div>
				<div class="weather__location">${name}</div>
			</div>
		</div>
		<img class="weather__icon" src="http://openweathermap.org/img/wn/${icon}@2x.png" alt="${description}">
		<div>
			<div class="weather__date">${weekday}</div>
			<div class="weather__date">${date}</div>
			<a class="weather__link" href="https://www.gismeteo.ua/ua/" target="_blank" rel="noreferrer noopener nofollow">weather for week</a>
		</div>
	</li>
	`;
  return murkup;
};

function getGeoposition() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        weatherContainer.innerHTML = '';

        fetchWeatherByCoords(latitude, longitude)
          .then(response => {
            weatherContainer.innerHTML = createWeatherMarkup(response);
          })
          .catch(error => console.log('fetchWeatherByCoords error'));
      }
    );
  }
}
