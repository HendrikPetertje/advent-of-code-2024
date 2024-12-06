import { isMainThread, parentPort, Worker, workerData } from 'worker_threads';
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

export const getPossibleLoops = async (input: string) => {
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

  // run in batches of 100
  const now = Date.now();
  const batchSize = 30;
  const results: boolean[] = [];

  for (let i = 0; i < visited.length; i += batchSize) {
    const batch = visited.slice(i, i + batchSize);

    const runs: boolean[] = await Promise.all(
      batch.map(
        ({ x, y }) =>
          new Promise((resolve, reject) => {
            const worker = new Worker('./src/day6/navigateSecurityWorker.js', {
              workerData: { current, lines, height, width, newObstacle: { x, y } },
            });

            worker.on('message', (result) => {
              resolve(result.stuckInLoop as boolean);
            });

            worker.on('error', reject);
          }),
      ),
    );

    console.log('batch done ', i, 'of', visited.length, 'after', (Date.now() - now) / 1000);
    results.push(...runs);
  }

  return results.filter((run) => run).length;
};
