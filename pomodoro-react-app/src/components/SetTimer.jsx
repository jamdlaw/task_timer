import React from 'react';

function SetTimer({ taskName, inputMinutes, handleSetTimer, setTaskName, setInputMinutes }) {
  const handleMinutesChange = (e) => {
    const value = e.target.value;
    if (value === '' || /^\d+$/.test(value)) { // Allow only digits or empty string
      setInputMinutes(value);
      handleSetTimer(parseInt(value) || 0); // Pass parsed value to handleSetTimer
    }
  };

  return (
    <div className="input-group">
      <div className="task-input-container">
        <input 
          type="text" 
          id="taskName" 
          name="taskName" 
          placeholder="Enter task name" 
          value={taskName} 
          onChange={(e) => setTaskName(e.target.value)} 
          className="task-input full-width-input"
        />
      </div>
      
      <div className="time-input-container">
        <input 
          type="number" 
          value={inputMinutes} 
          onChange={handleMinutesChange} 
          placeholder="Minutes" 
          className="minutes-input"
          min="0"
        />
        <button onClick={() => handleSetTimer(parseInt(inputMinutes) || 0)} className="set-timer-button">Set Timer</button>
      </div>
    </div>
  );
}

export default SetTimer;
