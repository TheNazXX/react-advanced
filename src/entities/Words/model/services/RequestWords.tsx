import axios from 'axios'

import { createAsyncThunk } from '@reduxjs/toolkit'
import { type Word } from '../types/wordsSchema'
import { wordsActions } from '../slice/wordsSlice'

export const requestWords = createAsyncThunk<Word[], null>(
  'words/RequestWords',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('http://localhost:8000/words')

      if (!response.data) {
        throw new Error()
      }

      thunkAPI.dispatch(wordsActions.setWords(response.data as Word[]))

      return response.data
    } catch (e) {
      console.log(e)
      return thunkAPI.rejectWithValue('Wrong login or password')
    }
  }
)
