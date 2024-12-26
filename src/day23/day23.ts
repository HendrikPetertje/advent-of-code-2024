type Pair = [string, string];
const parseInput = (input: string) => {
  const lines = input.trim().split('\n');
  const pairs = lines.map((line) => line.split('-')) as Pair[];
  return pairs;
};

type Connections = Record<string, string[]>;
const getConnections = (pairs: Pair[]) => {
  const connections: Connections = {};

  pairs.forEach(([a, b]) => {
    if (!connections[a]) connections[a] = [];
    connections[a].push(b);

    if (!connections[b]) connections[b] = [];
    connections[b].push(a);
  });

  return connections;
};

const getSets = (connections: Connections) => {
  const sets = new Set<string>();

  Object.keys(connections).forEach((a) => {
    connections[a].forEach((b) => {
      connections[b].forEach((c) => {
        // If we are looking back at ourselves
        if (c === a) return;

        // If A is not part of the C connections
        if (!connections[c].includes(a)) return;

        const set = [a, b, c].sort().join('.');
        sets.add(set);
      });
    });
  });

  return sets;
};

const getSetsWithT = (sets: Set<string>) => {
  let count = 0;
  sets.forEach((set) => {
    if (set.match(/(^t|\.t)/)) {
      count += 1;
    }
  });

  return count;
};

export const getTParties = (input: string) => {
  const pairs = parseInput(input);
  const connections = getConnections(pairs);
  const sets = getSets(connections);
  const numberOfTSets = getSetsWithT(sets);

  return numberOfTSets;
};

export const getAdminPassword = (input: string) => {
  const pairs = parseInput(input);
  const connections = getConnections(pairs);

  const sets = new Set<string>();

  const scan = (currentNode: string, peers: string[]) => {
    const key = peers.sort().join(',');
    if (sets.has(key)) return;
    sets.add(key);

    connections[currentNode].forEach((peer) => {
      if (peers.includes(peer)) return;

      // if not all peers are connected to the current peer
      if (!peers.every((p) => connections[peer].includes(p))) return;

      scan(peer, [...peers, peer]);
    });
  };

  Object.keys(connections).forEach((node) => {
    scan(node, [node]);
  });

  // find the longest string in the sets
  const longestSet = [...sets].sort((a, b) => b.length - a.length)[0];

  return longestSet;
};
