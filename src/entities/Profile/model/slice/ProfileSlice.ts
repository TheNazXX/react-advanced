import { ProfileUpdateResponseInterface, formStructure,  requiredValidationFields } from './../types/profile';

import { type PayloadAction, createSlice } from '@reduxjs/toolkit'
import { ProfileInterface, type ProfileSchema } from '../types/profile'
import { fetchProfileData } from '../service/fetchProfileData/fetchProfileData'
import { updateProfileData } from '../service/updateProfileData/updateProfileData';

export const initialFormRequiredFields: requiredValidationFields = {
  [formStructure.FIRSTNAME]: [],
  [formStructure.LASTNAME]: []
};

const initialState: ProfileSchema = {
  data: undefined,
  form: undefined,
  formValidationErrors: initialFormRequiredFields,
  readonly: true,
  isLoading: false,
  isLoadingUpdateProfile: false,
  fetchError: undefined,
  updateError: undefined,
  successUpdate: undefined
}

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setReadonly: (state, action: PayloadAction<boolean>) => {
      state.readonly = action.payload;
    },
    updateProfile: (state, action: PayloadAction<ProfileInterface>) => {
      state.form = {
        ...state.form,
        ...action.payload
      }
    },
    cancelEdit: (state) => {
      state.readonly = true;
      state.form = state.data;
      state.formValidationErrors = initialFormRequiredFields;
    },
    setValidationErrors: (state, action: PayloadAction<requiredValidationFields>) => {
      state.formValidationErrors = action.payload;
    },
    resetValidationErrors: (state, action: PayloadAction<string | undefined>) => {
      state.formValidationErrors = initialFormRequiredFields;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfileData.pending, (state, action) => {
        state.fetchError = ''
        state.isLoading = true
      })
      .addCase(fetchProfileData.fulfilled, (state, action: PayloadAction<ProfileInterface>) => {
        state.isLoading = false;
        state.data = action.payload;
        state.form = action.payload;
      })
      .addCase(fetchProfileData.rejected, (state, action) => {
        state.isLoading = false
        state.fetchError = action.payload as string
      })
      .addCase(updateProfileData.pending, (state, action) => {
        state.successUpdate = undefined;
        state.updateError = ''
        state.isLoadingUpdateProfile = true
      })
      .addCase(updateProfileData.fulfilled, (state, action: PayloadAction<ProfileUpdateResponseInterface>) => {
        state.successUpdate = action.payload.message;
        state.isLoadingUpdateProfile = false;
        state.updateError = ''
      })
      .addCase(updateProfileData.rejected, (state, action) => {
        state.successUpdate = undefined;
        state.isLoadingUpdateProfile = false
        state.updateError = action.payload
      })
  }

})

export const { actions: profileActions } = profileSlice
export const { reducer: profileReducer } = profileSlice
