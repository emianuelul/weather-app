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
    // canvas.width = width;
    // canvas.height = height;

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
    const icon = DomStuff.createCanvas();
    const temp = DomStuff.createP(
      `${WeatherProcessor.fahToCel(json.currentConditions.temp)} °C`
    );
    temp.classList.add('temp');

    const address = DomStuff.createP('📍' + json.resolvedAddress);
    address.classList.add('address');

    const condition = DomStuff.createP(json.currentConditions.conditions);
    condition.classList.add('condition');

    const min = DomStuff.createP(
      `<span>Today Minimum:</span> ${WeatherProcessor.fahToCel(json.days[0].tempmin)} °C`
    );
    min.classList.add('min');
    const max = DomStuff.createP(
      `<span>Today Maximum:</span> ${WeatherProcessor.fahToCel(json.days[0].tempmax)} °C`
    );
    max.classList.add('max');

    const feelsLike = DomStuff.createP(
      `<span>Feels Like:</span> 
      ${WeatherProcessor.fahToCel(json.currentConditions.feelslike)} °C`
    );
    feelsLike.classList.add('feels-like');

    const precipCh = DomStuff.createP(
      `<span>Precipitation Chances:</span> ${json.currentConditions.precipprob}%`
    );
    precipCh.classList.add('precip-chance');

    const precip = DomStuff.createP(
      `<span>Precipitation:</span> ${WeatherProcessor.inchToMM(
        json.currentConditions.precip
      )} mm`
    );
    precip.classList.add('precip');

    const winds = DomStuff.createP(
      `<span>Wind Speeds:</span> ${WeatherProcessor.mphToKmh(
        json.currentConditions.windspeed
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

  static updateWeatherInfo = (json) => {
    const temp = document.querySelector('#weather-info > * > .temp');
    const address = document.querySelector('#weather-info > * > .address');
    const condition = document.querySelector('#weather-info > * > .condition');
    const min = document.querySelector('#weather-info > * > .min');
    const max = document.querySelector('#weather-info > * > .max');
    const feelsLike = document.querySelector('#weather-info > * > .feels-like');
    const precipChance = document.querySelector('#weather-info > * > .precip-chance');
    const precip = document.querySelector('#weather-info > * > .precip');
    const winds = document.querySelector('#weather-info > * > .winds');

    temp.innerHTML = `${WeatherProcessor.fahToCel(json.currentConditions.temp)} °C`;
    address.innerHTML = '📍' + json.resolvedAddress;
    condition.innerHTML = json.currentConditions.conditions;
    min.innerHTML = `<span>Today Minimum:</span> ${WeatherProcessor.fahToCel(
      json.days[0].tempmin
    )} °C`;
    max.innerHTML = `<span>Today Maximum:</span> ${WeatherProcessor.fahToCel(
      json.days[0].tempmax
    )} °C`;
    feelsLike.innerHTML = `<span>Feels Like:</span> 
      ${WeatherProcessor.fahToCel(json.currentConditions.feelslike)} °C`;
    winds.innerHTML = `<span>Wind Speed:</span> ${json.currentConditions.windspeed}`;
    precipChance.innerHTML = `<span>Precipitation Chances:</span> ${json.currentConditions.precipprob}%`;
    precip.innerHTML = `<span>Precipitation:</span> ${json.currentConditions.precip} mm`;
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
