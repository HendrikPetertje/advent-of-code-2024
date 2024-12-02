const getNewPosition = (current: { x: number; y: number; dir: string }) => {
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

const rotateRight = (current: { x: number; y: number; dir: string }) => {
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

export const navigateSecurity = (
  origCurrent: { x: number; y: number; dir: string },
  lines: { obstacle: boolean; visited: boolean }[][],
  height: number,
  width: number,
  newObstacle?: { x: number; y: number },
) => {
  const linesClone = structuredClone(lines);
  const current = structuredClone(origCurrent);

  if (newObstacle) {
    linesClone[newObstacle.y][newObstacle.x].obstacle = true;
  }

  const pathTaken: `x${number}y${number}dir${string}`[] = [];
  let stuckInLoop = false;

  while (current.x >= 0 && current.x < width && current.y >= 0 && current.y < height && !stuckInLoop) {
    const currentSpace = linesClone[current.y][current.x];

    const currentPathTaken = `x${current.x}y${current.y}dir${current.dir}` as const;

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

    if (simpleNewSpace.obstacle) {
      const newDirection = rotateRight(current);
      current.dir = newDirection;
    } else {
      current.x = simpleNewCurrent.x;
      current.y = simpleNewCurrent.y;
    }
  }

  return { lines: linesClone, stuckInLoop };
};
