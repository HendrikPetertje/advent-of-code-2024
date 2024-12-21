type Pos = { x: number; y: number };
type Grid = ('Wall' | null)[][];

const parseInput = (input: string) => {
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

export const getSuperCheatpathOptions = (input: string) => {
  const { start, end, grid } = parseInput(input);
  const visited = getDijkstraPositions(grid, start, end);

  const expandedVisited = Object.keys(visited).map((key) => {
    const dist = visited[key as PointString];
    const [x, y] = key.split('.').map(Number);
    return { x, y, dist };
  });

  const minDistanceCut = 100;

  let count = 0;

  expandedVisited.forEach((pos) => {
    expandedVisited.forEach((pos2) => {
      // if the positions isn't even close to less than 100, ignore straight away
      if (pos2.dist - pos.dist < 100) return;

      const distX = Math.abs(pos.x - pos2.x);
      const distY = Math.abs(pos.y - pos2.y);

      const totalDist = distX + distY;
      if (totalDist > 20) return;
      const savedDist = pos2.dist - pos.dist - totalDist;
      if (savedDist >= minDistanceCut) count += 1;
    });
  });

  return count;
};
