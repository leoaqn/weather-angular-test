import { Component, inject, OnInit, signal, TemplateRef, ViewChild } from '@angular/core';
import { Tabs } from '../../components/tabs/tabs';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { WeatherService } from '../../services/weather.service';
import { LocationService } from '../../services/location.service';
import { Location } from '../../models/location.interface';
import { ToastService } from '../../../../shared/services/toast.service';

@Component({
  standalone: true,
  imports: [Tabs, ReactiveFormsModule],
  selector: 'app-weather-home-page',
  templateUrl: './weather-home.page.html',
  styleUrl: './weather-home.page.scss',
})
export class WeatherHomePage implements OnInit {
  @ViewChild('successTpl', { static: true }) successTpl!: TemplateRef<any>;
  @ViewChild('errorTpl', { static: true }) errorTpl!: TemplateRef<any>;

  weatherForm!: FormGroup;
  weatherService = inject(WeatherService);
  locationService = inject(LocationService);
  toastService = inject(ToastService);
  isLoading = signal<boolean>(false);
  fb = inject(FormBuilder);
  toastMessage = '';

  errorMessages = {
    required: 'Zip code is required.',
    locationExists: 'Location already exists',
    maxLength: 'Zip code must be 5 digits.',
    minLength: 'Zip code must be 5 digits.',
  };

  toastMessages = {
    success: 'Location added successfully!',
    noData: 'No weather data found for this ZIP code',
    apiError: 'Failed to get weather data. Please try again.',
  };

  ngOnInit() {
    this.weatherForm = this.fb.group({
      zipCode: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(5)]],
    });
  }

  get zipCode() {
    return this.weatherForm.get('zipCode');
  }

  onSubmit() {
    if (this.weatherForm.invalid) {
      return;
    }

    const zipCode = this.weatherForm.value.zipCode;

    if (this.locationService.hasLocation(zipCode)) {
      this.zipCode?.setErrors({ zipCode: this.errorMessages.locationExists });
      return;
    }

    this.isLoading.set(true);

    this.weatherService.getTodayWeatherbyZipCode(zipCode).subscribe({
      next: (weatherResponse) => {
        if (weatherResponse.data && weatherResponse.data.length > 0) {
          const location: Location = {
            id: crypto.randomUUID(),
            zipCode: zipCode,
            cityName: weatherResponse.city_name,
            stateCode: weatherResponse.state_code,
            weatherData: weatherResponse.data[0],
            addedAt: new Date(),
          };

          this.locationService.addLocation(location);
          this.weatherForm.reset();
          this.toastMessage = this.toastMessages.success;
          this.toastService.show({
            template: this.successTpl,
            classname: 'bg-success text-light',
            delay: 5000,
          });
        } else {
          this.toastMessage = this.toastMessages.noData;
          this.toastService.show({
            template: this.errorTpl,
            classname: 'bg-danger text-light',
            delay: 5000,
          });
        }
        this.isLoading.set(false);
      },
      error: (error) => {
        this.toastMessage = this.toastMessages.apiError;
        this.toastService.show({
          template: this.errorTpl,
          classname: 'bg-danger text-light',
          delay: 5000,
        });
        this.isLoading.set(false);
      },
    });
  }
}
