import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserState } from './types';

let lastId = 0;
const initialUserState: UserState = [];

const userSlice = createSlice({
  name: 'users',
  initialState: initialUserState,
  reducers: {
    userCreated: (state, action: PayloadAction<{ name: string }>) => {
      state.push({ id: ++lastId, name: action.payload.name });
    },
  },
});

export const { userCreated } = userSlice.actions;
export default userSlice.reducer;
