import { Component, ContentChild, ContentChildren, Input, OnDestroy, OnInit, QueryList } from '@angular/core';
import { NgxCarouselStepComponent } from '../components/ngx-carousel-step/ngx-carousel-step.component';
import { NgxCarouselNextButtonDirective } from '../directives/ngx-carousel-next-button.directive';
import { NgxCarouselPreviousButtonDirective } from '../directives/ngx-carousel-previous-button.directive';
import { GenerateTextColor } from '../utils';
import { Subscription, timer } from 'rxjs';

@Component({
  selector: 'ngx-carousel',
  templateUrl: './ngx-carousel.component.html',
  styleUrls: ['./ngx-carousel.component.scss'],
})
export class NgxCarouselComponent implements OnInit, OnDestroy {

  @Input('height') height = 400;
  @Input('width') width = '100%';
  @Input('applyAnimationToSteps') applyAnimationToSteps = true;
  @Input('hideOverFlow') hideOverFlow = false;
  @Input('animation') animation = false;
  @Input('carouselAnimationClass') carouselAnimationClass = 'fade';
  @Input('loop') loop = true;
  @Input('autoLoop') autoLoop = false;
  @Input('autoLoopTime') autoLoopTime = 3000;
  @Input('outsideButton') outsideButton = false;
  @Input('allowButtonAnimation') allowButtonAnimation = true;
  @Input('showDots') showDots = true;
  @Input('previousButtonClass') previousButtonClass: string;
  @Input('nextButtonClass') nextButtonClass: string;
  @Input('previousButtonIconClass') previousButtonIconClass = 'fas fa-chevron-left';
  @Input('nextButtonIconClass') nextButtonIconClass = 'fas fa-chevron-right';
  @Input('buttonBg') buttonBg = 'transparent';
  @Input('dotsBg') dotsBg = '#FFFFFF';

  @ContentChildren(NgxCarouselStepComponent, {descendants: true}) stepList: QueryList<NgxCarouselStepComponent>;
  public selectedIndex = 0;

  @ContentChild(NgxCarouselNextButtonDirective, {static: false}) nextButtonDirectiveTemplateRef: NgxCarouselNextButtonDirective;
  @ContentChild(NgxCarouselPreviousButtonDirective, {static: false}) previousButtonDirectiveTemplateRef: NgxCarouselPreviousButtonDirective;
  private timerSubscription: Subscription;

  constructor() {
  }

  get selectedStep(): NgxCarouselStepComponent {
    return this.stepList.get(this.selectedIndex);
  }

  ngOnInit(): void {
    if (this.autoLoop) {
      this.loop = true;
      const timerSub = timer(this.autoLoopTime, this.autoLoopTime);
      this.timerSubscription = timerSub.subscribe(time => {
        this.next();
      });
    }
  }

  ngOnDestroy(): void {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

  getButtonTextColor(color: string): string {
    return color ? GenerateTextColor(color) : null;
  }

  next(): void {
    this.loop && this.selectedIndex === this.stepList.length - 1 ?
      this.selectedIndex = 0 :
      this.selectedIndex++;
  }

  previous(): void {
    this.loop && this.selectedIndex === 0 ?
      this.selectedIndex = this.stepList.length - 1 :
      this.selectedIndex--;
  }

  changeCurrentStep(stepIndex: number): void {
    this.selectedIndex = stepIndex;
  }

  get getNgxCarouselStyle(): object {
    return {
      'height.px': this.height,
      width: this.width
    };
  }

  getNgxCarouselStepStyle(step: NgxCarouselStepComponent, stepIndex: number): object {
    return {
      'height.px': this.height,
      'background-image': step.bgImage ? `url(${step.bgImage})` : '',
      'background-color': step.bgColor
    };
  }

  getNgxCarouselStepClass(step: NgxCarouselStepComponent, stepIndex: number): object {
    return {
      'display-block': stepIndex === this.selectedIndex,
      'image-background-style': step.bgImage
    };
  }

  get getButtonIconStyle(): object {
    return {
      'background-color': this.selectedStep?.buttonBg || this.buttonBg || '#FFFFFF',
      color: this.getButtonTextColor(this.selectedStep?.buttonBg || this.buttonBg || '#FFFFFF')
    };
  }

  get getPrevButtonClass(): object {
    return {
      'previous-button-outside': this.outsideButton,
      'allow-button-animation': this.allowButtonAnimation
    };
  }

  get getNextButtonClass(): object {
    return {
      'next-button-outside': this.outsideButton,
      'allow-button-animation': this.allowButtonAnimation
    };
  }
}
