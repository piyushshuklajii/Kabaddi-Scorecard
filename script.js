let matchInterval;
let matchSeconds = 1200; // Default 20 minutes
let raidInterval;
let raidSeconds = 30;
let isPaused = false;

function toggleMatch() {
  let button = document.getElementById("startMatchButton");
  if (button.textContent === "Start Match") {
    document.getElementById("pauseResume").disabled = false;
    button.textContent = "Reset Match";
    startMatchTimer();
  } else {
    resetMatch();
  }
}

function startMatchTimer() {
  clearInterval(matchInterval);
  matchInterval = setInterval(() => {
    if (matchSeconds > 0 && !isPaused) {
      matchSeconds--;
      updateMatchTimerDisplay();
    } else {
      clearInterval(matchInterval);
    }
  }, 1000);
}

function updateMatchTimerDisplay() {
  let minutes = Math.floor(matchSeconds / 60);
  let seconds = matchSeconds % 60;
  document.getElementById("matchTimer").textContent = `${minutes}:${seconds
    .toString()
    .padStart(2, "0")}`;
}

function resetMatch() {
  clearInterval(matchInterval);
  matchSeconds = 1200;
  updateMatchTimerDisplay();
  document.getElementById("startMatchButton").textContent = "Start Match";
  document.getElementById("pauseResume").disabled = true;
}

function toggleMatchTimer() {
  let button = document.getElementById("pauseResume");
  if (button.textContent === "Pause") {
    isPaused = true;
    button.textContent = "Resume";
  } else {
    isPaused = false;
    button.textContent = "Pause";
    startMatchTimer();
  }
}

function toggleRaid() {
  let button = document.getElementById("raidButton");
  if (button.textContent === "Start Raid") {
    startRaidTimer();
    button.textContent = "Reset Raid";
    button.classList.replace("start", "reset");
  } else {
    resetRaidTimer();
  }
}

function startRaidTimer() {
  clearInterval(raidInterval);
  raidSeconds = 30;
  raidInterval = setInterval(() => {
    if (raidSeconds > 0) {
      raidSeconds--;
      document.getElementById("raidTimer").textContent = raidSeconds;
    } else {
      clearInterval(raidInterval);
    }
  }, 1000);
}

function resetRaidTimer() {
  clearInterval(raidInterval);
  raidSeconds = 30;
  document.getElementById("raidTimer").textContent = raidSeconds;
  let button = document.getElementById("raidButton");
  button.textContent = "Start Raid";
  button.classList.replace("reset", "start");
}

function changeScore(team, value) {
  let scoreElement = document.getElementById(`score${team}`);
  let currentScore = parseInt(scoreElement.textContent);
  let newScore = currentScore + value;
  if (newScore >= 0) {
    scoreElement.textContent = newScore;
  }
}

function resetScores() {
  document.getElementById("scoreA").textContent = "0";
  document.getElementById("scoreB").textContent = "0";
}
