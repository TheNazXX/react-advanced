import { type PayloadAction, createSlice } from '@reduxjs/toolkit'
import { type LoginSchema } from '../types/loginSchema'

const initialState: LoginSchema = {
  isLoading: false,
  login: '',
  password: ''
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
  }
})

export const { actions: loginActions } = loginSlice
export const { reducer: loginReducer } = loginSlice
