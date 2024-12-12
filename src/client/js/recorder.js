import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile } from "@ffmpeg/util";
const actionBtn = document.getElementById("actionBtn");
const video = document.getElementById("preview");

let stream;
let recorder;
let videoFile;

const files = {
  input: "recording.webm",
  output: "output.mp4",
  thumbnail: "thumbnail.jpg",
};

const downloadFile = (fileUrl, fileName) => {
  const a = document.createElement("a");
  a.href = fileUrl;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
};

const handleDownload = async () => {
  actionBtn.removeEventListener("click", handleDownload);
  actionBtn.disabled = true;
  actionBtn.innerText = "Transcoding...";

  const ffmpeg = new FFmpeg();
  await ffmpeg.load();
  await ffmpeg.writeFile(files.input, await fetchFile(videoFile));
  await ffmpeg.exec(["-i", files.input, "-r", "60", files.output]);
  await ffmpeg.exec([
    "-i",
    files.input,
    "-ss",
    "00:00:01",
    "-frames:v",
    "1",
    files.thumbnail,
  ]);
  const mp4File = await ffmpeg.readFile(files.output);
  const thumbFile = await ffmpeg.readFile(files.thumbnail);
  const mp4Blob = new Blob([mp4File], { type: "video/mp4" });
  const thumbBlob = new Blob([thumbFile], { type: "image/jpg" });
  const mp4Url = URL.createObjectURL(mp4Blob);
  const thumbUrl = URL.createObjectURL(thumbBlob);

  downloadFile(mp4Url, "MyRecording.mp4");
  downloadFile(thumbUrl, "MyThumbnail.jpg");

  await ffmpeg.deleteFile(files.input);
  await ffmpeg.deleteFile(files.output);
  await ffmpeg.deleteFile(files.thumbnail);

  URL.revokeObjectURL(videoFile);
  URL.revokeObjectURL(mp4Blob);
  URL.revokeObjectURL(thumbBlob);

  actionBtn.disabled = false;
  actionBtn.innerText = "Start Recording";
  actionBtn.addEventListener("click", handleStart);

  video.srcObject = stream;
  video.play();
};

const handleStart = () => {
  actionBtn.innerText = "Recording";
  actionBtn.disabled = true;
  actionBtn.removeEventListener("click", handleStart);
  actionBtn.addEventListener("click", handleDownload);

  recorder = new MediaRecorder(stream);
  recorder.ondataavailable = (e) => {
    videoFile = URL.createObjectURL(e.data);
    video.srcObject = null;
    video.src = videoFile;
    video.loop = true;
    video.play();
    actionBtn.innerText = "Download";
    actionBtn.disabled = false;
    actionBtn.addEventListener("click", handleDownload);
  };
  recorder.start();
  setTimeout(() => {
    recorder.stop();
  }, 5000);
};

const init = async () => {
  stream = await navigator.mediaDevices.getUserMedia({
    audio: true,
    video: { width: 320, height: 180 },
  });
  video.srcObject = stream;
  video.play();
};

init();
actionBtn.addEventListener("click", handleStart);
