import { solve } from './solve';
import { move, sleep } from './utils';
import { JUMBLE, SET_CONFIG } from './types';

onmessage = function({ data }) {
  if (data.action === JUMBLE) {
    let { config, times = 50 } = data;
    const moves = 'UDLR';
    let count = 0;
    for (let i = 0; i < times; i++) {
      const newConfig = move(
        config,
        moves[Math.floor(Math.random() * moves.length)]
      );
      if (newConfig) {
        config = newConfig;

        setTimeout(() => {
          postMessage({ action: SET_CONFIG, config: newConfig });
        }, count * 30);
        count++;
      }
    }
  }
};
