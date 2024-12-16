interface AreaSpecs {
  width: number;
  height: number;
}

interface Bot {
  pos: { x: number; y: number };
  vel: { x: number; y: number };
}

const parseInput = (input: string): Bot[] => {
  return input
    .trim()
    .split('\n')
    .map((line) => {
      const result = line.match(/^p=(.+),(.+) v=(.+),(.+)$/);

      if (!result) throw new Error('Invalid input');

      return {
        pos: { x: parseInt(result[1]), y: parseInt(result[2]) },
        vel: { x: parseInt(result[3]), y: parseInt(result[4]) },
      };
    });
};

const getDistanceTraveled = (pos: number, vel: number, areaLength: number, seconds: number) => {
  const distanceTraveled = vel * seconds;

  const fullCycles = Math.floor(distanceTraveled / areaLength);
  const remainingDistance = distanceTraveled - fullCycles * areaLength;

  const rawNewPos = pos + remainingDistance;

  // if we have oversot the area boundary by moving the remaining distance
  if (rawNewPos >= areaLength) {
    return rawNewPos - areaLength;
  }

  return pos + remainingDistance;
};

const tickBot = (bot: Bot, AreaSpecs: AreaSpecs, seconds: number) => {
  const { pos, vel } = bot;

  // get number of full cycles performed on the grid for X
  const distanceX = getDistanceTraveled(pos.x, vel.x, AreaSpecs.width, seconds);
  const distanceY = getDistanceTraveled(pos.y, vel.y, AreaSpecs.height, seconds);

  return { pos: { x: distanceX, y: distanceY }, vel };
};

const createArrayFromRage = (min: number, max: number) => {
  return Array.from({ length: max - min + 1 }).map((_, i) => i + min);
};

const getBotsPerQuadrant = (bots: Bot[], specs: AreaSpecs) => {
  const lefTop = {
    x: createArrayFromRage(0, Math.floor(specs.width / 2) - 1),
    y: createArrayFromRage(0, Math.floor(specs.height / 2) - 1),
  };

  const rightTop = {
    x: createArrayFromRage(Math.ceil(specs.width / 2), specs.width - 1),
    y: lefTop.y,
  };

  const leftBottom = {
    x: lefTop.x,
    y: createArrayFromRage(Math.ceil(specs.height / 2), specs.height - 1),
  };

  const rightBottom = {
    x: rightTop.x,
    y: leftBottom.y,
  };

  let inLeftTop = 0;
  let inRightTop = 0;
  let inLeftBottom = 0;
  let inRightBottom = 0;

  bots.forEach(({ pos: { x, y } }) => {
    switch (true) {
      case lefTop.x.includes(x) && lefTop.y.includes(y):
        inLeftTop += 1;
        break;
      case rightTop.x.includes(x) && rightTop.y.includes(y):
        inRightTop += 1;
        break;
      case leftBottom.x.includes(x) && leftBottom.y.includes(y):
        inLeftBottom += 1;
        break;
      case rightBottom.x.includes(x) && rightBottom.y.includes(y):
        inRightBottom += 1;
        break;
      default:
      // ignored
    }
  });

  return { inLeftTop, inRightTop, inLeftBottom, inRightBottom };
};

const treeRegex = /████████/;
const checkMap = (specs: AreaSpecs, bots: Bot[]) => {
  const map = Array.from({ length: specs.height }).map(() => Array.from({ length: specs.width }).map(() => ' '));

  map.forEach((row, y) => {
    row.forEach((_, x) => {
      if (bots.some((bot) => bot.pos.x === x && bot.pos.y === y)) {
        // count how many bots are in this position
        map[y][x] = '█';
      }
    });
  });

  const visualMap = map.map((row) => row.join('')).join('\n');

  const match = treeRegex.test(visualMap);
  if (match) {
    // console.info(visualMap);
    return true;
  }
};

export const getSafetyFactor = (input: string, specs: AreaSpecs, seconds: number, findTreeFrom?: number) => {
  const robots = parseInput(input);

  // Part 1
  if (!findTreeFrom) {
    const finalpositions = robots.map((bot) => tickBot(bot, specs, seconds));
    const botsPerQuadrant = getBotsPerQuadrant(finalpositions, specs);
    return Object.values(botsPerQuadrant).reduce((acc, val) => acc * val, 1);
  }

  // Part 2
  for (let i = findTreeFrom; i < seconds; i++) {
    // console.log(i);
    const finalpositions = robots.map((bot) => tickBot(bot, specs, i));
    if (checkMap(specs, finalpositions)) return i;
  }
};
