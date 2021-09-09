import { NgxCarouselPreviousButtonDirective } from './ngx-carousel-previous-button.directive';
import { ElementRef, EmbeddedViewRef, TemplateRef } from '@angular/core';

describe('NgxCarouselPreviousButtonDirective', () => {
  // tslint:disable-next-line:new-parens
  const templateRef: TemplateRef<NgxCarouselPreviousButtonDirective> = new class extends TemplateRef<NgxCarouselPreviousButtonDirective> {
    createEmbeddedView(context: NgxCarouselPreviousButtonDirective): EmbeddedViewRef<NgxCarouselPreviousButtonDirective> {
      return undefined;
    }

    get elementRef(): ElementRef {
      return undefined;
    }
  };
  it('should create an instance', () => {
    const directive = new NgxCarouselPreviousButtonDirective(templateRef);
    expect(directive).toBeTruthy();
  });
});
