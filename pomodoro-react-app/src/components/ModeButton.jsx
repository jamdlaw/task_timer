import React from 'react';

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
  