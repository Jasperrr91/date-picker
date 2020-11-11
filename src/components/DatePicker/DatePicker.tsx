import React, { useState, useRef } from 'react';
import { BsCalendar, BsFillCaretLeftFill, BsFillCaretRightFill } from 'react-icons/bs';

import DetectOutsideClick from '../DetectOutsideClick';

import {
  getDayMonthYearFromDateString,
  isValidDate,
} from './utils';

import { getDaysToRender } from './helpers/helpers';

import {
  MONTHS,
} from './constants';

import './DatePicker.less';

import type { DayElement } from './types';

const renderDay = (day: any, selected: string, onClick: (arg: string) => void) => {
  let className = 'date-picker__day';
  if (day.disabled) className += ' disabled';
  if (day.value === selected) className += ' selected';

  return (
    <div
      className={className}
      key={day.value}
      data-fulldate={day.value}
      onClick={() => onClick(day.value)}
    >
      {day.day}
    </div>
  );
};

const renderWeek = (days: DayElement[], selected: string, onClick: (arg: string) => void) => (
  <div className="date-picker__week" key={`${days[0].value}-${days[6].value}`}>
    {days.map((day) => renderDay(day, selected, onClick))}
  </div>
);

const renderWeeks = (days: DayElement[], selected: string, onClick: (arg: string) => void) => {
  const renderedWeeks = [];
  for (let i = 0; i < days.length; i += 7) {
    const week = days.slice(i, i + 7);
    const renderedWeek = renderWeek(week, selected, onClick);
    renderedWeeks.push(renderedWeek);
  }
  return renderedWeeks;
};

const DatePicker = () => {
  // Instead of adding props to set a default value
  // we just use the values from the example (for easy comparison)
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [dateIsValid, setDateIsValid] = useState<boolean>(true);
  const [pickerMonth, setPickerMonth] = useState<number>(9);
  const [pickerYear, setPickerYear] = useState<number>(2016);
  const [selectedDate, setSelectedDate] = useState<string>('03-09-2016');

  const inputRef = useRef<HTMLInputElement>(null);

  const yearInc = () => setPickerYear(pickerYear + 1);

  const yearDec = () => setPickerYear(pickerYear - 1);

  const monthInc = () => {
    // Increment year if november -> january
    if (pickerMonth === 11) {
      setPickerMonth(1);
      yearInc();
    } else {
      setPickerMonth(pickerMonth + 1);
    }
  };

  const monthDec = () => {
    // Decrement year if january -> november
    if (pickerMonth === 1) {
      setPickerMonth(11);
      yearDec();
    } else {
      setPickerMonth(pickerMonth - 1);
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

  const renderDatePicker = () => {
    const days = getDaysToRender(pickerMonth, pickerYear);
    return renderWeeks(days, selectedDate, updateSelectedDate);
  };

  const setManualDate = (date: string) => {
    setSelectedDate(date);
    const { month: m, year: y } = getDayMonthYearFromDateString(date);
    setPickerMonth(m);
    setPickerYear(y);
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
                <span>{MONTHS[pickerMonth - 1]}</span>
                <BsFillCaretRightFill onClick={monthInc} />
              </div>
              <div className="date-picker__selectors-year">
                <BsFillCaretLeftFill onClick={yearDec} />
                <span>{pickerYear}</span>
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

            {renderDatePicker()}
          </div>
        </DetectOutsideClick>
      )}
    </div>
  );
};

export default DatePicker;
