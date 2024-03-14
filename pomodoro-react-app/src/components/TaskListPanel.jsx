import React from 'react';

function TaskListPanel({ tasks }) {
    return (
      <div id="taskListPanel" className="task-list-panel">
        <h2>Completed Tasks</h2>
        <ul>
          {tasks.filter(task => task.completed).map((task, index) => (
            <li key={index}>{`${task.name} - ${task.time} minutes`}</li>
          ))}
        </ul>
      </div>
    );
  }
  
  export default TaskListPanel;
  