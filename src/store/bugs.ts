import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BugState } from './types';

function withPayloadType<PayloadType>() {
  return (type: PayloadType) => ({ payload: type });
}

let lastId = 0;
const initialBugState: BugState = [];

const bugSlice = createSlice({
  name: 'bugs',
  initialState: initialBugState,
  reducers: {
    bugCreated: (state, action: PayloadAction<{ description: string }>) => {
      state.push({
        id: ++lastId,
        description: action.payload.description,
        resolved: false,
      });
    },

    bugRemoved: (state, action: PayloadAction<{ id: number | string }>) => {
      const idx = state.findIndex((bug) => bug.id === action.payload.id);
      idx > -1 && state.splice(idx, 1);
    },

    bugResolved: (state, action: PayloadAction<{ id: number | string }>) => {
      const idx = state.findIndex((bug) => bug.id === action.payload.id);
      state[idx].resolved = true;
    },
  },
});

export const { bugCreated, bugRemoved, bugResolved } = bugSlice.actions;
export default bugSlice.reducer;
