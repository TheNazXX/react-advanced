import { type EntityState } from "@reduxjs/toolkit";
import { type Article } from "entities/Article";

export interface ArticleRecommendationSchema
  extends EntityState<Article, string> {
  isLoading?: boolean;
  error: string;
}
