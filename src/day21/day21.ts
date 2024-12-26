type NumericAction = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | 'A';

const parseInput = (input: string) => {
  const lines = input.trim().split('\n');
  const numericActions = lines.map((line) => line.split('') as NumericAction[]);
  return numericActions;
};

type Action = '<' | '>' | '^' | 'v' | 'A';

const numericToActions = (actions: NumericAction[], locationAtStart: NumericAction) => {
  // +---+---+---+
  // | 7 | 8 | 9 |
  // +---+---+---+
  // | 4 | 5 | 6 |
  // +---+---+---+
  // | 1 | 2 | 3 |
  // +---+---+---+
  //     | 0 | A |
  //     +---+---+
  const map = {
    '7': { x: 0, y: 0 },
    '8': { x: 1, y: 0 },
    '9': { x: 2, y: 0 },
    '4': { x: 0, y: 1 },
    '5': { x: 1, y: 1 },
    '6': { x: 2, y: 1 },
    '1': { x: 0, y: 2 },
    '2': { x: 1, y: 2 },
    '3': { x: 2, y: 2 },
    noGo: { x: 0, y: 3 },
    '0': { x: 1, y: 3 },
    A: { x: 2, y: 3 },
  };

  let location = locationAtStart;

  const instructs = actions.flatMap((action) => {
    const instructions: Action[] = [];
    // Find x and y difference between location and action
    const { x, y } = map[location];
    const { x: xAction, y: yAction } = map[action];
    const xDiff = x - xAction;
    const yDiff = y - yAction;

    const yActions = () => {
      for (let i = 0; i < Math.abs(yDiff); i++) {
        if (yDiff > 0) {
          instructions.push('^');
        } else if (yDiff < 0) {
          instructions.push('v');
        }
      }
    };

    const xActions = () => {
      for (let i = 0; i < Math.abs(xDiff); i++) {
        if (xDiff > 0) {
          instructions.push('<');
        } else if (xDiff < 0) {
          instructions.push('>');
        }
      }
    };

    // if start or end Y is '0' or A, then do y actions first
    if (location === '0' || location === 'A') {
      yActions();
      xActions();
    } else {
      xActions();
      yActions();
    }

    instructions.push('A');
    location = action;
    return instructions;
  });

  return instructs;
};

type ArrowicLocation = '^' | 'A' | '<' | 'v' | '>';
const arowicToActions = (action: Action[], locationAtStart: ArrowicLocation) => {
  //     +---+---+
  //     | ^ | A |
  // +---+---+---+
  // | < | v | > |
  // +---+---+---+
  const map = {
    '^': { x: 1, y: 0 },
    A: { x: 2, y: 0 },
    '<': { x: 0, y: 1 },
    v: { x: 1, y: 1 },
    '>': { x: 2, y: 1 },
  };

  let location = locationAtStart;

  const instructs = action.flatMap((act) => {
    const instructions: Action[] = [];

    // Find x and y difference between location and action
    const { x, y } = map[location];
    const { x: xAction, y: yAction } = map[act];

    const xDiff = x - xAction;
    const yDiff = y - yAction;

    const yActions = () => {
      for (let i = 0; i < Math.abs(yDiff); i++) {
        if (yDiff > 0) {
          instructions.push('^');
        } else if (yDiff < 0) {
          instructions.push('v');
        }
      }
    };
    const xActions = () => {
      for (let i = 0; i < Math.abs(xDiff); i++) {
        if (xDiff > 0) {
          instructions.push('<');
        } else if (xDiff < 0) {
          instructions.push('>');
        }
      }
    };

    // if start Y is '^' or A, then do y actions first
    if (act === '^' || act === 'A') {
      xActions();
      yActions();
    } else {
      yActions();
      xActions();
    }

    instructions.push('A');
    location = act;
    return instructions;
  });

  return instructs;
};

export const getKeyPressComplexity = (input: string) => {
  const lines = parseInput(input);
  const solutions = lines.map((line) => {
    const numeric = numericToActions(line, 'A');
    const arrowic = arowicToActions(numeric, 'A');
    const arrowic2 = arowicToActions(arrowic, 'A');
    console.log(line, arrowic2.length, numeric.join());

    // filter any action that is not a number
    const filtered = line.filter((action) => action !== 'A');
    const number = parseInt(filtered.join(''));

    return BigInt(number) * BigInt(arrowic2.length);
  });

  return solutions.reduce((acc, val) => BigInt(acc) + BigInt(val), BigInt(0));
};
