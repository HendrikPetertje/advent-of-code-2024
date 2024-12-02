import { calculateSimilarityScore, getDistanceBetweenLists } from './day1';
import { day1Input } from './day1Input';

describe('Day 1', () => {
  const testInput = `3   4
4   3
2   5
1   3
3   9
3   3`;

  describe('Distance between lists', () => {
    it('should pass a dummy test', () => {
      expect(getDistanceBetweenLists(testInput)).toEqual(11);
    });

    it('should pass the real test', () => {
      expect(getDistanceBetweenLists(day1Input)).toEqual(1938424);
    });
  });

  describe('similairy score', () => {
    it('should pass a dummy test', () => {
      expect(calculateSimilarityScore(testInput)).toEqual(31);
    });

    it('should pass the real test', () => {
      expect(calculateSimilarityScore(day1Input)).toEqual(22014209);
    });
  });
});
