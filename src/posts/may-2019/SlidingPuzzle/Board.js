import React from 'react';

export default ({ config }) => {
  return (
    <div title="Use arrow keys in your keyboard to move" className="board">
      {config.map(n => (
        <div key={n} className={`block n${n}`}>
          {n}
        </div>
      ))}
    </div>
  );
};
