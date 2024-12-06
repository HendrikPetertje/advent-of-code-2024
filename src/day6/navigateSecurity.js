// This file was transformed from a TS to a JS file so it can be called by workers

/**
 * @param {{ x: number; y: number; dir: string }} current
 * @returns {{ x: number; y: number; dir: string; }}
 */
const getNewPosition = (current) => {
  const newCurrent = structuredClone(current);
  switch (newCurrent.dir) {
    case 'up':
      newCurrent.y -= 1;
      break;
    case 'down':
      newCurrent.y += 1;
      break;
    case 'left':
      newCurrent.x -= 1;
      break;
    case 'right':
      newCurrent.x += 1;
      break;
  }
  return newCurrent;
};
/**
 * @param {{ x: number; y: number; dir: string }} current
 * @returns {"right" | "down" | "left" | "up"}
 */
const rotateRight = (current) => {
  switch (current.dir) {
    case 'up':
      return 'right';
    case 'right':
      return 'down';
    case 'down':
      return 'left';
    case 'left':
      return 'up';
    default:
      throw new Error('Invalid direction');
  }
};
/**
 * @param {{ x: number; y: number; dir: string }} origCurrent
 * @param {{ obstacle: boolean; visited: boolean }[][]} lines
 * @param {number} height
 * @param {number} width
 * @param {{ x: number; y: number }} [newObstacle]
 * @returns {{ lines: { obstacle: boolean; visited: boolean; }[][]; stuckInLoop: boolean; }}
 */
export const navigateSecurity = (origCurrent, lines, height, width, newObstacle) => {
  const linesClone = structuredClone(lines);
  const current = structuredClone(origCurrent);

  if (newObstacle) {
    linesClone[newObstacle.y][newObstacle.x].obstacle = true;
  }

  const pathTaken = [];
  let stuckInLoop = false;

  while (current.x >= 0 && current.x < width && current.y >= 0 && current.y < height && !stuckInLoop) {
    const currentSpace = linesClone[current.y][current.x];
    const currentPathTaken = `x${current.x}y${current.y}dir${current.dir}`;

    pathTaken.push(currentPathTaken);
    if (pathTaken.filter((coord) => coord == currentPathTaken).length > 1) {
      stuckInLoop = true;
      continue;
    }

    currentSpace.visited = true;
    const simpleNewCurrent = getNewPosition(current);
    const simpleNewSpace = linesClone[simpleNewCurrent.y]
      ? linesClone[simpleNewCurrent.y][simpleNewCurrent.x]
      : undefined;

    // we have left the grid
    if (!simpleNewSpace) {
      current.x = simpleNewCurrent.x;
      current.y = simpleNewCurrent.y;
      continue;
    }
    // we have hit an obstacle, time to turn right
    if (simpleNewSpace.obstacle) {
      const newDirection = rotateRight(current);
      current.dir = newDirection;
    }

    // everything is okay, continue forward!
    else {
      current.x = simpleNewCurrent.x;
      current.y = simpleNewCurrent.y;
    }
  }

  return { lines: linesClone, stuckInLoop };
};
