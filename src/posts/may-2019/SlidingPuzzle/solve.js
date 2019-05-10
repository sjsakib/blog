import { move, moveMap, initialState } from './utils';
import PriorityQueue from './PriorityQueue';

class Node {
  constructor(config, prev = null, move = null, depth = 0) {
    if (!config) return;

    this.config = config;
    this.str = config.join();
    this.move = move;
    this.prev = prev;

    this.depth = depth;
    this.cost = depth + dist(config);
  }

  solved() {
    return this.str === initialState.join();
  }

  neighbors() {
    return Object.values(moveMap)
      .map(m => new Node(move(this.config, m), this, m, this.depth + 1))
      .filter(n => n.config);
  }

  getMoves() {
    let current = this;
    const moves = [];
    while (current) {
      moves.push(current.move);
      current = current.prev;
    }
    return moves.reverse().slice(1);
  }
}

function dist(config) {
  return config.reduce((prev, cur, i) => {
    cur = (cur || 9) - 1;
    return (
      prev + Math.abs((cur % 3) - (i % 3)) + Math.abs(~~(cur / 3) + ~~(i / 3))
    );
  }, 0);
}

function dfs(node) {
  const toCheck = [node];
  const checked = new Set();

  while (toCheck.length > 0) {
    const currentNode = toCheck.pop();

    if (currentNode.solved()) {
      return currentNode.getMoves();
    }

    checked.add(currentNode.str);

    for (const node of currentNode.neighbors()) {
      if (!checked.has(node.str)) {
        toCheck.push(node);
      }
    }
  }
}

function bfs(node) {
  const toCheck = [node];
  const checked = new Set();

  while (toCheck.length > 0) {
    const currentNode = toCheck.shift();

    if (currentNode.solved()) {
      return currentNode.getMoves();
    }

    checked.add(currentNode.str);

    for (const node of currentNode.neighbors()) {
      if (!checked.has(node.str)) {
        toCheck.push(node);
      }
    }
  }
}

function ast(node) {
  const toCheck = new PriorityQueue([node], (a, b) => a.cost - b.cost);
  const checked = new Set();

  while (toCheck.length > 0) {
    const currentNode = toCheck.pop();

    if (currentNode.solved()) {
      return currentNode.getMoves();
    }

    checked.add(currentNode.str);

    for (const node of currentNode.neighbors()) {
      if (!checked.has(node.str)) {
        toCheck.push(node);
      }
    }
  }
}

const methods = {
  dfs,
  bfs,
  ast,
};

export default function solve(config, method) {
  const t1 = new Date();
  const moves = methods[method](new Node(config));
  const time = (new Date() - t1) / 1000;
  const str =
    moves.slice(0, 20).join(' ') +
    (moves.length > 25 ? `...(${moves.length - 25} more moves)` : '');
  return { moves, time, str, method };
}
