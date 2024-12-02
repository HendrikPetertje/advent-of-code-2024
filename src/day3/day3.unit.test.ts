import { doesAndDontsUncorrupt, simpleUncorrupt } from './day3';
import fs from 'fs';
import path from 'path';

describe('Day 3', () => {
  const getDay3Input = () => {
    return fs.readFileSync(path.resolve(__dirname, '../../input/input.day3.txt'), 'utf8');
  };

  describe('Corrupted Calculator', () => {
    it('should pass a dummy test', () => {
      const testInput = 'xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))';

      const result = simpleUncorrupt(testInput);

      expect(result).toEqual(161);
    });

    it('should pass the real test', () => {
      const input = getDay3Input();

      const result = simpleUncorrupt(input);

      expect(result).toEqual(174336360);
    });
  });

  describe('Corrupted does and donts Calculator', () => {
    it('should pass a dummy test', () => {
      const testInput = "xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))";

      const result = doesAndDontsUncorrupt(testInput);

      expect(result).toEqual(48);
    });

    it('should pass the real test', () => {
      const input = getDay3Input();

      const result = doesAndDontsUncorrupt(input);

      expect(result).toEqual(88802350);
    });
  });
});
