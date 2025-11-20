import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { WeatherResponse, ForecastResponse } from '../models/weather.interface';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  HttpClient = inject(HttpClient);

  getTodayWeatherbyZipCode(zipCode: string) {
    let params = new HttpParams();
    params = params.set('postal_code', zipCode);
    params = params.set('key', environment.apiKey);
    params = params.set('days', '1');
    params = params.set('units', 'I');
    const url = `${environment.apiUrl}/forecast/daily`;
    return this.HttpClient.get<WeatherResponse>(url, { params });
  }

  get5DayForecastbyZipCode(zipCode: string) {
    let params = new HttpParams();
    params = params.set('postal_code', zipCode);
    params = params.set('key', environment.apiKey);
    params = params.set('days', '5');
    params = params.set('units', 'I');
    const url = `${environment.apiUrl}/forecast/daily`;
    return this.HttpClient.get<ForecastResponse>(url, { params });
  }
}
