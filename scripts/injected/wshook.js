let bufferedData = {}
let hexa = {
    "0": 0,
    "1": 1,
    "2": 2,
    "3": 3,
    "4": 4,
    "5": 5,
    "6": 6,
    "7": 7,
    "8": 8,
    "9": 9,
    "A": 10,
    "B": 11,
    "C": 12,
    "D": 13,
    "E": 14,
    "F": 15
}

let hexArrayToFloat32 = (hexArray, endianness) => new DataView(new Uint8Array(hexArray.map(hex => Number(`0x${hex}`))).buffer).getFloat32(0, endianness) 

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
                    let data = msgpack.decode(rawData);
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
                window.dsj.graphics.firstJoin = false;
                window.postMessage({isDSJ: true, type: "disconnected"}, window.location.origin);
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
                    bufferedData = [];
                    window.postMessage({isDSJ: true, type: "teleport", name: data.name}, window.location.origin);
                }
                else if (data.removed === true) {
                }
                else {
                    
                }
            }
            else if (data.type == 13) {
                let position = `${data.x}:${data.y}`
                if (data.d == 255 && data.m == 0) {
                    let superData = {}
                    if (bufferedData[position] == undefined) {
                        superData.type = 0;
                    }
                    else {
                        superData.type = bufferedData[position];
                    }
                    dsj.blocksBrokenRequests.push(superData);
                }
                else {
                    if (data.m != 0) {
                        bufferedData[position] = data.m;
                    }
                }
            }
            else if(data.type != 9) {
            }
        })
        window.WebSocket = nativeWebSocket;
    }
    return ws;
};
/*
222 0 25 164 116 121 112 101 0 161 110 3 161 120 202 0 0 0 0 161 121 202 0 0 0 0 162 109 120 202 64 217 187 208 162 109 121 202 64 105 252 239 162 118 120 202 65 158 239 56 162 118 121 202 65 189 189 89 164 106 117 109 112 194 169 106 117 109 112 95 104 101 108 100 194 164 100 114 111 112 194 164 97 99 116 49 194 169 97 99 116 49 95 104 101 108 100 194 164 101 120 105 116 194 164 97 99 116 50 194 167 97 99 116 95 97 108 116 194 165 115 99 114 95 119 205 3 171 165 115 99 114 95 104 205 4 97 166 109 111 116 105 111 110 202 0 0 0 0 169 102 111 99 117 115 95 101 110 116 192 170 99 111 110 102 105 103 95 101 110 116 192 170 116 105 112 95 115 101 108 101 99 116 192 168 105 110 118 95 115 108 111 116 192 164 98 108 117 114 194 164 100 114 97 103 192 228 191 32 35 249 196 101 45 164 129 19 179 229 81 53 129 251 83 116 54 249 244 233 189 132 81 227 96 5 179 47 87

222 0 25 164 116 121 112 101 0 161 110 3 161 120 0 161 121 0 162 109 120 203 64 27  55  122 0 0 0 0 162 109 121 203 64 13 63 157 224 0 0 0 162 118 120 203 64 51 221 231 0 0 0 0 162 118 121 203 64 55 183 171 32 0 0 0 164 106 117 109 112 194 169 106 117 109 112 95 104 101 108 100 194 164 100 114 111 112 194 164 97 99 116 49 194 169 97 99 116 49 95 104 101 108 100 194 164 101 120 105 116 194 164 97 99 116 50 194 167 97 99 116 95 97 108 116 194 165 115 99 114 95 119 205 3 171 165 115 99 114 95 104 205 4 97 166 109 111 116 105 111 110 0 169 102 111 99 117 115 95 101 110 116 192 170 99 111 110 102 105 103 95 101 110 116 192 170 116 105 112 95 115 101 108 101 99 116
*/

console.log("KEYPRESS ADDED");
document.addEventListener("keypress", function (e) {
    e = e || window.event;
    if (e.key == "u") {
        console.log("autoing");
        const lock1 = document.querySelector("#pui > div > div:nth-child(3) > div > table:nth-child(2) > tr:nth-child(1) > td:nth-child(1) > button");
        const lock2 = document.querySelector("#pui > div > div:nth-child(3) > div > table:nth-child(2) > tr:nth-child(2) > td:nth-child(1) > button");
        const lock3 = document.querySelector("#pui > div > div:nth-child(3) > div > table:nth-child(2) > tr:nth-child(3) > td:nth-child(1) > button");
        const repeat = document.querySelector("#craft-repeat");
        const eject1 = document.querySelector("#pui > div > div:nth-child(3) > div > table:nth-child(2) > tr:nth-child(1) > td:nth-child(3) > button");
        const eject2 = document.querySelector("#pui > div > div:nth-child(3) > div > table:nth-child(2) > tr:nth-child(2) > td:nth-child(3) > button");
        const eject3 = document.querySelector("#pui > div > div:nth-child(3) > div > table:nth-child(2) > tr:nth-child(3) > td:nth-child(3) > button");
        lock1.click();
        lock2.click();
        lock3.click();
        setTimeout(() => {
            repeat.click();
            eject1.click();
            eject2.click();
            eject3.click();
        }, 50);
    }
});