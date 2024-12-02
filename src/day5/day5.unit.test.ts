import fs from 'fs';
import path from 'path';
import { correctAllWrongAndFindMiddlePageSum, findMiddlePageSum } from './day5';

describe('Day 5', () => {
  const getDay5DummyInput = () => {
    return fs.readFileSync(path.resolve(__dirname, './day5TestInput.txt'), 'utf8');
  };

  const getDay5Input = () => {
    return fs.readFileSync(path.resolve(__dirname, '../../input/input.day5.txt'), 'utf8');
  };

  describe('Middle page sum', () => {
    it('should pass a dummy test', () => {
      const input = getDay5DummyInput();

      const result = findMiddlePageSum(input);

      expect(result).toEqual(143);
    });

    it('should pass the real test', () => {
      const input = getDay5Input();

      const result = findMiddlePageSum(input);

      expect(result).toEqual(7198);
    });
  });

  describe('corrected middle page sum', () => {
    it('should pass a dummy test', () => {
      const input = getDay5DummyInput();

      const result = correctAllWrongAndFindMiddlePageSum(input);

      expect(result).toEqual(123);
    });

    it('should pass the real test', () => {
      const input = getDay5Input();

      const result = correctAllWrongAndFindMiddlePageSum(input);

      expect(result).toEqual(4230);
    });
  });
});
