import dispatcher from '../dispatcher';

export function createTodo(text) {
  dispatcher.dispatch({
    type: 'CREATE_TODO',
    text
  });
}

export function deleteTodo(id) {
  dispatcher.dispatch({
    type: 'DELETE_TODO',
    id
  });
}

export function reloadTodos() {
  dispatcher.dispatch({ type: 'FETCH_TODOS', payload: null });
  setTimeout(() => {
    dispatcher.dispatch({
      type: 'RECEIVED_TODOS',
      payload: [{
        id: 23423,
        text: 'new stuff 1',
        complete: false
      },
      {
        id: 191919,
        text: 'new stuff 2',
        complete: false
      }]
    });
  }, 1000);
}
