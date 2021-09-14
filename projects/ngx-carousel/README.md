# NGX Carousel

[![npm version](https://badge.fury.io/js/@gns088%2Fngx-carousel.svg)](https://badge.fury.io/js/@gns088%2Fngx-carousel)
[![Live demo](https://img.shields.io/badge/demo-blue.svg)](https://gns088.github.io/ngx-carousel/)

## About

This package is a carousel component for Angular with no third dependencies.

### Installing

`npm install --save @gns088/ngx-carousel`

### Importing

```typescript
//...
import { NgxCarouselModule } from '@gns088/ngx-carousel';

@NgModule({
  // ...
  imports: [
    // ...
    NgxCarouselModule,
    // ...
  ]
})
export class AppModule {
}
```

## Usage

### `MatCarouselComponent`

```typescript
import { NgxCarouselComponent, NgxCarouselStepComponent } from '@gns088/ngx-carousel';
```

```html

<ngx-carousel>
  ...
</ngx-carousel>
```

#### Attributes

| Input                 |  Type              | Description                                                                | Default value     |
| --------------------- | ------------------ | ----------------------------------------------------------------------------- | :-----------------: |
| `height`        | `string`          | Height Of the carousel. | `400px`            |
| `width`        | `string`          | Width of the carousel.   | `100%`            |
| `applyAnimationToSteps`        | `boolean`          | apply animation to each steps, will not over ride step animation config, If step level animation is disabled then it won't apply animation to each steps  | `true`            |
| `hideOverFlow`        | `boolean`          | Hide carousel overflow, sometime we need to apply animation which requires overflow hidden, we can hide overflow content using this config. | `false`            |
| `animation`        | `boolean`          | Apply animation to carousel. | `true`            |
| `carouselAnimationClass`        | `string`          | Carousel animation class, we can write css for animation in parent component and pass to this config. | `ngx-carousel-fade-animation`            |
| `loop`        | `boolean`          | Apply loop to carousel steps, If we enable loop then it will show first step after last step again when user click of next button. | `true`            |
| `autoLoop`        | `boolean`          | To enable automatically move to next step. | `false`            |
| `autoLoopTime`        | `number`          | Timing for auto change to next step in milliseconds. | `3000`            |
| `outsideButton`        | `boolean`          | To show arrow button half outside to carousel area (at edge of carousel). | `false`            |
| `allowButtonAnimation`        | `boolean`          | When user hover on arrow buttons it will show some animation, i.e. moving little left right. | `true`            |
| `useKeyboard`        | `boolean`          | When user press left and right arrow keys it will change steps. | `true`            |
| `useMouseWheel`        | `boolean`          | When user scroll on carousel while hovering mouse on carousel it will change steps. | `true`            |
| `pauseOnHover`        | `boolean`          | When user hover mouse on carousel it will stop auto loop. | `true`            |
| `resetOnResize`        | `boolean`          | Reset to step 0 on window resize event. | `true`            |
| `showDots`        | `boolean`          | Show / Hide dots at bottom of carousel. | `true`            |
| `showControls`        | `boolean`          | Show / Hide next and previous button. | `true`            |
| `previousButtonClass`        | `string`          | To apply other classes to previous button. |             |
| `nextButtonClass`        | `string`          | To apply other classes to next button. |             |
| `previousButtonIconClass`        | `string`          | To apply icon classes to previous button. | `fas fa-chevron-left`            |
| `nextButtonIconClass`        | `string`          | To apply icon classes to next button. | `fas fa-chevron-right`            |
| `buttonBg`        | `string`          | To apply background color to button. | `transparent`            |
| `dotsBg`        | `string`          | To apply background dots buttons. | `#FFFFFF`            |
| `dotsClass`        | `string`          | To apply classes dots buttons. |          |
| `dotsType`        | `box or dot`          | To change design of dots. |    `dot`      |
| `stepBackgroundSize`        | `string`          | To set background size to step. when we set image in step background, if image not fits in container then we can use this config | `cover`            |

| Output                |  Type              | Description                                                                |
| --------------------- | ------------------ | -------------------------------------------------------------------------- |
| `onNext`      | `NgxCarouselEvent`           | It emits the NgxCarouselEvent when slide move to next step                            |
| `onPrevious`      | `NgxCarouselEvent`           | It emits the NgxCarouselEvent when slide move to previous step                            |
| `onStepChange`      | `NgxCarouselEvent`           | It emits the NgxCarouselEvent when slide move to next or previous step, will emit when step changes                            |
| `onContentInIt`      | `void`           | It emits when ngAfterContentInit life cycle called                            |

### `NgxCarouselStepComponent`

```typescript
import { NgxCarouselComponent, NgxCarouselStepComponent } from '@gns088/ngx-carousel';
```

```html

<ngx-carousel>
  <ngx-carousel-step>
    ...
  </ngx-carousel-step>
</ngx-carousel>
```

#### Attributes

| Input            | Type      | Description                   | Default value |
| ---------------- | --------- | ----------------------------- | :-----------: |
| `bgImage`        | `string`  | To set background image of steps.   |        |
| `bgColor`        | `string`  | To set background color of step.   | `#e3dddd`       |
| `noBgColor`      | `boolean` | To remove background at step level.   | `false`       |
| `buttonBg`       | `string`  | Step background color of buttons (overrides <ngx-carousel> buttonGb config).   |       |
| `animation`      | `boolean` | To allow animation at step level.   | `true`       |
| `hideOverlay`    | `boolean` | Hide step overlay.   | `false`       |
| `overlayColor`   | `string`  | Step overlay color.   | `#00000040`       |
| `overlayOpacity` | `string`  | Step overlay Opacity.   | `0.3`       |
| `backgroundSize` | `string`  | To set background size to step.   |        |
| `classes` | `string`  | To set classes to step.   |        |

## Templates

### ngxCarouselStepCaption

To add caption inside `<ngx-carousel-step></ngx-carousel-step>` we need to add `ngxCarouselStepCaption`.

This template should be placed inside `<ngx-carousel-step></ngx-carousel-step>`

```html

<ngx-carousel>
  <ngx-carousel-step>
    <ng-template ngxCarouselStepCaption>
      Caption
    </ng-template>
  </ngx-carousel-step>
</ngx-carousel>
```

### ngxCarouselStepContent

To add content inside `<ngx-carousel-step></ngx-carousel-step>` we need to add `ngxCarouselStepContent`.

This template should be placed inside `<ngx-carousel-step></ngx-carousel-step>`

```html

<ngx-carousel>
  <ngx-carousel-step>
    <ng-template ngxCarouselStepContent>
      Content
    </ng-template>
  </ngx-carousel-step>
</ngx-carousel>
```

### ngxCarouselNextButton

To customize a next button we can use `ngxCarouselNextButton` directive.

This template should be placed inside `<ngx-carousel></ngx-carousel>`

```html

<ngx-carousel>
  <ng-template ngxCarouselNextButton>
    <i class="fas fa-long-arrow-right"></i>
  </ng-template>
</ngx-carousel>
```

### ngxCarouselPreviousButton

To customize a previous button we can use `ngxCarouselPreviousButton` directive.

This template should be placed inside `<ngx-carousel></ngx-carousel>`

```html

<ngx-carousel>
  <ng-template ngxCarouselPreviousButton>
    <i class="fas fa-long-arrow-left"></i>
  </ng-template>
</ngx-carousel>
```

## Types

### `NgxCarousel`

```typescript
export interface NgxCarousel {
  height: string;
  width: string;
  applyAnimationToSteps: boolean;
  hideOverFlow: boolean;
  animation: boolean;
  carouselAnimationClass: string;
  loop: boolean;
  autoLoop: boolean;
  autoLoopTime: number;
  outsideButton: boolean;
  allowButtonAnimation: boolean;
  useKeyboard: boolean;
  useMouseWheel: boolean;
  pauseOnHover: boolean;
  resetOnResize: boolean;
  showDots: boolean;
  showControls: boolean;
  previousButtonClass: string;
  nextButtonClass: string;
  previousButtonIconClass: string;
  nextButtonIconClass: string;
  buttonBg: string;
  dotsBg: string;
  dotsClass: string;
  dotsType: 'box' | 'dot';
  stepBackgroundSize: string;
}
```

### `NgxCarouselStep`

```typescript
export interface NgxCarouselStep {
  bgImage: string;
  bgColor: string;
  noBgColor: boolean;
  buttonBg: string;
  animation: boolean;
  hideOverlay: boolean;
  overlayColor: string;
  overlayOpacity: string;
  backgroundSize: string;
  classes: string;
}

```

## Sample Code

```html

<ngx-carousel>
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
        <img src="https://picsum.photos/id/1024/1280/720" alt="Image" width="200px">
        <h1>Title</h1>
        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
          industry's
          standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to
          make
          a type specimen book. It has survived not only five centuries, but also the leap into electronic
          typesetting,
          remaining essentially unchanged.</p>
      </div>
    </ng-template>
  </ngx-carousel-step>
</ngx-carousel>
```

## Contributing

### How to help

- [Git hub Repo](https://github.com/gns088/ngx-carousel)
- For bugs and opinions, please [open an issue](https://github.com/gns088/ngx-carousel/issues/new)
- For pushing changes, please [open a pull request](https://github.com/gns088/ngx-carousel/compare)

#### Running the demo application

`npm run start`
