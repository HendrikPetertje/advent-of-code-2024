const getLines = (input: string) => {
  return input.split('\n').filter((line) => line.length > 0);
};

export const masXsearch = (input: string) => {
  const lines = getLines(input);

  let count = 0;

  lines.forEach((line, y) => {
    line.split('').forEach((char, x) => {
      // if the line matches M or S and there is enough space left to make an MAS vertically down-right
      if (!char.match(/M|S/) || !lines[y + 2] || !lines[y][x + 2]) return;

      const diagonalToRightDown = `${lines[y][x]}${lines[y + 1][x + 1]}${lines[y + 2][x + 2]}`;
      const diagonalToLeftDown = `${lines[y][x + 2]}${lines[y + 1][x + 1]}${lines[y + 2][x]}`;

      if (diagonalToRightDown.match(/MAS|SAM/) && diagonalToLeftDown.match(/MAS|SAM/)) count = count + 1;
    });
  });

  return count;
};
