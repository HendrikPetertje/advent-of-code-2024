import { getDayInput } from '../support/getDayInput';
import { getAntinodeCount, getAntinodeSuperCount } from './day8';

const dummyInput = `
............
........0...
.....0......
.......0....
....0.......
......A.....
............
............
........A...
.........A..
............
............
`;

describe('Day 8', () => {
  describe('Part 1 - Resonant Collinearity antinodes', () => {
    it('should pass a dummy test', () => {
      const result = getAntinodeCount(dummyInput);
      expect(result).toEqual(14);
    });

    it('should pass the real test', () => {
      const input = getDayInput('8');

      const result = getAntinodeCount(input);
      expect(result).toEqual(252);
    });
  });

  describe('Part 2 - Resonant Collinearity antinodes with repeaters', () => {
    it('should pass a dummy test', () => {
      const result = getAntinodeSuperCount(dummyInput);
      expect(result).toEqual(34);
    });

    it('should pass the real test', () => {
      const input = getDayInput('8');

      const result = getAntinodeSuperCount(input);
      expect(result).toEqual(839);
    });
  });
});
