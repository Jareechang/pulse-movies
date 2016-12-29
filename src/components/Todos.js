import React, { Component } from 'react';

import TodoStore from '../stores/TodoStore';
import * as TodoActions from '../actions/TodoActions';

export default class Todos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: TodoStore.getAll()
    };
    this.reloadTodos = this.reloadTodos.bind(this);
  }

  componentWillMount() {
    TodoStore.on('change', () => {
      this.setState({
        todos: TodoStore.getAll()
      })
    })
  }

  reloadTodos() {
    TodoActions.reloadTodos();
  }

  componentWillUnMount() {
    TodoStore.removeListener('change');
    console.log('listener removed');
  }

  render() {
    const { todos } = this.state;
    const isDone = todo => todo.complete ? 'done' : 'not yet';
    const renderTodos = todos.map((todo, index) => {
      return (
        <li key={index}>{todo.text} (done ? {isDone(todo)} )</li>
      );
    })
    return (
      <div>
        <button onClick={this.reloadTodos}>Reload </button>
        <ul> {renderTodos} </ul>
      </div>
    )
  }
}

