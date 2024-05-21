import { type FC } from "react";
import { useTranslation } from "react-i18next";
import { classNames } from "shared/libs/classNames/classNames";
import cls from "./ArticleDetails.module.scss";
import { DynamicModuleLoader } from "shared/libs/components/DynamicModuleLoader/DynamicModuleLoader";
import { articleDetailsReducer } from "entities/Article/model/slice/articleDetailsSlice";

export interface ArticleDetailsProps {
  className?: string;
}

const reducers = {
  articleDetails: articleDetailsReducer,
};

export const ArticleDetails: FC<ArticleDetailsProps> = ({ className }) => {
  const { t } = useTranslation();

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount={true}>
      <div className={classNames(cls.ArticleDetails, {}, [className])}>
        {t("ArticleDetails")}
      </div>
    </DynamicModuleLoader>
  );
};
