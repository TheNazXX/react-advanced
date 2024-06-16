import { classNames } from "shared/libs/classNames/classNames";
import cls from "./ArticlesPage.module.scss";
import { memo, useCallback, useEffect, type FC, type ReactNode } from "react";
import { useTranslation } from "react-i18next";
import {
  DynamicModuleLoader,
  type ReducersList,
} from "shared/libs/components/DynamicModuleLoader/DynamicModuleLoader";
import {
  articlesActions,
  articlesReducer,
  getArticles,
} from "pages/ArticlesPage/model/slice/articlesSlice";
import { useAppDispatch } from "shared/libs/hooks/useAppDispatch/useAppDispatch";
import { fetchArticles } from "pages/ArticlesPage/model/services/fetchArticles";
import {
  getArticlesInited,
  getArticlesIsLoading,
  getArticlesListView,
  getArticlesPageHasMore,
  getArticlesPageNum,
} from "pages/ArticlesPage/model/selectors/getArticlesData";
import { useSelector } from "react-redux";
import { Loader, Page } from "shared/ui";
import { ArticleList } from "entities/Article/ui/ArticleList/ArticleList";
import { ArticlesListView } from "entities/Article/model/types/article";
import { ArticlesPageHeader } from "./ArticlesPageHeader/ArticlesPageHeader";

const reducers: ReducersList = {
  articles: articlesReducer,
};

interface ArticlesPageProps {
  className?: string;
  children?: ReactNode;
}

const ArticlesPage: FC<ArticlesPageProps> = ({ className }) => {
  const { t } = useTranslation();

  const data = useSelector(getArticles.selectAll);
  const isLoading = useSelector(getArticlesIsLoading);
  const view = useSelector(getArticlesListView) || ArticlesListView.LIST;
  const page = useSelector(getArticlesPageNum);
  const hasMore = useSelector(getArticlesPageHasMore);
  const _inited = useSelector(getArticlesInited);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!_inited) {
      dispatch(articlesActions.init());
      dispatch(fetchArticles({ page: 1 }));
    }
  }, []);

  const onLoadNextPart = useCallback(() => {
    if (hasMore && data.length > 0 && !isLoading) {
      dispatch(articlesActions.setPage(page + 1));
      dispatch(fetchArticles({ page: page + 1 }));
    }
  }, [dispatch, page, data]);

  return (
    <DynamicModuleLoader reducers={reducers}>
      <Page onScrollEnd={onLoadNextPart}>
        <ArticlesPageHeader className="" />
        <div className={classNames(cls.ArticlesPage, {}, [className])}>
          <ArticleList
            articles={data}
            isLoading={isLoading || false}
            view={view}
          />
        </div>
      </Page>
    </DynamicModuleLoader>
  );
};

export default memo(ArticlesPage);
