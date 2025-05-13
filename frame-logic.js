const AudioTrack = {
    OPEN_MENU: "MENU",
    CLICK: "CLICK",
    OTHER: "NOTHING"
};

class Properties {
    constructor() {
        this.soundVolume = document.getElementById("sound-id").value / 10.0;
        this.musicVolume = document.getElementById("music-id").value / 10.0;
    }
    getSoundVolume() { return this.soundVolume; }
    getMusicVolume() { return this.musicVolume; }
    setSoundVolume(soundVolume) { this.soundVolume = soundVolume / 10.0; }
    setMusicVolume(musicVolume) { this.musicVolume = musicVolume / 10.0; }
};

const properties = new Properties();

// change sound volume
const soundSlider = document.getElementById("sound-id");
soundSlider.oninput = function() {
    properties.setSoundVolume(soundSlider.value);
    console.log(properties.getSoundVolume()); // logs
}
// change music volume
const musicSlider = document.getElementById("music-id");
musicSlider.oninput = function() {
    properties.setMusicVolume(musicSlider.value);
    console.log(properties.getMusicVolume()); // logs

    const music = document.getElementById("audio-id");
    music.volume = properties.getMusicVolume();
}

// play sound
function playSound(audioTrack) {
    const sound = new Audio();
    switch (audioTrack) {
        case AudioTrack.OPEN_MENU: sound.src = "./menu_sound.mp3"; break;
        case AudioTrack.CLICK: sound.src = "./mixkit.wav"; break;
        default: console.log(AudioTrack.NOTHING);
    }
    sound.volume = properties.getSoundVolume();
    sound.play();
}

// menu about sound and music
function changeSoundMenuState() {
    var volume = document.getElementById("sound-menu-id");
    volume.classList.toggle("volume-show");
    playSound(AudioTrack.OPEN_MENU);
}
function changeMusicMenuState() {
    var volume = document.getElementById("music-menu-id");
    volume.classList.toggle("volume-show");
    playSound(AudioTrack.OPEN_MENU);
}

// basic menu
function changeMenuState() {
    var menu = document.getElementById("info-menu-id");
    menu.classList.toggle("info-menu-show");
    playSound(AudioTrack.OPEN_MENU);
}
function changeChatState() {
    var chat = document.getElementById("chat-menu-id");
    var closeBar = document.getElementById("chat-menu-close-id");
    var themeMenu = document.getElementById("themes-menu-id");

    chat.classList.toggle("chat-menu-show");
    closeBar.classList.toggle("chat-menu-bar-show");
    if (chat.classList.contains("chat-menu-show") == false)
        themeMenu.classList.remove("themes-show");
    playSound(AudioTrack.OPEN_MENU);
}
function changeThemesMenuState() {
    var themes = document.getElementById("themes-menu-id");
    themes.classList.toggle("themes-show");
    playSound(AudioTrack.OPEN_MENU);
}
// properties
function changePropState() {
    var prop = document.getElementById("user-prop-id");
    prop.classList.toggle("user-info-show");
    playSound(AudioTrack.OPEN_MENU);
}

// preparation
window.onload = function prepare() {
    const audio = document.getElementById("audio-id");
    audio.src = "./ObservingTheStar.opus";
    audio.volume = document.getElementById("music-id").value / 10.0;
    audio.loop = "true";
    audio.play();
}

function setIconBorder(index) {
    path = "media/icon borders/icon-" + index + ".png"

    var propIcon = document.getElementById("avatar-border-id");
    propIcon.src = path;
}