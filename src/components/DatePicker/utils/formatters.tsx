/**
 * Prepends a 0 if number is only one digit.
 * @param {number} num Format 1
 * @public
 */
export const formatNumberToTwoDigits = (num: number): string => (
  `0${num}`.slice(-2)
);

/**
 * Formats a day, month and year into a dateString.
 * @param {number} day Format 1
 * @param {number} month Format 1
 * @param {number} year Format 1
 * @public
 */
export const formatDayMonthYearToValue = (day: number, month: number, year: number): string => {
  const formattedDay = formatNumberToTwoDigits(day);
  const formattedMonth = formatNumberToTwoDigits(month);
  return `${formattedDay}-${formattedMonth}-${year}`;
};
