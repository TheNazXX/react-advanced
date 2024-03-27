import { type PayloadAction, createSlice } from '@reduxjs/toolkit'
import { type WordsSchema, type Word } from '../types/wordsSchema'

import { requestWords } from '../services/RequestWords'

const initialState: WordsSchema = {
  words: [],
  isLoading: false,
  error: ''
}

export const wordsSlice = createSlice({
  name: 'words',
  initialState,
  reducers: {
    setWords: (state, action: PayloadAction<Word[]>) => {
      state.words = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(requestWords.pending, (state, action) => {
        state.isLoading = true
        state.error = ''
      })
      .addCase(requestWords.fulfilled, (state, action) => {
        state.isLoading = false
      })
      .addCase(requestWords.rejected, (state, action) => {
        state.error = action.payload as string
        state.isLoading = false
      })
  }
})

export const { actions: wordsActions } = wordsSlice
export const { reducer: wordsReducer } = wordsSlice
