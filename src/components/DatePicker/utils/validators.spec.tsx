import {
  isValidDateString,
  isValidDay,
  isValidMonth,
  isValidDate,
} from './validators';

describe('utils validators', () => {
  describe('function isValidDateString', () => {
    it('should return true if a date consists of xx-xx-x+', () => {
      expect(isValidDateString('01-02-2013')).toEqual(true);
      expect(isValidDateString('01-25-2013')).toEqual(true);
      expect(isValidDateString('25-02-2013')).toEqual(true);
      expect(isValidDateString('01-02-333')).toEqual(true);
    });

    it('should return false if a date does not consist of xx-xx-x+', () => {
      expect(isValidDateString('x01-02-2013')).toEqual(false);
      expect(isValidDateString('01-02-2013x')).toEqual(false);
      expect(isValidDateString('1-02-333')).toEqual(false);
      expect(isValidDateString('01-2-333')).toEqual(false);
      expect(isValidDateString('random')).toEqual(false);
      expect(isValidDateString('')).toEqual(false);
    });
  });

  describe('function isValidDay', () => {
    it('should return true if given day exists for given month', () => {
      expect(isValidDay(3, 1)).toEqual(true);
      expect(isValidDay(33, 1)).toEqual(true);
      expect(isValidDay(32, 2)).toEqual(true);
    });

    it('should return false if given day does not exist for given month', () => {
      expect(isValidDay(-5, 1)).toEqual(false);
      expect(isValidDay(34, 1)).toEqual(false);
      expect(isValidDay(33, 2)).toEqual(false);
    });
  });

  describe('function isValidMonth', () => {
    it('should return true if a date is a valid month 1-11', () => {
      expect(isValidMonth(3)).toEqual(true);
      expect(isValidMonth(7)).toEqual(true);
    });

    it('should return false if a date is not a valid month 1-11', () => {
      expect(isValidMonth(-5)).toEqual(false);
      expect(isValidMonth(0)).toEqual(false);
      expect(isValidMonth(12)).toEqual(false);
    });
  });

  describe('function isValidDate', () => {
    it('should return true if a date is valid', () => {
      expect(isValidDate('01-02-2013')).toEqual(true);
      expect(isValidDate('32-02-2014')).toEqual(true);
      expect(isValidDate('13-10-111')).toEqual(true);
    });

    it('should return false if a date is not valid', () => {
      expect(isValidDate('34-01-2013')).toEqual(false);
      expect(isValidDate('33-02-2014')).toEqual(false);
      expect(isValidDate('3-5-111')).toEqual(false);
    });
  });
});
