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
        throw new Error('Could not to fetch')
      }

      thunkAPI.dispatch(repeatWordsActions.setWords(response.data as Word[]))

      return response.data
    } catch (e) {
      console.log(e)
      return thunkAPI.rejectWithValue('Something went wrong')
    }
  }
)
