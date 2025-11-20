import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-go-back',
  imports: [],
  templateUrl: './go-back.html',
  styleUrl: './go-back.scss',
})
export class GoBack {
  router = inject(Router);

  goBack() {
    this.router.navigate(['/weather']);
  }
}
