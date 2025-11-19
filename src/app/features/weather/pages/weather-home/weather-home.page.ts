import { Component, inject, OnInit, signal } from '@angular/core';
import { Tabs } from '../../components/tabs/tabs';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { WeatherService } from '../../services/weather.service';
import { LocationService } from '../../services/location.service';
import { Location } from '../../models/location.interface';

@Component({
  standalone: true,
  imports: [Tabs, ReactiveFormsModule],
  selector: 'app-weather-home-page',
  templateUrl: './weather-home.page.html',
  styleUrl: './weather-home.page.scss',
})
export class WeatherHomePage implements OnInit {
  weatherForm!: FormGroup;
  weatherService = inject(WeatherService);
  locationService = inject(LocationService);
  isLoading = signal<boolean>(false);
  fb = inject(FormBuilder);

  ngOnInit() {
    this.weatherForm = this.fb.group({
      zipCode: ['', [Validators.required, Validators.pattern(/^\d{5}(-\d{4})?$/)]],
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
      console.log('Location already exists');
      return;
    }

    this.isLoading.set(true);

    this.weatherService.getCurrentWeatherbyZipCode(zipCode).subscribe((weatherResponse) => {
      if (weatherResponse.data && weatherResponse.data.length > 0) {
        const location: Location = {
          id: crypto.randomUUID(),
          zipCode: zipCode,
          weatherData: weatherResponse.data[0],
          addedAt: new Date(),
        };

        this.locationService.addLocation(location);
        this.weatherForm.reset();
      }
    });

    this.isLoading.set(false);
  }
}
