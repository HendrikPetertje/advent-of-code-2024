// base helpers
const getLines = (input: string) => {
  return input.split('\n').filter((line) => line.length > 0);
};

const scanLine = (line: string) => {
  const count = (line.match(/XMAS/g) || []).length;
  return count;
};

const sum = (lineCounts: number[]) => {
  return lineCounts.reduce((acc, count) => acc + count, 0);
};

const getReverse = (line: string) => {
  return line.split('').reverse().join('');
};

// scanners
const scanHorizontal = (lines: string[], reverse?: boolean) => {
  const lineCounts = lines.map((line) => {
    return scanLine(reverse ? getReverse(line) : line);
  });

  return sum(lineCounts);
};

const scanVertical = (lines: string[], reverse?: boolean) => {
  const verticalLines = lines[0].split('').map((_, i) => {
    return lines.map((line) => line[i]).join('');
  });

  const lineCounts = verticalLines.map((line) => {
    return scanLine(reverse ? getReverse(line) : line);
  });

  return sum(lineCounts);
};

const scanDiagonal = (lines: string[], reverse?: boolean, backward?: boolean) => {
  // | x | x | x |
  // | - | x | x |
  // | - | - | x |
  // | - | - | - |
  const targetLines = backward ? [...lines].reverse() : lines;
  const [first, ...rest] = targetLines;

  const firstLine = first.split('').map((_, x) => {
    return targetLines
      .map((_, y) => {
        return targetLines[y][x + y] || '';
      })
      .join('');
  });

  // | x | x | x |
  // | 0 | x | x |
  // | 1 | 0 | x |
  // | 2 | 1 | 0 |
  const restLines = rest.map((line, y) => {
    return line
      .split('')
      .map((_, x) => {
        if (!rest[y + x]) return '';
        return rest[y + x][x] || '';
      })
      .join('');
  });

  const lineCounts = [...firstLine, ...restLines].map((line) => {
    return scanLine(reverse ? getReverse(line) : line);
  });

  return sum(lineCounts);
};

// Exported functions
export const xmasSearch = (input: string) => {
  const lines = getLines(input);
  const leftToRight = scanHorizontal(lines);
  const rightToLeft = scanHorizontal(lines, true);
  const upToDown = scanVertical(lines);
  const downToUp = scanVertical(lines, true);
  const diagonalToRightDown = scanDiagonal(lines, false, false);
  const diagonalToLeftUp = scanDiagonal(lines, true, false);
  const diagnoalToRightUp = scanDiagonal(lines, false, true);
  const diagnoalToLeftDown = scanDiagonal(lines, true, true);

  return (
    leftToRight +
    rightToLeft +
    upToDown +
    downToUp +
    diagonalToRightDown +
    diagonalToLeftUp +
    diagnoalToRightUp +
    diagnoalToLeftDown
  );
};
