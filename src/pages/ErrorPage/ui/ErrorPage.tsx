import { classNames } from 'shared/libs/classNames/classNames'
import cls from './ErrorPage.module.scss'
import { type FC, type ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from 'shared/ui'
import { TypeButton } from 'shared/ui/Button/Button'

interface ErrorPageProps {
  className?: string
  children?: ReactNode
}

export const ErrorPage: FC<ErrorPageProps> = ({ className }) => {
  const { t } = useTranslation()

  const reloadPage = (): void => {
    location.reload()
  }

  return (
    <div className={classNames(cls.ErrorPage, {}, [className])}>
      {t('SmtWentWrong')}
      <Button typeBtn={TypeButton.PRIMARY} onClick={reloadPage}>{t('ReloadPage')}</Button>
    </div>
  )
}
