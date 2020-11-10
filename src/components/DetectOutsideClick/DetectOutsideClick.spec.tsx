import React from 'react';
import { shallow } from 'enzyme';
import DetectOutsideClick from './DetectOutsideClick';

describe('DetectOutsideClick', () => {
  it('It will render a DetectOutsideClick component correctly', () => {
    const handleClick = jest.fn();
    const app = shallow(<DetectOutsideClick handleClick={handleClick}>child</DetectOutsideClick>);
    expect(app).toMatchSnapshot();
  });
});
