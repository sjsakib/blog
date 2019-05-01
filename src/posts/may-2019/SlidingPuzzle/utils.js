export const moveMap = {
  UP: '↑',
  DOWN: '↓',
  RIGHT: '→',
  LEFT: '←',
};

export const keyMap = {
  ArrowUp: moveMap.UP,
  ArrowDown: moveMap.DOWN,
  ArrowRight: moveMap.RIGHT,
  ArrowLeft: moveMap.LEFT,
};

export const initialState = [1, 2, 3, 4, 5, 6, 7, 8, 0];

export function move(config, d) {
  const i = config.indexOf(0);
  let j;
  if (d === moveMap.UP) {
    j = i + 3;
    if (j > 8) return null;
  } else if (d === moveMap.DOWN) {
    j = i - 3;
    if (j < 0) return null;
  } else if (d === moveMap.LEFT) {
    if (i % 3 === 2) return null;
    j = i + 1;
  } else if (d === moveMap.RIGHT) {
    if (i % 3 === 0) return null;
    j = i - 1;
  }

  config = [...config];
  [config[i], config[j]] = [config[j], config[i]];

  return config;
}

export function jumble(config, times = 10) {
  const moves = Object.values(moveMap);
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
