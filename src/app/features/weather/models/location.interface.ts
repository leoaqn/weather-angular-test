import { CurrentWeather } from './weather.interface';

export interface Location {
  id: string;
  zipCode: string;
  cityName: string;
  stateCode: string;
  weatherData: CurrentWeather;
  addedAt: Date;
}
