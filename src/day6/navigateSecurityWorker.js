import { isMainThread, parentPort, workerData } from 'worker_threads';
import { navigateSecurity } from './navigateSecurity.js';

if (!isMainThread && parentPort) {
  const { current, lines, height, width, newObstacle } = workerData;
  const result = navigateSecurity(current, lines, height, width, newObstacle);

  parentPort.postMessage(result);
}
