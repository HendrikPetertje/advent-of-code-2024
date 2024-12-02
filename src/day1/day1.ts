export const getDistanceBetweenLists = (input: string) => {
  const lines = input.split('\n');

  // Get left and right lists
  const lists = lines.reduce(
    (acc, line) => {
      const [left, right] = line.split('   ');
      acc.left.push(left);
      acc.right.push(right);
      return acc;
    },
    { left: [] as string[], right: [] as string[] },
  );

  // sort left and right lists ASC
  const sorted = { left: lists.left.sort(), right: lists.right.sort() };

  // Get distance between lists
  const distance = sorted.left.reduce((acc, left, i) => {
    const right = sorted.right[i];
    return acc + Math.abs(parseInt(left) - parseInt(right));
  }, 0);

  return distance;
};
