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

  document.querySelector('body').appendChild(bgImg);

  var skycons = new Skycons({ color: 'black' });
  skycons.play();

  let location = 'Iasi';

  const optionsEvents = (options) => {
    const search = options.querySelector('input[type="search"]');
    search.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' && !event.repeat) {
        location = search.value;
        updatePage(location);
      }
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
    const locationData = await WeatherProcessor.getLocationJSON(location);

    const icon = locationData.currentConditions.icon;

    DomStuff.updateWeatherInfo(locationData);

    updateBg(icon);

    skycons.set('icon1', icon);
  };

  const processWeatherJSON = async () => {
    const locationData = await WeatherProcessor.getLocationJSON(location);
    const icon = locationData.currentConditions.icon;

    updateBg(icon);

    const options = DomStuff.createOptions(locationData);
    optionsEvents(options);

    const weatherInfo = DomStuff.createWeatherInfo(locationData);
    const weekForecast = DomStuff.createDiv('#week-forecast');
    app.append(options, weatherInfo, weekForecast);

    console.log(locationData);

    skycons.add('icon1', icon);
  };

  processWeatherJSON();
})();
