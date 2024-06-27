import { type EntityState } from "@reduxjs/toolkit";
import { type Article } from "entities/Article";
import {
  ArticleSortField,
  ArticleType,
  type ArticlesListView,
} from "entities/Article/model/types/article";
import { SortOrder } from "shared/types";

export interface ArticlesSchema extends EntityState<Article, string> {
  isLoading?: boolean;
  error?: string;

  view: ArticlesListView;

  page: number;
  limit: number;
  hasMore: boolean;

  order: SortOrder;
  sort: ArticleSortField;
  search: string;
  type: ArticleType;

  _inited: boolean;
}
