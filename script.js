let timerElement = document.getElementById('timer');
let statusElement = document.getElementById('status');
let interval;
let startTime;
let elapsedTime = 0;
let running = false;
let clickCount = 0;

function formatTime(ms) {
    let totalSeconds = Math.floor(ms / 1000);
    let hours = Math.floor(totalSeconds / 3600);
    let minutes = Math.floor((totalSeconds % 3600) / 60);
    let seconds = totalSeconds % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function updateTimer() {
    elapsedTime = new Date() - startTime;
    timerElement.textContent = formatTime(elapsedTime);
}

function updateStatus() {
    if (running) {
        statusElement.textContent = 'In progress';
        statusElement.classList.remove('stopped');
        statusElement.classList.add('in-progress');
    } else {
        statusElement.textContent = 'Stop';
        statusElement.classList.remove('in-progress');
        statusElement.classList.add('stopped');
    }
}

function handleScreenClick() {
    clickCount++;
    if (clickCount % 4 === 1) {
        // Start or resume
        if (!running) {
            startTime = new Date() - elapsedTime;
            interval = setInterval(updateTimer, 1000);
            running = true;
            updateStatus();
        }
    } else if (clickCount % 4 === 2) {
        // Stop
        if (running) {
            clearInterval(interval);
            running = false;
            updateStatus();
        }
    } else if (clickCount % 4 === 3) {
        // Reset
        clearInterval(interval);
        elapsedTime = 0;
        timerElement.textContent = formatTime(elapsedTime);
        running = false;
        updateStatus();
    } else if (clickCount % 4 === 0) {
        // Restart
        startTime = new Date() - elapsedTime;
        interval = setInterval(updateTimer, 1000);
        running = true;
        updateStatus();
    }
}

document.body.addEventListener('click', handleScreenClick);