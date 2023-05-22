class MangoMesa extends dsj.backgroundBase {
    constructor() {
        super();
    }
    start() {
        const foreground = PIXI.Sprite.from(dsj.url + "scripts/backgrounds/MangoMesa/assets/foreground.png");
        foreground.texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
        foreground.position.set(-160, -90);
        foreground.zIndex = 10;
        const clouds = PIXI.Sprite.from(dsj.url + "scripts/backgrounds/MangoMesa/assets/cloudsloop.png");
        clouds.texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
        clouds.position.set(-160, -90);
        clouds.zIndex = 0;
        const sky = PIXI.Sprite.from(dsj.url + "scripts/backgrounds/MangoMesa/assets/skyloop.png");
        sky.texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
        sky.position.set(-160, -90);
        sky.zIndex = -10;
        this.container.addChild(foreground, clouds, sky);
        this.container.sortChildren();
    }
}

dsj.backgrounds.MangoMesa = new MangoMesa();