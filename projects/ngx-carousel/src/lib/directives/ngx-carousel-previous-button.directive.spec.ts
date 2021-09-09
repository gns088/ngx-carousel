import { NgxCarouselPreviousButtonDirective } from './ngx-carousel-previous-button.directive';
import { ElementRef, EmbeddedViewRef, TemplateRef } from '@angular/core';

describe('NgxCarouselPreviousButtonDirective', () => {
  // tslint:disable-next-line:new-parens
  const templateRef: TemplateRef<NgxCarouselPreviousButtonDirective> = new class extends TemplateRef<NgxCarouselPreviousButtonDirective> {
    createEmbeddedView(context: NgxCarouselPreviousButtonDirective): EmbeddedViewRef<NgxCarouselPreviousButtonDirective> {
      // @ts-ignore
      return undefined;
    }

    get elementRef(): ElementRef {
      // @ts-ignore
      return undefined;
    }
  };
  it('should create an instance', () => {
    const directive = new NgxCarouselPreviousButtonDirective(templateRef);
    expect(directive).toBeTruthy();
  });
});
