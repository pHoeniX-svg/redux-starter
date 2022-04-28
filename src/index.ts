import { bugAdded, bugResolved } from './actions';
import store from './store';

store.dispatch(bugAdded('Bug 01'));
store.dispatch(bugResolved(1));

console.log(store.getState());
