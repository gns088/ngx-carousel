import {
  AfterContentInit,
  Component,
  ContentChild,
  ContentChildren,
  EventEmitter,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Output,
  QueryList
} from '@angular/core';
import { GenerateTextColor } from '../utils';
import { Subscription, timer } from 'rxjs';
import { NgxCarouselStepComponent } from '../components';
import { NgxCarouselNextButtonDirective, NgxCarouselPreviousButtonDirective } from '../directives';
import { NgxCarousel, NgxCarouselEvent } from '../types';

@Component({
  selector: 'ngx-carousel',
  templateUrl: './ngx-carousel.component.html',
  styleUrls: ['./ngx-carousel.component.scss'],
})
export class NgxCarouselComponent implements NgxCarousel, OnInit, OnDestroy, AfterContentInit {

  /**
   * Height Of the carousel
   * default: 400
   */
  @Input()
  height = '400px';

  /**
   * Width of the carousel
   * default: 100%
   */
  @Input()
  width = '100%';

  /**
   * apply animation to each steps, will not over ride step animation config
   * If step level animation is disabled then it won't apply animation to each steps
   * default: true
   */
  @Input()
  applyAnimationToSteps = true;

  /**
   * Hide carousel overflow, sometime we need to apply animation which requires overflow hidden,
   * we can hide overflow content using this config
   * default: false
   */
  @Input()
  hideOverFlow = false;

  /**
   * Apply animation to carousel
   * default: true
   */
  @Input()
  animation = true;

  /**
   * Carousel animation class, we can write css for animation in parent component and pass to this config
   * default: ngx-carousel-fade-animation
   */
  @Input()
  carouselAnimationClass = 'ngx-carousel-fade-animation';

  /**
   * Apply loop to carousel steps,
   * If we enable loop then it will show first step after last step again when user click of next button
   * default: true
   */
  @Input()
  loop = true;

  /**
   * To enable automatically move to next step
   * default: false
   */
  @Input()
  autoLoop = false;

  /**
   * Timing for auto change to next step in milliseconds
   * default: 3000
   */
  @Input()
  autoLoopTime = 3000;

  /**
   * To show arrow button half outside to carousel area
   * default: false
   */
  @Input()
  outsideButton = false;

  /**
   * When user hover on arrow buttons it will show some animation, i.e. moving little left right
   * default: true
   */
  @Input()
  allowButtonAnimation = true;

  /**
   * When user press left and right arrow keys it will change steps
   * default: true
   */
  @Input()
  useKeyboard = true;

  /**
   * When user scroll on carousel while hovering mouse on carousel it will change steps
   * default: true
   */
  @Input()
  useMouseWheel = true;

  /**
   * When user hover mouse on carousel it will stop auto loop
   * default: true
   */
  @Input()
  pauseOnHover = true;

  /**
   * Reset to step 0 on window resize event
   * default: true
   */
  @Input()
  resetOnResize = true;

  /**
   * Show / Hide dots at bottom of carousel
   * default: true
   */
  @Input()
  showDots = true;

  /**
   * to apply other classes to previous button
   */
  @Input()
  previousButtonClass: string;

  /**
   * to apply other classes to next button
   */
  @Input()
  nextButtonClass: string;

  /**
   * to apply icon classes to previous button
   * default: fas fa-chevron-left
   */
  @Input()
  previousButtonIconClass = 'fas fa-chevron-left';

  /**
   * to apply icon classes to next button
   * default: fas fa-chevron-right
   */
  @Input()
  nextButtonIconClass = 'fas fa-chevron-right';

  /**
   * to apply background color to button
   * default: transparent
   */
  @Input()
  buttonBg = 'transparent';

  /**
   * To apply background dots buttons
   * default: #FFFFFF
   */
  @Input()
  dotsBg = '#FFFFFF';

  /**
   * To apply classes dots buttons
   */
  @Input()
  dotsClass: string;

  /**
   * to set background size to step
   * default: cover
   */
  @Input()
  stepBackgroundSize = 'cover';

  /**
   * getting list of steps component inside <ngx-carousel>
   */
  @ContentChildren(NgxCarouselStepComponent, {descendants: true})
  stepList: QueryList<NgxCarouselStepComponent>;

  /**
   * selected step index
   * default: 0
   */
  public selectedIndex = 0;


  /**
   * To customize next button we can use <ng-template ngxCarouselNextButton> directive
   */
  @ContentChild(NgxCarouselNextButtonDirective, {static: false})
  nextButtonDirectiveTemplateRef: NgxCarouselNextButtonDirective;

  /**
   * To customize previous button we can use <ng-template ngxCarouselPreviousButton> directive
   */
  @ContentChild(NgxCarouselPreviousButtonDirective, {static: false})
  previousButtonDirectiveTemplateRef: NgxCarouselPreviousButtonDirective;


  /**
   * subscription
   */
  public timerSubscription: Subscription;


  /**
   * It emits the NgxCarouselEvent when slide move to next step
   */
  @Output('onNext')
  onNextEvent: EventEmitter<NgxCarouselEvent> = new EventEmitter<NgxCarouselEvent>();

  /**
   * It emits the NgxCarouselEvent when slide move to previous step
   */
  @Output('onPrevious')
  onPreviousEvent: EventEmitter<NgxCarouselEvent> = new EventEmitter<NgxCarouselEvent>();

  /**
   * It emits the NgxCarouselEvent when slide move to next or previous step, will emit when step changes
   */
  @Output('onStepChange')
  onStepChangeEvent: EventEmitter<NgxCarouselEvent> = new EventEmitter<NgxCarouselEvent>();

  /**
   * It emits when ngAfterContentInit life cycle called
   */
  @Output('onContentInIt')
  onContentInIt: EventEmitter<void> = new EventEmitter<void>();

  /**
   * host listener to stop timer if mouse is on the carousel
   */
  @HostListener('mouseenter')
  onMouseEnter(): void {
    if (this.pauseOnHover) {
      this.stopTimer();
    }
  }

  /**
   * host listener to start timer if mouse is on the carousel
   */
  @HostListener('mouseleave')
  onMouseLeave(): void {
    if (this.pauseOnHover) {
      this.startTimer();
    }
  }

  /**
   * host listener to change step if user scroll using mouse wheel when mouse is on carousel
   */
  @HostListener('mousewheel', ['$event'])
  onMouseWheel(event: WheelEvent): void {
    if (this.useMouseWheel) {
      event.preventDefault(); // prevent window to scroll
      const Δ = Math.sign(event.deltaY);

      if (Δ > 0) {
        this.next();
      } else if (Δ < 0) {
        this.previous();
      }
    }
  }

  /**
   * host listener to change step 0 if any resize event is fired
   */
  @HostListener('window:resize')
  onResize(): void {
    // Reset carousel when window is resized
    // in order to avoid major glitches.
    if (this.resetOnResize) {
      this.slideTo(0);
    }
  }

  /**
   * return currently selected step
   */
  get selectedStep(): NgxCarouselStepComponent {
    return this.stepList.toArray()[this.selectedIndex];
  }


  ngAfterContentInit(): void {
    this.onContentInIt.emit();
  }

  /**
   * initializes auto loop if enabled when component loads
   */
  ngOnInit(): void {
    this.startTimer();
  }

  /**
   * start autoplay time subscriber
   */
  startTimer(): void {
    if (this.autoLoop) {
      this.loop = true;
      const timerSub = timer(this.autoLoopTime, this.autoLoopTime);
      this.timerSubscription = timerSub.subscribe(() => this.next());
    }
  }

  /**
   * stop autoplay time subscriber
   */
  stopTimer(): void {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

  ngOnDestroy(): void {
    this.stopTimer();
  }

  /**
   * return text color for provided background color
   */
  getButtonTextColor(color: string): string {
    return color ? GenerateTextColor(color) : '';
  }

  /**
   * return details for event emitter
   * return: NgxCarouselEvent
   */
  private get getEmitEventDetails(): NgxCarouselEvent {
    return {
      index: this.selectedIndex,
      selectedStep: this.selectedStep
    };
  }

  /**
   * when user click on next button, it will emit stepChange event and next event
   */
  next(): void {
    this.loop && this.selectedIndex === this.stepList.length - 1 ?
      this.selectedIndex = 0 :
      this.selectedIndex++;
    if (!this.loop && this.selectedIndex >= this.stepList.length) {
      this.selectedIndex--;
      return;
    }
    this.onNextEvent.emit(this.getEmitEventDetails);
    this.onStepChangeEvent.emit(this.getEmitEventDetails);
  }

  /**
   * when user click on previous button, it will emit stepChange event and previous event
   */
  previous(): void {
    this.loop && this.selectedIndex === 0 ?
      this.selectedIndex = this.stepList.length - 1 :
      this.selectedIndex--;
    if (!this.loop && this.selectedIndex < 0) {
      this.selectedIndex++;
      return;
    }
    this.onPreviousEvent.emit(this.getEmitEventDetails);
    this.onStepChangeEvent.emit(this.getEmitEventDetails);
  }

  /**
   * it will select step with given step index
   */
  slideTo(stepIndex: number): void {
    if (stepIndex >= 0 && stepIndex < this.stepList.length) {
      this.selectedIndex = stepIndex;
      this.onStepChangeEvent.emit(this.getEmitEventDetails);
    }
  }

}
