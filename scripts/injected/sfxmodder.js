
console.log("SFX Modder");

const config = {
    // Break
    "/x/95a411ab612560d4d4d90b6a5ffaa7d6.webm": extensionPath + "audio/sfx/break.webm",
    // Hit
    "/x/a0650c027a669b7543e2e034758dc723.webm": extensionPath + "audio/sfx/hit.webm",
    // Cargo
    "/x/3bf30947473bab2f962d36260523bbdb.webm": extensionPath + "audio/sfx/cargo.webm",
    // Reload
    "/x/003af56ba939f772762227a8c2336049.webm": extensionPath + "audio/sfx/reload.webm",
    // Fire
    "/x/03ff41b202dc826a600c0ac04cd03bbf.webm": extensionPath + "audio/sfx/fire.webm",
    // Bot Fire
    "/x/0c011318cf87f3e75cb6e53fc6cfcc6d.webm": extensionPath + "audio/sfx/botfire.webm",
    // Fast break
    "/x/2dcae2ffafb83217cc4f35ff17805e69.webm": extensionPath + "audio/sfx/fastbreak.webm",
    // comms
    "/x/1406ab2acbaa5ea535757e97560ab101.webm": extensionPath + "audio/sfx/comms.webm",
    // FfailFire
    "/x/1f32bf5aa606a41d999ae6b352867a59.webm": extensionPath + "audio/sfx/failfire.webm",
    // longwrench
    "/x/3771001f1f2092866744036cf8f02eab.webm": extensionPath + "audio/sfx/longwrench.webm"
}

const nativeFetch = fetch;
fetch = (...args) => {
    console.log(args[0]);
    if (args[0] in config) {
        args[0] = config[args[0]];
    }
    return nativeFetch(...args);
}

