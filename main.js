class Pomodoro {
    constructor() {
        this.display = document.querySelector('#display');
        this.startBtns = document.querySelector('.card-header');
        this.controlBtns = document.querySelector('.card-footer');

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
        if (distance < 1000) {
            document.querySelector('body').style.backgroundColor = "green";
            clearInterval(pomodoro.interval);
            pomodoro.interval = false;
            pomodoro.updateDisplay(0);
            pomodoro.playSound();
        }
        pomodoro.updateDisplay(distance);
    }

    pauseTimer() {
        //only pause if timer is running
        if (pomodoro.interval) {
            //save curr time
            let currTime = Date.now();
            //save time to go
            this.savedDistance = pomodoro.endTime - currTime;
            //stop timer
            clearInterval(pomodoro.interval);
            pomodoro.interval = false;
        }
    }

    resumeTimer() {
        this.setTimer(pomodoro.savedDistance);
        this.startTimer();
    }


}

var pomodoro = new Pomodoro();
