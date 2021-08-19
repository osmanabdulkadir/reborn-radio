//buttons

const MusicContainer = document.getElementById("music-container");

const play = document.getElementById("play");
const prev = document.getElementById("previous");
const next = document.getElementById("next");

const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");

const cover = document.getElementById("cover");
const audio = document.getElementById("audio");
const title = document.getElementById("title");

//song titles
const songs = ["nights", "iloveuihateu", "astrothunder", "solo","devil"];

//keeps tracks of songs
let songIndex = 0;

//load songs onto DOM
loadSong(songs[songIndex]);

//update song details
function loadSong(song) {
    title.innerText = song;
    audio.src = `music/${song}.mp3`;
    cover.src = `images/${song}.jpg`;
};


//pause song
function pauseSong() {
    MusicContainer.classList.remove("play");
    play.querySelector("i.fas").classList.add('fa-play');
    play.querySelector("i.fas").classList.remove('fa-pause');

    audio.pause();
};


//play song
function playsong() {
    MusicContainer.classList.add("play")
    play.querySelector("i.fas").classList.remove('fa-play');
    play.querySelector("i.fas").classList.add('fa-pause');

    audio.play();
};

//NEXT SONG
function nextSong() {
    console.log("next")
    songIndex++;
    if(songIndex > songs.length - 1) {
        songIndex = 0;
    }

    loadSong(songs[songIndex]);

    playsong();

}

function prevSong() {
    console.log("prev")
    songIndex--;

    if(songIndex < 0) {
        songIndex = songs.length - 1;
    }

    loadSong(songs[songIndex]);

    playsong();

}

//update progress bar 
function updateProgress(e) {
    const  {duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
}

//set progress bar
function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;

    audio.currentTime = (clickX / width) * duration;
}


//event listners

play.addEventListener("click", () => {
    const isPlaying = MusicContainer.classList.contains("play");

    if(isPlaying) {
        pauseSong();
    } else {
        playsong();
    }
} );

prev.addEventListener("click", prevSong);

next.addEventListener("click", nextSong);

//time /song update
audio.addEventListener("timeupdate", updateProgress);

//click on progress bar
progressContainer.addEventListener("click", setProgress);

//song ends 
audio.addEventListener("ended", nextSong);



