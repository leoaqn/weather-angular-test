import { Routes } from '@angular/router';
import { weatherRoutes } from './features/weather/weather.routes';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'weather',
  },
  {
    path: 'weather',
    children: weatherRoutes,
  },
  {
    path: '**',
    redirectTo: 'weather',
  },
];
