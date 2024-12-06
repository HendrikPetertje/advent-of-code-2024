import fs from 'fs';
import { getPossibleLoops } from './day6';

const getRealInput = () => {
  return fs.readFileSync('./input/input.day6.txt', 'utf8');
};

const execute = async () => {
  console.log('GO');

  const input = getRealInput();

  const result = await getPossibleLoops(input);

  console.log('Final result: ', result);
};

execute();
