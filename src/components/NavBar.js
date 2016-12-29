import React, { Component } from 'react';

import { Link, IndexLink, withRouter } from 'react-router';

/* Styles  */
import NavBarStyles from './styles/navbar.css';

/* Component */
import SearchForm from './SearchForm';

const MobileToggleButton = () => (
    <div
      className={`${NavBarStyles.navbarToggle} collapsed`}
      data-toggle='collapse' data-target='#bs-example-navbar-collapse-1'
      aria-expanded='false'
    >
        <span className={`${ NavBarStyles.mobileGlyph } glyphicon glyphicon-option-vertical`}></span>
        <span className='sr-only'>Toggle navigation</span>
    </div>
)

const SearchFormWithRouter = withRouter(SearchForm, { withRef: true });

export default class NavBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div
        className={`navbar navbar-default ${NavBarStyles.nav}`}
        style={this.props.styles}
      >
          <div className='container-fluid'>
            <div className='navbar-header'>
              <MobileToggleButton />
              <IndexLink to='/' className={`navbar-brand ${NavBarStyles.title}`}>
                <span style={{ 'fontWeight': 'bold' }}>Pulse</span> Movies
              </IndexLink>
            </div>
            <div className='collapse navbar-collapse' id='bs-example-navbar-collapse-1'>
              <ul className='nav navbar-nav navbar-right'>
                <SearchFormWithRouter />
                <li>
                  <Link to='/movie' className={NavBarStyles.links}>
                    Movies
                  </Link>
                </li>
                <li>
                  <Link to='/series' className={NavBarStyles.links}>
                   TV series
                  </Link>
                </li>
              </ul>
            </div>
        </div>
      </div>
    )
  }
}

