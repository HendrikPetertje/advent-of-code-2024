type NumericAction = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | 'A';
type Position = { x: number; y: number };

const parseInput = (input: string) => {
  const lines = input.trim().split('\n');
  const numericActions = lines.map((line) => line.split('') as NumericAction[]);
  return numericActions;
};

type Action = '<' | '>' | '^' | 'v' | 'A';

// +---+---+---+
// | 7 | 8 | 9 |
// +---+---+---+
// | 4 | 5 | 6 |
// +---+---+---+
// | 1 | 2 | 3 |
// +---+---+---+
//     | 0 | A |
//     +---+---+
const numericMap = [
  ['7', '8', '9'],
  ['4', '5', '6'],
  ['1', '2', '3'],
  [null, '0', 'A'],
];

//     +---+---+
//     | ^ | A |
// +---+---+---+
// | < | v | > |
// +---+---+---+
const arrowicMap = [
  [null, '^', 'A'],
  ['<', 'v', '>'],
];

const searchDirectionNumeric = (startPos: Position, finish: string, map: Array<string | null>[]) => {
  const possibleSeqs: string[] = [];
  let pq = [{ pos: startPos, actions: '', visited: [] as string[] }];
  let optimal = 1000;

  while (pq.length > 0) {
    // sort the queue by distance
    pq = pq.sort((a, b) => a.actions.length - b.actions.length);

    const {
      pos: { x, y },
      actions,
      visited,
    } = pq.pop()!;

    if (visited.includes(`${x}-${y}`)) continue;

    const positions = [
      { x: x + 1, y, dir: '>' }, // right
      { x: x - 1, y, dir: '<' }, // left
      { x, y: y + 1, dir: 'v' }, // down
      { x, y: y - 1, dir: '^' }, // up
    ];

    let posFound = false;
    positions.forEach((pos) => {
      if (posFound) return;

      const { x: nx, y: ny, dir } = pos;
      // if we are out of bounds, return
      if (nx < 0 || nx >= map[0].length || ny < 0 || ny >= map.length) return;

      const newActions = `${actions}${dir}`;
      if (newActions.length > optimal) return;

      if (map[ny][nx] === null) return;

      if (map[ny][nx] === finish) {
        posFound = true;
        if (newActions.length <= optimal) {
          possibleSeqs.push(`${newActions}A`);
          optimal = newActions.length;
        }
        return;
      }

      pq.push({ pos: { x: nx, y: ny }, actions: newActions, visited: [...visited, `${x}-${y}`] });
    });
  }

  return possibleSeqs;
};

const memoizedSequences: Record<string, Record<string, string[]>> = {};

const solve = (input: string[], map: Array<string | null>[], sequenceKey: string) => {
  let sequences: Record<string, string[]> = {};

  if (memoizedSequences[sequenceKey]) {
    sequences = memoizedSequences[sequenceKey];
  } else {
    map.forEach((row, y) => {
      row.forEach((cell, x) => {
        const position = { x, y };
        if (cell === null) return;

        map.forEach((nRow, nY) => {
          nRow.forEach((nCell, nX) => {
            if (nCell === null) return;

            const nPosition = { x: nX, y: nY };
            const comboKey = `${cell}-${nCell}`;

            if (nPosition.x === position.x && nPosition.y === position.y) {
              sequences[comboKey] = ['A'];
              return;
            }

            const newSeqs = searchDirectionNumeric(position, nCell, map);
            sequences[comboKey] = newSeqs;
          });
        });
      });
    });

    memoizedSequences[sequenceKey] = sequences;
  }

  // creating actions
  let current = 'A';
  const allActions = input.map((act) => {
    const comboKey = `${current}-${act}`;
    current = act;
    const actions = sequences[comboKey];
    if (!actions) throw new Error('No actions found');

    // get length of shortest action
    const length = actions.reduce((acc, action) => (action.length < acc ? action.length : acc), 1000);
    // filter all actions that are longer than the shortest
    const filtered = actions.filter((action) => action.length === length);

    return filtered;
  });

  // create a product of all actions
  // say that action 1 is ['^>A', '>^A'] and action two is ['<vA', 'v<A']
  // then we want to create a combination of each with each option to a total of 4 different options
  // ['^>A<vA', '^>A<v<A', '>^A<vA', '>^A<v<A']
  const product = allActions.reduce(
    (acc, actions) => {
      const newAcc: string[] = [];
      acc.forEach((accAction) => {
        actions.forEach((action) => {
          newAcc.push(`${accAction}${action}`);
        });
      });
      return newAcc;
    },
    [''],
  );

  return product;
};

export const getKeyPressComplexityPart1 = (input: string) => {
  const numericActions = parseInput(input);
  const result = numericActions.map((action) => {
    const numericProducts = solve(action, numericMap, 'numpad');
    const arrowicProducts = numericProducts.flatMap((nProduct) => {
      const arrowic1products = solve(nProduct.split(''), arrowicMap, 'dirpad');
      const arrowic2Products = arrowic1products.flatMap((aproduct) => solve(aproduct.split(''), arrowicMap, 'dirpad'));
      return arrowic2Products;
    });

    // get action with the lowest length
    const length = arrowicProducts.reduce((acc, val) => (val.length < acc ? val.length : acc), 1000);

    const filtered = action.filter((act) => act !== 'A');
    const number = parseInt(filtered.join(''));

    console.log(action, length, number);
    return length * number;
  });

  // add all the results together
  return result.reduce((acc, val) => acc + val, 0);
};

export const getKeyPressComplexityPart2 = (input: string) => {
  const numericActions = parseInput(input);
  const result = numericActions.map((action) => {
    const numericProducts = solve(action, numericMap, 'numpad');
    const arrowicProducts = numericProducts.flatMap((nProduct) => {
      // create a list from 1 - 25
      const list = Array.from({ length: 25 }, (_, i) => i + 1);

      let products = [nProduct];
      list.forEach(() => {
        const newProducts = products.flatMap((prod) => solve(prod.split(''), arrowicMap, 'dirpad'));
        products = newProducts;
      });

      return products;
    });

    // get action with the lowest length
    const length = arrowicProducts.reduce((acc, val) => (val.length < acc ? val.length : acc), 1000);

    const filtered = action.filter((act) => act !== 'A');
    const number = parseInt(filtered.join(''));

    console.log(action, length, number);
    return length * number;
  });

  // add all the results together
  return result.reduce((acc, val) => acc + val, 0);
};
