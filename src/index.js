import DomStuff from './DomStuff/DomStuff';
import WeatherProcessor from './Weather/WeatherProcessor';
import { format } from 'date-fns';

const processor = (function () {
  const app = document.getElementById('app');
  app.appendChild(DomStuff.createH(1, 'Hello, World!'));

  const div = DomStuff.createDiv('.dick');
  app.appendChild(div);

  const processWeatherJSON = async () => {
    const locationData = await WeatherProcessor.getLocationJSON('Romania');
    console.log(locationData);
    console.log(
      `It is ${WeatherProcessor.fahToCel(
        locationData.currentConditions.temp
      ).toFixed(1)}C in Romania`
    );
  };

  processWeatherJSON();
})();
