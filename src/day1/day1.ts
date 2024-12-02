const getLists = (input: string) => {
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

  return lists;
};

export const getDistanceBetweenLists = (input: string) => {
  const lists = getLists(input);

  // sort left and right lists ASC
  const sorted = { left: lists.left.sort(), right: lists.right.sort() };

  // Get distance between lists
  const distance = sorted.left.reduce((acc, left, i) => {
    const right = sorted.right[i];
    return acc + Math.abs(parseInt(left) - parseInt(right));
  }, 0);

  return distance;
};

export const calculateSimilarityScore = (input: string) => {
  const lists = getLists(input);

  // for each item in the left list check how often it appears in the right list
  // and create a sum total of the score
  const result = lists.left.reduce((acc, left) => {
    const count = lists.right.filter((right) => right === left).length;
    return acc + count * parseInt(left);
  }, 0);

  return result;
};
