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
import { NgxCarouselEvent } from '../types';
import { ListKeyManager } from '@angular/cdk/a11y';

@Component({
  selector: 'ngx-carousel',
  templateUrl: './ngx-carousel.component.html',
  styleUrls: ['./ngx-carousel.component.scss'],
})
export class NgxCarouselComponent implements OnInit, AfterContentInit, OnDestroy {

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
   * default: false
   */
  @Input()
  animation = false;

  /**
   * Carousel animation class, we can write css for animation in parent component and pass to this config
   * default: fade
   */
  @Input()
  carouselAnimationClass = 'fade';

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
   * to show arrow button half outside to carousel area
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
   * When user scroll on carousel it will change steps
   * default: true
   */
  @Input()
  useMouseWheel = true;

  /**
   * When user keep mouse on carousel it will stop auto loop
   * default: true
   */
  @Input()
  pauseOnHover = true;

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
   */
  @Input()
  dotsBg = '#FFFFFF';

  /**
   * getting list of steps component inside <ngx-carousel>
   */
  @ContentChildren(NgxCarouselStepComponent, {descendants: true})
  stepList: QueryList<NgxCarouselStepComponent>;
  public listKeyManager: ListKeyManager<NgxCarouselStepComponent>;

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
  private timerSubscription: Subscription;

  /**
   * Event Emitter of component
   */
  @Output('onNext')
  onNextEvent: EventEmitter<NgxCarouselEvent> = new EventEmitter<NgxCarouselEvent>();
  @Output('onPrevious')
  onPreviousEvent: EventEmitter<NgxCarouselEvent> = new EventEmitter<NgxCarouselEvent>();
  @Output('onStepChange')
  onStepChangeEvent: EventEmitter<NgxCarouselEvent> = new EventEmitter<NgxCarouselEvent>();

  @HostListener('mouseenter')
  private onMouseEnter(): void {
    if (this.pauseOnHover) {
      this.stopTimer();
    }
  }

  @HostListener('mouseleave')
  private onMouseLeave(): void {
    if (this.pauseOnHover) {
      this.startTimer();
    }
  }

  @HostListener('mousewheel', ['$event'])
  private onMouseWheel(event: MouseWheelEvent): void {
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

  @HostListener('window:resize', ['$event'])
  private onResize(event: Event): void {
    // Reset carousel when window is resized
    // in order to avoid major glitches.
    this.slideTo(0);
  }

  constructor() {
  }

  /**
   * return currently selected step
   */
  get selectedStep(): NgxCarouselStepComponent {
    return this.stepList.toArray()[this.selectedIndex];
  }

  /**
   * initializes auto loop if enabled when component loads
   */
  ngOnInit(): void {
    this.startTimer();
  }

  ngAfterContentInit(): void {
    this.listKeyManager = new ListKeyManager(this.stepList);
    this.listKeyManager.updateActiveItem(this.selectedIndex);
  }

  /**
   * start autoplay time subscriber
   */
  private startTimer(): void {
    if (this.autoLoop) {
      this.loop = true;
      const timerSub = timer(this.autoLoopTime, this.autoLoopTime);
      this.timerSubscription = timerSub.subscribe(time => {
        this.next();
      });
    }
  }

  /**
   * stop autoplay time subscriber
   */
  private stopTimer(): void {
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
    return color ? GenerateTextColor(color) : null;
  }

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

  /**
   * return style for <ngx-carousel>
   */
  get getNgxCarouselStyle(): object {
    return {
      height: this.height,
      width: this.width
    };
  }

  /**
   * return classes for <ngx-carousel-step>
   */
  getNgxCarouselStepStyle(step: NgxCarouselStepComponent, stepIndex: number): object {
    return {
      'height.px': this.height,
      'background-image': step.bgImage ? step.bgImage : '',
      'background-color': step.bgColor
    };
  }

  /**
   * return class for <ngx-carousel-step>
   */
  getNgxCarouselStepClass(step: NgxCarouselStepComponent, stepIndex: number): object {
    return {
      'display-block': stepIndex === this.selectedIndex,
      'image-background-style': step.bgImage
    };
  }

  /**
   * return style for buttons
   */
  get getButtonIconStyle(): object {
    return {
      'background-color': this.selectedStep?.buttonBg || this.buttonBg || '#FFFFFF',
      color: this.getButtonTextColor(this.selectedStep?.buttonBg || this.buttonBg || '#FFFFFF')
    };
  }

  /**
   * return class for previous button
   */
  get getPrevButtonClass(): object {
    return {
      'previous-button-outside': this.outsideButton,
      'allow-button-animation': this.allowButtonAnimation
    };
  }

  /**
   * return class for next button
   */
  get getNextButtonClass(): object {
    return {
      'next-button-outside': this.outsideButton,
      'allow-button-animation': this.allowButtonAnimation
    };
  }
}
