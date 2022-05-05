// import { Middleware, MiddlewareAPI } from 'redux';
// @ts-ignore
export const logger = (params) => (store) => (next) => (action) => {
  console.log('logging to', params);
  return next(action);
};
// export const logger =
//   <A>(store) =>
//   (next: Dispatch<AnyAction>) =>
//   (action: A) => {
//     console.log('STORE', store);
//     console.log('NEXT', next);
//     console.log('ACTION', action);
//   };
