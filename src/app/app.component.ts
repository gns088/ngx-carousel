import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ngx-carousel-lib';
  public animationClass = 'fade';
  public carouselConfine = {
    height: 400,
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
      bgImage: 'https://picsum.photos/id/1025/1280/720'
    },
    {
      bgImage: 'https://picsum.photos/id/1022/1280/720'
    }
  ];
}
