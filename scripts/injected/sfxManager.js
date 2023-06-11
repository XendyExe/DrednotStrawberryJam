const url = document.getElementById('dsjURL').innerHTML;

const sfxConfig = {
    // Break
    "/x/95a411ab612560d4d4d90b6a5ffaa7d6.webm": url + "audio/sfx/break.webm",
    // Hit
    "/x/a0650c027a669b7543e2e034758dc723.webm": url + "audio/sfx/hit.webm",
    // Cargo
    "/x/3bf30947473bab2f962d36260523bbdb.webm": url + "audio/sfx/cargo.webm",
    // Reload
    "/x/003af56ba939f772762227a8c2336049.webm": url + "audio/sfx/reload.webm",
    // Fire
    "/x/03ff41b202dc826a600c0ac04cd03bbf.webm": url + "audio/sfx/fire.webm",
    // Bot Fire
    "/x/0c011318cf87f3e75cb6e53fc6cfcc6d.webm": url + "audio/sfx/botfire.webm",
    // Fast break
    "/x/2dcae2ffafb83217cc4f35ff17805e69.webm": url + "audio/sfx/fastbreak.webm",
    // comms
    "/x/1406ab2acbaa5ea535757e97560ab101.webm": url + "audio/sfx/comms.webm",
    // FfailFire
    "/x/1f32bf5aa606a41d999ae6b352867a59.webm": url + "audio/sfx/failfire.webm",
    // longwrench
    "/x/3771001f1f2092866744036cf8f02eab.webm": url + "audio/sfx/longwrench.webm",
}

const nativeFetch = fetch;
fetch = (...args) => {
    console.log(args[0]);
    if (args[0] in sfxConfig) {
        args[0] = sfxConfig[args[0]];
    }
    return nativeFetch(...args);
}


let audio = {}
audio.context = new AudioContext();
fetch(url + 'audio/variablesfx/dirtBreak.wav')
  .then(response => response.arrayBuffer())
  .then(arrayBuffer => {
    // Decode the audio data into an AudioBuffer
    return audio.context.decodeAudioData(arrayBuffer);
  })
  .then(audioBuffer => {
    // Use the decoded AudioBuffer as needed
    console.log("LOADED AUDIO: ", audioBuffer);
    audio.dirtBreak = audioBuffer;
    // ...
  })
  .catch(error => {
    // Handle any errors that occurred during loading or decoding
    console.error(error);
  });
/*
const OriginalAudioContext = window.AudioContext || window.webkitAudioContext;

window.AudioContext = function () {
  const audioContext = new OriginalAudioContext();

  const originalCreateBufferSource = audioContext.createBufferSource;
  audioContext.createBufferSource = function () {
    const bufferSourceNode = originalCreateBufferSource.call(audioContext);

    const originalStart = bufferSourceNode.start;
    bufferSourceNode.start = function (over = true) {
        if (over) {
            if (bufferSourceNode.buffer.duration == 1.43475) {
                if (dsj.blocksBrokenRequests != 0) {
                    let blockType = dsj.blocksBrokenRequests[0].type;
                    console.log("Block type " + dsj.blocksBrokenRequests[0].type + " broken!", bufferSourceNode);
                    dsj.blocksBrokenRequests.shift();

                    // hey its the sfx already loaded
                    if (blockType == 1) {
                        return;
                    }

                    // alright FUCKING HELL we got to like gen
                    if (blockType == 9 || blockType == 10) {
                        console.log("OVERRIDING THE FUCKING STUPID SHIT")
                        bufferSourceNode.buffer = audio.dirtBreak;
                        bufferSourceNode.start(false);
                    }
                    return;
                }

            }
        }
        originalStart.apply(this, arguments); 
    };
    return bufferSourceNode;
  };
  return audioContext;
};
*/