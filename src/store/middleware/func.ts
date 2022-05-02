import { Middleware } from 'redux';

export const func: Middleware =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    if (typeof action === 'function') action(dispatch, getState);
    else next(action);
  };
