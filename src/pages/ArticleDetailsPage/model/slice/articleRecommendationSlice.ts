import {
  type PayloadAction,
  createSlice,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { StateSchema } from "app/providers/StoreProvider";
import { Article } from "entities/Article";
import { fetchArticlesRecommendations } from "../services/fetchArticlesRecommendations";

const initialState = {
  ids: [],
  isLoading: false,
  error: "",
  entities: {},
};

const ArticleRecommendationAdapter = createEntityAdapter<Article, string>({
  selectId: (article) => article.id,
});

export const getArticleRecommendation =
  ArticleRecommendationAdapter.getSelectors<StateSchema>(
    (state) =>
      state.articlesRecommendations ||
      ArticleRecommendationAdapter.getInitialState()
  );

export const articleRecommendationSlice = createSlice({
  name: "articleRecommendationSlice",
  initialState: ArticleRecommendationAdapter.getInitialState(initialState),
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticlesRecommendations.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchArticlesRecommendations.fulfilled, (state, action) => {
        state.isLoading = false;
        ArticleRecommendationAdapter.setAll(state, action.payload);
      })
      .addCase(fetchArticlesRecommendations.rejected, (state, action) => {
        state.error = action.payload as string;
        state.isLoading = false;
      });
  },
});

export const { actions: articleRecommendationActions } =
  articleRecommendationSlice;
export const { reducer: articleRecommendationReducer } =
  articleRecommendationSlice;
