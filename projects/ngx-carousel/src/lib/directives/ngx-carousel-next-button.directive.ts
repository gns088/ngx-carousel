import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: 'ng-template[ngxCarouselNextButton]'
})
export class NgxCarouselNextButtonDirective {
  constructor(public readonly templateRef: TemplateRef<NgxCarouselNextButtonDirective>) {
  }
}
