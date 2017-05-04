import React from 'react';
import ReactDOM from 'react-dom';
import 'grommet/grommet-hpe.min.css';
import {
  BrowserRouter,
  Route,
} from 'react-router-dom';
import App from './App';

ReactDOM.render(
  <BrowserRouter>
    <div>
      <Route path="/" component={App} />
    </div>
  </BrowserRouter>,
  // eslint-disable-next-line
  document.getElementById('root'),
);
