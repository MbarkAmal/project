import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUSER: null,
    isFetching: false,
    error: false,
    registerError: false,
  },
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUSER = action.payload;
    },
    loginFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    registerStart: (state) => {
      state.isFetching = true;
      state.registerError = false; // Reset registration errors on new attempt
    },
    registerSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUSER = action.payload; // Optionally login user upon registration
    },
    registerFailure: (state) => {
      state.isFetching = false;
      state.registerError = true;
    },
  },
});
export const {
  loginStart,
  loginSuccess,
  loginFailure,
  registerStart,
  registerSuccess,
  registerFailure,
} = userSlice.actions;

export default userSlice.reducer;
