import {
  type EntityState,
  createEntityAdapter,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { type StateSchema } from "app/providers/StoreProvider";

import { type Comment } from "entities/Comment";
import { type ArticleDetailsCommentsSchema } from "../types/articlesDetailsCommenstSchema";
import { fetchCommentsByArticleId } from "../services/fetchCommentsByAtricleId";

const commentsAdapter = createEntityAdapter<Comment, string>({
  selectId: (comment: Comment) => comment.id,
});

export const getArticleComments = commentsAdapter.getSelectors<StateSchema>(
  (state) => state.articleDetailsComments || commentsAdapter.getInitialState()
);

const articleDetailseSlice = createSlice({
  name: "articleDetailsCommentsSlice",
  initialState: commentsAdapter.getInitialState<ArticleDetailsCommentsSchema>({
    isLoading: false,
    error: undefined,
    ids: [],
    entities: {},
  }),
  reducers: {
    addCommentForArticle: (state, action: PayloadAction<Comment>) => {
      commentsAdapter.addOne(state, action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCommentsByArticleId.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(
        fetchCommentsByArticleId.fulfilled,
        (state, action: PayloadAction<Comment[]>) => {
          state.isLoading = false;
          commentsAdapter.setAll(state, action.payload);
        }
      )
      .addCase(fetchCommentsByArticleId.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});

export const { reducer: articleDetailsCommentsReducer } = articleDetailseSlice;
export const { actions: articleDetailsCommentsActions } = articleDetailseSlice;
