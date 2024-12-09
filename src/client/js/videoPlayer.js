console.log("videoPlayer");

const video = document.querySelector("video");
const playBtn = document.getElementById("play");
const muteBtn = document.getElementById("mute");
const time = document.getElementById("time");
const volume = document.getElementById("volume");

const handlePlayBtnClick = () => {
  if (video.paused) {
    video.play();
    return;
  }
  video.pause();
};
const handleMuteBtnClick = () => {};
const handleVideoPause = () => {
  playBtn.innerText = "Play";
};
const handleVideoPlay = () => {
  playBtn.innerText = "Pause";
};

playBtn.addEventListener("click", handlePlayBtnClick);
muteBtn.addEventListener("click", handleMuteBtnClick);
video.addEventListener("pause", handleVideoPause);
video.addEventListener("play", handleVideoPlay);

console.log({ video, play, mute, time, volume });
