import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import moment from 'moment';
import { RootState } from '..';
import { apiRequestStart } from './api';
import { BugState, IBug } from './types';

const initialState = {
  list: [] as BugState,
  loading: false,
  lastFetch: null as null | number,
};

const bugSlice = createSlice({
  name: 'bugs',
  initialState,
  reducers: {
    bugCreated: (state, action: PayloadAction<IBug>) => {
      state.list.push(action.payload);
    },

    bugAssignedToUser(
      state,
      action: PayloadAction<{ bugId: number; userId: number }>
    ) {
      const { bugId, userId } = action.payload;
      const idx = state.list.findIndex((bug) => bug.id === bugId);
      state.list[idx].userId = userId;
    },

    bugRemoved: (state, action: PayloadAction<{ id: number | string }>) => {
      const idx = state.list.findIndex((bug) => bug.id === action.payload.id);
      idx > -1 && state.list.splice(idx, 1);

// state.list.splice(state.list.indexOf(bug), 1)
    },

    bugResolved: (state, action: PayloadAction<{ id: number | string }>) => {
      const idx = state.list.findIndex((bug) => bug.id === action.payload.id);
      state.list[idx].resolved = true;
    },

    bugsRequested: (state) => {
      state.loading = true;
    },

    bugsRecieved: (state, action: PayloadAction<BugState>) => {
      state.list = action.payload;
      state.loading = false;
      state.lastFetch = Date.now();
    },

    bugsRequestFailed: (state) => {
      state.loading = false;
    },
  },
});

export const {
  bugCreated,
  bugRemoved,
  bugResolved,
  bugAssignedToUser,
  bugsRequested,
  bugsRecieved,
  bugsRequestFailed,
} = bugSlice.actions;
export default bugSlice.reducer;

const url = '/bugs';

// Action creators
export const loadBugs = () => (dispatch: any, getState: any) => {
  const { lastFetch } = getState().entities.bugs;

  const diffInMinutes = moment().diff(moment(lastFetch), 'minutes');
  if (diffInMinutes < 10) return;

  dispatch(
    apiRequestStart({
      url: url,
      onStart: bugsRequested.type,
      onSuccess: bugsRecieved.type,
      onError: bugsRequestFailed.type,
    })
  );
};

export const addBugs = (bug: Partial<IBug>) =>
  apiRequestStart({
    url: url,
    method: 'post',
    data: bug,
    onSuccess: bugCreated.type,
    onError: bugsRequestFailed.type,
  });

export const resolveBug = (id: number | string) =>
  apiRequestStart({
    url: `${url}/${id}`,
    method: 'patch',
    data: { resolved: true },
    onSuccess: bugResolved.type,
  });

// Selector: Returns result from cache if available
export const getUnresolvedBugs = createSelector(
  (state: RootState) => state.entities.bugs.list,
  (bugs) => bugs.filter((bug) => !bug.resolved)
);

export const getBugsByUser = (userId: number) =>
  createSelector(
    (state: RootState) => state.entities.bugs.list,
    (bugs) => bugs.filter((bug) => bug.userId === userId)
  );
