import {ReduceStore} from 'flux/utils';

import dispatcher from '../dispatcher';

import movies from '../seeds/movies';

class MovieStore extends ReduceStore {
  constructor() {
    super(dispatcher);
  }

  getInitialState() {
    return {
      data: movies,
      applyFilter: null
    };
  }

  getAll() {
    return this._state.movies;
  }

  reduce(state, action) {
    switch(action.type) {
      case 'FILTER_MOVIE_TYPE':
        return { ...state, applyFilter: action.filter };
      case 'FILTER_MOVIE_QUERY':
        return { ...state, queryFilter: action.filter };
      default:
        return state;
    }
  }
}

const movieStore = new MovieStore;

export default movieStore;
