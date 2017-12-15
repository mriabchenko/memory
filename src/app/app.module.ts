import { BrowserModule } from '@angular/platform-browser';
import { NgModule }      from '@angular/core';


import { AppComponent }      from './app.component';
import { FieldComponent }    from './field/field.component';
import { StopwatchService }  from './services/stopwatch.service';
import { WinStatsComponent } from './win-stats/win-stats.component';
import { WinStatsService }   from './services/win-stats.service';


@NgModule({
  declarations: [
    AppComponent,
    FieldComponent,
    WinStatsComponent,
  ],
  imports     : [
    BrowserModule,
  ],
  providers   : [
    StopwatchService,
    WinStatsService,
  ],
  bootstrap   : [ AppComponent ],
})
export class AppModule {
}
