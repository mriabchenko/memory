import { Component } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/observable/interval';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
    selector   : 'app-stopwatch',
    templateUrl: './stopwatch.component.html',
    styleUrls  : [ './stopwatch.component.sass' ],
})

export class StopwatchComponent {
    public display: string;
    private s: number;
    private m: number;
    private h: number;
    private stream: BehaviorSubject<number>;

    constructor(){
        this.stream = new BehaviorSubject(0);
        this.start();
    }
    public start(){
        this.stream.interval(1000);
        this.stream.subscribe(time => {
            this.h = Math.floor( time / (60 * 60) );
            time = time % (60 * 60);
            this.m = Math.floor( time / 60 );
            time = time % (60);
            this.s = Math.floor( time );

            this.display = this.pad(this.h, 2) + ':' + this.pad(this.m, 2) + ':' + this.pad(this.s, 2);
        })
    }

    public stop(){
        this.stream.complete()
    }

    private pad(num, size) {
        var s = "0000" + num;
        return s.substr(s.length - size);
    }
}
