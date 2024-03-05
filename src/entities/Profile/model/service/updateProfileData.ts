import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from 'app/providers/StoreProvider'
import { getProfileFormData, type ProfileInterface, ProfileUpdateResponseInterface } from 'entities/Profile'

export const updateProfileData = createAsyncThunk<ProfileUpdateResponseInterface, void, ThunkConfig<string>>(
  'profile/updateProfileData',
  async (_, {extra, rejectWithValue, getState}) => {

    const formData = getProfileFormData(getState());

    try {
      const response = await extra.api.put<ProfileUpdateResponseInterface>('/profile', formData);
      
      if (!response.data) {
        throw new Error('Something went wrong');
      }

      return response.data
    } catch (e: any) {
      const errorMessage = e.response?.data?.message || 'Failed to update profile';
      return rejectWithValue(errorMessage);
    }
  }
)
