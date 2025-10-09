import { format } from 'date-fns';
export default class WeatherProcessor {
  static #API_KEY = '8CYFEA2MNNBQD7YG5C6YDKB5K';
  static #API_KEY_ENDPOINT = '&key=' + this.#API_KEY;
  static #STARTING_LINK =
    'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/';

  static celToFah(cel) {
    return Number(cel * (9 / 5) + 32).toFixed(1);
  }
  static mmToInch(mm) {
    return Number(mm / 25.4).toFixed(2);
  }
  static kmhToMph(kmh) {
    return Number(kmh / 1.60934).toFixed(1);
  }

  static formatValue = (value, type, unitGroup) => {
    if (type === 'temp') {
      return unitGroup === 'metric'
        ? `${value} °C`
        : `${WeatherProcessor.celToFah(value)} °F`;
    }
    if (type === 'precip') {
      return unitGroup === 'metric'
        ? `${value} mm`
        : `${WeatherProcessor.mmToInch(value)} in`;
    }
    if (type === 'wind') {
      return unitGroup === 'metric'
        ? `${value} km/h`
        : `${WeatherProcessor.kmhToMph(value)} mph`;
    }
    return value;
  };

  static async getLocationJSON(location, unit) {
    const link =
      this.#STARTING_LINK + location + '?' + 'unitGroup=' + unit + this.#API_KEY_ENDPOINT;
    console.log(link);

    try {
      const data = await fetch(link);
      const json = await data.json();
      return json;
    } catch (err) {
      console.log('Invalid location');
      return 'error';
    }
  }
}
