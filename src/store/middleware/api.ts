// @ts-nocheck
import axios from 'axios';
import { Middleware } from 'redux';
import * as actions from '../api';

export const api: Middleware =
  ({ dispatch }) =>
  (next) =>
  async (action) => {
    if (action.type !== actions.apiRequestStart.type) return next(action);

    next(action);
    const { url, method, data, onSuccess, onError } = action.payload;

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
      const e = error.response ? error.response : error;
      dispatch(actions.apiRequestError(e.message));
      if (onError) dispatch({ type: onError, payload: e.message });
    }
  };
