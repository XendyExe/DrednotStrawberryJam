const random = (min, max) => {
    return Math.random() * (max - min) + min;
  }

class StarfruitSupernova extends dsj.backgroundBase {
    constructor() {
        super();
    }
    start() {
        const background = PIXI.Sprite.from(dsj.url + "scripts/backgrounds/StarfruitSupernova/assets/background.png");
        background.texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
        background.position.set(-160, -90);
        this.container.addChild(background);
        setTimeout(this.particles(), 1);
    }
    particles() {
        this.bigStarTexture = PIXI.Sprite.from(dsj.url + "scripts/backgrounds/StarfruitSupernova/assets/starBig.png").texture;
        this.bigStarTexture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
        this.stars(-160, 50, -1, 150);
        this.stars(0, 130, 1, 250);
    }

    stars(x, y, m, s) {
        const stars = new PIXI.ParticleContainer();
        this.container.addChild(stars);
        stars.position.set(x, y)
        const minyDrift = -20;
        const maxyDrift = 0;
        const bigStarFunction = () => {
            const particle = new PIXI.Sprite(this.bigStarTexture);
            particle.anchor.set(0.5);
            particle.position.set(-5, 0);
            const speed = random(0.3, 0.5);
            const sined = random(-1, 1)
            let currentX = -5;
            let yDrift = 0;
            stars.addChild(particle);
            const Render = () => {
                currentX += speed;
                yDrift += random(-0.5, 0.5);
                if(yDrift > maxyDrift) yDrift = maxyDrift;
                else if(yDrift < minyDrift) yDrift = minyDrift;
                particle.position.set(currentX, (m * (Math.pow(((5 * currentX) - s)/15, 2)/10) - 70) - (Math.sin(currentX/20)*20*sined) - yDrift);
                if (currentX < 320) { 
                    setTimeout(Render, 50);
                }
                else {
                    stars.removeChild(particle);
                }
            }
            Render();
        }
        const medStarFunction = () => {
            const particle = new PIXI.Sprite(this.bigStarTexture);
            particle.anchor.set(0.5);
            particle.position.set(-5, 0);
            particle.scale.set(0.5);
            const speed = random(0.4, 0.6);
            const sined = random(-1, 1)
            let currentX = -5;
            let yDrift = 0;
            stars.addChild(particle);
            const Render = () => {
                currentX += speed;
                yDrift += random(-0.5, 0.5);
                if(yDrift > maxyDrift) yDrift = maxyDrift;
                else if(yDrift < minyDrift) yDrift = minyDrift;
                particle.position.set(currentX, (m * (Math.pow(((5 * currentX) - s)/15, 2)/10) - 70) - (Math.sin(currentX/20)*20*sined) - yDrift);
                if (currentX < 320) { 
                    setTimeout(Render, 50);
                }
                else {
                    stars.removeChild(particle);
                }
            }
            Render();
        }
        const smallStarFunction = () => {
            const particle = new PIXI.Sprite(this.bigStarTexture);
            particle.anchor.set(0.5); // Set anchor point to the center of the particle
            particle.position.set(-5, 0); // Set initial position
            particle.scale.set(0.2);
            const speed = random(0.5, 1);
            const sined = random(-1.1, 1.1)
            let currentX = -5;
            let yDrift = 0;
            stars.addChild(particle);
            const Render = () => {
                currentX += speed;
                yDrift += random(-0.2, 0.2);
                if(yDrift > maxyDrift + 5) yDrift = maxyDrift;
                else if(yDrift < minyDrift - 5) yDrift = minyDrift;
                particle.position.set(currentX, (m * (Math.pow(((5 * currentX) - s)/15, 2)/10) - 70) - (Math.sin(currentX/20)*20*sined) - yDrift);
                if (currentX < 320) { 
                    setTimeout(Render, 50);
                }
                else {
                    stars.removeChild(particle);
                }
            }
            Render();
        }
        const summon = () => {
            let random = Math.random();
            if (random > 0.65) {
                setTimeout(bigStarFunction, 1);
            }
            else if (random > 0.35) {
                setTimeout(medStarFunction, 1);
            }
            else {
                setTimeout(smallStarFunction, 1);
            }
            setTimeout(summon, 1000);
        }
        summon();
    }
}

dsj.backgrounds.StarfruitSupernova = new StarfruitSupernova();

/* 
{
    "type": "movePath",
    "config": {
         "path": "pow(x/10, 2) / 2",
         "speed": {
             "list": [{value: 10, time: 0}, {value: 100, time: 0.25}, {value: 0, time: 1}],
         },
         "minMult": 0.8
    }
}

*/