import { Component, ContentChild, Input, OnInit } from '@angular/core';
import { NgxCarouselStepContentDirective } from '../../directives';
import { NgxCarouselStep } from '../../types';

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
   * default: transparent
   */
  @Input()
  public buttonBg = 'transparent';

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
  public overlayColor = '#00000040';

  /**
   * overlay Opacity
   * default: 0.3
   */
  @Input()
  public overlayOpacity = '0.3';

  /**
   * To set background size to step
   * default: undefined
   */
  @Input()
  public backgroundSize;

  /**
   * template reference for content of steps
   */
  @ContentChild(NgxCarouselStepContentDirective, {static: false})
  stepContentDirectiveTemplateRef: NgxCarouselStepContentDirective;

  ngOnInit(): void {
    if (this.bgImage && !this.bgImage.includes('url')) {
      this.bgImage = `url("${this.bgImage}")`;
    }
  }
}
