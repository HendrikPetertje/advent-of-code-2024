const parseInput = (input: string) => {
  const lines = input.trim().split('\n');
  return lines.map((line) => BigInt(parseInt(line, 10)));
};

const execute = (startNum: bigint): bigint => {
  const doStep1 = (input: bigint) => {
    const to64 = input * BigInt(64);
    const toXor = input ^ to64;
    const toModulo = toXor % BigInt(16777216);
    return toModulo;
  };

  const doStep2 = (input: bigint) => {
    const divided = input / BigInt(32);
    const toXor = input ^ divided;
    const toModulo = toXor % BigInt(16777216);
    return toModulo;
  };

  const doStep3 = (input: bigint) => {
    const multiplied = input * BigInt(2048);
    const toXor = input ^ multiplied;
    const toModulo = toXor % BigInt(16777216);
    return toModulo;
  };

  const step1 = doStep1(startNum);
  const step2 = doStep2(step1);
  const step3 = doStep3(step2);
  return step3;
};

export const getTradingSecrets = (input: string) => {
  const numbers = parseInput(input);
  const result = numbers.map((num) => {
    let current = num;
    // 2000 times do
    for (let i = 0; i < 2000; i++) {
      current = execute(current);
    }

    return current;
  });

  return result.reduce((acc, curr) => acc + curr, BigInt(0));
};

export const howManyBananasCanweGet = (input: string) => {
  const numbers = parseInput(input);

  const sequenceOfTotal: Record<string, bigint> = {};

  numbers.forEach((num) => {
    let current = num;
    const onesDigits = [num % BigInt(10)];

    // 2000 times do
    for (let i = 0; i < 2000; i++) {
      current = execute(current);
      onesDigits.push(current % BigInt(10));
    }

    // keep track of what sequences we have seen already
    const memory = new Set<string>();
    // we can't trade with the last 4 digits or first, depending on how you look
    for (let i = 0; i < onesDigits.length - 4; i++) {
      // get all positions between i and i + 5 from list
      const [a, b, c, d, e] = onesDigits.slice(i, i + 5);
      const seq = [b - a, c - b, d - c, e - d] as const;

      const seqKey = seq.join(',');
      if (memory.has(seqKey)) {
        continue;
      }
      memory.add(seqKey);

      // add to our total list
      sequenceOfTotal[seqKey] = (sequenceOfTotal[seqKey] || BigInt(0)) + e;
    }

    return onesDigits;
  });

  // find the highest value in the list
  const asNumbers = Object.values(sequenceOfTotal).map((num) => parseInt(num.toString(), 10));
  const result = Math.max(...asNumbers);

  return result;
};
