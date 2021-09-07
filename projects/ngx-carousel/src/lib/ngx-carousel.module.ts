import { NgModule } from '@angular/core';
import { NgxCarouselComponent } from './ngx-carousel/ngx-carousel.component';
import { CommonModule } from '@angular/common';
import { NgxCarouselStepComponent } from './components';
import { NgxCarouselNextButtonDirective, NgxCarouselPreviousButtonDirective, NgxCarouselStepContentDirective } from './directives';
import { NgxCarouselKeyEventsDirective } from './directives/ngx-carousel-key-events.directive';


@NgModule({
  declarations: [
    NgxCarouselComponent,
    NgxCarouselStepComponent,
    NgxCarouselNextButtonDirective,
    NgxCarouselPreviousButtonDirective,
    NgxCarouselStepContentDirective,
    NgxCarouselKeyEventsDirective
  ],
  exports: [
    NgxCarouselComponent,
    NgxCarouselStepComponent,
    NgxCarouselNextButtonDirective,
    NgxCarouselPreviousButtonDirective,
    NgxCarouselStepContentDirective
  ],
  imports: [
    CommonModule
  ],
})
export class NgxCarouselModule {
}
