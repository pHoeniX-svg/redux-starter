import { AnyAction, Dispatch } from 'redux';
import configureStore from './store/configureStore';

const store = configureStore();
export type RootState = ReturnType<typeof store.getState>;
export type RootDispatch = ReturnType<typeof store.dispatch>;

// @ts-expect-error
store.dispatch((dispatch: Dispatch<AnyAction>, getState: () => any) => {
  dispatch({ type: 'bugs/bugsRecieved', bugs: [1, 2, 3] });
  console.log(getState());
});
