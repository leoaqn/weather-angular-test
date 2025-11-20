import { Component, inject, effect } from '@angular/core';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { WeatherDescription } from '../weather-description/weather-description';
import { LocationService } from '../../services/location.service';

@Component({
  selector: 'app-tabs',
  imports: [NgbNavModule, WeatherDescription],
  templateUrl: './tabs.html',
  styleUrl: './tabs.scss',
})
export class Tabs {
  locationService = inject(LocationService);
  locations = this.locationService.locations;
  active: string | undefined;

  constructor() {
    effect(() => {
      const locs = this.locations();
      if (locs.length > 0 && !this.active) {
        this.active = locs[0].id;
      }
      if (locs.length > 0 && this.active && !locs.find((l) => l.id === this.active)) {
        this.active = locs[0].id;
      }
    });
  }

  close(locationId: string) {
    this.locationService.removeLocation(locationId);
  }
}
