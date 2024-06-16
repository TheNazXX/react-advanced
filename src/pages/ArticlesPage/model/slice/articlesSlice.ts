import {
  type PayloadAction,
  createSlice,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { type ArticlesSchema } from "../types/ArticlesSchema";
import { fetchArticles } from "../services/fetchArticles";
import { type Article } from "entities/Article";
import { ArticlesListView } from "entities/Article/model/types/article";
import { type StateSchema } from "app/providers/StoreProvider";
import { ARTICLE_VIEW_LOCAL_KEY } from "shared/const/localStorage";

const articlesAdapter = createEntityAdapter<Article, string>({
  selectId: (article) => article.id,
});

export const getArticles = articlesAdapter.getSelectors<StateSchema>(
  (state) => state.articles || articlesAdapter.getInitialState()
);

const initialState: ArticlesSchema = {
  isLoading: false,
  error: "",

  ids: [],
  entities: {},
  view: ArticlesListView.LIST,
  page: 1,
  limit: 6,
  hasMore: true,
  _inited: false,
};

export const articlesSlice = createSlice({
  name: "ArticlesSlice",
  initialState: articlesAdapter.getInitialState<ArticlesSchema>(initialState),
  reducers: {
    toggleView: (state, action: PayloadAction<ArticlesListView>) => {
      state.view = action.payload;
      localStorage.setItem(ARTICLE_VIEW_LOCAL_KEY, action.payload);
    },
    init: (state) => {
      const view = localStorage.getItem(
        ARTICLE_VIEW_LOCAL_KEY
      ) as ArticlesListView;
      state.view = view;
      state.limit = view === ArticlesListView.LIST ? 4 : 6;
      state._inited = true;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        fetchArticles.fulfilled,
        (state, action: PayloadAction<Article[]>) => {
          state.isLoading = false;
          articlesAdapter.addMany(state, action.payload);
          state.hasMore = action.payload.length > 0;
        }
      );
  },
});

export const { actions: articlesActions } = articlesSlice;
export const { reducer: articlesReducer } = articlesSlice;
