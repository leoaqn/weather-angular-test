import { Component, Input } from '@angular/core';
import { CurrentWeather } from '../../models/weather.interface';
import { environment } from '../../../../../environments/environment';
import { OnInit } from '@angular/core';
@Component({
  selector: 'app-weather-description',
  imports: [],
  templateUrl: './weather-description.html',
  styleUrl: './weather-description.scss',
})
export class WeatherDescription {
  @Input({ required: true }) weatherData?: CurrentWeather;

  getWeatherIconUrl(icon: string): string {
    return `${environment.weatherIconUrl}/${icon}.png`;
  }
}
