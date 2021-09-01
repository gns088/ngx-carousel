import { NgModule } from '@angular/core';
import { NgxCarouselComponent } from './ngx-carousel/ngx-carousel.component';
import { NgxCarouselStepComponent } from './components/ngx-carousel-step/ngx-carousel-step.component';
import { CommonModule } from '@angular/common';
import { NgxCarouselNextButtonDirective } from './directives/ngx-carousel-next-button.directive';
import { NgxCarouselPreviousButtonDirective } from './directives/ngx-carousel-previous-button.directive';
import { NgxCarouselStepContentDirective } from './directives/ngx-carousel-step-content.directive';


@NgModule({
  declarations: [
    NgxCarouselComponent,
    NgxCarouselStepComponent,
    NgxCarouselNextButtonDirective,
    NgxCarouselPreviousButtonDirective,
    NgxCarouselStepContentDirective
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
