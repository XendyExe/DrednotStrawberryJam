class Background {
    constructor() {
        this.container = new PIXI.Container();
        this.container.zIndex = -100;
        this.start();
        this.resize();
        window.addEventListener('resize', this.resize.bind(this));
    }
    start() {

    }
    resize() {
        console.log("Reizing!")
        const scaleX = dsj.pixi.resizeTo.width / 320;
        const scaleY = dsj.pixi.resizeTo.height / 180;
        this.container.position.set(dsj.pixi.resizeTo.width/2, dsj.pixi.resizeTo.height/2);
        const scale = Math.max(scaleX, scaleY);
        this.container.scale.set(scale);
    }
}
window.dsj.backgroundBase = Background;
// 320 x 180