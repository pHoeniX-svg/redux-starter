import { configureStore } from '@reduxjs/toolkit';
import { func, logger } from './middleware';
import reducer from './reducer';

export default function () {
  return configureStore({
    reducer,
    middleware: [logger('console'), func] as const,
  });
}
