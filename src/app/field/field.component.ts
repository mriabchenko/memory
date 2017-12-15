import { Component }        from '@angular/core';
import { CardInterface }    from '../../interfaces/card.interface';
import { StopwatchService } from '../services/stopwatch.service';

@Component({
  selector   : 'app-field',
  templateUrl: './field.component.html',
  styleUrls  : [ './field.component.sass' ],
})
export class FieldComponent {
  public CARDS_NUMBER = 4;
  public openedPair = [];
  public cards: CardInterface[];
  public steps: number;
  public time: string;
  public gameInProgress: boolean;

  public constructor(public stopwatch: StopwatchService) {
    this.gameInProgress = false;
    stopwatch.display.subscribe(time => {
      this.time = time;
    });
  }

  public init() {
    this.stopwatch.clear();
    this.cards = new Array(this.CARDS_NUMBER);
    // setting ids
    for (let i = 0; i < this.CARDS_NUMBER; i++) {
      this.cards[ i ] = {
        id      : i,
        pairId  : (i < this.CARDS_NUMBER / 2) ? i + this.CARDS_NUMBER / 2 : i - this.CARDS_NUMBER / 2,
        isOpened: false,
        solved  : false,
      };
    }
    // setting images
    for (let i = 0; i < this.CARDS_NUMBER / 2; i++) {
      this.cards[ i ].image = `assets/images/${i + 1}.jpg`;
      this.cards[ this.cards[ i ].pairId ].image = `assets/images/${i + 1}.jpg`;
    }
    this.shuffle();
  }

  public restartGame() {
    this.steps = 0;
    this.init();
  }

  public cardClicked(id: number) {
    if (!this.gameInProgress) {
      this.gameInProgress = true;
      this.stopwatch.start();
    }
    let card: CardInterface;
    // finding clicked card
    this.cards.forEach(c => {
      if (c.id === id) {
        card = c;
        return;
      }
    });
    if (!card.isOpened) {
      if (this.openedPair.length === 0 || this.openedPair.length === 2) { // first card opened or third
        this.openedPair = []; // reset pair
        this.closeAll();
        card.isOpened = true;
        this.openedPair[ 0 ] = card.id;
      } else if (this.openedPair.length === 1) { // second card opened
        card.isOpened = true;
        if (this.openedPair[ 0 ] === card.pairId) {
          card.solved = true;
          let pairCard: CardInterface;
          // finding pair card
          this.cards.forEach(c => {
            if (c.id === this.openedPair[ 0 ]) {
              pairCard = c;
              return;
            }
          });
          pairCard.solved = true;
          if (this.youWin()) {
            this.winHandler();
            return;
          }
          this.openedPair = [];
          //this.closeAll()
        }
        else {
          this.openedPair = []; // reset pair
          //this.closeAll()
        }
      }
    } else if (this.cards[ id ].isOpened) {
      card.isOpened = false;
      this.openedPair = [];
    }
    this.steps++;
  }

  public shuffle(): void {
    this.stopwatch.clear();
    let a = this.cards;
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [ a[ i ], a[ j ] ] = [ a[ j ], a[ i ] ];
    }
  }

  private youWin(): boolean {
    const remainToSolve = this.cards.filter(card => !card.solved);
    return !remainToSolve.length;
  }

  private winHandler(): void {
    this.gameInProgress = false;
    this.stopwatch.stop();
    this.stopwatch.stop();
    setTimeout(function () {
      alert(`Вы победили за ${this.steps + 1} ходов`);
      this.steps = 0;
      this.openedPair = [];
    }.bind(this), 2500);

  }

  private closeAll() {
    this.cards.forEach(card => card.isOpened = false);
  }
}
