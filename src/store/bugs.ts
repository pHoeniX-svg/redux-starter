import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '..';
import { BugState } from './types';

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

    bugAssignedToUser(
      state,
      action: PayloadAction<{ bugId: number; userId: number }>
    ) {
      const { bugId, userId } = action.payload;
      const idx = state.findIndex((bug) => bug.id === bugId);
      state[idx].userId = userId;
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

export const { bugCreated, bugRemoved, bugResolved, bugAssignedToUser } =
  bugSlice.actions;
export default bugSlice.reducer;

// Selector: Returns result from cache if available
export const getUnresolvedBugs = createSelector(
  (state: RootState) => state.entities.bugs,
  (bugs) => bugs.filter((bug) => !bug.resolved)
);

export const getBugsByUser = (userId: number) =>
  createSelector(
    (state: RootState) => state.entities.bugs,
    (bugs) => bugs.filter((bug) => bug.userId === userId)
  );
