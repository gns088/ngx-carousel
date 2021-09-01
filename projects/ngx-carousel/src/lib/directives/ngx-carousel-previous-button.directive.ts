import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: 'ng-template[ngxCarouselPreviousButton]'
})
export class NgxCarouselPreviousButtonDirective {
  constructor(public readonly templateRef: TemplateRef<NgxCarouselPreviousButtonDirective>) {
  }
}
