const parseInput = (input: string): string[] => {
  return input.trim().split(' ');
};

const mutate = (stone: string): string[] => {
  // if the stone is '0' return '1';
  if (stone === '0') return ['1'];

  // if the length of the string is even, separate it in the middle and return both halves
  if (stone.length % 2 === 0) {
    const middle = stone.length / 2;
    // parse int to remove trailing 0's
    const left = BigInt(stone.slice(0, middle)).toString();
    const right = BigInt(stone.slice(middle)).toString();
    return [left, right];
  }

  // otherwise, multiply by 2024
  return [(BigInt(stone) * BigInt(2024)).toString()];
};

const sumList = (list: number[]): number => {
  return list.reduce((acc, item) => item + acc, 0);
};

// create a memory object to store common results
// Now this is the actual real magic, without Memoization this code would run
// incredibly long. With memoization? < 50ms
const MEMORY = new Map<string, number>();

const doABlink = (stone: string, maxBlinks: number, blinkNo = 0): number => {
  const key = `${maxBlinks}-${stone}-${blinkNo}`;
  if (MEMORY.has(key)) return MEMORY.get(key) as number;

  // If we have blinked the maximum number of blinks, then we return the count of our one stone
  if (blinkNo === maxBlinks) return 1;

  // Mutate the stone into a new stone or 2 new stones
  const newStones = mutate(stone);

  const resultList = newStones.map((newStone) => doABlink(newStone, maxBlinks, blinkNo + 1));
  const result = sumList(resultList);

  MEMORY.set(key, result);
  return result;
};

export const countNumberOfStonesAfterBlinking = (input: string, blinks: number) => {
  const line = parseInput(input);
  const result = line.map((stone) => doABlink(stone, blinks));

  return sumList(result);
};
