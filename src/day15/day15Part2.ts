type Map = Array<'Wall' | '[' | ']' | null>[];
type CurrentLocation = { x: number; y: number };
type Instruction = '^' | '>' | 'v' | '<';

const dirs = {
  '^': 'up' as const,
  '>': 'right' as const,
  v: 'down' as const,
  '<': 'left' as const,
};

const createMap = (input: string) => {
  const [rawMap, rawInstructions] = input.trim().split('\n\n');

  if (!rawMap || !rawInstructions) throw new Error('Invalid input');

  const currentLocation: CurrentLocation = { x: 0, y: 0 };
  const map: Map = rawMap.split('\n').map((line, y) =>
    line.split('').flatMap((char, x) => {
      if (char === '#') return ['Wall', 'Wall'] as const;
      if (char === 'O') return ['[', ']'] as const;
      if (char === '@') {
        currentLocation.x = x * 2;
        currentLocation.y = y;
      }
      return [null, null] as const;
    }),
  );

  const instructions = rawInstructions.replaceAll('\n', '').split('') as Instruction[];

  return { map, instructions, currentLocation };
};

const moveObjectHorizontal = (map: Map, targetObjectLocation: CurrentLocation, direction: 'left' | 'right') => {
  const currentRow = map[targetObjectLocation.y];

  // Safeguard from bugs
  if (direction === 'left' && currentRow[targetObjectLocation.x] !== ']') throw new Error('Invalid move');
  if (direction === 'right' && currentRow[targetObjectLocation.x] !== '[') throw new Error('Invalid move');

  let emptySpace: number | null = null;
  const directionModifier = direction === 'left' ? -1 : 1;
  for (
    let i = targetObjectLocation.x + directionModifier;
    i >= 0 && i <= currentRow.length - 1;
    i += directionModifier
  ) {
    if (currentRow[i] === 'Wall') break;
    if (currentRow[i] === null) {
      emptySpace = i;
      break;
    }
  }

  if (emptySpace === null) return false;

  // remove empty space from the row entirely and then re-insert it in the new location
  currentRow.splice(emptySpace, 1);
  currentRow.splice(targetObjectLocation.x, 0, null);
  return true;
};

const tickV = (
  map: Map,
  current: CurrentLocation,
  direction: 'up' | 'down',
  visited: { x: number; y: number }[] = [],
) => {
  // get current full object
  const [currentLeft, currentRight] =
    map[current.y][current.x] === '['
      ? [
          { x: current.x, y: current.y },
          { x: current.x + 1, y: current.y },
        ]
      : [
          { x: current.x - 1, y: current.y },
          { x: current.x, y: current.y },
        ];

  visited.push(currentLeft, currentRight);

  // get next row obj
  const distance = direction === 'up' ? -1 : 1;
  const nextRow = map[current.y + distance];
  const nextRowL = nextRow[currentLeft.x];
  const nextRowR = nextRow[currentRight.x];

  // we have hit a wall, nothing can move
  if (nextRowL === 'Wall' || nextRowR === 'Wall') return false;

  const nextRowsEmpty = nextRowL === null && nextRowR === null;

  // if we have empty space in the next row, we can move the object, return all objects to be moved upward
  if (nextRowsEmpty) return visited;

  // if we have no empty space we check the next stack up or down
  const nextLeftVisited =
    nextRowL === null ? [] : tickV(map, { x: currentLeft.x, y: current.y + distance }, direction, visited);
  if (!nextLeftVisited) return false;
  const nextRightVisited =
    nextRowR === null ? [] : tickV(map, { x: currentRight.x, y: current.y + distance }, direction, visited);
  if (!nextRightVisited) return false;

  // create unique array of all visited objects
  const newVisited: typeof visited = [...visited, ...nextLeftVisited, ...nextRightVisited];
  const uniqueVisited = newVisited.filter((v, i, a) => a.findIndex((t) => t.x === v.x && t.y === v.y) === i);

  return uniqueVisited;
};

const moveObjectVertical = (map: Map, targetObjectLocation: CurrentLocation, direction: 'up' | 'down') => {
  const visited = tickV(map, targetObjectLocation, direction);

  // If we can not move anything, return false
  if (!visited) return false;

  // if we can move stuff, sort visited records {x: number, y: number}[] from the y asc, if going down sort by y desc
  // This will help us moving items up or down without overwriting anything
  const sortedVisited = visited.sort((a, b) => (direction === 'down' ? b.y - a.y : a.y - b.y));

  sortedVisited.forEach(({ x, y }) => {
    const distance = direction === 'up' ? -1 : 1;
    const currentItem = map[y][x];
    // move item up or down
    map[y + distance][x] = currentItem;
    map[y][x] = null;
  });

  // We have moved everything and the robot can follow now
  return true;
};

const followInstruction = (map: Map, instruction: Instruction, currentLocation: CurrentLocation) => {
  const { x, y } = currentLocation;
  const nextLocation = { x, y };
  const direction = dirs[instruction];

  switch (instruction) {
    case '^':
      nextLocation.y -= 1;
      break;
    case '>':
      nextLocation.x += 1;
      break;
    case 'v':
      nextLocation.y += 1;
      break;
    case '<':
      nextLocation.x -= 1;
      break;
  }
  if (map[nextLocation.y][nextLocation.x] === 'Wall') return;
  if (['[', ']'].includes(map[nextLocation.y][nextLocation.x] || '')) {
    if (direction === 'up' || direction === 'down') {
      if (!moveObjectVertical(map, nextLocation, direction)) return;
    }

    if (direction === 'left' || direction === 'right') {
      if (!moveObjectHorizontal(map, nextLocation, direction)) return;
    }
  }

  currentLocation.x = nextLocation.x;
  currentLocation.y = nextLocation.y;
};

const calculateGpsLocs = (map: Map) => {
  const gpsLocs = map.flatMap((row, y) => {
    return row.map((cell, x) => {
      if (cell === '[') {
        return y * 100 + x;
      }
      return 0;
    });
  });
  return gpsLocs;
};

// const constructMapLog = (map: Map, currentLocation: CurrentLocation) => {
//   const visualMap = map
//     .map((row, y) => {
//       return row
//         .map((cell, x) => {
//           if (cell === 'Wall') return '#';
//           if (cell === '[' || cell === ']') return cell;
//           if (x === currentLocation.x && y === currentLocation.y) return '@';
//           return '.';
//         })
//         .join('');
//     })
//     .join('\n');
//
//   console.log(visualMap);
// };

export const runRobotAmockUpscaled = (input: string) => {
  const { instructions, map, currentLocation } = createMap(input);

  instructions.forEach((instruction) => {
    followInstruction(map, instruction, currentLocation);
  });

  const gpsLocs = calculateGpsLocs(map).filter((gps) => gps !== 0);
  const sum = gpsLocs.reduce((acc, val) => acc + val, 0);
  return sum;
};
