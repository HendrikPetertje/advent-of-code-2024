const parseInput = (input: string) => {
  const rawLines = input.split('\n').filter((line) => line.length > 0);

  const map = rawLines.map((line) => {
    return line.split('');
  });

  const antinodeMap = rawLines.map((line) => {
    return line.split('').map(() => false);
  });

  return { map, antinodeMap };
};

const getMatchingNodes = (map: string[][], cellValue: string, y: number, x: number) => {
  // find the x and y coordinates of all the other cells after this one that match the same value
  const matchingNodes: { x: number; y: number }[] = [];
  map.forEach((line, y2) => {
    line.forEach((cell2, x2) => {
      if (cell2 !== cellValue) return;
      // we only want to match what comes after this one
      if (y2 <= y || (y2 == y && x > x2)) return;
      matchingNodes.push({ x: x2, y: y2 });
    });
  });

  return matchingNodes;
};

// const generateVisualAntinodeMap = (antinodeMap: boolean[][]) => {
//   const result = antinodeMap
//     .map((line) => {
//       return line
//         .map((cell) => {
//           return cell ? '#' : '.';
//         })
//         .join('');
//     })
//     .join('\n');
//
//   console.log(result);
// };

export const getAntinodeCount = (input: string) => {
  const { map, antinodeMap } = parseInput(input);

  map.forEach((line, y) => {
    line.forEach((cell, x) => {
      if (cell === '.') return;

      const matchingNodes = getMatchingNodes(map, cell, y, x);

      matchingNodes.forEach((node) => {
        // for each matching node get the x and y distance
        const yDistance = node.y - y;
        const xDistance = node.x - x;

        // insert before the first node
        if (antinodeMap[y - yDistance] && typeof antinodeMap[y - yDistance][x - xDistance] !== 'undefined') {
          antinodeMap[y - yDistance][x - xDistance] = true;
        }

        // insert after the second node
        if (
          antinodeMap[node.y + yDistance] &&
          typeof antinodeMap[node.y + yDistance][node.x + xDistance] !== 'undefined'
        ) {
          antinodeMap[node.y + yDistance][node.x + xDistance] = true;
        }
      });
    });
  });

  let antinodeCount = 0;
  antinodeMap.forEach((line) => {
    line.forEach((cell) => {
      if (cell) antinodeCount += 1;
    });
  });

  return antinodeCount;
};

export const getAntinodeSuperCount = (input: string) => {
  const { map, antinodeMap } = parseInput(input);

  map.forEach((line, y) => {
    line.forEach((cell, x) => {
      if (cell === '.') return;

      const matchingNodes = getMatchingNodes(map, cell, y, x);

      matchingNodes.forEach((node) => {
        // for each matching node get the x and y distance
        const yDistance = node.y - y;
        const xDistance = node.x - x;

        // antinode the current node first, and traverse back to create
        // antinodes in a recurring line
        let currentMinY = y;
        let currentMinX = x;
        while (currentMinY >= 0 && currentMinX >= 0 && currentMinX < antinodeMap[0].length) {
          antinodeMap[currentMinY][currentMinX] = true;
          currentMinY -= yDistance;
          currentMinX -= xDistance;
        }

        // antinode the future node first, and traverse forward to create
        // antinodes in a recurring line
        let currentMaxY = node.y;
        let currentMaxX = node.x;
        while (currentMaxY < antinodeMap.length && currentMaxX < antinodeMap[0].length && currentMaxX >= 0) {
          antinodeMap[currentMaxY][currentMaxX] = true;
          currentMaxY += yDistance;
          currentMaxX += xDistance;
        }
      });
    });
  });

  let antinodeCount = 0;
  antinodeMap.forEach((line) => {
    line.forEach((cell) => {
      if (cell) antinodeCount += 1;
    });
  });

  return antinodeCount;
};
