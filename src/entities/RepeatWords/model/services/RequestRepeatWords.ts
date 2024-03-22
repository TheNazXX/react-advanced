import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { repeatWordsActions } from '../slice/repeatWordsSlice'
import { type Word } from 'entities/Words'

export const requestRepeatWords = createAsyncThunk(
  'getRepeatWords',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('http://localhost:8000/repeat')

      if (!response.data) {
        throw new Error('Something went wrong')
      };

      thunkAPI.dispatch(repeatWordsActions.setWords(response.data as Word[]))
      return response.data
    } catch (e: any) {
      console.log(e)
      const errorText = e.response?.data?.message || 'Could not to load repeatWords'; 
      return thunkAPI.rejectWithValue(errorText)
    }
  }
)
