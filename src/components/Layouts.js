import React, { Component } from 'react';
import Header from './Header';

export default class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'Welcome'
    };
  }

  static contextTypes = {
    history: React.PropTypes.object.isRequired
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

