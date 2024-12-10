type Space = number | null;

const isFileOrFreeSpace = (index: number) => {
  if (index === 0 || !!(index && !(index % 2))) return 'file';
  return 'free-space';
};

const getId = (index: number) => {
  if (index === 0) return 0;
  return index / 2;
};

const createDiskMap = (input: string) => {
  // remove all newlines from input
  const filteredInput = input.replaceAll('\n', '');

  const diskMap: Space[] = [];

  filteredInput.split('').forEach((item, index) => {
    const times = parseInt(item);
    const kind = isFileOrFreeSpace(index);
    const id = getId(index);

    if (kind === 'file') {
      // push id into diskmap [times] times
      diskMap.push(...Array.from({ length: times }, () => id));
    }

    if (kind === 'free-space') {
      // push null into diskmap [times] times
      diskMap.push(...Array.from({ length: times }, () => null));
    }
  });

  return diskMap;
};

const compress = (diskMap: Space[]) => {
  const compressedDisk = structuredClone(diskMap);

  while (true) {
    const firstNullIndex = compressedDisk.indexOf(null);
    const lastNonNullIndex = compressedDisk.findLastIndex((item) => item);
    if (!lastNonNullIndex) throw new Error('Something is off here');

    // if firstNullIndex comes after lastNonNullIndex then we are done
    if (firstNullIndex > lastNonNullIndex) break;

    // grab the file and move it
    const file = compressedDisk[lastNonNullIndex];
    compressedDisk[lastNonNullIndex] = null;
    compressedDisk[firstNullIndex] = file;
  }

  return compressedDisk;
};

const getChecksum = (diskMap: Space[]) => {
  const checks = diskMap.map((space, index) => {
    if (space === null) return 0;

    return space * index;
  });

  const checksum = checks.reduce((acc, check) => check + acc, 0);

  return checksum;
};

// Exports
export const compressDisk = (input: string) => {
  const diskMap = createDiskMap(input);
  const compressedDisk = compress(diskMap);
  const checkSum = getChecksum(compressedDisk);

  return checkSum;
};

const compressDiskUnfragmented = (diskMap: Space[]) => {
  const compressedDisk = structuredClone(diskMap);

  const highestFileId = compressedDisk.findLast((item) => item);
  if (!highestFileId) throw new Error('Something is off here');

  // create a new array from a range of 0..highestFileId
  const uniquefileIds = Array.from({ length: highestFileId + 1 }, (_, index) => index).reverse();

  uniquefileIds.forEach((fileId) => {
    const fileIndices = compressedDisk.reduce((acc, item, index) => {
      if (item === fileId) acc.push(index);
      return acc;
    }, [] as number[]);

    const spaceRequired = fileIndices.length;
    // find x free (null) spaces next to each other where x is the spaceRequired
    const firstNullIndex = compressedDisk.findIndex((item, index) => {
      if (item === null) {
        const nextXItems = compressedDisk.slice(index, index + spaceRequired);
        if (nextXItems.every((item) => item === null)) return true;
      }
      return false;
    });

    // If the file can not be moved leave it in place and continue with the next
    if (firstNullIndex === -1 || firstNullIndex > fileIndices[0]) return;

    // grab the files and move them
    fileIndices.forEach((indexOnDisk, index) => {
      const file = compressedDisk[indexOnDisk];
      compressedDisk[indexOnDisk] = null;
      compressedDisk[firstNullIndex + index] = file;
    });
  });

  return compressedDisk;
};

export const compressUnfragmented = (input: string) => {
  const diskMap = createDiskMap(input);
  const compressedDisk = compressDiskUnfragmented(diskMap);
  const checkSum = getChecksum(compressedDisk);

  return checkSum;
};
