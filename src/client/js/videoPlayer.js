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
const playOnVideoBtn = document.getElementById("playOnVideo");

const formatTime = (seconds) =>
  new Date(seconds * 1000).toISOString().substr(14, 5);
const hideControls = () => {
  videoControls.classList.remove("showing");
  playOnVideoBtn.classList.remove("showing");
};

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
};
const handleMuteBtnClick = () => {
  video.muted = !video.muted;
  videoContainer.classList.toggle("muted", video.muted);
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
    return document.exitFullscreen();
  }
  videoContainer.requestFullscreen();
};
const handleVideoContainerMouseMove = () => {
  if (contorlsLeaveTimeout) {
    clearTimeout(contorlsLeaveTimeout);
    contorlsLeaveTimeout = null;
  }
  if (controlsMovementTimeout) {
    clearTimeout(controlsMovementTimeout);
    controlsMovementTimeout = null;
  }
  videoControls.classList.add("showing");
  playOnVideoBtn.classList.add("showing");
  controlsMovementTimeout = setTimeout(hideControls, 3000);
};
const handleVideoContainerMouseLeave = () => {
  clearTimeout(contorlsLeaveTimeout);
  contorlsLeaveTimeout = setTimeout(hideControls, 3000);
};
const handleVideoPause = () => {
  videoContainer.classList.remove("playing");
};
const handVideoPlay = () => {
  videoContainer.classList.add("playing");
};
const handleVideoContainerFullScreenChange = () => {
  videoContainer.classList.toggle(
    "fullScreen",
    document.fullscreenElement !== null
  );
};
const handleKeyPress = (e) => {
  if (e.code === "Space") {
    e.preventDefault();
    return handlePlayBtnClick();
  }

  if (e.code === "KeyF") {
    e.preventDefault();
    return handleFullScreenBtnClick();
  }

  if (e.code === "KeyM") {
    e.preventDefault();
    return handleMuteBtnClick();
  }
};
const handleVideoEnded = () => {
  const { id } = videoContainer.dataset;
  fetch(`/api/videos/${id}/view`, { method: "POST" });
};

playBtn.addEventListener("click", handlePlayBtnClick);
playOnVideoBtn.addEventListener("click", handlePlayBtnClick);
muteBtn.addEventListener("click", handleMuteBtnClick);
volumeRange.addEventListener("input", handleVolueRangeInput);
timelineRange.addEventListener("input", handleTimelineRangeInput);
fullScreenBtn.addEventListener("click", handleFullScreenBtnClick);
video.addEventListener("ended", handleVideoEnded);
video.addEventListener("loadedmetadata", handleVideoLoadedMetadata);
video.addEventListener("timeupdate", handleVideoTimeupdate);
video.addEventListener("pause", handleVideoPause);
video.addEventListener("play", handVideoPlay);
videoContainer.addEventListener("mousemove", handleVideoContainerMouseMove);
videoContainer.addEventListener("mouseleave", handleVideoContainerMouseLeave);
videoContainer.addEventListener(
  "fullscreenchange",
  handleVideoContainerFullScreenChange
);
videoContainer.addEventListener("keypress", handleKeyPress);
