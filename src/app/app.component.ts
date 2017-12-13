import { Component } from '@angular/core';
import { CardInterface } from '../interfaces/card.interface';

@Component({
    selector   : 'app-root',
    templateUrl: './app.component.html',
    styleUrls  : [ './app.component.sass' ]
})
export class AppComponent {
    public CARDS_NUMBER = 4;
    public openedPair   = [];
    public cards: CardInterface[];
    public steps: number;

    public constructor() {
        this.restartGame();
    }

    public init() {
        this.cards = new Array(this.CARDS_NUMBER);
        // setting ids
        for (let i = 0; i < this.CARDS_NUMBER; i++) {
            this.cards[ i ] = {
                id      : i,
                pairId  : (i < this.CARDS_NUMBER / 2) ? i + this.CARDS_NUMBER / 2 : i - this.CARDS_NUMBER / 2,
                isOpened: false,
                solved  : false,
            }
        }
        // setting images
        for (let i = 0; i < this.CARDS_NUMBER / 2; i++) {
            this.cards[ i ].image                      = `assets/images/${i + 1}.jpg`;
            this.cards[ this.cards[ i ].pairId ].image = `assets/images/${i + 1}.jpg`;
        }
        this.shuffle();
    }

    public restartGame() {
        this.steps = 0;
        this.init();
    }

    public cardClicked(id: number) {
        let card: CardInterface;
        // finding clicked card
        this.cards.forEach(c => {
            if (c.id === id) {
                card = c;
                return
            }
        });
        if (!card.isOpened) {
            if (this.openedPair.length === 0 || this.openedPair.length === 2) { // first card opened or third
                this.openedPair = [] // reset pair
                this.closeAll()
                card.isOpened        = true;
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
                            return
                        }
                    });
                    pairCard.solved = true;
                    if (this.youWin()) {
                        this.winHandler();
                        return;
                    };
                    this.openedPair = []
                    //this.closeAll()
                }
                else {
                    this.openedPair = [] // reset pair
                    //this.closeAll()
                }
            }
        } else if (this.cards[ id ].isOpened) {
            card.isOpened   = false;
            this.openedPair = [];
        }
        this.steps++;
        console.log(this.openedPair);
    }

    public shuffle(): void {
        let a = this.cards;
        for (let i = a.length - 1; i > 0; i--) {
            const j            = Math.floor(Math.random() * (i + 1));
            [ a[ i ], a[ j ] ] = [ a[ j ], a[ i ] ];
        }
    }

    private youWin(): boolean {
        const remainToSolve = this.cards.filter(card => !card.solved)
        if (remainToSolve.length === 0) return true
        else return false
    }

    private winHandler(): void {
        setTimeout(function () {
            alert(`Вы победили за ${this.steps + 1} ходов`)
            this.steps = 0;
            this.openedPair = [];
        }.bind(this), 2500)

    }

    private closeAll(){
        this.cards.forEach(card => card.isOpened = false)
    }
}
