import {Component} from '@angular/core';
import {CardInterface} from '../../interfaces/card.interface';
import {StopwatchService} from '../services/stopwatch.service';
import {WinStatsService} from '../services/win-stats.service';

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.sass'],
})
export class FieldComponent {
  public cardsNumber = 12;
  public openedPair = [];
  public cards: CardInterface[];
  public steps: number;
  public time: string;
  public gameInProgress: boolean;

  public constructor(public stopwatch: StopwatchService,
                     public ws: WinStatsService) {
    this.init();
    this.ws.restartGame$.subscribe(() => {
      this.restartGame();
    });
  }

  public init() {
    this.ws.showWinStats = false;
    this.steps = 0;
    this.stopwatch.stop();
    this.stopwatch.clear();
    this.syncStats();
    this.gameInProgress = false;
    this.stopwatch.display.subscribe(time => {
      this.time = time;
    });
    this.cards = new Array(this.cardsNumber);
    // setting ids
    for (let i = 0; i < this.cardsNumber; i++) {
      this.cards[i] = {
        id: i,
        pairId: (i < this.cardsNumber / 2) ? i + this.cardsNumber / 2 : i - this.cardsNumber / 2,
        isOpened: false,
        solved: false,
      };
    }
    // setting images
    for (let i = 0; i < this.cardsNumber / 2; i++) {
      this.cards[i].image = `assets/images/${i + 1}.jpg`;
      this.cards[this.cards[i].pairId].image = `assets/images/${i + 1}.jpg`;
    }
    this.shuffle();
  }

  public restartGame() {
    this.init();
  }

  public cardsNumberSelected(newCardsNumber: number): void {
    this.cardsNumber = newCardsNumber;
    this.init();
  }

  public cardClicked(id: number) {
    let card: CardInterface;
    if (!this.gameInProgress) {
      this.stopwatch.start();
      this.gameInProgress = true;
    }
    // finding clicked card
    this.cards.forEach(c => {
      if (c.id === id) {
        card = c;
        return;
      }
    });
    if (!card.isOpened) {
      this.steps++;
      if (this.openedPair.length === 0 || this.openedPair.length === 2) { // first card opened or third
        this.openedPair = []; // reset pair
        this.closeAll();
        card.isOpened = true;
        this.openedPair[0] = card.id;
      } else if (this.openedPair.length === 1) { // second card opened
        card.isOpened = true;
        if (this.openedPair[0] === card.pairId) {
          card.solved = true;
          let pairCard: CardInterface;
          // finding pair card
          this.cards.forEach(c => {
            if (c.id === this.openedPair[0]) {
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
        } else {
          this.openedPair = []; // reset pair
        }
      }
    } else if (this.cards[id].isOpened) {
      card.isOpened = false;
      this.openedPair = [];
    }
  }

  public shuffle(): void {
    this.stopwatch.clear();
    const a = this.cards;
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
  }

  private youWin(): boolean {
    const remainToSolve = this.cards.filter(card => !card.solved);
    return !remainToSolve.length;
  }

  private winHandler(): void {
    this.gameInProgress = false;
    this.stopwatch.stop();
    this.syncStats();
    setTimeout(function () {
      this.ws.showWinStats = true;
      this.openedPair = [];
    }.bind(this), 2000);

  }

  /**
   * Updating stats in WinStatsService
   */
  private syncStats(): void {
    this.ws.steps = this.steps;
    this.ws.time = this.time;
    this.ws.cardsNumber = this.cardsNumber;
  }

  private closeAll(): void {
    this.cards.forEach(card => card.isOpened = false);
  }
}
