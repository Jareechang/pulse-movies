import React, {Component} from 'react';
import {Container} from 'flux/utils';

import { returnValueByDefault } from '../utils/helpers';

import MovieStore from '../stores/MovieStore';
import movieDetailStore from '../stores/MovieDetailStore';
import Movies from '../components/Movies';
import * as MovieActions from '../actions/MovieActions';

const PageTitle = ({ titleStyles, displayTitle }) => (
  <p className='text-center' style={titleStyles}>
    { displayTitle }
  </p>
);

class MovieContainer extends Component {
  static getStores() {
    return [MovieStore];
  }

  static calculateState(prevState) {
    return {
      movies: MovieStore.getState()
    }
  }

  static componentStyles() {
    const titleStyles = {
      fontSize: '20px'
    };

    return {
      titleStyles : titleStyles
    }
  }

  componentWillReceiveProps(nextProps) {
    const { type } = nextProps.params;
    if (!type) return;

    MovieActions.filterMovieByType(movie =>
      movie.Type === type
    );
  }

  render() {
    const returnIfDefined = (k, object) => {
      return (
        object && object[k]
          ? object[k]
          : null
      )
    }
    const displayTitle = (type) => {
      const toDisplayName = {
        'movie' : 'Movies',
        'series' : 'TV Series'
      }
      return toDisplayName[type] || 'Display All (Movies, TV Series)';
    };

    const { type } = this.props.params;
    const { titleStyles } = this.constructor.componentStyles();
    const query = returnIfDefined('query', this.props.location.state);


    const typeFilter = (
      type
      ? movie => movie.Type === type
      : returnValueByDefault
    );

    const queryFilter = movie => (
      query ?
      `${movie.Title} ${movie.Year} ${movie.Type}`
        .replace(/[^\w]/ig,' ')
        .match(new RegExp(query, 'i'))
      : returnValueByDefault
    )

    return (
      <div>
        <PageTitle
          displayTitle={displayTitle(type)}
          titleStyles={titleStyles}
        />
        <Movies
          movies={this.state.movies}
          typeFilter={typeFilter}
          queryFilter={queryFilter}
        />
      </div>
    );
  }
}

export default Container.create(MovieContainer);
