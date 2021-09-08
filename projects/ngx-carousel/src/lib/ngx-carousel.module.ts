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

@NgModule({
  declarations: [
    NgxCarouselComponent,
    NgxCarouselStepComponent,
    NgxCarouselNextButtonDirective,
    NgxCarouselPreviousButtonDirective,
    NgxCarouselStepContentDirective,
    NgxCarouselKeyEventsDirective,
    NgxCarouselSwipeDirective,
  ],
  exports: [
    NgxCarouselComponent,
    NgxCarouselStepComponent,
    NgxCarouselNextButtonDirective,
    NgxCarouselPreviousButtonDirective,
    NgxCarouselStepContentDirective,
    NgxCarouselKeyEventsDirective,
    NgxCarouselSwipeDirective,
  ],
  imports: [CommonModule],
})
export class NgxCarouselModule {
}
