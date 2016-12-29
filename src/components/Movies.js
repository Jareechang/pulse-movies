import React, { Component } from 'react';
import { Link } from 'react-router';

/* Store */
import MovieStore from '../stores/MovieStore';

/* Components */
import movieStyles from './styles/movies.css';
import movieCardStyles from './styles/movieCards.css';

const convertTitleToLink = (title) => (
  title.toLowerCase()
    .replace(/\s/g, '-')
    .replace(/[^\w\-]/ig, '')
)

const MovieCards = ({ Title:  title, Poster: url, Year: year }) => (
  <Link
    to={`/details/${convertTitleToLink(title)}`}
    style={{ 'textDecoration': 'none', color: '#000' }}
  >
    <div className={`col-md-4 col-xs-12 text-center ${movieCardStyles.container}`}>
      <div className={movieCardStyles.inner}>
        <p>{ `${title} (${year})`}</p>
        <img className={movieCardStyles.img} src={url} />
      </div>
    </div>
  </Link>
);

export default class Movies extends Component {
  constructor(props) {
    super(props);
    const returnByDefault = movie => movie
    this.state = {
      movies: [],
      typeFilter: returnByDefault,
      queryFilter: returnByDefault
    };
    this._updateMovies = this._updateMovies.bind(this);
    this.renderMovieCards = this.renderMovieCards.bind(this);
  }

  componentWillMount() {
    const returnByDefault = movie => movie
    this._updateMovies(
      this.props.movies.data,
      {
        typeFilter: this.state.typeFilter || returnByDefault,
        queryFilter: this.state.queryFilter || returnByDefault
      }
    )
  }

  _updateMovies(movies, filters) {
    this.setState({
      movies,
      typeFilter: filters.typeFilter,
      queryFilter: filters.queryFilter
    });
  }

  componentWillReceiveProps(nextProps) {
    const { data } = nextProps.movies;
    const { typeFilter, queryFilter } = nextProps;
    this._updateMovies(
      data,
      {
        typeFilter,
        queryFilter
      }
    );
  }

  componentWillUnMount() {
    MovieStore.removeListener('change');
    console.log('listener removed');
  }

  renderMovieCards() {
    const { typeFilter, queryFilter, movies }  = this.state;
    /**
     *  @param Array -> array of filters [filter1, filter2]
     *  @return Function -> returns a composed function with filters taking data as arugment
     */
    const reduceFilter = filters => (
      (data) => (
        filters.reduce((p, c) => p.filter(c),
          data)
      )
    );
    const applyFiltersTo = reduceFilter([typeFilter, queryFilter]);
    return applyFiltersTo(movies)
      .map(movie =>
        <MovieCards
          {...movie}
          key={movie.Title.replace(/\s/,'')}
        />
      )
  }

  render() {
    return (
      <div className='container'>
        <div className={`row ${movieStyles.container}`}>
        {this.renderMovieCards()}
        </div>
      </div>
    );
  }
}
