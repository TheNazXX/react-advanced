import { type PayloadAction, createSlice } from "@reduxjs/toolkit";
import { type RepeatWordsSchema } from "../types/RepeatWordsSchema";
import { type Word } from "entities/Words";
import { fetchRepeatWords } from "../services/fetchRepeatWords";
import { postRepeatWords } from "../services/postRepeatWords";

const initialState: RepeatWordsSchema = {
  words: [],

  isPostedSuccess: false,

  getIsLoading: false,
  getIsError: "",

  postIsLoading: false,
  postIsError: "",
};

export const RepeatWordsSlice = createSlice({
  name: "repeatWords",
  initialState,
  reducers: {
    setWords: (state, action: PayloadAction<Word[]>) => {
      state.words = action.payload;
    },
    addWord: (state, action: PayloadAction<Word>) => {
      state.words.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRepeatWords.pending, (state, action) => {
        state.getIsLoading = true;
        state.getIsError = "";
      })
      .addCase(
        fetchRepeatWords.fulfilled,
        (state, action: PayloadAction<Word[]>) => {
          state.words = action.payload;
          state.getIsLoading = false;
        }
      )
      .addCase(fetchRepeatWords.rejected, (state, action) => {
        state.getIsLoading = false;
        state.getIsError = action.payload as string;
      })
      .addCase(postRepeatWords.pending, (state, action) => {
        state.postIsLoading = true;
        state.isPostedSuccess = false;
        state.postIsError = "";
      })
      .addCase(
        postRepeatWords.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.words = action.payload.word;
          state.isPostedSuccess = true;
          state.postIsLoading = false;
        }
      )
      .addCase(postRepeatWords.rejected, (state, action) => {
        state.postIsLoading = false;
        state.postIsError = action.payload as string;
      });
  },
});

export const { actions: repeatWordsActions } = RepeatWordsSlice;
export const { reducer: repeatWordsReducer } = RepeatWordsSlice;
