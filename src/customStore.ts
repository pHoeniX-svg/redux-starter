import { reducer } from './reducer';

type Listener = () => void;

function createStore<T, A>(reducer: (state: T, action: A) => T) {
  let state: T;
  let listeners: Listener[] = [];

  return {
    getState() {
      return state;
    },
    dispatch(action: A) {
      state = reducer(state, action);
      listeners.forEach((listener) => listener());
    },
    subscribe(listener: Listener) {
      listeners.push(listener);
    },
  };
}

export default createStore(reducer);
