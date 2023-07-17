import { MainScene } from "./mainScene.js";
import { Menu } from "./menuScene.js";

export class Level extends Phaser.Scene {
    constructor() {
        super("levelScene");
    }
    preload () {}
    create () {
        this.add.image(480, 320, "bg");
        this.add.image(400, 75, "logo");
        this.add.image(400, 300, "level-menu").setScale(0.75);
        this.add.image(680, 290, "kid");

        //BTN EASY
        this.createZoneButtonsMenu( 288, 155, 220, 65, "Easy", 1 );

        //BTN MEDIUM
        this.createZoneButtonsMenu( 288, 228, 220, 65, "Medium", 2 );

        //BTN HARD
        this.createZoneButtonsMenu( 288, 305, 220, 65, "Hard", 3 );

        //BTN BACK
        this.createZoneButtonsMenu( 288, 380, 220, 65, "Back", 0 );

        this.add.text(480, 480, 
            "Level: " + mainSceneGame.numDificult + "-" + mainSceneGame.stateLevel,
            {
                fontSize: 30,
                fontStyle: "bold",
                fill: "#008080",
            }
        );
    }
    createZoneButtonsMenu ( posX, posY, width, height, levelName, levelNum ) {
        const zonebtn = this.add.zone(posX, posY, width, height)
        zonebtn.setOrigin(0, 0)
        zonebtn.setInteractive();
        zonebtn.once('pointerdown', () => this.changeLevelAndRedirectToScene(levelName, levelNum, "menuScene"));
        //this.add.graphics().lineStyle(2, 0xff0000).strokeRectShape(zonebtn);
    }
    changeLevelAndRedirectToScene ( name, num, opt ) {
        if ( num != 0 ) {
            const menuSceneGame = new Menu();
            menuSceneGame.setLevelGame( name, num );
            mainSceneGame.setLevelCurrentGame( name, num );
        }

        this.scene.start(opt);
    }
    update () {}
}

const mainSceneGame = new MainScene();