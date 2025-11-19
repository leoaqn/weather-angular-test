import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { WeatherLayout } from './layouts/weather-layout/weather-layout';
import { ToastsContainer } from './shared/components/toasts/toast-container';

@Component({
  selector: 'app-root',
  imports: [WeatherLayout, ToastsContainer],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
