import { Directive, Input, TemplateRef } from "@angular/core";

@Directive({ selector: '[appSlot]', standalone: true })
export class SlotDirective {
  @Input('appSlot') slot: string = '';

  constructor(public template: TemplateRef<any>) {}
}