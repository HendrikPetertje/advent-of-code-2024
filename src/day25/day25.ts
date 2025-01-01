type KeyOrLock = number[];

const parseInput = (input: string) => {
  const keysAndLocks = input.trim().split('\n\n');

  const keys: KeyOrLock[] = [];
  const locks: KeyOrLock[] = [];
  let height = 0;

  keysAndLocks.forEach((keysOrLocks) => {
    const map = keysOrLocks.split('\n').map((line) => {
      return line.split('').map((item) => (item === '#' ? 1 : 0));
    });

    height = map.length;

    const keyOrLock: KeyOrLock = [];
    map[0].forEach((_, index) => {
      let count = 0;
      map.forEach((line) => {
        count += line[index];
      });
      keyOrLock.push(count);
    });

    if (map[0][0] === 1) {
      locks.push(keyOrLock);
      return;
    }
    keys.push(keyOrLock);
  });

  return { keys, locks, height, width: keys[0].length };
};

export const getFittingLocks = (input: string) => {
  const { keys, locks, width, height } = parseInput(input);

  const result = locks.map((lock) => {
    const fittingKeys = keys.filter((key) => {
      let fits = true;
      for (let i = 0; i < width; i++) {
        if (lock[i] + key[i] > height) {
          fits = false;
          break;
        }
      }

      return fits;
    });

    return fittingKeys.length;
  });

  // add up all the fitting keys and lock pairs
  return result.reduce((acc, curr) => acc + curr, 0);
};

export const finishTheStory = () => {
  console.log('Happy Holidays!');
  return 50;
};
