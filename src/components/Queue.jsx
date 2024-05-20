// src/components/Queue.jsx
import React from 'react';

const Queue = ({ queue }) => {
  return (
    <div className="queue">
      <h2>Queue</h2>
      <ul>
        {queue.map((person, index) => (
          <li key={index}>{person}</li>
        ))}
      </ul>
    </div>
  );
};

export default Queue;
