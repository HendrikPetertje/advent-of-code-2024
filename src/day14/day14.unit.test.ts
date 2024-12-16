import { getDayInput } from '../support/getDayInput';
import { getSafetyFactor } from './day14';

const dummyInput = `
p=0,4 v=3,-3
p=6,3 v=-1,-3
p=10,3 v=-1,2
p=2,0 v=2,-1
p=0,0 v=1,3
p=3,0 v=-2,-2
p=7,6 v=-1,-3
p=3,0 v=-1,-2
p=9,3 v=2,3
p=7,3 v=-1,2
p=2,4 v=2,-3
p=9,5 v=-3,-3
`;

// const dummyInput = `
// p=2,4 v=2,-3
// `;

describe('Day 14 - Restroom Redoubt', () => {
  describe('Part 1 - safety factor after 100 seconds', () => {
    it('should pass a dummy test', () => {
      const input = dummyInput;
      const areaSpecs = { width: 11, height: 7 };

      const result = getSafetyFactor(input, areaSpecs, 100);

      expect(result).toEqual(12);
    });

    it('should pass the real test', () => {
      const input = getDayInput('14');
      const areaSpecs = { width: 101, height: 103 };
      const result = getSafetyFactor(input, areaSpecs, 100);

      expect(result).toEqual(217132650);
    });
  });

  describe('Part 2 - time to easter egg', () => {
    // Slow test
    it.skip('should pass the real test', () => {
      const input = getDayInput('14');
      const areaSpecs = { width: 101, height: 103 };
      const result = getSafetyFactor(input, areaSpecs, 7_000, 6_000);

      expect(result).toEqual(6_516);
    });
  });
});
