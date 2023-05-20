const dredCanvas = document.getElementById('canvas-game');
dredCanvas.style.visibility = 'hidden';

// Define the vertex shader code
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

// Define the fragment shader code for greenscreening
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
// Create a PIXI.Filter using the shader code
const GreenscreenFilterConfig = {
    "colors": [
        new Float32Array([0.0, 0.0, 0.611764706]), // Freeport
        new Float32Array([0.0, 0.0, 0.407843137]), // Canary
        new Float32Array([0.0, 0.0, 0.294117647]), // Raven
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
const GreenScreenFilter = new PIXI.Filter(vertexShader, fragmentShader);
GreenScreenFilter.uniforms.chromaColor = new Float32Array([0.0, 0.0, 0.611764706]); // Green color
GreenScreenFilter.uniforms.tolerance = 0.1; // Tolerance value (between 0 and 1)

// Blueberry Bay
const BlueberryBloomFilter = new PIXI.filters.AdvancedBloomFilter();
const BlueberryAdjustmentFilter = new PIXI.filters.AdjustmentFilter();
BlueberryBloomFilter.threshold = 0.9;
BlueberryBloomFilter.blur = 20;
BlueberryBloomFilter.quality = 10;
BlueberryBloomFilter.bloomScale = 0.75;

BlueberryAdjustmentFilter.gamma = 1.05;

// Mango Mesa
const MangoBloomFilter = new PIXI.filters.AdvancedBloomFilter();
const MangoAdjustmentFilter = new PIXI.filters.AdjustmentFilter();
MangoBloomFilter.threshold = 0.9;
MangoBloomFilter.blur = 10;
MangoBloomFilter.quality = 20;
MangoBloomFilter.bloomScale = 0.4;

MangoAdjustmentFilter.gamma = 1.05;

// Starfruit Supernova
const StarfruitBloomFilter = new PIXI.filters.AdvancedBloomFilter();
const StarfruitAdjustmentFilter = new PIXI.filters.AdjustmentFilter();
const StarfruitOldFilmFilter = new PIXI.filters.OldFilmFilter();
StarfruitBloomFilter.threshold = 0.8;
StarfruitBloomFilter.blur = 5;
StarfruitBloomFilter.quality = 10;
StarfruitBloomFilter.bloomScale = 0.5;

StarfruitAdjustmentFilter.gamma = 1.05;

StarfruitOldFilmFilter.sepia = 0;
StarfruitOldFilmFilter.noise = 0;
StarfruitOldFilmFilter.vignetting = 0.2;

// Canary
const CanaryAdjustmentFilter = new PIXI.filters.AdjustmentFilter();

CanaryAdjustmentFilter.contrast = 1.5;
CanaryAdjustmentFilter.gamma = 0.9;
// Pits
const PitsBloomFilter = new PIXI.filters.BloomFilter();
PitsBloomFilter.blur = 8;

// Passionfruit
const PassionfruitBloomFilter = new PIXI.filters.AdvancedBloomFilter();
PassionfruitBloomFilter.threshold = 0.75;
PassionfruitBloomFilter.blur = 13;
PassionfruitBloomFilter.quality = 20;
PassionfruitBloomFilter.bloomScale = 0.75;

// Transition
const TransitionAdjustmentFilter = new PIXI.filters.AdjustmentFilter();
const TransitionGlitchFilter = new PIXI.filters.GlitchFilter();
const TransitionPixelateFilter = new PIXI.filters.PixelateFilter();
const TransitionRGBSplitFilter = new PIXI.filters.RGBSplitFilter();
let TransitionSFX = []

TransitionAdjustmentFilter.saturation = 0.5;

TransitionGlitchFilter.seed = 0.313;
TransitionGlitchFilter.slices = 20;
TransitionGlitchFilter.offset = 200;

TransitionPixelateFilter.size.x = 10;
TransitionPixelateFilter.size.y = 10;

TransitionRGBSplitFilter.red.x = 20;
TransitionRGBSplitFilter.red.y = 20;
TransitionRGBSplitFilter.blue.x = -20;
TransitionRGBSplitFilter.blue.y = -20;

// Global
const GlobalDropShadowFilter = new PIXI.filters.DropShadowFilter();
GlobalDropShadowFilter.blur = 8;
GlobalDropShadowFilter.quality = 8;
GlobalDropShadowFilter.alpha = 0.4;
GlobalDropShadowFilter.distance = 40;
GlobalDropShadowFilter.rotation = 45;

for (let i = 1; i <= 12; i++) {
    TransitionSFX.push(new Audio(extensionPath + `audio/glitches/medium_main_${(("" + i).length == 1 ? "0": "") + i}.wav`));
}

const filterConfig = {
    "filters": [
        [BlueberryBloomFilter, BlueberryAdjustmentFilter, GlobalDropShadowFilter],
        [MangoBloomFilter, MangoAdjustmentFilter, GlobalDropShadowFilter],
        [StarfruitBloomFilter, StarfruitAdjustmentFilter, StarfruitOldFilmFilter, GlobalDropShadowFilter],
        [CanaryAdjustmentFilter],
        [PassionfruitBloomFilter],
        [PitsBloomFilter],
        [TransitionAdjustmentFilter, TransitionGlitchFilter, TransitionPixelateFilter, TransitionRGBSplitFilter]
    ],
    "Freeport I": 0,
    "Hummingbird": 0,
    "Freeport II": 1,
    "Finch": 1,
    "Freeport III": 2,
    "Sparrow": 2,
    "Canary": 3,
    "Vulture": 4,
    "The Pits": 5,
    "Raven": 4,
    "Transition": 6
}

const backgroundConfig = {
    "paths": [
        "BlueberryBay.png",
        "MangoMesa.png",
        "StarfruitSupernova.png",
        "PassionFruitPantheon.png",
        "Canary.png",
        "StarfruitSupernova.png",
        "PitsBG.png"
    ],
    "Freeport I": 0,
    "Hummingbird": 0,
    "Freeport II": 1,
    "Finch": 1,
    "Freeport III": 2,
    "Sparrow": 2,
    "Canary": 4,
    "Vulture": 3,
    "The Pits": 6,
    "Raven": 3
}
let backgroundSprites = []
backgroundConfig.paths.forEach((element) => {
    let sprite = PIXI.Sprite.from(extensionPath + "mods/Backgrounds/" + element);
    sprite.scale.set(1);
    sprite.zIndex = 0;
    sprite.anchor.set(0.5);
    sprite.x = dredCanvas.width/2;
    sprite.y = dredCanvas.height/2;
    sprite.texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
    backgroundSprites.push(sprite);
})


const canvas = document.createElement('canvas');
document.getElementById("game-container").appendChild(canvas);
canvas.id = "xendysContainer";

const gl = dredCanvas.getContext('webgl');


const app = new PIXI.Application({
    view: document.getElementById("xendysContainer"),
    width:5000,
    height:5000,
    resizeTo: dredCanvas
});

const greenScreen = document.createElement('canvas');
const gctx = greenScreen.getContext('2d');

const game = new PIXI.Container();
const backgroundContainer = new PIXI.Container();
const dred = PIXI.Sprite.from(dredCanvas);
const dredRenderer = PIXI.Sprite.from(dred.texture.baseTexture.resource.source);
dredRenderer.filters = [GreenScreenFilter];
dred.scale.set(0.5);

dred.zIndex = 100;


window.filterTeleport = (index) => {
    log("Changing filter to " + index);
    game.filters = filterConfig.filters[filterConfig["Transition"]]
    let audio = TransitionSFX[Math.floor(Math.random()*TransitionSFX.length)];
    audio.volume = JSON.parse(localStorage.getItem("dredark_user_settings")).volume * 0.2;
    GreenScreenFilter.uniforms.chromaColor = GreenscreenFilterConfig.colors[GreenscreenFilterConfig[index]];
    audio.play();
    setTimeout(() => {
        game.filters = filterConfig.filters[filterConfig[index]]
        backgroundContainer.removeChildren();
        backgroundContainer.addChild(backgroundSprites[backgroundConfig[index]]);
    }, 300)
}
game.addChild(backgroundContainer);
game.addChild(dredRenderer);
app.stage.addChild(game);

app.ticker.add(() => {
    dred.texture.update();
    
    TransitionGlitchFilter.refresh();

    backgroundConfig.zIndex = 0;
    dredRenderer.zIndex = 100;
    game.sortChildren();
  });
  