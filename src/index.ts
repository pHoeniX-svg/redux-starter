import {
  bugAssignedToUser,
  bugCreated,
  bugResolved,
  getBugsByUser,
  getUnresolvedBugs,
} from './store/bugs';
import configureStore from './store/configureStore';
import { projectCreated } from './store/projects';
import { userCreated } from './store/users';

const store = configureStore();
export type RootState = ReturnType<typeof store.getState>;

store.subscribe(() => {
  console.log('Store Changed');
});

store.dispatch(projectCreated({ name: 'Project 01' }));
store.dispatch(userCreated({ name: 'User 01' }));
store.dispatch(userCreated({ name: 'User 02' }));
store.dispatch(bugCreated({ description: 'Bug 1' }));
store.dispatch(bugCreated({ description: 'Bug 2' }));
store.dispatch(bugCreated({ description: 'Bug 3' }));
store.dispatch(bugCreated({ description: 'Bug 4' }));
store.dispatch(bugAssignedToUser({ bugId: 1, userId: 2 }));
store.dispatch(bugResolved({ id: 1 }));

const unresolvedBugs = getUnresolvedBugs(store.getState());
const bugsByUser = getBugsByUser(2)(store.getState());

console.log(unresolvedBugs);
console.log(bugsByUser);

// declare global {
//   interface Window {
//     __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
//   }
// }

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const store = createStore(reducer, composeEnhancers());
