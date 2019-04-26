import React, { useState } from 'react';

const radian = x => (Math.PI / 180) * x;

const initialLength = 50;
const initialLight = 0;

const Branch = ({ x, y, angle, level, depth }) => {
  const length = initialLength * 0.85 ** level;
  const width = length * 0.2;
  const endX = x + Math.sin(radian(angle)) * (length - width / 2);
  const endY = y + Math.cos(radian(angle)) * (length - width / 2);
  return (
    <React.Fragment>
      <div
        style={{
          ...branchStyle,
          left: x,
          bottom: y,
          height: `${depth >= level ? length : 0}px`,
          width: `${width}px`,
          borderRadius: `${width / 2}px`,
          transform: `rotate(${angle}deg)`,
          backgroundColor: `hsla(120, 100%, ${initialLight +
            (level - 1) * 7}%)`,
        }}
      />
      {level < 10 && (
        <React.Fragment>
          <Branch
            x={endX}
            y={endY}
            angle={angle + 35}
            level={level + 1}
            depth={depth}
          />
          <Branch
            x={endX}
            y={endY}
            angle={angle - 15}
            level={level + 1}
            depth={depth}
          />
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default () => {
  const [depth, setDepth] = useState(2);
  return (
    <div
      style={{
        margin: '2rem 0',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        textAlign: 'center',
      }}
    >
      <div style={boxStyle}>
        <Branch x={200} y={0} angle={0} level={1} depth={depth} />
      </div>
      <div>
        <button className="button" style={buttonStyle} onClick={() => setDepth(depth + 1)}>
          Grow
        </button>
        <button className="button" style={buttonStyle} onClick={() => setDepth(2)}>
          Reset
        </button>
      </div>
    </div>
  );
};

const boxStyle = {
  position: 'relative',
  margin: '1rem auto',
  height: '15rem',
  width: '400px',
};

const branchStyle = {
  position: 'absolute',
  transformOrigin: '50% 100%',
  transition: 'height 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s',
};

const buttonStyle = {
  margin: '1rem',
  fontSize: '14px',
}