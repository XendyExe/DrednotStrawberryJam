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
                    window.postMessage({isDSJ: true, type: "teleport", name: data.name}, window.location.origin);
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