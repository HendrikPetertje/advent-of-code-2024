const parseInput = (input: string) => {
  const match = input.trim().match(/(\d+)/g);
  if (!match) throw new Error('Invalid input');

  const [registerA, registerB, RegisterC, ...program] = match;
  if (!registerA || !registerB || !RegisterC || !program.length) throw new Error('Invalid input');

  return {
    registerA: parseInt(registerA),
    registerB: parseInt(registerB),
    RegisterC: parseInt(RegisterC),
    program: program.map((i) => parseInt(i)),
  };
};

export const getDebugOutput = (input: string) => {
  const { registerA, registerB, RegisterC, program } = parseInput(input);

  let a = registerA;
  let b = registerB;
  let c = RegisterC;

  const combo = (operand: number) => {
    if (operand >= 0 && operand <= 3) return operand;
    if (operand == 4) return a;
    if (operand == 5) return b;
    if (operand == 6) return c;
    throw new Error(`Invalid combo operand: ${operand}`);
  };

  let pointer = 0;
  const output: number[] = [];

  while (pointer < program.length) {
    const instruction = program[pointer];
    const operand = program[pointer + 1];

    // run through the program
    switch (instruction) {
      case 0: // adv
        a = a >> combo(operand);
        break;
      case 1: // bxl
        b = b ^ operand;
        break;
      case 2: // bst
        b = combo(operand) % 8;
        break;
      case 3: // jnz
        if (a !== 0) {
          pointer = operand;
          continue;
        }
        break;
      case 4: // bxc
        b = b ^ c;
        break;
      case 5: // out
        output.push(combo(operand) % 8);
        break;
      case 6: // bdv
        b = b >> combo(operand);
        break;
      case 7: // cdv
        c = a >> combo(operand);
        break;
    }
    pointer += 2;
  }

  return output.join(',');
};

const find = (target: number[], program: number[], answer: bigint): bigint | false => {
  if (target.length === 0) return answer;
  const testRage = [0, 1, 2, 3, 4, 5, 6, 7];

  for (let i = 0; i < testRage.length; i++) {
    const test = testRage[i];

    const a = (answer << BigInt(3)) + BigInt(test);
    let b = BigInt(0);
    let c = BigInt(0);

    let output: bigint | false = false;
    let adv3Happend = false;

    const combo = (operand: bigint) => {
      if (operand >= BigInt(0) && operand <= BigInt(3)) return operand;
      if (operand == BigInt(4)) return a;
      if (operand == BigInt(5)) return b;
      if (operand == BigInt(6)) return c;
      throw new Error(`Invalid combo operand: ${operand}`);
    };

    let pointer = 0;
    // we don't care about the last 2 records, because they will always be 03 and 30
    while (pointer < program.length - 2) {
      const instruction = BigInt(program[pointer]);
      const operand = BigInt(program[pointer + 1]);
      pointer = pointer + 2;

      switch (instruction) {
        case BigInt(0): // adv
          if (adv3Happend) throw new Error('ADV should only have been called once');
          if (operand !== BigInt(3)) throw new Error('weird world! Program has ADV with operand that is not 3');
          adv3Happend = true;
          break;
        case BigInt(1): // bxl
          b = b ^ operand;
          break;
        case BigInt(2): // bst
          b = combo(operand) % BigInt(8);
          break;
        case BigInt(3): // jnz
          throw new Error('We should not have any JNZ in the program since we filtered it out with program.length - 2');
        case BigInt(4): // bxc
          b = b ^ c;
          break;
        case BigInt(5): // out
          if (output !== false) throw new Error('Output multiple times, should happen once');
          output = BigInt(combo(operand)) % BigInt(8);
          break;
        case BigInt(6): // bdv
          b = b >> combo(operand);
          break;
        case BigInt(7): // cdv
          c = a >> combo(operand);
      }

      if (output === BigInt(target.at(-1)!)) {
        const subTarget = target.slice(0, -1);
        const sub = find(subTarget, program, a);

        if (sub === false) continue;
        return sub;
      }
    }
  }

  return false;
};

const arrayEquals = (a: number[], b: number[]) => {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false;
  }

  return true;
};

export const outputSelf = (input: string) => {
  const { program } = parseInput(input);
  // Slice the last 2 instructions from array
  const jnz0 = [program.at(-1)!, program.at(-2)!];
  if (!arrayEquals(jnz0, [0, 3])) throw new Error('We expected the last operand instruction and operand to be jnz0');

  const result = find(program, program, BigInt(0));
  return result;
};
