// Order number system
let history = []; // keeps track of all states for undo
let currentNumber = 0; // starts at 0
let buffer = ''; // stores manual input digits

const currentEl = document.getElementById('current');
const prev1El = document.getElementById('prev1');
const prev2El = document.getElementById('prev2');
const prev3El = document.getElementById('prev3');

// Update the display
function render() {
  currentEl.textContent = currentNumber;

  // Show last 3 numbers in history (skip current one)
  const last = history.slice(-3).reverse();
  prev1El.textContent = last[0] ?? '-';
  prev2El.textContent = last[1] ?? '-';
  prev3El.textContent = last[2] ?? '-';
}

// Save current state into history
function saveState() {
  history.push(currentNumber);
  if (history.length > 1000) history.shift(); // prevent infinite growth
}

// Handle increment (Enter with empty buffer)
function increment() {
  saveState();
  currentNumber++;
  if (currentNumber > 100) currentNumber = 1; // wrap around
  render();
}

// Handle jump (digits + Enter)
function jumpTo(num) {
  saveState();
  currentNumber = num;
  if (currentNumber > 100) currentNumber = 1;
  render();
}

// Handle undo (space key)
function undo() {
  if (history.length === 0) return;
  currentNumber = history.pop();
  render();
}

// Keyboard listener
document.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === '+') {
    if (buffer.length > 0) {
      jumpTo(parseInt(buffer, 10));
      buffer = '';
    } else {
      increment();
    }
  } else if (e.key === '-') {
    e.preventDefault(); // prevent scrolling
    undo();
  } else if (/^[0-9]$/.test(e.key)) {
    buffer += e.key;
  }
});

// Initial render
render();
