import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [time, setTime] = useState(0);

  useEffect(() => {
    fetch('/hey').then(res => res.json()).then(data => {
      setTime(data.hey);
    })
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <p>Time is now {time}</p>
      </header>
    </div>
  );
}

export default App;
