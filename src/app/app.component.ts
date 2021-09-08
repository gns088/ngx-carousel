import { Component } from '@angular/core';
import { NgxCarousel, NgxCarouselEvent } from '../../projects/ngx-carousel/src/lib';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ngx-carousel-lib';
  public animationClass = 'ngx-carousel-fade-animation';
  public carouselConfig: NgxCarousel = {
    height: '400px',
    width: '90%',
    applyAnimationToSteps: true,
    animation: false,
    loop: false,
    autoLoop: false,
    autoLoopTime: 3000,
    outsideButton: true,
    allowButtonAnimation: false,
    showDots: true,
    previousButtonClass: 'string',
    nextButtonClass: 'string',
    previousButtonIconClass: 'fas fa-long-arrow-left',
    nextButtonIconClass: 'fas fa-long-arrow-right',
    buttonBg: '#3b95b8',
    dotsBg: '#FFFFFF',
    hideOverFlow: false,
    carouselAnimationClass: 'ngx-carousel-fade-animation',
    useKeyboard: true,
    useMouseWheel: true,
    pauseOnHover: true,
    resetOnResize: false,
    stepBackgroundSize: '100% 100%',
  };
  steps: any[] = [
    {
      bgColor: '#3b95b8',
    },
    {
      bgColor: '#cd7312',
      buttonBg: '',
    },
    {
      bgImage: 'url(https://picsum.photos/id/1025/1280/720)'
    },
    {
      bgImage: 'https://picsum.photos/id/1022/1280/720'
    }
  ];
  showContent = true;

  onEvent(event: NgxCarouselEvent, eventType: string): void {
    console.log(eventType, event);
  }
}