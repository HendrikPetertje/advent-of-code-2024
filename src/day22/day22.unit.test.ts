import { getDayInput } from '../support/getDayInput';
import { getTradingSecrets, howManyBananasCanweGet } from './day22';

const dummyInput = `
1
10
100
2024
`;

const dummyInput2 = `
1
2
3
2024
`;

describe('Day 22 - Monkey Market', () => {
  describe('Part 1 - Get trading secrets', () => {
    it('should pass a dummy test', () => {
      const input = dummyInput;

      const result = getTradingSecrets(input);
      expect(result).toEqual(BigInt(37327623));
    });

    it('should pass the real test', () => {
      const input = getDayInput('22');

      const result = getTradingSecrets(input);
      expect(result).toEqual(BigInt(19458130434));
    });
  });

  describe('Part 2 - How many bananas can one get', () => {
    it('should pass a dummy test', () => {
      const input = dummyInput2;

      const result = howManyBananasCanweGet(input);
      expect(result).toEqual(23);
    });

    it('should pass the real test', () => {
      const input = getDayInput('22');

      const result = howManyBananasCanweGet(input);
      expect(result).toEqual(2130);
    });
  });
});
