class BlueberryBay extends dsj.backgroundBase {
    constructor() {
        super();
    }
    start() {
        const background = PIXI.Sprite.from(dsj.url + "scripts/backgrounds/BlueberryBay/assets/background.png");
        background.texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
        background.position.set(-160, -90);
        background.zIndex = -10;
        const waterGradient = PIXI.Sprite.from(dsj.url + "scripts/backgrounds/BlueberryBay/assets/watergradient.png");
        waterGradient.texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
        waterGradient.position.set(-160, -90);
        waterGradient.zIndex = 10;

        // TODO: Animate this
        const waterLoop = PIXI.Sprite.from(dsj.url + "scripts/backgrounds/BlueberryBay/assets/watergradient.png");
        waterLoop.texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
        waterLoop.position.set(-160, -90);
        waterLoop.zIndex = 0;
        this.container.addChild(background);
        this.container.addChild(waterLoop);
        this.container.addChild(waterGradient);
        this.container.sortChildren();
    }
}

dsj.backgrounds.BlueberryBay = new BlueberryBay();