function startCountdown(durationInSeconds) {
    let timerElement = document.getElementById("timer");

    // Check if there's a saved end time in localStorage
    let endTime = localStorage.getItem("countdownEndTime");

    if (!endTime) {
        // Set new end time and save it
        endTime = Date.now() + durationInSeconds * 1000;
        localStorage.setItem("countdownEndTime", endTime);
    } else {
        // Convert stored endTime to number
        endTime = parseInt(endTime);
    }

    function updateTimer() {
        let currentTime = Date.now();
        let timeLeft = Math.max(0, Math.floor((endTime - currentTime) / 1000)); // Avoid negative time

        let hours = String(Math.floor(timeLeft / 3600)).padStart(2, '0');
        let minutes = String(Math.floor((timeLeft % 3600) / 60)).padStart(2, '0');
        let seconds = String(timeLeft % 60).padStart(2, '0');

        timerElement.textContent = `${hours}:${minutes}:${seconds}`;

        if (timeLeft > 0) {
            setTimeout(updateTimer, 1000);
        } else {
            localStorage.removeItem("countdownEndTime"); // Reset when countdown ends
        }
    }

    updateTimer();
}

// Start a 10-hour countdown
startCountdown(10 * 60 * 60);
