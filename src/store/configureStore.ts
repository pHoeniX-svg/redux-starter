import { configureStore } from '@reduxjs/toolkit';
import { logger } from './middleware';
import reducer from './reducer';

export default function () {
  return configureStore({ reducer, middleware: [logger] });
}
