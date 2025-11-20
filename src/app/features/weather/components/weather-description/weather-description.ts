import { Component, Input } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { RouterLink } from '@angular/router';
import { Location } from '../../models/location.interface';
@Component({
  selector: 'app-weather-description',
  imports: [RouterLink],
  templateUrl: './weather-description.html',
  styleUrl: './weather-description.scss',
})
export class WeatherDescription {
  @Input({ required: true }) location?: Location;

  getWeatherIconUrl(icon: string): string {
    return `${environment.weatherIconUrl}/${icon}.png`;
  }
}
