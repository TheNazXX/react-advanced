import { classNames } from 'shared/libs/classNames/classNames'
import { type FC, type ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

interface PageNotFoundProps {
  className?: string
  children?: ReactNode
}

export const PageNotFound: FC<PageNotFoundProps> = ({ className }) => {
  const { t } = useTranslation()

  return (
    <div className={classNames('', {}, [className])}>
      {
        t('PageNotFound')
      }
    </div>
  )
}
