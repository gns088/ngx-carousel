import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: 'ng-template[ngxCarouselStepContent]'
})
export class NgxCarouselStepContentDirective {
  constructor(public readonly templateRef: TemplateRef<NgxCarouselStepContentDirective>) {
  }
}
