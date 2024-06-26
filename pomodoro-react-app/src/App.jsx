import React, { useState, useEffect, useRef  } from 'react';
import './App.css'; // Make sure to import your CSS styles
import Clock from './components/Clock';
import ModeButton from './components/ModeButton';
import TaskListPanel from './components/TaskListPanel';


function App() {

  const [mode, setMode] = useState('pomodoro');
  const [timer, setTimer] = useState({ minutes: 1, seconds: 0 });
  const [isActive, setIsActive] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [currentTaskName, setCurrentTaskName] = useState('');
  const [sessions, setSessions] = useState(0);
  const [showTaskListPanel, setShowTaskListPanel] = useState(false);
  
  const pomodoroSound = useRef(null);
  const shortBreakSound = useRef(null);
  const longBreakSound = useRef(null);
  
  useEffect(() => {
    let interval = null;


    if (timer.minutes === 0 && timer.seconds === 0 && isActive) {
      handleTimerCompletion;
      notifyUser();
      // Additional logic to reset the timer for the new mode or stop the timer could go here
    }
  
    if (isActive) {
      interval = setInterval(() => {
        setTimer(prevTimer => {
          if (prevTimer.seconds === 0) {
            if (prevTimer.minutes === 0) {
              // Timer has finished
              setIsActive(false); // Stop the timer
              // Handle completion (e.g., switch modes, mark task as completed, etc.)
              return { minutes: 0, seconds: 0 };
            } else {
              // Minute has ended, start a new minute
              return { minutes: prevTimer.minutes - 1, seconds: 59 };
            }
          } else {
            // Decrement seconds
            return { ...prevTimer, seconds: prevTimer.seconds - 1 };
          }
        });
      }, 1000);
    } else if (!isActive && timer.minutes === 0 && timer.seconds === 0) {
      // Reset the timer when it's stopped and has reached 0
      // This depends on your app's logic. For example, reset to default time based on the current mode.
      // setTimer({ minutes: defaultTimeForMode, seconds: 0 }); 
    }
  
    return () => clearInterval(interval);
  }, [isActive, timer]);
  

  const handleModeChange = (newMode) => {
    setMode(newMode);
    handleStop();
  };

  const handleStop = () =>{
    setTimer({ minutes: 1, seconds: 0 })
    toggleMainButton(false);
  }

  const handleStartStop = () => {
    //TODO: 1a) if we are in active pomodoro, changing
    //to break reset the timer and remove active task
   
    ////TODO: 1b) if changing to pomodoro then reset clock

   
     
  };

  const markTaskCompleted = (taskName) => {
    console.log('task list ', tasks);
  };

  const handleTimerCompletion = () => {
    if (mode === 'pomodoro') {
      setSessions(prevSessions => {
        const newSessions = prevSessions + 1;
        const isLongBreak = newSessions % timerConfig.longBreakInterval === 0;
  
        setMode(isLongBreak ? 'longBreak' : 'shortBreak');
        markTaskCompleted(currentTaskName);
        return newSessions;
      });
    } else {
      setMode('pomodoro');
    }
  
    setTasks(prevTasks => {
      if (prevTasks.length > 0) {
        const updatedTasks = [...prevTasks];
        updatedTasks[updatedTasks.length - 1] = {
          ...updatedTasks[updatedTasks.length - 1],
          completed: true,
        };
        return updatedTasks;
      }
      return prevTasks;
    });
  
    notifyUser(); 
    playSound(); 
  };

  const notifyUser = () => {
    if (Notification.permission === 'granted') {
      const message = mode === 'pomodoro' ? 'Time to work!' : 'Time for a break!';
      new Notification(message);
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          const message = mode === 'pomodoro' ? 'Time to work!' : 'Time for a break!';
          new Notification(message);
        }
      });
    }
  };
  
  const handleRequestPermission = () => {
    if (!('Notification' in window)) {
      alert("This browser does not support desktop notification");
    } else if (Notification.permission !== 'granted') {
      Notification.requestPermission();
    }
  };
  
  const playSound = () => {
    if (mode === 'pomodoro') {
      pomodoroSound.current.play();
    } else if (mode === 'shortBreak') {
      shortBreakSound.current.play();
    } else if (mode === 'longBreak') {
      longBreakSound.current.play();
    }
  };

  return (
    <div className="app timer">
      <div className="mode-buttons">
        <ModeButton mode="pomodoro" active={mode === 'pomodoro'}  onClick={() => handleModeChange('pomodoro')} />
        <ModeButton mode="shortBreak" active={mode === 'shortBreak'} onClick={() => handleModeChange('shortBreak')} />
        <ModeButton mode="longBreak" active={mode === 'longBreak'} onClick={() => handleModeChange('longBreak')} />
      </div>
      <button onClick={handleRequestPermission}>Enable Notifications</button>
      <button onClick={() =>setShowTaskListPanel(!showTaskListPanel)}>Show Task List </button>
      <Clock minutes={timer.minutes} seconds={timer.seconds} />
       <div className="task-name-input">
        <input
          type="text"
          className="input-textbox"
          placeholder="Enter task name"
          value={currentTaskName}
          onChange={(e) => setCurrentTaskName(e.target.value)}
        />
      </div>
      <button onClick={handleStartStop}>{isActive ? 'Stop' : 'Start'}</button>
      {showTaskListPanel && <TaskListPanel tasks={tasks}  />}

      <audio ref={pomodoroSound} src="backtowork.mp3" preload="auto"></audio>
      <audio ref={shortBreakSound} src="break.mp3" preload="auto"></audio>
      <audio ref={longBreakSound} src="break.mp3" preload="auto"></audio>
    </div>
  );
}

export default App;
