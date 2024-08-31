import React from 'react';

function SetTimer({ taskName, inputMinutes, handleSetTimer, setTaskName, setInputMinutes }) {
  return (
    <div className="input-group">
      {/* Separate container for taskName input to make it appear on its own line */}
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
      
      {/* New line here: Keep inputs for minutes and button together */}
      <div className="time-input-container">
        <input 
          type="number" 
          value={inputMinutes} 
          onChange={(e) => setInputMinutes(e.target.value)} 
          placeholder="Minutes" 
          className="minutes-input"
        />
        <button onClick={handleSetTimer} className="set-timer-button">Set Timer</button>
      </div>
    </div>
  );
}

export default SetTimer;
