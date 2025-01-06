import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    //? Sign Up Start:
    signUpStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    //? Sign Up Success:
    signUpSuccess: (state, action) => {
      state.isLoading = false;
      state.currentUser = action.payload;
      state.error = null;
    },
    //? SignUp Failure:
    signUpFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.currentUser = null;
    },
    //? SignInStart:
    signInStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    //? SignInSuccess:
    signInSuccess: (state, action) => {
      state.isLoading = false;
      state.currentUser = action.payload;
      state.error = null;
    },
    //? SignInFailure:
    signInFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    //? SignOut start:
    signOutStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    //? SignOut success:
    signOutSuccess: (state) => {
      state.isLoading = false;
      state.currentUser = null;
      state.error = null;
    },
    //? SignOut failure:
    signOutFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  signUpStart,
  signUpSuccess,
  signUpFailure,
  signInStart,
  signInSuccess,
  signInFailure,
  signOutStart,
  signOutSuccess,
  signOutFailure,
} = userSlice.actions;

export default userSlice.reducer;
