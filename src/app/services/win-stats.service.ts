import { Injectable } from '@angular/core';

@Injectable()
export class WinStatsService {
  public showWinStats: boolean;
  public time: string;
  public steps: number;

  public constructor() {
    this.showWinStats = false;
    this.time = '';
    this.steps = 0;
  }
}
