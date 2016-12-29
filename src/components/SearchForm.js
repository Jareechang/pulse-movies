import React, { Component } from 'react';

import styles from './styles/searchform.css';

/* Actions */
import * as MovieActions from '../actions/MovieActions';

export default class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.toggleSearchForm = this.toggleSearchForm.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.state = {
      active: false,
      text: ''
    }
  }

  toggleSearchForm() {
    this.setState({ active: !this.state.active });
  }

  handleInputChange(event) {
    this.setState({ text: event.target.value });
    const val = event.target.value;

    this.props.router.push({
      pathname: '/' ,
      query: { test: 'meow '},
      state: { query: event.target.value }
    })

    MovieActions.filterMovieByQuery(movie =>
      `${movie.Title} ${movie.Year} ${movie.Type}`
        .replace(/[^\w]/ig,' ')
        .match(new RegExp(val, 'i'))
    )
  }

  render() {
    const isActive = () => this.state.active;
    const showStyleIfActive = () => (
      isActive() ?
        styles.formActive
        : ''
    )
    const getActiveGlyph = () => (
      isActive() ?
        `glyphicon-remove ${styles.activeGlyph}` :
      'glyphicon-search'
    )
    return (
      <form className={'navbar-form navbar-left'}>
        <div className='form-group'>
          <input type='text'
            className={`form-control ${styles.formInput} ${ showStyleIfActive() }`}
            value={this.state.text}
            onChange={this.handleInputChange}
            placeholder='Search by title, year, type (movies, tv series)'
          />
        </div>
        <div className={`${styles.glyphContainer}`} onClick={this.toggleSearchForm}>
          <i className={`glyphicon ${getActiveGlyph()} ${styles.glyphicon}`}></i>
        </div>
      </form>
    );
  }
}
