export function getDateFromTurnNumber(turnNumber) {
    const year = matchTurnNumberWithYear(turnNumber);
    const month = matchTurnNumberWithMonth(turnNumber);
    return `${month} ${year}`;
}
export function getDatesSinceTurnNumber(turnNumber) {
    const dates = [];
    for (let i = 0; i < turnNumber; i++) {
        dates.push(getDateFromTurnNumber(i));
    }
    return dates;
}
function matchTurnNumberWithYear(turnNumber) {
    return Math.floor(turnNumber / 12) + 1970;
}
function matchTurnNumberWithMonth(turnNumber) {
    const monthNumber = turnNumber % 12;
    const monthNames = [
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
