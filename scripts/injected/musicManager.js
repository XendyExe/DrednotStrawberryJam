let canLoad = false;
window.addEventListener("click", (data) => {
    if (!canLoad) Start();
    canLoad = true;
})

const config = {
    "paths": ["audio/songs/BlueberryBay.mp3", "audio/songs/BlueberryBayHeartside.mp3", 
        "audio/songs/MangoMesa.mp3", "audio/songs/MangoMesaHeartside.mp3", 
        "audio/songs/StarfruitSupernova.mp3", "audio/songs/StarfruitSupernovaHeartside.mp3", 
        "audio/songs/KevinTechSpam.mp3", "audio/songs/PassionfruitPantheonHeartside.mp3", "audio/songs/EATGIRL.mp3"],
    "Freeport I": 0,
    "Hummingbird": 1,
    "Freeport II": 2,
    "Finch": 3,
    "Freeport III": 4,
    "Sparrow": 5,
    "Canary": 6,
    "Vulture": 7,
    "The Pits": 8,
    "Raven": 7
}

const Start = () => {
    let songs = [];
    
    let volume = 0.1;
    let focusVolume = 1;

    config.paths.forEach(path => {
        let song = new Audio(dsj.url + path);
        song.loop = true;
        song.fadeVolume = 0;
        song.calculateVolume = () => {
            return song.fadeVolume * volume * focusVolume;
        }
        song.volume = song.calculateVolume();
        songs.push(song)
    });

    let currentSong = -1;
    let targetSong = -1;

    window.addEventListener("message", (data) => {
        if (data.data.isDSJ !== undefined && data.data.type == "teleport") {
            targetSong = config[data.data.name];
        }
    });

    const Update = () => {
        if (currentSong != targetSong) {
            if (currentSong == -1) {
                currentSong = targetSong;
                songs[currentSong].play();
            }
            else {
                songs[currentSong].fadeVolume -= 0.025;
                if (songs[currentSong].fadeVolume < 0) {
                    songs[currentSong].fadeVolume = 0;
                    songs[currentSong].volume = songs[currentSong].calculateVolume();
                    currentSong = targetSong;
                    songs[currentSong].play();
                    songs[currentSong].volume = songs[currentSong].calculateVolume();
                }
                else {
                    songs[currentSong].volume = songs[currentSong].calculateVolume();
                }
            }
        } 
        else if (currentSong != -1) {
            if (songs[currentSong].fadeVolume < 1) {
                songs[currentSong].fadeVolume += 0.025;
                songs[currentSong].volume = songs[currentSong].calculateVolume();
                if (songs[currentSong].volume > 1) songs[currentSong].volume = 1;
            }
        }

        if (currentSong != -1) {
            if (document.hasFocus()) {
                focusVolume += 0.03;
                if (focusVolume > 1) focusVolume = 1;
                songs[currentSong].volume = songs[currentSong].calculateVolume();
            }
            else {
                focusVolume -= 0.03;
                if (focusVolume < 0) focusVolume = 0;
                songs[currentSong].volume = songs[currentSong].calculateVolume();

            }
        }

        setTimeout(Update, 10);
    }
    setTimeout(Update, 10);
};