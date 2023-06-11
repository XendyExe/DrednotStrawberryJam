class Background {
    constructor() {
        this.container = new PIXI.Container();
        this.container.zIndex = -100;
        this.start();
        this.resize();
        PIXI.Ticker.shared.add((delta) => {
            this.resize();
        });
    }
    start() {
    }
    resize() {
        let scaleX = dsj.pixi.resizeTo.width / 320;
        let scaleY = dsj.pixi.resizeTo.height / 180;
        if (internals !== null) {
            let superX = (((internals[19].graphics.cam_scale/3) - 1)/4)+1;
            let superY = (((internals[19].graphics.cam_scale/3) - 1)/4)+1;
            scaleX *= superX;
            scaleY *= superY;
        }
        this.container.position.set(dsj.pixi.resizeTo.width/2, dsj.pixi.resizeTo.height/2);
        const scale = Math.max(scaleX, scaleY);
        this.container.scale.set(scale);
    }
}
window.dsj.backgroundBase = Background;
// 320 x 180