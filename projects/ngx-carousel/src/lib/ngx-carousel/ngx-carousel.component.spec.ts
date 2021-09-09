import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxCarouselComponent } from './ngx-carousel.component';
import { NgxCarouselStepComponent } from '../components';
import {
  NgxCarouselKeyEventsDirective,
  NgxCarouselNextButtonDirective,
  NgxCarouselPreviousButtonDirective,
  NgxCarouselStepContentDirective,
  NgxCarouselSwipeDirective
} from '../directives';
import { CommonModule } from '@angular/common';
import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { NgxCarouselEvent } from '../types';

@Component({
  selector: 'ngx-test-ngx-carousel',
  template: `
    <ngx-carousel>
      <ngx-carousel-step></ngx-carousel-step>
      <ngx-carousel-step></ngx-carousel-step>
      <ngx-carousel-step></ngx-carousel-step>
      <ngx-carousel-step></ngx-carousel-step>
    </ngx-carousel>
  `,
})
class NgxTestNgxCarouselComponent {
}

describe('NgxCarouselComponent', () => {
  let component: NgxCarouselComponent;
  let fixture: ComponentFixture<NgxTestNgxCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [
        NgxTestNgxCarouselComponent,
        NgxCarouselComponent,
        NgxCarouselStepComponent,
        NgxCarouselNextButtonDirective,
        NgxCarouselPreviousButtonDirective,
        NgxCarouselStepContentDirective,
        NgxCarouselKeyEventsDirective,
        NgxCarouselSwipeDirective,
      ],
      imports: [CommonModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxTestNgxCarouselComponent);
    component = fixture.debugElement.children[0].componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check length of step list from test component', () => {
    expect(component.stepList.length).toBe(4);
  });

  it('should emit ngAfterContentInit', () => {
    const spyOnFn = spyOn(component.onContentInIt, 'emit');
    component.ngAfterContentInit();
    expect(spyOnFn).toHaveBeenCalled();
  });

  describe('startTimer', () => {
    beforeEach(() => {
      component.stopTimer();
    });
    it('should call startTimer on ngOnIt', () => {
      const spyOnFn = spyOn(component, 'startTimer');
      component.ngOnInit();
      expect(spyOnFn).toHaveBeenCalled();
    });

    it('should start timer', () => {
      component.autoLoop = true;
      component.startTimer();
      expect(component.loop).toBeTrue();
    });

    it('should not start timer', () => {
      component.loop = false;
      component.autoLoop = false;
      component.startTimer();
      expect(component.loop).toBeFalse();
    });
  });

  describe('stopTimer', () => {
    beforeEach(() => {
      component.autoLoop = true;
      component.startTimer();
    });
    it('should call stopTimer on ngOnDestroy', () => {
      const spyOnFn = spyOn(component, 'stopTimer');
      component.ngOnDestroy();
      expect(spyOnFn).toHaveBeenCalled();
    });
    it('should unsubscribe timerSubscription', () => {
      const spyOnFn = spyOn(component.timerSubscription, 'unsubscribe');
      component.stopTimer();
      expect(spyOnFn).toHaveBeenCalled();
    });
  });

  describe('should getButtonTextColor', () => {
    it('should return blank if color not passed', () => {
      const result = component.getButtonTextColor('');
      expect(result).toBe('');
    });
    it('should return #000000 if #FFFFFF passed', () => {
      const result = component.getButtonTextColor('#FFFFFF');
      expect(result).toBe('#000000');
    });
  });

  describe('next', () => {
    describe('when loop is true', () => {
      beforeEach(() => {
        component.loop = true;
      });
      it('should increase step by one', () => {
        const spyOnFn = spyOn(component.onNextEvent, 'emit');
        const spyOnStepChangeEvent = spyOn(component.onStepChangeEvent, 'emit');
        component.next();
        expect(component.selectedIndex).toBe(1);
        component.next();
        expect(component.selectedIndex).toBe(2);
        const emitEventDetails: NgxCarouselEvent = {
          index: 2,
          selectedStep: component.stepList.toArray()[2]
        };
        expect(spyOnFn).toHaveBeenCalledWith(emitEventDetails);
        expect(spyOnStepChangeEvent).toHaveBeenCalledWith(emitEventDetails);
      });
      it('should set selected step as 0', () => {
        const spyOnFn = spyOn(component.onNextEvent, 'emit');
        const spyOnStepChangeEvent = spyOn(component.onStepChangeEvent, 'emit');
        component.selectedIndex = 3;
        component.next();
        const emitEventDetails: NgxCarouselEvent = {
          index: 0,
          selectedStep: component.stepList.toArray()[0]
        };
        expect(component.selectedIndex).toBe(0);
        expect(spyOnFn).toHaveBeenCalledWith(emitEventDetails);
        expect(spyOnStepChangeEvent).toHaveBeenCalledWith(emitEventDetails);
      });
    });
    describe('when loop is false', () => {
      beforeEach(() => {
        component.loop = false;
      });
      it('should reset increased step number and not call any event if index is equal to step list length', () => {
        const spyOnFn = spyOn(component.onNextEvent, 'emit');
        const spyOnStepChangeEvent = spyOn(component.onStepChangeEvent, 'emit');
        component.selectedIndex = 3;
        component.next();
        expect(component.selectedIndex).toBe(3);
        expect(spyOnFn).not.toHaveBeenCalled();
        expect(spyOnStepChangeEvent).not.toHaveBeenCalled();
      });
    });
  });

  describe('previous', () => {
    describe('when loop is true', () => {
      beforeEach(() => {
        component.loop = true;
      });
      it('should decrease step by one', () => {
        component.selectedIndex = 2;
        const spyOnFn = spyOn(component.onPreviousEvent, 'emit');
        const spyOnStepChangeEvent = spyOn(component.onStepChangeEvent, 'emit');
        component.previous();
        expect(component.selectedIndex).toBe(1);
        component.previous();
        expect(component.selectedIndex).toBe(0);
        const emitEventDetails: NgxCarouselEvent = {
          index: 0,
          selectedStep: component.stepList.toArray()[0]
        };
        expect(spyOnFn).toHaveBeenCalledWith(emitEventDetails);
        expect(spyOnStepChangeEvent).toHaveBeenCalledWith(emitEventDetails);
      });
      it('should set selected step as last step', () => {
        const spyOnFn = spyOn(component.onPreviousEvent, 'emit');
        const spyOnStepChangeEvent = spyOn(component.onStepChangeEvent, 'emit');
        component.selectedIndex = 0;
        component.previous();
        const emitEventDetails: NgxCarouselEvent = {
          index: 3,
          selectedStep: component.stepList.toArray()[3]
        };
        expect(component.selectedIndex).toBe(3);
        expect(spyOnFn).toHaveBeenCalledWith(emitEventDetails);
        expect(spyOnStepChangeEvent).toHaveBeenCalledWith(emitEventDetails);
      });
    });
    describe('when loop is false', () => {
      beforeEach(() => {
        component.loop = false;
      });
      it('should reset not call any event if index is equal 0', () => {
        const spyOnFn = spyOn(component.onPreviousEvent, 'emit');
        const spyOnStepChangeEvent = spyOn(component.onStepChangeEvent, 'emit');
        component.selectedIndex = 0;
        component.previous();
        expect(component.selectedIndex).toBe(0);
        expect(spyOnFn).not.toHaveBeenCalled();
        expect(spyOnStepChangeEvent).not.toHaveBeenCalled();
      });
    });
  });

  describe('when slideTo called', () => {
    it('should set index if index is more than 0 and less then stepList length', () => {
      const spyOnStepChangeEvent = spyOn(component.onStepChangeEvent, 'emit');
      component.slideTo(2);
      const emitEventDetails: NgxCarouselEvent = {
        index: 2,
        selectedStep: component.stepList.toArray()[2]
      };
      expect(component.selectedIndex).toBe(2);
      expect(spyOnStepChangeEvent).toHaveBeenCalledWith(emitEventDetails);
    });
    it('should set index if index is -1', () => {
      const spyOnStepChangeEvent = spyOn(component.onStepChangeEvent, 'emit');
      component.selectedIndex = 2;
      component.slideTo(-1);
      expect(component.selectedIndex).toBe(2);
      expect(spyOnStepChangeEvent).not.toHaveBeenCalled();
    });
    it('should set index if index is 5', () => {
      const spyOnStepChangeEvent = spyOn(component.onStepChangeEvent, 'emit');
      component.selectedIndex = 2;
      component.slideTo(5);
      expect(component.selectedIndex).toBe(2);
      expect(spyOnStepChangeEvent).not.toHaveBeenCalled();
    });
  });

  describe('onResize', () => {
    it('should not call onResize on window resize', () => {
      const spyOnFn = spyOn(component, 'slideTo');
      component.resetOnResize = false;
      const resizeEvent = window.document.createEvent('UIEvents') as any;
      resizeEvent.initUIEvent('resize', true, false, window, 0);
      window.dispatchEvent(resizeEvent);
      expect(spyOnFn).not.toHaveBeenCalled();
    });
    it('should call onResize on window resize', () => {
      const spyOnFn = spyOn(component, 'slideTo');
      component.resetOnResize = true;
      const resizeEvent = window.document.createEvent('UIEvents') as any;
      resizeEvent.initUIEvent('resize', true, false, window, 0);
      window.dispatchEvent(resizeEvent);
      expect(spyOnFn).toHaveBeenCalledWith(0);
    });
  });

  describe('onMouseWheel', () => {
    it('should call next when useMouseWheel is true', () => {
      const spyOnNext = spyOn(component, 'next');
      const spyOnPrevious = spyOn(component, 'previous');
      // @ts-ignore
      const event: WheelEvent = {
        preventDefault: (): void => {
        },
        deltaY: 10
      };
      component.onMouseWheel(event);
      expect(spyOnNext).toHaveBeenCalled();
      expect(spyOnPrevious).not.toHaveBeenCalled();
    });
    it('should call previous when useMouseWheel is true', () => {
      const spyOnNext = spyOn(component, 'next');
      const spyOnPrevious = spyOn(component, 'previous');
      // @ts-ignore
      const event: WheelEvent = {
        preventDefault: (): void => {
        },
        deltaY: -10
      };
      component.onMouseWheel(event);
      expect(spyOnNext).not.toHaveBeenCalled();
      expect(spyOnPrevious).toHaveBeenCalled();
    });
    it('should not call previous or next when useMouseWheel is true but mouse deltaY is 0', () => {
      const spyOnFn = spyOn(component, 'previous');
      // @ts-ignore
      const event: WheelEvent = {
        preventDefault: (): void => {
        },
        deltaY: 0
      };
      component.onMouseWheel(event);
      expect(spyOnFn).not.toHaveBeenCalled();
    });
    it('should not call previous when useMouseWheel is false', () => {
      component.useMouseWheel = false;
      const spyOnFn = spyOn(component, 'previous');
      // @ts-ignore
      const event: WheelEvent = {
        preventDefault: (): void => {
        },
        deltaY: -1
      };
      component.onMouseWheel(event);
      expect(spyOnFn).not.toHaveBeenCalled();
    });
  });

  describe('onMouseLeave', () => {
    it('should call startTimer pauseOnHover is true', () => {
      const spyOnFn = spyOn(component, 'startTimer');
      component.onMouseLeave();
      expect(spyOnFn).toHaveBeenCalled();
    });
    it('should not call startTimer pauseOnHover is false', () => {
      component.pauseOnHover = false;
      const spyOnFn = spyOn(component, 'startTimer');
      component.onMouseLeave();
      expect(spyOnFn).not.toHaveBeenCalled();
    });
  });

  describe('onMouseEnter', () => {
    it('should call stopTimer pauseOnHover is true', () => {
      const spyOnFn = spyOn(component, 'stopTimer');
      component.onMouseEnter();
      expect(spyOnFn).toHaveBeenCalled();
    });
    it('should not call stopTimer pauseOnHover is false', () => {
      component.pauseOnHover = false;
      const spyOnFn = spyOn(component, 'stopTimer');
      component.onMouseEnter();
      expect(spyOnFn).not.toHaveBeenCalled();
    });
  });
});
