import React, { PropTypes } from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import Layout from '../components/Layouts';
import MovieDetails from '../components/MovieDetails';

import MovieContainer from '../containers/MovieContainer';
import MovieDetailContainer from '../containers/MovieDetailsContainer';

const AppRoutes = () => (
  <Router history={browserHistory}>
    <Route path='/' component={Layout}>
      <IndexRoute component={MovieContainer} />
      <Route path='/:type' component={MovieContainer} />
      <Route path='/details/:title' component={MovieDetailContainer} />
    </Route>
  </Router>
);


export default AppRoutes;
