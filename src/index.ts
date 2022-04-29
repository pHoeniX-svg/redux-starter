import * as actions from './actions';
import store from './store';

store.subscribe(() => {
  console.log('Store Changed');
});

store.dispatch(actions.addBug('Bug 1'));
store.dispatch(actions.addBug('Bug 2'));
store.dispatch(actions.addBug('Bug 3'));
store.dispatch(actions.resolveBug(1));

console.log(store.getState());
