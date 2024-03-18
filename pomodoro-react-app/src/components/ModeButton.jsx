import React from 'react';
const handleModeChange = (mode) =>{
  console.log('this is a test');
}
function ModeButton({ mode, active, onClick }) {
    return (
      <button
        className={`button mode-button ${active ? 'active' : ''}`}
        onClick={onClick}
      >
        {mode}
      </button>
    );
  }
  
  export default ModeButton;
  