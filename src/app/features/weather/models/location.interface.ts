import { CurrentWeather } from './weather.interface';

export interface Location {
  id: string;
  zipCode: string;
  weatherData: CurrentWeather;
  addedAt: Date;
}
