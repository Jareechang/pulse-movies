import { stringify } from '../utils/helpers';

export default (dispatcher) =>
  (process.env.NODE_ENV !== 'production') &&
  dispatcher.register(
    (action) => {
      if (action.logger === 'OFF') return;
      console.log('     ')
      console.log('Dispatched action type of : %s ', action.type);
      console.log('Action payload of : %s ', stringify(action.payload));
      console.log('     ')
    }
  )
