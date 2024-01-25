import { classNames } from 'shared/libs/classNames/classNames'
import cls from './Sidebar.module.scss'
import { type FC, useState } from 'react'
import { ThemeSwitcher } from 'widgets/ThemeSwitcher/ThemeSwitcher'
import { LangSwitcher } from 'widgets/LangSwitcher/LangSwitcher'
import { useTranslation } from 'react-i18next'
import { BugButton } from 'app/providers/ErrorBoundary/ui/BugButton'
import { AppLink } from 'shared/ui'
import { RoutePathes } from 'shared/config/routeConfig/routeConfig'
import { BurgerBtn } from 'widgets/BurgerBtn/BurgerBtn'

import { faHouse, faLayerGroup, faBook } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ThemeColorsSwitcher } from 'widgets/ThemeColorsSwitcher'

interface SidebarProps {
  className?: string
}

export const Sidebar: FC<SidebarProps> = ({ className }) => {
  const [collapsed, toggleCollapsed] = useState<boolean>(false)

  const toggleSidebar = () => {
    toggleCollapsed(state => !state)
  }

  const { t } = useTranslation()

  return (
    <div data-testid="sidebar" className={classNames(cls.sidebar, { [cls.collapsed]: collapsed }, [className])}>
      <div className={classNames(cls.closeBtnWrap, {}, [])}>
        <BurgerBtn onClick={toggleSidebar} isOpen={collapsed} data-testid='sidebar-toggle'/>
      </div>

      <div className={classNames(cls.themeSwitch, {}, [])}>
        {!collapsed
          ? <span>
          {
            t('SwitchTheme')
          }
        </span>
          : null}
        <ThemeSwitcher/>
      </div>

      <div className={classNames(cls.LangSwitcher, {}, [])}>
        <LangSwitcher isCollapsed={collapsed}/>
      </div>

 

      <div className={classNames(cls.links, {}, [])}>
        <AppLink className={cls.link} to={RoutePathes.main}>
          <FontAwesomeIcon icon={faHouse} />
          {!collapsed && t('MainPage')}
        </AppLink>
        <AppLink className={cls.link} to={RoutePathes.about}>
          <FontAwesomeIcon icon={faLayerGroup} />
          {!collapsed && t('AboutPage')}
        </AppLink>
        <AppLink className={cls.link} to={RoutePathes.words}>
          <FontAwesomeIcon icon={faBook} />
          {!collapsed && t('WordsPage')}
        </AppLink>
      </div>

      {/* <BugButton className={cls.bugButton}/> */}

      <div className={classNames(cls.themeColorsSwitcher, {}, [])}>
        <ThemeColorsSwitcher isCollapsed={collapsed}/>
      </div>
    </div>
  )
}
