import { createAction } from '@reduxjs/toolkit';

export const apiRequestStart = createAction('api/RequestStart');
export const apiRequestSuccess = createAction('api/RequestSuccess');
export const apiRequestError = createAction('api/RequestError');
