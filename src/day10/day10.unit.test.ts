import { getDayInput } from '../support/getDayInput';
import { getTrailCount, getTrailRatings } from './day10';

const dummyInput = () => `
89010123
78121874
87430965
96549874
45678903
32019012
01329801
10456732
`;

describe('Day 10', () => {
  describe('Part 1 - counting complete trails', () => {
    it('should pass a dummy test', () => {
      const input = dummyInput();

      const result = getTrailCount(input);
      expect(result).toEqual(36);
    });

    it('should pass the real test', () => {
      const input = getDayInput('10');

      const result = getTrailCount(input);
      expect(result).toEqual(746);
    });
  });

  describe('Part 1 - Getting trail ratings', () => {
    it('should pass a dummy test', () => {
      const input = dummyInput();

      const result = getTrailRatings(input);
      expect(result).toEqual(81);
    });

    it('should pass the real test', () => {
      const input = getDayInput('10');

      const result = getTrailRatings(input);
      expect(result).toEqual(1541);
    });
  });
});
