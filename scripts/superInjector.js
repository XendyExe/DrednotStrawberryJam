window.dsj = {};

window.dsj.style = document.createElement("style");
window.dsj.url = document.getElementById("dsjURL").innerHTML;

window.dsj.blocksBrokenRequests = [];

window.waitForElm = (selector) => {
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

let musicManager = document.createElement("script");
musicManager.src = dsj.url + "scripts/injected/musicManager.js";

let pixiManager = document.createElement("script");
pixiManager.src = dsj.url + "scripts/injected/pixiManager.js";

let textureManager = document.createElement("script");
textureManager.src = dsj.url + "scripts/injected/textureManager.js";

let menuManager = document.createElement("script");
menuManager.src = dsj.url + "scripts/injected/menuManager.js";

// injection
(document.head || document.documentElement).appendChild(window.dsj.style);
(document.head || document.documentElement).appendChild(musicManager);
(document.head || document.documentElement).appendChild(pixiManager);
(document.head || document.documentElement).appendChild(textureManager);
// (document.head || document.documentElement).appendChild(menuManager);