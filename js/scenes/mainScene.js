import { IndentifyWhenPlayerWon } from "../controller/indentifyPlayerWinner.js";
import { MovementBlocks } from "../controller/movementBlocks.js";

export class MainScene extends Phaser.Scene {
    constructor (
        posiblesTables, 
        posiblesTablesOriginal,
        startCardPosX, 
        startCardPosY
    ) {
        super("gameScene");
        this.posiblesTables = posiblesTables;
        this.posiblesTablesOriginal = posiblesTablesOriginal;
        this.startCardPosX = startCardPosX;
        this.startCardPosY = startCardPosY;
    }
    preload () {}
    create () {
        canGameFinish = true;
        this.add.image(300, 200, "background"); // Dibujar el fondo
        this.drawingCards(this); //Dibujando cartas en la escena
        this.creatingZoneDetectionMoveMouse(this); //Zona para detectar el movimiento del usuario con el mouse sobre la pantalla
        
        numberToShowOrHide = 0;
        if ( level >= 2 ) {
            this.showOrHideNumbers();
        }
    }
    showOrHideNumbers (){
        if ( level == 2 ) {
            if ( posibility[numberToShowOrHide] <= 7 ) {
                arrayBlocks[numberToShowOrHide].setTexture("23blocks", 8);
            } else if ( posibility[numberToShowOrHide] <= 17 ) {
                arrayBlocks[numberToShowOrHide].setTexture("23blocks", 17);
            } else if (  posibility[numberToShowOrHide] <= 25  ) {
                arrayBlocks[numberToShowOrHide].setTexture("23blocks", 25);
            }
        } else {
            if ( posibility[numberToShowOrHide] <= 24 ) {
                arrayBlocks[numberToShowOrHide].setTexture("23blocks", 26);
            }
        }

        numberToShowOrHide++;

        if ( numberToShowOrHide == 24 ) {
            numberToShowOrHide = 0;
        }

        this.time.delayedCall( repeatAfter, this.showOrHideNumbers, [], this );
    }
    creatingZoneDetectionMoveMouse (){
        const blocks = this.add.zone(0, 0, 800, 530);
        blocks.setOrigin(0);
        blocks.setInteractive();
        
        let downX, upX, downY, upY, threshold = 50;

        blocks.on("pointerdown", function(pointer) {
            downX = pointer.x;
            downY = pointer.y;
        });
        
        blocks.on("pointerup", function(pointer) {
            upX = pointer.x;
            upY = pointer.y;

            const movementBlocks = new MovementBlocks ( 
                defaultBlankPosition, 
                win, 
                upX,
                downX,
                upY,
                downY,
                threshold, 
                posibility, 
                arrayBlocks 
            ); // Instancia para mover los bloques
            const getCardEmpty = movementBlocks.getPosCardEmpty(); // Obtener la posición de la carta vacia
            movementBlocks.directionMovement(getCardEmpty);

            //Indentificar cuando el player a organizado en el orden correcto todas las tablas.
            const identifyWhenPlayerWon = new IndentifyWhenPlayerWon ( posibility, copyOriginalPosibility );
            console.log(identifyWhenPlayerWon.arrayEqualsBlocksOrder())
            if (identifyWhenPlayerWon.arrayEqualsBlocksOrder()) {
                win = true;
            }
        });
    }
    setValueDrawCards () {
        posibility = this.posiblesTables;
        copyOriginalPosibility = this.posiblesTablesOriginal;
        startPosCardX = this.startCardPosX;
        startPosCardY = this.startCardPosY;
    }
    drawingCards () {
        for (let i = 0; i < posibility.length; i++) {
            if (i % 8 == 0 && i > 7) {
                startPosCardX = 0;
                startPosCardY += 70;
            }

            arrayBlocks.push(this.add.sprite( 
                160 + ( startPosCardX * 68 ),
                startPosCardY, 
                "23blocks",
                posibility[i]
            ).setScale(0.75));

            startPosCardX++;
        }
    }
    update () {
        function playerToFinished() {
            //Indentificar cuando el player a organizado en el orden correcto todas las tablas.
            const identifyWhenPlayerWon = new IndentifyWhenPlayerWon ( posibility, copyOriginalPosibility );
            if (identifyWhenPlayerWon.arrayEqualsBlocksOrder()) {
                win = true;
            }
        }

        function generateMovementKeyboardCards (upX, downX, upY, downY, pos) {
            const movementBlocks = new MovementBlocks (
                defaultBlankPosition,
                win,
                upX,
                downX,
                upY,
                downY,
                50,
                posibility,
                arrayBlocks
            );

            const getCardEmpty = movementBlocks.getPosCardEmpty(); // Obtener la posición de la carta vacia
            movementBlocks.directionMovement(getCardEmpty);
            movementByKeyboard[pos] = false;
            playerToFinished();
        }

        if ( win && canGameFinish ) {
            console.log(canGameFinish)
            canGameFinish = false;

            //Al finalizar enviar el player a pantalla de fin de juego
            this.time.addEvent({
                delay: 250,
                loop: false,
                callback: () => {
                    this.scene.start("winScene");
                }
            });
        } else {
            let cursors = this.input.keyboard.createCursorKeys();

            if ( cursors.left.isDown ) {
                if (movementByKeyboard[0]) {
                    generateMovementKeyboardCards( 50, 120, 50, 50, 0 );
                }
            } else if ( cursors.right.isDown ) {
                if (movementByKeyboard[1]) {
                    generateMovementKeyboardCards( 150, 50, 50, 50, 1 );
                }
            } else if ( cursors.up.isDown ) {
                if (movementByKeyboard[2]) {
                    generateMovementKeyboardCards( 50, 50, 50, 120, 2 );
                }
            } else if ( cursors.down.isDown ) {
                if (movementByKeyboard[3]) {
                    generateMovementKeyboardCards( 50, 50, 150, 50, 3 );
                }
            }

            if ( cursors.left.isUp ) {
                movementByKeyboard[0] = true;
            }
            if ( cursors.right.isUp ) {
                movementByKeyboard[1] = true;
            }
            if ( cursors.up.isUp ) {
                movementByKeyboard[2] = true;
            }
            if ( cursors.down.isUp ) {
                movementByKeyboard[3] = true;
            }
        }
    }
}

let posibility = [];
let copyOriginalPosibility = [];
let startPosCardX = 0;
let startPosCardY = 0;
const defaultBlankPosition = 27;
let arrayBlocks = []; // Todas las posiciones de los bloques en escena
let win = false;
let canGameFinish = false;
let movementByKeyboard = [true, true, true, true] //[Left, Right, Up, Down]
let level = 1;
let numberToShowOrHide = 0;
const repeatAfter = 250;