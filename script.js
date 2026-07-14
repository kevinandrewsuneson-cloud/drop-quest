// Core game constants for resource costs and progress gains
const WELL_COST = 10;
const FILTRATION_COST = 15;
const WELL_PROGRESS_GAIN = 40;
const FILTRATION_PROGRESS_GAIN = 60;
const GAME_DURATION_SECONDS = 60;

// Track mutable game state in one place
const state = {
  timer: GAME_DURATION_SECONDS,
  score: 0,
  water: 0,
  resources: 0,
  progress: 0,
  wellBuilt: false,
  filtrationBuilt: false,
  intervalId: null,
  gameActive: false
};

// Collect needed DOM elements once
const screens = {
  landing: document.getElementById("screen-landing"),
  howToPlay: document.getElementById("screen-how-to-play"),
  game: document.getElementById("screen-game"),
  win: document.getElementById("screen-win"),
  lose: document.getElementById("screen-lose")
};

const timerEl = document.getElementById("timer");
const scoreEl = document.getElementById("score");
const waterCountEl = document.getElementById("water-count");
const resourceCountEl = document.getElementById("resource-count");
const progressEl = document.getElementById("clean-water-progress");
const progressPercentEl = document.getElementById("progress-percent");
const statusMessageEl = document.getElementById("status-message");
const winScoreEl = document.getElementById("win-score");
const loseScoreEl = document.getElementById("lose-score");

const startGameBtn = document.getElementById("start-game-btn");
const howToPlayBtn = document.getElementById("how-to-play-btn");
const backToLandingBtn = document.getElementById("back-to-landing-btn");
const waterDropBtn = document.getElementById("water-drop-btn");
const collectSuppliesBtn = document.getElementById("collect-supplies-btn");
const buildWellBtn = document.getElementById("build-well-btn");
const buildFiltrationBtn = document.getElementById("build-filtration-btn");
const playAgainBtn = document.getElementById("play-again-btn");
const tryAgainBtn = document.getElementById("try-again-btn");

// Show one screen at a time
function showScreen(screenName) {
  Object.values(screens).forEach((screen) => screen.classList.remove("active"));
  screens[screenName].classList.add("active");
}

// Keep all game numbers and button states in sync with state
function render() {
  timerEl.textContent = String(state.timer);
  scoreEl.textContent = String(state.score);
  waterCountEl.textContent = String(state.water);
  resourceCountEl.textContent = String(state.resources);
  progressEl.value = state.progress;
  progressPercentEl.textContent = `${state.progress}%`;

  updateButtonStates();
}

// Keep action button disabled states centralized
function updateButtonStates() {
  buildWellBtn.disabled = state.wellBuilt || state.resources < WELL_COST || !state.gameActive;
  buildFiltrationBtn.disabled =
    state.filtrationBuilt || state.resources < FILTRATION_COST || !state.gameActive;
  waterDropBtn.disabled = !state.gameActive;
  collectSuppliesBtn.disabled = !state.gameActive;
}

// Helper to write gameplay updates to the status area
function setStatusMessage(message) {
  statusMessageEl.textContent = message;
}

// Start or restart game state
function initializeGame() {
  if (state.intervalId) {
    clearInterval(state.intervalId);
  }

  state.timer = GAME_DURATION_SECONDS;
  state.score = 0;
  state.water = 0;
  state.resources = 0;
  state.progress = 0;
  state.wellBuilt = false;
  state.filtrationBuilt = false;
  state.gameActive = true;

  setStatusMessage("Collect water and supplies to help the village.");
  showScreen("game");
  render();
  startTimer();
}

// Countdown timer that triggers a loss if time expires first
function startTimer() {
  state.intervalId = setInterval(() => {
    if (!state.gameActive) {
      return;
    }

    state.timer -= 1;

    if (state.timer <= 0) {
      state.timer = 0;
      endGame(false);
    }

    render();
  }, 1000);
}

// Win/loss handler with final score display
function endGame(didWin) {
  state.gameActive = false;
  clearInterval(state.intervalId);
  state.intervalId = null;

  if (didWin) {
    winScoreEl.textContent = String(state.score);
    showScreen("win");
    return;
  }

  loseScoreEl.textContent = String(state.score);
  showScreen("lose");
}

// Main gameplay action for collecting water
function collectWater() {
  if (!state.gameActive) {
    return;
  }

  state.water += 1;
  state.score += 5;
  setStatusMessage("You collected water (+1 water, +5 score).");
  render();
}

// Secondary gameplay action for collecting supplies/resources
function collectSupplies() {
  if (!state.gameActive) {
    return;
  }

  state.resources += 3;
  state.score += 2;
  setStatusMessage("You collected supplies (+3 resources, +2 score).");
  render();
}

// Build well when enough resources exist
function buildWell() {
  if (!state.gameActive || state.wellBuilt || state.resources < WELL_COST) {
    return;
  }

  state.resources -= WELL_COST;
  state.wellBuilt = true;
  state.progress = Math.min(100, state.progress + WELL_PROGRESS_GAIN);
  state.score += 20;
  setStatusMessage("Well built! Clean-water meter increased.");
  checkWinCondition();
  render();
}

// Build filtration system when enough resources exist
function buildFiltrationSystem() {
  if (!state.gameActive || state.filtrationBuilt || state.resources < FILTRATION_COST) {
    return;
  }

  state.resources -= FILTRATION_COST;
  state.filtrationBuilt = true;
  state.progress = Math.min(100, state.progress + FILTRATION_PROGRESS_GAIN);
  state.score += 30;
  setStatusMessage("Filtration system built! Water quality improved.");
  checkWinCondition();
  render();
}

// End in a win once meter reaches 100%
function checkWinCondition() {
  if (state.progress >= 100) {
    endGame(true);
  }
}

// Attach all UI events
startGameBtn.addEventListener("click", initializeGame);
howToPlayBtn.addEventListener("click", () => showScreen("howToPlay"));
backToLandingBtn.addEventListener("click", () => showScreen("landing"));
waterDropBtn.addEventListener("click", collectWater);
collectSuppliesBtn.addEventListener("click", collectSupplies);
buildWellBtn.addEventListener("click", buildWell);
buildFiltrationBtn.addEventListener("click", buildFiltrationSystem);
playAgainBtn.addEventListener("click", initializeGame);
tryAgainBtn.addEventListener("click", initializeGame);

// Initial render for default landing view
render();
