this.PIXI=this.PIXI||{},function(t,i){"use strict";var e,s=function(){function i(i,e,s){this.value=i,this.time=e,this.next=null,this.isStepped=!1,this.ease=s?"function"==typeof s?s:t.ParticleUtils.generateEase(s):null}return i.createList=function(e){if("list"in e){var s=e.list,r=void 0,n=s[0],a=n.value,h=n.time,o=r=new i("string"==typeof a?t.ParticleUtils.hexToRGB(a):a,h,e.ease);if(s.length>2||2===s.length&&s[1].value!==a)for(var l=1;l<s.length;++l){var p=s[l],d=p.value,c=p.time;r.next=new i("string"==typeof d?t.ParticleUtils.hexToRGB(d):d,c),r=r.next}return o.isStepped=!!e.isStepped,o}var u=new i("string"==typeof e.start?t.ParticleUtils.hexToRGB(e.start):e.start,0);return e.end!==e.start&&(u.next=new i("string"==typeof e.end?t.ParticleUtils.hexToRGB(e.end):e.end,1)),u},i}(),r=i;function n(t){return e(t)}e=parseInt(/^(\d+)\./.exec(i.VERSION)[1],10)<5?r.Texture.fromImage:r.Texture.from,function(t){t.verbose=!1,t.DEG_TO_RADS=Math.PI/180,t.rotatePoint=function(i,e){if(i){i*=t.DEG_TO_RADS;var s=Math.sin(i),r=Math.cos(i),n=e.x*r-e.y*s,a=e.x*s+e.y*r;e.x=n,e.y=a}},t.combineRGBComponents=function(t,i,e){return t<<16|i<<8|e},t.normalize=function(i){var e=1/t.length(i);i.x*=e,i.y*=e},t.scaleBy=function(t,i){t.x*=i,t.y*=i},t.length=function(t){return Math.sqrt(t.x*t.x+t.y*t.y)},t.hexToRGB=function(t,i){var e;return i||(i={}),"#"===t.charAt(0)?t=t.substr(1):0===t.indexOf("0x")&&(t=t.substr(2)),8===t.length&&(e=t.substr(0,2),t=t.substr(2)),i.r=parseInt(t.substr(0,2),16),i.g=parseInt(t.substr(2,2),16),i.b=parseInt(t.substr(4,2),16),e&&(i.a=parseInt(e,16)),i},t.generateEase=function(t){var i=t.length,e=1/i;return function(s){var r=i*s|0,n=(s-r*e)*i,a=t[r]||t[i-1];return a.s+n*(2*(1-n)*(a.cp-a.s)+n*(a.e-a.s))}},t.getBlendMode=function(t){if(!t)return i.BLEND_MODES.NORMAL;for(t=t.toUpperCase();t.indexOf(" ")>=0;)t=t.replace(" ","_");return i.BLEND_MODES[t]||i.BLEND_MODES.NORMAL},t.createSteppedGradient=function(i,e){void 0===e&&(e=10),("number"!=typeof e||e<=0)&&(e=10);var r=new s(t.hexToRGB(i[0].value),i[0].time);r.isStepped=!0;for(var n=r,a=i[0],h=1,o=i[h],l=1;l<e;++l){for(var p=l/e;p>o.time;)a=o,o=i[++h];p=(p-a.time)/(o.time-a.time);var d=t.hexToRGB(a.value),c=t.hexToRGB(o.value),u={r:(c.r-d.r)*p+d.r,g:(c.g-d.g)*p+d.g,b:(c.b-d.b)*p+d.b};n.next=new s(u,l/e),n=n.next}return r}}(t.ParticleUtils||(t.ParticleUtils={}));var a=function(t,i){return(a=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,i){t.__proto__=i}||function(t,i){for(var e in i)i.hasOwnProperty(e)&&(t[e]=i[e])})(t,i)};function h(t,i){function e(){this.constructor=t}a(t,i),t.prototype=null===i?Object.create(i):(e.prototype=i.prototype,new e)}function o(t){return this.ease&&(t=this.ease(t)),(this.next.value-this.current.value)*t+this.current.value}function l(i){this.ease&&(i=this.ease(i));var e=this.current.value,s=this.next.value,r=(s.r-e.r)*i+e.r,n=(s.g-e.g)*i+e.g,a=(s.b-e.b)*i+e.b;return t.ParticleUtils.combineRGBComponents(r,n,a)}function p(t){for(this.ease&&(t=this.ease(t));t>this.next.time;)this.current=this.next,this.next=this.next.next;return t=(t-this.current.time)/(this.next.time-this.current.time),(this.next.value-this.current.value)*t+this.current.value}function d(i){for(this.ease&&(i=this.ease(i));i>this.next.time;)this.current=this.next,this.next=this.next.next;i=(i-this.current.time)/(this.next.time-this.current.time);var e=this.current.value,s=this.next.value,r=(s.r-e.r)*i+e.r,n=(s.g-e.g)*i+e.g,a=(s.b-e.b)*i+e.b;return t.ParticleUtils.combineRGBComponents(r,n,a)}function c(t){for(this.ease&&(t=this.ease(t));this.next&&t>this.next.time;)this.current=this.next,this.next=this.next.next;return this.current.value}function u(i){for(this.ease&&(i=this.ease(i));this.next&&i>this.next.time;)this.current=this.next,this.next=this.next.next;var e=this.current.value;return t.ParticleUtils.combineRGBComponents(e.r,e.g,e.b)}var m,f=function(){function t(t){void 0===t&&(t=!1),this.current=null,this.next=null,this.isColor=!!t,this.interpolate=null,this.ease=null}return t.prototype.reset=function(t){this.current=t,this.next=t.next,this.next&&this.next.time>=1?this.interpolate=this.isColor?l:o:t.isStepped?this.interpolate=this.isColor?u:c:this.interpolate=this.isColor?d:p,this.ease=this.current.ease},t}(),_=function(e){function s(t){var r=e.call(this)||this;return r.prevChild=r.nextChild=null,r.emitter=t,r.anchor.x=r.anchor.y=.5,r.velocity=new i.Point,r.rotationSpeed=0,r.rotationAcceleration=0,r.maxLife=0,r.age=0,r.ease=null,r.extraData=null,r.alphaList=new f,r.speedList=new f,r.speedMultiplier=1,r.acceleration=new i.Point,r.maxSpeed=NaN,r.scaleList=new f,r.scaleMultiplier=1,r.colorList=new f(!0),r._doAlpha=!1,r._doScale=!1,r._doSpeed=!1,r._doAcceleration=!1,r._doColor=!1,r._doNormalMovement=!1,r._oneOverLife=0,r.next=null,r.prev=null,r.init=r.init,r.Particle_init=s.prototype.init,r.update=r.update,r.Particle_update=s.prototype.update,r.Sprite_destroy=e.prototype.destroy,r.Particle_destroy=s.prototype.destroy,r.applyArt=r.applyArt,r.kill=r.kill,r}return h(s,e),s.prototype.init=function(){this.age=0,this.velocity.x=this.speedList.current.value*this.speedMultiplier,this.velocity.y=0,t.ParticleUtils.rotatePoint(this.rotation,this.velocity),this.noRotation?this.rotation=0:this.rotation*=t.ParticleUtils.DEG_TO_RADS,this.rotationSpeed*=t.ParticleUtils.DEG_TO_RADS,this.rotationAcceleration*=t.ParticleUtils.DEG_TO_RADS,this.alpha=this.alphaList.current.value,this.scale.x=this.scale.y=this.scaleList.current.value,this._doAlpha=!!this.alphaList.current.next,this._doSpeed=!!this.speedList.current.next,this._doScale=!!this.scaleList.current.next,this._doColor=!!this.colorList.current.next,this._doAcceleration=0!==this.acceleration.x||0!==this.acceleration.y,this._doNormalMovement=this._doSpeed||0!==this.speedList.current.value||this._doAcceleration,this._oneOverLife=1/this.maxLife;var i=this.colorList.current.value;this.tint=t.ParticleUtils.combineRGBComponents(i.r,i.g,i.b),this.visible=!0},s.prototype.applyArt=function(t){this.texture=t||i.Texture.EMPTY},s.prototype.update=function(i){if(this.age+=i,this.age>=this.maxLife||this.age<0)return this.kill(),-1;var e=this.age*this._oneOverLife;if(this.ease&&(e=4===this.ease.length?this.ease(e,0,1,1):this.ease(e)),this._doAlpha&&(this.alpha=this.alphaList.interpolate(e)),this._doScale){var s=this.scaleList.interpolate(e)*this.scaleMultiplier;this.scale.x=this.scale.y=s}if(this._doNormalMovement){var r=void 0,n=void 0;if(this._doSpeed){var a=this.speedList.interpolate(e)*this.speedMultiplier;t.ParticleUtils.normalize(this.velocity),t.ParticleUtils.scaleBy(this.velocity,a),r=this.velocity.x*i,n=this.velocity.y*i}else if(this._doAcceleration){var h=this.velocity.x,o=this.velocity.y;if(this.velocity.x+=this.acceleration.x*i,this.velocity.y+=this.acceleration.y*i,this.maxSpeed){var l=t.ParticleUtils.length(this.velocity);l>this.maxSpeed&&t.ParticleUtils.scaleBy(this.velocity,this.maxSpeed/l)}r=(h+this.velocity.x)/2*i,n=(o+this.velocity.y)/2*i}else r=this.velocity.x*i,n=this.velocity.y*i;this.position.x+=r,this.position.y+=n}if(this._doColor&&(this.tint=this.colorList.interpolate(e)),0!==this.rotationAcceleration){var p=this.rotationSpeed+this.rotationAcceleration*i;this.rotation+=(this.rotationSpeed+p)/2*i,this.rotationSpeed=p}else 0!==this.rotationSpeed?this.rotation+=this.rotationSpeed*i:this.acceleration&&!this.noRotation&&(this.rotation=Math.atan2(this.velocity.y,this.velocity.x));return e},s.prototype.kill=function(){this.emitter.recycle(this)},s.prototype.destroy=function(){this.parent&&this.parent.removeChild(this),this.Sprite_destroy(),this.emitter=this.velocity=this.colorList=this.scaleList=this.alphaList=this.speedList=this.ease=this.next=this.prev=null},s.parseArt=function(i){var e;for(e=i.length;e>=0;--e)"string"==typeof i[e]&&(i[e]=n(i[e]));if(t.ParticleUtils.verbose)for(e=i.length-1;e>0;--e)if(i[e].baseTexture!==i[e-1].baseTexture){window.console&&console.warn("PixiParticles: using particle textures from different images may hinder performance in WebGL");break}return i},s.parseData=function(t){return t},s}(i.Sprite),C=function(){function t(t){this.segments=[],this.countingLengths=[],this.totalLength=0,this.init(t)}return t.prototype.init=function(t){if(t&&t.length)if(Array.isArray(t[0]))for(var i=0;i<t.length;++i)for(var e=t[i],s=e[0],r=1;r<e.length;++r){var n=e[r];this.segments.push({p1:s,p2:n,l:0}),s=n}else for(s=t[0],i=1;i<t.length;++i){n=t[i];this.segments.push({p1:s,p2:n,l:0}),s=n}else this.segments.push({p1:{x:0,y:0},p2:{x:0,y:0},l:0});for(i=0;i<this.segments.length;++i){var a=this.segments[i],h=a.p1,o=a.p2,l=Math.sqrt((o.x-h.x)*(o.x-h.x)+(o.y-h.y)*(o.y-h.y));this.segments[i].l=l,this.totalLength+=l,this.countingLengths.push(this.totalLength)}},t.prototype.getRandomPoint=function(t){var i,e,s=Math.random()*this.totalLength;if(1===this.segments.length)i=this.segments[0],e=s;else for(var r=0;r<this.countingLengths.length;++r)if(s<this.countingLengths[r]){i=this.segments[r],e=0===r?s:s-this.countingLengths[r-1];break}e/=i.l||1;var n=i.p1,a=i.p2;t.x=n.x+e*(a.x-n.x),t.y=n.y+e*(a.y-n.y)},t}(),v=i;m=parseInt(/^(\d+)\./.exec(i.VERSION)[1],10)<5?v.ticker.shared:v.Ticker.shared;var x=new i.Point,y=function(){function e(t,i,e){this._currentImageIndex=-1,this._particleConstructor=_,this.particleImages=null,this.startAlpha=null,this.startSpeed=null,this.minimumSpeedMultiplier=1,this.acceleration=null,this.maxSpeed=NaN,this.startScale=null,this.minimumScaleMultiplier=1,this.startColor=null,this.minLifetime=0,this.maxLifetime=0,this.minStartRotation=0,this.maxStartRotation=0,this.noRotation=!1,this.minRotationSpeed=0,this.maxRotationSpeed=0,this.particleBlendMode=0,this.customEase=null,this.extraData=null,this._frequency=1,this.spawnChance=1,this.maxParticles=1e3,this.emitterLifetime=-1,this.spawnPos=null,this.spawnType=null,this._spawnFunc=null,this.spawnRect=null,this.spawnCircle=null,this.spawnPolygonalChain=null,this.particlesPerWave=1,this.particleSpacing=0,this.angleStart=0,this.rotation=0,this.ownerPos=null,this._prevEmitterPos=null,this._prevPosIsValid=!1,this._posChanged=!1,this._parent=null,this.addAtBack=!1,this.particleCount=0,this._emit=!1,this._spawnTimer=0,this._emitterLife=-1,this._activeParticlesFirst=null,this._activeParticlesLast=null,this._poolFirst=null,this._origConfig=null,this._origArt=null,this._autoUpdate=!1,this._currentImageIndex=-1,this._destroyWhenComplete=!1,this._completeCallback=null,this.parent=t,i&&e&&this.init(i,e),this.recycle=this.recycle,this.update=this.update,this.rotate=this.rotate,this.updateSpawnPos=this.updateSpawnPos,this.updateOwnerPos=this.updateOwnerPos}return Object.defineProperty(e.prototype,"orderedArt",{get:function(){return-1!==this._currentImageIndex},set:function(t){this._currentImageIndex=t?0:-1},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"frequency",{get:function(){return this._frequency},set:function(t){this._frequency="number"==typeof t&&t>0?t:1},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"particleConstructor",{get:function(){return this._particleConstructor},set:function(t){if(t!==this._particleConstructor){this._particleConstructor=t,this.cleanup();for(var i=this._poolFirst;i;i=i.next)i.destroy();this._poolFirst=null,this._origConfig&&this._origArt&&this.init(this._origArt,this._origConfig)}},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"parent",{get:function(){return this._parent},set:function(t){this.cleanup(),this._parent=t},enumerable:!0,configurable:!0}),e.prototype.init=function(e,r){if(e&&r){this.cleanup(),this._origConfig=r,this._origArt=e,e=Array.isArray(e)?e.slice():[e];var n=this._particleConstructor;this.particleImages=n.parseArt?n.parseArt(e):e,r.alpha?this.startAlpha=s.createList(r.alpha):this.startAlpha=new s(1,0),r.speed?(this.startSpeed=s.createList(r.speed),this.minimumSpeedMultiplier=("minimumSpeedMultiplier"in r?r.minimumSpeedMultiplier:r.speed.minimumSpeedMultiplier)||1):(this.minimumSpeedMultiplier=1,this.startSpeed=new s(0,0));var a=r.acceleration;a&&(a.x||a.y)?(this.startSpeed.next=null,this.acceleration=new i.Point(a.x,a.y),this.maxSpeed=r.maxSpeed||NaN):this.acceleration=new i.Point,r.scale?(this.startScale=s.createList(r.scale),this.minimumScaleMultiplier=("minimumScaleMultiplier"in r?r.minimumScaleMultiplier:r.scale.minimumScaleMultiplier)||1):(this.startScale=new s(1,0),this.minimumScaleMultiplier=1),r.color?this.startColor=s.createList(r.color):this.startColor=new s({r:255,g:255,b:255},0),r.startRotation?(this.minStartRotation=r.startRotation.min,this.maxStartRotation=r.startRotation.max):this.minStartRotation=this.maxStartRotation=0,r.noRotation&&(this.minStartRotation||this.maxStartRotation)?this.noRotation=!!r.noRotation:this.noRotation=!1,r.rotationSpeed?(this.minRotationSpeed=r.rotationSpeed.min,this.maxRotationSpeed=r.rotationSpeed.max):this.minRotationSpeed=this.maxRotationSpeed=0,this.rotationAcceleration=r.rotationAcceleration||0,this.minLifetime=r.lifetime.min,this.maxLifetime=r.lifetime.max,this.particleBlendMode=t.ParticleUtils.getBlendMode(r.blendMode),r.ease?this.customEase="function"==typeof r.ease?r.ease:t.ParticleUtils.generateEase(r.ease):this.customEase=null,n.parseData?this.extraData=n.parseData(r.extraData):this.extraData=r.extraData||null,this.spawnRect=this.spawnCircle=null,this.particlesPerWave=1,r.particlesPerWave&&r.particlesPerWave>1&&(this.particlesPerWave=r.particlesPerWave),this.particleSpacing=0,this.angleStart=0,this.parseSpawnType(r),this.frequency=r.frequency,this.spawnChance="number"==typeof r.spawnChance&&r.spawnChance>0?r.spawnChance:1,this.emitterLifetime=r.emitterLifetime||-1,this.maxParticles=r.maxParticles>0?r.maxParticles:1e3,this.addAtBack=!!r.addAtBack,this.rotation=0,this.ownerPos=new i.Point,this.spawnPos=new i.Point(r.pos.x,r.pos.y),this.initAdditional(e,r),this._prevEmitterPos=this.spawnPos.clone(),this._prevPosIsValid=!1,this._spawnTimer=0,this.emit=void 0===r.emit||!!r.emit,this.autoUpdate=!!r.autoUpdate,this.orderedArt=!!r.orderedArt}},e.prototype.initAdditional=function(t,i){},e.prototype.parseSpawnType=function(t){var e;switch(t.spawnType){case"rect":this.spawnType="rect",this._spawnFunc=this._spawnRect;var s=t.spawnRect;this.spawnRect=new i.Rectangle(s.x,s.y,s.w,s.h);break;case"circle":this.spawnType="circle",this._spawnFunc=this._spawnCircle,e=t.spawnCircle,this.spawnCircle=new i.Circle(e.x,e.y,e.r);break;case"ring":this.spawnType="ring",this._spawnFunc=this._spawnRing,e=t.spawnCircle,this.spawnCircle=new i.Circle(e.x,e.y,e.r),this.spawnCircle.minRadius=e.minR;break;case"burst":this.spawnType="burst",this._spawnFunc=this._spawnBurst,this.particleSpacing=t.particleSpacing,this.angleStart=t.angleStart?t.angleStart:0;break;case"point":this.spawnType="point",this._spawnFunc=this._spawnPoint;break;case"polygonalChain":this.spawnType="polygonalChain",this._spawnFunc=this._spawnPolygonalChain,this.spawnPolygonalChain=new C(t.spawnPolygon);break;default:this.spawnType="point",this._spawnFunc=this._spawnPoint}},e.prototype.recycle=function(t){t.next&&(t.next.prev=t.prev),t.prev&&(t.prev.next=t.next),t===this._activeParticlesLast&&(this._activeParticlesLast=t.prev),t===this._activeParticlesFirst&&(this._activeParticlesFirst=t.next),t.prev=null,t.next=this._poolFirst,this._poolFirst=t,t.parent&&t.parent.removeChild(t),--this.particleCount},e.prototype.rotate=function(i){if(this.rotation!==i){var e=i-this.rotation;this.rotation=i,t.ParticleUtils.rotatePoint(e,this.spawnPos),this._posChanged=!0}},e.prototype.updateSpawnPos=function(t,i){this._posChanged=!0,this.spawnPos.x=t,this.spawnPos.y=i},e.prototype.updateOwnerPos=function(t,i){this._posChanged=!0,this.ownerPos.x=t,this.ownerPos.y=i},e.prototype.resetPositionTracking=function(){this._prevPosIsValid=!1},Object.defineProperty(e.prototype,"emit",{get:function(){return this._emit},set:function(t){this._emit=!!t,this._emitterLife=this.emitterLifetime},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"autoUpdate",{get:function(){return this._autoUpdate},set:function(t){this._autoUpdate&&!t?m.remove(this.update,this):!this._autoUpdate&&t&&m.add(this.update,this),this._autoUpdate=!!t},enumerable:!0,configurable:!0}),e.prototype.playOnceAndDestroy=function(t){this.autoUpdate=!0,this.emit=!0,this._destroyWhenComplete=!0,this._completeCallback=t},e.prototype.playOnce=function(t){this.emit=!0,this._completeCallback=t},e.prototype.update=function(t){if(this._autoUpdate&&(t=t/i.settings.TARGET_FPMS/1e3),this._parent){var e,s,r,n,a;for(s=this._activeParticlesFirst;s;s=r)r=s.next,s.update(t);this._prevPosIsValid&&(n=this._prevEmitterPos.x,a=this._prevEmitterPos.y);var h=this.ownerPos.x+this.spawnPos.x,o=this.ownerPos.y+this.spawnPos.y;if(this._emit)for(this._spawnTimer-=t<0?0:t;this._spawnTimer<=0;){if(this._emitterLife>=0&&(this._emitterLife-=this._frequency,this._emitterLife<=0)){this._spawnTimer=0,this._emitterLife=0,this.emit=!1;break}if(this.particleCount>=this.maxParticles)this._spawnTimer+=this._frequency;else{var l=void 0;if(l=this.minLifetime===this.maxLifetime?this.minLifetime:Math.random()*(this.maxLifetime-this.minLifetime)+this.minLifetime,-this._spawnTimer<l){var p=void 0,d=void 0;if(this._prevPosIsValid&&this._posChanged){var c=1+this._spawnTimer/t;p=(h-n)*c+n,d=(o-a)*c+a}else p=h,d=o;e=0;for(var u=Math.min(this.particlesPerWave,this.maxParticles-this.particleCount);e<u;++e)if(!(this.spawnChance<1&&Math.random()>=this.spawnChance)){var m=void 0;this._poolFirst?(m=this._poolFirst,this._poolFirst=this._poolFirst.next,m.next=null):m=new this.particleConstructor(this),this.particleImages.length>1?-1!==this._currentImageIndex?(m.applyArt(this.particleImages[this._currentImageIndex++]),(this._currentImageIndex<0||this._currentImageIndex>=this.particleImages.length)&&(this._currentImageIndex=0)):m.applyArt(this.particleImages[Math.floor(Math.random()*this.particleImages.length)]):m.applyArt(this.particleImages[0]),m.alphaList.reset(this.startAlpha),1!==this.minimumSpeedMultiplier&&(m.speedMultiplier=Math.random()*(1-this.minimumSpeedMultiplier)+this.minimumSpeedMultiplier),m.speedList.reset(this.startSpeed),m.acceleration.x=this.acceleration.x,m.acceleration.y=this.acceleration.y,m.maxSpeed=this.maxSpeed,1!==this.minimumScaleMultiplier&&(m.scaleMultiplier=Math.random()*(1-this.minimumScaleMultiplier)+this.minimumScaleMultiplier),m.scaleList.reset(this.startScale),m.colorList.reset(this.startColor),this.minRotationSpeed===this.maxRotationSpeed?m.rotationSpeed=this.minRotationSpeed:m.rotationSpeed=Math.random()*(this.maxRotationSpeed-this.minRotationSpeed)+this.minRotationSpeed,m.rotationAcceleration=this.rotationAcceleration,m.noRotation=this.noRotation,m.maxLife=l,m.blendMode=this.particleBlendMode,m.ease=this.customEase,m.extraData=this.extraData,this.applyAdditionalProperties(m),this._spawnFunc(m,p,d,e),m.init(),this.addAtBack?this._parent.addChildAt(m,0):this._parent.addChild(m),this._activeParticlesLast?(this._activeParticlesLast.next=m,m.prev=this._activeParticlesLast,this._activeParticlesLast=m):this._activeParticlesLast=this._activeParticlesFirst=m,++this.particleCount,m.update(-this._spawnTimer)}}this._spawnTimer+=this._frequency}}if(this._posChanged&&(this._prevEmitterPos.x=h,this._prevEmitterPos.y=o,this._prevPosIsValid=!0,this._posChanged=!1),!this._emit&&!this._activeParticlesFirst){if(this._completeCallback){var f=this._completeCallback;this._completeCallback=null,f()}this._destroyWhenComplete&&this.destroy()}}},e.prototype.applyAdditionalProperties=function(t){},e.prototype._spawnPoint=function(t,i,e){this.minStartRotation===this.maxStartRotation?t.rotation=this.minStartRotation+this.rotation:t.rotation=Math.random()*(this.maxStartRotation-this.minStartRotation)+this.minStartRotation+this.rotation,t.position.x=i,t.position.y=e},e.prototype._spawnRect=function(i,e,s){this.minStartRotation===this.maxStartRotation?i.rotation=this.minStartRotation+this.rotation:i.rotation=Math.random()*(this.maxStartRotation-this.minStartRotation)+this.minStartRotation+this.rotation,x.x=Math.random()*this.spawnRect.width+this.spawnRect.x,x.y=Math.random()*this.spawnRect.height+this.spawnRect.y,0!==this.rotation&&t.ParticleUtils.rotatePoint(this.rotation,x),i.position.x=e+x.x,i.position.y=s+x.y},e.prototype._spawnCircle=function(i,e,s){this.minStartRotation===this.maxStartRotation?i.rotation=this.minStartRotation+this.rotation:i.rotation=Math.random()*(this.maxStartRotation-this.minStartRotation)+this.minStartRotation+this.rotation,x.x=Math.random()*this.spawnCircle.radius,x.y=0,t.ParticleUtils.rotatePoint(360*Math.random(),x),x.x+=this.spawnCircle.x,x.y+=this.spawnCircle.y,0!==this.rotation&&t.ParticleUtils.rotatePoint(this.rotation,x),i.position.x=e+x.x,i.position.y=s+x.y},e.prototype._spawnRing=function(i,e,s){var r=this.spawnCircle;this.minStartRotation===this.maxStartRotation?i.rotation=this.minStartRotation+this.rotation:i.rotation=Math.random()*(this.maxStartRotation-this.minStartRotation)+this.minStartRotation+this.rotation,r.minRadius!==r.radius?x.x=Math.random()*(r.radius-r.minRadius)+r.minRadius:x.x=r.radius,x.y=0;var n=360*Math.random();i.rotation+=n,t.ParticleUtils.rotatePoint(n,x),x.x+=this.spawnCircle.x,x.y+=this.spawnCircle.y,0!==this.rotation&&t.ParticleUtils.rotatePoint(this.rotation,x),i.position.x=e+x.x,i.position.y=s+x.y},e.prototype._spawnPolygonalChain=function(i,e,s){this.minStartRotation===this.maxStartRotation?i.rotation=this.minStartRotation+this.rotation:i.rotation=Math.random()*(this.maxStartRotation-this.minStartRotation)+this.minStartRotation+this.rotation,this.spawnPolygonalChain.getRandomPoint(x),0!==this.rotation&&t.ParticleUtils.rotatePoint(this.rotation,x),i.position.x=e+x.x,i.position.y=s+x.y},e.prototype._spawnBurst=function(t,i,e,s){0===this.particleSpacing?t.rotation=360*Math.random():t.rotation=this.angleStart+this.particleSpacing*s+this.rotation,t.position.x=i,t.position.y=e},e.prototype.cleanup=function(){var t,i;for(t=this._activeParticlesFirst;t;t=i)i=t.next,this.recycle(t),t.parent&&t.parent.removeChild(t);this._activeParticlesFirst=this._activeParticlesLast=null,this.particleCount=0},e.prototype.destroy=function(){var t;this.autoUpdate=!1,this.cleanup();for(var i=this._poolFirst;i;i=t)t=i.next,i.destroy();this._poolFirst=this._parent=this.particleImages=this.spawnPos=this.ownerPos=this.startColor=this.startScale=this.startAlpha=this.startSpeed=this.customEase=this._completeCallback=null},e}(),g=new i.Point,P=["pow","sqrt","abs","floor","round","ceil","E","PI","sin","cos","tan","asin","acos","atan","atan2","log"],w=new RegExp(["[01234567890\\.\\*\\-\\+\\/\\(\\)x ,]"].concat(P).join("|"),"g");var b=function(e){function s(t){var s=e.call(this,t)||this;return s.path=null,s.initialRotation=0,s.initialPosition=new i.Point,s.movement=0,s}return h(s,e),s.prototype.init=function(){this.initialRotation=this.rotation,this.Particle_init(),this.path=this.extraData.path,this._doNormalMovement=!this.path,this.movement=0,this.initialPosition.x=this.position.x,this.initialPosition.y=this.position.y},s.prototype.update=function(i){var e=this.Particle_update(i);if(e>=0&&this.path){if(this._doSpeed){var s=this.speedList.interpolate(e)*this.speedMultiplier;this.movement+=s*i}else{s=this.speedList.current.value*this.speedMultiplier;this.movement+=s*i}g.x=this.movement,g.y=this.path(this.movement),t.ParticleUtils.rotatePoint(this.initialRotation,g),this.position.x=this.initialPosition.x+g.x,this.position.y=this.initialPosition.y+g.y}return e},s.prototype.destroy=function(){this.Particle_destroy(),this.path=this.initialPosition=null},s.parseArt=function(t){return _.parseArt(t)},s.parseData=function(i){var e={};if(i&&i.path)try{e.path=function(t){for(var i=t.match(w),e=i.length-1;e>=0;--e)P.indexOf(i[e])>=0&&(i[e]="Math."+i[e]);return t=i.join(""),new Function("x","return "+t+";")}(i.path)}catch(i){t.ParticleUtils.verbose&&console.error("PathParticle: error in parsing path expression"),e.path=null}else t.ParticleUtils.verbose&&console.error("PathParticle requires a path string in extraData!"),e.path=null;return e},s}(_),S=function(t){function e(i){var e=t.call(this,i)||this;return e.textures=null,e.duration=0,e.framerate=0,e.elapsed=0,e.loop=!1,e}return h(e,t),e.prototype.init=function(){this.Particle_init(),this.elapsed=0,this.framerate<0&&(this.duration=this.maxLife,this.framerate=this.textures.length/this.duration)},e.prototype.applyArt=function(t){this.textures=t.textures,this.framerate=t.framerate,this.duration=t.duration,this.loop=t.loop},e.prototype.update=function(t){var e=this.Particle_update(t);if(e>=0){this.elapsed+=t,this.elapsed>=this.duration&&(this.loop?this.elapsed=this.elapsed%this.duration:this.elapsed=this.duration-1e-6);var s=this.elapsed*this.framerate+1e-7|0;this.texture=this.textures[s]||this.textures[this.textures.length-1]||i.Texture.EMPTY}return e},e.prototype.destroy=function(){this.Particle_destroy(),this.textures=null},e.parseArt=function(t){for(var e=[],s=0;s<t.length;++s){for(var r=t[s],a=e[s]={},h=a.textures=[],o=r.textures,l=0;l<o.length;++l){var p=o[l];if("string"==typeof p)h.push(n(p));else if(p instanceof i.Texture)h.push(p);else{var d=p.count||1;for(p="string"==typeof p.texture?n(p.texture):p.texture;d>0;--d)h.push(p)}}"matchLife"===r.framerate?(a.framerate=-1,a.duration=0,a.loop=!1):(a.loop=!!r.loop,a.framerate=r.framerate>0?r.framerate:60,a.duration=h.length/a.framerate)}return e},e}(_),R=function(t){function e(){var i=null!==t&&t.apply(this,arguments)||this;return i._firstChild=null,i._lastChild=null,i._childCount=0,i}return h(e,t),Object.defineProperty(e.prototype,"firstChild",{get:function(){return this._firstChild},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"lastChild",{get:function(){return this._lastChild},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"childCount",{get:function(){return this._childCount},enumerable:!0,configurable:!0}),e.prototype.addChild=function(){for(var t=[],i=0;i<arguments.length;i++)t[i]=arguments[i];if(t.length>1)for(var e=0;e<t.length;e++)this.addChild(t[e]);else{var s=t[0];s.parent&&s.parent.removeChild(s),s.parent=this,this.sortDirty=!0,s.transform._parentID=-1,this._lastChild?(this._lastChild.nextChild=s,s.prevChild=this._lastChild,this._lastChild=s):this._firstChild=this._lastChild=s,++this._childCount,this._boundsID++,this.onChildrenChange(),this.emit("childAdded",s,this,this._childCount),s.emit("added",this)}return t[0]},e.prototype.addChildAt=function(t,i){if(i<0||i>this._childCount)throw new Error("addChildAt: The index "+i+" supplied is out of bounds "+this._childCount);t.parent&&t.parent.removeChild(t),t.parent=this,this.sortDirty=!0,t.transform._parentID=-1;var e=t;if(this._firstChild)if(0===i)this._firstChild.prevChild=e,e.nextChild=this._firstChild,this._firstChild=e;else if(i===this._childCount)this._lastChild.nextChild=e,e.prevChild=this._lastChild,this._lastChild=e;else{for(var s=0,r=this._firstChild;s<i;)r=r.nextChild,++s;r.prevChild.nextChild=e,e.prevChild=r.prevChild,e.nextChild=r,r.prevChild=e}else this._firstChild=this._lastChild=e;return++this._childCount,this._boundsID++,this.onChildrenChange(i),t.emit("added",this),this.emit("childAdded",t,this,i),t},e.prototype.addChildBelow=function(t,i){if(i.parent!==this)throw new Error("addChildBelow: The relative target must be a child of this parent");return t.parent&&t.parent.removeChild(t),t.parent=this,this.sortDirty=!0,t.transform._parentID=-1,i.prevChild.nextChild=t,t.prevChild=i.prevChild,t.nextChild=i,i.prevChild=t,this._firstChild===i&&(this._firstChild=t),++this._childCount,this._boundsID++,this.onChildrenChange(),this.emit("childAdded",t,this,this._childCount),t.emit("added",this),t},e.prototype.addChildAbove=function(t,i){if(i.parent!==this)throw new Error("addChildBelow: The relative target must be a child of this parent");return t.parent&&t.parent.removeChild(t),t.parent=this,this.sortDirty=!0,t.transform._parentID=-1,i.nextChild.prevChild=t,t.nextChild=i.nextChild,t.prevChild=i,i.nextChild=t,this._lastChild===i&&(this._lastChild=t),++this._childCount,this._boundsID++,this.onChildrenChange(),this.emit("childAdded",t,this,this._childCount),t.emit("added",this),t},e.prototype.swapChildren=function(t,i){if(t!==i&&t.parent===this&&i.parent===this){var e=t,s=e.prevChild,r=e.nextChild;t.prevChild=i.prevChild,t.nextChild=i.nextChild,i.prevChild=s,i.nextChild=r,this._firstChild===t?this._firstChild=i:this._firstChild===i&&(this._firstChild=t),this._lastChild===t?this._lastChild=i:this._lastChild===i&&(this._lastChild=t),this.onChildrenChange()}},e.prototype.getChildIndex=function(t){for(var i=0,e=this._firstChild;e&&e!==t;)e=e.nextChild,++i;if(!e)throw new Error("The supplied DisplayObject must be a child of the caller");return i},e.prototype.setChildIndex=function(t,i){if(i<0||i>=this._childCount)throw new Error("The index "+i+" supplied is out of bounds "+this._childCount);if(t.parent!==this)throw new Error("The supplied DisplayObject must be a child of the caller");if(t.nextChild&&(t.nextChild.prevChild=t.prevChild),t.prevChild&&(t.prevChild.nextChild=t.nextChild),this._firstChild===t&&(this._firstChild=t.nextChild),this._lastChild===t&&(this._lastChild=t.prevChild),t.nextChild=null,t.prevChild=null,this._firstChild)if(0===i)this._firstChild.prevChild=t,t.nextChild=this._firstChild,this._firstChild=t;else if(i===this._childCount)this._lastChild.nextChild=t,t.prevChild=this._lastChild,this._lastChild=t;else{for(var e=0,s=this._firstChild;e<i;)s=s.nextChild,++e;s.prevChild.nextChild=t,t.prevChild=s.prevChild,t.nextChild=s,s.prevChild=t}else this._firstChild=this._lastChild=t;this.onChildrenChange(i)},e.prototype.removeChild=function(){for(var t=[],i=0;i<arguments.length;i++)t[i]=arguments[i];if(t.length>1)for(var e=0;e<t.length;e++)this.removeChild(t[e]);else{var s=t[0];if(s.parent!==this)return null;s.parent=null,s.transform._parentID=-1,s.nextChild&&(s.nextChild.prevChild=s.prevChild),s.prevChild&&(s.prevChild.nextChild=s.nextChild),this._firstChild===s&&(this._firstChild=s.nextChild),this._lastChild===s&&(this._lastChild=s.prevChild),s.nextChild=null,s.prevChild=null,--this._childCount,this._boundsID++,this.onChildrenChange(),s.emit("removed",this),this.emit("childRemoved",s,this)}return t[0]},e.prototype.getChildAt=function(t){if(t<0||t>=this._childCount)throw new Error("getChildAt: Index ("+t+") does not exist.");if(0===t)return this._firstChild;if(t===this._childCount)return this._lastChild;for(var i=0,e=this._firstChild;i<t;)e=e.nextChild,++i;return e},e.prototype.removeChildAt=function(t){var i=this.getChildAt(t);return i.parent=null,i.transform._parentID=-1,i.nextChild&&(i.nextChild.prevChild=i.prevChild),i.prevChild&&(i.prevChild.nextChild=i.nextChild),this._firstChild===i&&(this._firstChild=i.nextChild),this._lastChild===i&&(this._lastChild=i.prevChild),i.nextChild=null,i.prevChild=null,--this._childCount,this._boundsID++,this.onChildrenChange(t),i.emit("removed",this),this.emit("childRemoved",i,this,t),i},e.prototype.removeChildren=function(t,i){void 0===t&&(t=0),void 0===i&&(i=this._childCount);var e=t,s=i,r=s-e;if(r>0&&r<=s){for(var n=[],a=this._firstChild,h=0;h<=s&&a;++h,a=a.nextChild)h>=e&&n.push(a);var o=n[0].prevChild,l=n[n.length-1].nextChild;l?l.prevChild=o:this._lastChild=o,o?o.nextChild=l:this._firstChild=l;for(h=0;h<n.length;++h)n[h].parent=null,n[h].transform&&(n[h].transform._parentID=-1),n[h].nextChild=null,n[h].prevChild=null;this._boundsID++,this.onChildrenChange(t);for(h=0;h<n.length;++h)n[h].emit("removed",this),this.emit("childRemoved",n[h],this,h);return n}if(0===r&&0===this._childCount)return[];throw new RangeError("removeChildren: numeric values are outside the acceptable range.")},e.prototype.updateTransform=function(){var t,i;for(this._boundsID++,this.transform.updateTransform(this.parent.transform),this.worldAlpha=this.alpha*this.parent.worldAlpha,t=this._firstChild;t;t=i)i=t.nextChild,t.visible&&t.updateTransform()},e.prototype.calculateBounds=function(){var t,i;for(this._bounds.clear(),this._calculateBounds(),t=this._firstChild;t;t=i)if(i=t.nextChild,t.visible&&t.renderable)if(t.calculateBounds(),t._mask){var e=t._mask.maskObject||t._mask;e.calculateBounds(),this._bounds.addBoundsMask(t._bounds,e._bounds)}else t.filterArea?this._bounds.addBoundsArea(t._bounds,t.filterArea):this._bounds.addBounds(t._bounds);this._bounds.updateID=this._boundsID},e.prototype.getLocalBounds=function(t,e){void 0===e&&(e=!1);var s=i.DisplayObject.prototype.getLocalBounds.call(this,t);if(!e){var r=void 0,n=void 0;for(r=this._firstChild;r;r=n)n=r.nextChild,r.visible&&r.updateTransform()}return s},e.prototype.render=function(t){if(this.visible&&!(this.worldAlpha<=0)&&this.renderable)if(this._mask||this.filters&&this.filters.length)this.renderAdvanced(t);else{this._render(t);var i=void 0,e=void 0;for(i=this._firstChild;i;i=e)e=i.nextChild,i.render(t)}},e.prototype.renderAdvanced=function(t){t.batch.flush();var i,e,s=this.filters,r=this._mask;if(s){this._enabledFilters||(this._enabledFilters=[]),this._enabledFilters.length=0;for(var n=0;n<s.length;n++)s[n].enabled&&this._enabledFilters.push(s[n]);this._enabledFilters.length&&t.filter.push(this,this._enabledFilters)}for(r&&t.mask.push(this,this._mask),this._render(t),i=this._firstChild;i;i=e)e=i.nextChild,i.render(t);t.batch.flush(),r&&t.mask.pop(this),s&&this._enabledFilters&&this._enabledFilters.length&&t.filter.pop()},e.prototype.renderWebGL=function(t){if(this.visible&&!(this.worldAlpha<=0)&&this.renderable)if(this._mask||this.filters&&this.filters.length)this.renderAdvancedWebGL(t);else{this._renderWebGL(t);var i=void 0,e=void 0;for(i=this._firstChild;i;i=e)e=i.nextChild,i.renderWebGL(t)}},e.prototype.renderAdvancedWebGL=function(t){t.flush();var i,e,s=this._filters,r=this._mask;if(s){this._enabledFilters||(this._enabledFilters=[]),this._enabledFilters.length=0;for(var n=0;n<s.length;n++)s[n].enabled&&this._enabledFilters.push(s[n]);this._enabledFilters.length&&t.filterManager.pushFilter(this,this._enabledFilters)}for(r&&t.maskManager.pushMask(this,this._mask),this._renderWebGL(t),i=this._firstChild;i;i=e)e=i.nextChild,i.renderWebGL(t);t.flush(),r&&t.maskManager.popMask(this,this._mask),s&&this._enabledFilters&&this._enabledFilters.length&&t.filterManager.popFilter()},e.prototype.renderCanvas=function(t){if(this.visible&&!(this.worldAlpha<=0)&&this.renderable){var i,e;for(this._mask&&t.maskManager.pushMask(this._mask),this._renderCanvas(t),i=this._firstChild;i;i=e)e=i.nextChild,i.renderCanvas(t);this._mask&&t.maskManager.popMask(t)}},e}(i.Container);t.AnimatedParticle=S,t.Emitter=y,t.GetTextureFromString=n,t.LinkedListContainer=R,t.Particle=_,t.PathParticle=b,t.PolygonalChain=C,t.PropertyList=f,t.PropertyNode=s}(this.PIXI.particles=this.PIXI.particles||{},PIXI);
//# sourceMappingURL=pixi-particles.min.js.map