class PassionfruitPantheon extends dsj.backgroundBase {
    constructor() {
        super();
    }
    start() {
        const background = PIXI.Sprite.from(dsj.url + "scripts/backgrounds/PassionfruitPantheon/assets/background.png");
        background.texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
        background.position.set(-160, -90);
        background.zIndex = -40;
        const mountains = PIXI.Sprite.from(dsj.url + "scripts/backgrounds/PassionfruitPantheon/assets/mountains.png");
        mountains.texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
        mountains.position.set(-160, -90);
        mountains.zIndex = 0;
        
        //TODO: Animate these
        const clouds1 = PIXI.Sprite.from(dsj.url + "scripts/backgrounds/PassionfruitPantheon/assets/clouds1loop.png");
        clouds1.texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
        clouds1.position.set(-160, -90);
        clouds1.zIndex = -10;
        const clouds2 = PIXI.Sprite.from(dsj.url + "scripts/backgrounds/PassionfruitPantheon/assets/clouds2loop.png");
        clouds2.texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
        clouds2.position.set(-160, -90);
        clouds2.zIndex = -20;
        const clouds3 = PIXI.Sprite.from(dsj.url + "scripts/backgrounds/PassionfruitPantheon/assets/clouds3loop.png");
        clouds3.texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
        clouds3.position.set(-160, -90);
        clouds3.zIndex = -30;
        this.container.addChild(background, clouds3, clouds2, clouds1, mountains);
        this.container.sortChildren();
    }
}

dsj.backgrounds.PassionfruitPantheon = new PassionfruitPantheon();