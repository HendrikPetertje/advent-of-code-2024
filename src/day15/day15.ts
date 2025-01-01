type Map = Array<'Wall' | 'Object' | null>[];
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
    line.split('').map((char, x) => {
      if (char === '#') return 'Wall';
      if (char === 'O') return 'Object';
      if (char === '@') {
        currentLocation.x = x;
        currentLocation.y = y;
      }
      return null;
    }),
  );

  const instructions = rawInstructions.replaceAll('\n', '').split('') as Instruction[];

  return { map, instructions, currentLocation };
};

const moveObjectHorizontal = (map: Map, targetObjectLocation: CurrentLocation, direction: 'left' | 'right') => {
  const currentRow = map[targetObjectLocation.y];

  // Find the closest empty space
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

  map[targetObjectLocation.y][emptySpace] = 'Object';
  map[targetObjectLocation.y][targetObjectLocation.x] = null;

  return true;
};

const moveObjectVertical = (map: Map, targetObjectLocation: CurrentLocation, direction: 'up' | 'down') => {
  const currentColumn = map.map((row) => row[targetObjectLocation.x]);

  // Find the closest empty space
  let emptySpace: number | null = null;
  const directionModifier = direction === 'up' ? -1 : 1;
  for (
    let i = targetObjectLocation.y + directionModifier;
    i >= 0 && i <= currentColumn.length - 1;
    i += directionModifier
  ) {
    if (currentColumn[i] === 'Wall') break;
    if (currentColumn[i] === null) {
      emptySpace = i;
      break;
    }
  }

  if (emptySpace === null) return false;

  map[emptySpace][targetObjectLocation.x] = 'Object';
  map[targetObjectLocation.y][targetObjectLocation.x] = null;

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
  if (map[nextLocation.y][nextLocation.x] === 'Object') {
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
      if (cell === 'Object') {
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
//           if (cell === 'Object') return 'O';
//           if (x === currentLocation.x && y === currentLocation.y) return '@';
//           return '.';
//         })
//         .join('');
//     })
//     .join('\n');
//
//   console.log(visualMap);
// };

export const runRobotAmock = (input: string) => {
  const { instructions, map, currentLocation } = createMap(input);

  instructions.forEach((instruction) => {
    followInstruction(map, instruction, currentLocation);
  });

  const gpsLocs = calculateGpsLocs(map).filter((gps) => gps !== 0);
  const sum = gpsLocs.reduce((acc, val) => acc + val, 0);
  return sum;
};
