import React, { useState, useRef } from 'react';
import './App.css';
import Clock from './components/Clock';

function App() {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [inputMinutes, setInputMinutes] = useState(25);
  const [inputSeconds, setInputSeconds] = useState(0);
  const timerRef = useRef(null);

  const startTimer = () => {
    if (timerRef.current !== null) return; // Prevent multiple intervals
    timerRef.current = setInterval(() => {
      setSeconds((prevSeconds) => {
        if (prevSeconds === 0) {
          setMinutes((prevMinutes) => {
            if (prevMinutes === 0) {
              clearInterval(timerRef.current);
              timerRef.current = null;
              return 0;
            } else {
              return prevMinutes - 1;
            }
          });
          return 59;
        } else {
          return prevSeconds - 1;
        }
      });
    }, 1000);
  };

  const stopTimer = () => {
    if (timerRef.current !== null) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const resetTimer = () => {
    stopTimer();
    setMinutes(25);
    setSeconds(0);
  };

  const handleSetTimer = () => {
    stopTimer();
    setMinutes(parseInt(inputMinutes));
    setSeconds(parseInt(inputSeconds));
  };

  return (
    <div className="app">
      <h1>Task Timer</h1>
      <Clock minutes={minutes} seconds={seconds} />
      <div className="input-group">
        <input 
          type="number" 
          value={inputMinutes} 
          onChange={(e) => setInputMinutes(e.target.value)} 
          placeholder="Minutes"
        />
        <input 
          type="number" 
          value={inputSeconds} 
          onChange={(e) => setInputSeconds(e.target.value)} 
          placeholder="Seconds"
        />
        <button onClick={handleSetTimer}>Set Timer</button>
      </div>
      <div className="buttons-group">
        <button onClick={startTimer}>Start</button>
        <button onClick={stopTimer}>Stop</button>
        <button onClick={resetTimer}>Reset</button>
      </div>
    </div>
  );
}

export default App;
