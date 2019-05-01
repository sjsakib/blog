import React from 'react';

export default ({ config }) => {
  return (
    <div className="board">
      {config.map(n => (
        <div key={n} className={`block n${n}`}>
          {n}
        </div>
      ))}
    </div>
  );
};
