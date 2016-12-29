import dispatcher from '../dispatcher';

export function filterMovieByQuery(fn) {
  dispatcher.dispatch({
    type: 'FILTER_MOVIE_QUERY',
    filter: fn
  })
}

export function filterMovieByType(fn) {
  dispatcher.dispatch({
    type: 'FILTER_MOVIE_TYPE',
    filter: fn
  })
}
