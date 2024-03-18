import React from 'react';
const handleModeChange = (mode) =>{
  console.log('this is a test');
}
function ModeButton({ mode, active, setMode }) {
    return (
      <button
        className={`button mode-button ${active ? 'active' : ''}`}
        onClick={() => handleModeChange(mode)}
      >
        {mode}
      </button>
    );
  }
  
  export default ModeButton;
  