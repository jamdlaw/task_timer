import React, { useState, useEffect } from 'react';
import './App.css';
import Clock from './components/Clock';

function App() {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);

  return (
    <div className="app">
      <h1> Task Timer </h1> 
        <Clock minutes={minutes} seconds={seconds} />
    </div>
  );
}

export default App;
