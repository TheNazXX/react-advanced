import { classNames } from 'shared/libs/classNames/classNames'
import cls from './ArticlesPage.module.scss'
import {memo, type FC, type ReactNode} from 'react'
import {useTranslation} from 'react-i18next'

interface ArticlesPageProps {
  className?: string
  children?: ReactNode
}

const ArticlesPage: FC<ArticlesPageProps> = ({ className }) => {

  const {t} = useTranslation()

  return (
    <div className={classNames(cls.ArticlesPage, {}, [className])}>
      ArticlesPage
    </div>
  );
};

export default memo(ArticlesPage);