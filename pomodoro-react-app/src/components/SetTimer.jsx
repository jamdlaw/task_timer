import React from 'react';

function SetTimer ({taskName, inputMinutes, handleSetTimer, setTaskName, setInputMinutes}) {
    return (
        <div className="input-group">
            <input 
                type="text" 
                id="taskName" 
                name="taskName" 
                placeholder="Enter task name" 
                value={taskName} 
                onChange={(e) => setTaskName(e.target.value)} 
                className="task-input full-width-input"
            />
            <input 
                type="number" 
                value={inputMinutes} 
                onChange={(e) => setInputMinutes(e.target.value)} 
                placeholder="Minutes" 
                className="minutes-input"
            />
            <button onClick={handleSetTimer} className="set-timer-button">Set Timer</button>
        </div>
     )
}

export default SetTimer;