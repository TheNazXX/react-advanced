import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from 'app/providers/StoreProvider'
import { userActions, type User } from 'entities/User'
import { USER_LOCAL_KEY } from 'shared/const/lodalStorage'

interface LoginByUsernameProps {
  login: string
  password: string
}

export const loginByUsername = createAsyncThunk<User, LoginByUsernameProps, ThunkConfig<string>>(
  'login/loginByUsername',
  async (authData, {extra, dispatch, rejectWithValue}) => { // authData, thunkAPI
    try {

      const response = await extra.api.post<User>('/login', authData)
      
      extra.navigate('/profile');

      if (!response.data) {
        throw new Error()
      }

      localStorage.setItem(USER_LOCAL_KEY, JSON.stringify(response.data))
      dispatch(userActions.setAuthData(response.data))

      return response.data
    } catch (e) {
      console.log(e)
      return rejectWithValue('Wrong login or password')
    }
  }
)
