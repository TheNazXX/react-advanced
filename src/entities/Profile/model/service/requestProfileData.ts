import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from 'app/providers/StoreProvider'
import { type ProfileInterface } from 'entities/Profile'

export const requestProfileData = createAsyncThunk<ProfileInterface, void, ThunkConfig<string>>(
  'profile/fetchProfileData',
  async (_, {extra, rejectWithValue}) => {
    try {
      const response = await extra.api.get<ProfileInterface>('/profile')

      if (!response.data) {
        throw new Error()
      }
      return response.data
    } catch (e) {
      console.log(e)
      return rejectWithValue('Could not to fetch')
    }
  }
)
