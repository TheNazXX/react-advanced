import { ArticleSortField } from "entities/Article/model/types/article";

export const articlesSortByOptions = [
  {
    label: "date",
    value: ArticleSortField.CREATED,
  },
  {
    label: "title",
    value: ArticleSortField.TITLE,
  },
  {
    label: "views",
    value: ArticleSortField.VIEWS,
  },
];

export const articlesOrderByOptions = [
  {
    label: "asc",
    value: "asc",
  },
  {
    label: "desc",
    value: "desc",
  },
];
