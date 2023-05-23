let refreshButton;
let ships;

waitForElm("#shipyard").then( (elm) => {
    refreshButton = document.querySelector("#shipyard > div.window.dark > section:nth-child(4) > button");
    window.dsj.menu = {};
    fetch(dsj.url + "scripts/injected/menu.html")
    .then(response => response.text())
    .then((response) => {
        StartMenu(response);
    })
    .catch(err => console.log(err))
    let shipNodes = document.querySelectorAll(".shipyard-item");
    ships = [];
    console.log(ships);
    window.dsj.menu.getShips = (loop=false) => { 
        shipNodes = document.querySelectorAll(".shipyard-item");
        ships = [];
        const dsjShipyard = document.getElementById("dsjShipyard");
        dsjShipyard.innerHTML = "";
        shipNodes.forEach((node) => {
            refreshButton.click();
            let icon = node.getAttribute("style").split("\"")[1];
            let hex = node.querySelector(".sy-id").innerHTML;
            let title = node.querySelector(".sy-title");
            let name = title.children[0].innerHTML;
            let saved = title.children.length == 2 ? title.children[1].textContent.split("@")[1].trim() : "no"
            let crew = node.querySelector(".sy-crew").innerHTML.replace("\"", "").split("<")[0].trim();
            ships.push({
                "name": name,
                "hex": hex,
                "crew": crew,
                "saved": saved,
                "icon": icon,
                "node": node,
                "color": node.style["background-color"]
            });
            let button = document.createElement("button");
            button.onclick = () => {
                node.click();
            }
            button.innerHTML = `
                <h2 style-"font-size: font-size:1em">${name} <span style="font-size: 50%;">${hex}</span></h2>
                <p>${crew}</p>
                <img width="320", height="320", src="${icon}"></img>`;
            dsjShipyard.appendChild(button);
        });
        if (loop) {
            setTimeout(dsj.menu.getShips, 1000, loop);
        }
    }

    window.setServer = (index) => {
        console.log("Set server to " + index);
        let selection = document.querySelector("#shipyard > div.window.dark > section:nth-child(2) > select");
        selection.selectedIndex = index;
        selection.dispatchEvent(new Event('change'));
        refreshButton.click();
        dsj.menu.getShips();
    }    
});

const StartMenu = (html) => {
    let shipyard = document.getElementById("shipyard");
    shipyard.style.visibility = "hidden";
    let injectedMenu = document.createElement("div");
    injectedMenu.id = "dsjMenu";
    injectedMenu.innerHTML = html;
    shipyard.parentElement.insertBefore(injectedMenu, shipyard)
    const serverChooseIcons = document.getElementById("serverChooseIcons");
    const USicon = document.createElement("img");
    USicon.src = dsj.url + "images/icons/grandmaster.png";
    const EUicon = document.createElement("img");
    EUicon.src = dsj.url + "images/icons/expert.png";
    const ASicon = document.createElement("img");
    ASicon.src = dsj.url + "images/icons/advanced.png";
    serverChooseIcons.appendChild(USicon);
    serverChooseIcons.appendChild(EUicon);
    serverChooseIcons.appendChild(ASicon);
    const serverTitle = document.getElementById("serverTitle");

    const serverRollRight = new Audio(dsj.url + "audio/menu/serverRight.wav");
    const serverRollLeft = new Audio(dsj.url + "audio/menu/serverLeft.wav");
    let hoveredServer = "None";
    let selectedServer = "";

    // US, EU, AS
    window.setSelectedStyle = (node) => {
        node.style.border = "solid";
        node.style["border-color"] = "black";
        node.style["border-radius"] = "5px";
        node.style["border-width"] = "3px";
        node.style["margin-left"] = "2%";
        node.style["background-color"] = "#FFFFFF88";
    }
    USicon.roll = (wasClick = false) => {
        setSelectedStyle(USicon);
        EUicon.setAttribute("style", "margin-left:2%");
        ASicon.setAttribute("style", "margin-left:2%");
        if (!wasClick) {
            serverRollLeft.play();
        }
        hoveredServer = "US";
    }
    USicon.select = () => {
        new Audio(dsj.url + "audio/menu/serverSelect.wav").play();
        serverTitle.innerHTML = "US East";
        setServer(0);
    }
    USicon.onclick = () => {
        if (hoveredServer == "US" || selectedServer != "") return;
        USicon.roll(true);
        USicon.select();
    }
    USicon.click();

    EUicon.roll = (wasClick = false) => {
        setSelectedStyle(EUicon);
        USicon.setAttribute("style", "margin-left:2%");
        ASicon.setAttribute("style", "margin-left:2%");
        if (!wasClick) {
            if (hoveredServer == "US") serverRollRight.play();
            else serverRollLeft.play();
        }
        hoveredServer = "EU";
    }
    EUicon.select = () => {
        new Audio(dsj.url + "audio/menu/serverSelect.wav").play();
        serverTitle.innerHTML = "Europe (Poland)";
        setServer(1);
    }
    EUicon.onclick = () => {
        if (hoveredServer == "EU" || selectedServer != "") return;
        EUicon.roll(true);
        EUicon.select();
    }
    
    ASicon.roll = (wasClick = false) => {
        setSelectedStyle(ASicon);
        EUicon.setAttribute("style", "margin-left:2%");
        USicon.setAttribute("style", "margin-left:2%");
        if (!wasClick) {
            serverRollRight.play();
        }
        hoveredServer = "AS";
    }
    ASicon.select = () => {
        new Audio(dsj.url + "audio/menu/serverSelect.wav").play();
        serverTitle.innerHTML = "Asia (Singapore)";
        setServer(2);
    }
    ASicon.onclick = () => {
        if (hoveredServer == "AS" || selectedServer != "") return;
        ASicon.roll(true);
        ASicon.select();
    }
    setTimeout(dsj.menu.getShips, 1000, true);
}