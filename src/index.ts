// @ts-nocheck
import { loadBugs } from './store/bugs';
import configureStore from './store/configureStore';

const store = configureStore();
export type RootState = ReturnType<typeof store.getState>;

// store.dispatch((dispatch: Dispatch<AnyAction>, getState: () => any) => {
//   dispatch({ type: 'bugs/bugsRecieved', bugs: [1, 2, 3] });
//   console.log(getState());
// });

// store.dispatch({
//   type: 'error',
//   payload: { message: 'an error occured' },
// });

store.dispatch(loadBugs());
// store.dispatch(
//   actions.apiRequestStart({
//     url: '/bugs',
//     onSuccess: 'bugs/bugsRecieved',
//   })
// );
