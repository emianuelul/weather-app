import './cssReset.css';
import './styles.css';
import './toggleSwitch.css';

import Cloudy from './imgs/weather-conditions/cloudy.jpg';
import LightRain from './imgs/weather-conditions/light-rain.jpg';
import Night from './imgs/weather-conditions/night.jpg';
import Rain from './imgs/weather-conditions/rain.jpg';
import Snowing from './imgs/weather-conditions/snowing.jpg';
import SunnyAutumn from './imgs/weather-conditions/sunny-autumn.jpg';
import SunnySpringSummer from './imgs/weather-conditions/sunny-spring-summer.jpg';
import SunnyWinter from './imgs/weather-conditions/sunny-winter.jpg';

import DomStuff from './DomStuff/DomStuff';
import WeatherProcessor from './Weather/WeatherProcessor';
import { format, getMonth } from 'date-fns';
import { Skycons } from 'skycons-ts';

const processor = (function () {
  const app = document.getElementById('app');
  const bgImg = document.createElement('img');
  bgImg.id = 'bg-img';

  // 'metric' or 'us'
  let unitGroup = 'metric';

  document.querySelector('body').appendChild(bgImg);

  var skycons = new Skycons({ color: 'white' });
  skycons.play();

  let location = 'London';

  const optionsEvents = (options) => {
    const search = options.querySelector('input[type="search"]');
    search.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' && !event.repeat && search.value === '') {
        // ERROR TOAST
      } else if (event.key === 'Enter' && !event.repeat) {
        location = search.value;
        updatePage(location);
      }
    });

    const measurementToggle = options.querySelector('.switch > input');
    measurementToggle.addEventListener('change', () => {
      if (!measurementToggle.checked) {
        unitGroup = 'metric';
      } else {
        unitGroup = 'us';
      }

      updatePage(location);
    });
  };

  const updateBg = (condition) => {
    if (condition.includes('night')) {
      bgImg.src = Night;
    } else if (condition.includes('cloudy')) {
      bgImg.src = Cloudy;
    } else if (condition.includes('day')) {
      if (getMonth(new Date()) >= 3 && getMonth(new Date()) <= 8) {
        bgImg.src = SunnySpringSummer;
      } else if (getMonth(new Date()) >= 9 && getMonth(new Date()) <= 11) {
        bgImg.src = SunnyAutumn;
      } else {
        bgImg.src = SunnyWinter;
      }
    }
    switch (condition) {
      case 'snow': {
        bgImg.src = Snowing;
        break;
      }
      case 'rain': {
        bgImg.src = Rain;
        break;
      }
    }
  };

  const updatePage = async (location) => {
    const locationData = await WeatherProcessor.getLocationJSON(location, unitGroup);
    if (locationData === 'error') {
      if (!document.querySelector('.errorToast')) {
        const toast = DomStuff.createErrorToast('Location is invalid, check for typos');
        toast.classList.add('moving');
        document.querySelector('body').appendChild(toast);

        setTimeout(() => {
          toast.classList.remove('moving');

          setTimeout(() => {
            toast.classList.add('ending');
            setTimeout(() => {
              toast.remove();
            }, 500);
          }, 3000);
        }, 500);
      }

      return;
    }
    const icon = locationData.currentConditions.icon;

    document.querySelector('#weather-info').remove();
    const weatherInfo = DomStuff.createWeatherInfo(locationData, 0, unitGroup);

    document.querySelector('#week-forecast').remove();
    const weekForecast = DomStuff.createDiv('#week-forecast');

    app.append(weatherInfo, weekForecast);
    loadWeekForecast(weekForecast, locationData);

    updateBg(icon);

    skycons.set('icon1', icon);
  };

  const displayClickedDay = (currDayDetails, day) => {
    const weatherInfo = document.querySelector('#weather-info');
    weatherInfo.remove();

    const newWeatherInfo = DomStuff.createWeatherInfo(currDayDetails, day, unitGroup);
    app.insertBefore(newWeatherInfo, document.getElementById('week-forecast'));
    skycons.set(`icon1`, currDayDetails.days[day].icon);
  };

  const loadWeekForecast = (forecastDiv, locationData) => {
    for (let i = 0; i <= 7; i++) {
      const forecast = DomStuff.createWeatherDay(locationData.days[i], unitGroup);
      if (i == 0) {
        forecast.classList.add('selected');
      }
      forecastDiv.append(forecast);

      forecast.addEventListener('click', (event) => {
        [...document.querySelectorAll('.forecastDay')].forEach((item) =>
          item.classList.remove('selected')
        );
        forecast.classList.add('selected');
        displayClickedDay(locationData, i);
      });

      skycons.add(`icon${i + 2}`, locationData.days[i].icon);
    }
  };

  const initPage = async () => {
    const locationData = await WeatherProcessor.getLocationJSON(location, unitGroup);

    const icon = locationData.currentConditions.icon;
    console.log(locationData);

    updateBg(icon);

    const options = DomStuff.createOptions(locationData);
    const weatherInfo = DomStuff.createWeatherInfo(locationData, 0, unitGroup);
    const weekForecast = DomStuff.createDiv('#week-forecast');
    app.append(options, weatherInfo, weekForecast);

    optionsEvents(options);
    loadWeekForecast(weekForecast, locationData);

    skycons.add('icon1', icon);
  };

  initPage();
})();
