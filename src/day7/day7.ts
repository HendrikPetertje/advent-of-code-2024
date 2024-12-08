const parseInput = (input: string) => {
  const rawLines = input.split('\n').filter((line) => line.length > 0);
  return rawLines.map((line) => {
    const [answer, rest] = line.split(': ').map((l) => l.trim());
    const params = rest.split(' ').map((ep) => parseInt(ep));
    return { answer: parseInt(answer), params };
  });
};

const findCorrectEquation = (answer: number, params: number[], withCombine?: boolean) => {
  // take an equation like { answer: 2000, params: [10, 20, 100]}
  // and try to insert either + or x to craete the correct answer
  // if we can create the correct answer return true otherwise return false
  // In this case there are 9 different options

  const [current, next, ...rest] = params;

  if (typeof next === 'undefined') {
    return current === answer;
  }

  if (current > answer) {
    return false;
  }

  const theAddWay = current + next;
  const theMultiplyWay = current * next;
  const theCombineWay = parseInt(`${current}${next}`);

  const nextAddwayAnswer = findCorrectEquation(answer, [theAddWay, ...rest], withCombine);
  const nextMultiplyWayAnswer = findCorrectEquation(answer, [theMultiplyWay, ...rest], withCombine);
  const nextCombinedwayAnswer = withCombine
    ? findCorrectEquation(answer, [theCombineWay, ...rest], withCombine)
    : false;

  if (nextAddwayAnswer || nextMultiplyWayAnswer || nextCombinedwayAnswer) {
    return true;
  }
};

export const addAndFindCorrectEquations = (input: string) => {
  const equations = parseInput(input);

  const correctEquations = equations.filter((equation) => findCorrectEquation(equation.answer, equation.params));

  return correctEquations.map((ce) => ce.answer).reduce((acc, val) => acc + val, 0);
};

export const addAndFindCorrectEquationsWithCombine = (input: string) => {
  const equations = parseInput(input);

  const correctEquations = equations.filter((equation) => findCorrectEquation(equation.answer, equation.params, true));

  return correctEquations.map((ce) => ce.answer).reduce((acc, val) => acc + val, 0);
};
