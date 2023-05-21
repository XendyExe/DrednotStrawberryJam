const TextureConfig = {
    "paths": ["__CLEAR__", 
    // Blueberry Bay
    [
        ["BlueberryBay/tiles_overworld.png", "tiles_overworld.png"],
    ],
    // MangoMesa
    [
        ["MangoMesa/tiles_overworld.png", "tiles_overworld.png"],
    ],
    // Starfruit Supernova
    [
        ["StarfruitSupernova/tiles_overworld.png", "tiles_overworld.png"], 
    ],
    // Canary
    [
        ["Canary/tiles_overworld.png", "tiles_overworld.png"], 
    ],
    [
        ["Global/bg_gradient.png", "bg_gradient.png"], 
    ],
    [
        ["Pits/tiles_overworld.png", "tiles_overworld.png"], 
        ["Pits/loot_sign.png", "loot_sign.png"], 
        ["Pits/ball.svg", "ball.svg"], 
    ],
    [
        ["PassionfruitPantheon/tiles_overworld.png", "tiles_overworld.png"]
    ]
],
    "Freeport I": 1,
    "Hummingbird": 1,
    "Freeport II": 2,
    "Finch": 2,
    "Freeport III": 3,
    "Sparrow": 3,
    "Canary": 4,
    "Vulture": 7,
    "The Pits": 6,
    "Raven": 7,
    "__GLOBAL__": 5
}

let currentModIndex = 0;
const clearMods = () => {
    toggleUI('settings'); 
    document.querySelector("#new-ui-left > div > section:nth-child(5) > button").click(); 
    document.querySelector("#new-ui-left > div > button.btn-red").click(); 
    document.querySelector("body > div.modal-container > div > div:nth-child(2) > div > button.btn-green").click(); 
    document.querySelector("#new-ui-left > div > div.close > button").click()
};

const importMod = (index) => {
    if (currentModIndex == index) return;
    //log(`Loading images for mod: ${index}`);
    currentModIndex = index;
    let mod = TextureConfig["paths"][index];
    console.log(mod);
    clearMods();
    if (mod == "__CLEAR__") {
        return;
    }
    const dataTransfer = new DataTransfer();

    let blobs = [];
    mod.forEach((databits) => {
        let path = dsj.url + "mods/" + databits[0];
        console.log("path", path);
        let image = new Image()
        image.src = path;
        image.addEventListener('load', function() {
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
        
            canvas.width = image.width;
            canvas.height = image.height;
        
            // Draw the image onto the canvas
            context.drawImage(image, 0, 0);
        
            // Convert the canvas content to a Blob
            canvas.toBlob(function(blob) {
                dataTransfer.items.add(new File([blob], databits[1]));
            }, 'image/png'); // Specify the desired MIME type (e.g., image/jpeg for JPEG image)
        });
    });
    TextureConfig["paths"][TextureConfig["__GLOBAL__"]].forEach((databits) => {
        let path = dsj.url + "mods/" + databits[0];
        console.log("path", path);
        let image = new Image()
        image.src = path;
        image.addEventListener('load', function() {
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
        
            canvas.width = image.width;
            canvas.height = image.height;
        
            // Draw the image onto the canvas
            context.drawImage(image, 0, 0);
        
            // Convert the canvas content to a Blob
            canvas.toBlob(function(blob) {
                dataTransfer.items.add(new File([blob], databits[1]));
            }, 'image/png'); // Specify the desired MIME type (e.g., image/jpeg for JPEG image)
        });
    });
    let loop = () => {
        if (dataTransfer.items.length == mod.length + TextureConfig["paths"][TextureConfig["__GLOBAL__"]].length) {
            toggleUI('settings'); 
            document.querySelector("#new-ui-left > div > section:nth-child(5) > button").click();
            document.querySelector("#new-ui-left > div > div.file-pane").dispatchEvent(new DragEvent('drop', { dataTransfer }));
            document.querySelector("#new-ui-left > div > div.close > button").click();
            return;
        }
        setTimeout(loop, 100);
    }
    loop();
}

window.addEventListener("message", (data) => {
    if (data.data.isDSJ !== undefined && data.data.type == "teleport") {
        importMod(TextureConfig[data.data.name]);
    }
});