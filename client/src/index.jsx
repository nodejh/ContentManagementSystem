import React from 'react';
import ReactDOM from 'react-dom';
import 'grommet-css';
import {
  BrowserRouter,
  Route,
} from 'react-router-dom';
import Login from './routes/Login';
import App from './App';

ReactDOM.render(
  <BrowserRouter>
    <div>
      <Route path="/" component={App} />
      <Route exact path="/login" component={Login} />
    </div>
  </BrowserRouter>,
  // eslint-disable-next-line
  document.getElementById('root'),
);
