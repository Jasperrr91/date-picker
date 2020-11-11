import {
  getDayElement,
  getDaysToRender,
} from './helpers';

describe('datepicker helpers', () => {
  describe('function getDayElement', () => {
    it('should return a day element for given day, value and disabled boolean', () => {
      expect(getDayElement(3, '03-01-2016', true)).toEqual({
        day: 3,
        value: '03-01-2016',
        disabled: true,
      });

      expect(getDayElement(4, '04-01-2016', false)).toEqual({
        day: 4,
        value: '04-01-2016',
        disabled: false,
      });
    });
  });

  describe('function getDaysToRender', () => {
    it('should return a day element for given day, value and disabled boolean', () => {
      const expected = [
        {
          day: 30,
          value: '30-08-2016',
          disabled: true,
        },
        {
          day: 31,
          value: '31-08-2016',
          disabled: true,
        },
        {
          day: 32,
          value: '32-08-2016',
          disabled: true,
        },
        {
          day: 1,
          value: '01-09-2016',
          disabled: false,
        },
        {
          day: 2,
          value: '02-09-2016',
          disabled: false,
        },
        {
          day: 3,
          value: '03-09-2016',
          disabled: false,
        },
        {
          day: 4,
          value: '04-09-2016',
          disabled: false,
        },
        {
          day: 5,
          value: '05-09-2016',
          disabled: false,
        },
        {
          day: 6,
          value: '06-09-2016',
          disabled: false,
        },
        {
          day: 7,
          value: '07-09-2016',
          disabled: false,
        },
        {
          day: 8,
          value: '08-09-2016',
          disabled: false,
        },
        {
          day: 9,
          value: '09-09-2016',
          disabled: false,
        },
        {
          day: 10,
          value: '10-09-2016',
          disabled: false,
        },
        {
          day: 11,
          value: '11-09-2016',
          disabled: false,
        },
        {
          day: 12,
          value: '12-09-2016',
          disabled: false,
        },
        {
          day: 13,
          value: '13-09-2016',
          disabled: false,
        },
        {
          day: 14,
          value: '14-09-2016',
          disabled: false,
        },
        {
          day: 15,
          value: '15-09-2016',
          disabled: false,
        },
        {
          day: 16,
          value: '16-09-2016',
          disabled: false,
        },
        {
          day: 17,
          value: '17-09-2016',
          disabled: false,
        },
        {
          day: 18,
          value: '18-09-2016',
          disabled: false,
        },
        {
          day: 19,
          value: '19-09-2016',
          disabled: false,
        },
        {
          day: 20,
          value: '20-09-2016',
          disabled: false,
        },
        {
          day: 21,
          value: '21-09-2016',
          disabled: false,
        },
        {
          day: 22,
          value: '22-09-2016',
          disabled: false,
        },
        {
          day: 23,
          value: '23-09-2016',
          disabled: false,
        },
        {
          day: 24,
          value: '24-09-2016',
          disabled: false,
        },
        {
          day: 25,
          value: '25-09-2016',
          disabled: false,
        },
        {
          day: 26,
          value: '26-09-2016',
          disabled: false,
        },
        {
          day: 27,
          value: '27-09-2016',
          disabled: false,
        },
        {
          day: 28,
          value: '28-09-2016',
          disabled: false,
        },
        {
          day: 29,
          value: '29-09-2016',
          disabled: false,
        },
        {
          day: 30,
          value: '30-09-2016',
          disabled: false,
        },
        {
          day: 31,
          value: '31-09-2016',
          disabled: false,
        },
        {
          day: 32,
          value: '32-09-2016',
          disabled: false,
        },
        {
          day: 33,
          value: '33-09-2016',
          disabled: false,
        },
        {
          day: 1,
          value: '01-10-2016',
          disabled: true,
        },
        {
          day: 2,
          value: '02-10-2016',
          disabled: true,
        },
        {
          day: 3,
          value: '03-10-2016',
          disabled: true,
        },
        {
          day: 4,
          value: '04-10-2016',
          disabled: true,
        },
        {
          day: 5,
          value: '05-10-2016',
          disabled: true,
        },
        {
          day: 6,
          value: '06-10-2016',
          disabled: true,
        },
      ];
      expect(getDaysToRender(9, 2016)).toEqual(expected);
    });
  });
});
