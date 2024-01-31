import { configureStore } from '@reduxjs/toolkit';

import authTokenSlice from './authToken-slice';

const store = configureStore({
  reducer: {
    authToken: authTokenSlice.reducer
  },
});

export default store;