// helpers
const multiplyAndSumScanned = (scanned: string[]) => {
  // Take the numbers and multiply them
  const muls = scanned.map((mul) => {
    const [_, x, y] = mul.match(/mul\((\d+),(\d+)\)/) || [];
    return Number(x) * Number(y);
  });

  // total sum of all multiplications
  return muls.reduce((acc, number) => number + acc, 0);
};

// Exports
export const simpleUncorrupt = (input: string) => {
  // get the input and filter any mul(x,y) out where x and y are numbers
  const scanned = input.match(/mul\((\d+),(\d+)\)/g);

  if (!scanned) throw new Error('could not scan the input for any multipliers');

  return multiplyAndSumScanned(scanned);
};

export const doesAndDontsUncorrupt = (input: string) => {
  // get the input and filter any "mul(x,y)" out where x and y are numbers as well as any "do()" and "don't()"
  const scanned = input.match(/mul\((\d+),(\d+)\)|do\(\)|don't\(\)/g);

  if (!scanned) throw new Error('could not scan the input for any multipliers');

  const filtered = scanned.reduce(
    (acc, instruction) => {
      if (instruction === 'do()') {
        return { acc: acc.acc, ignoring: false };
      }

      if (instruction === "don't()" || acc.ignoring) {
        return { acc: acc.acc, ignoring: true };
      }

      return { acc: [...acc.acc, instruction], ignoring: false };
    },
    { acc: [] as string[], ignoring: false },
  ).acc;

  return multiplyAndSumScanned(filtered);
};
