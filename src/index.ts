// @ts-nocheck
import { loadBugs } from './store/bugs';
import configureStore from './store/configureStore';

const store = configureStore();
export type RootState = ReturnType<typeof store.getState>;

store.dispatch(loadBugs());

setTimeout(() => {
  store.dispatch(loadBugs());
}, 2000);
