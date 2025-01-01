const filterEmptyLines = (lines: string[]) => lines.filter((line) => line !== '');

const cleanupAndSplitInput = (input: string) => {
  const [instructions, manuals] = input.split('\n\n');

  return {
    instructions: filterEmptyLines(instructions.split('\n')).map((instr) => instr.split('|') as [string, string]),
    manuals: filterEmptyLines(manuals.split('\n')).map((instr) => instr.split(',')),
  };
};

const sortManuals = (manuals: string[][], instructions: [string, string][]) => {
  const correctManuals: string[][] = [];
  const wrongManuals: string[][] = [];

  manuals.forEach((manual) => {
    const manualInstructions = instructions.filter((instr) => manual.includes(instr[0]) && manual.includes(instr[1]));

    const isCorrect = manual.every((page) => {
      return manualInstructions.every(([before, after]) => {
        // Ignore if the instruction is not relevant for the page
        if (![before, after].includes(page)) return true;

        if (page === before) {
          return manual.indexOf(after) > manual.indexOf(page);
        } else {
          return manual.indexOf(before) < manual.indexOf(page);
        }
      });
    });

    if (isCorrect) {
      correctManuals.push(manual);
    } else {
      wrongManuals.push(manual);
    }
  });

  return { correctManuals, wrongManuals };
};

const getMiddlePageSum = (manuals: string[][]) => {
  const middlePages = manuals.map((manual) => {
    // I would like to get the value at the center of a list ['1', '2', '3'] // here I would like '2'
    const middleNumber = Math.floor(manual.length / 2);
    const middlePage = manual[middleNumber];
    return middlePage;
  });

  return middlePages.reduce((acc, curr) => acc + parseInt(curr), 0);
};

export const findMiddlePageSum = (input: string) => {
  const { instructions, manuals } = cleanupAndSplitInput(input);

  const { correctManuals } = sortManuals(manuals, instructions);

  return getMiddlePageSum(correctManuals);
};

export const correctAllWrongAndFindMiddlePageSum = (input: string) => {
  const { instructions, manuals } = cleanupAndSplitInput(input);

  const { wrongManuals } = sortManuals(manuals, instructions);

  const correctManuals = wrongManuals.map((manual) => {
    const manualInstructions = instructions
      .filter((instr) => manual.includes(instr[0]) && manual.includes(instr[1]))
      .sort((a, b) => manual.indexOf(a[0]) - manual.indexOf(b[0]));

    return manualInstructions.reduce(
      (acc, page) => {
        const [before, after] = page;
        const beforeIndex = acc.indexOf(before);
        const afterIndex = acc.indexOf(after);

        // if the page is correct
        if (beforeIndex > afterIndex) {
          // remove the page from the list
          acc.splice(beforeIndex, 1);
          // insert it into an earlier position in the list where it needs to be (left-ward)
          acc.splice(afterIndex, 0, before);
        }

        return acc;
      },
      [...manual],
    );
  });

  return getMiddlePageSum(correctManuals);
};
