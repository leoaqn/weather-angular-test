import { Component } from '@angular/core';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-tabs',
  imports: [NgbNavModule],
  templateUrl: './tabs.html',
  styleUrl: './tabs.scss',
})
export class Tabs {
  navs = [1, 2, 3];
  counter = this.navs.length + 1;
  active: number;

  constructor() {
    this.active = 1;
  }

  close(event: MouseEvent, toRemove: number) {
    this.navs = this.navs.filter((id) => id !== toRemove);
    event.preventDefault();
    event.stopImmediatePropagation();
  }

  add(event: MouseEvent) {
    this.navs.push(this.counter++);
    event.preventDefault();
  }
}
