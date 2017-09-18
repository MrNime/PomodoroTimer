class Pomodoro {
    constructor() {
        this.ms = 0;
        this.display = document.querySelector('#display');
    }

    format(t) {
        let tens_minutes = Math.floor(t / 600000);
        let ones_minutes = Math.floor((t % 600000) / 60000);
        let tens_seconds = Math.floor((t % 600000 % 60000) / 10000);
        let ones_seconds = Math.floor(((t % 600000) % 60000 % 10000) / 1000);
        return `${tens_minutes}${ones_minutes}:${tens_seconds}${ones_seconds}`
    }

    updateDisplay(t) {
        display.textContent = this.format(t);
    }

    playSound() {
        let audio = new Audio("http://soundbible.com/grab.php?id=1746&type=mp3");
        audio.play();
    }

    setTimer(timerLength) {
        this.startTime = Date.now();
        this.endTime = this.startTime + timerLength;
        pomodoro.updateDisplay(timerLength);
    }

    startTimer() {
        this.interval = setInterval(this.updateTimer, 1000);
    }

    updateTimer() {
        let currTime = Date.now();
        let distance = pomodoro.endTime - currTime;
        pomodoro.updateDisplay(distance);
    }


}

var pomodoro = new Pomodoro();

idToMs = {
    shortBtn: 300000,
    longBtn: 600000,
    pomBtn: 1500000
}
function event(e) {
    if (e.target.id) {
        pomodoro.setTimer(idToMs[e.target.id]);
        pomodoro.startTimer();
    }
}
var startButtons = document.querySelector('.card-header');
startButtons.addEventListener("click", event);
// longBreakBtn.addEventListener('mouseup', console.log(2))
// pomodoro.startTimer(pomodoro.pomodoroMs)
//
// countDownTime = Date.now() + 300000;
// setInterval(function() {
//     let currTime = Date.now();
//     let distance = countDownTime - currTime;
//     pomodoro.updateDisplay(distance);
// }, 1000);
