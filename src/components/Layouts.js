import React, { Component } from 'react';
import Header from './Header';

export default class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'Welcome'
    };
  }

  render() {
    return (
      <div>
        <Header
          title={this.state.title}
        />
        {this.props.children}
      </div>
    );
  }
}

