// src/App.jsx
import React from 'react';
import Timer from './components/Timer';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Countdown Timer</h1>
        <Timer initialSeconds={60} />
      </header>
    </div>
  );
};

export default App;
