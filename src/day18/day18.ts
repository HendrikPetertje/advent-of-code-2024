type ByteLoc = [number, number];

const parseInput = (input: string): ByteLoc[] => {
  const bytes = input
    .trim()
    .split('\n')
    .map((line) => line.split(',').map((n) => parseInt(n)) as [number, number]);

  return bytes;
};

const constructGrid = (bytes: ByteLoc[], nanoseconds: number, gridSize: number) => {
  // The grid is a 2D array of size gridSize x gridSize, x and y start at 0 ends at index gridSize!
  const positions = Array.from({ length: gridSize + 1 }, (_, i) => i);

  // take all bytes until nanoseconds
  const fallenBytes = bytes.slice(0, nanoseconds);

  const grid = positions.map((y) => {
    return positions.map((x) => {
      if (fallenBytes.some(([byteX, byteY]) => byteX === x && byteY === y)) {
        return '#';
      }
      return '.';
    });
  });

  return grid;
};

type X = number;
type Y = number;
type PointString = `${X}.${Y}`;
type PriorityQueueItem = { x: X; y: Y; dist: number };

const directions = {
  n: { dx: 0, dy: -1 },
  e: { dx: 1, dy: 0 },
  s: { dx: 0, dy: 1 },
  w: { dx: -1, dy: 0 },
};

export const getDistanceInMemory = (input: string, nanoseconds: number, gridSize: number, paramBytes?: ByteLoc[]) => {
  const bytes = paramBytes || parseInput(input);
  const grid = constructGrid(bytes, nanoseconds, gridSize);

  const pq: PriorityQueueItem[] = [];
  const visited = new Map<PointString, number>();

  // push the starting state to the priority queue
  pq.push({ x: 0, y: 0, dist: 0 });

  while (pq.length > 0) {
    // sort the queue by distance and shift the first element out
    pq.sort((a, b) => a.dist - b.dist);
    const state = pq.shift();
    if (!state) throw new Error('No state found');

    const { x, y, dist } = state;

    // skip if we have already visited this point
    const key = `${x}.${y}` as PointString;
    if (visited.has(key) && visited.get(key)! <= dist) continue;
    visited.set(key, dist);

    // if we have reached the finish, return the distance
    if (x === gridSize && y === gridSize) {
      return dist;
    }

    // Move in directions
    (Object.keys(directions) as ('n' | 'e' | 's' | 'w')[]).forEach((direction) => {
      const { dx, dy } = directions[direction];
      const nextX = x + dx;
      const nextY = y + dy;
      if (nextX < 0 || nextX > gridSize || nextY < 0 || nextY > gridSize) return;
      if (grid[nextY][nextX] === '#') return;
      pq.push({ x: nextX, y: nextY, dist: dist + 1 });
    });
  }

  return false;
};

export const bisectWhenTooLate = (input: string, gridSize: number) => {
  const bytes = parseInput(input);
  let left = 0;
  let right = bytes.length;

  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    const connected = !!getDistanceInMemory(input, mid + 1, gridSize, bytes);
    if (connected) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }

  return bytes[left].join(',');
};
