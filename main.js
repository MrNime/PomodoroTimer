var display = document.querySelector('#display'),
startBtns = document.querySelector('.card-header'),
controlBtns = document.querySelector('.card-footer'),
text = document.querySelector('#text'),

interval,
startTime,
endTime,
//initialize timer with 25 mins left
savedDistance = 1500000,
savedSessionL = 1500000;
const idToMs = {
    shortBtn: 300000,
    longBtn: 600000,
    pomBtn: 1500000
}

startBtns.addEventListener("click", function(e) {
    if (e.target.id) {
        //stop timer before setting a new one!
        stopTimer(interval);
        savedSessionL = idToMs[e.target.id];
        setTimer(idToMs[e.target.id]);
        startTimer();
        switch (e.target.id) {
            case 'pomBtn':
            text.textContent = 'WORK';
            break;
            case 'shortBtn':
            case 'longBtn':
            text.textContent = 'BREAK';
            break;
        }
    }
});
controlBtns.addEventListener("click", function(e) {
    switch (e.target.id) {
        case 'pause':
        pauseTimer();
        break;
        case 'play':
        resumeTimer();
        break;
        case 'reset':
        stopTimer(interval);
        savedDistance = savedSessionL;
        setTimer(savedSessionL);
        break;
    }
});

function format(t) {
    let tens_minutes = Math.floor(t / 600000);
    let ones_minutes = Math.floor((t % 600000) / 60000);
    let tens_seconds = Math.floor((t % 600000 % 60000) / 10000);
    let ones_seconds = Math.floor(((t % 600000) % 60000 % 10000) / 1000);
    return `${tens_minutes}${ones_minutes}:${tens_seconds}${ones_seconds}`
}

function updateDisplay(t) {
    display.textContent = format(t);
}

function playSound() {
    let audio = new Audio("beep.mp3");
    audio.play();
    let count = 1;
    audio.onended = function() {
        if(count < 4) {
          count++;
          this.play();
       }
    };
}

function setTimer(timerLength) {
    startTime = Date.now();
    endTime = startTime + timerLength;
    updateDisplay(timerLength);
}

function startTimer() {
    interval = setInterval(updateTimer, 250);
}

function stopTimer(timerID) {
    clearInterval(timerID);
    interval = null;
}

function updateTimer() {
    let currTime = Date.now();
    let distance = endTime - currTime;
    updateDisplay(distance);
    if (distance < 1000) {
        // document.querySelector('body').style.backgroundColor = "green";
        stopTimer(interval);
        updateDisplay(0);
        playSound();
    }
}

function pauseTimer() {
    if (interval) {
        let currTime = Date.now();
        savedDistance = endTime - currTime;
        stopTimer(interval);
    }
}

function resumeTimer() {
    if (!interval) {
        setTimer(savedDistance);
        startTimer();
    }
}
