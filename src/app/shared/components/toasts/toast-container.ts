import { Component, inject } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-toasts',
  imports: [NgbToastModule, NgTemplateOutlet],
  template: `
    @for (toast of toastService.toasts(); track toast) {
    <ngb-toast
      [class]="toast.classname"
      [autohide]="true"
      [delay]="toast.delay || 5000"
      (hidden)="toastService.remove(toast)"
    >
      <ng-template [ngTemplateOutlet]="toast.template"></ng-template>
    </ngb-toast>
    }
  `,
  host: {
    class: 'toast-container position-fixed bottom-0 start-50 translate-middle-x p-3 text-center',
    style: 'z-index: 1200',
  },
})
export class ToastsContainer {
  toastService = inject(ToastService);
}
