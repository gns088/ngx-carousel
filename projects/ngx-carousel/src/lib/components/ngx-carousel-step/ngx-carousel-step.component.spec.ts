import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { NgxCarouselStepComponent } from './ngx-carousel-step.component';
import { NgxCarouselComponent } from '../../ngx-carousel/ngx-carousel.component';
import {
  NgxCarouselKeyEventsDirective,
  NgxCarouselNextButtonDirective,
  NgxCarouselPreviousButtonDirective,
  NgxCarouselStepContentDirective,
  NgxCarouselSwipeDirective
} from '../../directives';

describe('NgxCarouselStepComponent', () => {
  let component: NgxCarouselStepComponent;
  let fixture: ComponentFixture<NgxCarouselStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        NgxCarouselComponent,
        NgxCarouselStepComponent,
        NgxCarouselNextButtonDirective,
        NgxCarouselPreviousButtonDirective,
        NgxCarouselStepContentDirective,
        NgxCarouselKeyEventsDirective,
        NgxCarouselSwipeDirective,
      ],
      imports: [CommonModule],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxCarouselStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should append url in bgImage if bgImage not passed inside url', () => {
    component.bgImage = 'http://google.com';
    component.ngOnInit();
    expect(component.bgImage).toBe('url("http://google.com")');
  });

  it('should bgColor not passed', () => {
    component.bgColor = undefined;
    component.ngOnInit();
    expect(component.bgColor).toBe('#e3dddd');
  });
});
