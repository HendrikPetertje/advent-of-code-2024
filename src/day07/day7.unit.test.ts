import { getDayInput } from '../support/getDayInput';
import { addAndFindCorrectEquations, addAndFindCorrectEquationsWithCombine } from './day7';

const dummyInput = `
190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20
`;

describe('Day 7', () => {
  describe('Part 1 - Jungle Operators', () => {
    it('should pass a dummy test', () => {
      const result = addAndFindCorrectEquations(dummyInput);

      expect(result).toEqual(3749);
    });

    it('should pass the real test', () => {
      const realInput = getDayInput('7');

      const result = addAndFindCorrectEquations(realInput);

      expect(result).toEqual(14711933466277);
    });
  });

  describe('Part 2 - Jungle Operators with Combine', () => {
    it('should pass a dummy test', () => {
      const result = addAndFindCorrectEquationsWithCombine(dummyInput);

      expect(result).toEqual(11387);
    });

    it('should pass the real test', () => {
      const realInput = getDayInput('7');

      const result = addAndFindCorrectEquationsWithCombine(realInput);

      expect(result).toEqual(286580387663654);
    });
  });
});
