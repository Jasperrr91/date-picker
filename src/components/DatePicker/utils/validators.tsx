import { getDaysInMonth } from './date';
import { MONTH_COUNT } from '../constants';

/**
 * Validates if a string is a valid date string.
 * @param {string} dateString Format 'dd-mm-yyyy'
 * @public
 */
export const isValidDateString = (datestring: string): boolean => {
  const re = /^[0-9]{2}-[0-9]{2}-[0-9]+$/;
  return !!datestring.match(re);
};

/**
 * Validates if a day exists in given month.
 * @param {number} day Format 1
 * @param {number} month Format 1
 * @public
 */
export const isValidDay = (day: number, month: number): boolean => {
  const maxDay = getDaysInMonth(month);
  return !!(day <= maxDay && day > 0);
};

/**
 * Validates if given month exists.
 * @param {number} month Format 1
 * @public
 */
export const isValidMonth = (month: number): boolean => (
  !!(month <= MONTH_COUNT && month > 0)
);

/**
 * Validates if a string is an existing date.
 * @param {string} dateString Format 'dd-mm-yyyy'
 * @public
 */
export const isValidDate = (dateString: string): boolean => {
  if (!isValidDateString(dateString)) return false;

  const [dayString, monthString] = dateString.split('-');

  const month = parseInt(monthString, 10);
  if (!isValidMonth(month)) return false;

  const day = parseInt(dayString, 10);
  if (!isValidDay(day, month)) return false;

  return true;
};
