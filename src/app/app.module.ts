import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { FieldComponent } from './field/field.component';
import { StopwatchComponent } from './stopwatch/stopwatch.component';


@NgModule({
  declarations: [
    AppComponent,
    FieldComponent,
    StopwatchComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
