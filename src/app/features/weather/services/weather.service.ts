import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { WeatherResponse } from '../models/weather.interface';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  HttpClient = inject(HttpClient);

  getCurrentWeatherbyZipCode(zipCode: string) {
    let params = new HttpParams();
    params = params.set('postal_code', zipCode);
    params = params.set('key', environment.apiKey);
    const url = `${environment.apiUrl}/current`;
    return this.HttpClient.get<WeatherResponse>(url, { params });
  }
}
