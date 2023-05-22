class KevinTechSpam extends dsj.backgroundBase {
    constructor() {
        super();
    }
    start() {
        const background = PIXI.Sprite.from(dsj.url + "scripts/backgrounds/KevinTechSpam/assets/background.png");
        background.texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
        background.position.set(-160, -90);
        background.zIndex = -10;

        // TODO: Animate these
        const diamonds = PIXI.Sprite.from(dsj.url + "scripts/backgrounds/KevinTechSpam/assets/diamonds.png");
        diamonds.texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
        diamonds.position.set(-160, -90);
        diamonds.zIndex = 0;
        const arrows = PIXI.Sprite.from(dsj.url + "scripts/backgrounds/KevinTechSpam/assets/arrows.png");
        arrows.texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
        arrows.position.set(-160, -90);
        arrows.zIndex = 10;
        this.container.addChild(background, diamonds, arrows);
        this.container.sortChildren();
    }
}

dsj.backgrounds.KevinTechSpam = new KevinTechSpam();