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

        const TilingDiamonds = convertSpriteToTilingSprite(diamonds);
        const TilingArrows = convertSpriteToTilingSprite(arrows);
        this.container.addChild(background, TilingDiamonds, TilingArrows);
        this.container.sortChildren();
        TilingDiamonds.dsjNext = () => {TilingDiamonds.tilePosition.x += 1; setTimeout(TilingDiamonds.dsjNext, 50)}
        TilingArrows.dsjNext = () => {TilingArrows.tilePosition.x += 1; setTimeout(TilingArrows.dsjNext, 25)}
        TilingDiamonds.dsjNext();
        TilingArrows.dsjNext();
    }
}

dsj.backgrounds.KevinTechSpam = new KevinTechSpam();