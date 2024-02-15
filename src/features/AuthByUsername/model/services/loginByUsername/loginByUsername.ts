import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { userActions, type User } from 'entities/User'
import { USER_LOCAL_KEY } from 'shared/const/lodalStorage'

interface LoginByUsernameProps {
  login: string
  password: string
}

export const loginByUsername = createAsyncThunk<User, LoginByUsernameProps>(
  'login/loginByUsername',
  async (authData, thunkAPI) => {
    try {
      const response = await axios.post<User>('http://localhost:8000/login', authData)

      if (!response.data) {
        throw new Error()
      }

      localStorage.setItem(USER_LOCAL_KEY, JSON.stringify(response.data))
      thunkAPI.dispatch(userActions.setAuthData(response.data))

      return response.data
    } catch (e) {
      console.log(e)
      return thunkAPI.rejectWithValue('Wrong login or password')
    }
  }
)
