import { type PayloadAction, createSlice } from '@reduxjs/toolkit'
import { type LoginSchema } from '../types/loginSchema'
import { loginByUsername } from '../services/loginByUsername/loginByUsername'

const initialState: LoginSchema = {
  isLoading: false,
  login: '',
  password: '',
  error: ''
}

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {

    setUserName: (state, action: PayloadAction<string>) => {
      state.login = action.payload
    },

    setUserPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(loginByUsername.pending, (state, action) => {
      state.error = '';
      state.isLoading = true;
    })
    .addCase(loginByUsername.fulfilled, (state, action) => {
      state.isLoading = false;

    })
    .addCase(loginByUsername.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    })
  }
})

export const { actions: loginActions } = loginSlice
export const { reducer: loginReducer } = loginSlice
