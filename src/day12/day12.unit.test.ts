import { getDayInput } from '../support/getDayInput';
import { getFencePrices, getFencePricesOnDiscount } from './day12';

const dummyInput = `
RRRRIICCFF
RRRRIICCCF
VVRRRCCFFF
VVRCCCJFFF
VVVVCJJCFE
VVIVCCJJEE
VVIIICJJEE
MIIIIIJJEE
MIIISIJEEE
MMMISSJEEE
`;

const dummyInput2 = `
..O.O..
.OOOOO.
OO.O.OO
.OO.OO.
OO.O.OO
.OOOOO.
..O.O..
`;

describe('Day 12 - Garden groups', () => {
  describe('Part 1 - fence prices', () => {
    it('should pass a dummy test', () => {
      const result = getFencePrices(dummyInput);

      expect(result).toEqual(1930);
    });

    it('should pass the real test', () => {
      const input = getDayInput('12');

      const result = getFencePrices(input);

      expect(result).toEqual(1402544);
    });
  });

  describe('Part 1 - fence prices discount', () => {
    it('should pass a dummy test', () => {
      const result = getFencePricesOnDiscount(dummyInput);

      expect(result).toEqual(1206);
    });

    it('should pass a wild dummy test', () => {
      const result = getFencePricesOnDiscount(dummyInput2);

      expect(result).toEqual(1568);
    });

    it('should pass the real test', () => {
      const input = getDayInput('12');

      const result = getFencePricesOnDiscount(input);

      expect(result).toEqual(862486);
    });
  });
});
