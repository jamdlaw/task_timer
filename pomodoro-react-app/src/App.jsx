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
        // Timer countdown logic
      }, 1000);
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
