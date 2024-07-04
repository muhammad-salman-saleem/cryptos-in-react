import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    resetToken: (state) => {
      state.token = null;
    }
  }
});

export const { setToken, resetToken } = authSlice.actions;
export const selectToken = (state) => state.auth.token;
export default authSlice.reducer;
