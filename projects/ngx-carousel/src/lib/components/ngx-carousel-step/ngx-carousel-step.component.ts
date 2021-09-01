import { Component, ContentChild, Input } from '@angular/core';
import { NgxCarouselStepContentDirective } from '../../directives/ngx-carousel-step-content.directive';

@Component({selector: 'ngx-carousel-step', template: ''})
export class NgxCarouselStepComponent {
  @Input('bgImage') bgImage: string;
  @Input('buttonBg') buttonBg = 'transparent';
  @Input('bgColor') bgColor = '#e3dddd';
  @Input('animation') animation = true;
  @Input('carouselAnimationClass') carouselAnimationClass = 'fade';
  @ContentChild(NgxCarouselStepContentDirective, {static: false}) stepContentDirectiveTemplateRef: NgxCarouselStepContentDirective;
}
