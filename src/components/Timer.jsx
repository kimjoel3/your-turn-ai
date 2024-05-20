// src/components/Timer.jsx
import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PieChart from './PieChart';
import Queue from './Queue';
import soundFile from './ping2.mp3'; // Ensure you have this file in the appropriate path
import names from '../names.json';

const Timer = ({ initialSeconds }) => {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [inputSeconds, setInputSeconds] = useState(initialSeconds);
  const [isActive, setIsActive] = useState(false);
  const [queue, setQueue] = useState(names);
  const audio = new Audio(soundFile);

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds((seconds) => {
          if (seconds === 121) {
            toast.warning('2 minutes left!');
          }
          if (seconds === 1) {
            audio.play();
            toast.error('Time is up!');
          }
          return seconds > 0 ? seconds - 1 : 0;
        });
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds, audio]);

  const toggle = () => {
    setIsActive(!isActive);
  };

  const reset = () => {
    setSeconds(Number(inputSeconds));
    setIsActive(false);
    swapQueue();
  };

  const handleChange = (e) => {
    setInputSeconds(e.target.value);
  };

  const setTime = () => {
    setSeconds(Number(inputSeconds));
    setIsActive(false);
  };

  const swapQueue = () => {
    if (queue.length > 1) {
      const newQueue = [...queue];
      const firstPerson = newQueue.shift();
      newQueue.push(firstPerson);
      setQueue(newQueue);
    }
  };

  const percentage = (seconds / inputSeconds) * 100;

  return (
    <div>
      <div>{seconds}s</div>
      <PieChart percentage={percentage} />
      <input
        type="number"
        value={inputSeconds}
        onChange={handleChange}
        min="0"
      />
      <button onClick={setTime}>Set Time</button>
      <button onClick={toggle}>{isActive ? 'Pause' : 'Start'}</button>
      <button onClick={reset}>Reset</button>
      <Queue queue={queue} setQueue={setQueue} />
      <ToastContainer />
    </div>
  );
};

export default Timer;
