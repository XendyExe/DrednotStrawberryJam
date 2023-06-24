console.log("Connecting to kiryaclient unity...");
socket = new nativeWebSocket("ws://127.0.0.1:51420")

window.nyadata = (type, dat) => {
    socket.send(type+"[nyaa~][meow !!]"+dat)
}

socket.onopen = (event) => {
    nyadata("hello", "Extension side!");
};

window.getOverworldData = (index=-1) => {
    let world;
    if (index == -1) {
        for (let i = 0; i < 5; i++) {
            if (internals[20].input.repsocket.manager.worlds[i] !== undefined) {
                world = internals[20].input.repsocket.manager.worlds[i];
                break;
            }
        }
    }
    else {
        world = internals[20].input.repsocket.manager.worlds[index];
    }
    const width = world.block_w;
    const height = world.block_h;
    let data = [];
    /*
    thing[5][2]
    5 x
    */
    for (let x = 0; x < width; x++) {
        let w = [];
        for (let y = 0; y < height; y++) {
            w.push(world.map.get_material(x, y));
        }
        data.push({row:w});
    }
    console.log(world);
    const output = {
        "width": width,
        "height": height,
        "data": data
    }
    console.log(output);
    nyadata("world", JSON.stringify(output));
}

window.sendWorldData = () => {

}
  
var saveData = (function () {
    var a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";
    return function (data, fileName) {
        var json = JSON.stringify(data),
            blob = new Blob([json], {type: "octet/stream"}),
            url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = fileName;
        a.click();
        window.URL.revokeObjectURL(url);
    };
}());

window.saveCurrentScreen = () => {
    let blob = window.dsj.pixi.renderer.plugins.extract.image(window.dsj.pixi.stage).then((elm) => {saveData(atob(elm.src.replace("data:image/png;base64,", "")), "frame.png")});
}