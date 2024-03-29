import { type PayloadAction, createSlice } from '@reduxjs/toolkit'
import { type RepeatWordsSchema } from '../types/RepeatWordsSchema'
import { type Word } from 'entities/Words'
import { fetchRepeatWords } from '../services/fetchRepeatWords'
import { sendRepeatWords } from '../services/sendRepeatWords'

const initialState: RepeatWordsSchema = {
  words: [],

  getIsLoading: false,
  getIsError: '',

  sendIsLoading: false,
  sendIsError: ''
}

export const RepeatWordsSlice = createSlice({
  name: 'repeatWords',
  initialState,
  reducers: {
    setWords: (state, action: PayloadAction<Word[]>) => {
      state.words = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRepeatWords.pending, (state, action) => {
        state.getIsLoading = true
        state.getIsError = ''
      })
      .addCase(fetchRepeatWords.fulfilled, (state, action) => {
        state.getIsLoading = false
      })
      .addCase(fetchRepeatWords.rejected, (state, action) => {
        state.getIsLoading = false
        state.getIsError = action.payload as string
      })
      .addCase(sendRepeatWords.pending, (state, action) => {
        state.sendIsLoading = true
      })
      .addCase(sendRepeatWords.fulfilled, (state, action) => {
        state.sendIsLoading = false
      })
      .addCase(sendRepeatWords.rejected, (state, action) => {
        state.sendIsLoading = false
        state.sendIsError = action.payload as string
      })
  }

})

export const { actions: repeatWordsActions } = RepeatWordsSlice
export const { reducer: repeatWordsReducer } = RepeatWordsSlice
