import React, { useState, useCallback, useEffect } from 'react';
import Spinner from 'react-spinkit';

import Board from './Board';
import { keyMap, move, initialState, sleep } from './utils';
import { SET_CONFIG, JUMBLE, SOLVE, SET_SOLUTION } from './types';
import './SlidingPuzzle.scss';

let worker;

export default ({ methods }) => {
  const [config, setConfig] = useState(initialState);
  const [solutions, setSolutions] = useState([]);
  const [pendingSolution, setPendingSolution] = useState(false);

  useEffect(() => {
    worker = new Worker('./main.worker.js', { type: 'module' });
  }, []);

  useEffect(() => {
    worker.onmessage = ({ data }) => {
      if (data.action === SET_CONFIG) setConfig(data.config);

      if (data.action === SET_SOLUTION) {
        setSolutions([data.solution, ...solutions]);
        setPendingSolution(false);
      }
    };
  }, [solutions]);

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
    setSolutions([]);
  }, [config]);

  const reset = useCallback(() => {
    setConfig(initialState);
    setSolutions([]);
  }, []);

  const solve = useCallback(
    e => {
      if (config.join() === initialState.join()) return;
      const method = e.target.dataset.method;
      worker.postMessage({ action: SOLVE, config, method });
      setPendingSolution(true);
    },
    [config]
  );

  const testSolution = async moves => {
    setSolutions([]);
    let currentConfig = [...config];
    for (let i = 0; i < moves.length; i++) {
      const newConfig = move(currentConfig, moves[i]);
      currentConfig = newConfig;
      setConfig(newConfig);
      await sleep(100);
    }
  };

  return (
    <div className="sliding-puzzle">
      <Board config={config} />
      <div className="puzzle-row">
        <button className="p-button" onClick={jumble}>
          Jumble
        </button>
        <button className="p-button" onClick={reset}>
          Reset
        </button>
      </div>
      <div className="puzzle-row">
        {methods.map(m => (
          <button className="p-button" key={m} data-method={m} onClick={solve}>
            {m + '()'}
          </button>
        ))}
      </div>

      <div className="space" />

      {pendingSolution && <Spinner name="line-scale-pulse-out" color="#444" />}

      {solutions.map(s => (
        <div className="solution" key={s.str + s.method}>
          Solved with: {s.method} <br />
          Time: {s.time}s <br />
          Solution length: {s.moves.length} <br />
          Solution: {s.str} <br />
          <button onClick={() => testSolution(s.moves)} className="p-button">
            Apply
          </button>
        </div>
      ))}
    </div>
  );
};
