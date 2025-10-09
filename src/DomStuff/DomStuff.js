import { getDay } from 'date-fns';
import WeatherProcessor from '../Weather/WeatherProcessor';

export default class DomStuff {
  static createH = (type, content) => {
    if (type < 1 || type > 6) {
      return new Error(`Invalid Header Type: ${type}`);
    }

    const h = document.createElement(`h${type}`);
    h.textContent = content;

    return h;
  };

  static createP = (content) => {
    const p = document.createElement('p');
    p.innerHTML = content;

    return p;
  };

  static createDiv = (identifier) => {
    if (identifier[0] !== '.' && identifier[0] !== '#') {
      return new Error('First character must be an identifier');
    }

    const div = document.createElement('div');
    if (identifier[0] === '.') {
      div.classList.add(identifier.replace('.', ''));
    } else if (identifier[0] === '#') {
      div.id = identifier.replace('#', '');
    }

    return div;
  };

  static #canvases = 1;
  static createCanvas = () => {
    const canvas = document.createElement('canvas');
    canvas.id = `icon${this.#canvases}`;
    this.#canvases++;

    return canvas;
  };

  static createToggleSwitch = () => {
    //     <label class="switch">
    //   <input type="checkbox">
    //   <span class="slider round"></span>
    // </label>

    const label = document.createElement('label');
    label.classList.add('switch');
    const input = document.createElement('input');
    input.type = 'checkbox';
    const span = document.createElement('span');
    span.classList.add('slider', 'round');

    label.append(input, span);

    return label;
  };

  static createWeatherDay = (day) => {
    let currDay;
    switch (getDay(day.datetime)) {
      case 1: {
        currDay = 'Monday';
        break;
      }
      case 2: {
        currDay = 'Thursday';
        break;
      }
      case 3: {
        currDay = 'Wednesday';
        break;
      }
      case 4: {
        currDay = 'Tuesday';
        break;
      }
      case 5: {
        currDay = 'Friday';
        break;
      }
      case 6: {
        currDay = 'Saturday';
        break;
      }
      case 0: {
        currDay = 'Sunday';
        break;
      }
    }

    const div = DomStuff.createDiv('.forecastDay');
    const canvas = DomStuff.createCanvas();
    const temp = DomStuff.createP(`${WeatherProcessor.fahToCel(day.temp)} °C`);
    temp.classList.add('temp');
    const dayP = DomStuff.createP(currDay);
    dayP.classList.add('curr-day');

    div.append(canvas, temp, dayP);

    return div;
  };

  static createWeatherInfo = (json, day) => {
    const div = DomStuff.createDiv('#weather-info');
    this.#canvases = 1;
    const icon = DomStuff.createCanvas();
    const temp = DomStuff.createP(`${WeatherProcessor.fahToCel(json.days[day].temp)} °C`);
    temp.classList.add('temp');

    const address = DomStuff.createP('📍' + json.resolvedAddress);
    address.classList.add('address');

    const condition = DomStuff.createP(json.days[day].conditions);
    condition.classList.add('condition');

    const min = DomStuff.createP(
      `<span>Today Minimum:</span> ${WeatherProcessor.fahToCel(
        json.days[day].tempmin
      )} °C`
    );
    min.classList.add('min');
    const max = DomStuff.createP(
      `<span>Today Maximum:</span> ${WeatherProcessor.fahToCel(
        json.days[day].tempmax
      )} °C`
    );
    max.classList.add('max');

    const feelsLike = DomStuff.createP(
      `<span>Feels Like:</span> 
      ${WeatherProcessor.fahToCel(json.days[day].feelslike)} °C`
    );
    feelsLike.classList.add('feels-like');

    const precipCh = DomStuff.createP(
      `<span>Precipitation Chances:</span> ${json.days[day].precipprob}%`
    );
    precipCh.classList.add('precip-chance');

    const precip = DomStuff.createP(
      `<span>Precipitation:</span> ${WeatherProcessor.inchToMM(json.days[day].precip)} mm`
    );
    precip.classList.add('precip');

    const winds = DomStuff.createP(
      `<span>Wind Speeds:</span> ${WeatherProcessor.mphToKmh(
        json.days[day].windspeed
      )} km/h`
    );
    winds.classList.add('winds');

    const tempDiv = DomStuff.createDiv('#tempAndIcon');
    const details = DomStuff.createDiv('#details');
    const temps = DomStuff.createDiv('#temps');
    const conditions = DomStuff.createDiv('#conditions');

    tempDiv.append(icon, temp);
    details.append(address, condition);
    temps.append(min, max, feelsLike);
    conditions.append(precipCh, precip, winds);

    div.append(tempDiv, details, temps, conditions);

    return div;
  };

  static createOptions = () => {
    const div = DomStuff.createDiv('#options');
    const search = document.createElement('input');
    search.type = 'search';
    search.placeholder = 'Search for a Location...';
    const toggle = DomStuff.createToggleSwitch();
    const toggleLabel = DomStuff.createP('Temperature Measurement');
    const cel = DomStuff.createP('°C');
    const fah = DomStuff.createP('°F');

    const changeMeasureContainer = DomStuff.createDiv('#tempSwitch');
    changeMeasureContainer.append(cel, toggle, fah);

    div.append(search, toggleLabel, changeMeasureContainer);

    return div;
  };
}
