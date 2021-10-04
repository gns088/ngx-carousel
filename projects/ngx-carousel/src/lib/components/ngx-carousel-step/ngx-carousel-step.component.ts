import { Component, ContentChild, Input, OnInit } from '@angular/core';
import { NgxCarouselStepContentDirective } from '../../directives';
import { NgxCarouselStep } from '../../types';
import { NgxCarouselStepCaptionDirective } from '../../directives/ngx-carousel-step-caption.directive';

@Component({selector: 'ngx-carousel-step', template: ''})
export class NgxCarouselStepComponent implements NgxCarouselStep, OnInit {

  /**
   * to set background image of steps
   */
  @Input()
  public bgImage: string;

  /**
   * to set background color of step
   * default: #e3dddd
   */
  @Input()
  public bgColor = '#e3dddd';

  /**
   * step background color of buttons (overrides <ngx-carousel> buttonGb config)
   */
  @Input()
  public buttonBg: string;

  /**
   * To remove background at step level
   * default: true
   */
  @Input()
  public noBgColor = false;
  /**
   * To allow animation at step level
   * default: true
   */
  @Input()
  public animation = true;

  /**
   * Hide step overlay
   * default: false
   */
  @Input()
  public hideOverlay = false;

  /**
   * Overlay color
   * default: #00000040
   */
  @Input()
  public overlayColor: string;

  /**
   * overlay Opacity
   * default: 0.3
   */
  @Input()
  public overlayOpacity;

  /**
   * To set background size to step
   * default: undefined
   */
  @Input()
  public backgroundSize;

  /**
   * To set classes to step
   * default: undefined
   */
  @Input() public classes;

  /**
   * template reference for content of steps
   */
  @ContentChild(NgxCarouselStepContentDirective, {static: false})
  stepContentDirectiveTemplateRef: NgxCarouselStepContentDirective;

  /**
   * template reference for caption of steps
   */
  @ContentChild(NgxCarouselStepCaptionDirective, {static: false})
  stepCaptionDirectiveTemplateRef: NgxCarouselStepCaptionDirective;

  ngOnInit(): void {
    if (this.bgImage && !this.bgImage.includes('url')) {
      this.bgImage = `url("${this.bgImage}")`;
    }
  }
}
