
const songs = [
  { title: "Teri Mere Kahaani", artist: "Artist A", src: "music/01 - GIB - Teri Mere Kahaani [DJMaza.Info] (1).mp3", cover: "photo/card1img.jpeg" },
  { title: "India Waale", artist: "Artist B", src: "music/01 - HNY - India Waale [DJMaza.Info].mp3", cover: "photo/card2img.jpeg" },
  { title: "Itna Tumhe", artist: "Artist C", src: "music/01 - Itna Tumhe - Machine [DJMaza.Life].mp3", cover: "photo/card3img.jpeg" },
   { title: "Khamoshiyan", artist: "Artist A", src: "music/01 - Khamoshiyan - Khamoshiyan [DJMaza.Info].mp3", cover: "photo/card3img.jpeg" }
];

let currentSongIndex = 0;
let isPlaying = false;

const audio = document.getElementById("audio");
const playBtn = document.getElementById("play-btn");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");


const albumPic = document.querySelector(".album-pic img");
const albumTitle = document.querySelector(".album-title");
const albumDetail = document.querySelector(".album-detail");


const currTime = document.querySelectorAll(".curr-time")[0];
const totalTime = document.querySelectorAll(".curr-time")[1];
const progressBar = document.querySelector(".progress-bar");


function formatTime(seconds) {
  const min = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60);
  return `${min < 10 ? "0" + min : min}:${sec < 10 ? "0" + sec : sec}`;
}


function loadSong(index) {
  const song = songs[index];
  audio.src = song.src;
  albumPic.src = song.cover;
  albumTitle.textContent = song.title;
  albumDetail.textContent = song.artist;
}


function togglePlay() {
  if (audio.paused) {
    audio.play();
    isPlaying = true;
    playBtn.classList.remove("fa-play");
    playBtn.classList.add("fa-pause");
  } else {
    audio.pause();
    isPlaying = false;
    playBtn.classList.remove("fa-pause");
    playBtn.classList.add("fa-play");
  }
}

function nextSong() {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  loadSong(currentSongIndex);
  if (isPlaying) audio.play();
}

function prevSong() {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  loadSong(currentSongIndex);
  if (isPlaying) audio.play();
}

audio.addEventListener("loadedmetadata", () => {
  totalTime.textContent = formatTime(audio.duration);
  progressBar.max = Math.floor(audio.duration);
});

audio.addEventListener("timeupdate", () => {
  currTime.textContent = formatTime(audio.currentTime);
  progressBar.value = Math.floor(audio.currentTime);
});

progressBar.addEventListener("input", () => {
  audio.currentTime = progressBar.value;
});

audio.addEventListener("ended", nextSong);


playBtn.addEventListener("click", togglePlay);
nextBtn.addEventListener("click", nextSong);
prevBtn.addEventListener("click", prevSong);

loadSong(currentSongIndex);
