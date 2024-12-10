import { countDampenedSafeReports, countSafeReports } from './day2';
import fs from 'fs';
import path from 'path';

describe('Day 2', () => {
  const testInput = `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`;

  const getRealInput = () => {
    const input = fs.readFileSync(path.resolve(__dirname, '../../input/input.day2.txt'), 'utf8');
    return input.slice(0, input.length - 1);
  };

  describe('safe reports count check', () => {
    it('should pass a dummy test', () => {
      expect(countSafeReports(testInput)).toEqual(2);
    });

    it('should pass the real test', () => {
      const input = getRealInput();
      expect(countSafeReports(input)).toEqual(257);
    });
  });

  describe('With one level ignored safe reports count check', () => {
    it('should pass a dummy test', () => {
      expect(countDampenedSafeReports(testInput)).toEqual(4);
    });

    it('should pass the real test', () => {
      const input = getRealInput();
      expect(countDampenedSafeReports(input)).toEqual(328);
    });
  });
});
