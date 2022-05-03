import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { logger, toast } from './middleware';
import reducer from './reducer';

export default function () {
  return configureStore({
    reducer,
    middleware: [...getDefaultMiddleware(), logger('console'), toast] as const,
  });
}
