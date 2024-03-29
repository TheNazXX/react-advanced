import { classNames } from 'shared/libs/classNames/classNames'

import {memo, type FC, type ReactNode} from 'react'
import {useTranslation} from 'react-i18next'

interface ArtcleDetailsPageProps {
  className?: string
  children?: ReactNode
}

const ArtcleDetailsPage: FC<ArtcleDetailsPageProps> = ({ className }) => {

  const {t} = useTranslation()

  return (
    <div>
      ArtcleDetailsPage
    </div>
  );
};

export default memo(ArtcleDetailsPage);