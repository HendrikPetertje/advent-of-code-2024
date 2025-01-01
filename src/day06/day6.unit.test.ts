import { getDistinctPaths, getPossibleLoops } from './day6';
import fs from 'fs';
import path from 'path';

const testInput = `
....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...
`;

const getRealInput = () => {
  return fs.readFileSync(path.resolve(__dirname, '../../input/input.day6.txt'), 'utf8');
};

describe('Day 6', () => {
  describe('distinct positions', () => {
    it('should pass a dummy test', () => {
      const result = getDistinctPaths(testInput);

      expect(result).toEqual(41);
    });

    it('should pass the real test', () => {
      const input = getRealInput();

      const result = getDistinctPaths(input);

      expect(result).toEqual(5239);
    });
  });

  describe('Possible guard loops', () => {
    it('should pass a dummy test', () => {
      const result = getPossibleLoops(testInput);

      expect(result).toEqual(6);
    });

    // Skipped because it takes > 2 minutes
    it.skip('should pass the real test', () => {
      const input = getRealInput();

      const result = getPossibleLoops(input);

      expect(result).toEqual(1753);
    });
  });
});
