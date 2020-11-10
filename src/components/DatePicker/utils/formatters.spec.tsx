import {
  formatNumberToTwoDigits,
  formatDayMonthYearToValue,
} from './formatters';

describe('utils formatters', () => {
  describe('function formatNumberToTwoDigits', () => {
    it('should prepend 0 if digit lower than 10', () => {
      expect(formatNumberToTwoDigits(1)).toEqual('01');
      expect(formatNumberToTwoDigits(7)).toEqual('07');
    });

    it('should not prepend 0 if digit higher than 10', () => {
      expect(formatNumberToTwoDigits(11)).toEqual('11');
      expect(formatNumberToTwoDigits(77)).toEqual('77');
    });
  });

  describe('function formatDayMonthYearToValue', () => {
    it('should format string to dd-mm-yyyy', () => {
      expect(formatDayMonthYearToValue(1, 2, 2016)).toEqual('01-02-2016');
      expect(formatDayMonthYearToValue(11, 22, 2020)).toEqual('11-22-2020');
    });
  });
});
