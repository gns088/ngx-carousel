export interface NgxCarousel {
  height?: string;
  width?: string;
  applyAnimationToSteps?: boolean;
  hideOverFlow?: boolean;
  animation?: boolean;
  carouselAnimationClass?: string;
  loop?: boolean;
  autoLoop?: boolean;
  autoLoopTime?: number;
  outsideButton?: boolean;
  allowButtonAnimation?: boolean;
  useKeyboard?: boolean;
  useMouseWheel?: boolean;
  pauseOnHover?: boolean;
  resetOnResize?: boolean;
  showDots?: boolean;
  showControls?: boolean;
  previousButtonClass?: string;
  nextButtonClass?: string;
  previousButtonIconClass?: string;
  nextButtonIconClass?: string;
  buttonBg?: string;
  dotsBg?: string;
  dotsClass?: string;
  dotsType?: 'box' | 'dot';
  stepBackgroundSize?: string;
}
