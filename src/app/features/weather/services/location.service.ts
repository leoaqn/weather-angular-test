import { Injectable, signal, computed, inject } from '@angular/core';
import { Location } from '../models/location.interface';
import { CacheService } from '../../../shared/services/cache.service';
import { WeatherService } from './weather.service';
import { ForecastResponse } from '../models/weather.interface';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  private STORAGE_KEY = 'saved_locations';
  private FORECAST_KEY = 'saved_forecast';
  private cacheService = inject(CacheService);
  private weatherService = inject(WeatherService);
  private locationsSignal = signal<Location[]>(this.loadLocations());
  private forecastSignal = signal<ForecastResponse[]>([]);
  private loadingSignal = signal<boolean>(false);

  public readonly locations = this.locationsSignal.asReadonly();
  public readonly forecast = this.forecastSignal.asReadonly();
  public readonly loading = this.loadingSignal.asReadonly();
  public readonly locationsCount = computed(() => this.locations().length);

  addLocation(location: Location): void {
    this.locationsSignal.update((current) => {
      const updated = [...current, location];
      this.saveLocations(updated);
      return updated;
    });
  }

  removeLocation(id: string): void {
    this.locationsSignal.update((current) => {
      const updated = current.filter((loc) => loc.id !== id);
      this.saveLocations(updated);
      return updated;
    });
  }

  hasLocation(zipCode: string): boolean {
    return this.locations().some((loc) => loc.zipCode === zipCode);
  }

  loadForecast(zipCode: string): void {
    const cachedData = this.cacheService.get(this.FORECAST_KEY);
    const allForecastData = cachedData || {};

    if (allForecastData[zipCode]) {
      this.forecastSignal.set([allForecastData[zipCode]]);
      return;
    }

    this.loadingSignal.set(true);
    this.weatherService.get5DayForecastbyZipCode(zipCode).subscribe({
      next: (data) => {
        allForecastData[zipCode] = data;
        this.cacheService.set(this.FORECAST_KEY, allForecastData);
        this.forecastSignal.set([data]);
        this.loadingSignal.set(false);
      },
      error: (err) => {
        this.loadingSignal.set(false);
        throw err;
      },
    });
  }

  private loadLocations(): Location[] {
    if (this.cacheService.isExpired(this.STORAGE_KEY)) {
      localStorage.removeItem(this.FORECAST_KEY);
      return [];
    }

    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (!stored) {
      return [];
    }

    try {
      const cacheData = JSON.parse(stored);
      if (cacheData.data && cacheData.timestamp) {
        return cacheData.data;
      }
      return JSON.parse(stored);
    } catch {
      return [];
    }
  }

  private saveLocations(locations: Location[]): void {
    const cacheData = {
      data: locations,
      timestamp: Date.now(),
    };
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(cacheData));
  }
}
