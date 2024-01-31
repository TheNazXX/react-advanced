import { type FC } from 'react'
import { useTranslation } from 'react-i18next'
import { Counter } from 'entities/Counter'
import { AddWord } from 'features/AddWord'
import cls from './MainPage.module.scss'

const MainPage: FC = () => {
  const { t } = useTranslation()

  return (
    <div className={cls.MainPage}>
      <AddWord />
    </div>

  )
}

export default MainPage
