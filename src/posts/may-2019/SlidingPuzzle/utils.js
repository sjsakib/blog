export const keyMap = {
  ArrowUp: 'U',
  ArrowDown: 'D',
  ArrowRight: 'R',
  ArrowLeft: 'L',
};

export const initialState = [1, 2, 3, 4, 5, 6, 7, 8, 0];

export function move(config, d) {
  const i = config.indexOf(0);
  let j;
  if (d === 'U') {
    j = i + 3;
    if (j > 8) return null;
  } else if (d === 'D') {
    j = i - 3;
    if (j < 0) return null;
  } else if (d === 'L') {
    if (i % 3 === 2) return null;
    j = i + 1;
  } else if (d === 'R') {
    if (i % 3 === 0) return null;
    j = i - 1;
  }

  config = [...config];
  [config[i], config[j]] = [config[j], config[i]];

  return config;
}

export function jumble(config, times = 10) {
  const moves = 'UDLR';
  for (let i = 0; i < times; i++) {
    const newConfig = move(
      config,
      moves[Math.floor(Math.random() * moves.length)]
    );
    if (newConfig) config = newConfig;
  }
  return config;
}

export const sleep = milis => {
  return new Promise(resolve => setTimeout(resolve, milis));
};
