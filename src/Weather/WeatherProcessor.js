import { format } from 'date-fns';
export default class WeatherProcessor {
  static #API_KEY = '8CYFEA2MNNBQD7YG5C6YDKB5K';
  static #API_KEY_ENDPOINT = '?key=' + this.#API_KEY;
  static #STARTING_LINK =
    'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/';

  static fahToCel(fah) {
    return (fah - 32) / (9 / 5);
  }

  static async getLocationJSON(location) {
    const link = this.#STARTING_LINK + location + this.#API_KEY_ENDPOINT;

    try {
      const data = await fetch(link);
      const json = await data.json();
      return json;
    } catch (err) {
      console.log('Invalid location');
      return;
    }
  }
}
