import { EventEmitter } from 'events';

import dispatcher from '../dispatcher';

class TodoStore extends EventEmitter {
  constructor() {
    super();
    this.todos = [
      {
        id: 23423,
        text: 'Go shopping',
        complete: false
      },
      {
        id: 191919,
        text: 'Pay bills',
        complete: false
      }
    ]
  }

  createTodo(text) {
    const id = Date.now();
    this.todos.push({
      id,
      text,
      complete: false
    });
    this.emit('change');

  }

  getAll() {
    return this.todos;
  }

  handleActions(action) {
    switch(action.type) {
      case 'CREATE_TODO':
        this.createTodo(action.text);
        break;
      case 'RECEIVED_TODOS':
        this.todos = action.payload;
        this.emit('change');
        break;
      default:
        console.log('no op action emitted');
        // noop
    }
  }
}

const todoStore = new TodoStore;

dispatcher.register(todoStore.handleActions.bind(todoStore));

export default todoStore;
