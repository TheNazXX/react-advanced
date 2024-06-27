import { memo, useCallback, type FC } from "react";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faList,
  faMagnifyingGlass,
  faTableCellsLarge,
} from "@fortawesome/free-solid-svg-icons";
import { Button } from "shared/ui";
import { useAppDispatch } from "shared/libs/hooks/useAppDispatch/useAppDispatch";
import { articlesActions } from "pages/ArticlesPage/model/slice/articlesSlice";
import { ArticlesListView } from "entities/Article/model/types/article";
import { useSelector } from "react-redux";
import {
  getArticlesListView,
  getArticlesPageNum,
  getArticlesSearchValue,
} from "pages/ArticlesPage/model/selectors/getArticlesData";
import { Search } from "shared/ui/Search/Search";
import { ArticlesFilterSelectors } from "../ArticlesFilterSelectors/ui/ArticlesFilterSelectors";
import { fetchArticles } from "pages/ArticlesPage/model/services/fetchArticles";
import { useDebounce } from "shared/libs/hooks/useDebounce/useDebounce";

export interface ArticlesPageHeaderProps {
  className?: string;
}

const ARTICLES_VIEWS = [
  {
    view: ArticlesListView.LIST,
    icon: faList,
  },
  {
    view: ArticlesListView.TILE,
    icon: faTableCellsLarge,
  },
];

export const ArticlesPageHeader: FC<ArticlesPageHeaderProps> = memo(
  ({ className }) => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const view = useSelector(getArticlesListView);
    const searchValue = useSelector(getArticlesSearchValue);

    const fetchData = useCallback(() => {
      dispatch(fetchArticles({ replace: true }));
    }, [dispatch]);

    const debauncedFetchData = useDebounce(fetchData, 500);

    const onToggleView = (view: ArticlesListView) => {
      return () => {
        dispatch(articlesActions.toggleView(view));
      };
    };

    const onChangeSearch = (value: string) => {
      dispatch(articlesActions.setSearch(value));
      dispatch(articlesActions.setPage(1));
      debauncedFetchData();
    };

    return (
      <div className="bg-[var(--theme-400)] p-4 rounded-lg mb-4 flex items-center gap-4">
        <Search onChangeValue={onChangeSearch} value={searchValue} />

        <ArticlesFilterSelectors />

        <div className="ml-auto flex items-center gap-2">
          {ARTICLES_VIEWS.map((item, idx) => {
            return (
              <Button key={idx} className="" onClick={onToggleView(item.view)}>
                <FontAwesomeIcon
                  className={`text-2xl ${
                    item.view === view
                      ? "text-[var(--color-200)]"
                      : "text-gray-300"
                  }`}
                  icon={item.icon}
                />
              </Button>
            );
          })}
        </div>
      </div>
    );
  }
);
