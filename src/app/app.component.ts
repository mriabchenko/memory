import { Component } from '@angular/core';
import { CardInterface } from '../interfaces/card.interface';

@Component({
    selector   : 'app-root',
    templateUrl: './app.component.html',
    styleUrls  : [ './app.component.sass' ]
})
export class AppComponent {
    public CARDS_NUMBER     = 32;
    public gameIsInProgress = false;
    public openedPair       = [];
    public cards: CardInterface[];

    public constructor() {
        this.cards = new Array(this.CARDS_NUMBER);
        this.init();
        this.shuffle();
    }

    public closeAll() {
        this.cards.forEach(card => {
            card.isOpened = false;
        })
    }

    public openAll() {
        this.cards.forEach(card => {
            card.isOpened = true;
        })
    }

    public init() {
        // setting ids
        for (let i = 0; i < this.CARDS_NUMBER; i++) {
            this.cards[ i ] = {
                id      : i,
                pairId  : (i < this.CARDS_NUMBER / 2) ? i + this.CARDS_NUMBER / 2 : i - this.CARDS_NUMBER / 2,
                isOpened: true,
                solved  : false,
            }
        }
        // setting images
        for (let i = 0; i < this.CARDS_NUMBER / 2; i++) {
            this.cards[ i ].image                      = `assets/images/${i + 1}.jpg`;
            this.cards[ this.cards[ i ].pairId ].image = `assets/images/${i + 1}.jpg`;
        }
    }

    public startGame() {
        this.closeAll();
        this.gameIsInProgress = true;
    }

    public endGame() {
        this.openAll();
        this.gameIsInProgress = false;
    }

    public cardClicked(id: number) {
        if (this.gameIsInProgress) {
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
                    this.openedPair[ 0 ] = id;
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
                        this.openedPair = []
                    } else {
                        this.openedPair = [] // reset pair
                    }
                }
            } else if (this.cards[ id ].isOpened) {
                card.isOpened   = false;
                this.openedPair = [];
                this.closeAll();
            }
        }
    }

    public shuffle() {
        let a = this.cards;
        for (let i = a.length - 1; i > 0; i--) {
            const j            = Math.floor(Math.random() * (i + 1));
            [ a[ i ], a[ j ] ] = [ a[ j ], a[ i ] ];
        }
    }
}
