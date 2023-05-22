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

        const TilingCloud1 = convertSpriteToTilingSprite(clouds1);
        const TilingCloud2 = convertSpriteToTilingSprite(clouds2);
        const TilingCloud3 = convertSpriteToTilingSprite(clouds3);
        this.container.addChild(background, TilingCloud3, TilingCloud2, TilingCloud1, mountains);
        this.container.sortChildren();
        TilingCloud1.dsjNext = () => {TilingCloud1.tilePosition.x += 1; setTimeout(TilingCloud1.dsjNext, 200)}
        TilingCloud2.dsjNext = () => {TilingCloud2.tilePosition.x += 1; setTimeout(TilingCloud2.dsjNext, 400)}
        TilingCloud3.dsjNext = () => {TilingCloud3.tilePosition.x += 1; setTimeout(TilingCloud3.dsjNext, 600)}
        TilingCloud1.dsjNext();
        TilingCloud2.dsjNext();
        TilingCloud3.dsjNext();
    }   
}

dsj.backgrounds.PassionfruitPantheon = new PassionfruitPantheon();