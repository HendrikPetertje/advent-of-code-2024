import { getDayInput } from '../support/getDayInput';
import { getDebugOutput, outputSelf } from './day17';

const dummyInput = `
Register A: 729
Register B: 0
Register C: 0

Program: 0,1,5,4,3,0
`;

describe('Day 17 - Chronospatial computer', () => {
  describe('Part 1 - get program debug output', () => {
    it('should pass a dummy test', () => {
      const input = dummyInput;

      const result = getDebugOutput(input);

      expect(result).toEqual('4,6,3,5,6,3,5,2,1,0');
    });

    it('should pass the real test', () => {
      const input = getDayInput('17');

      const result = getDebugOutput(input);

      expect(result).toEqual('3,7,1,7,2,1,0,6,3');
    });
  });

  describe('Part 2 - output its own program', () => {
    it('should pass the real test', () => {
      const input = getDayInput('17');

      const result = outputSelf(input);

      const debug = getDebugOutput(input);

      expect(result.toString()).toEqual('37221334433268');
      expect(debug).toEqual('3,7,1,7,2,1,0,6,3');
    });
  });
});
