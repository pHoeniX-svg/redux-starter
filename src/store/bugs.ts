import { createAction, createReducer, PayloadAction } from '@reduxjs/toolkit';
import { BugState } from './types';
// BugActions,
function withPayloadType<T>() {
  return (t: T) => ({ payload: t });
}

// Action Creators
export const addBug = createAction('ADD_BUG');
export const removeBug = createAction('REMOVE_BUG');
export const resolveBug = createAction('RESOLVE_BUG');

// Reducer

let lastId = 0;

const initialBugState: BugState = [];

export default createReducer(initialBugState, {
  [addBug.type]: (bugs, action: PayloadAction<{ description: string }>) => {
    bugs.push({
      id: ++lastId,
      description: action.payload.description,
      resolved: false,
    });
  },
  [removeBug.type]: (bugs, action: PayloadAction<{ id: number | string }>) => {
    bugs.filter((bug) => bug.id !== action.payload.id);
  },
  [resolveBug.type]: (bugs, action: PayloadAction<{ id: number | string }>) => {
    const idx = bugs.findIndex((bug) => bug.id === action.payload.id);
    bugs[idx].resolved = true;
  },
});
