// import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { format } from 'date-fns';

const weatherContainer = document.querySelector('.card__list');

const WEATHER_API_KEY = 'bf0cd5a153ab38d36794a1aaec126d4f';
const WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather';



export function getWeatherCard() {
  fetchWeatherByCity('London').then(response => {
    const newMarkup = createWeatherMarkup(response);
    if (window.matchMedia("(max-width: 767.96px)").matches) {
      const elem = weatherContainer.children[0];
      elem.insertAdjacentHTML('beforebegin', newMarkup);

    } else if (window.matchMedia("(min-width: 1279.98px)").matches) {
      const elem = weatherContainer.children[1];
      elem.insertAdjacentHTML('afterend', newMarkup);

    } else {
      const elem = weatherContainer.children[0];
      elem.insertAdjacentHTML('afterend', newMarkup);
    }
  });

  getGeoposition();
}


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
	<li class="weather__item-card card__item">
		<h3 class="weather__title">Weather</h3>
		<div class="weather__upper-flex-container">
			<p class="weather__temperature">${Math.floor(temp)}°</p>
			<div>
				<div class="weather__condition">${main}</div>
				<div class="weather__location">${name}</div>
			</div>
		</div>
		<img class="weather__icon" src="http://openweathermap.org/img/wn/${icon}@4x.png" alt="${description}">
		<div>
			<div class="weather__date-weekday">${weekday}</div>
			<div class="weather__date">${date}</div>
			<a class="weather__link" href="https://www.gismeteo.ua/ua/" target="_blank" rel="noreferrer noopener nofollow">weather for week</a>
		</div>
	</li>
	`;
  return murkup;
};

async function getGeoposition() {
  if (navigator.geolocation) {
    await navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {

        fetchWeatherByCoords(latitude, longitude)
          .then(response => {
            const refs = {
              temp: document.querySelector('.weather__temperature'),
              location: document.querySelector('.weather__location'),
              condition: document.querySelector('.weather__condition'),
              date: document.querySelector('.weather__date'),
              weekday: document.querySelector('.weather__date-weekday'),
              icon: document.querySelector('.weather__icon'),
            }

            const { temp } = response.main;
            const { main, icon } = response.weather[0];
            // const { name } = response.name;

            refs.temp.textContent = `${Math.floor(temp)}°`;
            refs.location.textContent = response.name;
            refs.condition.textContent = main;
            refs.date.textContent = format(new Date(), 'dd LLL y');
            refs.weekday.textContent = format(new Date(), 'eee');
            refs.icon.setAttribute(
              'src',
              `https://openweathermap.org/img/wn/${icon}@4x.png`
            );
          })
          .catch(error => console.log('fetchWeatherByCoords error'));
      }
    );
  }
  return;
}