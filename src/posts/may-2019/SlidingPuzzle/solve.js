import { move, moveMap, initialState } from './utils';

class Node {
  constructor(config, prev = null, move = null) {
    this.config = config;
    this.move = move;
    this.prev = prev;
  }

  toString() {
    return this.config.join();
  }

  solved() {
    return this.toString() === initialState.join();
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

function bfs(node) {
  const stack = [node];
  const visited = new Set();
  while (stack.length >= 0) {
    const currentNode = stack.pop();
    if (currentNode.solved()) {
      return currentNode.getMoves();
    }
    currentNode.neighbors().forEach(node => {
      if (!visited.has(node.toString())) {
        stack.push(node);
      }
    });
  }
}

const methods = {
  bfs,
};

export default function solve(config, method) {
  const t1 = new Date();
  const solution = methods[method](new Node(config));
  const time = (new Date() - t1) / 1000;
  return { solution, time };
}
