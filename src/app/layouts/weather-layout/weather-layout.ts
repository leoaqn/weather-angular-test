import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgbModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SettingsModal } from '../../shared/components/settings-modal/settings-modal';

@Component({
  selector: 'app-weather-layout',
  imports: [RouterOutlet, NgbModule],
  templateUrl: './weather-layout.html',
  styleUrl: './weather-layout.scss',
})
export class WeatherLayout {
  private modalService = inject(NgbModal);

  openSettings(): void {
    this.modalService.open(SettingsModal, {
      centered: true,
      backdrop: 'static',
    });
  }
}
