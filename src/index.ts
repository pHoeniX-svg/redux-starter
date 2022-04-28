import store from './store';

store.dispatch({
  type: 'ADD_BUG',
  payload: {
    description: 'Bug 01',
  },
});

store.dispatch({
  type: 'REMOVE_BUG',
  payload: {
    id: 'i02r5n2CCED3M4L00cwbpafn0EOBQ9FO',
  },
});
console.log(store.getState());
