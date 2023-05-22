class StarfruitSupernova extends dsj.backgroundBase {
    constructor() {
        super();
    }
    start() {
        const background = PIXI.Sprite.from(dsj.url + "scripts/backgrounds/StarfruitSupernova/assets/background.png");
        background.texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
        background.position.set(-160, -90);
        this.container.addChild(background);
    }
}

dsj.backgrounds.StarfruitSupernova = new StarfruitSupernova();