import { classNames } from "shared/libs/classNames/classNames";
import cls from "./ArticlesPage.module.scss";
import {
  memo,
  useCallback,
  useEffect,
  useMemo,
  type FC,
  type ReactNode,
} from "react";
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
  getArticlesType,
} from "pages/ArticlesPage/model/selectors/getArticlesData";
import { useSelector } from "react-redux";
import { ArticleList } from "entities/Article/ui/ArticleList/ArticleList";
import {
  ArticleType,
  ArticlesListView,
} from "entities/Article/model/types/article";
import { ArticlesPageHeader } from "../ArticlesPageHeader/ArticlesPageHeader";
import { Page } from "widgets/Page/ui/Page";
import { useSearchParams } from "react-router-dom";
import { Tabs, type TabItem } from "shared/ui/Tabs/Tabs";

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
  const [searchParams] = useSearchParams();
  const type = useSelector(getArticlesType);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!_inited) {
      dispatch(
        articlesActions.init({
          search: searchParams.get("search") || "",
          order: searchParams.get("order") || "",
          sort: searchParams.get("sort") || "",
        })
      );
      dispatch(fetchArticles({}));
    }
  }, []);

  const onLoadNextPart = useCallback(() => {
    if (hasMore && data.length > 0 && !isLoading) {
      dispatch(articlesActions.setPage(page + 1));
      dispatch(fetchArticles({}));
    }
  }, [dispatch, page, data]);

  const tabs = useMemo<TabItem[]>(
    () => [
      {
        value: ArticleType.ALL,
        content: "All",
      },
      {
        value: ArticleType.IT,
        content: "IT",
      },
      {
        value: ArticleType.COURSE,
        content: "Course",
      },
      {
        value: ArticleType.DEVOPS,
        content: "DevOps",
      },
      {
        value: ArticleType.FRAMEWORK,
        content: "Framework",
      },
      {
        value: ArticleType.AI,
        content: "AI",
      },
      {
        value: ArticleType.LANGUAGE,
        content: "Programing Language",
      },
    ],
    []
  );

  const onChageTab = (tab: TabItem) => {
    dispatch(articlesActions.setType(tab.value as ArticleType));
    dispatch(fetchArticles({ replace: true }));
  };

  return (
    <DynamicModuleLoader reducers={reducers}>
      <Page onScrollEnd={onLoadNextPart}>
        <ArticlesPageHeader />
        <Tabs
          className="mb-10"
          tabs={tabs}
          value={type}
          onChangeTab={onChageTab}
        />
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
