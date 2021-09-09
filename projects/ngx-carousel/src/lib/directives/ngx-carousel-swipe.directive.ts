import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[ngxCarouselSwipe]'
})
export class NgxCarouselSwipeDirective {

  @Output() right: EventEmitter<void> = new EventEmitter<void>();
  @Output() left: EventEmitter<void> = new EventEmitter<void>();

  swipeCord = [0, 0];
  swipeTime = new Date().getTime();

  @HostListener('touchstart', ['$event'])
  onSwipeStart($event): void {
    this.onSwipe($event, 'start');
  }

  @HostListener('touchend', ['$event'])
  onSwipeEnd($event): void {
    this.onSwipe($event, 'end');
  }

  onSwipe(e: TouchEvent, when: string): void {
    this.swipe(e, when);
  }

  swipe(touchEvent: TouchEvent, when: string): void {

    const cord: [number, number] = [touchEvent.changedTouches[0].clientX, touchEvent.changedTouches[0].clientY];
    const time = new Date().getTime();

    if (when === 'start') {
      this.swipeCord = cord;
      this.swipeTime = time;
    } else if (when === 'end') {
      const direction = [cord[0] - this.swipeCord[0], cord[1] - this.swipeCord[1]];
      const duration = time - this.swipeTime;

      if (duration < 1000 //
        && Math.abs(direction[0]) > 30 // Long enough
        && Math.abs(direction[0]) > Math.abs(direction[1] * 3)) { // Horizontal enough
        const swipeDir = direction[0] < 0 ? 'right' : 'left';
        if (swipeDir === 'right') {
          this.right.emit();
        } else {
          this.left.emit();
        }
      }
    }
  }

}
