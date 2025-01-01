import { getDayInput } from '../support/getDayInput';
import fs from 'fs';
import path from 'path';
import { runRobotAmock } from './day15';
import { runRobotAmockUpscaled } from './day15Part2';

const dummyInput = () => fs.readFileSync(path.resolve(__dirname, 'dummyInput.txt')).toString();

describe('Day 15 - Warehouse Woes', () => {
  describe('Part 1 - predict GPS', () => {
    it('should pass a dummy test', () => {
      const input = dummyInput();
      const result = runRobotAmock(input);

      expect(result).toEqual(10092);
    });

    it('should pass the real test', () => {
      const input = getDayInput('15');
      const result = runRobotAmock(input);

      expect(result).toEqual(1527563);
    });
  });

  describe('Part 2 - predict GPS upscaled', () => {
    it('should pass a dummy test', () => {
      const input = dummyInput();
      const result = runRobotAmockUpscaled(input);

      expect(result).toEqual(9021);
    });

    // Relatively slow
    it('should pass the real test', () => {
      const input = getDayInput('15');
      const result = runRobotAmockUpscaled(input);

      expect(result).toEqual(1521635);
    });
  });
});
