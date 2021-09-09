import { NgxCarouselSwipeDirective } from './ngx-carousel-swipe.directive';
import { fakeAsync, tick } from '@angular/core/testing';

describe('NgxCarouselSwipeDirective', () => {
  const directive = new NgxCarouselSwipeDirective();
  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  describe('when touched', () => {
    it('should call onSwipe with start when touchstart', () => {
      const spyOnFn = spyOn(directive, 'onSwipe');
      const event: TouchEvent = {
        // @ts-ignore
        changedTouches: [{
          clientX: 0,
          clientY: 0,
        }]
      };
      directive.onSwipeStart(event);
      expect(spyOnFn).toHaveBeenCalledWith(event, 'start');
    });
    it('should call onSwipe with end when touchend', () => {
      const spyOnFn = spyOn(directive, 'onSwipe');
      const event: TouchEvent = {
        // @ts-ignore
        changedTouches: [{
          clientX: 0,
          clientY: 0,
        }]
      };
      directive.onSwipeEnd(event);
      expect(spyOnFn).toHaveBeenCalledWith(event, 'end');
    });
    it('should call swipe with parameter', () => {
      const spyOnFn = spyOn(directive, 'swipe');
      const event: TouchEvent = {
        // @ts-ignore
        changedTouches: [{
          clientX: 0,
          clientY: 0,
        }]
      };
      directive.onSwipe(event, 'start');
      expect(spyOnFn).toHaveBeenCalledWith(event, 'start');
      directive.onSwipe(event, 'end');
      expect(spyOnFn).toHaveBeenCalledWith(event, 'end');
    });
  });

  describe('swipe', () => {
    beforeEach(() => {
      const eventStart: TouchEvent = {
        // @ts-ignore
        changedTouches: [{
          clientX: 0,
          clientY: 0,
        }]
      };
      directive.onSwipe(eventStart, 'start');
    });
    it('called with other than start or end', () => {
      const spyOnRight = spyOn(directive.right, 'emit');
      const spyOnLeft = spyOn(directive.left, 'emit');
      const event: TouchEvent = {
        // @ts-ignore
        changedTouches: [{
          clientX: 0,
          clientY: 0,
        }]
      };
      directive.onSwipe(event, 'test');
      expect(directive.swipeCord).toEqual([0, 0]);
      expect(spyOnRight).not.toHaveBeenCalled();
      expect(spyOnLeft).not.toHaveBeenCalled();
    });
    it('called with start', () => {
      const spyOnRight = spyOn(directive.right, 'emit');
      const spyOnLeft = spyOn(directive.left, 'emit');
      const event: TouchEvent = {
        // @ts-ignore
        changedTouches: [{
          clientX: 0,
          clientY: 0,
        }]
      };
      directive.onSwipe(event, 'start');
      expect(directive.swipeCord).toEqual([0, 0]);
      expect(spyOnRight).not.toHaveBeenCalled();
      expect(spyOnLeft).not.toHaveBeenCalled();
    });
    it('should emit left', fakeAsync(() => {
      const spyOnRight = spyOn(directive.right, 'emit');
      const spyOnLeft = spyOn(directive.left, 'emit');
      tick(200);
      const eventEnd: TouchEvent = {
        // @ts-ignore
        changedTouches: [{
          clientX: 100,
          clientY: 4,
        }]
      };
      directive.onSwipe(eventEnd, 'end');
      expect(directive.swipeCord).toEqual([0, 0]);
      expect(spyOnRight).not.toHaveBeenCalled();
      expect(spyOnLeft).toHaveBeenCalled();
    }));
    it('should emit right', fakeAsync(() => {
      const spyOnRight = spyOn(directive.right, 'emit');
      const spyOnLeft = spyOn(directive.left, 'emit');
      tick(200);
      const eventEnd: TouchEvent = {
        // @ts-ignore
        changedTouches: [{
          clientX: -100,
          clientY: -10,
        }]
      };
      directive.onSwipe(eventEnd, 'end');
      expect(directive.swipeCord).toEqual([0, 0]);
      expect(spyOnRight).toHaveBeenCalled();
      expect(spyOnLeft).not.toHaveBeenCalled();
    }));
    it('should not emit right or right', fakeAsync(() => {
      const spyOnRight = spyOn(directive.right, 'emit');
      const spyOnLeft = spyOn(directive.left, 'emit');
      tick(200);
      const eventEnd: TouchEvent = {
        // @ts-ignore
        changedTouches: [{
          clientX: 0,
          clientY: 0,
        }]
      };
      directive.onSwipe(eventEnd, 'end');
      expect(directive.swipeCord).toEqual([0, 0]);
      expect(spyOnRight).not.toHaveBeenCalled();
      expect(spyOnLeft).not.toHaveBeenCalled();
    }));
  });

});
