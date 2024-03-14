
function ModeButton({ mode, active, setMode }) {
    return (
      <button
        className={`button mode-button ${active ? 'active' : ''}`}
        onClick={() => setMode(mode)}
      >
        {mode}
      </button>
    );
  }
  
  export default ModeButton;
  