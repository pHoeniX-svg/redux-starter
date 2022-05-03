import { createAction } from '@reduxjs/toolkit';

export const apiRequestStart = createAction<{
  url: string;
  method?: string;
  data?: any;
  onStart?: string;
  onSuccess?: string;
  onError?: string;
}>('api/RequestStart');

export const apiRequestSuccess =
  createAction<Record<'string', number | string | boolean>>(
    'api/RequestSuccess'
  );

export const apiRequestError = createAction<{ message: string }>(
  'api/RequestError'
);
