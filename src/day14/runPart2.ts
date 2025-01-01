import { getDayInput } from '../support/getDayInput';
import { getSafetyFactor } from './day14';

const input = getDayInput('14');
const areaSpecs = { width: 101, height: 103 };
getSafetyFactor(input, areaSpecs, 7_000, 6_000);
