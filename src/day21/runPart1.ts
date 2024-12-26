import { getDayInput } from '../support/getDayInput';
import { getKeyPressComplexityPart1 } from './day21Part1';

const dummyInput = `
029A
980A
179A
456A
379A
`;

const input = getDayInput('21');

const result = getKeyPressComplexityPart1(input);
console.log(result);
