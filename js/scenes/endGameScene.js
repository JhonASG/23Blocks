import { MainScene } from "./mainScene.js";

export class EndGame extends Phaser.Scene {
    constructor ( finalPositionCards, startPosCardX, startPosCardY) {
        super("winScene");
        this.finalPositionCards = finalPositionCards;
        this.startPosCardX = startPosCardX;
        this.startPosCardY = startPosCardY;
    }
    preload () {
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
    }
    create () {
        this.add.image(480, 320, "bg");
        this.add.image(400, 75, "logo");
        this.add.image(400, 450, "winner");
        this.add.image(280, 450, "gold-medal");
        this.add.image(515, 450, "gold-medal");
        
        this.drawingCards();
        this.animationConfetti();

        const backToMenu = this.add.zone(0, 0, 800, 530);
        backToMenu.setOrigin(0);
        backToMenu.setInteractive();
        backToMenu.once("pointerdown", () => this.redirectScene("menuScene"));
    }
    redirectScene (opt) {
        this.scene.start(opt);
    }
    animationConfetti () {
        const confetti1 = this.add.sprite(180, 450, "confetti");
        const confetti2 = this.add.sprite(620, 450, "confetti");

        this.anims.create({
            key:"confetti",
            frames: this.anims.generateFrameNumbers("confetti", {start: 0, end:56}),
            frameRate: 25,
            repeat: -1
        });

        confetti1.anims.play("confetti");
        confetti2.anims.play("confetti");
    }
    setValueDrawCards () {
        finalPositionCards = this.finalPositionCards;
        startPosCardX = this.startPosCardX;
        startPosCardY = this.startPosCardY;
    }
    drawingCards () {
        for (let i = 0; i < finalPositionCards.length; i++) {
            if (i % 8 == 0 && i > 7) {
                startPosCardX = 0;
                startPosCardY += 70;
            }

            this.add.sprite( 
                160 + ( startPosCardX * 68 ),
                startPosCardY, 
                "23blocks",
                finalPositionCards[i]
            ).setScale(0.75);

            startPosCardX++;
        }
    }
    update () {}
}

let finalPositionCards = [];
let startPosCardX = 0;
let startPosCardY = 0;