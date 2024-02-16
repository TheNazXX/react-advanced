import { createAsyncThunk } from '@reduxjs/toolkit'
import { type Word } from 'entities/Words'
import axios from 'axios'
import { repeatWordsActions } from '../slice/repeatWordsSlice'

export const sendRepeatWords = createAsyncThunk(
  'sendRepeatWords',
  async (words: Word[], thunkAPI) => {
    try {
      const response = await axios.post<Word[]>('http://localhost:8000/repeatWords', words)

      if (!response.data) {
        throw new Error('Something went wrong')
      }

      thunkAPI.dispatch(repeatWordsActions.setWords(words))
      return response.data
    } catch (e) {
      console.log(e)
      return thunkAPI.rejectWithValue('Something went wrong')
    }
  }
)
