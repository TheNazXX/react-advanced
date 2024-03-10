import axios, { Axios, AxiosResponse } from 'axios'

import { createAsyncThunk } from '@reduxjs/toolkit'
import { type Word } from '../types/wordsSchema'
import { wordsActions } from '../slice/wordsSlice'

export const requestWords = createAsyncThunk(
  'words/RequestWords',
  async (_, thunkAPI) => {
    try {
      const response: AxiosResponse<Word[]> = await axios.get('http://apiwords/words')
      
      if (!response.data) {
        throw new Error()
      }

      thunkAPI.dispatch(wordsActions.setWords(response.data))

      return response.data
    } catch (e: any) {
      const errorText = e.response?.data?.message || 'Something went wrong'; 
      return thunkAPI.rejectWithValue(errorText);
    }
  }
)
