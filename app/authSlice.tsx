import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';

// Define a type for the slice state

interface User {
  id: number;
  username: string;
}
interface authState {
  User: User;
}

// Define the initial state using that type
const initialState: authState = {
  User: {
    id: 0,
    username: '',
  },
};

export const authSlice = createSlice({
  name: 'authSlice',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    // setCode: (state, action: PayloadAction<string>) => {
    //   state.id = action.payload;
    // },
    setUser: (state, action: PayloadAction<User>) => {
      state.User = action.payload;
    },
  },
});

export const { setUser } = authSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectAuth = (state: RootState) => state.auth;

export default authSlice.reducer;
