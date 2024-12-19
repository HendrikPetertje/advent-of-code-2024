import { getDayInput } from '../support/getDayInput';
import { getPossibleTowelCombinations, getPossibleTowelDesigns } from './day19';

const dummyInput = `
r, wr, b, g, bwu, rb, gb, br

brwrr
bggr
gbbr
rrbgbr
ubwu
bwurrg
brgr
bbrgwb
`;

describe('Day 19 - Linen Layout', () => {
  describe('Part 1 - How many desired towels can be arranged', () => {
    it('should pass a dummy test', () => {
      const input = dummyInput;

      const result = getPossibleTowelDesigns(input, 'p1-test');

      expect(result).toEqual(6);
    });

    it('should pass the real test', () => {
      const input = getDayInput('19');
      const result = getPossibleTowelDesigns(input, 'p1');

      expect(result).toEqual(236);
    });
  });

  describe('Part 2 - How many possible combinations can be made', () => {
    it('should pass a dummy test', () => {
      const input = dummyInput;

      const result = getPossibleTowelCombinations(input, 'p2-test');

      expect(result).toEqual(16);
    });

    it('should pass the real test', () => {
      const input = getDayInput('19');

      const result = getPossibleTowelCombinations(input, 'p2');

      expect(result).toEqual(643685981770598);
    });
  });
});
