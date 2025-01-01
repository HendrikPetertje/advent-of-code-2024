type Pos = { x: number; y: number };
type Grid = ('Wall' | null)[][];

const parseINput = (input: string) => {
  const start: Pos = { x: 0, y: 0 };
  const end = { x: 0, y: 0 };

  const grid: Grid = input
    .trim()
    .split('\n')
    .map((row, y) => {
      return row.split('').map((cell, x) => {
        if (cell === '#') return 'Wall';
        if (cell === 'S') {
          start.x = x;
          start.y = y;
        }
        if (cell === 'E') {
          end.x = x;
          end.y = y;
        }
        return null;
      });
    });

  return { start, end, grid };
};

type X = number;
type Y = number;
type PointString = `${X}.${Y}`;
type PriorityQueueItem = { x: X; y: Y; dist: number };

const getDijkstraPositions = (grid: Grid, start: Pos, end: Pos) => {
  const directions = {
    n: { dx: 0, dy: -1 },
    e: { dx: 1, dy: 0 },
    s: { dx: 0, dy: 1 },
    w: { dx: -1, dy: 0 },
  };

  // Do a simplified  Dijkstra from the start to the end
  // to figure out all visited scores
  const pq: PriorityQueueItem[] = [];
  const visited: Record<PointString, number> = {};

  // push the starting state to the priority queue
  pq.push({ x: start.x, y: start.y, dist: 0 });

  while (pq.length > 0) {
    // sort the queue by distance and shift the first element out
    pq.sort((a, b) => a.dist - b.dist);
    const state = pq.shift();
    if (!state) throw new Error('No state found');

    const { x, y, dist } = state;

    // skip if we have already visited this point
    const key = `${x}.${y}` as PointString;
    if (typeof visited[key] !== 'undefined' && visited[key]! <= dist) continue;
    visited[key] = dist;
    //
    // if we have reached the finish, break the loop
    if (x === end.x && y === end.y) {
      break;
    }

    // Move in directions
    (Object.keys(directions) as ('n' | 'e' | 's' | 'w')[]).forEach((direction) => {
      const { dx, dy } = directions[direction];
      const nextX = x + dx;
      const nextY = y + dy;
      if (nextX < 0 || nextX >= grid[0].length || nextY < 0 || nextY >= grid.length) return;
      if (grid[nextY][nextX] === 'Wall') return;
      pq.push({ x: nextX, y: nextY, dist: dist + 1 });
    });
  }

  return visited;
};

export const getCheatPathOptions = (input: string, minDistanceCut: number) => {
  const { start, end, grid } = parseINput(input);

  const visited = getDijkstraPositions(grid, start, end);

  // construct a new grid that is easier to navigate
  const newGrid = grid.map((row, y) =>
    row.map((cell, x) => {
      if (cell === 'Wall') return 'Wall';
      if (typeof visited[`${x}.${y}`] !== 'undefined') return visited[`${x}.${y}`];
      throw new Error('Invalid cell');
    }),
  );

  let options = 0;

  newGrid.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (cell === 'Wall') return;
      const directions = [
        { dx: x + 0, dy: y - 2 }, // north
        { dx: x + 1, dy: y - 1 }, // north-east
        { dx: x + 2, dy: y }, // east
        { dx: x + 1, dy: y + 1 }, // south-east
      ];

      directions.forEach((dir) => {
        // if target is out of bounds
        if (dir.dx < 0 || dir.dx >= newGrid[0].length || dir.dy < 0 || dir.dy >= newGrid.length) return;

        const target = newGrid[dir.dy][dir.dx];
        if (target === 'Wall') return;
        if (Math.abs(target - cell) >= minDistanceCut + 2) options += 1;
      });
    });
  });

  return options;
};
