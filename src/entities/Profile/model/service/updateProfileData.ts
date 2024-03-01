import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from 'app/providers/StoreProvider'
import { getProfileFormData, type ProfileInterface } from 'entities/Profile'

export const updateProfileData = createAsyncThunk<ProfileInterface, void, ThunkConfig<string>>(
  'profile/updateProfileData',
  async (_, {extra, rejectWithValue, getState}) => {

    const formData = getProfileFormData(getState());

    try {
      const response = await extra.api.put<ProfileInterface>('/profile', formData);

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
