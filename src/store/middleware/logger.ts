import { Middleware } from 'redux';

export const logger: Middleware = (store) => (next) => (action) => {
  console.log('STORE', store);
  console.log('NEXT', next);
  console.log('ACTION', action);
  next(action);
};
// export const logger =
//   <A>(store) =>
//   (next: Dispatch<AnyAction>) =>
//   (action: A) => {
//     console.log('STORE', store);
//     console.log('NEXT', next);
//     console.log('ACTION', action);
//   };
