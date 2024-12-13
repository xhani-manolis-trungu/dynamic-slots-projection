import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card">
      <div class="card-header">
        <ng-content select="[slot=header]"></ng-content>
      </div>
      
      <!-- Dynamic slots -->
      <ng-container *ngFor="let slot of dynamicSlots">
        <div class="dynamic-slot" [attr.data-slot]="slot">
          <ng-content [select]="'[slot=' + slot + ']'"></ng-content>
        </div>
      </ng-container>

      <div class="card-footer">
        <ng-content select="[slot=footer]"></ng-content>
      </div>

    </div>
  `,
  styles: [`
    .card {
      border: 1px solid #ddd;
      border-radius: 8px;
      padding: 16px;
      margin: 16px;
    }
    .card-header {
      border-bottom: 1px solid #eee;
      padding-bottom: 8px;
      margin-bottom: 16px;
    }
    .card-footer {
      border-top: 1px solid #eee;
      padding-top: 8px;
      margin-top: 16px;
    }
    .dynamic-slot {
      display: flex;
      flex-direction: column;
      gap: 10px;
      margin-bottom: 10px;
    }
  `]
})
export class CardComponent {
  @Input() dynamicSlots: string[] = [];
}