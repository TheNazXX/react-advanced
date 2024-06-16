import { type StateSchema } from "app/providers/StoreProvider";

export const getArticlesIsLoading = (state: StateSchema) =>
  state.articles?.isLoading;

export const getArticlesListView = (state: StateSchema) => state.articles?.view;

export const getArticlesFetchLimit = (state: StateSchema) =>
  state.articles?.limit;

export const getArticlesPageNum = (state: StateSchema) =>
  state.articles?.page || 1;
export const getArticlesPageHasMore = (state: StateSchema) =>
  state.articles?.hasMore;

export const getArticlesInited = (state: StateSchema) =>
  state.articles?._inited;
