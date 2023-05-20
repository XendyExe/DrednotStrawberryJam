"use strict";
const songConfig = {
    "paths": ["audio/FP1.mp3", "audio/Hummingbird.mp3", 
              "audio/FP2.mp3", "audio/Finch.mp3", 
              "audio/FP3.mp3", "audio/Sparrow.mp3", 
              "audio/Canary.mp3", "audio/Vulture.mp3", "audio/Pits.mp3"],
    "Freeport I": 0,
    "Hummingbird": 1,
    "Freeport II": 2,
    "Finch": 3,
    "Freeport III": 4,
    "Sparrow": 5,
    "Canary": 6,
    "Vulture": 7,
    "The Pits": 8,
    "Raven": 7
}
const styleConfig = {
    "Styles": [
        // Blueberry bay
        `
        .dark {
            background:rgba(83,119,130,.9)!important;
        }
        `,
        // Mango mesa
        `
        .dark{
            background:rgba(153, 89, 17,.9)!important;
        }
        `,
        // Starfruit Supernova
        `
        .dark {
            background:rgba(89,23,100,.9)!important;
        }
        `,
        // Passionfruit Pantheon
    ],
    "Freeport I": 0,
    "Hummingbird": 0,
    "Freeport II": 1,
    "Finch": 1,
    "Freeport III": 2,
    "Sparrow": 2,
    "Canary": 2,
    "Vulture": 2,
    "The Pits": 2,
    "Raven": 2
}
const modConfig = {
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
document.querySelector("head > style").innerHTML = document.querySelector("head > style").innerHTML.replace("background:rgba(25,35,45,.9)!important", "background:rgba(25,35,45,.9)");

let indexPlaying = 5;
let targetIndex = 5;
let startedPlaying = false;
let music = [];
let volume = parseFloat(localStorage.getItem("Xendy_MusicVolume"));
if (volume == null) {
    volume = 0.5;
    localStorage.setItem("Xendy_MusicVolume", volume);
}
let focusVolume = 1;
let focusState = true;
let unfocusing = false;
let focusing = false;
window.extensionPath = document.getElementById("extensionPath").innerHTML;
window.log = (message) => {
    console.log(`%c[Xendy's QOL++ !]%c ${message}`, 'color: #2C062E; font-size: 15; font-weight: bold;font-family: sans-serif', 'color: #2C062E; font-size: 15; font-family: sans-serif');
    try {
    sendChatMessage(message, "Xendy's QOL++ !", "F8C8DC");
    } catch{}
}

songConfig.paths.forEach((element) => {
    let audio = new Audio(extensionPath + element);
    audio.loop = true;
    audio.internalVolume = 1;
    music.push(audio); 
});
// The audio functions
window.changeVolume = (vol) => {
    volume = vol;
    music.forEach((element) => (updateVolume(element)));
}
let updateVolume = (audio) => {
    try {
        audio.volume = audio.internalVolume * volume * focusVolume;
    }
    catch (DOMException) { }
}
let resetAudio = (audio, index) => {
    if (targetIndex != index) {
        log("Reset audio for " + songConfig.paths[index])
        audio.currentTime = 0;
        audio.pause();
    }
}
let play = (audio, index) => {
    indexPlaying = index;
    audio.internalVolume = 1;
    updateVolume(audio);
    log("Playing " + songConfig.paths[index]);
    audio.play().catch(e => {
        window.addEventListener('click', () => {
            audio.play()
        }, { once: true })
    })
};
let fadeOut = (audio, fadeOutIndex, onFinished) => {
    if (audio.internalVolume > 0 && fadeOutIndex != targetIndex) {
        try {
            audio.internalVolume -= 0.02;
            updateVolume(audio);
            setTimeout(fadeOut, 10, audio, fadeOutIndex, onFinished);
        }
        catch (DOMException) {
            audio.internalVolume = 0;
            updateVolume(audio);
            setTimeout(resetAudio, 5000, audio, fadeOutIndex);
            onFinished();
        }
    }
    else if (fadeOutIndex == targetIndex) {
        try {
            audio.internalVolume += 0.04;
            updateVolume(audio);
            setTimeout(fadeOut, 10, audio, fadeOutIndex, onFinished);
        }
        catch (DOMException) {
            audio.internalVolume = 1;
            updateVolume(audio);
        }
    }
    else {
        setTimeout(resetAudio, 5000, audio, fadeOutIndex);
        audio.internalVolume = 0;
        updateVolume(audio);
        onFinished();
    }
};
let onSwitch = (index) => {
    if (startedPlaying) {
        if (indexPlaying == index) {
            targetIndex = index;
        }
        else {
            targetIndex=index; 
            fadeOut(music[indexPlaying], indexPlaying,
            () => {
                play(music[targetIndex], targetIndex);
            })
        }
    }
    else {
        log("Started music!");
        targetIndex = index;
        play(music[targetIndex], targetIndex);
        startedPlaying = true;
    }
}
// Mainloop
window.Update = () => {
    if (document.hasFocus() && focusVolume < 1) {
        focusVolume += 0.01;
        if (focusVolume >= 1) focusVolume = 1;
        music.forEach((element) => (updateVolume(element)));
    }
    else if (!document.hasFocus() && focusVolume > 0) {
        focusVolume -= 0.01;
        if (focusVolume <= 0) focusVolume = 0;
        music.forEach((element) => (updateVolume(element)));
    }
    setTimeout(Update, 0.02);
} 
// chat
window.processCommand = function(data) {
    let args = data.split(" ");
    let command = args[0];
    args.shift();
    log("Processing command " + args)
    log(data);
    if (command.toLowerCase() == "teleport"){
        let zone = "";
        try {
            zone = args.join(" ").trim();
        }
        catch {
            zone = args;
        }
        onSwitch(songConfig[zone]);
        window.importMod(modConfig[zone]);
        window.filterTeleport(zone);
        document.getElementById("XendyStyle").innerHTML = styleConfig["Styles"][styleConfig[zone]];
    }
    else {
        window.sendChatMessage(`Unknown command "${command}"`);
    }
}

let theWs;
let WorldID = -1;
const nativeWebSocket = window.WebSocket;
window.WebSocket = function(...args) {
    let ws = new nativeWebSocket(...args);
    if (!ws.url.includes(":4000")) {
        ws.addEventListener("open", () => {
            window.postMessage({message: "sdt-wsStatus", status: true}, window.location.origin);
            theWs = ws;
            theWs.send = (rawData, passed=false) => {
                if (!passed) {
                    let data = msgpack.decode(rawData)
                    if (data.type == 1) {
                        if (data.msg.substring(0, 1) == "/" && data.msg != "/save") {
                            log(data.msg.substring(1));
                            window.processCommand(data.msg.substring(1));
                        }
                        else {
                            nativeWebSocket.prototype.send.apply(ws, [rawData]);
                        }
                    }
                    else {
                        nativeWebSocket.prototype.send.apply(ws, [rawData]);
                    }
                }
            };
            theWs.addEventListener("close", () => {
                window.postMessage({message: "sdt-wsStatus", status: false}, window.location.origin);
            });
        });
        ws.addEventListener("message", (event) => {
            let data = msgpack.decode(event.data);
            if (data.type == 16) {
                WorldID = data.world;
                console.log("WORLD ID: " + WorldID);
            }
            else if (data.type == 12) {
                if (data.is_overworld && data.name != "" && ! data.removed) {
                    console.log(data);
                    onSwitch(songConfig[data.name]);
                    window.importMod(modConfig[data.name]);
                    window.filterTeleport(data.name);
                    document.getElementById("XendyStyle").innerHTML = styleConfig["Styles"][styleConfig[data.name]];
                }
                else if (data.removed === true) {
                }
                else {
                    
                }
            }
            else if(data.type != 9) {
                //console.log(data);
            }
        })
        window.WebSocket = nativeWebSocket;
    }
    return ws;
};

window.addEventListener("message", (event) => {
    if (event.origin !== window.location.origin)
        return;
    if (event.data.message == "sdt-sendToWs") {
        if (!theWs) return;
        theWs.send(event.data.wsData);
    }
});

window.sendChatMessage = function(message, header="Logger", color="F00") {
    let chat = document.getElementById("chat-content");
    let node = document.createElement("p");
    node.innerHTML = `<b>[<span style="color: #${color}">${header}</span>]: ${message}</b>`;
    node.className = "recent";
    let index = chat.children.length;
    chat.appendChild(node);
    setTimeout(() => node.className = "", 10000);
}

function waitForElm(selector) {
    return new Promise(resolve => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        }

        const observer = new MutationObserver(mutations => {
            if (document.querySelector(selector)) {
                resolve(document.querySelector(selector));
                observer.disconnect();
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
}

let sliderLastValue = 0;
let opened = false;
let finalizedSelected = false;
let selected = () => {
    window.sfx = document.querySelector("#new-ui-left > div > section:nth-child(4) > p > b");
    window.sfx.innerHTML = "SFX:";
    window.section = document.querySelector("#new-ui-left > div > section:nth-child(4)");
    let node = document.createElement("p");
    node.innerHTML = `<b>Music:</b> <input type="range" step="0.01" min="0" max="1" style="vertical-align: middle;" id="volumeSlider"> <div style="display: inline" id="volumeText">tbd</div>`;
    node.id = "musicVolume";
    node.value = volume;
    window.section.appendChild(node);
    document.getElementById("volumeText").innerHTML = `${node.value * 100}%`;

    let slider = document.getElementById("volumeSlider");
    slider.value = volume;
    sliderLastValue = volume;
    setTimeout(() => opened=false, 0.5);
    finalizedSelected = true;
}

setTimeout(window.Update, 0.01);
opened = true;
waitForElm('#new-ui-left > div > section:nth-child(4) > p > b').then((elm) => {
    selected();
});

let loopUI = () => {
    if (document.querySelector("#new-ui-left").children.length === 0 && !opened) {
        opened = true;
        finalizedSelected = false;
        waitForElm('#new-ui-left > div > section:nth-child(4) > p > b').then((elm) => {
            selected();
        });
    }
    setTimeout(loopUI, 0.01);
}
setTimeout(loopUI, 0.01);

let UpdateUI = () => {
    if (document.querySelector("#new-ui-left").children.length !== 0 && document.querySelector("#new-ui-left > div > h2").innerHTML == "Settings" && finalizedSelected) 
    {
        let slider = document.getElementById("volumeSlider");
        if (sliderLastValue != slider.value){
            volume = slider.value;
            sliderLastValue = slider.value;
            window.changeVolume(slider.value);
            localStorage.setItem("Xendy_MusicVolume", volume);
            document.getElementById("volumeText").innerHTML = `${slider.value * 100}%`;
        }
        if (document.querySelector(("#new-ui-left > div > section:nth-child(4)")).children.length > 3) {
            document.querySelector(("#new-ui-left > div > section:nth-child(4)")).removeChild(document.querySelector("#new-ui-left > div > section:nth-child(4)").lastChild);
        }
    }
    setTimeout(UpdateUI, 0.01);
}
setTimeout(UpdateUI, 0.01);
let currentModIndex = 0;
window.clearMods = () => {toggleUI('settings'); document.querySelector("#new-ui-left > div > section:nth-child(5) > button").click(); document.querySelector("#new-ui-left > div > button.btn-red").click(); document.querySelector("body > div.modal-container > div > div:nth-child(2) > div > button.btn-green").click(); document.querySelector("#new-ui-left > div > div.close > button").click()};
window.importMod = (index) => {
    if (currentModIndex == index) return;
    log(`Loading images for mod: ${index}`);
    currentModIndex = index;
    let mod = modConfig["paths"][index];
    console.log(mod);
    window.clearMods();
    if (mod == "__CLEAR__") {
        return;
    }
    const dataTransfer = new DataTransfer();

    let blobs = [];
    mod.forEach((databits) => {
        let path = extensionPath + "mods/" + databits[0];
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
    modConfig["paths"][modConfig["__GLOBAL__"]].forEach((databits) => {
        let path = extensionPath + "mods/" + databits[0];
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
        if (dataTransfer.items.length == mod.length + modConfig["paths"][modConfig["__GLOBAL__"]].length) {
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
