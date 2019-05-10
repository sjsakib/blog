import { move, moveMap, initialState } from './utils';

class Node {
  constructor(config, prev = null, move = null) {
    if (!config) return;

    this.config = config;
    this.str = config.join();
    this.move = move;
    this.prev = prev;
  }

  solved() {
    return this.str === initialState.join();
  }

  neighbors() {
    return Object.values(moveMap)
      .map(m => new Node(move(this.config, m), this, m))
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
  const q = [node];
  const visited = new Set();

  while (q.length >= 0) {
    const currentNode = q.shift();
    if (currentNode.solved()) {
      return currentNode.getMoves();
    }
    visited.add(currentNode.toString());

    for (const node of currentNode.neighbors()) {
      if (!visited.has(node.toString())) {
        q.push(node);
      }
    }
  }
}

const methods = {
  dfs,
  bfs,
};

export default function solve(config, method) {
  const t1 = new Date();
  const moves = methods[method](new Node(config));
  const time = (new Date() - t1) / 1000;
  const str =
    moves.slice(0, 20).join(' ') +
    (moves.length > 20 ? ` ... (${moves.length - 20} more moves)` : '');
  return { moves, time, str, method };
}
