/* Get Our Elements */
const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");
const toggle = player.querySelector(".toggle");
const fullScreenBtn = player.querySelector(".player__button-fs");
const skipButtons = player.querySelectorAll("[data-skip]");
const ranges = player.querySelectorAll(".player__slider");

function togglePlay() {
  video.paused ? video.play() : video.pause();
}

function updateButton() {
  this.paused ? (toggle.textContent = "►") : (toggle.textContent = "| |");
}

function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

function handleUpdateRange() {
  const { name, value } = this;
  video[name] = value;
}

function handleProgress() {
  const { currentTime, duration } = this;
  let percent = (currentTime / duration) * 100;

  progressBar.style.flexBasis = `${percent}%`;
}

function scrubProgressBar(e) {
  video.currentTime = (e.offsetX / progress.offsetWidth) * video.duration;
}

video.addEventListener("click", togglePlay);
video.addEventListener("play", updateButton);
video.addEventListener("pause", updateButton);
video.addEventListener("timeupdate", handleProgress);

toggle.addEventListener("click", togglePlay);

skipButtons.forEach((btn) => btn.addEventListener("click", skip));

ranges.forEach((range) => range.addEventListener("change", handleUpdateRange));
ranges.forEach((range) =>
  range.addEventListener("mousemove", handleUpdateRange)
);

let mouseDown = false;

progress.addEventListener("click", scrubProgressBar);
progress.addEventListener("mousemove", (e) => mouseDown && scrubProgressBar(e));

// when we just write this -> progress.addEventListener("mousemove", scrubProgressBar)
// the video duration changes on mouse hover too. We want to change it only on mouseclick
// on progress bar, hence the mouseDown flag & 2 events are used.

progress.addEventListener("mousedown", () => (mouseDown = true));
progress.addEventListener("mouseup", () => (mouseDown = false));

fullScreenBtn.addEventListener("click", (e) => {
  player.classList.toggle("player-fullscreen");
});
