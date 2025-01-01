import { getDayInput } from '../support/getDayInput';
import { finishTheStory, getFittingLocks } from './day25';

const dummyInput = `
#####
.####
.####
.####
.#.#.
.#...
.....

#####
##.##
.#.##
...##
...#.
...#.
.....

.....
#....
#....
#...#
#.#.#
#.###
#####

.....
.....
#.#..
###..
###.#
###.#
#####

.....
.....
.....
#....
#.#..
#.#.#
#####
`;

describe('Day 25 - Code Chronicle', () => {
  describe('Part 1 - part1Theme', () => {
    it('should pass a dummy test', () => {
      const input = dummyInput;
      const result = getFittingLocks(input);
      expect(result).toEqual(3);
    });

    it('should pass the real test', () => {
      const input = getDayInput('25');

      const result = getFittingLocks(input);
      expect(result).toEqual(3269);
    });
  });

  describe('Part 2 - part2Theme', () => {
    it('should pass the real test', () => {
      const result = finishTheStory();
      expect(result).toEqual(50);
    });
  });
});
