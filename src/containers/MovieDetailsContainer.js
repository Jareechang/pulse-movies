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

const Button = (props) => (
  <button onClick={props.clickAction} className='btn btn-secondary'>
    Back
  </button>
);

class MovieDetailContainer extends Component {

  constructor(props) {
    super(props);
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
    const goBackToIndexPath = _ => this.context.history.push('/')
    return (
      <div>
        <MovieDetails
          {...this.state.movieDetails}
        />
        <Button clickAction={goBackToIndexPath} />
      </div>
    );
  }
}

export default Container.create(MovieDetailContainer);
