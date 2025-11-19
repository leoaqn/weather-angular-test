import { Injectable, signal, computed } from '@angular/core';
import { Location } from '../models/location.interface';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  private locationsSignal = signal<Location[]>([]);

  public readonly locations = this.locationsSignal.asReadonly();

  public readonly locationsCount = computed(() => this.locations().length);

  addLocation(location: Location): void {
    this.locationsSignal.update((current) => [...current, location]);
  }

  removeLocation(id: string): void {
    this.locationsSignal.update((current) => current.filter((loc) => loc.id !== id));
  }

  getLocationById(id: string): Location | undefined {
    return this.locations().find((loc) => loc.id === id);
  }

  clearAllLocations(): void {
    this.locationsSignal.set([]);
  }

  hasLocation(zipCode: string): boolean {
    return this.locations().some((loc) => loc.zipCode === zipCode);
  }
}
