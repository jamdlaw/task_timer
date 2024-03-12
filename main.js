//configure work time and break intervals, one day will be on the frount end
const timer = {
    pomodoro: 1,
    shortBreak: 1,
    longBreak: 15,
    longBreakInterval: 4,
    sessions: 0,
  };
//ex task {name:"clean house", time:25}
const tasks = [];
const buttonSound = new Audio('button-sound.mp3');
const modeButtons = document.querySelector('#js-mode-buttons');
const mainButton = document.getElementById('js-btn');
let interval;
let countTimerUpInterval;
let totalSeconds = 0;

//declare functions
function handleMode(event) {
  const { mode } = event.target.dataset;
  
  if (!mode) return;

  switchMode(mode);
  stopTimer();
}

function switchMode(mode) {
    timer.mode = mode;
    timer.remainingTime = {
      total: timer[mode] * 60,
      minutes: timer[mode],
      seconds: 0,
    };
  
    document
      .querySelectorAll('button[data-mode]')
      .forEach(e => e.classList.remove('active'));
    document.querySelector(`[data-mode="${mode}"]`).classList.add('active');
    document.body.style.backgroundColor = `var(--${mode})`;
    document
    .getElementById('js-progress')
    .setAttribute('max', timer.remainingTime.total);

    stopTimer();
    updateClock();
}

  function updateClock() {
    const { remainingTime } = timer;
    const minutes = `${remainingTime.minutes}`.padStart(2, '0');
    const seconds = `${remainingTime.seconds}`.padStart(2, '0');
  
    const min = document.getElementById('js-minutes');
    const sec = document.getElementById('js-seconds');
    min.textContent = minutes;
    sec.textContent = seconds;

    const text = timer.mode === 'pomodoro' ? 'Get back to work!' : 'Take a break!';
    document.title = `${minutes}:${seconds} — ${text}`;

    const progress = document.getElementById('js-progress');
    progress.value = timer[timer.mode] * 60 - timer.remainingTime.total;
  
}

  function getRemainingTime(endTime) {
    const currentTime = Date.parse(new Date());
    const difference = endTime - currentTime;
  
    const total = Number.parseInt(difference / 1000, 10);
    const minutes = Number.parseInt((total / 60) % 60, 10);
    const seconds = Number.parseInt(total % 60, 10);
  
    return {
      total,
      minutes,
      seconds,
    };
}

  function startTimer() {
    let { total } = timer.remainingTime;
    const endTime = Date.parse(new Date()) + total * 1000;

    if (timer.mode === 'pomodoro'){
      timer.sessions++; 
      let taskName = document.getElementById('taskName').value;
      tasks.push({'name': taskName, 'time':0.0 });
      console.log(tasks);
    }
     
    
    mainButton.dataset.action = 'stop';
    mainButton.textContent = 'stop';
    mainButton.classList.add('active');

    interval = setInterval(function() {
      timer.remainingTime = getRemainingTime(endTime);
      updateClock();
  
      total = timer.remainingTime.total;
      if (total <= 0) {
        clearInterval(interval);
        switch (timer.mode) {
            case 'pomodoro':
              task = tasks[tasks.length -1];
              task.time = countUpTimer();
              totalSeconds = 0;
              console.log(tasks);
              document.getElementById("countupTimer").innerHTML = '00' + ":" + '00' + ":" + '00';
              if (timer.sessions % timer.longBreakInterval === 0) {
                switchMode('longBreak');
              } else {
                switchMode('shortBreak');
              }
              break;
            default:
              switchMode('pomodoro');
          }
        if (Notification.permission === 'granted') {
        const text =
            timer.mode === 'pomodoro' ? 'Get back to work!' : 'Take a break!';
        new Notification(text);
        }
        document.querySelector(`[data-sound="${timer.mode}"]`).play();
      }
    }, 1000);

    countTimerUpInterval = setInterval(countUpTimer, 1000)
}

  function stopTimer() {
    clearInterval(interval);
    clearInterval(countTimerUpInterval);
    mainButton.dataset.action = 'start';
    mainButton.textContent = 'start';
    mainButton.classList.remove('active');  
}

  function countUpTimer() {
           ++totalSeconds;
           var hour = Math.floor(totalSeconds /3600);
           var minute = Math.floor((totalSeconds - hour*3600)/60);
           var seconds = totalSeconds - (hour*3600 + minute*60);
           if(hour < 10)
             hour = "0"+hour;
           if(minute < 10)
             minute = "0"+minute;
           if(seconds < 10)
             seconds = "0"+seconds;
           document.getElementById("countupTimer").innerHTML = hour + ":" + minute + ":" + seconds;

           return hour + ":" + minute + ":" + seconds;
}

//add event handlers
modeButtons.addEventListener('click', handleMode);
document.addEventListener('DOMContentLoaded', () => {
  // Let's check if the browser supports notifications
if ('Notification' in window) {
 // If notification permissions have neither been granted or denied
 if (Notification.permission !== 'granted' && Notification.permission !== 'denied') {
   // ask the user for permission
   Notification.requestPermission().then(function(permission) {
     // If permission is granted
     if (permission === 'granted') {
       // Create a new notification
       new Notification(
         'Awesome! You will be notified at the start of each session'
       );
     }
   });
 }
}
 switchMode('pomodoro');
});

mainButton.addEventListener('click', () => {
buttonSound.play();  
const { action } = mainButton.dataset;
if (action === 'start') {
 startTimer();
}
else {
 stopTimer();
}
});
