import { type PayloadAction, createSlice } from '@reduxjs/toolkit'
import { type RepeatWordsSchema } from '../types/RepeatWordsSchema'
import { type Word } from 'entities/Words'
import { requestRepeatWords } from '../services/RequestRepeatWords'
import { sendRepeatWords } from '../services/SendRepeatWords'

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
      .addCase(requestRepeatWords.pending, (state, action) => {
        state.getIsLoading = true
        state.getIsError = ''
      })
      .addCase(requestRepeatWords.fulfilled, (state, action) => {
        state.getIsLoading = false
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
