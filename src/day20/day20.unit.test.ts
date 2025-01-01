import { getDayInput } from '../support/getDayInput';
import { getCheatPathOptions } from './day20';
import { getSuperCheatpathOptions } from './day20Part2';

const dummyInput = `
###############
#...#...#.....#
#.#.#.#.#.###.#
#S#...#.#.#...#
#######.#.#.###
#######.#.#...#
#######.#.###.#
###..E#...#...#
###.#######.###
#...###...#...#
#.#####.#.###.#
#.#...#.#.#...#
#.#.#.#.#.#.###
#...#...#...###
###############
`;

describe('Day 20 - Race Condition', () => {
  describe('Part 1 - find cheat paths', () => {
    it('should pass a dummy test', () => {
      const input = dummyInput;

      const result = getCheatPathOptions(input, 20);

      expect(result).toEqual(5);
    });

    it('should pass the real test', () => {
      const input = getDayInput('20');

      const result = getCheatPathOptions(input, 100);

      expect(result).toEqual(1426);
    });
  });

  describe('Part 2 - find more cheat paths', () => {
    it('should pass the real test', () => {
      const input = getDayInput('20');

      const result = getSuperCheatpathOptions(input);

      expect(result).toEqual(1000697);
    });
  });
});
