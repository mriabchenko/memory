import { Component } from '@angular/core';
import { WinStatsService }  from '../services/win-stats.service';

@Component({
  selector   : 'app-win-stats',
  templateUrl: './win-stats.component.html',
  styleUrls  : [ './win-stats.component.sass' ],
})

export class WinStatsComponent {
  public time: string;
  public steps: number;
  public showWinStats: boolean;

  public constructor(public ws: WinStatsService) {
    this.time = this.ws.time;
    this.steps = this.ws.steps;
    this.showWinStats = this.ws.showWinStats;
  }
}
