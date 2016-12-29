import {ReduceStore} from 'flux/utils';

import dispatcher from '../dispatcher';

class MovieDetailStore extends ReduceStore {
  constructor() {
    super(dispatcher);
  }

  getInitialState() {
    return {
      movieDetails: null
    };
  }

  reduce(state, action) {
    switch(action.type) {
      case 'REQUESTING_MOVIE_DETAILS':
        return { ...state, loading: true };
      case 'REQUESTING_MOVIE_DETAILS_SUCCESS':
        return { ...state, loading: false, movieDetails: action.response, message: 'SUCCESS' };
      case 'REQUESTING_MOVIE_DETAILS_FAILURE':
        return { ...state, loading: false, message: 'FAILURE' };
      default:
        return state;
    }
  }
}

const movieDetailStore = new MovieDetailStore;

export default movieDetailStore;
