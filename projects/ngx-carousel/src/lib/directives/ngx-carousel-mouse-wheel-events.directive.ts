import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Directive({
  selector: '[ngxCarouselMouseWheelEvents]'
})
export class NgxCarouselMouseWheelEventsDirective {

  /**
   * to enable and disabled keyboard left right key event
   * default: true
   */
  @Input('ngxCarouselMouseWheelEvents') enableEvent = true;

  /**
   * event emitter for next step
   */
  @Output()
  right: EventEmitter<void> = new EventEmitter<void>();

  /**
   * event emitter for previous step
   */
  @Output()
  left: EventEmitter<void> = new EventEmitter<void>();

  /**
   * event emitter for previous step
   */
  @Output()
  onMouseEnter: EventEmitter<void> = new EventEmitter<void>();
  /**
   * event emitter for previous step
   */
  @Output()
  onMouseLeave: EventEmitter<void> = new EventEmitter<void>();

  /**
   * to check whether mouse is on carousel or not
   */
  public isHover = false;

  /**
   * host listener to make isHover true if mouse is on carousel
   */
  @HostListener('mouseenter')
  onMouseEnterEvent(): void {
    this.isHover = true;
    this.onMouseEnter.emit();
  }

  /**
   * host listener to make isHover false if mouse is not on carousel
   */
  @HostListener('mouseleave')
  onMouseLeaveEvent(): void {
    this.isHover = false;
    this.onMouseLeave.emit();
  }

  /**
   * host listener to listen key board event and read left right key event
   * and then fire event emitter based on that
   */
  @HostListener('mousewheel', ['$event'])
  public onMouseWheel(event: WheelEvent): void {
    if (this.enableEvent && this.isHover) {
      event.preventDefault(); // prevent window to scroll
      const Δ = Math.sign(event.deltaY);

      if (Δ > 0) {
        this.right.emit();
      } else if (Δ < 0) {
        this.left.emit();
      }
    }
  }
}
