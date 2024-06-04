import { memo, type FC } from "react";
import { classNames } from "shared/libs/classNames/classNames";
import cls from "./Article.module.scss";
import { useTranslation } from "react-i18next";
import { type Article as ArticleInterface } from "entities/Article/model/types/article";
import { AppLink, Button, TypeButton } from "shared/ui";
import { RoutePathes } from "shared/config/routeConfig/routeConfig";

export interface ArticleProps {
  className?: string;
  article: ArticleInterface;
}

export const Article: FC<ArticleProps> = memo(({ className, article }) => {
  const { t } = useTranslation();

  const { id, title, subtitle, createAt } = article;

  return (
    <div className={classNames(cls.Article, {}, [])}>
      <div className={cls.title}>{title}</div>
      <div className={cls.text}>{subtitle}</div>
      <AppLink to={`/article-details/${id}`}>
        <Button className={cls.btn} typeBtn={TypeButton.OUTLINE}>
          {t("Read")}
        </Button>
      </AppLink>
      <div className={cls.date}>{createAt}</div>
    </div>
  );
});
