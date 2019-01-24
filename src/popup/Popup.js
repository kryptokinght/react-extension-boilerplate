import React from 'react';
import './Popup.css';

const Popup = (props) => {
  return (
    <div className="App">
      <header className="App-header">
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <h1>{props.text}</h1>
      </header>
    </div>
  );
};


export default Popup;
