import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

//setting initial state
const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  token: localStorage.getItem('token') || null,
};

//create async thunk to create user.
export const createUserAsync = createAsyncThunk(
  'user/createUser',
  async (payload) => {
    try {
      const response = await fetch('http://localhost:8000/api/user/sign-up', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      return response.json();
    } catch (error) {
      console.log('Error in creating user', error);
    }
  }
);

//CAT for sign-in user
export const signInAsync = createAsyncThunk(
  'user/signIn',
  async (payload) => {
    try {
      //call an API to send 
      const response = await fetch('http://localhost:8000/api/user/sign-in', {
        method: 'post',
        headers: {
          "Content-Type": 'application/json'
        },
        body: JSON.stringify(payload)
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to sign in');
      }

      return await response.json();

    } catch (error) {
      console.log('Error in signing in', error);
      throw error;
    }
  }
);

//create slice for user reducer.
const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    }
  },
  //extra reducer to handle response from API.
  extraReducers: (builder) => {
    builder.addCase(signInAsync.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem('user', JSON.stringify(action.payload.user));
      localStorage.setItem('token', action.payload.token);
    });
  }
});

export const { logout } = userSlice.actions;
export const userReducer = userSlice.reducer;
export const userSelector = (state) => state.userReducer.user;
export const tokenSelector = (state) => state.userReducer.token;
