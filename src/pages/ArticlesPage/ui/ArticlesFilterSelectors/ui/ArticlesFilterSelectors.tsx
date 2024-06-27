import { memo, type FC } from "react";
import { classNames } from "shared/libs/classNames/classNames";
import { useTranslation } from "react-i18next";
import { Select } from "shared/ui";
import {
  articlesSortByOptions,
  articlesOrderByOptions,
} from "../model/filters";
import { ArticleSortField } from "entities/Article/model/types/article";
import { useAppDispatch } from "shared/libs/hooks/useAppDispatch/useAppDispatch";
import { articlesActions } from "pages/ArticlesPage/model/slice/articlesSlice";
import { TypeSelect } from "shared/ui/Select/Select";
import { type SortOrder } from "shared/types";
import { fetchArticles } from "pages/ArticlesPage/model/services/fetchArticles";

export interface ArticlesFilterSelectorsProps {
  className?: string;
}

export const ArticlesFilterSelectors: FC<ArticlesFilterSelectorsProps> = memo(
  ({ className }) => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();

    const onChageArticlesSort = (value: ArticleSortField) => {
      dispatch(articlesActions.setSort(value));
      dispatch(articlesActions.setPage(1));
      dispatch(fetchArticles({ replace: true }));
    };

    const onChageArticlesOrder = (value: SortOrder) => {
      dispatch(articlesActions.setOrder(value));
      dispatch(articlesActions.setPage(1));
      dispatch(fetchArticles({ replace: true }));
    };

    return (
      <div className={classNames("flex items-center", {}, [])}>
        <div className="flex items-center gap-2 whitespace-nowrap">
          Sort by:{" "}
          <Select
            onChange={onChageArticlesSort}
            options={articlesSortByOptions}
          />
        </div>
        <div className="flex items-center gap-2 whitespace-nowrap">
          Order by:{" "}
          <Select
            options={articlesOrderByOptions}
            onChange={onChageArticlesOrder}
          />
        </div>
      </div>
    );
  }
);
