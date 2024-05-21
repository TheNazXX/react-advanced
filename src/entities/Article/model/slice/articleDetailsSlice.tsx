import { createSlice } from "@reduxjs/toolkit";
import { type ArticleDetailsSchema } from "../types/articleDetailsSchema";

const initialState: ArticleDetailsSchema = {
  isLoading: false,
  error: "",
  data: undefined,
};

export const ArticleDetailsSlice = createSlice({
  name: "ArticleDetails",
  initialState,
  reducers: {},
});

export const { actions: articleDetailsActions } = ArticleDetailsSlice;
export const { reducer: articleDetailsReducer } = ArticleDetailsSlice;
