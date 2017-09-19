class Pomodoro {
    constructor() {
        this.display = document.querySelector('#display');
        this.startBtns = document.querySelector('.card-header');
        this.controlBtns = document.querySelector('.card-footer');
        this.text = document.querySelector('#text');

        this.interval;
        this.startTime;
        this.endTime;
        //initialize timer with 25 mins left
        this.savedDistance = 1500000;
        this.savedSessionL = 1500000;
        this.idToMs = {
            shortBtn: 300000,
            longBtn: 600000,
            pomBtn: 1500000
        }
        this.addEvents();
    }

    addEvents() {
        this.startBtns.addEventListener("click", function(e) {
            if (e.target.id) {
                pomodoro.savedSessionL = pomodoro.idToMs[e.target.id];
                pomodoro.setTimer(pomodoro.idToMs[e.target.id]);
                pomodoro.startTimer();
                switch (e.target.id) {
                    case 'pomBtn':
                        pomodoro.text.textContent = 'WORK';
                        break;
                    case 'shortBtn':
                    case 'longBtn':
                        pomodoro.text.textContent = 'BREAK';
                        break;
                }
            }
        });
        this.controlBtns.addEventListener("click", function(e) {
            switch (e.target.id) {
                case 'pause':
                    pomodoro.pauseTimer();
                    break;
                case 'play':
                    pomodoro.resumeTimer();
                    break;
                case 'reset':
                    clearInterval(pomodoro.interval);
                    pomodoro.setTimer(pomodoro.savedSessionL);
                    break;
            }
        })
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
        let audio = new Audio("beep.mp3");
        audio.play();
    }

    setTimer(timerLength) {
        this.startTime = Date.now();
        this.endTime = this.startTime + timerLength;
        pomodoro.updateDisplay(timerLength);
    }

    startTimer() {
        this.interval = setInterval(this.updateTimer, 250);
    }

    stopTimer(timerID) {
        clearInterval(timerID);
        pomodoro.interval = false;
    }

    updateTimer() {
        let currTime = Date.now();
        let distance = pomodoro.endTime - currTime;
        pomodoro.updateDisplay(distance);
        if (distance < 1000) {
            document.querySelector('body').style.backgroundColor = "green";
            pomodoro.stopTimer(pomodoro.interval);
            pomodoro.updateDisplay(0);
            pomodoro.playSound();
        }
    }

    pauseTimer() {
        console.log('pauseTimer');
        if (pomodoro.interval) {
            let currTime = Date.now();
            this.savedDistance = pomodoro.endTime - currTime;
            pomodoro.stopTimer(pomodoro.interval);
        }
    }

    resumeTimer() {
        console.log('resumeTimer');
        if (!pomodoro.interval) {
            this.setTimer(pomodoro.savedDistance);
            this.startTimer();
        }
    }
}

//event doesn't trigger when clicking on icons

var pomodoro = new Pomodoro();
