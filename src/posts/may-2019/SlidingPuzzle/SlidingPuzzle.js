import React, { useState, useEffect } from 'react';
import Spinner from 'react-spinkit';

import Board from './Board';
import { keyMap, move, initialState, sleep } from './utils';
import { SET_CONFIG, JUMBLE, SOLVE, SET_SOLUTION } from './types';
import './SlidingPuzzle.scss';

let worker;

export default ({ methods, givenState, id }) => {
  const [config, setConfig] = useState(givenState || initialState);
  const [solutions, setSolutions] = useState([]);
  const [pendingSolution, setPendingSolution] = useState(false);

  useEffect(() => {
    worker = new Worker('./main.worker.js', { type: 'module' });
  }, []);

  useEffect(() => {
    const listener = ({ data }) => {
      if (data.id !== id) return;

      if (data.action === SET_CONFIG) setConfig(data.config);

      if (data.action === SET_SOLUTION) {
        setSolutions([data.solution, ...solutions]);
        setPendingSolution(false);
      }
    };

    worker.addEventListener('message', listener);

    return () => {
      worker.removeEventListener('message', listener);
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

  const jumble = () => {
    worker.postMessage({ action: JUMBLE, config, id });
    setSolutions([]);
  };

  const reset = () => {
    setConfig(givenState || initialState);
    setSolutions([]);
  };

  const solve = e => {
    if (config.join() === initialState.join()) return;
    const method = e.target.dataset.method;
    worker.postMessage({ action: SOLVE, config, method, id });
    setPendingSolution(true);
  };

  const testSolution = async moves => {
    setSolutions([]);
    const waitTime = moves.length < 10 ? 500 : moves.length < 50 ? 200 : 50;
    let currentConfig = [...config];
    for (let i = 0; i < moves.length; i++) {
      const newConfig = move(currentConfig, moves[i]);
      if (!newConfig) return;
      currentConfig = newConfig;
      setConfig(newConfig);
      await sleep(waitTime);
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

      {pendingSolution && (
        <Spinner className="spinner" name="line-scale-pulse-out" color="#444" />
      )}

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
