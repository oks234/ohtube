const video = document.querySelector("video");
const playBtn = document.getElementById("play");
const muteBtn = document.getElementById("mute");
const volumeRange = document.getElementById("volume");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");
const timelineRange = document.getElementById("timeline");
const fullScreenBtn = document.getElementById("fullScreen");
const videoContainer = document.getElementById("videoContainer");
const videoControls = document.getElementById("videoControls");

const formatTime = (seconds) =>
  new Date(seconds * 1000).toISOString().substr(11, 8);
const hideControls = () => videoControls.classList.remove("showing");

let contorlsLeaveTimeout;
let controlsMovementTimeout = null;
let volumeValue = 0.5;
video.volume = volumeValue;
currentTime.innerText = formatTime(0);

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
  totalTime.innerText = formatTime(Math.floor(video.duration));
  timelineRange.max = Math.floor(Math.floor(video.duration));
};
const handleVideoTimeupdate = () => {
  currentTime.innerText = formatTime(Math.floor(video.currentTime));
  timelineRange.value = Math.floor(video.currentTime);
};
const handleTimelineRangeInput = (e) => {
  const {
    target: { value },
  } = e;
  video.currentTime = value;
};
const handleFullScreenBtnClick = () => {
  if (document.fullscreenElement) {
    document.exitFullscreen();
    fullScreenBtn.innerText = "Enter Full Screen";
  } else {
    videoContainer.requestFullscreen();
    fullScreenBtn.innerText = "Exit Full Screen";
  }
};
const handleVideoMouseMove = () => {
  if (contorlsLeaveTimeout) {
    clearTimeout(contorlsLeaveTimeout);
    contorlsLeaveTimeout = null;
  }
  if (controlsMovementTimeout) {
    clearTimeout(controlsMovementTimeout);
    controlsMovementTimeout = null;
  }
  videoControls.classList.add("showing");
  controlsMovementTimeout = setTimeout(hideControls, 3000);
};
const handleVideoMouseLeave = () => {
  clearTimeout(contorlsLeaveTimeout);
  contorlsLeaveTimeout = setTimeout(hideControls, 3000);
};

playBtn.addEventListener("click", handlePlayBtnClick);
muteBtn.addEventListener("click", handleMuteBtnClick);
volumeRange.addEventListener("input", handleVolueRangeInput);
video.addEventListener("loadedmetadata", handleVideoLoadedMetadata);
video.addEventListener("timeupdate", handleVideoTimeupdate);
timelineRange.addEventListener("input", handleTimelineRangeInput);
fullScreenBtn.addEventListener("click", handleFullScreenBtnClick);
video.addEventListener("mousemove", handleVideoMouseMove);
video.addEventListener("mouseleave", handleVideoMouseLeave);
