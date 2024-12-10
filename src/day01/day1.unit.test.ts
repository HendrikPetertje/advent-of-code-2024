import { calculateSimilarityScore, getDistanceBetweenLists } from './day1';
import fs from 'fs';
import path from 'path';

describe('Day 1', () => {
  const testInput = `3   4
4   3
2   5
1   3
3   9
3   3`;

  const getRealInput = () => {
    const input = fs.readFileSync(path.resolve(__dirname, '../../input/input.day1.txt'), 'utf8');
    return input.slice(0, input.length - 1);
  };

  describe('Distance between lists', () => {
    it('should pass a dummy test', () => {
      expect(getDistanceBetweenLists(testInput)).toEqual(11);
    });

    it('should pass the real test', () => {
      const input = getRealInput();
      expect(getDistanceBetweenLists(input)).toEqual(1938424);
    });
  });

  describe('similairy score', () => {
    it('should pass a dummy test', () => {
      expect(calculateSimilarityScore(testInput)).toEqual(31);
    });

    it('should pass the real test', () => {
      const input = getRealInput();
      expect(calculateSimilarityScore(input)).toEqual(22014209);
    });
  });
});
