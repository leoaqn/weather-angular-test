import { Component, computed, signal } from '@angular/core';
import { Tabs } from '../../components/tabs/tabs';

@Component({
  standalone: true,
  imports: [Tabs],
  selector: 'app-weather-home-page',
  templateUrl: './weather-home.page.html',
  styleUrl: './weather-home.page.scss',
})
export class WeatherHomePage {}
