// Variables y funciones comunes a todas nuestras class

class MainScene extends Phaser.Scene {
    constructor() {
        super("gameScene");
    }
    preload () {
    }
    create () {
    }
    update () {
    }
}

class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }
    preload () {
    }
    create () {
    }
    update () {}
}

class Level extends Phaser.Scene {
    constructor() {
        super("levelScene");
    }
    preload () {
    }
    create () {
    }
    update () {}
}

class Mode extends Phaser.Scene {
    constructor() {
        super("modeScene");
    }
    preload () {
    }
    create () {
    }
    update () {}
}

class Controls extends Phaser.Scene {
    constructor() {
        super("controlsScene");
    }
    preload () {
    }
    create () {
    }
    update () {}
}

class EndGame extends Phaser.Scene {
    constructor() {
        super("endScene");
    }
    preload () {
    }
    create () {
    }
    update () {}
}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 530,
    scene: [
        MainScene,
        Menu,
        Level,
        Mode,
        Controls,
        EndGame,
    ],
    scale: {
        mode: Phaser.Scale.FIT
    }
}

//Inicialización del objeto Phaser
new Phaser.Game(config);