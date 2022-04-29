import * as actions from './store/bugs';
import configureStore from './store/configureStore';

const store = configureStore();

store.subscribe(() => {
  console.log('Store Changed');
});

store.dispatch(actions.addBug('Bug 1'));
store.dispatch(actions.addBug('Bug 2'));
store.dispatch(actions.addBug('Bug 3'));
store.dispatch(actions.resolveBug(1));

console.log(store.getState());

// declare global {
//   interface Window {
//     __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
//   }
// }

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const store = createStore(reducer, composeEnhancers());
