import * as actions from './actions';
import store from './store';

const unsubscribe = store.subscribe(() => {
  console.log('store changed', store.getState());
});

store.dispatch({
  type: actions.BUG_ADDED,
  payload: {
    description: 'Bug 01',
  },
});

unsubscribe();
store.dispatch({
  type: 'REMOVE_BUG',
  payload: {
    id: 1,
  },
});
console.log(store.getState());
