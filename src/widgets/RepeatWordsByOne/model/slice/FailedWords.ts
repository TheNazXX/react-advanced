import { type PayloadAction, createSlice } from '@reduxjs/toolkit'
import { type FailedWordsSchema } from '../types/FailedWordsSchema'
import { type Word } from 'entities/Words'

const initialState: FailedWordsSchema = {
  failedWords: []
}

const FailedWordsSlice = createSlice({
  name: 'failedWords',
  initialState,
  reducers: {
    setFailedWords: (state, action: PayloadAction<Word>) => {
      state.failedWords.push(action.payload)
    }
  }
})

export const { actions: failedWordsActions } = FailedWordsSlice
export const { reducer: failedWordsReducer } = FailedWordsSlice
