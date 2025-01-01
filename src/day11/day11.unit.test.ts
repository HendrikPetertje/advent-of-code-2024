import { getDayInput } from '../support/getDayInput';
import { countNumberOfStonesAfterBlinking } from './day11';

const dummyInput = '125 17';

describe('Day 11 - Plutonian Pebbles', () => {
  describe('Part 1 - blinking stones 25 times', () => {
    it('should  pass a dummy test', () => {
      const result = countNumberOfStonesAfterBlinking(dummyInput, 25);
      expect(result).toEqual(55312);
    });

    it('shoud pass the real test', () => {
      const input = getDayInput('11');
      const result = countNumberOfStonesAfterBlinking(input, 25);

      expect(result).toEqual(187738);
    });
  });

  // Part 2 is too slow, execute npx tsx src/day11/runPart2.ts instead
  describe('Part 2 - blinking stones 75 times', () => {
    it('should pass the real test', () => {
      const input = getDayInput('11');
      const result = countNumberOfStonesAfterBlinking(input, 75);

      expect(result).toEqual(223767210249237);
    });
  });
});
