// Configuration for work and break intervals
const timerConfig = {
  pomodoro: 1,
  shortBreak: 1,
  longBreak: 15,
  longBreakInterval: 4,
  sessions: 0,
  mode: 'pomodoro',
  remainingTime: { total: 60, minutes: 1, seconds: 0 },
};

//TODO: add typescript to enforce this data scructure
//example { name: <taskName>, time:<minutes> , completed:false }
const tasks = [];
const buttonSound = new Audio('button-sound.mp3');
const modeButtons = document.querySelector('#js-mode-buttons');
const mainButton = document.getElementById('js-btn');
const MILLISECONDS_IN_A_SECOND = 1000;
let interval;


// Event listeners
document.addEventListener('DOMContentLoaded', initialize);
modeButtons.addEventListener('click', handleModeClick);
mainButton.addEventListener('click', handleMainButtonClick);

function initialize() {
  requestNotificationPermission();
  switchMode('pomodoro');
}

function requestNotificationPermission() {
  if ('Notification' in window && Notification.permission !== 'granted' && Notification.permission !== 'denied') {
    Notification.requestPermission().then(permission => {
      if (permission === 'granted') {
        new Notification('Notifications are enabled.');
      }
    });
  }
}

function handleModeClick(event) {
  const mode = event.target.dataset.mode;
  if (!mode) return;

  switchMode(mode);
  stopTimer();
}

function switchMode(mode) {
  Object.assign(timerConfig, {
    mode,
    remainingTime: {
      total: timerConfig[mode] * 60,
      minutes: timerConfig[mode],
      seconds: 0,
    },
  });

  document.querySelectorAll('button[data-mode]').forEach(e => e.classList.remove('active'));
  document.querySelector(`[data-mode="${mode}"]`).classList.add('active');
  document.body.style.backgroundColor = `var(--${mode})`;
  document.getElementById('js-progress').setAttribute('max', timerConfig.remainingTime.total);

  stopTimer();
  updateClock();
}

function updateClock() {
  const { minutes, seconds } = timerConfig.remainingTime;
  document.getElementById('js-minutes').textContent = String(minutes).padStart(2, '0');
  document.getElementById('js-seconds').textContent = String(seconds).padStart(2, '0');
  document.title = `${minutes}:${seconds} — ${timerConfig.mode === 'pomodoro' ? 'Get back to work!' : 'Take a break!'}`;
  document.getElementById('js-progress').value = timerConfig[timerConfig.mode] * 60 - timerConfig.remainingTime.total;
}

function startTimer() {
  if (timerConfig.mode === 'pomodoro') {
    timerConfig.sessions++;
    recordTask();
  }

  toggleMainButton(true);

  //current time + remaining time stored as milisecounds
  const endTime = new Date().getTime() + timerConfig.remainingTime.total * MILLISECONDS_IN_A_SECOND;

  interval = setInterval(() => {
    timerConfig.remainingTime = calculateRemainingTime(endTime);
    updateClock();

    if (timerConfig.remainingTime.total <= 0) {
      clearInterval(interval);
      handleTimerCompletion();
    }
  }, MILLISECONDS_IN_A_SECOND);
}

function stopTimer() {
  clearInterval(interval);
  toggleMainButton(false);
}

function handleMainButtonClick() {
  buttonSound.play();
  const action = mainButton.dataset.action;
  action === 'start' ? startTimer() : stopTimer();
}

function toggleMainButton(isActive) {
  mainButton.dataset.action = isActive ? 'stop' : 'start';
  mainButton.textContent = isActive ? 'Stop' : 'Start';
  mainButton.classList.toggle('active', isActive);
}

function calculateRemainingTime(endTime) {
  const total = Math.floor((endTime - new Date().getTime()) / MILLISECONDS_IN_A_SECOND);
  return {
    total,
    minutes: Math.floor((total / 60) % 60),
    seconds: Math.floor(total % 60),
  };
}

function recordTask() {
  const taskName = document.getElementById('taskName').value || 'No task name';
  tasks.push({ name: taskName, time: timerConfig[timerConfig.mode], completed:false });
}

function handleTimerCompletion() {
  switch (timerConfig.mode) {
    case 'pomodoro':
      if (timerConfig.sessions % timerConfig.longBreakInterval === 0) {
        switchMode('longBreak');
      } else {
        switchMode('shortBreak');
      }
      break;
    default:
      switchMode('pomodoro');
  }
  tasks[tasks.length - 1].completed = true;
  notifyUser();
  playSound();
}

function notifyUser() {
  if (Notification.permission === 'granted') {
    new Notification(timerConfig.mode === 'pomodoro' ? 'Time to work!' : 'Time for a break!');
  }
}

function playSound() {
  document.querySelector(`[audio-data="${timerConfig.mode}"]`).play();
}

/* code for completed task panel */
document.getElementById('js-task-list').addEventListener('click', () => {
  const taskListPanel = document.getElementById('taskListPanel');
  const completedTasksList = document.getElementById('completedTasks');

  // Toggle the panel
  taskListPanel.classList.toggle('open');

  // Clear current list
  completedTasksList.innerHTML = '';
  tasks.filter(task => task.completed).forEach(task => {
    const taskElement = document.createElement('li');
    taskElement.textContent = `${task.name} - ${task.time} minutes`;
    completedTasksList.appendChild(taskElement);
  });
  console.log(tasks);
});

