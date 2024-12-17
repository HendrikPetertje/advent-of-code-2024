type Pos = { x: number; y: number };
type Direction = 'n' | 'e' | 's' | 'w';
type State = { cost: number; x: number; y: number; dir: Direction };

const parseInput = (input: string) => {
  let start: Pos = { x: 0, y: 0 };
  let finish: Pos = { x: 0, y: 0 };

  const cleanedInput = input.trim();

  const map = cleanedInput.split('\n').map((line, y) => {
    return line.split('').map((char, x) => {
      if (char === 'S') start = { x, y };
      if (char === 'E') finish = { x, y };
      return char;
    });
  });

  return { start, finish, map };
};

const directions = {
  n: { dx: 0, dy: -1 },
  e: { dx: 1, dy: 0 },
  s: { dx: 0, dy: 1 },
  w: { dx: -1, dy: 0 },
};

const turnLeft = (dir: Direction): Direction => {
  switch (dir) {
    case 'n':
      return 'w';
    case 'w':
      return 's';
    case 's':
      return 'e';
    case 'e':
      return 'n';
  }
};

const turnRight = (dir: Direction): Direction => {
  switch (dir) {
    case 'n':
      return 'e';
    case 'e':
      return 's';
    case 's':
      return 'w';
    case 'w':
      return 'n';
  }
};

export const findCheapestPathThroughMaze = (input: string, getSittingPlaces = false) => {
  const { start, finish, map } = parseInput(input);

  const pq: State[] = []; // Min-Heap priority queue
  const visited = new Map<`${number}.${number}.${Direction}`, number>();
  const minCostToEnd: number[] = [];

  const moveCost = 1;
  const turnCost = 1000;

  // push the starting state to the priority queue
  pq.push({ cost: 0, x: start.x, y: start.y, dir: 'e' });

  while (pq.length > 0) {
    // sort the queue based on cost and shift the first element out
    pq.sort((a, b) => a.cost - b.cost);
    const state = pq.shift();
    if (!state) throw new Error('No state found');

    const { cost, x, y, dir } = state;

    // Skip if we've already visited this state with a lower cost
    const key = `${x}.${y}.${dir}` as const;
    if (visited.has(key) && visited.get(key)! <= cost) continue;
    visited.set(key, cost);

    // if we have reached the finish, return the cost
    if (x === finish.x && y === finish.y) {
      if (!getSittingPlaces) return cost;
      minCostToEnd.push(cost);
    }

    // try to move forward
    const newX = x + directions[dir].dx;
    const newY = y + directions[dir].dy;
    if (map[newY] && map[newY][newX] && map[newY][newX] !== '#') {
      pq.push({ cost: cost + moveCost, x: newX, y: newY, dir });
    }

    // try to turn left (counterclock)
    const newDirLeft = turnLeft(dir);
    pq.push({ cost: cost + turnCost, x, y, dir: newDirLeft });

    // try to turn right (clock)
    const newDirRight = turnRight(dir);
    pq.push({ cost: cost + turnCost, x, y, dir: newDirRight });
  }

  // Backtrack to find the best paths
  const onBestPath = new Set();

  function backtrack(x: number, y: number, cost: number) {
    if (cost < 0 || onBestPath.has(`${x},${y}`)) return;
    onBestPath.add(`${x},${y}`);

    (['n', 'e', 's', 'w'] as const).forEach((dir) => {
      const px = x - directions[dir].dx;
      const py = y - directions[dir].dy;
      const forwardKey = `${px}.${py}.${dir}` as const;
      if (visited.has(forwardKey) && visited.get(forwardKey)! + moveCost === cost) {
        backtrack(px, py, visited.get(forwardKey)!);
      }

      if (visited.has(forwardKey) && visited.get(forwardKey)! + turnCost + moveCost === cost) {
        backtrack(px, py, visited.get(forwardKey)!);
      }
    });
  }

  const cheapest = Math.min(...minCostToEnd);

  // Start backtracking from the End tile
  backtrack(finish.x, finish.y, cheapest);

  let count = 0;
  const debugMap = map
    .map((row, y) => {
      return row
        .map((cell, x) => {
          if (cell !== '#' && onBestPath.has(`${x},${y}`)) {
            count += 1;
            return 'O';
          }
          return cell;
        })
        .join('');
    })
    .join('\n');

  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  debugMap;
  // console.log(debugMap);

  return count;
};
