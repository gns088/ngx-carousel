import { NgxCarouselStepContentDirective } from './ngx-carousel-step-content.directive';
import { ElementRef, EmbeddedViewRef, TemplateRef } from '@angular/core';

describe('NgxCarouselStepContentDirective', () => {
  // tslint:disable-next-line:new-parens
  const templateRef: TemplateRef<NgxCarouselStepContentDirective> = new class extends TemplateRef<NgxCarouselStepContentDirective> {
    createEmbeddedView(context: NgxCarouselStepContentDirective): EmbeddedViewRef<NgxCarouselStepContentDirective> {
      // @ts-ignore
      return undefined;
    }

    get elementRef(): ElementRef {
      // @ts-ignore
      return undefined;
    }
  };
  it('should create an instance', () => {
    const directive = new NgxCarouselStepContentDirective(templateRef);
    expect(directive).toBeTruthy();
  });
});
