import dispatcher from '../dispatcher';

const stringify = data =>
  JSON.stringify(data, null, 4);

function dispatch(type, action) {
  dispatcher.dispatch({ type, ...action });
}

const dispatchAsync = (promise, types, action = {}) => {
  const { request, success, failure } = types;
  dispatch(request, action)
  promise
    .then(
      response => dispatch(success, {...action, response}),
      error => dispatch(failure, {...action, response})
    )
}

const returnValueByDefault = x => x;

export {
  stringify,
  dispatchAsync,
  returnValueByDefault
}
