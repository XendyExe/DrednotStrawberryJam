const InjectAllGraphicsScripts = () => {
    let backgroundManager = document.createElement("script");
    backgroundManager.src = dsj.url + "scripts/injected/backgroundManager.js";
    (document.head || document.documentElement).appendChild(backgroundManager);
}

const StartPIXI = (canvas) => {
    const dredCanvas = canvas;
    dredCanvas.style.visibility = "hidden";

    window.dsj.canvas = document.createElement("canvas");
    dredCanvas.parentNode.insertBefore(dsj.canvas, dredCanvas);

    window.dsj.pixi = new PIXI.Application({
        view: window.dsj.canvas,
        width:5000,
        height:5000,
        resizeTo: dredCanvas
    });
    dsj.graphics = {};
    dsj.graphics.Game = new PIXI.Container();
    dsj.graphics.drednot = PIXI.Sprite.from(dredCanvas);
    dsj.graphics.drednot.zIndex = 0;
    dsj.graphics.Game.addChild(dsj.graphics.drednot);
    dsj.pixi.stage.addChild(dsj.graphics.Game);
    dsj.pixi.ticker.add(() => {
        dsj.graphics.drednot.texture.update();
        dsj.graphics.drednot.zIndex = 0;
        dsj.graphics.Game.sortChildren();
    });
    InjectAllGraphicsScripts();
}
window.convertSpriteToTilingSprite = (sprite) => {
    const tilingSprite = new PIXI.TilingSprite(sprite.texture, 320, 180);
    tilingSprite.position.copyFrom(sprite.position);
    tilingSprite.scale.copyFrom(sprite.scale);
    tilingSprite.anchor.copyFrom(sprite.anchor);
    tilingSprite.blendMode = sprite.blendMode;
    tilingSprite.zIndex = sprite.zIndex;
    return tilingSprite;
}
waitForElm("#canvas-game").then((elm) => {
    StartPIXI(elm);
})

