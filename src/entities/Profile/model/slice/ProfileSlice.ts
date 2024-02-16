import { type PayloadAction, createSlice } from '@reduxjs/toolkit'
import { type ProfileSchema } from '../types/profile'

const initialState: ProfileSchema = {
  data: undefined,
  readonly: true,
  isLoading: false,
  error: undefined
}

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {

  }

})

export const { actions: profileActions } = profileSlice
export const { reducer: profileReducer } = profileSlice
