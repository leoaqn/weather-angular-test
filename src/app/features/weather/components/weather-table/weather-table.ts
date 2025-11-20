import { Component, Input, OnInit, signal } from '@angular/core';
import { ForecastDay, ForecastResponse } from '../../models/weather.interface';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-weather-table',
  imports: [],
  templateUrl: './weather-table.html',
  styleUrl: './weather-table.scss',
})
export class WeatherTable implements OnInit {
  @Input({ required: true }) forecastData?: ForecastResponse[];

  daysData = signal<ForecastDay[]>([]);

  ngOnInit(): void {
    this.daysData.set(this.forecastData?.[0]?.data ?? []);
  }

  getWeatherIconUrl(icon: string): string {
    return `${environment.weatherIconUrl}/${icon}.png`;
  }
}
