import { Component, inject, OnInit, signal, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WeatherTable } from '../../components/weather-table/weather-table';
import { GoBack } from '../../../../shared/components/go-back/go-back';
import { WeatherService } from '../../services/weather.service';
import { ForecastResponse } from '../../models/weather.interface';
import { ToastService } from '../../../../shared/services/toast.service';
@Component({
  selector: 'app-weather-forecast',
  imports: [WeatherTable, GoBack],
  templateUrl: './weather-forecast.page.html',
  styleUrl: './weather-forecast.page.scss',
  providers: [WeatherService, ToastService],
})
export class WeatherForecast implements OnInit {
  @ViewChild('errorTpl', { static: true }) errorTpl!: TemplateRef<any>;
  zipCode = inject(ActivatedRoute).snapshot.paramMap.get('zipCode') ?? '';
  toastService = inject(ToastService);
  weatherService = inject(WeatherService);
  forecastData = signal<ForecastResponse[]>([]);
  isLoading = signal<boolean>(false);
  toastMessage = '';

  errorMessages = {
    apiError: 'Failed to get weather forecast data. Please try again.',
  };

  ngOnInit(): void {
    this.isLoading.set(true);
    this.weatherService.get5DayForecastbyZipCode(this.zipCode).subscribe(
      (data) => {
        console.log(data);
        this.forecastData.set([data]);
        this.isLoading.set(false);
      },
      (error) => {
        console.error(error);
        this.isLoading.set(false);
        this.toastService.show({
          template: this.errorTpl,
          classname: 'bg-danger text-light',
          delay: 5000,
        });
      }
    );
  }
}
