import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class WinStatsService {
    public showWinStats = false;
    public time = '';
    public steps = 0;
    public restartGame$ = new Subject<boolean>()
    public restartGame(): void {
        this.restartGame$.next(true);
    }
}
