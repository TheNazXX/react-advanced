import { memo, useEffect, type FC } from "react";
import { classNames } from "shared/libs/classNames/classNames";
import cls from "./ArticleList.module.scss";
import { useTranslation } from "react-i18next";
import {
  ArticlesListView,
  type Article,
} from "entities/Article/model/types/article";
import { ArticleListItem } from "../ArticleListItem/ArticleListItem";
import { v4 as uuidv4 } from "uuid";
import { Loader } from "shared/ui";

export interface ArticleListProps {
  className?: string;
  articles: Article[];
  isLoading: boolean;
  view: ArticlesListView;
}

export const ArticleList: FC<ArticleListProps> = memo(
  ({ className, articles, isLoading, view = ArticlesListView.TILE }) => {
    const { t } = useTranslation();

    const renderItems = (item: Article, idx: number) => {
      return (
        <ArticleListItem
          key={uuidv4()}
          view={view}
          article={item}
          index={idx}
        />
      );
    };

    return (
      <>
        <div
          className={`${
            ArticlesListView.TILE === view
              ? "flex justify-center flex-wrap gap-6"
              : "flex flex-col gap-8"
          } ${className}`}
        >
          {articles.length > 0 ? articles.map(renderItems) : null}
        </div>
        {isLoading && <Loader className="mx-auto mt-8" />}
      </>
    );
  }
);
