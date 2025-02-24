export function getDateFromTurnNumber(turnNumber: number): string {
  const year: number = matchTurnNumberWithYear(turnNumber);
  const month: string = matchTurnNumberWithMonth(turnNumber);
  return `${month} ${year}`;
}

export function getDatesSinceTurnNumber(turnNumber: number): string[] {
  const dates: string[] = [];
  for (let i = 0; i < turnNumber; i++) {
    dates.push(getDateFromTurnNumber(i));
  }
  return dates;
}

function matchTurnNumberWithYear(turnNumber: number): number {
  return Math.floor(turnNumber / 12) + 1970;
}

function matchTurnNumberWithMonth(turnNumber: number): string {
  const monthNumber: number = turnNumber % 12;
  const monthNames: string[] = [
    'November',
    'December',
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
  ];

  const monthName = monthNames[monthNumber];
  if (!monthName) {
    throw new Error(`Invalid month number: ${monthNumber}`);
  }
  return monthName;
}
