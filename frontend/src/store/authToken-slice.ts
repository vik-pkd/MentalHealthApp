import { createSlice } from '@reduxjs/toolkit';

const authTokenSlice = createSlice({
  name: 'authToken',
  initialState: { token: null},
  reducers: {
    clear(state) {
      state.token = null;
    },
    set(state, action) {
      state.token = action.payload;
    }
  }
});

export const authTokenActions = authTokenSlice.actions;

export default authTokenSlice;
