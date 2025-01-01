import { getDayInput } from '../support/getDayInput';
import { compressDisk, compressUnfragmented } from './day9';

const dummyInput = '2333133121414131402';
describe('Day 9', () => {
  describe('Part 1 - File system checksum', () => {
    it('should pass a dummy test', () => {
      const result = compressDisk(dummyInput);

      expect(result).toEqual(1928);
    });

    // Slow running test (~2.6 seconds)
    it.skip('should pass the real test', () => {
      const input = getDayInput('9');

      const result = compressDisk(input);

      expect(result).toEqual(6399153661894);
    });
  });

  describe('Part 2 - Compress unfragmented disk', () => {
    it('should pass a dummy test', () => {
      const result = compressUnfragmented(dummyInput);

      expect(result).toEqual(2858);
    });

    // Slow running test (~5.8 seconds)
    it.skip('should pass the real test', () => {
      const input = getDayInput('9');

      const result = compressUnfragmented(input);

      expect(result).toEqual(6421724645083);
    });
  });
});
