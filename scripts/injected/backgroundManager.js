const vertexShader = `
  precision mediump float;
  attribute vec2 aVertexPosition;
  attribute vec2 aTextureCoord;
  uniform mat3 projectionMatrix;
  varying vec2 vTextureCoord;
  void main(void)
  {
      gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);
      vTextureCoord = aTextureCoord;
  }`;

const fragmentShader = `
varying vec2 vTextureCoord;
uniform sampler2D uSampler;
uniform vec3 chromaColor;
uniform float tolerance;

void main(void)
{
    vec4 color = texture2D(uSampler, vTextureCoord);
    float distance = length(chromaColor - color.rgb);
    
    if (distance < tolerance) {
        gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0); // Transparent pixel
    } else {
        gl_FragColor = color; // Non-transparent pixel
    }
}`;
const ChromaKeyFilter = new PIXI.Filter(vertexShader, fragmentShader);

const ChromaKeyConfig = {
    "colors": [
        new Float32Array([0.0, 0.0, 0.611764706]), // Freeport
        new Float32Array([0.0, 0.0, 0.407843137]), // Canary
        new Float32Array([0.0, 0.0, 0.278431373]), // Raven
    ],
    "Freeport I": 0,
    "Hummingbird": 0,
    "Freeport II": 0,
    "Finch": 0,
    "Freeport III": 0,
    "Sparrow": 0,
    "Canary": 1,
    "Vulture": 2,
    "The Pits": 2,
    "Raven": 2
}

ChromaKeyFilter.uniforms.chromaColor = ChromaKeyConfig.colors[0];
ChromaKeyFilter.uniforms.tolerance = 0.1;
dsj.graphics.drednot.filters = [ChromaKeyFilter];

const injectBackgrounds = () => {
    window.dsj.backgrounds = {};
    let bgbase = document.createElement("script");
    bgbase.src = dsj.url + "scripts/backgrounds/backgroundBase.js";
    bgbase.onload = () => {
        dsj.backgrounds = {}
        bgsrc_BlueberryBay = document.createElement("script");
        bgsrc_BlueberryBay.loaded = false;
        bgsrc_MangoMesa = document.createElement("script");
        bgsrc_MangoMesa.loaded = false;
        bgsrc_StarfruitSupernova = document.createElement("script");
        bgsrc_StarfruitSupernova.loaded = false;
        bgsrc_KevinTechSpam = document.createElement("script");
        bgsrc_KevinTechSpam.loaded = false;
        bgsrc_PassionfruitPantheon = document.createElement("script");
        bgsrc_PassionfruitPantheon.loaded = false;
        bgsrc_EATGIRL = document.createElement("script");
        bgsrc_EATGIRL.loaded = false;
        
        bgsrc_BlueberryBay.src = dsj.url + "scripts/backgrounds/BlueberryBay/script.js";
        bgsrc_MangoMesa.src = dsj.url + "scripts/backgrounds/MangoMesa/script.js";
        bgsrc_StarfruitSupernova.src = dsj.url + "scripts/backgrounds/StarfruitSupernova/script.js";
        bgsrc_KevinTechSpam.src = dsj.url + "scripts/backgrounds/KevinTechSpam/script.js";
        bgsrc_PassionfruitPantheon.src = dsj.url + "scripts/backgrounds/PassionfruitPantheon/script.js";
        bgsrc_EATGIRL.src = dsj.url + "scripts/backgrounds/EATGIRL/script.js";

        bgsrc_BlueberryBay.onload = () => bgsrc_BlueberryBay.loaded = true;
        bgsrc_MangoMesa.onload = () => bgsrc_MangoMesa.loaded = true;
        bgsrc_StarfruitSupernova.onload = () => bgsrc_StarfruitSupernova.loaded = true;
        bgsrc_KevinTechSpam.onload = () => bgsrc_KevinTechSpam.loaded = true;
        bgsrc_PassionfruitPantheon.onload = () => bgsrc_PassionfruitPantheon.loaded = true;
        bgsrc_EATGIRL.onload = () => bgsrc_EATGIRL.loaded = true;

        (document.head || document.documentElement).appendChild(bgsrc_BlueberryBay);
        (document.head || document.documentElement).appendChild(bgsrc_MangoMesa);
        (document.head || document.documentElement).appendChild(bgsrc_StarfruitSupernova);
        (document.head || document.documentElement).appendChild(bgsrc_KevinTechSpam);
        (document.head || document.documentElement).appendChild(bgsrc_PassionfruitPantheon);
        (document.head || document.documentElement).appendChild(bgsrc_EATGIRL);
        function checkLoaded() {
            if(!(
                    bgsrc_BlueberryBay.loaded &&
                    bgsrc_MangoMesa.loaded &&
                    bgsrc_StarfruitSupernova.loaded &&
                    bgsrc_KevinTechSpam.loaded &&
                    bgsrc_PassionfruitPantheon.loaded &&
                    bgsrc_EATGIRL.loaded
                ) 
                &&
                (
                    dsj.backgrounds.BlueberryBay === undefined &&
                    dsj.backgrounds.MangoMesa === undefined &&
                    dsj.backgrounds.StarfruitSupernova === undefined &&
                    dsj.backgrounds.PassionfruitPantheon === undefined &&
                    dsj.backgrounds.EATGIRL === undefined &&
                    dsj.backgrounds.KevinTechSpam === undefined
                )) {
               window.setTimeout(checkLoaded, 100); 
            } else {
              StartBackgrounds();
            }
        }
        checkLoaded();
    }
    (document.head || document.documentElement).appendChild(bgbase);
}

const StartBackgrounds = () => {
    const BackgroundConfig = {
        "bgs": [
            dsj.backgrounds.BlueberryBay,
            dsj.backgrounds.MangoMesa,
            dsj.backgrounds.StarfruitSupernova,
            dsj.backgrounds.PassionfruitPantheon,
            dsj.backgrounds.EATGIRL,
            dsj.backgrounds.KevinTechSpam
        ],
        "Freeport I": 0,
        "Hummingbird": 0,
        "Freeport II": 1,
        "Finch": 1,
        "Freeport III": 2,
        "Sparrow": 2,
        "Canary": 5,
        "Vulture": 3,
        "The Pits": 4,
        "Raven": 3
    }
    
    console.log("Starting backgrounds...");
    const backgroundContainer = new PIXI.Container();
    backgroundContainer.zIndex = -1000;
    dsj.graphics.Game.addChild(backgroundContainer);
    window.addEventListener("message", (data) => {
        if (data.data.isDSJ !== undefined && data.data.type == "teleport") {
            backgroundContainer.removeChildren();
            console.log(BackgroundConfig.bgs);
            backgroundContainer.addChild(BackgroundConfig.bgs[BackgroundConfig[data.data.name]].container);
            ChromaKeyFilter.uniforms.chromaColor = ChromaKeyConfig.colors[ChromaKeyConfig[data.data.name]];
        }
    });
}

injectBackgrounds();

/*

*/