import {
  EVEN_MONTH_DAY_COUNT,
  ODD_MONTH_DAY_COUNT,
  DAYS_PER_YEAR,
} from '../constants';

import type { Date } from '../types';

/**
 * Checks if digit is odd.
 * @param {number} num Format 1
 * @public
 */
export const isOdd = (num: number): boolean => (!!(num % 2));

/**
 * Converts amount of years to days.
 * @param {number} years Format 1
 * @public
 */
export const convertYearsToDays = (years: number): number => years * DAYS_PER_YEAR;

/**
 * Returns how many days have passed this year up till current month
 * @param {number} currentMonth Format 1
 * @public
 */
export const getDaysPassedThisYear = (currentMonth: number): number => {
  let days = 0;
  for (let i = 1; i < currentMonth; i += 1) {
    days += isOdd(i) ? ODD_MONTH_DAY_COUNT : EVEN_MONTH_DAY_COUNT;
  }
  return days;
};

/**
 * Returns how many days have pissed up till given month and year.
 * @param {number} month Format 1
 * @param {number} year Format 1
 * @public
 */
export const getDaysPassedTillMonthYear = (
  currentMonth: number,
  currentYear: number,
): number => (
  convertYearsToDays(currentYear - 1) + getDaysPassedThisYear(currentMonth)
);

// From the example, we know 01-09-2016 is a Wednesday
// daysPassed(9, 2016) = 721630
// 721630 % 7 = 0
// so modulo 0 equates to a Wednesday
// Since we start the week at Sun, there's a +3 day offset
/**
 * Returns which day the first of the month equates to. (0-6 as sun-sat)
 * @param {number} month Format 1
 * @param {number} year Format 1
 * @public
 */
export const getFirstDayOfTheMonth = (month: number, year: number): number => {
  const days = getDaysPassedTillMonthYear(month, year);
  const modToDayMapping = [3, 4, 5, 6, 0, 1, 2];
  const modulo = days % 7;
  return modToDayMapping[modulo];
};

/**
 * Returns the amount of days in given month.
 * @param {number} month Format 1
 * @public
 */
export const getDaysInMonth = (month: number): number => (
  isOdd(month) ? ODD_MONTH_DAY_COUNT : EVEN_MONTH_DAY_COUNT
);

/**
 * Returns the amount of weeks (sun-sat) that span the given month.
 * @param {number} month Format 1
 * @param {number} year Format 1
 * @public
 */
export const getWeeksThisMonth = (month: number, year: number): number => {
  const days = getDaysInMonth(month);
  const offset = getFirstDayOfTheMonth(month, year);

  const weeks = (days + offset) / 7;
  return Math.ceil(weeks);
};

/**
 * Returns the day, month and year for given date string.
 * @param {number} day Format 1
 * @param {number} month Format 1
 * @param {number} year Format 1
 * @public
 */
export const getDayMonthYearFromDateString = (dateString: string): Date => {
  const [dayString, monthString, yearString] = dateString.split('-');
  const day = parseInt(dayString, 10);
  const month = parseInt(monthString, 10);
  const year = parseInt(yearString, 10);

  return {
    day,
    month,
    year,
  };
};
