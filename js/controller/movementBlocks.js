export class MovementBlocks {
    constructor ( 
        defaultBlankPosition, 
        win, 
        upX,
        downX,
        upY,
        downY,
        threshold, 
        posibility, 
        arrayBlocks 
    ) {
        this.defaultBlankPosition = defaultBlankPosition;
        this.win = win;
        this.upX = upX;
        this.downX = downX;
        this.upY = upY;
        this.downY = downY;
        this.threshold = threshold;
        this.posibility = posibility;
        this.arrayBlocks = arrayBlocks;
    }

    moveOneDirection ( posCardEmpty, cardChange, direction ) {
        if ( !this.win ) {
            let canMove = this.canSwipThatDirection( posCardEmpty, direction );

            if (canMove) {
                this.arrayBlocks[posCardEmpty].setTexture("23blocks", this.posibility[cardChange]);
                this.arrayBlocks[cardChange].setTexture("23blocks", this.posibility[posCardEmpty]);
                
                this.posibility[posCardEmpty] = this.posibility[cardChange];
                this.posibility[cardChange] = this.defaultBlankPosition;
            }
        }
    }
    
    directionMovement ( posCardEmpty ) {
        if (this.upX < this.downX - this.threshold ) {
            this.moveOneDirection( posCardEmpty, ( posCardEmpty + 1 ), "Left" );
        } else if ( this.upX > this.downX + this.threshold ) {
            this.moveOneDirection( posCardEmpty, ( posCardEmpty - 1 ), "Right" );
        } else if (this.upY < this.downY - this.threshold ) {
            this.moveOneDirection( posCardEmpty, ( posCardEmpty + 8 ), "Up" );
        } else if ( this.upY > this.downY + this.threshold ) {
            this.moveOneDirection( posCardEmpty, ( posCardEmpty - 8 ), "Down" );
        }
    }

    getPosCardEmpty() {
        for (let i = 0; i < this.posibility.length; i++) {
            if ( this.posibility[i] == this.defaultBlankPosition ) {
                return i;
            }         
        }
    }

    canSwipThatDirection( posCardEmpty, direction ) {
        if ( ( posCardEmpty == 7 || posCardEmpty == 15 || posCardEmpty == 23 ) && direction == "Left" ) {
            return false;
        } else if ( direction == "Left" ) {
            return true;
        }

        if ( ( posCardEmpty == 0 || posCardEmpty == 8 || posCardEmpty == 16 ) && direction == "Right" ) {
            return false;
        } else if ( direction == "Right" ) {
            return true;
        }

        if ( ( posCardEmpty > 15 ) && direction == "Up" ) {
            return false;
        } else if ( direction == "Up" ) {
            return true;
        }

        if ( ( posCardEmpty < 8 ) && direction == "Down" ) {
            return false;
        } else if ( direction == "Down" ) {
            return true;
        }
    }
}