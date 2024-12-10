type Map = number[][];
interface Coordinate {
  x: number;
  y: number;
  z: number;
}
interface Trail {
  start: Coordinate;
  current: [Coordinate, ...Coordinate[]];
  finish?: Coordinate;
}

const createmap = (input: string): Map => {
  const baseLines = input.split('\n').filter((line) => line.length > 0);
  const positions = baseLines.map((line) => {
    return line.split('').map((char) => parseInt(char));
  });

  return positions;
};

const getStartPositions = (map: Map) => {
  const startPositions: Trail[] = [];
  map.forEach((line, y) => {
    line.forEach((position, x) => {
      if (position === 0) {
        startPositions.push({ start: { x, y, z: 0 }, current: [{ x, y, z: 0 }], finish: undefined });
      }
    });
  });

  return startPositions;
};

const traverseTrail = (map: Map, trail: Trail, maxY: number, maxX: number): Trail[] => {
  const { x, y, z } = trail.current.at(-1);

  // If we are stuck in a loop, return []
  if (
    trail.current.length > 1 &&
    trail.current.slice(0, -1).some((coord) => coord.x === x && coord.y === y && coord.z === z)
  ) {
    return [];
  }

  // If we have arrived at the summit return the trail with finish
  if (z === 9) return [{ ...trail, finish: trail.current.at(-1) }];

  const possibleDirections: Trail[] = [];
  if (x + 1 <= maxX) {
    possibleDirections.push({ ...trail, current: [...trail.current, { x: x + 1, y, z: map[y][x + 1] }] });
  }
  if (x - 1 >= 0) possibleDirections.push({ ...trail, current: [...trail.current, { x: x - 1, y, z: map[y][x - 1] }] });
  if (y + 1 <= maxY) {
    possibleDirections.push({ ...trail, current: [...trail.current, { x, y: y + 1, z: map[y + 1][x] }] });
  }
  if (y - 1 >= 0) possibleDirections.push({ ...trail, current: [...trail.current, { x, y: y - 1, z: map[y - 1][x] }] });

  const newDirections = possibleDirections.filter(
    (direction) => direction.current.at(-1)!.z === trail.current.at(-1)!.z + 1,
  );

  return newDirections.flatMap((newDirection) => traverseTrail(map, newDirection, maxY, maxX));
};

const getUniqueTrailCount = (trails: Trail[]) => {
  const uniqueTrails: `x${number}y${number}z${number}:x${number}y${number}z${number}`[] = [];

  trails.forEach((trail) => {
    const { start, finish } = trail;
    if (finish) {
      const trailString = `x${start.x}y${start.y}z${start.z}:x${finish.x}y${finish.y}z${finish.z}` as const;
      if (!uniqueTrails.includes(trailString)) uniqueTrails.push(trailString);
    }
  });

  return uniqueTrails.length;
};

const getTrailRatingsSum = (trailSets: Trail[][]) => {
  const ratings = trailSets.map((trailSet) => trailSet.length);
  const sum = ratings.reduce((acc, rating) => acc + rating, 0);
  return sum;
};

export const getTrailCount = (input: string) => {
  const map = createmap(input);
  const startPositions = getStartPositions(map);
  const trails = startPositions.flatMap((trail) => traverseTrail(map, trail, map.length - 1, map[0].length - 1));
  const uniqueTrailCount = getUniqueTrailCount(trails);

  return uniqueTrailCount;
};

export const getTrailRatings = (input: string) => {
  const map = createmap(input);
  const startPositions = getStartPositions(map);
  // map instead of flatmap to create lists for each trail option
  const trailSets = startPositions.map((trail) => traverseTrail(map, trail, map.length - 1, map[0].length - 1));
  const trailRatings = getTrailRatingsSum(trailSets);

  return trailRatings;
};
