import { Component } from '@angular/core';
import { WinStatsService }  from '../services/win-stats.service';

@Component({
  selector   : 'app-win-stats',
  templateUrl: './win-stats.component.html',
  styleUrls  : [ './win-stats.component.sass' ],
})

export class WinStatsComponent {
  public constructor(public ws: WinStatsService) {}
}
