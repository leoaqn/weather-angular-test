import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { WeatherLayout } from './layouts/weather-layout/weather-layout';

@Component({
  selector: 'app-root',
  imports: [WeatherLayout],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
