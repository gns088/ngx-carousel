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
import { NgxCarouselMouseWheelEventsDirective } from './directives/ngx-carousel-mouse-wheel-events.directive';

@NgModule({
  declarations: [
    NgxCarouselComponent,
    NgxCarouselStepComponent,
    NgxCarouselNextButtonDirective,
    NgxCarouselPreviousButtonDirective,
    NgxCarouselStepContentDirective,
    NgxCarouselStepCaptionDirective,
    NgxCarouselKeyEventsDirective,
    NgxCarouselMouseWheelEventsDirective,
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
    NgxCarouselMouseWheelEventsDirective,
    NgxCarouselSwipeDirective,
  ],
  imports: [CommonModule],
})
export class NgxCarouselModule {
}
