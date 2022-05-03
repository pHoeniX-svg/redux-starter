import { AnyAction, Dispatch } from 'redux';
import configureStore from './store/configureStore';

const store = configureStore();
export type RootState = ReturnType<typeof store.getState>;

// @ts-expect-error
store.dispatch((dispatch: Dispatch<AnyAction>, getState: () => any) => {
  dispatch({ type: 'bugs/bugsRecieved', bugs: [1, 2, 3] });
  console.log(getState());
});

// @ts-expect-error
store.dispatch({
  type: 'error',
  payload: { message: 'an error occured' },
});
