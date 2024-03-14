import React, { useState, useEffect } from 'react';
import './App.css'; // Make sure to import your CSS styles
import Clock from './components/Clock';
import ModeButton from './components/ModeButton';
import TaskListPanel from './components/TaskListPanel';


function App() {
  const [mode, setMode] = useState('pomodoro');
  const [timer, setTimer] = useState({ minutes: 25, seconds: 0 });
  const [isActive, setIsActive] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [currentTaskName, setCurrentTaskName] = useState('');
  
  useEffect(() => {
    let interval = null;
  
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
    // Update timer based on mode
  };

  const handleStartStop = () => {
    setIsActive(!isActive);
    // Start or stop the timer
  };

  const markTaskCompleted = (taskName) => {
    // Logic to mark a task as completed
  };

  return (
    <div className="app timer">
      <div className="mode-buttons">
        <ModeButton mode="pomodoro" active={mode === 'pomodoro'} setMode={setMode} />
        <ModeButton mode="shortBreak" active={mode === 'shortBreak'} setMode={setMode} />
        <ModeButton mode="longBreak" active={mode === 'longBreak'} setMode={setMode} />
      </div>
      <Clock minutes={timer.minutes} seconds={timer.seconds} />
       {/* Text input for task name */}
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
      <TaskListPanel tasks={tasks} />
    </div>
  );
}

export default App;
