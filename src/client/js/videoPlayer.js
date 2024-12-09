console.log("videoPlayer");

const video = document.querySelector("video");
const playBtn = document.getElementById("play");
const muteBtn = document.getElementById("mute");
const volumeRange = document.getElementById("volume");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");

let volumeValue = 0.5;
video.volume = volumeValue;

const handlePlayBtnClick = () => {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
  playBtn.innerText = video.paused ? "Play" : "Pause";
};
const handleMuteBtnClick = () => {
  if (video.muted) {
    video.muted = false;
  } else {
    video.muted = true;
  }
  muteBtn.innerText = video.muted ? "Unmute" : "Mute";
  volumeRange.value = video.muted ? 0 : volumeValue;
};
const handleVolueRangeInput = (e) => {
  const {
    target: { value },
  } = e;

  volumeValue = value;
  video.volute = value;
};
const handleVideoLoadedMetadata = () => {
  totalTime.innerText = Math.floor(video.duration);
};
const handleVideoTimeupdate = () => {
  currentTime.innerText = Math.floor(video.currentTime);
};

playBtn.addEventListener("click", handlePlayBtnClick);
muteBtn.addEventListener("click", handleMuteBtnClick);
volumeRange.addEventListener("input", handleVolueRangeInput);
video.addEventListener("loadedmetadata", handleVideoLoadedMetadata);
video.addEventListener("timeupdate", handleVideoTimeupdate);
