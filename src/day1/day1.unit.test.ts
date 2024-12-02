import { getDistanceBetweenLists } from './day1';
import { day1Input } from './day1Input';

describe('Day 1', () => {
  it('should pass a dummy test', () => {
    const testInput = `3   4
4   3
2   5
1   3
3   9
3   3`;

    expect(getDistanceBetweenLists(testInput)).toEqual(11);
  });

  it('should pass the real test', () => {
    expect(getDistanceBetweenLists(day1Input)).toEqual(1938424);
  });
});
