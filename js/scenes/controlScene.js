export class Controls extends Phaser.Scene {
    constructor() {
        super("controlsScene");
    }
    preload () {}
    create () {
        this.add.image(480, 320, "bg");
        this.add.image(400, 75, "logo");
        this.add.image(230, 320, "controlKeyboard");
        this.add.image(620, 320, "controlSwipe");

        const backToMenu = this.add.zone(0, 0, 800, 530);
        backToMenu.setOrigin(0, 0);
        backToMenu.setInteractive();
        backToMenu.once("pointerdown", () => this.redirectToScene("menuScene"));
    }
    redirectToScene (scene) {
        this.scene.start(scene);
    }
    update () {}
}