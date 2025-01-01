import { getDayInput } from '../support/getDayInput';
import { bisectWhenTooLate, getDistanceInMemory } from './day18';

const dummyInput = `
5,4
4,2
4,5
3,0
2,1
6,3
2,4
1,5
0,6
3,3
2,6
5,1
1,2
5,5
2,5
6,5
1,4
0,4
6,4
1,1
6,1
1,0
0,5
1,6
2,0
`;

describe('Day 18 - RAM Run', () => {
  describe('Part 1 - Get distance after 1024 bytes', () => {
    it('should pass a dummy test', () => {
      const input = dummyInput;

      const result = getDistanceInMemory(input, 12, 6);

      expect(result).toEqual(22);
    });

    it('should pass the real test', () => {
      const input = getDayInput('18');

      const result = getDistanceInMemory(input, 1024, 70);

      expect(result).toEqual(306);
    });
  });

  describe('Part 2 - get nanoseconds after which escape is not possible', () => {
    it('should pass a dummy test', () => {
      const input = dummyInput;

      const result = bisectWhenTooLate(input, 6);

      expect(result).toEqual('6,1');
    });

    it('should pass the real test', () => {
      const input = getDayInput('18');

      const result = bisectWhenTooLate(input, 70);

      expect(result).toEqual('38,63');
    });
  });
});
