type GateKind = 'XOR' | 'AND' | 'OR';
interface Gate {
  left: string;
  right: string;
  kind: GateKind;
  result: string;
}

const parseInput = (input: string) => {
  const [rawXwires, rawGates] = input.trim().split('\n\n') as [string, string];

  const baseWires: Record<string, number> = {};
  rawXwires.split('\n').forEach((line) => {
    const [key, value] = line.split(': ');
    baseWires[key] = parseInt(value);
  });

  const gates: Gate[] = [];
  rawGates.split('\n').forEach((line) => {
    const result = line.match(/^(\w+) (\w+) (\w+) -> (\w+)$/);
    if (!result) throw new Error('Invalid line');

    gates.push({ left: result[1], kind: result[2] as GateKind, right: result[3], result: result[4] });
  });

  return { baseWires, gates };
};

export const getDecimalOutputFromWires = (input: string) => {
  const { baseWires, gates } = parseInput(input);
  const knownValues = structuredClone(baseWires);

  // Loop over all gates until we solved them all
  while (gates.length > 0) {
    const gate = gates.shift() as Gate;
    const { left, right, kind, result } = gate;

    const leftValue = knownValues[left];
    const rightValue = knownValues[right];
    if (typeof leftValue === 'undefined' || typeof rightValue === 'undefined') {
      gates.push(gate);
      continue;
    }

    let resultValue: number;
    switch (kind) {
      case 'XOR':
        resultValue = leftValue ^ rightValue;
        break;
      case 'AND':
        resultValue = leftValue & rightValue;
        break;
      case 'OR':
        resultValue = leftValue | rightValue;
        break;
    }

    knownValues[result] = resultValue;
  }

  const sortedKeys = Object.keys(knownValues).sort().reverse();
  const stringResult = sortedKeys
    .filter((key) => key.startsWith('z'))
    .reduce((acc, key) => `${acc}${knownValues[key]}`, '');

  const integer = parseInt(stringResult, 2);

  return integer;
};

export const getWrongWires = (input: string) => {
  const { gates } = parseInput(input);

  // console.log(gates);
  // console.log(baseWires);

  // Conclusions from looking at the gates and wires:
  // - The input seems to be a ripple carry adder with mistakes.
  // each wire or bit carries the left-over bit of all previous bits
  // so the value of an output is a XOR b XOR C -> Z.
  // so we can conclude from this that:
  // each output to Z needs to be an XOR gate, unless we are dealing with the last bit
  // - if a gate takes x and y and is an XOR, then the result should be consumed by another XOR gate
  // - If there is an AND gate, then there must be an OR gate following that gate unless the input is x00 or y00

  const wrongGates: string[] = [];

  const highestZgate = gates.reduce((acc, { result }) => {
    if (!result.startsWith('z')) return acc;
    const number = parseInt(result.slice(1));
    if (number > acc) return number;
    return acc;
  }, 0);

  gates.forEach(({ left, right, result, kind }) => {
    // Check 1: Get all misconfigured XOR b XOR c -> Z gates
    if (result.startsWith('z') && result !== `z${highestZgate}` && kind !== 'XOR') {
      wrongGates.push(result);
      return;
    }

    // Check 1 part 2: if the gate is not Z and the inputs are not X or Y then it has to be AND OR, not XOR
    if (!result.startsWith('z') && !/^(x|y)/.test(left) && !/^(x|y)/.test(right) && kind === 'XOR') {
      wrongGates.push(result);
      return;
    }

    // Check 2: check if at least one gate using the result from ana "x XOR y" gate is also XOR
    if (left.startsWith('x') && right.startsWith('y') && kind === 'XOR') {
      const matchingGates = gates.filter(
        (gate) => (gate.left === result || gate.right === result) && gate.kind === 'XOR',
      ).length;
      if (matchingGates !== 1) {
        wrongGates.push(result);
        return;
      }
    }

    // Check 3: Check if all AND gates are followed by at least one OR gate (except for x00 or y00)
    const input0s = ['x00', 'y00'];
    if (kind === 'AND' && !input0s.includes(left) && !input0s.includes(right)) {
      const matchingGates = gates.filter(
        (gate) => (gate.left === result || gate.right === result) && gate.kind === 'OR',
      ).length;
      if (matchingGates === 0) {
        wrongGates.push(result);
        return;
      }
    }
  });

  const result = wrongGates.sort().join(',');
  return result;
};
