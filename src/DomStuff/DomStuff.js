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
    p.textContent = content;

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
  static createCanvas = (height, width) => {
    const canvas = document.createElement('canvas');
    canvas.id = `icon${this.#canvases}`;
    this.#canvases++;
    canvas.width = width;
    canvas.height = height;

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

  static createWeatherInfo = (json) => {
    const div = DomStuff.createDiv('#weather-info');
    const icon = DomStuff.createCanvas(128, 128);
    const temp = DomStuff.createP(
      `${WeatherProcessor.fahToCel(json.currentConditions.temp).toFixed(1)} C`
    );
    temp.classList.add('temp');

    const address = DomStuff.createP(json.resolvedAddress);
    address.classList.add('address');

    const condition = DomStuff.createP(json.currentConditions.conditions);
    condition.classList.add('condition');

    const min = DomStuff.createP(
      `Today Minimum: ${WeatherProcessor.fahToCel(json.days[0].tempmin).toFixed(1)} C`
    );
    min.classList.add('min');
    const max = DomStuff.createP(
      `Today Maximum: ${WeatherProcessor.fahToCel(json.days[0].tempmax).toFixed(1)} C`
    );
    max.classList.add('max');

    const feelsLike = DomStuff.createP(
      `Feels Like: 
      ${WeatherProcessor.fahToCel(json.currentConditions.feelslike).toFixed(1)} C`
    );
    feelsLike.classList.add('feels-like');

    const sunrise = DomStuff.createP(`Sun rises at ${json.currentConditions.sunrise}`);
    sunrise.classList.add('sunrise');

    const sunset = DomStuff.createP(`Sun sets at ${json.currentConditions.sunset}`);
    sunset.classList.add('sunset');

    const precipCh = DomStuff.createP(
      `Precipitation Chances: ${json.currentConditions.precipprob}`
    );
    precipCh.classList.add('precip-chance');

    const precip = DomStuff.createP(
      `Precipitation : ${json.currentConditions.precip} mm`
    );
    precip.classList.add('precip');

    div.append(
      icon,
      temp,
      address,
      condition,
      min,
      max,
      feelsLike,
      sunrise,
      sunset,
      precipCh,
      precip
    );

    return div;
  };

  static updateWeatherInfo = (json) => {
    const temp = document.querySelector('#weather-info > .temp');
    const address = document.querySelector('#weather-info > .address');
    const condition = document.querySelector('#weather-info > .condition');
    const min = document.querySelector('#weather-info > .min');
    const max = document.querySelector('#weather-info > .max');
    const feelsLike = document.querySelector('#weather-info > .feels-like');
    const sunrise = document.querySelector('#weather-info > .sunrise');
    const sunset = document.querySelector('#weather-info > .sunset');
    const precipChance = document.querySelector('#weather-info > .precip-chance');
    const precip = document.querySelector('#weather-info > .precip');

    temp.textContent = `${WeatherProcessor.fahToCel(json.currentConditions.temp).toFixed(
      1
    )} C`;
    address.textContent = json.resolvedAddress;
    condition.textContent = json.currentConditions.conditions;
    min.textContent = `Today Minimum: ${WeatherProcessor.fahToCel(
      json.days[0].tempmin
    ).toFixed(1)} C`;
    max.textContent = `Today Maximum: ${WeatherProcessor.fahToCel(
      json.days[0].tempmax
    ).toFixed(1)} C`;
    feelsLike.textContent = `Feels Like: 
      ${WeatherProcessor.fahToCel(json.currentConditions.feelslike).toFixed(1)} C`;
    sunrise.textContent = `Sun rises at ${json.currentConditions.sunrise}`;
    sunset.textContent = `Sun sets at ${json.currentConditions.sunset}`;
    precipChance.textContent = `Precipitation Chances: ${json.currentConditions.precipprob}`;
    precip.textContent = `Precipitation : ${json.currentConditions.precip} mm`;
  };

  static createOptions = () => {
    const div = DomStuff.createDiv('#options');
    const search = document.createElement('input');
    search.type = 'search';
    const toggle = DomStuff.createToggleSwitch();

    div.append(search, toggle);

    return div;
  };
}
