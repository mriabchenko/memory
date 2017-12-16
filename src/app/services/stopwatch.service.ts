import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Injectable }      from '@angular/core';
import { Observable }      from 'rxjs/Observable';

@Injectable()
export class StopwatchService {
  private time$: BehaviorSubject<string>;
  private initialTime: string; // 'hh:mm:ss'
  private interval: any;

  public constructor() {
    this.initialTime = '00:00';
    this.time$ = new BehaviorSubject(this.initialTime);
  }


  /**
   * Returns Observable ('hh:mm:ss' format string)
   * @returns {string}
   */
  public get display(): Observable<string> {
    return this.time$.asObservable();
  }

  public start() {
    let time = 1;
    this.interval = setInterval(() => {
      // const h = Math.floor(time / (60 * 60));
      // time = time % (60 * 60);
      const m = Math.floor(time / 60);
      time = time % (60);
      const s = Math.floor(time);
      const formatedTime = this.pad(m, 2) + ':' + this.pad(s, 2);
      this.time$.next(formatedTime);
      time++;
    }, 1000);
  }

  public stop() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  public clear() {
    this.time$.next(this.initialTime);
  }

  /**
   * Returns hh:mm:ss string
   * @param num
   * @param size
   * @returns {string}
   */
  private pad(num, size): string {
    const s = '0000' + num;
    return s.substr(s.length - size);
  }
}
