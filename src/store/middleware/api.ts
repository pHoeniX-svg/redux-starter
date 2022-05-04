import axios, { AxiosError } from 'axios';
import { AnyAction, Middleware } from 'redux';
import * as actions from '../api';

export const api: Middleware =
  ({ dispatch }) =>
  (next) =>
  async <A extends AnyAction>(action: A) => {
    if (action.type !== actions.apiRequestStart.type) return next(action);

    const { url, method, data, onStart, onSuccess, onError } = action.payload;

    if (onStart) dispatch({ type: onStart });

    next(action);
    try {
      const response = await axios.request({
        baseURL: 'http://localhost:3001/api',
        url,
        method,
        data,
      });

      dispatch(actions.apiRequestSuccess(response.data));
      if (onSuccess) dispatch({ type: onSuccess, payload: response.data });
    } catch (error) {
      const e = error as AxiosError;
      dispatch(actions.apiRequestError({ message: e.message }));
      if (onError) dispatch({ type: onError, payload: { message: e.message } });
    }
  };
