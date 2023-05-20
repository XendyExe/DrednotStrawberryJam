"use strict";
var gl = document.createElement("script");
gl.src = chrome.runtime.getURL("scripts/injected/xendyWebGL.js");
wshook.onload = function() { this.remove(); };
(document.head || document.documentElement).appendChild(gl);