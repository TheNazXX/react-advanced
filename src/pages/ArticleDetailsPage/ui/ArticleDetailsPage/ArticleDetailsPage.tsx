import { classNames } from "shared/libs/classNames/classNames";

import { memo, type FC, type ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { ArticleDetails } from "entities/Article";

interface ArtcleDetailsPageProps {
  className?: string;
  children?: ReactNode;
}

const ArtcleDetailsPage: FC<ArtcleDetailsPageProps> = ({ className }) => {
  const { t } = useTranslation();

  return (
    <div>
      <ArticleDetails />
    </div>
  );
};

export default memo(ArtcleDetailsPage);
