
function Clock({ minutes, seconds }) {
    return (
      <div className="clock">
        <span>{String(minutes).padStart(2, '0')}</span>:
        <span>{String(seconds).padStart(2, '0')}</span>
      </div>
    );
  }
  
  export default Clock;
  