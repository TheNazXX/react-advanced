import { type StateSchema } from "app/providers/StoreProvider";
import {
  ArticleSortField,
  ArticleType,
} from "entities/Article/model/types/article";

export const getArticlesIsLoading = (state: StateSchema) =>
  state.articles?.isLoading;

export const getArticlesListView = (state: StateSchema) => state.articles?.view;

export const getArticlesFetchLimit = (state: StateSchema) =>
  state.articles?.limit || 6;

export const getArticlesPageNum = (state: StateSchema) =>
  state.articles?.page || 1;
export const getArticlesPageHasMore = (state: StateSchema) =>
  state.articles?.hasMore;

export const getArticlesInited = (state: StateSchema) =>
  state.articles?._inited;

export const getArticlesSearchValue = (state: StateSchema) =>
  state.articles?.search || "";

export const getArticlesSortValue = (state: StateSchema) =>
  state.articles?.sort || ArticleSortField.CREATED;

export const getArticlesOrderValue = (state: StateSchema) =>
  state.articles?.order || "asc";

export const getArticlesType = (state: StateSchema) =>
  state.articles?.type || ArticleType.ALL;
