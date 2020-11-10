import React, { useState, useEffect, useRef } from 'react';
import { BsCalendar, BsFillCaretLeftFill, BsFillCaretRightFill } from 'react-icons/bs';

import DetectOutsideClick from '../DetectOutsideClick';

import {
  getDaysInMonth,
  getDayMonthYearFromDateString,
  getFirstDayOfTheMonth,
  getWeeksThisMonth,
  formatDayMonthYearToValue,
  isOdd,
  isValidDate,
} from './utils';

import {
  EVEN_MONTH_DAY_COUNT,
  MONTHS,
  ODD_MONTH_DAY_COUNT,
} from './constants';

import './DatePicker.less';

import type { DayElement, WeekElement, DateState } from './types';

const getDayElement = (day: number, value: string, disabled: boolean): DayElement => ({
  day,
  value,
  disabled,
});

const renderDay = (day: any, state: DateState) => {
  let className = 'date-picker__day';
  if (day.disabled) className += ' disabled';
  if (state.get === day.value) className += ' selected';
  return (
    <div
      className={className}
      key={day.value}
      data-fulldate={day.value}
      onClick={() => state.onClick(day.value)}
    >
      {day.day}
    </div>
  );
};

// should rewrite weekNumber to use the actual week number of current year
const renderWeek = (week: WeekElement, state: DateState, weekNumber: number) => (
  <div className="date-picker__week" key={weekNumber}>
    {week.map((day) => renderDay(day, state))}
  </div>
);

const renderRemainingWeek = (
  firstDay: number,
  month: number,
  year: number,
  state: DateState,
  weekNumber: number,
) => {
  const days = [];
  const totalDays = getDaysInMonth(month);

  for (let i = 0; i < 7; i += 1) {
    const day = firstDay + i;

    if (day > totalDays) {
      const value = formatDayMonthYearToValue(day - totalDays, month + 1, year);
      days.push(getDayElement(day - totalDays, value, true));
    } else {
      const value = formatDayMonthYearToValue(day, month, year);
      days.push(getDayElement(day, value, false));
    }
  }

  return renderWeek(days, state, weekNumber);
};

const renderFirstWeek = (offset: number, month: number, year: number, state: DateState) => {
  if (offset === 0) return renderRemainingWeek(1, month, year, state, 1);

  const prevMonthDays = isOdd(month - 1) || month === 1
    ? ODD_MONTH_DAY_COUNT
    : EVEN_MONTH_DAY_COUNT;
  const days = [];

  for (let i = 1; i < 8; i += 1) {
    // render disabled days from last month
    if (i <= offset) {
      const day = prevMonthDays + i - offset;
      const value = formatDayMonthYearToValue(day, month - 1, year);
      days.push(getDayElement(day, value, true));
    } else {
      const day = i - offset;
      const value = formatDayMonthYearToValue(day, month, year);
      days.push(getDayElement(day, value, false));
    }
  }

  return renderWeek(days, state, 1);
};

const DatePicker = () => {
  // Instead of adding props for default value
  // we just use the values from the example (for easy comparison)
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [dateIsValid, setDateIsValid] = useState<boolean>(true);
  const [month, setMonth] = useState<number>(9);
  const [year, setYear] = useState<number>(2016);
  const [firstDayMonth, setFirstDayMonth] = useState<number>(3);
  const [selectedDate, setSelectedDate] = useState<string>('03-09-2016');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setFirstDayMonth(getFirstDayOfTheMonth(month, year));
  }, [month, year]);

  const yearInc = () => setYear(year + 1);

  const yearDec = () => setYear(year - 1);

  const monthInc = () => {
    // Increment year if november -> january
    if (month === 11) {
      setMonth(1);
      yearInc();
    } else {
      setMonth(month + 1);
    }
  };

  const monthDec = () => {
    // Decrement year if january -> november
    if (month === 1) {
      setMonth(11);
      yearDec();
    } else {
      setMonth(month - 1);
    }
  };

  const doShowDatePicker = () => {
    if (!showDatePicker) {
      setShowDatePicker(true);
    }
  };

  const hideDatePicker = () => {
    if (showDatePicker) {
      setShowDatePicker(false);
    }
  };

  const setValidDate = () => setDateIsValid(true);

  const updateSelectedDate = (date: string) => {
    setValidDate();
    setSelectedDate(date);
    if (inputRef) {
      if (inputRef.current) {
        inputRef.current.value = date;
      }
    }
    hideDatePicker();
  };

  const renderWeeks = () => {
    const weeks = [];
    const amountOfWeeks = getWeeksThisMonth(month, year);
    const dateState: DateState = {
      get: selectedDate,
      onClick: updateSelectedDate,
    };

    // render first week, with possible dates from last month
    weeks.push(renderFirstWeek(firstDayMonth, month, year, dateState));

    // render remaining weeks
    const startDay = 7 - firstDayMonth + 1;
    for (let i = 0; i < amountOfWeeks - 1; i += 1) {
      const firstDayOfTheWeek = startDay + (i * 7);
      const weekNumber = 2 + i; // exclude first week and correct for i=0
      weeks.push(renderRemainingWeek(firstDayOfTheWeek, month, year, dateState, weekNumber));
    }

    return weeks;
  };

  const setManualDate = (date: string) => {
    setSelectedDate(date);
    const { month: m, year: y } = getDayMonthYearFromDateString(date);
    setMonth(m);
    setYear(y);
  };

  const manualChange = (e: any) => {
    if (isValidDate(e.target.value)) {
      setManualDate(e.target.value);
      setDateIsValid(true);
    } else {
      setSelectedDate('');
      setDateIsValid(false);
    }
  };

  return (
    <div className="date-picker">
      <div className={`date-picker__input-group${!dateIsValid ? ' invalid' : ''}`}>
        <div className="date-picker__input-sublabel">Ingangsdatum</div>
        <input
          ref={inputRef}
          type="text"
          defaultValue={selectedDate}
          onChange={(e) => manualChange(e)}
          placeholder="Date"
          aria-label="Date"
          aria-describedby="date-picker-label"
        />
        <div className="date-picker__input-append" onClick={() => doShowDatePicker()}>
          <span id="date-picker-label">
            <BsCalendar />
          </span>
        </div>
      </div>

      {showDatePicker && (
        <DetectOutsideClick handleClick={() => hideDatePicker()}>
          <div className="date-picker__window">
            <p className="date-picker__label">Ingangsdatum</p>
            <div className="date-picker__selectors">
              <div className="date-picker__selectors-month">
                <BsFillCaretLeftFill onClick={monthDec} />
                <span>{MONTHS[month - 1]}</span>
                <BsFillCaretRightFill onClick={monthInc} />
              </div>
              <div className="date-picker__selectors-year">
                <BsFillCaretLeftFill onClick={yearDec} />
                <span>{year}</span>
                <BsFillCaretRightFill onClick={yearInc} />
              </div>
            </div>

            <div className="date-picker__week">
              <div className="date-picker__day-header">Zo</div>
              <div className="date-picker__day-header">Ma</div>
              <div className="date-picker__day-header">Di</div>
              <div className="date-picker__day-header">Wo</div>
              <div className="date-picker__day-header">Do</div>
              <div className="date-picker__day-header">Vr</div>
              <div className="date-picker__day-header">Za</div>
            </div>

            {renderWeeks()}
          </div>
        </DetectOutsideClick>
      )}
    </div>
  );
};

export default DatePicker;
