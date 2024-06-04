import { type PayloadAction, createSlice } from "@reduxjs/toolkit";
import { type ArticlesSchema } from "../types/ArticlesSchema";
import { fetchArticles } from "../services/fetchArticles";
import { type Article } from "entities/Article";

const initialState: ArticlesSchema = {
  data: [],
  isLoading: false,
  error: "",
};

export const articlesSlice = createSlice({
  name: "ArticlesSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        fetchArticles.fulfilled,
        (state, action: PayloadAction<Article[]>) => {
          state.isLoading = false;
          state.data = action.payload;
        }
      );
  },
});

export const { actions: articlesActions } = articlesSlice;
export const { reducer: articlesReducer } = articlesSlice;
