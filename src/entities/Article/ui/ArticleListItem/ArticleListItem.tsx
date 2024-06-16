import React, { memo, useCallback, useEffect, type FC } from "react";
import { classNames } from "shared/libs/classNames/classNames";
import cls from "./ArticlelistItem.module.scss";
import { useTranslation } from "react-i18next";
import {
  ArticlesListView,
  type Article,
} from "entities/Article/model/types/article";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { useHover } from "shared/libs/hooks/useHover/useHover";
import { Button, TypeButton } from "shared/ui";
import { useNavigate } from "react-router";
import { RoutePathes } from "shared/config/routeConfig/routeConfig";
import { motion } from "framer-motion";

interface ArticleView {
  article: Article;
  onOpenArticle: () => void;
  index?: number;
}

export interface ArticlelistItemProps {
  className?: string;
  article: Article;
  view: ArticlesListView;
  index?: number;
}

export const ArticleListItem: FC<ArticlelistItemProps> = memo(
  ({ className, article, view, index }) => {
    const navigate = useNavigate();

    const onOpenArticle = useCallback(() => {
      navigate(RoutePathes.article_details + article.id);
    }, []);

    switch (view) {
      case ArticlesListView.TILE:
        return (
          <ArticleListItemTileView
            index={index}
            article={article}
            onOpenArticle={onOpenArticle}
          />
        );
      case ArticlesListView.LIST:
        return (
          <ArticleListItemListView
            index={index}
            article={article}
            onOpenArticle={onOpenArticle}
          />
        );
    }
  }
);

const ArticleListItemListView = ({
  article,
  onOpenArticle,
  index = 1,
}: ArticleView) => {
  const { t } = useTranslation();

  return (
    <div className="p-6 border-2 border-[var(--color-200)] rounded-md">
      <div className="flex justify-between items-center">
        <img
          className="w-20 h-20 rounded-full"
          src={article?.user?.avatar}
          alt="avatar"
        />
        <span>{article.createAt}</span>
      </div>
      <h4 className="my-4 text-2xl text-[var(--color-200)]">{article.title}</h4>
      <div className="mb-2">{article.type?.join(", ")}</div>
      <p className="max-h-[100px] overflow-hidden mb-6">{article.subtitle}</p>

      <div className="flex items-center justify-between">
        <Button onClick={onOpenArticle} typeBtn={TypeButton.PRIMARY}>
          {t("Read more...")}
        </Button>
        <div className="flex items-center gap-2">
          <div className="ml-auto">{article.views}</div>
          <FontAwesomeIcon icon={faEye} />
        </div>
      </div>
    </div>
  );
};

const ArticleListItemTileView = ({
  article,
  onOpenArticle,
  index = 1,
}: ArticleView) => {
  const [isHover, bindHover] = useHover();

  return (
    <div
      onClick={onOpenArticle}
      {...bindHover}
      className="group w-60 p-2 border-2 rounded-md border-[var(--color-200)] cursor-pointer transition-all hover:scale-[1.05]"
    >
      <div className="relative">
        <img
          className="w-full h-52 rounded-md"
          src={article.img}
          alt="artice-img"
        />
        <span className="absolute top-1 right-1 z-10 text-black font-semibold opacity-0 group-hover:opacity-100 transition-all">
          {article.createAt}
        </span>
      </div>
      <div className="flex justify-between mt-2 px-2">
        <div className={cls.type}>{article?.type?.join(", ")}</div>
        <div className="flex items-center gap-2">
          <div className="ml-auto">{article.views}</div>
          <FontAwesomeIcon icon={faEye} />
        </div>
      </div>
    </div>
  );
};
