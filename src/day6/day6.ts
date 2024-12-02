import { navigateSecurity } from './navigateSecurity';

const prepareInput = (input: string) => {
  const rawLines = input.split('\n').filter((line) => line);
  const lines = rawLines.map((line) =>
    line.split('').map((space) => ({ obstacle: space === '#', visited: ['^'].includes(space) })),
  );

  let current: { x: number; y: number; dir: string } = { x: 0, y: 0, dir: 'up' };

  lines.forEach((line, y) => {
    line.forEach((space, x) => {
      if (space.visited) {
        current = { x, y, dir: 'up' };
      }
    });
  });

  return { lines, current, width: lines[0].length, height: lines.length };
};

export const getDistinctPaths = (input: string) => {
  const { lines, current, width, height } = prepareInput(input);

  const { lines: finalLines } = navigateSecurity(current, lines, height, width);

  let visitedCount = 0;
  finalLines.forEach((line) => {
    line.forEach((space) => {
      if (space.visited) visitedCount += 1;
    });
  });

  return visitedCount;
};

export const getPossibleLoops = (input: string) => {
  const { lines, current, width, height } = prepareInput(input);

  const initialCurrentClone = structuredClone(current);
  const initialLines = structuredClone(lines);
  const { lines: finalLines } = navigateSecurity(initialCurrentClone, initialLines, height, width);

  const visited: { x: number; y: number }[] = [];

  finalLines.forEach((line, y) => {
    line.forEach((space, x) => {
      if (space.visited) visited.push({ x, y });
    });
  });

  // console.log(visited.length);

  let loopCount = 0;

  visited.forEach(({ x, y }) => {
    const { stuckInLoop } = navigateSecurity(current, lines, height, width, { x, y });
    if (stuckInLoop) loopCount += 1;

    // console.log('new', i, ' of ', visited.length, loopCount);
  });

  return loopCount;
};
