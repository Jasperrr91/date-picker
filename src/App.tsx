import React from 'react';
import './App.css';
import DayPicker from './components/DatePicker/DatePicker';

function App() {
  return (
    <div className="App">
      <DayPicker />
      <p>Just some underlying text that <br /> should be covered by the date picker</p>
    </div>
  );
}

export default App;
