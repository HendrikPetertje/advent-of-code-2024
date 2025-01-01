import fs from 'fs';
import path from 'path';

export const getDayInput = (day: string) => {
  return fs.readFileSync(path.resolve(__dirname, `../../input/input.day${day}.txt`), 'utf8');
};
