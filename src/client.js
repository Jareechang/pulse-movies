import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import routes from './routes/routes';

const app = document.getElementById('app');

render(<Router history={browserHistory}>{routes}</Router>, app);
