import { NgxCarouselKeyEventsDirective } from './ngx-carousel-key-events.directive';

describe('NgxCarouselKeyEventsDirective', () => {

  const directive = new NgxCarouselKeyEventsDirective();

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should set isHover true on onMouseEnter', () => {
    directive.onMouseEnter();
    expect(directive.isHover).toBeTrue();
  });

  it('should set isHover false on onMouseEnter', () => {
    directive.onMouseLeave();
    expect(directive.isHover).toBeFalse();
  });

  describe('onKeyUp', () => {
    it('should not call any event', () => {
      const spyOnRight = spyOn(directive.right, 'emit');
      const spyOnLeft = spyOn(directive.left, 'emit');
      directive.enableEvent = false;
      // @ts-ignore
      const keyboardEvent: KeyboardEvent = {
        preventDefault: () => {
        },
        code: 'ArrowRight'
      };
      directive.onKeyUp(keyboardEvent);
      expect(spyOnRight).not.toHaveBeenCalled();
      expect(spyOnLeft).not.toHaveBeenCalled();
    });
    it('should not call any event if key is not ArrowRight or ArrowLeft', () => {
      const spyOnRight = spyOn(directive.right, 'emit');
      const spyOnLeft = spyOn(directive.left, 'emit');
      directive.enableEvent = true;
      directive.isHover = true;
      // @ts-ignore
      const keyboardEvent: KeyboardEvent = {
        preventDefault: () => {
        },
        code: 'esc'
      };
      directive.onKeyUp(keyboardEvent);
      expect(spyOnRight).not.toHaveBeenCalled();
      expect(spyOnLeft).not.toHaveBeenCalled();
    });
    it('should call right event', () => {
      const spyOnRight = spyOn(directive.right, 'emit');
      const spyOnLeft = spyOn(directive.left, 'emit');
      directive.enableEvent = true;
      directive.isHover = true;
      // @ts-ignore
      const keyboardEvent: KeyboardEvent = {
        preventDefault: () => {
        },
        code: 'ArrowRight'
      };
      directive.onKeyUp(keyboardEvent);
      expect(spyOnRight).toHaveBeenCalled();
      expect(spyOnLeft).not.toHaveBeenCalled();
    });
    it('should call left event', () => {
      const spyOnRight = spyOn(directive.right, 'emit');
      const spyOnLeft = spyOn(directive.left, 'emit');
      directive.enableEvent = true;
      directive.isHover = true;
      // @ts-ignore
      const keyboardEvent: KeyboardEvent = {
        preventDefault: () => {
        },
        code: 'ArrowLeft'
      };
      directive.onKeyUp(keyboardEvent);
      expect(spyOnRight).not.toHaveBeenCalled();
      expect(spyOnLeft).toHaveBeenCalled();
    });
  });
});
