import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { CardComponent } from './card/card.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CardComponent],
  template: `
    <app-card [dynamicSlots]="['experts', 'offer', 'visit']">
      <h2 slot="header">Ενδιαφέρεσαι για αυτό;</h2>

      <div slot="experts">
        <button>Μίλησε με τους ειδικούς</button>
      </div>

      <div slot="offer">
       
      </div>

      <div slot="visit">
       <button>Κάνε μια προσφορά</button>
      </div>

      <div style="display:flex; flex-direction: column; gap: 10px;" slot="footer">
         <button>Ζήτα μια επίσκεψη</button>
        <button style="margin-bottom: 10px;">Κάνε μια προσφορά</button>
      </div>
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