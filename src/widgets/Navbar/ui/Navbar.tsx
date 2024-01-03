import { classNames } from 'shared/libs/classNames/classNames'
import { type FC } from 'react'

import cls from './Navbar.module.scss'
import { AppLink } from 'shared/ui'
import { BurgerBtn } from 'widgets/BurgerBtn/BurgerBtn'
import { useTranslation } from 'react-i18next'

interface NavbarProps {
  className?: string
  toggleSidebar: () => void
}

export const Navbar: FC<NavbarProps> = ({ className, toggleSidebar }) => {
  const { t } = useTranslation()

  return (
    <div
      className={classNames(cls.navbar, {}, [])}
    >
      <BurgerBtn onClick={toggleSidebar}/>
      <div className={cls.links}>
        <AppLink to={'/'}>
          {
            t('MainPage')
          }
        </AppLink>
        <AppLink to={'/about'}>
          {
            t('AboutPage')
          }
        </AppLink>
      </div>
    </div>
  )
}
