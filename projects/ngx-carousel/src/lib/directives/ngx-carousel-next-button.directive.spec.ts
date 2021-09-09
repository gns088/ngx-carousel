import { NgxCarouselNextButtonDirective } from './ngx-carousel-next-button.directive';
import { ElementRef, EmbeddedViewRef, TemplateRef } from '@angular/core';

describe('NgxCarouselNextButtonDirective', () => {
  // tslint:disable-next-line:new-parens
  const templateRef: TemplateRef<NgxCarouselNextButtonDirective> = new class extends TemplateRef<NgxCarouselNextButtonDirective> {
    createEmbeddedView(context: NgxCarouselNextButtonDirective): EmbeddedViewRef<NgxCarouselNextButtonDirective> {
      // @ts-ignore
      return undefined;
    }

    get elementRef(): ElementRef {
      // @ts-ignore
      return undefined;
    }
  };
  it('should create an instance', () => {
    const directive = new NgxCarouselNextButtonDirective(templateRef);
    expect(directive).toBeTruthy();
  });
});
