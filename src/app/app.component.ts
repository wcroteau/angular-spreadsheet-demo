import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <button (click)="toggleVisible()">Toggle Visible</button> {{ visible }}
    <spreadsheet *ngIf="visible" (visibleChanged)="toggleVisible()" />
  `,
})
export class AppComponent {
  visible = true;
  name = '';

  toggleVisible() {
    this.visible = !this.visible;
  }
}
