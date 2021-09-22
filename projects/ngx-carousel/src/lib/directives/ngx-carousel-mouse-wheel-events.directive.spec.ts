import { NgxCarouselKeyEventsDirective } from './ngx-carousel-key-events.directive';
import { NgxCarouselMouseWheelEventsDirective } from './ngx-carousel-mouse-wheel-events.directive';

describe('NgxCarouselKeyEventsDirective', () => {

  const directive = new NgxCarouselMouseWheelEventsDirective();

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should set isHover true on onMouseEnter', () => {
    directive.onMouseEnterEvent();
    expect(directive.isHover).toBe(true);
  });

  it('should set isHover false on onMouseEnter', () => {
    directive.onMouseLeaveEvent();
    expect(directive.isHover).toBe(false);
  });


  describe('onMouseWheel', () => {
    it('should call right when enableEvent is true', () => {
      directive.isHover = true;
      directive.enableEvent = true;
      const spyOnRight = spyOn(directive.right, 'emit');
      const spyOnLeft = spyOn(directive.left, 'emit');
      // @ts-ignore
      const event: WheelEvent = {
        preventDefault: (): void => {
        },
        deltaY: 10
      };
      directive.onMouseWheel(event);
      expect(spyOnRight).toHaveBeenCalled();
      expect(spyOnLeft).not.toHaveBeenCalled();
    });
    it('should call left when enableEvent is true', () => {
      directive.isHover = true;
      directive.enableEvent = true;
      const spyOnRight = spyOn(directive.right, 'emit');
      const spyOnLeft = spyOn(directive.left, 'emit');
      // @ts-ignore
      const event: WheelEvent = {
        preventDefault: (): void => {
        },
        deltaY: -10
      };
      directive.onMouseWheel(event);
      expect(spyOnRight).not.toHaveBeenCalled();
      expect(spyOnLeft).toHaveBeenCalled();
    });
    it('should not call left or right when enableEvent is true but mouse deltaY is 0', () => {
      const spyOnFn = spyOn(directive.left, 'emit');
      // @ts-ignore
      const event: WheelEvent = {
        preventDefault: (): void => {
        },
        deltaY: 0
      };
      directive.onMouseWheel(event);
      expect(spyOnFn).not.toHaveBeenCalled();
    });
    it('should not call left when enableEvent is false', () => {
      directive.enableEvent = false;
      const spyOnFn = spyOn(directive.left, 'emit');
      // @ts-ignore
      const event: WheelEvent = {
        preventDefault: (): void => {
        },
        deltaY: -1
      };
      directive.onMouseWheel(event);
      expect(spyOnFn).not.toHaveBeenCalled();
    });
  });

  describe('onMouseLeave', () => {
    it('should emit startTimer pauseOnHover is true', () => {
      const spyOnFn = spyOn(directive.onMouseLeave, 'emit');
      directive.onMouseLeaveEvent();
      expect(spyOnFn).toHaveBeenCalled();
    });
    it('should not call startTimer pauseOnHover is false', () => {
      directive.enableEvent = false;
      const spyOnFn = spyOn(directive.onMouseEnter, 'emit');
      directive.onMouseLeaveEvent();
      expect(spyOnFn).not.toHaveBeenCalled();
    });
  });

  describe('onMouseEnter', () => {
    it('should emit stopTimer pauseOnHover is true', () => {
      const spyOnFn = spyOn(directive.onMouseEnter, 'emit');
      directive.onMouseEnterEvent();
      expect(spyOnFn).toHaveBeenCalled();
    });
    it('should not call stopTimer pauseOnHover is false', () => {
      directive.enableEvent = false;
      const spyOnFn = spyOn(directive.onMouseLeave, 'emit');
      directive.onMouseEnterEvent();
      expect(spyOnFn).not.toHaveBeenCalled();
    });
  });
});
