import { getDayInput } from '../support/getDayInput';
import { spendLittleTokensToWinPrices } from './day13';

const dummyInput = `
Button A: X+94, Y+34
Button B: X+22, Y+67
Prize: X=8400, Y=5400

Button A: X+26, Y+66
Button B: X+67, Y+21
Prize: X=12748, Y=12176

Button A: X+17, Y+86
Button B: X+84, Y+37
Prize: X=7870, Y=6450

Button A: X+69, Y+23
Button B: X+27, Y+71
Prize: X=18641, Y=10279
`;

describe('Day 13 - Claw contraption', () => {
  describe('Part 1 - on a small machine', () => {
    it('should pass a dummy test', () => {
      const input = dummyInput;
      const result = spendLittleTokensToWinPrices(input);

      expect(result).toEqual(480);
    });

    it('should pass the real test', () => {
      const input = getDayInput('13');
      const result = spendLittleTokensToWinPrices(input);
      expect(result).toEqual(31897);
    });
  });

  describe('Part 2 - On a big machine', () => {
    it('should pass a dummy test', () => {
      const input = dummyInput;
      const result = spendLittleTokensToWinPrices(input, 10000000000000);

      expect(result).toEqual(875318608908);
    });

    it('should pass the real test', () => {
      const input = getDayInput('13');
      const result = spendLittleTokensToWinPrices(input, 10000000000000);
      expect(result).toEqual(87596249540359);
    });
  });
});
