
import { type PayloadAction, createSlice } from '@reduxjs/toolkit'
import { ProfileInterface, type ProfileSchema } from '../types/profile'
import { fetchProfileData } from '../service/fetchProfileData'
import { Rules, RulesProps, validation } from 'shared/libs/validation/validation'


const initialState: ProfileSchema = {
  data: undefined,
  form: undefined,
  formValidation: undefined,
  readonly: true,
  isLoading: false,
  error: undefined
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
    },
    checkValidation: (state) => {
      state.formValidation = {
        firstname: validation(state.form?.firstname || '', {[Rules.REQUIRED]: true} as RulesProps),
        lastname: validation(state.form?.lastname || '', {[Rules.REQUIRED]: true} as RulesProps)
      }
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
        state.form = action.payload;
      })
      .addCase(fetchProfileData.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
  }

})

export const { actions: profileActions } = profileSlice
export const { reducer: profileReducer } = profileSlice
