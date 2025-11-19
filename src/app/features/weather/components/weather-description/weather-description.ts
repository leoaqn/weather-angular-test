import { Component, Input } from '@angular/core';

import { environment } from '../../../../../environments/environment';
import { OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Location } from '../../models/location.interface';
@Component({
  selector: 'app-weather-description',
  imports: [RouterLink],
  templateUrl: './weather-description.html',
  styleUrl: './weather-description.scss',
})
export class WeatherDescription implements OnInit {
  @Input({ required: true }) location?: Location;

  ngOnInit(): void {
    console.log(this.location);
  }

  getWeatherIconUrl(icon: string): string {
    return `${environment.weatherIconUrl}/${icon}.png`;
  }
}
