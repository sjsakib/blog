import solve from './solve';
import { move, sleep, moveMap, initialState } from './utils';
import { JUMBLE, SET_CONFIG, SOLVE, SET_SOLUTION } from './types';

onmessage = function({ data }) {
  if (data.action === JUMBLE) {
    let { config, times = 30 } = data;
    const moves = Object.values(moveMap);
    let count = 0;
    for (let i = 0; i < times; i++) {
      const newConfig = move(
        config,
        moves[Math.floor(Math.random() * moves.length)]
      );
      if (newConfig) {
        config = newConfig;

        setTimeout(() => {
          postMessage({ action: SET_CONFIG, config: newConfig, id: data.id });
        }, count * 30);
        count++;
      }
    }
  }

  if (data.action === SOLVE) {
    const solution = solve(data.config, data.method);
    postMessage({ action: SET_SOLUTION, solution, id: data.id });
  }
};
