import React from 'react';
import { shallow } from 'enzyme';
import DatePicker from './DatePicker';

describe('DatePicker', () => {
  it('It will render a DatePicker component correctly', () => {
    const app = shallow(<DatePicker />);
    expect(app).toMatchSnapshot();
  });
});
