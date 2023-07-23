import { Controls } from "./scenes/controlScene.js";
import { EndGame } from "./scenes/endGameScene.js";
import { Level } from "./scenes/levelScene.js";
import { MainScene } from "./scenes/mainScene.js";
import { Menu } from "./scenes/menuScene.js";

// Función para desordenar las cartas en el tablero utilizando el algoritmo de Fisher Yates Shuffle
function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
	
    while (currentIndex != 0) {
	  randomIndex = Math.floor(Math.random() * currentIndex);
	  currentIndex--;
	  [array[currentIndex], array[randomIndex]] = [
		array[randomIndex], array[currentIndex]];
	}

	return array;
}

// Instancias de las escenas
export function creationInstancesGame () {
    // Variables y funciones comunes a todas nuestras class
    let posiblesTables = [0, 1, 2, 3, 4, 5, 6, 7, 9, 10, 11, 12, 13, 14, 15, 16, 18, 19, 20, 21, 22, 23, 24, 27];
    const copyPosiblesTables = [...posiblesTables];
    const cardPosX = 0;
    const cardPosY = 200;

    const drawingCardsMainScene = new MainScene( shuffle(posiblesTables), copyPosiblesTables, cardPosX, cardPosY );
    drawingCardsMainScene.setValueDrawCards();
    
    const drawingCardsGoal = new EndGame( copyPosiblesTables, cardPosX, cardPosY );
    drawingCardsGoal.setValueDrawCards();
}

//Configuración del juego
const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 530,
    scene: [
        Menu,
        MainScene,
        Level,
        Controls,
        EndGame,
    ],
    scale: {
        mode: Phaser.Scale.FIT
    }
}

//Inicialización del objeto Phaser
new Phaser.Game(config);