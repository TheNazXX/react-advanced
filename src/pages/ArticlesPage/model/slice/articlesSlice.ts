import {
  type PayloadAction,
  createSlice,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { type ArticlesSchema } from "../types/ArticlesSchema";
import { fetchArticles } from "../services/fetchArticles";
import { type Article } from "entities/Article";
import {
  ArticleSortField,
  ArticleType,
  ArticlesListView,
} from "entities/Article/model/types/article";
import { type StateSchema } from "app/providers/StoreProvider";
import { ARTICLE_VIEW_LOCAL_KEY } from "shared/const/localStorage";
import { SortOrder } from "shared/types";

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
  sort: ArticleSortField.CREATED,
  search: "",
  order: "asc",
  _inited: false,
  type: ArticleType.ALL,
};

export const articlesSlice = createSlice({
  name: "ArticlesSlice",
  initialState: articlesAdapter.getInitialState<ArticlesSchema>(initialState),
  reducers: {
    toggleView: (state, action: PayloadAction<ArticlesListView>) => {
      state.view = action.payload;
      localStorage.setItem(ARTICLE_VIEW_LOCAL_KEY, action.payload);
    },
    init: (state, action: PayloadAction<Record<string, any>>) => {
      const view = localStorage.getItem(
        ARTICLE_VIEW_LOCAL_KEY
      ) as ArticlesListView;
      state.view = view;
      state.limit = view === ArticlesListView.LIST ? 4 : 6;
      state._inited = true;

      state.order = action.payload.order;
      state.sort = action.payload.sort;
      state.search = action.payload.search;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setOrder: (state, action: PayloadAction<SortOrder>) => {
      state.order = action.payload;
    },
    setSort: (state, action: PayloadAction<ArticleSortField>) => {
      state.sort = action.payload;
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    setType: (state, action: PayloadAction<ArticleType>) => {
      state.type = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, (state, action) => {
        state.isLoading = true;

        if (action.meta.arg.replace) {
          articlesAdapter.removeAll(state);
        }
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.isLoading = false;
        articlesAdapter.addMany(state, action.payload);
        state.hasMore = action.payload.length >= state.limit;

        if (action.meta.arg.replace) {
          articlesAdapter.setAll(state, action.payload);
        } else {
          articlesAdapter.addMany(state, action.payload);
        }
      });
  },
});

export const { actions: articlesActions } = articlesSlice;
export const { reducer: articlesReducer } = articlesSlice;
