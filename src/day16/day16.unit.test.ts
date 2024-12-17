import { getDayInput } from '../support/getDayInput';
import { findCheapestPathThroughMaze } from './day16';

const dummyInput = `
###############
#.......#....E#
#.#.###.#.###.#
#.....#.#...#.#
#.###.#####.#.#
#.#.#.......#.#
#.#.#####.###.#
#...........#.#
###.#.#####.#.#
#...#.....#.#.#
#.#.#.###.#.#.#
#.....#...#.#.#
#.###.#.#.#.#.#
#S..#.....#...#
###############
`;

describe('Day 16 - Reindeer Maze', () => {
  describe('Part 1 - cheapest path', () => {
    it('should pass a dummy test', () => {
      const input = dummyInput;

      const result = findCheapestPathThroughMaze(input);

      expect(result).toEqual(7036);
    });

    it('should pass the real test', () => {
      const input = getDayInput('16');

      const result = findCheapestPathThroughMaze(input);

      expect(result).toEqual(93436);
    });
  });

  describe('Part 2 - best places to sit', () => {
    it('should pass a dummy test', () => {
      const input = dummyInput;

      const result = findCheapestPathThroughMaze(input, true);

      expect(result).toEqual(45);
    });

    it('should pass the real test', () => {
      const input = getDayInput('16');

      const result = findCheapestPathThroughMaze(input, true);

      expect(result).toEqual(486);
    });
  });
});
