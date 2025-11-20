import { Component, inject, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { CacheService } from '../../services/cache.service';

@Component({
  selector: 'app-settings-modal',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './settings-modal.html',
  styleUrl: './settings-modal.scss',
})
export class SettingsModal implements OnInit {
  activeModal = inject(NgbActiveModal);
  cacheService = inject(CacheService);

  selectedDuration = 120;

  durationOptions = [
    { value: 1, label: '1 minute' },
    { value: 5, label: '5 minutes' },
    { value: 15, label: '15 minutes' },
    { value: 30, label: '30 minutes' },
    { value: 60, label: '1 hour' },
    { value: 120, label: '2 hours' },
    { value: 240, label: '4 hours' },
    { value: 480, label: '8 hours' },
  ];

  ngOnInit(): void {
    this.selectedDuration = this.cacheService.getCacheDuration();
  }

  save(): void {
    this.cacheService.setCacheDuration(this.selectedDuration);
    this.activeModal.close();
  }
}
