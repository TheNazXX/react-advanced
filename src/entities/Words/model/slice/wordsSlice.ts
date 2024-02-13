import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { WordsSchema } from "../types/wordsSchema";
import { Word } from "../types/wordsSchema";
import { RequestWords } from "../services/RequestWords";

const initialState: WordsSchema = {
  words: [],
  isLoading: false,
  error: '',
};

export const wordsSlice = createSlice({
  name: 'words',
  initialState,
  reducers: {
    setWords: (state, action: PayloadAction<Word[]>) => {
      state.words = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(RequestWords.pending, (state, action) => {
        state.isLoading = true
        state.error = ''
      })
      .addCase(RequestWords.fulfilled, (state, action) => {
        state.isLoading = false
      })
  }
});


export const { actions: wordsActions } = wordsSlice;
export const { reducer: wordsReducer } = wordsSlice;
