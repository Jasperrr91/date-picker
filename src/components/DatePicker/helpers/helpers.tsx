import {
  formatDayMonthYearToValue,
  getDateFromNextMonth,
  getDateFromPastMonth,
  getDaysInMonth,
  getOffsetFirstDay,
  getAmountOfWeeksInMonth,
} from '../utils';

import type { DayElement } from '../types';

export const getDayElement = (day: number, value: string, disabled: boolean): DayElement => ({
  day,
  value,
  disabled,
});

export const getDayFromPastMonth = (offset: number, currentMonth: number, currentYear: number) => {
  const { day, month, year } = getDateFromPastMonth(offset, currentMonth, currentYear);
  const value = formatDayMonthYearToValue(day, month, year);

  return getDayElement(day, value, true);
};

export const getDayFromCurrentMonth = (day: number, month: number, year: number) => {
  const value = formatDayMonthYearToValue(day, month, year);

  return getDayElement(day, value, false);
};

export const getDayFromNextMonth = (offset: number, currentMonth: number, currentYear: number) => {
  const { day, month, year } = getDateFromNextMonth(offset, currentMonth, currentYear);
  const value = formatDayMonthYearToValue(day, month, year);

  return getDayElement(day, value, true);
};

export const getDaysToRender = (month: number, year: number) => {
  const offset = getOffsetFirstDay(month, year);
  const daysToRender = 7 * getAmountOfWeeksInMonth(month, year);

  const days = [];
  for (let i = 1; i <= daysToRender; i += 1) {
    const relativeDay = i - offset;
    if (i <= offset) {
      days.push(getDayFromPastMonth(relativeDay, month, year));
    } else if (relativeDay > getDaysInMonth(month)) {
      days.push(getDayFromNextMonth(relativeDay, month, year));
    } else {
      days.push(getDayFromCurrentMonth(relativeDay, month, year));
    }
  }

  return days;
};
