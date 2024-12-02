const parseInput = (input: string) => {
  const rawReports = input.split('\n');
  const reports = rawReports.map((report) => {
    return report.split(' ').map((num) => parseInt(num));
  });

  return reports;
};

const allStricAscendingOrDescending = (report: number[]) => {
  // are all numbers in the report either ascending or descending
  let isAscending: boolean;
  const result = report.every((num, i, arr) => {
    if (i === 0) return true;
    // if number is greater set localAscending to true
    const localAscending = num > arr[i - 1];
    if (i === 1) {
      isAscending = localAscending;
      return true;
    }

    return localAscending === isAscending;
  });

  return result;
};

const allHaveSaveDistances = (report: number[]) => {
  // is the difference between numbers in the report at minimum 1 and at max 3?
  const result = report.every((num, i, arr) => {
    if (i === 0) return true;
    const difference = Math.abs(num - arr[i - 1]);
    return difference >= 1 && difference <= 3;
  });

  return result;
};

export const countSafeReports = (input: string) => {
  const reports = parseInput(input);

  const safeReports = reports.filter((report) => {
    return allStricAscendingOrDescending(report) && allHaveSaveDistances(report);
  });

  return safeReports.length;
};

export const countDampenedSafeReports = (input: string) => {
  const reports = parseInput(input);

  const safeReports = reports.filter((report) => {
    if (allStricAscendingOrDescending(report) && allHaveSaveDistances(report)) return true;

    // remove one number from the report and check if the report is still invalid
    for (let i = 0; i < report.length; i++) {
      const reportCopy = [...report];
      reportCopy.splice(i, 1);
      if (allStricAscendingOrDescending(reportCopy) && allHaveSaveDistances(reportCopy)) return true;
    }

    return false;
  });

  return safeReports.length;
};
