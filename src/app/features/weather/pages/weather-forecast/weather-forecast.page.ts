import { Component, inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WeatherTable } from '../../components/weather-table/weather-table';
import { GoBack } from '../../../../shared/components/go-back/go-back';
import { LocationService } from '../../services/location.service';
import { ToastService } from '../../../../shared/services/toast.service';

@Component({
  selector: 'app-weather-forecast',
  imports: [WeatherTable, GoBack],
  templateUrl: './weather-forecast.page.html',
  styleUrl: './weather-forecast.page.scss',
})
export class WeatherForecast implements OnInit {
  @ViewChild('errorTpl', { static: true }) errorTpl!: TemplateRef<any>;

  zipCode = inject(ActivatedRoute).snapshot.paramMap.get('zipCode') ?? '';
  toastService = inject(ToastService);
  locationService = inject(LocationService);

  forecastData = this.locationService.forecast;
  isLoading = this.locationService.loading;

  errorMessages = {
    apiError: 'Failed to get weather forecast data. Please try again.',
  };

  ngOnInit() {
    try {
      this.locationService.loadForecast(this.zipCode);
    } catch (error) {
      this.toastService.show({
        template: this.errorTpl,
        classname: 'bg-danger text-light',
        delay: 5000,
      });
    }
  }
}
