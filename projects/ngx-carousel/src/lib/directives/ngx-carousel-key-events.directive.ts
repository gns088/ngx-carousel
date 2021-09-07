import { Directive, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Directive({
  selector: '[ngxCarouselKeyEvents]'
})
export class NgxCarouselKeyEventsDirective {

  @Input('ngxCarouselKeyEvents') enableEvent = true;

  @Output('next')
  nextEvent: EventEmitter<void> = new EventEmitter<void>();
  @Output('previous')
  previousEvent: EventEmitter<void> = new EventEmitter<void>();
  private isFocused = false;

  constructor(private elRef: ElementRef) {
  }

  @HostListener('mouseenter')
  private onMouseEnter(): void {
    this.isFocused = true;
  }

  @HostListener('mouseleave')
  private onMouseLeave(): void {
    this.isFocused = false;
  }

  @HostListener('window:keyup', ['$event'])
  public onKeyUp(event: KeyboardEvent): void {
    if (this.enableEvent && (this.isFocused || this.elRef.nativeElement === document.activeElement)) {
      event.preventDefault();
      if (event.code === 'ArrowRight') {
        this.nextEvent.emit();
      } else if (event.code === 'ArrowLeft') {
        this.previousEvent.emit();
      }
    }
  }
}
