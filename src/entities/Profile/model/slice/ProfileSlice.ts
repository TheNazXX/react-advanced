import { type PayloadAction, createSlice } from '@reduxjs/toolkit'
import { ProfileInterface, type ProfileSchema } from '../types/profile'
import { fetchProfileData } from '../service/fetchProfileData'

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
    setProfile: (state, action: PayloadAction<ProfileInterface>) => {

    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfileData.pending, (state, action) => {
        state.error = ''
        state.isLoading = true
      })
      .addCase(fetchProfileData.fulfilled, (state, action: PayloadAction<ProfileInterface>) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchProfileData.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
  }

})

export const { actions: profileActions } = profileSlice
export const { reducer: profileReducer } = profileSlice
