import { getDayInput } from '../support/getDayInput';
import { getAdminPassword, getTParties } from './day23';

const dummyInput = `
kh-tc
qp-kh
de-cg
ka-co
yn-aq
qp-ub
cg-tb
vc-aq
tb-ka
wh-tc
yn-cg
kh-ub
ta-co
de-co
tc-td
tb-wq
wh-td
ta-ka
td-qp
aq-cg
wq-ub
ub-vc
de-ta
wq-aq
wq-vc
wh-yn
ka-de
kh-ta
co-tc
wh-qp
tb-vc
td-yn
`;

describe('Day 23 - Lan Party', () => {
  describe('Part 1 - find historian by computer name T', () => {
    it('should pass a dummy test', () => {
      const input = dummyInput;

      const result = getTParties(input);
      expect(result).toEqual(7);
    });

    it('should pass the real test', () => {
      const input = getDayInput('23');

      const result = getTParties(input);
      expect(result).toEqual(1476);
    });
  });

  describe('Part 2 - find the admin password', () => {
    it('should pass a dummy test', () => {
      const input = dummyInput;
      const result = getAdminPassword(input);

      expect(result).toEqual('co,de,ka,ta');
    });

    it('should pass the real test', () => {
      const input = getDayInput('23');
      const result = getAdminPassword(input);

      expect(result).toEqual('ca,dw,fo,if,ji,kg,ks,oe,ov,sb,ud,vr,xr');
    });
  });
});
