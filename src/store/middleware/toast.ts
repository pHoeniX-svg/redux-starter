import { AnyAction, Middleware } from 'redux';

export const toast: Middleware = (store) => (next) => (action: AnyAction) => {
  if (action.type === 'error') console.log('Toastify:', action.payload.message);
  else next(action);
};
