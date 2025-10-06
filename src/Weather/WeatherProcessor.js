import { format } from 'date-fns';
export default class WeatherProcessor {
  static #API_KEY = '8CYFEA2MNNBQD7YG5C6YDKB5K';
  static #API_KEY_ENDPOINT = '?key=' + this.#API_KEY;
  static #STARTING_LINK =
    'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/';

  static fahToCel(fah) {
    return Number((fah - 32) / (9 / 5)).toFixed(1);
  }

  static inchToMM(inch) {
    return Number(inch * 2.54).toFixed(1);
  }

  static mphToKmh(mph) {
    return Number(mph * 1.60934).toFixed(1);
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
