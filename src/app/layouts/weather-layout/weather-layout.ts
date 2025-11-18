import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgbModule, NgbTooltip } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-weather-layout',
  imports: [RouterOutlet, NgbModule],
  templateUrl: './weather-layout.html',
  styleUrl: './weather-layout.scss',
})
export class WeatherLayout {}
