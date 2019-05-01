import React, { useState, useCallback, useEffect } from 'react';

import Board from './Board';
import { keyMap, move, initialState } from './utils';
import { SET_CONFIG, JUMBLE } from './types';
import './SlidingPuzzle.scss';

let worker;

export default () => {
  const [config, setConfig] = useState(initialState);

  useEffect(() => {
    worker = new Worker('./main.worker.js', { type: 'module' });

    worker.onmessage = ({ data }) => {
      if (data.action === SET_CONFIG) setConfig(data.config);
    };
  }, []);

  useEffect(() => {
    const listener = e => {
      if (keyMap[e.key]) e.preventDefault();
      const newConfig = move(config, keyMap[e.key]);
      if (newConfig) setConfig(newConfig);
    };

    document.addEventListener('keydown', listener);

    return () => {
      document.removeEventListener('keydown', listener);
    };
  }, [config]);

  const jumble = useCallback(() => {
    worker.postMessage({ action: JUMBLE, config });
  }, [config]);

  const reset = useCallback(() => {
    setConfig(initialState);
  }, []);

  return (
    <div className="sliding-puzzle">
      <Board config={config} />
      <div className="puzzle-row">
        <button onClick={jumble}>Jumble</button>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
};
