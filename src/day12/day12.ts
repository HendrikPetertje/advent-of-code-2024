type X = number;
type Y = number;

/**
 * ur: upper right
 * dr: down right
 * dl: down left
 * ul: upper left
 */
type CornerPos = 'ur' | 'dr' | 'dl' | 'ul';
/**
 * X and Y position of the region that is the top left of the corner
 * C is the position of the corner relative to the region
 *
 */
type CornerRecord = Record<`${X}.${Y}.${CornerPos}`, true>;

const createMap = (input: string) => {
  return input
    .trim()
    .split('\n')
    .map((line) => line.split(''));
};

const cornerCheck = (map: string[][], x: X, y: Y, corners: CornerRecord) => {
  const targetPlot = map[y][x];

  const fenceUp = !map[y - 1] || map[y - 1][x] !== targetPlot;
  const fenceRight = map[y][x + 1] !== targetPlot;
  const fenceDown = !map[y + 1] || map[y + 1][x] !== targetPlot;
  const fenceLeft = map[y][x - 1] !== targetPlot;

  const unmatchingUpRight = !map[y - 1] || map[y - 1][x + 1] !== targetPlot;
  const unmatchingDownRight = !map[y + 1] || map[y + 1][x + 1] !== targetPlot;
  const unmatchingDownLeft = !map[y + 1] || map[y + 1][x - 1] !== targetPlot;
  const unmatchingUpLeft = !map[y - 1] || map[y - 1][x - 1] !== targetPlot;

  // base corners
  if (fenceUp && fenceRight) {
    corners[`${x}.${y - 1}.ur`] = true;
  }
  if (fenceRight && fenceDown) {
    corners[`${x}.${y}.dr`] = true;
  }
  if (fenceDown && fenceLeft) {
    corners[`${x - 1}.${y}.dl`] = true;
  }
  if (fenceLeft && fenceUp) {
    corners[`${x - 1}.${y - 1}.ul`] = true;
  }

  // inside corners
  // up right
  if (fenceUp && !fenceRight && !unmatchingUpRight) {
    corners[`${x}.${y - 1}.ur`] = true;
  }
  // down right
  if (fenceRight && !fenceDown && !unmatchingDownRight) {
    corners[`${x}.${y}.dr`] = true;
  }
  // down left
  if (fenceDown && !fenceLeft && !unmatchingDownLeft) {
    corners[`${x - 1}.${y}.dl`] = true;
  }
  // up left
  if (fenceLeft && !fenceUp && !unmatchingUpLeft) {
    corners[`${x - 1}.${y - 1}.ul`] = true;
  }

  return corners;
};

const findRestOfPlot = (
  map: string[][],
  x: number,
  y: number,
  plot?: string,
  initialCoordinates: Record<`${X}.${Y}`, number> = {},
  initialCorners: CornerRecord = {},
): { coordinates: Record<`${X}.${Y}`, number>; corners: CornerRecord } => {
  const targetPlot = plot || map[y][x];

  let coordinates = initialCoordinates;
  let corners = initialCorners;

  // we are not on the same region anymore
  if (map[y][x] !== targetPlot) return { coordinates, corners };

  // we have already visited this plot
  if (typeof coordinates[`${x}.${y}`] !== 'undefined') return { coordinates, corners };

  const fenceUp = !map[y - 1] || map[y - 1][x] !== targetPlot;
  const fenceRight = map[y][x + 1] !== targetPlot;
  const fenceDown = !map[y + 1] || map[y + 1][x] !== targetPlot;
  const fenceLeft = map[y][x - 1] !== targetPlot;

  // get the amount of fences (up, right, down, left)
  const fences = [fenceUp, fenceRight, fenceDown, fenceLeft].filter((f) => f).length;

  coordinates[`${x}.${y}`] = fences;

  // check corners
  cornerCheck(map, x, y, corners);

  // check directions
  if (map[y - 1]) {
    const { coordinates: newCords, corners: newCornes } = findRestOfPlot(map, x, y - 1, targetPlot, coordinates);
    coordinates = { ...coordinates, ...newCords };
    corners = { ...corners, ...newCornes };
  }
  if (map[y][x + 1]) {
    const { coordinates: newCords, corners: newCornes } = findRestOfPlot(map, x + 1, y, targetPlot, coordinates);
    coordinates = { ...coordinates, ...newCords };
    corners = { ...corners, ...newCornes };
  }
  if (map[y + 1]) {
    const { coordinates: newCords, corners: newCornes } = findRestOfPlot(map, x, y + 1, targetPlot, coordinates);
    coordinates = { ...coordinates, ...newCords };
    corners = { ...corners, ...newCornes };
  }
  if (map[y][x - 1]) {
    const { coordinates: newCords, corners: newCornes } = findRestOfPlot(map, x - 1, y, targetPlot, coordinates);
    coordinates = { ...coordinates, ...newCords };
    corners = { ...corners, ...newCornes };
  }

  return { coordinates, corners };
};

const ignorePlots = (map: string[][], plots: `${X}.${Y}`[]) => {
  const newMap = map;
  plots.forEach((plot) => {
    const [x, y] = plot.split('.').map(Number);
    newMap[y][x] = '.';
  });

  return newMap;
};

export const getFencePrices = (input: string) => {
  let map = createMap(input);
  let price = 0;

  map.forEach((line, y) => {
    line.forEach((_region, x) => {
      // If this plot has been mapped already skip over it
      if (map[y][x] === '.') return;

      const { coordinates } = findRestOfPlot(map, x, y);

      const regionsWithFences = Object.values(coordinates);
      const fences = regionsWithFences.reduce((acc, fences) => fences + acc, 0);

      const newPrice = regionsWithFences.length * fences;
      price = price + newPrice;

      map = ignorePlots(map, Object.keys(coordinates) as `${X}.${Y}`[]);
    });
  });

  return price;
};

export const getFencePricesOnDiscount = (input: string) => {
  let map = createMap(input);
  let price = 0;

  map.forEach((line, y) => {
    line.forEach((_region, x) => {
      // If this plot has been mapped already skip over it
      if (map[y][x] === '.') return;

      const { coordinates, corners } = findRestOfPlot(map, x, y);

      const regionsCount = Object.keys(coordinates).length;
      const cornersCount = Object.keys(corners).length;
      console.log(corners);

      const newPrice = regionsCount * cornersCount;
      price = price + newPrice;

      map = ignorePlots(map, Object.keys(coordinates) as `${number}.${number}`[]);
    });
  });

  return price;
};
