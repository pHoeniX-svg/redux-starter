import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { apiRequestStart } from './api';
import { IProject, ProjectState } from './types';

let lastId = 0;
const initialProjectState: ProjectState = [];

const projectSlice = createSlice({
  name: 'projects',
  initialState: initialProjectState,
  reducers: {
    projectCreated: (state, action: PayloadAction<{ name: string }>) => {
      state.push({ id: ++lastId, name: action.payload.name });
    },
  },
});

export const { projectCreated } = projectSlice.actions;
export default projectSlice.reducer;

const url = '/projects';

export const createProject = (project: IProject) =>
  apiRequestStart({
    url,
    method: 'post',
    data: project,
    onSuccess: projectCreated.type,
  });
