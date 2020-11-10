import {
  isOdd,
  convertYearsToDays,
  getDaysPassedThisYear,
  getDaysPassedTillMonthYear,
  getFirstDayOfTheMonth,
  getDaysInMonth,
  getWeeksThisMonth,
  getDayMonthYearFromDateString,
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
      expect(getFirstDayOfTheMonth(9, 2016)).toEqual(3);
      expect(getFirstDayOfTheMonth(8, 2016)).toEqual(6);
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
      expect(getWeeksThisMonth(9, 2016)).toEqual(6);
      expect(getWeeksThisMonth(10, 2016)).toEqual(5);
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
});
