import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { CardComponent } from './card/card.component';
import { CommonModule } from '@angular/common';
import { SlotDirective } from './slot.directive';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, CardComponent, SlotDirective],
  template: `
  <app-card [dynamicSlots]="['visit', 'test']">
    <ng-template appSlot="header">
      <h2>Ενδιαφέρεσαι για αυτό;</h2>
    </ng-template>

    <ng-template appSlot="experts">
      <button>EXPERTS Μίλησε με τους ειδικούς</button>
    </ng-template>

    <ng-template appSlot="visit">
      <button>VISIT Κάνε μια προσφορά</button>
    </ng-template>

    <ng-template appSlot="footer">
      <div style="display:flex; flex-direction: column; gap: 10px;">
        <button>Ζήτα μια επίσκεψη</button>
        <button style="margin-bottom: 10px;">Κάνε μια προσφορά</button>
      </div>
    </ng-template>
  </app-card>
  `,
  styles: [`
    :host {
      display: block;
      font-family: Arial, sans-serif;
    }
    button {
      padding: 8px 16px;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    button:hover {
      background-color: #0056b3;
    }
  `]
})
export class App {
  name = 'Angular';
}

bootstrapApplication(App);