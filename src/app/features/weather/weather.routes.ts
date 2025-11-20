import { Routes } from '@angular/router';

export const weatherRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/weather-home/weather-home.page').then((m) => m.WeatherHomePage),
    title: 'Weather Test',
  },
  {
    path: ':zipCode/forecast',
    loadComponent: () =>
      import('./pages/weather-forecast/weather-forecast.page').then((m) => m.WeatherForecast),
    title: 'Weather Forecast',
  },
];
