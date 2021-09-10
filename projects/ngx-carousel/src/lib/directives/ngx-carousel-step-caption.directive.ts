import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: 'ng-template[ngxCarouselStepCaption]'
})
export class NgxCarouselStepCaptionDirective {
  constructor(public readonly templateRef: TemplateRef<NgxCarouselStepCaptionDirective>) {
  }
}
