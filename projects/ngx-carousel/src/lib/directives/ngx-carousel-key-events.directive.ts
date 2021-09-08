import { Directive, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Directive({
  selector: '[ngxCarouselKeyEvents]'
})
export class NgxCarouselKeyEventsDirective {

  /**
   * to enable and disabled keyboard left right key event
   * default: true
   */
  @Input('ngxCarouselKeyEvents') enableEvent = true;

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
   * to check whether mouse is on carousel or not
   */
  private isHover = false;

  constructor(private elRef: ElementRef) {
  }

  /**
   * host listener to make isHover true if mouse is on carousel
   */
  @HostListener('mouseenter')
  onMouseEnter(): void {
    this.isHover = true;
  }

  /**
   * host listener to make isHover false if mouse is not on carousel
   */
  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.isHover = false;
  }

  /**
   * host listener to listen key board event and read left right key event
   * and then fire event emitter based on that
   */
  @HostListener('window:keyup', ['$event'])
  public onKeyUp(event: KeyboardEvent): void {
    if (this.enableEvent && (this.isHover || this.elRef.nativeElement === document.activeElement)) {
      event.preventDefault();
      if (event.code === 'ArrowRight') {
        this.right.emit();
      } else if (event.code === 'ArrowLeft') {
        this.left.emit();
      }
    }
  }
}
