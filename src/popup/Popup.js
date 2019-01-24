import React from 'react';
import './Popup.css';

const TechStackLogos = () => {
  return (
    <div className="tech-logos">
      <img className="logo" src="/img/react.svg" alt="ReactJS logo" title="ReactJS" />
      <img className="logo" src="/img/webpack.svg" alt="Webpack logo" title="Webpack" />
      <img className="logo" src="/img/eslint.svg" alt="ESLint logo" title="ESLint" />
      <img className="logo" src="/img/jest.svg" alt="Jest logo" title="Jest" />
    </div>
  );
};

const Popup = () => {
  return (
    <div className="popup">
      <p className="popup-greet">Thanks for using <span className="brand">Modern extension Boilerplate</span></p>
      <p className="stack-head">Made using :</p>
      <TechStackLogos />
      <p className="contrib-msg">We would love some of your help in making this boilerplate even better. <br /><a href="https://www.github.com/kryptokinght/react-extension-boilerplate" target="_blank">React Extension Boilerplate</a></p>
    </div>
  );
};


export default Popup;
