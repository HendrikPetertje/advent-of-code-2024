import { xmasSearch } from './day4Xmas';
import fs from 'fs';
import path from 'path';
import { masXsearch } from './day4masX';

describe('Day 4', () => {
  const getDay4Input = () => {
    return fs.readFileSync(path.resolve(__dirname, '../../input/input.day4.txt'), 'utf8');
  };

  describe('Xmas search', () => {
    const testInput = `
MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`;

    it('should pass a dummy test', () => {
      expect(xmasSearch(testInput)).toBe(18);
    });

    it('should pass the real test', () => {
      const input = getDay4Input();
      expect(xmasSearch(input)).toBe(2562);
    });
  });

  describe('masX search', () => {
    const testInput = `
.M.S......
..A..MSMS.
.M.S.MAA..
..A.ASMSM.
.M.S.M....
..........
S.S.S.S.S.
.A.A.A.A..
M.M.M.M.M.
..........
`;

    it('should pass a dummy test', () => {
      expect(masXsearch(testInput)).toEqual(9);
    });

    it('should pass the real test', () => {
      const input = getDay4Input();
      expect(masXsearch(input)).toEqual(1902);
    });
  });
});
