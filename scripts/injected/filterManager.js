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
PassionfruitBloomFilter.bloomScale = 0.5;

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

for (let i = 1; i <= 12; i++) {
    TransitionSFX.push(new Audio(dsj.url + `audio/glitches/medium_main_${(("" + i).length == 1 ? "0": "") + i}.wav`));
}

const filterConfig = {
    "filters": [
        [BlueberryBloomFilter, BlueberryAdjustmentFilter],
        [MangoBloomFilter, MangoAdjustmentFilter],
        [StarfruitBloomFilter, StarfruitAdjustmentFilter, StarfruitOldFilmFilter],
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

// Glitch
for (let i = 1; i <= 12; i++) {
    TransitionSFX.push(new Audio(dsj.url + `audio/glitches/medium_main_${(("" + i).length == 1 ? "0": "") + i}.wav`));
}
window.addEventListener("message", (data) => {
    if (data.data.isDSJ !== undefined && data.data.type == "teleport") {
        let zone = data.data.name;
        dsj.graphics.Game.filters = filterConfig.filters[filterConfig["Transition"]]
        let audio = TransitionSFX[Math.floor(Math.random()*TransitionSFX.length)];
        audio.volume = JSON.parse(localStorage.getItem("dredark_user_settings")).volume * 0.2;
        audio.play();
        setTimeout(() => {
            console.log("Changing filters for one " + zone + " which has the filters: ",filterConfig.filters[filterConfig[zone]] )
            dsj.graphics.Game.filters = filterConfig.filters[filterConfig[zone]]
        }, 300)
    }

});