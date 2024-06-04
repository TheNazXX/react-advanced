import { classNames } from "shared/libs/classNames/classNames";
import cls from "./ArticlesPage.module.scss";
import { memo, useEffect, type FC, type ReactNode } from "react";
import { useTranslation } from "react-i18next";
import {
  DynamicModuleLoader,
  type ReducersList,
} from "shared/libs/components/DynamicModuleLoader/DynamicModuleLoader";
import { articlesReducer } from "pages/ArticlesPage/model/slice/articlesSlice";
import { useAppDispatch } from "shared/libs/hooks/useAppDispatch/useAppDispatch";
import { fetchArticles } from "pages/ArticlesPage/model/services/fetchArticles";
import {
  getArticlesData,
  getArticlesIsLoading,
} from "pages/ArticlesPage/model/selectors/getArticlesData";
import { useSelector } from "react-redux";
import { Loader } from "shared/ui";
import { Article } from "entities/Article/ui/Article/Article";
import { v4 as uuid } from "uuid";

const reducers: ReducersList = {
  articles: articlesReducer,
};

interface ArticlesPageProps {
  className?: string;
  children?: ReactNode;
}

const ArticlesPage: FC<ArticlesPageProps> = ({ className }) => {
  const { t } = useTranslation();

  const data = useSelector(getArticlesData);
  const isLoading = useSelector(getArticlesIsLoading);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchArticles());
  }, []);

  let content;

  if (isLoading) {
    content = <Loader />;
  } else if (data) {
    content = (
      <div className={classNames(cls.ArticlesPage, {}, [className])}>
        <div className={cls.items}>
          {data.map((elem) => (
            <Article key={uuid()} article={elem} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount={true}>
      {content}
    </DynamicModuleLoader>
  );
};

export default memo(ArticlesPage);
