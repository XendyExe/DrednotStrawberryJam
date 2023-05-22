"use strict";
var place = document.createElement("div");
place.innerHTML = `${chrome.runtime.getURL("")}`;
place.style.visibility='hidden';
place.id = "dsjURL";

var injector = document.createElement("script");
injector.src = chrome.runtime.getURL("scripts/superInjector.js");
var wshook = document.createElement("script");
wshook.src = chrome.runtime.getURL("scripts/injected/wshook.js");

var msg = document.createElement("script");
msg.src = chrome.runtime.getURL("scripts/libs/msgpack.js");
var pixi = document.createElement("script");
pixi.src = chrome.runtime.getURL("scripts/libs/pixi.js");
var pixif = document.createElement("script");
pixif.src = chrome.runtime.getURL("scripts/libs/pixi-filters.js");
var pixip = document.createElement("script");
pixip.src = chrome.runtime.getURL("scripts/libs/pixi-particles.js");

let sfxManager = document.createElement("script");
sfxManager.src = chrome.runtime.getURL("scripts/injected/sfxManager.js");

(document.head || document.documentElement).appendChild(place);

(document.head || document.documentElement).appendChild(sfxManager);
(document.head || document.documentElement).appendChild(wshook);
(document.head || document.documentElement).appendChild(pixi);
pixi.onload = function() { 
    (document.head || document.documentElement).appendChild(pixif);
    (document.head || document.documentElement).appendChild(pixip);
};
(document.head || document.documentElement).appendChild(msg);
(document.head || document.documentElement).appendChild(injector);
injector.onload = function() { this.remove(); };