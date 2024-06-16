import { type EntityState } from "@reduxjs/toolkit";
import { type Article } from "entities/Article";
import { type ArticlesListView } from "entities/Article/model/types/article";

export interface ArticlesSchema extends EntityState<Article, string> {
  isLoading?: boolean;
  error?: string;

  view: ArticlesListView;

  page: number;
  limit: number;
  hasMore: boolean;

  _inited: boolean;
}
