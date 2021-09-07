import { Component, ContentChild, Input, OnInit } from '@angular/core';
import { NgxCarouselStepContentDirective } from '../../directives';
import { ListKeyManagerOption } from '@angular/cdk/a11y';
import { DomSanitizer } from '@angular/platform-browser';

@Component({selector: 'ngx-carousel-step', template: ''})
export class NgxCarouselStepComponent implements ListKeyManagerOption, OnInit {

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
   * hide step overlay
   * default: true
   */
  @Input()
  public hideOverlay = false;

  /**
   * overlay color
   * default: #00000040
   */
  @Input()
  public overlayColor = '#00000040';

  /**
   * overlay Opacity
   * default: 0.5
   */
  @Input()
  public overlayOpacity = '0.5';

  /**
   * To set animation class of steps
   * default: fade
   */
  @Input()
  public carouselAnimationClass = 'fade';

  /**
   * template reference for content of steps
   */
  @ContentChild(NgxCarouselStepContentDirective, {static: false})
  stepContentDirectiveTemplateRef: NgxCarouselStepContentDirective;

  @Input() public disabled = false; // implements ListKeyManagerOption

  constructor(public sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    if (this.bgImage && !this.bgImage.includes('url')) {
      this.bgImage = `url("${this.bgImage}")`;
    }
  }
}
