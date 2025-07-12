let interval;
let totalSeconds = 0;
let paused = false;

function populateTimeSelects() {
  const hourSelect = document.getElementById("hours");
  const minuteSelect = document.getElementById("minutes");
  const secondSelect = document.getElementById("seconds");

  // Helper to populate dropdowns
  function fillOptions(select, max, label) {
    select.innerHTML = `<option value="0">${label}</option>`;
    for (let i = 0; i < max; i++) {
      const padded = String(i).padStart(2, '0');
      select.innerHTML += `<option value="${i}">${padded}</option>`;
    }
  }

  fillOptions(hourSelect, 24, 'HH');
  fillOptions(minuteSelect, 60, 'MM');
  fillOptions(secondSelect, 60, 'SS');
}

function startTimer() {
  const h = parseInt(document.getElementById("hours").value) || 0;
  const m = parseInt(document.getElementById("minutes").value) || 0;
  const s = parseInt(document.getElementById("seconds").value) || 0;

  totalSeconds = h * 3600 + m * 60 + s;

  if (totalSeconds <= 0) {
    alert("Please select a valid time.");
    return;
  }

  if (interval) clearInterval(interval);
  paused = false;

  interval = setInterval(() => {
    if (!paused && totalSeconds > 0) {
      totalSeconds--;
      updateDisplay();
    } else if (totalSeconds === 0) {
      clearInterval(interval);
      alert("⏰ Time's up!");
    }
  }, 1000);

  updateDisplay();
}

function togglePause() {
  if (interval) {
    paused = !paused;
  }
}

function resetTimer() {
  clearInterval(interval);
  totalSeconds = 0;
  updateDisplay();
}

function updateDisplay() {
  const h = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
  const m = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
  const s = String(totalSeconds % 60).padStart(2, '0');
  document.getElementById("display").textContent = `${h}:${m}:${s}`;
}

window.onload = populateTimeSelects;
