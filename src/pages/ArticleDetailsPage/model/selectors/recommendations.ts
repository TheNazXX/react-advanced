import { StateSchema } from "app/providers/StoreProvider";

export const getArticleRecommendationIsLoading = (state: StateSchema) =>
  state.articlesRecommendations?.isLoading || false;

export const getArticleRecommendationError = (state: StateSchema) =>
  state.articlesRecommendations?.error;
