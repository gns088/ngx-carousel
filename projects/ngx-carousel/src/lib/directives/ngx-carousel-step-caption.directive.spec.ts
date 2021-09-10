import { ElementRef, EmbeddedViewRef, TemplateRef } from '@angular/core';
import { NgxCarouselStepCaptionDirective } from './ngx-carousel-step-caption.directive';

describe('NgxCarouselStepCaptionDirective', () => {
  // tslint:disable-next-line:new-parens
  const templateRef: TemplateRef<NgxCarouselStepCaptionDirective> = new class extends TemplateRef<NgxCarouselStepCaptionDirective> {
    createEmbeddedView(context: NgxCarouselStepCaptionDirective): EmbeddedViewRef<NgxCarouselStepCaptionDirective> {
      // @ts-ignore
      return undefined;
    }

    get elementRef(): ElementRef {
      // @ts-ignore
      return undefined;
    }
  };
  it('should create an instance', () => {
    const directive = new NgxCarouselStepCaptionDirective(templateRef);
    expect(directive).toBeTruthy();
  });
});
