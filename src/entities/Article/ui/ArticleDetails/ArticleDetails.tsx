import { memo, useEffect, type FC } from "react";
import { useTranslation } from "react-i18next";
import { classNames } from "shared/libs/classNames/classNames";
import cls from "./ArticleDetails.module.scss";
import { DynamicModuleLoader } from "shared/libs/components/DynamicModuleLoader/DynamicModuleLoader";
import { articleDetailsReducer } from "entities/Article/model/slice/articleDetailsSlice";
import { useAppDispatch } from "shared/libs/hooks/useAppDispatch/useAppDispatch";
import { fetchArticleById } from "entities/Article/model/services/fetchArticleById/fetchArticleById";
import { useSelector } from "react-redux";
import {
  getArticleDetailsData,
  getArticleDetailsError,
  getArticleDetailsIsLoading,
} from "entities/Article/model/selectors/articleDetails";
import { Loader, Skeleton } from "shared/ui";

export interface ArticleDetailsProps {
  className?: string;
  _id: string;
}

const reducers = {
  articleDetails: articleDetailsReducer,
};

export const ArticleDetails: FC<ArticleDetailsProps> = memo(
  ({ className, _id }) => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();

    const isLoading = useSelector(getArticleDetailsIsLoading);
    const article = useSelector(getArticleDetailsData);
    const error = useSelector(getArticleDetailsError);

    useEffect(() => {
      dispatch(fetchArticleById(_id));
    }, [dispatch, _id]);

    let content;

    if (isLoading) {
      content = (
        <div>
          <Loader />
        </div>
      );
    } else if (error) {
      content = <div>{t("Something went wrong")}</div>;
    } else {
      content = t("ArticleDetails");
    }

    return (
      <DynamicModuleLoader reducers={reducers} removeAfterUnmount={true}>
        <div className={classNames(cls.ArticleDetails, {}, [className])}>
          {content}
        </div>
      </DynamicModuleLoader>
    );
  }
);
