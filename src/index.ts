import { assignBugToUser, loadBugs } from './store/bugs';
import configureStore from './store/configureStore';

const store = configureStore();
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type RootStore = typeof store;

store.dispatch(loadBugs());

setTimeout(() => {
  store.dispatch(assignBugToUser(4, 1));
}, 2000);
