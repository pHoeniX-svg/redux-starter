import { addBugs } from './store/bugs';
import configureStore from './store/configureStore';

const store = configureStore();
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type RootStore = typeof store;

store.dispatch(addBugs({ description: 'a' }));
