import { getDayInput } from '../support/getDayInput';
import { getKeyPressComplexityPart1 } from './day21Part1';
import { getKeyPressComplexityPart2 } from './day21Part2';

// const dummyInput = `
// 029A
// 980A
// 179A
// 456A
// 379A
// `;

const dummyInput = `
029A
980A
179A
456A
379A
`;

// const dummyInput = `
// 0A
// 1A
// 2A
// 3A
// 4A
// 5A
// 6A
// 7A
// 8A
// 9A
// `;

describe('Day 21 - Keypad Conundrum', () => {
  // These run in 4 seconds
  describe('Part 1 - press keys', () => {
    it.skip('should pass a dummy test', () => {
      const input = dummyInput;
      const result = getKeyPressComplexityPart1(input);
      expect(result).toEqual(126384);
    });

    it.skip('should pass the real test', () => {
      const input = getDayInput('21');

      const result = getKeyPressComplexityPart1(input);
      expect(result).toEqual(213536);
    });
  });

  describe('Part 2 - press keys on 26 robots', () => {
    it('should pass the real test', () => {
      const input = getDayInput('21');

      const result = getKeyPressComplexityPart2(input);
      expect(result).toEqual(BigInt(258369757013802));
    });
  });
});
