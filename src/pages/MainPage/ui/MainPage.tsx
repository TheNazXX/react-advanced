import { type FC } from 'react'
import { useTranslation } from 'react-i18next'
import { Counter } from 'entities/Counter'
import { AddWord } from 'widgets/AddWord'
import cls from './MainPage.module.scss'

const MainPage: FC = () => {
  const { t } = useTranslation()

  return (
    <div className={cls.MainPage}>
      <Counter />
      <AddWord />
    </div>

  )
}

export default MainPage
