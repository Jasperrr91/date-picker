import {
  isOdd,
  convertYearsToDays,
  getDaysPassedThisYear,
  getDaysPassedTillMonthYear,
  getOffsetFirstDay,
  getDaysInMonth,
  getAmountOfWeeksInMonth,
  getDayMonthYearFromDateString,
  getDateFromPastMonth,
  getDateFromNextMonth,
} from './date';

import {
  DAYS_PER_YEAR,
  EVEN_MONTH_DAY_COUNT,
  ODD_MONTH_DAY_COUNT,
} from '../constants';

describe('utils date', () => {
  describe('function isOdd', () => {
    it('should return true if odd', () => {
      expect(isOdd(1)).toEqual(true);
    });

    it('should return false if even', () => {
      expect(isOdd(2)).toEqual(false);
    });
  });

  describe('function yearsToDays', () => {
    it('should calculates amount of days for given years', () => {
      expect(convertYearsToDays(1)).toEqual(DAYS_PER_YEAR);
      expect(convertYearsToDays(3)).toEqual(3 * DAYS_PER_YEAR);
    });
  });

  describe('function daysPassedThisYear', () => {
    it('should return days passed up till given month', () => {
      expect(getDaysPassedThisYear(1)).toEqual(0);
      expect(getDaysPassedThisYear(2)).toEqual(ODD_MONTH_DAY_COUNT);
      expect(getDaysPassedThisYear(3))
        .toEqual(ODD_MONTH_DAY_COUNT + EVEN_MONTH_DAY_COUNT);
      expect(getDaysPassedThisYear(5))
        .toEqual(2 * (ODD_MONTH_DAY_COUNT + EVEN_MONTH_DAY_COUNT));
    });
  });

  describe('function daysPassedTillMonthYear', () => {
    it('should return days passed up till given month and year', () => {
      expect(getDaysPassedTillMonthYear(1, 1)).toEqual(0);
      expect(getDaysPassedTillMonthYear(1, 2)).toEqual(DAYS_PER_YEAR);
      expect(getDaysPassedTillMonthYear(2, 2))
        .toEqual(DAYS_PER_YEAR + ODD_MONTH_DAY_COUNT);
      expect(getDaysPassedTillMonthYear(3, 3))
        .toEqual((2 * DAYS_PER_YEAR) + ODD_MONTH_DAY_COUNT + EVEN_MONTH_DAY_COUNT);
    });
  });

  describe('function firstDayOfTheMonth', () => {
    it('should return days first weekday number for given month and year', () => {
      // From the given example 1 september 2016 = Wed
      expect(getOffsetFirstDay(9, 2016)).toEqual(3);
      expect(getOffsetFirstDay(8, 2016)).toEqual(6);
    });
  });

  describe('function daysThisMonth', () => {
    it('should return days first weekday number for given month and year', () => {
      // From the given example 1 september 2016 = Wed
      expect(getDaysInMonth(4)).toEqual(EVEN_MONTH_DAY_COUNT);
      expect(getDaysInMonth(5)).toEqual(ODD_MONTH_DAY_COUNT);
    });
  });

  describe('function weeksThisMonth', () => {
    it('should return weeks this month, starting sunday', () => {
      // From the given example 1 september 2016 = Wed
      expect(getAmountOfWeeksInMonth(9, 2016)).toEqual(6);
      expect(getAmountOfWeeksInMonth(10, 2016)).toEqual(5);
    });
  });

  describe('function getDayMonthYearFromDateString', () => {
    it('should return day, month and year date string ', () => {
      expect(getDayMonthYearFromDateString('01-02-2020')).toEqual({
        day: 1,
        month: 2,
        year: 2020,
      });
    });
  });

  describe('function getDateFromPastMonth', () => {
    it('should return date object for day in past month x days from current month', () => {
      expect(getDateFromPastMonth(-3, 8, 2016)).toEqual({
        day: 30,
        month: 7,
        year: 2016,
      });
      expect(getDateFromPastMonth(-3, 7, 2016)).toEqual({
        day: 29,
        month: 6,
        year: 2016,
      });
      expect(getDateFromPastMonth(-3, 1, 2016)).toEqual({
        day: 30,
        month: 11,
        year: 2015,
      });
    });
  });

  describe('function getDateFromNextMonth', () => {
    it('should return date object for day in next month', () => {
      expect(getDateFromNextMonth(36, 3, 2016)).toEqual({
        day: 3,
        month: 4,
        year: 2016,
      });
      expect(getDateFromNextMonth(36, 4, 2016)).toEqual({
        day: 4,
        month: 5,
        year: 2016,
      });
      expect(getDateFromNextMonth(36, 11, 2016)).toEqual({
        day: 3,
        month: 1,
        year: 2017,
      });
    });
  });
});
