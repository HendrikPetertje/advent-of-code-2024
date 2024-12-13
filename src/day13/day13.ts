interface ClawMachine {
  buttonA: {
    x: number;
    y: number;
  };
  buttonB: {
    x: number;
    y: number;
  };
  prize: {
    x: number;
    y: number;
  };
}

export const parseInput = (input: string, offset = 0) => {
  const blocks = input.trim().split('\n\n');
  return blocks.map((block) => {
    const [buttonARaw, buttonBRaw, prizeRaw]: string[] = block.split('\n');
    if (!buttonARaw || !buttonBRaw || !prizeRaw) throw new Error('Invalid input');

    const [buttonA, buttonB] = [buttonARaw, buttonBRaw].map((raw) => {
      const result = raw.match(/Button \w: X\+(\d+), Y\+(\d+)$/);
      if (!result || !result[1] || !result[2]) throw new Error('Invalid input in button block');

      return { x: parseInt(result[1]), y: parseInt(result[2]) };
    });

    const [prize] = [prizeRaw].map((raw) => {
      const result = raw.match(/Prize: X=(\d+), Y=(\d+)$/);
      if (!result || !result[1] || !result[2]) throw new Error('Invalid input in prize block');

      return { x: parseInt(result[1]) + offset, y: parseInt(result[2]) + offset };
    });

    return { buttonA, buttonB, prize };
  });
};

const solveCheapestCost = (machine: ClawMachine, costA: number, costB: number) => {
  // This function uses Cramer's rule to solve the system of equations
  //
  // I have some thoughts about this and things that came forward while reading.
  // - There is no minimum or maximum, so there is no need for really big greedy algorithms
  // - This formula would break if there was some collinearity between the buttons and the prize
  const determinant = machine.buttonA.x * machine.buttonB.y - machine.buttonA.y * machine.buttonB.x;

  const numeratorButtonA = machine.prize.x * machine.buttonB.y - machine.prize.y * machine.buttonB.x;
  const buttonAPresses = numeratorButtonA / determinant;

  const numeratorButtonB = machine.buttonA.x * machine.prize.y - machine.buttonA.y * machine.prize.x;
  const buttonBPresses = Math.floor(numeratorButtonB / determinant);

  // I could not do math floor here and then figure out if there were decimal positions, but this simple
  // check will do the trick too!
  if (
    buttonAPresses * machine.buttonA.x + buttonBPresses * machine.buttonB.x !== machine.prize.x ||
    buttonAPresses * machine.buttonA.y + buttonBPresses * machine.buttonB.y !== machine.prize.y
  ) {
    return 0;
  }

  // Return final result
  return buttonAPresses * costA + buttonBPresses * costB;
};

export const spendLittleTokensToWinPrices = (input: string, offset?: number) => {
  const parsed = parseInput(input, offset);

  const costA = 3;
  const costB = 1;

  const result = parsed.map((machine) => solveCheapestCost(machine, costA, costB));

  const totalCost = result.reduce((acc, cost) => acc + cost, 0);
  return totalCost;
};
