let refreshButton;
let ships;
// hippity hoppity ur code is now my property
let loaded = false;
waitForElm("#shipyard").then( (elm) => {
    if (loaded) return;
    loaded = true;
    elm.style.visibility = "hidden";
    refreshButton = document.querySelector("#shipyard > div.window.dark > section:nth-child(4) > button");
    window.dsj.menu = {};
    window.dsj.menu.ingame = false;
    fetch(dsj.url + "scripts/injected/menu.html")
    .then(response => response.text())
    .then((response) => {
        StartMenu(response);
    })
    .catch(err => console.log(err))
    let shipNodes = document.querySelectorAll(".shipyard-item");
    ships = [];
    window.dsj.menu.getShips = (loop=false) => { 
        if (dsj.menu.ingame) return;
        dsj.menu.shipyard.innerHTML = "";
        shipNodes = document.querySelectorAll(".shipyard-item");
        ships = [];
        let bonk = document.createElement("div");
        bonk.id = dsj.menu.shipyard.id;
        refreshButton.click();
        shipNodes.forEach((node) => {
            let icon = node.getAttribute("style").split("\"")[1];
            let hex = node.querySelector(".sy-id").innerHTML;
            let title = node.querySelector(".sy-title");
            let name = title.children[0].innerHTML;
            let saved = title.children.length == 2 ? title.children[1].textContent.split("@")[1].trim() : "no"
            let crew = node.querySelector(".sy-crew").innerHTML.replace("\"", "").split("<")[0].trim();
            let data = JSON.stringify({
                "name": name,
                "hex": hex,
                "crew": crew,
                "saved": saved,
                "icon": icon,
                "color": node.style["background-color"]
            });
            let appendedNode = node.cloneNode(true);
            appendedNode.id = "dsjshipyardship";
            appendedNode.setAttribute("dsjData", data);
            bonk.appendChild(appendedNode);
        });
        dsj.menu.shipyard.innerHTML = bonk.innerHTML;
        if (loop) {
            setTimeout(dsj.menu.getShips, 1000, loop);
        }
    }
    window.dsj.menu.changeServer = (server) => {
        document.querySelectorAll("#shipyard select option")[server].selected = 'selected';
        document.querySelector("#shipyard select").dispatchEvent(new Event('change'));
        document.querySelectorAll("#shipyard section:nth-of-type(1) div").forEach(element => {
            element.classList.remove("server-selected");
        });
        dsj.menu.getShips();
    }
});

const StartMenu = (html) => {
    console.log("CREATING START MENU");
    let shipyard = document.getElementById("shipyard");
    let injectedMenu = document.createElement("div");
    injectedMenu.id = "dsjShipyard";
    injectedMenu.innerHTML = html;
    shipyard.parentElement.insertBefore(injectedMenu, shipyard)
    dsj.menu.shipyard = document.getElementById("superDSJshipyard");
    setTimeout(dsj.menu.getShips, 1000, true);
    window.dsj.menu.setShipData = (name, hex, icon, saved, crew) => {
        const shipName = document.getElementById("sidebarShipName");
        shipName.innerHTML = `${name} <span style="font-size:50%;">${hex}</span>`
        const siidebarCrewCount = document.getElementById("siidebarCrewCount");
        siidebarCrewCount.innerHTML = saved == "no" ? `Crew: ${crew}` : "Ship is saved in " + saved + "!";
        const sidebarIcon = document.getElementById("sidebarIcon");
        sidebarIcon.src = icon;
    }
    window.dsj.menu.setServerData = (name, icon) => {
        document.getElementById("dsjServerName").innerHTML = name;
        document.getElementById("dsjServerIcon").src = icon;
    };
    window.dsj.menu.showServerList = () => {
        dsj.menu.shipyard.style.opacity = 100;
        dsj.menu.shipyard.style.pointerEvents = "all";
        document.getElementById('rightMenu').style.left = 0;
    }
    window.dsj.menu.hideServerList = () => {
        document.getElementById('rightMenu').style.left = "50%";
    }
    
    window.dsj.menu.deshiplist = () => {
        console.log("Deshiplisted")
        new Audio(dsj.url + "audio/menu/serverBack.wav").play();
        dsj.menu.hideServerList();
        dsj.menu.shiplisted = -1;
        dsj.menu.shipyard.style.opacity = 0;
        dsj.menu.shipyard.style.pointerEvents = "none";
        document.getElementById('serverData').style.height = '100%';
        dsj.menu.selectedShip = "";
    }


    window.dsj.menu.selectIcon = (selected, others) => {
        selected.style["border-style"] = "dashed";
        selected.style["border-width"] = "2px";
        selected.style["background-color"] = "#FFFFFF88";
        others.forEach(element => {
            element.setAttribute("style", "margin:2%; margin-top: 0;");    
        });
    }

    dsj.menu.selectedShip = "";
    dsj.menu.selected = 0;
    dsj.menu.shiplisted = -1;
    const USIcon = document.getElementById("USh");
    USIcon.src = dsj.url + "images/icons/grandmaster.png";
    const EUIcon = document.getElementById("EUh");
    EUIcon.src = dsj.url + "images/icons/expert.png";
    const ASIcon = document.getElementById("ASh");
    ASIcon.src = dsj.url + "images/icons/advanced.png";
    dsj.menu.selectIcon(USIcon, [EUIcon, ASIcon]);


    USIcon.onselected = () => {
        console.log("Selected US");
        new Audio(dsj.url + "audio/menu/serverLeft.wav").play();
        dsj.menu.selected = 0;
        dsj.menu.selectIcon(USIcon, [EUIcon, ASIcon]);
    }


    USIcon.onshiplisted = () => {
        new Audio(dsj.url + "audio/menu/serverSelect.wav").play();
        dsj.menu.setServerData("US East", dsj.url + "images/icons/grandmaster.png");
        dsj.menu.showServerList();
        dsj.menu.shiplisted = 0;
        dsj.menu.changeServer(0);
    }


    USIcon.onclick = () => {
        // if already selected
        if (dsj.menu.shiplisted == 0) return;
        // unselect if already seelcted
        else if (dsj.menu.shiplisted != -1) {dsj.menu.deshiplist(); return; }
        // move to current hover if not hovered
        else if (dsj.menu.selected != 0) {USIcon.onselected(); return; }
        else {
            USIcon.onshiplisted();
        }
    }


    EUIcon.onselected = () => {
        console.log("Selected EU");
        if (dsj.menu.selected == 0) new Audio(dsj.url + "audio/menu/serverRight.wav").play();
        else new Audio(dsj.url + "audio/menu/serverLeft.wav").play();
        dsj.menu.selected = 1;
        dsj.menu.selectIcon(EUIcon, [USIcon, ASIcon]);
        dsj.menu.changeServer(1);
    }


    EUIcon.onshiplisted = () => {
        new Audio(dsj.url + "audio/menu/serverSelect.wav").play();
        dsj.menu.setServerData("Europe (Poland)", dsj.url + "images/icons/expert.png");
        dsj.menu.showServerList();
        dsj.menu.shiplisted = 1;
    }


    EUIcon.onclick = () => {
        // if already selected
        if (dsj.menu.shiplisted == 1) return;
        // unselect if already seelcted
        else if (dsj.menu.shiplisted != -1) {dsj.menu.deshiplist(); return; }
        // move to current hover if not hovered
        else if (dsj.menu.selected != 1) {EUIcon.onselected(); return; }
        else {
            EUIcon.onshiplisted();
        }
    }


    ASIcon.onselected = () => {
        new Audio(dsj.url + "audio/menu/serverRight.wav").play();
        console.log("Selected AS");
        dsj.menu.selected = 2;
        dsj.menu.selectIcon(ASIcon, [USIcon, EUIcon]);
    }


    ASIcon.onshiplisted = () => {
        new Audio(dsj.url + "audio/menu/serverSelect.wav").play();
        dsj.menu.setServerData("Asia (Singapore)", dsj.url + "images/icons/advanced.png");
        dsj.menu.showServerList();
        dsj.menu.shiplisted = 2;
        dsj.menu.changeServer(2);
    }


    ASIcon.onclick = () => {
        // if already selected
        if (dsj.menu.shiplisted == 2) return;
        // unselect if already seelcted
        else if (dsj.menu.shiplisted != -1) {dsj.menu.deshiplist(); return; }
        // move to current hover if not hovered
        else if (dsj.menu.selected != 2) {ASIcon.onselected(); return; }
        else {
            ASIcon.onshiplisted();
        }
    }
    let joinedShip = false;
    window.addEventListener("click", (event) => {
        let node = event.target;
        if (node.id == "dsjshipyardship") {
            let data = JSON.parse(node.getAttribute("dsjData"));
            if (dsj.menu.selectedShip == "") {
                dsj.menu.selectedShip = data.hex;
                new Audio(url + "audio/menu/shipSelect.wav").play();
                dsj.menu.setShipData(data.name, data.hex, data.icon, data.saved, data.crew)
                document.getElementById('serverData').style.height = 0;
            }
            else if (dsj.menu.selectedShip == data.hex){
                if (joinedShip) return;
                shipNodes = document.querySelectorAll(".shipyard-item");
                shipNodes.forEach((node) => {
                    if (node.id == "dsjshipyardship") return
                    let hex = node.querySelector(".sy-id").innerHTML;
                    if (hex == dsj.menu.selectedShip) {
                        joinedShip = true;
                        new Audio(url + "audio/menu/shipJoin.wav").play();
                        node.click();
                        setTimeout(()=> {joinedShip = false}, 500)
                        return;
                    }
                });
                if (joinedShip) return;
                new Audio(url + "audio/menu/shipBack.wav").play();
                dsj.menu.selectedShip = "";
                document.getElementById('serverData').style.height = '100%';
            }
            else {
                new Audio(url + "audio/menu/shipBack.wav").play();
                dsj.menu.selectedShip = "";
                document.getElementById('serverData').style.height = '100%';
            }
        }
    })
}
