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
    width: '100%',
    applyAnimationToSteps: true,
    animation: true,
    loop: false,
    autoLoop: false,
    autoLoopTime: 1000,
    outsideButton: true,
    allowButtonAnimation: true,
    showDots: true,
    previousButtonClass: null,
    nextButtonClass: null,
    previousButtonIconClass: 'fas fa-long-arrow-left',
    nextButtonIconClass: 'fas fa-long-arrow-right',
    buttonBg: '#3b95b8',
    dotsBg: '#FFFFFF',
    dotsClass: '',
    hideOverFlow: false,
    carouselAnimationClass: 'ngx-carousel-fade-animation',
    useKeyboard: true,
    useMouseWheel: true,
    pauseOnHover: true,
    resetOnResize: false,
    stepBackgroundSize: '100% 100%',
  };
  public carouselStepConfig = {
    animation: true,
    hideOverlay: false,
    overlayColor: '#d4cace',
    overlayOpacity: '0.3',
    backgroundSize: ''
  };
  steps: any[] = [
    {
      bgColor: '#3b95b8',
    },
    {
      bgColor: '#cd7312',
    },
    {
      bgImage: 'url(https://picsum.photos/id/1025/1280/720)'
    },
    {
      bgImage: 'https://picsum.photos/id/1022/1280/720'
    }
  ];
  copied = false;

  get codeString(): string {
    return `<ngx-carousel>
      <ngx-carousel-step bgColor="#3b95b8">
        <ng-template ngxCarouselStepContent>
          Content
        </ng-template>
      </ngx-carousel-step>
      <ngx-carousel-step bgColor="#cd7312" buttonBg="#3b95b8"></ngx-carousel-step>
      <ngx-carousel-step bgImage="url(https://picsum.photos/id/1025/1280/720)"></ngx-carousel-step>
      <ngx-carousel-step bgImage="https://picsum.photos/id/1022/1280/720">
        <ng-template ngxCarouselStepContent>
          <div class="step-content">
            <h1>Content</h1>
            <button class="btn btn-primary">Click</button>
          </div>
        </ng-template>
      </ngx-carousel-step>
</ngx-carousel>`;
  }


  onEvent(eventType: string, event?: NgxCarouselEvent): void {
    console.log(eventType, event);
  }

  onAddStep(): void {
    this.steps.push({
      bgColor: '#3b95b8',
      bgImage: 'https://picsum.photos/id/1022/1280/720'
    });
  }

  removeStep(index: number): void {
    this.steps.splice(index, 1);
  }

  copyToClipboard(): void {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = this.codeString;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    const status = document.execCommand('copy');
    document.body.removeChild(selBox);
    this.copied = true;
    setTimeout(() => {
      this.copied = false;
    }, 2000);
  }
}
