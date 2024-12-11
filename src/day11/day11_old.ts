type Line = string[];

const parseInput = (input: string): Line => {
  return input.trim().split(' ');
};

const blinksToList = (blinks: number) => {
  return Array.from({ length: blinks }, (_, i) => i);
};

const performBlink = (line: Line) => {
  const newLine = line.flatMap((stone) => {
    // if the stone is '0' return '1';
    if (stone === '0') return '1';
    // if the length of the string is even, separate it in the middle
    if (stone.length % 2 === 0) {
      const middle = stone.length / 2;
      // parse int to remove trailing 0's
      const left = parseInt(stone.slice(0, middle)).toString();
      const right = parseInt(stone.slice(middle)).toString();
      return [left, right];
    }

    // otherwise, multiply by 2024
    return (parseInt(stone) * 2024).toString();
  });

  return newLine;
};

export const countNumberOfStonesAfterBlinking = (input: string, blinks: number) => {
  const line = parseInput(input);
  const blinksList = blinksToList(blinks);

  const finalLine = blinksList.reduce((acc, _) => performBlink(acc), line);
  return finalLine.length;
};
