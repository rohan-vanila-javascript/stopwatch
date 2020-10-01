const timer = document.querySelector(".display");
const start = document.querySelector(".start");
const resume = document.querySelector(".resume");
const pause = document.querySelector(".pause");

let reference;
let startId;
let pauseTime;
let clockIsPaused = false;

// Start clock
function startClock() {
  clockIsPaused = false;
  clearInterval(startId);
  reference = Date.now();

  startId = setInterval(updateDisplay, 100);
}

// Pause clock
function pauseClock() {
  // pause only if clock is already running
  if (!clockIsPaused) {
    clearInterval(startId);
    pauseTime = Date.now();
    clockIsPaused = true;
  }
}

function resumeClock() {
  // Resume only if clock is paused
  if (clockIsPaused) {
    clearInterval(startId);
    reference += Date.now() - pauseTime;
    startId = setInterval(updateDisplay, 100);
    clockIsPaused = false;
  }
}

// Helper to display digits correctly
function padZero(num) {
  return num < 10 ? "0" + num : "" + num;
}

// displaying the digits
function updateDisplay() {
  const currentTime = Date.now() - reference;

  // Conversion of milliseconds to time format
  const minutes = Math.floor(currentTime / (1000 * 60));
  const rem = currentTime - minutes * 60000;
  const seconds = Math.floor(rem / 1000);
  const millis = Math.floor((rem % 1000) / 100);

  timer.textContent = `${padZero(minutes)}:${padZero(seconds)}:${millis}`;
}

// Events for control
start.addEventListener("click", startClock);
pause.addEventListener("click", pauseClock);
resume.addEventListener("click", resumeClock);
