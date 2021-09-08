import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { NgxCarouselModule } from 'ngx-carousel';
import { NgxCarouselModule } from '../../projects/ngx-carousel/src/lib';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'serverApp'}),
    BrowserAnimationsModule,
    AppRoutingModule,
    NgxCarouselModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
