import { countDampenedSafeReports, countSafeReports } from './day2';
import { day2Input } from './day2Input';

describe('Day 2', () => {
  const testInput = `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`;

  describe('safe reports count check', () => {
    it('should pass a dummy test', () => {
      expect(countSafeReports(testInput)).toEqual(2);
    });

    it('should pass the real test', () => {
      expect(countSafeReports(day2Input)).toEqual(257);
    });
  });

  describe('With one level ignored safe reports count check', () => {
    it('should pass a dummy test', () => {
      expect(countDampenedSafeReports(testInput)).toEqual(4);
    });

    it('should pass the real test', () => {
      expect(countDampenedSafeReports(day2Input)).toEqual(328);
    });
  });
});
