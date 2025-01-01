const parseInput = (input: string) => {
  const [rawTowels, rawDesigns] = input.trim().split('\n\n');
  if (!rawTowels || !rawDesigns) throw new Error('Invalid input');

  const towels = rawTowels.split(', ');
  const designs = rawDesigns.split('\n');

  return { towels, designs };
};

const CACHE = new Map<string, number>();

const tryDesign = (fullDesign: string, towels: string[], caseKey: string, rest: string): false | number => {
  // The option we just came from was possible and creates one possible combination
  if (rest.length === 0) return 1;

  if (CACHE.has(`${rest}-${caseKey}`)) return CACHE.get(`${rest}-${caseKey}`)!;

  const results = towels.map((towel) => {
    if (rest.startsWith(towel)) {
      return tryDesign(fullDesign, towels, caseKey, rest.slice(towel.length));
    }
    return false;
  });

  // get result with lowest number
  const filteredResults = results.filter((r) => r !== false) as number[];
  if (filteredResults.length === 0) return false;

  const combinationsSum = filteredResults.reduce((acc, result) => acc + result, 0);

  CACHE.set(`${rest}-${caseKey}`, combinationsSum);

  return combinationsSum;
};

export const getPossibleTowelDesigns = (input: string, caseKey: string) => {
  const { towels, designs } = parseInput(input);

  const results = designs.map((design) => tryDesign(design, towels, caseKey, design));
  return results.filter((r) => r !== false).length;
};

export const getPossibleTowelCombinations = (input: string, caseKey: string) => {
  const { towels, designs } = parseInput(input);

  const results = designs.map((design) => tryDesign(design, towels, caseKey, design));
  const filteredResults = results.filter((r) => r !== false) as number[];
  const sum = filteredResults.reduce((acc, result) => acc + result, 0);
  return sum;
};
