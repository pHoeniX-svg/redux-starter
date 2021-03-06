import { configureStore } from '@reduxjs/toolkit';
import { api, toast } from './middleware';
import reducer from './reducer';

export default function () {
  return configureStore({
    reducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        // logger({ destination: 'console' }),
        toast,
        api
      ),
  });
}
