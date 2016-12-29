import React, { Component } from 'react';

/* Components*/

import PreHeader from './PreHeader';
import NavBar from './NavBar';

const Header = () => (
  <div>
    <PreHeader />
    <NavBar />
  </div>
);

Header.propTypes = {
  title: React.PropTypes.string.isRequired
};

export default Header;
