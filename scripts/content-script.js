"use strict";
var place = document.createElement("div");
place.innerHTML = `${chrome.runtime.getURL("")}`;
place.style.visibility='hidden';
place.id = "extensionPath";
var wshook = document.createElement("script");
wshook.src = chrome.runtime.getURL("scripts/injected/wshook.js");
var sfxModder = document.createElement("script");
sfxModder.src = chrome.runtime.getURL("scripts/injected/sfxmodder.js");

var style = document.createElement("style");
style.id = "XendyStyle";

var msg = document.createElement("script");
msg.src = chrome.runtime.getURL("scripts/libs/msgpack.js");
var pixi = document.createElement("script");
pixi.src = chrome.runtime.getURL("scripts/libs/pixi.js");
var pixif = document.createElement("script");
pixif.src = chrome.runtime.getURL("scripts/libs/pixi-filters.js");
wshook.onload = function() { this.remove(); };
(document.head || document.documentElement).appendChild(pixi);
(document.head || document.documentElement).appendChild(pixif);
(document.head || document.documentElement).appendChild(msg);
(document.head || document.documentElement).appendChild(place);
(document.head || document.documentElement).appendChild(style);
(document.head || document.documentElement).appendChild(wshook);
(document.head || document.documentElement).appendChild(sfxModder);