import { type StateSchema } from "app/providers/StoreProvider";
import { type Article } from "entities/Article";

export const getArticlesIsLoading = (state: StateSchema) =>
  state.articles?.isLoading;

export const getArticlesData = (state: StateSchema): Article[] | undefined => {
  return state.articles?.data;
};
