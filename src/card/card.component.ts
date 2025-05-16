import { AfterContentChecked, AfterContentInit, AfterViewInit, Component, ContentChildren, Input, QueryList, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlotDirective } from '../slot.directive';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, SlotDirective],
  template: `
    <div class="card">
      <div class="card-header">
      @if (header) {
        <ng-container *ngTemplateOutlet="header.template"></ng-container>
      }
      </div>
      
      <!-- Dynamic slots -->
      <ng-container *ngFor="let slotName of filteredSlots">
        <div class="dynamic-slot" [attr.data-slot]="slotName">
          <ng-container *ngTemplateOutlet="getSlotTemplate(slotName); context: {handleClick: handleClick}"></ng-container>
        </div>
      </ng-container>

      <div class="card-footer">
      @if (footer) {
        <ng-container *ngTemplateOutlet="footer.template"></ng-container>
      }
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
export class CardComponent implements AfterContentInit {
  @ContentChildren(SlotDirective) slots!: QueryList<SlotDirective>;
  @Input() dynamicSlots: string[] = [];

  filteredSlots: string[] = [];
  header?: SlotDirective;
  footer?: SlotDirective;
  slotMap = new Map<string, SlotDirective>();

  ngAfterContentInit() {
    this.organizeSlots();
    this.slots.changes.subscribe(() => this.organizeSlots());
  }

  handleClick() {
    alert('handled click from loaded template ref');
  }

  private organizeSlots() {
    this.slotMap.clear();
    this.header = undefined;
    this.footer = undefined;

    this.slots.forEach(slot => {
      if (slot.slot === 'header') {
        this.header = slot;
      } else if (slot.slot === 'footer') {
        this.footer = slot;
      } else {
        this.slotMap.set(slot.slot, slot);
      }
    });

    this.filteredSlots = this.dynamicSlots.filter(slotName => 
      this.slotMap.has(slotName)
    );
  }
  getSlotTemplate(slotName: string): TemplateRef<any> | null {
    return this.slotMap.get(slotName)?.template || null;
  }
}