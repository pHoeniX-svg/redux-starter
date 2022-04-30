import * as actions from './store/bugs';
import configureStore from './store/configureStore';

const store = configureStore();
type RootState = ReturnType<typeof store.getState>;

store.subscribe(() => {
  console.log('Store Changed');
});

store.dispatch(actions.bugCreated({ description: 'Bug 1' }));
store.dispatch(actions.bugCreated({ description: 'Bug 2' }));
store.dispatch(actions.bugCreated({ description: 'Bug 3' }));
store.dispatch(actions.bugResolved({ id: 1 }));
// store.dispatch(actions.bugRemoved({ id: 2 }));

console.log(store.getState());

// declare global {
//   interface Window {
//     __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
//   }
// }

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const store = createStore(reducer, composeEnhancers());
