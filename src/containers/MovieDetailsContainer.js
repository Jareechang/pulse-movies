import React, { Component } from 'react';
import {Container} from 'flux/utils';
import { browserHistory } from 'react-router';

/* Stores */
import MovieDetailStore from '../stores/MovieDetailStore';

/* API */
import { dispatchAsync } from '../utils/helpers';
import * as MovieDetailsAPI from '../api/MovieDetailsAPI';

/* Compoents */
import MovieDetails from '../components/MovieDetails';

class MovieDetailContainer extends Component {

  constructor(props) {
    super(props);
    this.constructor.navigateHome = this.constructor.navigateHome.bind(this);
  }

  static contextTypes = {
    history: React.PropTypes.object.isRequired
  }

  static getStores() {
    return [MovieDetailStore];
  }

  static calculateState() {
    return {
      movieDetails: MovieDetailStore.getState().movieDetails
    }
  }

  static navigateHome() {
    this.context.history.push('/');
  }

  componentWillMount() {
    dispatchAsync(
      MovieDetailsAPI.fetchMovieDetails('sdfs'),
      {
        request: 'REQUESTING_MOVIE_DETAILS',
        success: 'REQUESTING_MOVIE_DETAILS_SUCCESS',
        failure: 'REQUESTING_MOVIE_DETAILS_FAILURE'
      }
    );
  }

  render() {
    console.log(this.constructor.navigateToHome)
    return (
      <div>
        <MovieDetails
          back={this.constructor.navigateHome}
          {...this.state.movieDetails}
        />
      </div>
    );
  }
}

export default Container.create(MovieDetailContainer);
