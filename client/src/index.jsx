import React from 'react';
import ReactDOM from 'react-dom';
import 'grommet/grommet-hpe.min.css';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';


ReactDOM.render(
  <BrowserRouter >
    <App />
  </BrowserRouter>,
  // eslint-disable-next-line
  document.getElementById('root'),
);
