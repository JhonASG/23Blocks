import { creationInstancesGame } from "../orderedBlocks.js";

export class Menu extends Phaser.Scene {
    constructor () {
        super("menuScene");
    }
    preload () {
        this.barPreLoadAssets(); //carga de assets

        this.load.image("winner", "../../img/you-win.png");
        this.load.image("gold-medal", "../../img/gold-medal.png");
        this.load.spritesheet("confetti", "../../img/Confetti.png", {
            frameWidth: 128,
            frameHeight: 128
        });
        this.load.image("bg", "../../img/bg-menu.jpg");
        this.load.image("menu", "../../img/menu.png");
        this.load.image("logo", "../../img/23blockstitle.png");
        this.load.image("kid", "../../img/nerd.png");
        this.load.image("background", "../../img/background.jpg");
        this.load.spritesheet("23blocks", "../../img/23blocks.png", {
            frameWidth: 91.166,
            frameHeight: 91.2
        });
        this.load.image("level-menu", "../../img/level-menu.png");
        this.load.image("controlKeyboard", "../../img/Player1.png");
        this.load.image("controlSwipe", "../../img/swipe.png");
        this.load.audio("music", "../../sounds/Blue_Space_v0_95.mp3");
    }
    create () {
        this.add.image(480, 320, "bg");
        this.add.image(400, 75, "logo");
        this.add.image(400, 300, "menu");
        this.add.image(680, 290, "kid");

        //BTN Start
        this.createZoneButtonsMenu( 248, 158, 300, 85, "gameScene" );

        //BTN Level
        this.createZoneButtonsMenu( 248, 256, 300, 85, "levelScene" );

        //BTN Controls
        this.createZoneButtonsMenu( 248, 356, 300, 85, "controlsScene" );
        
        this.add.text(480, 480, 
            "Level: " + level + "-" + levelName,
            {
                fontSize: 30,
                fontStyle: "bold",
                fill: "#008080",
            }
        );

        if ( musicCanStart ) {
            const soundtrack = this.sound.add("music"); 
            soundtrack.play({
                volume: 0.25,
                loop: true
            });

            musicCanStart = false;
        }

        creationInstancesGame();
    }
    barPreLoadAssets () {
        let progressBar = this.add.graphics();
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;
        const loadingTxt = this.add.text(
            (width / 2) -50,
            (height / 2) - 20,
            "Loading...",
            { 
                font: "bold 32px monospace", 
                fill: "#ffffff", 
                align: "center" 
            }
        );
        const percentTxt = this.add.text(
            width / 2,
            (height / 2) -180,
            "0%",
            { 
                font: "28px monospace", 
                fill: "#ffffff", 
                align: "center" 
            }
        );
        const assetTxt = this.add.text(
            (width / 2)-150,
            (height / 2) -100,
            "",
            { 
                font: "28px monospace", 
                fill: "#ffffff", 
                align: "center" 
            }
        );

        this.load.on("progress", function (value) {
            percentTxt.setText(parseInt(value * 100) + "%");
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(250, 280, 300 * value, 30);
        });

        this.load.on("fileprogress", function (file) {
            assetTxt.setText("Loading asset: " + file.key);
        });

        this.load.on("complete", function () {
            progressBar.destroy();
            loadingTxt.destroy();
            assetTxt.destroy();
            percentTxt.destroy();
        });
    }
    createZoneButtonsMenu ( posX, posY, width, height, scene ) {
        const zonebtn = this.add.zone(posX, posY, width, height)
        zonebtn.setOrigin(0, 0)
        zonebtn.setInteractive();
        zonebtn.once('pointerdown', () => this.redirectToScene(scene));
        //this.add.graphics().lineStyle(2, 0xff0000).strokeRectShape(zonebtn);
    }
    setLevelGame ( name, num ) {
        levelName = name;
        level = num;
    }
    redirectToScene ( opt ) {
        this.scene.start(opt);
    }
    update () {}
}

let levelName = "Easy";
let level = 1;
let musicCanStart = true;