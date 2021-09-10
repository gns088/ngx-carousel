import { NgModule } from '@angular/core';
import { NgxCarouselComponent } from './ngx-carousel/ngx-carousel.component';
import { CommonModule } from '@angular/common';
import { NgxCarouselStepComponent } from './components';
import {
  NgxCarouselKeyEventsDirective,
  NgxCarouselNextButtonDirective,
  NgxCarouselPreviousButtonDirective,
  NgxCarouselStepContentDirective,
  NgxCarouselSwipeDirective
} from './directives';
import { NgxCarouselStepCaptionDirective } from './directives/ngx-carousel-step-caption.directive';

@NgModule({
  declarations: [
    NgxCarouselComponent,
    NgxCarouselStepComponent,
    NgxCarouselNextButtonDirective,
    NgxCarouselPreviousButtonDirective,
    NgxCarouselStepContentDirective,
    NgxCarouselStepCaptionDirective,
    NgxCarouselKeyEventsDirective,
    NgxCarouselSwipeDirective,
  ],
  exports: [
    NgxCarouselComponent,
    NgxCarouselStepComponent,
    NgxCarouselNextButtonDirective,
    NgxCarouselPreviousButtonDirective,
    NgxCarouselStepContentDirective,
    NgxCarouselStepCaptionDirective,
    NgxCarouselKeyEventsDirective,
    NgxCarouselSwipeDirective,
  ],
  imports: [CommonModule],
})
export class NgxCarouselModule {
}
