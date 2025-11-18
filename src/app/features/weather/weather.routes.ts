import { Routes } from '@angular/router';

export const weatherRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/weather-home/weather-home.page').then((m) => m.WeatherHomePage),
    title: 'Weather Test',
  },
];
