import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

describe('Application', () => {
  it('It will render a Application component correctly', () => {
    const app = shallow(<App />);
    expect(app).toMatchSnapshot();
  });
});
