import { memo, type FC } from "react";
import { classNames } from "shared/libs/classNames/classNames";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList, faTableCellsLarge } from "@fortawesome/free-solid-svg-icons";
import { Button, TypeButton } from "shared/ui";
import { useAppDispatch } from "shared/libs/hooks/useAppDispatch/useAppDispatch";
import {
  articlesActions,
  articlesSlice,
} from "pages/ArticlesPage/model/slice/articlesSlice";
import { ArticlesListView } from "entities/Article/model/types/article";
import { useSelector } from "react-redux";
import { getArticlesListView } from "pages/ArticlesPage/model/selectors/getArticlesData";

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

    const onToggleView = (view: ArticlesListView) => {
      return () => {
        dispatch(articlesActions.toggleView(view));
      };
    };

    return (
      <div className="bg-[var(--theme-400)] p-4 rounded-lg mb-4 flex items-center gap-4">
        <div className="text-[var(--color-200)] text-2xl">{t("Articles")}</div>

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
