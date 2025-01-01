import { getDayInput } from '../support/getDayInput';
import { getKeyPressComplexityPart2 } from './day21Part2';

const dummyInput = `
029A
980A
179A
456A
379A
`;

const input = getDayInput('21');

const result = getKeyPressComplexityPart2(input);
console.log(result);
